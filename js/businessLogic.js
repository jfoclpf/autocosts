function calculate_costs(f1, f2, f3, country){
		
	//*************** MONTHLY COSTS ************
	
	var monthly_costs = {			
		depreciation: 0,
		insurance: 0,		
		credit: 0,
		inspection: 0,
		car_tax: 0,			
		fuel: 0,		
		maintenance: 0,
		repairs_improv: 0,
		parking: 0,		
		tolls: 0,		
		fines: 0,	    
		washing: 0				
	};
	
	//depreciation
	var today = new Date();
	var date_auto = new Date(f1.auto_ano, f1.auto_mes - 1);
	var age_months = date_diff(date_auto,today);
	
	if(age_months != 0)
		monthly_costs.depreciation = calculateMonthlyDepreciation(f1.auto_initial_cost, f1.auto_final_cost, age_months);
	
	//insurance
	monthly_costs.insurance = calculateInsuranceMonthlyValue(f1.insurance_type, f1.insurance_value);
	
	//credit
	var month_cred = 0;
	if(f1.cred_auto_s_n == "true")
		month_cred = parseFloat(f1.credit_period);	

	var total_interests = 0;
	if(f1.cred_auto_s_n == "true"){
				total_interests = ((month_cred * parseFloat(f1.credit_value_p_month)) + parseFloat(f1.credit_residual_value)) - parseFloat(f1.credit_amount);
				if(total_interests < 0)
					total_interests = 0;
			}
		
	if(age_months >= month_cred)
		monthly_costs.credit = total_interests / age_months;
	else
		monthly_costs.credit = parseFloat(total_interests / month_cred);
	
	//inspection
	if(f1.nmr_times_inspec != 0)
		monthly_costs.inspection = (f1.nmr_times_inspec * f1.inspec_price) / age_months;
	
	//taxes
	monthly_costs.car_tax = f1.car_tax / 12;
	
	//fuel
	var fuel_period_km, fuel_cost_period;
	var distance_std = 0;  
	var distance = 0;
	switch(f2.type_calc_fuel){
		case "km":
			var fuel_eff_l100km = convert_to_fuel_eff_l100km(f2.fuel_eff_l100km, country.fuel_efficiency_std);
			var fuel_price_CURRpLitre = convert_to_fuel_price_CURRpLitre(f2.fuel_price_CURRpLitre, country.fuel_price_volume_std);
			if (f2.take_car_to_job == "false"){
				fuel_period_km = f2.fuel_period_distance;
				switch(fuel_period_km){
					case "1":
						distance = parseInt(f2.distance);				
						break;
					case "2":
						distance = f2.distance / 2;				
						break;
					case "3":
						distance = f2.distance / 3;				
						break;
					case "4":
						distance = f2.distance / 6;				
						break;
					case "5":
						distance = f2.distance / 12;				
						break;
				}
				//if miles were chosen must convert input to kilometres						
				var distance_converted = convert_std_dist_to_km(distance, country.distance_std);
				monthly_costs.fuel = fuel_eff_l100km * distance_converted * fuel_price_CURRpLitre / 100;
			}
			else{   //make calculation considering the user takes his car to work on a daily basis
			
				//if miles were chosen must convert input to kilometres
				var distance_home2job = convert_std_dist_to_km(f2.distance_home2job, country.distance_std);
				var km_weekend_value = convert_std_dist_to_km(f2.distance_weekend, country.distance_std);
				var total_km = ((2 * distance_home2job * parseInt(f2.days_p_week, 10)) + km_weekend_value) * (30.4375 / 7);
				distance_std = convert_km_to_std_dist(total_km, country.distance_std);
				monthly_costs.fuel = fuel_eff_l100km * total_km * fuel_price_CURRpLitre / 100;
				distance = total_km;
			}
			break;  
		case "euros":
			var price_mes;
			fuel_cost_period = f2.fuel_period_money;
			switch(fuel_cost_period){
				case "1":
					price_mes = parseFloat(f2.fuel_money);
					break;
				case "2":
					price_mes = f2.fuel_money / 2;			
					break;
				case "3":
					price_mes = f2.fuel_money / 3;			
					break;
				case "4":
					price_mes = f2.fuel_money / 6;			
					break;
				case "5":
					price_mes = f2.fuel_money / 12;			
					break;
			}
			monthly_costs.fuel = price_mes;
			break;
	}
	
	//maintenance
	monthly_costs.maintenance = f2.maintenance / 12;
	
	//repairs
	monthly_costs.repairs_improv = f2.repairs / 12;
	
	//parking
	monthly_costs.parking = parseFloat(f2.parking);
	
	
	
	//tolls
	var tolls_period = f2.tolls_select;
	if(f2.type_calc_tolls == "false"){
		switch(tolls_period){
			case "1":
				monthly_costs.tolls = parseFloat(f2.tolls);           
				break;
			case "2":
				monthly_costs.tolls = f2.tolls / 2;            
				break;
			case "3":
				monthly_costs.tolls = f2.tolls / 3;            
				break;
			case "4":
				monthly_costs.tolls = f2.tolls / 6;            
				break;
			case "5":
				monthly_costs.tolls = f2.tolls / 12;            
				break;
		}
	}
	else
		monthly_costs.tolls = f2.price_tolls_p_day * f2.tolls_days_p_month;
		
	//fines
	var fines_period = f2.fines_select;
	switch(fines_period) {
		case "1":
			monthly_costs.fines = parseFloat(f2.fines);        
			break;
		case "2":
			monthly_costs.fines = f2.fines / 2;       
			break;
		case "3":
			monthly_costs.fines = f2.fines / 3;        
			break;
		case "4":
			monthly_costs.fines = f2.fines / 6;        
			break;
		case "5":
			monthly_costs.fines = f2.fines / 12;        
			break;
    }
	
	//washing
	washing_period = f2.washing_select;
	switch(washing_period) {
		case "1":
			monthly_costs.washing = parseFloat(f2.washing);        
			break;
		case "2":
			monthly_costs.washing = f2.washing / 2;        
			break;
		case "3":
			monthly_costs.washing = f2.washing / 3;        
			break;
		case "4":
			monthly_costs.washing = f2.washing / 6;        
			break;
		case "5":
			monthly_costs.washing = f2.washing / 12;        
			break;
    }	
	
	//total standing costs
	var total_standing_costs_month = monthly_costs.insurance + monthly_costs.depreciation + monthly_costs.credit +
				   monthly_costs.inspection + 0.5 * monthly_costs.maintenance + monthly_costs.car_tax;
	
	//total running costs
	var total_running_costs_month = monthly_costs.fuel + 0.5 * monthly_costs.maintenance + monthly_costs.repairs_improv + monthly_costs.parking +
				   monthly_costs.tolls + monthly_costs.fines + monthly_costs.washing;
	
	//totals	
	var total_costs_month = monthly_costs.insurance + monthly_costs.fuel + monthly_costs.depreciation +
		           monthly_costs.credit + monthly_costs.inspection + monthly_costs.maintenance +
				   monthly_costs.repairs_improv + monthly_costs.car_tax + monthly_costs.parking +
				   monthly_costs.tolls + monthly_costs.fines + monthly_costs.washing;
				  
	var total_costs_year = total_costs_month * 12;
	
	//*************** EXTERNAL COSTS ************
	
	var external_costs = {
		handbook_extern_URL: 'http:\/\/ec.europa.eu\/transport\/themes\/sustainable\/doc\/2008_costs_handbook.pdf',
		epa: 0.005,       //Emissões de poluentes atmosféricos em €/km
		egee: 0.007,      //Emissões de gases de efeito de estufa em €/km
		ruido: 0.004,     //Ruído em €/km
		sr: 0.03,         //sinistralidade rodoviária em €/km
		cgstn: 0.1,       //congestionamento em €/km
		ifr_estr: 0.001,  //custos externos de desgaste da infra-estrutura em €/km
		total_exter: function(){		
			return (this.epa + this.egee + this.ruido + this.sr + this.cgstn + this.ifr_estr) * distance;
		},
		total_costs: function(){ return this.total_exter(); }
	};
	
	//*************** EXTRA DATA - PUBLIC TRANSPORTS ************
	
    var public_transports = {
		racio_car_tp: 0.9,     //ratio (total price of public transports)/(total price of car) under which it shows the alternatives of public transports
		racio_outros_tp: 0.6,  //inferior ao qual mostra outras alternativas de TP, para lá do passe mensal (rede expresso, longo curso, etc.)		    
		taxi_price_per_km: country.taxi_price, //average price of taxi per unit distance		
		display_tp: function(){
			if(f3.pmpmpc * f3.n_pess_familia < this.racio_car_tp * total_costs_month && f3.pmpmpc != 0) 
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
	var percent_taxi= 0.2;//in case above condition is met, the budget percentage alocated to taxi, as alternative to car
	if(public_transports.display_tp()) {
		public_transports.preco_total_tp = f3.pmpmpc * f3.n_pess_familia;   //preço total de passes
		public_transports.total_altern = public_transports.preco_total_tp;
		public_transports.racio_custocar_caustotp= public_transports.preco_total_tp / total_costs_month;
		if(public_transports.racio_custocar_caustotp > public_transports.racio_outros_tp){    //caso se mostre outros TP além do passe mensal
			public_transports.display_outros_tp = false;
			public_transports.custo_taxi = total_costs_month - public_transports.preco_total_tp;
			public_transports.n_km_taxi = public_transports.custo_taxi / public_transports.taxi_price_per_km;  //número de km possíveis de fazer de táxi
			public_transports.total_altern += public_transports.custo_taxi;
		}
		else{
			public_transports.display_outros_tp = true;
			public_transports.custo_taxi = total_costs_month * (1 - public_transports.racio_custocar_caustotp) / 2;
			public_transports.n_km_taxi = public_transports.custo_taxi / public_transports.taxi_price_per_km;
			public_transports.outros_tp = total_costs_month * (1 - public_transports.racio_custocar_caustotp) / 2;    //valor alocado a outros TP, excetuando passe mensal

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
		aver_income_per_hour: 0,
		time_hours_per_week: 36,
		time_month_per_year: 11,
		aver_work_time_per_m: 0,
		work_hours_per_y: 0,
		drive_to_work_days_per_week: 0,
		dist_home_job: 0,
		journey_weekend: 0,
		aver_drive_per_week: 0,		
		drive_per_year:0,
		time_home_job: 0,
		time_weekend: 0,
		min_drive_per_week: 0,
		min_drive_per_day: 0,
		days_drive_per_month: 0,
		hours_drive_per_month: 0,
		hours_drive_per_year: 0,
		fuel_period_km: f3.period_km,
		total_per_year: total_costs_year,
		hours_per_year_to_afford_car: 0,
		month_per_year_to_afford_car: 0,
		days_car_paid: 0,
		kinetic_speed: 0,
		virtual_speed: 0
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
	var drive_per_month = 0;
	if(f2.type_calc_fuel != 'km'){
		if(f3.drive_to_work == 'true'){
			fin_effort.drive_to_work_days_per_week = f3.drive_to_work_days_per_week;
			fin_effort.dist_home_job =  parseInt(f3.dist_home_job);
			fin_effort.journey_weekend = parseInt(f3.journey_weekend);
			fin_effort.aver_drive_per_week = 2 * fin_effort.drive_to_work_days_per_week * fin_effort.dist_home_job + fin_effort.journey_weekend;
		
			drive_per_month = 365.25 / 7 * fin_effort.aver_drive_per_week / 12;
			fin_effort.drive_per_year = 365.25 / 7 * fin_effort.aver_drive_per_week;	
		
		}
		else{
			switch(fin_effort.fuel_period_km)
			{
				case "1":
					drive_per_month = parseInt(f3.km_per_month);				
					break;
				case "2":
					drive_per_month = f3.km_per_month / 2;
					break;
				case "3":
					drive_per_month = f3.km_per_month / 3;				
					break;
				case "4":
					drive_per_month = f3.km_per_month / 6;				
					break;
				case "5":
					drive_per_month = f3.km_per_month / 12;			
					break;
			}
			fin_effort.drive_per_year = drive_per_month * 12;			
		}	
	}
	else{
		if(f2.take_car_to_job == 'true'){
			fin_effort.drive_to_work_days_per_week = f2.days_p_week;
			fin_effort.dist_home_job = parseInt(f2.distance_home2job);
			fin_effort.journey_weekend = parseInt(f2.distance_weekend);
			fin_effort.aver_drive_per_week = 2 * fin_effort.drive_to_work_days_per_week * fin_effort.dist_home_job + fin_effort.journey_weekend;	

			drive_per_month = 365.25 / 7 * fin_effort.aver_drive_per_week / 12;
			fin_effort.drive_per_year = 365.25 / 7 * fin_effort.aver_drive_per_week;
		}	
		else{	
			drive_per_month = parseInt(f2.distance);
			fin_effort.drive_per_year = drive_per_month * 12;	
		}
	}
	
	if(f3.drive_to_work == 'true' || f2.take_car_to_job == 'true'){
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
	
	//distance driven per month might come from form part 2 or part 3
	if (f2.type_calc_fuel == "km")
		distance_per_month = distance;
	else
		distance_per_month = drive_per_month;
		
	//running costs per unit dist.
	var running_costs_p_unit_distance = total_running_costs_month / distance_per_month;
	
	//total costs per unit dist.
	var total_costs_p_unit_distance = total_costs_month / distance_per_month;
	
	//find Net Income per Hour

	var typeIncome = $('#income_div').find('input[type=radio]:checked').val();
	var isJob = $('#working_time_div').find('input[type=radio]:checked').val();
	var a = 11; //months per year of work
	var b = 36; //hours per week of normal working week
	var T, x, y, n;
	if(isJob=='true'){
		a = parseInt($('#time_month_per_year').val());
		b = parseInt($('#time_hours_per_week').val());
	}
	T = 365.25/7 * a/12 * b;
	alert("T:"+T);
	switch(typeIncome){
		case 'year':
			x = parseInt($('#income_per_year').val());
			n = x/T;
			break;
		case 'month':
			x = parseInt($('#income_per_month').val());
			y = parseInt($('#income_months_per_year').val());
			n = (x*y)/T;
			break;
		case 'week':
			x = parseInt($('#income_per_week').val());
			y = parseInt($('#income_weeks_per_year').val())
			n = (x*y)/T;
			break;
		case 'hour':
			n = parseInt($('#income_per_hour').val());
	}
	alert("n:"+n);
	fin_effort.aver_income_per_hour = n;

	
	
	
	
	
	
	
	
	
	
	//extra financial effort variables
	fin_effort.hours_per_year_to_afford_car = total_costs_year / fin_effort.aver_income_per_hour;
	fin_effort.month_per_year_to_afford_car = total_costs_year / fin_effort.aver_income_per_year * 12;
	fin_effort.days_car_paid = total_costs_year / fin_effort.aver_income_per_year * 365.25;
	fin_effort.kinetic_speed = fin_effort.drive_per_year / fin_effort.hours_drive_per_year;
	fin_effort.virtual_speed = fin_effort.drive_per_year / (fin_effort.hours_drive_per_year + fin_effort.hours_per_year_to_afford_car);
	
	var output = {
		monthly_costs: monthly_costs, //object with all the monthly costs
		external_costs: external_costs,
		public_transports: public_transports,
		fin_effort: fin_effort, //object with financial effort variables
		distance_std: distance_std,
		age_months: age_months,
		month_cred: month_cred,
		total_interests: total_interests,
		fuel_period_km: fuel_period_km,
		fuel_cost_period: fuel_cost_period,
		tolls_period: tolls_period,
		fines_period: fines_period,
		washing_period: washing_period,
		total_standing_costs_month: total_standing_costs_month,
		total_running_costs_month: total_running_costs_month,
		total_costs_month: total_costs_month,
		total_costs_year: total_costs_year,
		running_costs_p_unit_distance: running_costs_p_unit_distance,
		total_costs_p_unit_distance: total_costs_p_unit_distance,
		distance_per_month: distance_per_month
	};
	
	return output;
}
