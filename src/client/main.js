/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* MAIN MODULE */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules */

var autocosts = (function(){

    //Main Module's Global Variables
    var SWITCHES,               //GLOBAL switches Object, got from server configuration
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
        NONCE,                  //Number used only once for CSP rules in scrips
        TEST_SERVER,            //server refers that this session is a test
        TimeCounter;            //Function variables for function expressions

    //gets switches from server side configuration
    (function(){
        var switches = document.getElementById('global_switches');
        SWITCHES = {
            "https": JSON.parse(switches.dataset.https),                 /*true for https, false for http*/
            "uber": JSON.parse(switches.dataset.uber),                   /*Uber*/
            "social": JSON.parse(switches.dataset.social),               /*Social media pulgins*/
            "charts": JSON.parse(switches.dataset.charts),               /*Charts*/
            "googleCaptcha": JSON.parse(switches.dataset.g_captcha),     /*Google Captcha*/
            "googleAnalytics": JSON.parse(switches.dataset.g_analytics), /*Google Analytics*/
            "data_base": JSON.parse(switches.dataset.data_base),         /*Inserts user input data into DataBase*/
            "print": JSON.parse(switches.dataset.print),                 /*Print option*/
            "pdf": JSON.parse(switches.dataset.pdf)                      /*Download PDF report option*/
        };
        //freezes SWITCHES on client such that its properties cannot be changed
        //since these switches are only defined by the server
        Object.freeze(SWITCHES);
    })();

    //gets main module's global variables from server side configuration
    (function(){
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
        GA_TRACKING_ID  = globalVariables.dataset.ga_tracking_id;
        NOT_LOCALHOST   = JSON.parse(globalVariables.dataset.not_localhost);
        NONCE           = globalVariables.dataset.nonce;
        TEST_SERVER     = globalVariables.dataset.is_this_a_test;  //server refers that this session is a test
    })();

    //defines some main module global variables
    (function(){
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

        /*Global Object regarding the display of information*/
        DISPLAY = {
            centralFrameWidth :  0,  /*width of central frame #div2*/
            descriptionHTML :   "",
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
            googleCaptcha : false,   /*variable that says whether Google Captcha JS files are available*/
            g_analytics   : false,   /*variable that says whether Google Analytics JS files are available*/
            uber          : false
        };
    })();

    //Sets location of Javascript Files (some defined in /commons.js)
    (function(){
        var globalVariables = document.getElementById('global_variables');
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
            conversionsModule :   rootClientURL + "core/conversionsModule.js",
            calculatorModule :    rootClientURL + "core/calculatorModule.js",
            transferDataModule :  rootClientURL + "transferDataModule.js",
            resultsModule :       rootClientURL + "resultsModule.js",
            dbFunctions :         rootClientURL + "dbFunctions.js",

            jQuerySidebar :       rootClientURL + "jquery/jquery.sidebar.min.js",
            jQueryColor :         rootClientURL + "jquery/jquery.color.min.js",
            jTimer :              rootClientURL + "jquery/js_timer.js",

            PDF : {
                pdfmake :         rootClientURL + "pdf/pdfmake.min.js",
                pdfModule :       rootClientURL + "pdf/pdfModule.js",
                vfs_fonts :       rootClientURL + "pdf/vfs_fonts.js",
                vfs_fonts_IN :    rootClientURL + "pdf/IN/vfs_fonts.js",
                vfs_fonts_JP :    rootClientURL + "pdf/JP/vfs_fonts.js",
                vfs_fonts_CN :    rootClientURL + "pdf/CN/vfs_fonts.js"
            },

            drawCostsCharts :     rootClientURL + "chart/drawCostsCharts.js",
            chartjs :             rootClientURL + "chart/chartjs.min.js",
            smartAppBanner:       rootClientURL + "smart-app-banner.js"
        };

        Object.freeze(JS_FILES);
    })();

    return{
        SWITCHES: SWITCHES,                             //GLOBAL switches Object, got from server configuration
        COUNTRY: COUNTRY,                               //Current Country Code
        LANGUAGE: LANGUAGE,                             //Current Language Code according to ISO_639-1 codes
        COUNTRY_LIST: COUNTRY_LIST,                     //List of countries in a Javascript Object
        DOMAIN_LIST: DOMAIN_LIST,                       //List of domains in a Javascript Object
        DOMAIN_URL: DOMAIN_URL,                         //current domain URL, example 'http://autocosts.info'
        FULL_URL: FULL_URL,                             //full URL of the page, example 'http://autocosts.info/XX'
        CDN_URL: CDN_URL,                               //it's defined in the node server side index.js
        HTTP_Protocol: HTTP_Protocol,                   //it's defined in node server side index.js*/
        clientDir: clientDir,                           //client directory seen by the browser
        WORDS: WORDS,                                   //Object with country's language text strings
        STATS: STATS,                                   //Object with countrys' users costs statistics
        GA_TRACKING_ID: GA_TRACKING_ID,                 //Google analytics Tracking ID
        NOT_LOCALHOST: NOT_LOCALHOST,                   //true when this session does not come from localhost
        JS_FILES: JS_FILES,                             //Object with locations of Javascript Files
        PAGE_URL: PAGE_URL,                             //current page URL, example 'http://autocosts.info/UK'
        LANG_JSON_DIR: LANG_JSON_DIR,                   //Directory of JSON Translation files
        STATS_HTML_TABLES_DIR: STATS_HTML_TABLES_DIR,   //Directory of statistical html tables
        STATS_JPG_TABLES_DIR: STATS_JPG_TABLES_DIR,     //Directory of statistical jpg tables
        IS_HUMAN_CONFIRMED: IS_HUMAN_CONFIRMED,         //for Google reCaptcha
        UBER_API: UBER_API,                             //UBER API object with city specific costs (cost per km, per minute, etc.)
        UBER_API_LOCAL_URL: UBER_API_LOCAL_URL,         //UBER URL to get UBER API information through AJAX
        CALCULATED_DATA: CALCULATED_DATA,               //calculated meta-data after user clicks "Run"
        FORM_DATA: FORM_DATA,                           //Form data filled by the user
        DISPLAY: DISPLAY,                               //Object regarding the display of information
        SERVICE_AVAILABILITY: SERVICE_AVAILABILITY,     //To be used by the code to check whether services are available,
        UUID: UUID,                                     //Unique User Identifier
        NONCE: NONCE,                                   //Number used only once for CSP rules in scrips
        TEST_SERVER: TEST_SERVER,                       //server refers that this session is a test
        TimeCounter: TimeCounter                        //Function variables for function expressions
    };

})();


/***********************************************************************/

/* GET FILES MODULE */
/* Module used to get extra files with JS or CSS code */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules */

//module for getting JS, CSS or other files
autocosts.getFiles = (function(jsFiles, switches, country, uberApi, notLocalhost, language, words){

    $(document).ready(function () {
        $.getScript(jsFiles.jQueryColor);
        $.getScript(jsFiles.jQuerySidebar, function(){
            $.getScript(jsFiles.initialize, function(){
                $.getScript(jsFiles.formFunctions, function(){
                    $.getScript(jsFiles.validateForm);
                    autocosts.initialize.initialize();
                    autocosts.userFormModule.initialize();
                });
            });
        });
    }); 
    
    function getUber(){
        if (switches.uber){
            if(country != "XX"){//if not test version
                //gets asynchronously UBER information
                $.get(UBER_API_LOCAL_URL, function(data) {
                    //alert(JSON.stringify(data, null, 4));
                    if(data && !$.isEmptyObject(data)){
                        uberApi =  data; //uberApi is a global variable
                        console.log("uber data got from uber API: ", uberApi);
                        autocosts.SERVICE_AVAILABILITY.uber = true;
                    }
                    else{
                        console.error("Error getting uber info");
                        autocosts.SERVICE_AVAILABILITY.uber = false;
                    }
                    autocosts.uberApi = uberApi;
                });
            }
            else{//test version (London city, in Pounds)
                uberApi.cost_per_distance = 1.25;
                uberApi.cost_per_minute = 0.15;
                uberApi.currency_code = "GBP";
                uberApi.distance_unit = "mile";
                autocosts.uberApi = uberApi;
                autocosts.SERVICE_AVAILABILITY.uber = true;
            }
        }
    }

    function getPdfJsFiles(){
        if(switches.pdf || switches.print){
            //wait until all PDF related files are loaded
            //to activate the downloadPDF button
            $.getScript(jsFiles.PDF.pdfModule, function() {
                $.getScript(jsFiles.PDF.pdfmake, function() {
                    //path where the fonts for PDF are stored
                    var pdf_fonts_path;
                    if (country == 'CN'){
                        pdf_fonts_path = jsFiles.PDF.vfs_fonts_CN;
                    }
                    else if (country == 'JP'){
                        pdf_fonts_path = jsFiles.PDF.vfs_fonts_JP;
                    }
                    else if (country == 'IN'){
                        pdf_fonts_path = jsFiles.PDF.vfs_fonts_IN;
                    }
                    else{
                        pdf_fonts_path = jsFiles.PDF.vfs_fonts;
                    }
                    $.getScript(pdf_fonts_path, function() {
                        $('#results .button-pdf, #results .button-print').removeClass('disabled');
                    });
                });
            });
        }
    }

    //Banner that appears on the top of the page on mobile devices, and directs the user to Google Play App
    //Based on this npm package: https://www.npmjs.com/package/smart-app-banner
    function loadSmartBanner(){

        new SmartBanner({
            daysHidden: 15, // days to hide banner after close button is clicked (defaults to 15)
            daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
            appStoreLanguage: language, // language code for the App Store (defaults to user's browser language)
            title: words.ac_mobile,
            author: 'Autocosts Org',
            button: 'APP',
            store: {
                android: 'Google Play'
            },
            price: {
                android: 'FREE'
            },
            // Add an icon (in this example the icon of Our Code Editor)
            icon: "/img/logo/logo_sm.png",
            theme: 'android' // put platform type ('ios', 'android', etc.) here to force single theme on all device
            //force: 'android' // Uncomment for platform emulation
        });
    }
    
    
    /* ====== Public Methods ====== */
    
    /*function that loads extra files and features, that are not loaded immediately after the page is opened
    because such files and features are not needed on the initial page load, so that initial loading time can be reduced*/
    function getExtraJSFiles(){

        $.getScript(jsFiles.calculatorModule, function(){
            $.getScript(jsFiles.conversionsModule);

            $.getScript(jsFiles.smartAppBanner, loadSmartBanner);

            $.getScript(jsFiles.transferDataModule, function(){

                if (switches.charts){
                    $.getScript(jsFiles.chartjs);

                    $.getScript(jsFiles.resultsModule, function() {
                        $.getScript(jsFiles.drawCostsCharts);
                        getPdfJsFiles();
                    });
                }
                else{
                    $.getScript(jsFiles.resultsModule, function(){
                        getPdfJsFiles();
                    });
                }

                if (switches.data_base){
                    $.getScript(jsFiles.dbFunctions);
                }

                //file jsFiles.g_recaptcha is from this project, stored in src/client, and must always be loaded
                $.getScript(jsFiles.g_recaptcha, function(){
                    //Google Captcha API doesn't work nor applies on localhost
                    if (switches.googleCaptcha && notLocalhost){
                        $.getScript(jsFiles.Google.recaptchaAPI);
                        //when loaded successfuly set SERVICE_AVAILABILITY.googleCaptcha=true in function grecaptcha_callback in g-recaptcha.js
                    }
                    else{
                        autocosts.SERVICE_AVAILABILITY.googleCaptcha = false;
                    }
                });

                getUber();
            });
        });

    }

    /*The function below will create and add to the document all the stylesheets that you wish to load asynchronously.
    (But, thanks to the Event Listener, it will only do so after all the window's other resources have loaded.)*/
    function loadCSSFiles(styleSheets) {
        var head = document.getElementsByTagName('head')[0];

        for (var i = 0; i < styleSheets.length; i++) {
            var link = document.createElement('link');
            var rel = document.createAttribute('rel');
            var href = document.createAttribute('href');

            rel.value = 'stylesheet';
            href.value = styleSheets[i];

            link.setAttributeNode(rel);
            link.setAttributeNode(href);

            head.appendChild(link);
        }
    }    

    return{
        getExtraJSFiles: getExtraJSFiles,
        loadCSSFiles: loadCSSFiles
    };

})(autocosts.JS_FILES,
   autocosts.SWITCHES,
   autocosts.COUNTRY,
   autocosts.UBER_API,
   autocosts.NOT_LOCALHOST,
   autocosts.LANGUAGE,
   autocosts.WORDS);

