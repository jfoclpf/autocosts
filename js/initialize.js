/* runs function initialize() every time the page is loaded */
window.onload = initialize;

function initialize() {

    //detects old versions of Internet Explorer
    oldIE();

    CurrentFormPart=1;

    TimeCounter.resetStopwatch();
    DISPLAY.result.isShowing = false; //global variable indicating whether the results are being shown

    //divs that need to be hidden
    DISPLAY.centralFrameWidth = document.getElementById('div2').offsetWidth;

    DISPLAY.descriptionHTML = $('#description').html();

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

    //defaults for the alert box
    $.fn.jAlert.defaults.size = 'sm';
    $.fn.jAlert.defaults.theme = 'default';
    $.fn.jAlert.defaults.closeOnClick = 'true';

    //Google recaptcha
    IS_HUMAN_CONFIRMED = false;
    $('#run_button').show();
    $('#run_button_noCapctha').hide();

    //renders according to Global swicthes
    if(!SWITCHES.print){
        $("#print_button").hide();
    }
    //deactivates pdf download button, to be activated only after pdf files are available
    if(!SWITCHES.pdf){
        $("#generate_PDF").prop("disabled",true).addClass("buttton_disabled");
    }

    //detects whether Google Analytics has loaded
    check_ga();
    
    scrollPage();
}

//detects whether Google Analytics has loaded
function check_ga() {
  
    if(IsThisAtest()){
        SERVICE_AVAILABILITY.g_analytics = false;
        return;
    }

    if (typeof ga === 'function') {
        SERVICE_AVAILABILITY.g_analytics = true;
    } else {
        SERVICE_AVAILABILITY.g_analytics = false;
        setTimeout(check_ga, 1000);
    }
}

//function that runs when the page is resized
$(window).resize(function() {
    resized();
});
$(window).trigger('resize');

/*Timer function*/
/* jshint ignore:start */
var TimeCounter = new (function () {
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