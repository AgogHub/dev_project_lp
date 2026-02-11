# IT発注見積もりチェック＆炎上リスク診断 - ランディングページ

BtoB向けのIT発注見積もりチェックサービスのランディングページです。

## 技術スタック

- **Vite** - ビルドツール
- **React 18** - UIフレームワーク
- **TypeScript** - 型安全なJavaScript
- **Tailwind CSS 3.x** - ユーティリティファーストのCSSフレームワーク
- **shadcn/ui** - Radix UIベースの高品質UIコンポーネント
- **PHP** - フォーム処理用バックエンド

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

### 3. ビルド

```bash
npm run build
```

## 設定

### 料金設定

`src/App.tsx` の `PRICE` 定数を変更することで、料金を変更できます。

```typescript
const PRICE = 30000 // 税別
```

### PHPフォーム設定

`api/contact.php` の以下の部分を実際の送信先メールアドレスに変更してください。

```php
$to = 'your-email@example.com';
```

### 画像の配置

ヒーローセクションで使用するプロフィール画像を配置してください。

1. `public` フォルダに画像を配置（例：`public/profile-image.jpg`）
2. 画像のアスペクト比は 3:4 または 4:5 を推奨
3. 画像ファイル名を変更する場合は、`src/App.tsx` の画像パスも変更してください

```tsx
// src/App.tsx の画像パス
<img src="/profile-image.jpg" alt="..." />
```

## プロジェクト構造

```
dev_project_lp/
├── api/
│   └── contact.php          # フォーム処理用PHP
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/uiコンポーネント
│   ├── lib/
│   │   └── utils.ts         # ユーティリティ関数
│   ├── App.tsx              # メインLPコンポーネント
│   ├── main.tsx             # エントリーポイント
│   └── index.css            # グローバルスタイル
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## セクション構成

1. ヒーローセクション
2. 共感セクション
3. 解決策・サービス紹介セクション
4. サービスの流れセクション
5. 料金・プランセクション
6. プロフィール・信頼性セクション
7. お客様の声セクション
8. FAQセクション
9. 最終CTA・問い合わせフォームセクション

## デプロイ

ビルド後、`dist` ディレクトリの内容をWebサーバーにアップロードしてください。
PHPファイル（`api/contact.php`）も一緒にアップロードする必要があります。

