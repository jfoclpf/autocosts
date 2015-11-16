<?php 

asort($avail_CT); //sorts alphabetically the counties list

$url_cc = $_GET["c"]; //selected country code from URL
$url_cc=strtoupper($url_cc); //uppercase

//function is country in list
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

//if no country is defined or the country isn't in the list
if ($url_cc == null || !is_cty_inlist($url_cc, $avail_CT)) {
	$lang1 = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
	$lang_cty = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 3, 2);
	
$lang1=strtoupper($lang1);
$lang_cty=strtoupper($lang_cty);        

	if (is_cty_inlist($lang_cty, $avail_CT)) {
		$GLOBALS['country'] = $lang_cty;
	} elseif (is_cty_inlist($lang1, $avail_CT)) {
		$GLOBALS['country'] = $lang1;
	} else {
		$GLOBALS['country'] = "GB";
	}
	echo "<script type=\"text/javascript\"> window.location.href = \"" . $GLOBALS['country'] . "\" </script>";
} else {
	$GLOBALS['country'] = $url_cc;
}

include($_SERVER['DOCUMENT_ROOT'].'/country files/' . $GLOBALS['country'] . '.php');

$is_logo = false;
$currency_logo = "";
?>
