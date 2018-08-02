/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which work only on the form*/


/************************************************************************************************************/
/************************************************************************************************************/

//USER INTERFACE FUNCTIONS

//When button "Next" is clicked, this function is called; $thisButton males reference to the button itself
//It creates a loop which goes through all divs with class="field_container" or class="form_part_head_title"
//It scrolls down the page till a field_container is: NOT valid OR NOT visible  
//Example: as it reaches for the 1st time "Credit" item (field3), function fieldStatus returns "fully_hidden"
//since all items are hidden initially when the form is loaded (except the 1st item), and as such it breaks herein.
//But since "Credit" cost item by default has radio button set at NO, this "Credit" field_container doesn't show any
//'input[type="number"]' and thus after showing this field_container, fieldStatus returns "no_inputs", and as such
//we show the "Next" button, since when the user sets radio button to NO in "Credit", that is OK, but it shows no inputs
function buttonNextHandler($thisButton, callback){
    //console.log("function buttonNextHandler($thisButton)");
    
    //closest get top parent finding element with class "field_container", 
    var $fieldHead = $thisButton.closest(".field_container");
    
    if(fieldStatus($fieldHead) !== "fully_valid" && fieldStatus($fieldHead) !== "no_inputs"){
        console.error("'Next' button clicked, when field was not OK for showing 'next' button");
    }
    
    //hides own next button
    $thisButton.closest( ".next" ).stop(true).hide();
    
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
            
            //It scrolls down the page till it finds a field_container 
            //which is not fully_valid and having some available inputs
            if(fieldStatus($i) !== "fully_valid" && fieldStatus($i) !== "no_inputs"){                
                
                //we make sure the cost_item/field_container main div is now visible
                $i.stop(true).show();
                
                //now we're sure that, even after showing the field, it is not hidden, since a field
                //may have the content hidden, due to user form settings
                if(fieldStatus($i) !== "hidden"){
                
                    //by showing now the field_container, if it has no inputs show next button
                    //for example "Credit" field container
                    if(fieldStatus($i) === "no_inputs"){
                        $i.find(".next").stop(true).show(); //shows "next" button                    
                    }

                    //scrols the page to the corresponding div, considering the header
                    scrollsPageTo($i);
                    
                    updatesFieldsAndIcons($i);
                    //returns to the callback the target .field_container, that is, $i
                    if(typeof callback === 'function'){
                        callback($i);
                    } 
                    
                    //breaks the .each loop
                    return false;
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
    //console.log("keyDownHandler");
    
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


//This function fires every time on("input") in
//input[type="number"] OR input input[type="radio"] 
//that is when the numbers inputs are changed or when the radio buttons are clicked
//check initialize.js in function loadsButtonsHandlers
function inputHandler($this){
    //console.log("inputHandler($this)");
    
    //if the number is invalid empty the input
    if ( $this.is('input[type="number"]') && !isNumber(parseFloat($this.val())) ){
        $this.val("");
    }
        
    var $fieldHead = $this.closest(".field_container");
    
    //the icon on the icon list, with class "steps"
    if(fieldStatus($this) === "wrong"){
        setIcon($this, "wrong");
    }
    else if (fieldStatus($this) === "fully_valid"){
        setIcon($this, "done");
    }
    else {
        setIcon($this, "active");
    }
    
    var $buttonNext = $fieldHead.find(".next");
    
    //shows active field
    $fieldHead.show().stop(true).fadeTo("fast", 1);
    //fades previous fields    
    
    //just runs after all descedents (.find) have completed
    $fieldHead.find("*").promise().done(function(){      
        
        //console.log("Check whether show/hide Next Button on " + $fieldHead.attr('class'));
        
        //shows or hides button "next" accordingly
        //Example: "Credit" field container starts with radio button to NO by default, and thus has no visible inputs
        if(fieldStatus($this) === "fully_valid" || fieldStatus($this) === "no_inputs"){                                    
                        
            //if the current field is valid, show "next" button
            $buttonNext.stop(true).show();            
        }
        else{
            $buttonNext.stop(true).hide();            
        }
        
        if(isReadyToCalc()){
            $(".cta_bottom_bar").fadeIn("slow");
        }
        else{
            $(".cta_bottom_bar").fadeOut("slow");
        }
        
    });
    
    //add red underline in case input is wrong
    if($this.is('input[type="number"]')){        
        if(numberInputStatus($this) === "valid"){
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
    //console.log('$(".field_container").on("click", function()');
    
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

//when the form is fully filled and ready to calculate
function isReadyToCalc(){
        
    var status, isOk = true;
    
    $(".form_part").find(".field_container").each(function(index, item){
        status = fieldStatus($(this)); 
        if (status !== "hidden" && status !== "no_inputs"){
            if(status !== "fully_valid"){
                isOk = false;
                return false;
            }
        }
    });
    
    if(!isOk){
        return false;
    }
    
    //double-check with validating functions from file validateForm.js                                                      
    if (!isUserDataFormOk()){
        return false;
    }    
    
    return true;
}

//fades out or fades in all visible fields, except itself, according to validity 
//also updates icon list on the left panel
function updatesFieldsAndIcons($this){
    //console.log("updatesFieldsAndIcons($this)");
    
    var $fieldHead = $this.closest(".field_container");
    
    if(fieldStatus($this) === "wrong"){
        setIcon($this, "wrong");
    }
    else if (fieldStatus($this) === "fully_valid"){
        setIcon($this, "done");
    }
    else {
        setIcon($this, "active");
    }
        
    //the zero based index within its siblings
    var thisIndex = $this.index();
    
    //remainig field_containers except itself
    $fieldHead.siblings(".field_container").each(function(){
        
        var status = fieldStatus($(this));
            
        if(status === "fully_hidden"){
            setIcon($(this), "inactive");
        }
        else if(status === "hidden"){
            setIcon($(this), "hidden");
        }
        else if (status === "wrong"){
            $(this).stop(true).fadeTo("fast", 1);
            setIcon($(this), "wrong");                
        }
        else if (status === "fully_valid" || status === "no_inputs"){
            $(this).stop(true).fadeTo("slow", 0.1);
            $(this).find(".next").stop(true).hide();
            setIcon($(this), "done");
        }
        
        if ($(this).index() < thisIndex){
            if( status !== "fully_valid" && status !== "no_inputs" && status !== "hidden"){
                setIcon($(this), "wrong");
            }
        }
            
    });    
}


//For a certain element inside the div with class ".field_container", 
//checks on every visible and active number input element, if all these elements are valid
//Field refers to insurance, credit, tolls, etc., that is, cost items
//Output may be: 
//"fully_valid"  => visible/enabled inputs (>=1); all inputs are filled and with valid numbers
//"valid"        => visible/enabled inputs (>=1); some inputs are valid, others are empty
//"empty"        => visible/enabled inputs (>=1); all inputs are empty
//"wrong"        => visible/enabled inputs (>=1); at least one input is wrong
//"no_inputs"    => the field_container main div is visible; but no visible/enabled inputs in the field_container
//"hidden"       => the field container inner divs are all hidden
//"fully_hidden" => the field_container main div with class "field_container" is hidden
function fieldStatus($this){    
    //console.log("fieldStatus($this)");
    
    //goes to top ascendents till it finds the class "field_container"
    //.closest: for each element in the set, get the first element that matches the selector by testing 
    //the element itself and traversing up through its ancestors in the DOM tree.
    var $fieldHead = $this.closest(".field_container");
    
    if(!$fieldHead.is(":visible")){
        return "fully_hidden";
    }
    if($fieldHead.children(":visible").length == 0){
        return "hidden";
    }
    
    //goes to every descendent input[type="number"]
    var $inputElements = $fieldHead.find('input[type="number"]');

    var numberStatus;
    var inputsCount=0, validCount=0, emptyCount=0, wrongCount=0;
    
    $inputElements.each(function(index){
        //if the input element is hidden or disabled doesn't check its value
        if( $(this).is(":visible") && !$(this).prop('disabled')){
            
            inputsCount++;
            
            numberStatus = numberInputStatus($(this));
            if(numberStatus === "wrong" ){
                wrongCount++;
                //since this input is wrong, the whole field is wrong and hence breaks the loop  
                return false;
            }    
            else if (numberStatus === "valid"){
                validCount++;
            }
            else if (numberStatus === "empty"){
                emptyCount++;
            }
            else{
                console.error("Error in function fieldStatus")
                return false;            
            }
        }
        
    });
        
    //when at least one input is wrong, returns "wrong"
    if(wrongCount >= 1){
        return "wrong";
    }
    
    if(inputsCount === 0){
        return "no_inputs";
    }
        
    if(emptyCount >= 1 && validCount >= 1) {
        return "valid";
    }
    
    if(emptyCount >= 1 && validCount === 0){
        return "empty";
    }
    
    if(emptyCount === 0 && validCount >= 1){
        return "fully_valid";
    }
    
    console.error("Error in function fieldStatus")
    return false;
}

//$this refers to input[type="number"]; output may be:
//"valid" => It has input numbers/data, the input is valid
//"empty" => Input has not numbers, that is, it is empty
//"wrong" => It has input numbers/data, but it is invalid/wrong 
function numberInputStatus($this){
    //console.log("numberInputStatus($this)");
    
    if ($this.val() === ""){
        return "empty";
    }

    var val, min, max;
    
    //A text input's value attribute will always return a string. 
    //One needs to parseFloat to convert string to float
    val = parseFloat($this.val());
    //console.log(index + ": " + val);

    if(!isNumber(val)){
        return "wrong";
    }
    
    if ($this.hasClass("input_integer")){
        if(!isInteger(val)){
            return "wrong";
        }
    }    
    
    min = parseFloat($this.attr('min')); 
    max = parseFloat($this.attr('max'));            
    //console.log(min, max);

    if (isNumber(min) && isNumber(max)){
        if(val < min || val > max ){
            return "wrong";
        }
    }
    else if (isNumber(min)){
        if(val < min){
            return "wrong";
        }                            
    }
    else if (isNumber(max)){
        if(val > max ){
            return "wrong";
        }                            
    }
    else{
        console.error("Error in function numberInputStatus");
        return false;
    }       

    return "valid";
}


//sets correspondent icon on icon list within the div with class "steps"
//$this is the current field with class "field_container"
//status may be "inactive", "active", "done", "wrong" or "hidden"
function setIcon($this, status){

    //getFieldNum returns string "field1", "field2", "field3", etc. of field_container
    var fieldN = getFieldNum($this); //the field number will be taken from class name
        
    $(".steps").find(".icon").each(function(index, item){
        if ($(this).hasClass(fieldN)){
            
            $(this).removeClass("active done wrong");
            $(this).find("span").removeClass("wrong");
            $(this).show();
            
            switch(status) {
                case "inactive":
                    break;
                case "active":
                    $(this).addClass("active");
                    $(this).closest(".list").addClass("active");
                    break;
                case "done":
                    $(this).addClass("active");
                    $(this).addClass("done");
                    $(this).closest(".list").addClass("active");
                    break;
                case "wrong":
                    $(this).addClass("wrong");
                    $(this).find("span").addClass("wrong");//text
                    break;
                case "hidden":
                    $(this).hide();
                    break;
                default:
                    console.error("status in setIcon function not correct");
            }
        }
    });
    
}

//when numBool is false returns string "field1", "field2", "field3", etc. of field_container
//when numBool is true returns integer 1, 2, 3, etc. of field_container with class field1, field2, etc. 
function getFieldNum($this, numBool=false){
    
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

    if(numBool){
        return parseInt(fieldN.replace("field", ""), 10);
    }
    else {
        return fieldN; 
    }
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
        
        //if default function paramters are not set, get min and max from HTML attributes
        var min = $this.attr('min');
        var max = $this.attr('max');
        
        var strEnterAValue;
        if ($this.hasClass("input_integer")){
            strEnterAValue = "Enter an integer value";
        }
        else{
            strEnterAValue = "Enter value";
        }
        
        $this.after(function(){                        
            
            if(min && max){
                return '<div class="error_msg" id="'+errId+'">' + 
                       strEnterAValue + " " + "between " + min + " and " + max + 
                       "</div>";
            }
            else if(min){
                return '<div class="error_msg" id="'+errId+'">' + 
                       strEnterAValue + " " + "greater or equal to " + min + 
                       "</div>";
            }
            else if(max){
                return '<div class="error_msg" id="'+errId+'">' + 
                       strEnterAValue + " " + "smaller or equal to " + max + 
                       "</div>";
            }
        });    
    }
    else if(status==="hide"){
        $("#"+errId).remove();   
    }

}

//FORM PART 1, DEPRECIATION
//changes the max allowed month, according to selected year
$("#acquisitionYear").on("input", function(){
    
    // Return today's date and time
    var currentTime = new Date();
    var year = currentTime.getFullYear();  
    
    if($(this).val() == year){
        var month = currentTime.getMonth() + 1;
        $("#acquisitionMonth").attr("max", month);
    }
    else{
        $("#acquisitionMonth").attr("max", 12);
    }

    inputHandler($("#acquisitionMonth"));
});


//scrols the page to the corresponding div, considering the header
function scrollsPageTo($this, callback=(function(){return;})){
    
    //returns integer 1, 2, 3, etc. for "field1", "field2", "field3", etc. of field_container
    var fieldN = getFieldNum($this, true);

    if(fieldN <= 15){
        //gets relative postion with respect to parent element
        var fixedTopPos = $this.offset().top-$(".form_part").scrollTop()-$("header").outerHeight()-200;

        $("html").animate({scrollTop: fixedTopPos}, 600, "linear", function(){                              

            if($(".bottom_spacer").css("padding-top") !== "450px"){
                $(".bottom_spacer").animate({"padding-top": "450px"}, 600, "linear", callback);
            }
            else{
                callback();
            }
        });
    }
    else if(fieldN <= 17){                
        //scrolls to end of page and change bottom spacer
        if($(".bottom_spacer").css("padding-top") !== "150px"){
            $(".bottom_spacer").animate({"padding-top": "150px"}, 600, "linear", function(){
                $("html").animate({ scrollTop: $(document).height()}, 600, "linear", callback);
            });
        }
        else{
            $("html").animate({ scrollTop: $(document).height()}, 600, "linear", callback);
        }
    }
    else{
        console.error("Error on scrollsPageTo(), invalid index: " + fieldN);
    }
}

/*************************************************************************************************************************/
/*************************************************************************************************************************/

/*************************************************************************************************************************/
/*************************************************************************************************************************/

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
    //see why is 0: https://github.com/jfoclpf/autocosts/issues/54
    var animSpeed = 0;
    
    switch(value){
        case "year":
            $("#income_per_month_form3, #income_per_week_form3, #income_per_hour_form3").
                fadeOut(animSpeed).promise().done(function(){
                    $("#income_per_year_form3, #working_time_form3").fadeIn(animSpeed);
                });            
            break;
        case "month":
            $("#income_per_year_form3, #income_per_week_form3, #income_per_hour_form3").
                fadeOut(animSpeed).promise().done(function(){
                    $("#income_per_month_form3, #working_time_form3").fadeIn(animSpeed);
            });            
            break;
        case "week":
            $("#income_per_year_form3, #income_per_month_form3, #income_per_hour_form3").
                fadeOut(animSpeed).promise().done(function(){
                    $("#income_per_week_form3, #working_time_form3").fadeIn(animSpeed);
            });            
            break;
        case "hour":
            $("#income_per_year_form3, #income_per_week_form3, #income_per_month_form3, #working_time_form3").
                fadeOut(animSpeed).promise().done(function(){
                    $("#income_per_hour_form3").fadeIn(animSpeed);
            });            
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
