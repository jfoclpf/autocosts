<?php Header("content-type: application/x-javascript");
if(strlen($_GET['country']) != 2){ exit;} //avoids code injection ensuring that input has only two characters (country code)
include_once($_SERVER['DOCUMENT_ROOT'].'/countries/_list.php');
include_once($_SERVER['DOCUMENT_ROOT'].'/countries/'.$_GET['country'].'.php');
$GLOBALS['country'] = $_GET['country'];?>

//Define GLOBAL Javascript variables
var COUNTRY = '<?php echo $GLOBALS["country"]; ?>';
//Language code according to ISO_639-1 codes
var LANGUAGE = '<?php echo $lang_CT[$GLOBALS["country"]]; ?>';
//List of domains in a Javascript Object
var DOMAIN_LIST = <?php echo json_encode($domain_CT); ?>;
//global variable for Google reCaptcha
var IS_HUMAN_CONFIRMED = false;
//object from UBER API, with UBER city data
var UBER_API = {};

//calculated information after user clicks "Run", calculated from coreFunctions.js
var CALCULATED = {
    data:     {},  //calculated data (costs, financial effort, etc.)
    uber:     {}   //calculated UBER as alternative to car, calculated from core functions
};

//Global Object regarding the display of information
var DISPLAY = {
    centralFrameWidth :  0,  //width of central frame #div2
    descriptionHTML :   "",
    //result information got after user click "run"
    result: {
        isShowing          : false,  //tells whether the result with result tables is being shown
        fin_effort         : false,
        public_transports  : false,
        uber               : false,
        ext_costs          : false
    },
    charts: {
        WIDTH_PX_OFF:    280, //client width in px under which the charts are not shown
        MIN_RATIO:       0.7, //minimum ratio width of charts as frame_witdh becomes too wide
        MIN_RATIO_WIDTH: 750, //width on which the ratio is MIN_RATIO and above which the ration is fixed on MIN_RATIO
        MIN_LEGEND:      425, //window width value under which the legends of the charts are hidden
        isMonthlyCostsPieChart: false, //prints chart bool variable
        isMonthlyCostsBarChart: false, //prints chart bool variable
        isFinEffortChart:       false, //prints chart bool variable
        isAlterToCarChart:      false  //prints chart bool variable
    },
    RunButtonStr: '<?php echo $BUTTON_RUN; ?>'
};

//Service availability. Later on in the code, the variables might be set to TRUE
//if the services are available. Therefore do not change these values here
var SERVICE_AVAILABILITY = {
    g_charts      : false,   //variable that says whether Google Charts JS files are available
    g_captcha     : false,   //variable that says whether Google Captcha JS files are available
    g_analytics   : false    //variable that says whether Google Analytics JS files are available
};


