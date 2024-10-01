# ベースイメージを指定します
FROM golang:latest

# コンテナ内の作業ディレクトリを設定します
WORKDIR /app

# Goモジュールファイルをコピーします
COPY go.mod go.sum ./

# 必要な依存関係をインストールします
RUN go mod download

# ソースコードをコンテナにコピーします
COPY . .

# 必要なパッケージをインストールします
RUN go get ./...

# アプリをビルドします
RUN go build -o main .

# ポートを公開します
EXPOSE 8080

# アプリを実行します
CMD ["./main"]
# CMD [ bash ]