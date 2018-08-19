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
    var f1 = get_form_part1();
    var f2 = get_form_part2();
    var f3 = get_form_part3();

    //country object with country specific variables
    var country = {
        currency: WORDS.curr_code,
        distance_std: WORDS.distance_std_option,
        fuel_efficiency_std: WORDS.fuel_efficiency_std_option,
        fuel_price_volume_std: WORDS.fuel_price_volume_std,
        taxi_price: WORDS.taxi_price_per_dist
    };

    //calculate costs
    var data = calculate_costs(f1, f2, f3, country);
    CALCULATED.data = data; //assigns to global variable

    printResults(f1, f2, f3, data);

    //shows social media buttons
    if(SWITCHES.social){
        $("#shareIcons").jsSocials({
            url: PAGE_URL,
            text: INITIAL_TEX,
            showLabel: false,
            showCount: false,
            shares: ["whatsapp", "facebook", "twitter", "googleplus"]
        });
    }
        
    $("*").promise().done(function(){    
        
        //global variable indicating the results are being shown
        DISPLAY.result.isShowing = true;        
        
        //calls the callback() if it's a function
        if (typeof callback === 'function'){
            callback();
        }
    });

    return true;
}

function printResults(f1, f2, f3, calculatedData){
    //console.log(JSON.stringify(calculatedData, null, 4));
    
    $("#form").hide();
        
    //from complex object with hierarchies, flattens to simple object
    //see: https://github.com/hughsk/flat
    var flattenedData = flatten(calculatedData, {delimiter:"_"});    
    //console.log(flattenedData);                
    
    var toFixedN, amount, numToShow;
    $("#results").show(function(){
        //scans all calculatedData and assigns each result value to respective HTML element
        for (var key in flattenedData){
            var $i = $("#results ." + key);  
            if($i.length){
                toFixedN = getToFixedNumFromClasses($i);
                amount = flattenedData[key].toFixed(toFixedN);
                numToShow = $i.hasClass("currency") ? currencyShow(amount) : amount;
                $i.html(numToShow);
            }
        }
        
        setMonthlyCostsDetails(f1, f2, f3, calculatedData);        
        setClassAccordionHandler();
    });    
    
}

function setClassAccordionHandler(){
    
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
}

//puts the currency symbol after the money value, for certain countries
function currencyShow(value){

    if (typeof WORDS.invert_currency !== 'undefined' && 
            (WORDS.invert_currency == "true" || WORDS.invert_currency === true || WORDS.invert_currency=="1"))
    {
        return (value + "&nbsp;" + WORDS.curr_symbol);
    }
    else{
        return (WORDS.curr_symbol + "&nbsp;" + value);
    }
}

function setMonthlyCostsDetails(f1, f2, f3, calculatedData){
                
    //add Cost <ul> for each cost details, for example add <ul> to div with class "fuel_details"
    for (var cost in calculatedData.monthly_costs) {
        if (!calculatedData.monthly_costs.hasOwnProperty(cost)) {
            continue;
        }
        
        if($("#results ." + cost + "_details").length){
            $("#results ." + cost + "_details").append($("<ul>"));
        }
    }
    
    var addLiElm = function(costItem, text){
        var $fuelDesc = $("#results ." + costItem + "_details ul");
        $fuelDesc.append($("<li>").text(text));
    };
    
    //Depreciation
    if (calculatedData.age_months === 0) {
        addLiElm("depreciation", WORDS.error_depreciation_new_car);
    } 
    else {        
        addLiElm("depreciation", WORDS.aq_value + ": " + f1.auto_initial_cost + WORDS.curr_symbol);
        addLiElm("depreciation", WORDS.final_value + ": " + f1.auto_final_cost + WORDS.curr_symbol);
        addLiElm("depreciation", WORDS.period_own + ": " + calculatedData.age_months + " " + WORDS.months);
        addLiElm("depreciation", "(" + f1.auto_initial_cost + WORDS.curr_symbol + "-" + f1.auto_final_cost + 
                                 WORDS.curr_symbol + ")/" + calculatedData.age_months + " " + WORDS.months);
    }

    //Insurance
    switch(f1.insurance_type){

        case "mensal":
            addLiElm("insurance", calculatedData.monthly_costs.insurance + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.month);
            break;
        case "trimestral":
            addLiElm("insurance", f1.insurance_value + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.trimester);
            break;
        case "semestral":
            addLiElm("insurance", f1.insurance_value + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.semester);
            break;
        case "anual":
            addLiElm("insurance", f1.insurance_value + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.word_per + " " + WORDS.year);
            break;
    }

    //Credit interests
    if(f1.cred_auto_s_n == "true") {
        
        addLiElm("credit", WORDS.credit_loan2 + ": " + f1.credit_amount + WORDS.curr_symbol);
        addLiElm("credit", WORDS.credit_period + ": " + f1.credit_period + " " + WORDS.months);
        addLiElm("credit", WORDS.credit_instalment + ": " + f1.credit_value_p_month + WORDS.curr_symbol);
        addLiElm("credit", WORDS.credit_residual_value1 + ": " + f1.credit_residual_value + WORDS.curr_symbol);

        addLiElm("credit", WORDS.credit_total_interests + ": " + calculatedData.total_interests + WORDS.curr_symbol); 
        addLiElm("credit", "(" + calculatedData.month_cred + "*" + f1.credit_value_p_month + ")+" + 
                           f1.credit_residual_value + "-" + f1.credit_amount);

        if(calculatedData.age_months >= calculatedData.month_cred){
            addLiElm("credit", WORDS.credit_interests_month + ": " +
                               calculatedData.monthly_costs.credit.toFixed(2) + WORDS.curr_symbol);
        }        
    }

    //Inspection
    if (f1.nmr_times_inspec !== 0){        
        addLiElm("inspection", f1.nmr_times_inspec + " " + WORDS.times_costing + " " + f1.inspec_price + 
                               " " + WORDS.curr_name_plural + " " + WORDS.each_one_during + " " + 
                               calculatedData.age_months + " " + WORDS.months);
    }
    
    //Taxes
    addLiElm("car_tax", f1.car_tax + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
    
    //Fuel    
    switch(f2.type_calc_fuel){
        case "km":
            if (f2.take_car_to_job == "false"){
                switch(calculatedData.fuel_period_km)
                {
                    case "1":
                        addLiElm("fuel", f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.month);
                        break;
                    case "2":
                        addLiElm("fuel", f2.distance + " " + WORDS.dist_each_two_months);
                        break;
                    case "3":
                        addLiElm("fuel", f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.trimester);
                        break;
                    case "4":
                        addLiElm("fuel", f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.semester);
                        break;
                    case "5":
                        addLiElm("fuel", f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.year);
                        break;
                }
                addLiElm("fuel", WORDS.fuel_car_eff + ": " + f2.car_consumption + " " + WORDS.std_fuel_calc);
                addLiElm("fuel", WORDS.fuel_price1 + ": " + f2.fuel_price + " " + WORDS.curr_symbol + 
                         "/" + WORDS.std_volume_short);
            }
            else{
                addLiElm("fuel", f2.days_p_week + " " + WORDS.fuel_job_calc1);
                addLiElm("fuel", WORDS.you_drive + " " + f2.distance_home2job + " " + WORDS.fuel_dist_home_job1);
                addLiElm("fuel", WORDS.you_drive + " " + f2.distance_weekend + " " + WORDS.fuel_dist_no_job1);
                addLiElm("fuel", WORDS.you_drive_tottaly_avg + " " + calculatedData.distance_per_month.toFixed(1) + " " + 
                                 WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.month + " (~30.5 " + WORDS.days + ")");
                addLiElm("fuel", WORDS.fuel_car_eff + ": " + f2.car_consumption + " " + WORDS.std_fuel_calc);
                addLiElm("fuel", WORDS.fuel_price + ": " + f2.fuel_price + " " + WORDS.curr_symbol + 
                                 "/" + WORDS.std_volume_short);
            }
            break;
            
        case "euros":
            switch(calculatedData.fuel_cost_period)
            {
                case "1":
                    addLiElm("fuel", f2.fuel_money + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month);
                    break;
                case "2":
                    addLiElm("fuel", f2.fuel_money + " " + WORDS.dist_each_two_months);
                    break;
                case "3":
                    addLiElm("fuel", f2.fuel_money + " " + WORDS.curr_name_plural + " " + 
                             WORDS.word_per + " " + WORDS.trimester);
                    break;
                case "4":
                    addLiElm("fuel", f2.fuel_money + " " + WORDS.curr_name_plural + " " + 
                             WORDS.word_per + " " + WORDS.semester);
                    break;
                case "5":
                    addLiElm("fuel", f2.fuel_money + " " + WORDS.curr_name_plural + " " + 
                             WORDS.word_per + " " + WORDS.year);
                    break;
            }
            break;
    }
    
    //Maintenance    
    addLiElm("maintenance", f2.maintenance + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);

    //Repairs
    addLiElm("repairs_improv", f2.repairs + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);

    //Tolls
    if(f2.type_calc_tolls == "false") {
        switch(calculatedData.tolls_period) {
            case "1":
                addLiElm("tolls", f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month);
                break;
            case "2":
                addLiElm("tolls", f2.tolls + " " + WORDS.curr_name_plural + " " + 
                                  WORDS.words_per_each + " " + WORDS.two_months);
                break;
            case "3":
                addLiElm("tolls", f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester);
                break;
            case "4":
                addLiElm("tolls", f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester);
                break;
            case "5":
                addLiElm("tolls", f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
                break;
        }
    }
    else{
        addLiElm("tolls", f2.price_tolls_p_day + " " + WORDS.curr_name_plural + " " + 
                          WORDS.during + " " + f2.tolls_days_p_month + " " + WORDS.days + " " + 
                          WORDS.word_per + " " + WORDS.month);
    }    

    //Fines
    switch(calculatedData.fines_period) {
        case "1":
            addLiElm("fines", f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month);
            break;
        case "2":
            addLiElm("fines", f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.words_per_each + " " + WORDS.two_months);
            break;
        case "3":
            addLiElm("fines", f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester);
            break;
        case "4":
            addLiElm("fines", f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester);
            break;
        case "5":
            addLiElm("fines", f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
            break;
        }

    //Washing    
    switch(calculatedData.washing_period) {
        case "1":
            addLiElm("washing", f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month);
            break;
        case "2":
            addLiElm("washing", f2.washing + " " + WORDS.curr_name_plural + " " + 
                                WORDS.words_per_each + " " + WORDS.two_months);
            break;
        case "3":
            addLiElm("washing", f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester);
            break;
        case "4":
            addLiElm("washing", f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester);
            break;
        case "5":
            addLiElm("washing", f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year);
            break;
        }    
}

//flatten object
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
