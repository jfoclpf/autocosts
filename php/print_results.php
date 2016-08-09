<? Header("content-type: application/x-javascript");
include($_SERVER['DOCUMENT_ROOT'].'/country files/' . $_GET['country'] . '.php');
$GLOBALS['country'] = $_GET['country'];
?>

function Run(){	

    //test if the form user inputs are correct
    if (!is_userdata_formpart1_ok()) return;
    if (!is_userdata_formpart2_ok()) return;
    if (!is_userdata_formpart3_ok()) return;

    var f1 = get_form_part1();
    var f2 = get_form_part2();
    var f3 = get_form_part3();
    
    var country = {
        currency: '<? echo $CURR_CODE ?>',
        distance_std: <? echo $distance_std_option; ?>,
        fuel_efficiency_std: <? echo $fuel_efficiency_std_option; ?>,
        fuel_price_volume_std: <? echo $fuel_price_volume_std; ?>,
        taxi_price: <?echo $TAXI_PRICE_PER_DIST?>
    };
    
    var data = calculate_costs(f1, f2, f3, country);
    CalculatedData = data; //assigns to global variable

    //shows result and hides the form input
    result_object = document.getElementById('result_div');
    input_object.style.display = 'none';
    
    //prints on the screen the result 
    var tables_HTML = "";    
    tables_HTML += print_costs_table(f1, f2, f3, data);
    tables_HTML += print_extern_table(f1, f2, f3, data);
    tables_HTML += print_publict_table(f1, f2, f3, data);
    tables_HTML += print_feffort_table(f1, f2, f3, data);
    tables_HTML += "<br><br>";
    result_object.innerHTML = tables_HTML;
    result_object.style.display='block';
    
    //enlarges center div
    $('#div1_td').css('width', '15%');
    $('#div3_td').css('width', '15%');
    
    //gets result frame width to draw charts within it
    var frame_witdh = document.getElementById('div2').offsetWidth;
    drawChartResult(frame_witdh, data);
    
    //shows the option buttons (reload, print, download pdf) at the end of result
    reload_object.style.display='block';
        
    //hides description, left and right columns
    $('#div1').css('display', 'none');
    $('#div3').css('display', 'none');
    $('#description').html('');
    
    //global variable indicating the results are being shown
    ResultIsShowing=true;
    
    return true;
}

/*Main costs table (result_table1)*/
function print_costs_table(f1, f2, f3, data) {
    
    //Depreciation
    var depreciation_text;
    if (data.age_months == 0) {    
        depreciation_text = "<?echo $ERROR_DEPRECIATION_NEW_CAR?>&nbsp;&nbsp;";
    } else {
        depreciation_text = "<b><span class=\"p3\"><?echo $DEPRECIATION?><\/span></b>&nbsp;&nbsp;<br><span class=\"p2\"><?echo $AQ_VALUE?>: "
            + f1.auto_initial_cost + "<?echo $CURR_SYMBOL?><br><?echo $FINAL_VALUE?>: "
            + f1.auto_final_cost + "<?echo $CURR_SYMBOL?><br><?echo $PERIOD_OWN?>: "
            + data.age_months + " <?echo $MONTHS?><br>("
            + f1.auto_initial_cost + "<?echo $CURR_SYMBOL?>-"
            + f1.auto_final_cost + "<?echo $CURR_SYMBOL?>)/"
            + data.age_months + " <?echo $MONTHS?></span>";
    }
    
    //Insurance
    var insurance_text;
    switch(f1.insurance_type)
    {
        case "semestral":
            insurance_text = f1.insurance_value + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
            break;
        case "anual":
            insurance_text = f1.insurance_value + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
            break;
        case "mensal":
            insurance_text = data.monthly_costs.insurance + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
            break;
        case "trimestral":
            insurance_text = f1.insurance_value + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
            break;
    }
    
    //Credit interests
    var interests_text="<b><span class=\"p3\"><?echo $CREDIT_INTERESTS?></span><\/b>&nbsp;&nbsp;";
    
    if(f1.cred_auto_s_n == "true") {

        interests_text = "<b><span class=\"p3\"><?echo $CREDIT_INTERESTS?></span></b>&nbsp;&nbsp;<br><span class=\"p2\"><?echo $CREDIT_LOAN2?>: "
                    + f1.credit_amount
                    + "<?echo $CURR_SYMBOL?><br><?echo $CREDIT_PERIOD?>: "
                    + f1.credit_period
                    + " <?echo $MONTHS?><br><?echo $CREDIT_INSTALMENT?>: "
                    + f1.credit_value_p_month
                    + "<?echo $CURR_SYMBOL?><br><?echo $CREDIT_RESIDUAL_VALUE1?>: "
                    + f1.credit_residual_value
                    + "<?echo $CURR_SYMBOL?><br>";    

        interests_text += "<?echo $CREDIT_TOTAL_INTERESTS?>: "+data.total_interests+"<?echo $CURR_SYMBOL?><br>(" + data.month_cred + "*"+ f1.credit_value_p_month + ")+" + f1.credit_residual_value + "-" + f1.credit_amount;

        if(data.age_months >= data.month_cred)
            interests_text += "<br><?echo $CREDIT_INTERESTS_MONTH?>: "+data.monthly_costs.credit.toFixed(2)+"<?echo $CURR_SYMBOL?>";
        interests_text += "</span>";
    } 
    
    //Inspection
    var inspection_text;
    if (f1.nmr_times_inspec != 0){
        inspection_text = "<b><span class=\"p3\"><?echo $INSPECTION?></span></b><br><span class=\"p2\">"
                      + f1.nmr_times_inspec
                      + " <?echo $TIMES_COSTING?> "
                      + f1.inspec_price
                      + " <?echo $CURR_SYMBOL?> <?echo $EACH_ONE_DURING?> "
                      + data.age_months + " <?echo $MONTHS?>&nbsp;</span>";
    }
    else        
        inspection_text = "<b><span class=\"p3\"><?echo $INSPECTION?></span></b><br>";
    
    //Taxes
    var cartax_text = "<b><span class=\"p3\"><?echo $ROAD_TAXES?></span></b><br><span class=\"p2\">"
                 + f1.car_tax + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?></span>";
    
    //Fuel
    var fuel_text;
    switch(f2.type_calc_fuel){
        case "km":                     
            if (f2.take_car_to_job == "false"){
                switch(data.fuel_period_km)
                {
                    case "1":
                        fuel_text = f2.distance + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $MONTH?>";
                        break;
                    case "2":                   
                        fuel_text = f2.distance + " <?echo $DIST_EACH_TWO_MONTHS?>";
                        break;
                    case "3":                   
                        fuel_text = f2.distance + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
                        break;
                    case "4":                   
                        fuel_text = f2.distance + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
                        break;
                    case "5":                   
                        fuel_text = f2.distance + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $YEAR?>";
                        break;
                }
                fuel_text = fuel_text + "<br>" + "<?echo $FUEL_CAR_EFF?>: " + f2.car_consumption + " <?echo $STD_FUEL_CALC?>&nbsp;";
                fuel_text = fuel_text + "<br>" + "<?echo $FUEL_PRICE1?>: " + f2.fuel_price + " <?echo $CURR_SYMBOL?>/<?echo $STD_VOLUME_SHORT?>&nbsp;&nbsp;";
            }
            else{
                fuel_text = f2.days_p_week + " <?echo $FUEL_JOB_CALC1?> <br>";
                fuel_text = fuel_text + "<?echo $YOU_DRIVE?> " + f2.distance_home2job + " <?echo $FUEL_DIST_HOME_JOB1?> <br>";
                fuel_text = fuel_text + "<?echo $YOU_DRIVE?> " + f2.distance_weekend + " <?echo $FUEL_DIST_NO_JOB1?>&nbsp;<br>";
                fuel_text = fuel_text + "<?echo $YOU_DRIVE_TOTTALY_AVG?> " + data.distance_per_month.toFixed(1) + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $MONTH?> (~30.5 <?echo $DAYS?>) <br>";
                fuel_text = fuel_text + "<?echo $FUEL_CAR_EFF?>: " + f2.car_consumption + " <?echo $STD_FUEL_CALC?>";
                fuel_text = fuel_text + "<br>" + "<?echo $FUEL_PRICE?>: " + f2.fuel_price + " <?echo $CURR_SYMBOL?>/<?echo $STD_VOLUME_SHORT?>";
            }
            break;
        case "euros":
            switch(data.fuel_cost_period)
            {
                case "1":
                    fuel_text = f2.fuel_money + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
                    break;
                case "2":                   
                    fuel_text = f2.fuel_money + " <?echo $DIST_EACH_TWO_MONTHS?>";
                    break;
                case "3":                   
                    fuel_text = f2.fuel_money + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
                    break;
                case "4":                   
                    fuel_text = f2.fuel_money + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
                    break;
                case "5":                   
                    fuel_text = document.custo.fuel_money.value + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
                    break;
            }
            break;
    }
    
    //Maintenance
    var maintenance_text = "<b><span class=\"p3\">1/2 <?echo $MAINTENANCE?></span></b><br><span class=\"p2\">"
                      + f2.maintenance + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?></span>";
    
    //Repairs
    var repairs_text = "<b><span class=\"p3\"><?echo $REP_IMPROV?><\/span></b><span class=\"p2\"><br>"
                        + f2.repairs + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?></span>";
    
    //Tolls
    var tolls_text="<b><span class=\"p3\"><?echo $TOLLS?></span></b><br><span class=\"p2\">";
    if(f2.type_calc_tolls == "false") {
        switch(data.tolls_period) {
            case "1":
                tolls_text += f2.tolls + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
                break;
            case "2":
                tolls_text += f2.tolls + " <?echo $CURR_NAME_PLURAL?> <?echo $WORDS_PER_EACH?> <?echo $TWO_MONTHS?>";
                break;
            case "3":
                tolls_text += f2.tolls + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
                break;
            case "4":
                tolls_text += f2.tolls + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
                break;
            case "5":
                tolls_text += f2.tolls + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
                break;
        }
    }
    else 
        tolls_text+=f2.price_tolls_p_day + " <?echo $CURR_NAME_PLURAL?> <?echo $DURING?> " + f2.tolls_days_p_month + " <?echo $MONTH?>";
    tolls_text += "</span>";
    
    //Fines
    var fines_text="<b><span class=\"p3\"><?echo $FINES?></span></b><br><span class=\"p2\">";
    switch(data.fines_period) {
        case "1":           
            fines_text += f2.fines + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
            break;
        case "2":           
            fines_text += f2.fines + " <?echo $CURR_NAME_PLURAL?> <?echo $WORDS_PER_EACH?> <?echo $TWO_MONTHS?>";
            break;
        case "3":           
            fines_text += f2.fines+" <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
            break;
        case "4":           
            fines_text += f2.fines + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
            break;
        case "5":           
            fines_text += f2.fines + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
            break;
        }
    fines_text+="</span>";
    
    //washing
    var washing_text="<b><span class=\"p3\"><?echo $WASHING?></span></b><br><span class=\"p2\">";
    switch(data.washing_period) {
        case "1":
            washing_text += f2.washing + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
            break;
        case "2":
            washing_text += f2.washing + " <?echo $CURR_NAME_PLURAL?> <?echo $WORDS_PER_EACH?> <?echo $TWO_MONTHS?>";
            break;
        case "3":
            washing_text += f2.washing +" <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
            break;
        case "4":
            washing_text += f2.washing + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
            break;
        case "5":
            washing_text += f2.washing + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
            break;
        }
    washing_text+="</span>";
      
    var varResult= "";
    //main table
    varResult+= '<center><table class="result_table" id="result_table1" cellpadding="4">';
    
    //Private Costs header
    varResult+= '<tr><td style="padding:10px;" colspan="2"><b><span class="p3"><?echo $PRIVATE_COSTS?></span></b><br></td></tr>';
    
    //Standing costs header
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b><span class=\"p3\"><?echo $FIXED_COSTS?></span></b><br>" +
                "<i><span class=\"p2\"><?echo $TOTAL_FIXED_DESCR?></span></i></td>" +
                '<td width="20%"><b><span class="p3"><?echo $MONTHLY_AMOUNT?></span></b></td></tr>';
    
    //standing costs items
    varResult+= '<tr><td align="left">' + depreciation_text + '&nbsp;</td>' + 
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.depreciation.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left"><b><span class="p3"><?echo $INSURANCE?></span></b><br><span class="p2">' + insurance_text +'</span></td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.insurance.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left">' + interests_text + '&nbsp;</td>' + 
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.credit.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left">' + inspection_text + '</td>' + 
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.inspection.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left">' + cartax_text + '</td>' + 
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.car_tax.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left">' + maintenance_text + '</td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(((data.monthly_costs.maintenance)/2).toFixed(1)) + '</span></td></tr>';
    
    //TOTAL - Standing costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b><?echo $TOTAL_FIXED?></b></td>"+
                "<td>&nbsp;<b><span class=\"p2\">" + countryCheck(data.total_standing_costs_month.toFixed(1)) + "</span></b></td></tr>";
    
    //############
    //Running costs header
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b><span class=\"p3\"><?echo $RUNNING_COSTS?></span></b><br>" +
                "<i><span class=\"p2\"><?echo $TOTAL_VARIABLE_DESCR?></span></i></td>" +
                '<td width="20%"><b><span class="p3"><?echo $MONTHLY_AMOUNT?></span></b></td></tr>';   
    
    varResult+= '<tr><td align="left"><b><span class="p3"><?echo $FUEL?></span></b><br><span class="p2">' + fuel_text + '</span></td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.fuel.toFixed(1)) + '</span></td></tr>';

    varResult+= '<tr><td align="left">' + maintenance_text + '</td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(((data.monthly_costs.maintenance)/2).toFixed(1)) + '</span></td></tr>';
                
    varResult+= '<tr><td align="left">' + repairs_text + '</td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.repairs_improv.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left"><b><span class="p3"><?echo $PARKING?></span></b></td>'+
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.parking.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left">' + tolls_text + '</td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.tolls.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left">' + fines_text + '</td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.fines.toFixed(1)) + '</span></td></tr>';
    
    varResult+= '<tr><td align="left">' + washing_text + '</td>' +
                '<td>&nbsp;<span class="p2">' + countryCheck(data.monthly_costs.washing.toFixed(1)) + '</span></td></tr>';
    
    //TOTAL - Running costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b><?echo $TOTAL_VARIABLE?></b></td>"+
                "<td>&nbsp;<b><span class=\"p2\">" + countryCheck(data.total_running_costs_month.toFixed(1)) + "</span></b></td></tr>";
    
    //costs per unit distance
    if(data.distance_per_month != 0){
        varResult+= "<tr><td><b><span class=\"p3\"><?echo $RUN_CP_DIST?></span></b></td>"+
                    "<td><span class=\"p2\">&nbsp;" + countryCheck(data.running_costs_p_unit_distance.toFixed(2)) + "/<?echo $STD_DIST?> </span></td></tr>";
        
        varResult+= "<tr><td><b><span class=\"p3\"><?echo $TOTAL_CP_DIST?></span></b></td>" +
                    "<td><span class=\"p2\">&nbsp;" + countryCheck(data.total_costs_p_unit_distance.toFixed(2)) + "/<?echo $STD_DIST?> </span></td></tr>";
    }

    //TOTAL
    varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b><span class=\"p3\"><?echo $WORD_TOTAL_CAP?></span></b></td>"+
               "<td><b><span class=\"p2\">" + countryCheck(data.total_costs_month.toFixed(0)) + "/<?echo $MONTH?></span></b></td></tr>";
    
    varResult+="</table></center>";
        
    return varResult;
}

/*Public transports table (result_table2)*/
function print_publict_table(f1, f2, f3, data){

    var varResult = "";
    if(data.public_transports.display_tp()) {
        var tp_text, outros_tp_text, taxi_text;

        tp_text="<b><span class=\"p3\"><?echo $PUB_TRANS_TEXT?></span></b><br><span class=\"p2\"><?echo $FAM_NBR?>: " + f3.n_pess_familia + " <?echo $PERSON_OR_PEOPLE?>"
                + "<br><?echo $PASS_MONTH_AVG?>: " + f3.pmpmpc + "<?echo $CURR_SYMBOL?></span>";
        
        if(data.public_transports.racio_custocar_caustotp < data.public_transports.racio_outros_tp){
            outros_tp_text="<b><span class=\"p3\"><?echo $OTHER_PUB_TRANS?></span></b><br><span class=\"p2\"><?echo $OTHER_PUB_TRANS_DESC?> </span>";
        }
        taxi_text="<b><span class=\"p3\"><?echo $TAXI_DESL?><\/span><\/b><br><span class=\"p2\">" + data.public_transports.n_km_taxi.toFixed(1) + " <?echo $STD_DIST?> <?echo $ON_TAXI_PAYING?> " + data.public_transports.taxi_price_per_km.toFixed(1) + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
        
        //starts HTML table
        varResult+="<br><center><table class=\"result_table\" id=\"result_table2\" cellpadding=\"4\">";
        //header
        varResult+="<tr><td><b><span class=\"p3\"><?echo $PUBL_TRA_EQUIV?></span></b><br></td>"+
                   "<td><b><span class=\"p3\"><?echo $MONTHLY_AMOUNT?></span></b></td></tr>";
        //items
        varResult+="<tr><td>" + tp_text + "</td>" + 
                   "<td>&nbsp;<span class=\"p2\">" + countryCheck(data.public_transports.preco_total_tp.toFixed(1)) + "</span></td></tr>";
        
        varResult+="<tr><td>" + taxi_text + "</td>" + 
                   "<td>&nbsp;<span class=\"p2\">" + countryCheck(data.public_transports.custo_taxi.toFixed(1)) + "</span></td></tr>";
        
        //in case other means of transport are shown besides taxi and urban public transports
        if(data.public_transports.display_outros_tp) {
            varResult+="<tr><td>" + outros_tp_text + "</td>" +
                       "<td>&nbsp;<span class=\"p2\">"+countryCheck(data.public_transports.outros_tp.toFixed(1))+"</span></td></tr>";
        }
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b><span class=\"p3\"><?echo $WORD_TOTAL_CAP?></span></b></td>"+
                   "<td><b><span class=\"p2\">" + countryCheck(data.public_transports.total_altern.toFixed(0)) + "/<?echo $MONTH?></span></b></td></tr>";
        
        varResult+="</table></center>";
    }
    return varResult;
}

/*Financial effort table (result_table3)*/
function print_feffort_table(f1, f2, f3, data){
    
    var varResult = "";
    varResult+="<br><center><table class=\"result_table\" id=\"result_table3\" cellpadding=\"4\">";
    varResult+="<tr><td colspan=\"2\"><b><span class=\"p3\"><?echo $FINANCIAL_EFFORT?></span></b></td></tr>";
    //income
    varResult+="<tr><td colspan=\"2\"><b><span class=\"p3\"><?echo $EXTRA_DATA_INCOME?></span></b></tr>";
    switch(f3.income_type){
        case 'year':    
            varResult+= "<tr><td><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $YEAR?></span></td>" + 
                        "<td style=\"width:20%\"><span class=\"p2\">" + countryCheck(data.fin_effort.income) + "</span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>" + 
                        "<td><span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</span></td></tr>";
            break;
        case 'month':
            varResult+= "<tr><td><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $MONTH?></span></td>" + 
                        "<td style=\"width:20%\"><span class=\"p2\">" + countryCheck(data.fin_effort.income) + "</span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $NUMBER_OF_MONTHS?></span></td>" + 
                        "<td><span class=\"p2\">" + data.fin_effort.income_per_type + "</span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>" + 
                        "<td><span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $YEAR?></span></td>" + 
                        "<td><span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_year.toFixed(1)) + "</span></td></tr>";
            break;
        case 'week':
            varResult+= "<tr><td><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $WEEK?></span></td>" + 
                        "<td style=\"width:20%\"><span class=\"p2\">" + countryCheck(data.fin_effort.income) + "</span></td></tr>"+
                        "<tr><td><span class=\"p2\"><?echo $NUMBER_OF_WEEKS?></span></td>" + 
                        "<td><span class=\"p2\">" + data.fin_effort.income_per_type + "</span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>" + 
                        "<td><span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</span></td></tr>"+
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $YEAR?></span></td>" + 
                        "<td><span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;  
        case 'hour':
            varResult+= "<tr><td><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $HOUR?></span></td>" + 
                        "<td style=\"width:20%\"><span class=\"p2\">" + countryCheck(data.fin_effort.income) + "</span></td></tr>"+
                        "<tr><td><span class=\"p2\"><?echo $NUMBER_OF_HOURS?></span></td>" + 
                        "<td><span class=\"p2\">" + data.fin_effort.income_hours_per_week + " <?echo $HOUR_ABBR?></span></td></tr>"+
                        "<tr><td><span class=\"p2\"><?echo $NUMBER_OF_WEEKS?></span></td>" + 
                        "<td><span class=\"p2\">" + data.fin_effort.income_per_type + "</span></td></tr>"+
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>" + 
                        "<td><span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_month.toFixed(1)) + "</span></td></tr>"+
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $YEAR?></span></td>" + 
                        "<td><span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;          
    }
    //working time
    if(f3.income_type != 'hour'){
        varResult+=     "<tr><td colspan=\"2\"><b><span class=\"p3\"><?echo $EXTRA_DATA_WORKING_TIME?></span></b></tr>";
        if(f3.is_working_time == 'true'){
            varResult+= "<tr><td><span class=\"p2\"><?echo $HOURS_PER?> <?echo $WEEK?></span></td>" +
                        "<td><span class=\"p2\">"+data.fin_effort.time_hours_per_week+" <?echo $HOUR_ABBR?></span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $MONTHS_PER?> <?echo $YEAR?></span></td>" + 
                        "<td><span class=\"p2\">"+data.fin_effort.time_month_per_year+"</span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $AVERAGE_WORKING_HOURS_PER?> <?echo $MONTH?></span></td>" + 
                        "<td><span class=\"p2\">"+data.fin_effort.aver_work_time_per_m.toFixed(1)+" <?echo $HOUR_ABBR?></span></td></tr>" +
                        "<tr><td><span class=\"p2\"><?echo $WORKING_HOURS_PER?> <?echo $YEAR?></span></td>" + 
                        "<td><span class=\"p2\">"+data.fin_effort.work_hours_per_y.toFixed(1)+" <?echo $HOUR_ABBR?></span></td></tr>";
        }
        else{
            varResult+= "<tr><td colspan=\"2\"><span class=\"p2\"><?echo $WORKING_TIME_MESSAGE?></span></td></tr>";
        }
    }           
    varResult+= "<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $HOUR?></span></td>" +
                "<td>&nbsp;<span class=\"p2\">" + countryCheck(data.fin_effort.aver_income_per_hour.toFixed(1)) + "</span></td></tr>";
    
    //distance
    varResult+= "<tr><td colspan=\"2\"><b><span class=\"p3\"><?echo $DISTANCE?></span></b></td></tr>";
    if((f2.type_calc_fuel != 'km' && f3.drive_to_work == 'true') || (f2.type_calc_fuel != 'km' && f2.take_car_to_job == 'true')){   
        varResult+=  "<tr><td><span class=\"p2\"><?echo $DIST_HOME_JOB?></span></td>"  +  
                     "<td><span class=\"p2\">" + parseInt(f3.dist_home_job).toFixed(1) + " <?echo $STD_DIST?></span></td></tr>"+
                     "<tr><td><span class=\"p2\"><?echo $DAYS_DRIVE_JOB?></span></td>"  +  
                     "<td><span class=\"p2\">" + f3.drive_to_work_days_per_week + " <?echo $DAYS?></span></td></tr>" +
                     "<tr><td><span class=\"p2\"><?echo $DIST_JORNEY_WEEKEND?></span></td>" + 
                     "<td><span class=\"p2\">" + parseInt(f3.journey_weekend).toFixed(1) + " <?echo $STD_DIST?></span></td></tr>"+
                     "<tr><td><span class=\"p2\"><?echo $AVERAGE_DIST_PER_WEEK?></span></td>" + 
                     "<td><span class=\"p2\">" + data.fin_effort.aver_drive_per_week.toFixed(1) + " <?echo $STD_DIST?></span></td></tr>";                  
    }

    varResult+=  "<tr><td><span class=\"p2\"><?echo $YOU_DRIVE_PER?> <?echo $MONTH?></span></td>" +
                 "<td><span class=\"p2\">" + data.distance_per_month.toFixed(1) + " <?echo $STD_DIST?></span></td></tr>" +
                 "<tr><td><span class=\"p2\"><?echo $YOU_DRIVE_PER?> <?echo $YEAR?></span></td>" + 
                 "<td><span class=\"p2\">" + data.fin_effort.drive_per_year.toFixed(1) + " <?echo $STD_DIST?></span></td></tr>";  

    //time spent in driving
    varResult+=  "<tr><td colspan=\"2\"><b><span class=\"p3\"><?echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING?></span></b></td></tr>";

    if(f3.drive_to_work == 'true' || f2.take_car_to_job == 'true'){
        varResult+= "<tr><td><span class=\"p2\"><?echo $MINUTES_HOME_JOB?></span></td>" + 
                    "<td><span class=\"p2\">" + f3.time_home_job + " <?echo $MIN?></span></td></tr>" +
                    "<tr><td><span class=\"p2\"><?echo $DAYS_DRIVE_TO_JOB?></span></td>" + 
                    "<td><span class=\"p2\">" + f3.drive_to_work_days_per_week + " <?echo $DAYS?></span></td></tr>" +
                    "<tr><td><span class=\"p2\"><?echo $TIME_DRIVE_WEEKEND?></span></td>" + 
                    "<td><span class=\"p2\">" + f3.time_weekend + " <?echo $MIN?></span></td></tr>" +
                    "<tr><td><span class=\"p2\"><?echo $MINUTES_DRIVE_PER?> <?echo $WEEK?></span></td>" + 
                    "<td><span class=\"p2\">" + data.fin_effort.min_drive_per_week + " <?echo $MIN?></span></td></tr>";
    }
    else{
        varResult+= "<tr><td><span class=\"p2\"><?echo $MINUTES_DRIVE_PER?> <?echo $DAY?></span></td>" + 
                    "<td><span class=\"p2\">" + f3.min_drive_per_day + " <?echo $MIN?></span></td></tr>" +
                    "<tr><td><span class=\"p2\"><?echo $DAYS_DRIVE_PER_MONTH?></span></td>" + 
                    "<td><span class=\"p2\">" + f3.days_drive_per_month + " <?echo $DAYS?></span></td></tr>";
    }

    varResult+= "<tr><td><span class=\"p2\"><?echo $HOURS_DRIVE_PER?> <?echo $MONTH?></span></td>" + 
                "<td><span class=\"p2\">" + data.fin_effort.hours_drive_per_month.toFixed(1) + " <?echo $HOUR_ABBR?></span></td></tr>"+
                "<tr><td><span class=\"p2\"><?echo $HOURS_DRIVE_PER?> <?echo $YEAR?></span></td>" + 
                "<td><span class=\"p2\">" + data.fin_effort.hours_drive_per_year.toFixed(1) + " <?echo $HOUR_ABBR?></span></td></tr>";;

    //financial effort
    varResult+= "<tr><td colspan=\"2\"><b><span class=\"p3\"><?echo $FINANCIAL_EFFORT?></span></b>" +
                "<tr><td><span class=\"p2\"><?echo $TOTAL_COSTS_PER_YEAR?></span></td>" + 
                "<td><span class=\"p2\">" + countryCheck(data.fin_effort.total_costs_year.toFixed(1)) + "</span></td></tr>" +
                "<tr><td><span class=\"p2\"><?echo $HOURS_TO_AFFORD_CAR?></span></td>"  +  
                "<td><span class=\"p2\">" + data.fin_effort.hours_per_year_to_afford_car.toFixed(1) + " <?echo $HOUR_ABBR?></span></td></tr>"+
                "<tr><td><span class=\"p2\"><?echo $MONTHS_TO_AFFORD_CAR?></span></td>" +  
                "<td><span class=\"p2\">" + data.fin_effort.month_per_year_to_afford_car.toFixed(2)+"</span></td></tr>"+
                "<tr><td><span class=\"p2\"><?echo $DAYS_CAR_PAID?></span></td>" +  
                "<td><span class=\"p2\">" + Math.ceil(data.fin_effort.days_car_paid) + " <?echo $DAYS?></span></td></tr>";
           

    //speed
    varResult+= "<tr><td><span class=\"p2\"><?echo $AVER_YEARLY?> <?echo $KINETIC_SPEED?></span></td>"+
                "<td><span class=\"p2\">" + data.fin_effort.kinetic_speed.toFixed(1) + " <?echo $STD_DIST?>/h</span></td></tr>";
                        
    varResult+= "<tr><td><span class=\"p2\"><?echo $AVER_YEARLY?> <a href=\"./docs/consumer_speed.html\" target=\"_blank\"><?echo $VIRTUAL_SPEED?></a></span></td>"+
                "<td><span class=\"p2\">" + data.fin_effort.virtual_speed.toFixed(1) + " <?echo $STD_DIST?>/h</span></td></tr>";
    
    varResult+="</table></center>";     
    
    return varResult;
}

/*External costs table (result_table4)*/
function print_extern_table(f1, f2, f3, data){ 
            
    var epa_text      = "<b><span class=\"p3\">Emissões de poluentes atmosféricos</span></b><br><span class=\"p2\">Valor aproximado: " + data.external_costs.polution + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var egee_text     = "<b><span class=\"p3\">Emissões de gases de efeito de estufa</span></b><br><span class=\"p2\">Valor aproximado: " + data.external_costs.ghg + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var ruido_text    = "<b><span class=\"p3\">Poluição sonora</span></b><br><span class=\"p2\">Valor aproximado: " + data.external_costs.noise + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var sr_text       = "<b><span class=\"p3\">Sinistralidade rodoviária</span></b><br><span class=\"p2\">Valor aproximado: " + data.external_costs.fatalities + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var cgstn_text    = "<b><span class=\"p3\">Congestionamento<\/span></b><br><span class=\"p2\">Valor aproximado: " + data.external_costs.congestion + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var ifr_estr_text = "<b><span class=\"p3\">Desgaste das infraestruturas rodoviárias</span></b><br><span class=\"p2\">Valor aproximado: " + data.external_costs.infrastr + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var source_ext_costs  = "<b><span class=\"p2\">Fonte dos dados:</span></b><br><span class=\"p2\"><i><a href=\"" + data.external_costs.handbook_extern_URL + "\">Handbook on estimation of external costs in the transport sector</a>, </i>Comissão Europeia</span>";
    
    var varResult     = "";
    
    if(<?if ($GLOBALS['country']=="PT") echo 'data.distance_per_month != 0'; else echo "false";?>){
        varResult+="<br><center><table class=\"result_table\" id=\"result_table4\" cellpadding=\"4\">";

        //header
        varResult+="<tr><td><b><span class=\"p3\">Custos externos para o país</span></b><br><span class=\"p2\">Percorre " +(1 * data.distance_per_month).toFixed(1)+" <?echo $STD_DIST?>/<?echo $MONTH?></span></td>" +
                   "<td width=\"20%\"><b><span class=\"p3\"><?echo $MONTHLY_AMOUNT?></span></b></td></tr>";
        
        //external costs items
        varResult+="<tr><td>" + epa_text + "</td>" +   
                   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + (data.external_costs.polution * data.distance_per_month).toFixed(1)+"</span></td></tr>";
                
        varResult+="<tr><td>" + egee_text + "</td>" + 
                   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + (data.external_costs.ghg * data.distance_per_month).toFixed(1)+"</span></td></tr>";
                
        varResult+="<tr><td>" + ruido_text + "</td>" + 
                   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + (data.external_costs.noise * data.distance_per_month).toFixed(1)+"</span></td></tr>";
                
        varResult+="<tr><td>" + sr_text + "</td>" + 
                   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + (data.external_costs.fatalities * data.distance_per_month).toFixed(1)+"</span></td></tr>";
                
        varResult+="<tr><td>" + cgstn_text + "</td>" + 
                   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + (data.external_costs.congestion * data.distance_per_month).toFixed(1)+"</span></td></tr>";
                
        varResult+="<tr><td>" + ifr_estr_text + "</td>" + 
                   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + (data.external_costs.infrastr * data.distance_per_month).toFixed(1)+"</span></td></tr>";
        
         //total
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b><span class=\"p3\"><?echo $WORD_TOTAL_CAP?></span></b></td>" +
                   "<td><b><span class=\"p2\"><?echo $CURR_SYMBOL?>&nbsp;"+data.external_costs.total_exter().toFixed(0)+"/<?echo $MONTH?></span></b></td></tr>";
        
        //reference to source
        varResult+="<tr><td colspan=\"2\">"+ source_ext_costs +"</td></tr>";        
 
        varResult+="</table></center>";     
    }   
            
    return varResult;
}

function countryCheck(value){   
    var res = "<?echo $CURR_SYMBOL?>&nbsp;" + value;
    if('<?echo $GLOBALS['country'] ?>'=='FI'){
        res = value + "&nbsp;<?echo $CURR_SYMBOL?>" ;
    }
    return res;
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
        $("#text_div").css('padding', '0');
        $("#text_div").children().first().css('border-top', 'none');
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
    var bar_chart_height=parseInt(bar_chart_width*35/50);

    drawBarChart(parseFloat(data.total_standing_costs_month.toFixed(1)), 
        parseFloat(data.total_running_costs_month.toFixed(1)),
        bar_chart_width,
        bar_chart_height
    );

    //adjust the charst divs
    $("#pie_chart_div").css('display', 'inline-block');
    $("#pie_chart_div").css('width', 'auto');
    $("#bar_chart_div").css('display', 'inline-block');
    $("#bar_chart_div").css('width', 'auto');
    
    if(data.total_costs_month >= 150 && data.age_months > 6) {
        var text_msg="<div style=\"border-top:rgb(180, 180, 180) 3px solid;\"><br><div id=\"final-text1\" class=\"p3\"><?echo $YOUR_CAR_COSTS_YOU?> <b>"+(data.total_costs_year / 100).toFixed(0)*100 + " <?echo $CURR_NAME_PLURAL?><\/b> <?echo $WORD_PER?> <?echo $YEAR?>.<br>";
        text_msg+="<?echo $WITH_THIS_LEVEL_OF_COSTS?> " + data.age_months + " <?echo $MONTHS_POSS?></div><br><center><div id=\"final-text2\" style=\"float: center;display: inline-block;padding:2%;font-size:350%;font-weight:bold; width:auto; font-family:Impact; color:red; border-style:solid; border-width:5px\">" + numberWithSpaces((data.age_months * data.total_costs_month / 100).toFixed(0)*100) + " <?echo $CURR_NAME_BIG_PLURAL?><\/div></center><\/div><br>";
        text_object.innerHTML=text_msg;
        text_object.style.display='block';
    }
    

}