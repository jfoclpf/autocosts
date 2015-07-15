<?

if($is_logo){
    switch ($currency_logo){
		case "EUR":
			switch ($def_cty){
				case "PT":
					$logo_file_name = 'autocustos_euro.png';
					break;
				case "ES":
					$logo_file_name = 'autogastos_euro.png';
					break;
				case "IT":
					$logo_file_name = 'autocosti_euro.png';
					break;
				case "DE":
					$logo_file_name = 'autokosten_euro.png';
					break;
				case "NL":
					$logo_file_name = 'autokosten_euro.png';
					break;                    
				case "FR":
					$logo_file_name = 'autocouts_euro.png';
					break;
				case "GR":
					$logo_file_name = 'exodaautokinitou_euro.png';
					break;                    
				default:
					$logo_file_name = 'autocosts_euro.png';
			}
			break;
		case "DOL":
			$logo_file_name = 'autocosts_dollar.png';
			break;
		case "GBP":
			$logo_file_name = 'autocosts_pound.png';
			break;
		case "RUB":
			$logo_file_name = 'autocosts_ruble.png';
			break;
	}
    
	echo '<img src="images/logos/' . $logo_file_name . '" id="ac_logo">';
}
else{   
	echo '<div style="padding-top:14px;"></div>'; //in case no currency logo applies gives a break line
}
?>
