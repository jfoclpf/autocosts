/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* SHOW CALCULATED RESULTS MODULE */
/* Module with functions that are used to print the final result */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules */

autocosts.resultsModule = (function(thisModule, translatedStrings, serverInfo, uberApiObj, fullUrl){           
        
    //modules dependencies
    var chartsModule, pdfModule, calculatorModule, userFormModule, transferDataModule, initializeModule; 
    
    var calculatedData;
    
    function initialize(){    
        loadModuleDependencies();
        loadResultsSettingsAndHandlers();
    }
    
    function loadModuleDependencies(){
        calculatorModule = autocosts.calculatorModule;
        userFormModule = autocosts.userFormModule;
        transferDataModule = autocosts.transferDataModule;
        initializeModule = autocosts.initializeModule; 
        chartsModule = serverInfo.switches.charts ? autocosts.resultsModule.chartsModule : {};
        pdfModule = serverInfo.switches.pdf ? autocosts.resultsModule.pdfModule : {};        
    }
    
    function getCostsColors(){
        return {
            depreciation:        '#2ba3d6',
            insurance:           '#10c6e6',
            credit:              '#5ae0e2',
            inspection:          '#99e6bc',
            roadTaxes:           '#ffda70',
            fuel:                '#ff9e84',
            maintenance:         '#ff7192',
            repairsImprovements: '#e562aa',
            parking:             '#ea90cd',
            tolls:               '#eabcef',
            fines:               '#9f97ef',
            washing:             '#867ae3'
        };        
    }    
    
    function loadResultsSettingsAndHandlers(){                        

        $("#results #totalCostsPeriod").on("change", function(){
            setPeriodicCosts(calculatedData, $(this).val());
            chartsModule.drawCostsBars($(this).val());
            chartsModule.drawCostsDoughnut($(this).val());
        });

        if(serverInfo.switches.pdf){
            $("#results .button-pdf").show().addClass("disabled");
            //download pdf button handler
            $("#results .button-pdf").on( "click", function(){
                console.log("Download pdf clicked");
                pdfModule.download();
            });
        }
        else{
            $("#results .button-pdf").hide();
        }

        if(serverInfo.switches.pdf && serverInfo.switches.print){
            $("#results .button-print").show().addClass("disabled");
            $("#results .button-print").on( "click", function(){
                console.log("Print button clicked");
                pdfModule.print();
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

        if (serverInfo.switches.social /*&& !isThisAtest()*/){
            $(".right-actions .facebook a, .right-actions-mobile .facebook a").
                attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(fullUrl)).attr("target", "_blank");
            $(".right-actions .twitter a,  .right-actions-mobile .twitter a").
                attr("href", "https://twitter.com/share?url=" + encodeURI(fullUrl)).attr("target", "_blank");
            $(".right-actions .linkedin a, .right-actions-mobile .linkedin a").
                attr("href", "https://www.linkedin.com/shareArticle?url=" + encodeURI(fullUrl)).attr("target", "_blank");
            $(".right-actions .whatsapp a, .right-actions-mobile .whatsapp a").
                attr("href", "https://wa.me/?text=" + encodeURI(fullUrl)).attr("target", "_blank");        
        }
        else{
            $(".right-actions, .right-actions-mobile").hide();
        }
    }        
    
    //function that is run when user clicks "run/calculate"
    function calculateCostsAndShowResults(){        
        
        var form, countryObj, flattenedData, chartsDrawnPromisesObj, promisesArray;

        //test if the form user inputs are correct
        if (!userFormModule.isReadyToCalc()){ 
            return false;
        } 
        
        $("#form").hide(); 

        //for each form part gets object with content
        form = transferDataModule.fromUserFormToCalculator(document.costs_form);
        autocosts.main.formData = form;

        //country object with country specific variables
        countryObj = {
            countryCode:            serverInfo.selectedCountry,
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
        if(serverInfo.switches.uber && calculatedData.publicTransports.calculated){
            calculatedData.uber = calculatorModule.calculateUberCosts(uberApiObj); 
        } 

        autocosts.main.calculatedData = calculatedData; //assigns to global variable
        //console.log(JSON.stringify(calculatedData, null, 4));          

        //from complex object with hierarchies, flattens to simple object
        //see for more info: https://github.com/hughsk/flat
        flattenedData = flatten(calculatedData, {delimiter:"_"});         
        //it needs to show also 1/2 of Maintenance Costs
        flattenedData.costs_perMonth_items_halfOfMaintenance = flattenedData.costs_perMonth_items_maintenance / 2;
        //console.log(flattenedData); 
        setCalculatedDataToHTML(flattenedData);        
        
        chartsDrawnPromisesObj = chartsModule.initialize(calculatedData);        

        //The first three boxes on the top
        //if financial effort was not calculated, does not show doughnut chart
        //on the third box, and adapt the three boxes css classes
        if(calculatedData.financialEffort.calculated && serverInfo.switches.charts){ 
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

        setPeriodicCosts(calculatedData, "month");
        setPeriodicCostsDetails(form, calculatedData); //the details on the dropdown boxes                         

        //serverInfo.switches are frozen/const object in main.js, so no need to show elements when serverInfo.switches.charts is true
        //since these elements are set tp be shown in css by default, just need to hide in case is false
        if(serverInfo.switches.charts){            
            chartsModule.drawCostsBars("month");
            chartsModule.drawCostsDoughnut("month");
        }
        else {
            $("#results .costs-doughnut-chart, #results .costs-bars-chart-stats, #results .stats-references").hide();             
        }

        //Financial Effort 
        if(calculatedData.financialEffort.calculated){            
            setFinancialEffortDetails(form, calculatedData);

            //shows financial effort section 
            $("#results #financial-effort").show();

            if(serverInfo.switches.charts){                
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
            setEquivTransportCostsDetails(form, calculatedData);                

            $("#results #equivalent-transport-costs").show();

            if(serverInfo.switches.charts){
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

        setClassAccordionHandler();

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

    //scans all flattened calculatedDat and assigns each result value to respective HTML class element  
    function setCalculatedDataToHTML(flattenedData){

        for (var key in flattenedData){
            var $i = $("#results ." + key);  
            //check that the element with that class exists in the html page
            //and that the element is valid in the array of calculated data
            if(flattenedData.hasOwnProperty(key) && $i.length){

                if(typeof flattenedData[key] === "number" && !isNaN(flattenedData[key])){
                    //organising text or adding extra text according to classes: toFixedN, currency, hours, distance, percentage
                    toFixedN = getToFixedNumFromClasses($i); 
                    
                    amount = flattenedData[key].toFixed(toFixedN);

                    if($i.hasClass("currency")){
                        numToShow = currencyShow(amount);
                    }
                    else if($i.hasClass("hours")){
                        numToShow = amount + " " + translatedStrings.hour_abbr; 
                    }
                    else if($i.hasClass("distance")){
                        numToShow = amount + " " + initializeModule.getStringFor("distance"); 
                    }
                    else if($i.hasClass("percentage")){
                        numToShow = amount + "&#37;"; //percentage symbol 
                    }                
                    else{
                        numToShow = amount;
                    }

                    $i.html(numToShow);
                    }
                else{
                    $i.hide();
                }
            }
        }
    }

    //The first section of results page, showing the monthly/trimester/semester/yearly costs
    function setPeriodicCosts(calculatedData, period){

        var numMonths, strPeriod;
        var currSymb = translatedStrings.curr_symbol;

        switch(period){
            case "month" :
                numMonths = 1;
                strPeriod = translatedStrings.month;
                break;
            case "trimester" :
                numMonths = 3;
                strPeriod = translatedStrings.trimester;
                break;
            case "semester" :
                numMonths = 6;
                strPeriod = translatedStrings.semester;
                break;
            case "year" :
                numMonths = 12;
                strPeriod = translatedStrings.year;
                break;
            default:
                console.error("Period not valid " + period);
        }

        //sets the dropdown meny
        $('#results #totalCostsPeriod').val(period);

        //main info box total costs    
        $("#results #info-boxes .total_costs_per_period").html((calculatedData.costs.perMonth.total * numMonths).toFixed(0));

        //section h2 title
        $("#results #avg-periodic-cost .costs_per_type").html(translatedStrings.costs + " " + translatedStrings.word_per + strPeriod);

        var $htmlEl = $("#results #avg-periodic-cost .three-boxes");

        $htmlEl.find(".average_costs_per_type").html(translatedStrings.word_per + strPeriod);

        //sets the periodic costs according to period on span elements with class starting with "periodic_costs"
        $htmlEl.find("span").each(function(){
            var classNames = $(this).attr("class");
            //check if there is any class that contains expression "periodic_costs"
            if (classNames && classNames.indexOf("periodic_costs") >= 0){
                var classesArr = classNames.split(" ");
                for (var i=0; i<classesArr.length; i++){
                    var className, costItem, val;
                    if (classesArr[i].indexOf("periodic_costs") >= 0){
                        className = classesArr[i];
                        costItem = className.replace("periodic_costs_", "");
                        val = calculatedData.costs.perMonth.items[costItem] * numMonths;
                        $(this).html(currSymb + " " + val.toFixed(1));
                    }
                }
            }

        });

        //extra items
        $htmlEl.find(".periodic_costs_halfOfMaintenance").html(currSymb + " " + (calculatedData.costs.perMonth.items.maintenance/2*numMonths).toFixed(1));

        $htmlEl.find(".periodic_costs_total_standing_costs").html(currSymb + " " + (calculatedData.costs.perMonth.standingCosts * numMonths).toFixed(2));
        $htmlEl.find(".periodic_costs_total_running_costs").html(currSymb + " " + (calculatedData.costs.perMonth.runningCosts * numMonths).toFixed(2));
        $htmlEl.find(".periodic_costs_total_costs").html(currSymb + " " + (calculatedData.costs.perMonth.total * numMonths).toFixed(2));

    }

    function setPeriodicCostsDetails(form, calculatedData){

        //html element in which the costs details will be added 
        var htmlEl = "#results #avg-periodic-cost .three-boxes";

        var errMsg = "Error setting Periodic Costs details on results";

        //remove existing <ul> if they exist, to add new ones
        $(htmlEl + " ul").remove();

        //add Cost <ul> for each cost details, for example add <ul> to div with class "fuel_details"
        for (var cost in calculatedData.costs.perMonth.items) {
            if (!calculatedData.costs.perMonth.items.hasOwnProperty(cost)) {
                continue;
            }

            if($(htmlEl + " ." + cost + "_details").length){            
                $(htmlEl + " ." + cost + "_details").append($("<ul>"));
            }
        }

        var addLiElm = function(costItem, text, text2){
            var $item = $(htmlEl + " ." + costItem + "_details ul");
            if(typeof text2 === 'undefined' || text2 === null){
                $item.append($("<li>").text(text));
            }
            else{
                $item.append($("<li>").text(text + ": " + text2));
            }    
        };

        //Depreciation
        if (calculatedData.details.ageOfCarInMonths === 0) {
            addLiElm("depreciation", translatedStrings.error_depreciation_new_car);
        } 
        else {        
            addLiElm("depreciation", translatedStrings.aq_value, currencyShow(form.depreciation.acquisitionCost));
            addLiElm("depreciation", translatedStrings.final_value, currencyShow(form.depreciation.presentValue));
            addLiElm("depreciation", translatedStrings.period_own, calculatedData.details.ageOfCarInMonths + " " + translatedStrings.months);
            addLiElm("depreciation", "(" + currencyShow(form.depreciation.acquisitionCost) + "-" + currencyShow(form.depreciation.presentValue) + ")/" +
                                     calculatedData.details.ageOfCarInMonths + " " + translatedStrings.months);
        }

        //Insurance
        switch(form.insurance.period){
            case "mensal":
                addLiElm("insurance", form.insurance.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                      translatedStrings.word_per + " " + translatedStrings.month);
                break;
            case "trimestral":
                addLiElm("insurance", form.insurance.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                      translatedStrings.word_per + " " + translatedStrings.trimester);
                break;
            case "semestral":
                addLiElm("insurance", form.insurance.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                      translatedStrings.word_per + " " + translatedStrings.semester);
                break;
            case "anual":
                addLiElm("insurance", form.insurance.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                      translatedStrings.word_per + " " + translatedStrings.year);
                break;
            default:
                throw errMsg;
        }

        //Credit interests
        if(form.credit.creditBool == "true") {

            addLiElm("credit", translatedStrings.credit_loan2, currencyShow(form.credit.yesCredit.borrowedAmount));
            addLiElm("credit", translatedStrings.credit_period, form.credit.yesCredit.numberInstallments + " " + translatedStrings.months);
            addLiElm("credit", translatedStrings.credit_instalment, currencyShow(form.credit.yesCredit.amountInstallment));
            addLiElm("credit", translatedStrings.credit_residual_value1, currencyShow(form.credit.yesCredit.residualValue));

            addLiElm("credit", translatedStrings.credit_total_interests, currencyShow(calculatedData.details.credit.totalPaidInInterests)); 
            addLiElm("credit", "(" + calculatedData.details.credit.numberOfMonthlyInstalments + "*" + form.credit.yesCredit.amountInstallment + ")+" + 
                               form.credit_residual_value + "-" + form.credit.yesCredit.borrowedAmount);

            if(calculatedData.age_months >= calculatedData.details.credit.numberOfMonthlyInstalments){
                addLiElm("credit", translatedStrings.credit_interests_month + ": " +
                                   currencyShow(calculatedData.costs.perMonth.items.credit.toFixed(2)));
            }        
        }

        //Inspection
        if (form.inspection.numberOfInspections !== 0){        
            addLiElm("inspection", form.inspection.numberOfInspections + " " + translatedStrings.times_costing + " " + form.inspection.averageInspectionCost + 
                                   " " + translatedStrings.curr_name_plural + " " + translatedStrings.each_one_during + " " + 
                                   calculatedData.details.ageOfCarInMonths + " " + translatedStrings.months);
        }

        //Taxes
        addLiElm("roadTaxes", 
                 form.roadTaxes.amountPerYear + " " + translatedStrings.curr_name_plural + " " + translatedStrings.word_per + " " + translatedStrings.year);

        //Fuel    
        switch(form.fuel.typeOfCalculation){
            case "km":
                if (form.fuel.distanceBased.considerCarToJob == "false"){
                    switch(form.fuel.distanceBased.noCarToJob.period)
                    {
                        case "1":
                            addLiElm("fuel", 
                                     form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                     translatedStrings.std_dist + " " + translatedStrings.word_per + " " + translatedStrings.month);
                            break;
                        case "2":
                            addLiElm("fuel", 
                                     form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                     translatedStrings.dist_each_two_months);
                            break;
                        case "3":
                            addLiElm("fuel", 
                                     form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                     translatedStrings.std_dist + " " + translatedStrings.word_per + " " + translatedStrings.trimester);
                            break;
                        case "4":
                            addLiElm("fuel", 
                                     form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                     translatedStrings.std_dist + " " + translatedStrings.word_per + " " + translatedStrings.semester);
                            break;
                        case "5":
                            addLiElm("fuel", 
                                     form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                     translatedStrings.std_dist + " " + translatedStrings.word_per + " " + translatedStrings.year);
                            break;
                        default:
                            throw errMsg;                        
                    }
                    addLiElm("fuel",
                             translatedStrings.fuel_car_eff, form.fuel.distanceBased.fuelEfficiency + " " + translatedStrings.std_fuel_calc);
                    addLiElm("fuel",
                             translatedStrings.fuel_price1, currencyShow(form.fuel.distanceBased.fuelPrice) + "/" + translatedStrings.std_volume_short);
                }
                else{
                    addLiElm("fuel", 
                             form.fuel.distanceBased.carToJob.daysPerWeek + " " + translatedStrings.fuel_job_calc1);
                    addLiElm("fuel", 
                             translatedStrings.you_drive + " " + form.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob + " " +
                             translatedStrings.fuel_dist_home_job1);
                    addLiElm("fuel", 
                             translatedStrings.you_drive + " " + form.fuel.distanceBased.carToJob.distanceDuringWeekends + " " +
                             translatedStrings.fuel_dist_no_job1);
                    addLiElm("fuel", 
                             translatedStrings.you_drive_tottaly_avg + " " + calculatedData.drivingDistance.perMonth.toFixed(1) + " " + 
                             translatedStrings.std_dist + " " + translatedStrings.word_per + " " + translatedStrings.month + 
                             " (~30.5 " + translatedStrings.days + ")");
                    addLiElm("fuel", 
                             translatedStrings.fuel_car_eff, form.fuel.distanceBased.fuelEfficiency + " " + translatedStrings.std_fuel_calc);
                    addLiElm("fuel", 
                             translatedStrings.fuel_price, currencyShow(form.fuel.distanceBased.fuelPrice) + "/" + translatedStrings.std_volume_short);
                }
                break;

            case "euros":
                switch(form.fuel.currencyBased.period)
                {
                    case "1":
                        addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                 translatedStrings.word_per + " " + translatedStrings.month);
                        break;
                    case "2":
                        addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + translatedStrings.dist_each_two_months);
                        break;
                    case "3":
                        addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                 translatedStrings.word_per + " " + translatedStrings.trimester);
                        break;
                    case "4":
                        addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                 translatedStrings.word_per + " " + translatedStrings.semester);
                        break;
                    case "5":
                        addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                 translatedStrings.word_per + " " + translatedStrings.year);
                        break;
                    default:
                        throw errMsg;                        
                }
                break;
        }

        //Maintenance    
        addLiElm("maintenance", 
                 form.maintenance.amountPerYear + " " + translatedStrings.curr_name_plural + " " + 
                 translatedStrings.word_per + " " + translatedStrings.year);

        //Repairs
        addLiElm("repairsImprovements", 
                 form.repairsImprovements.amountPerYear + " " + translatedStrings.curr_name_plural + " " + 
                 translatedStrings.word_per + " " + translatedStrings.year);

        //Tolls
        if(form.tolls.calculationBasedOnDay == "false") {
            switch(form.tolls.noBasedOnDay.period) {
                case "1":
                    addLiElm("tolls", 
                             form.tolls.noBasedOnDay.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                             translatedStrings.word_per + " " + translatedStrings.month);
                    break;
                case "2":
                    addLiElm("tolls", form.tolls.noBasedOnDay.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                                      translatedStrings.words_per_each + " " + translatedStrings.two_months);
                    break;
                case "3":
                    addLiElm("tolls", 
                             form.tolls.noBasedOnDay.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                             translatedStrings.word_per + " " + translatedStrings.trimester);
                    break;
                case "4":
                    addLiElm("tolls", 
                             form.tolls.noBasedOnDay.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                             translatedStrings.word_per + " " + translatedStrings.semester);
                    break;
                case "5":
                    addLiElm("tolls", 
                             form.tolls.noBasedOnDay.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                             translatedStrings.word_per + " " + translatedStrings.year);
                    break;
                default:
                    throw errMsg;                
            }
        }
        else{
            addLiElm("tolls", form.tolls.yesBasedOnDay.amountPerDay + " " + translatedStrings.curr_name_plural + " " + 
                              translatedStrings.during + " " + form.tolls.yesBasedOnDay.daysPerMonth + " " + translatedStrings.days + " " + 
                              translatedStrings.word_per + " " + translatedStrings.month);
        } 

        //Fines
        switch(form.fines.period) {
            case "1":
                addLiElm("fines", 
                         form.fines.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.month);
                break;
            case "2":
                addLiElm("fines", 
                         form.fines.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.words_per_each + " " + translatedStrings.two_months);
                break;
            case "3":
                addLiElm("fines", 
                         form.fines.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.trimester);
                break;
            case "4":
                addLiElm("fines", 
                         form.fines.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.semester);
                break;
            case "5":
                addLiElm("fines", 
                         form.fines.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.year);
                break;
            default:
                throw errMsg;            
            }

        //Washing    
        switch(form.washing.period) {
            case "1":
                addLiElm("washing", 
                         form.washing.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.month);
                break;
            case "2":
                addLiElm("washing", 
                         form.washing.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.words_per_each + " " + translatedStrings.two_months);
                break;
            case "3":
                addLiElm("washing", 
                         form.washing.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.trimester);
                break;
            case "4":
                addLiElm("washing", 
                         form.washing.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.semester);
                break;
            case "5":
                addLiElm("washing", 
                         form.washing.amountPerPeriod + " " + translatedStrings.curr_name_plural + " " + 
                         translatedStrings.word_per + " " + translatedStrings.year);
                break;
            default:
                throw errMsg;            
            }    
    }

    function setFinancialEffortDetails(form, calculatedData){

        //html element in which the costs details will be added 
        var htmlEl = "#results #financial-effort .values"; 

        var errMsg = "Error setting Financial Costs details on results";

        //remove existing <ul> if they exist, to add new ones
        $(htmlEl + " ul").remove();

        //add <ul> for each item details in financial effort
        if(!$(htmlEl + " .panel ul").length){
            $(htmlEl + " .panel").append($("<ul>"));
        }

        var addLiElm = function(item, text, text2){
            var $item = $(htmlEl + " ." + item + "_details ul");
            if(typeof text2 === 'undefined' || text2 === null){
                $item.append($("<li>").text(text));
            }
            else{
                $item.append($("<li>").text(text + ": " + text2));
            }
        };

        //income
        var income = calculatedData.financialEffort.income;    
        switch(form.income.incomePeriod){
            case 'year':
                addLiElm("income", 
                         translatedStrings.net_income_per + " " + translatedStrings.year, 
                         currencyShow(form.income.year.amount));
                addLiElm("income", 
                         translatedStrings.average_net_income_per + " " + translatedStrings.month, 
                         currencyShow(income.averagePerMonth.toFixed(1)));
                break;

            case 'month':
                addLiElm("income", 
                         translatedStrings.net_income_per + " " + translatedStrings.month, 
                         currencyShow(form.income.month.amountPerMonth));
                addLiElm("income", 
                         translatedStrings.number_of_months, 
                         form.income.month.monthsPerYear);
                addLiElm("income", 
                         translatedStrings.average_net_income_per + " " + translatedStrings.month, 
                         currencyShow(income.averagePerMonth.toFixed(1)));
                addLiElm("income", 
                         translatedStrings.average_net_income_per + " " + translatedStrings.year, 
                         currencyShow(income.perYear.toFixed(1)));            
                break;

            case 'week':
                addLiElm("income", translatedStrings.net_income_per + " " + translatedStrings.week, currencyShow(form.income.week.amountPerWeek));
                addLiElm("income", translatedStrings.number_of_weeks, form.income.week.weeksPerYear);
                addLiElm("income", translatedStrings.average_net_income_per + " " + translatedStrings.month, currencyShow(income.averagePerMonth.toFixed(1)));
                addLiElm("income", translatedStrings.average_net_income_per + " " + translatedStrings.year, currencyShow(income.perYear.toFixed(1)));            
                break;

            case 'hour':
                addLiElm("income", translatedStrings.net_income_per + " " + translatedStrings.hour, currencyShow(form.income.hour.amountPerHour));
                addLiElm("income", translatedStrings.number_of_hours, form.income.hour.hoursPerWeek + " " + translatedStrings.hour_abbr);
                addLiElm("income", translatedStrings.number_of_weeks, form.income.hour.weeksPerYear);
                addLiElm("income", translatedStrings.average_net_income_per + " " + translatedStrings.month, currencyShow(income.averagePerMonth.toFixed(1)));
                addLiElm("income", translatedStrings.average_net_income_per + " " + translatedStrings.year, currencyShow(income.perYear.toFixed(1)));                     
                break;
            default:
                throw errMsg;
        }

        //working time
        var wt = calculatedData.financialEffort.workingTime;
        if(form.income.incomePeriod != 'hour'){
            if(form.workingTime.isActivated == 'true'){

                addLiElm("working_time", 
                         translatedStrings.hours_per + " " + translatedStrings.week, 
                         wt.hoursPerWeek + " " + translatedStrings.hour_abbr);
                addLiElm("working_time", 
                         translatedStrings.months_per + " " + translatedStrings.year, 
                         wt.monthsPerYear);
                addLiElm("working_time", 
                         translatedStrings.average_working_hours_per + " " + translatedStrings.month, 
                         wt.hoursPerMonth.toFixed(1) + " " + translatedStrings.hour_abbr);
                addLiElm("working_time", 
                         translatedStrings.working_hours_per + " " + translatedStrings.year, 
                         wt.hoursPerYear.toFixed(1) + " " + translatedStrings.hour_abbr);            
            }
            else{
                addLiElm("working_time",  translatedStrings.working_time_message);            
            }
        }
        addLiElm("working_time", translatedStrings.average_net_income_per + " " + translatedStrings.hour, currencyShow(income.averagePerHour.toFixed(1)));    

        //distance 
        var dd = calculatedData.drivingDistance;
        if((form.fuel.typeOfCalculation != 'km' && form.distance.considerCarToJob == 'true') || 
           (form.fuel.typeOfCalculation != 'km' && form.fuel.distanceBased.considerCarToJob == 'true')){

            addLiElm("distance", 
                     translatedStrings.dist_home_job, parseInt(form.distance.carToJob.distanceBetweenHomeAndJob).toFixed(1) + " " + translatedStrings.std_dist);
            addLiElm("distance", 
                     translatedStrings.days_drive_job, form.distance.carToJob.daysPerWeek + " " + translatedStrings.days);
            addLiElm("distance", 
                     translatedStrings.dist_jorney_weekend, parseInt(form.distance.carToJob.distanceDuringWeekends).toFixed(1) + " " + translatedStrings.std_dist);
            addLiElm("distance", 
                     translatedStrings.average_dist_per_week, dd.perWeek.toFixed(1) + " " + translatedStrings.std_dist);                
        }

        addLiElm("distance", translatedStrings.you_drive_per + " " + translatedStrings.month, dd.perMonth.toFixed(1) + " " + translatedStrings.std_dist);
        addLiElm("distance", translatedStrings.you_drive_per + " " + translatedStrings.year, dd.perYear.toFixed(1) + " " + translatedStrings.std_dist);             

        //time spent in driving
        var tsd = calculatedData.timeSpentInDriving;
        if(form.distance.considerCarToJob == 'true' || form.fuel.distanceBased.considerCarToJob == 'true'){
            addLiElm("time_spent_in_driving", 
                     translatedStrings.minutes_home_job, form.timeSpentInDriving.option1.minutesBetweenHomeAndJob + " " + translatedStrings.min);
            addLiElm("time_spent_in_driving", 
                     translatedStrings.days_drive_to_job, form.distance.carToJob.daysPerWeek + " " + translatedStrings.days);
            addLiElm("time_spent_in_driving", 
                     translatedStrings.time_drive_weekend, form.timeSpentInDriving.option1.minutesDuringWeekend + " " + translatedStrings.min);
            addLiElm("time_spent_in_driving", 
                     translatedStrings.minutes_drive_per + " " + translatedStrings.week, tsd.minutesPerWeek + " " + translatedStrings.min);        
        }
        else{
            addLiElm("time_spent_in_driving", 
                     translatedStrings.minutes_drive_per + " " + translatedStrings.day,  
                     form.timeSpentInDriving.option2.minutesPerDay + " " + translatedStrings.min);
            addLiElm("time_spent_in_driving", 
                     translatedStrings.days_drive_per_month, 
                     form.timeSpentInDriving.option2.daysPerMonth + " " + translatedStrings.days);
        }

        addLiElm("time_spent_in_driving", 
                 translatedStrings.hours_drive_per + " " + translatedStrings.month, 
                 tsd.hoursPerMonth.toFixed(1) + " " + translatedStrings.hour_abbr);
        
        addLiElm("time_spent_in_driving", 
                 translatedStrings.hours_drive_per + " " + translatedStrings.year,  
                 tsd.hoursPerYear.toFixed(1) + " " + translatedStrings.hour_abbr);   

        //financial effort
        var fe = calculatedData.financialEffort;    
        addLiElm("financial_effort", translatedStrings.total_costs_per_year, currencyShow(fe.totalCarCostsPerYear.toFixed(1)));
        addLiElm("financial_effort", translatedStrings.hours_to_afford_car,  fe.workingHoursPerYearToAffordCar.toFixed(1) + " " + translatedStrings.hour_abbr);
        addLiElm("financial_effort", translatedStrings.months_to_afford_car, fe.workingMonthsPerYearToAffordCar.toFixed(2));
        addLiElm("financial_effort", translatedStrings.days_car_paid,        Math.ceil(fe.daysForCarToBePaid) + " " + translatedStrings.days);

        //speeds
        var speeds = calculatedData.speeds; 
        addLiElm("financial_effort", 
                 translatedStrings.aver_yearly + " " + translatedStrings.kinetic_speed, 
                 speeds.averageKineticSpeed.toFixed(1) + " " + translatedStrings.std_dist+"/h");
        addLiElm("financial_effort", 
                 translatedStrings.aver_yearly + translatedStrings.virtual_speed, 
                 speeds.averageConsumerSpeed.toFixed(1) + " " + translatedStrings.std_dist+"/h");    
    }

    function setEquivTransportCostsDetails(form, calculatedData){        

        //html element in which the costs details will be added 
        var htmlEl = "#results #equivalent-transport-costs .values";     

        //remove existing <ul> if they exist, to add new ones
        $(htmlEl + " ul").remove();

        //add <ul> for each item details in  equivalent transport costs
        if (!$(htmlEl + " .panel ul").length){
            $(htmlEl + " .panel").append($("<ul>"));
        }

        var addLiElm = function(item, text, text2){
            var $item = $(htmlEl + " ." + item + "_details ul");
            if(typeof text2 === 'undefined' || text2 === null){
                $item.append($("<li>").text(text));
            }
            else{
                $item.append($("<li>").text(text + ": " + text2));
            }
        };  

        //Public transports more taxi
        var publicTransports = calculatedData.publicTransports;
        if(publicTransports.toBeDisplayed) {

            addLiElm("public_transports", 
                     translatedStrings.fam_nbr, 
                     form.publicTransports.numberOfPeopleInFamily + " " + translatedStrings.person_or_people); 
            
            addLiElm("public_transports", 
                     translatedStrings.pass_month_avg, 
                     currencyShow(form.publicTransports.monthlyPassCost));        

            addLiElm("taxi", 
                     publicTransports.taxi.possibleDistanceDoneByTaxi.toFixed(1) + " " + translatedStrings.std_dist + " " + translatedStrings.on_taxi_paying + 
                     " " + currencyShow(publicTransports.taxi.costPerUnitDistance.toFixed(1)) + "/" + translatedStrings.std_dist); 

            if(publicTransports.furtherPublicTransports.display){
                addLiElm("other_pub_trans", translatedStrings.other_pub_trans_desc); 
            }
        }

        //UBER
        var calculatedUber = calculatedData.uber;

        if(serverInfo.switches.uber && calculatedUber && calculatedUber.calculated){

            $("#equivalent-transport-costs .uber").show();

            //in which driver can replace every km by uber
            //the remaining money is applied to public transport
            if(calculatedUber.resultType == 1){                         

                addLiElm("uber", "UBER - " + translatedStrings.costs + " " + translatedStrings.word_per + " " +  translatedStrings.std_dist_full, 
                        currencyShow(calculatedUber.uberCosts.perUnitDistance.toFixed(2)) + "/" + translatedStrings.std_dist);
                addLiElm("uber", "UBER - " + translatedStrings.costs + " " + translatedStrings.word_per + " " +  translatedStrings.minutes, 
                        currencyShow(calculatedUber.uberCosts.perMinute.toFixed(2)) + "/" + translatedStrings.min);
                addLiElm("uber", translatedStrings.fuel_dist + " " + translatedStrings.word_per + " " + translatedStrings.month, 
                         calculatedUber.distanceDoneWithUber.toFixed(0) + " " + translatedStrings.std_dist_full);
                addLiElm("uber", translatedStrings.minutes_drive_per + " " + translatedStrings.month, 
                         (calculatedData.timeSpentInDriving.hoursPerMonth * 60).toFixed(0) + " " + translatedStrings.minutes);                         

                addLiElm("other_pub_trans_for_uber", translatedStrings.other_pub_trans_desc); 
            }

            //the case where uber equivalent is more expensive
            //the driver shall spend the equivalent car money in public transports and the remaining in uber
            else if(calculatedUber.resultType == 2){

                addLiElm("uber", 
                         "UBER - " + translatedStrings.costs + " " + translatedStrings.word_per + " " + translatedStrings.std_dist_full,
                         currencyShow(calculatedUber.uberCosts.perUnitDistance.toFixed(2)) + "/" + translatedStrings.std_dist);
                addLiElm("uber", 
                         "UBER - " + translatedStrings.costs + " " + translatedStrings.word_per + " " + translatedStrings.minutes,
                         currencyShow(calculatedUber.uberCosts.perMinute.toFixed(2)) + "/" + translatedStrings.min);
                addLiElm("uber", 
                         translatedStrings.kinetic_speed_title, 
                         calculatedData.speeds.averageKineticSpeed.toFixed(2) + " " + translatedStrings.std_dist + "/" + translatedStrings.hour_abbr);
                addLiElm("uber", 
                         "UBER - " + translatedStrings.std_dist_full + " " + translatedStrings.word_per + " " + translatedStrings.month, 
                         calculatedUber.distanceDoneWithUber.toFixed(0) + " " + translatedStrings.std_dist_full);
                addLiElm("uber", 
                         "UBER: " + translatedStrings.costs + " - " + translatedStrings.word_total_cap, 
                         currencyShow(calculatedUber.uberCosts.total.toFixed(0))); 

                addLiElm("other_pub_trans_for_uber", 
                         translatedStrings.fam_nbr, form.publicTransports.numberOfPeopleInFamily + " " + translatedStrings.person_or_people);
                addLiElm("other_pub_trans_for_uber", translatedStrings.pass_month_avg, currencyShow(form.publicTransports.monthlyPassCost)); 
            }
        }
        else{
            $("#equivalent-transport-costs .uber").hide();
        }

    }

    //flatten object, that is, from an Object composed by elements in a Object's tree, returns simple list Object
    //i.e., from complex object with hierarchies, flattens to simple list Object
    function flatten(target, opts) {
        opts = opts || {};

        var delimiter = opts.delimiter || '.';
        var maxDepth = opts.maxDepth;
        var output = {};

        function step (object, prev, currentDepth) {
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

    //get from element with class in the set of toFixed0, toFixed1, toFixed2, etc.
    //respectively the integers 0, 1, 2, etc.  
    function getToFixedNumFromClasses($this){        

        if(!$this.length){
            return 0;
        }

        var toFixedN;

        //gets all classes from $fieldHead 
        var classList = $this.attr('class').split(/\s+/);
        $.each(classList, function(index, item) {
            //if there is a class which contains the string "field"?
            if (item.indexOf("toFixed") >= 0) {
                toFixedN = item;
            }
        });

        if(!toFixedN){
            return 0; //default
        }

        return parseInt(toFixedN.replace("toFixed", ""), 10);
    }

    //puts the currency symbol after the money value, for certain countries
    function currencyShow(value){
        if (typeof translatedStrings.invert_currency !== 'undefined' &&
                (translatedStrings.invert_currency == "true" || translatedStrings.invert_currency === true || translatedStrings.invert_currency=="1"))
        {
            return (value + " " + translatedStrings.curr_symbol);
        }
        else{
            return (translatedStrings.curr_symbol + " " + value);
        }
    }
    
    //Click handlers for class "accordion", which has further details  of costs items
    var wasClassAccordionHandlerSet = false;
    
    function setClassAccordionHandler(){      
        if(!wasClassAccordionHandlerSet){
            var i, acc = document.getElementsByClassName("accordion");

            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    var panel = this.nextElementSibling;

                    if (panel.style.maxHeight){
                        panel.style.maxHeight = null;
                    } 
                    else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    } 
                });
            }    

            wasClassAccordionHandlerSet = true;
        }
    }       
    
    /* === Public methods to be returned ===*/
        
    //thisModule, since this is a parent module and it may have been defined erlier by a children module
    thisModule.initialize = initialize;
    thisModule.getCostsColors = getCostsColors;
    thisModule.calculateCostsAndShowResults = calculateCostsAndShowResults;
    thisModule.setPeriodicCosts = setPeriodicCosts;
    
    return thisModule;    
    
})(autocosts.resultsModule || {},
   autocosts.serverInfo.translatedStrings,
   autocosts.serverInfo,
   autocosts.main.uberApiObj,
   autocosts.paths.url.fullUrl);

