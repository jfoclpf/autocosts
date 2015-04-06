// get from form
function get_form_part1(){
	var data = {
		//depreciation
		auto_mes:               document.custo.auto_mes.value,
		auto_ano:               document.custo.auto_ano.value,
		auto_initial_cost:      document.custo.auto_val_inicial.value,
		auto_final_cost:        document.custo.auto_val_final.value,		
		//insurance
		insurance_type:         getCheckedValue(custo.tipo_seguro),
		insurance_value:        document.custo.seguro_val.value,
		//finance
		cred_auto_s_n:          getCheckedValue(custo.cred_auto),
		credit_amount:          document.custo.cred_auto_montante.value,
		credit_period:          document.custo.cred_auto_period.value,
		credit_value_p_month:   document.custo.cred_auto_val_mes.value,
		credit_residual_value:  document.custo.cred_auto_valresidual.value,
		//inspection
		nmr_times_inspec:       document.custo.nr_vezes_inspecao.value,
		inspec_price:           document.custo.preco_inspecao.value,
		//car tax
		car_tax:                document.custo.IUC.value
	};
	return data;
}

function get_form_part2(){

	var data = {
		//fuel
		type_calc_fuel:         getCheckedValue(custo.calc_combustiveis),
		fuel_eff_l100km:        document.custo.consumo_auto.value,
		fuel_price_CURRpLitre:  document.custo.fuel_price.value,
		take_car_to_job:        getCheckedValue(document.custo.carro_emprego),
		fuel_period_distance:   document.custo.combustivel_period_km.value,		
		distance:               document.custo.km_por_mes.value,
		car_consumption:        document.custo.consumo_auto.value,
		fuel_price:             document.custo.fuel_price.value,
		distance_home2job:      document.custo.km_entre_casa_trabalho.value,
		distance_weekend:       document.custo.km_fds.value,
		days_p_week:            document.custo.dias_por_semana.value,
		fuel_period_money:      document.custo.combustiveis_periodo_euro.value,
		fuel_money:             document.custo.combustiveis_euro.value,
		//maintenance
		maintenance:            document.custo.revisoes.value,
		//repairs
		repairs:                document.custo.reparacoes.value,
		//parking
		parking:                document.custo.parqueamento.value,
		//tolls
		type_calc_tolls:        getCheckedValue(document.custo.portagens_ao_dia),
		tolls_select:           document.custo.portagens_select.value,
		tolls:                  document.custo.portagens.value,
		price_tolls_p_day:      document.custo.preco_portagens_por_dia.value,
		tolls_days_p_month:     document.custo.dias_portagens_por_mes.value,
		//fines
		fines:                  document.custo.multas.value,
		fines_select:           document.custo.multas_select.value,
		//washing
		washing:                document.custo.lavagens.value,
		washing_select:         document.custo.lavagens_select.value		
	};
	return data;
}

function get_form_part3(){
	var data = {
		n_pess_familia:              document.custo.pessoas_agregado.value,
		pmpmpc:                      document.custo.preco_passe.value,
		income_type:                 getCheckedValue(custo.radio_income),
		income_per_year:             document.custo.income_per_year.value,
		income_per_month:            document.custo.income_per_month.value,
		income_months_per_year:      document.custo.income_months_per_year.value,
		income_per_week:             document.custo.income_per_week.value,
		income_weeks_per_year:       document.custo.income_weeks_per_year.value,
		income_per_hour:             document.custo.income_per_hour.value,
		income_hours_per_week:       document.custo.income_hours_per_week.value,
		income_hour_weeks_per_year:  document.custo.income_hour_weeks_per_year.value,
		is_working_time:             getCheckedValue(custo.radio_work_time),
		time_hours_per_week:         document.custo.time_hours_per_week.value,
		time_month_per_year:         document.custo.time_month_per_year.value,
		drive_to_work:               getCheckedValue(custo.drive_to_work),
		drive_to_work_days_per_week: document.custo.drive_to_work_days_per_week.value,
		dist_home_job:               document.custo.dist_home_job.value,
		journey_weekend:             document.custo.journey_weekend.value,
		period_km:                   document.custo.period_km.value,
		km_per_month:                document.custo.km_per_month.value,
		time_home_job:               document.custo.time_home_job.value,
		time_weekend:                document.custo.time_weekend.value,
		min_drive_per_day:           document.custo.min_drive_per_day.value,
		days_drive_per_month:        document.custo.days_drive_per_month.value
	};
	return data;
}

//get from database 
function get_DB_part1(datab){
	var data = {
		//depreciation
		auto_mes:              datab.acquisition_month,
		auto_ano:              datab.acquisition_year,
		auto_initial_cost:     datab.commercial_value_at_acquisition,
		auto_final_cost:       datab.commercial_value_at_now,		
		//insurance
		insurance_type:        datab.insure_type,
		insurance_value:       datab.insurance_value,
		//finance
		cred_auto_s_n:         datab.credit,
		credit_amount:         datab.credit_borrowed_amount,
		credit_period:         datab.credit_number_installments,
		credit_value_p_month:  datab.credit_amount_installment,
		credit_residual_value: datab.credit_residual_value,
		//inspection
		nmr_times_inspec:      datab.inspection_number_inspections,
		inspec_price:          datab.inspection_average_inspection_cost,
		//car tax
		car_tax:               datab.vehicle_excise_tax
	};
	return data;
}

function get_DB_part2(datab){

	var data = {
		//fuel
		type_calc_fuel:         datab.fuel_calculation,
		fuel_money:             datab.fuel_currency_based_currency_value,
		fuel_period_money:      datab.fuel_currency_based_periodicity,
		take_car_to_job:        datab.fuel_distance_based_car_to_work,
		days_p_week:            datab.fuel_distance_based_car_to_work_number_days_week,
		distance_home2job:      datab.fuel_distance_based_car_to_work_distance_home_work,
		distance_weekend:       datab.fuel_distance_based_car_to_work_distance_weekend,
		distance:               datab.fuel_distance_based_no_car_to_work_distance,
		fuel_period_distance:   datab.fuel_distance_based_no_car_to_fuel_period_distance,
	    car_consumption:        datab.fuel_distance_based_fuel_efficiency,
	    fuel_price:             datab.fuel_distance_based_fuel_price,		
		    
		fuel_eff_l100km:        datab.fuel_distance_based_fuel_efficiency,  //repetitions
		fuel_price_CURRpLitre:  datab.fuel_distance_based_fuel_price, //repetitions
		//maintenance
		maintenance:            datab.maintenance,
		//repairs
		repairs:                datab.repairs,
		//parking
		parking:                datab.parking,
		//tolls
		type_calc_tolls:        datab.tolls_daily,
		tolls:                  datab.tolls_no_daily_value,
		tolls_select:           datab.tolls_no_daily_period,
		price_tolls_p_day:      datab.tolls_daily_expense,
		tolls_days_p_month:     datab.tolls_daily_number_days,
		//fines
		fines:                  datab.tickets_value,
		fines_select:           datab.tickets_periodicity,
		//washing
		washing:                datab.washing_value,
		washing_select:         datab.washing_periodicity		
	};
	return data;
}

function get_DB_part3(datab){
	var data = {
		n_pess_familia:              datab.household_number_people,
		pmpmpc:                      datab.public_transportation_month_expense,
		
		income_type:                 datab.income_type,
		income_per_year:             datab.income_per_year,
		income_per_month:            datab.income_per_month,
		income_months_per_year:      datab.income_months_per_year,
		income_per_week:             datab.income_per_week,
		income_weeks_per_year:       datab.income_weeks_per_year,
		income_per_hour:             datab.income_per_hour,
		income_hours_per_week:       datab.income_hours_per_week,
		income_hour_weeks_per_year:  datab.income_hour_weeks_per_year,
		
		is_working_time:             datab.work_time,
		time_month_per_year:         datab.work_time_month_per_year,
		time_hours_per_week:         datab.work_time_hours_per_week,
		drive_to_work:               datab.distance_drive_to_work,
		drive_to_work_days_per_week: datab.distance_days_per_week,
		
		dist_home_job:               datab.distance_home_job,		
		journey_weekend:             datab.distance_journey_weekend,
		period_km:                   datab.distance_period,
		km_per_month:                datab.distance_per_month,
		time_home_job:               datab.time_spent_home_job,		
		time_weekend:                datab.time_spent_weekend,
		min_drive_per_day:           datab.time_spent_min_drive_per_day,
		days_drive_per_month:        datab.time_spent_days_drive_per_month 
	};
	return data;
}
