/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which work on the page*/

/*function that loads new HTML and that is run when country select is changed*/ 
function valueselect(country) {
    
    var domain = window.location.hostname;
    
    var url2go;
    if(domain.split(".")[1]=="work"){
        url2go = "http://autocosts.work/" + country.toUpperCase();
    }
    else{
        url2go = "http://" + Domain_list[country] + "/" + country.toUpperCase();
    }
    window.location.href = url2go;
}

/*function that runs when the browser window is resized*/
function resized(callback){
    //adapts the margin-top CSS value according to the window width
    var margin_top_desc = $("#banner_top").outerHeight(true)+3;
    $("#description").css("margin-top", margin_top_desc);
    
    //mobile devices
    if($(document).width()<=768){
        $("#div1_td").css("width", "100%");
        $("#div3_td").css("width", "100%");
    }
    else{
        if(ResultIsShowing){
            $("#div1_td").css("width", "15%");
            $("#div3_td").css("width", "15%");
        }
        else{
            $("#div1_td").css("width", "22%");
            $("#div3_td").css("width", "22%");
        }
    }
    
    //if the result are showing resizes the charts
    if(ResultIsShowing){
        var frame_witdh = document.getElementById("div2").offsetWidth;
        drawChartResult(frame_witdh, CalculatedData);
        
        //prints final text accordingly
        var text_msg = print_result_final_text(frame_witdh, CalculatedData);
    }
    
    if (typeof callback === 'function'){
        callback();
    }
}

/*function that scrolls the page to the beggining of the form*/
function scrollPage(callback){

    var scroll_speed = 300;
    //extra top margins given on the top of the form when the page scrolls
    var extra_margin_desktop = 15;
    var extra_margin_mobile = 5; 
    var windowsize = $(window).width();

    /*768px threshold from which the CSS shows the page in mobile version*/
    var scrollTop;
    if (windowsize > 768) {
        scrollTop = $("#container_table").offset().top - $("#banner_top").outerHeight(true) - extra_margin_desktop;
    }
    else{
        scrollTop = $("#div2_td").offset().top - $("#banner_top").outerHeight(true) - extra_margin_mobile;
    }
    
    $("html, body").
        animate({scrollTop: scrollTop}, scroll_speed).
        promise().
        done(function(){            
            if (typeof callback === 'function'){
                callback();
            }
        });

}

 /*function which returns whether this session is a (test/develop version) or a prod version */  
 function IsThisAtest() {  
    
    if(Country=="XX"){
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


//fade out lateral and top divs when mouse over central main div
$('#form_part1').on({
    mouseenter: function(){//when mouse pointer enters div
            if (CurrentFormPart==1){
                $('#description, #div1_td, #div3_td').clearQueue().fadeTo( "slow" , 0.2);
                scrollPage();
            }
        },
    mouseleave: function(){//when mouse pointer leaves div
            if (CurrentFormPart==1){
                $('#description, #div1_td, #div3_td').clearQueue().fadeTo( "slow" , 1);
            }
        }
    });

//when user clicks on stats table on the right side of screen, it opens the corresponding PNG image file
$('#tbl_statistics').click(function(){ 
    var domain = window.location.hostname;  
    var url2open = "http://" + domain + "/db_stats/tables/" + Country + ".jpg";
    window.open(url2open); 
});

//highlights the form area on which the mouse is hover 
$('#form_part1 tr, #form_part2 tr').hover(
    function(){
        $(this).find('td').css('background-color','#fff8dc');
        $(this).find('td').filter(function(){return this.rowSpan > 1;}).parent().next().find('td').css('background-color','#fff8dc');
        var nth_parent=$(this).parentsUntil('.form_part').length - 1;        
        $(this).parents().eq(nth_parent).prevAll('h3:first').css('background-color','#ffec8b');
    },
    function(){
        $(this).find('td').css('background-color','');
        $(this).find('td').filter(function(){return this.rowSpan > 1;}).parent().next().find('td').css('background-color','');
        var nth_parent=$(this).parentsUntil('.form_part').length - 1;       
        $(this).parents().eq(nth_parent).prevAll('h3:first').css('background-color','');
});
$('#form_part3 tr').hover(
    function(){
        $(this).find('td').css('background-color','#fff8dc');
        var nth_parent=$(this).parentsUntil('.form_part').length - 2;        
        $(this).parents().eq(nth_parent).prevAll('.form_section_title:first').css('background-color','#ffec8b');
    },
    function(){
        $(this).find('td').css('background-color','');
        var nth_parent=$(this).parentsUntil('.form_part').length - 2;       
        $(this).parents().eq(nth_parent).prevAll('.form_section_title:first').css('background-color','');
});
//some particularities on form_part3
$('#distance_form3 tr').hover(
    function(){
        $(this).find('td').css('background-color','#fff8dc');
        var nth_parent=$(this).parentsUntil('.form_part').length - 3;        
        $(this).parents().eq(nth_parent).prevAll('.form_section_title:first').css('background-color','#ffec8b');
    },
    function(){
        $(this).find('td').css('background-color','');
        var nth_parent=$(this).parentsUntil('.form_part').length - 3;       
        $(this).parents().eq(nth_parent).prevAll('.form_section_title:first').css('background-color','');
});
$('#working_time_form3 tr').hover(
    function(){
        $(this).find('td').css('background-color','#fff8dc');
        $('#working_time_form3').children(".form_section_title:first").css('background-color','#ffec8b');
        $('#fin_effort_Div_form3').children(".form_section_title:first").css('background-color','');
        

    },
    function(){
        $(this).find('td').css('background-color','');
        $('#working_time_form3').children(".form_section_title:first").css('background-color','');  
      

});

//Loader after the run button is clicked
function runButtonLoader() {
    $('#run_button, #run_button_noCapctha').addClass('button_loader').attr("value","");
}
//reset the run buttons, i.e., removes the loader of the button
function resetRunButtons() {
    $('#run_button, #run_button_noCapctha').removeClass('button_loader').attr("value", RunButtonStr);
}

function isNumber(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n) && n >= 0);
}

function isInteger(n) {
    return (parseFloat(n) == parseInt(n, 10));
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "&#160;");
    return parts.join(".");
}

//function that is run when the user clicks the Run/Calculate button 
//and which submits the inserted data into the Database 
function submit_data(country) {

    var objectToDb = {};

    objectToDb.acquisition_month = $("#acquisitionMonth").val();
    objectToDb.acquisition_year = $("#acquisitionYear").val();
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
    objectToDb.fuel_distance_based_car_to_work = $('input[name="car_job_form2"]:checked', '#main_form').val();
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

//function that is run by the previous submit_data function
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

/*User Unique Identifier functions*/
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function guid() {
    return (S4()+"-"+S4()+"-"+S4());
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