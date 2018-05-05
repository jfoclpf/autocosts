/************* DOCUMENT JS FUNCTIONS ******************/
/*====================================================*/
/*         Functions which work on the page           */

/*function that loads extra files and features, that are not loaded imediately after the page is opened
because such files and features are not needed on the initial page load, so that initial loading time can be reduced*/
function loadExtraFiles() {
    
    //loads second part of CSS files (not critical thus can be deferred)
    loadStyleSheets(['css/merged-min/merged2.css']);
    
    getScriptOnce(JS_FILES.conversionFunctions);    
    getScriptOnce(JS_FILES.getData);

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


function isInteger(n) {
    return (parseFloat(n) == parseInt(n, 10));
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "&#160;");
    return parts.join(".");
}
