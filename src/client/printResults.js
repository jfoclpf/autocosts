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
    if (!is_userdata_formpart1_ok()){ return false;}
    if (!is_userdata_formpart2_ok()){ return false;}
    if (!is_userdata_formpart3_ok()){ return false;}
    
    //from here the form inputs are correct
    
    //hides the form input
    $("#input_div").hide();
    
    //enlarges center div
    $("#div1_td").css("width", "15%");
    $("#div3_td").css("width", "15%");
    
    //hides description, left and right columns
    $("#div1").css("display", "none");
    $("#div3").css("display", "none");
    $("#description").html("");    

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

    //main table
    var main_table_HTML = print_main_table(f1, f2, f3, data);
    $("#main_table").html(main_table_HTML);
    $("#main_table, #main_table_section").show("slow");

    //monthly costs table
    var monthly_costs_HTML = print_costs_table(f1, f2, f3, data);
    $("#monthly_costs").html(monthly_costs_HTML);
    $("#monthly_costs, #monthly_costs_section").show("slow");

    //financial result table
    if(data.fin_effort_calculated){
        var fin_effort_table_HTML = print_feffort_table(f1, f2, f3, data);
        $("#fin_effort").html(fin_effort_table_HTML);
        $("#fin_effort, #fin_effort_section").show("slow");
        DISPLAY.result.fin_effort = true; //global variable
    }
    else{
        $("#fin_effort, #fin_effort_section").hide();
        DISPLAY.result.fin_effort = false;
    }

    //Alternative to car costs tables: public transports and uber
    if(data.alternative_to_car_costs_calculated){

        CALCULATED.uber = get_uber(UBER_API, data, country);
        var alternToCarCostsTableHTML = print_AlternativeToCarCosts_table(f1, f2, f3, data, CALCULATED.uber, country);

        if(alternToCarCostsTableHTML !== ""){
            $("#alternative_to_carcosts, #alternative_to_carcosts_section").show("slow");
            $("#alternative_to_carcosts").html(alternToCarCostsTableHTML);
        }
        else{
            $("#alternative_to_carcosts_section").hide();
        }
    }
    else{
        $("#alternative_to_carcosts_section").hide();
        DISPLAY.result.public_transports = DISPLAY.result.uber = false;
    }

    //external costs table
    var extern_costs_table_table_HTML = print_extern_table(f1, f2, f3, data);
    if (extern_costs_table_table_HTML !== ""){
        $("#extern_costs").html(extern_costs_table_table_HTML);
        $("#extern_costs, #exten_costs_section").show("slow");
        DISPLAY.result.ext_costs = true; //global variable
    }
    else{
        $("#exten_costs_section").hide();
        DISPLAY.result.ext_costs = false;
    }

    //shows buttons
    $("#result_buttons_div, #buttons_section").show("slow");


    //shows social media buttons
    if(SWITCHES.social){
        $("#shareIcons").jsSocials({
            url: PAGE_URL,
            text: INITIAL_TEX,
            showLabel: false,
            showCount: false,
            shares: ["email", "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
        });
    }

    //gets result frame width to draw charts within it
    DISPLAY.centralFrameWidth = document.getElementById("div2").offsetWidth;

    drawChartResult();
    
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

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************

/*Total main first table (result_table0)*/
function print_main_table(f1, f2, f3, data) {

    var varResult= "";
    //main table
    varResult+= '<table class="result_table" id="result_table0">';
    //header
    varResult+= '<tr><td style="padding:7px;" colspan="4"><b> ' + (WORDS.your_car_costs_you).toUpperCase() + '</b></td></tr>';

    varResult+= '<tr>';

    varResult+= '<td><b>' + currencyShow(data.total_costs_month.toFixed(0)) + '</b><br>';
    varResult+= WORDS.word_per + '<br>' + WORDS.month + '</td>';

    varResult+= '<td><b>' + currencyShow((data.total_costs_month*3).toFixed(0)) + '</b><br>';
    varResult+= WORDS.word_per + '<br>' + WORDS.trimester + '</td>';

    varResult+= '<td><b>' + currencyShow((data.total_costs_month*6).toFixed(0)) + '</b><br>';
    varResult+= WORDS.word_per + '<br>' + WORDS.semester + '</td>';

    varResult+= '<td><b>' + currencyShow(data.total_costs_year.toFixed(0)) + '</b><br>';
    varResult+= WORDS.word_per + '<br>' + WORDS.year + '</td>';

    varResult+= '</tr>';

    if(f3.IsFinancialEffort){
        varResult+= '<tr><td colspan="4"><b>' + (WORDS.financial_effort).toUpperCase() +
                    ': ' + (data.total_costs_year/data.fin_effort.income_per_year*100).toFixed(0) +
                    '&#37;' + '</b></tr>';
    }

    varResult+= '<tr><td colspan="4">'+
                print_result_final_text(data)+
                '</td></tr>';

    varResult+="</table>";
    return varResult;
}

/*Text with sentence of total expenditures*/
function print_result_final_text(data){

    if(data.total_costs_month >= 150 && data.age_months > 6) {

        var text_msg = '<div>' + WORDS.with_this_level_of_costs + '&#32;' +
                       '<b>' + data.age_months + '</b>' + '&nbsp;' + WORDS.months_poss + ':' + '</div>'+
                       '<div class="red_bold_text">'+
                       numberWithSpaces((data.age_months * data.total_costs_month / 100).toFixed(0)*100)+
                       ' ' + WORDS.curr_name_big_plural + '</div></div>';
        return text_msg;
    }
    else{
        return "";
    }
}

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************

//use for varible double quotes " instead of ' because some text varuiables might contain ' such as the English word "don't"
//Example varResult+= "<table class=\"result_table\" id=\"result_table\">"

/*Montlhy costs table*/
function print_costs_table(f1, f2, f3, data) {

    //Depreciation
    var depreciation_text;
    if (data.age_months === 0) {
        depreciation_text = WORDS.error_depreciation_new_car + "&nbsp;&nbsp;";
    } 
    else {
        depreciation_text = "<b>" + WORDS.depreciation + "</b>&nbsp;&nbsp;<br>" + WORDS.aq_value + ": " +
                            f1.auto_initial_cost + WORDS.curr_symbol + "<br>" + WORDS.final_value + ": " +
                            f1.auto_final_cost + WORDS.curr_symbol + "<br>" + WORDS.period_own + ": " +
                            data.age_months + " " + WORDS.months + "<br>(" +
                            f1.auto_initial_cost + WORDS.curr_symbol + "-" +
                            f1.auto_final_cost + WORDS.curr_symbol + ")/" +
                            data.age_months + " " + WORDS.months;
    }

    //Insurance
    var insurance_text;
    switch(f1.insurance_type){

        case "mensal":
            insurance_text = data.monthly_costs.insurance + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month;
            break;
        case "trimestral":
            insurance_text = f1.insurance_value + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester;
            break;
        case "semestral":
            insurance_text = f1.insurance_value + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester;
            break;
        case "anual":
            insurance_text = f1.insurance_value + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;
            break;
    }

    //Credit interests
    var interests_text="<b>" + WORDS.credit_interests + "<\/b>&nbsp;&nbsp;";

    if(f1.cred_auto_s_n == "true") {

        interests_text = "<b>" + WORDS.credit_interests + "</b>&nbsp;&nbsp;<br>" + WORDS.credit_loan2 + ": " +
                         f1.credit_amount +
                         WORDS.curr_symbol + "<br>" + WORDS.credit_period + ": " +
                         f1.credit_period +
                         " " + WORDS.months + "<br>" + WORDS.credit_instalment + ": " +
                         f1.credit_value_p_month +
                         WORDS.curr_symbol + "<br>" + WORDS.credit_residual_value1 + ": " +
                         f1.credit_residual_value +
                         WORDS.curr_symbol + "<br>";

        interests_text += WORDS.credit_total_interests + ": " + data.total_interests + WORDS.curr_symbol + 
                          "<br>(" + data.month_cred + "*" + f1.credit_value_p_month + ")+" + 
                          f1.credit_residual_value + "-" + f1.credit_amount;

        if(data.age_months >= data.month_cred){
            interests_text += "<br>" + WORDS.credit_interests_month + ": " + 
                              data.monthly_costs.credit.toFixed(2) + WORDS.curr_symbol;
        }
        interests_text += "";
    }

    //Inspection
    var inspection_text;
    if (f1.nmr_times_inspec !== 0){
        inspection_text = "<b>" + WORDS.inspection + "</b><br>" +
                          f1.nmr_times_inspec +
                          " " + WORDS.times_costing + " " +
                          f1.inspec_price +
                          " " + WORDS.curr_symbol + " " + WORDS.each_one_during + " " +
                          data.age_months + " " + WORDS.months + "&nbsp;";
    }
    else{
        inspection_text = "<b>" + WORDS.inspection + "</b><br>";
    }
    
    //Taxes
    var cartax_text = "<b>" + WORDS.road_taxes + "</b><br>" +
                      f1.car_tax + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;

    //Fuel
    var fuel_text;
    switch(f2.type_calc_fuel){
        case "km":
            if (f2.take_car_to_job == "false"){
                switch(data.fuel_period_km)
                {
                    case "1":
                        fuel_text = f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.month;
                        break;
                    case "2":
                        fuel_text = f2.distance + " " + WORDS.dist_each_two_months;
                        break;
                    case "3":
                        fuel_text = f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.trimester;
                        break;
                    case "4":
                        fuel_text = f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.semester;
                        break;
                    case "5":
                        fuel_text = f2.distance + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.year;
                        break;
                }
                fuel_text += "<br>" + WORDS.fuel_car_eff + ": " + f2.car_consumption + " " + WORDS.std_fuel_calc + "&nbsp;";
                fuel_text += "<br>" + WORDS.fuel_price1 + ": " + f2.fuel_price + " " + WORDS.curr_symbol + "/" + WORDS.std_volume_short +  "&nbsp;&nbsp;";
            }
            else{
                fuel_text = f2.days_p_week + " " + WORDS.fuel_job_calc1 + "<br>";
                fuel_text += WORDS.you_drive + " " + f2.distance_home2job + " " + WORDS.fuel_dist_home_job1 + "<br>";
                fuel_text += WORDS.you_drive + " " + f2.distance_weekend + " " + WORDS.fuel_dist_no_job1 + "&nbsp;<br>";
                fuel_text += WORDS.you_drive_totally_avg + " " + data.distance_per_month.toFixed(1) + " " + WORDS.std_dist + " " + WORDS.word_per + " " + WORDS.month + " (~30.5 " + WORDS.days + ") <br>";
                fuel_text += WORDS.fuel_car_eff + ": " + f2.car_consumption + " " + WORDS.std_fuel_calc + "<br>";
                fuel_text += WORDS.fuel_price + ": " + f2.fuel_price + " " + WORDS.curr_symbol + "/" + WORDS.std_volume_short;
            }
            break;
        case "euros":
            switch(data.fuel_cost_period)
            {
                case "1":
                    fuel_text = f2.fuel_money + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month;
                    break;
                case "2":
                    fuel_text = f2.fuel_money + " " + WORDS.dist_each_two_months;
                    break;
                case "3":
                    fuel_text = f2.fuel_money + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester;
                    break;
                case "4":
                    fuel_text = f2.fuel_money + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester;
                    break;
                case "5":
                    fuel_text = f2.fuel_money + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;
                    break;
            }
            break;
    }

    //Maintenance
    var maintenance_text = "<b>1/2 " + WORDS.maintenance + "</b><br>" +
                           f2.maintenance + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;

    //Repairs
    var repairs_text = "<b>" + WORDS.rep_improv + "</b><br>" +
                       f2.repairs + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;

    //Tolls
    var tolls_text="<b>" + WORDS.tolls + "</b><br>";
    if(f2.type_calc_tolls == "false") {
        switch(data.tolls_period) {
            case "1":
                tolls_text += f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month;
                break;
            case "2":
                tolls_text += f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.words_per_each + " " + WORDS.two_months;
                break;
            case "3":
                tolls_text += f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester;
                break;
            case "4":
                tolls_text += f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester;
                break;
            case "5":
                tolls_text += f2.tolls + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;
                break;
        }
    }
    else{
        tolls_text += f2.price_tolls_p_day + " " + WORDS.curr_name_plural + " " + 
                      WORDS.during + " " + f2.tolls_days_p_month + " " + WORDS.days + " " + 
                      WORDS.word_per + " " + WORDS.month;
    }
    tolls_text += "";

    //Fines
    var fines_text="<b>" + WORDS.fines + "</b><br>";
    switch(data.fines_period) {
        case "1":
            fines_text += f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month;
            break;
        case "2":
            fines_text += f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.words_per_each + " " + WORDS.two_months;
            break;
        case "3":
            fines_text += f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester;
            break;
        case "4":
            fines_text += f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester;
            break;
        case "5":
            fines_text += f2.fines + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;
            break;
        }
    fines_text+="";

    //washing
    var washing_text = "<b>" + WORDS.washing + "</b><br>";
    switch(data.washing_period) {
        case "1":
            washing_text += f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.month;
            break;
        case "2":
            washing_text += f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.words_per_each + " " + WORDS.two_months;
            break;
        case "3":
            washing_text += f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.trimester;
            break;
        case "4":
            washing_text += f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.semester;
            break;
        case "5":
            washing_text += f2.washing + " " + WORDS.curr_name_plural + " " + WORDS.word_per + " " + WORDS.year;
            break;
        }
    washing_text+="";

    /*************************************************/
    /*************************************************/

    //############
    //Standing/fixed costs table
    var varResult= "";
    varResult += "<table class=\"result_table costs_table\"  id=\"standing_costs_table\">";

    //Standing Costs Header
    varResult += "<tr><td style=\"padding:10px 50px;\" colspan=\"2\"><b>" + WORDS.fixed_costs + "</b><br>" +
                 "<i>" + WORDS.total_fixed_descr + "</i></td></tr>";

    //Costs || Monthly amount
    varResult += "<tr><td style=\"padding:10px 15px 10px 15px;\"><b>" + WORDS.costs + "</b></td>" +
                 "<td><b>" + WORDS.monthly_amount + "</b></td></tr>";

    //standing costs items
    varResult += "<tr><td>" + depreciation_text + "&nbsp;</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.depreciation.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td><b>" + WORDS.insurance + "</b><br>" + insurance_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.insurance.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + interests_text + "&nbsp;</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.credit.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + inspection_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.inspection.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + cartax_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.car_tax.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + maintenance_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(((data.monthly_costs.maintenance)/2).toFixed(1)) + "</td></tr>";

    //TOTAL - Standing costs
    varResult += "<tr><td style=\"padding:4px 10px 4px 0;\"><b>" + WORDS.total_fixed + "</b></td>"+
                 "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + 
                 "<span class=\"per_month_wording\">/" + WORDS.month + "</span></b></td></tr>";

    varResult +="</table>";

    varResult +="<br>";

    //#############
    //Running costs table
    varResult += "<table class=\"result_table costs_table\" id=\"running_costs_table\">";

    //Running Costs Header
    varResult += "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>" + WORDS.running_costs + "</b><br>" +
                "<i>" + WORDS.total_variable_descr + "</i></td></tr>";

    //Costs || Monthly amount
    varResult += "<tr><td style=\"padding:10px 15px 10px 15px;\"><b><?php echo $COSTS ?></b></td>" +
                "<td><b>" + WORDS.monthly_amount + "</b></td></tr>";

    varResult += "<tr><td><b>" + WORDS.fuel + "</b><br>" + fuel_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.fuel.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + maintenance_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(((data.monthly_costs.maintenance)/2).toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + repairs_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.repairs_improv.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td><b>" + WORDS.parking + "</b></td>"+
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.parking.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + tolls_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.tolls.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + fines_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.fines.toFixed(1)) + "</td></tr>";

    varResult += "<tr><td>" + washing_text + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.monthly_costs.washing.toFixed(1)) + "</td></tr>";

    //TOTAL - Running costs
    varResult += "<tr><td style=\"padding:4px 10px 4px 0;\"><b>" + WORDS.total_variable + "</b></td>"+
                 "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + 
                 "<span class=\"per_month_wording\">/" + WORDS.month + "</span></b></td></tr>";

    varResult += "</table>";

    varResult += "<br>";

    //############
    //Costs per unit distance and TOTAL
    varResult += "<table class=\"result_table costs_table total_costs_table\" id=\"total_costs_table\">";

    varResult += "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>" + WORDS.word_total_cap + "</b><br></td></tr>";

    if((typeof data.distance_per_month) !== 'undefined' && data.distance_per_month !== 0){

        varResult += "<tr><td><b>" + WORDS.run_cp_dist + "</b></td>" +
                    "<td>&nbsp;" + currencyShow(data.running_costs_p_unit_distance.toFixed(2)) + "/" + WORDS.std_dist + "</td></tr>";

        varResult += "<tr><td class=\"border_bottom_2px\"><b>" + WORDS.total_cp_dist + "</b></td>" +
                     "<td class=\"border_bottom_2px\">&nbsp;" + currencyShow(data.total_costs_p_unit_distance.toFixed(2)) + "/" + WORDS.std_dist + "</td></tr>";
    }

    varResult += "<tr><td><b>" + WORDS.fixed_costs + "</b></td>"+
                 "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + "<span class=\"per_month_wording\">/" + WORDS.month + "</span></b></td></tr>";

    varResult += "<tr><td><b>" + WORDS.running_costs + "</b></td>"+
                 "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + "<span class=\"per_month_wording\">/" + WORDS.month + "</span></b></td></tr>";

    varResult += "<tr><td style=\"padding:6px 10px 6px 0;\"><b>" + WORDS.word_total_cap + "</b></td>"+
                 "<td>&nbsp;<b>" + currencyShow(data.total_costs_month.toFixed(0)) + "<span class=\"per_month_wording\">/" + WORDS.month + "</span></b></td></tr>";

    varResult += "</table>";


    return varResult;
}

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


/*Financial effort table (result_table3)*/
function print_feffort_table(f1, f2, f3, data){

    var varResult = "";
    varResult+="<table class=\"result_table\" id=\"result_table3\">";
    varResult+="<tr><td colspan=\"2\"><b>" + WORDS.financial_effort + "</b></td></tr>";
    //income
    varResult+="<tr><td colspan=\"2\"><b>" + WORDS.extra_data_income + "</b></tr>";
    switch(f3.income_type){
        case 'year':
            varResult += "<tr><td>" + WORDS.net_income_per + " " + WORDS.year + "</td>" +
                         "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                         "<tr><td>" + WORDS.average_net_income_per + " " + WORDS.month + "</td>" +
                         "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>";
            break;
        case 'month':
            varResult += "<tr><td>" + WORDS.net_income_per + " " + WORDS.month + "</td>" +
                         "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                         "<tr><td>" + WORDS.number_of_months + "</td>" +
                         "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                         "<tr><td>" + WORDS.average_net_income_per + " " + WORDS.month + "</td>" +
                         "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>" +
                         "<tr><td>" + WORDS.average_net_income_per + " " + WORDS.year + "</td>" +
                         "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "</td></tr>";
            break;
        case 'week':
            varResult += "<tr><td>" + WORDS.net_income_per + " " + WORDS.week + "</td>" +
                         "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                         "<tr><td>" + WORDS.number_of_weeks + "</td>" +
                         "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                         "<tr><td>" + WORDS.average_net_income_per + " " + WORDS.month + "</td>" +
                         "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                         "<tr><td>" + WORDS.average_net_income_per + " " + WORDS.year + "</td>" +
                         "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "</td></tr>";
            break;
        case 'hour':
            varResult += "<tr><td>" + WORDS.net_income_per + " " + WORDS.hour + "</td>" +
                         "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                         "<tr><td>" + WORDS.number_of_hours + "</td>" +
                         "<td>" + data.fin_effort.income_hours_per_week + " " + WORDS.hour_abbr + "</td></tr>"+
                         "<tr><td>" + WORDS.number_of_weeks + "</td>" +
                         "<td>" + data.fin_effort.income_per_type + "</td></tr>"+
                         "<tr><td>" + WORDS.average_net_income + " " + WORDS.month + "</td>" +
                         "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                         "<tr><td>" + WORDS.average_net_income_per + " " + WORDS.year + "</td>" +
                         "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "</td></tr>";
            break;
    }
    //working time
    if(f3.income_type != 'hour'){
        varResult+=     "<tr><td colspan=\"2\"><b>" + WORDS.extra_data_working_time + "</b></tr>";
        if(f3.is_working_time == 'true'){
            varResult += "<tr><td>" + WORDS.hours_per + " " + WORDS.week + "</td>" +
                         "<td>" + data.fin_effort.time_hours_per_week + " " + WORDS.hour_abbr + "</td></tr>" +
                         "<tr><td>" + WORDS.months_per + " " + WORDS.year + "</td>" +
                         "<td>" + data.fin_effort.time_month_per_year+"</td></tr>" +
                         "<tr><td>" + WORDS.average_working_hours_per + " " + WORDS.month + "</td>" +
                         "<td>" + data.fin_effort.aver_work_time_per_m.toFixed(1) + " " + WORDS.hour_abbr + "</td></tr>" +
                         "<tr><td>" + WORDS.working_hours_per + " " + WORDS.year + "</td>" +
                         "<td>" + data.fin_effort.work_hours_per_y.toFixed(1) + " " + WORDS.hour_abbr + "</td></tr>";
        }
        else{
            varResult += "<tr><td colspan=\"2\">" + WORDS.working_time_message + "</td></tr>";
        }
    }
    varResult += "<tr><td>" + WORDS.average_net_income_per + " " + WORDS.hour + "</td>" +
                 "<td>&nbsp;" + currencyShow(data.fin_effort.aver_income_per_hour.toFixed(1)) + "</td></tr>";

    //distance
    varResult+= "<tr><td colspan=\"2\"><b>" + WORDS.distance + "</b></td></tr>";
    if((f2.type_calc_fuel != 'km' && f3.drive_to_work == 'true') || (f2.type_calc_fuel != 'km' && f2.take_car_to_job == 'true')){
        varResult +=  "<tr><td>" + WORDS.dist_home_job + "</td>"  +
                      "<td>" + parseInt(f3.dist_home_job).toFixed(1) + " " + WORDS.std_dist + "</td></tr>"+
                      "<tr><td>" + WORDS.days_drive_job + "</td>"  +
                      "<td>" + f3.drive_to_work_days_per_week + " " + WORDS.days + "</td></tr>" +
                      "<tr><td>" + WORDS.dist_jorney_weekend + "</td>" +
                      "<td>" + parseInt(f3.journey_weekend).toFixed(1) + " " + WORDS.std_dist + "</td></tr>"+
                      "<tr><td>" + WORDS.average_dist_per_week + "</td>" +
                      "<td>" + data.driving_distance.aver_drive_per_week.toFixed(1) + " " + WORDS.std_dist + "</td></tr>";
    }

    varResult +=  "<tr><td>" + WORDS.you_drive_per + " " + WORDS.month + "</td>" +
                  "<td>" + data.distance_per_month.toFixed(1) + " " + WORDS.std_dist + "</td></tr>" +
                  "<tr><td>" + WORDS.you_drive_per + " " + WORDS.year + "</td>" +
                  "<td>" + data.driving_distance.drive_per_year.toFixed(1) + " " + WORDS.std_dist + "</td></tr>";

    //time spent in driving
    varResult +=  "<tr><td colspan=\"2\"><b>" + WORDS.extra_data_time_spent_in_driving + "</b></td></tr>";

    if(f3.drive_to_work == 'true' || f2.take_car_to_job == 'true'){
        varResult += "<tr><td>" + WORDS.minutes_home_job + "</td>" +
                     "<td>" + f3.time_home_job + " " + WORDS.min + "</td></tr>" +
                     "<tr><td>" + WORDS.days_drive_to_job + "</td>" +
                     "<td>" + f3.drive_to_work_days_per_week + " " + WORDS.days + "</td></tr>" +
                     "<tr><td>" + WORDS.time_drive_weekend + "</td>" +
                     "<td>" + f3.time_weekend + " " + WORDS.min + "</td></tr>" +
                     "<tr><td>" + WORDS.minutes_drive_per + " " + WORDS.week + "</td>" +
                     "<td>" + data.time_spent_driving.min_drive_per_week + " " + WORDS.min + "</td></tr>";
    }
    else{
        varResult += "<tr><td>" + WORDS.minutes_drive_per + " " + WORDS.day + "</td>" +
                     "<td>" + f3.min_drive_per_day + " " + WORDS.min + "</td></tr>" +
                     "<tr><td>" + WORDS.days_drive_per_month + "</td>" +
                     "<td>" + f3.days_drive_per_month + " " + WORDS.days + "</td></tr>";
    }

    varResult += "<tr><td>" + WORDS.hours_drive_per + " " + WORDS.month + "</td>" +
                 "<td>" + data.time_spent_driving.hours_drive_per_month.toFixed(1) + " " + WORDS.hour_abbr + "</td></tr>"+
                 "<tr><td>" + WORDS.hours_drive_per + " " + WORDS.year + "</td>" +
                 "<td>" + data.time_spent_driving.hours_drive_per_year.toFixed(1) + " " + WORDS.hour_abbr + "</td></tr>";

    //financial effort
    varResult += "<tr><td colspan=\"2\"><b>" + WORDS.financial_effort +
                 ': ' + (data.total_costs_year/data.fin_effort.income_per_year*100).toFixed(0) +
                 '&#37;</b>' +
                 "<tr><td>" + WORDS.total_costs_per_year + "</td>" +
                 "<td>" + currencyShow(data.fin_effort.total_costs_year.toFixed(1)) + "</td></tr>" +
                 "<tr><td>" + WORDS.hours_to_afford_car + "</td>"  +
                 "<td>" + data.fin_effort.hours_per_year_to_afford_car.toFixed(1) + " " + WORDS.hour_abbr + "</td></tr>"+
                 "<tr><td>" + WORDS.months_to_afford_car + "</td>" +
                 "<td>" + data.fin_effort.month_per_year_to_afford_car.toFixed(2)+"</td></tr>"+
                 "<tr><td>" + WORDS.days_car_paid + "</td>" +
                 "<td>" + Math.ceil(data.fin_effort.days_car_paid) + " " + WORDS.days + "</td></tr>";


    //speed
    varResult += "<tr><td>" + WORDS.aver_yearly + " " + WORDS.kinetic_speed + "</td>"+
                 "<td>" + data.kinetic_speed.toFixed(1) + " " + WORDS.std_dist + "/h</td></tr>";

    varResult += "<tr><td>" + WORDS.aver_yearly + " " + 
                 "<a href=\"./docs/consumer_speed.html\" target=\"_blank\">" + 
                 WORDS.virtual_speed + "</a></td>" +
                 "<td>" + data.virtual_speed.toFixed(1) + " " + WORDS.std_dist + "/h</td></tr>";

    varResult += "</table>";

    return varResult;
}


//******************************************************************************************************************************************************
//******************************************************************************************************************************************************

/*Public transports table (result_table2)*/
function print_AlternativeToCarCosts_table(f1, f2, f3, data, res_uber_obj, country){

    var varResult = "";
    if(data.public_transports.display_pt()) {

        DISPLAY.result.public_transports = true; //global variable
        var tp_text, outros_tp_text, taxi_text;

        tp_text = "<b>" + WORDS.pub_trans_text + "</b><br>" + WORDS.fam_nbr + ": " +
                  f3.n_pess_familia + " " + WORDS.person_or_people +
                  "<br>" + WORDS.pass_month_avg + ": " +
                  f3.monthly_pass_cost + WORDS.curr_symbol;

        if(data.public_transports.display_other_pt){
            outros_tp_text="<b>" + WORDS.other_pub_trans + "</b><br>" + WORDS.other_pub_trans_desc + " ";
        }
        taxi_text = "<b>" + WORDS.taxi_desl + "<\/b><br>" + data.public_transports.km_by_taxi.toFixed(1) + " <?php echo $STD_DIST ?> <?php echo $ON_TAXI_PAYING ?> " + data.public_transports.taxi_price_per_km.toFixed(1) + WORDS.curr_symbol + "/" + WORDS.std_dist;

        //starts HTML table
        varResult += "<table class=\"result_table\" id=\"result_table2\">";
        //header
        varResult += "<tr><td><b>" + WORDS.costs + "</b><br></td>"+
                     "<td><b>" + WORDS.monthly_amount + "</b></td></tr>";
        //items
        varResult += "<tr><td>" + tp_text + "</td>" +
                     "<td>&nbsp;" + currencyShow(data.public_transports.total_price_pt.toFixed(1)) + "</td></tr>";

        varResult += "<tr><td>" + taxi_text + "</td>" +
                     "<td>&nbsp;" + currencyShow(data.public_transports.taxi_cost.toFixed(1)) + "</td></tr>";

        //in case other means of transport are shown besides taxi and urban public transports
        if(data.public_transports.display_other_pt) {
            varResult += "<tr><td>" + outros_tp_text + "</td>" +
                         "<td>&nbsp;"+currencyShow(data.public_transports.other_pt.toFixed(1))+"</td></tr>";
        }
        varResult += "<tr><td style=\"padding:6px 10px 6px 0;\"><b>" + WORDS.word_total_cap + "</b></td>"+
                     "<td><b>" + currencyShow(data.public_transports.total_altern.toFixed(0)) + "<span class=\"per_month_wording\">/<?php echo $MONTH ?></span></b></td></tr>";

        varResult += "</table>";
    }
    else{
        DISPLAY.result.public_transports = false; //global variable
    }

    //UBER
    if(SWITCHES.uber && !$.isEmptyObject(res_uber_obj)){
        DISPLAY.result.uber = true; //says uber table is to be printed; global variable

        //add source in table for uber URL
        var uber_url = "http://www.uber.com/" + LANGUAGE + "/cities/";
        var uber_url_HTML = "<sup><a href=\"" + uber_url + "\">[*]</a></sup>";

        //if previous table is printed, add a breakline
        if (data.public_transports.display_pt()){
            varResult += "<br>";
        }

        //in which driver can replace every km by uber
        //the remaining money is applied to public transport
        if(res_uber_obj.result_type == 1){
            //starts HTML table
            varResult += "<table class=\"result_table uber_table\" id=\"result_table_uber\">";

            varResult += "<tr><td><b>UBER - " + WORDS.costs + " " + WORDS.word_per + " " +  WORDS.std_dist_full + "</b>" + uber_url_HTML + "</td>" +
                         "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + WORDS.std_dist + "</td></tr>";

            varResult += "<tr><td><b>UBER - " + WORDS.costs + " " + WORDS.word_per + " " +  WORDS.minutes + "</b>" + uber_url_HTML + "</td>" +
                         "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "<?php echo $MIN ?></td></tr>";

            varResult += "<tr><td><b>" + WORDS.fuel_dist + " " + WORDS.word_per + " " + WORDS.month + "</b><br></td>"+
                         "<td>" + res_uber_obj.dpm.toFixed(0) + " " + WORDS.std_dist_full + "</td></tr>";

            varResult += "<tr><td><b>" + WORDS.minutes_drive_per + " " + WORDS.month + "</b></td>" +
                         "<td>" + res_uber_obj.mdpm.toFixed(0) + " " + WORDS.minutes + "</td></tr>";

            varResult += "<tr><td><b>UBER: " + WORDS.costs + " - " + WORDS.word_total_cap + "</b></td>" +
                         "<td><b>" + currencyShow(res_uber_obj.tuc.toFixed(0)) + "</b></td></tr>";

            varResult += "<tr><td><b>" + WORDS.other_pub_trans + "</b><br>" + WORDS.other_pub_trans_desc + "</td>" +
                         "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";

            varResult += "<tr><td><b>" + WORDS.word_total_cap + "</b></td>"+
                         "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "<span class=\"per_month_wording\">/" + WORDS.month + "</span></b></td></tr>";

            varResult += "</table>";
        }

        //the case where uber equivalent is more expensive
        //the driver shall spend the equivalent car money in public transports and the remaining in uber
        else if(res_uber_obj.result_type == 2){
            //starts HTML table
            varResult += "<table class=\"result_table uber_table uber_table2\" id=\"result_table_uber\">";

            varResult += "<tr><td><b>" + WORDS.pub_trans_text + "</b><br><?php echo $FAM_NBR ?>: " + f3.n_pess_familia + " " + WORDS.person_or_people +
                         "<br>" + WORDS.pass_month_avg + ": " + f3.monthly_pass_cost + WORDS.curr_symbol + "</td>" +
                         "<td><b>" + currencyShow(res_uber_obj.tcpt.toFixed(0)) + "</b></td></tr>";

            varResult += "<tr><td><b>UBER - " + WORDS.costs + " " + WORDS.word_per + " " + WORDS.std_dist_full + "</b>" + uber_url_HTML + "</td>" +
                         "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + "<?php echo $STD_DIST ?></td></tr>";

            varResult += "<tr><td><b>UBER - " + WORDS.costs + " " + WORDS.word_per + " " + WORDS.minutes + "</b>" + uber_url_HTML + "</td>" +
                         "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "<?php echo $MIN ?></td></tr>";

            varResult += "<tr><td><b>" + WORDS.kinetic_speed_title + "</b></td>" +
                         "<td>" + data.kinetic_speed.toFixed(2) + " " + WORDS.std_dist + "/" + WORDS.hour_abbr + "</td></tr>";

            varResult += "<tr><td><b>UBER - " + WORDS.std_dist_full + " " + WORDS.word_per + " " + WORDS.month + "</b></td>" +
                         "<td>" + res_uber_obj.dist_uber.toFixed(0) + " " + "<?php echo $STD_DIST_FULL ?></td></tr>";

            varResult += "<tr><td><b>UBER: " + WORDS.costs + " - " + WORDS.word_total_cap + "</b></td>" +
                         "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";

            varResult += "<tr><td><b>" + WORDS.word_total_cap + "</b></td>"+
                         "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "<span class=\"per_month_wording\">/<?php echo $MONTH ?></span></b></td></tr>";

            varResult += "</table>";
        }
    }
    else{
        DISPLAY.result.uber = false; //says uber table is not to be printed; global variable
    }

    return varResult;
}

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


/*External costs table (result_table4)*/
function print_extern_table(f1, f2, f3, data){

    var epa_text      = "<b>Emissões de poluentes atmosféricos</b><br>Valor aproximado: " + data.external_costs.polution + WORDS.curr_symbol + "/" + WORDS.std_dist;                 
    var egee_text     = "<b>Emissões de gases de efeito de estufa</b><br>Valor aproximado: " + data.external_costs.ghg + WORDS.curr_symbol + "/" + WORDS.std_dist;
    var ruido_text    = "<b>Poluição sonora</b><br>Valor aproximado: " + data.external_costs.noise + WORDS.curr_symbol + "/" + WORDS.std_dist;
    var sr_text       = "<b>Sinistralidade rodoviária</b><br>Valor aproximado: " + data.external_costs.fatalities + WORDS.curr_symbol + "/" + WORDS.std_dist;
    var cgstn_text    = "<b>Congestionamento</b><br>Valor aproximado: " + data.external_costs.congestion + WORDS.curr_symbol + "/" + WORDS.std_dist;
    var ifr_estr_text = "<b>Desgaste das infraestruturas rodoviárias</b><br>Valor aproximado: " + data.external_costs.infrastr + WORDS.curr_symbol + "/" + WORDS.std_dist;
    var source_ext_costs  = "<b>Fonte dos dados:</b><br><i><a href=\"" + data.external_costs.handbook_extern_URL + "\">Handbook on estimation of external costs in the transport sector</a>, </i>Comissão Europeia";         

    var varResult     = "";

    if(COUNTRY=="PT" && isDef(data.distance_per_month)){

        varResult+="<table class=\"result_table\" id=\"result_table4\">";

        //header
        varResult += "<tr><td><b>Custos externos</b><br>Percorre " + (1 * data.distance_per_month).toFixed(1) + " " + WORDS.std_dist + "/" + WORDS.month + "</td>" +
                     "<td><b>" +  WORDS.monthly_amount + "</b></td></tr>";

        //external costs items
        varResult += "<tr><td>" + epa_text + "</td>" +
                     "<td>&nbsp;" + WORDS.curr_symbol + " " + (data.external_costs.polution * data.distance_per_month).toFixed(1) + "</td></tr>";

        varResult += "<tr><td>" + egee_text + "</td>" +
                     "<td>&nbsp;" + WORDS.curr_symbol + " " + (data.external_costs.ghg * data.distance_per_month).toFixed(1) + "</td></tr>";

        varResult += "<tr><td>" + ruido_text + "</td>" +
                     "<td>&nbsp;" + WORDS.curr_symbol + " " + (data.external_costs.noise * data.distance_per_month).toFixed(1) + "</td></tr>";

        varResult += "<tr><td>" + sr_text + "</td>" +
                     "<td>&nbsp;" + WORDS.curr_symbol + " " + (data.external_costs.fatalities * data.distance_per_month).toFixed(1) + "</td></tr>";

        varResult += "<tr><td>" + cgstn_text + "</td>" +
                     "<td>&nbsp;" + WORDS.curr_symbol + " " + (data.external_costs.congestion * data.distance_per_month).toFixed(1) + "</td></tr>";

        varResult += "<tr><td>" + ifr_estr_text + "</td>" +
                     "<td>&nbsp;" + WORDS.curr_symbol + " " + (data.external_costs.infrastr * data.distance_per_month).toFixed(1) + "</td></tr>";

         //total
        varResult += "<tr><td style=\"padding:6px 10px 6px 0;\"><b>" + WORDS.word_total_cap + "</b></td>" +
                     "<td><b>" + WORDS.curr_symbol + "&nbsp;" + data.external_costs.total_exter().toFixed(0) + "<span class=\"per_month_wording\">/" + WORDS.month + "</span></b></td></tr>";

        //reference to source
        varResult += "<tr><td colspan=\"2\">"+ source_ext_costs +"</td></tr>";

        varResult += "</table>";
    }

    return varResult;
}

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


function drawChartResult(){

    //When Google Charts are not available
    if(!SERVICE_AVAILABILITY.g_charts || !SWITCHES.g_charts){
        return;
    }

    var frameWidth = DISPLAY.centralFrameWidth;

    var width_off = DISPLAY.charts.WIDTH_PX_OFF;        //frame width in px under which the charts are not shown
    var minRatio = DISPLAY.charts.MIN_RATIO;            //minimum ratio width of charts as frameWitdh becomes too wide
    var minRatioWidth = DISPLAY.charts.MIN_RATIO_WIDTH; //width on which the ratio is MIN_RATIO and above which the ration is fixed on MIN_RATIO

    //it doesn't print the charts in very small screen width
    if (frameWidth < width_off) {
        $("#pie_chart_div").css('display', 'none');
        $("#bar_chart_div").css('display', 'none');
        return;
    }

    //make charts width adjustments according to the div_width (uses linear expression y=mx+b)
    var ratio;
    if (frameWidth > minRatioWidth) {
        ratio = minRatio;
    }
    else if(frameWidth > width_off) {
        var m = (minRatio - 1) / (minRatioWidth - width_off);
        var b = 1 - m * width_off;
        ratio = m * frameWidth + b;
    }
    frameWidth = ratio * frameWidth;

    //prepares the the correspondent divs
    $("#pie_chart_div").css('display', 'inline-block');
    $("#pie_chart_div").css('width', '95%');
    $("#bar_chart_div").css('display', 'inline-block');
    $("#bar_chart_div").css('width', '95%');

    //draw Pie Chart
    var pie_chart_width=parseInt(frameWidth * 1);
    var pie_chart_height=parseInt(pie_chart_width*4/6);

    drawMonthlyCostsPieChart(pie_chart_width,  pie_chart_height);

    //draw Bar Chart
    var bar_chart_width = parseInt(frameWidth * 0.8);
    var bar_chart_height = parseInt(bar_chart_width*45/50);

    drawMonthlyCostsBarChart(bar_chart_width, bar_chart_height);

    //adjust the charst divs
    $("#pie_chart_div").css('display', 'inline-block');
    $("#pie_chart_div").css('width', 'auto');
    $("#bar_chart_div").css('display', 'inline-block');
    $("#bar_chart_div").css('width', 'auto');

    //draw Financial Effort Chart
    if(CALCULATED.data.fin_effort_calculated){//if the financial effort was calculated
        var fe_chart_width=parseInt(frameWidth *0.9);
        var fe_chart_height=parseInt(fe_chart_width*1/2);

        drawFinEffortChart(parseFloat(CALCULATED.data.fin_effort.total_costs_year.toFixed(0)),
                           parseFloat(CALCULATED.data.fin_effort.income_per_year.toFixed(0)),
                           fe_chart_width,
                           fe_chart_height
                    );

        $("#fin_effort_chart_div").css('display', 'inline-block');
        $("#fin_effort_chart_div").css('width', 'auto');
    }

    //draw Alternative to Car Costs Chart
    if(CALCULATED.data.alternative_to_car_costs_calculated){//if the alternative to car transports were calculated
        var alter_to_car_chart_width=parseInt(frameWidth * 0.8);
        var alter_to_car_chart_height=parseInt(alter_to_car_chart_width*55/50);

        drawAlterToCarChart(alter_to_car_chart_width, alter_to_car_chart_height);

        $("#alternative_carcosts_chart_div").css('display', 'inline-block');
        $("#alternative_carcosts_chart_div").css('width', 'auto');
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

