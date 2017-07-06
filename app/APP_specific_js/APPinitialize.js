/* runs function onLoad() every time the page is loaded */

window.addEventListener('load', onLoad);
//document.addEventListener("initialize", onDeviceReady, false);

var wasLoaded = [false, false];
function onLoad() {

    document.getElementById("country_select").addEventListener("change", onCountrySelect, false);
    
    $("#input_div").load("form/"+Country+".html", function(){
        $.getScript("js/formFunctions.js", function(){
            $.getScript("validateForm/" + Country + ".js", function(){
                $.getScript("print_results/" + Country + ".js", hasLoadedAllFiles);
              });
            });
        });
    
    //add flag
    $("#banner_flag").removeClass().addClass(Country.toLowerCase() + " flag");
    
    document.title = window[Country].web_page_title;
    $("#main_title").html(window[Country].main_title);
    
    $("#result_buttons_div").
        html('<input type="button" class="button" id="reload_button" value="'+window[Country].button_rerun+'" />');
    $("#result_buttons_div").on("click", "#reload_button", reload);
    
    $("#monthly_costs_title").text(window[Country].average_costs_per_type);
    $("#fin_effort_title").text(window[Country].financial_effort);
    $("#alternative_to_carcosts_title").text(window[Country].publ_tra_equiv);
        
    CurrentFormPart=1;
    ResultIsShowing=false; //global variable indicating whether the results are being shown
    wasLoaded[0]=true;
}

function hasLoadedAllFiles(){
    
    //due to setting reasons cordova doesn't allow onclick embedded in the HTML
    $("#run_button").prop('type', 'button');
    saneOnClickHandler("run_button", Run1);
    
    saneOnClickHandler("form_part1_button_next", function(){openForm_part(1, 2)});
    saneOnClickHandler("form_part2_button_back", function(){openForm_part(2, 1)});
    saneOnClickHandler("form_part2_button_next", function(){openForm_part(2, 3)});
    saneOnClickHandler("form_part3_button_back", function(){openForm_part(3, 2)});     
        
    saneOnClickHandler("cred_auto_true", function(){onclick_div_show('#sim_credDiv',true)});
    saneOnClickHandler("cred_auto_false", function(){onclick_div_show('#sim_credDiv',false)});
    saneOnClickHandler("radio_fuel_km", function(){fuelCalculationMethodChange('distance')});
    saneOnClickHandler("radio_fuel_euros", function(){fuelCalculationMethodChange('currency')});
    saneOnClickHandler("car_job_form2_yes", function(){carToJob(true)});
    saneOnClickHandler("car_job_form2_no", function(){carToJob(false)});
    saneOnClickHandler("tolls_daily_true", function(){tolls_daily(true)});
    saneOnClickHandler("tolls_daily_false", function(){tolls_daily(false)});
    
    saneOnClickHandler("drive_to_work_yes_form3", function(){driveToJob(true)}, "onchange");
    saneOnClickHandler("drive_to_work_no_form3", function(){driveToJob(false)}, "onchange");
    saneOnClickHandler("working_time_yes_form3", function(){working_time_toggle(true)}, "onchange");
    saneOnClickHandler("working_time_no_form3", function(){working_time_toggle(false)}, "onchange");
    
    saneOnClickHandler("radio_income_year", function(){income_toggle("year")}, "onchange");
    saneOnClickHandler("radio_income_month", function(){income_toggle("month")}, "onchange");
    saneOnClickHandler("radio_income_week", function(){income_toggle("week")}, "onchange");
    saneOnClickHandler("radio_income_hour", function(){income_toggle("hour")}, "onchange");
   
    //divs that need to be hidden    
    frame_witdh = document.getElementById('monthly_costs').offsetWidth;
    
    DescriptionHTML = $('#description').html();

    //make some initial settings in the options of the form
    $('#numberInspections').val(0);
    $("#InspectionCost_tr").hide();
    
    tolls_daily(false);
    
    document.getElementById("radio_fuel_euros").checked = true;
    $('#currency_div_form2').show();
    $('#distance_div_form2').hide();
    document.getElementById("cred_auto_false").checked = true;
    $('#sim_credDiv').hide();
    
    //sets "Considering you drive to work?",  Distance section in Form Part 3, to No 
    driveToJob(false);
    //sets radio button in Form Part 2, section Fuel calculations, on Currency
    fuelCalculationMethodChange('currency');
    carToJob(false);

    //set public transporsts and fin. effort main DIVs to no
    $('#slider1').checked = false;
    $('#public_transp_Div_form3').hide();
    $('#slider1').checked = false;
    $('#fin_effort_Div_form3').hide();
    $("#distance_time_spent_driving_form3").hide();

    //align radio button text
    $("#main_form input:radio").siblings("span").css("vertical-align", "text-bottom");
        
    $('#run_button_noCapctha').remove();
    $('#run_button').show();
    
    wasLoaded[1]=true;   
}

/*function onDeviceReady() {
    
}*/

//due to setting reasons cordova doesn't allow onclick embedded in the HTML
//the attribute must be removed from the DOM and the event added
function saneOnClickHandler(id, functionToExec, onAction="onclick"){
    document.getElementById(id).removeAttribute(onAction);
    document.getElementById(id).addEventListener("click", functionToExec);
}


