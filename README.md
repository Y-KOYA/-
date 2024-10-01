## section7 チーム開発
# おこづかいちょう（子供向けお小遣い管理）アプリのRESTful API設計

### エンドポイント


| HTTPメソッド | エンドポイント          | 説明                    |
|--------------|---------------------|------------------------|
| GET          | /money              | すべての金銭取引を取得     |
| GET          | /money?user_id={user_id}    | 特定の金銭取引を取得  |
| POST         | /money?user_id={user_id}   | 新しい金銭取引を作成   |
| PUT          | /money?user_id={user_id}    | 特定の金銭取引を更新  |
| DELETE       | /money?user_id={user_id}    | 特定の金銭取引を削除  |

---

## API詳細

#### `GET /money`
- 説明: すべての金銭取引を取得する
- Request
- Response 200 (application/json):
  - body
    ```json
    [
        {
            "ID": "number",             //収支のID
            "valueofMoney": "number",   //金額
            "MoneyCategory": "string", //収支カテゴリ
            "TransferDate": "date",     //日付
            "Comment": "string",　　　　　//コメント
            "Users": {
              "ID":"number",　　　　　//ユーザー（保護者）ID
              "Name":"string",   　　//ユーザー名
              "Email":"string",　　　//メールアドレス
              "ChildName":"string"　//子供の名前
            }        
        },
        ...
    ]
    ```

#### `GET /money?user_id={user_id}`
- 説明: 特定の金銭取引を取得する
- Request
  - Path Parameter:
    ```json
     id:"number" (required)     　　//収支ID(必須)
- Response 200 (application/json):
  - body
    ```json
    {
        {
            "ID": "number",             //収支のID
            "valueofMoney": "number",   //金額
            "MoneyCategory": "string", //収支カテゴリ
            "TransferDate": "date",     //日付
            "Comment": "string",　　　　　//コメント
            "Users": {
              "ID":"number",　　　　　//ユーザー（保護者）ID
              "Name":"string",   　　//ユーザー名
              "Email":"string",　　　//メールアドレス
              "ChildName":"string"　//子供の名前
            }        
        },
    }
    ```

#### `POST /money?user_id={user_id}`
- 説明: 新しい金銭取引を作成する
- Request
  - body
    ```json
    {
        {
            "valueofMoney": "number",   //金額
            "MoneyCategory": "string", //収支カテゴリ
            "TransferDate": "date",     //日付
            "Comment": "string",　　　　　//コメント
            "Users": {
              "ID":"number",　　　　　//ユーザー（保護者）ID
              "Name":"string",   　　//ユーザー名
              "Email":"string",　　　//メールアドレス
              "ChildName":"string"　//子供の名前
            }        
        },
    }
    ```
- Response 200 (application/json):
  - body
    ```json
    {
        "ID": "number",             //収支のID
        "valueofMoney": "number",   //金額
        "MoneyCategory": "string", //収支カテゴリ
        "TransferDate": "date",     //日付
        "Comment": "string",　　　　　//コメント
        "Users": {
           "ID":"number",　　　　　//ユーザー（保護者）ID
           "Name":"string",   　　//ユーザー名
           "Email":"string",　　　//メールアドレス
           "ChildName":"string"　//子供の名前
         }        
    }
    ```

#### `PUT /money?user_id={user_id}`
- 説明: 特定の金銭取引を更新する
- Request
  - Path Parameter:
    ```json
     id:"number" (required)  　　　　//収支ID（必須）
  - body
    ```json
    {
        "valueofmoney": "number",     //金額      
        "money_category": "string",   //収支カテゴリ
        "transferdate": "date",       //日付
        "comment": "string",          //コメント
        "Users": {
           "ID":"number",　　　　　//ユーザー（保護者）ID
           "Name":"string",   　　//ユーザー名
           "Email":"string",　　　//メールアドレス
           "ChildName":"string"　//子供の名前
         }          
    }
    ```
- Response 200 (application/json):
  - body
    ```json
    {
        "id": "number",              //収支ID
        "valueofmoney": "number",    //金額
        "money_category": "string",  //収支カテゴリ
        "transferdate": "date",      //日付
        "comment": "string",         //コメント
        "Users": {
           "ID":"number",　　　　　//ユーザー（保護者）ID
           "Name":"string",   　　//ユーザー名
           "Email":"string",　　　//メールアドレス
           "ChildName":"string"　//子供の名前
         }          
    }
    ```

#### `DELETE /money?user_id={user_id}`
- 説明: 特定の金銭取引を削除する
- Request
  - Path Parameter:
    ```json
     id:"number" (required:必須)  ://金銭取引のID
- Response 200 (application/json):
  - body
    ```json
    {
        "message": "データが削除されました"
    }
    ```

---

