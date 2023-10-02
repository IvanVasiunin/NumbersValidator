<?php
$pswrdsFile = __DIR__ . '/data/pswrds.txt';
$balanceFile = __DIR__ . '/data/balance.txt';
$logFile = __DIR__ . '/data/admin/adminlog.txt';

$user = $_POST['new_login'] ?? null;
$password = $_POST['new_password'] ?? null;
$balance = $_POST['new_balance'] ?? null;

// Проверка наличия всех необходимых данных
if (!$user || !$password || !$balance) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required data']);
    exit;
}

// Запись новых данных в файлы
if (!file_put_contents($pswrdsFile, "\n$user,$password", FILE_APPEND | LOCK_EX)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to update passwords file']);
    exit;
}

if (!file_put_contents($balanceFile, "\n$user,$balance", FILE_APPEND | LOCK_EX)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to update balance file']);
    exit;
}

// Запись в лог-файл
$timestamp = date('Y-m-d H:i:s');
$logData = "time: $timestamp, action: adding user, user: $user, password: $password, balance: $balance, result: success" . PHP_EOL;
if (!file_put_contents($logFile, $logData, FILE_APPEND | LOCK_EX)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to update log file']);
    exit;
}

// Ответ на запрос
echo json_encode(['success' => true]);


?>