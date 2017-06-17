/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which work only on the form*/

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
        
        //if not a test triggers event for Google Analytics accordingly
        if(!IsThisAtest() && IsGoogleAnalytics){
            if(d==2 && !hasShownPart2){
                ga("send", "event", "form_part", "form_part_2");
                hasShownPart2=true;
            }
            if(d==3 && !hasShownPart3){
                ga("send", "event", "form_part", "form_part_3");
                hasShownPart3=true;
            }
        }
        
        //gets jQuery variable for each form part
        var p1 = $("#"+part_name+"1");
        var p2 = $("#"+part_name+"2");
        var p3 = $("#"+part_name+"3");
        
        //clears any pending animations for all elements
        $("*").clearQueue();
        
        if (o==1 && d==2){           
            p1.slideUp("slow", function(){
                    $("#description").html("");           
                    $('#div1_td, #div3_td').hide("slow");                  
                    $("#description, #div1_td, #div3_td").
                        promise().
                        done(function(){
                            p2.slideDown("slow", function(){                                    
                                scrollPage();
                            });
                        });
                });
        }
        else if(o==2 && d==3){
            $('#div1_td, #div3_td').hide();
            $("*").promise().done(function(){
                p2.slideUp("slow", function(){
                    p3.slideDown("slow", function(){
                        scrollPage();
                    });                
                });
            });
        }
        else if(o==3 && d==2){
            $('#div1_td, #div3_td').hide();
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
                $("#description").
                    hide().
                    html(DescriptionHTML).
                    slideDown("fast", function(){
                        $("#div1, #div3").
                            hide().
                            promise().
                            done(function(){
                                $("#div1_td, #div3_td").
                                    show().
                                    promise().
                                    done(function(){
                                        p1.
                                        slideDown("slow", function(){                        
                                            $("#div1, #div3").
                                                show("slow").
                                                promise().
                                                done(function(){                                    
                                                        scrollPage();
                                                });
                                        });
                                    });
                            });
                        });                                             
                    });                                 
        }       
    }  

    //change from form part 1 to 2
    if (part_number_origin===1 && part_number_destiny===2){
       
        if (!hasLoadedPart[0]){
            $.getScript("js/coreFunctions.js", function(){
                //Tries to load Google chart JS files
                $.getScript("https://www.gstatic.com/charts/loader.js")
                    .done(function(){
                        IsGoogleCharts = true;
                    })
                    .fail(function(){
                        IsGoogleCharts = false;
                });
                hasLoadedPart[0] = true;
                if (!is_userdata_formpart1_ok())
                    return;
                shows_part();
            });                                             
        }
        else{
            if (!is_userdata_formpart1_ok())
                return;
            shows_part();
        }
        
        if (!hasLoadedPart[1]){
            $.getScript("js/conversionFunctions.js");
            $.getScript("db_stats/statsFunctions.js"); 
            $.getScript("js/get_data.js");
            $.getScript("js/print.js");
            $.getScript("google/charts.php?country="+Country, function() {
                $.getScript("js/print_results.js.php?country="+Country); 
            });
                       
            $.getScript("google/g-recaptcha.js", function() {             
                $.getScript("https://www.google.com/recaptcha/api.js?onload=grecaptcha_callback&render=explicit&hl="+Language)
                    .done(function(){
                        IsGoogleCaptcha = true;
                    })
                    .fail(function(){
                        IsGoogleCaptcha = false;
                });
            });
            
            //Jquery social media share plugins
            $.getScript("js/social/jssocials.min.js");
            
            $('<link/>', {
               rel: 'stylesheet', type: 'text/css',
               href: 'css/social/jssocials.css'
            }).appendTo('head');
            $('<link/>', {
               rel: 'stylesheet', type: 'text/css',
               href: 'css/social/jssocials-theme-classic.css'
            }).appendTo('head');
            
            hasLoadedPart[1] = true;
        }
    }
    
    //change from form part 2 to 3
    if (part_number_origin==2 && part_number_destiny==3){
        if (!is_userdata_formpart2_ok())
            return;
        
        if (!hasLoadedPart[2]){
            //If Google Charts JS files are available
            if (IsGoogleCharts){
                google.charts.load('current', {"packages": ["corechart"], "language": Language, "callback": function(){
                    hasLoadedPart[2]=true;
                    shows_part();
                }});
            }
            else{
                hasLoadedPart[2]=true;
                shows_part();                
            }
        }
        else{
            shows_part();
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
                    //path where the fonts for PDF are stored
                    var pdf_fonts_path;
                    if (Country=='CN' || Country=='JP' || Country=='IN'){
                        pdf_fonts_path = "js/pdf/" + Country + "/vfs_fonts.js";                      
                    }else{
                        pdf_fonts_path = "js/pdf/vfs_fonts.js";
                    }                    
                    $.getScript(pdf_fonts_path, function() {
                         $("#generate_PDF").prop("disabled",false).removeClass("buttton_disabled");
                         hasLoadedPart[3]=true;
                    });
                });
            });
        }
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


/*function that is run when the button Reload/Rerun is clicked*/
function reload() {
    TimeCounter.resetStopwatch();
    ResultIsShowing=false;
    
    //if the results were already shown, it means user went already through ReCaptcha
    isHumanConfirmed = true;   

    CurrentFormPart=1;   
    $("#form_part2, #form_part3").hide();
    $("#description, #div1_td, #div3_td").hide();
    $("#div1, #div3").show();
    
    //reset the run buttons
    resetRunButtons();  
    
    //hides the results divs and correspondent class
    //and shows the initial page, chaining the transitions
    $(".result_section, #monthly_costs, #result_buttons_div, #pie_chart_div, #bar_chart_div").
        hide("slow").
        promise().
        done(function(){                                        
            $("#description").
                hide().
                html(DescriptionHTML).
                slideDown("fast", function(){
                    $("#div1, #div3").
                        hide().
                        promise().
                        done(function(){
                            $("#div1_td, #div3_td").
                                show().
                                promise().
                                done(function(){
                                    resized(function(){
                                        $("#input_div").show();
                                            $("#form_part1").
                                            slideDown("slow", function(){                        
                                                $("#div1, #div3").
                                                    show("slow").
                                                    promise().
                                                    done(function(){                                           
                                                        scrollPage();                                                   
                                                    });
                                            });
                                    });
                                });
                        });
                 });
        }); 

}


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

