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
            translationWords: undefined,            //Object with country's language text strings            
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
        displayObj: undefined,                      //Object regarding the display of information
        user: {
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
            data_base: JSON.parse(globalSwitches.dataset.data_base),         /*Inserts user input data into DataBase*/
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
        mainVariables.serverInfo.translationWords = JSON.parse(decodeURI(globalVariables.dataset.words));
        mainVariables.serverInfo.nonce = globalVariables.dataset.nonce;    
        mainVariables.serverInfo.httpProtocol = globalVariables.dataset.http_protocol;        
        mainVariables.serverInfo.googleAnalyticsTrackingId = globalVariables.dataset.ga_tracking_id;        
        
        //booleans
        mainVariables.serverInfo.booleans.isATest = globalVariables.dataset.is_this_a_test;  //server refers that this session is a test
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

        /*Global Object regarding the display of information*/
        //THIS SHOULD GO TO MODULE SHOW RESULTS
        mainVariables.displayObj = {
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

    })();

    //Sets location of Javascript Files (some defined in /commons.js)
    (function(){
        var globalVariables = document.getElementById('global_variables');
        var jsfilesDefinedByServer = JSON.parse(decodeURI(globalVariables.dataset.js_files));
        var rootClientURL = mainVariables.paths.url.cdnUrl + mainVariables.paths.dirs.clientDir + "/";
        
        mainVariables.paths.jsFiles = {
            google : {
                recaptchaAPI : jsfilesDefinedByServer.GrecaptchaAPI + "?onload=grecaptcha_callback&render=explicit&hl=" + mainVariables.serverInfo.language,
                analytics    : jsfilesDefinedByServer.Ganalytics
            },

            //core functions
            calculator :          rootClientURL + "core/calculator.js",            
            conversions :         rootClientURL + "core/conversions.js",
            
            initialize :          rootClientURL + "initialize.js",
            userForm :            rootClientURL + "userForm.js",
            validateForm :        rootClientURL + "validateForm.js",
            g_recaptcha :         rootClientURL + "g-recaptcha.js",
            transferData :        rootClientURL + "transferData.js",
            results :             rootClientURL + "results.js",
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
autocosts.getFilesModule = (function(jsFiles, switches, country, notLocalhost, language, translationWords, uberApiUrl){

    $(document).ready(function () {
        $.getScript(jsFiles.jQueryColor);
        $.getScript(jsFiles.jQuerySidebar, function(){
            $.getScript(jsFiles.initialize, function(){
                $.getScript(jsFiles.userForm, function(){
                    $.getScript(jsFiles.validateForm);
                    autocosts.initializeModule.initialize();
                    autocosts.userFormModule.initialize();
                });
            });
        });
    }); 
    
    function getUber(){
        if (switches.uber){
            if(country != "XX"){//if not test version
                //gets asynchronously UBER information
                $.get(uberApiUrl, function(data) {
                    //alert(JSON.stringify(data, null, 4));
                    if(data && !$.isEmptyObject(data)){
                        autocosts.main.uberApiObj =  data; //uberApi is a global variable
                        console.log("uber data got from uber API: ", data);
                        autocosts.servicesAvailabilityObj.uber = true;
                    }
                    else{
                        console.error("Error getting uber info");
                        autocosts.servicesAvailabilityObj.uber = false;
                    }                    
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
            title: translationWords.ac_mobile,
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

        $.getScript(jsFiles.calculator, function(){
            $.getScript(jsFiles.conversions);

            $.getScript(jsFiles.smartAppBanner, loadSmartBanner);

            $.getScript(jsFiles.transferData, function(){

                if (switches.charts){
                    $.getScript(jsFiles.chartjs);

                    $.getScript(jsFiles.results, function() {
                        autocosts.resultsModule.initialize();
                        $.getScript(jsFiles.charts);
                        getPdfJsFiles();
                    });
                }
                else{
                    $.getScript(jsFiles.results, function(){
                        autocosts.resultsModule.initialize();
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
                        //when loaded successfuly set servicesAvailabilityObj.googleCaptcha=true in function grecaptcha_callback in g-recaptcha.js
                    }
                    else{
                        autocosts.servicesAvailabilityObj.googleCaptcha = false;
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

})(autocosts.paths.jsFiles,
   autocosts.serverInfo.switches,
   autocosts.serverInfo.selectedCountry,
   autocosts.serverInfo.booleans.notLocalhost,
   autocosts.serverInfo.language,
   autocosts.serverInfo.translationWords,
   autocosts.paths.url.uberApi);

