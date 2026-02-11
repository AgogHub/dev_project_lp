<?php
/**
 * IT発注見積もりチェック＆炎上リスク診断 - お問い合わせフォーム処理
 */

// エラーレポートを有効化（本番環境では無効化推奨）
error_reporting(E_ALL);
ini_set('display_errors', 0);

// レスポンスヘッダー
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// POSTリクエストのみ受け付ける
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// カテゴリのラベルマッピング
$category_labels = [
    'ai' => 'AI導入',
    'estimate' => '見積もりチェック',
    'risk' => '炎上リスク診断',
    'app' => 'アプリ開発',
    'other' => 'その他',
];

// 入力値の取得とサニタイズ
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$category = isset($_POST['category']) ? trim($_POST['category']) : '';
$category_label = isset($category_labels[$category]) ? $category_labels[$category] : ($category ?: '-');

// バリデーション
$errors = [];

if (empty($company)) {
    $errors[] = '会社名は必須です';
}

if (empty($name)) {
    $errors[] = '氏名は必須です';
}

if (empty($email)) {
    $errors[] = 'メールアドレスは必須です';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'メールアドレスの形式が正しくありません';
}

if (empty($message)) {
    $errors[] = '相談内容は必須です';
}

if (empty($category) || !isset($category_labels[$category])) {
    $errors[] = 'カテゴリを選択してください';
}

// エラーがある場合は返す
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// メール送信設定
// TODO: 実際の送信先メールアドレスに変更してください
$to = 'delegate@agoghub.com';
$subject = '【IT発注見積もりチェック】お問い合わせがありました';

// メール本文の作成
$email_body = "以下の内容でお問い合わせがありました。\n\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$email_body .= "【会社名】\n";
$email_body .= $company . "\n\n";
$email_body .= "【氏名】\n";
$email_body .= $name . "\n\n";
$email_body .= "【メールアドレス】\n";
$email_body .= $email . "\n\n";
$email_body .= "【カテゴリ】\n";
$email_body .= $category_label . "\n\n";
$email_body .= "【相談内容】\n";
$email_body .= $message . "\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$email_body .= "\n";
$email_body .= "送信日時: " . date('Y年m月d日 H:i:s') . "\n";

// メールヘッダー
$headers = [];
$headers[] = 'From: ' . mb_encode_mimeheader($name) . ' <' . $email . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// メール送信
$mail_sent = mail($to, mb_encode_mimeheader($subject, 'UTF-8'), $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // 自動返信メール（オプション）
    $auto_reply_subject = '【IT発注見積もりチェック】お問い合わせありがとうございます';
    $auto_reply_body = $name . " 様\n\n";
    $auto_reply_body .= "この度は、IT発注見積もりチェック＆炎上リスク診断サービスに\n";
    $auto_reply_body .= "お問い合わせいただき、誠にありがとうございます。\n\n";
    $auto_reply_body .= "以下の内容でお問い合わせを承りました。\n\n";
    $auto_reply_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $auto_reply_body .= "【カテゴリ】\n";
    $auto_reply_body .= $category_label . "\n\n";
    $auto_reply_body .= "【相談内容】\n";
    $auto_reply_body .= $message . "\n";
    $auto_reply_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $auto_reply_body .= "担当者より、2営業日以内にご連絡させていただきます。\n";
    $auto_reply_body .= "今しばらくお待ちください。\n\n";
    $auto_reply_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $auto_reply_body .= "IT発注見積もりチェック＆炎上リスク診断\n";
    $auto_reply_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    $auto_reply_headers = [];
    $auto_reply_headers[] = 'From: ' . mb_encode_mimeheader('IT発注見積もりチェック') . ' <' . $to . '>';
    $auto_reply_headers[] = 'Content-Type: text/plain; charset=UTF-8';
    
    mail($email, mb_encode_mimeheader($auto_reply_subject, 'UTF-8'), $auto_reply_body, implode("\r\n", $auto_reply_headers));
    
    // 成功レスポンス
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'お問い合わせを受け付けました。担当者より2営業日以内にご連絡いたします。'
    ]);
} else {
    // 送信失敗
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'メール送信に失敗しました。しばらく時間をおいて再度お試しください。'
    ]);
}

// ログファイルへの記録（オプション）
$log_file = __DIR__ . '/contact_log.txt';
$log_entry = date('Y-m-d H:i:s') . " | {$company} | {$name} | {$email} | {$category_label}\n";
file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);

?>

