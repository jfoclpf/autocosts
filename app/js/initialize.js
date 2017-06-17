/* runs function initialize() every time the page is loaded */
window.onload = initialize;

function initialize() {
    
    $("#input_div").load("countries/PT_form.html", function(){
        hasLoadedLayout();
    }); 
    
    CurrentFormPart=1;
    ResultIsShowing=false; //global variable indicating whether the results are being shown
}

function hasLoadedLayout(){
    
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
    document.getElementById("radio_cred_nao").checked = true;
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
    
    $('#run_button_noCapctha').hide();
      
}