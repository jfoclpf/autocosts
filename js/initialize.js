/* runs function initialize() every time the page is loaded */
window.onload = initialize;

function initialize() {
    //detects old versions of Internet Explorer
    oldIE();
    
    TimeCounter.resetStopwatch();
    ResultIsShowing=false;
    
    //divs that need to be hidden    
    frame_witdh = document.getElementById('monthly_costs').offsetWidth;
    
    //hides the results divs and correspondent class
    $("#monthly_costs, #result_buttons_div, #pie_chart_div, #bar_chart_div, .result_section").hide();
    $("#input_div, #div1, #div3").show();
    
    $("#form_part2, #form_part3").hide();
    $("#form_part1").show();

    ResultIsShowing=false; //global variable indicating whether the results are being shown
    DescriptionHTML = $('#description').html();
    
    //make some initial settings in the options of the form
    $('#numberInspections').val(0);
    $("#InspectionCost_tr").hide();
    
    tolls_daily(false);
    
    document.getElementById("radio_fuel_euros").checked = true;
    $('#currency_div_form2').show();
    $('#distance_div_form2').hide();
    document.getElementById("radio_cred_nao").checked = true;
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

    //Google recaptcha
    isHumanConfirmed = false; 
    $('#run_button').show();
    $('#run_button_noCapctha').hide();
}

//function that runs when the page is resized
$(window).resize(function() {
    resized();
});
$(window).trigger('resize');

/*Timer function*/
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

/*User Unique Identifier functions*/
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+"-"+S4()+"-"+S4());
}
uuid = guid();