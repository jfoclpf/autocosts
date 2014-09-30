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
		$def_cty = $lang_cty;
	} elseif (is_cty_inlist($lang1, $avail_CT)) {
		$def_cty = $lang1;
	} else {
		$def_cty = "GB";
	}
	echo "<script type=\"text/javascript\"> window.location.href = \"" . $def_cty . "\" </script>";
} else {
	$def_cty = $url_cc;
}

include('./country files/' . $def_cty . '.php');

$is_logo = false;
$currency_logo = "";
?>
