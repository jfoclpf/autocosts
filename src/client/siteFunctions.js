/******************* DOCUMENT JS FUNCTIONS *******************/
/*===========================================================*/
/*    General functions which are used overall on the site   */
/*************************************************************/


/*function that loads extra files and features, that are not loaded immediately after the page is opened
because such files and features are not needed on the initial page load, so that initial loading time can be reduced*/
function loadExtraFiles() {    

    if (SWITCHES.charts){        
        getScriptOnce(JS_FILES.chartjs);
        
        getScriptOnce(JS_FILES.drawCostsCharts, function() {           
            getScriptOnce(JS_FILES.printResults);
        });
    }
    else{
        getScriptOnce(JS_FILES.printResults);
    }

    if (SWITCHES.data_base){
        getScriptOnce(JS_FILES.dbFunctions);
    }

    //file JS_FILES.g_recaptcha is from this project and must always be loaded
   /* getScriptOnce(JS_FILES.g_recaptcha, function(){
        //Google Captcha API doesn't work nor applies on localhost
        if (SWITCHES.g_captcha && NOT_LOCALHOST){
            getScriptOnce(JS_FILES.Google.recaptchaAPI, function(){
                    SERVICE_AVAILABILITY.g_captcha = true;                    
                });
        }
        else{
            SERVICE_AVAILABILITY.g_captcha = false;
        }                 
     });*/
   

    if (SWITCHES.social){
        //Jquery social media share plugins
        getScriptOnce(JS_FILES.jssocials, function(){
            $('<link/>', {
               rel: 'stylesheet', type: 'text/css',
               href: 'css/social/jssocials.css'
            }).appendTo('head');
            $('<link/>', {
               rel: 'stylesheet', type: 'text/css',
               href: 'css/social/jssocials-theme-classic.css'
            }).appendTo('head');
        });
    }

    //uber
    if (SWITCHES.uber){
        if(COUNTRY!="XX"){//if not test version
            //gets asynchronously UBER information
            $.get(UBER_API_LOCAL_URL, function(data) {
                //alert(JSON.stringify(data, null, 4));
                if(data && !$.isEmptyObject(data)){
                    UBER_API =  data; //UBER_API is a global variable
                    console.log("uber data got from uber API: ", UBER_API);
                }
                else{
                    console.error("Error getting uber info");
                    SWITCHES.uber = false;
                }
            });
        }
        else{//test version (London city, in Pounds)
            UBER_API.cost_per_distance = 1.25;
            UBER_API.cost_per_minute = 0.15;
            UBER_API.currency_code = "GBP";
            UBER_API.distance_unit = "mile";
        }
    }

    if(SWITCHES.pdf || SWITCHES.print){
        //wait until all PDF related files are loaded
        //to activate the downloadPDF button
        getScriptOnce(JS_FILES.PDF.generatePDF, function() {
            getScriptOnce(JS_FILES.PDF.pdfmake, function() {
                //path where the fonts for PDF are stored
                var pdf_fonts_path;
                if (COUNTRY == 'CN'){
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts_CN;
                }
                else if (COUNTRY == 'JP'){
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts_JP;
                }
                else if (COUNTRY == 'IN'){
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts_IN;
                }
                else{
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts;
                }
                getScriptOnce(pdf_fonts_path, function() {
                    $('#button-pdf, #button-print').removeClass('disabled');
                });
            });
        });
    }
}


//Load statistics table on sidebars.hbs
function updateStatsTable (cc){                
    for (var key in STATS[cc]){
        var elementClass = "stats_table-"+key; //see sidebars.hbs
        if($("." + elementClass).length){//element exists
            var $el = $("." + elementClass);
            var value = STATS[cc][key];
            var currSymb = STATS[cc].curr_symbol; 
            if(key == "running_costs_dist" || key == "total_costs_dist"){
                $el.text(currSymb + round(value, 2) + "/" + getDistanceOptStrShort());
            }
            else if (key == "kinetic_speed" || key == "virtual_speed"){
                $el.text(round(value, 0) + getDistanceOptStrShort() + "/h");
            }
            else{
                $el.text(currSymb + " " + round(value, 0));
            }
        }   
    }    
}

function isInteger(n) {
    return (parseFloat(n) == parseInt(n, 10));
}

//isNaN stands for "is Not a Number", this function works whether n is a "number" or a "string"
//see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
function isNumber(n) {
    return !isNaN(n) && isFinite(parseFloat(n));
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "&#160;");
    return parts.join(".");
}

//adjusts the size of select according to content
function resizeSelectToContent(jqueryId){
    var $this = $(jqueryId);
    var arrowWidth = 10;
    // create test element
    var text = $this.find("option:selected").text();
    var $test = $("<span>").html(text).css({
        "font-size": $this.css("font-size"), // ensures same size text
        "visibility": "hidden"               // prevents FOUC
    });
    // add to parent, get width, and get out
    $test.appendTo($this.parent());
    var width = $test.width();
    $test.remove();
    // set select width
    $this.width(width + arrowWidth);    
}

//rounds a number
function round(number, precision) {
    var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
}

/* Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 * @returns {String} */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

//detects whether Google Analytics has loaded
function check_ga(t) {

    if(IsThisAtest()){
        SERVICE_AVAILABILITY.g_analytics = false;
        return;
    }

    if (typeof ga === 'function') {
        SERVICE_AVAILABILITY.g_analytics = true;
    } else {
        SERVICE_AVAILABILITY.g_analytics = false;
        setTimeout(check_ga, t);
    }
}

/*User Unique Identifier functions*/
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+"-"+S4()+"-"+S4());
}
UUID = guid();

//gets default protocol defined by Global Variable
//it returns either "http://" or "https://", i.e., it returns including the "://"
function getProtocol(){

    if (SWITCHES.https){
        return location.protocol + "//";
    }
    else{
        return "http://";
    }
}

//detects old versions of Internet Explorer
function oldIE(){
    var div = document.createElement("div");
    div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
    var isIeLessThan9 = (div.getElementsByTagName("i").length == 1);
    if (isIeLessThan9) {
        document.getElementById("main_div").innerHTML = "Please update your browser!";
        alert("Please update your browser!");
    }
}

/*function which returns whether this session is a (test/develop version) or a prod version */
function IsThisAtest() {

    if(COUNTRY=="XX"){
        return true;
    }

    //verifies top level domain
    var hostName = window.location.hostname;
    var hostNameArray = hostName.split(".");
    var posOfTld = hostNameArray.length - 1;
    var tld = hostNameArray[posOfTld];
    if(tld=="work"){
        return true;
    }

    return false;
}

/*Timer function*/
/* jshint ignore:start */
getScriptOnce(JS_FILES.jTimer, function(){
    
    //TimeCounter is defined as global variable in Globals.js
    TimeCounter = new function () {
        var incrementTime = 500;
        var currentTime = 0;
        $(function () {
            TimeCounter.Timer = $.timer(updateTimer, incrementTime, true);
        });
        function updateTimer() {
            currentTime += incrementTime;
        }
        this.resetStopwatch = function () {
            currentTime = 0;
        };
        this.getCurrentTimeInSeconds = function () {
            return currentTime / 1000;
        };
    };
    TimeCounter.resetStopwatch();    
});
/* jshint ignore:end */

/*The function below will create and add to the document all the stylesheets that you wish to load asynchronously.
(But, thanks to the Event Listener, it will only do so after all the window's other resources have loaded.)*/
function loadStyleSheets(styleSheets) {
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

//Get the applicable standard values
function getFuelEfficiencyOptStr(){
    switch(WORDS.fuel_efficiency_std_option){
        case 1:
            return "l/100km";            
        case 2:
            return "km/l";            
        case 3:
            return "mpg(imp)";
        case 4:
            return "mpg(US)";           
        case 5:
            return "l/mil";
        case 6:
            return "km/gal(US)";
        default: 
            return "error";
    }
}

function getDistanceOptStr(){
    switch(WORDS.distance_std_option){
        case 1:
            return "kilometres";            
        case 2:
            return "miles";            
        case 3:
            return "mil";
        default: 
            return "error";
    }
}

function getDistanceOptStrShort(){
    switch(WORDS.distance_std_option){
        case 1:
            return "km";            
        case 2:
            return "mi";            
        case 3:
            return "Mil";
        default: 
            return "error";
    }
}

function getFuelPriceVolumeOptStr(){
    switch(WORDS.fuel_price_volume_std){
        case 1:
            return "litres";            
        case 2:
            return "imperial gallons";            
        case 3:
            return "US gallons";
        default: 
            return "error";
    }
}

//puts the currency symbol after the money value, for certain countries
function currencyShow(value){

    if (typeof WORDS.invert_currency !== 'undefined' && 
            (WORDS.invert_currency == "true" || WORDS.invert_currency === true || WORDS.invert_currency=="1"))
    {
        return (value + " " + WORDS.curr_symbol);
    }
    else{
        return (WORDS.curr_symbol + " " + value);
    }
}

//the standard values are used if we want the form to be pre-filled
function loadsStandardValues(){

    //the key the name of the variable in WORDS
    //the value is the name of the id in the form
    var mappingIDs = {
        "std_acq_month" : "acquisitionMonth",
        "std_acq_year" : "acquisitionYear",
        "std_price_paid" : "commercialValueAtAcquisition",
        "std_price_today" : "commercialValueAtNow",
        "std_insurance_sem" : "insuranceValue",
        "std_loan" : "borrowedAmount",
        "std_period_of_credit" : "numberInstallments",
        "std_monthly_pay" : "amountInstallment",
        "std_residual_value" : "residualValue",
        "std_nbr_inspection" : "numberInspections",
        "std_inspection_price" : "averageInspectionCost",
        "std_road_tax" : "roadTaxes",
        "std_fuel_paid_per_month" : "fuel_currency_value",
        "std_days_per_week" : "car_to_work_number_days_week",
        "std_jorney_2work" : "car_to_work_distance_home_work",
        "std_jorney_weekend" : "car_to_work_distance_weekend",
        "std_km_per_month" : "no_car_to_work_distance",
        "std_car_fuel_efficiency" : "fuel_efficiency",
        "std_fuel_price" : "fuel_price",
        "std_maintenance_per_year" : "maintenance",
        "std_repairs" : "repairs",
        "std_parking" : "parking",
        "std_tolls" : "no_daily_tolls_value",
        "std_tolls_day" : "daily_expense_tolls",
        "std_tolls_days_per_month" : "number_days_tolls",
        "std_fines" : "tickets_value",
        "std_washing" : "washing_value",
        "std_nr_ppl_family" : "household_number_people",
        "std_pass_price" : "public_transportation_month_expense",
        "std_income_year" : "income_per_year",
        "std_income_month" : "income_per_month",
        "std_income_week" : "income_per_week",
        "std_income_hour" : "income_per_hour",
        "std_months_year" : "income_months_per_year",
        "std_hours_week" : "income_hours_per_week",
        "std_weeks_year" : "income_hour_weeks_per_year",
        "std_time_home_job" : "time_home_job",
        "std_time_weekend" : "time_weekend",
        "std_time_in_driving" : "min_drive_per_day",
        "std_days_month" : "days_drive_per_month",
        "std_time_month_per_year" : "time_month_per_year",
        "std_time_hours_per_week" : "time_hours_per_week",
        "std_dist_per_month"      : "dist_per_month"
    };

    $.each(mappingIDs, function(key, value){
        if($("#"+value).length && WORDS[key] !== undefined){
            $("#"+value).val(WORDS[key]);
        }
    });
}

//Banner that appears on the top of the page on mobile devices, and directs the user to Google Play App 
//Based on this npm package: https://www.npmjs.com/package/smart-app-banner
function loadSmartBanner(){    
    
    new SmartBanner({
        daysHidden: 15, // days to hide banner after close button is clicked (defaults to 15)
        daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
        appStoreLanguage: LANGUAGE, // language code for the App Store (defaults to user's browser language)
        title: WORDS.ac_mobile,
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
    }); 

    $(".smartbanner-icon").css("padding-right", "22px");
}


