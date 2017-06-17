/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which change the visual aspect of the page*/

/*function that is run when the button Reload/Rerun is clicked*/
function reload() {
    ResultIsShowing=false; 

    CurrentFormPart=1;   
    $("#form_part2, #form_part3").hide();
    
    //hides the results divs and correspondent class
    //and shows the initial page, chaining the transitions
    $(".result_section, #monthly_costs, #result_buttons_div, #pie_chart_div, #bar_chart_div").
        hide("slow").
        promise().
        done(function(){                                        
            $("#input_div").show();
                $("#form_part1").
                slideDown("slow", function(){                        
                    scrollPage();              
                });
        }); 

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

/*functions which is used to change the form parts*/
var hasLoadedPart = [false, false, false, false]; //global array variable for function openForm_part
var hasShownPart2 = false; var hasShownPart3 = false; //put to true when form part is FIRST shown
var CurrentFormPart; //global variable for the current Form Part
function openForm_part(part_name, part_number_origin, part_number_destiny) {
    
    CurrentFormPart = part_number_destiny;

    //shows form part {d} coming from form part {o} hiding the remaining part
    function shows_part(){
        //origin and destiny form parts
        var o=part_number_origin; 
        var d=part_number_destiny; 
        
        //gets jQuery variable for each form part
        var p1 = $("#"+part_name+"1");
        var p2 = $("#"+part_name+"2");
        var p3 = $("#"+part_name+"3");
        
        //clears any pending animations for all elements
        $("*").clearQueue();
        
        if (o==1 && d==2){           
            p1.slideUp("slow", function(){
                p2.slideDown("slow", function(){                                    
                    scrollPage();
                        });
                });
        }
        else if(o==2 && d==3){
            $("*").promise().done(function(){
                p2.slideUp("slow", function(){
                    p3.slideDown("slow", function(){
                        scrollPage();
                    });                
                });
            });
        }
        else if(o==3 && d==2){
            $("*").promise().done(function(){
                p3.slideUp("slow", function(){
                    p2.slideDown("slow", function(){
                        scrollPage();
                    });                
                });
            });           
        }
        else if(o==2 && d==1){
            p2.slideUp("slow", function(){
                p1.slideDown("slow", function(){                        
                                        scrollPage();
                                    });
                                });                                
        }       
    }  

    //change from form part 1 to 2
    if (part_number_origin===1 && part_number_destiny===2){
       
        if (!is_userdata_formpart1_ok())
            return;
        else
            shows_part();

    }
    
    //change from form part 2 to 3
    if (part_number_origin==2 && part_number_destiny==3){
        if (!is_userdata_formpart2_ok())
            return;
        else
            shows_part();        
    }
    
    //change from form part 3 to 2
    if (part_number_origin==3 && part_number_destiny==2){
        shows_part();
    }
    
    //change from form part 2 to 1
    if (part_number_origin==2 && part_number_destiny==1){
        shows_part();
    }
    
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
        $("#InspectionCost_tr").hide("slow");
    }
    else{
        $("#InspectionCost_tr").show("slow")
    }
});

//function for the radio button with the question 
//'Calculations based on:' in the Fuel section of Form part 2
function fuelCalculationMethodChange(fuelCalculationMethod) {
    if (fuelCalculationMethod === "currency") {
        //selects actively radio button to which this function is associated
        $("#radio_fuel_euros").prop("checked", true);
        
        isDistanceSet = false;
        $("#distance_form3").each(function(){ $(this).show(); });
        $("#currency_div_form2").slideDown("slow");
        $("#distance_div_form2").slideUp("slow");
        $(".time_spent_part1_form3").each(function(){ $(this).hide(); });
        $(".time_spent_part2_form3").show();
        $("#drive_to_work_no_form3").prop("checked", true);
        
        carToJob(false);
    } else if (fuelCalculationMethod === "distance") {
        //selects actively radio button to which this function is associated        
        $("#radio_fuel_km").prop("checked", true); 
        
        isDistanceSet = true;
        $("#distance_form3").each(function(){ $(this).hide(); });
        $("#currency_div_form2").slideUp("slow");
        $("#distance_div_form2").slideDown("slow");

        carToJob(false);
        driveToJob(false);
    } else {
        console.log("Either is distance or currency... make up your mind developer");
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
        $("#dia_nao_portag_DIV").slideUp("slow");
        $("#dia_sim_portag_DIV").slideDown("slow");
    } else {
        $("#dia_nao_portag_DIV").slideDown("slow");
        $("#dia_sim_portag_DIV").slideUp("slow");
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

/*Some Jquery Document functions*/

//sliders in form part 3
$("#slider1").change(function() {
    slider_toggles_form3();
});
$("#slider2").change(function() {
    slider_toggles_form3();
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