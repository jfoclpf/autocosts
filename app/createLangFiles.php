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
    
?>