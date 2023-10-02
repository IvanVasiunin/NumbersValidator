<?php
session_set_cookie_params(12 * 60 * 60);
ini_set('session.gc_maxlifetime', 12 * 60 * 60);
session_start();

$balanceFile = __DIR__ . '/data/balance.txt';
$balance = '';

if (isset($_SESSION['username'])) {
	    if (file_exists($balanceFile)) {
	    $balances = file($balanceFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
	    
	    foreach ($balances as $balanceData) {
	        list($user, $userBalance) = explode(',', $balanceData);
	        if ($user == $_SESSION['username']) {
	            $balance = $userBalance;
	            break;
	        }
	    }
	}
} else {
    header('Location: auth.php');
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Numbers validator</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/flag-icon-css/css/flag-icon.min.css" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>

	<div id="preloaderContainer">
		<div id="circle">
		  <div class="loader">
		    <div class="loader">
		        <div class="loader">
		           <div class="loader">

		           </div>
		        </div>
		    </div>
		  </div>
		</div> 
	</div>

	<header>
    	<div id="username"><?php echo $_SESSION['username']; ?></div>
    	<div id="service_name">Numbers<span>Validator</span></div>
    	<div class="right">
	    	<div id="balance">Balance: <?php echo $balance; ?> $</div>
	    	<a id="exit" title="Exit" href="auth.php?logout=true">
	    		<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M192 365.8L302 256 192 146.2l0 53.8c0 13.3-10.7 24-24 24L48 224l0 64 120 0c13.3 0 24 10.7 24 24l0 53.8zM352 256c0 11.5-4.6 22.5-12.7 30.6L223.2 402.4c-8.7 8.7-20.5 13.6-32.8 13.6c-25.6 0-46.4-20.8-46.4-46.4l0-33.6-96 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l96 0 0-33.6c0-25.6 20.8-46.4 46.4-46.4c12.3 0 24.1 4.9 32.8 13.6L339.3 225.4c8.1 8.1 12.7 19.1 12.7 30.6zm-8 176l80 0c22.1 0 40-17.9 40-40l0-272c0-22.1-17.9-40-40-40l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l80 0c48.6 0 88 39.4 88 88l0 272c0 48.6-39.4 88-88 88l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z" class=""></path></svg>
	    	</a>
    	</div>   
	</header>
	

  <div class="checker_container">
	  	<div class="block">
		    <h2>Remove unnecessary symbols</h2>
		    <input type="file" id="input-file-1" accept=".xls,.xlsx">
	  		<label class="selectLabel" for="input-file-1" data-file-name="Select the file">Select the file</label>
	  		<div class="additional_info">
	  			<a href="#about_remove_service" id="about_1">About</a>	    
	  			<a href="#how_to_use_remove_service" id="how_to_use_1">How to use</a>	    
	  			<a href="#examples_remove_service" id="examples_1">Examples</a>
	  		</div>
	  		<div class="price">Price: 0.001$/number</div>	    
		    <button id="submit-btn-1">Remove</button>
		</div>
		<div id="modal_use_1" class="modal">
			<div class="modal-use">
				<span id="close_use_1">&times;</span>
				<h2>«Remove unnecessary symbols»</h2>
				<h3>How to use:</h3>
				<ol>
					<li>Click «Select the file».</li>
					<li>Select .xls/.xlsx file from your PC.*</li>
					<li>Click «Remove» button.</li>
					<li>Wait till the unnecessary symbols will be removed.</li>
					<li>The file with fixed numbers will be automatically downloaded to your computer.</li>
				</ol>
				<p class="notes">* Note: only numbers in first column will be fixed, so please make sure that all numbers have been loaded into «A» column in Excel.</p>
				<p class="notes">** Note: not recommended to download a file with more than 100,000 numbers at a time.</p>
				<p class="notes warning">WARNING! Files with incorrectly filled out data can cause the service to freeze and missing results, and you can lose money for this operation. Load the file with the numbers in column «A» only.</p>
			</div>
		</div>

		<div id="modal_example_1" class="modal">
			<div class="modal-example">
				<span id="close_example_1">&times;</span>
				<h2>«Remove unnecessary symbols»</h2>
				<h3>Example:</h3>
				<img src="img/remove_example.jpg">
			</div>
		</div>

		<div id="modal_about_1" class="modal">
			<div class="modal-about">
				<span id="close_about_1">&times;</span>
				<h2>«Remove unnecessary symbols»</h2>
				<h3>About:</h3>
				<p class="about_text">Removes unnecessary symbols such as :+№#@"'$?*()-_/*, etc. Also removes letters and other characters, thus leaving only phone numbers.</p>
			</div>
		</div>

		<div id="error-modal" class="modal">
			<div class="modal-content">
		    	<span id="close">&times;</span>
		    	<p>Please select the file</p>
			</div>
		</div>

	  <div class="block">
	    <h2>Transform numbers to e.164</h2>
	    <input type="file" id="input-file-2" accept=".xls,.xlsx">
	  	<label class="selectLabel" for="input-file-2" data-file-name="Select the file">Select the file</label>
	  	<div class="transform_type">
	  		<div id="transform_group" class="active">Group transformation</div>
	  		<div id="transform_single">Single transformation</div>
	  	</div>

	  	<input type="tel" id="phone-number" name="phone-number" placeholder="Enter your phone number" required>


	    <select id="countries-select">
		  <option value="">Select a country</option>
		  <option value="AF">Afghanistan</option>
		  <option value="AX">Aland Islands</option>
		  <option value="AL">Albania</option>
		  <option value="DZ">Algeria</option>
		  <option value="AS">American Samoa</option>
		  <option value="AD">Andorra</option>
		  <option value="AO">Angola</option>
		  <option value="AI">Anguilla</option>
		  <option value="AG">Antigua and Barbuda</option>
		  <option value="AR">Argentina</option>
		  <option value="AM">Armenia</option>
		  <option value="AW">Aruba</option>
		  <option value="AU">Australia</option>
		  <option value="AT">Austria</option>
		  <option value="AZ">Azerbaijan</option>
		  <option value="BS">Bahamas</option>
		  <option value="BH">Bahrain</option>
		  <option value="BD">Bangladesh</option>
		  <option value="BB">Barbados</option>
		  <option value="BY">Belarus</option>
		  <option value="BE">Belgium</option>
		  <option value="BZ">Belize</option>
		  <option value="BJ">Benin</option>
		  <option value="BM">Bermuda</option>
		  <option value="BT">Bhutan</option>
		  <option value="BO">Bolivia</option>
		  <option value="BA">Bosnia and Herzegovina</option>
		  <option value="BW">Botswana</option>
		  <option value="BV">Bouvet Island</option>
		  <option value="BR">Brazil</option>
		  <option value="IO">British Indian Ocean Territory</option>
		  <option value="VG">British Virgin Islands</option>
		  <option value="BN">Brunei Darussalam</option>
		  <option value="BG">Bulgaria</option>
		  <option value="BF">Burkina Faso</option>
		  <option value="BI">Burundi</option>
		  <option value="KH">Cambodia</option>
		  <option value="CM">Cameroon</option>
		  <option value="CA">Canada</option>
		  <option value="CV">Cape Verde</option>
	      <option value="KY">Cayman Islands</option>
	      <option value="CF">Central African Republic</option>
	      <option value="TD">Chad</option>
	      <option value="CL">Chile</option>
	      <option value="CN">China</option>
	      <option value="CX">Christmas Island</option>
	      <option value="CC">Cocos (Keeling) Islands</option>
	      <option value="CO">Colombia</option>
	      <option value="KM">Comoros</option>
	      <option value="CD">Congo, Democratic Republic</option>
	      <option value="CG">Congo-Brazzaville</option>
	      <option value="CK">Cook Islands</option>
	      <option value="CR">Costa Rica</option>
	      <option value="HR">Croatia</option>
	      <option value="CU">Cuba</option>
	      <option value="CW">CuraCao</option>
	      <option value="CY">Cyprus</option>
	      <option value="CZ">Czechia</option>
		  <option value="CI">Côte d'Ivoire</option>
		  <option value="DK">Denmark</option>
		  <option value="DJ">Djibouti</option>
		  <option value="DM">Dominica</option>
		  <option value="DO">Dominican Republic</option>
		  <option value="EC">Ecuador</option>
		  <option value="EG">Egypt</option>
		  <option value="SV">El Salvador</option>
		  <option value="GQ">Equatorial Guinea</option>
		  <option value="ER">Eritrea</option>
		  <option value="EE">Estonia</option>
		  <option value="SZ">Eswatini</option>
		  <option value="ET">Ethiopia</option>
		  <option value="FK">Falkland Islands</option>
		  <option value="FO">Faroe Islands</option>
		  <option value="FJ">Fiji</option>
		  <option value="FI">Finland</option>
		  <option value="FR">France</option>
		  <option value="RE">France Reunion</option>
		  <option value="GF">French Guiana</option>
		  <option value="PF">French Polynesia</option>
		  <option value="GA">Gabon</option>
		  <option value="GM">Gambia</option>
		  <option value="GE">Georgia</option>
		  <option value="DE">Germany</option>
		  <option value="GH">Ghana</option>
		  <option value="GI">Gibraltar</option>
		  <option value="GR">Greece</option>
		  <option value="GL">Greenland</option>
		  <option value="GD">Grenada</option>
		  <option value="GP">Guadeloupe</option>
		  <option value="GU">Guam</option>
		  <option value="GT">Guatemala</option>
		  <option value="GG">Guernsey</option>
		  <option value="GN">Guinea</option>
		  <option value="GW">Guinea-Bissau</option>
		  <option value="GY">Guyana</option>
		  <option value="HT">Haiti</option>
		  <option value="HN">Honduras</option>
		  <option value="HK">Hong Kong</option>
		  <option value="HU">Hungary</option>
		  <option value="IS">Iceland</option>
		  <option value="IN">India</option>
		  <option value="ID">Indonesia</option>
		  <option value="IR">Iran</option>
		  <option value="IQ">Iraq</option>
		  <option value="IE">Ireland</option>
		  <option value="IM">Isle of Man</option>
		  <option value="IL">Israel</option>
		  <option value="IT">Italy</option>
		  <option value="JM">Jamaica</option>
		  <option value="JP">Japan</option>
		  <option value="JE">Jersey</option>
		  <option value="JO">Jordan</option>
		  <option value="KZ">Kazakhstan</option>
		  <option value="KE">Kenya</option>
		  <option value="KI">Kiribati</option>
	      <option value="XK">Kosovo</option>
	      <option value="KW">Kuwait</option>
	      <option value="KG">Kyrgyzstan</option>
	      <option value="LA">Laos</option>
	      <option value="LV">Latvia</option>
	      <option value="LB">Lebanon</option>
	      <option value="LS">Lesotho</option>
	      <option value="LR">Liberia</option>
	      <option value="LY">Libya</option>
	      <option value="LI">Liechtenstein</option>
	      <option value="LT">Lithuania</option>
	      <option value="LU">Luxembourg</option>
	      <option value="MO">Macau</option>
	      <option value="MG">Madagascar</option>
	      <option value="MW">Malawi</option>
	      <option value="MY">Malaysia</option>
	      <option value="MV">Maldives</option>
	      <option value="ML">Mali</option>
	      <option value="MT">Malta</option>
	      <option value="MH">Marshall Islands</option>
	      <option value="MQ">Martinique</option>
	      <option value="MR">Mauritania</option>
	      <option value="MU">Mauritius</option>
	      <option value="YT">Mayotte</option>
	      <option value="MX">Mexico</option>
	      <option value="FM">Micronesia</option>
	      <option value="MD">Moldova</option>
	      <option value="MC">Monaco</option>
	      <option value="MN">Mongolia</option>
	      <option value="ME">Montenegro</option>
	      <option value="MS">Montserrat</option>
	      <option value="MA">Morocco</option>
	      <option value="MZ">Mozambique</option>
	      <option value="MM">Myanmar</option>
	      <option value="NA">Namibia</option>
	      <option value="NR">Nauru</option>
	      <option value="NP">Nepal</option>
	      <option value="NL">Netherlands</option>
	      <option value="NC">New Caledonia</option>
	      <option value="NZ">New Zealand</option>
	      <option value="NI">Nicaragua</option>
	      <option value="NE">Niger</option>
	      <option value="NG">Nigeria</option>
	      <option value="NU">Niue</option>
	      <option value="NF">Norfolk Island</option>
  		  <option value="KP">North Korea</option>
		  <option value="MP">Northern Mariana Islands</option>
		  <option value="NO">Norway</option>
		  <option value="OM">Oman</option>
		  <option value="PK">Pakistan</option>
		  <option value="PW">Palau</option>
		  <option value="PS">Palestine</option>
		  <option value="PA">Panama</option>
		  <option value="PG">Papua New Guinea</option>
		  <option value="PY">Paraguay</option>
		  <option value="PE">Peru</option>
		  <option value="PH">Philippines</option>
		  <option value="PN">Pitcairn Islands</option>
		  <option value="PL">Poland</option>
	      <option value="PT">Portugal</option>
	      <option value="PR">Puerto Rico</option>
	      <option value="QA">Qatar</option>
	      <option value="MK">Republic of North Macedonia</option>
	      <option value="RO">Romania</option>
	      <option value="RU">Russia</option>
	      <option value="RW">Rwanda</option>
	      <option value="BL">Saint Barthelemy</option>
	      <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
	      <option value="KN">Saint Kitts and Nevis</option>
	      <option value="LC">Saint Lucia</option>
	      <option value="MF">Saint Martin</option>
	      <option value="PM">Saint Pierre and Miquelon</option>
	      <option value="VC">Saint Vincent and the Grenadines</option>
	      <option value="WS">Samoa</option>
	      <option value="SM">San Marino</option>
	      <option value="ST">Sao Tome and Principe</option>
	      <option value="SA">Saudi Arabia</option>
	      <option value="SN">Senegal</option>
	      <option value="RS">Serbia</option>
	      <option value="SC">Seychelles</option>
	      <option value="SL">Sierra Leone</option>
	      <option value="SG">Singapore</option>
	      <option value="SX">Sint Maarten</option>
	      <option value="SK">Slovakia</option>
	      <option value="SI">Slovenia</option>
	      <option value="SB">Solomon Islands</option>
	      <option value="SO">Somalia</option>
	      <option value="ZA">South Africa</option>
	      <option value="GS">South Georgia and Sandwich</option>
	      <option value="KR">South Korea</option>
	      <option value="SS">South Sudan</option>
	      <option value="ES">Spain</option>
	      <option value="LK">Sri Lanka</option>
	      <option value="SD">Sudan</option>
	      <option value="SR">Suriname</option>
	      <option value="SJ">Svalbard and Jan Mayen</option>
	      <option value="SE">Sweden</option>
	      <option value="CH">Switzerland</option>
	      <option value="SY">Syria</option>
	      <option value="TW">Taiwan</option>
		  <option value="TJ">Tajikistan</option>
		  <option value="TZ">Tanzania</option>
		  <option value="TH">Thailand</option>
		  <option value="TL">Timor-Leste</option>
		  <option value="TG">Togo</option>
		  <option value="TK">Tokelau</option>
		  <option value="TO">Tonga</option>
		  <option value="TT">Trinidad and Tobago</option>
		  <option value="TN">Tunisia</option>
		  <option value="TM">Turkmenistan</option>
		  <option value="TC">Turks and Caicos Islands</option>
		  <option value="TV">Tuvalu</option>
		  <option value="TR">Türkiye</option>
		  <option value="VI">U.S. Virgin Islands</option>
		  <option value="UG">Uganda</option>
		  <option value="UA">Ukraine</option>
		  <option value="AE">United Arab Emirates</option>
		  <option value="GB">United Kingdom</option>
		  <option value="US">United States</option>
		  <option value="UY">Uruguay</option>
		  <option value="UZ">Uzbekistan</option>
		  <option value="VU">Vanuatu</option>
		  <option value="VA">Vatican</option>
		  <option value="VE">Venezuela</option>
		  <option value="VN">Vietnam</option>
		  <option value="WF">Wallis and Futuna</option>
		  <option value="YE">Yemen</option>
		  <option value="ZM">Zambia</option>
		  <option value="ZW">Zimbabwe</option>
		</select>

		<div id="selector_container">
			<select id="cities-select">
				<option value="">Select the city</option>
			</select>
		</div>

		<div id="modal_use_2" class="modal">
			<div class="modal-use">
				<span id="close_use_2">&times;</span>
				<h2>«Transform numbers to e.164»</h2>
				<h3>How to use:</h3>
				<h4>Group transformation</h4>
				<ol>
					<li>Click «Select the file».</li>
					<li>Select .xls/.xlsx the file from your PC.</li>
					<li>In Excel column «A», you need to enter the numbers you want to transform. Column «B» may contain cities matching the number, but this column is optional. The name of the city can help to transform the number into E164 format if the number is specified in the local format.<br>For example: the local number - 290-73-07, in this case for the transformation into the format E164 you need to know the city code. If we specify, for example, the Kiev city, the result will be - 380442907307. *</li>
					<li>Select the country which numbers you want to transform from the dropdown list.</li>
					<li>When the file has been uploaded, click the «Transform» button.</li>
					<li>Wait till the transformation ends.</li>
					<li>The file with transformed numbers will be automatically downloaded to your computer.</li>
				</ol>
				<p class="notes">* Note: not recommended to download a file with more than 50,000 numbers at a time.</p>
				<h4>Single transformation.</h4>
				<ol>
					<li>Click «Single transformation» button.</li>
					<li>Enter the phone number you want to transform.</li>
					<li>Select the country which number you want to transform from the dropdown list.</li>
					<li>Select a city from the list of available cities if you convert the number in local format.**</li>
					<li>Click the «Transform» button.</li>
					<li>The transformed number will be in the «Transformed number» field.</li>
				</ol>
				<p class="notes">** Note: our database contains more than 280,000 area and city codes, but unfortunately, for some cities the required code may not be available. In this case, you will not be able to transform the number in the local format.</p>
				<p class="notes warning">WARNING! Files with incorrectly filled out data can cause the service to freeze and missing results, and you can lose money for this operation. Load the file with the numbers in column «A» and cities in column «B» (optionally).</p>
			</div>
		</div>

		<div id="modal_example_2" class="modal">
			<div class="modal-example">
				<span id="close_example_2">&times;</span>
				<h2>«Transform numbers to e.164»</h2>
				<h3>Examples:</h3>
				<h4>Group transformation with empty «City» column:</h4>
				<img src="img/transform_group_withoutCity_example.jpg">
				<h4>Group transformation with filled «City» column:</h4>
				<img src="img/transform_group_withCity_example.jpg">
				<h4>Single transformation with empty «City» field:</h4>
				<img src="img/transform_single_withoutCity.jpg">
				<h4>Single transformation with filled «City» field:</h4>
				<img src="img/transform_single_withCity.jpg">
			</div>
		</div>

		<div id="modal_about_2" class="modal">
			<div class="modal-about">
				<span id="close_about_2">&times;</span>
				<h2>«Transform numbers to e.164»</h2>
				<h3>About:</h3>
				<p class="about_text">
					Transforms numbers from other formats (International, National, RFC3966, etc) to E164 format.</p>
				<p class="about_text">
					Two types of transformation are available: group and single. The group transformation involves loading the data from an Excel file. For a single transformation, just enter the data in the appropriate tab in the browser.
				</p>
			</div>
		</div>

		<div id="result_transform_title">
			Transformed number:
		</div>

		<div id="transformResult"></div>

		<div class="additional_info">
			<a href="#about_transformation_service" id="about_2">About</a>	    
	  		<a href="#how_to_use_transformation_service" id="how_to_use_2">How to use</a>	    
	  		<a href="#examples_transformation_service" id="examples_2">Examples</a>
		</div>
		<div class="price">Price: 0.005$/number</div>	
	    <button id="submit-btn-2">Transform</button>
	  </div>

	  <div id="error-select" class="modal">
			<div class="modal-content">
		    	<span id="closeSelect">&times;</span>
		    	<p>Please select the country</p>
			</div>
		</div>

		<div id="error-number" class="modal">
			<div class="modal-content">
		    	<span id="closeNumber">&times;</span>
		    	<p>Please enter the number</p>
			</div>
		</div>
  </div>

  <div class="checker_container">
  	<div class="block">
	    <h2>Check your numbers</h2>
	    <input type="file" id="input-file-3" accept=".xls,.xlsx">
  		<label class="selectLabel" for="input-file-3" data-file-name="Select the file">Select the file</label>
  		<div class="additional_info">
	  		<a href="#about_check_service" id="about_3">About</a>	  
	  		<a href="#how_to_use_check_service" id="how_to_use_3">How to use</a>	    
	  		<a href="#examples_check_service" id="examples_3">Examples</a>
	  	</div>
	  	<div class="price">Price: 0.005$/number</div>
	    <button id="submit-btn-3">Check</button>

	    <div id="modal_use_3" class="modal">
			<div class="modal-use">
				<span id="close_use_3">&times;</span>
				<h2>«Check your numbers»</h2>
				<h3>How to use:</h3>
				<ol>
					<li>Click «Select the file».</li>
					<li>Select .xls/.xlsx file from your PC.*</li>
					<li>Click «Check» button.</li>
					<li>Wait until the check is complete.</li>
					<li>The file with checked numbers will be automatically downloaded to your computer.</li>
				</ol>
				<p class="notes">* Note: only numbers in first column will be checked, so please make sure that all numbers have been loaded into «A» column in Excel.</p>
				<p class="notes">** Note: not recommended to download a file with more than 50,000 numbers at a time.</p>
				<p class="notes warning">WARNING! Files with incorrectly filled out data can cause the service to freeze and missing results, and you can lose money for this operation. Load the file with the numbers in column «A» only.</p>
			</div>
		</div>

		<div id="modal_example_3" class="modal">
			<div class="modal-example">
				<span id="close_example_3">&times;</span>
				<h2>«Check your numbers»</h2>
				<h3>Example:</h3>
				<img src="img/check_example.jpg">
			</div>
		</div>

		<div id="modal_about_3" class="modal">
			<div class="modal-about">
				<span id="close_about_3">&times;</span>
				<h2>«Check your numbers»</h2>
				<h3>About:</h3>
				<p class="about_text">Service performs the following checks:
					<ul>
						<li>Valid number or not (checks the number length for a certain country and all possible numbering plans).*</li>
						<li>The type of a phone number.**</li>
						<li>The country to which phone number belongs.</li>
						<li>The city to which the phone number belongs (only for fixed numbers).</li>
						<li>The mobile operator to which the number belongs (only for mobile numbers).</li>
					</ul>
				</p>
				<p class="notes">* Note: the «Valid number» value confirms that the number has the correct length, numbering plan and exists. But it doesn't mean that it's in the network and you are guaranteed to be able to reach it.</p>
				<p class="notes">** Note: Possible number types:
					<ul>
						<li>FIXED_LINE - fixed line</li>
						<li>MOBILE - mobile number</li>
						<li>FIXED_LINE_OR_MOBILE - fixed line or mobile number</li>
						<li>TOLL_FREE - toll-free number</li>
						<li>PREMIUM_RATE - premium-rate number</li>
						<li>SHARED_COST - shared-cost number</li>
						<li>VOIP - voice over IP number</li>
						<li>PERSONAL_NUMBER - personal number</li>
						<li>PAGER - pager number</li>
						<li>UAN - universal access number</li>
						<li>VOICEMAIL - voicemail number</li>
						<li>UNKNOWN - unknown number type</li>
					</ul>
				</p>
			</div>
		</div>
	  </div>

	  

	  <div class="block">
	    <h2>Add/replace symbols</h2>
	    <input type="file" id="input-file-4" accept=".xls,.xlsx">
  		<label class="selectLabel" for="input-file-4" data-file-name="Select the file">Select the file</label>
  		<div class="container">
		  <div class="inputs_row_remove">
		    <div class="title">
		      <input type="radio" name="action" id="remove" />
		      <label for="remove">Remove</label>
		    </div>
		    <div class="inputs">
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		    </div>
		  </div>
		  <div class="inputs_row_add">
		    <div class="title">
		      <input type="radio" name="action" id="add" />
		      <label for="add">Add</label>
		    </div>
		    <div class="inputs">
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		      <input type="text" maxlength="1" />
		    </div>
		  </div>
		</div>
  		<div class="additional_info">
	  		<a href="#about_add_remove_service" id="about_4">About</a><a href="#how_to_use_add_remove_service" id="how_to_use_4">How to use</a>	    
	  		<a href="#examples_add_remove_service" id="examples_4">Examples</a>
	  	</div>
	  	<div class="price">Price: 0.001$/number</div>
	    <button id="submit-btn-4">Perform</button>

	    <div id="modal_use_4" class="modal">
			<div class="modal-use">
				<span id="close_use_4">&times;</span>
				<h2>«Add/replace symbols»</h2>
				<h3>How to use:</h3>
				<ol>
					<li>Click «Select the file».</li>
					<li>Select .xls/.xlsx file from your PC.*</li>
					<li>Select «Remove» or «Add» option.</li>
					<li>Enter the numbers on the positions from/to which you want to remove/add them.</li>
					<li>Click «Perform» button.</li>
					<li>Wait for the numbers will be removed/added.</li>
					<li>File with the fixed numbers will be loaded to your PC automaticly.</li>
				</ol>
				<p class="notes">* Note: only numbers in first column will be fixed, so please make sure that all numbers have been loaded into «A» column in Excel.</p>
				<p class="notes">** Note: not recommended to download a file with more than 100,000 numbers at a time.</p>
				<p class="notes warning">WARNING! Files with incorrectly filled out data can cause the service to freeze and missing results, and you can lose money for this operation. Load the file with the numbers in column «A» only.</p>
			</div>
		</div>

		<div id="modal_example_4" class="modal">
			<div class="modal-example">
				<span id="close_example_4">&times;</span>
				<h2>«Add/replace symbols»</h2>
				<h3>Examples:</h3>
				<h4>Removing symbols from numbers</h4>
				<img src="img/remove_exmpl.jpg">
				<h4>Adding symbols to numbers</h4>
				<img src="img/add_exmpl.jpg">
			</div>
		</div>

		<div id="modal_about_4" class="modal">
			<div class="modal-about">
				<span id="close_about_4">&times;</span>
				<h2>«Add/replace symbols»</h2>
				<h3>About:</h3>
				<p class="about_text">Adds and removes symbols and numbers from the required positions.</p>
			</div>
		</div>

		<div id="error-action" class="modal">
			<div class="modal-content">
		    	<span id="closeAction">&times;</span>
		    	<p>Please select an action («Add» or «Remove»)</p>
			</div>
		</div>

		<div id="no-funds" class="modal">
			<div class="modal-content">
		    	<span id="closeNoFunds">&times;</span>
		    	<p>Insufficient funds</p>
			</div>
		</div>
	  </div>

	  
  </div>
  

  <script src="js/jquery.js"></script>
  <script type="module" src="js/bundle.js"></script>




</body>
</html>
