<?php

echo '<link rel="canonical" href="http://'.
     strtolower($domain_CT[$GLOBALS['country']]).
     '/'.strtoupper($GLOBALS['country']).'" />'.
     "\xA";

foreach ($avail_CT as $key => $value){    
    echo '<link rel="alternate" '. 
         'hreflang="'. substr($lang_CT[$key],0,2) . '-' . strtolower($key=="UK"?"GB":$key) . '" '.
         'href="http://' . $domain_CT[$key].'/'.strtoupper($key). '" />'.
         "\xA";
}
echo "\xA"; //breakline

//From here get the default languages with no region, for example
//<link rel="alternate" hreflang="pt" href="autocustos.info/pt" />

//gets a language list with only no repeated entries
$language_list2 = [];
foreach ($lang_CT as $key => $value){
    $value2=substr($value,0,2);
    if (!in_array($value2, $language_list2)){
        array_push($language_list2, $value2);
    }
}

//sets English language to US
$key = array_search("en", $language_list2);
unset($language_list2[$key]);
echo '<link rel="alternate" hreflang="en" href="http://' . $domain_CT['US'] . '/US" />' . "\xA";
//sets Ukranian language to UA
$key = array_search("uk", $language_list2);
unset($language_list2[$key]);
echo '<link rel="alternate" hreflang="uk" href="http://' . $domain_CT['UA'] . '/UA" />' . "\xA";

foreach ($language_list2 as $key => $value){
    
    //case where languge code equal country code, ex: PT and PT
    if (array_key_exists(strtoupper($value), $domain_CT)){
        $href = $domain_CT[strtoupper($value)].'/'.strtoupper($value);
    }
    //else finds the country of the langyage, ex: CZ for CS
    else{
        $key2 = array_search($value, $lang_CT);
        if($key2){
            $href = $domain_CT[$key2].'/'.strtoupper($key2);
        }
    }
    
    echo '<link rel="alternate" '. 
         'hreflang="'. $value . '" '.
         'href="http://'. $href .'" />'.
         "\xA";
}

?>