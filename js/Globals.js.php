<?php Header("content-type: application/x-javascript");
include_once($_SERVER['DOCUMENT_ROOT'].'/countries/'.$_GET['country'].'.php');
$GLOBALS['country'] = $_GET['country'];?>

//Define GLOBAL Javascript variables
var Country = '<?php echo $GLOBALS["country"]; ?>';
//Language code according to ISO_639-1 codes
var Language = '<?php echo $lang_CT[$GLOBALS['country']]; ?>';
var Domain_list = <?php echo json_encode($domain_CT); ?>;
var uber_obj = {};//empty object
var frame_witdh, public_transp_bool, fin_effort_bool, extern_costs_bool;
var ResultIsShowing, DescriptionHTML, CalculatedData;
var isHumanConfirmed = false; //global variable for Google reCaptcha
var RunButtonStr = '<?php echo $BUTTON_RUN; ?>';       
//global variables for each service availability
//Later on in the code, the variables might be set to TRUE if the services are available
//Therefore do not change these values here
var IsGoogleCharts = false; //variable that says whether Google Charts JS files are available
var IsGoogleCaptcha = false; //variable that says whether Google Captcha JS files are available  
var IsGoogleAnalytics = false; //variable that says whether Google Analytics JS files are available
//renders according to Global swicthes
if(!PRINT_SWITCH){$("#print_button").hide();}
if(!PDF_SWITCH){$("#generate_PDF").hide();}