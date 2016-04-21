/* runs function initialize() every time the page is loaded */
window.onload = initialize;
function initialize() {
    openForm_part("form_part", 0, 1); /*shows just part 1 of input form*/
    
    //divs that need to be hidden
    input_object = document.getElementById('input_div'); /*tabela de entrada*/
    result_object = document.getElementById('result_div'); /*resultados*/
    frame_witdh = document.getElementById('result_div').offsetWidth;
    reload_object = document.getElementById('reload_div'); /*reload button*/
    pie_chart_object = document.getElementById('pie_chart_div'); /*pie chart*/
    bar_chart_object = document.getElementById('bar_chart_div'); /*columns chart*/
    text_object = document.getElementById('text_div'); /*msg text*/
    //hide divs that shall not appear on the front page 
    reload();
    //make some initial settings in the options of the form
    tolls_daily(false);
    document.getElementById("radio_fuel_euros").checked = true;
    $('#eurosDiv').css("display", "block");
    $('#kmDiv').css("display", "none");
    document.getElementById("radio_cred_nao").checked = true;
    $('#sim_credDiv').css("display", "none");
    //sets "Considering you drive to work?",  Distance section in Form Part 3, to No 
    driveToJob(false);
    //sets radio button in Form Part 2, section Fuel calculations, on Currency
    fuelCalculationMethodChange('currency');
    carToJob(false);
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