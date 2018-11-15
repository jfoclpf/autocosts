/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with functions that are used to print the final result*/

//function that is run when user clicks "run/calculate"
function Run2(callback){

    //test if the form user inputs are correct
    if (!isReadyToCalc()){ 
        return false;
    }        
    
    //for each form part gets object with content
    var form = getFormData(document.costs_form);
    FORM_DATA = form;
    
    //country object with country specific variables
    var countryObj = {
        countryCode:            COUNTRY,
        currency:               WORDS.curr_code,
        distance_std:           WORDS.distance_std_option,
        speed_std:              WORDS.std_dist+"/h",
        fuel_efficiency_std:    WORDS.fuel_efficiency_std_option,
        fuel_price_volume_std:  WORDS.fuel_price_volume_std,
        taxi_price:             WORDS.taxi_price_per_dist
    };

    //calculate costs, "costs" is a global variable/object defined in coreFunctions.js
    var calculatedData = costs.calculateCosts(form, countryObj); 
        
    //get Uber data if applicable
    if(calculatedData.publicTransports.calculated && SWITCHES.uber){
        calculatedData.uber = costs.calculateUberCosts(UBER_API); 
    } 
    
    CALCULATED_DATA = calculatedData; //assigns to global variable
    
    //from complex object with hierarchies, flattens to simple object
    //see for more info: https://github.com/hughsk/flat
    var flattenedData = flatten(calculatedData, {delimiter:"_"}); 
    
    //console.log(flattenedData);     

    showResults(form, calculatedData, flattenedData, countryObj);
        
    $("*").promise().done(function(){    
        
        //global variable indicating the results are being shown
        DISPLAY.result.isShowing = true; 
    });

    return true;
}

function showResults(form, calculatedData, flattenedData, countryObj){
    //console.log(JSON.stringify(calculatedData, null, 4));
    
    $("#form").hide(); 
    
    drawCharts.setCalculatedData(calculatedData);
    
    //The first three boxes on the top
    //if financial effort was not calculated, does not show doughnut chart
    //on the third box, and adapt the three boxes css classes
    if(calculatedData.financialEffort.calculated && SWITCHES.charts){ 
        drawCharts.doughnutFinancialEffort(calculatedData);
        //shows third box where the financial effort doughnut chart appears
        $("#results #info-boxes .info-box.box-3").show();
        $("#results #info-boxes .info-box").removeClass("two-boxes").addClass("three-boxes");        
    }
    else{
        //hides third box where the financial effort doughnut chart appears
        $("#results #info-boxes .info-box.box-3").hide();
        $("#results #info-boxes .info-box").removeClass("three-boxes").addClass("two-boxes");       
    } 
                     
    //it needs to show also 1/2 of Maintenance Costs
    flattenedData.costs_perMonth_items_halfOfMaintenance = flattenedData.costs_perMonth_items_maintenance / 2;

    setCalculatedDataToHTML(flattenedData);                
    
    setPeriodicCosts(calculatedData, "month");
    setPeriodicCostsDetails(form, calculatedData); //the details on the dropdown boxes                         
    
    //SWITCHES are frozen/const object in Globals.js, so no need to show elements when SWITCHES.charts is true
    //since these elements are set tp be shown in css by default, just need to hide in case is false
    if(SWITCHES.charts){            
        drawCharts.costsBars("month");
        drawCharts.costsDoughnut("month");
    }
    else {
        $("#results .costs-doughnut-chart, #results .costs-bars-chart-stats, #results .stats-references").hide();             
    }

    //Financial Effort 
    if(calculatedData.financialEffort.calculated){            
        setFinancialEffortDetails(form, calculatedData);
        
        //shows financial effort section 
        $("#results #financial-effort").show();
        DISPLAY.result.fin_effort = true; //global variable 
        
        if(SWITCHES.charts){                
            drawCharts.financialEffort(calculatedData);
        }
        else{
            $("#financial-effort .graph").hide();
            $("#financial-effort .values.box").css("width", "40%").css("float", "none");
        }
    }
    else {
        //hides financial effort section
        $("#results #financial-effort").hide();
        DISPLAY.result.fin_effort = false;     
    } 

    //Equivalent transport costs
    if(calculatedData.publicTransports.calculated){            
        setEquivTransportCostsDetails(form, calculatedData);
        
        $("#results #equivalent-transport-costs").show();
        DISPLAY.result.public_transports = true;
        
        if(SWITCHES.charts){
            drawCharts.alternativesToCar();
        }
        else{
            $("#equivalent-transport-costs .graph").hide();
            $("#equivalent-transport-costs .values.box").css("margin", "auto 2%").css("float", "none");            
        }
    }
    else {
        $("#results #equivalent-transport-costs").hide();
        DISPLAY.result.public_transports = false;
    } 

    setClassAccordionHandler();
        
    $("#results").show();
    
}

//scans all calculatedData flattened to flattenedData and assigns each result value to respective HTML element  
function setCalculatedDataToHTML(flattenedData){
    
    for (var key in flattenedData){
        var $i = $("#results ." + key);  
        //check that the element with that class exists in the html page
        //and that the element is valid in the array of calculated data
        if(flattenedData.hasOwnProperty(key) && $i.length &&  flattenedData[key]){

            //organising text or adding extra text according to classes: toFixedN, currency, hours, distance, percentage
            toFixedN = getToFixedNumFromClasses($i); 
            amount = flattenedData[key].toFixed(toFixedN);

            if($i.hasClass("currency")){
                numToShow = currencyShow(amount);
            }
            else if($i.hasClass("hours")){
                numToShow = amount + " " + WORDS.hour_abbr; 
            }
            else if($i.hasClass("distance")){
                numToShow = amount + " " + getDistanceOptStrShort(); 
            }
            else if($i.hasClass("percentage")){
                numToShow = amount + "&#37;"; //percentage symbol 
            }                
            else{
                numToShow = amount;
            }

            $i.html(numToShow);
        }
    }
}

//The first section of results page, showing the monthly/trimester/semester/yearly costs
function setPeriodicCosts(calculatedData, period){
    
    var numMonths, strPeriod;
    var currSymb = WORDS.curr_symbol;
    
    switch(period){
        case "month" :
            numMonths = 1;
            strPeriod = WORDS.month;
            break;
        case "trimester" :
            numMonths = 3;
            strPeriod = WORDS.trimester;
            break;
        case "semester" :
            numMonths = 6;
            strPeriod = WORDS.semester;
            break;
        case "year" :
            numMonths = 12;
            strPeriod = WORDS.year;
            break;
        default:
            console.error("Period not valid " + period);
    }

    //sets the dropdown meny
    $('#results #totalCostsPeriod').val(period);
    
    //main info box total costs    
    $("#results #info-boxes .total_costs_per_period").html((calculatedData.costs.perMonth.total * numMonths).toFixed(0));
    
    //section h2 title
    $("#results #avg-periodic-cost .costs_per_type").html(WORDS.costs + " " + WORDS.word_per + strPeriod);
    
    var $htmlEl = $("#results #avg-periodic-cost .three-boxes");
    
    $htmlEl.find(".average_costs_per_type").html(WORDS.word_per + strPeriod);
    
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
        addLiElm("depreciation", WORDS.error_depreciation_new_car);
    } 
    else {        
        addLiElm("depreciation", WORDS.aq_value, currencyShow(form.depreciation.acquisitionCost));
        addLiElm("depreciation", WORDS.final_value, currencyShow(form.depreciation.presentValue));
        addLiElm("depreciation", WORDS.period_own, calculatedData.details.ageOfCarInMonths + " " + WORDS.months);
        addLiElm("depreciation", "(" + currencyShow(form.depreciation.acquisitionCost) + "-" + currencyShow(form.depreciation.presentValue) + ")/" +
                                 calculatedData.details.ageOfCarInMonths + " " + WORDS.months);
    }

    //Insurance
    switch(form.insurance.period){
        case "mensal":
            addLiElm("insurance", form.insurance.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.month);
            break;
        case "trimestral":
            addLiElm("insurance", form.insurance.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.trimester);
            break;
        case "semestral":
            addLiElm("insurance", form.insurance.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.semester);
            break;
        case "anual":
            addLiElm("insurance", form.insurance.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.year);
            break;
        default:
            throw errMsg;
    }

    //Credit interests
    if(form.credit.creditBool == "true") {
        
        addLiElm("credit", WORDS.credit_loan2, currencyShow(form.credit.yesCredit.borrowedAmount));
        addLiElm("credit", WORDS.credit_period, form.credit.yesCredit.numberInstallments + " " + WORDS.months);
        addLiElm("credit", WORDS.credit_instalment, currencyShow(form.credit.yesCredit.amountInstallment));
        addLiElm("credit", WORDS.credit_residual_value1, currencyShow(form.credit.yesCredit.residualValue));

        addLiElm("credit", WORDS.credit_total_interests, currencyShow(calculatedData.details.credit.totalPaidInInterests)); 
        addLiElm("credit", "(" + calculatedData.details.credit.numberOfMonthlyInstalments + "*" + form.credit.yesCredit.amountInstallment + ")+" + 
                           form.credit_residual_value + "-" + form.credit.yesCredit.borrowedAmount);

        if(calculatedData.age_months >= calculatedData.details.credit.numberOfMonthlyInstalments){
            addLiElm("credit", WORDS.credit_interests_month + ": " +
                               currencyShow(calculatedData.costs.perMonth.items.credit.toFixed(2)));
        }        
    }

    //Inspection
    if (form.inspection.numberOfInspections !== 0){        
        addLiElm("inspection", form.inspection.numberOfInspections + " " + WORDS.times_costing + " " + form.inspection.averageInspectionCost + 
                               " " + WORDS.curr_name_plural + " " + WORDS.each_one_during + " " + 
                               calculatedData.details.ageOfCarInMonths + " " + WORDS.months);
    }
    
    //Taxes
    addLiElm("roadTaxes", form.roadTaxes.amountPerYear + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
  
    //Fuel    
    switch(form.fuel.typeOfCalculation){
        case "km":
            if (form.fuel.distanceBased.considerCarToJob == "false"){
                switch(form.fuel.distanceBased.noCarToJob.period)
                {
                    case "1":
                        addLiElm("fuel", form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                 WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.month);
                        break;
                    case "2":
                        addLiElm("fuel", form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                 WORDS.dist_each_two_months);
                        break;
                    case "3":
                        addLiElm("fuel", form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                 WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.trimester);
                        break;
                    case "4":
                        addLiElm("fuel", form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                 WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.semester);
                        break;
                    case "5":
                        addLiElm("fuel", form.fuel.distanceBased.noCarToJob.distancePerPeriod + " " + 
                                 WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.year);
                        break;
                    default:
                        throw errMsg;                        
                }
                addLiElm("fuel", WORDS.fuel_car_eff, form.fuel.distanceBased.fuelEfficiency + " " + WORDS.std_fuel_calc);
                addLiElm("fuel", WORDS.fuel_price1, currencyShow(form.fuel.distanceBased.fuelPrice) + "/" + WORDS.std_volume_short);
            }
            else{
                addLiElm("fuel", form.fuel.distanceBased.carToJob.daysPerWeek + " " + WORDS.fuel_job_calc1);
                addLiElm("fuel", WORDS.you_drive + " " + form.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob + " " + WORDS.fuel_dist_home_job1);
                addLiElm("fuel", WORDS.you_drive + " " + form.fuel.distanceBased.carToJob.distanceDuringWeekends + " " + WORDS.fuel_dist_no_job1);
                addLiElm("fuel", WORDS.you_drive_tottaly_avg + " " + calculatedData.drivingDistance.perMonth.toFixed(1) + " " + 
                                 WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.month + " (~30.5 " + WORDS.days + ")");
                addLiElm("fuel", WORDS.fuel_car_eff, form.fuel.distanceBased.fuelEfficiency + " " + WORDS.std_fuel_calc);
                addLiElm("fuel", WORDS.fuel_price, currencyShow(form.fuel.distanceBased.fuelPrice) + "/" + WORDS.std_volume_short);
            }
            break;
            
        case "euros":
            switch(form.fuel.currencyBased.period)
            {
                case "1":
                    addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                             WORDS.word_per + " " + WORDS.month);
                    break;
                case "2":
                    addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + WORDS.dist_each_two_months);
                    break;
                case "3":
                    addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                             WORDS.word_per + " " + WORDS.trimester);
                    break;
                case "4":
                    addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                             WORDS.word_per + " " + WORDS.semester);
                    break;
                case "5":
                    addLiElm("fuel", form.fuel.currencyBased.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                             WORDS.word_per + " " + WORDS.year);
                    break;
                default:
                    throw errMsg;                        
            }
            break;
    }
                  
    //Maintenance    
    addLiElm("maintenance", form.maintenance.amountPerYear + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);

    //Repairs
    addLiElm("repairsImprovements", form.repairsImprovements.amountPerYear + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);

    //Tolls
    if(form.tolls.calculationBasedOnDay == "false") {
        switch(form.tolls.noBasedOnDay.period) {
            case "1":
                addLiElm("tolls", form.tolls.noBasedOnDay.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month);
                break;
            case "2":
                addLiElm("tolls", form.tolls.noBasedOnDay.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.words_per_each + " " + WORDS.two_months);
                break;
            case "3":
                addLiElm("tolls", form.tolls.noBasedOnDay.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester);
                break;
            case "4":
                addLiElm("tolls", form.tolls.noBasedOnDay.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester);
                break;
            case "5":
                addLiElm("tolls", form.tolls.noBasedOnDay.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
                break;
            default:
                throw errMsg;                
        }
    }
    else{
        addLiElm("tolls", form.tolls.yesBasedOnDay.amountPerDay + " " + WORDS.curr_name_plural + " " + 
                          WORDS.during + " " + form.tolls.yesBasedOnDay.daysPerMonth + " " + WORDS.days + " " + 
                          WORDS.word_per + " " + WORDS.month);
    } 
                    
    //Fines
    switch(form.fines.period) {
        case "1":
            addLiElm("fines", form.fines.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month);
            break;
        case "2":
            addLiElm("fines", form.fines.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.words_per_each + " " + WORDS.two_months);
            break;
        case "3":
            addLiElm("fines", form.fines.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester);
            break;
        case "4":
            addLiElm("fines", form.fines.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester);
            break;
        case "5":
            addLiElm("fines", form.fines.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
            break;
        default:
            throw errMsg;            
        }

    //Washing    
    switch(form.washing.period) {
        case "1":
            addLiElm("washing", form.washing.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month);
            break;
        case "2":
            addLiElm("washing", form.washing.amountPerPeriod + " " + WORDS.curr_name_plural + " " + 
                                WORDS.words_per_each + " " + WORDS.two_months);
            break;
        case "3":
            addLiElm("washing", form.washing.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester);
            break;
        case "4":
            addLiElm("washing", form.washing.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester);
            break;
        case "5":
            addLiElm("washing", form.washing.amountPerPeriod + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
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
            addLiElm("income", WORDS.net_income_per + " " + WORDS.year, currencyShow(form.income.year.amount));
            addLiElm("income", WORDS.average_net_income_per + " " + WORDS.month, currencyShow(income.averagePerMonth.toFixed(1)));
            break;
        
        case 'month':
            addLiElm("income", WORDS.net_income_per + " " + WORDS.month, currencyShow(form.income.month.amountPerMonth));
            addLiElm("income", WORDS.number_of_months, form.income.month.monthsPerYear);
            addLiElm("income", WORDS.average_net_income_per + " " + WORDS.month, currencyShow(income.averagePerMonth.toFixed(1)));
            addLiElm("income", WORDS.average_net_income_per + " " + WORDS.year, currencyShow(income.perYear.toFixed(1)));            
            break;
        
        case 'week':
            addLiElm("income", WORDS.net_income_per + " " + WORDS.week, currencyShow(form.income.week.amountPerWeek));
            addLiElm("income", WORDS.number_of_weeks, form.income.week.weeksPerYear);
            addLiElm("income", WORDS.average_net_income_per + " " + WORDS.month, currencyShow(income.averagePerMonth.toFixed(1)));
            addLiElm("income", WORDS.average_net_income_per + " " + WORDS.year, currencyShow(income.perYear.toFixed(1)));            
            break;
        
        case 'hour':
            addLiElm("income", WORDS.net_income_per + " " + WORDS.hour, currencyShow(form.income.hour.amountPerHour));
            addLiElm("income", WORDS.number_of_hours, form.income.hour.hoursPerWeek + " " + WORDS.hour_abbr);
            addLiElm("income", WORDS.number_of_weeks, form.income.hour.weeksPerYear);
            addLiElm("income", WORDS.average_net_income_per + " " + WORDS.month, currencyShow(income.averagePerMonth.toFixed(1)));
            addLiElm("income", WORDS.average_net_income_per + " " + WORDS.year, currencyShow(income.perYear.toFixed(1)));                     
            break;
        default:
            throw errMsg;
    }
    
    
    //working time
    var wt = calculatedData.financialEffort.workingTime;
    if(form.income.incomePeriod != 'hour'){
        if(form.workingTime.isActivated == 'true'){
            
            addLiElm("working_time", WORDS.hours_per + " " + WORDS.week, wt.hoursPerWeek + " " + WORDS.hour_abbr);
            addLiElm("working_time", WORDS.months_per + " " + WORDS.year, wt.monthsPerYear);
            addLiElm("working_time", WORDS.average_working_hours_per + " " + WORDS.month, wt.hoursPerMonth.toFixed(1) + " " + WORDS.hour_abbr);
            addLiElm("working_time", WORDS.working_hours_per + " " + WORDS.year, wt.hoursPerYear.toFixed(1) + " " + WORDS.hour_abbr);            
        }
        else{
            addLiElm("working_time",  WORDS.working_time_message);            
        }
    }
    addLiElm("working_time", WORDS.average_net_income_per + " " + WORDS.hour, currencyShow(income.averagePerHour.toFixed(1)));    
    
    //distance 
    var dd = calculatedData.drivingDistance;
    if((form.fuel.typeOfCalculation != 'km' && form.distance.considerCarToJob == 'true') || 
       (form.fuel.typeOfCalculation != 'km' && form.fuel.distanceBased.considerCarToJob == 'true')){
        
        addLiElm("distance", WORDS.dist_home_job, parseInt(form.distance.carToJob.distanceBetweenHomeAndJob).toFixed(1) + " " + WORDS.std_dist);
        addLiElm("distance", WORDS.days_drive_job, form.distance.carToJob.daysPerWeek + " " + WORDS.days);
        addLiElm("distance", WORDS.dist_jorney_weekend, parseInt(form.distance.carToJob.distanceDuringWeekends).toFixed(1) + " " + WORDS.std_dist);
        addLiElm("distance", WORDS.average_dist_per_week, dd.perWeek.toFixed(1) + " " + WORDS.std_dist);                
    }
    
    addLiElm("distance", WORDS.you_drive_per + " " + WORDS.month, dd.perMonth.toFixed(1) + " " + WORDS.std_dist);
    addLiElm("distance", WORDS.you_drive_per + " " + WORDS.year, dd.perYear.toFixed(1) + " " + WORDS.std_dist);             
        
    //time spent in driving
    var tsd = calculatedData.timeSpentInDriving;
    if(form.distance.considerCarToJob == 'true' || form.fuel.distanceBased.considerCarToJob == 'true'){
        addLiElm("time_spent_in_driving", WORDS.minutes_home_job, form.timeSpentInDriving.option1.minutesBetweenHomeAndJob + " " + WORDS.min);
        addLiElm("time_spent_in_driving", WORDS.days_drive_to_job, form.distance.carToJob.daysPerWeek + " " + WORDS.days);
        addLiElm("time_spent_in_driving", WORDS.time_drive_weekend, form.timeSpentInDriving.option1.minutesDuringWeekend + " " + WORDS.min);
        addLiElm("time_spent_in_driving", WORDS.minutes_drive_per + " " + WORDS.week, tsd.minutesPerWeek + " " + WORDS.min);        
    }
    else{
        addLiElm("time_spent_in_driving", WORDS.minutes_drive_per + " " + WORDS.day,  form.timeSpentInDriving.option2.minutesPerDay + " " + WORDS.min);
        addLiElm("time_spent_in_driving", WORDS.days_drive_per_month, form.timeSpentInDriving.option2.daysPerMonth + " " + WORDS.days);
    }

    addLiElm("time_spent_in_driving", WORDS.hours_drive_per + " " + WORDS.month, tsd.hoursPerMonth.toFixed(1) + " " + WORDS.hour_abbr);
    addLiElm("time_spent_in_driving", WORDS.hours_drive_per + " " + WORDS.year,  tsd.hoursPerYear.toFixed(1) + " " + WORDS.hour_abbr);   
    
    
    //financial effort
    var fe = calculatedData.financialEffort;    
    addLiElm("financial_effort", WORDS.total_costs_per_year, currencyShow(fe.totalCarCostsPerYear.toFixed(1)));
    addLiElm("financial_effort", WORDS.hours_to_afford_car,  fe.workingHoursPerYearToAffordCar.toFixed(1) + " " + WORDS.hour_abbr);
    addLiElm("financial_effort", WORDS.months_to_afford_car, fe.workingMonthsPerYearToAffordCar.toFixed(2));
    addLiElm("financial_effort", WORDS.days_car_paid,        Math.ceil(fe.daysForCarToBePaid) + " " + WORDS.days);
    
    //speeds
    var speeds = calculatedData.speeds; 
    addLiElm("financial_effort", WORDS.aver_yearly + " " + WORDS.kinetic_speed, speeds.averageKineticSpeed.toFixed(1) + " " + WORDS.std_dist+"/h");
    addLiElm("financial_effort", WORDS.aver_yearly + WORDS.virtual_speed,       speeds.averageConsumerSpeed.toFixed(1) + " " + WORDS.std_dist+"/h");    
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
    var pt = calculatedData.publicTransports;
    if(pt.toBeDisplayed) {

        DISPLAY.result.public_transports = true; //global variable
        
        addLiElm("public_transports", WORDS.fam_nbr, form.publicTransports.numberOfPeopleInFamily + " " + WORDS.person_or_people);              
        addLiElm("public_transports", WORDS.pass_month_avg, currencyShow(form.publicTransports.monthlyPassCost));        

        addLiElm("taxi", pt.taxi.possibleDistanceDoneByTaxi.toFixed(1) + " " + WORDS.std_dist + " " + WORDS.on_taxi_paying + " " + 
            currencyShow(pt.taxi.costPerUnitDistance.toFixed(1)) + "/" + WORDS.std_dist); 
        
        if(pt.furtherPublicTransports.display){
            addLiElm("other_pub_trans", WORDS.other_pub_trans_desc); 
        }
    }
    else{
        DISPLAY.result.public_transports = false; //global variable
    }

    //UBER
    var calculatedUber = calculatedData.uber;
    
    if(SWITCHES.uber && calculatedUber && !$.isEmptyObject(calculatedUber)){
        
        $("#equivalent-transport-costs .uber").show();
        DISPLAY.result.uber = true; //says uber table is to be printed; global variable                

        //in which driver can replace every km by uber
        //the remaining money is applied to public transport
        if(calculatedUber.resultType == 1){                         
            
            addLiElm("uber", "UBER - " + WORDS.costs + " " + WORDS.word_per + " " +  WORDS.std_dist_full, 
                    currencyShow(calculatedUber.uberCosts.perUnitDistance.toFixed(2)) + "/" + WORDS.std_dist);
            addLiElm("uber", "UBER - " + WORDS.costs + " " + WORDS.word_per + " " +  WORDS.minutes, 
                    currencyShow(calculatedUber.uberCosts.perMinute.toFixed(2)) + "/" + WORDS.min);
            addLiElm("uber", WORDS.fuel_dist + " " + WORDS.word_per + " " + WORDS.month, 
                     calculatedUber.distanceDoneWithUber.toFixed(0) + " " + WORDS.std_dist_full);
            addLiElm("uber", WORDS.minutes_drive_per + " " + WORDS.month, 
                     (calculatedData.timeSpentInDriving.hoursPerMonth * 60).toFixed(0) + " " + WORDS.minutes);                         
            
            addLiElm("other_pub_trans_for_uber", WORDS.other_pub_trans_desc); 
        }

        //the case where uber equivalent is more expensive
        //the driver shall spend the equivalent car money in public transports and the remaining in uber
        else if(calculatedUber.resultType == 2){
                        
            addLiElm("uber", "UBER - " + WORDS.costs + " " + WORDS.word_per + " " + WORDS.std_dist_full,
                    currencyShow(calculatedUber.uberCosts.perUnitDistance.toFixed(2)) + "/" + WORDS.std_dist);
            addLiElm("uber", "UBER - " + WORDS.costs + " " + WORDS.word_per + " " + WORDS.minutes,
                    currencyShow(calculatedUber.uberCosts.perMinute.toFixed(2)) + "/" + WORDS.min);
            addLiElm("uber", WORDS.kinetic_speed_title, calculatedData.speeds.averageKineticSpeed.toFixed(2) + " " + WORDS.std_dist + "/" + WORDS.hour_abbr);
            addLiElm("uber", "UBER - " + WORDS.std_dist_full + " " + WORDS.word_per + " " + WORDS.month, 
                    calculatedUber.distanceDoneWithUber.toFixed(0) + " " + WORDS.std_dist_full);
            addLiElm("uber", "UBER: " + WORDS.costs + " - " + WORDS.word_total_cap, currencyShow(calculatedUber.uberCosts.total.toFixed(0))); 
                        
            addLiElm("other_pub_trans_for_uber", WORDS.fam_nbr, form.publicTransports.numberOfPeopleInFamily + " " + WORDS.person_or_people);
            addLiElm("other_pub_trans_for_uber", WORDS.pass_month_avg, currencyShow(form.publicTransports.monthlyPassCost)); 
        }
    }
    else{
        $("#equivalent-transport-costs .uber").hide();
        DISPLAY.result.uber = false; //says uber table is not to be printed; global variable
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

//Click handlers for class "accordion", which has further details  of costs items
var setClassAccordionHandler = (function(){
    
    var wasSet = false;
    
    var exec = function(){         
        if(!wasSet){
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

            wasSet = true;
        }
    };
    
    return exec;
}());
