<?php

asort($avail_CT); //sorts alphabetically the counties list

$url_cc=strtoupper($_GET["c"]); //uppercase

//if no country is defined or the country isn't in the list
//i.e, if the CC characters in domain.pt/CC are not recognized
if ($url_cc == null || !is_cty_inlist($url_cc, $avail_CT)) {
	
    //gets the country by IP 
    include_once("./php/geo_functions.php");
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
    
    $AC_DOMAIN=$domain_CT[$GLOBALS['country']].'/'.strtoupper($GLOBALS['country']);
    
    if(!isTest()){
        $URLtoRedirect = 'http://'.$AC_DOMAIN;       
    }
    else{
        $URLtoRedirect = 'http://autocosts.work/'.strtoupper($GLOBALS['country']);
    }
    header('Location: '.$URLtoRedirect, true, 302);
    exit;
    
}
//if the CC characters after domain.info/CC ARE recognized as being in the list 
//But if the two-letter code are NOT all in upper case domain.info/CC 
elseif (strtoupper($_GET["c"]) != $_GET["c"]){
    
    $GLOBALS['country'] = strtoupper($_GET["c"]);
    $AC_DOMAIN = $domain_CT[$GLOBALS['country']].'/'.$GLOBALS['country'];
    
    if(!isTest()){
        $URLtoRedirect = 'http://'.$AC_DOMAIN;       
    }
    else{
        $URLtoRedirect = 'http://autocosts.work/'.$GLOBALS['country'];
    }
    header('Location: '.$URLtoRedirect, true, 301);
    exit;   
}
else {
	$GLOBALS['country'] = $url_cc;
    //loads the correspondent country file
    include_once('./countries/' . $GLOBALS['country'] . '.php');
    $AC_DOMAIN=$domain_CT[$GLOBALS['country']].'/'.strtoupper($GLOBALS['country']);
    
    //if the URL is not the valid URL
    //example: autocosts.info/pt shall forward to autocustos.pt/pt 
    if(!crawlByBot($AC_DOMAIN) && !isTest()){
  
        $URLtoRedirect = 'http://'.$AC_DOMAIN;
        header('Location: '.$URLtoRedirect, true, 301);
        exit; 
    }
}
//from here the /CC is recognized 
//AND the URL is correct

//removes XX from array
unset($avail_CT['XX']);

//gets the correspondent language to input on <html lang"##">, after the correct country file was loaded
//language for <html> tag obeys ISO 639-1 Language Codes (simplified, 2 characters)
//$lang_CT[$GLOBALS['country']] might be of the type "es-419" (latin american spanish) or pt-br (brazilian portuguese)
//gets just the 2 first characters
$language=mb_substr($lang_CT[$GLOBALS['country']], 0, 2);

//some initializations
$is_logo = false;
$currency_logo = "";
?>
