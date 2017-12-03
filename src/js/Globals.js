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

/*Location of Javascript Files, change accordingly*/
var JS_FILES = {
    Google : {
        rgbcolor : CDN_URL + "google/rgbcolor.js",        
        canvg:     CDN_URL + "google/canvg.js",
        recaptchaAPI : "https://www.google.com/recaptcha/api.js?onload=grecaptcha_callback&render=explicit&hl="+LANGUAGE,
        chartsAPI :    "https://www.gstatic.com/charts/loader.js"
    },
    
    documentFunctions :   CDN_URL + "js/documentFunctions.js",
    Globals :             CDN_URL + "js/Globals.js",
    formFunctions :       CDN_URL + "js/formFunctions.js",
    validateForm :        CDN_URL + "js/validateForm.js",
    charts :              CDN_URL + "js/charts.js",
    g_recaptcha :         CDN_URL + "js/g-recaptcha.js",
    conversionFunctions : CDN_URL + "js/conversionFunctions.js",
    coreFunctions :       CDN_URL + "js/core/coreFunctions.js",
    getData :             CDN_URL + "js/getData.js",
    initialize :          CDN_URL + "js/initialize.js",
    printResults :        CDN_URL + "js/printResults.js",    
    print :               CDN_URL + "js/print.js",
    dbFunctions :         CDN_URL + "js/dbFunctions.js",
    
    PDF : {
        padfmake :        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.34/pdfmake.min.js",        
        generatePDF :     CDN_URL + "js/pdf/generatePDF.js",
        vfs_fonts :       "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.34/vfs_fonts.js",
        vfs_fonts_IN :    CDN_URL + "js/pdf/IN/vfs_fonts.js",
        vfs_fonts_JP :    CDN_URL + "js/pdf/JP/vfs_fonts.js",
        vfs_fonts_CN :    CDN_URL + "js/pdf/CN/vfs_fonts.js"
    },

    jAlert :              "https://cdnjs.cloudflare.com/ajax/libs/jsSocials/1.5.0/jssocials.min.js",

    jssocials :           CDN_URL + "js/social/jssocials.min.js",
    statsFunctions :      CDN_URL + "db_stats/statsFunctions.js",
    get_average_from_db : CDN_URL + "db_stats/get_average_from_db.js",
    raster_tables :       CDN_URL + "db_stats/raster_tables.js"
};

var UBER_FILE = "php/get_uber.php?c=" + COUNTRY;

/*#############################################################################*/
/*THESE ARE GLOBAL VARIABLES TO BE DEALT EXCLUSIVELY BY THE CODE, DO NOT CHANGE*/

/*global function variables for function expressions */
var Run1, PrintElem, generatePDF;
Run1 = PrintElem = generatePDF = function(){console.error("Function called and not yet loaded")};

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
    },
    RunButtonStr: WORDS.button_run
};

/*Service availability. Later on in the code, the variables might be set to TRUE*/
/*if the services are available. Therefore do not change these values here*/
var SERVICE_AVAILABILITY = {
    g_charts      : false,   /*variable that says whether Google Charts JS files are available*/
    g_captcha     : false,   /*variable that says whether Google Captcha JS files are available*/
    g_analytics   : false    /*variable that says whether Google Analytics JS files are available*/
};

