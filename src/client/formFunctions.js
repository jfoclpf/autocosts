/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which work only on the form*/

/*function that checks if a certain HTML id or class is visible*/
function isVisible(html_ref) {
    if($(html_ref).css("display")!="none")
        return true;
    else
        return false;
}

//when number of inspections is zero in form part 1, hides field for cost of each inspection
$("#numberInspections").focusout(nbrInspectOnChanged);
$("#numberInspections").bind('keyup mouseup', nbrInspectOnChanged);
function nbrInspectOnChanged(){

    if($("#numberInspections").val() == 0){
        $("#averageInspectionCost").prop('disabled', true);
        $("#averageInspectionCost").prev().addClass('disabled');
    }
    else{
        $("#averageInspectionCost").prop('disabled', false);
        $("#averageInspectionCost").prev().removeClass('disabled');
    }
}

//function for the radio button with the question
//'Calculations based on:' in the Fuel section of Form part 2
function fuelCalculationMethodChange(fuelCalculationMethod) {
    if (fuelCalculationMethod === "currency") {
        //selects actively radio button to which this function is associated
        $("#radio_fuel_euros").prop("checked", true);
                
        $("#currency_div_form2").slideDown("slow");  //show
        $("#distance_div_form2, .fuel_efficiency, #div_car_job_no_form2, #div_car_job_yes_form2").slideUp("slow"); //hide
        
        //form part 3
        $("#distance_form3").each(function(){ $(this).show(); });
        $(".time_spent_part1_form3").each(function(){ $(this).hide(); });
        $(".time_spent_part2_form3").show();
        $("#drive_to_work_no_form3").prop("checked", true);
        
    } else if (fuelCalculationMethod === "distance") {
        //selects actively radio button to which this function is associated
        $("#radio_fuel_km").prop("checked", true);        
        
        $("#currency_div_form2").slideUp("slow");  //hide
        $("#distance_div_form2, .fuel_efficiency").slideDown("slow"); //show

        carToJob(false);
        
        //form part 3
        $("#distance_form3").each(function(){ $(this).hide(); });
        driveToJob(false);
        
    } else {
        console.error("Either is distance or currency... make up your mind developer");
    }
}

//function for the radio button with the question
//'Considering you drive to work?' in the Fuel section of Form part 2
function carToJob(carToJobFlag) {
    if (carToJobFlag) {
        //selects actively radio button to which this function is associated
        $("#car_job_form2_yes").prop("checked", true);

        $("#div_car_job_yes_form2").slideDown("slow");
        $("#div_car_job_no_form2").slideUp("slow");
        $(".time_spent_part1_form3").each(function(){ $(this).show(); });
        $(".time_spent_part2_form3").hide();

        //working time section in form part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").hide();
        $("#working_time_part2_form3").show();
    } else {
        //selects actively radio button to which this function is associated
        $("#car_job_form2_no").prop("checked", true);

        $("#div_car_job_yes_form2").slideUp("slow");
        $("#div_car_job_no_form2").slideDown("slow");
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
        //$("#drive_to_work_yes_form3").prop("checked", true);

        //distance section
        $("#car_no_job_distance_form3").fadeOut(function(){
            $(".car_to_job_distance_form3").each(function(i, elm){
                $(elm).fadeIn("slow");
            });
        });

        //set to "no" the question "Do you have a job or a worthy occupation?"
        //in Working Time section of Form Part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").hide("slow");
        $("#working_time_part2_form3").show("slow");

        //time spent in driving section
        $(".time_spent_part2_form3").fadeOut("slow", function(){
            $(".time_spent_part1_form3").each(function(i, elm){
                $(elm).fadeIn("slow");
            });
        });

    }
    else{
        //selects actively radio button to which this function is associated
        $("#drive_to_work_no_form3").prop("checked", true);

        $(".car_to_job_distance_form3").each(function(i, elm){
            $(elm).fadeOut("slow")
         }).promise().done( function(){
            $("#car_no_job_distance_form3").fadeIn("slow");
        });

        //in Working Time section of Form Part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").show("slow");
        $("#working_time_part2_form3").hide("slow");

        //time spent in driving section
        $(".time_spent_part1_form3").each(function(i, elm){
            $(elm).fadeOut("slow");
        }).promise().done( function(){
            $(".time_spent_part2_form3").fadeIn("slow");
        });
    }
}

function tolls_daily(tollsDailyFlag) {
    if (tollsDailyFlag) {
        $("#daily_tolls_false_div").slideUp("slow");
        $("#daily_tolls_true_div").slideDown("slow");
    } else {
        $("#daily_tolls_false_div").slideDown("slow");
        $("#daily_tolls_true_div").slideUp("slow");
    }
}

/*function that toggles some div between visible or hidden*/
function onclick_div_show(divID, flag) {
    if(flag) {
        $(divID).show("slow");
    } else {
        $(divID).hide("slow");
    }
}

//triggers when any slider in form part 3 toggles
function slider_toggles_form3(){

    var ckb1 = $("#slider1").is(":checked");
    var ckb2 = $("#slider2").is(":checked");

    if(ckb1){
        $("#public_transp_Div_form3").show("slow");
    }
    else{
        $("#public_transp_Div_form3").hide("slow");
    }

    if(ckb2){
        $("#fin_effort_Div_form3").show("slow");
    }
    else{
        $("#fin_effort_Div_form3").hide("slow");
    }

    //if Public Transporst or Financial Effort toogle sliders in form part 3 are activated,
    //shows Distance and Time spent in driving form part 3 section
    if(ckb1 || ckb2){
        $("#distance_time_spent_driving_form3").show("slow");
    }
    else{
        $("#distance_time_spent_driving_form3").hide("slow");
    }
}

//sliders in form part 3
$("#slider1").change(function() {
    slider_toggles_form3();
});
$("#slider2").change(function() {
    slider_toggles_form3();
});

function income_toggle(value){
    switch(value){
        case "year":
            $("#income_per_year_form3, #working_time_form3").show("slow");
            $("#income_per_month_form3, #income_per_week_form3, #income_per_hour_form3").hide("slow");
            income="year";
            break;
        case "month":
            $("#income_per_month_form3, #working_time_form3").show("slow");
            $("#income_per_year_form3, #income_per_week_form3, #income_per_hour_form3").hide("slow");
            income="month";
            break;
        case "week":
            $("#income_per_week_form3, #working_time_form3").show("slow");
            $("#income_per_year_form3, #income_per_month_form3, #income_per_hour_form3").hide("slow");
            income="week";
            break;
        case "hour":
            $("#income_per_hour_form3").show("slow");
            $("#income_per_year_form3, #income_per_week_form3, #income_per_month_form3, #working_time_form3").hide("slow");
            income="hour";
            break;
    }
}

//radio button toggle function of "Working time" section in form part 3
function working_time_toggle(value){
    if(value){
        //selects actively radio button to which this function is associated
        $("#working_time_yes_form3").prop("checked", true);
        $("#working_time_input_form3").show("slow");
    }
    else{
        //selects actively radio button to which this function is associated
        $("#working_time_no_form3").prop("checked", true);
        $("#working_time_input_form3").hide("slow");
    }
}

//clears all the form inputs whose unit is a currency
function clearCurrencyInputs(){
    $(".currencyInput").val("");
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

//sets in a radio button with a specific option
function setRadioButton(name, option){
   $('input[name="' + name + '"][value="'+option+'"]').click();
}

function getCheckedSliderValue(ObjName) {
    return ObjName.checked;
}
