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


(function initialize() {

    getScriptOnce(JS_FILES.validateForm);

    //detects old versions of Internet Explorer
    oldIE();

    CurrentFormPart=1;

    DISPLAY.result.isShowing = false; //global variable indicating whether the results are being shown

    DISPLAY.descriptionHTML = $('#description').html();

    getScriptOnce(JS_FILES.documentFunctions, function(){
        getScriptOnce(JS_FILES.formFunctions, setLanguageVars);
    });

    getScriptOnce(JS_FILES.jAlert, function(){
        //defaults for the alert box
        $.fn.jAlert.defaults.size = 'sm';
        $.fn.jAlert.defaults.theme = 'default';
        $.fn.jAlert.defaults.closeOnClick = 'true';

    });

    /*Google Analytics*/
    if(navigator.userAgent.indexOf("Speed Insights") == -1 && !IsThisAtest() && SWITCHES.g_analytics) {
        (function(i, s, o, g, r, a, m) {
            i.GoogleAnalyticsObject = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        //change according to your site
        ga('create', GA_TRACKING_ID, 'auto');
        ga('send', 'pageview');
        
        //detects whether Google Analytics has loaded
        //tries every second
        check_ga(1000);
    }
    
})();

//function that sets the JS language variables to the correspondent HTML divs
function setLanguageVars(){

    //language HTML select dropdowns
    var SelectList = {
        "1" : WORDS.month,
        "2" : WORDS.two_months,
        "3" : WORDS.trimester,
        "4" : WORDS.semester,
        "5" : WORDS.year
    };
    $('select[class="time_period"]').each(function(){
        var $dropdown = $(this);
        $.each(SelectList, function(key, value) {
            $dropdown.append($("<option/>").val(key).text(value));
        });
    });

    initializeForm();
    loadsDefaultValues();
    loadsButtonsSettings();

    scrollPage(resized);
}

function initializeForm(){

    setRadioButton("insurancePaymentPeriod", "semestral");
    $("#main_form select").val('1'); //set all the selects to "month"
    $("#tickets_period_select").val('5'); //set fines period to year
    $("#washing_period_select").val('3'); //set washing period to trimester

    //make some initial settings in the options of the form
    $('#numberInspections').val(0);
    $("#InspectionCost_tr").hide();

    tolls_daily(false);

    document.getElementById("radio_fuel_euros").checked = true;
    $('#currency_div_form2').show();
    $('#distance_div_form2').hide();
    document.getElementById("cred_auto_false").checked = true;
    $('#sim_credDiv').hide();

    //sets "Considering you drive to work?",  Distance section in Form Part 3, to No
    driveToJob(false);
    //sets radio button in Form Part 2, section Fuel calculations, on Currency
    fuelCalculationMethodChange('currency');
    carToJob(false);

    //set public transporsts and fin. effort main DIVs to no
    $('#slider1').checked = false;
    $('#public_transp_Div_form3').hide();
    $('#slider1').checked = false;
    $('#fin_effort_Div_form3').hide();
    $("#distance_time_spent_driving_form3").hide();

    //align radio button text
    $("#main_form input:radio").siblings("span").css("vertical-align", "text-bottom");

    //Google recaptcha
    IS_HUMAN_CONFIRMED = false;
    $('#run_button').show();
    $('#run_button_noCapctha').hide();

    //console.log(SWITCHES);
    //renders according to Global swicthes
    if(!SWITCHES.print){
        $("#print_button").hide();
    }
    else{
        $("#print_button").show();    
    }
    
    if(!SWITCHES.pdf){
        $("#generate_PDF").hide();
    }
    else{
        $("#generate_PDF").show();
    }

}

function loadsDefaultValues(){

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
        "std_days_month" : "days_drive_per_month"
    };

    $.each(mappingIDs, function(key, value){
        $("#"+value).val(WORDS[key]);
    });

}

function loadsButtonsSettings(){

    //associate click functions with buttons
    $("#run_button, #run_button_noCapctha").attr("onclick", "Run1()");
    //associate click functions with buttons
    $("#rerun_button").attr("onclick", "reload()");
    $("#print_button").attr("onclick", "PrintElem()");
    $("#generate_PDF").attr("onclick", "generatePDF()");
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

/*Timer function*/
/* jshint ignore:start */
getScriptOnce(JS_FILES.jTimer, function(){
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

/*User Unique Identifier functions*/
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+"-"+S4()+"-"+S4());
}
uuid = guid();

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


