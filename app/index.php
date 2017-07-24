<?php

$GLOBALS['country'] = "UK"; //default

$temp_cty = $GLOBALS['country'];
//scripts that creates several HTML language layout files, stored in /countries
include('./createLangFiles.php');
$GLOBALS['country'] = $temp_cty;

$htmlStr = "";
$fileName = "autocosts/www/index.html";
file_put_contents($fileName, $htmlStr);
ob_start();

include_once("../php/functions.php");
include_once("../countries/_list.php");
asort($avail_CT); //alphabetically sorts the country list
$language=mb_substr($lang_CT[$GLOBALS['country']], 0, 2);
$LANGUAGE_CODE = $lang_CT[$GLOBALS['country']];

//loads the correspondent country file
include('../countries/' . $GLOBALS['country'] . '.php');

//removes XX from array
unset($avail_CT['XX']);

//some initializations
$is_logo = false;
$currency_logo = "";
?><!DOCTYPE html>

<html>

<head>

    <script src="js/APPglobals.js"></script>

    <meta charset="UTF-8">
    <!--gets the first sentence of variable $INITIAL_TEXT-->
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Autocosts Org">
    
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
          
    <title>Automobile Costs Calculator</title>

    <link rel="stylesheet" type="text/css" href="jquery/jquery.mobile-1.4.5.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/header.css">    
    <link rel="stylesheet" type="text/css" href="css/central.css">
    <link rel="stylesheet" type="text/css" href="css/form.css">
    <link rel="stylesheet" type="text/css" href="css/results.css">    
    <link rel="stylesheet" type="text/css" href="css/flags.css">
    <link rel="stylesheet" type="text/css" href="css/colors.css">
    <link rel="stylesheet" type="text/css" href="css/jAlert.css">
    <link rel="stylesheet" type="text/css" href="css/APPmain.css">
    
</head>

<body>
    <div id="loader_div">
        <img id="loader_img" src="jquery/images/ajax-loader.gif" width="46" height="46"> 
    </div>
    <div id="main_div" style="display:none;">
        <div id="banner_top">
            <div id="left_top_div">&nbsp;</div>
            <!--#####################-->
            <div id="header_main_title">
                <div id="main_title">                    
                </div>
            </div>
            <!--## Select country box ##-->
            <div id="country_box">
                <div id="country_box_inline">
                    <div id="banner_flag_div">
                        <div id="banner_flag" class="flag"></div>
                    </div>
                    <div id="country_select_div">
                        <select name="country_select" id="country_select">
                            <?php 
                                foreach ($avail_CT as $key => $value) {
                                    echo '<option value="'.$key.'">'.$value.'</option>';
                                }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div id="container">
            <div id="container_table">

                <!-- div2 = CENTRE layout column-->
                <div id="div2_td">
                    <div id="div2">
                        <form class="roundCorner" id="main_form" enctype="application/x-www-form-urlencoded"
                              action="javascript:void(0);" name="costs_form">
                            <div id="input_div">
                            </div>
                        </form>
                    </div>
                    
                    <!-- ************* PRINTING divs ***********************
                    ******************************************************-->
                    
                    <!-- ************* Main Table  Section ****************** -->                           
                    <div class="result_section" id="main_table_section">
                        <div class="result_div" id="main_table"></div>
                    </div>
                    
                    <!-- ************* Monthly Costs section **************** -->                    
                    <div class="result_section" id="monthly_costs_section">
                        <br><hr><hr><hr>
                        <div class="result_section_title" id="monthly_costs_title"></div>                      
                        <div class="charts_container">
                            <div class="chart">
                                <canvas id="pieChart" height="400"></canvas>
                            </div>
                            <br>
                            <div class="chart">
                                <canvas id="barChart" height="300"></canvas>
                            </div>
                            <br>
                        </div>
                        
                        <!-- results tables -->
                        <div class="result_div" id="monthly_costs"></div>
                    </div>
                    
                    <!-- ************* Financial Effort section************** -->                    
                    <div class="result_section" id="fin_effort_section">
                        <br><hr><hr><hr>
                        <div class="result_section_title" id="fin_effort_title"></div>
                        <div class="charts_container">
                            <div class="chart">
                                <canvas id="FinEffChart" height="150"></canvas>
                            </div>
                        </div>
                        <div class="result_div" id="fin_effort"></div>
                    </div>
                    
                    <!-- ********* Alternative Costs to Car Costs section **************** -->                    
                    <div class="result_section" id="alternative_to_carcosts_section">
                        <br><hr><hr><hr>
                        <div class="result_section_title" id="alternative_to_carcosts_title"></div>
                        <div class="charts_container">
                            <div class="chart">
                                <canvas id="AlterToCarCostsChart" height="550"></canvas>
                            </div>
                        </div>                        
                        <div class="result_div" id="alternative_to_carcosts"></div>
                    </div>
                    
                    <!-- ************* External Costs ****************** -->                    
                    <div class="result_section" id="exten_costs_section">
                        <br><hr><hr><hr>
                        <div class="result_section_title"></div>
                        <div class="result_div" id="extern_costs"></div>
                    </div>
                    
                    <!-- ************* Buttons ****************** -->                    
                    <div class="result_section" id="buttons_section">                        
                        <div class="result_div" id="result_buttons_div"></div>                               
                    </div>
                    <!-- ************* ********* ************* -->
                    <br>
                </div>
                <!--#######################################################################################-->
            </div>
        </div>
        <br>
    </div>
    
    <!-- these are JS Cordova specific files-->
    <?php if($argv[1]=="build"): ?>
    <script type="text/javascript" charset="utf-8" src="cordova.js"></script>
    <?php endif; ?>
    
    <!--jquery.js-->
    <script src="jquery/jquery-1.11.1.min.js"></script>
    <script src="jquery/jquery.mobile-1.4.5.min.js"></script>
    
    <!-- these are JS autocosts WEB generic files-->
    <script src="js/coreFunctions.js"></script>
    <script src="js/conversionFunctions.js"></script>
    <script src="js/dbFunctions.js"></script>
    <script src="js/get_data.js"></script>    
    <script src="js/languages.js"></script>
    <script src="js/jAlert.js"></script>
        
    <!-- these are JS APP specific files-->
    <script src="js/APPdocumentFunctions.js"></script>
    <script src="js/APPinitialize.js"></script>
    <script src="js/APPstorage.js"></script>
    
    <!--Chart.js-->
    <script src="js/Chart.min.js"></script>
    <script src="js/APPcharts.js"></script>
    
    
</body>

</html>

<?php 
//  Return the contents of the output buffer
$htmlStr = ob_get_contents();
// Clean (erase) the output buffer and turn off output buffering
ob_end_clean(); 
// Write final string to file
file_put_contents($fileName, $htmlStr);
?>
