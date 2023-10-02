<?php
// Путь к файлу с логинами и паролями
$passwordFile = __DIR__ . '/data/pswrds.txt';

// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем логин и пароль из POST-запроса
    $login = $_POST['login'] ?? '';
    $password = $_POST['password'] ?? '';

    // Открываем файл с паролями
    $handle = fopen($passwordFile, 'r');

    if ($handle) {
        $isAuthenticated = false;

        // Ищем в файле строку с данным логином и паролем
        while (($line = fgets($handle)) !== false) {
            // Убираем перенос строки в конце строки
            $line = trim($line);

            // Разбиваем строку на логин и пароль
            [$fileLogin, $filePassword] = explode(',', $line, 2);

            // Проверяем, соответствуют ли логин и пароль введенным данным
            if ($fileLogin === $login && $filePassword === $password) {
                $isAuthenticated = true;
                break;
            }
        }

        // Закрываем файл
        fclose($handle);

        if ($isAuthenticated) {
            // Если пользователь успешно авторизовался, перенаправляем его на страницу numberValidator.php
            header('Location: http://localhost/NumberValidation/public/numberValidator.php');
            exit;
        } else {
            // Если введен неверный логин или пароль, показываем ошибку на странице авторизации
            echo '<script>document.querySelector(".wrong").style.display = "flex";</script>';
        }
    } else {
        // Если не удалось открыть файл с паролями, выводим ошибку
        echo 'Error opening password file';
    }
}
?>
