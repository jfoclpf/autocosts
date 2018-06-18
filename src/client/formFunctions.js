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
        $("#averageInspectionCost").parent().prev().addClass('disabled');
    }
    else{
        $("#averageInspectionCost").prop('disabled', false);
        $("#averageInspectionCost").parent().prev().removeClass('disabled');
    }
}

//FUEL - Form Part 2
//'Calculations based on:' currency or distance
function fuelCalculationMethodChange(fuelCalculationMethod) {
    
    if (fuelCalculationMethod === "distance") {
        //selects actively radio button to which this function is associated
        $("#radio_fuel_km").prop("checked", true);        

        $("#currency_div_form2").slideUp("slow");  //hide
        $("#distance_div_form2, .fuel_efficiency").slideDown("slow"); //show

        carToJob(false);

        //DISTANCE - Form Part 3
        //If user sets distance here, the calculator does not needs to further question about the distance        
        $("#distance_form3").hide();
        driveToJob(false);
    }
    
    else if (fuelCalculationMethod === "currency") {
        //selects actively radio button to which this function is associated
        $("#radio_fuel_euros").prop("checked", true);
                
        $("#currency_div_form2").slideDown("slow");  //show
        $("#distance_div_form2, .fuel_efficiency, #div_car_job_no_form2, #div_car_job_yes_form2").slideUp("slow"); //hide
        
        //DISTANCE - Form Part 3
        //If user sets currency here, the calculator needs anyway to know what the distance traveled, 
        //and thus it will ask the distance travelled by the user on Form Part 3
        $("#distance_form3").show();
        
        $("#time_spent_part1_form3").hide();
        $("#time_spent_part2_form3").show();
        $("#drive_to_work_no_form3").prop("checked", true);        
    } 
    else {
        console.error("Either is distance or currency");
    }
}

//FUEL - Form Part 2
//"Considering you drive to work?" yes or no
function carToJob(carToJobFlag) {
    //"Considering you drive to work?" YES
    if (carToJobFlag) {
        //selects actively radio button to which this function is associated
        $("#car_job_form2_yes").prop("checked", true);

        $("#div_car_job_yes_form2").slideDown("slow");
        $("#div_car_job_no_form2").slideUp("slow");
        $("#time_spent_part1_form3").show();
        $("#time_spent_part2_form3").hide();

        //working time section in form part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").hide();
        $("#working_time_part2_form3").show();        
    } 
    
    //"Considering you drive to work?" NO
    else {
        //selects actively radio button to which this function is associated
        $("#car_job_form2_no").prop("checked", true);

        $("#div_car_job_yes_form2").slideUp("slow");
        $("#div_car_job_no_form2").slideDown("slow");
        $("#time_spent_part1_form3").hide();
        $("#time_spent_part2_form3").show();

        //set to "no" the question "Do you have a job or a worthy occupation?"
        //in Working Time section of Form Part 3
        working_time_toggle(false);
        $("#working_time_no_form3").prop("checked", true);
        $("#working_time_part1_form3").show();
        $("#working_time_part2_form3").hide();
    }
}

//DISTANCE - Form Part 3
//Drive to Job yes/no radio button
function driveToJob(flag){
    if(flag){
        //selects actively radio button to which this function is associated
        //$("#drive_to_work_yes_form3").prop("checked", true);

        //distance section
        $("#car_no_job_distance_form3").fadeOut(function(){
            $("#car_to_job_distance_form3").fadeIn("slow");
        });

        //set to "no" the question "Do you have a job or a worthy occupation?"
        //in Working Time section of Form Part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").hide("slow");
        $("#working_time_part2_form3").show("slow");

        //time spent in driving section
        $("#time_spent_part2_form3").fadeOut("slow", function(){
            $("#time_spent_part1_form3").fadeIn("slow");
        });

    }
    else{
        //selects actively radio button to which this function is associated
        $("#drive_to_work_no_form3").prop("checked", true);

        $("#car_to_job_distance_form3").fadeOut("slow", function(){
            $("#car_no_job_distance_form3").fadeIn("slow");
        });

        //in Working Time section of Form Part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").show("slow");
        $("#working_time_part2_form3").hide("slow");

        //time spent in driving section
        $("#time_spent_part1_form3").fadeOut("slow", function(){
            $("#time_spent_part2_form3").fadeIn("slow");
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

//INCOME - Form Part 3 
//Shows the active div and Hides the remainder divs. Ex: if "year" selected, shows #income_per_year_form3 and hides remainder
//If "hour" selected hides also #working_time_form3. It needs working time to calculate the average yearly *income per hour*
//With *income per hour* it can calculate consumer speed. But if "hour" is selected income per hour is already known 
function income_toggle(value){
    switch(value){
        case "year":
            $("#income_per_year_form3, #working_time_form3").show("slow");
            $("#income_per_month_form3, #income_per_week_form3, #income_per_hour_form3").hide("slow");
            break;
        case "month":
            $("#income_per_month_form3, #working_time_form3").show("slow");
            $("#income_per_year_form3, #income_per_week_form3, #income_per_hour_form3").hide("slow");
            break;
        case "week":
            $("#income_per_week_form3, #working_time_form3").show("slow");
            $("#income_per_year_form3, #income_per_month_form3, #income_per_hour_form3").hide("slow");
            break;
        case "hour":
            $("#income_per_hour_form3").show("slow");
            $("#income_per_year_form3, #income_per_week_form3, #income_per_month_form3, #working_time_form3").hide("slow");
            break;
    }
}

//WORKING TIME - Form Part 3 
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
