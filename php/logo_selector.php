<?  switch ($currency_logo){
		case "EUR":
			switch ($def_cty){
				case "PT":
					echo '<img src="images/autocustos_euro.png" id="ac_logo">';
					break;
				default:
				echo '<img src="images/autocosts_euro.png" id="ac_logo">';
			}
			break;
		case "DOL":
			echo '<img src="images/autocosts_dollar.png" id="ac_logo">';
			break;
		case "GBP":
			echo '<img src="images/autocosts_pound.png" id="ac_logo">';
			break;
		case "RUB":
			echo '<img src="images/autocosts_ruble.png" id="ac_logo">';
			break;
	}
	
	if(!$is_logo) echo '<div style="padding-top:14px;"></div>'; //in case there no currency logo applies gives a break line
?>
