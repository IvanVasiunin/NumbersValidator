<?php
session_start();

$serviceId = $_POST['service_id'];
$items = $_POST['items'];
$username = $_POST['user'];

$prices = [
    '1' => 0.001,
    '2' => 0.005,
    '3' => 0.005,
    '4' => 0.001
];

$price = $prices[$serviceId];
$cost = round($price * $items, 3);

$balanceFile = __DIR__ . '/data/balance.txt';
$balance = '';
if (file_exists($balanceFile)) {
    $balances = file($balanceFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($balances as $balanceData) {
        list($user, $userBalance) = explode(',', $balanceData);
        if ($user == $username) {
            $balance = $userBalance;
            break;
        }
    }
}

if ($balance < $cost) {
    $response = ['success' => false];
} else {
    $newBalance = round($balance - $cost, 3);
    $content = file_get_contents($balanceFile);
    $content = str_replace("$username,$balance", "$username,$newBalance", $content);
    file_put_contents($balanceFile, $content);

    $response = ['success' => true, 'balance' => $newBalance];
}

$logFile = __DIR__ . '/data/admin/log.txt';
$logData = "time: " . date('Y-m-d H:i:s') . ", user: $username, service_id: $serviceId, numbers_count: $items, cost: $cost, old_balance: $balance, new_balance: ";

if ($response['success']) {
    $logData .= "$newBalance, result: success";
} else {
    $logData .= "$balance, result: fail";
}
file_put_contents($logFile, $logData . PHP_EOL, FILE_APPEND);


header('Content-Type: application/json');
echo json_encode($response);
