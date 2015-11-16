<?php

//favicons
if ($GLOBALS['country'] == "RU") {
	$is_logo = true;
	$currency_logo = "RUB";
	echo '<link rel="icon" href="./images/favicons/favicon_rub.ico" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_rub.ico" type="image/x-icon"/>';		
	echo '<link rel="icon" href="./images/favicons/favicon_rub.ico?v=2" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_rub.ico?v=2" type="image/x-icon"/>';

	echo '<link rel="icon" href="./images/favicons/favicon_rub.png" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_rub.png" type="image/png"/>';		
	echo '<link rel="icon" href="./images/favicons/favicon_rub.png?v=2" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_rub.png?v=2" type="image/png"/>';
} 
elseif ($CURR_SYMBOL == "&euro;") {
	$is_logo = true;
	$currency_logo = "EUR";
	echo '<link rel="icon" href="./images/favicons/favicon_eur.ico" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_eur.ico" type="image/x-icon"/>';
	echo '<link rel="icon" href="./images/favicons/favicon_eur.ico?v=2" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_eur.ico?v=2" type="image/x-icon"/>';
	
	echo '<link rel="icon" href="./images/favicons/favicon_eur.png" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_eur.png" type="image/png"/>';
	echo '<link rel="icon" href="./images/favicons/favicon_eur.png?v=2" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_eur.png?v=2" type="image/png"/>';
} 
elseif (strpos($CURR_SYMBOL, '&#36;') !== FALSE) {
	$is_logo = true; 
	$currency_logo = "DOL";
	echo '<link rel="icon" href="./images/favicons/favicon_dol.ico" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_dol.ico" type="image/x-icon"/>';
	echo '<link rel="icon" href="./images/favicons/favicon_dol.ico?v=2" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_dol.ico?v=2" type="image/x-icon"/>';
	
	echo '<link rel="icon" href="./images/favicons/favicon_dol.png" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_dol.png" type="image/png"/>';
	echo '<link rel="icon" href="./images/favicons/favicon_dol.png?v=2" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_dol.png?v=2" type="image/png"/>';
} 
elseif (strpos($CURR_SYMBOL, '&pound;') !== FALSE) {
	$is_logo = true;
	$currency_logo = "GBP";
	echo '<link rel="icon" href="./images/favicons/favicon_gbp.ico" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_gbp.ico" type="image/x-icon"/>';
	echo '<link rel="icon" href="./images/favicons/favicon_gbp.ico?v=2" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_gbp.ico?v=2" type="image/x-icon"/>';

	echo '<link rel="icon" href="./images/favicons/favicon_gbp.png" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_gbp.png" type="image/png"/>';
	echo '<link rel="icon" href="./images/favicons/favicon_gbp.png?v=2" type="image/png"/>';
	echo '<link rel="shortcut icon" href="./images/favicons/favicon_gbp.png?v=2" type="image/png"/>';
}
else {
	echo '<link rel="icon" href="./favicon.ico" type="image/x-icon"/>';
	echo '<link rel="shortcut icon" href="./favicon.ico" type="image/x-icon"/>';
} 

?>