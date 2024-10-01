package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"

	"github.com/gin-contrib/cors"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Users struct {
	ID        uint
	Name      string
	Email     string
	ChildName string
}

type Money struct {
	ID            uint
	ValueofMoney  uint
	MoneyCategory string
	TransferDate  time.Time
	Comment       string
	UserID        uint
	User          Users `gorm:"foreignKey:UserID"`
}

var App *firebase.App

func InitFirebase() {
	ctx := context.Background()
	serviceAccountKeyFilePath := os.Getenv("FIREBASE_SERVICE_ACCOUNT_KEY")

	opt := option.WithCredentialsFile(serviceAccountKeyFilePath)
	var err error
	App, err = firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("error initializing firebase app: %v\n", err)
	}
}

func verifyToken(c *gin.Context) {
	idToken := c.GetHeader("Authorization")
	if idToken == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization Header"})
		c.Abort()
		return
	}

	client, err := App.Auth(context.Background())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error initializing Firebase Auth"})
		c.Abort()
		return
	}

	token, err := client.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}

	c.Set("uid", token.UID)
	c.Next()
}

func main() {
	// Firebase初期化
	InitFirebase()

	// ログをファイルに書き込む
	logFile, err := os.OpenFile("server.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal("Error opening log file:", err)
	}
	defer logFile.Close()
	gin.DefaultWriter = io.MultiWriter(logFile, os.Stdout)

	// .envファイルから環境変数を読み込む
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// 環境変数から接続情報を取得
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPort := os.Getenv("POSTGRES_PORT")
	// 環境変数の値を確認（デバッグ用）
	log.Printf("DB User: %s, DB Password: %s, DB Name: %s, DB Host: %s, DB Port: %s\n", dbUser, dbPassword, dbName, dbHost, dbPort)
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo", dbHost, dbUser, dbPassword, dbName, dbPort)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	log.Println("Connected to database")

	err = db.AutoMigrate(&Users{}, &Money{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	log.Println("Database migrated")

	// Ginエンジンのインスタンスを作成
	r := gin.Default()

	//CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "PUT"},
		AllowHeaders:     []string{"Authorization"},
		AllowCredentials: true,
	}))

	// ミドルウェアとしてverifyTokenを使用
	authGroup := r.Group("/")
	authGroup.Use(verifyToken)

	// ルートURL ("/") に対するGETリクエストをハンドル
	authGroup.GET("/money", func(c *gin.Context) {
		var money []Money

		userName := c.Query("user_name") // ユーザー名をクエリパラメータから取得
		if userName == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ログインし直してください"})
			return
		}
		// user_nameが指定されている場合はフィルタリングして取得
		db.Where("user_name = ?", userName).Find(&money)
		if len(money) == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "該当するデータが見つかりません"})
			return
		}
		c.JSON(http.StatusOK, money)
	})

	authGroup.POST("/money", func(c *gin.Context) {
		var money Money
		if err := c.ShouldBindJSON(&money); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&money)
		c.JSON(http.StatusOK, money)
	})

	// Firebaseのユーザーを取得するエンドポイント
	authGroup.GET("/user", func(c *gin.Context) {
		uid, exists := c.Get("uid")
		if !exists {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "ユーザーIDが見つかりません"})
			return
		}

		client, err := App.Auth(context.Background())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Firebase Authクライアントの初期化に失敗しました"})
			return
		}

		user, err := client.GetUser(context.Background(), uid.(string))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "ユーザー情報の取得に失敗しました"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user": user})
	})

	// 8080ポートでサーバーを起動
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // デフォルトポート
	}
	log.Printf("Starting server on port %s\n", port)

	// その他のコード
	log.Println("Firebase initialized successfully")

	r.Run(fmt.Sprintf(":%s", port))

}