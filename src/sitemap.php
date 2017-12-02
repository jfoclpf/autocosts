<?php header('Content-type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>';
include_once('./countries/list.php');?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

<!-- Domain Name Policy (DNP) in: https://github.com/jfoclpf/autocosts/wiki/Domain-name-policy -->

<?php
    //removes XX element from country list
    unset($avail_CT["XX"]);
    
    //creates an array with all domains and all languages
    $domain_list = []; $language_list = [];
    foreach ($avail_CT as $key => $value){
        $domain_list[$key] = 'https://'.strtolower($domain_CT[$key]).'/'.strtoupper($key);
        $language_list[$key] = mb_substr($lang_CT[$key], 0, 2);
    }
    
    foreach ($avail_CT as $key1 => $value1){
        echo "\t<url>\xA";
        echo "\t\t<loc>";
        echo $domain_list[$key1];
        echo "</loc>\xA";
        echo "\t\t<changefreq>weekly</changefreq>\xA";
        echo "\t\t\t".'<xhtml:link rel="alternate" hreflang="x-default" href="https://autocosts.info/" />'."\xA";
        
        foreach ($avail_CT as $key2 => $value2){
            if($key2 != $key1){
                echo "\t\t\t" . '<xhtml:link rel="alternate" '. 
                     'hreflang="'. strtolower($language_list[$key2]) . '-' . strtolower($key2=="UK"?"GB":$key2) . '" '.
                     'href="' . $domain_list[$key2] . '" />'.
                     "\xA";
            }
        }
        echo "\t\t\t" . '<xhtml:link rel="alternate" '. 
             'hreflang="'. strtolower($language_list[$key1]) . '-' . strtolower($key1=="UK"?"GB":$key1) . '" '.
             'href="' . $domain_list[$key1] . '" />'.
             "\xA";
             
      
        //From here get the default languages with no region, for example
        //gets a language list with only no repeated entries, for example to:
        //<link rel="alternate" hreflang="pt" href="autocustos.info/pt" />
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
        echo "\t\t\t" . '<xhtml:link rel="alternate" hreflang="en" href="https://' . $domain_CT['US'] . '/US" />' . "\xA";
        //sets Ukranian language to UA
        $key = array_search("uk", $language_list2);
        unset($language_list2[$key]);
        echo "\t\t\t" . '<xhtml:link rel="alternate" hreflang="uk" href="https://' . $domain_CT['UA'] . '/UA" />' . "\xA";
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
            
            echo "\t\t\t" . '<xhtml:link rel="alternate" '. 
                 'hreflang="'. $value . '" '.
                 'href="https://'. $href .'" />'.
                 "\xA";
        }
        echo "\t</url>\xA";
    }
    
    
    //THE LAST PAGE https://autocosts.info/
    echo "\t<url>\xA";
    echo "\t\t<loc>https://autocosts.info/</loc>\xA";
    echo "\t\t<changefreq>weekly</changefreq>\xA";
    echo "\t\t\t".'<xhtml:link rel="alternate" hreflang="x-default" href="https://autocosts.info/" />'."\xA";
    
    foreach ($avail_CT as $key2 => $value2){
        if($key2 != $key1){
            echo "\t\t\t" . '<xhtml:link rel="alternate" '. 
                 'hreflang="'. strtolower($language_list[$key2]) . '-' . strtolower($key2=="UK"?"GB":$key2) . '" '.
                 'href="' . $domain_list[$key2] . '" />'.
                 "\xA";
        }
    }
    echo "\t\t\t" . '<xhtml:link rel="alternate" '. 
         'hreflang="'. strtolower($language_list[$key1]) . '-' . strtolower($key1=="UK"?"GB":$key1) . '" '.
         'href="' . $domain_list[$key1] . '" />'.
         "\xA";

    //From here get the default languages with no region, for example
    //gets a language list with only no repeated entries, for example to:
    //<link rel="alternate" hreflang="pt" href="autocustos.info/pt" />
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
    echo "\t\t\t" . '<xhtml:link rel="alternate" hreflang="en" href="https://' . $domain_CT['US'] . '/US" />' . "\xA";
    //sets Ukranian language to UA
    $key = array_search("uk", $language_list2);
    unset($language_list2[$key]);
    echo "\t\t\t" . '<xhtml:link rel="alternate" hreflang="uk" href="https://' . $domain_CT['UA'] . '/UA" />' . "\xA";
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
        
        echo "\t\t\t" . '<xhtml:link rel="alternate" '. 
             'hreflang="'. $value . '" '.
             'href="https://'. $href .'" />'.
             "\xA";
    }
        
    echo "\t</url>\xA";    
?>
</urlset>
