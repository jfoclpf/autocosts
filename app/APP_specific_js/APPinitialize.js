/* runs function initialize() every time the page is loaded */

window.onload = initialize;

document.addEventListener("initialize", onDeviceReady, false);
document.getElementById("country_select").addEventListener("change", onCountrySelect, false);

function initialize() {
       
    $.getScript("validateForm/" + Country + ".js");
    $.getScript("print_results/" + Country + ".js");
    
    $("#input_div").load("form/"+Country+".html", hasLoadedLayout);
    
    //add flag
    $("#banner_flag").removeClass().addClass(Country.toLowerCase() + " flag");
    
    document.title = window[Country].web_page_title;
    $("#main_title").html(window[Country].main_title);
        
    CurrentFormPart=1;
    ResultIsShowing=false; //global variable indicating whether the results are being shown
}

function hasLoadedLayout(){
    
    
    //due to setting reasons cordova doesn't allow onclick embedded in the HTML
    saneOnClickHandler("form_part1_button_next", function(){openForm_part('form_part', 1, 2)});
    saneOnClickHandler("form_part2_button_back", function(){openForm_part('form_part', 2, 1)});
    saneOnClickHandler("form_part2_button_next", function(){openForm_part('form_part', 2, 3)});
    saneOnClickHandler("form_part3_button_back", function(){openForm_part('form_part', 3, 2)});
    saneOnClickHandler("run_button", function(){Run2()});
    
    saneOnClickHandler("cred_auto_true", function(){onclick_div_show('#sim_credDiv',true)});
    saneOnClickHandler("cred_auto_false", function(){onclick_div_show('#sim_credDiv',false)});
    saneOnClickHandler("radio_fuel_km", function(){fuelCalculationMethodChange('distance')});
    saneOnClickHandler("radio_fuel_euros", function(){fuelCalculationMethodChange('currency')});
    saneOnClickHandler("car_job_form2_yes", function(){carToJob(true)});
    saneOnClickHandler("car_job_form2_no", function(){carToJob(false)});
    saneOnClickHandler("tolls_daily_true", function(){tolls_daily(true)});
    saneOnClickHandler("tolls_daily_false", function(){tolls_daily(false)}); 
    
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

    $('#run_button').show();
    
    $('#run_button_noCapctha').remove();
         
}

function onDeviceReady() {
    
    initialize();
    
    /*$.fn.getScript = function(src, callback) {
        var s = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(s);
        s.onload = function() {
            if (typeof callback == "function") callback();
            callback = null;
        }
        s.onreadystatechange = function() {
            if (s.readyState == 4 || s.readyState == "complete") {
                if (typeof callback == "function") callback();
                callback = null; // Wipe callback, to prevent multiple calls.
            }
        }
        s.src = src;
    }*/
    
}

/*
function onLoadForm(){
    $.fn.getScript("validateForm/" + Country + ".js");
    $.fn.getScript("print_results/" + Country + ".js");
}*/

//due to setting reasons cordova doesn't allow onclick embedded in the HTML
//the attribute must be removed from the DOM and the event added
function saneOnClickHandler(id, action){
    document.getElementById(id).removeAttribute("onclick");
    document.getElementById(id).addEventListener("click", action);
}

