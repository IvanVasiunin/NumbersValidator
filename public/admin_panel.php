<?php
session_set_cookie_params(12 * 60 * 60);
ini_set('session.gc_maxlifetime', 12 * 60 * 60);
session_start();

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Admin panel</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header>
    	<div id="username">Admin panel</div>
    	<div id="service_name">Numbers<span>Validator</span></div>
    	<div class="right">
	    	<a id="exit" title="Exit" href="auth.php?logout=true">
	    		<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	    			<path fill="currentColor" d="M192 365.8L302 256 192 146.2l0 53.8c0 13.3-10.7 24-24 24L48 224l0 64 120 0c13.3 0 24 10.7 24 24l0 53.8zM352 256c0 11.5-4.6 22.5-12.7 30.6L223.2 402.4c-8.7 8.7-20.5 13.6-32.8 13.6c-25.6 0-46.4-20.8-46.4-46.4l0-33.6-96 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l96 0 0-33.6c0-25.6 20.8-46.4 46.4-46.4c12.3 0 24.1 4.9 32.8 13.6L339.3 225.4c8.1 8.1 12.7 19.1 12.7 30.6zm-8 176l80 0c22.1 0 40-17.9 40-40l0-272c0-22.1-17.9-40-40-40l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l80 0c48.6 0 88 39.4 88 88l0 272c0 48.6-39.4 88-88 88l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
	    		</svg>
	    	</a>
    	</div>   
	</header>
	<div class="table_container">
		<table>
		    <tr>
		        <th>User login</th>
		        <th>User password</th>
		        <th>Balance</th>
		    </tr>
		    <?php
		    $pswrdsFile = __DIR__ . '/data/pswrds.txt';
		    $balanceFile = __DIR__ . '/data/balance.txt';

		    $pswrds = array_map('str_getcsv', file($pswrdsFile));
		    $balance = array_map('str_getcsv', file($balanceFile));

		    foreach ($pswrds as $i => $pswrd) {
		        $user = $pswrd[0];
		        $password = $pswrd[1];
		        $balanceAmount = $balance[$i][1];

		        // Display the row with the user information and "Change" buttons
		        echo "<tr>
		                <td>$user</td>
		                <td>
		                    <div class=\"user-password\">$password</div>
		                    <button class=\"change-password-btn\" data-user=\"$user\">Change</button>
		                </td>
		                <td>
		                    <div class=\"user-balance\">$balanceAmount</div>
		                    <button class=\"change-balance-btn\" data-user=\"$user\">Change</button>
		                </td>
		            </tr>";
		    }
		    ?>
		</table>
	</div>

	<div class="new_user_container">
		<div id="new_user">Add new user</div>
	</div>

	<div id="new_user_modal" class="modal">
		<form class="modal-content" method="post" action="add_user.php">
	    	<span id="closeNewUser">&times;</span>
	    	<div class="add_name">Adding new user</div>
	    	<input type="text" name="new_login" placeholder="Username" required>
	    	<input type="text" name="new_password" placeholder="Password" required>
	    	<input type="number" name="new_balance" placeholder="Balance" required>
	    	<input type="submit" name="submit_new" value="Add">
		</form>
	</div>
	
	<script src="js/adminPanel.js"></script>
</body>
</html>