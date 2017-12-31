/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with Javascript Global variables */

/*In this file for comments ALWAYS use bar-star star-bar / * comments * / */
/*the minification tool removes newlines and thus double-bar-comments break the code */

/*GLOBAL switches, change accordingly*/
var SWITCHES = {
    "uber": true,        /*Uber*/
    "social": true,      /*Social media pulgins*/
    "g_charts": true,    /*Google Charts*/
    "g_captcha": true,   /*Google Captcha*/
    "g_analytics": true, /*Google Analytics*/
    "data_base": true,   /*Inserts user input data into DataBase*/
    "print": true,       /*Print option*/
    "pdf": true,         /*Download PDF report option*/
    "https": true        /*true for https, false for http*/
};

/*Variables to be defined by PHP*/
/*Define GLOBAL Javascript variables*/
var COUNTRY = "<?php echo $_GET['country']; ?>";
/*Language code according to ISO_639-1 codes*/
var LANGUAGE = "";
/*List of countries and domains in a Javascript Object*/
var COUNTRY_LIST = "";
var DOMAIN_LIST  = "";

var CDN_URL       = "CDN_URL"; /*it's defined in the php*/
var HTTP_Protocol = "$GLOBALS['HTTP_Protocol']"; /*it's defined in the php*/

/*forms present page full url, example 'http://autocosts.info/UK' */
var PAGE_URL = HTTP_Protocol + DOMAIN_LIST[COUNTRY] + "/" + COUNTRY; 

/*it may be changed accordingly*/
var LANG_JSON_DIR         = CDN_URL + "countries" + "/"; /* Directory of JSON Translation files  */
var STATS_HTML_TABLES_DIR = CDN_URL + "tables" + "/";    /* Directory of statistical html tables */
var STATS_JPG_TABLES_DIR  = CDN_URL + "tables" + "/";    /* Directory of statistical jpg tables  */

/*Location of Javascript Files, it may be changed accordingly*/
var JS_FILES = {
    Google : {
        rgbcolor : "https://cdnjs.cloudflare.com/ajax/libs/canvg/1.4/rgbcolor.min.js",  /*RGB color parser in JavaScript*/
        canvg: "https://cdnjs.cloudflare.com/ajax/libs/canvg/1.4/canvg.min.js",
        recaptchaAPI : "https://www.google.com/recaptcha/api.js?onload=grecaptcha_callback&render=explicit&hl="+LANGUAGE,
        chartsAPI :    "https://www.gstatic.com/charts/loader.js"
    },
    
    initialize :          CDN_URL + "client/initialize.js",
    documentFunctions :   CDN_URL + "client/documentFunctions.js",    
    formFunctions :       CDN_URL + "client/formFunctions.js",
    validateForm :        CDN_URL + "client/validateForm.js",
    charts :              CDN_URL + "client/charts.js",
    g_recaptcha :         CDN_URL + "client/g-recaptcha.js",
    conversionFunctions : CDN_URL + "client/conversionFunctions.js",
    coreFunctions :       CDN_URL + "client/core/coreFunctions.js",
    getData :             CDN_URL + "client/getData.js",
    printResults :        CDN_URL + "client/printResults.js",    
    print :               CDN_URL + "client/print.js",
    dbFunctions :         CDN_URL + "client/dbFunctions.js",
    
    statsFunctions :      CDN_URL + "db/statsFunctions.js",
    
    jQuery : CDN_URL + "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
    jTimer : CDN_URL + "client/jquery/js_timer.js",

    PDF : {
        pdfmake :        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.34/pdfmake.min.js",        
        generatePDF :     CDN_URL + "js/pdf/generatePDF.js",
        vfs_fonts :       "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.34/vfs_fonts.js",
        vfs_fonts_IN :    CDN_URL + "client/pdf/IN/vfs_fonts.js",
        vfs_fonts_JP :    CDN_URL + "client/pdf/JP/vfs_fonts.js",
        vfs_fonts_CN :    CDN_URL + "client/pdf/CN/vfs_fonts.js"
    },

    jAlert :              CDN_URL + "client/jAlert/jAlert.js",
    jssocials :           "https://cdnjs.cloudflare.com/ajax/libs/jsSocials/1.5.0/jssocials.min.js"
};

var UBER_FILE = "server/get_uber.php?c=" + COUNTRY;

/*#############################################################################*/
/*THESE ARE GLOBAL VARIABLES TO BE DEALT EXCLUSIVELY BY THE CODE, DO NOT CHANGE*/

var WORDS; /* JS Object with the words for each country */
var INITIAL_TEX;

/*global function variables for function expressions */
var Run1, PrintElem, generatePDF, TimeCounter;
Run1 = PrintElem = generatePDF = TimeCounter = function(){console.error("Function called and not yet loaded");};

/*global variable for Google reCaptcha*/
var IS_HUMAN_CONFIRMED = false;
/*object from UBER API, with UBER city data*/
var UBER_API = {};

/*calculated information after user clicks "Run", calculated from coreFunctions.js*/
var CALCULATED = {
    data:     {},  /*calculated data (costs, financial effort, etc.)*/
    uber:     {}   /*calculated UBER as alternative to car, calculated from core functions*/
};

/*Global Object regarding the display of information*/
var DISPLAY = {
    centralFrameWidth :  0,  /*width of central frame #div2*/
    descriptionHTML :   "",
    /*result information got after user click "run"*/
    result: {
        isShowing          : false,  /*tells whether the result with result tables is being shown*/
        fin_effort         : false,
        public_transports  : false,
        uber               : false,
        ext_costs          : false
    },
    charts: {
        WIDTH_PX_OFF:    280, /*client width in px under which the charts are not shown*/
        MIN_RATIO:       0.7, /*minimum ratio width of charts as frame_witdh becomes too wide*/
        MIN_RATIO_WIDTH: 750, /*width on which the ratio is MIN_RATIO and above which the ration is fixed on MIN_RATIO*/
        MIN_LEGEND:      425, /*window width value under which the legends of the charts are hidden*/
        isMonthlyCostsPieChart: false, /*prints chart bool variable*/
        isMonthlyCostsBarChart: false, /*prints chart bool variable*/
        isFinEffortChart:       false, /*prints chart bool variable*/
        isAlterToCarChart:      false,  /*prints chart bool variable*/
        /*the charts images data URI*/
        URIs: {
            pieChart: 0,
            barChart: 0,
            finEffort: 0,
            alterToCar: 0
        }
    }
};

/*Service availability. Later on in the code, the variables might be set to TRUE*/
/*if the services are available. Therefore do not change these values here*/
var SERVICE_AVAILABILITY = {
    g_charts      : false,   /*variable that says whether Google Charts JS files are available*/
    g_captcha     : false,   /*variable that says whether Google Captcha JS files are available*/
    g_analytics   : false    /*variable that says whether Google Analytics JS files are available*/
};


/*function that loads the scripts only once */
/*for understanding this scope, read: ryanmorr.com/understanding-scope-and-context-in-javascript */
/*this works like a module, like a singleton function */
var getScriptOnce = (function(url, callback){
    var ScriptArray = []; /*array of urls*/
    return function (url, callback) {
        /*the array doesn't have such url*/
        if (ScriptArray.indexOf(url) === -1){
            if (typeof callback === 'function') {
                return $.getScript(url, function(){
                    ScriptArray.push(url);
                    callback();
                });
            } else {
                return $.getScript(url, function(){
                    ScriptArray.push(url);
                });
            }
        }
        /*the file is already there, it does nothing*/
        /*to support as of jQuery 1.5 methods .done().fail()*/
        else{
            return {
                done: function () {
                    return {
                        fail: function () {}
                    };
                }
            };
        }
    };
}());

/*loads jQuery initializing functions*/
getScriptOnce(JS_FILES.initialize);
