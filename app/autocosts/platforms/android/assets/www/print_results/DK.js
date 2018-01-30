
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
        currency: "DKK",
        distance_std: 1,
        fuel_efficiency_std: 1,
        fuel_price_volume_std: 1,
        taxi_price: 2.5    };

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
            url: 'http://autocosts.info/DK',
            text: 'Med denne beregner kan du finde frem til de reelle udgifter ved at eje en bil i Danmark',
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
    varResult+= '<tr><td style="padding:7px;" colspan="4"><b>DINE BILUDGIFTER</b></td></tr>';
    
    varResult+= '<tr>';
    
    varResult+= '<td><b>' + currencyShow(data.total_costs_month.toFixed(0)) + '</b><br>';
    varResult+= 'per<br>måned</td>';
    
    varResult+= '<td><b>' + currencyShow((data.total_costs_month*3).toFixed(0)) + '</b><br>';
    varResult+= 'per<br>hver tredje måned';
    
    varResult+= '<td><b>' + currencyShow((data.total_costs_month*6).toFixed(0)) + '</b><br>';
    varResult+= 'per<br>hvert halve år</td>';
    
    varResult+= '<td><b>' + currencyShow(data.total_costs_year.toFixed(0)) + '</b><br>';
    varResult+= 'per<br>år</td>';
    
    varResult+= '</tr>';
    
    if(f3.IsFinancialEffort){
        varResult+= '<tr><td colspan="4"><b>FINANCIEL INDSATS'+
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
        
        var text_msg = '<div>Udgifterne til din bil gennem '+
                       '<b>' + data.age_months + '</b> måneders ejerskab er fastsat til:</div>'+
                       '<div class="red_bold_text">'+
                       numberWithSpaces((data.age_months * data.total_costs_month / 100).toFixed(0)*100)+
                       ' ' + 'KRONER</div></div>';
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
        depreciation_text = "Værdiforringelse medregnes ikke, da bilen er ny&nbsp;&nbsp;";
    } else {
        depreciation_text = "<b>Bilens værdiforringelse<\/span></b>&nbsp;&nbsp;<br>Bilens værdi da du købte den: "+
            f1.auto_initial_cost + "kr<br>Bilens endelige værdi: "+
            f1.auto_final_cost + "kr<br>Hvor længe har du ejet bilen: "+
            data.age_months + " måneder<br>("+
            f1.auto_initial_cost + "kr-"+
            f1.auto_final_cost + "kr)/"+
            data.age_months + " måneder";
    }
    
    //Insurance
    var insurance_text;
    switch(f1.insurance_type)
    {
        case "semestral":
            insurance_text = f1.insurance_value + " Kroner per hvert halve år";
            break;
        case "anual":
            insurance_text = f1.insurance_value + " Kroner per år";
            break;
        case "mensal":
            insurance_text = data.monthly_costs.insurance + " Kroner per måned";
            break;
        case "trimestral":
            insurance_text = f1.insurance_value + " Kroner per hver tredje måned";
            break;
    }
    
    //Credit interests
    var interests_text="<b>Lånerente<\/b>&nbsp;&nbsp;";
    
    if(f1.cred_auto_s_n == "true") {

        interests_text = "<b>Lånerente</b>&nbsp;&nbsp;<br>Det finansierede beløb: " +
                         f1.credit_amount +
                         "kr<br>Lånets løbetid / antal afdrag: " +
                         f1.credit_period +
                         " måneder<br>Det månedlige beløb: " +
                         f1.credit_value_p_month +
                         "kr<br>Resterende beløb: " +
                         f1.credit_residual_value +
                         "kr<br>";    

        interests_text += "Det fulde rentebeløb: "+data.total_interests+"kr<br>(" + data.month_cred + "*"+ f1.credit_value_p_month + ")+" + f1.credit_residual_value + "-" + f1.credit_amount;

        if(data.age_months >= data.month_cred)
            interests_text += "<br>Månedligt rentebeløb: "+data.monthly_costs.credit.toFixed(2)+"kr";
        interests_text += "";
    } 
    
    //Inspection
    var inspection_text;
    if (f1.nmr_times_inspec !== 0){
        inspection_text = "<b>Bilsyn</b><br>" +
                          f1.nmr_times_inspec +
                          " gange ved pris af " +
                          f1.inspec_price +
                          " kr per gang gennem " +
                          data.age_months + " måneder&nbsp;";
    }
    else        
        inspection_text = "<b>Bilsyn</b><br>";
    
    //Taxes
    var cartax_text = "<b>Forbrugsafgifter (Bilafgifter, hvis gældende)</b><br>" +
                      f1.car_tax + " Kroner per år";
    
    //Fuel
    var fuel_text;
    switch(f2.type_calc_fuel){
        case "km":                     
            if (f2.take_car_to_job == "false"){
                switch(data.fuel_period_km)
                {
                    case "1":
                        fuel_text = f2.distance + " km per måned";
                        break;
                    case "2":                   
                        fuel_text = f2.distance + " kilometer for to måneder";
                        break;
                    case "3":                   
                        fuel_text = f2.distance + " km per hver tredje måned";
                        break;
                    case "4":                   
                        fuel_text = f2.distance + " km per hvert halve år";
                        break;
                    case "5":                   
                        fuel_text = f2.distance + " km per år";
                        break;
                }
                fuel_text = fuel_text + "<br>" + "Bilens brændstofforbrug: " + f2.car_consumption + " km/l&nbsp;";
                fuel_text = fuel_text + "<br>" + "Gennemsnitlig benzinpris: " + f2.fuel_price + " kr/liter&nbsp;&nbsp;";
            }
            else{
                fuel_text = f2.days_p_week + " Dag(e) om ugen du tager bilen på arbejde <br>";
                fuel_text = fuel_text + "Du kører " + f2.distance_home2job + " km mellem hjem og arbejdsplads <br>";
                fuel_text = fuel_text + "Du kører " + f2.distance_weekend + " km de dage du ikke tager bilen på arbejde&nbsp;<br>";
                fuel_text = fuel_text + "Antal km kørt per dag " + data.distance_per_month.toFixed(1) + " km per måned (~30.5 dage) <br>";
                fuel_text = fuel_text + "Bilens brændstofforbrug: " + f2.car_consumption + " km/l";
                fuel_text = fuel_text + "<br>" + "Gennemsnitlig pris for brændstof/benzin: " + f2.fuel_price + " kr/liter";
            }
            break;
        case "euros":
            switch(data.fuel_cost_period)
            {
                case "1":
                    fuel_text = f2.fuel_money + " Kroner per måned";
                    break;
                case "2":                   
                    fuel_text = f2.fuel_money + " kilometer for to måneder";
                    break;
                case "3":                   
                    fuel_text = f2.fuel_money + " Kroner per hver tredje måned";
                    break;
                case "4":                   
                    fuel_text = f2.fuel_money + " Kroner per hvert halve år";
                    break;
                case "5":                   
                    fuel_text = f2.fuel_money + " Kroner per år";
                    break;
            }
            break;
    }
    
    //Maintenance
    var maintenance_text = "<b>1/2 Vedligehold</b><br>" +
                           f2.maintenance + " Kroner per år";
    
    //Repairs
    var repairs_text = "<b>Reparationer og forbedringer<\/span></b><br>" +
                       f2.repairs + " Kroner per år";
    
    //Tolls
    var tolls_text="<b>Vejafgifter</b><br>";
    if(f2.type_calc_tolls == "false") {
        switch(data.tolls_period) {
            case "1":
                tolls_text += f2.tolls + " Kroner per måned";
                break;
            case "2":
                tolls_text += f2.tolls + " Kroner hver to måneder";
                break;
            case "3":
                tolls_text += f2.tolls + " Kroner per hver tredje måned";
                break;
            case "4":
                tolls_text += f2.tolls + " Kroner per hvert halve år";
                break;
            case "5":
                tolls_text += f2.tolls + " Kroner per år";
                break;
        }
    }
    else 
        tolls_text+=f2.price_tolls_p_day + " Kroner i " + f2.tolls_days_p_month + " måned";
    tolls_text += "";
    
    //Fines
    var fines_text="<b>Bøder</b><br>";
    switch(data.fines_period) {
        case "1":           
            fines_text += f2.fines + " Kroner per måned";
            break;
        case "2":           
            fines_text += f2.fines + " Kroner hver to måneder";
            break;
        case "3":           
            fines_text += f2.fines+" Kroner per hver tredje måned";
            break;
        case "4":           
            fines_text += f2.fines + " Kroner per hvert halve år";
            break;
        case "5":           
            fines_text += f2.fines + " Kroner per år";
            break;
        }
    fines_text+="";
    
    //washing
    var washing_text="<b>Vask og rens</b><br>";
    switch(data.washing_period) {
        case "1":
            washing_text += f2.washing + " Kroner per måned";
            break;
        case "2":
            washing_text += f2.washing + " Kroner hver to måneder";
            break;
        case "3":
            washing_text += f2.washing +" Kroner per hver tredje måned";
            break;
        case "4":
            washing_text += f2.washing + " Kroner per hvert halve år";
            break;
        case "5":
            washing_text += f2.washing + " Kroner per år";
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
    varResult+= "<tr><td style=\"padding:10px 50px;\" colspan=\"2\"><b>Faste udgifter</b><br>" +
                "<i>Udgifter, der ikke bestemmes af antal kørte km, og de udgifter, der må betales, selv om bilen ikke er i brug</i></td></tr>";
    
    //Costs || Monthly amount
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b>Udgifter</b></td>" +
                "<td><b>Månedligt beløb</b></td></tr>";
    
    //standing costs items
    varResult+= "<tr><td>" + depreciation_text + "&nbsp;</td>" + 
                "<td>&nbsp;" + currencyShow(data.monthly_costs.depreciation.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td><b>Bilforsikring og autohjælp</b><br>" + insurance_text + "</td>" +
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
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b>TOTAL - Faste udgifter</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + "/måned</b></td></tr>";
    
    varResult+="</table>";
    
    varResult+="<br>";
    
    //#############
    //Running costs table
    varResult+= "<table class=\"result_table costs_table\">";
    
    //Running Costs Header
    varResult+= "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>Løbende udgifter</b><br>" +
                "<i>Udgifter der bestemmes af antal kørte km</i></td></tr>";
                  
    //Costs || Monthly amount
    varResult+= "<tr><td style=\"padding:10px 15px 10px 15px;\"><b>Udgifter</b></td>" +
                "<td><b>Månedligt beløb</b></td></tr>";

    varResult+= "<tr><td><b>Brændstof</b><br>" + fuel_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.fuel.toFixed(1)) + "</td></tr>";

    varResult+= "<tr><td>" + maintenance_text + "</td>" +
                "<td>&nbsp;" + currencyShow(((data.monthly_costs.maintenance)/2).toFixed(1)) + "</td></tr>";
                
    varResult+= "<tr><td>" + repairs_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.repairs_improv.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td><b>Parkering</b></td>"+
                "<td>&nbsp;" + currencyShow(data.monthly_costs.parking.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + tolls_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.tolls.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + fines_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.fines.toFixed(1)) + "</td></tr>";
    
    varResult+= "<tr><td>" + washing_text + "</td>" +
                "<td>&nbsp;" + currencyShow(data.monthly_costs.washing.toFixed(1)) + "</td></tr>";
    
    //TOTAL - Running costs
    varResult+= "<tr><td style=\"padding:4px 10px 4px 0;\"><b>TOTAL - Løbende udgifter</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + "/måned</b></td></tr>";
    
    varResult+="</table>";
    
    varResult+="<br>";
    
    //############
    //Costs per unit distance and TOTAL    
    varResult+= "<table class=\"result_table costs_table total_costs_table\">";
    
    varResult+= "<tr><td style=\"padding:10px 15px;\" colspan=\"2\"><b>TOTAL</b><br></td></tr>"; 

    if((typeof data.distance_per_month) !== 'undefined' && data.distance_per_month !== 0){
              
        varResult+= "<tr><td><b>Løbende udgifter per km</b></td>"+
                    "<td>&nbsp;" + currencyShow(data.running_costs_p_unit_distance.toFixed(2)) + "/km </td></tr>";
        
        varResult+= "<tr><td class=\"border_bottom_2px\"><b>Totale udgifter per km</b></td>" +
                    "<td class=\"border_bottom_2px\">&nbsp;" + currencyShow(data.total_costs_p_unit_distance.toFixed(2)) + "/km </td></tr>";
    }

    varResult+= "<tr><td><b>Faste udgifter</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_standing_costs_month.toFixed(0)) + "/måned</b></td></tr>";
    
    varResult+= "<tr><td><b>Løbende udgifter</b></td>"+
                "<td>&nbsp;<b>" + currencyShow(data.total_running_costs_month.toFixed(0)) + "/måned</b></td></tr>";    
    
    varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>TOTAL</b></td>"+
               "<td>&nbsp;<b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/måned</b></td></tr>";

    varResult+="</table>"; 

    
    return varResult;
}
            
//******************************************************************************************************************************************************
//******************************************************************************************************************************************************


/*Financial effort table (result_table3)*/
function print_feffort_table(f1, f2, f3, data){
    
    var varResult = "";
    varResult+="<table class=\"result_table\" id=\"result_table3\">";
    varResult+="<tr><td colspan=\"2\"><b>Financiel indsats</b></td></tr>";
    //income
    varResult+="<tr><td colspan=\"2\"><b>Indkomst</b></tr>";
    switch(f3.income_type){
        case 'year':    
            varResult+= "<tr><td>Nettoindkomst per år</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td>Gennemsnitlig nettoindkomst per måned</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>";
            break;
        case 'month':
            varResult+= "<tr><td>Nettoindkomst per måned</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>" +
                        "<tr><td>Antal måneder per år med indkomst</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td>Gennemsnitlig nettoindkomst per måned</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>" +
                        "<tr><td>Gennemsnitlig nettoindkomst per år</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "</td></tr>";
            break;
        case 'week':
            varResult+= "<tr><td>Nettoindkomst per uge</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td>Antal uger per år med indkomst</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>" +
                        "<tr><td>Gennemsnitlig nettoindkomst per måned</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td>Gennemsnitlig nettoindkomst per år</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;  
        case 'hour':
            varResult+= "<tr><td>Nettoindkomst per time</td>" + 
                        "<td style=\"width:20%\">" + currencyShow(data.fin_effort.income) + "</td></tr>"+
                        "<tr><td>Antal timer per uge med indkomst</td>" + 
                        "<td>" + data.fin_effort.income_hours_per_week + " t</td></tr>"+
                        "<tr><td>Antal uger per år med indkomst</td>" + 
                        "<td>" + data.fin_effort.income_per_type + "</td></tr>"+
                        "<tr><td>Gennemsnitlig nettoindkomst per måned</td>" + 
                        "<td>" + currencyShow(data.fin_effort.aver_income_per_month.toFixed(1)) + "</td></tr>"+
                        "<tr><td>Gennemsnitlig nettoindkomst per år</td>" + 
                        "<td>" + currencyShow(data.fin_effort.income_per_year.toFixed(1)) + "<\/span></td></tr>";
            break;          
    }
    //working time
    if(f3.income_type != 'hour'){
        varResult+=     "<tr><td colspan=\"2\"><b>Arbejdstid</b></tr>";
        if(f3.is_working_time == 'true'){
            varResult+= "<tr><td>Timer per uge</td>" +
                        "<td>"+data.fin_effort.time_hours_per_week+" t</td></tr>" +
                        "<tr><td>Måneder per år</td>" + 
                        "<td>"+data.fin_effort.time_month_per_year+"</td></tr>" +
                        "<tr><td>Gennemsnitligt antal arbejdstimer per måned</td>" + 
                        "<td>"+data.fin_effort.aver_work_time_per_m.toFixed(1)+" t</td></tr>" +
                        "<tr><td>Arbejdstimer per år</td>" + 
                        "<td>"+data.fin_effort.work_hours_per_y.toFixed(1)+" t</td></tr>";
        }
        else{
            varResult+= "<tr><td colspan=\"2\">I beregninger anvendes en gennemsnitlig arbejdstid på 36 timer om ugen og11 måneder per år</td></tr>";
        }
    }           
    varResult+= "<tr><td>Gennemsnitlig nettoindkomst per time</td>" +
                "<td>&nbsp;" + currencyShow(data.fin_effort.aver_income_per_hour.toFixed(1)) + "</td></tr>";
    
    //distance
    varResult+= "<tr><td colspan=\"2\"><b>Distance</b></td></tr>";
    if((f2.type_calc_fuel != 'km' && f3.drive_to_work == 'true') || (f2.type_calc_fuel != 'km' && f2.take_car_to_job == 'true')){   
        varResult+=  "<tr><td>Du kører fra hjem til arbejdsplads</td>"  +  
                     "<td>" + parseInt(f3.dist_home_job).toFixed(1) + " km</td></tr>"+
                     "<tr><td>Dage per uge du kører til din arbejdsplads</td>"  +  
                     "<td>" + f3.drive_to_work_days_per_week + " dage</td></tr>" +
                     "<tr><td>Du kører de dage, hvor du ikke tager bilen til arbejdspladsen</td>" + 
                     "<td>" + parseInt(f3.journey_weekend).toFixed(1) + " km</td></tr>"+
                     "<tr><td>Du kører i gennemsnit per uge</td>" + 
                     "<td>" + data.driving_distance.aver_drive_per_week.toFixed(1) + " km</td></tr>";                  
    }

    varResult+=  "<tr><td>Du kører  per måned</td>" +
                 "<td>" + data.distance_per_month.toFixed(1) + " km</td></tr>" +
                 "<tr><td>Du kører  per år</td>" + 
                 "<td>" + data.driving_distance.drive_per_year.toFixed(1) + " km</td></tr>";  

    //time spent in driving
    varResult+=  "<tr><td colspan=\"2\"><b>Tid anvendt på kørsel</b></td></tr>";

    if(f3.drive_to_work == 'true' || f2.take_car_to_job == 'true'){
        varResult+= "<tr><td>Minutter du kører fra hjem til din arbejdsplads</td>" + 
                    "<td>" + f3.time_home_job + " min</td></tr>" +
                    "<tr><td>Dage per uge du kører til din arbejdsplads</td>" + 
                    "<td>" + f3.drive_to_work_days_per_week + " dage</td></tr>" +
                    "<tr><td>Minutter du kører, de dage hvor du ikke tager bilen til din arbejdsplads</td>" + 
                    "<td>" + f3.time_weekend + " min</td></tr>" +
                    "<tr><td>Minutter du kører per uge</td>" + 
                    "<td>" + data.time_spent_driving.min_drive_per_week + " min</td></tr>";
    }
    else{
        varResult+= "<tr><td>Minutter du kører per dag</td>" + 
                    "<td>" + f3.min_drive_per_day + " min</td></tr>" +
                    "<tr><td>Dage du kører per måned</td>" + 
                    "<td>" + f3.days_drive_per_month + " dage</td></tr>";
    }

    varResult+= "<tr><td>Timer du kører per måned</td>" + 
                "<td>" + data.time_spent_driving.hours_drive_per_month.toFixed(1) + " t</td></tr>"+
                "<tr><td>Timer du kører per år</td>" + 
                "<td>" + data.time_spent_driving.hours_drive_per_year.toFixed(1) + " t</td></tr>";

    //financial effort
    varResult+= "<tr><td colspan=\"2\"><b>Financiel indsats" +
                ': ' + (data.total_costs_year/data.fin_effort.income_per_year*100).toFixed(0) + 
                '&#37;</b>' +
                "<tr><td>Totalomkostninger per år for bilen</td>" + 
                "<td>" + currencyShow(data.fin_effort.total_costs_year.toFixed(1)) + "</td></tr>" +
                "<tr><td>Timer per år du behøver at arbejde for at have råd til din bil</td>"  +  
                "<td>" + data.fin_effort.hours_per_year_to_afford_car.toFixed(1) + " t</td></tr>"+
                "<tr><td>Måneder per år du behøver at arbejde for at have råd til din bil</td>" +  
                "<td>" + data.fin_effort.month_per_year_to_afford_car.toFixed(2)+"</td></tr>"+
                "<tr><td>Efter hvor mange dage efter 1. januar er bilen betalt</td>" +  
                "<td>" + Math.ceil(data.fin_effort.days_car_paid) + " dage</td></tr>";
           

    //speed
    varResult+= "<tr><td>Årligt gennemsnit kinetisk hastighed</td>"+
                "<td>" + data.kinetic_speed.toFixed(1) + " km/h</td></tr>";
                        
    varResult+= "<tr><td>Årligt gennemsnit <a href=\"./docs/consumer_speed.html\" target=\"_blank\">virtuel hastighed</a></td>"+
                "<td>" + data.virtual_speed.toFixed(1) + " km/h</td></tr>";
    
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

        tp_text = "<b>Offentlig transport for hele husstanden</b><br>Antal medlemmer af husstanden over fire år: " + 
                  f3.n_pess_familia + " person(er)" +
                  "<br>Gennemsnitlige månedlige udgifter til offentlig transport per person: " + 
                  f3.monthly_pass_cost + "kr";
        
        if(data.public_transports.pt_carcost_ratio < data.public_transports.other_pt_ratio_threshold){
            outros_tp_text="<b>Anden offentlig transport</b><br>Beløb, der ikke er anført ved anden offentlig transport, for eksempel transport uden for dit normale område, såsom længere ture med tog eller bus ";
        }
        taxi_text="<b>Taxa<\/span><\/b><br>" + data.public_transports.km_by_taxi.toFixed(1) + " km med taxa ved pris af " + data.public_transports.taxi_price_per_km.toFixed(1) + "kr/km";
        
        //starts HTML table
        varResult+="<table class=\"result_table\" id=\"result_table2\">";
        //header
        varResult+="<tr><td><b>Udgifter</b><br></td>"+
                   "<td><b>Månedligt beløb</b></td></tr>";
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
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>TOTAL</b></td>"+
                   "<td><b>" + currencyShow(data.public_transports.total_altern.toFixed(0)) + "/måned</b></td></tr>";
        
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
                
                varResult+="<tr><td><b>UBER - Udgifter per kilometer</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + "km</td></tr>";
                
                varResult+="<tr><td><b>UBER - Udgifter per minuter</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "min</td></tr>";

                varResult+="<tr><td><b>Kilometer du kører per måned</b><br></td>"+
                           "<td>" + res_uber_obj.dpm.toFixed(0) + " " +"kilometer</td></tr>";
                
                           
                varResult+="<tr><td><b>Minutter du kører per måned</b></td>" + 
                           "<td>" + res_uber_obj.mdpm.toFixed(0) + " " + "minuter</td></tr>";
                           
                varResult+="<tr><td><b>UBER: Udgifter - TOTAL</b></td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.tuc.toFixed(0)) + "</b></td></tr>";                     

                varResult+="<tr><td><b>Anden offentlig transport</b><br>Beløb, der ikke er anført ved anden offentlig transport, for eksempel transport uden for dit normale område, såsom længere ture med tog eller bus</td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";
                
                varResult+="<tr><td><b>TOTAL</b></td>"+
                           "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/måned</b></td></tr>";
                
                varResult+="</table>";       
            }
            
            //the case where uber equivalent is more expensive
            else if(res_uber_obj.result_type==2){ 
                //starts HTML table
                varResult+="<br><table class=\"result_table uber_table uber_table2\" id=\"result_table_uber\">";
                
                varResult+="<tr><td><b>Offentlig transport for hele husstanden</b><br>Antal medlemmer af husstanden over fire år: " + f3.n_pess_familia + " person(er)" +
                           "<br>Gennemsnitlige månedlige udgifter til offentlig transport per person: " + f3.monthly_pass_cost + "kr</td>" +
                           "<td><b>" + currencyShow(res_uber_obj.tcpt.toFixed(0)) + "</b></td></tr>";
                 
                varResult+="<tr><td><b>UBER - Udgifter per kilometer</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucd.toFixed(2)) + "/" + "km</td></tr>";
                
                varResult+="<tr><td><b>UBER - Udgifter per minuter</b>" + uber_url_HTML + "</td>" + 
                           "<td>" + currencyShow(res_uber_obj.ucm.toFixed(2)) + "/" + "min</td></tr>";

                varResult+="<tr><td><b>Kinetisk hastighed</b></td>" + 
                           "<td>" + data.kinetic_speed.toFixed(2) + " " +"km/t</td></tr>";
                           
                varResult+="<tr><td><b>UBER - kilometer per måned</b></td>" + 
                           "<td>" + res_uber_obj.dist_uber.toFixed(0) + " " + "kilometer</td></tr>";
                           
                varResult+="<tr><td><b>UBER: Udgifter - TOTAL</b></td>" + 
                           "<td><b>" + currencyShow(res_uber_obj.delta.toFixed(0)) + "</b></td></tr>";                     
               
                varResult+="<tr><td><b>TOTAL</b></td>"+
                           "<td><b>" + currencyShow(data.total_costs_month.toFixed(0)) + "/måned</b></td></tr>";
                
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
            
    var epa_text      = "<b>Emissões de poluentes atmosféricos</b><br>Valor aproximado: " + data.external_costs.polution + "kr/km";
    var egee_text     = "<b>Emissões de gases de efeito de estufa</b><br>Valor aproximado: " + data.external_costs.ghg + "kr/km";
    var ruido_text    = "<b>Poluição sonora</b><br>Valor aproximado: " + data.external_costs.noise + "kr/km";
    var sr_text       = "<b>Sinistralidade rodoviária</b><br>Valor aproximado: " + data.external_costs.fatalities + "kr/km";
    var cgstn_text    = "<b>Congestionamento<\/span></b><br>Valor aproximado: " + data.external_costs.congestion + "kr/km";
    var ifr_estr_text = "<b>Desgaste das infraestruturas rodoviárias</b><br>Valor aproximado: " + data.external_costs.infrastr + "kr/km";
    var source_ext_costs  = "<b>Fonte dos dados:</b><br><i><a href=\"" + data.external_costs.handbook_extern_URL + "\">Handbook on estimation of external costs in the transport sector</a>, </i>Comissão Europeia";
    
    var varResult     = "";
    
    if(Country=="PT" && isDef(data.distance_per_month)){
        
        varResult+="<table class=\"result_table\" id=\"result_table4\">";

        //header
        varResult+="<tr><td><b>Custos externos</b><br>Percorre " +(1 * data.distance_per_month).toFixed(1)+" km/måned</td>" +
                   "<td><b>Månedligt beløb</b></td></tr>";
        
        //external costs items
        varResult+="<tr><td>" + epa_text + "</td>" +   
                   "<td>&nbsp;kr " + (data.external_costs.polution * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + egee_text + "</td>" + 
                   "<td>&nbsp;kr " + (data.external_costs.ghg * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ruido_text + "</td>" + 
                   "<td>&nbsp;kr " + (data.external_costs.noise * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + sr_text + "</td>" + 
                   "<td>&nbsp;kr " + (data.external_costs.fatalities * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + cgstn_text + "</td>" + 
                   "<td>&nbsp;kr " + (data.external_costs.congestion * data.distance_per_month).toFixed(1)+"</td></tr>";
                
        varResult+="<tr><td>" + ifr_estr_text + "</td>" + 
                   "<td>&nbsp;kr " + (data.external_costs.infrastr * data.distance_per_month).toFixed(1)+"</td></tr>";
        
         //total
        varResult+="<tr><td style=\"padding:6px 10px 6px 0;\"><b>TOTAL</b></td>" +
                   "<td><b>kr&nbsp;"+data.external_costs.total_exter().toFixed(0)+"/måned</b></td></tr>";
        
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
    
    res = "kr&nbsp;" + value;    
    return res;
}