<?php
include_once('_list.php');

$file = fopen("_hreflang.php", "w");

unset($avail_CT["XX"]);

//creates an array with all domains and all languages
$domain_list = []; $language_list = [];
foreach ($avail_CT as $key => $value){
    include('./' . $key . '.php');
    $domain_list[$key] = 'http://'.strtolower($AC_DOMAIN).(!explode("/",$AC_DOMAIN)[1]?('/'.strtolower($key)):'');
    $language_list[$key] = strtolower(mb_substr($LANGUAGE_CODE, 0, 2));
}

foreach ($avail_CT as $key1 => $value1){    
    $txt = '<link rel="alternate" '. 
           'hreflang="'. $language_list[$key1] . '-' . strtolower($key1=="UK"?"GB":$key1) . '" '.
           'href="' . $domain_list[$key1] . '" />'.
           "\xA";
    
    fwrite($file, $txt);
}

//breakline
fwrite($file, "\xA");

//From here get the default languages with no region, for example
//<link rel="alternate" hreflang="pt" href="autocustos.info/pt" />

//gets a language list with only no repeated entries
$language_list2 = [];
foreach ($language_list as $key => $value){
    if (!in_array($value, $language_list2)){
        array_push($language_list2, $value);
    }
}

//sets English language to US
$key = array_search("en", $language_list2);
unset($language_list2[$key]);
$txt = '<link rel="alternate" hreflang="en" href="' . $domain_list['US'] . '" />' . "\xA";
fwrite($file, $txt);

//sets Ukranian language to UA
$key = array_search("uk", $language_list2);
unset($language_list2[$key]);
$txt = '<link rel="alternate" hreflang="uk" href="' . $domain_list['UA'] . '" />' . "\xA";
fwrite($file, $txt);

foreach ($language_list2 as $key => $value){
    
    //case where languge code equal country code, ex: PT and PT
    if (array_key_exists(strtoupper($value), $domain_list)){
        $href = $domain_list[strtoupper($value)];
    }
    //else finds the country of the langyage, ex: CZ for CS
    else{
        $key2 = array_search($value, $language_list);
        if($key2){
            $href = $domain_list[$key2];
        }
    }
    
    $txt = '<link rel="alternate" '. 
           'hreflang="'. $value . '" '.
           'href="'. $href .'" />'.
           "\xA";
    
    fwrite($file, $txt);
}

fclose($file); 

?>