/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which work only on the form*/


/************************************************************************************************************/
/************************************************************************************************************/

//USER INTERFACE FUNCTIONS

//When button "Next" is clicked, this function is called; $thisButton males reference to the button itself
//It creates a loop which goes through all divs with class="field_container" or class="form_part_head_title"
//It scrolls down the page till a field_container is: NOT valid OR NOT visible  
//Example: as it reaches for the 1st time "Credit" cost item, since herein by default radio button is at No, 
//this "Credit" field_container doesn't show any 'input[type="number"]' and thus function isFieldValid returns true.     
//But "Credit" field_container is hidden because it was the first time to reach this cost_item/field_container, 
//and as such it was hidden before. That is, when the cost_item/field_container is reached for the 1st time, 
//it is hidden because all the fields, except the 1st, are all hidden intially
function buttonNextHandler($thisButton, callback){
    console.log("function buttonNextHandler($thisButton)");
    
    //closest get top parent finding element with class "field_container", 
    var $fieldHead = $thisButton.closest(".field_container");
    
    if(!isFieldValid($fieldHead)){
        console.error("Next button clicked, when field was not valid");
    }
    
    //hides own next button
    $thisButton.closest( ".next" ).stop(true).hide("slow");
    
    //fades own field
    $fieldHead.stop(true).fadeTo("slow", 0.1);
    
    //scrolls down till a field_container is: not valid OR not visible  
    $fieldHead.nextAll(".field_container, .form_part_head_title").each(function(index, value){
        
        var $i = $(this); //the $(this) from the loop .each
        
        //these are the section titles
        if ($i.hasClass("form_part_head_title")){
            $i.stop(true).show("slow");
        }
        //these are the field containers, that is, divs with cost items: depreciation, insurance, etc.
        else if ($i.hasClass("field_container")){            
            
            //It scrolls down the page till a field_container is: NOT valid OR NOT visible  
            //Example: as it reaches for the 1st time "Credit" cost item, since herein by default radio button is at No, 
            //"Credit" field_container doesn't show any 'input[type="number"]' and thus isFieldValid returns true.     
            //But $i.is(":visible") returns false because it was the first time to reach this cost item (field_container), 
            //and as such it was hidden before. That is, $i.is(":visible") always returns false, when the cost item
            //(field_container) is reached for the 1st time, because all the fields, except the 1st, are all hidden intially
            if(!isFieldValid($i) || !$i.is(":visible")){                
                
                //Now we show the cost_item/field_container
                $i.stop(true).show();
                
                //by showing the field_container, we check if its content is non empty
                if($i.children().first().is(":visible")){
                                        
                    if(isFieldValid($i)){
                        $i.find(".next").stop(true).show(); //shows "next" button                    
                    }

                    //scrols the page to the corresponding div, considering the header
                    $('html,body').
                        animate({scrollTop: $i.offset().top-$("header").outerHeight()-40}, 600, "swing", function(){
                        updatesFieldsAndIcons($i);
                    });

                    //returns to the callback the target .field_container, that is, $i
                    if(typeof callback === 'function'){
                        (function(i){
                            callback(i);
                        }($i));
                    }

                    //breaks the .each loop
                    return false;
                }
                else{
                    $i.find(".next").stop(true).hide(); //hides "next" button
                }
            }
            else{
                $i.find(".next").stop(true).hide(); //hides "next" button
            }
        }
        else{
            console.error("Error in buttonNextHandler");
        }
    });        
}


//This function fires every time the 
//$(document).keydown OR $('input[type="number"]').keydown
//check initialize.js in function loadsButtonsHandlers
function keyDownHandler($this, event){
    console.log("keyDownHandler");
    
    //key Enter (13) ot TAB (9)
    if(event.keyCode == 13 || event.keyCode == 9) { 
        
        var $buttonNext;
        
        if($this.is('input[type="number"]')){            
            event.preventDefault();
            event.stopImmediatePropagation();
                 
            //get button "Next" when available in the own field
            $buttonNext = $this.closest(".field_container").find(".next:visible");
            //otherwise get button "Next" anywhere
            if(!$buttonNext.length){
                $buttonNext = $(".next:visible").first();
            }
        }
        else{            
            $buttonNext = $(".next:visible").first();
        }
        
        console.log($buttonNext.length);

        
        //if there exists a "next" button
        if ($buttonNext.length){
            //clicks the "next" button and focus the respective available input
            buttonNextHandler($buttonNext.last(), function($fieldHead){
                $fieldHead.find("*").promise().done(function(){ 
                    $fieldHead.find('input[type="number"]:visible').first().focus();
                });
            });                      
        }
        //it does not exist a "next" button; just go to the next input
        else if($this.is('input[type="number"]')){
            var $inputs = $('input[type="number"]:visible');
            var thisInputIndex = $inputs.index($this)
            var $nextInput = $inputs.eq(thisInputIndex + 1);
            $nextInput.focus();                  
        }        
        
        return false;        
    }
}


//This function fires every time the 
//input type="number" changes OR input type="radio" is clicked
//check initialize.js in function loadsButtonsHandlers
function inputHandler($this){
    console.log("inputHandler($this)");
    
    var $fieldHead = $this.closest(".field_container");
    
    //the icon on the icon list, with class "steps"
    if(isFieldValid($this)){
        setIcon($this, "active");
    }
    else{
        setIcon($this, "wrong");
    }
    
    var $buttonNext = $fieldHead.find(".next");
    
    //shows active field
    $fieldHead.show().stop(true).fadeTo("fast", 1);
    //fades previous fields    
    
    //just runs after all descedents (.find) have completed
    $fieldHead.find("*").promise().done(function(){      
    
        //shows or hides button "next" accordingly
        if(isFieldValid($this)){                                    
            //if the current field is valid, show "next" button
            $buttonNext.stop(true).show("fast");            
        }
        else{
            $buttonNext.stop(true).hide("fast");            
        }
        
    });
    
    //add red underline in case input is wrong
    if($this.is('input[type="number"]')){        
        if(isNumberInputValid($this)){
            $this.css('border-bottom','1px #b0b2be solid');
            inputErrorMsg($this, "hide");
            
        }
        else{            
            $this.css('border-bottom','2px solid #ef474c');
            inputErrorMsg($this, "show");
        }
    }
}

//mouse on click event on field containers
$(".field_container").on("click", function(){
    console.log('$(".field_container").on("click", function()');
    
    var $this = $(this);    
    
    //only if is already visible, but faded out, that is, with opacitiy lower than 1
    if($this.is(":visible")){        
        //clears the animation queue
        $this.stop(true, true);     
        
        $this.fadeTo("fast", 1, function(){                        
            inputHandler($this);
            updatesFieldsAndIcons($this);
        });
    }    
});

//fades out or fades in all visible fields, except itself, according to validity 
//also updated icon list
function updatesFieldsAndIcons($this){
    console.log("updatesFieldsAndIcons($this)");
    
    var $fieldHead = $this.closest(".field_container");
    
    if(isFieldValid($this)){
        setIcon($this, "active");
    }
    else{
        setIcon($this, "wrong");
    }
    
    $fieldHead.siblings(".field_container").each(function(){
        
        if($(this).is(":visible")){        
            if(isFieldValid($(this))){
                $(this).stop(true).fadeTo("slow", 0.1);
                $(this).find(".next").stop(true).hide("slow");
                setIcon($(this), "done");
            }
            else{
                $(this).stop(true).fadeTo("fast", 1);
                setIcon($(this), "wrong");
            }
        }
        else{
            setIcon($(this), "inactive");
        }
    });    
}

//sets correspondent icon on icon list within the div with class "steps"
//$this is the current field with class "field_container"
//status may be "inactive", "active", "done" or "wrong"
function setIcon($this, status){

    var $fieldHead = $this.closest(".field_container");
    var fieldN; //the field number will be taken from class name
    
    //gets all classes from $fieldHead 
    var classList = $fieldHead.attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
        //if there is a class which contains the string "field"?
        if (item.indexOf("field") >= 0) {
            fieldN = item;
        }
    });
    
    if(!fieldN){
        console.error("The field has no class with the expression 'field#' ");
    }
    //console.log(fieldN);
    
    $(".steps").find(".icon").each(function(index, item){
        if ($(this).hasClass(fieldN)){
            
            $(this).removeClass("active done wrong");
            
            switch(status) {
                case "inactive":
                    break;
                case "active":
                    $(this).addClass("active");
                    break;
                case "done":
                    $(this).addClass("active");
                    $(this).addClass("done");
                    break;
                case "wrong":
                    $(this).addClass("wrong");
                    break;
                default:
                    console.error("status in setIcon function not correct");
            }
        }
    });
    
}


//For a certain element inside the div with class ".field_container", 
//checks on every visible and active number input element, if all these elements are valid
//Field refers to insurance, credit, tolls, etc., that is, cost items
function isFieldValid($this){    
    console.log("isFieldValid($this)");
    
    //goes to top ascendents till it finds the class "field_container"
    //.closest: for each element in the set, get the first element that matches the selector by testing 
    //the element itself and traversing up through its ancestors in the DOM tree.
    var $fieldHead = $this.closest(".field_container");
    
    //goes to every descendent input[type="number"]
    var $inputElements = $fieldHead.find('input[type="number"]');

    var isValid = true;
    var val, min, max;
    $inputElements.each(function(index){
        //if the input element is hidden or disabled doesn't check its value
        if( $(this).is(":visible") && !$(this).prop('disabled')){
            isValid = isNumberInputValid($(this));
            if(!isValid){
                return false;
            }
        }
    });
    
    //console.log("isFieldValid: " + isValid);
    return isValid;
}

//$this refers to input type=number
function isNumberInputValid($this){
    //console.log("isNumberInputValid($this)");
    
    //A text input's value attribute will always return a string. 
    //One needs to parseInt the value to get an integer
    val = parseInt($this.val(), 10);
    //console.log(index + ": " + val);

    if(!isNumber(val)){
        return false;
    }

    min = parseInt($this.attr('min'), 10); 
    max = parseInt($this.attr('max'), 10);            
    //console.log(min, max);

    if (isNumber(min) && isNumber(max)){
        if(val < min || val > max ){
            return false;
        }
    }
    else if (isNumber(min)){
        if(val < min){
            return false;
        }                            
    }
    else if (isNumber(max)){
        if(val > max ){
            return false;
        }                            
    }
    else{
        console.error("Error in function isNumberInputValid");
        return false;
    }
    
    if ($this.hasClass("input_integer")){
        if(!isInteger(val)){
            return false;
        }
    }    

    return true;
}

//when the input value is wrong
//status is show or hide the error message
function inputErrorMsg($this, status){

    if(!$this.is('input[type="number"]')){
        console.error("Error on inputErrorMsg");
        return;
    }
    
    var errId = "error_msg_" + $this.prop('id');
    
    if(status==="show" && !$("#"+errId).length){
        $this.after(function(){                        
            
            if($(this).attr('min') && $(this).attr('max')){
                return '<div class="error_msg" id="'+errId+'">' + 
                       "Enter a value between " + $(this).attr('min') + " and " + $(this).attr('max') + 
                       "</div>";
            }
            else if($(this).attr('min')){
                return '<div class="error_msg" id="'+errId+'">' + 
                       "Enter a value greater or equal to " + $(this).attr('min') + 
                       "</div>";
            }
            else if($(this).attr('max')){
                return '<div class="error_msg" id="'+errId+'">' + 
                       "Enter a value smaller or equal to " + $(this).attr('max') + 
                       "</div>";
            }
        });    
    }
    else if(status==="hide"){
        $("#"+errId).remove();   
    }

}


/************************************************************************************************************/
/************************************************************************************************************/

/************************************************************************************************************/
/************************************************************************************************************/

//FORM CALCULATOR FUNCTIONS

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

/*function that checks if a certain HTML id or class is visible*/
function isVisible(html_ref) {
    if($(html_ref).css("display")!="none")
        return true;
    else
        return false;
}
