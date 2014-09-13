function calculate_costs(f1, f2, f3, country){
		
	//*************** MONTHLY COSTS ************
	
	var monthly_costs = {
		age_months: function(){
			var today = new Date();
			var date_auto = new Date(f1.auto_ano, f1.auto_mes - 1);
			return date_diff(date_auto,today);
		},		
		depreciation: function(){			
			if(this.age_months() != 0)
				return calculateMonthlyDepreciation(f1.auto_initial_cost, f1.auto_final_cost, this.age_months());
			return 0;
		},
		insurance: function(){ return calculateInsuranceMonthlyValue(f1.insurance_type, f1.insurance_value) },
		meses_cred: function(){
			if(f1.cred_auto_s_n == "true")
				return parseFloat(f1.credit_period);
			return 0;		
		},
		juros_totais: function(){
			var t = 0;
			if(f1.cred_auto_s_n == "true"){
				var t = ((this.meses_cred() * parseFloat(f1.credit_value_p_month)) + parseFloat(f1.credit_residual_value)) - parseFloat(f1.credit_amount);
				if(t < 0)
					t = 0;
			}
			return t;
		},
		credit: function(){		
			if(this.age_months() >= this.meses_cred())
				return this.juros_totais() / this.age_months();
			return parseFloat(this.juros_totais() / this.meses_cred())
		},
		inspection: function(){
			if(f1.nmr_times_inspec!=0)
				return (f1.nmr_times_inspec * f1.inspec_price) / this.age_months();
			return 0;
		},
		car_tax: function(){ return f1.car_tax / 12 },		
		fuel_period_km: f2.fuel_period_distance.options[f2.fuel_period_distance.selectedIndex].value,
		distance: 0,
		fuel: 0,		
		km_total_converted: 0,
		fuel_cost_period: f2.fuel_period_money.options[f2.fuel_period_money.selectedIndex].value,
		maintenance: function(){ return f2.maintenance / 12 },
		repairs_improv: function(){ return f2.repairs / 12 },
		parking: parseFloat(f2.parking),
		portagens_period: f2.tolls_select.options[f2.tolls_select.selectedIndex].value,
		tolls: 0,
		multas_period: f2.fines_select.options[f2.fines_select.selectedIndex].value,
		fines: 0,
	    washing_period: f2.washing_select.options[f2.washing_select.selectedIndex].value,
		washing: 0,
		total_standing_costs_month: function(){
			return this.insurance() + this.depreciation() + this.credit() +
				   this.inspection() + 0.5 * this.maintenance() + this.car_tax();
		},
		total_running_costs_month: function(){
			return this.fuel + 0.5 * this.maintenance() + this.repairs_improv() + this.parking +
				   this.tolls + this.fines + this.washing;
		},
		total_costs_month: function(){
			return this.insurance() + this.fuel + this.depreciation() +
		           this.credit() + this.inspection() + this.maintenance() +
				   this.repairs_improv() + this.car_tax() + this.parking +
				   this.tolls + this.fines + this.washing;
		}
	};
		
	//fuel
	switch(f2.type_calc_fuel){
		case "km":
			var fuel_eff_l100km = convert_to_fuel_eff_l100km(f2.fuel_eff_l100km, country.fuel_efficiency_std);
			var fuel_price_CURRpLitre = convert_to_fuel_price_CURRpLitre(f2.fuel_price_CURRpLitre, country.fuel_price_volume_std);
			if (f2.take_car_to_job == "false"){
				switch(monthly_costs.fuel_period_km){
					case "1":
						monthly_costs.distance = f2.distance;				
						break;
					case "2":
						monthly_costs.distance = f2.distance / 2;				
						break;
					case "3":
						monthly_costs.distance = f2.distance / 3;				
						break;
					case "4":
						monthly_costs.distance = f2.distance / 6;				
						break;
					case "5":
						monthly_costs.distance = f2.distance / 12;				
						break;
				}
				//if miles were chosen must convert input to kilometres
				monthly_costs.distance = convert_std_dist_to_km(monthly_costs.distance, country.distance_std);
				monthly_costs.fuel = fuel_eff_l100km * monthly_costs.distance * fuel_price_CURRpLitre / 100;
			}
			else{   //make calculation considering the user takes his car to work on a daily basis
			
				//if miles were chosen must convert input to kilometres
				var distance_home2job = convert_std_dist_to_km(f2.distance_home2job, country.distance_std);
				var km_fds_value = convert_std_dist_to_km(f2.distance_weekend, country.distance_std);
				var km_totais = ((2 * distance_home2job * parseInt(f2.days_p_week, 10)) + km_fds_value) * (30.4375 / 7);
				monthly_costs.km_total_converted = convert_km_to_std_dist(km_totais, country.distance_std);
				monthly_costs.fuel = fuel_eff_l100km * km_totais * fuel_price_CURRpLitre / 100;
				monthly_costs.distance = km_totais;
			}
			break;  
		case "euros":
			var price_mes;
			switch(monthly_costs.fuel_cost_period){
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
	
	//tolls
	if(f2.type_calc_tolls == "false"){
		switch(monthly_costs.portagens_period){
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
	switch(monthly_costs.multas_period) {
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
	switch(monthly_costs.washing_period) {
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
			return (this.epa + this.egee + this.ruido + this.sr + this.cgstn + this.ifr_estr) * monthly_costs.distance;
		},
		total_costs: function(){ return this.total_exter(); }
	};
	
	//*************** EXTRA DATA - PUBLIC TRANSPORTS ************
	
    var public_transports = {
		racio_car_tp: 0.9,     //ratio (total price of public transports)/(total price of car) under which it shows the alternatives of public transports
		racio_outros_tp: 0.6,  //inferior ao qual mostra outras alternativas de TP, para lá do passe mensal (rede expresso, longo curso, etc.)		    
		taxi_price_per_km: country.taxi_price, //average price of taxi per unit distance		
		display_tp: function(){
			if(f3.pmpmpc * f3.n_pess_familia < this.racio_car_tp * monthly_costs.total_costs_month() && f3.pmpmpc != 0) 
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
		public_transports.racio_custocar_caustotp= public_transports.preco_total_tp / monthly_costs.total_costs_month();
		if(public_transports.racio_custocar_caustotp > public_transports.racio_outros_tp){    //caso se mostre outros TP além do passe mensal
			public_transports.display_outros_tp = false;
			public_transports.custo_taxi = monthly_costs.total_costs_month() - public_transports.preco_total_tp;
			public_transports.n_km_taxi = public_transports.custo_taxi / public_transports.taxi_price_per_km;  //número de km possíveis de fazer de táxi
			public_transports.total_altern += public_transports.custo_taxi;
		}
		else{
			public_transports.display_outros_tp = true;
			public_transports.custo_taxi = monthly_costs.total_costs_month() * (1 - public_transports.racio_custocar_caustotp) / 2;
			public_transports.n_km_taxi = public_transports.custo_taxi / public_transports.taxi_price_per_km;
			public_transports.outros_tp = monthly_costs.total_costs_month() * (1 - public_transports.racio_custocar_caustotp) / 2;    //valor alocado a outros TP, excetuando passe mensal

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
		total_per_year: function(){ return monthly_costs.total_costs_month() * 12; },
		hours_per_year_to_afford_car: function(){ return (monthly_costs.total_costs_month() * 12) / this.aver_income_per_hour(); },
		month_per_year_to_afford_car: function(){ return (monthly_costs.total_costs_month() * 12) / this.aver_income_per_year * 12; },
		days_car_paid: function(){ return ((monthly_costs.total_costs_month() * 12) / this.aver_income_per_year) * 365.25; },
		kinetic_speed: function(){ return this.drive_per_year / this.hours_drive_per_year; },
		virtual_speed: function(){ return this.drive_per_year / (this.hours_drive_per_year + (monthly_costs.total_costs_month() * 12 / this.aver_income_per_hour())); }
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
	if(f2.type_calc_fuel != 'km'){
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
		if(f2.take_car_to_job == 'true'){
			fin_effort.drive_to_work_days_per_week = f2.days_p_week;
			fin_effort.dist_home_job = parseInt(f2.distance_home2job);
			fin_effort.journey_weekend = parseInt(f2.distance_weekend);
			fin_effort.aver_drive_per_week = 2 * fin_effort.drive_to_work_days_per_week * fin_effort.dist_home_job + fin_effort.journey_weekend;	

			fin_effort.drive_per_month = 365.25 / 7 * fin_effort.aver_drive_per_week / 12;
			fin_effort.drive_per_year = 365.25 / 7 * fin_effort.aver_drive_per_week;
		}	
		else{	
			fin_effort.drive_per_month = parseInt(f2.distance);
			fin_effort.drive_per_year = fin_effort.drive_per_month * 12;	
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
	
	var output = {
		monthly_costs: monthly_costs,
		external_costs: external_costs,
		public_transports: public_transports,
		fin_effort: fin_effort		
	};
	
	return output;
}
