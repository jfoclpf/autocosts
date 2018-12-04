/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with Javascript Charts Functions */

//RUN RESULTS MODULE, IT IS A SUBMODULE OF RESULTS MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

autocosts.resultsModule = autocosts.resultsModule || {};
autocosts.resultsModule.runResultsModule = 
    (function(DOMForm, translatedStrings, switches, selectedCountry, booleans, mainObjs, servicesAvailabilityObj, userInfo){
    
    //modules dependencies
    var resultsModule, commonsModule, calculatorModule, userFormModule, transferDataModule, chartsModule, pdfModule, databaseModule;
    
    var calculatedData, runButton;   
    
    //ids in the HTML document
    var normalRunButtonId = "calculate_costs_btn"; 
    var captchaRunButtonId = "calculate_costs_btn_g_captcha"; 
    
    function initialize() {
        loadModuleDependencies(); 
        loadRunButtonHandler();
        recaptchaCallback();
    }
     
    function loadModuleDependencies(){
        resultsModule = autocosts.resultsModule;
        commonsModule = autocosts.commonsModule;
        calculatorModule = autocosts.calculatorModule;
        userFormModule = autocosts.userFormModule;       
        transferDataModule = autocosts.transferDataModule;
        chartsModule = switches.charts ? autocosts.resultsModule.chartsModule : {};
        pdfModule = (switches.pdf || switches.print) ? autocosts.resultsModule.pdfModule : {};
        databaseModule = switches.database ? autocosts.databaseModule : {};
    }
    
    function loadRunButtonHandler(){
        //run button
        $("#calculate_costs_btn").on( "click", function(){
            Run("normal");
        });        
    }       
        
    //Returns boolean whether to use or not Google Captcha
    function useGreCapctha(){            
        return !userInfo.isHumanConfirmed &&              //Do not use if human is already confirmed
               selectedCountry != 'XX' &&                 //Do not use if is test version
               servicesAvailabilityObj.googleCaptcha &&   //Do not use when service is not availble, i.e., when files were not loaded
               switches.googleCaptcha &&                  //Do not use when flag from server is not triggered
               booleans.notLocalhost;                     //Do not use when run for localhost
    }

    //The call of this function is defined in an URL declared in autocosts.paths.jsFiles.Google.recaptchaAPI (see main.js)
    //this function is called when the Google Captcha JS file is loaded and ready to be used
    function recaptchaCallback() {
        servicesAvailabilityObj.googleCaptcha = true;
        console.log("use Google ReCapctha!");

        if (useGreCapctha()){          
            runButton.set("show-g-recaptcha");

            grecaptcha.render( captchaRunButtonId, {
                    'sitekey' : '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
                    'callback' : recaptchaSolved
            });
        }
        else{
            runButton.set("show-normal");
        }
    }

    function recaptchaSolved(){
        console.log("recaptchaSolved()");
        Run("g-recaptcha");
    }

    //creates the grecaptcha after the API Google function was loaded
    //runs when grecaptcha was solved
    function Run(source){

        //if human is already confirmed by previous Google Captcha, doesn't request Google Captcha API again
        //In XX version or localhost doesn't use google captcha
        if(source === "g-recaptcha"){

            if(!runButton.isCaptcha()){
                throw 'Called Run() from source "g-recaptcha" and run button does not comply';
            }

            runButton.set("loading-g-recaptcha");

            //make a POST command to server to check if the user is human
            $.ajax({
                type: "POST",
                url: "captchaValidate",
                data: "&g-recaptcha-response=" + grecaptcha.getResponse()
            }).
            done(function(result){
                console.log("recaptcha-result: ", result);

                if(result == "ok"){
                    //Google Recaptcha
                    userInfo.isHumanConfirmed = true;                

                    if(calculateCostsAndShowResults() && selectedCountry != "XX"){
                        //if not a test triggers event for Google Analytics
                        if(!commonsModule.isThisAtest() && servicesAvailabilityObj.googleAnalytics && switches.googleAnalytics){
                            ga('send', 'event', 'form_part', 'run_OK');
                        }
                        //submits data to database if no XX version
                        if(switches.database){
                            databaseModule.submitResultsToDatabase();
                        }
                    }
                }

                //when the Google file was not accessible
                else {                
                    calculateCostsAndShowResults();                
                }

                runButton.set("show-normal");
            });
        }
        else if(source === "normal"){

            if(!runButton.isNormal()){
                throw 'Called Run() from source "normal" and run button does not comply';
            }        

            //here normally a human is already confirmed, for example when the same user runs the calculator twice
            if(calculateCostsAndShowResults() && 
               userInfo.isHumanConfirmed && 
               selectedCountry != "XX" && 
               switches.database && 
               booleans.notLocalhost){
                
                databaseModule.submitResultsToDatabase(); //submits data to database if no test version nor localhost
            }
            
            runButton.set("show-normal");
        }
        else{
            console.error("Bad paramter source on Run(source)");
        }
    }   
    
    //Submodule relating to Run Button, alternating between Normal button and Google Recaptcha button
    //see buttons html elements on file form.hbs, last lines
    runButton = (function(){

        var $btnNormal = $("#" + normalRunButtonId);
        var $btnCaptcha = $("#" + captchaRunButtonId);

        function set(flag){
            console.log("Run button set to: " + flag);
            switch(flag){
                case "show-g-recaptcha":                    
                    $btnCaptcha.show().attr("disabled", false);
                    $btnNormal.hide().attr("disabled", true);
                    break;
                case "show-normal":                    
                    $btnNormal.show().attr("disabled", false);
                    $btnCaptcha.hide().attr("disabled", true);
                    break;
                case "loading-g-recaptcha":
                    if(isCaptcha()){
                        $btnCaptcha.hide();
                    }
                    else{
                        throw 'Run Button set to "loading-g-recaptcha" but g-recaptcha is not active';
                    }
                    break;
                default:
                    throw "Bad paramter flag on runButton.set(flag), unknown 'flag': " + flag;
            }
        }

        function getButton(){
            checkSanity(); 

            if($btnNormal.is(":enabled") && $btnNormal.is(":visible")){
                return "normal";
            }
            if($btnCaptcha.is(":enabled") && $btnCaptcha.is(":visible")){
                return "g-recaptcha";
            }

            return "none"; //neither button is both enabled and visible; they may be both invisible
        }

        function isNormal(){
            return checkSanity() && $btnNormal.is(":visible");
        }

        function isCaptcha(){
            return checkSanity() && $btnCaptcha.is(":visible");
        }

        function checkSanity(){
            var errMsg = "runButton sanity between $btnNormal and $btnCaptcha"; 
            if($btnNormal.is(":disabled") && $btnCaptcha.is(":disabled")){
                throw errMsg;
            }
            if($btnNormal.is(":visible") && $btnCaptcha.is(":visible")){
                throw errMsg;
            }        
            return true;
        }
        
        return{
            set: set,
            getButton: getButton,
            isNormal: isNormal,
            isCaptcha: isCaptcha
        };
        
    })();     
    
    
    //function that is run when user clicks "run/calculate"
    function calculateCostsAndShowResults(){        
        
        var form, countryObj, flattenedData, chartsDrawnPromisesObj, promisesArray;

        //test if the form user inputs are correct
        if (!userFormModule.isReadyToCalc()){ 
            return false;
        } 
        
        $("#form").hide(); 

        //for each form part gets object with content
        form = transferDataModule.createUserFormObject(DOMForm);
        mainObjs.formData = form;

        //country object with country specific variables
        countryObj = {
            countryCode:            selectedCountry,
            currency:               translatedStrings.curr_code,
            distance_std:           translatedStrings.distance_std_option,
            speed_std:              translatedStrings.std_dist + "/h",
            fuel_efficiency_std:    translatedStrings.fuel_efficiency_std_option,
            fuel_price_volume_std:  translatedStrings.fuel_price_volume_std,
            taxi_price:             translatedStrings.taxi_price_per_dist
        };

        //calculate costs, "costs" is a global variable/object defined in calculatorModule.js
        calculatedData = calculatorModule.calculateCosts(form, countryObj); 

        //get Uber data if applicable
        if(switches.uber && calculatedData.publicTransports.calculated){
            calculatedData.uber = calculatorModule.calculateUberCosts(mainObjs.uberApiObj); 
        } 

        resultsModule.setCalculatedData(calculatedData);
        mainObjs.calculatedData = calculatedData; //assigns to global variable
        //console.log(JSON.stringify(calculatedData, null, 4));          

        //from complex object with hierarchies, flattens to simple object
        //see for more info: https://github.com/hughsk/flat
        flattenedData = flatten(calculatedData, {delimiter:"_"});         
        //it needs to show also 1/2 of Maintenance Costs
        flattenedData.costs_perMonth_items_halfOfMaintenance = flattenedData.costs_perMonth_items_maintenance / 2;
        //console.log(flattenedData); 
        resultsModule.setCalculatedDataToHTML(flattenedData);        
        
        chartsDrawnPromisesObj = chartsModule.initialize(calculatedData);        

        //The first three boxes on the top
        //if financial effort was not calculated, does not show doughnut chart
        //on the third box, and adapt the three boxes css classes
        if(calculatedData.financialEffort.calculated && switches.charts){ 
            chartsModule.drawDoughnutFinancialEffort(calculatedData);
            //shows third box where the financial effort doughnut chart appears
            $("#results #info-boxes .info-box.box-3").show();
            $("#results #info-boxes .info-box").removeClass("two-boxes").addClass("three-boxes");
        }
        else{
            //hides third box where the financial effort doughnut chart appears
            $("#results #info-boxes .info-box.box-3").hide();
            $("#results #info-boxes .info-box").removeClass("three-boxes").addClass("two-boxes");       
        }                

        resultsModule.setPeriodicCosts(calculatedData, "month");
        resultsModule.setPeriodicCostsDetails(form, calculatedData); //the details on the dropdown boxes                         

        //switches are frozen/const object in main.js, so no need to show elements when switches.charts is true
        //since these elements are set tp be shown in css by default, just need to hide in case is false
        if(switches.charts){            
            chartsModule.drawCostsBars("month");
            chartsModule.drawCostsDoughnut("month");
        }
        else {
            $("#results .costs-doughnut-chart, #results .costs-bars-chart-stats, #results .stats-references").hide();             
        }

        //Financial Effort 
        if(calculatedData.financialEffort.calculated){            
            resultsModule.setFinancialEffortDetails(form, calculatedData);

            //shows financial effort section 
            $("#results #financial-effort").show();

            if(switches.charts){                
                chartsModule.drawFinancialEffort(calculatedData);
            }
            else{
                $("#financial-effort .graph").hide();
                $("#financial-effort .values.box").css("width", "40%").css("float", "none");
            }
        }
        else {
            //hides financial effort section
            $("#results #financial-effort").hide();
        } 

        //Equivalent transport costs
        if(calculatedData.publicTransports.calculated){            
            resultsModule.setEquivTransportCostsDetails(form, calculatedData);                

            $("#results #equivalent-transport-costs").show();

            if(switches.charts){
                chartsModule.drawAlternativesToCar();
            }
            else{
                $("#equivalent-transport-costs .graph").hide();
                $("#equivalent-transport-costs .values.box").css("margin", "auto 2%").css("float", "none");            
            }
        }
        else {
            $("#results #equivalent-transport-costs").hide();
        } 

        resultsModule.setClassAccordionHandler();

        $("#results").show();

        $("*").promise().done(function(){ 
            //it needs these promises, since the pdfMake body can only be generated when the charts are alredy fully drawn
            //such that, the pdf generation can extract the charts to base64 images
            promisesArray = Object.keys(chartsDrawnPromisesObj).map(function(key) {
                return chartsDrawnPromisesObj[key];
            });
             promisesArray.push($("*").promise());
            $.when.apply($, promisesArray).done(function () {              
                pdfModule.generatePDF(calculatedData);             
            }); 
        }); 
        
        return true;
    }    
    
    //flatten object, that is, from an Object composed by elements in a Object's tree, returns simple list Object
    //i.e., from complex object with hierarchies, flattens to simple list Object
    function flatten(target, opts) {
        opts = opts || {};

        var delimiter = opts.delimiter || '.';
        var maxDepth = opts.maxDepth;
        var output = {};

        function step(object, prev, currentDepth) {
            currentDepth = currentDepth || 1;
            Object.keys(object).forEach(function (key) {
                var value = object[key];
                var isarray = opts.safe && Array.isArray(value);
                var type = Object.prototype.toString.call(value);
                var isbuffer = isBuffer(value);
                var isobject = (type === '[object Object]' || type === '[object Array]');

                var newKey = prev ? prev + delimiter + key : key;

                if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
                    (!opts.maxDepth || currentDepth < maxDepth)) {

                    return step(value, newKey, currentDepth + 1);
                }

                output[newKey] = value;
            });
        }

        function isBuffer (obj) {
            return obj != null && obj.constructor != null &&
                   typeof obj.constructor.isBuffer === 'function' && 
                   obj.constructor.isBuffer(obj);
        }    

        step(target);

        return output;
    }    
    
    return{
        initialize: initialize
    };
    
})(document.costs_form,
   autocosts.serverInfo.translatedStrings,
   autocosts.serverInfo.switches,
   autocosts.serverInfo.selectedCountry,
   autocosts.serverInfo.booleans,
   autocosts.main,
   autocosts.servicesAvailabilityObj,
   autocosts.userInfo);

