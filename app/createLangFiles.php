<?php

    include_once('../countries/_list.php');
    unset($avail_CT["XX"]);
    $language=mb_substr($lang_CT[$GLOBALS['country']], 0, 2);
    $LANGUAGE_CODE = $lang_CT[$GLOBALS['country']];
    
    //for each available country language file, creates a HTML layout language file
    foreach ($avail_CT as $key => $value){
        
        include("../countries/".$key.".php");
        
        //#######################################
        //creates form files
        $htmlStr = "";
        $fileName = "autocosts/www/form/".$key.".html";
        file_put_contents($fileName, $htmlStr);
        ob_start();

        echo "<!DOCTYPE html>"."\r\n";
        echo "<html>"."\r\n";
        echo "<head>"."\r\n";
        echo '<meta charset="UTF-8">'."\r\n";
        echo "<title>Forms for ".$key."</title>"."\r\n";
        echo "</head>"."\r\n";
        echo "<body>"."\r\n";
        
        include("../layout/formPartOne.php"); 
        include("../layout/formPartTwo.php");
        include("../layout/formPartThree.php");
        
        echo "\r\n"."</body>"."\r\n";
        echo "</html>"."\r\n";
                                
        //  Return the contents of the output buffer
        $htmlStr = ob_get_contents();
        // Clean (erase) the output buffer and turn off output buffering
        ob_end_clean(); 
        // Write final string to file
        file_put_contents($fileName, $htmlStr);
        
        
        //#######################################
        //creates Validate Form file for each language
        $htmlStr = "";
        $fileName = "autocosts/www/validateForm/".$key.".js";
        file_put_contents($fileName, $htmlStr);
        ob_start();
        
        include("../js/validateForm.js.php"); 
                                
        //  Return the contents of the output buffer
        $htmlStr = ob_get_contents();
        // Clean (erase) the output buffer and turn off output buffering
        ob_end_clean(); 
        // Write final string to file
        file_put_contents($fileName, $htmlStr);
        
        
        //#######################################
        //creates print_results file for each language
        $htmlStr = "";
        $fileName = "autocosts/www/print_results/".$key.".js";
        file_put_contents($fileName, $htmlStr);
        ob_start();
        
        //define the variables to pass into the include php file
        $_GET['country'] = $key;
        $_SERVER['DOCUMENT_ROOT'] = "..";
        include("../js/print_results.js.php"); 
                                
        //  Return the contents of the output buffer
        $htmlStr = ob_get_contents();
        // Clean (erase) the output buffer and turn off output buffering
        ob_end_clean(); 
        // Write final string to file
        file_put_contents($fileName, $htmlStr);
    }
    $htmlStr="";
    
//##################################################################################
//##################################################################################

//Builds the Javascript file with a JS object for each country
    
    $js_string = "";
    $fileName = "autocosts/www/js/languages.js";
    file_put_contents($fileName, $js_string);
    ob_start(); 

    //creates array of available countries
    $last_key = end(array_keys($avail_CT));
    echo "var CountryList = ["."\xA";
    foreach ($avail_CT as $key => $valueCT){
        echo "\t".'"'.$key.'"';
        if ($key != $last_key) {
            echo ","."\xA";
        } else {
            echo "\xA";
        }        
    }
    echo "];";
    echo "\xA"."\xA";

    //********************* list of objects ****************************
    //for each available country language file, creates a Javascript Object
    foreach ($avail_CT as $key => $valueCT){
            
        include("../countries/".$key.".php");
        $var_array = get_defined_vars(); //gets all defined variables
        
        //gets all the variables from the file and puts them in an array in string format
        $file = file_get_contents("../countries/".$key.".php"); 
        preg_match_all('/\$[A-Za-z0-9-_]+/', $file, $vars);
        $var_array_string = array_unique($vars[0]);
        
        echo "var ".$key." = {"."\xA";
        
        $last_key = end(array_keys($var_array_string));
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
    }
    
    
    //Return the contents of the output buffer
    $js_string = ob_get_contents();
    // Clean (erase) the output buffer and turn off output buffering
    ob_end_clean(); 
    // Write final string to file
    file_put_contents($fileName, $js_string);

?>