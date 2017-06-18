<?php

    include_once('../countries/_list.php');
    unset($avail_CT["XX"]);
    
    //for each available country language file, creates a HTML layout language file
    foreach ($avail_CT as $key => $value){
        
        include("../countries/".$key.".php");
        
        //#######################################
        //creates form files
        $htmlStr = "";
        $fileName = "build/form/".$key.".html";
        file_put_contents($fileName, $htmlStr);
        ob_start();

        include("../layout/formPartOne.php"); 
        include("../layout/formPartTwo.php");
        include("../layout/formPartThree.php");
                                
        //  Return the contents of the output buffer
        $htmlStr = ob_get_contents();
        // Clean (erase) the output buffer and turn off output buffering
        ob_end_clean(); 
        // Write final string to file
        file_put_contents($fileName, $htmlStr);
        
        
        //#######################################
        //creates Validate Form file for each language
        $htmlStr = "";
        $fileName = "build/validateForm/".$key.".js";
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
        $fileName = "build/print_results/".$key.".js";
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
    $fileName = "build/js/languages.js";
    file_put_contents($fileName, $js_string);
    ob_start(); 
    
    //for each available country language file, creates a HTML layout language file
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