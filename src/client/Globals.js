/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*#############################################################################*/
/*THESE ARE GLOBAL VARIABLES TO BE DEALT EXCLUSIVELY BY THE CODE, DO NOT CHANGE*/

/*File with Javascript Global variables rendered by server side (handlebars) inserted in HTML data attributes 
and collected here. See: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes */

//Global Variables
var SWITCHES,           //GLOBAL switches Object
    COUNTRY,            //Current country
    LANGUAGE,           //Language code according to ISO_639-1 codes
    COUNTRY_LIST,       //List of countries in a Javascript Object
    DOMAIN_LIST,        //List of domains in a Javascript Object
    CDN_URL,            //it's defined in the node server side index.js
    HTTP_Protocol,      //it's defined in node server side index.js*/
    clientDir,          //client directory seen by the browser
    WORDS,              //Object with country's language text strings
    INITIAL_TEX, 
    GA_TRACKING_ID,     //Google analytics Tracking ID
    NOT_LOCALHOST,      //true when this session does not come from localhost
    JS_FILES,           //Object with locations of Javascript Files
    UBER_API_LOCAL_URL; //UBER URL to get UBER API information through AJAX

(function(){

    var switches = document.getElementById('global_switches');
    SWITCHES = {
        "https": JSON.parse(switches.dataset.https),                 /*true for https, false for http*/    
        "uber": JSON.parse(switches.dataset.uber),                   /*Uber*/
        "social": JSON.parse(switches.dataset.social),               /*Social media pulgins*/
        "charts": JSON.parse(switches.dataset.charts),               /*Charts*/
        "g_captcha": JSON.parse(switches.dataset.g_captcha),         /*Google Captcha*/
        "g_analytics": JSON.parse(switches.dataset.g_analytics),     /*Google Analytics*/
        "data_base": JSON.parse(switches.dataset.data_base),         /*Inserts user input data into DataBase*/
        "print": JSON.parse(switches.dataset.print),                 /*Print option*/
        "pdf": JSON.parse(switches.dataset.pdf)                      /*Download PDF report option*/
    };
    
    
    var globalVariables = document.getElementById('global_variables');
    COUNTRY         = globalVariables.dataset.country;
    LANGUAGE        = globalVariables.dataset.language;
    COUNTRY_LIST    = JSON.parse(decodeURI(globalVariables.dataset.country_list));
    DOMAIN_LIST     = JSON.parse(decodeURI(globalVariables.dataset.domain_list));
    CDN_URL         = globalVariables.dataset.cdn_url; 
    HTTP_Protocol   = globalVariables.dataset.http_protocol; 
    clientDir       = globalVariables.dataset.client_dir;
    WORDS           = JSON.parse(decodeURI(globalVariables.dataset.words));
    INITIAL_TEX     = WORDS.initial_text;
    GA_TRACKING_ID  = globalVariables.dataset.ga_tracking_id;
    NOT_LOCALHOST   = JSON.parse(globalVariables.dataset.not_localhost);    
    
    //Location of Javascript Files, it may be changed accordingly
    var JSfiles = document.getElementById('js_files');
    var rootClientURL = CDN_URL + clientDir + "/";
    JS_FILES = {
        Google : {
            recaptchaAPI : "https://www.google.com/recaptcha/api.js?onload=grecaptcha_callback&render=explicit&hl="+LANGUAGE,
        },

        initialize :          rootClientURL + "initialize.js",
        documentFunctions :   rootClientURL + "documentFunctions.js",
        formFunctions :       rootClientURL + "formFunctions.js",
        validateForm :        rootClientURL + "validateForm.js",    
        g_recaptcha :         rootClientURL + "g-recaptcha.js",
        conversionFunctions : rootClientURL + "conversionFunctions.js",
        coreFunctions :       rootClientURL + "core/coreFunctions.js",
        getData :             rootClientURL + "getData.js",
        printResults :        rootClientURL + "printResults.js",
        print :               rootClientURL + "print.js",
        dbFunctions :         rootClientURL + "dbFunctions.js",

        jQuery : JSfiles.dataset.jquery,
        jTimer : rootClientURL + "jquery/js_timer.js",

        PDF : {
            pdfmake :         JSfiles.dataset.pdfmake,
            generatePDF :     rootClientURL + "pdf/generatePDF.js",
            vfs_fonts :       JSfiles.dataset.vfs_fonts,
            vfs_fonts_IN :    rootClientURL + "pdf/IN/vfs_fonts.js",
            vfs_fonts_JP :    rootClientURL + "pdf/JP/vfs_fonts.js",
            vfs_fonts_CN :    rootClientURL + "pdf/CN/vfs_fonts.js"
        },

        drawCostsCharts :     rootClientURL + "chartjs/drawCostsCharts.js",
        chartjs :             rootClientURL + "chartjs/Chart.min.js",
        jAlert :              rootClientURL + "jAlert/jAlert.js",
        jssocials :           "https://cdnjs.cloudflare.com/ajax/libs/jsSocials/1.5.0/jssocials.min.js"
    };

    UBER_API_LOCAL_URL = "getUBER/" + COUNTRY;
   
})();

/*forms present page full url, example 'http://autocosts.info/UK' */
var PAGE_URL = HTTP_Protocol + "://" + DOMAIN_LIST[COUNTRY] + "/" + COUNTRY;
/*it may be changed accordingly*/
var LANG_JSON_DIR         = CDN_URL + "countries" + "/"; /* Directory of JSON Translation files  */
var STATS_HTML_TABLES_DIR = CDN_URL + "tables" + "/";    /* Directory of statistical html tables */
var STATS_JPG_TABLES_DIR  = CDN_URL + "tables" + "/";    /* Directory of statistical jpg tables  */

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
        isMonthlyCostsPieChart: false,  /*prints chart bool variable*/
        isMonthlyCostsBarChart: false,  /*prints chart bool variable*/
        isFinEffortChart:       false,  /*prints chart bool variable*/
        isAlterToCarChart:      false,  /*prints chart bool variable*/
        pieChart: 0,
        barChart: 0,
        finEffort: 0,
        alterToCar: 0,
        /*the charts images data URI*/
        //https://en.wikipedia.org/wiki/Data_URI_scheme#SVG
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
    g_captcha     : false,   /*variable that says whether Google Captcha JS files are available*/
    g_analytics   : false    /*variable that says whether Google Analytics JS files are available*/
};

/*defer loading of jQuery*/
(function() {
    function getScript(url,success){
        var script=document.createElement('script');
        script.src=url;
        var head=document.getElementsByTagName('head')[0],
            done=false;
        script.onload=script.onreadystatechange = function(){
            if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
                done=true;
                success();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }
    getScript(JS_FILES.jQuery,function(){
        getScript(JS_FILES.initialize, function(){});
    });
})();

