<?php

//function that informs if a country is in the list of available countries
function is_cty_inlist($cc, $c_array)
{ //cc=country code
	if ($cc == null) {
		return false;
	}
	foreach ($c_array as $key => $value) {
		if ($key == $cc) {
			return true;
		}
	}
	return false;
}
//*****************


asort($avail_CT); //sorts alphabetically the counties list

$url_cc = $_GET["c"]; //selected country code from URL
$url_cc=strtoupper($url_cc); //uppercase

//if no country is defined or the country isn't in the list
if ($url_cc == null || !is_cty_inlist($url_cc, $avail_CT)) {
	
    //gets the country by IP 
    $geo_cc = ip_info("Visitor", "Country Code");
    $geo_cc=strtoupper($geo_cc); //uppercase
    
    //gets the country by the browser language information
	$lang_cty = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 3, 2);
	$lang_cty=strtoupper($lang_cty);//the country
    
    //gets the language by the browser information
    $lang1 = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    $lang1=strtoupper($lang1);//the language
    
    if (is_cty_inlist($geo_cc, $avail_CT)) {
		$GLOBALS['country'] = $geo_cc;
	} elseif (is_cty_inlist($lang_cty, $avail_CT)) {
		$GLOBALS['country'] = $lang_cty;
	} elseif (is_cty_inlist($lang1, $avail_CT)) {
		$GLOBALS['country'] = $lang1;
	} else {
		$GLOBALS['country'] = "UK";
	}
	echo "<script type=\"text/javascript\"> window.location.href = \"" . $GLOBALS['country'] . "\" </script>";
} else {
	$GLOBALS['country'] = $url_cc;
}

//loads the correspondent country file
include($_SERVER['DOCUMENT_ROOT'].'/countries/' . $GLOBALS['country'] . '.php');

//gets the correspondent language to input on <html lang"##">, after the correct country file was loaded
//language for <html> tag obeys ISO 639-1 Language Codes (simplified, 2 characters)
$language=$LANGUAGE_CODE; 
//$LANGUAGE_CODE might be of the type "es-419" (latin american spanish) or pt-br (brazilian portuguese)
//gets just the 2 first characters
$language=mb_substr($language, 0, 2);

//detects city of user
$geo_city = ip_info("Visitor", "city");

//some initializations
$is_logo = false;
$currency_logo = "";
?>
