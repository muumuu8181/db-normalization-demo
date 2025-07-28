# DB正規化ツール v1.1 - Google OAuth設定ガイド

## 🔐 ブラウザでのGoogle認証設定手順

### ステップ1: Google Cloud Console設定

#### 1. プロジェクト作成
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. **新規プロジェクト作成**
   - プロジェクト名: `db-normalization-oauth`
   - 組織: 個人アカウント

#### 2. Generative Language API 有効化
1. **「APIとサービス」** → **「ライブラリ」**
2. **「Generative Language API」** を検索
3. **「有効にする」** をクリック

#### 3. OAuth 2.0 認証情報作成
1. **「APIとサービス」** → **「認証情報」**
2. **「認証情報を作成」** → **「OAuth 2.0 クライアントID」**
3. **アプリケーションタイプ**: ウェブアプリケーション
4. **名前**: `DB正規化ツール`
5. **承認済みJavaScriptオリジン**:
   ```
   http://localhost:8000
   http://127.0.0.1:8000
   ```
6. **承認済みリダイレクトURI**:
   ```
   http://localhost:8000/index.html
   http://127.0.0.1:8000/index.html
   ```

### ステップ2: クライアントIDの設定

#### 4. クライアントIDをコピー
- OAuth作成完了後、**クライアントID**をコピー
- 形式: `123456789-abcdefg.apps.googleusercontent.com`

#### 5. コードに設定
`index.html` の223行目を編集:
```javascript
const GOOGLE_CLIENT_ID = "あなたのクライアントID";
```

### ステップ3: 動作確認

#### 6. サーバー起動
```bash
cd /mnt/c/Users/kakar/db-normalization-demo
python3 -m http.server 8000
```

#### 7. ブラウザでアクセス
- URL: `http://localhost:8000`
- **「Googleでサインイン (OAuth)」** ボタンをクリック
- Google認証画面でログイン
- **「DB正規化ツールがGemini APIにアクセスする」** ことを許可

## 🔑 必要なスコープ
```
https://www.googleapis.com/auth/generative-language.retriever
```

## 💡 認証フロー
1. **ユーザー**: 「Googleでサインイン」をクリック
2. **Google**: 認証画面を表示
3. **ユーザー**: Googleアカウントでログイン
4. **Google**: 権限確認画面を表示
5. **ユーザー**: 「許可」をクリック
6. **システム**: OAuth トークンを取得
7. **DB正規化ツール**: Gemini API でER図生成が利用可能

## 🚨 トラブルシューティング

### よくある問題:
- **「リダイレクトURIが一致しません」**: ステップ3-6のURI設定を確認
- **「APIが有効になっていません」**: ステップ2でAPI有効化を確認
- **「クライアントIDが無効」**: ステップ5でID設定を確認

### デバッグ方法:
1. ブラウザのコンソール (F12) でエラー確認
2. `authMode` 変数の値を確認
3. `updateAuthStatus()` の表示内容を確認

## 📝 注意事項
- **無料プランでも設定可能**
- 請求先アカウント設定が必要な場合あり
- 初回認証時に権限確認あり
- OAuth設定完了まで **デモモード** で動作確認可能