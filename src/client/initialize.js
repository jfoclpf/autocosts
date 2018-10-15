$(document).ready(function () {
    
    DISPLAY.result.isShowing = false; //global variable indicating whether the results are being shown

    getScriptOnce(JS_FILES.siteFunctions, function(){
        
        //detects old versions of Internet Explorer
        oldIE();
        
        getScriptOnce(JS_FILES.formFunctions, function(){
            setLanguageVars();
            loadPageSettings();    
            loadFormSettings();
            loadFormHandlers();
            loadResultsHandlers();
            loadsStandardValues();
        });
        
        /*Google Analytics*/
        if(navigator.userAgent.indexOf("Speed Insights") == -1 && !IsThisAtest() && SWITCHES.g_analytics) {        
            getScriptOnce(JS_FILES.Google.analytics, function(){
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date();                                
                //change according to your site
                ga('create', GA_TRACKING_ID, 'auto');
                ga('set', 'displayFeaturesTask', null);
                ga('send', 'pageview');        

                //detects whether Google Analytics has loaded
                //tries every second
                check_ga(1000);
            });                
        }        
    });

    //Google recaptcha
    IS_HUMAN_CONFIRMED = false;    
    
});

//function that sets the JS language variables to the correspondent HTML divs
function setLanguageVars(){
    
    //language HTML select dropdowns
    var SelectList = {
        "1" : WORDS.month,
        "2" : WORDS.two_months,
        "3" : WORDS.trimester,
        "4" : WORDS.semester,
        "5" : WORDS.year
    };
    $("select.time_period").each(function(){
        var $dropdown = $(this);
        $.each(SelectList, function(key, value) {
            $dropdown.append($("<option/>").val(key).text(value));
        });
    });
    
}


//settings and handlers of the elements on the landing page
function loadPageSettings(){     
    
    // All sides
    var sides = ["left", "right"];
    // Initialize sidebars
    for (var i = 0; i < sides.length; ++i) {
        var cSide = sides[i];
        $(".sidebar." + cSide).sidebar({side: cSide});
    }
    
    //hides the calculator form on the landing page
    $("#form, #results").hide();
    $(".sidebar").show();
    
    //button shown on the landing page
    $("#calculateButton").on("click", calculateButtonOnclick);
    
    $("#country_select").on('change', function() {
        window.location.href = this.value;
    });
    
    //Sidebars click handlers
    $(".btn[data-action]").on("click", function () {
        var $this = $(this);
        var action = $this.attr("data-action");
        var side = $this.attr("data-side");
        
        if (action === "open"){            
            $(".sidebar." + side).trigger("sidebar:" + action);
            $(".sidebar." + side).animate({backgroundColor: "rgb(0, 0, 0, 0.4)" });
        }
        else if (action === "close"){
            $(".sidebar." + side).animate({backgroundColor: "rgb(0,0,0,0)"}, function(){
                $(".sidebar." + side).trigger("sidebar:" + action);
            });
        }
        else{
            console.error("Error in sidebar click hanlders");
        }        
        
        return false;
    });

    //close the sidebar
    $(".sidebar").on("click", function (event) {
        //detect if user clicks outside the sidebar, when sidebar is opened
        if($(event.target).hasClass("sidebar")){
            //closing the sidebar
            var $this = $(this);
            $this.animate({backgroundColor: "rgb(0,0,0,0)"}, function(){
                $this.trigger("sidebar:close");
            });
        }
    });
    
    //adjusts the size of select according to content
    resizeSelectToContent("#country_select");   
    
    //load statistics table on sidebars.hbs    
    updateStatsTable(COUNTRY);
    
    $("#country_select_stats").on('change', function() {
        updateStatsTable(this.value);
    });    
    
}

//When clicked the Calculate Button shown on the landing page
function calculateButtonOnclick(){
    $("#hero, footer").hide();
    $("#form").show();
    setIcon($(".field_container").first(), "active");

    //on test version shows everything right from the beginning
    if(COUNTRY=="XX"){
        $(".field_container").show();
    }

    getScriptOnce(JS_FILES.coreFunctions, function(){
        getScriptOnce(JS_FILES.validateForm);
        getScriptOnce(JS_FILES.conversionFunctions);
        
        getScriptOnce(JS_FILES.smartAppBanner, loadSmartBanner);
        
        getScriptOnce(JS_FILES.getData, function(){
            loadExtraFiles();
        });

    });
    
    //loadStyleSheets(['css/merged_deferred.css']);
    loadStyleSheets(['css/results.css', 'css/smart-app-banner.css']); //temporary line
}

//initial settings regarding the calculator form itself
//that is, after the user has pressed "calculate" button on the landing page
function loadFormSettings(){
    
    //shows numeric keypad on iOS mobile devices
    if(getMobileOperatingSystem() === "iOS"){
        $('.form_part input[type="number"]').attr("pattern", "\\d*");
    }
    
    //hides all buttons "next"
    $(".next").hide();    
    
    //hides form part head titles, except first
    //that is, it only shows Head Title "1. Standing costs"
    $(".form_part_head_title").each(function(index){
        if(index == 0){
            $(this).show();
        }
        else{
            $(this).hide();
        }
    });   
    
    //hides all fields except the first
    $(".field_container").each(function( index ) {
        if(index==0){
            $( this ).show();
        }
        else{
            $( this ).hide();
        }
    });    
    
    $(".calculate_bottom_bar").hide();
    
    $("#main_form select").val('1'); //set all the selects to "month"

    //PART 1
    //depreciation
    $("#acquisitionYear").attr("max", (new Date()).getFullYear());
    //credit
    $('#sim_credDiv').hide();
    
    //inspection    
    $("#numberInspections").val(0);
    $("#InspectionCost_tr").hide();
    $("#numberInspections").on("input", nbrInspectOnChanged);

    //PART 2
    //fuel
    $('#currency_div_form2').show();
    $('#distance_div_form2').hide();        
    fuelCalculationMethodChange('currency'); //sets radio button in Form Part 2, section Fuel calculations, to Currency

    //tolls
    tolls_daily(false);
    //fines
    $("#tickets_period_select").val('5'); //set fines period to year
    //washing    
    $("#washing_period_select").val('3'); //set washing period to trimester
    
    //PART 3
    //sets "Considering you drive to work?",  Distance section in Form Part 3, to No
    driveToJob(false);             
    //Income in Form Part 3 - set to year
    income_toggle("year");             
    
}
    
//handlers regarding the calculator form itself
//that is, after the user has pressed "calculate" button on the landing page
function loadFormHandlers(){
    
    //run button
    $("#calculate_costs_btn").on( "click", function(){Run2()});        
    
    //button "next"; function buttonNextHandler is on formFunctions.js
    $(".button.btn-orange").on( "click", function(){
        buttonNextHandler($(this));
        //this is necessary to avoid default behaviour
        //avoid from scrolling to the top of page
        return false;    
    });
    
    //On 'input' would fire every time the input changes, so when one pastes something 
    //(even with right click), deletes and types anything. If one uses the 'change' handler, 
    //this will only fire after the user deselects the input box, which is not what we want.
    //inputHandler is defined in formFunctions.js
    $('input[type="number"]').on("input", function(){inputHandler($(this))});
    
    //it calls the same functions inputHandler after the radio button is changed
    //this onchange event is trigered after the onclick events down here
    $('input[type="radio"]').on("change", function(){inputHandler($(this))});      
    
    //keys handlers; function keyDownHandler is in formFunctions.js
    $(document).keydown(function(e){keyDownHandler($(this), e)});
    $('input[type="number"]').keydown(function(e){keyDownHandler($(this), e)});
      
    //PART 1
    //insurance
    setRadioButton("insurancePaymentPeriod", "semestral"); //insurance radio button set to half-yearly            

    //credit
    $("#cred_auto_true").on( "click", function(){onclick_div_show('#sim_credDiv',true)});
    $("#cred_auto_false").on( "click", function(){onclick_div_show('#sim_credDiv',false)});
    $("#cred_auto_false").prop("checked", true);   //radio button of credit set to "no"                

    //PART 2
    //fuel
    $("#radio_fuel_km").on( "click", function(){fuelCalculationMethodChange('distance')});
    $("#radio_fuel_euros").on( "click", function(){fuelCalculationMethodChange('currency')});
    $("#car_job_form2_yes").on( "click", function(){carToJob(true)});
    $("#car_job_form2_no").on( "click", function(){carToJob(false)});
    $("#radio_fuel_euros").prop("checked", true);  //radio button of fuel set to "money"   
    $("#car_job_form2_no").prop("checked", true);  //radio button (considering you drive to work? => no) 
    
    //tolls    
    $("#tolls_daily_true").on( "click", function(){tolls_daily(true)});
    $("#tolls_daily_false").on( "click", function(){tolls_daily(false)});
    $("#tolls_daily_false").prop("checked", true); //radio button (toll calculations based on day? => no)
    
    //PART 3
    $("#drive_to_work_yes_form3").on( "change", function(){driveToJob(true)});
    $("#drive_to_work_no_form3").on( "change", function(){driveToJob(false)});
    $("#working_time_yes_form3").on( "change", function(){working_time_toggle(true)});
    $("#working_time_no_form3").on( "change", function(){working_time_toggle(false)});
    //income
    $("#radio_income_year").on( "change", function(){income_toggle("year")});
    $("#radio_income_month").on( "change", function(){income_toggle("month")});
    $("#radio_income_week").on( "change", function(){income_toggle("week")});
    $("#radio_income_hour").on( "change", function(){income_toggle("hour")});
    $("#radio_income_year").prop("checked", true); //radio button (what is your net income => per year)    
    
    //Final buttons on results    
    $("#run_button, #run_button_noCapctha").on( "click", function(){Run1();});
              
}

function loadResultsHandlers(){
    
    $("#results #totalCostsPeriod").on("change", function(){
        setPeriodicCosts(CALCULATED_DATA, $(this).val());
        drawCostsChart(CALCULATED_DATA, $(this).val());
    });    
    
    if(SWITCHES.pdf){
        $("#results #button-pdf").show();
        //download pdf button handler
        $("#results #button-pdf").on( "click", function(){
            console.log("Download pdf clicked");
            generatePDF(CALCULATED_DATA);
        });   
    }
    else{
        $("#results #button-pdf").hide();
    }   
    
    /*if(SWITCHES.print){
        $("#results #button-print").show();
        $("#print_button").on( "click", function(){Print()});
    }
    else{
        $("#results #button-print").hide();
    }*/  
        
    
    //edit form on results
    $("#results #edit_form_btn").on( "click", function(){
        $("#form").show();               
        $("#results").hide();
    }); 
}


