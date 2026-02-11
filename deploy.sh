#!/bin/bash

# Xserverデプロイスクリプト
# agoghub.comのXserverにアップロードするためのスクリプト

# FTP設定
FTP_HOST="sv14776.xserver.jp"
FTP_USER="xs805017"
FTP_PASS="n1cdpbpm"
FTP_PATH="/agoghub.com/public_html/dev_project_lp/"
LOCAL_DIR="./dist"

echo "=========================================="
echo "Xserverデプロイスクリプト"
echo "=========================================="
echo ""

# 1. ビルドの実行
echo "【1/3】ビルドを実行します..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ ビルドに失敗しました。"
    exit 1
fi

echo "✅ ビルドが完了しました。"
echo ""

# 2. APIファイル、画像ファイル、.htaccessをdistにコピー
echo "【2/3】APIファイル、画像ファイル、.htaccessをdistにコピーします..."
cp -r api dist/
# 画像ファイルをコピー（Viteのビルドで自動コピーされるが、念のため）
if [ -f public/doctor_icon.png ]; then
    cp public/doctor_icon.png dist/
fi
if [ -f public/.htaccess ]; then
    cp public/.htaccess dist/
fi

if [ $? -ne 0 ]; then
    echo "❌ ファイルのコピーに失敗しました。"
    exit 1
fi

echo "✅ ファイルのコピーが完了しました。"
echo ""

# 3. FTPでアップロード
echo "【3/3】FTPでXserverにアップロードします..."
echo "FTPホスト: $FTP_HOST"
echo "アップロード先: $FTP_PATH"
echo ""

# lftpを使用してアップロード
if command -v lftp &> /dev/null; then
    lftp -u "$FTP_USER,$FTP_PASS" "$FTP_HOST" <<EOF
set ftp:ssl-allow no
# agoghub.com/public_html/dev_project_lp に移動
cd agoghub.com/public_html/dev_project_lp
# ファイルをアップロード
mirror -R --delete --verbose $LOCAL_DIR .
bye
EOF
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ アップロードが完了しました！"
        echo ""
        echo "デプロイ先URL: https://agoghub.com/dev_project_lp/"
    else
        echo ""
        echo "❌ アップロードに失敗しました。"
        exit 1
    fi
else
    echo "⚠️  lftpがインストールされていません。"
    echo ""
    echo "以下のいずれかの方法でアップロードしてください："
    echo ""
    echo "【方法1】lftpをインストールして再実行:"
    echo "  brew install lftp  # macOSの場合"
    echo ""
    echo "【方法2】FTPクライアントを使用:"
    echo "  ホスト: $FTP_HOST"
    echo "  ユーザー: $FTP_USER"
    echo "  パスワード: $FTP_PASS"
    echo "  アップロード先: $FTP_PATH"
    echo "  アップロードするフォルダ: $LOCAL_DIR の中身すべて"
    echo ""
    echo "【方法3】FileZillaなどのFTPクライアントを使用:"
    echo "  - ホスト: $FTP_HOST"
    echo "  - ユーザー名: $FTP_USER"
    echo "  - パスワード: $FTP_PASS"
    echo "  - ポート: 21"
    echo "  - $LOCAL_DIR の中身を $FTP_PATH にアップロード"
    echo ""
    exit 0
fi

echo ""
echo "=========================================="
echo "デプロイ完了"
echo "=========================================="
