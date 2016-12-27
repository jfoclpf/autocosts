<?php Header("content-type: application/x-javascript");
include($_SERVER['DOCUMENT_ROOT'].'/countries/' . $_GET['country'] . '.php');
$GLOBALS['country'] = $_GET['country'];
 ?>

//function that is run when user clicks "run/calculate"
Run = function(){	

    //test if the form user inputs are correct
    if (!is_userdata_formpart1_ok()) return;
    if (!is_userdata_formpart2_ok()) return;
    if (!is_userdata_formpart3_ok()) return;

    //for each form part gets object with content
    var f1 = get_form_part1();
    var f2 = get_form_part2();
    var f3 = get_form_part3();
    
    //country object with country specific variables
    var country = {
        currency: '<? echo $CURR_CODE ?>',
        distance_std: <? echo $distance_std_option; ?>,
        fuel_efficiency_std: <? echo $fuel_efficiency_std_option; ?>,
        fuel_price_volume_std: <? echo $fuel_price_volume_std; ?>,
        taxi_price: <?php echo $TAXI_PRICE_PER_DIST ?>
    };
    
    //calculate costs
    var data = calculate_costs(f1, f2, f3, country);
    CalculatedData = data; //assigns to global variable

    //hides the form input
    $('#input_div').hide();
    
    //main table
    var main_table_HTML = print_main_table(f1, f2, f3, data);
    $('#main_table').html(main_table_HTML);
    $('#main_table, #main_table_section').show();
    
    //monthly costs table  
    var monthly_costs_HTML = print_costs_table(f1, f2, f3, data);
    $('#monthly_costs').html(monthly_costs_HTML);
    $('#monthly_costs, #monthly_costs_section').show();
    
    //financial result table 
    var fin_effort_table_HTML = print_feffort_table(f1, f2, f3, data);
    $('#fin_effort').html(fin_effort_table_HTML);
    $('#fin_effort, #fin_effort_section').show();
    
    //public transports table 
    var public_transport_table_HTML = print_publict_table(f1, f2, f3, data, country);
    if(public_transport_table_HTML != ""){
        $('#public_transp, #public_transp_section').show();
        $('#public_transp').html(public_transport_table_HTML);
        public_transp_bool = true; //global variable
    }
    else{
        $('#public_transp_section').hide();
        public_transp_bool = false;
    }
    
    //external costs table
    var extern_costs_table_table_HTML = print_extern_table(f1, f2, f3, data);
    if (extern_costs_table_table_HTML != ""){
        $('#extern_costs').html(extern_costs_table_table_HTML);
        $('#extern_costs, #exten_costs_section').show();
        extern_costs_bool = true; //global variable
    }
    else{
        $('#exten_costs_section').hide();
        extern_costs_bool = false;
    }
    
    //shows buttons
    $('#result_buttons_div, #buttons_section').show();
    //deactivates downloadPDF button until PDF files are loaded
    if (!hasLoadedPart[3]){
        $('#generate_PDF').prop('disabled',true).addClass('buttton_disabled');
    }
    
    //enlarges center div
    $('#div1_td').css('width', '15%');
    $('#div3_td').css('width', '15%');
    
    //gets result frame width to draw charts within it
    var frame_witdh = document.getElementById('div2').offsetWidth;
    drawChartResult(frame_witdh, data);
        
    //hides description, left and right columns
    $('#div1').css('display', 'none');
    $('#div3').css('display', 'none');
    $('#description').html('');
        
    //global variable indicating the results are being shown
    ResultIsShowing=true;
    
    return true;
}

//*************************************************************************************
//*************************************************************************************

/*Total main first table (result_table0)*/
function print_main_table(f1, f2, f3, data) {
    
    var varResult= "";
    //main table
    varResult+= '<table class="result_table" id="result_table0">';
    //header
    varResult+= '<tr><td style="padding:7px;" colspan="4"><b><?php echo mb_convert_case($YOUR_CAR_COSTS_YOU, MB_CASE_UPPER, "UTF-8") ?></b></td></tr>';
    
    varResult+= '<tr>';
    
    varResult+= '<td><b>' + countryCheck(data.total_costs_month.toFixed(0)) + '</b><br>';
    varResult+= '<?php echo $WORD_PER."<br>".$MONTH ?></td>';
    
    varResult+= '<td><b>' + countryCheck((data.total_costs_month*3).toFixed(0)) + '</b><br>';
    varResult+= '<?php echo $WORD_PER."<br>".$TRIMESTER ?>';
    
    varResult+= '<td><b>' + countryCheck((data.total_costs_month*6).toFixed(0)) + '</b><br>';
    varResult+= '<?php echo $WORD_PER."<br>".$SEMESTER ?></td>';
    
    varResult+= '<td><b>' + countryCheck(data.total_costs_year.toFixed(0)) + '</b><br>';
    varResult+= '<?php echo $WORD_PER."<br>".$YEAR ?></td>';
    
    varResult+= '</tr>';
    
    varResult+= '<tr><td colspan="4"><b><?php echo mb_convert_case($FINANCIAL_EFFORT, MB_CASE_UPPER, "UTF-8") ?>'
             + ': ' + (data.total_costs_year/data.fin_effort.income_per_year*100).toFixed(0) 
             + '&#37;' + '</b></tr>';

    varResult+= '<tr><td colspan="4">'
             + print_result_final_text(data) 
             + '</td></tr>';
    
    varResult+="</table>";      
    return varResult;
}

/*Text with sentence of total expenditures*/
function print_result_final_text(data){
    
    if(data.total_costs_month >= 150 && data.age_months > 6) {
        
        var text_msg = '<div><?php echo $WITH_THIS_LEVEL_OF_COSTS ?> ' 
                     + '<b>' + data.age_months + '</b> <?php echo $MONTHS_POSS.":" ?></div>'
                     + '<div class="red_bold_text">'
                     + numberWithSpaces((data.age_months * data.total_costs_month / 100).toFixed(0)*100) 
                     + ' ' + '<?php echo $CURR_NAME_BIG_PLURAL ?></div></div>';
        return text_msg;
    }
    else{
        return "";
    }
}

/*Montlhy costs table (result_table1)*/
function print_costs_table(f1, f2, f3, data) {
    
    //Depreciation
    var depreciation_text;
    if (data.age_months == 0) {    
        depreciation_text = "<?php echo $ERROR_DEPRECIATION_NEW_CAR ?>&nbsp;&nbsp;";
    } else {
        depreciation_text = "<b><?php echo $DEPRECIATION ?><\/span></b>&nbsp;&nbsp;<br><?php echo $AQ_VALUE ?>: "
            + f1.auto_initial_cost + "<?php echo $CURR_SYMBOL ?><br><?php echo $FINAL_VALUE ?>: "
            + f1.auto_final_cost + "<?php echo $CURR_SYMBOL ?><br><?php echo $PERIOD_OWN ?>: "
            + data.age_months + " <?php echo $MONTHS ?><br>("
            + f1.auto_initial_cost + "<?php echo $CURR_SYMBOL ?>-"
            + f1.auto_final_cost + "<?php echo $CURR_SYMBOL ?>)/"
            + data.age_months + " <?php echo $MONTHS ?>";
    }
    
    //Insurance
    var insurance_text;
    switch(f1.insurance_type)
    {
        case "semestral":
            insurance_text = f1.insurance_value + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $SEMESTER ?>";
            break;
        case "anual":
            insurance_text = f1.insurance_value + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
            break;
        case "mensal":
            insurance_text = data.monthly_costs.insurance + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?>";
            break;
        case "trimestral":
            insurance_text = f1.insurance_value + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $TRIMESTER ?>";
            break;
    }
    
    //Credit interests
    var interests_text="<b><?php echo $CREDIT_INTERESTS ?><\/b>&nbsp;&nbsp;";
    
    if(f1.cred_auto_s_n == "true") {

        interests_text = "<b><?php echo $CREDIT_INTERESTS ?></b>&nbsp;&nbsp;<br><?php echo $CREDIT_LOAN2 ?>: "
                    + f1.credit_amount
                    + "<?php echo $CURR_SYMBOL ?><br><?php echo $CREDIT_PERIOD ?>: "
                    + f1.credit_period
                    + " <?php echo $MONTHS ?><br><?php echo $CREDIT_INSTALMENT ?>: "
                    + f1.credit_value_p_month
                    + "<?php echo $CURR_SYMBOL ?><br><?php echo $CREDIT_RESIDUAL_VALUE1 ?>: "
                    + f1.credit_residual_value
                    + "<?php echo $CURR_SYMBOL ?><br>";    

        interests_text += "<?php echo $CREDIT_TOTAL_INTERESTS ?>: "+data.total_interests+"<?php echo $CURR_SYMBOL ?><br>(" + data.month_cred + "*"+ f1.credit_value_p_month + ")+" + f1.credit_residual_value + "-" + f1.credit_amount;

        if(data.age_months >= data.month_cred)
            interests_text += "<br><?php echo $CREDIT_INTERESTS_MONTH ?>: "+data.monthly_costs.credit.toFixed(2)+"<?php echo $CURR_SYMBOL ?>";
        interests_text += "";
    } 
    
    //Inspection
    var inspection_text;
    if (f1.nmr_times_inspec != 0){
        inspection_text = "<b><?php echo $INSPECTION ?></b><br>"
                      + f1.nmr_times_inspec
                      + " <?php echo $TIMES_COSTING ?> "
                      + f1.inspec_price
                      + " <?php echo $CURR_SYMBOL ?> <?php echo $EACH_ONE_DURING ?> "
                      + data.age_months + " <?php echo $MONTHS ?>&nbsp;";
    }
    else        
        inspection_text = "<b><?php echo $INSPECTION ?></b><br>";
    
    //Taxes
    var cartax_text = "<b><?php echo $ROAD_TAXES ?></b><br>"
                 + f1.car_tax + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
    
    //Fuel
    var fuel_text;
    switch(f2.type_calc_fuel){
        case "km":                     
            if (f2.take_car_to_job == "false"){
                switch(data.fuel_period_km)
                {
                    case "1":
                        fuel_text = f2.distance + " <?php echo $STD_DIST ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?>";
                        break;
                    case "2":                   
                        fuel_text = f2.distance + " <?php echo $DIST_EACH_TWO_MONTHS ?>";
                        break;
                    case "3":                   
                        fuel_text = f2.distance + " <?php echo $STD_DIST ?> <?php echo $WORD_PER ?> <?php echo $TRIMESTER ?>";
                        break;
                    case "4":                   
                        fuel_text = f2.distance + " <?php echo $STD_DIST ?> <?php echo $WORD_PER ?> <?php echo $SEMESTER ?>";
                        break;
                    case "5":                   
                        fuel_text = f2.distance + " <?php echo $STD_DIST ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
                        break;
                }
                fuel_text = fuel_text + "<br>" + "<?php echo $FUEL_CAR_EFF ?>: " + f2.car_consumption + " <?php echo $STD_FUEL_CALC ?>&nbsp;";
                fuel_text = fuel_text + "<br>" + "<?php echo $FUEL_PRICE1 ?>: " + f2.fuel_price + " <?php echo $CURR_SYMBOL ?>/<?php echo $STD_VOLUME_SHORT ?>&nbsp;&nbsp;";
            }
            else{
                fuel_text = f2.days_p_week + " <?php echo $FUEL_JOB_CALC1 ?> <br>";
                fuel_text = fuel_text + "<?php echo $YOU_DRIVE ?> " + f2.distance_home2job + " <?php echo $FUEL_DIST_HOME_JOB1 ?> <br>";
                fuel_text = fuel_text + "<?php echo $YOU_DRIVE ?> " + f2.distance_weekend + " <?php echo $FUEL_DIST_NO_JOB1 ?>&nbsp;<br>";
                fuel_text = fuel_text + "<?php echo $YOU_DRIVE_TOTTALY_AVG ?> " + data.distance_per_month.toFixed(1) + " <?php echo $STD_DIST ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?> (~30.5 <?php echo $DAYS ?>) <br>";
                fuel_text = fuel_text + "<?php echo $FUEL_CAR_EFF ?>: " + f2.car_consumption + " <?php echo $STD_FUEL_CALC ?>";
                fuel_text = fuel_text + "<br>" + "<?php echo $FUEL_PRICE ?>: " + f2.fuel_price + " <?php echo $CURR_SYMBOL ?>/<?php echo $STD_VOLUME_SHORT ?>";
            }
            break;
        case "euros":
            switch(data.fuel_cost_period)
            {
                case "1":
                    fuel_text = f2.fuel_money + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?>";
                    break;
                case "2":                   
                    fuel_text = f2.fuel_money + " <?php echo $DIST_EACH_TWO_MONTHS ?>";
                    break;
                case "3":                   
                    fuel_text = f2.fuel_money + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $TRIMESTER ?>";
                    break;
                case "4":                   
                    fuel_text = f2.fuel_money + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $SEMESTER ?>";
                    break;
                case "5":                   
                    fuel_text = f2.fuel_money + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
                    break;
            }
            break;
    }
    
    //Maintenance
    var maintenance_text = "<b>1/2 <?php echo $MAINTENANCE ?></b><br>"
                      + f2.maintenance + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
    
    //Repairs
    var repairs_text = "<b><?php echo $REP_IMPROV ?><\/span></b><br>"
                        + f2.repairs + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
    
    //Tolls
    var tolls_text="<b><?php echo $TOLLS ?></b><br>";
    if(f2.type_calc_tolls == "false") {
        switch(data.tolls_period) {
            case "1":
                tolls_text += f2.tolls + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?>";
                break;
            case "2":
                tolls_text += f2.tolls + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORDS_PER_EACH ?> <?php echo $TWO_MONTHS ?>";
                break;
            case "3":
                tolls_text += f2.tolls + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $TRIMESTER ?>";
                break;
            case "4":
                tolls_text += f2.tolls + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $SEMESTER ?>";
                break;
            case "5":
                tolls_text += f2.tolls + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
                break;
        }
    }
    else 
        tolls_text+=f2.price_tolls_p_day + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $DURING ?> " + f2.tolls_days_p_month + " <?php echo $MONTH ?>";
    tolls_text += "";
    
    //Fines
    var fines_text="<b><?php echo $FINES ?></b><br>";
    switch(data.fines_period) {
        case "1":           
            fines_text += f2.fines + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?>";
            break;
        case "2":           
            fines_text += f2.fines + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORDS_PER_EACH ?> <?php echo $TWO_MONTHS ?>";
            break;
        case "3":           
            fines_text += f2.fines+" <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $TRIMESTER ?>";
            break;
        case "4":           
            fines_text += f2.fines + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $SEMESTER ?>";
            break;
        case "5":           
            fines_text += f2.fines + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
            break;
        }
    fines_text+="";
    
    //washing
    var washing_text="<b><?php echo $WASHING ?></b><br>";
    switch(data.washing_period) {
        case "1":
            washing_text += f2.washing + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?>";
            break;
        case "2":
            washing_text += f2.washing + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORDS_PER_EACH ?> <?php echo $TWO_MONTHS ?>";
            break;
        case "3":
            washing_text += f2.washing +" <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $TRIMESTER ?>";
            break;
        case "4":
            washing_text += f2.washing + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $SEMESTER ?>";
            break;
        case "5":
            washing_text += f2.washing + " <?php echo $CURR_NAME_PLURAL ?> <?php echo $WORD_PER ?> <?php echo $YEAR ?>";
            break;
        }
    washing_text+="";
      
    var varResult= "";
    //main table
    varResult+= '<table class="result_table" id="result_table1">';
    
    //Private Costs header
    varResult+= '<tr><td style="padding:10px;" colspan="2"><b><?php echo $AVERAGE_COSTS_PER_TYPE ?></b><br></td></tr>';
    
    //Standing costs header
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b><?php echo $FIXED_COSTS ?></b><br>" +
                "<i><?php echo $TOTAL_FIXED_DESCR ?></i></td>" +
                '<td><b><?php echo $MONTHLY_AMOUNT ?></b></td></tr>';
    
    //standing costs items
    varResult+= '<tr><td>' + depreciation_text + '&nbsp;</td>' + 
                '<td>&nbsp;' + countryCheck(data.monthly_costs.depreciation.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td><b><?php echo $INSURANCE ?></b><br>' + insurance_text +'</td>' +
                '<td>&nbsp;' + countryCheck(data.monthly_costs.insurance.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td>' + interests_text + '&nbsp;</td>' + 
                '<td>&nbsp;' + countryCheck(data.monthly_costs.credit.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td>' + inspection_text + '</td>' + 
                '<td>&nbsp;' + countryCheck(data.monthly_costs.inspection.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td>' + cartax_text + '</td>' + 
                '<td>&nbsp;' + countryCheck(data.monthly_costs.car_tax.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td>' + maintenance_text + '</td>' +
                '<td>&nbsp;' + countryCheck(((data.monthly_costs.maintenance)/2).toFixed(1)) + '</td></tr>';
    
    //TOTAL - Standing costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b><?php echo $TOTAL_FIXED ?></b></td>"+
                "<td>&nbsp;<b>" + countryCheck(data.total_standing_costs_month.toFixed(1)) + "</b></td></tr>";
    
    //############
    //Running costs header
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b><?php echo $RUNNING_COSTS ?></b><br>" +
                "<i><?php echo $TOTAL_VARIABLE_DESCR ?></i></td>" +
                '<td><b><?php echo $MONTHLY_AMOUNT ?></b></td></tr>';   
    
    varResult+= '<tr><td><b><?php echo $FUEL ?></b><br>' + fuel_text + '</td>' +
                '<td>&nbsp;' + countryCheck(data.monthly_costs.fuel.toFixed(1)) + '</td></tr>';

    varResult+= '<tr><td>' + maintenance_text + '</td>' +
                '<td>&nbsp;' + countryCheck(((data.monthly_costs.maintenance)/2).toFixed(1)) + '</td></tr>';
                
    varResult+= '<tr><td>' + repairs_text + '</td>' +
                '<td>&nbsp;' + countryCheck(data.monthly_costs.repairs_improv.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td><b><?php echo $PARKING ?></b></td>'+
                '<td>&nbsp;' + countryCheck(data.monthly_costs.parking.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td>' + tolls_text + '</td>' +
                '<td>&nbsp;' + countryCheck(data.monthly_costs.tolls.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td>' + fines_text + '</td>' +
                '<td>&nbsp;' + countryCheck(data.monthly_costs.fines.toFixed(1)) + '</td></tr>';
    
    varResult+= '<tr><td>' + washing_text + '</td>' +
                '<td>&nbsp;' + countryCheck(data.monthly_costs.washing.toFixed(1)) + '</td></tr>';
    
    //TOTAL - Running costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b><?php echo $TOTAL_VARIABLE ?></b></td>"+
                "<td>&nbsp;<b>" + countryCheck(data.total_running_costs_month.toFixed(1)) + "</b></td></tr>";
    
    //costs per unit distance
    if(data.distance_per_month != 0){
        varResult+= "<tr><td><b><?php echo $RUN_CP_DIST ?></b></td>"+
                    "<td>&nbsp;" + countryCheck(data.running_costs_p_unit_distance.toFixed(2)) + "/<?php echo $STD_DIST ?> </td></tr>";
        
        varResult+= "<tr><td><b><?php echo $TOTAL_CP_DIST ?></b></td>" +
                    "<td>&nbsp;" + countryCheck(data.total_costs_p_unit_distance.toFixed(2)) + "/<?php echo $STD_DIST ?> </td></tr>";
    }

    //TOTAL
    varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b><?php echo $WORD_TOTAL_CAP ?></b></td>"+
               "<td><b>" + countryCheck(data.total_costs_month.toFixed(0)) + "/<?php echo $MONTH ?></b></td></tr>";
    
    varResult+="</table>";
        
    return varResult;
}

/*Financial effort table (result_table3)*/
function print_feffort_table(f1, f2, f3, data){
    
    var varResult = "";
    varResult+="<table class=\"result_table\" id=\"result_table3\">";
    varResult+="<tr><td colspan=\"2\"><b><?php echo $FINANCIAL_EFFORT ?></b></td></tr>";
    //income
    varResult+="<tr><td colspan=\"2\"><b><?php echo $EXTRA_DATA_INCOME ?></b></tr>";
    switch(f3.income_type){
        case 'year':    
            varResult+= "<tr><td><?php echo $NET_INCOME_PER ?> <?php echo $YEAR ?></td>" + 
                        "<td style=\"width:20%\">" + countryCheck(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $MONTH ?></td>" + 
                        "<td>" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>";
            break;
        case 'month':
            varResult+= "<tr><td><?php echo $NET_INCOME_PER ?> <?php echo $MONTH ?></td>" + 
                        "<td style=\"width:20%\">" + countryCheck(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td><?php echo $NUMBER_OF_MONTHS ?></td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $MONTH ?></td>" + 
                        "<td>" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>" +
                        "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $YEAR ?></td>" + 
                        "<td>" + countryCheck(data.fin_effort.income_per_year.toFixed(1)) + "</td></tr>";
            break;
        case 'week':
            varResult+= "<tr><td><?php echo $NET_INCOME_PER ?> <?php echo $WEEK ?></td>" + 
                        "<td style=\"width:20%\">" + countryCheck(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td><?php echo $NUMBER_OF_WEEKS ?></td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $MONTH ?></td>" + 
                        "<td>" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $YEAR ?></td>" + 
                        "<td>" + countryCheck(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;  
        case 'hour':
            varResult+= "<tr><td><?php echo $NET_INCOME_PER ?> <?php echo $HOUR ?></td>" + 
                        "<td style=\"width:20%\">" + countryCheck(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td><?php echo $NUMBER_OF_HOURS ?></td>" + 
                        "<td>" + data.fin_effort.income_hours_per_week + " <?php echo $HOUR_ABBR ?></td></tr>"+
                        "<tr><td><?php echo $NUMBER_OF_WEEKS ?></td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>"+
                        "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $MONTH ?></td>" + 
                        "<td>" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $YEAR ?></td>" + 
                        "<td>" + countryCheck(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;          
    }
    //working time
    if(f3.income_type != 'hour'){
        varResult+=     "<tr><td colspan=\"2\"><b><?php echo $EXTRA_DATA_WORKING_TIME ?></b></tr>";
        if(f3.is_working_time == 'true'){
            varResult+= "<tr><td><?php echo $HOURS_PER ?> <?php echo $WEEK ?></td>" +
                        "<td>"+data.fin_effort.time_hours_per_week+" <?php echo $HOUR_ABBR ?></td></tr>" +
                        "<tr><td><?php echo $MONTHS_PER ?> <?php echo $YEAR ?></td>" + 
                        "<td>"+data.fin_effort.time_month_per_year+"</td></tr>" +
                        "<tr><td><?php echo $AVERAGE_WORKING_HOURS_PER ?> <?php echo $MONTH ?></td>" + 
                        "<td>"+data.fin_effort.aver_work_time_per_m.toFixed(1)+" <?php echo $HOUR_ABBR ?></td></tr>" +
                        "<tr><td><?php echo $WORKING_HOURS_PER ?> <?php echo $YEAR ?></td>" + 
                        "<td>"+data.fin_effort.work_hours_per_y.toFixed(1)+" <?php echo $HOUR_ABBR ?></td></tr>";
        }
        else{
            varResult+= "<tr><td colspan=\"2\"><?php echo $WORKING_TIME_MESSAGE ?></td></tr>";
        }
    }           
    varResult+= "<tr><td><?php echo $AVERAGE_NET_INCOME_PER ?> <?php echo $HOUR ?></td>" +
                "<td>&nbsp;" + countryCheck(data.fin_effort.aver_income_per_hour.toFixed(1)) + "</td></tr>";
    
    //distance
    varResult+= "<tr><td colspan=\"2\"><b><?php echo $DISTANCE ?></b></td></tr>";
    if((f2.type_calc_fuel != 'km' && f3.drive_to_work == 'true') || (f2.type_calc_fuel != 'km' && f2.take_car_to_job == 'true')){   
        varResult+=  "<tr><td><?php echo $DIST_HOME_JOB ?></td>"  +  
                     "<td>" + parseInt(f3.dist_home_job).toFixed(1) + " <?php echo $STD_DIST ?></td></tr>"+
                     "<tr><td><?php echo $DAYS_DRIVE_JOB ?></td>"  +  
                     "<td>" + f3.drive_to_work_days_per_week + " <?php echo $DAYS ?></td></tr>" +
                     "<tr><td><?php echo $DIST_JORNEY_WEEKEND ?></td>" + 
                     "<td>" + parseInt(f3.journey_weekend).toFixed(1) + " <?php echo $STD_DIST ?></td></tr>"+
                     "<tr><td><?php echo $AVERAGE_DIST_PER_WEEK ?></td>" + 
                     "<td>" + data.fin_effort.aver_drive_per_week.toFixed(1) + " <?php echo $STD_DIST ?></td></tr>";                  
    }

    varResult+=  "<tr><td><?php echo $YOU_DRIVE_PER ?> <?php echo $MONTH ?></td>" +
                 "<td>" + data.distance_per_month.toFixed(1) + " <?php echo $STD_DIST ?></td></tr>" +
                 "<tr><td><?php echo $YOU_DRIVE_PER ?> <?php echo $YEAR ?></td>" + 
                 "<td>" + data.fin_effort.drive_per_year.toFixed(1) + " <?php echo $STD_DIST ?></td></tr>";  

    //time spent in driving
    varResult+=  "<tr><td colspan=\"2\"><b><?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?></b></td></tr>";

    if(f3.drive_to_work == 'true' || f2.take_car_to_job == 'true'){
        varResult+= "<tr><td><?php echo $MINUTES_HOME_JOB ?></td>" + 
                    "<td>" + f3.time_home_job + " <?php echo $MIN ?></td></tr>" +
                    "<tr><td><?php echo $DAYS_DRIVE_TO_JOB ?></td>" + 
                    "<td>" + f3.drive_to_work_days_per_week + " <?php echo $DAYS ?></td></tr>" +
                    "<tr><td><?php echo $TIME_DRIVE_WEEKEND ?></td>" + 
                    "<td>" + f3.time_weekend + " <?php echo $MIN ?></td></tr>" +
                    "<tr><td><?php echo $MINUTES_DRIVE_PER ?> <?php echo $WEEK ?></td>" + 
                    "<td>" + data.fin_effort.min_drive_per_week + " <?php echo $MIN ?></td></tr>";
    }
    else{
        varResult+= "<tr><td><?php echo $MINUTES_DRIVE_PER ?> <?php echo $DAY ?></td>" + 
                    "<td>" + f3.min_drive_per_day + " <?php echo $MIN ?></td></tr>" +
                    "<tr><td><?php echo $DAYS_DRIVE_PER_MONTH ?></td>" + 
                    "<td>" + f3.days_drive_per_month + " <?php echo $DAYS ?></td></tr>";
    }

    varResult+= "<tr><td><?php echo $HOURS_DRIVE_PER ?> <?php echo $MONTH ?></td>" + 
                "<td>" + data.fin_effort.hours_drive_per_month.toFixed(1) + " <?php echo $HOUR_ABBR ?></td></tr>"+
                "<tr><td><?php echo $HOURS_DRIVE_PER ?> <?php echo $YEAR ?></td>" + 
                "<td>" + data.fin_effort.hours_drive_per_year.toFixed(1) + " <?php echo $HOUR_ABBR ?></td></tr>";;

    //financial effort
    varResult+= "<tr><td colspan=\"2\"><b><?php echo $FINANCIAL_EFFORT ?>" +
                ': ' + (data.total_costs_year/data.fin_effort.income_per_year*100).toFixed(0) + 
                '&#37;</b>' +
                "<tr><td><?php echo $TOTAL_COSTS_PER_YEAR ?></td>" + 
                "<td>" + countryCheck(data.fin_effort.total_costs_year.toFixed(1)) + "</td></tr>" +
                "<tr><td><?php echo $HOURS_TO_AFFORD_CAR ?></td>"  +  
                "<td>" + data.fin_effort.hours_per_year_to_afford_car.toFixed(1) + " <?php echo $HOUR_ABBR ?></td></tr>"+
                "<tr><td><?php echo $MONTHS_TO_AFFORD_CAR ?></td>" +  
                "<td>" + data.fin_effort.month_per_year_to_afford_car.toFixed(2)+"</td></tr>"+
                "<tr><td><?php echo $DAYS_CAR_PAID ?></td>" +  
                "<td>" + Math.ceil(data.fin_effort.days_car_paid) + " <?php echo $DAYS ?></td></tr>";
           

    //speed
    varResult+= "<tr><td><?php echo $AVER_YEARLY ?> <?php echo $KINETIC_SPEED ?></td>"+
                "<td>" + data.fin_effort.kinetic_speed.toFixed(1) + " <?php echo $STD_DIST ?>/h</td></tr>";
                        
    varResult+= "<tr><td><?php echo $AVER_YEARLY ?> <a href=\"./docs/consumer_speed.html\" target=\"_blank\"><?php echo $VIRTUAL_SPEED ?></a></td>"+
                "<td>" + data.fin_effort.virtual_speed.toFixed(1) + " <?php echo $STD_DIST ?>/h</td></tr>";
    
    varResult+="</table>";     
    
    return varResult;
}

/*Public transports table (result_table2)*/
function print_publict_table(f1, f2, f3, data, country){

    var varResult = "";   
    if(data.public_transports.display_tp()) {
        
        var tp_text, outros_tp_text, taxi_text;

        tp_text="<b><?php echo $PUB_TRANS_TEXT ?></b><br><?php echo $FAM_NBR ?>: " + f3.n_pess_familia + " <?php echo $PERSON_OR_PEOPLE ?>"
                + "<br><?php echo $PASS_MONTH_AVG ?>: " + f3.pmpmpc + "<?php echo $CURR_SYMBOL ?>";
        
        if(data.public_transports.racio_custocar_caustotp < data.public_transports.racio_outros_tp){
            outros_tp_text="<b><?php echo $OTHER_PUB_TRANS ?></b><br><?php echo $OTHER_PUB_TRANS_DESC ?> ";
        }
        taxi_text="<b><?php echo $TAXI_DESL ?><\/span><\/b><br>" + data.public_transports.n_km_taxi.toFixed(1) + " <?php echo $STD_DIST ?> <?php echo $ON_TAXI_PAYING ?> " + data.public_transports.taxi_price_per_km.toFixed(1) + "<?php echo $CURR_SYMBOL ?>/<?php echo $STD_DIST ?>";
        
        //starts HTML table
        varResult+="<table class=\"result_table\" id=\"result_table2\">";
        //header
        varResult+="<tr><td><b><?php echo $COSTS ?></b><br></td>"+
                   "<td><b><?php echo $MONTHLY_AMOUNT ?></b></td></tr>";
        //items
        varResult+="<tr><td>" + tp_text + "</td>" + 
                   "<td>&nbsp;" + countryCheck(data.public_transports.preco_total_tp.toFixed(1)) + "</td></tr>";
        
        varResult+="<tr><td>" + taxi_text + "</td>" + 
                   "<td>&nbsp;" + countryCheck(data.public_transports.custo_taxi.toFixed(1)) + "</td></tr>";
        
        //in case other means of transport are shown besides taxi and urban public transports
        if(data.public_transports.display_outros_tp) {
            varResult+="<tr><td>" + outros_tp_text + "</td>" +
                       "<td>&nbsp;"+countryCheck(data.public_transports.outros_tp.toFixed(1))+"</td></tr>";
        }
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b><?php echo $WORD_TOTAL_CAP ?></b></td>"+
                   "<td><b>" + countryCheck(data.public_transports.total_altern.toFixed(0)) + "/<?php echo $MONTH ?></b></td></tr>";
        
        varResult+="</table>";
    }
    
    //UBER
    var res_uber_obj = get_uber(uber_obj, data, country);
    //alert(JSON.stringify(res_uber_obj, null, 4)); 
    if (res_uber_obj){
        uber_obj.print_bool=true; //says uber table is to be printed
        
        //add source in table for uber URL  
        var uber_url = "http://www.uber.com/" + '<?php echo $LANGUAGE_CODE ?>' + "/cities/";
        var uber_url_HTML = "<sup><a href=\"" + uber_url + "\">[*]</a></sup>";
        
        //in which driver can replace every journey by uber 
        if(res_uber_obj.result_type==1){
            //starts HTML table
            varResult+="<br><table class=\"result_table uber_table\" id=\"result_table_uber\">";
            
            varResult+="<tr><td><b>UBER - <?php echo $COSTS.' '.$WORD_PER.' '.$STD_DIST_FULL ?></b>" + uber_url_HTML + "</td>" + 
                       "<td>" + countryCheck(res_uber_obj.ucd.toFixed(2)) + "/" + "<?php echo $STD_DIST ?></td></tr>";
            
            varResult+="<tr><td><b>UBER - <?php echo $COSTS.' '.$WORD_PER.' '.$MINUTES ?></b>" + uber_url_HTML + "</td>" + 
                       "<td>" + countryCheck(res_uber_obj.ucm.toFixed(2)) + "/" + "<?php echo $MIN ?></td></tr>";

            varResult+="<tr><td><b><?php echo $FUEL_DIST.' '.$WORD_PER.' '.$MONTH ?></b><br></td>"+
                       "<td>" + res_uber_obj.dpm.toFixed(0) + " " +"<?php echo $STD_DIST_FULL?></td></tr>";
            
                       
            varResult+="<tr><td><b><?php echo $MINUTES_DRIVE_PER.' '.$MONTH ?></b></td>" + 
                       "<td>" + res_uber_obj.mdpm.toFixed(0) + " " + "<?php echo $MINUTES ?></td></tr>";
                       
            varResult+="<tr><td><b>UBER: <?php echo $COSTS.' - '.$WORD_TOTAL_CAP ?></b></td>" + 
                       "<td><b>" + countryCheck(res_uber_obj.tuc.toFixed(0)) + "</b></td></tr>";                     

            varResult+="<tr><td><b><?php echo $OTHER_PUB_TRANS ?></b><br><?php echo $OTHER_PUB_TRANS_DESC ?></td>" + 
                       "<td><b>" + countryCheck(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";
            
            varResult+="<tr><td><b><?php echo $WORD_TOTAL_CAP ?></b></td>"+
                       "<td><b>" + countryCheck(data.public_transports.total_altern.toFixed(0)) + "/<?php echo $MONTH ?></b></td></tr>";
            
            varResult+="</table>";       
        }
        
        //the case where uber equivalent is more expensive
        else if(res_uber_obj.result_type==2){ 
            //starts HTML table
            varResult+="<br><table class=\"result_table uber_table uber_table2\" id=\"result_table_uber\">";
            
            varResult+="<tr><td><b><?php echo $PUB_TRANS_TEXT ?></b><br><?php echo $FAM_NBR ?>: " + f3.n_pess_familia + " <?php echo $PERSON_OR_PEOPLE ?>"
                     + "<br><?php echo $PASS_MONTH_AVG ?>: " + f3.pmpmpc + "<?php echo $CURR_SYMBOL ?></td>" 
                     + "<td><b>" + countryCheck(res_uber_obj.tcpt.toFixed(0)) + "</b></td></tr>";
             
            varResult+="<tr><td><b>UBER - <?php echo $COSTS.' '.$WORD_PER.' '.$STD_DIST_FULL ?></b>" + uber_url_HTML + "</td>" + 
                       "<td>" + countryCheck(res_uber_obj.ucd.toFixed(2)) + "/" + "<?php echo $STD_DIST ?></td></tr>";
            
            varResult+="<tr><td><b>UBER - <?php echo $COSTS.' '.$WORD_PER.' '.$MINUTES ?></b>" + uber_url_HTML + "</td>" + 
                       "<td>" + countryCheck(res_uber_obj.ucm.toFixed(2)) + "/" + "<?php echo $MIN ?></td></tr>";

            varResult+="<tr><td><b><?php echo $KINETIC_SPEED_TITLE ?></b></td>" + 
                       "<td>" + data.fin_effort.kinetic_speed.toFixed(2) + " " +"<?php echo $STD_DIST.'/'.$HOUR_ABBR ?></td></tr>";
                       
            varResult+="<tr><td><b>UBER - <?php echo $STD_DIST_FULL.' '.$WORD_PER.' '.$MONTH ?></b></td>" + 
                       "<td>" + res_uber_obj.dist_uber.toFixed(0) + " " + "<?php echo $STD_DIST_FULL ?></td></tr>";
                       
            varResult+="<tr><td><b>UBER: <?php echo $COSTS.' - '.$WORD_TOTAL_CAP ?></b></td>" + 
                       "<td><b>" + countryCheck(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";                     
           
            varResult+="<tr><td><b><?php echo $WORD_TOTAL_CAP ?></b></td>"+
                       "<td><b>" + countryCheck(data.total_costs_month.toFixed(0)) + "/<?php echo $MONTH ?></b></td></tr>";
            
            varResult+="</table>";    
        }
               
    }
    else{
        uber_obj.print_bool=false; //says uber table is not to be printed
    }
    return varResult;
}

/*External costs table (result_table4)*/
function print_extern_table(f1, f2, f3, data){ 
            
    var epa_text      = "<b>Emissões de poluentes atmosféricos</b><br>Valor aproximado: " + data.external_costs.polution + "<?php echo $CURR_SYMBOL ?>/<?php echo $STD_DIST ?>";
    var egee_text     = "<b>Emissões de gases de efeito de estufa</b><br>Valor aproximado: " + data.external_costs.ghg + "<?php echo $CURR_SYMBOL ?>/<?php echo $STD_DIST ?>";
    var ruido_text    = "<b>Poluição sonora</b><br>Valor aproximado: " + data.external_costs.noise + "<?php echo $CURR_SYMBOL ?>/<?php echo $STD_DIST ?>";
    var sr_text       = "<b>Sinistralidade rodoviária</b><br>Valor aproximado: " + data.external_costs.fatalities + "<?php echo $CURR_SYMBOL ?>/<?php echo $STD_DIST ?>";
    var cgstn_text    = "<b>Congestionamento<\/span></b><br>Valor aproximado: " + data.external_costs.congestion + "<?php echo $CURR_SYMBOL ?>/<?php echo $STD_DIST ?>";
    var ifr_estr_text = "<b>Desgaste das infraestruturas rodoviárias</b><br>Valor aproximado: " + data.external_costs.infrastr + "<?php echo $CURR_SYMBOL ?>/<?php echo $STD_DIST ?>";
    var source_ext_costs  = "<b>Fonte dos dados:</b><br><i><a href=\"" + data.external_costs.handbook_extern_URL + "\">Handbook on estimation of external costs in the transport sector</a>, </i>Comissão Europeia";
    
    var varResult     = "";
    
    if(<?if ($GLOBALS['country']=="PT") echo 'data.distance_per_month != 0'; else echo "false"; ?>){
        
        varResult+="<table class=\"result_table\" id=\"result_table4\">";

        //header
        varResult+="<tr><td><b>Custos externos para o país</b><br>Percorre " +(1 * data.distance_per_month).toFixed(1)+" <?php echo $STD_DIST ?>/<?php echo $MONTH ?></td>" +
                   "<td><b><?php echo $MONTHLY_AMOUNT ?></b></td></tr>";
        
        //external costs items
        varResult+="<tr><td>" + epa_text + "</td>" +   
                   "<td>&nbsp;<?php echo $CURR_SYMBOL ?> " + (data.external_costs.polution * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + egee_text + "</td>" + 
                   "<td>&nbsp;<?php echo $CURR_SYMBOL ?> " + (data.external_costs.ghg * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ruido_text + "</td>" + 
                   "<td>&nbsp;<?php echo $CURR_SYMBOL ?> " + (data.external_costs.noise * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + sr_text + "</td>" + 
                   "<td>&nbsp;<?php echo $CURR_SYMBOL ?> " + (data.external_costs.fatalities * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + cgstn_text + "</td>" + 
                   "<td>&nbsp;<?php echo $CURR_SYMBOL ?> " + (data.external_costs.congestion * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ifr_estr_text + "</td>" + 
                   "<td>&nbsp;<?php echo $CURR_SYMBOL ?> " + (data.external_costs.infrastr * data.distance_per_month).toFixed(1)+"</td></tr>";
        
         //total
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b><?php echo $WORD_TOTAL_CAP ?></b></td>" +
                   "<td><b><?php echo $CURR_SYMBOL ?>&nbsp;"+data.external_costs.total_exter().toFixed(0)+"/<?php echo $MONTH ?></b></td></tr>";
        
        //reference to source
        varResult+="<tr><td colspan=\"2\">"+ source_ext_costs +"</td></tr>";        
 
        varResult+="</table>";     
    }
            
    return varResult;
}

function drawChartResult(frame_witdh, data){
    
    //client width under which the charts are not shown
    var WIDTH_PX_OFF = 280;
    //minimum ratio width of charts as frame_witdh becomes too wide
    var MIN_RATIO = 0.7;
    //width on which the ratio is MIN_RATIO and above which the ration is fixed on MIN_RATIO
    var MIN_RATIO_WIDTH = 750;

    //it doesn't print the charts in very small screen width
    if (frame_witdh < WIDTH_PX_OFF) {
        $("#pie_chart_div").css('display', 'none');
        $("#bar_chart_div").css('display', 'none');
        return;
    }
    
    //make charts width adjustments according to the div_width (uses linear expression y=mx+b)
    var ratio;
    if (frame_witdh > MIN_RATIO_WIDTH) {
        ratio = MIN_RATIO;
    }
    else if(frame_witdh > WIDTH_PX_OFF) {
        var m = (MIN_RATIO - 1) / (MIN_RATIO_WIDTH - WIDTH_PX_OFF);
        var b = 1 - m * WIDTH_PX_OFF;
        ratio = m * frame_witdh + b;
    }
    frame_witdh = ratio * frame_witdh;
       
    //prepares the the correspondent divs
    $("#pie_chart_div").css('display', 'inline-block');
    $("#pie_chart_div").css('width', '95%');
    $("#bar_chart_div").css('display', 'inline-block');
    $("#bar_chart_div").css('width', '95%');
    
    //checks if depreciation is greater or equal to zero, to print chart with no error
    var desvalor_temp;
    if(data.monthly_costs.depreciation < 0) {
        desvalor_temp=0;
    } else {
        desvalor_temp = data.monthly_costs.depreciation; 
    }

    //draw Pie Chart
    var pie_chart_width=parseInt(frame_witdh*1);
    var pie_chart_height=parseInt(pie_chart_width*4/6);

    drawPieChart(parseFloat(data.monthly_costs.insurance.toFixed(1)),
                 parseFloat(data.monthly_costs.fuel.toFixed(1)),
                 parseFloat(desvalor_temp.toFixed(1)),
                 parseFloat(data.monthly_costs.credit.toFixed(1)),
                 parseFloat(data.monthly_costs.inspection.toFixed(1)),
                 parseFloat(data.monthly_costs.maintenance.toFixed(1)),
                 parseFloat(data.monthly_costs.repairs_improv.toFixed(1)),
                 parseFloat(data.monthly_costs.car_tax.toFixed(1)),
                 parseFloat(data.monthly_costs.parking.toFixed(1)),
                 parseFloat(data.monthly_costs.tolls.toFixed(1)),
                 parseFloat(data.monthly_costs.fines.toFixed(1)),
                 parseFloat(data.monthly_costs.washing.toFixed(1)),
                 pie_chart_width,
                 pie_chart_height
            );

    //draw Bar Chart
    var bar_chart_width=parseInt(frame_witdh*0.8);
    var bar_chart_height=parseInt(bar_chart_width*45/50);

    drawBarChart(parseFloat(data.monthly_costs.insurance.toFixed(1)),
                 parseFloat(data.monthly_costs.fuel.toFixed(1)),
                 parseFloat(desvalor_temp.toFixed(1)),
                 parseFloat(data.monthly_costs.credit.toFixed(1)),
                 parseFloat(data.monthly_costs.inspection.toFixed(1)),
                 parseFloat(data.monthly_costs.maintenance.toFixed(1)),
                 parseFloat(data.monthly_costs.repairs_improv.toFixed(1)),
                 parseFloat(data.monthly_costs.car_tax.toFixed(1)),
                 parseFloat(data.monthly_costs.parking.toFixed(1)),
                 parseFloat(data.monthly_costs.tolls.toFixed(1)),
                 parseFloat(data.monthly_costs.fines.toFixed(1)),
                 parseFloat(data.monthly_costs.washing.toFixed(1)),
                 bar_chart_width,
                 bar_chart_height
            );
    
    //draw Financial Effort Chart
    var fe_chart_width=parseInt(frame_witdh*0.9);
    var fe_chart_height=parseInt(fe_chart_width*1/2);
    
    drawFinEffortChart(parseFloat(data.fin_effort.total_costs_year.toFixed(0)),
                       parseFloat(data.fin_effort.income_per_year.toFixed(0)),
                       fe_chart_width,
                       fe_chart_height
                );

    //adjust the charst divs
    $("#pie_chart_div").css('display', 'inline-block');
    $("#pie_chart_div").css('width', 'auto');
    $("#bar_chart_div").css('display', 'inline-block');
    $("#bar_chart_div").css('width', 'auto');
    $("#fin_effort_chart_div").css('display', 'inline-block');
    $("#fin_effort_chart_div").css('width', 'auto'); 
}

//puts the currency symbol after the money value, for certain countries 
function countryCheck(value){   
    
    if('<?php echo $GLOBALS['country'] ?>'=='FI'){
        res = value + "&nbsp;<?php echo $CURR_SYMBOL ?>" ;
    }
    else{
        res = "<?php echo $CURR_SYMBOL ?>&nbsp;" + value;
    }
    return res;
}