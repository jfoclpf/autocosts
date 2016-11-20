/* runs function initialize() every time the page is loaded */
window.onload = initialize;
var isUserHuman = false; //global variable for Google reCaptcha

function initialize() {
    openForm_part("form_part", 0, 1); /*shows just part 1 of input form*/
    
    //divs that need to be hidden
    input_object = document.getElementById('input_div'); /*entry form*/
    
    result_object = document.getElementById('monthly_costs'); /*results*/
    frame_witdh = document.getElementById('monthly_costs').offsetWidth;
    pie_chart_object = document.getElementById('pie_chart_div'); /*pie chart*/
    bar_chart_object = document.getElementById('bar_chart_div'); /*columns chart*/
    
    fin_effort_table_object = document.getElementById('fin_effort');
    public_transport_table_object = document.getElementById('public_transp');
    extern_costs_table_object = document.getElementById('extern_costs');
    
    reload_object = document.getElementById('reload_div'); /*reload button*/

    main_table_object = document.getElementById('main_table');

    
    //hide divs that shall not appear on the front page 
    reload(true);
    ResultIsShowing=false; //global variable indicating whether the results are being shown
    DescriptionHTML = $('#description').html();
    
    //make some initial settings in the options of the form
    tolls_daily(false);
    document.getElementById("radio_fuel_euros").checked = true;
    $('#currency_div_form2').css("display", "block");
    $('#distance_div_form2').css("display", "none");
    document.getElementById("radio_cred_nao").checked = true;
    $('#sim_credDiv').css("display", "none");
    
    //sets "Considering you drive to work?",  Distance section in Form Part 3, to No 
    driveToJob(false);
    //sets radio button in Form Part 2, section Fuel calculations, on Currency
    fuelCalculationMethodChange('currency');
    carToJob(false);
    
    //Shows Google reCaptcha
    if (Country!='XX'){
        ShowGoogleReCaptcha(true);
    }
    else{
        ShowGoogleReCaptcha(false);
    }
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