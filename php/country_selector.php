<?php

//function that tries to get Geolocation by IP
function ip_info($ip = NULL, $purpose = "location", $deep_detect = TRUE) {
    $output = NULL;
    if (filter_var($ip, FILTER_VALIDATE_IP) === FALSE) {
        $ip = $_SERVER["REMOTE_ADDR"];
        if ($deep_detect) {
            if (filter_var(@$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP))
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            if (filter_var(@$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP))
                $ip = $_SERVER['HTTP_CLIENT_IP'];
        }
    }
    $purpose    = str_replace(array("name", "\n", "\t", " ", "-", "_"), NULL, strtolower(trim($purpose)));
    $support    = array("country", "countrycode", "state", "region", "city", "location", "address");
    $continents = array(
        "AF" => "Africa",
        "AN" => "Antarctica",
        "AS" => "Asia",
        "EU" => "Europe",
        "OC" => "Australia (Oceania)",
        "NA" => "North America",
        "SA" => "South America"
    );
    if (filter_var($ip, FILTER_VALIDATE_IP) && in_array($purpose, $support)) {
        $ipdat = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=" . $ip));
        if (@strlen(trim($ipdat->geoplugin_countryCode)) == 2) {
            switch ($purpose) {
                case "location":
                    $output = array(
                        "city"           => @$ipdat->geoplugin_city,
                        "state"          => @$ipdat->geoplugin_regionName,
                        "country"        => @$ipdat->geoplugin_countryName,
                        "country_code"   => @$ipdat->geoplugin_countryCode,
                        "continent"      => @$continents[strtoupper($ipdat->geoplugin_continentCode)],
                        "continent_code" => @$ipdat->geoplugin_continentCode
                    );
                    break;
                case "address":
                    $address = array($ipdat->geoplugin_countryName);
                    if (@strlen($ipdat->geoplugin_regionName) >= 1)
                        $address[] = $ipdat->geoplugin_regionName;
                    if (@strlen($ipdat->geoplugin_city) >= 1)
                        $address[] = $ipdat->geoplugin_city;
                    $output = implode(", ", array_reverse($address));
                    break;
                case "city":
                    $output = @$ipdat->geoplugin_city;
                    break;
                case "state":
                    $output = @$ipdat->geoplugin_regionName;
                    break;
                case "region":
                    $output = @$ipdat->geoplugin_regionName;
                    break;
                case "country":
                    $output = @$ipdat->geoplugin_countryName;
                    break;
                case "countrycode":
                    $output = @$ipdat->geoplugin_countryCode;
                    break;
            }
        }
    }
    return $output;
}
//use: ip_info("Visitor", "Country Code");
//*****************************************

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
    
    //gets the language by the browser information
    $lang1 = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    $lang1=strtoupper($lang1);//the language
    
    //gets the country by the browser language information
	$lang_cty = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 3, 2);
	$lang_cty=strtoupper($lang_cty);//the country
    
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
include($_SERVER['DOCUMENT_ROOT'].'/country files/' . $GLOBALS['country'] . '.php');

//gets the correspondent language to input on <html lang"##">, after the correct country file was loaded
//language for <html> tag obeys ISO 639-1 Language Codes (simplified, 2 characters)
$language=$LANGUAGE_CODE; 
//$LANGUAGE_CODE might be of the type "es-419" (latin american spanish) or pt-br (brazilian portuguese)
//gets just the 2 first characters
$language=mb_substr($language, 0, 2);

//some initializations
$is_logo = false;
$currency_logo = "";
?>
