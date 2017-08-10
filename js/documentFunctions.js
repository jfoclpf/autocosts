/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which work on the page*/

/*functions which is used to change the form parts*/
var openForm_part = (function(part_number_origin, part_number_destiny) {

    var hasLoadedCoreFunctions = false; //local variable

    return function (part_number_origin, part_number_destiny) {

        //change from form part 1 to 2
        if (part_number_origin===1 && part_number_destiny===2){

            if (!hasLoadedCoreFunctions){
                $.getScript("js/coreFunctions.js", function(){
                    hasLoadedCoreFunctions = true;
                    if (!is_userdata_formpart1_ok()){
                        return;
                    }
                    shows_part(1, 2);
                });
            }
            else{
                if (!is_userdata_formpart1_ok()){
                    return;
                }
                shows_part(1, 2);
            }

            loadExtraFiles();
        }

        //change from form part 2 to 3
        if (part_number_origin==2 && part_number_destiny==3){
            if (!is_userdata_formpart2_ok()){
                return;
            }
            shows_part(2, 3);
        }

        //change from form part 3 to 2
        if (part_number_origin==3 && part_number_destiny==2){
            shows_part(3, 2);
        }

        //change from form part 2 to 1
        if (part_number_origin==2 && part_number_destiny==1){
            shows_part(2, 1);
        }
    }
}());

/*Globals*/
var CurrentFormPart; //global variable for the current Form Part
var hasShownPart2 = false; var hasShownPart3 = false; //put to true when form part is FIRST shown
//shows form part {d} coming from form part {o} hiding the remaining part
function shows_part(part_number_origin, part_number_destiny){
    //origin and destiny form parts
    var o=part_number_origin;
    var d=part_number_destiny;

    //if not a test triggers event for Google Analytics accordingly
    if(!IsThisAtest() && SWITCHES.g_analytics && SERVICE_AVAILABILITY.g_analytics){
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
    var p1 = $("#form_part1");
    var p2 = $("#form_part2");
    var p3 = $("#form_part3");

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
                            scrollPage(function(){
                                CurrentFormPart = 2;
                            });
                        });
                    });
            });
    }
    else if(o==2 && d==3){
        $('#div1_td, #div3_td').hide();
        $("*").promise().done(function(){
            p2.slideUp("slow", function(){
                p3.slideDown("slow", function(){
                    scrollPage(function(){
                            CurrentFormPart = 3;
                        });
                });
            });
        });
    }
    else if(o==3 && d==2){
        $('#div1_td, #div3_td').hide();
        $("*").promise().done(function(){
            p3.slideUp("slow", function(){
                p2.slideDown("slow", function(){
                    scrollPage(function(){
                            CurrentFormPart = 2;
                        });
                });
            });
        });
    }
    else if(o==2 && d==1){
        p2.slideUp("slow", function(){
            $("#description").
                hide().
                html(DISPLAY.descriptionHTML).
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
                                                    scrollPage(function(){
                                                        CurrentFormPart = 1;
                                                    });
                                            });
                                    });
                                });
                        });
                    });
                });
    }
}

/*function that loads extra files and features, that are not loaded imediately after the page is opened
because such files and features are not needed on the initial page load, so that initial loading time can be reduced*/
function loadExtraFiles() {

    getScriptOnce("js/conversionFunctions.js");
    getScriptOnce("db_stats/statsFunctions.js");
    getScriptOnce("js/get_data.js");

    if (SWITCHES.print){
        getScriptOnce("js/print.js");
    }

    if (SWITCHES.g_charts){
        getScriptOnce("js/charts.js.php?country="+COUNTRY, function() {
            getScriptOnce("js/print_results.js.php?country="+COUNTRY);
        });
    }
    else{
        getScriptOnce("js/print_results.js.php?country="+COUNTRY);
    }

    if (SWITCHES.data_base){
        getScriptOnce("js/dbFunctions.js");
    }

    getScriptOnce("js/g-recaptcha.js", function() {
        if (SWITCHES.g_captcha){
            getScriptOnce("https://www.google.com/recaptcha/api.js?onload=grecaptcha_callback&render=explicit&hl="+LANGUAGE)
                .done(function(){
                    SERVICE_AVAILABILITY.g_captcha = true;
                })
                .fail(function(){
                    SERVICE_AVAILABILITY.g_captcha = false;
            });
        }
        else{
            SERVICE_AVAILABILITY.g_captcha = false;
        }
    });

    if (SWITCHES.social){
        //Jquery social media share plugins
        getScriptOnce("js/social/jssocials.min.js", function(){
            $('<link/>', {
               rel: 'stylesheet', type: 'text/css',
               href: 'css/social/jssocials.css'
            }).appendTo('head');
            $('<link/>', {
               rel: 'stylesheet', type: 'text/css',
               href: 'css/social/jssocials-theme-classic.css'
            }).appendTo('head');
        });
    }


    if (SWITCHES.g_charts){
        //Tries to load Google chart JS files
        getScriptOnce("https://www.gstatic.com/charts/loader.js")
            .done(function(){
                SERVICE_AVAILABILITY.g_charts = true;
                google.charts.load( 'current', {"packages": ["corechart"], "language": LANGUAGE });
            })
            .fail(function(){
                SERVICE_AVAILABILITY.g_charts = false; //can't load google charts
        });
    }
    else {
        SERVICE_AVAILABILITY.g_charts = false;
    }

    getScriptOnce("google/rgbcolor.js");
    getScriptOnce("google/canvg.js");

    //uber
    if (SWITCHES.uber){
        if(COUNTRY!="XX"){//if not test version
            //gets asynchronously UBER information
            $.get( "php/get_uber.php?c=" + COUNTRY, function(data) {
                //alert(JSON.stringify(data, null, 4));
                UBER_API =  data; //UBER_API is a global variable
            });
        }
        else{//test version (London city, in Pounds)
            UBER_API.cost_per_distance = 1.25;
            UBER_API.cost_per_minute = 0.15;
            UBER_API.currency_code = "GBP";
            UBER_API.distance_unit = "mile";
        }
    }

    if(SWITCHES.pdf){
        //wait until all PDF related files are loaded
        //to activate the downloadPDF button
        getScriptOnce("js/pdf/generatePDF.js", function() {
            getScriptOnce("js/pdf/pdfmake.js", function() {
                //path where the fonts for PDF are stored
                var pdf_fonts_path;
                if (COUNTRY=='CN' || COUNTRY=='JP' || COUNTRY=='IN'){
                    pdf_fonts_path = "js/pdf/" + COUNTRY + "/vfs_fonts.js";
                }else{
                    pdf_fonts_path = "js/pdf/vfs_fonts.js";
                }
                getScriptOnce(pdf_fonts_path, function() {
                    $('#generate_PDF').prop('disabled', false).removeClass('buttton_disabled');
                });
            });
        });
    }
}

//function that loads the scripts only once
//for understanding this scope, read http://ryanmorr.com/understanding-scope-and-context-in-javascript/
//this works like a module, like a singleton function
var getScriptOnce = (function(url, callback){
    var ScriptArray = []; //array of urls
    return function (url, callback) {
        //the array doesn't have such url
        if (ScriptArray.indexOf(url) === -1){
            if (typeof callback === 'function') {
                return $.getScript(url, function(script, textStatus, jqXHR) {
                    ScriptArray.push(url);
                    callback(script, textStatus, jqXHR);
                });
            } else {
                return $.getScript(url, function(){
                    ScriptArray.push(url);
                });
            }
        }
        //the file is already there, it does nothing
        //to support as of jQuery 1.5 methods .done().fail()
        else{
            return {
                done: function () {
                    return {
                        fail: function () {}
                    };
                }
            };
        }
    }
}());

/*function that is run when the button Reload/Rerun is clicked*/
function reload() {
    TimeCounter.resetStopwatch();
    DISPLAY.result.isShowing = false;

    //set result sections as not being shown
    DISPLAY.result.fin_effort = false;
    DISPLAY.result.public_transports = false;
    DISPLAY.result.uber = false;
    DISPLAY.result.ext_costs = false;

    //set charts as not being shown
    DISPLAY.charts.isMonthlyCostsPieChart = false;
    DISPLAY.charts.isMonthlyCostsBarChart = false;
    DISPLAY.charts.isFinEffortChart = false;
    DISPLAY.charts.isAlterToCarChart = false;

    //if the results were already shown, it means user went already through ReCaptcha
    IS_HUMAN_CONFIRMED = true;

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
                html(DISPLAY.descriptionHTML).
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
                                                        scrollPage(function(){
                                                            CurrentFormPart = 1;
                                                        });
                                                    });
                                            });
                                    });
                                });
                        });
                 });
        });
}

/*function that loads new HTML and that is run when country select is changed*/
function onCountrySelect(country) {

    var domain = window.location.hostname;

    var url2go;
    if(domain.split(".")[1]=="work"){
        url2go = "http://autocosts.work/" + country.toUpperCase();
    }
    else{
        url2go = "http://" + DOMAIN_LIST[country] + "/" + country.toUpperCase();
    }
    window.location.href = url2go;
}

/*function that runs when the browser window is resized*/
function resized(callback){
    //adapts the margin-top CSS value according to the window width
    var margin_top_desc = $("#banner_top").outerHeight(true)+3;
    $("#description").css("margin-top", margin_top_desc);

    //mobile devices
    if($(document).width()<=768){
        $("#div1_td").css("width", "100%");
        $("#div3_td").css("width", "100%");
    }
    else{
        if(DISPLAY.result.isShowing){
            $("#div1_td").css("width", "15%");
            $("#div3_td").css("width", "15%");
        }
        else{
            $("#div1_td").css("width", "22%");
            $("#div3_td").css("width", "22%");
        }
    }

    //if the result are showing resizes the charts
    if(DISPLAY.result.isShowing){
        DISPLAY.centralFrameWidth = document.getElementById("div2").offsetWidth;
        drawChartResult();
    }

    if (typeof callback === 'function'){
        callback();
    }
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

 /*function which returns whether this session is a (test/develop version) or a prod version */
 function IsThisAtest() {

    if(COUNTRY=="XX"){
        return true;
    }

    //verifies top level domain
    var hostName = window.location.hostname;
    var hostNameArray = hostName.split(".");
    var posOfTld = hostNameArray.length - 1;
    var tld = hostNameArray[posOfTld];
    if(tld=="work"){
        return true;
    }

    return false;
 }


//fade out lateral and top divs when mouse over central main div
$('#form_part1').on({
    mouseenter: function(){//when mouse pointer enters div
        if (CurrentFormPart==1){
                $('#description, #div1_td, #div3_td').clearQueue().fadeTo( "slow" , 0.2);
                scrollPage();
            }
        },
    mouseleave: function(){//when mouse pointer leaves div
            if (CurrentFormPart==1){
                $('#description, #div1_td, #div3_td').clearQueue().fadeTo( "slow" , 1);
            }
        }
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

//when user clicks on stats table on the right side of screen, it opens the corresponding PNG image file
$('#tbl_statistics').click(function(){
    var domain = window.location.hostname;
    var url2open = "http://" + domain + "/db_stats/tables/" + COUNTRY + ".jpg";
    window.open(url2open);
});

//Loader after the run button is clicked
function runButtonLoader() {
    $('#run_button, #run_button_noCapctha').addClass('button_loader').attr("value","");
}
//reset the run buttons, i.e., removes the loader of the button
function resetRunButtons() {
    $('#run_button, #run_button_noCapctha').removeClass('button_loader').attr("value", DISPLAY.RunButtonStr);
}

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

//detects old versions of Internet Explorer
function oldIE(){
    var div = document.createElement("div");
    div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
    var isIeLessThan9 = (div.getElementsByTagName("i").length == 1);
    if (isIeLessThan9) {
        document.getElementById("main_div").innerHTML = "Please update your browser!";
        alert("Please update your browser!");
    }
}