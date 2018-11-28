/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* MAIN MODULE */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules */

var autocosts = (function(){

    var mainVariables = {
        main:{
            calculatedData: undefined,              //calculated meta-data after user clicks "Run"
            formData: undefined,                    //Form data filled by the user
            uberApiObj: undefined,                  //UBER API object with city specific costs (cost per km, per minute, etc.)
            databaseObj: undefined                  //Object from user form, that is stored in database
        },
        paths:{
            jsFiles: undefined,                     //Object with locations of Javascript Files
            url: {
                domainUrl: undefined,               //current domain URL, example 'http://autocosts.info'
                fullUrl: undefined,                 //full URL of the page, example 'http://autocosts.info/XX'
                pageUrl: undefined,                 //current page URL, example 'http://autocosts.info/UK'
                cdnUrl: undefined,                  //it's defined in the node server side index.js
                uberApi: undefined                  //uber url to get UBER API information through AJAX
            },
            dirs:{
                clientDir: undefined,               //client directory seen by the browser
                languagesJsonDir: undefined         //Directory of JSON Translation files
            }
        },
        statistics:{
            statisticsObj: undefined,               //Object with countrys' users costs statistics
            statisticsHtmlTablesDir: undefined,     //Directory of statistical html tables
            statisticsJpgTablesDir: undefined       //Directory of statistical jpg tables
        },
        serverInfo:{
            switches: undefined,                    //GLOBAL switches Object, got from server configuration
            selectedCountry: undefined,             //Current Country Code
            countryListObj: undefined,              //List of countries in a Javascript Object
            domainListObj: undefined,               //List of domains in a Javascript Object
            language: undefined,                    //Current Language Code according to ISO_639-1 codes
            translatedStrings: undefined,           //Object with country's language text strings
            nonce: undefined,                       //Number used only once for CSP rules in scrips
            httpProtocol: undefined,                //it's defined in node server side index.js*/
            googleAnalyticsTrackingId: undefined,   //Google analytics Tracking ID
            booleans:{
                isATest: undefined,                 //server refers that this session is a test
                notLocalhost: undefined             //true when this session does not come from localhost
            }
        },
        servicesAvailabilityObj: {
            googleCaptcha: false,                   //variable that says whether Google Captcha JS files are available
            googleAnalytics: false,                 //variable that says whether Google Analytics JS files are available
            uber: false
        },
        userInfo: {
            uniqueUserId: undefined,                //Unique User Identifier
            isHumanConfirmed: false,                //for Google reCaptcha
            timeCounter: undefined                  //function used for assessing the time user takes to fill the form
        }
    };


    //gets switches from server side configuration
    (function(){
        var globalSwitches = document.getElementById('global_switches');
        mainVariables.serverInfo.switches = {
            https: JSON.parse(globalSwitches.dataset.https),                 /*true for https, false for http*/
            uber: JSON.parse(globalSwitches.dataset.uber),                   /*Uber*/
            social: JSON.parse(globalSwitches.dataset.social),               /*Social media pulgins*/
            charts: JSON.parse(globalSwitches.dataset.charts),               /*Charts*/
            googleCaptcha: JSON.parse(globalSwitches.dataset.g_captcha),     /*Google Captcha*/
            googleAnalytics: JSON.parse(globalSwitches.dataset.g_analytics), /*Google Analytics*/
            database: JSON.parse(globalSwitches.dataset.data_base),         /*Inserts user input data into DataBase*/
            print: JSON.parse(globalSwitches.dataset.print),                 /*Print option*/
            pdf: JSON.parse(globalSwitches.dataset.pdf)                      /*Download PDF report option*/
        };
        //freezes switches on client such that its properties cannot be changed
        //since these switches are only defined by the server
        Object.freeze(mainVariables.serverInfo.switches);
    })();

    //gets main module's global variables from server side configuration
    (function(){
        var globalVariables = document.getElementById('global_variables');

        //information obtained from the server
        mainVariables.serverInfo.selectedCountry = globalVariables.dataset.country;
        mainVariables.serverInfo.countryListObj = JSON.parse(decodeURI(globalVariables.dataset.country_list));
        mainVariables.serverInfo.domainListObj = JSON.parse(decodeURI(globalVariables.dataset.domain_list));
        mainVariables.serverInfo.language = globalVariables.dataset.language;
        mainVariables.serverInfo.translatedStrings = JSON.parse(decodeURI(globalVariables.dataset.words));
        mainVariables.serverInfo.nonce = globalVariables.dataset.nonce;
        mainVariables.serverInfo.httpProtocol = globalVariables.dataset.http_protocol;
        mainVariables.serverInfo.googleAnalyticsTrackingId = globalVariables.dataset.ga_tracking_id;

        //booleans
        mainVariables.serverInfo.booleans.isATest = JSON.parse(globalVariables.dataset.is_this_a_test);  //server refers that this session is a test
        mainVariables.serverInfo.booleans.notLocalhost = JSON.parse(globalVariables.dataset.not_localhost);

        //paths
        mainVariables.paths.url.cdnUrl = globalVariables.dataset.cdn_url;
        mainVariables.paths.dirs.clientDir = globalVariables.dataset.client_dir;

        mainVariables.statistics.statisticsObj = JSON.parse(decodeURI(globalVariables.dataset.stats));

    })();

    //defines some main module global variables
    (function(){

        var selectedCountry = mainVariables.serverInfo.selectedCountry;

        mainVariables.main.uberApiObj = {};
        mainVariables.paths.url.uberApi = "getUBER/" + selectedCountry;

        /*forms present page full url, example 'http://autocosts.info' */
        mainVariables.paths.url.domainUrl = mainVariables.serverInfo.httpProtocol + "://" + mainVariables.serverInfo.domainListObj[selectedCountry];
        mainVariables.paths.url.fullUrl = window.location.href;

        /*forms present page full url, example 'http://autocosts.info/UK' */
        mainVariables.paths.url.pageUrl = mainVariables.serverInfo.httpProtocol + "://" +
                                          mainVariables.serverInfo.domainListObj[selectedCountry] + "/" +
                                          selectedCountry;

        var cdnUrl = mainVariables.paths.url.cdnUrl;
        mainVariables.paths.dirs.translationsDir = cdnUrl + "countries" + "/";       // Directory of JSON Translation files
        mainVariables.statistics.statisticsHtmlTablesDir = cdnUrl + "tables" + "/";  // Directory of statistical html tables
        mainVariables.statistics.statisticsJpgTablesDir = cdnUrl + "tables" + "/";   // Directory of statistical jpg tables

    })();

    //Sets location of Javascript Files (some defined in /commons.js)
    (function(){
        var globalVariables = document.getElementById('global_variables');
        var jsfilesDefinedByServer = JSON.parse(decodeURI(globalVariables.dataset.js_files));
        var rootClientURL = mainVariables.paths.url.cdnUrl + mainVariables.paths.dirs.clientDir + "/";

        /*var recaptchaFunction = "autocosts.resultsModule.runResultsModule.recaptchaCallback";*/

        mainVariables.paths.jsFiles = {
            google : {
                recaptchaAPI : jsfilesDefinedByServer.GrecaptchaAPI +
                    /*"?onload=" + recaptchaFunction + */
                    "?render=explicit&hl=" + mainVariables.serverInfo.language,
                analytics    : jsfilesDefinedByServer.Ganalytics
            },

            //core functions
            calculator :          rootClientURL + "core/calculator.js",
            conversions :         rootClientURL + "core/conversions.js",

            initialize :          rootClientURL + "initialize.js",
            commons :             rootClientURL + "commons.js",
            userForm :            rootClientURL + "userForm.js",
            validateForm :        rootClientURL + "validateForm.js",
            runResults :          rootClientURL + "runResults.js",
            transferData :        rootClientURL + "transferData.js",
            results :             rootClientURL + "results.js",
            database :            rootClientURL + "database.js",

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

            charts :              rootClientURL + "chart/charts.js",
            chartjs :             rootClientURL + "chart/chartjs.min.js",
            smartAppBanner:       rootClientURL + "smart-app-banner.js"
        };

        Object.freeze(mainVariables.paths.jsFiles);
    })();

    return mainVariables;

})();


/***********************************************************************/

/* GET FILES MODULE */
/* Module used to get extra files with JS or CSS code */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules */

//module for getting JS, CSS or other files
autocosts.getFilesModule = (function(jsFiles, switches, country, notLocalhost, translatedStrings, uberApiUrl){
    
    function getUberInfo(){

        var $deferredEvent = $.Deferred();

        if(country != "XX"){//if not test version
            //gets asynchronously UBER information
            $.get(uberApiUrl).
            done(function(data) {
                //alert(JSON.stringify(data, null, 4));
                if(data && !$.isEmptyObject(data)){
                    autocosts.main.uberApiObj =  data; //uberApi is a global variable
                    //console.log("uber data got from uber API: ", data);
                    autocosts.servicesAvailabilityObj.uber = true;
                    console.log("Uber info loaded OK");
                }
                else{                    
                    autocosts.servicesAvailabilityObj.uber = false;
                    console.warn("No uber info");
                }
                $deferredEvent.resolve();
            }).
            fail(function(){
                autocosts.servicesAvailabilityObj.uber = false;
                console.warn("No uber info");  
                $deferredEvent.resolve();
            });
        }
        else{//test version (London city, in Pounds)
            var uberApi = {};
            uberApi.cost_per_distance = 1.25;
            uberApi.cost_per_minute = 0.15;
            uberApi.currency_code = "GBP";
            uberApi.distance_unit = "mile";

            autocosts.main.uberApiObj = uberApi;
            autocosts.servicesAvailabilityObj.uber = true;

            $deferredEvent.resolve();
        }

        return $deferredEvent;
    }

    function getPdfJsFiles(){
        
        var $deferredEvent = $.Deferred();

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
                $.getScript(pdf_fonts_path).done( function() {
                    console.log("All pdf related files loaded OK");
                    $deferredEvent.resolve();
                });
            });
        });

        return $deferredEvent;
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

    /*function that loads extra files and features, that are not loaded immediately after the page is opened
    because such files and features are not needed on the initial page load, so that initial loading time can be reduced*/
    function loadDeferredJSFiles(callback){

        var promisesArray = [$.getScript(jsFiles.calculator),
                             $.getScript(jsFiles.conversions),
                             $.getScript(jsFiles.smartAppBanner),
                             $.getScript(jsFiles.transferData),
                             $.getScript(jsFiles.results),
                             $.getScript(jsFiles.runResults),
                             $.getScript(jsFiles.userForm),
                             $.getScript(jsFiles.validateForm)];

        if (switches.charts){
            promisesArray.push($.getScript(jsFiles.chartjs));
            promisesArray.push($.getScript(jsFiles.charts));
        }
        if (switches.database){
            promisesArray.push($.getScript(jsFiles.database));
        }
        if(switches.pdf || switches.print){
            promisesArray.push(getPdfJsFiles());
        }
        if(switches.uber){
            promisesArray.push(getUberInfo());
        }
        if (switches.googleCaptcha && notLocalhost){
            promisesArray.push($.getScript(jsFiles.google.recaptchaAPI));
        }

        $.when.apply($, promisesArray).then(function(){
            callback();
        }, function(){
            console.error("Some of the files in loadDeferredJSFiles() were not loaded");
        });
    }

    /*=== Public methods ===*/

    function loadInitialFiles(){   
        
        $.when(
            $.getScript(jsFiles.jQueryColor), 
            $.getScript(jsFiles.jQuerySidebar),
            $.getScript(jsFiles.initialize),
            $.getScript(jsFiles.commons)).
        then(function(){            
            console.log("All initial JS files loaded OK");                       
            autocosts.initializeModule.initialize(); 
            autocosts.commonsModule.initialize(); 
            
        }, function(){
            console.error("Some of the files in loadInitialFiles() were not loaded");   
        });
    }

    function loadDeferredFiles(callback){
        //loadCSSFiles(['css/merged_deferred.css']);
        loadCSSFiles(['css/results.css', 'css/smart-app-banner.css']); //temporary line

        loadDeferredJSFiles(function(){
            console.log("All deferred JS files loaded OK");
            
            autocosts.calculatorModule.initialize();
            autocosts.resultsModule.initialize();
            autocosts.transferDataModule.initialize();
            autocosts.resultsModule.runResultsModule.initialize();   
                               
            autocosts.userFormModule.initialize(); 
            autocosts.userFormModule.validateFormModule.initialize();

            if(switches.pdf || switches.print){
                autocosts.resultsModule.pdfModule.initialize();
            }
            
            if(switches.database){
                autocosts.databaseModule.initialize();
            }
            
            callback();            
        });
    }

    return{
        loadInitialFiles: loadInitialFiles,
        loadDeferredFiles: loadDeferredFiles
    };

})(autocosts.paths.jsFiles,
   autocosts.serverInfo.switches,
   autocosts.serverInfo.selectedCountry,
   autocosts.serverInfo.booleans.notLocalhost,
   autocosts.serverInfo.translatedStrings,
   autocosts.paths.url.uberApi);


//the whole program indeed starts here
$(document).ready(function () {
    autocosts.getFilesModule.loadInitialFiles();
});

