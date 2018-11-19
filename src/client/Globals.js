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
var SWITCHES,               //GLOBAL switches Object
    COUNTRY,                //Current Country Code
    LANGUAGE,               //Current Language Code according to ISO_639-1 codes
    COUNTRY_LIST,           //List of countries in a Javascript Object
    DOMAIN_LIST,            //List of domains in a Javascript Object
    DOMAIN_URL,             //current domain URL, example 'http://autocosts.info'
    FULL_URL,               //full URL of the page, example 'http://autocosts.info/XX'
    CDN_URL,                //it's defined in the node server side index.js
    HTTP_Protocol,          //it's defined in node server side index.js*/
    clientDir,              //client directory seen by the browser
    WORDS,                  //Object with country's language text strings
    STATS,                  //Object with countrys' users costs statistics
    INITIAL_TEX,            //Informative text about the calculator
    GA_TRACKING_ID,         //Google analytics Tracking ID
    NOT_LOCALHOST,          //true when this session does not come from localhost
    JS_FILES,               //Object with locations of Javascript Files
    PAGE_URL,               //current page URL, example 'http://autocosts.info/UK'
    LANG_JSON_DIR,          //Directory of JSON Translation files
    STATS_HTML_TABLES_DIR,  //Directory of statistical html tables
    STATS_JPG_TABLES_DIR,   //Directory of statistical jpg tables
    IS_HUMAN_CONFIRMED,     //for Google reCaptcha
    UBER_API,               //UBER API object with city specific costs (cost per km, per minute, etc.)
    UBER_API_LOCAL_URL,     //UBER URL to get UBER API information through AJAX
    CALCULATED_DATA,        //calculated meta-data after user clicks "Run"
    FORM_DATA,              //Form data filled by the user
    DISPLAY,                //Object regarding the display of information
    SERVICE_AVAILABILITY,   //To be used by the code to check whether services are available,
    UUID,                   //Unique User Identifier
    NONCE;                  //Number used only once for CSP rules in scrips

//Global Function variables for function expressions
var TimeCounter;

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
    //freezes SWITCHES on client such that its properties cannot be changed
    //since these switches are only defined by the server
    Object.freeze(SWITCHES);

    var globalVariables = document.getElementById('global_variables');
    COUNTRY         = globalVariables.dataset.country;
    LANGUAGE        = globalVariables.dataset.language;
    COUNTRY_LIST    = JSON.parse(decodeURI(globalVariables.dataset.country_list));
    DOMAIN_LIST     = JSON.parse(decodeURI(globalVariables.dataset.domain_list));
    CDN_URL         = globalVariables.dataset.cdn_url;
    HTTP_Protocol   = globalVariables.dataset.http_protocol;
    clientDir       = globalVariables.dataset.client_dir;
    WORDS           = JSON.parse(decodeURI(globalVariables.dataset.words));
    STATS           = JSON.parse(decodeURI(globalVariables.dataset.stats));
    INITIAL_TEX     = WORDS.initial_text;
    GA_TRACKING_ID  = globalVariables.dataset.ga_tracking_id;
    NOT_LOCALHOST   = JSON.parse(globalVariables.dataset.not_localhost);
    NONCE           = globalVariables.dataset.nonce;
    TEST_SERVER     = globalVariables.dataset.is_this_a_test;  //server refers that this session is a test

    //Location of Javascript Files (define in /commons.js)
    var JSfiles = JSON.parse(decodeURI(globalVariables.dataset.js_files));

    var rootClientURL = CDN_URL + clientDir + "/";
    JS_FILES = {
        Google : {
            recaptchaAPI : JSfiles.GrecaptchaAPI + "?onload=grecaptcha_callback&render=explicit&hl=" + LANGUAGE,
            analytics    : JSfiles.Ganalytics
        },

        initialize :          rootClientURL + "initialize.js",
        formFunctions :       rootClientURL + "formFunctions.js",
        validateForm :        rootClientURL + "validateForm.js",
        g_recaptcha :         rootClientURL + "g-recaptcha.js",
        conversionFunctions : rootClientURL + "conversionFunctions.js",
        coreFunctions :       rootClientURL + "core/coreFunctions.js",
        getData :             rootClientURL + "getData.js",
        showResults :         rootClientURL + "showResults.js",
        dbFunctions :         rootClientURL + "dbFunctions.js",

        jQuery :              JSfiles.jquery.uri,
        jQueryLocal :         JSfiles.jquery.local,
        jQuerySidebar :       rootClientURL + "jquery/jquery.sidebar.min.js",
        jQueryColor :         rootClientURL + "jquery/jquery.color.min.js",
        jTimer :              rootClientURL + "jquery/js_timer.js",

        PDF : {
            pdfmake :         rootClientURL + "pdf/pdfmake.min.js",
            generatePDF :     rootClientURL + "pdf/generatePDF.js",
            vfs_fonts :       rootClientURL + "pdf/vfs_fonts.js",
            vfs_fonts_IN :    rootClientURL + "pdf/IN/vfs_fonts.js",
            vfs_fonts_JP :    rootClientURL + "pdf/JP/vfs_fonts.js",
            vfs_fonts_CN :    rootClientURL + "pdf/CN/vfs_fonts.js"
        },

        drawCostsCharts :     rootClientURL + "chart/drawCostsCharts.js",
        chartjs :             rootClientURL + "chart/chartjs.min.js",
        smartAppBanner:       rootClientURL + "smart-app-banner.js"
    };

    UBER_API = {};
    UBER_API_LOCAL_URL = "getUBER/" + COUNTRY;

    /*forms present page full url, example 'http://autocosts.info' */
    DOMAIN_URL = HTTP_Protocol + "://" + DOMAIN_LIST[COUNTRY];
    FULL_URL = window.location.href;

    /*forms present page full url, example 'http://autocosts.info/UK' */
    PAGE_URL = HTTP_Protocol + "://" + DOMAIN_LIST[COUNTRY] + "/" + COUNTRY;

    LANG_JSON_DIR         = CDN_URL + "countries" + "/"; /* Directory of JSON Translation files  */
    STATS_HTML_TABLES_DIR = CDN_URL + "tables" + "/";    /* Directory of statistical html tables */
    STATS_JPG_TABLES_DIR  = CDN_URL + "tables" + "/";    /* Directory of statistical jpg tables  */

    TimeCounter = function(){
        console.error("Function " + arguments.callee.name + " called and not yet loaded");
    };

    /*global variable for Google reCaptcha*/
    IS_HUMAN_CONFIRMED = false;

    /*calculated information after user clicks "Run", calculated from coreFunctions.js*/
    CALCULATED_DATA;  /*calculated data (costs, financial effort, uber, etc.)*/

    /*Global Object regarding the display of information*/
    DISPLAY = {
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
            finEffortDoughnut : {
                isVisible: false,  //boolean variable that says whether the chart is visible
                ref: 0,            //reference obtained from chart.js when doing "new Chart()"
                URI: 0             //the charts images data URI, see https://en.wikipedia.org/wiki/Data_URI_scheme#SVG
            },
            costsBars : {
                isVisible: false,
                ref: 0,
                URI: 0
            },
            costsDoughnut : {
                isVisible: false,
                ref: 0,
                URI: 0
            },
            finEffort : {
                isVisible: false,
                ref: 0,
                URI: 0
            },
            alterToCar : {
                isVisible: false,
                ref: 0,
                URI: 0
            }
        },        
        costsColors: {
            depreciation:        '#2ba3d6',
            insurance:           '#10c6e6',
            credit:              '#5ae0e2',
            inspection:          '#99e6bc',
            roadTaxes:           '#ffda70',
            fuel:                '#ff9e84',
            maintenance:         '#ff7192',
            repairsImprovements: '#e562aa',
            parking:             '#ea90cd',
            tolls:               '#eabcef',
            fines:               '#9f97ef',
            washing:             '#867ae3'
        }
    };

    /*Service availability. Later on in the code, the variables might be set to TRUE*/
    /*if the services are available. Therefore do not change these values here*/
    SERVICE_AVAILABILITY = {
        g_captcha     : false,   /*variable that says whether Google Captcha JS files are available*/
        g_analytics   : false    /*variable that says whether Google Analytics JS files are available*/
    };

})();

/*function that loads the scripts async only once */
/*for understanding this scope, read: ryanmorr.com/understanding-scope-and-context-in-javascript */
/*this works like a module, like a singleton function */
var getScriptOnce = function() {

    var scriptArray = []; //array of urls (enclosure)

    //function to defer loading of script
    return function (url, callback){

        //the array doesn't have such url
        if (scriptArray.indexOf(url) === -1){
            var script=document.createElement('script');
            script.src=url;

            if(NONCE){
                script.setAttribute('nonce', NONCE);
            }

            var head=document.getElementsByTagName('head')[0],
                done=false;

            script.onload = script.onreadystatechange = function(){
                if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
                    done=true;
                    if (typeof callback === 'function') {
                        callback();
                    }
                    script.onload = script.onreadystatechange = null;
                    //head.removeChild(script);

                    scriptArray.push(url);
                }
            };

            head.appendChild(script);
        }
    };
}(); //here it executes the function immediately to get the returned function

getScriptOnce(JS_FILES.jQuery, function(){
    getScriptOnce(JS_FILES.jQueryColor);
    getScriptOnce(JS_FILES.jQuerySidebar, function(){
        getScriptOnce(JS_FILES.initialize, function(){});
    });
});
