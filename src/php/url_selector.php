<?php

//change accordingly
$IS_HTTPS = true; //false for simple http
$IS_CDN = false; //Content delivery network

//#############################################

//CDN configuration at https://app.keycdn.com/zones
//CDN provider: https://app.keycdn.com/zones
$CDN_URL_PROD="https://cdn.autocosts.info"."/"; //preserve the bar "/" at the end
$CDN_URL_WORK="http://cdn.autocosts.work"."/"; //preserve the bar "/" at the end

if($IS_CDN){
    if(isWorkDomain()){
        $CDN_URL = $CDN_URL_WORK;
    }
    else{
        $CDN_URL = $CDN_URL_PROD;
    }
}
else{
    $CDN_URL = "";
}

if($IS_HTTPS && !isWorkDomain()){
    $HTTP_Protocol = "https://";
}
else{
    $HTTP_Protocol = "http://";
}

asort($avail_CT); //sorts alphabetically the counties list
$url_cc=strtoupper($_GET["c"]); //uppercase

//if no country is defined or the country isn't in the list
//i.e, if the CC characters in domain.info/CC are not recognized
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
    
    //if .work domain - work domain uses http
    if(explode('.', strtolower($_SERVER['HTTP_HOST']))[1]=="work"){
        $URLtoRedirect = 'http://autocosts.work/'.strtoupper($GLOBALS['country']);  
    }
    else{
        $URLtoRedirect = $HTTP_Protocol.$domain_CT[$GLOBALS['country']].'/'.strtoupper($GLOBALS['country']);
    }
    
    header('Location: '.$URLtoRedirect, true, 302); 
    //302 redirects are temporary
    //it's temporary because the redirect might, from a defined starting URL, 
    //redirect to different URLs according to the locale of the user
    exit();
}
//if the CC characters after domain.info/cc ARE recognized as being in the list 
//But if the two-letter code are NOT all in upper case domain.info/CC 
elseif (strtoupper($_GET["c"]) != $_GET["c"]){
    
    $GLOBALS['country'] = $url_cc; //it's already uppercase
    $domain_client = strtolower($_SERVER['HTTP_HOST']);
    
    //if .work domain; work domain uses http
    if(explode('.', strtolower($domain_client))[1]=="work"){
        $URLtoRedirect = 'http://autocosts.work/'.$GLOBALS['country'];
        $redir = 302; //302 redirects are temporary (test version)
    }
    //if test version in any domain
    elseif($GLOBALS['country'] == "XX"){
        $URLtoRedirect = $HTTP_Protocol.$domain_client.'/XX';
        $redir = 302; //302 redirects are temporary (test version)
    }
    //example: autocosts.info/pt (is not valid) shall forward to autocustos.info/PT
    else{
        $URLtoRedirect = $HTTP_Protocol.$domain_CT[$GLOBALS['country']].'/'.$GLOBALS['country'];
        $redir = 301; //301 redirects are permanent
    }
    
    header('Location: '.$URLtoRedirect, true, $redir); //302 redirects are temporary
    exit();
}
//the CC is reconginzed and it's in uppercase
else {
    $GLOBALS['country'] = $url_cc; //it's already uppercase
    $GLOBALS['domain_for_CT'] = $domain_CT[$GLOBALS['country']];

    //if the URL is not the valid URL  
    //example: autocosts.info/PT (is not valid) shall forward to autocustos.info/PT
    if(!crawlByBot() && !isTest()){
        $URLtoRedirect = $HTTP_Protocol.$domain_CT[$GLOBALS['country']].'/'.strtoupper($GLOBALS['country']);
        header('Location: '.$URLtoRedirect, true, 301); //301 redirects are permanent
        exit();
    }
}
//from here the /CC is recognized 
//AND the URL is correct

//forwards http to https
if(!isWorkDomain() && (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off") && $IS_HTTPS){
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirect);
    exit();
}

//loads the correspondent country file
include_once('./countries/' . $GLOBALS['country'] . '.php');

//full URL for this page
$PageURL = $HTTP_Protocol.$domain_CT[$GLOBALS['country']].'/'.strtoupper($GLOBALS['country']);

//removes XX from array
unset($avail_CT['XX']);

//gets the correspondent language to input on <html lang"##">, after the correct country file was loaded
//language for <html> tag obeys ISO 639-1 Language Codes (simplified, 2 characters)
//$lang_CT[$GLOBALS['country']] might be of the type "es-419" (latin american spanish) or pt-br (brazilian portuguese)
//gets just the 2 first characters
$language = mb_substr($lang_CT[$GLOBALS['country']], 0, 2);

//full language code, for example "es-419" for Spanish from Latin America
$LANGUAGE_CODE = $lang_CT[$GLOBALS['country']];

//some initializations
$is_logo = false;
$currency_logo = "";
?>
