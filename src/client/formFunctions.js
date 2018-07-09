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

//when button "Next" is clicked
function buttonNextHandler($this){
    //$( this ) is this button
    //closest get top parent with class "field_container"
    //and then advances to the next on the same level
    var n=1, $nextField = $this.closest( ".field_container" ).next();        

    $nextField.show(); //shows the next sibling

    while(true){

        //check if the next sibling contains the class 'field_container'
        //it might be a head title and not a ".field_container", for example it might be the head "2. Running Costs"
        //check also if its content (first child) is visible; it might be hidden due to definitions in the form
        //ex.: fuel options in "2.Running Costs" show and hide form section "Distance" in "3. Additional data" 
        if ($nextField.hasClass("field_container") && $nextField.children().first().is(":visible")){
            $this.closest( ".next" ).hide("slow");//hides own next button
            isFieldValid($nextField);
            //scrols the page to the next div, considering the header
            $('html,body').animate({scrollTop: $nextField.offset().top-$("header").outerHeight()-10}, 600);
            break;
        }
        //otherwise continues the lopp showing the next siblings        
        $nextField = $nextField.next();
        
        //if the next sibling is empty breaks the while loop
        if($nextField.length==0){
            break;
        }            
        $nextField.show();

        //debug backup to avoid infinit loop
        if(n>100){
            console.error('Infinite loop on Handler of "Next" button');
            break;
        }
        n++;
    }
}

//This function would fire every time the 
//<input type="number" changes or <input type="radio" onclick
function isFieldValid($this){    
    
    //goes to top ascendents till it finds the class "field_container"
    var $fieldHead = $this.closest( ".field_container" ); 
    
    //just runs after all descedents (.find) have completed
    $fieldHead.find("*").promise().done(function(){   

        //goes to every descendent input[type="number"]
        var $inputElements = $fieldHead.find('input[type="number"]');

        var isValid = true;
        var val, min, max;
        $inputElements.each(function(index){

            //if the input element is hidden or disabled doesn't check its value
            if( $(this).is(":visible") && !$(this).prop('disabled')){
                //A text input's value attribute will always return a string. 
                //One needs to parseInt the value to get an integer
                val = parseInt($( this ).val(), 10);
                //console.log(index + ": " + val);

                if(!isNumber(val)){
                    isValid = false;
                }

                min = parseInt($( this ).attr('min'), 10); 
                max = parseInt($( this ).attr('max'), 10);            
                //console.log(min, max);

                if (isNumber(min) && isNumber(max)){
                    if(val < min || val > max ){
                        isValid = false;
                    }
                }
                else if (isNumber(min)){
                    if(val < min){
                        isValid = false;
                    }                            
                }
                else if (isNumber(max)){
                    if(val > max ){
                        isValid = false;
                    }                            
                }
                else{
                    console.error("Error");
                }

                if ($( this ).hasClass("input_integer")){
                    if(!isInteger(val)){
                        isValid = false;
                    }
                }
            }
        });

        console.log("isFieldValid: " + isValid);

        //shows or hides button "next" accordingly
        if(isValid){
            $fieldHead.find(".next").show("fast");
        }
        else{
            $fieldHead.find(".next").hide("fast");
        }

    });
}

//when number of inspections is zero in form part 1, hides field for cost of each inspection
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
    
    //Drive to Job - YES
    if(flag){
        //selects actively radio button to which this function is associated
        $("#drive_to_work_yes_form3").prop("checked", true);

        //Distance section - form part 3
        $("#car_no_job_distance_form3").hide("slow", function(){
            $("#car_to_job_distance_form3").show("slow");
        });

        //set to "no" the question "Do you have a job or a worthy occupation?"
        //in Working Time section - Form Part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").hide("slow");
        $("#working_time_part2_form3").show("slow");

        //Time Spent in Driving - Form Part 3
        $("#time_spent_part2_form3").fadeOut("slow", function(){
            $("#time_spent_part1_form3").fadeIn("slow");
        });

    }
    //NO
    else{
        //selects actively radio button to which this function is associated
        $("#drive_to_work_no_form3").prop("checked", true);

        //Distance section - form part 3
        $("#car_to_job_distance_form3").hide("slow", function(){
            $("#car_no_job_distance_form3").show("slow");
        });
   
        //Working Time - Form Part 3
        working_time_toggle(true);
        $("#working_time_part1_form3").show("slow");
        $("#working_time_part2_form3").hide("slow");

        //Time spent in driving section
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
   $('input[name="' + name + '"][value="'+option+'"]').prop('checked', true);
}

function getCheckedSliderValue(ObjName) {
    return ObjName.checked;
}
