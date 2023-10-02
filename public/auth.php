<?php
session_start();

if (isset($_GET['logout']) && $_GET['logout'] == 'true') {
    session_destroy();
    header('Location: auth.php');
    exit;
}

$errorMessage = '';

if(isset($_POST['submit_user'])) {
    // проверяем наличие отправленных данных
    $login = $_POST['login'];
    $password = $_POST['password'];
    
    $dataFile = __DIR__ . '/data/pswrds.txt';
    $users = file($dataFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach($users as $user) {
        list($fileLogin, $filePassword) = explode(',', $user);
        if(trim($login) === $fileLogin && trim($password) === $filePassword) {
        	$_SESSION['username'] = $login;
            // пользователь авторизован
            header('Location: numberValidator.php');
            exit;
        }
    }
    // пользователь не авторизован
    $errorMessage = 'Wrong login or password';
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Authorization</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div class="form_container">
		<form method="post" id="user_login">
		    <div class="formName">Numbers<span>Validator</span></div>
		    <div class="login">
		        <svg class="input_pic" xmlns="http://www.w3.org/2000/svg">
		            <path class="stroke" d="M2,4h20v16H2V4z"></path>
		            <path class="stroke" d="M2,8l10,5l10-5"></path>
		        </svg>
		        <input class="outline" type="text" name="login" placeholder="Login" required>
		    </div>
		    <div class="password">
		        <svg class="input_pic" xmlns="http://www.w3.org/2000/svg">
		            <path class="fill" d="M19,8V7c0-3.9-3.1-7-7-7S5,3.1,5,7v1h2V7c0-2.8,2.2-5,5-5s5,2.2,5,5v1H19"></path>
		                <path class="stroke" d="M3,9h18v14H3V9z"></path>
		        </svg>
		        <input class="outline" type="password" name="password" placeholder="Password" required>
		    </div>
		    <?php if(!empty($errorMessage)) : ?>
		    <div class="wrong">
		        <?php echo $errorMessage; ?>
		    </div>
		    <?php endif; ?>
		    <div class="submit">
		        <button type="submit" name="submit_user">Sign in</button>
		    </div>
		</form>
	</div>

	<a href="admin_login.php" id="admin_login_button">Admin login</a>

</body>
</html>