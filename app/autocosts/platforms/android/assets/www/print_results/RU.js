
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
        currency: "RUB",
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
            url: 'http://autocosts.info/RU',
            text: 'С помощью этого симулятора Вы можете узнать реальную стоимость  содержания автомобиля в России',
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
    varResult+= '<tr><td style="padding:7px;" colspan="4"><b>РАСХОДЫ НА ВАШ АВТОМОБИЛЬ:</b></td></tr>';
    
    varResult+= '<tr>';
    
    varResult+= '<td><b>' + currencyShow(data.total_costs_month.toFixed(0)) + '</b><br>';
    varResult+= '/<br>месяц</td>';
    
    varResult+= '<td><b>' + currencyShow((data.total_costs_month*3).toFixed(0)) + '</b><br>';
    varResult+= '/<br>квартал';
    
    varResult+= '<td><b>' + currencyShow((data.total_costs_month*6).toFixed(0)) + '</b><br>';
    varResult+= '/<br>полугодие</td>';
    
    varResult+= '<td><b>' + currencyShow(data.total_costs_year.toFixed(0)) + '</b><br>';
    varResult+= '/<br>год</td>';
    
    varResult+= '</tr>';
    
    if(f3.IsFinancialEffort){
        varResult+= '<tr><td colspan="4"><b>ФИНАНСОВОЕ УСИЛИЕ'+
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
        
        var text_msg = '<div>С таким уровнем расходов стоимость содержания Вашего автомобиля в течение '+
                       '<b>' + data.age_months + '</b> мес. уже составила:</div>'+
                       '<div class="red_bold_text">'+
                       numberWithSpaces((data.age_months * data.total_costs_month / 100).toFixed(0)*100)+
                       ' ' + 'рyб.</div></div>';
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
        depreciation_text = "Амортизация не применяется, поскольку это новый автомобиль&nbsp;&nbsp;";
    } else {
        depreciation_text = "<b>Уменьшение стоимости автомобиля<\/span></b>&nbsp;&nbsp;<br>Стоимость приобретения: "+
            f1.auto_initial_cost + "&#x20bd;<br>Конечная стоимость: "+
            f1.auto_final_cost + "&#x20bd;<br>Период владения: "+
            data.age_months + " месяцев<br>("+
            f1.auto_initial_cost + "&#x20bd;-"+
            f1.auto_final_cost + "&#x20bd;)/"+
            data.age_months + " месяцев";
    }
    
    //Insurance
    var insurance_text;
    switch(f1.insurance_type)
    {
        case "semestral":
            insurance_text = f1.insurance_value + " руб. / полугодие";
            break;
        case "anual":
            insurance_text = f1.insurance_value + " руб. / год";
            break;
        case "mensal":
            insurance_text = data.monthly_costs.insurance + " руб. / месяц";
            break;
        case "trimestral":
            insurance_text = f1.insurance_value + " руб. / квартал";
            break;
    }
    
    //Credit interests
    var interests_text="<b>Проценты за кредит<\/b>&nbsp;&nbsp;";
    
    if(f1.cred_auto_s_n == "true") {

        interests_text = "<b>Проценты за кредит</b>&nbsp;&nbsp;<br>Сумма финансирования: " +
                         f1.credit_amount +
                         "&#x20bd;<br>Период кредита/количество взносов по уплате кредита: " +
                         f1.credit_period +
                         " месяцев<br>Средняя стоимость в месяц: " +
                         f1.credit_value_p_month +
                         "&#x20bd;<br>Остаточная стоимость: " +
                         f1.credit_residual_value +
                         "&#x20bd;<br>";    

        interests_text += "Общая сумма процентов: "+data.total_interests+"&#x20bd;<br>(" + data.month_cred + "*"+ f1.credit_value_p_month + ")+" + f1.credit_residual_value + "-" + f1.credit_amount;

        if(data.age_months >= data.month_cred)
            interests_text += "<br>Ежемесячная сумма на оплату процентов: "+data.monthly_costs.credit.toFixed(2)+"&#x20bd;";
        interests_text += "";
    } 
    
    //Inspection
    var inspection_text;
    if (f1.nmr_times_inspec !== 0){
        inspection_text = "<b>Технический осмотр автомобиля (государственный техосмотр)</b><br>" +
                          f1.nmr_times_inspec +
                          " раз при стоимости " +
                          f1.inspec_price +
                          " &#x20bd; каждый в течение " +
                          data.age_months + " месяцев&nbsp;";
    }
    else        
        inspection_text = "<b>Технический осмотр автомобиля (государственный техосмотр)</b><br>";
    
    //Taxes
    var cartax_text = "<b>Акцизная пошлина (налог) на автомобиль</b><br>" +
                      f1.car_tax + " руб. / год";
    
    //Fuel
    var fuel_text;
    switch(f2.type_calc_fuel){
        case "km":                     
            if (f2.take_car_to_job == "false"){
                switch(data.fuel_period_km)
                {
                    case "1":
                        fuel_text = f2.distance + " км / месяц";
                        break;
                    case "2":                   
                        fuel_text = f2.distance + " км каждые два месяца";
                        break;
                    case "3":                   
                        fuel_text = f2.distance + " км / квартал";
                        break;
                    case "4":                   
                        fuel_text = f2.distance + " км / полугодие";
                        break;
                    case "5":                   
                        fuel_text = f2.distance + " км / год";
                        break;
                }
                fuel_text = fuel_text + "<br>" + "Топливная экономичность Вашего автомобиля: " + f2.car_consumption + " л/100 км&nbsp;";
                fuel_text = fuel_text + "<br>" + "Средняя цена топлива: " + f2.fuel_price + " &#x20bd;/л&nbsp;&nbsp;";
            }
            else{
                fuel_text = f2.days_p_week + " дня (дней) в неделю, когда Вы ездите на работу на машине <br>";
                fuel_text = fuel_text + "Вы проезжаете " + f2.distance_home2job + " км между домом и работой <br>";
                fuel_text = fuel_text + "Вы проезжаете " + f2.distance_weekend + " среднее расстояние в километрах в те дни, когда Вы не ездите на работу на машине&nbsp;<br>";
                fuel_text = fuel_text + "В общей сложности Вы проезжаете в среднем " + data.distance_per_month.toFixed(1) + " км / месяц (~30.5 дней) <br>";
                fuel_text = fuel_text + "Топливная экономичность Вашего автомобиля: " + f2.car_consumption + " л/100 км";
                fuel_text = fuel_text + "<br>" + "Средняя цена, которую Вы платите за топливо: " + f2.fuel_price + " &#x20bd;/л";
            }
            break;
        case "euros":
            switch(data.fuel_cost_period)
            {
                case "1":
                    fuel_text = f2.fuel_money + " руб. / месяц";
                    break;
                case "2":                   
                    fuel_text = f2.fuel_money + " км каждые два месяца";
                    break;
                case "3":                   
                    fuel_text = f2.fuel_money + " руб. / квартал";
                    break;
                case "4":                   
                    fuel_text = f2.fuel_money + " руб. / полугодие";
                    break;
                case "5":                   
                    fuel_text = f2.fuel_money + " руб. / год";
                    break;
            }
            break;
    }
    
    //Maintenance
    var maintenance_text = "<b>1/2 Техническое обслуживание</b><br>" +
                           f2.maintenance + " руб. / год";
    
    //Repairs
    var repairs_text = "<b>Ремонт и улучшения<\/span></b><br>" +
                       f2.repairs + " руб. / год";
    
    //Tolls
    var tolls_text="<b>Плата за проезд</b><br>";
    if(f2.type_calc_tolls == "false") {
        switch(data.tolls_period) {
            case "1":
                tolls_text += f2.tolls + " руб. / месяц";
                break;
            case "2":
                tolls_text += f2.tolls + " руб. в каждом два месяца";
                break;
            case "3":
                tolls_text += f2.tolls + " руб. / квартал";
                break;
            case "4":
                tolls_text += f2.tolls + " руб. / полугодие";
                break;
            case "5":
                tolls_text += f2.tolls + " руб. / год";
                break;
        }
    }
    else 
        tolls_text+=f2.price_tolls_p_day + " руб. во время " + f2.tolls_days_p_month + " месяц";
    tolls_text += "";
    
    //Fines
    var fines_text="<b>Штрафы за нарушение ПДД</b><br>";
    switch(data.fines_period) {
        case "1":           
            fines_text += f2.fines + " руб. / месяц";
            break;
        case "2":           
            fines_text += f2.fines + " руб. в каждом два месяца";
            break;
        case "3":           
            fines_text += f2.fines+" руб. / квартал";
            break;
        case "4":           
            fines_text += f2.fines + " руб. / полугодие";
            break;
        case "5":           
            fines_text += f2.fines + " руб. / год";
            break;
        }
    fines_text+="";
    
    //washing
    var washing_text="<b>Мойка и чистка</b><br>";
    switch(data.washing_period) {
        case "1":
            washing_text += f2.washing + " руб. / месяц";
            break;
        case "2":
            washing_text += f2.washing + " руб. в каждом два месяца";
            break;
        case "3":
            washing_text += f2.washing +" руб. / квартал";
            break;
        case "4":
            washing_text += f2.washing + " руб. / полугодие";
            break;
        case "5":
            washing_text += f2.washing + " руб. / год";
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
    varResult+= "<tr><td style=\"padding:10px 50px;\" colspan=\"2\"><b>Постоянные расходы</b><br>" +
                "<i>Расходы, которые не зависят от пробега и которые необходимо оплачивать, даже если Вы не пользуетесь машиной</i></td></tr>";
    
    //Costs || Monthly amount
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b>Cтоимость</b></td>" +
                "<td><b>Сумма в месяц</b></td></tr>";
    
    //standing costs items
    varResult+= "<tr><td>" + depreciation_text + "&nbsp;</td>" + 
                "<td>&nbsp;" + currencyShow(data.monthly_costs.depreciation.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td><b>Страхование автомобиля и страховое покрытие на случай повреждений на дороге</b><br>" + insurance_text + "</td>" +
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
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b>ИТОГО - Постоянные расходы</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + "/месяц</b></td></tr>";
    
    varResult+="</table>";
    
    varResult+="<br>";
    
    //#############
    //Running costs table
    varResult+= "<table class=\"result_table costs_table\">";
    
    //Running Costs Header
    varResult+= "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>Эксплуатационные расходы</b><br>" +
                "<i>Расходы, которые зависят от пробега</i></td></tr>";
                  
    //Costs || Monthly amount
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b>Cтоимость</b></td>" +
                "<td><b>Сумма в месяц</b></td></tr>";

    varResult+= "<tr><td><b>Tопливo</b><br>" + fuel_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.fuel.toFixed(1)) + "</td></tr>";

    varResult+= "<tr><td>" + maintenance_text + "</td>" +
                "<td>&nbsp;" + currencyShow(((data.monthly_costs.maintenance)/2).toFixed(1)) + "</td></tr>";
                
    varResult+= "<tr><td>" + repairs_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.repairs_improv.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td><b>Стоянка</b></td>"+
                "<td>&nbsp;" + currencyShow(data.monthly_costs.parking.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + tolls_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.tolls.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + fines_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.fines.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + washing_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.washing.toFixed(1)) + "</td></tr>";
    
    //TOTAL - Running costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b>ИТОГО - Эксплуатационные расходы</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + "/месяц</b></td></tr>";
    
    varResult+="</table>";
    
    varResult+="<br>";
    
    //############
    //Costs per unit distance and TOTAL    
    varResult+= "<table class=\"result_table costs_table total_costs_table\">";
    
    varResult+= "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>ИТОГО</b><br></td></tr>"; 

    if((typeof data.distance_per_month) !== 'undefined' && data.distance_per_month !== 0){
              
        varResult+= "<tr><td><b>Эксплуатационные расходы на 1 км</b></td>"+
                    "<td>&nbsp;" + currencyShow(data.running_costs_p_unit_distance.toFixed(2)) + "/км </td></tr>";
        
        varResult+= "<tr><td class=\"border_bottom_2px\"><b>Итого расходы на 1 км</b></td>" +
                    "<td class=\"border_bottom_2px\">&nbsp;" + currencyShow(data.total_costs_p_unit_distance.toFixed(2)) + "/км </td></tr>";
    }

    varResult+= "<tr><td><b>Постоянные расходы</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + "/месяц</b></td></tr>";
    
    varResult+= "<tr><td><b>Эксплуатационные расходы</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + "/месяц</b></td></tr>";    
    
    varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>ИТОГО</b></td>"+
               "<td>&nbsp;<b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/месяц</b></td></tr>";

    varResult+="</table>"; 

    
    return varResult;
}
            
//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


/*Financial effort table (result_table3)*/
function print_feffort_table(f1, f2, f3, data){
    
    var varResult = "";
    varResult+="<table class=\"result_table\" id=\"result_table3\">";
    varResult+="<tr><td colspan=\"2\"><b>Финансовое усилие</b></td></tr>";
    //income
    varResult+="<tr><td colspan=\"2\"><b>Доход</b></tr>";
    switch(f3.income_type){
        case 'year':    
            varResult+= "<tr><td>Чистый доход в год</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td>Средний чистый доход в месяц</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>";
            break;
        case 'month':
            varResult+= "<tr><td>Чистый доход в месяц</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td>Количество месяцев в году получения дохода</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td>Средний чистый доход в месяц</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>" +
                        "<tr><td>Средний чистый доход в год</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "</td></tr>";
            break;
        case 'week':
            varResult+= "<tr><td>Чистый доход в неделя</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td>Количество недель в году получения дохода</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td>Средний чистый доход в месяц</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td>Средний чистый доход в год</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;  
        case 'hour':
            varResult+= "<tr><td>Чистый доход в час</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td>Количество часов в неделю получения дохода</td>" + 
                        "<td>" + data.fin_effort.income_hours_per_week + " ч</td></tr>"+
                        "<tr><td>Количество недель в году получения дохода</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>"+
                        "<tr><td>Средний чистый доход в месяц</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td>Средний чистый доход в год</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;          
    }
    //working time
    if(f3.income_type != 'hour'){
        varResult+=     "<tr><td colspan=\"2\"><b>Рабочее время</b></tr>";
        if(f3.is_working_time == 'true'){
            varResult+= "<tr><td>Часов в неделя</td>" +
                        "<td>"+data.fin_effort.time_hours_per_week+" ч</td></tr>" +
                        "<tr><td>Месяцев в год</td>" + 
                        "<td>"+data.fin_effort.time_month_per_year+"</td></tr>" +
                        "<tr><td>Среднее количество рабочих часов в месяц</td>" + 
                        "<td>"+data.fin_effort.aver_work_time_per_m.toFixed(1)+" ч</td></tr>" +
                        "<tr><td>Рабочих часов в год</td>" + 
                        "<td>"+data.fin_effort.work_hours_per_y.toFixed(1)+" ч</td></tr>";
        }
        else{
            varResult+= "<tr><td colspan=\"2\">Для целей расчетов среднее рабочее время считается равным 36 часам в неделю и 11 месяцам в году</td></tr>";
        }
    }           
    varResult+= "<tr><td>Средний чистый доход в час</td>" +
                "<td>&nbsp;" + currencyShow(data.fin_effort.aver_income_per_hour.toFixed(1)) + "</td></tr>";
    
    //distance
    varResult+= "<tr><td colspan=\"2\"><b>Расстояние</b></td></tr>";
    if((f2.type_calc_fuel != 'km' && f3.drive_to_work == 'true') || (f2.type_calc_fuel != 'km' && f2.take_car_to_job == 'true')){   
        varResult+=  "<tr><td>Ваш путь от дома до работы на машине</td>"  +  
                     "<td>" + parseInt(f3.dist_home_job).toFixed(1) + " км</td></tr>"+
                     "<tr><td>Количество дней в неделю, по которым Вы ездите на работу на машине</td>"  +  
                     "<td>" + f3.drive_to_work_days_per_week + " дней</td></tr>" +
                     "<tr><td>Вы проезжаете на машине в те дни, когда не ездите на машине на работу</td>" + 
                     "<td>" + parseInt(f3.journey_weekend).toFixed(1) + " км</td></tr>"+
                     "<tr><td>Средний еженедельный пробег</td>" + 
                     "<td>" + data.driving_distance.aver_drive_per_week.toFixed(1) + " км</td></tr>";                  
    }

    varResult+=  "<tr><td>Вы проезжаете в месяц</td>" +
                 "<td>" + data.distance_per_month.toFixed(1) + " км</td></tr>" +
                 "<tr><td>Вы проезжаете в год</td>" + 
                 "<td>" + data.driving_distance.drive_per_year.toFixed(1) + " км</td></tr>";  

    //time spent in driving
    varResult+=  "<tr><td colspan=\"2\"><b>Время, затрачиваемое на вождение</b></td></tr>";

    if(f3.drive_to_work == 'true' || f2.take_car_to_job == 'true'){
        varResult+= "<tr><td>Время в пути в минутах на машине от дома до работы</td>" + 
                    "<td>" + f3.time_home_job + " мин.</td></tr>" +
                    "<tr><td>Дней в неделю, по которым Вы ездите на работу на машине</td>" + 
                    "<td>" + f3.drive_to_work_days_per_week + " дней</td></tr>" +
                    "<tr><td>Минут за рулем в те дни, когда Вы не ездите на машине на работу</td>" + 
                    "<td>" + f3.time_weekend + " мин.</td></tr>" +
                    "<tr><td>Минут за рулем в неделя</td>" + 
                    "<td>" + data.time_spent_driving.min_drive_per_week + " мин.</td></tr>";
    }
    else{
        varResult+= "<tr><td>Минут за рулем в день</td>" + 
                    "<td>" + f3.min_drive_per_day + " мин.</td></tr>" +
                    "<tr><td>Количество дней в месяц, в которые Вы водите машину</td>" + 
                    "<td>" + f3.days_drive_per_month + " дней</td></tr>";
    }

    varResult+= "<tr><td>Часов за рулем в месяц</td>" + 
                "<td>" + data.time_spent_driving.hours_drive_per_month.toFixed(1) + " ч</td></tr>"+
                "<tr><td>Часов за рулем в год</td>" + 
                "<td>" + data.time_spent_driving.hours_drive_per_year.toFixed(1) + " ч</td></tr>";

    //financial effort
    varResult+= "<tr><td colspan=\"2\"><b>Финансовое усилие" +
                ': ' + (data.total_costs_year/data.fin_effort.income_per_year*100).toFixed(0) + 
                '&#37;</b>' +
                "<tr><td>Сумма расходов в год на автомобиль</td>" + 
                "<td>" + currencyShow(data.fin_effort.total_costs_year.toFixed(1)) + "</td></tr>" +
                "<tr><td>Количество часов в год, которые Вам необходимо отработать, чтобы позволить себе иметь автомобиль</td>"  +  
                "<td>" + data.fin_effort.hours_per_year_to_afford_car.toFixed(1) + " ч</td></tr>"+
                "<tr><td>Количество месяцев в год, которые Вам необходимо отработать, чтобы позволить себе иметь автомобиль</td>" +  
                "<td>" + data.fin_effort.month_per_year_to_afford_car.toFixed(2)+"</td></tr>"+
                "<tr><td>Через сколько дней начиная с 1-го января будет оплачен автомобиль</td>" +  
                "<td>" + Math.ceil(data.fin_effort.days_car_paid) + " дней</td></tr>";
           

    //speed
    varResult+= "<tr><td>В среднем в год кинетическая скорость</td>"+
                "<td>" + data.kinetic_speed.toFixed(1) + " км/h</td></tr>";
                        
    varResult+= "<tr><td>В среднем в год <a href=\"./docs/consumer_speed.html\" target=\"_blank\">виртуальная скорость</a></td>"+
                "<td>" + data.virtual_speed.toFixed(1) + " км/h</td></tr>";
    
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

        tp_text = "<b>Общественный транспорт для ежедневной жизнедеятельности членов Вашей семьи</b><br>Количество членов Вашей семьи старше 4 лет: " + 
                  f3.n_pess_familia + " человек(а)" +
                  "<br>Средняя стоимость месячного абонемента на человека: " + 
                  f3.monthly_pass_cost + "&#x20bd;";
        
        if(data.public_transports.pt_carcost_ratio < data.public_transports.other_pt_ratio_threshold){
            outros_tp_text="<b>Другие виды общественного транспорта</b><br>Сумма, которая тратится на другие виды общественного транспорта, например, при поездках за пределы Вашего обычного района проживания, такие как поезда или автобусы дальнего следования  ";
        }
        taxi_text="<b>Поездки на такси<\/span><\/b><br>" + data.public_transports.km_by_taxi.toFixed(1) + " км при поездке на такси из расчета " + data.public_transports.taxi_price_per_km.toFixed(1) + "&#x20bd;/км";
        
        //starts HTML table
        varResult+="<table class=\"result_table\" id=\"result_table2\">";
        //header
        varResult+="<tr><td><b>Cтоимость</b><br></td>"+
                   "<td><b>Сумма в месяц</b></td></tr>";
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
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>ИТОГО</b></td>"+
                   "<td><b>" + currencyShow(data.public_transports.total_altern.toFixed(0)) + "/месяц</b></td></tr>";
        
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
                
                varResult+="<tr><td><b>UBER - Cтоимость / километр</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + "км</td></tr>";
                
                varResult+="<tr><td><b>UBER - Cтоимость / минут</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "мин.</td></tr>";

                varResult+="<tr><td><b>расстояние, которое Вы проезжаете / месяц</b><br></td>"+
                           "<td>" + res_uber_obj.dpm.toFixed(0) + " " +"километр</td></tr>";
                
                           
                varResult+="<tr><td><b>Минут за рулем в месяц</b></td>" + 
                           "<td>" + res_uber_obj.mdpm.toFixed(0) + " " + "минут</td></tr>";
                           
                varResult+="<tr><td><b>UBER: Cтоимость - ИТОГО</b></td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.tuc.toFixed(0)) + "</b></td></tr>";                     

                varResult+="<tr><td><b>Другие виды общественного транспорта</b><br>Сумма, которая тратится на другие виды общественного транспорта, например, при поездках за пределы Вашего обычного района проживания, такие как поезда или автобусы дальнего следования </td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";
                
                varResult+="<tr><td><b>ИТОГО</b></td>"+
                           "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/месяц</b></td></tr>";
                
                varResult+="</table>";       
            }
            
            //the case where uber equivalent is more expensive
            else if(res_uber_obj.result_type==2){ 
                //starts HTML table
                varResult+="<br><table class=\"result_table uber_table uber_table2\" id=\"result_table_uber\">";
                
                varResult+="<tr><td><b>Общественный транспорт для ежедневной жизнедеятельности членов Вашей семьи</b><br>Количество членов Вашей семьи старше 4 лет: " + f3.n_pess_familia + " человек(а)" +
                           "<br>Средняя стоимость месячного абонемента на человека: " + f3.monthly_pass_cost + "&#x20bd;</td>" +
                           "<td><b>" + currencyShow(res_uber_obj.tcpt.toFixed(0)) + "</b></td></tr>";
                 
                varResult+="<tr><td><b>UBER - Cтоимость / километр</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + "км</td></tr>";
                
                varResult+="<tr><td><b>UBER - Cтоимость / минут</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "мин.</td></tr>";

                varResult+="<tr><td><b>Кинетическая скорость</b></td>" + 
                           "<td>" + data.kinetic_speed.toFixed(2) + " " +"км/ч</td></tr>";
                           
                varResult+="<tr><td><b>UBER - километр / месяц</b></td>" + 
                           "<td>" + res_uber_obj.dist_uber.toFixed(0) + " " + "километр</td></tr>";
                           
                varResult+="<tr><td><b>UBER: Cтоимость - ИТОГО</b></td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";                     
               
                varResult+="<tr><td><b>ИТОГО</b></td>"+
                           "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/месяц</b></td></tr>";
                
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
            
    var epa_text      = "<b>Emissões de poluentes atmosféricos</b><br>Valor aproximado: " + data.external_costs.polution + "&#x20bd;/км";
    var egee_text     = "<b>Emissões de gases de efeito de estufa</b><br>Valor aproximado: " + data.external_costs.ghg + "&#x20bd;/км";
    var ruido_text    = "<b>Poluição sonora</b><br>Valor aproximado: " + data.external_costs.noise + "&#x20bd;/км";
    var sr_text       = "<b>Sinistralidade rodoviária</b><br>Valor aproximado: " + data.external_costs.fatalities + "&#x20bd;/км";
    var cgstn_text    = "<b>Congestionamento<\/span></b><br>Valor aproximado: " + data.external_costs.congestion + "&#x20bd;/км";
    var ifr_estr_text = "<b>Desgaste das infraestruturas rodoviárias</b><br>Valor aproximado: " + data.external_costs.infrastr + "&#x20bd;/км";
    var source_ext_costs  = "<b>Fonte dos dados:</b><br><i><a href=\"" + data.external_costs.handbook_extern_URL + "\">Handbook on estimation of external costs in the transport sector</a>, </i>Comissão Europeia";
    
    var varResult     = "";
    
    if(Country=="PT" && isDef(data.distance_per_month)){
        
        varResult+="<table class=\"result_table\" id=\"result_table4\">";

        //header
        varResult+="<tr><td><b>Custos externos</b><br>Percorre " +(1 * data.distance_per_month).toFixed(1)+" км/месяц</td>" +
                   "<td><b>Сумма в месяц</b></td></tr>";
        
        //external costs items
        varResult+="<tr><td>" + epa_text + "</td>" +   
                   "<td>&nbsp;&#x20bd; " + (data.external_costs.polution * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + egee_text + "</td>" + 
                   "<td>&nbsp;&#x20bd; " + (data.external_costs.ghg * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ruido_text + "</td>" + 
                   "<td>&nbsp;&#x20bd; " + (data.external_costs.noise * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + sr_text + "</td>" + 
                   "<td>&nbsp;&#x20bd; " + (data.external_costs.fatalities * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + cgstn_text + "</td>" + 
                   "<td>&nbsp;&#x20bd; " + (data.external_costs.congestion * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ifr_estr_text + "</td>" + 
                   "<td>&nbsp;&#x20bd; " + (data.external_costs.infrastr * data.distance_per_month).toFixed(1)+"</td></tr>";
        
         //total
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>ИТОГО</b></td>" +
                   "<td><b>&#x20bd;&nbsp;"+data.external_costs.total_exter().toFixed(0)+"/месяц</b></td></tr>";
        
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
    
    res = value + "&nbsp;&#x20bd;";    
    return res;
}