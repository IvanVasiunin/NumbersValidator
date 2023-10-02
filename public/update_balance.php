<?php

$balanceFile = __DIR__ . '/data/balance.txt';
$adminLogFile = __DIR__ . '/data/admin/adminlog.txt';

$user = $_POST['user'] ?? null;
$balance = $_POST['balance'] ?? null;

if (!$user || !$balance) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing user or balance parameter']);
    exit;
}

$balances = file($balanceFile, FILE_IGNORE_NEW_LINES);
$newBalances = [];

$found = false;
foreach ($balances as $i => $line) {
    $data = explode(',', $line);
    if ($data[0] === $user) {
        $oldBalance = $data[1];
        $newBalances[$i] = "$user,$balance";
        $found = true;
    } else {
        $newBalances[$i] = $line;
    }
}

if (!$found) {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'User not found']);
    exit;
}

if (!file_put_contents($balanceFile, implode("\n", $newBalances))) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to update balance']);
    exit;
}

// Log the balance change
$timestamp = date('Y-m-d H:i:s');
$result = file_exists($balanceFile) ? 'success' : 'fail';
$logData = "time: $timestamp, action: balance change, user: $user, startBalance: $oldBalance, new_balance: $balance, result: $result" . PHP_EOL;
file_put_contents($adminLogFile, $logData, FILE_APPEND);

echo json_encode(['success' => true]);
