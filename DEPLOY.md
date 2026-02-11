# デプロイ手順

## ビルドとアップロード

### 1. ビルドの実行

```bash
npm run build
```

これで `dist` ディレクトリにビルド済みファイルが生成されます。

### 2. APIファイルのコピー

```bash
cp -r api dist/
```

### 3. サーバーへのアップロード

agoghub.comのサーバー（`https://agoghub.com/oneshot/` の配下）にアップロードします。

#### 方法1: SCPを使用（推奨）

```bash
scp -r dist/* your-username@agoghub.com:/path/to/oneshot/
```

#### 方法2: rsyncを使用（推奨）

```bash
rsync -avz --delete dist/ your-username@agoghub.com:/path/to/oneshot/
```

#### 方法3: FTP/SFTPクライアントを使用

- ホスト: agoghub.com
- ユーザー名: （サーバー管理者に確認）
- アップロード先: `/path/to/oneshot/` （サーバー管理者に確認）
- アップロードするファイル: `dist` ディレクトリの中身すべて

### 4. アップロードするファイル

以下のファイルをアップロードしてください：

- `dist/index.html`
- `dist/assets/` ディレクトリ（CSS、JSファイル）
- `dist/profile-image.png` （画像ファイル）
- `dist/api/contact.php` （PHPファイル）

### 5. サーバー設定の確認

- PHPが有効になっていることを確認
- `api/contact.php` のメール送信先を設定
- ファイルのパーミッションを適切に設定（通常は644）

### 6. 動作確認

アップロード後、以下のURLでアクセスして動作を確認してください：

- `https://agoghub.com/oneshot/`
- `https://agoghub.com/oneshot/api/contact.php` （PHPが動作するか確認）

## トラブルシューティング

### 画像が表示されない場合

- 画像ファイルが正しくアップロードされているか確認
- パスの大文字小文字を確認（Linuxサーバーは大文字小文字を区別します）

### PHPフォームが動作しない場合

- PHPが有効になっているか確認
- `api/contact.php` のパーミッションを確認（実行可能である必要はありませんが、読み取り可能である必要があります）
- エラーログを確認

### 404エラーが発生する場合

- `.htaccess` ファイルが必要な場合があります（SPAのルーティング用）
- サーバー管理者に確認してください












