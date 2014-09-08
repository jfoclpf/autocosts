<? Header("content-type: application/x-javascript");

include('../country files/' . $_GET['country'] . '.php');

$def_cty = $_GET['country'];

?>

function formsInit(){	

	frame_witdh = document.getElementById('input_div').offsetWidth;
	
	if (!is_userdata_formpart1_ok()) return;
	if (!is_userdata_formpart2_ok()) return;
	if (!is_userdata_formpart3_ok()) return;

	var f1 = get_form_part1();
	var f2 = get_form_part2();
	var f3 = get_form_part3();

	var data=calculate_costs(f1, f2, f3);

	result_object = document.getElementById('result_div');
	input_object.style.display='none';
	
	var tables_HTML = "";    
	tables_HTML+= print_costs_table(f1, f2, f3, data.monthly_costs);
	tables_HTML+= print_extern_table(f1, f2, f3, data.external_costs);
	tables_HTML+= print_publict_table(f1, f2, f3, data.public_transports);
	tables_HTML+= print_feffort_table(f1, f2, f3, data.fin_effort);
		
	drawChartResult(frame_witdh, data.monthly_costs)
	
	result_object.innerHTML = tables_HTML;
	result_object.style.display='block';
	
	return true;
}

function drawChartResult(frame_witdh, costs){
	
	//avoid printing the charts in mobile devices
	var temp_width=document.documentElement.clientWidth;
	if (temp_width>500) {
		//checks if depreciation is greater or equal to zero, to print chart with no error
		var desvalor_temp;
		if(costs.depreciation_per_month()<0) {
			desvalor_temp=0;
		} else {
			desvalor_temp=costs.depreciation_per_month(); }

			chart_width=parseInt(frame_witdh*0.85);
			chart_height=parseInt(chart_width*4/6);

			drawChart(parseFloat(costs.val_seguro_por_mes().toFixed(1)),
			parseFloat(costs.val_combustiveis_por_mes.toFixed(1)),
			parseFloat(desvalor_temp.toFixed(1)),
			parseFloat(costs.interests_per_month().toFixed(1)),
			parseFloat(costs.inspecao_por_mes().toFixed(1)),
			parseFloat(costs.revisoes_por_mes().toFixed(1)),
			parseFloat(costs.reparacoes_por_mes().toFixed(1)),
			parseFloat(costs.IUC_por_mes().toFixed(1)),
			parseFloat(costs.parqueamento_por_mes.toFixed(1)),
			parseFloat(costs.portagens_por_mes.toFixed(1)),
			parseFloat(costs.multas_por_mes.toFixed(1)),
			parseFloat(costs.lavagens_por_mes.toFixed(1)),
			chart_width,
			chart_height
			);

			chart_width=parseInt(frame_witdh*0.8);
			chart_height=parseInt(chart_width*22/50);

			drawVisualization(parseFloat(costs.custos_fixos().toFixed(1)), parseFloat(costs.custos_variav().toFixed(1)),chart_width,chart_height);

			graph_object.style.display='block';
			chart_object.style.display='block';
	}
	
    reload_object.style.display='block';
    
    if(costs.total() >= 150 && costs.meses() >6) {
        var text_msg="<div style=\"border-top:rgb(180, 180, 180) 3px solid;\"><br><span class=\"p3\"><?echo $YOUR_CAR_COSTS_YOU?> <b>"+(costs.total() * 12 / 100).toFixed(0)*100 + " <?echo $CURR_NAME_PLURAL?><\/b> <?echo $WORD_PER?> <?echo $YEAR?>.<br>";
        text_msg+="<?echo $WITH_THIS_LEVEL_OF_COSTS?> " + costs.meses() + " <?echo $MONTHS_POSS?><br><br><center><div style=\"float: center;display: inline-block;padding:2%;font-size:350%;font-weight:bold; width:auto; font-family:Impact; color:red; border-style:solid; border-width:5px\">" + numberWithSpaces((costs.meses() * costs.total() / 100).toFixed(0)*100) + " <?echo $CURR_NAME_BIG_PLURAL?><\/div><\/center><\/span><\/div><br>";
        text_object.innerHTML=text_msg;
        text_object.style.display='block';
    }	
}

function calculate_costs(f1, f2, f3){
		
	//*************** MONTHLY COSTS ************
	
	var monthly_costs = {
		meses: function(){
			var today = new Date();
			var date_auto = new Date(f1.auto_ano, f1.auto_mes - 1);
			return date_diff(date_auto,today);
		},		
		depreciation_per_month: function(){			
			if(this.meses() != 0)
				return calculateMonthlyDepreciation(f1.auto_initial_cost, f1.auto_final_cost, this.meses());
			return 0;
		},
		val_seguro_por_mes: function(){ return calculateInsuranceMonthlyValue(f1.tipo_seguro_auto, f1.seguro_val) },
		meses_cred: function(){
			if(f1.cred_auto_s_n == "true")
				return parseFloat(f1.cred_auto_period);
			return 0;		
		},
		juros_totais: function(){
			var t = 0;
			if(f1.cred_auto_s_n == "true"){
				var t = ((this.meses_cred() * parseFloat(f1.cred_auto_val_mes)) + parseFloat(f1.cred_auto_valresidual)) - parseFloat(f1.cred_auto_montante);
				if(t < 0)
					t = 0;
			}
			return t;
		},
		interests_per_month: function(){		
			if(this.meses() >= this.meses_cred())
				return this.juros_totais() / this.meses();
			return parseFloat(this.juros_totais() / this.meses_cred())
		},
		inspecao_por_mes: function(){
			if(f1.nmr_times_inspec!=0)
				return (f1.nmr_times_inspec * f1.inspec_price) / this.meses();
			return 0;
		},
		IUC_por_mes: function(){ return f1.IUC / 12 },
		fuel_eff_l100km: 0,
		fuel_price_CURRpLitre: 0,
		fuel_period_km: f2.combustivel_period_km.options[f2.combustivel_period_km.selectedIndex].value,
		km_por_mes: 0,
		val_combustiveis_por_mes: 0,
		km_entre_casa_trabalho: 0,
		km_fds_value: 0,
		km_totais: 0,
		km_totais_converted: function(){ return convert_km_to_std_dist(this.km_totais, <? echo $distance_std_option; ?>)},
		fuel_cost_period: f2.combustiveis_periodo_euro.options[f2.combustiveis_periodo_euro.selectedIndex].value,
		price_mes: 0,
		revisoes_por_mes: function(){ return f2.revisoes / 12 },
		reparacoes_por_mes: function(){ return f2.reparacoes / 12 },
		parqueamento_por_mes: parseFloat(f2.parqueamento),
		portagens_period: f2.portagens_select.options[f2.portagens_select.selectedIndex].value,
		portagens_por_mes: 0,
		multas_period: f2.multas_select.options[f2.multas_select.selectedIndex].value,
		multas_por_mes: 0,
	    lavagens_period: f2.lavagens_select.options[f2.lavagens_select.selectedIndex].value,
		lavagens_por_mes: 0,
		custos_fixos: function(){
			return this.val_seguro_por_mes() + this.depreciation_per_month() + this.interests_per_month() +
				   this.inspecao_por_mes() + 0.5 * this.revisoes_por_mes() + this.IUC_por_mes();
		},
		custos_variav: function(){
			return this.val_combustiveis_por_mes + 0.5 * this.revisoes_por_mes() + this.reparacoes_por_mes() + this.parqueamento_por_mes +
				   this.portagens_por_mes + this.multas_por_mes + this.lavagens_por_mes;
		},
		total: function(){
			return this.val_seguro_por_mes() + this.val_combustiveis_por_mes + this.depreciation_per_month() +
		           this.interests_per_month() + this.inspecao_por_mes() + this.revisoes_por_mes() +
				   this.reparacoes_por_mes() + this.IUC_por_mes() + this.parqueamento_por_mes +
				   this.portagens_por_mes + this.multas_por_mes + this.lavagens_por_mes;
		}
	};
	
	
	
	//fuel
	switch(f2.tipo_calc_combustiveis){
		case "km":
			monthly_costs.fuel_eff_l100km = convert_to_fuel_eff_l100km(f2.fuel_eff_l100km, <? echo $fuel_efficiency_std_option; ?>);
			monthly_costs.fuel_price_CURRpLitre = convert_to_fuel_price_CURRpLitre(f2.fuel_price_CURRpLitre, <? echo $fuel_price_volume_std; ?>);
			if (f2.leva_auto_job=="false"){
				switch(monthly_costs.fuel_period_km){
					case "1":
						monthly_costs.km_por_mes = f2.km_por_mes;				
						break;
					case "2":
						monthly_costs.km_por_mes = f2.km_por_mes / 2;				
						break;
					case "3":
						monthly_costs.km_por_mes = f2.km_por_mes / 3;				
						break;
					case "4":
						monthly_costs.km_por_mes = f2.km_por_mes / 6;				
						break;
					case "5":
						monthly_costs.km_por_mes = f2.km_por_mes / 12;				
						break;
				}
				//if miles were chosen must convert input to kilometres
				monthly_costs.km_por_mes = convert_std_dist_to_km(monthly_costs.km_por_mes, <? echo $distance_std_option; ?>);
				monthly_costs.val_combustiveis_por_mes = monthly_costs.fuel_eff_l100km * monthly_costs.km_por_mes * monthly_costs.fuel_price_CURRpLitre / 100;
			}
			else{   //make calculation considering the user takes his car to work on a daily basis
			
				//if miles were chosen must convert input to kilometres
				monthly_costs.km_entre_casa_trabalho = convert_std_dist_to_km(f2.km_entre_casa_trabalho, <? echo $distance_std_option; ?>);
				monthly_costs.km_fds_value = convert_std_dist_to_km(f2.km_fds, <? echo $distance_std_option; ?>);
				monthly_costs.km_totais = ((2 * monthly_costs.km_entre_casa_trabalho * parseInt(f2.dias_por_semana, 10)) + monthly_costs.km_fds_value) * (30.4375 / 7);
				monthly_costs.val_combustiveis_por_mes = monthly_costs.fuel_eff_l100km * monthly_costs.km_totais * monthly_costs.fuel_price_CURRpLitre / 100;
				monthly_costs.km_por_mes = monthly_costs.km_totais;
			}
			break;
		case "euros":
			switch(monthly_costs.fuel_cost_period){
				case "1":
					monthly_costs.price_mes = parseFloat(f2.combustiveis_euro);
					break;
				case "2":
					monthly_costs.price_mes = f2.combustiveis_euro / 2;			
					break;
				case "3":
					monthly_costs.price_mes = f2.combustiveis_euro / 3;			
					break;
				case "4":
					monthly_costs.price_mes = f2.combustiveis_euro / 6;			
					break;
				case "5":
					monthly_costs.price_mes = f2.combustiveis_euro / 12;			
					break;
			}
			monthly_costs.val_combustiveis_por_mes = monthly_costs.price_mes;
			break;
	}
	
	//tolls
	if(f2.tipo_calc_portagens == "false"){
		switch(monthly_costs.portagens_period){
			case "1":
				monthly_costs.portagens_por_mes = parseFloat(f2.portagens);           
				break;
			case "2":
				monthly_costs.portagens_por_mes = f2.portagens / 2;            
				break;
			case "3":
				monthly_costs.portagens_por_mes = f2.portagens / 3;            
				break;
			case "4":
				monthly_costs.portagens_por_mes = f2.portagens / 6;            
				break;
			case "5":
				monthly_costs.portagens_por_mes = f2.portagens / 12;            
				break;
		}
	}
	else
		monthly_costs.portagens_por_mes = f2.preco_portagens_por_dia * f2.dias_portagens_por_mes;
		
	//fines
	switch(monthly_costs.multas_period) {
		case "1":
			monthly_costs.multas_por_mes = parseFloat(f2.multas);        
			break;
		case "2":
			monthly_costs.multas_por_mes = f2.multas / 2;       
			break;
		case "3":
			monthly_costs.multas_por_mes = f2.multas / 3;        
			break;
		case "4":
			monthly_costs.multas_por_mes = f2.multas / 6;        
			break;
		case "5":
			monthly_costs.multas_por_mes = f2.multas / 12;        
			break;
    }
	
	//washing
	switch(monthly_costs.lavagens_period) {
		case "1":
			monthly_costs.lavagens_por_mes = parseFloat(f2.lavagens);        
			break;
		case "2":
			monthly_costs.lavagens_por_mes = f2.lavagens / 2;        
			break;
		case "3":
			monthly_costs.lavagens_por_mes = f2.lavagens / 3;        
			break;
		case "4":
			monthly_costs.lavagens_por_mes = f2.lavagens / 6;        
			break;
		case "5":
			monthly_costs.lavagens_por_mes = f2.lavagens / 12;        
			break;
    }	
	
	//*************** CUSTOS EXTERNOS ************
	
	var external_costs = {
		handbook_extern_URL: 'http:\/\/ec.europa.eu\/transport\/themes\/sustainable\/doc\/2008_costs_handbook.pdf',
		epa: 0.005,       //Emissões de poluentes atmosféricos em €/km
		egee: 0.007,      //Emissões de gases de efeito de estufa em €/km
		ruido: 0.004,     //Ruído em €/km
		sr: 0.03,         //sinistralidade rodoviária em €/km
		cgstn: 0.1,       //congestionamento em €/km
		ifr_estr: 0.001,  //custos externos de desgaste da infra-estrutura em €/km
		total_exter: function(){		
			return (this.epa + this.egee + this.ruido + this.sr + this.cgstn + this.ifr_estr) * monthly_costs.km_por_mes;
		},
		total_costs: function(){ return this.total_exter(); }
	};
	
	//*************** EXTRA DATA - PUBLIC TRANSPORTS ************
	
    var public_transports = {
		racio_car_tp: 0.9,     //ratio (total price of public transports)/(total price of car) under which it shows the alternatives of public transports
		racio_outros_tp: 0.6,  //inferior ao qual mostra outras alternativas de TP, para lá do passe mensal (rede expresso, longo curso, etc.)
		percent_taxi: 0.2,     //in case above condition is met, the budget percentage alocated to taxi, as alternative to car
		taxi_price_per_km: <?echo $TAXI_PRICE_PER_DIST?>, //average price of taxi per unit distance		
		display_tp: function(){
			if(f3.pmpmpc * f3.n_pess_familia < this.racio_car_tp * monthly_costs.total() && f3.pmpmpc != 0) 
				return true;
			return false;
		},
		preco_total_tp: 0,
		display_outros_tp: false,
		total_altern: 0,
		racio_custocar_caustotp: 0,
		custo_taxi: 0,
		n_km_taxi: 0,
		outros_tp: 0
	};
	
	if(public_transports.display_tp()) {
		public_transports.preco_total_tp = f3.pmpmpc * f3.n_pess_familia;   //preço total de passes
		public_transports.total_altern = public_transports.preco_total_tp;
		public_transports.racio_custocar_caustotp= public_transports.preco_total_tp / monthly_costs.total();
		if(public_transports.racio_custocar_caustotp > public_transports.racio_outros_tp){    //caso se mostre outros TP além do passe mensal
			public_transports.display_outros_tp = false;
			public_transports.custo_taxi = monthly_costs.total() - public_transports.preco_total_tp;
			public_transports.n_km_taxi = public_transports.custo_taxi / public_transports.taxi_price_per_km;  //número de km possíveis de fazer de táxi
			public_transports.total_altern += public_transports.custo_taxi;
		}
		else{
			public_transports.display_outros_tp = true;
			public_transports.custo_taxi = monthly_costs.total() * (1 - public_transports.racio_custocar_caustotp) / 2;
			public_transports.n_km_taxi = public_transports.custo_taxi / public_transports.taxi_price_per_km;
			public_transports.outros_tp = monthly_costs.total() * (1 - public_transports.racio_custocar_caustotp) / 2;    //valor alocado a outros TP, excetuando passe mensal

			public_transports.total_altern += public_transports.custo_taxi + public_transports.outros_tp;
		}
		external_costs.total_costs = public_transports.total_altern;
	}
	
	//*************** EXTRA DATA - VIRTUAL SPEED ************
	
	var fin_effort = {
		income: 0,
		aver_income_per_year: 0,
		income_per_type: 0,
		income_hours_per_week: 0,
		aver_income_per_month:0,
		aver_income_per_hour: function(){ return getNetIncomePerHour();},
		time_hours_per_week: 36,
		time_month_per_year: 11,
		aver_work_time_per_m: 0,
		work_hours_per_y: 0,
		drive_to_work_days_per_week: 0,
		dist_home_job: 0,
		journey_weekend: 0,
		aver_drive_per_week: 0,
		drive_per_month: 0,
		drive_per_year:0,
		time_home_job: 0,
		time_weekend: 0,
		min_drive_per_week: 0,
		min_drive_per_day: 0,
		days_drive_per_month: 0,
		hours_drive_per_month: 0,
		hours_drive_per_year: 0,
		fuel_period_km: f3.period_km.options[f3.period_km.selectedIndex].value,
		total_per_year: function(){ return monthly_costs.total() * 12; },
		hours_per_year_to_afford_car: function(){ return (monthly_costs.total() * 12) / this.aver_income_per_hour(); },
		month_per_year_to_afford_car: function(){ return (monthly_costs.total() * 12) / this.aver_income_per_year * 12; },
		days_car_paid: function(){ return ((monthly_costs.total() * 12) / this.aver_income_per_year) * 365.25; },
		kinetic_speed: function(){ return this.drive_per_year / this.hours_drive_per_year; },
		virtual_speed: function(){ return this.drive_per_year / (this.hours_drive_per_year + (monthly_costs.total() * 12 / this.aver_income_per_hour())); }
	};
	
	//income
	switch(f3.income_type){
		case 'year':
			fin_effort.income = f3.income_per_year;
			fin_effort.aver_income_per_year = fin_effort.income;		
			break;
		case 'month':
			fin_effort.income = f3.income_per_month;
			fin_effort.income_per_type = f3.income_months_per_year;
			fin_effort.aver_income_per_year = fin_effort.income * fin_effort.income_per_type;		
			break;
		case 'week':
			fin_effort.income = f3.income_per_week;
			fin_effort.income_per_type = f3.income_weeks_per_year;
			fin_effort.aver_income_per_year = fin_effort.income * fin_effort.income_per_type;	
			break;
		case 'hour':
			fin_effort.income = f3.income_per_hour;
			fin_effort.income_hours_per_week = f3.income_hours_per_week;
			fin_effort.income_per_type = f3.income_hour_weeks_per_year;
			fin_effort.aver_income_per_year = fin_effort.income * fin_effort.income_hours_per_week * fin_effort.income_per_type;
			break;
	}
	fin_effort.aver_income_per_month = fin_effort.aver_income_per_year / 12;
	
	//working time
	if(f3.income_type != 'hour'){
		if(f3.is_working_time == 'true'){
			fin_effort.time_hours_per_week = f3.time_hours_per_week;
			fin_effort.time_month_per_year = f3.time_month_per_year;
		}

		fin_effort.aver_work_time_per_m = 365.25 / 7 * fin_effort.time_hours_per_week * fin_effort.time_month_per_year / 12 / 12;
		fin_effort.work_hours_per_y = 365.25 / 7 * fin_effort.time_hours_per_week * fin_effort.time_month_per_year / 12;
	}
	
	//time spent in driving
	if(f2.tipo_calc_combustiveis != 'km'){
		if(f3.drive_to_work == 'true'){
			fin_effort.drive_to_work_days_per_week = f3.drive_to_work_days_per_week;
			fin_effort.dist_home_job =  parseInt(f3.dist_home_job);
			fin_effort.journey_weekend = parseInt(f3.journey_weekend);
			fin_effort.aver_drive_per_week = 2 * fin_effort.drive_to_work_days_per_week * fin_effort.dist_home_job + fin_effort.journey_weekend;
		
			fin_effort.drive_per_month = 365.25 / 7 * fin_effort.aver_drive_per_week / 12;
			fin_effort.drive_per_year = 365.25 / 7 * fin_effort.aver_drive_per_week;	
		
		}
		else{
			switch(fin_effort.fuel_period_km)
			{
				case "1":
					fin_effort.drive_per_month = parseInt(f3.km_per_month);				
					break;
				case "2":
					fin_effort.drive_per_month = f3.km_per_month / 2;
					break;
				case "3":
					fin_effort.drive_per_month = f3.km_per_month / 3;				
					break;
				case "4":
					fin_effort.drive_per_month = f3.km_per_month / 6;				
					break;
				case "5":
					fin_effort.drive_per_month = f3.km_per_month / 12;			
					break;
			}
			fin_effort.drive_per_year = fin_effort.drive_per_month * 12;			
		}	
	}
	else{
		if(f2.leva_auto_job == 'true'){
			fin_effort.drive_to_work_days_per_week = f2.dias_por_semana;
			fin_effort.dist_home_job = parseInt(f2.km_entre_casa_trabalho);
			fin_effort.journey_weekend = parseInt(f2.km_fds);
			fin_effort.aver_drive_per_week = 2 * fin_effort.drive_to_work_days_per_week * fin_effort.dist_home_job + fin_effort.journey_weekend;	

			fin_effort.drive_per_month = 365.25 / 7 * fin_effort.aver_drive_per_week / 12;
			fin_effort.drive_per_year = 365.25 / 7 * fin_effort.aver_drive_per_week;
		}	
		else{	
			fin_effort.drive_per_month = parseInt(f2.km_por_mes);
			fin_effort.drive_per_year = fin_effort.drive_per_month * 12;	
		}
	}
	
	if(f3.drive_to_work == 'true' || f2.leva_auto_job == 'true'){
		fin_effort.time_home_job = parseInt(f3.time_home_job);
		fin_effort.time_weekend = parseInt(f3.time_weekend);
		fin_effort.min_drive_per_week = 2 * fin_effort.time_home_job * fin_effort.drive_to_work_days_per_week + fin_effort.time_weekend;
		fin_effort.hours_drive_per_month = 365.25 / 7 / 12 * fin_effort.min_drive_per_week / 60;	
	}
	else{
		fin_effort.min_drive_per_day = parseInt(f3.min_drive_per_day);
		fin_effort.days_drive_per_month = parseInt(f3.days_drive_per_month);
		fin_effort.hours_drive_per_month = fin_effort.min_drive_per_day * fin_effort.days_drive_per_month / 60;
	}
	fin_effort.hours_drive_per_year = fin_effort.hours_drive_per_month * 12;	
	
	var output = {
		monthly_costs: monthly_costs,
		external_costs: external_costs,
		public_transports: public_transports,
		fin_effort: fin_effort
	};
	
	return output;
}
