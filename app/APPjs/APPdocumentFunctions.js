/***** DOCUMENT JS FUNCTIONS *******/
/*====================================================*/
/*Functions which change the visual aspect of the page*/

function Run1(){

    //Runs the function and afterwards (callback), displays the charts
    Run2(displayCharts);
    
    //removes a links
    $('.result_div a').replaceWith(function() {
        return $.text([this]);
    });
    
    ResultIsShowing=true;
}

/*function that loads new HTML and that is run when country select is changed*/ 
function onCountrySelect() {
    
    showLoader();
    
    Country = this.options[this.selectedIndex].value;
    
    if (ResultIsShowing){
        reload();
    }
    init();
    
    //readjustes button
    $('#country_select-button').css("padding-bottom", "2px");
}

/*function that is run when the button Reload/Rerun is clicked*/
function reload() {

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
                    scrollPage(function(){
                            ResultIsShowing=false;
                        });
                });
        });
}


/*functions which is used to change the form parts*/
var hasLoadedPart = [false, false, false, false]; //global array variable for function openForm_part
var hasShownPart2 = false; var hasShownPart3 = false; //put to true when form part is FIRST shown
var CurrentFormPart; //global variable for the current Form Part

function openForm_part(part_number_origin, part_number_destiny) {
    
    //change from form part 1 to 2
    if (part_number_origin==1 && part_number_destiny==2){
        if (!is_userdata_formpart1_ok()){
            return;
        }
        else{
            shows_part(1, 2);
        }
    }
    
    //change from form part 2 to 3
    if (part_number_origin==2 && part_number_destiny==3){
        if (!is_userdata_formpart2_ok()){
            return;
        }
        else{
            shows_part(2, 3);        
        }
    }
    
    //change from form part 3 to 2
    if (part_number_origin==3 && part_number_destiny==2){
        shows_part(3, 2);
    }
    
    //change from form part 2 to 1
    if (part_number_origin==2 && part_number_destiny==1){
        shows_part(2, 1);
    }
    
    return;
}


//shows form part {d} coming from form part {o} hiding the remaining part
function shows_part(part_number_origin, part_number_destiny){

    //origin and destiny form parts
    var o=part_number_origin; 
    var d=part_number_destiny; 

    //gets jQuery variable for each form part
    var p1 = $("#form_part1");
    var p2 = $("#form_part2");
    var p3 = $("#form_part3");

    //clears any pending animations for all elements
    $("*").clearQueue();

    if (o==1 && d==2){           
        p1.slideUp("slow", function(){
            p2.slideDown("slow", function(){                                    
                        scrollPage();
                        CurrentFormPart = 2;
                    });
            });
    }
    else if(o==2 && d==3){
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
            p1.slideDown("slow", function(){                        
                scrollPage(function(){
                            CurrentFormPart = 1;
                        });
            });
        });                                
    }       
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


//sliders in form part 3
$(document).on("change", "#slider1", function () {
    slider_toggles_form3();
});

$(document).on("change", "#slider2", function () {
    slider_toggles_form3();
});

function showLoader() {
    $("#loader_div").css("display", "block");
    $("#main_div").css("display", "none");
}

function showLayout(){
    $("#loader_div").css("display", "none");
    $("#main_div").css("display", "block");
}

//test if array a contains obj
function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}