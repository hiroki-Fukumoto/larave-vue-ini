# Laravel, Vue.js の初期設定済みプロジェクトです

## 構成

- Laravelにはリポジトリパターンを採用
- vue-router導入済み
- vuex導入済み
- eslintには js standard を採用

## 開始

### .envファイル作成
ルートディレクトリに `.env` を作成し、`.env.example` をコピーして貼り付けてください。

### APP_KEYの作成
以下のコマンドを実行してください。
```
php artisan key:generate
```

`.env` のAPP_KEYに値がセットされていたらOKです。

その他、DB等の設定は開発環境に合わせて修正してください。

### アプリ起動
以下のコマンドを実行後、ローカルホストに接続してください。

```
php artisan serve
```
```
npm run watch
```