$(document).ready(function () {

    DISPLAY.result.isShowing = false; //global variable indicating whether the results are being shown

    getScriptOnce(JS_FILES.siteFunctions, function(){

        //detects old versions of Internet Explorer
        oldIE();

        getScriptOnce(JS_FILES.formFunctions, function(){
            setLanguageVars();
            loadPageSettings();
            loadResultsSettingsAndHandlers();
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

function loadResultsSettingsAndHandlers(){

    $("#results #totalCostsPeriod").on("change", function(){
        setPeriodicCosts(CALCULATED_DATA, $(this).val());
        drawCharts.costsBars($(this).val());
        drawCharts.costsDoughnut($(this).val());
    });

    if(SWITCHES.pdf){
        $("#results .button-pdf").show().addClass("disabled");
        //download pdf button handler
        $("#results .button-pdf").on( "click", function(){
            console.log("Download pdf clicked");
            generatePDF(CALCULATED_DATA, "download");
        });
    }
    else{
        $("#results .button-pdf").hide();
    }

    if(SWITCHES.print){
        $("#results .button-print").show().addClass("disabled");
        $("#results .button-print").on( "click", function(){
            console.log("Print button clicked");
            generatePDF(CALCULATED_DATA, "print");
        });
    }
    else{
        $("#results .button-print").hide();
    }

    //edit form on results
    $("#results #edit_form_btn").on( "click", function(){
        $("#form").show();
        $("#results").hide();
    });

    if (SWITCHES.social /*&& !IsThisAtest()*/){
        $(".right-actions .facebook a, .right-actions-mobile .facebook a").
            attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(FULL_URL)).attr("target", "_blank");
        $(".right-actions .twitter a,  .right-actions-mobile .twitter a").
            attr("href", "https://twitter.com/share?url=" + encodeURI(FULL_URL)).attr("target", "_blank");
        $(".right-actions .linkedin a, .right-actions-mobile .linkedin a").
            attr("href", "https://www.linkedin.com/shareArticle?url=" + encodeURI(FULL_URL)).attr("target", "_blank");
        $(".right-actions .whatsapp a, .right-actions-mobile .whatsapp a").
            attr("href", "https://wa.me/?text=" + encodeURI(FULL_URL)).attr("target", "_blank");        
    }
    else{
        $(".right-actions, .right-actions-mobile").hide();
    }
}


