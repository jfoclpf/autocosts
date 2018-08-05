$(document).ready(function () {
    
    //detects old versions of Internet Explorer
    oldIE();

    DISPLAY.result.isShowing = false; //global variable indicating whether the results are being shown

    getScriptOnce(JS_FILES.documentFunctions, function(){
        getScriptOnce(JS_FILES.formFunctions, function(){
            setLanguageVars();
            loadPageSettings();    
            loadFormSettings();
            loadFormHandlers();
            loadsStandardValues();
        });
    });

    /*Google Analytics*/
    if(navigator.userAgent.indexOf("Speed Insights") == -1 && !IsThisAtest() && SWITCHES.g_analytics) {        
        getScriptOnce(JS_FILES.Google.analytics, function(){
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date();                                
            //change according to your site
            ga('create', GA_TRACKING_ID, 'auto');
            ga('set', 'displayFeaturesTask', null);
            ga('send', 'pageview');        
        
            //detects whether Google Analytics has loaded
            //tries every second
            check_ga(1000);
        });                
    }
    
    //Google recaptcha
    IS_HUMAN_CONFIRMED = false;    
    
});

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
    $("select.time_period").each(function(){
        var $dropdown = $(this);
        $.each(SelectList, function(key, value) {
            $dropdown.append($("<option/>").val(key).text(value));
        });
    });
    
}


//settings and handlers of the elements on the landing page
function loadPageSettings(){     
    
    // All sides
    var sides = ["left", "right"];
    // Initialize sidebars
    for (var i = 0; i < sides.length; ++i) {
        var cSide = sides[i];
        $(".sidebar." + cSide).sidebar({side: cSide});
    }
    
    //hides the calculator form on the landing page
    $("#form, #results").hide();
    $(".sidebar").show();
    
    //button shown on the landing page
    $("#calculateButton").on("click", function(){
        $("#hero, footer").hide();
        $("#form").show();
        setIcon($(".field_container").first(), "active");
        
        //on test version shows everything right from the beginning
        if(COUNTRY=="XX"){
            $(".field_container").show();
        }
        
        getScriptOnce(JS_FILES.coreFunctions, function(){
            getScriptOnce(JS_FILES.validateForm);
            getScriptOnce(JS_FILES.conversionFunctions);
            getScriptOnce(JS_FILES.getData, function(){
                getScriptOnce(JS_FILES.printResults);
            });
        });
    });
    
    $("#country_select").on('change', function() {
        window.location.href = this.value;
    });
    
    //Sidebars click handlers
    $(".btn[data-action]").on("click", function () {
        var $this = $(this);
        var action = $this.attr("data-action");
        var side = $this.attr("data-side");
        
        if (action === "open"){            
            $(".sidebar." + side).trigger("sidebar:" + action);
            $(".sidebar." + side).animate({backgroundColor: "rgb(0, 0, 0, 0.4)" });
        }
        else if (action === "close"){
            $(".sidebar." + side).animate({backgroundColor: "rgb(0,0,0,0)"}, function(){
                $(".sidebar." + side).trigger("sidebar:" + action);
            });
        }
        else{
            console.error("Error in sidebar click hanlders");
        }        
        
        return false;
    });

    //close the sidebar
    $(".sidebar").on("click", function (event) {
        //detect if user clicks outside the sidebar, when sidebar is opened
        if($(event.target).hasClass("sidebar")){
            //closing the sidebar
            var $this = $(this);
            $this.animate({backgroundColor: "rgb(0,0,0,0)"}, function(){
                $this.trigger("sidebar:close");
            });
        }
    });
        
    resizeSelectToContent("#country_select");   
    
    //Load statistics table on sidebars.hbs
    var updateStatsTable = function (cc){                
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
    };
    
    updateStatsTable(COUNTRY);
    
    $("#country_select_stats").on('change', function() {
        updateStatsTable(this.value);
    });    
    
}

//initial settings regarding the calculator form itself
//that is, after the user has pressed "calculate" button on the landing page
function loadFormSettings(){
    
    //hides all buttons "next"
    $(".next").hide();    
    
    //hides form part head titles, except first
    //that is, it only shows Head Title "1. Standing costs"
    $(".form_part_head_title").each(function(index){
        if(index == 0){
            $(this).show();
        }
        else{
            $(this).hide();
        }
    });   
    
    //hides all fields except the first
    $(".field_container").each(function( index ) {
        if(index==0){
            $( this ).show();
        }
        else{
            $( this ).hide();
        }
    });    
    
    $(".calculate_bottom_bar").hide();
    
    $("#main_form select").val('1'); //set all the selects to "month"

    //PART 1
    //depreciation
    $("#acquisitionYear").attr("max", (new Date()).getFullYear());
    //credit
    $('#sim_credDiv').hide();
    
    //inspection    
    $("#numberInspections").val(0);
    $("#InspectionCost_tr").hide();
    $("#numberInspections").on("input", nbrInspectOnChanged);

    //PART 2
    //fuel
    $('#currency_div_form2').show();
    $('#distance_div_form2').hide();        
    fuelCalculationMethodChange('currency'); //sets radio button in Form Part 2, section Fuel calculations, to Currency

    //tolls
    tolls_daily(false);
    //fines
    $("#tickets_period_select").val('5'); //set fines period to year
    //washing    
    $("#washing_period_select").val('3'); //set washing period to trimester
    
    //PART 3
    //sets "Considering you drive to work?",  Distance section in Form Part 3, to No
    driveToJob(false);             
    //Income in Form Part 3 - set to year
    income_toggle("year");   
    
    //final buttons of the form
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
    
//handlers regarding the calculator form itself
//that is, after the user has pressed "calculate" button on the landing page
function loadFormHandlers(){
    
    //run button
    $("#calculate_costs_btn").on( "click", function(){Run2()});
    
    //button "next"; function buttonNextHandler is on formFunctions.js
    $(".button.btn-orange").on( "click", function(){
        buttonNextHandler($(this));
        //this is necessary to avoid default behaviour
        //avoid from scrolling to the top of page
        return false;    
    });
    
    //On 'input' would fire every time the input changes, so when one pastes something 
    //(even with right click), deletes and types anything. If one uses the 'change' handler, 
    //this will only fire after the user deselects the input box, which is not what we want.
    //inputHandler is defined in formFunctions.js
    $('input[type="number"]').on("input", function(){inputHandler($(this))});
    
    //it calls the same functions inputHandler after the radio button is changed
    //this onchange event is trigered after the onclick events down here
    $('input[type="radio"]').on("change", function(){inputHandler($(this))});      
    
    //keys handlers; function keyDownHandler is in formFunctions.js
    $(document).keydown(function(e){keyDownHandler($(this), e)});
    $('input[type="number"]').keydown(function(e){keyDownHandler($(this), e)});
    
    
    //PART 1
    //insurance
    setRadioButton("insurancePaymentPeriod", "semestral"); //insurance radio button set to half-yearly            

    //credit
    $("#cred_auto_true").on( "click", function(){onclick_div_show('#sim_credDiv',true)});
    $("#cred_auto_false").on( "click", function(){onclick_div_show('#sim_credDiv',false)});
    $("#cred_auto_false").prop("checked", true);   //radio button of credit set to "no"                

    //PART 2
    //fuel
    $("#radio_fuel_km").on( "click", function(){fuelCalculationMethodChange('distance')});
    $("#radio_fuel_euros").on( "click", function(){fuelCalculationMethodChange('currency')});
    $("#car_job_form2_yes").on( "click", function(){carToJob(true)});
    $("#car_job_form2_no").on( "click", function(){carToJob(false)});
    $("#radio_fuel_euros").prop("checked", true);  //radio button of fuel set to "money"   
    $("#car_job_form2_no").prop("checked", true);  //radio button (considering you drive to work? => no) 
    
    //tolls    
    $("#tolls_daily_true").on( "click", function(){tolls_daily(true)});
    $("#tolls_daily_false").on( "click", function(){tolls_daily(false)});
    $("#tolls_daily_false").prop("checked", true); //radio button (toll calculations based on day? => no)
    
    //PART 3
    $("#drive_to_work_yes_form3").on( "change", function(){driveToJob(true)});
    $("#drive_to_work_no_form3").on( "change", function(){driveToJob(false)});
    $("#working_time_yes_form3").on( "change", function(){working_time_toggle(true)});
    $("#working_time_no_form3").on( "change", function(){working_time_toggle(false)});
    //income
    $("#radio_income_year").on( "change", function(){income_toggle("year")});
    $("#radio_income_month").on( "change", function(){income_toggle("month")});
    $("#radio_income_week").on( "change", function(){income_toggle("week")});
    $("#radio_income_hour").on( "change", function(){income_toggle("hour")});
    $("#radio_income_year").prop("checked", true); //radio button (what is your net income => per year)    
    
    //Final buttons    
    $("#rerun_button").on( "click", function(){reload()});
    $("#print_button").on( "click", function(){Print()});
    $("#generate_PDF").on( "click", function(){generatePDF()});    
    $("#run_button, #run_button_noCapctha").on( "click", function(){Run1();});
    
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

