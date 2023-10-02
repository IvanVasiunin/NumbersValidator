<?php

$pswrdsFile = __DIR__ . '/data/pswrds.txt';
$adminLogFile = __DIR__ . '/data/admin/adminlog.txt';

$user = $_POST['user'] ?? null;
$password = $_POST['password'] ?? null;

function csv_format($array) {
    return implode(',', $array);
}

if (!$user || !$password) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing user or password parameter']);
    exit;
}

$pswrds = array_map('str_getcsv', file($pswrdsFile));

$found = false;
foreach ($pswrds as $i => $pswrd) {
    if ($pswrd[0] === $user) {
        $old_password = $pswrd[1];
        $pswrds[$i][1] = $password;
        $found = true;
        break;
    }
}

if (!$found) {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'User not found']);
    exit;
}

if (!file_put_contents($pswrdsFile, implode("\n", array_map('csv_format', $pswrds)))) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to update password']);
    exit;
}

$timestamp = date('Y-m-d H:i:s');
$result = file_exists($pswrdsFile) ? 'success' : 'fail';
$logMessage = "time: $timestamp, action: password change, user: $user, old password: $old_password, new password: $password, result: $result" . PHP_EOL;

file_put_contents($adminLogFile, $logMessage, FILE_APPEND);

echo json_encode(['success' => true]);

