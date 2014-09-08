<? Header("content-type: application/x-javascript");

include('../country files/' . $_GET['country'] . '.php');

$def_cty = $_GET['country'];

?>

function get_form_part1(){
	var data = {
		auto_mes: document.custo.auto_mes.value,
		auto_ano: document.custo.auto_ano.value,
		auto_initial_cost: document.custo.auto_val_inicial.value,
		auto_final_cost: document.custo.auto_val_final.value,		
		tipo_seguro_auto: getCheckedValue(custo.tipo_seguro),
		seguro_val: document.custo.seguro_val.value,
		cred_auto_s_n: getCheckedValue(custo.cred_auto),
		cred_auto_montante: document.custo.cred_auto_montante.value,
		cred_auto_period: document.custo.cred_auto_period.value,
		cred_auto_val_mes: document.custo.cred_auto_val_mes.value,
		cred_auto_valresidual: document.custo.cred_auto_valresidual.value,
		nmr_times_inspec: document.custo.nr_vezes_inspecao.value,
		inspec_price: document.custo.preco_inspecao.value,
		IUC: document.custo.IUC.value
	};
	return data;
}

function get_form_part2(){

	var data = {
		tipo_calc_combustiveis: getCheckedValue(custo.calc_combustiveis),
		fuel_eff_l100km: document.custo.consumo_auto.value,
		fuel_price_CURRpLitre: document.custo.fuel_price.value,
		leva_auto_job: getCheckedValue(document.custo.carro_emprego),
		combustivel_period_km: document.custo.combustivel_period_km,		
		km_por_mes: document.custo.km_por_mes.value,
		consumo_auto: document.custo.consumo_auto.value,
		fuel_price: document.custo.fuel_price.value,
		km_entre_casa_trabalho: document.custo.km_entre_casa_trabalho.value,
		km_fds: document.custo.km_fds.value,
		dias_por_semana: document.custo.dias_por_semana.value,
		combustiveis_periodo_euro: document.custo.combustiveis_periodo_euro,
		combustiveis_euro: document.custo.combustiveis_euro.value,
		revisoes: document.custo.revisoes.value,
		reparacoes: document.custo.reparacoes.value,
		parqueamento: document.custo.parqueamento.value,
		tipo_calc_portagens: getCheckedValue(document.custo.portagens_ao_dia),
		portagens_select: document.custo.portagens_select,
		portagens: document.custo.portagens.value,
		preco_portagens_por_dia: document.custo.preco_portagens_por_dia.value,
		dias_portagens_por_mes: document.custo.dias_portagens_por_mes.value,
		multas: document.custo.multas.value,
		multas_select: document.custo.multas_select,
		lavagens: document.custo.lavagens.value,
		lavagens_select: document.custo.lavagens_select		
	};
	return data;
}

function get_form_part3(){
	var data = {
		n_pess_familia: document.custo.pessoas_agregado.value,
		pmpmpc: document.custo.preco_passe.value,
		income_type: getCheckedValue(custo.radio_income),
		income_per_year: document.custo.income_per_year.value,
		income_per_month: document.custo.income_per_month.value,
		income_months_per_year: document.custo.income_months_per_year.value,
		income_per_week: document.custo.income_per_week.value,
		income_weeks_per_year: document.custo.income_weeks_per_year.value,
		income_per_hour: document.custo.income_per_hour.value,
		income_hours_per_week: document.custo.income_hours_per_week.value,
		income_hour_weeks_per_year: document.custo.income_hour_weeks_per_year.value,
		is_working_time: getCheckedValue(custo.radio_work_time),
		time_hours_per_week: document.custo.time_hours_per_week.value,
		time_month_per_year: document.custo.time_month_per_year.value,
		drive_to_work: getCheckedValue(custo.drive_to_work),
		drive_to_work_days_per_week: document.custo.drive_to_work_days_per_week.value,
		dist_home_job: document.custo.dist_home_job.value,
		journey_weekend: document.custo.journey_weekend.value,
		period_km: document.custo.period_km,
		km_per_month: document.custo.km_per_month.value,
		time_home_job: document.custo.time_home_job.value,
		time_weekend: document.custo.time_weekend.value,
		min_drive_per_day: document.custo.min_drive_per_day.value,
		days_drive_per_month: document.custo.days_drive_per_month.value
	};
	return data;
}

function print_costs_table(f1, f2, f3, costs) {
	
	//Depreciation
	var desva_text;
	if (costs.meses() == 0) {    
		desva_text = "<?echo $ERROR_DEPRECIATION_NEW_CAR?>&nbsp;&nbsp;";
	} else {
		desva_text = "<b><span class=\"p3\"><?echo $DEPRECIATION?><\/span></b>&nbsp;&nbsp;<br><span class=\"p2\"><?echo $AQ_VALUE?>: "
		+ f1.auto_initial_cost + "<?echo $CURR_SYMBOL?><br><?echo $FINAL_VALUE?>: "
		+ f1.auto_final_cost + "<?echo $CURR_SYMBOL?><br><?echo $PERIOD_OWN?>: "
		+ costs.meses() + " <?echo $MONTHS?><br>("
		+ f1.auto_initial_cost + "<?echo $CURR_SYMBOL?>-"
		+ f1.auto_final_cost + "<?echo $CURR_SYMBOL?>)/"
		+ costs.meses() + " <?echo $MONTHS?></span>";
	}
	
	//Insurance
	var seguro_text;
	switch(f1.tipo_seguro_auto)
	{
		case "semestral":
			seguro_text = f1.seguro_val + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
			break;
		case "anual":
			seguro_text = f1.seguro_val + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
			break;
		case "mensal":
			seguro_text = costs.val_seguro_por_mes() + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
			break;
		case "trimestral":
			seguro_text = f1.seguro_val + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
			break;
	}
	
	//Credit
	var juros_text="<b><span class=\"p3\"><?echo $CREDIT_INTERESTS?></span><\/b>&nbsp;&nbsp;";
	
	if(f1.cred_auto_s_n == "true") {

		juros_text = "<b><span class=\"p3\"><?echo $CREDIT_INTERESTS?></span></b>&nbsp;&nbsp;<br><span class=\"p2\"><?echo $CREDIT_LOAN2?>: "
					+ f1.cred_auto_montante
					+ "<?echo $CURR_SYMBOL?><br><?echo $CREDIT_PERIOD?>: "
					+ f1.cred_auto_period
					+ " <?echo $MONTHS?><br><?echo $CREDIT_INSTALMENT?>: "
					+ f1.cred_auto_val_mes
					+ "<?echo $CURR_SYMBOL?><br><?echo $CREDIT_RESIDUAL_VALUE1?>: "
					+ f1.cred_auto_valresidual
					+ "<?echo $CURR_SYMBOL?><br>";    

		juros_text += "<?echo $CREDIT_TOTAL_INTERESTS?>: "+costs.juros_totais()+"<?echo $CURR_SYMBOL?><br>(" + costs.meses_cred() + "*"+ f1.cred_auto_val_mes + ")+" + f1.cred_auto_valresidual + "-" + f1.cred_auto_montante;

		if(costs.meses() >= costs.meses_cred())
			juros_text += "<br><?echo $CREDIT_INTERESTS_MONTH?>: "+costs.interests_per_month().toFixed(2)+"<?echo $CURR_SYMBOL?>";
		juros_text += "</span>";
	} 
	
	//Inspection
	var inspecao_text;
	if (f1.nmr_times_inspec != 0){
		inspecao_text = "<b><span class=\"p3\"><?echo $INSPECTION?></span></b><br><span class=\"p2\">"
					  + f1.nmr_times_inspec
		              + " <?echo $TIMES_COSTING?> "
					  + f1.inspec_price
					  + " <?echo $CURR_SYMBOL?> <?echo $EACH_ONE_DURING?> "
					  + costs.meses() + " <?echo $MONTHS?>&nbsp;</span>";
	}
	else		
		inspecao_text = "<b><span class=\"p3\"><?echo $INSPECTION?></span></b><br>";
	
	//Taxes
	var IUC_text = "<b><span class=\"p3\"><?echo $ROAD_TAXES?></span></b><br><span class=\"p2\">"
				 + f1.IUC + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?></span>";
	
	//Fuel
	var combustiveis_text;
	switch(f2.tipo_calc_combustiveis){
		case "km":                     
			if (f2.leva_auto_job == "false"){
				switch(costs.fuel_period_km)
				{
					case "1":
						combustiveis_text = f2.km_por_mes + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $MONTH?>";
						break;
					case "2":					
						combustiveis_text = f2.km_por_mes + " <?echo $DIST_EACH_TWO_MONTHS?>";
						break;
					case "3":					
						combustiveis_text = f2.km_por_mes + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
						break;
					case "4":					
						combustiveis_text = f2.km_por_mes + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
						break;
					case "5":					
						combustiveis_text = f2.km_por_mes + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $YEAR?>";
						break;
				}
				combustiveis_text = combustiveis_text + "<br>" + "<?echo $FUEL_CAR_EFF?>: " + f2.consumo_auto + " <?echo $STD_FUEL_CALC?>&nbsp;";
				combustiveis_text = combustiveis_text + "<br>" + "<?echo $FUEL_PRICE1?>: " + f2.fuel_price + " <?echo $CURR_SYMBOL?>/<?echo $STD_VOLUME_SHORT?>&nbsp;&nbsp;";
			}
			else{
				combustiveis_text = f2.dias_por_semana + " <?echo $FUEL_JOB_CALC1?> <br>";
				combustiveis_text = combustiveis_text + "<?echo $YOU_DRIVE?> " + f2.km_entre_casa_trabalho + " <?echo $FUEL_DIST_HOME_JOB1?> <br>";
				combustiveis_text = combustiveis_text + "<?echo $YOU_DRIVE?> " + f2.km_fds + " <?echo $FUEL_DIST_NO_JOB1?>&nbsp;<br>";
				combustiveis_text = combustiveis_text + "<?echo $YOU_DRIVE_TOTTALY_AVG?> " + costs.km_totais_converted().toFixed(1) + " <?echo $STD_DIST?> <?echo $WORD_PER?> <?echo $MONTH?> (~30.5 <?echo $DAYS?>) <br>";
				combustiveis_text = combustiveis_text + "<?echo $FUEL_CAR_EFF?>: " + f2.consumo_auto + " <?echo $STD_FUEL_CALC?>";
				combustiveis_text = combustiveis_text + "<br>" + "<?echo $FUEL_PRICE?>: " + f2.fuel_price + " <?echo $CURR_SYMBOL?>/<?echo $STD_VOLUME_SHORT?>";
			}
			break;
		case "euros":
			switch(costs.fuel_cost_period)
			{
				case "1":
					combustiveis_text = f2.combustiveis_euro + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
					break;
				case "2":					
					combustiveis_text = f2.combustiveis_euro + " <?echo $DIST_EACH_TWO_MONTHS?>";
					break;
				case "3":					
					combustiveis_text = f2.combustiveis_euro + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
					break;
				case "4":					
					combustiveis_text = f2.combustiveis_euro + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
					break;
				case "5":					
					combustiveis_text = document.custo.combustiveis_euro.value + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
					break;
			}
			break;
	}
	
	//Maintenance
	var revisoes_text = "<b><span class=\"p3\"><?echo $MAINTENANCE?></span></b><br><span class=\"p2\">"
					  + f2.revisoes + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?></span>";
	
	//Repairs
	var reparacoes_text = "<b><span class=\"p3\"><?echo $REP_IMPROV?><\/span></b><span class=\"p2\"><br>"
	                    + f2.reparacoes + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?></span>";
	
	//Tolls
	var portagens_text="<b><span class=\"p3\"><?echo $TOLLS?></span></b><br><span class=\"p2\">";
	if(f2.tipo_calc_portagens == "false") {
		switch(costs.portagens_period) {
			case "1":
				portagens_text += f2.portagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
				break;
			case "2":
				portagens_text += f2.portagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORDS_PER_EACH?> <?echo $TWO_MONTHS?>";
				break;
			case "3":
				portagens_text += f2.portagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
				break;
			case "4":
				portagens_text += f2.portagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
				break;
			case "5":
				portagens_text += f2.portagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
				break;
		}
	}
	else 
		portagens_text+=f2.preco_portagens_por_dia + " <?echo $CURR_NAME_PLURAL?> <?echo $DURING?> " + f2.dias_portagens_por_mes + " <?echo $MONTH?>";
	portagens_text += "</span>";
	
	//Fines
	var multas_text="<b><span class=\"p3\"><?echo $FINES?></span></b><br><span class=\"p2\">";
	switch(costs.multas_period) {
		case "1":			
			multas_text += f2.multas + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
			break;
		case "2":			
			multas_text += f2.multas + " <?echo $CURR_NAME_PLURAL?> <?echo $WORDS_PER_EACH?> <?echo $TWO_MONTHS?>";
			break;
		case "3":			
			multas_text += f2.multas+" <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
			break;
		case "4":			
			multas_text += f2.multas + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
			break;
		case "5":			
			multas_text += f2.multas + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
			break;
		}
	multas_text+="</span>";
	
	//washing
	var lavagens_text="<b><span class=\"p3\"><?echo $WASHING?></span></b><br><span class=\"p2\">";
	switch(costs.lavagens_period) {
		case "1":
			lavagens_text += f2.lavagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $MONTH?>";
			break;
		case "2":
			lavagens_text += f2.lavagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORDS_PER_EACH?> <?echo $TWO_MONTHS?>";
			break;
		case "3":
			lavagens_text += f2.lavagens +" <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $TRIMESTER?>";
			break;
		case "4":
			lavagens_text += f2.lavagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $SEMESTER?>";
			break;
		case "5":
			lavagens_text += f2.lavagens + " <?echo $CURR_NAME_PLURAL?> <?echo $WORD_PER?> <?echo $YEAR?>";
			break;
		}
	lavagens_text+="</span>";
	
	//TOTAIS parciais
	var custos_fixos_text="<b><span class=\"p3\"><?echo $TOTAL_FIXED?></span></b><br><span class=\"p2\"><i><?echo $TOTAL_FIXED_DESCR?>:</i><br><?echo $TOTAL_FIXED_DESCR2?></span>";
	var custos_variav_text="<b><span class=\"p3\"><?echo $TOTAL_VARIABLE?></span></b><br><span class=\"p2\"><i><?echo $TOTAL_VARIABLE_DESCR?>:</i><br><?echo $TOTAL_VARIABLE_DESCR2?></span>";
	
	var varResult="";
	//main table
	varResult+="<center><table class=\"result_table\" border=\"1\" cellpadding=\"4\">";
	//header
	varResult+="<tr><td align=\"center\"><b><span class=\"p3\"><?echo $PRIVATE_COSTS?></span></b><br></td><td width=\"20%\" align=\"center\"><b><span class=\"p3\"><?echo $MONTHLY_AMOUNT?></span></b></td></tr>";
	//cost items
	varResult+="<tr><td align=\"left\">" + desva_text + "&nbsp;</td>"                +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+costs.depreciation_per_month().toFixed(1)+"</span></td></tr>";
	varResult+="<tr><td align=\"left\"><b><span class=\"p3\"><?echo $INSURANCE?></span></b><br><span class=\"p2\">" + seguro_text + "</span></td>" +
                                                                                  "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.val_seguro_por_mes().toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + juros_text + "&nbsp;</td>"                +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.interests_per_month().toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + inspecao_text + "</td>"                   +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+costs.inspecao_por_mes().toFixed(1)+"</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + IUC_text + "</td>"                        +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+costs.IUC_por_mes().toFixed(1)+"</span></td></tr>";
	varResult+="<tr><td align=\"left\"><b><span class=\"p3\"><?echo $FUEL?></span></b><br><span class=\"p2\">" + combustiveis_text + "</span></td>" +
                                                                                  "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.val_combustiveis_por_mes.toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + revisoes_text + "</td>"                   +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.revisoes_por_mes().toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + reparacoes_text + "</td>"                 +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.reparacoes_por_mes().toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\"><b><span class=\"p3\"><?echo $PARKING?><\/span></b></td>"+
                                                                                  "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.parqueamento_por_mes.toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + portagens_text + "</td>"                  +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.portagens_por_mes.toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + multas_text + "</td>"                     +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.multas_por_mes.toFixed(1) + "</span></td></tr>";
	varResult+="<tr><td align=\"left\">" + lavagens_text + "</td>"                   +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.lavagens_por_mes.toFixed(1) + "</span></td></tr>";
	//fixed costs
	varResult+="<tr><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\" align=\"left\">" + custos_fixos_text + "</td>"+
                                                                                  "<td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\">&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + costs.custos_fixos().toFixed(1) + "</span></td></tr>";
	//variable costs
	varResult+="<tr><td align=\"left\">" + custos_variav_text + "<\/td>"              +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+costs.custos_variav().toFixed(1)+"</span></td></tr>";
	if(f2.tipo_calc_combustiveis == "km" && (costs.km_por_mes != 0)){
		varResult+="<tr><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\" align=\"left\"><b><span class=\"p3\"><?echo $RUN_CP_DIST?></span></b></td>"+
	                                                                              "<td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><span class=\"p2\">&nbsp;<?echo $CURR_SYMBOL?>&nbsp;"+(costs.custos_variav() / costs.km_por_mes).toFixed(2)+"/<?echo $STD_DIST?> </span></td></tr>";
		varResult+="<tr><td align=\"left\"><b><span class=\"p3\"><?echo $TOTAL_CP_DIST?></span></b></td>"+
	                                                                              "<td><span class=\"p2\">&nbsp;<?echo $CURR_SYMBOL?>&nbsp;"+(costs.total() / costs.km_por_mes).toFixed(2)+"/<?echo $STD_DIST?> </span></td></tr>";
	}

	varResult+="<tr><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\" align=\"right\"><b><span class=\"p3\"><?echo $WORD_TOTAL_CAP?></span></b></td>"+
                                                                                  "<td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\">"+
                                                                                       "<center><b><span class=\"p2\"><?echo $CURR_SYMBOL?>&nbsp;" + costs.total().toFixed(0) + "/<?echo $MONTH?></span></b></center></td></tr>";
	varResult+="</table></center>";
		
	return varResult;
}

function print_extern_table(f1, f2, f3, costs){

	var epa_text="<b><span class=\"p3\">Emissões de poluentes atmosféricos</span></b><br><span class=\"p2\">Valor aproximado: " + costs.epa + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var egee_text="<b><span class=\"p3\">Emissões de gases de efeito de estufa</span></b><br><span class=\"p2\">Valor aproximado: " + costs.egee + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var ruido_text="<b><span class=\"p3\">Poluição sonora</span></b><br><span class=\"p2\">Valor aproximado: " + costs.ruido + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var sr_text="<b><span class=\"p3\">Sinistralidade rodoviária</span></b><br><span class=\"p2\">Valor aproximado: " + costs.sr + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var cgstn_text="<b><span class=\"p3\">Congestionamento<\/span></b><br><span class=\"p2\">Valor aproximado: " + costs.cgstn + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var ifr_estr_text="<b><span class=\"p3\">Desgaste das infraestruturas rodoviárias</span></b><br><span class=\"p2\">Valor aproximado: " + costs.ifr_estr + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
    var fonte_text="<b><span class=\"p2\">Fonte dos dados:</span></b><br><span class=\"p2\"><i><a href=\"" + costs.handbook_extern_URL + "\">Handbook on estimation of external costs in the transport sector</a>, </i>Comissão Europeia</span>";
	var varResult="";
	if(<?if ($def_cty=="PT") echo 'f2.tipo_calc_combustiveis=="km"'; else echo "false";?>){
		varResult+="<br><center><table class=\"result_table\" border=\"1\" cellpadding=\"4\">";
		//header
		varResult+="<tr><td align=\"center\"><b><span class=\"p3\">Custos externos para o país</span></b><br><span class=\"p2\">Percorre " +(1 * f2.km_por_mes).toFixed(1)+" <?echo $STD_DIST?>/<?echo $MONTH?></span></td><td width=\"20%\" align=\"center\"><b><span class=\"p3\"><?echo $MONTHLY_AMOUNT?></span></b></td></tr>";
		//external costs items
		varResult+="<tr><td align=\"left\">" + epa_text + "</td>"                    +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+(costs.epa * f2.km_por_mes).toFixed(1)+"</span></td></tr>";
		varResult+="<tr><td align=\"left\">" + egee_text + "</td>"                   +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+(costs.egee * f2.km_por_mes).toFixed(1)+"</span></td></tr>";
		varResult+="<tr><td align=\"left\">" + ruido_text + "</td>"                  +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+(costs.ruido * f2.km_por_mes).toFixed(1)+"</span></td></tr>";
		varResult+="<tr><td align=\"left\">" + sr_text + "</td>"                     +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+(costs.sr * f2.km_por_mes).toFixed(1)+"</span></td></tr>";
		varResult+="<tr><td align=\"left\">" + cgstn_text + "</td>"                  +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+(costs.cgstn * f2.km_por_mes).toFixed(1)+"</span></td></tr>";
		varResult+="<tr><td align=\"left\">" + ifr_estr_text + "</td>"               +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+(costs.ifr_estr * f2.km_por_mes).toFixed(1)+"</span></td></tr>";
		//total
		varResult+="<tr><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\" align=\"right\"><b><span class=\"p3\"><?echo $WORD_TOTAL_CAP?></span></b></td>"+
	                                                                              "<td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><center><b><span class=\"p2\"><?echo $CURR_SYMBOL?>&nbsp;"+costs.total_exter().toFixed(0)+"/<?echo $MONTH?></span></b></center></td></tr>";
		//reference to source
		varResult+="<tr><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\" align=\"left\" colspan=\"2\">"+ fonte_text +"</td></tr>";
		varResult+="</table></center>";		
	}	
			
	return varResult;
}

function print_publict_table(f1, f2, f3, transp){
	var varResult = "";
	if(transp.display_tp()) {
		var tp_text, outros_tp_text, taxi_text;

		tp_text="<b><span class=\"p3\"><?echo $PUB_TRANS_TEXT?></span></b><br><span class=\"p2\"><?echo $FAM_NBR?>: " + f3.n_pess_familia + " <?echo $PERSON_OR_PEOPLE?>"
                + "<br><?echo $PASS_MONTH_AVG?>: " + f3.pmpmpc + "<?echo $CURR_SYMBOL?></span>";
		
		if(transp.racio_custocar_caustotp < transp.racio_outros_tp){
			outros_tp_text="<b><span class=\"p3\"><?echo $OTHER_PUB_TRANS?></span></b><br><span class=\"p2\"><?echo $OTHER_PUB_TRANS_DESC?> </span>";
		}
		taxi_text="<b><span class=\"p3\"><?echo $TAXI_DESL?><\/span><\/b><br><span class=\"p2\">" + transp.n_km_taxi.toFixed(1) + " <?echo $STD_DIST?> <?echo $ON_TAXI_PAYING?> " + transp.taxi_price_per_km.toFixed(1) + "<?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span>";
		
		varResult+="<br><center><table class=\"result_table\" border=\"1\" cellpadding=\"4\">";
		//header
		varResult+="<tr><td align=\"center\"><b><span class=\"p3\"><?echo $PUBL_TRA_EQUIV?></span></b><br></td>"+
	                                                                              "<td width=\"20%\" align=\"center\"><b><span class=\"p3\"><?echo $MONTHLY_AMOUNT?></span></b></td></tr>";
		//items
		varResult+="<tr><td align=\"left\">" + tp_text + "</td>"                     +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + transp.preco_total_tp.toFixed(1) + "</span></td></tr>";
		varResult+="<tr><td align=\"left\">" + taxi_text + "</td>"                   +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> " + transp.custo_taxi.toFixed(1) + "</span></td></tr>";
		//in case other means of transport are shown besides taxi and urban public transports
		if(transp.display_outros_tp) {
			varResult+="<tr><td align=\"left\">" + outros_tp_text + "</td>"          +   "<td>&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+transp.outros_tp.toFixed(1)+"</span></td></tr>";
		}
		varResult+="<tr><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\" align=\"right\"><b><span class=\"p3\"><?echo $WORD_TOTAL_CAP?></span></b></td>"+
	                                                                              "<td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><center><b><span class=\"p2\"><?echo $CURR_SYMBOL?>&nbsp;" + transp.total_altern.toFixed(0) + "/<?echo $MONTH?></span></b></center></td></tr>";
		varResult+="</table></center>";
	}
	return varResult;
}

function print_feffort_table(f1, f2, f3, feffort){


	var varResult = "";
	varResult+="<br><center><table class=\"result_table\" border=\"1\" cellpadding=\"4\">";
	varResult+="<tr><td align=\"center\" colspan=\"2\"><b><span class=\"p3\"><?echo $FINANCIAL_EFFORT?></span></b></td></tr>";
	//income
	varResult+="<tr><td colspan=\"2\" align=\"left\" class=\"top_b\"><b><span class=\"p3\"><?echo $EXTRA_DATA_INCOME?></span></b></tr>";
	switch(f3.income_type){
		case 'year':    
			varResult+= "<tr><td class=\"hidden_tp\"><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $YEAR?></span></td>"             +  "<td class=\"hidden_tp\" style=\"width:20%\"><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.income + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>"    +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.aver_income_per_month.toFixed(1) + "</span></td></tr>";
			break;
		case 'month':
			varResult+= "<tr><td><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $MONTH?></span></td>"            +  "<td style=\"width:20%\"><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.income + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $NUMBER_OF_MONTHS?></span></td>"                          +  "<td><span class=\"p2 td_values\">" + feffort.income_per_type + "</span></td></tr>" +
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>"    +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.aver_income_per_month.toFixed(1) + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $YEAR?></span></td>"     +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.aver_income_per_year.toFixed(1) + "</span></td></tr>";
			break;
		case 'week':
			varResult+= "<tr><td><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $WEEK?></span></td>"             +  "<td style=\"width:20%\"><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.income + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $NUMBER_OF_WEEKS?></span></td>"                           +  "<td><span class=\"p2 td_values\">" + feffort.income_per_type + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>"    +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.aver_income_per_month.toFixed(1) + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $YEAR?></span></td>"     +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?>&nbsp;" + feffort.aver_income_per_year.toFixed(1) + "<\/span></td></tr>";
			break;	
		case 'hour':
			varResult+= "<tr><td><span class=\"p2\"><?echo $NET_INCOME_PER?> <?echo $HOUR?></span></td>"             +  "<td style=\"width:20%\"><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?> " + feffort.income + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $NUMBER_OF_HOURS?></span></td>"                           +  "<td><span class=\"p2 td_values\">" + feffort.income_hours_per_week + " <?echo $HOUR_ABBR?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $NUMBER_OF_WEEKS?></span></td>"                           +  "<td><span class=\"p2 td_values\">" + feffort.income_per_type + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $MONTH?></span></td>"    +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?> " + feffort.aver_income_per_month.toFixed(1) + "</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $YEAR?></span></td>"     +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?> " + feffort.aver_income_per_year.toFixed(1) + "<\/span></td></tr>";
			break;			
	}
	//working time
	if(f3.income_type != 'hour'){
		varResult+=     "<tr><td colspan=\"2\" align=\"left\" style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><b><span class=\"p3\"><?echo $EXTRA_DATA_WORKING_TIME?></span></b></tr>";
		if(f3.is_working_time == 'true'){
			varResult+= "<tr><td><span class=\"p2\"><?echo $HOURS_PER?> <?echo $WEEK?></span></td>"                  +  "<td><span class=\"p2 td_values\">"+feffort.time_hours_per_week+" <?echo $HOUR_ABBR?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $MONTHS_PER?> <?echo $YEAR?></span></td>"                 +  "<td><span class=\"p2 td_values\">"+feffort.time_month_per_year+"</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_WORKING_HOURS_PER?> <?echo $MONTH?></span></td>" +  "<td><span class=\"p2 td_values\">"+feffort.aver_work_time_per_m.toFixed(1)+" <?echo $HOUR_ABBR?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $WORKING_HOURS_PER?> <?echo $YEAR?></span></td>"          +  "<td><span class=\"p2 td_values\">"+feffort.work_hours_per_y.toFixed(1)+" <?echo $HOUR_ABBR?></span></td></tr>";
		}
		else{
			varResult+= "<tr><td colspan=\"2\"><span class=\"p2\"><?echo $WORKING_TIME_MESSAGE?></span></td></tr>";
		}
	}			
	varResult+=         "<tr><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><span class=\"p2\"><?echo $AVERAGE_NET_INCOME_PER?> <?echo $HOUR?></span></td><td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\">&nbsp;<span class=\"p2\"><?echo $CURR_SYMBOL?> "+feffort.aver_income_per_hour().toFixed(1)+"</span></td></tr>";
	
	//distance
	varResult+=         "<tr><td align=\"left\" colspan=\"2\" style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><b><span class=\"p3\"><?echo $DISTANCE?></span></b></td></tr>";
	if((f2.tipo_calc_combustiveis != 'km' && f3.drive_to_work == 'true') || (f2.tipo_calc_combustiveis != 'km' && f2.leva_auto_job == 'true')){	
		varResult+=     "<tr><td><span class=\"p2\"><?echo $DIST_HOME_JOB?></span></td>"                             +  "<td><span class=\"p2 td_values\">" + parseInt(f3.dist_home_job).toFixed(1) + " <?echo $STD_DIST?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $DAYS_DRIVE_JOB?></span></td>"                            +  "<td><span class=\"p2 td_values\">" + f3.drive_to_work_days_per_week + " <?echo $DAYS?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $DIST_JORNEY_WEEKEND?></span></td>"                       +  "<td><span class=\"p2 td_values\">" + parseInt(f3.journey_weekend).toFixed(1) + " <?echo $STD_DIST?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $AVERAGE_DIST_PER_WEEK?></span></td>"                     +  "<td><span class=\"p2 td_values\">" + feffort.aver_drive_per_week.toFixed(1) + " <?echo $STD_DIST?></span></td></tr>";					
	}

	varResult+=         "<tr><td><span class=\"p2\"><?echo $YOU_DRIVE_PER?> <?echo $MONTH?></span></td>"             +  "<td><span class=\"p2 td_values\">" + feffort.drive_per_month.toFixed(1) + " <?echo $STD_DIST?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $YOU_DRIVE_PER?> <?echo $YEAR?></span></td>"              +  "<td><span class=\"p2 td_values\">" + feffort.drive_per_year.toFixed(1) + " <?echo $STD_DIST?></span></td></tr>";  

	//time spent in driving
	varResult+=         "<tr><td align=\"left\" colspan=\"2\" style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><b><span class=\"p3\"><?echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING?></span></b></td></tr>";

	if(f3.drive_to_work == 'true' || f2.leva_auto_job == 'true'){
		varResult+=     "<tr><td><span class=\"p2\"><?echo $MINUTES_HOME_JOB?></span></td>"                          +  "<td><span class=\"p2 td_values\">" + f3.time_home_job + " <?echo $MIN?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $DAYS_DRIVE_TO_JOB?></span></td>"                         +  "<td><span class=\"p2 td_values\">" + f3.drive_to_work_days_per_week + " <?echo $DAYS?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $TIME_DRIVE_WEEKEND?></span></td>"                        +  "<td><span class=\"p2 td_values\">" + f3.time_weekend + " <?echo $MIN?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $MINUTES_DRIVE_PER?> <?echo $WEEK?></span></td>"          +  "<td><span class=\"p2 td_values\">" + feffort.min_drive_per_week + " <?echo $MIN?></span></td></tr>";
	}
	else{
		varResult+=     "<tr><td><span class=\"p2\"><?echo $MINUTES_DRIVE_PER?> <?echo $DAY?></span></td>"           +  "<td><span class=\"p2 td_values\">" + f3.min_drive_per_day + " <?echo $MIN?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $DAYS_DRIVE_PER_MONTH?></span></td>"                      +  "<td><span class=\"p2 td_values\">" + f3.days_drive_per_month + " <?echo $DAYS?></span></td></tr>";;
	}

	varResult+=         "<tr><td><span class=\"p2\"><?echo $HOURS_DRIVE_PER?> <?echo $MONTH?></span></td>"           +  "<td><span class=\"p2 td_values\">" + feffort.hours_drive_per_month.toFixed(1) + " <?echo $HOUR_ABBR?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $HOURS_DRIVE_PER?> <?echo $YEAR?></span></td>"            +  "<td><span class=\"p2 td_values\">" + feffort.hours_drive_per_year.toFixed(1) + " <?echo $HOUR_ABBR?></span></td></tr>";;

	//financial effort
	varResult+=         "<tr><td align=\"left\" colspan=\"2\" class=\"top_b\"><b><span class=\"p3\"><?echo $FINANCIAL_EFFORT?></span></b>"+
						"<tr><td><span class=\"p2\"><?echo $TOTAL_COSTS_PER_YEAR?></span></td>"                       +  "<td><span class=\"p2 td_values\"><?echo $CURR_SYMBOL?> "+feffort.total_per_year().toFixed(1)+"</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $HOURS_TO_AFFORD_CAR?></span></td>"                        +  "<td><span class=\"p2 td_values\">"+feffort.hours_per_year_to_afford_car().toFixed(1)+" <?echo $HOUR_ABBR?></span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $MONTHS_TO_AFFORD_CAR?></span></td>"                       +  "<td><span class=\"p2 td_values\">"+feffort.month_per_year_to_afford_car().toFixed(2)+"</span></td></tr>"+
						"<tr><td><span class=\"p2\"><?echo $DAYS_CAR_PAID?></span></td>"                              +  "<td><span class=\"p2 td_values\">"+Math.ceil(feffort.days_car_paid())+" <?echo $DAYS?></span></td></tr>";
		   

	//speed
	varResult+=         "<tr><td align=\"left\" style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><span class=\"p2\"><?echo $AVER_YEARLY?> <?echo $KINETIC_SPEED?></span></td>"+
                                                                                                                    "<td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><span class=\"p2 td_values\">"+
																													feffort.kinetic_speed().toFixed(1)+" <?echo $STD_DIST?>/h</span></td></tr>";
	varResult+=         "<tr><td align=\"left\" style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><span class=\"p2\"><?echo $AVER_YEARLY?> <a href=\"http://en.wikipedia.org/wiki/Car_costs#Virtual_Speed\" target=\"_blank\"><?echo $VIRTUAL_SPEED?></a></span></td>"+
			                                                                                                        "<td style=\"border-top-width:2px;border-top-style:solid;border-top-color:black;\"><span class=\"p2 td_values\">"+
																													feffort.virtual_speed().toFixed(1)+" <?echo $STD_DIST?>/h</span></td></tr>";
	varResult+="</table></center>";		
	
	return varResult;
}














