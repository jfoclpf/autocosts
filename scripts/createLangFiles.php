<?php

    //source folder
    $SRC_FOLDER = "../src"."/"; //do not remove last bar /
    //build foder
    $BUILD_FOLDER = "../build"."/"; //do not remove last bar /

    include_once($SRC_FOLDER.'php/functions.php');
    include_once($SRC_FOLDER.'countries/list.php');

    //$language=mb_substr($lang_CT[$GLOBALS['country']], 0, 2);
    //$LANGUAGE_CODE = $lang_CT[$GLOBALS['country']];
    
    
//##################################################################################
//##################################################################################

//Builds the Javascript file with a JS object for each country
    

    //creates directory if it doesn't exist
    if(!file_exists($BUILD_FOLDER."js/languages")){
        mkdir ($BUILD_FOLDER."js/languages", 0777, true);
    }


    //for each available country language file, creates a language JS file
    foreach ($avail_CT as $key => $valueCT){
            
        include($SRC_FOLDER."countries/".$key.".php");
        $var_array = get_defined_vars(); //gets all defined variables
        
        $js_string = "";
        $fileName = $BUILD_FOLDER."js/languages/".$key.".js";
        file_put_contents($fileName, $js_string);
        ob_start(); 
                       
        //creates array of available countries
        $array_keys = array_keys($avail_CT);
        $last_key = end($array_keys);
        echo "var CountryList = {"."\xA";
        foreach ($avail_CT as $key3 => $valueCT3){
            if($key3 != "XX"){
                echo "\t".'"'.$key3.'" : "'.$valueCT3.'"';
                if ($key3 != $last_key) {
                    echo ","."\xA";
                } else {
                    echo "\xA";
                }
            }
        }
        echo "};";
        echo "\xA"."\xA";
        
        //gets all the variables from the file and puts them in an array in string format
        $file = file_get_contents($SRC_FOLDER."countries/".$key.".php"); 
        preg_match_all('/\$[A-Za-z0-9-_]+/', $file, $vars);
        $var_array_string = array_unique($vars[0]);                      
        $array_keys = array_keys($var_array_string);
        $last_key = end($array_keys);
        
        echo "var WORDS = {"."\xA";        
        foreach ($var_array_string as $key2 => $value){
            
            //the JS object entry( tolls: "text", )
            //removes leading $ character and makes lowercase
            echo "\t".strtolower(ltrim($value, '$')).": ";
            
            $var = $var_array[ltrim($value, '$')];
            
            if (!is_numeric($var)){
                echo '"'.preg_replace( "/\r|\n/", "", $var_array[ltrim($value, '$')] ).'"';
            }
            else{
                echo $var_array[ltrim($value, '$')];
            }
            
            if ($key2 != $last_key) {
                echo ","."\xA";
            } else {
                echo "\xA";
            }        
        }
        echo "};";
        echo "\xA"."\xA";
        
        //Return the contents of the output buffer
        $js_string = ob_get_contents();
        // Clean (erase) the output buffer and turn off output buffering
        ob_end_clean(); 
        // Write final string to file
        file_put_contents($fileName, $js_string);        
    }
    
    
?>

