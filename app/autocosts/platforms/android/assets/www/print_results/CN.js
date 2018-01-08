
//function that is run when user clicks "run/calculate"
function Run2(callback){

    //test if the form user inputs are correct
    if (!is_userdata_formpart1_ok()){ return false;}
    if (!is_userdata_formpart2_ok()){ return false;}
    if (!is_userdata_formpart3_ok()){ return false;}

    //for each form part gets object with content
    var f1 = get_form_part1();
    var f2 = get_form_part2();
    var f3 = get_form_part3();

    //country object with country specific variables
    var country = {
        currency: "CNY",
        distance_std: 1,
        fuel_efficiency_std: 1,
        fuel_price_volume_std: 1,
        taxi_price: 1.5    };

    //calculate costs
    var data = calculate_costs(f1, f2, f3, country);
    CalculatedData = data; //assigns to global variable

    //hides the form input
    $("#input_div").hide();

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
        fin_effort_bool = true; //global variable
    }
    else{
        $("#fin_effort, #fin_effort_section").hide();
        fin_effort_bool = false;
    }

    //public transports table
    if(data.public_transports_calculated){        
        var public_transport_table_HTML = print_AlternativeToCarCosts_table(f1, f2, f3, data, country);
        if(public_transport_table_HTML !== ""){
            $("#alternative_to_carcosts, #alternative_to_carcosts_section").show("slow");
            $("#alternative_to_carcosts").html(public_transport_table_HTML);
        }
        else{
            $("#alternative_to_carcosts_section").hide();
        }
    }
    else{
        $("#alternative_to_carcosts_section").hide();
    }

    //external costs table
    var extern_costs_table_table_HTML = print_extern_table(f1, f2, f3, data);
    if (extern_costs_table_table_HTML !== ""){
        $("#extern_costs").html(extern_costs_table_table_HTML);
        $("#extern_costs, #exten_costs_section").show("slow");
        extern_costs_bool = true; //global variable
    }
    else{
        $("#exten_costs_section").hide();
        extern_costs_bool = false;
    }

    //shows buttons
    $("#result_buttons_div, #buttons_section").show("slow");
    
    //shows social media buttons
    if(SOCIAL_SWITCH){
        $("#shareIcons").jsSocials({
            url: 'http://autocosts.info/CN',
            text: '该计算器可核算出在中国拥有一台汽车的实际成本， 可准确预估拥有一台私家车最终需投入的成本。 由于各种汽车账单的时间核算不一， 因此很难弄清您在汽车上到底花了多少钱。您需按照实际情况输入参数值，另外对于车子维修或罚款类的特殊账单，建议您参考过去几年在此类项目上的支出，默认按月计算，请保持到小数点后1位。例如：家庭与公司的距离为8',
            showLabel: false,
            showCount: false,
            shares: ["email", "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
        });
    }

    //deactivates downloadPDF button until PDF files are loaded
    if (!hasLoadedPart[3] && PDF_SWITCH){
        $("#generate_PDF").prop("disabled",true).addClass("buttton_disabled");
    }

    //enlarges center div
    $("#div1_td").css("width", "15%");
    $("#div3_td").css("width", "15%");

    //gets result frame width to draw charts within it
    var frame_witdh = document.getElementById("div2").offsetWidth;
    drawChartResult(frame_witdh, data);

    //hides description, left and right columns
    $("#div1").css("display", "none");
    $("#div3").css("display", "none");
    $("#description").html("");

    //global variable indicating the results are being shown
    ResultIsShowing=true;

    //calls the callback() if it's a function
    if (typeof callback === 'function'){
        
        $("*").promise().done(callback);
    }
    
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
    varResult+= '<tr><td style="padding:7px;" colspan="4"><b>成本核算结果</b></td></tr>';
    
    varResult+= '<tr>';
    
    varResult+= '<td><b>' + currencyShow(data.total_costs_month.toFixed(0)) + '</b><br>';
    varResult+= '每<br>月</td>';
    
    varResult+= '<td><b>' + currencyShow((data.total_costs_month*3).toFixed(0)) + '</b><br>';
    varResult+= '每<br>3个月';
    
    varResult+= '<td><b>' + currencyShow((data.total_costs_month*6).toFixed(0)) + '</b><br>';
    varResult+= '每<br>4个月</td>';
    
    varResult+= '<td><b>' + currencyShow(data.total_costs_year.toFixed(0)) + '</b><br>';
    varResult+= '每<br>年</td>';
    
    varResult+= '</tr>';
    
    if(f3.IsFinancialEffort){
        varResult+= '<tr><td colspan="4"><b>经济情况'+
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
        
        var text_msg = '<div>基于这种成本开销，您的车在 '+
                       '<b>' + data.age_months + '</b> 个月内已经花费:</div>'+
                       '<div class="red_bold_text">'+
                       numberWithSpaces((data.age_months * data.total_costs_month / 100).toFixed(0)*100)+
                       ' ' + '元</div></div>';
        return text_msg;
    }
    else{
        return "";
    }
}

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************

//use for varible double quotes " instead of ' because some text varuiables might contain ' such as the English word "don't"
//Example varResult+= "<table class=\"result_table\" id=\"result_table1\">"

/*Montlhy costs table (result_table1)*/
function print_costs_table(f1, f2, f3, data) {
    
    //Depreciation
    var depreciation_text;
    if (data.age_months === 0) {    
        depreciation_text = "折旧不适用，因为汽车是全新的&nbsp;&nbsp;";
    } else {
        depreciation_text = "<b>车辆折旧费<\/span></b>&nbsp;&nbsp;<br>购车价格: "+
            f1.auto_initial_cost + "元<br>当前价值: "+
            f1.auto_final_cost + "元<br>买车年限: "+
            data.age_months + " 月<br>("+
            f1.auto_initial_cost + "元-"+
            f1.auto_final_cost + "元)/"+
            data.age_months + " 月";
    }
    
    //Insurance
    var insurance_text;
    switch(f1.insurance_type)
    {
        case "semestral":
            insurance_text = f1.insurance_value + " 元 每 4个月";
            break;
        case "anual":
            insurance_text = f1.insurance_value + " 元 每 年";
            break;
        case "mensal":
            insurance_text = data.monthly_costs.insurance + " 元 每 月";
            break;
        case "trimestral":
            insurance_text = f1.insurance_value + " 元 每 3个月";
            break;
    }
    
    //Credit interests
    var interests_text="<b>贷款利率<\/b>&nbsp;&nbsp;";
    
    if(f1.cred_auto_s_n == "true") {

        interests_text = "<b>贷款利率</b>&nbsp;&nbsp;<br>贷款金额: " +
                         f1.credit_amount +
                         "元<br>贷款期限 / 分期付款数量: " +
                         f1.credit_period +
                         " 月<br>每月平均价值: " +
                         f1.credit_value_p_month +
                         "元<br>残值: " +
                         f1.credit_residual_value +
                         "元<br>";    

        interests_text += "利息总额: "+data.total_interests+"元<br>(" + data.month_cred + "*"+ f1.credit_value_p_month + ")+" + f1.credit_residual_value + "-" + f1.credit_amount;

        if(data.age_months >= data.month_cred)
            interests_text += "<br>每月利息: "+data.monthly_costs.credit.toFixed(2)+"元";
        interests_text += "";
    } 
    
    //Inspection
    var inspection_text;
    if (f1.nmr_times_inspec !== 0){
        inspection_text = "<b>车检费 (汽车性能测试)</b><br>" +
                          f1.nmr_times_inspec +
                          " 成本发生的次数 " +
                          f1.inspec_price +
                          " 元 每次间隔时间 " +
                          data.age_months + " 月&nbsp;";
    }
    else        
        inspection_text = "<b>车检费 (汽车性能测试)</b><br>";
    
    //Taxes
    var cartax_text = "<b>汽车购置税 (汽车税)</b><br>" +
                      f1.car_tax + " 元 每 年";
    
    //Fuel
    var fuel_text;
    switch(f2.type_calc_fuel){
        case "km":                     
            if (f2.take_car_to_job == "false"){
                switch(data.fuel_period_km)
                {
                    case "1":
                        fuel_text = f2.distance + " 公里 每 月";
                        break;
                    case "2":                   
                        fuel_text = f2.distance + " 每2个月的公里数";
                        break;
                    case "3":                   
                        fuel_text = f2.distance + " 公里 每 3个月";
                        break;
                    case "4":                   
                        fuel_text = f2.distance + " 公里 每 4个月";
                        break;
                    case "5":                   
                        fuel_text = f2.distance + " 公里 每 年";
                        break;
                }
                fuel_text = fuel_text + "<br>" + "您汽车的燃油效率: " + f2.car_consumption + " 升/百公里&nbsp;";
                fuel_text = fuel_text + "<br>" + "燃油平均价格: " + f2.fuel_price + " 元/升&nbsp;&nbsp;";
            }
            else{
                fuel_text = f2.days_p_week + " 每周您开车去上班的天数 <br>";
                fuel_text = fuel_text + "您驾驶 " + f2.distance_home2job + " 家到公司的公里数 <br>";
                fuel_text = fuel_text + "您驾驶 " + f2.distance_weekend + " 不开车上班时，您的平均里程数&nbsp;<br>";
                fuel_text = fuel_text + "您平均驾驶 " + data.distance_per_month.toFixed(1) + " 公里 每 月 (~30.5 日) <br>";
                fuel_text = fuel_text + "您汽车的燃油效率: " + f2.car_consumption + " 升/百公里";
                fuel_text = fuel_text + "<br>" + "您平均花费的燃油成本: " + f2.fuel_price + " 元/升";
            }
            break;
        case "euros":
            switch(data.fuel_cost_period)
            {
                case "1":
                    fuel_text = f2.fuel_money + " 元 每 月";
                    break;
                case "2":                   
                    fuel_text = f2.fuel_money + " 每2个月的公里数";
                    break;
                case "3":                   
                    fuel_text = f2.fuel_money + " 元 每 3个月";
                    break;
                case "4":                   
                    fuel_text = f2.fuel_money + " 元 每 4个月";
                    break;
                case "5":                   
                    fuel_text = f2.fuel_money + " 元 每 年";
                    break;
            }
            break;
    }
    
    //Maintenance
    var maintenance_text = "<b>1/2 保养费</b><br>" +
                           f2.maintenance + " 元 每 年";
    
    //Repairs
    var repairs_text = "<b>维修及改装费<\/span></b><br>" +
                       f2.repairs + " 元 每 年";
    
    //Tolls
    var tolls_text="<b>通行费</b><br>";
    if(f2.type_calc_tolls == "false") {
        switch(data.tolls_period) {
            case "1":
                tolls_text += f2.tolls + " 元 每 月";
                break;
            case "2":
                tolls_text += f2.tolls + " 元 每个 2个月";
                break;
            case "3":
                tolls_text += f2.tolls + " 元 每 3个月";
                break;
            case "4":
                tolls_text += f2.tolls + " 元 每 4个月";
                break;
            case "5":
                tolls_text += f2.tolls + " 元 每 年";
                break;
        }
    }
    else 
        tolls_text+=f2.price_tolls_p_day + " 元 期间 " + f2.tolls_days_p_month + " 月";
    tolls_text += "";
    
    //Fines
    var fines_text="<b>交通罚单</b><br>";
    switch(data.fines_period) {
        case "1":           
            fines_text += f2.fines + " 元 每 月";
            break;
        case "2":           
            fines_text += f2.fines + " 元 每个 2个月";
            break;
        case "3":           
            fines_text += f2.fines+" 元 每 3个月";
            break;
        case "4":           
            fines_text += f2.fines + " 元 每 4个月";
            break;
        case "5":           
            fines_text += f2.fines + " 元 每 年";
            break;
        }
    fines_text+="";
    
    //washing
    var washing_text="<b>清洗费</b><br>";
    switch(data.washing_period) {
        case "1":
            washing_text += f2.washing + " 元 每 月";
            break;
        case "2":
            washing_text += f2.washing + " 元 每个 2个月";
            break;
        case "3":
            washing_text += f2.washing +" 元 每 3个月";
            break;
        case "4":
            washing_text += f2.washing + " 元 每 4个月";
            break;
        case "5":
            washing_text += f2.washing + " 元 每 年";
            break;
        }
    washing_text+="";
    
    //*************************************************
    //*************************************************

    //############
    //Standing/fixed costs table
    var varResult= "";
    varResult+= "<table class=\"result_table costs_table\">";
    
    //Standing Costs Header
    varResult+= "<tr><td style=\"padding:10px 50px;\" colspan=\"2\"><b>固定成本</b><br>" +
                "<i>与驾驶距离无关，但即使不用车也必须支付的费用</i></td></tr>";
    
    //Costs || Monthly amount
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b>成本</b></td>" +
                "<td><b>每月金额</b></td></tr>";
    
    //standing costs items
    varResult+= "<tr><td>" + depreciation_text + "&nbsp;</td>" + 
                "<td>&nbsp;" + currencyShow(data.monthly_costs.depreciation.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td><b>汽车保险与故障保险费</b><br>" + insurance_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.insurance.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + interests_text + "&nbsp;</td>" + 
                "<td>&nbsp;" + currencyShow(data.monthly_costs.credit.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + inspection_text + "</td>" + 
                "<td>&nbsp;" + currencyShow(data.monthly_costs.inspection.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + cartax_text + "</td>" + 
                "<td>&nbsp;" + currencyShow(data.monthly_costs.car_tax.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + maintenance_text + "</td>" +
                "<td>&nbsp;" + currencyShow(((data.monthly_costs.maintenance)/2).toFixed(1)) + "</td></tr>";
    
    //TOTAL - Standing costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b>总计 - 固定成本</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + "/月</b></td></tr>";
    
    varResult+="</table>";
    
    varResult+="<br>";
    
    //#############
    //Running costs table
    varResult+= "<table class=\"result_table costs_table\">";
    
    //Running Costs Header
    varResult+= "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>行驶成本</b><br>" +
                "<i>与驾驶距离相关的费用</i></td></tr>";
                  
    //Costs || Monthly amount
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b>成本</b></td>" +
                "<td><b>每月金额</b></td></tr>";

    varResult+= "<tr><td><b>燃油费</b><br>" + fuel_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.fuel.toFixed(1)) + "</td></tr>";

    varResult+= "<tr><td>" + maintenance_text + "</td>" +
                "<td>&nbsp;" + currencyShow(((data.monthly_costs.maintenance)/2).toFixed(1)) + "</td></tr>";
                
    varResult+= "<tr><td>" + repairs_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.repairs_improv.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td><b>停车费</b></td>"+
                "<td>&nbsp;" + currencyShow(data.monthly_costs.parking.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + tolls_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.tolls.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + fines_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.fines.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + washing_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.washing.toFixed(1)) + "</td></tr>";
    
    //TOTAL - Running costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b>总计 - 行驶成本</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + "/月</b></td></tr>";
    
    varResult+="</table>";
    
    varResult+="<br>";
    
    //############
    //Costs per unit distance and TOTAL    
    varResult+= "<table class=\"result_table costs_table total_costs_table\">";
    
    varResult+= "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>总计</b><br></td></tr>"; 

    if((typeof data.distance_per_month) !== 'undefined' && data.distance_per_month !== 0){
              
        varResult+= "<tr><td><b>每公里行驶成本</b></td>"+
                    "<td>&nbsp;" + currencyShow(data.running_costs_p_unit_distance.toFixed(2)) + "/公里 </td></tr>";
        
        varResult+= "<tr><td class=\"border_bottom_2px\"><b>每公里总成本</b></td>" +
                    "<td class=\"border_bottom_2px\">&nbsp;" + currencyShow(data.total_costs_p_unit_distance.toFixed(2)) + "/公里 </td></tr>";
    }

    varResult+= "<tr><td><b>固定成本</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + "/月</b></td></tr>";
    
    varResult+= "<tr><td><b>行驶成本</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + "/月</b></td></tr>";    
    
    varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>总计</b></td>"+
               "<td>&nbsp;<b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/月</b></td></tr>";

    varResult+="</table>"; 

    
    return varResult;
}
            
//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


/*Financial effort table (result_table3)*/
function print_feffort_table(f1, f2, f3, data){
    
    var varResult = "";
    varResult+="<table class=\"result_table\" id=\"result_table3\">";
    varResult+="<tr><td colspan=\"2\"><b>经济情况</b></td></tr>";
    //income
    varResult+="<tr><td colspan=\"2\"><b>收入</b></tr>";
    switch(f3.income_type){
        case 'year':    
            varResult+= "<tr><td>净收入 年</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td>平均净收入 月</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>";
            break;
        case 'month':
            varResult+= "<tr><td>净收入 月</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td>每年有收入月份数</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td>平均净收入 月</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>" +
                        "<tr><td>平均净收入 年</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "</td></tr>";
            break;
        case 'week':
            varResult+= "<tr><td>净收入 周</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td>每年有收入周数</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td>平均净收入 月</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td>平均净收入 年</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;  
        case 'hour':
            varResult+= "<tr><td>净收入 小时</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td>每周有收入小时数</td>" + 
                        "<td>" + data.fin_effort.income_hours_per_week + " h</td></tr>"+
                        "<tr><td>每年有收入周数</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>"+
                        "<tr><td>平均净收入 月</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td>平均净收入 年</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;          
    }
    //working time
    if(f3.income_type != 'hour'){
        varResult+=     "<tr><td colspan=\"2\"><b>工作时长</b></tr>";
        if(f3.is_working_time == 'true'){
            varResult+= "<tr><td>小时每 周</td>" +
                        "<td>"+data.fin_effort.time_hours_per_week+" h</td></tr>" +
                        "<tr><td>月每 年</td>" + 
                        "<td>"+data.fin_effort.time_month_per_year+"</td></tr>" +
                        "<tr><td>平均工作小时每 月</td>" + 
                        "<td>"+data.fin_effort.aver_work_time_per_m.toFixed(1)+" h</td></tr>" +
                        "<tr><td>工作小时每 年</td>" + 
                        "<td>"+data.fin_effort.work_hours_per_y.toFixed(1)+" h</td></tr>";
        }
        else{
            varResult+= "<tr><td colspan=\"2\">计算时默认每周平均工作36小时，每年平均工作11个月。</td></tr>";
        }
    }           
    varResult+= "<tr><td>平均净收入 小时</td>" +
                "<td>&nbsp;" + currencyShow(data.fin_effort.aver_income_per_hour.toFixed(1)) + "</td></tr>";
    
    //distance
    varResult+= "<tr><td colspan=\"2\"><b>距离</b></td></tr>";
    if((f2.type_calc_fuel != 'km' && f3.drive_to_work == 'true') || (f2.type_calc_fuel != 'km' && f2.take_car_to_job == 'true')){   
        varResult+=  "<tr><td>从家开车去工作</td>"  +  
                     "<td>" + parseInt(f3.dist_home_job).toFixed(1) + " 公里</td></tr>"+
                     "<tr><td>每周开车去工作的天数</td>"  +  
                     "<td>" + f3.drive_to_work_days_per_week + " 日</td></tr>" +
                     "<tr><td>不开车上班的时候您的驾驶情况</td>" + 
                     "<td>" + parseInt(f3.journey_weekend).toFixed(1) + " 公里</td></tr>"+
                     "<tr><td>您每周驾驶的平均距离</td>" + 
                     "<td>" + data.driving_distance.aver_drive_per_week.toFixed(1) + " 公里</td></tr>";                  
    }

    varResult+=  "<tr><td>您开车 月</td>" +
                 "<td>" + data.distance_per_month.toFixed(1) + " 公里</td></tr>" +
                 "<tr><td>您开车 年</td>" + 
                 "<td>" + data.driving_distance.drive_per_year.toFixed(1) + " 公里</td></tr>";  

    //time spent in driving
    varResult+=  "<tr><td colspan=\"2\"><b>驾驶时间</b></td></tr>";

    if(f3.drive_to_work == 'true' || f2.take_car_to_job == 'true'){
        varResult+= "<tr><td>开车上班需要多少分钟</td>" + 
                    "<td>" + f3.time_home_job + " 分钟</td></tr>" +
                    "<tr><td>每周您开车去上班的天数</td>" + 
                    "<td>" + f3.drive_to_work_days_per_week + " 日</td></tr>" +
                    "<tr><td>您不开车上班时，您驾驶时间是多少分钟</td>" + 
                    "<td>" + f3.time_weekend + " 分钟</td></tr>" +
                    "<tr><td>您开车多少分钟每 周</td>" + 
                    "<td>" + data.time_spent_driving.min_drive_per_week + " 分钟</td></tr>";
    }
    else{
        varResult+= "<tr><td>您开车多少分钟每 日</td>" + 
                    "<td>" + f3.min_drive_per_day + " 分钟</td></tr>" +
                    "<tr><td>每月您开车的天数</td>" + 
                    "<td>" + f3.days_drive_per_month + " 日</td></tr>";
    }

    varResult+= "<tr><td>您开车多少小时每 月</td>" + 
                "<td>" + data.time_spent_driving.hours_drive_per_month.toFixed(1) + " h</td></tr>"+
                "<tr><td>您开车多少小时每 年</td>" + 
                "<td>" + data.time_spent_driving.hours_drive_per_year.toFixed(1) + " h</td></tr>";

    //financial effort
    varResult+= "<tr><td colspan=\"2\"><b>经济情况" +
                ': ' + (data.total_costs_year/data.fin_effort.income_per_year*100).toFixed(0) + 
                '&#37;</b>' +
                "<tr><td>汽车每年的总成本</td>" + 
                "<td>" + currencyShow(data.fin_effort.total_costs_year.toFixed(1)) + "</td></tr>" +
                "<tr><td>您每年需要工作多少小时才能供一辆车</td>"  +  
                "<td>" + data.fin_effort.hours_per_year_to_afford_car.toFixed(1) + " h</td></tr>"+
                "<tr><td>您每年需要工作多少个月才能供一辆车</td>" +  
                "<td>" + data.fin_effort.month_per_year_to_afford_car.toFixed(2)+"</td></tr>"+
                "<tr><td>1月1日后，需要多久才能还清车款</td>" +  
                "<td>" + Math.ceil(data.fin_effort.days_car_paid) + " 日</td></tr>";
           

    //speed
    varResult+= "<tr><td>年均 运动速度</td>"+
                "<td>" + data.kinetic_speed.toFixed(1) + " 公里/h</td></tr>";
                        
    varResult+= "<tr><td>年均 <a href=\"./docs/consumer_speed.html\" target=\"_blank\">消费速度</a></td>"+
                "<td>" + data.virtual_speed.toFixed(1) + " 公里/h</td></tr>";
    
    varResult+="</table>";     
    
    return varResult;
}


//******************************************************************************************************************************************************
//******************************************************************************************************************************************************

/*Public transports table (result_table2)*/
function print_AlternativeToCarCosts_table(f1, f2, f3, data, country){

    var varResult = "";   
    if(data.public_transports.display_pt()) {
        
        public_transp_bool = true; //global variable
        var tp_text, outros_tp_text, taxi_text;

        tp_text = "<b>您家庭日常生活中的公共交通</b><br>您家庭成员中，有多少人年龄超过4岁: " + 
                  f3.n_pess_familia + " 人" +
                  "<br>每人月票平均金额: " + 
                  f3.monthly_pass_cost + "元";
        
        if(data.public_transports.pt_carcost_ratio < data.public_transports.other_pt_ratio_threshold){
            outros_tp_text="<b>其他公共交通</b><br>其他公共交通费以外的成本，例如去外地的长途火车或汽车成本 ";
        }
        taxi_text="<b>打的<\/span><\/b><br>" + data.public_transports.km_by_taxi.toFixed(1) + " 公里 的士费 " + data.public_transports.taxi_price_per_km.toFixed(1) + "元/公里";
        
        //starts HTML table
        varResult+="<table class=\"result_table\" id=\"result_table2\">";
        //header
        varResult+="<tr><td><b>成本</b><br></td>"+
                   "<td><b>每月金额</b></td></tr>";
        //items
        varResult+="<tr><td>" + tp_text + "</td>" + 
                   "<td>&nbsp;" + currencyShow(data.public_transports.total_price_pt.toFixed(1)) + "</td></tr>";
        
        varResult+="<tr><td>" + taxi_text + "</td>" + 
                   "<td>&nbsp;" + currencyShow(data.public_transports.taxi_cost.toFixed(1)) + "</td></tr>";
        
        //in case other means of transport are shown besides taxi and urban public transports
        if(data.public_transports.display_other_pt) {
            varResult+="<tr><td>" + outros_tp_text + "</td>" +
                       "<td>&nbsp;"+currencyShow(data.public_transports.other_pt.toFixed(1))+"</td></tr>";
        }
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>总计</b></td>"+
                   "<td><b>" + currencyShow(data.public_transports.total_altern.toFixed(0)) + "/月</b></td></tr>";
        
        varResult+="</table>";
    }
    else{
        public_transp_bool = false; //global variable
    }
    
    //UBER
    if(UBER_SWITCH){
        var res_uber_obj = get_uber(uber_obj, data, country);
        //alert(JSON.stringify(res_uber_obj, null, 4)); 
        if (res_uber_obj){
            uber_obj.print_bool=true; //says uber table is to be printed; global variable
            
            //add source in table for uber URL  
            var uber_url = "http://www.uber.com/" + 'en' + "/cities/";
            var uber_url_HTML = "<sup><a href=\"" + uber_url + "\">[*]</a></sup>";
            
            //in which driver can replace every journey by uber 
            if(res_uber_obj.result_type==1){
                //starts HTML table
                varResult+="<br><table class=\"result_table uber_table\" id=\"result_table_uber\">";
                
                varResult+="<tr><td><b>UBER - 成本 每 公里</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + "公里</td></tr>";
                
                varResult+="<tr><td><b>UBER - 成本 每 分钟</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "分钟</td></tr>";

                varResult+="<tr><td><b>您的里程数 每 月</b><br></td>"+
                           "<td>" + res_uber_obj.dpm.toFixed(0) + " " +"公里</td></tr>";
                
                           
                varResult+="<tr><td><b>您开车多少分钟每 月</b></td>" + 
                           "<td>" + res_uber_obj.mdpm.toFixed(0) + " " + "分钟</td></tr>";
                           
                varResult+="<tr><td><b>UBER: 成本 - 总计</b></td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.tuc.toFixed(0)) + "</b></td></tr>";                     

                varResult+="<tr><td><b>其他公共交通</b><br>其他公共交通费以外的成本，例如去外地的长途火车或汽车成本</td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";
                
                varResult+="<tr><td><b>总计</b></td>"+
                           "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/月</b></td></tr>";
                
                varResult+="</table>";       
            }
            
            //the case where uber equivalent is more expensive
            else if(res_uber_obj.result_type==2){ 
                //starts HTML table
                varResult+="<br><table class=\"result_table uber_table uber_table2\" id=\"result_table_uber\">";
                
                varResult+="<tr><td><b>您家庭日常生活中的公共交通</b><br>您家庭成员中，有多少人年龄超过4岁: " + f3.n_pess_familia + " 人" +
                           "<br>每人月票平均金额: " + f3.monthly_pass_cost + "元</td>" +
                           "<td><b>" + currencyShow(res_uber_obj.tcpt.toFixed(0)) + "</b></td></tr>";
                 
                varResult+="<tr><td><b>UBER - 成本 每 公里</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + "公里</td></tr>";
                
                varResult+="<tr><td><b>UBER - 成本 每 分钟</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "分钟</td></tr>";

                varResult+="<tr><td><b>运动速度</b></td>" + 
                           "<td>" + data.kinetic_speed.toFixed(2) + " " +"公里/h</td></tr>";
                           
                varResult+="<tr><td><b>UBER - 公里 每 月</b></td>" + 
                           "<td>" + res_uber_obj.dist_uber.toFixed(0) + " " + "公里</td></tr>";
                           
                varResult+="<tr><td><b>UBER: 成本 - 总计</b></td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";                     
               
                varResult+="<tr><td><b>总计</b></td>"+
                           "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/月</b></td></tr>";
                
                varResult+="</table>";    
            }
                   
        }
        else{
            uber_obj.print_bool=false; //says uber table is not to be printed; global variable
        }
    }
    else{
        uber_obj.print_bool=false; //says uber table is not to be printed; global variable
    }    
    
    return varResult;
}

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


/*External costs table (result_table4)*/
function print_extern_table(f1, f2, f3, data){ 
            
    var epa_text      = "<b>Emissões de poluentes atmosféricos</b><br>Valor aproximado: " + data.external_costs.polution + "元/公里";
    var egee_text     = "<b>Emissões de gases de efeito de estufa</b><br>Valor aproximado: " + data.external_costs.ghg + "元/公里";
    var ruido_text    = "<b>Poluição sonora</b><br>Valor aproximado: " + data.external_costs.noise + "元/公里";
    var sr_text       = "<b>Sinistralidade rodoviária</b><br>Valor aproximado: " + data.external_costs.fatalities + "元/公里";
    var cgstn_text    = "<b>Congestionamento<\/span></b><br>Valor aproximado: " + data.external_costs.congestion + "元/公里";
    var ifr_estr_text = "<b>Desgaste das infraestruturas rodoviárias</b><br>Valor aproximado: " + data.external_costs.infrastr + "元/公里";
    var source_ext_costs  = "<b>Fonte dos dados:</b><br><i><a href=\"" + data.external_costs.handbook_extern_URL + "\">Handbook on estimation of external costs in the transport sector</a>, </i>Comissão Europeia";
    
    var varResult     = "";
    
    if(Country=="PT" && isDef(data.distance_per_month)){
        
        varResult+="<table class=\"result_table\" id=\"result_table4\">";

        //header
        varResult+="<tr><td><b>Custos externos</b><br>Percorre " +(1 * data.distance_per_month).toFixed(1)+" 公里/月</td>" +
                   "<td><b>每月金额</b></td></tr>";
        
        //external costs items
        varResult+="<tr><td>" + epa_text + "</td>" +   
                   "<td>&nbsp;元 " + (data.external_costs.polution * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + egee_text + "</td>" + 
                   "<td>&nbsp;元 " + (data.external_costs.ghg * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ruido_text + "</td>" + 
                   "<td>&nbsp;元 " + (data.external_costs.noise * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + sr_text + "</td>" + 
                   "<td>&nbsp;元 " + (data.external_costs.fatalities * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + cgstn_text + "</td>" + 
                   "<td>&nbsp;元 " + (data.external_costs.congestion * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ifr_estr_text + "</td>" + 
                   "<td>&nbsp;元 " + (data.external_costs.infrastr * data.distance_per_month).toFixed(1)+"</td></tr>";
        
         //total
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>总计</b></td>" +
                   "<td><b>元&nbsp;"+data.external_costs.total_exter().toFixed(0)+"/月</b></td></tr>";
        
        //reference to source
        varResult+="<tr><td colspan=\"2\">"+ source_ext_costs +"</td></tr>";        
 
        varResult+="</table>";     
    }
            
    return varResult;
}

//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


function drawChartResult(frame_witdh, data){
    
    //Whe Google Charts are not available
    if(!IsGoogleCharts || !CHARTS_SWITCH){
        return;
    }
    
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

    //adjust the charst divs
    $("#pie_chart_div").css('display', 'inline-block');
    $("#pie_chart_div").css('width', 'auto');
    $("#bar_chart_div").css('display', 'inline-block');
    $("#bar_chart_div").css('width', 'auto');
    
    //draw Financial Effort Chart
    if(data.fin_effort_calculated){
        var fe_chart_width=parseInt(frame_witdh*0.9);
        var fe_chart_height=parseInt(fe_chart_width*1/2);
        
        drawFinEffortChart(parseFloat(data.fin_effort.total_costs_year.toFixed(0)),
                           parseFloat(data.fin_effort.income_per_year.toFixed(0)),
                           fe_chart_width,
                           fe_chart_height
                    );
            
        $("#fin_effort_chart_div").css('display', 'inline-block');
        $("#fin_effort_chart_div").css('width', 'auto');
    }
}

//puts the currency symbol after the money value, for certain countries 
function currencyShow(value){   
    
    res = value + "&nbsp;元";    
    return res;
}