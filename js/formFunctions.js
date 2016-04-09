var income = 'year';
var isDistanceSet = false;

var hasLoadedPart = [false, false, false, false]; //global array variable for function openForm_part
function openForm_part(part_name, part_number_origin, part_number_destiny, country) {
    //alert("from "+part_number_origin+" to "+part_number_destiny +" - country:"+country);

    //shows form part n and hides the other parts
    function shows_part(n){
        for (var p = null, i = 1; p = document.getElementById(part_name+i); ++i) {
            if (i == n)
                p.style.display = "";
            else
                p.style.display = "none";
        }       
    }

    //change from form part 1 to 2
    if (part_number_origin==1 && part_number_destiny==2){
        
        if (!hasLoadedPart[0]){
            $.getScript('js/coreFunctions.js', function(){
                $.getScript('https://www.google.com/jsapi', function(){
                    hasLoadedPart[0] = true;
                    if (!is_userdata_formpart1_ok())
                        return;
                    shows_part(2);
                });
            });                                             
        }
        else{
            if (!is_userdata_formpart1_ok())
                return;
            shows_part(2);
        }
        
        if (!hasLoadedPart[1]){
            $.getScript('js/conversionFunctions.js'); 
            $.getScript('db_stats/statsFunctions.js'); 
            $.getScript('js/get_data.js');
            $.getScript('php/print_results.php?country='+country); 
            $.getScript('php/charts_js.php?country='+country);
            hasLoadedPart[1] = true;
        }
    }
    
    //change from form part 2 to 3
    if (part_number_origin==2 && part_number_destiny==3){
        if (!is_userdata_formpart2_ok())
            return;
        
        if (!hasLoadedPart[2]){
            google.load('visualization', '1', {'packages': ['corechart'], 'callback': function(){
                hasLoadedPart[2]=true;
                shows_part(3);
            }});
        }
        else{
            shows_part(3);
        }
        
        if (!hasLoadedPart[3]){
            $.getScript('js/google/rgbcolor.js');
            $.getScript('js/google/canvg.js');
            $.getScript('js/pdf/generatePDF.js');
            $.getScript('js/pdf/html2canvas.js'); 
            $.getScript('js/pdf/jspdf.js'); 
            $.getScript('js/pdf/jspdf.plugin.addimage.js'); 
            $.getScript('js/pdf/pdfmake.js'); 
            $.getScript('js/pdf/vfs_fonts.js');
            hasLoadedPart[3]=true;
        }
    }
    
    //change from form part 3 to 2
    if (part_number_origin==3 && part_number_destiny==2){
        shows_part(2);
    }
    
    //change from form part 2 to 1
    if (part_number_origin==2 && part_number_destiny==1){
        shows_part(1);
    }    

    //when it starts/loads the website
    if (part_number_origin==0 && part_number_destiny==1){
        window.location.hash = "div2"; 
        window.scrollBy(0,32);
        shows_part(1);
    }
    else{
        window.location.hash = "";
    }
    
    removeHash();
    return;
}

function valueselect(myval) {
    window.location.href = "" + myval;
}

/*jslint browser:true */
/*jslint white: false */

/*printing functions*/
function PrintElem(elem1, elem2, elem3, elem4, title)
{
    Popup($(elem1).html(), $(elem2).html(), $(elem3).html(), $(elem4).html(), title);
}

function Popup(data1, data2, data3, data4, title) 
{
    var mywindow = window.open('', title, 'height=600,width=600');
    mywindow.document.write('<html><head><title>'+title+'</title>');
    //mywindow.document.write('<link rel="stylesheet" href="css/print.css" type="text/css">');
    mywindow.document.write('</head><body style="font-family: Verdana, Geneva, sans-serif; text-align: center;">');
    mywindow.document.write('<center><div style="margin-left: auto; margin-right: auto; width: 90%; text-align: center;">');
    mywindow.document.write('<h3>'+title+'</h3>');
    
    mywindow.document.write(data1);
    mywindow.document.write('<br>');
    mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        
    mywindow.document.write(data2);
    mywindow.document.write('<br><br>');
    
    mywindow.document.write(data3);
    mywindow.document.write('<br><br>');
    
    mywindow.document.write(data4);
    mywindow.document.write('</div></center>');
    mywindow.document.write('</body></html>');

    mywindow.print();
    mywindow.close();

    return true;
}
/*end of printing functions*/

function fuelCalculationMethodChange(fuelCalculationMethod) {
    if (fuelCalculationMethod === 'currency') {
        isDistanceSet = false;
        $('.distance_part').each(function(){ $(this).show(); });
        $('#eurosDiv').css("display", "block");
        $('#kmDiv').css("display", "none");
        $('.time_spent_part_1').each(function(){ $(this).hide(); });
        $('.time_spent_part_2').show();
        $('#drive_to_work_no').prop('checked', true);
    } else if (fuelCalculationMethod === 'distance') {
        isDistanceSet = true;
        $('.distance_part').each(function(){ $(this).hide(); });
        $('#eurosDiv').css("display", "none");
        $('#kmDiv').css("display", "block");

        var temp3;
        temp3 = document.getElementById('carro_emprego_nao');
        temp3.checked = true;
        carToJob(false);
    } else {
        console.log("wtf just happened? Either is distance or currency... make up your mind developer");
    }
}

function carToJob(carToJobFlag) {
    if (carToJobFlag) {
        $('#carro_emprego_sim_Div').css("display", "block");
        $('#carro_emprego_nao_Div').css("display", "none");
        $('.time_spent_part_1').each(function(){ $(this).show(); });
        $('.time_spent_part_2').hide();
    } else {
        $('#carro_emprego_sim_Div').css("display", "none");
        $('#carro_emprego_nao_Div').css("display", "block");
        $('.time_spent_part_1').each(function(){ $(this).hide(); });
        $('.time_spent_part_2').show();
    }
}

function driveToJob(flag){
    if(flag){
        $('.car_to_job_part').each(function(){ $(this).show(); });
        $('.time_spent_part_1').each(function(){ $(this).show(); });
        $('.time_spent_part_2').hide();
        $('#car_no_job_part').hide();
    }
    else{
        $('.car_to_job_part').each(function(){ $(this).hide(); });
        $('.time_spent_part_1').each(function(){ $(this).hide(); });
        $('.time_spent_part_2').show();
        $('#car_no_job_part').show();
    }
}

function onclick_credit(flag) {
    if(flag == 'true') {
        $('#sim_credDiv').css("display", "block");
    } else {
        $('#sim_credDiv').css("display", "none");
    }
}

function tolls_daily(tollsDailyFlag) {
    if (tollsDailyFlag) {
        $('#dia_nao_portag_DIV').css("display", "none");
        $('#dia_sim_portag_DIV').css("display", "block");
    } else {
        $('#dia_nao_portag_DIV').css("display", "block");
        $('#dia_sim_portag_DIV').css("display", "none");
    }
}

function isNumber(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n) && n >= 0);
}

function isInteger(n) {
    return (parseFloat(n) == parseInt(n, 10));
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "<p1>&#160;<\/p1>");
    return parts.join(".");
}

function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}

function income_toggle(value){
    switch(value){
        case 'year':
            $('#div_income_per_year, #working_time_part').removeClass('hidden').show();
            $('#div_income_per_month, #div_income_per_week, #div_income_per_hour').addClass('hidden');
            income='year';
            break;
        case 'month':
            $('#div_income_per_month, #working_time_part').removeClass('hidden').show();
            $('#div_income_per_year, #div_income_per_week, #div_income_per_hour').addClass('hidden');
            income='month';
            break;
        case 'week':
            $('#div_income_per_week, #working_time_part').removeClass('hidden').show();
            $('#div_income_per_year, #div_income_per_month, #div_income_per_hour').addClass('hidden');
            income='week';
            break;
        case 'hour':
            $('#div_income_per_hour').removeClass('hidden').show();
            $('#div_income_per_year, #div_income_per_week, #div_income_per_month, #working_time_part').addClass('hidden');
            income='hour';
            break;
    }   
}

function working_time_toogle(value){
    value ? $('#job_working_time').show() : $('#job_working_time').hide();  
}

function reload () {

    TimeCounter.resetStopwatch();
    input_object.style.display = 'block';
    result_object.style.display = 'none';
    reload_object.style.display = 'none';
    pie_chart_object.style.display = 'none';
    bar_chart_object.style.display = 'none';
    text_object.style.display = 'none';

    window.scroll(0, 1);
    
    openForm_part('form_part', 0, 1, false);
}

function initialize() {

    openForm_part("form_part", 0, 1, false); //shows just part 1 of input form

    input_object = document.getElementById('input_div'); //tabela de entrada
    result_object = document.getElementById('result_div'); //resultados
    frame_witdh = document.getElementById('result_div').offsetWidth;

    reload_object = document.getElementById('reload_div'); //reload button

    chart_object = document.getElementById('chart_div'); //pie chart
    graph_object = document.getElementById('graph_div'); //columns chart

    text_object = document.getElementById('text_div'); //msg text

    reload_object.style.display = 'none';
    tolls_daily(false);

    reload();

    document.getElementById("radio_fuel_euros").checked = true;
    $('#eurosDiv').css("display", "block");
    $('#kmDiv').css("display", "none");

    document.getElementById("radio_cred_nao").checked = true;
    $('#sim_credDiv').css("display", "none");
    
}

function getCheckedValue(radioObj) {
    var i;

    if (!radioObj) {
        return "";
    }

    var radioLength = radioObj.length;
    if (radioLength == undefined) {
        if (radioObj.checked) {
            return radioObj.value;
        }
        return "";
    }

    for (i = 0; i < radioLength; i++) {
        if (radioObj[i].checked) {
            return radioObj[i].value;
        }
    }
    return "";
}

function submit_data(country) {

    var objectToDb = {};

    objectToDb.acquisition_month = $('#acquisitionMonth').val();
    objectToDb.acquisition_year = $('#acquisitionYear').val();
    objectToDb.commercial_value_at_acquisition = $('#commercialValueAtAcquisition').val();
    objectToDb.commercial_value_at_now = $('#commercialValueAtNow').val();
    objectToDb.insure_type = $('input[name="tipo_seguro"]:checked', '#main_form').val();
    objectToDb.insurance_value = $('#insuranceValue').val();
    objectToDb.credit = $('input[name="cred_auto"]:checked', '#main_form').val();
    objectToDb.credit_borrowed_amount = $('#borrowedAmount').val();
    objectToDb.credit_number_installments = $('#numberInstallments').val();
    objectToDb.credit_amount_installment = $('#amountInstallment').val();
    objectToDb.credit_residual_value = $('#residualValue').val();
    objectToDb.inspection_number_inspections = $('#numberInspections').val();
    objectToDb.inspection_average_inspection_cost = $('#averageInspectionCost').val();
    objectToDb.vehicle_excise_tax = $('#vehicleExciseTax').val();
    objectToDb.fuel_calculation = $('input[name="calc_combustiveis"]:checked', '#main_form').val();
    objectToDb.fuel_currency_based_currency_value = $('#fuel_currency_value').val();
    objectToDb.fuel_currency_based_periodicity = $('#combustiveis_periodo_euro').val();
    objectToDb.fuel_distance_based_car_to_work = $('input[name="carro_emprego"]:checked', '#main_form').val();
    objectToDb.fuel_distance_based_car_to_work_number_days_week = $('#car_to_work_number_days_week').val();
    objectToDb.fuel_distance_based_car_to_work_distance_home_work = $('#car_to_work_distance_home_work').val();
    objectToDb.fuel_distance_based_car_to_work_distance_weekend = $('#car_to_work_distance_weekend').val();
    objectToDb.fuel_distance_based_no_car_to_work_distance = $('#no_car_to_work_distance').val();
    objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = $('#combustivel_period_km').val();
    objectToDb.fuel_distance_based_fuel_efficiency = $('#fuel_efficiency').val();
    objectToDb.fuel_distance_based_fuel_price = $('#fuel_price').val();
    objectToDb.maintenance = $('#maintenance').val();
    objectToDb.repairs = $('#repairs').val();
    objectToDb.parking = $('#parking').val();
    objectToDb.tolls_daily = $('input[name="portagens_ao_dia"]:checked', '#main_form').val();
    objectToDb.tolls_no_daily_value = $('#no_daily_tolls_value').val();
    objectToDb.tolls_no_daily_period = $('#portagens_select').val();
    objectToDb.tolls_daily_expense = $('#daily_expense_tolls').val();
    objectToDb.tolls_daily_number_days = $('#number_days_tolls').val();
    objectToDb.tickets_value = $('#tickets_value').val();
    objectToDb.tickets_periodicity = $('#multas_select').val();
    objectToDb.washing_value = $('#washing_value').val();
    objectToDb.washing_periodicity = $('#lavagens_select').val();
    objectToDb.household_number_people = $('#household_number_people').val();
    objectToDb.public_transportation_month_expense = $('#public_transportation_month_expense').val();   
    objectToDb.income_type = $('input[name="radio_income"]:checked', '#main_form').val();
    objectToDb.income_per_year = $('#income_per_year').val();
    objectToDb.income_per_month = $('#income_per_month').val();
    objectToDb.income_months_per_year = $('#income_months_per_year').val();
    objectToDb.income_per_week = $('#income_per_week').val();
    objectToDb.income_weeks_per_year = $('#income_weeks_per_year').val();
    objectToDb.income_per_hour = $('#income_per_hour').val();
    objectToDb.income_hours_per_week = $('#income_hours_per_week').val();
    objectToDb.income_hour_weeks_per_year = $('#income_hour_weeks_per_year').val();
    objectToDb.work_time = $('input[name="radio_work_time"]:checked', '#main_form').val();
    objectToDb.work_time_month_per_year = $('#time_month_per_year').val();
    objectToDb.work_time_hours_per_week = $('#time_hours_per_week').val();
    objectToDb.distance_drive_to_work = $('input[name="drive_to_work"]:checked', '#main_form').val();
    objectToDb.distance_days_per_week = $('#drive_to_work_days_per_week').val();
    objectToDb.distance_home_job = $('#dist_home_job').val();
    objectToDb.distance_journey_weekend = $('#journey_weekend').val();
    objectToDb.distance_per_month = $('#dist_per_month').val();
    objectToDb.distance_period = $('#period_km').val();
    objectToDb.time_spent_home_job = $('#time_home_job').val();
    objectToDb.time_spent_weekend = $('#time_weekend').val();
    objectToDb.time_spent_min_drive_per_day = $('#min_drive_per_day').val();
    objectToDb.time_spent_days_drive_per_month = $('#days_drive_per_month').val();  
    objectToDb.time_to_fill_form = TimeCounter.getCurrentTimeInSeconds();
    objectToDb.client_uuid = uuid;
    objectToDb.country = country;

    sanityChecks(objectToDb);
    
    $.ajax({
        url: 'db_stats/SubmitUserInput.php',
        type: 'POST',
        data: {
            objectToDb: objectToDb
        },
        success: function(data) {},
        error: function () {        
            console.log("There was an error submitting the values for statistical analysis");
        }
    });

    return false;
}

function sanityChecks(objectToDb) {
    if (objectToDb.credit === 'false') {
        objectToDb.credit_borrowed_amount = null;
        objectToDb.credit_number_installments = null;
        objectToDb.credit_amount_installment = null;
        objectToDb.credit_residual_value = null;
    }

    if (objectToDb.fuel_calculation === 'euros') {
        objectToDb.fuel_distance_based_fuel_efficiency = null;
        objectToDb.fuel_distance_based_fuel_price = null;
        objectToDb.fuel_distance_based_car_to_work = null;
        objectToDb.fuel_distance_based_car_to_work_number_days_week = null;
        objectToDb.fuel_distance_based_car_to_work_distance_home_work = null;
        objectToDb.fuel_distance_based_car_to_work_distance_weekend = null;
        objectToDb.fuel_distance_based_no_car_to_work_distance = null;
        objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = null;
    } else {
        objectToDb.fuel_currency_based_currency_value = null;
        objectToDb.fuel_currency_based_periodicity = null;
        if (objectToDb.fuel_distance_based_car_to_work === 'true') {
            objectToDb.fuel_distance_based_no_car_to_work_distance = null;
            objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = null;
        } else {
            objectToDb.fuel_distance_based_car_to_work_number_days_week = null;
            objectToDb.fuel_distance_based_car_to_work_distance_home_work = null;
            objectToDb.fuel_distance_based_car_to_work_distance_weekend = null;
        }
    }

    if (objectToDb.tolls_daily === 'true') {
        objectToDb.tolls_no_daily_value = null;
        objectToDb.tolls_no_daily_period = null;
    } else {
        objectToDb.tolls_daily_expense = null;
        objectToDb.tolls_daily_number_days = null;
    }
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function guid() {
    return (S4()+"-"+S4()+"-"+S4());
}

