/******************* DOCUMENT JS FUNCTIONS *******************/
/*===========================================================*/
/*    General functions which are used overall on the page   */
/*************************************************************/


/*function that loads extra files and features, that are not loaded immediately after the page is opened
because such files and features are not needed on the initial page load, so that initial loading time can be reduced*/
function loadExtraFiles() {
    
    if (SWITCHES.print){
        getScriptOnce(JS_FILES.print);
    }

    if (SWITCHES.charts){        
        getScriptOnce(JS_FILES.chartjs);
        
        getScriptOnce(JS_FILES.drawCostsCharts, function() {           
            getScriptOnce(JS_FILES.printResults);
        });
    }
    else{
        getScriptOnce(JS_FILES.printResults);
    }

    if (SWITCHES.data_base){
        getScriptOnce(JS_FILES.dbFunctions);
    }

    //file JS_FILES.g_recaptcha is from this project and must always be loaded
    getScriptOnce(JS_FILES.g_recaptcha, function(){
        //Google Captcha API doesn't work nor applies on localhost
        if (SWITCHES.g_captcha && NOT_LOCALHOST){
            getScriptOnce(JS_FILES.Google.recaptchaAPI, function(){
                    SERVICE_AVAILABILITY.g_captcha = true;                    
                });
        }
        else{
            SERVICE_AVAILABILITY.g_captcha = false;
        }                 
     });
   

    if (SWITCHES.social){
        //Jquery social media share plugins
        getScriptOnce(JS_FILES.jssocials, function(){
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

    //uber
    if (SWITCHES.uber){
        if(COUNTRY!="XX"){//if not test version
            //gets asynchronously UBER information
            $.get(UBER_API_LOCAL_URL, function(data) {
                //alert(JSON.stringify(data, null, 4));
                if(data && !$.isEmptyObject(data)){
                    UBER_API =  data; //UBER_API is a global variable
                    console.log("uber data got from uber API: ", UBER_API);
                }
                else{
                    console.error("Error getting uber info");
                    SWITCHES.uber = false;
                }
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
        getScriptOnce(JS_FILES.PDF.generatePDF, function() {
            getScriptOnce(JS_FILES.PDF.pdfmake, function() {
                //path where the fonts for PDF are stored
                var pdf_fonts_path;
                if (COUNTRY == 'CN'){
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts_CN;
                }
                else if (COUNTRY == 'JP'){
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts_JP;
                }
                else if (COUNTRY == 'IN'){
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts_IN;
                }
                else{
                    pdf_fonts_path = JS_FILES.PDF.vfs_fonts;
                }
                getScriptOnce(pdf_fonts_path, function() {
                    $('#generate_PDF').prop('disabled', false).removeClass('buttton_disabled');
                });
            });
        });
    }
}


function getFuelEfficiencyOptStr(){
    switch(WORDS.fuel_efficiency_std_option){
        case 1:
            return "l/100km";            
        case 2:
            return "km/l";            
        case 3:
            return "mpg(imp)";
        case 4:
            return "mpg(US)";           
        case 5:
            return "l/mil";
        case 6:
            return "km/gal(US)";
        default: 
            return "error";
    }
}

function getDistanceOptStr(){
    switch(WORDS.distance_std_option){
        case 1:
            return "kilometres";            
        case 2:
            return "miles";            
        case 3:
            return "mil";
        default: 
            return "error";
    }
}

function getDistanceOptStrShort(){
    switch(WORDS.distance_std_option){
        case 1:
            return "km";            
        case 2:
            return "mi";            
        case 3:
            return "Mil";
        default: 
            return "error";
    }
}

function getFuelPriceVolumeOptStr(){
    switch(WORDS.fuel_price_volume_std){
        case 1:
            return "litres";            
        case 2:
            return "imperial gallons";            
        case 3:
            return "US gallons";
        default: 
            return "error";
    }
}

function isInteger(n) {
    return (parseFloat(n) == parseInt(n, 10));
}

function isNumber(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n));
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "&#160;");
    return parts.join(".");
}

//adjusts the size of select according to content
function resizeSelectToContent(jqueryId){
    var $this = $(jqueryId);
    var arrowWidth = 10;
    // create test element
    var text = $this.find("option:selected").text();
    var $test = $("<span>").html(text).css({
        "font-size": $this.css("font-size"), // ensures same size text
        "visibility": "hidden"               // prevents FOUC
    });
    // add to parent, get width, and get out
    $test.appendTo($this.parent());
    var width = $test.width();
    $test.remove();
    // set select width
    $this.width(width + arrowWidth);    
}

//rounds a number
function round(number, precision) {
  var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

/* Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 * @returns {String} */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}
