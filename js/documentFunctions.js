/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which change the visual aspect of the page*/

/*function that is run when the button Reload is clicked*/
function reload(onDocumentLoad) {
    TimeCounter.resetStopwatch();
    
    //shows the form
    $("#input_div").show();
    //hides the results divs and correspondent class
    $("#monthly_costs, #result_buttons_div, #pie_chart_div, #bar_chart_div").hide();
    $(".result_section").hide();
    
    ResultIsShowing=false;
        
    //reloaded to the original screen after the result tables were already shown
    if(!onDocumentLoad){
        $("#div1").css("display", "block");
        $("#div3").css("display", "block");
        $("#description").html(DescriptionHTML);
        resized();
        //if the results were already shown, it means user went already through ReCaptcha
        ShowGoogleReCaptcha(false); 
    }
     
    openForm_part('form_part', 0, 1, false);
}

/*function that swaps between Google reCaptcha and normal Run button*/
function ShowGoogleReCaptcha(bool){
    
    isUserHuman = !bool; //sets global variable according to input, if shows recaptcha it means it is not yet human
    
    if(!ResultIsShowing){//if the results are not being shown
        if(bool){
            //alert('show captcha');
            document.getElementById("b-bottom_3_A").style.display = "inline-block";
            document.getElementById("b-bottom_3_B").style.display = "none";
        }
        else{
            //alert('show button');
            document.getElementById("b-bottom_3_A").style.display = "none";
            document.getElementById("b-bottom_3_B").style.display = "inline-block";   
        }
    }
}

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
function resized(){
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
}

/*function that scrolls the page to the beggining of the form*/
function scrollPage(){
    
    var scroll_speed = 300;
    //extra top margins given on the top of the form when the page scrolls
    var extra_margin_desktop = 15;
    var extra_margin_mobile = 5; 
    var windowsize = $(window).width();
    
    /*768px threshold from which the CSS shows the page in mobile version*/    
    if (windowsize > 768) { 
        $("html, body").animate({
            scrollTop: ($("#container_table").offset().top - $("#banner_top").outerHeight(true) - extra_margin_desktop)
        }, scroll_speed);
    }
    else{
        $("html, body").animate({
            scrollTop: ($("#div2_td").offset().top - $("#banner_top").outerHeight(true) - extra_margin_mobile)
        }, scroll_speed);       
    }
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

/*functions which is used to change the form parts*/
var hasLoadedPart = [false, false, false, false]; //global array variable for function openForm_part
var hasShownPart2 = false; var hasShownPart3 = false; //put to true when form part is FIRST shown
function openForm_part(part_name, part_number_origin, part_number_destiny, country, language) {
    //alert("from "+part_number_origin+" to "+part_number_destiny +" - country:"+country);

    //shows form part n and hides the other parts
    function shows_part(n){
        
        //if not a test triggers event for Google Analytics accordingly
        if(!IsThisAtest()){                 
            if(n==2 && !hasShownPart2){
                ga("send", "event", "form_part", "form_part_2");
                hasShownPart2=true;
            }
            if(n==3 && !hasShownPart3){
                ga("send", "event", "form_part", "form_part_3");
                hasShownPart3=true;
            }
        }

        var i = 1, p = document.getElementById(part_name+1);
        while (p !== null){
            if (i === n){
                p.style.display = "";
            }
            else{
                p.style.display = "none";
            }
            i++;
            p = document.getElementById(part_name+i);
        }   
    }

    //change from form part 1 to 2
    if (part_number_origin===1 && part_number_destiny===2){
       
        if (!hasLoadedPart[0]){
            $.getScript("js/coreFunctions.js", function(){
                $.getScript("https://www.google.com/jsapi", function(){
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
            $.getScript("js/conversionFunctions.js");
            $.getScript("db_stats/statsFunctions.js"); 
            $.getScript("js/get_data.js");
            $.getScript("js/print.js");
            $.getScript("google/charts.php?country="+country, function() {
                $.getScript("php/print_results.php?country="+country); 
            });
                       
            $.getScript("google/g-recaptcha.js", function() {
                $.getScript("https://www.google.com/recaptcha/api.js?onload=grecaptcha_callback&render=explicit&hl="+language);
            });
                        
            hasLoadedPart[1] = true;
        }
    }
    
    //change from form part 2 to 3
    if (part_number_origin==2 && part_number_destiny==3){
        if (!is_userdata_formpart2_ok())
            return;
        
        if (!hasLoadedPart[2]){
            google.load("visualization", "1", {"packages": ["corechart"], "language": Language, "callback": function(){
                hasLoadedPart[2]=true;
                shows_part(3);
            }});
        }
        else{
            shows_part(3);
        }
        
        if (!hasLoadedPart[3]){
            $.getScript("google/rgbcolor.js");
            $.getScript("google/canvg.js");
            
            //uber
            if(Country!="XX"){//if not test version
                //gets asynchronously UBER information
                $.get( "php/get_uber.php?c=" + Country, function(data) {
                    //alert(JSON.stringify(data, null, 4)); 
                    uber_obj =  data; //uber_obj is a global variable
                });
            }
            else{//test version (London city, in Pounds)
                uber_obj.cost_per_distance = 1.25;
                uber_obj.cost_per_minute = 0.15;
                uber_obj.currency_code = "GBP";
                uber_obj.distance_unit = "mile";
            }
            
            //wait until all PDF related files are loaded
            //to activate the downloadPDF button
            $.getScript("js/pdf/generatePDF.js", function() {
                $.getScript("js/pdf/pdfmake.js", function() {
                    $.getScript("js/pdf/vfs_fonts.js", function() {
                         $("#generate_PDF").prop("disabled",false).removeClass("buttton_disabled");
                         hasLoadedPart[3]=true;
                    });
                });
            });
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
    if (part_number_origin===0 && part_number_destiny===1){
        shows_part(1);
        scrollPage();
    }
    
    scrollPage();
    return;
}


/*========================*/
/*=====Form Functions=====*/

var income = "year";
var isDistanceSet = false;

/*function that checks if a certain HTML id or class is visible*/
function isVisible(html_ref) {
    if($(html_ref).css("display")!="none")
        return true;
    else
        return false;
}

//when number of inspections is zero in form part 1, hides field for cost of each inspection
$("#numberInspections").focusout(function(){
    if( $(this).val() == 0){
        $("#InspectionCost_tr").css("display", "none");
    }
    else{
        $("#InspectionCost_tr").css("display", "table-row");
    }
});

function fuelCalculationMethodChange(fuelCalculationMethod) {
    if (fuelCalculationMethod === "currency") {
        //selects actively radio button to which this function is associated
        $("#radio_fuel_euros").prop("checked", true);
        
        isDistanceSet = false;
        $("#distance_form3").each(function(){ $(this).show(); });
        $("#currency_div_form2").css("display", "block");
        $("#distance_div_form2").css("display", "none");
        $(".time_spent_part1_form3").each(function(){ $(this).hide(); });
        $(".time_spent_part2_form3").show();
        $("#drive_to_work_no_form3").prop("checked", true);
        
        carToJob(false);
    } else if (fuelCalculationMethod === "distance") {
        //selects actively radio button to which this function is associated        
        $("#radio_fuel_km").prop("checked", true); 
        
        isDistanceSet = true;
        $("#distance_form3").each(function(){ $(this).hide(); });
        $("#currency_div_form2").css("display", "none");
        $("#distance_div_form2").css("display", "block");

        carToJob(false);
        driveToJob(false);
    } else {
        console.log("Either is distance or currency... make up your mind developer");
    }
}

//function that for the radio button with the question 
//'Considering you drive to work?' in the Fuel section of Form part 2
function carToJob(carToJobFlag) {
    if (carToJobFlag) {
        //selects actively radio button to which this function is associated
        $("#car_job_form2_yes").prop("checked", true); 
        
        $("#div_car_job_yes_form2").css("display", "block");
        $("#div_car_job_no_form2").css("display", "none");
        $(".time_spent_part1_form3").each(function(){ $(this).show(); });
        $(".time_spent_part2_form3").hide();
        
        //working time section in form part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").hide();
        $("#working_time_part2_form3").show();
    } else {
        //selects actively radio button to which this function is associated
        $("#car_job_form2_no").prop("checked", true); 
        
        $("#div_car_job_yes_form2").css("display", "none");
        $("#div_car_job_no_form2").css("display", "block");
        $(".time_spent_part1_form3").each(function(){ $(this).hide(); });
        $(".time_spent_part2_form3").show();
        
        //set to "no" the question "Do you have a job or a worthy occupation?" 
        //in Working Time section of Form Part 3 
        working_time_toggle(false);
        $("#working_time_no_form3").prop("checked", true);
        $("#working_time_part1_form3").show();
        $("#working_time_part2_form3").hide();        
    }
}

//Drive to Job yes/no radio button 
//in section Distance in form part 3 
function driveToJob(flag){
    if(flag){
        //selects actively radio button to which this function is associated
        $("#drive_to_work_yes_form3").prop("checked", true);
        
        $(".car_to_job_distance_form3").each(function(){ $(this).show(); });
        $(".time_spent_part1_form3").each(function(){ $(this).show(); });
        $(".time_spent_part2_form3").hide();
        $("#car_no_job_distance_form3").hide();

        //set to "no" the question "Do you have a job or a worthy occupation?" 
        //in Working Time section of Form Part 3         
        working_time_toggle(true);
        $("#working_time_part1_form3").hide();
        $("#working_time_part2_form3").show();
    }
    else{
        //selects actively radio button to which this function is associated
        $("#drive_to_work_no_form3").prop("checked", true);
        
        $(".car_to_job_distance_form3").each(function(){ $(this).hide(); });
        $(".time_spent_part1_form3").each(function(){ $(this).hide(); });
        $(".time_spent_part2_form3").show();
        $("#car_no_job_distance_form3").show();
        
        working_time_toggle(true);
        $("#working_time_part1_form3").show();
        $("#working_time_part2_form3").hide();
    }
}

function tolls_daily(tollsDailyFlag) {
    if (tollsDailyFlag) {
        $("#dia_nao_portag_DIV").css("display", "none");
        $("#dia_sim_portag_DIV").css("display", "block");
    } else {
        $("#dia_nao_portag_DIV").css("display", "block");
        $("#dia_sim_portag_DIV").css("display", "none");
    }
}

/*function that toggles some div between visible or hidden*/
function onclick_div_show(divID, flag) {
    if(flag) {
        $(divID).css("display", "block");
    } else {
        $(divID).css("display", "none");
    }
}

//triggers when any slider in form part 3 toggles
function slider_toggles_form3(){

    var ckb1 = $("#slider1").is(":checked");
    var ckb2 = $("#slider2").is(":checked");

    if(ckb1){
        $("#public_transp_Div_form3").css("display", "block");
    }
    else{
        $("#public_transp_Div_form3").css("display", "none");
    }

    if(ckb2){
        $("#fin_effort_Div_form3").css("display", "block");
    }
    else{
        $("#fin_effort_Div_form3").css("display", "none");
    }

    //if Public Transporst or Financial Effort toogle sliders in form part 3 are activated,
    //shows Distance and Time spent in driving form part 3 section
    if(ckb1 || ckb2){
        $("#distance_time_spent_driving_form3").css("display", "block");
    }
    else{
        $("#distance_time_spent_driving_form3").css("display", "none");
    }
}
$("#slider1").change(function() {
    slider_toggles_form3();
});
$("#slider2").change(function() {
    slider_toggles_form3();
});

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

function income_toggle(value){
    switch(value){
        case "year":
            $("#income_per_year_form3, #working_time_form3").removeClass("hidden").show();
            $("#income_per_month_form3, #income_per_week_form3, #income_per_hour_form3").addClass("hidden");
            income="year";
            break;
        case "month":
            $("#income_per_month_form3, #working_time_form3").removeClass("hidden").show();
            $("#income_per_year_form3, #income_per_week_form3, #income_per_hour_form3").addClass("hidden");
            income="month";
            break;
        case "week":
            $("#income_per_week_form3, #working_time_form3").removeClass("hidden").show();
            $("#income_per_year_form3, #income_per_month_form3, #income_per_hour_form3").addClass("hidden");
            income="week";
            break;
        case "hour":
            $("#income_per_hour_form3").removeClass("hidden").show();
            $("#income_per_year_form3, #income_per_week_form3, #income_per_month_form3, #working_time_form3").addClass("hidden");
            income="hour";
            break;
    }   
}

//radio button toggle function of "Working time" section in form part 3
function working_time_toggle(value){
    if(value){
        //selects actively radio button to which this function is associated
        $("#working_time_yes_form3").prop("checked", true);
        
        $("#working_time_input_form3").show();
    }
    else{
        //selects actively radio button to which this function is associated
        $("#working_time_no_form3").prop("checked", true);
        
        $("#working_time_input_form3").hide();
    }  
}

//function used to get from forms the selected option in radio buttons
function getCheckedValue(radioObj) {
    var i;

    if (!radioObj) {
        return "";
    }

    var radioLength = radioObj.length;
    if (radioLength === undefined) {
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

function getCheckedSliderValue(ObjName) {
    return ObjName.checked;
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