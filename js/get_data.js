function get_form_part1(){
	var data = {
		auto_mes: document.custo.auto_mes.value,
		auto_ano: document.custo.auto_ano.value,
		auto_initial_cost: document.custo.auto_val_inicial.value,
		auto_final_cost: document.custo.auto_val_final.value,		
		insurance_type: getCheckedValue(custo.tipo_seguro),
		insurance_value: document.custo.seguro_val.value,
		cred_auto_s_n: getCheckedValue(custo.cred_auto),
		credit_amount: document.custo.cred_auto_montante.value,
		credit_period: document.custo.cred_auto_period.value,
		credit_value_p_month: document.custo.cred_auto_val_mes.value,
		credit_residual_value: document.custo.cred_auto_valresidual.value,
		nmr_times_inspec: document.custo.nr_vezes_inspecao.value,
		inspec_price: document.custo.preco_inspecao.value,
		car_tax: document.custo.IUC.value
	};
	return data;
}

function get_form_part2(){

	var data = {
		type_calc_fuel: getCheckedValue(custo.calc_combustiveis),
		fuel_eff_l100km: document.custo.consumo_auto.value,
		fuel_price_CURRpLitre: document.custo.fuel_price.value,
		take_car_to_job: getCheckedValue(document.custo.carro_emprego),
		fuel_period_distance: document.custo.combustivel_period_km,		
		distance: document.custo.km_por_mes.value,
		car_consumption: document.custo.consumo_auto.value,
		fuel_price: document.custo.fuel_price.value,
		distance_home2job: document.custo.km_entre_casa_trabalho.value,
		distance_weekend: document.custo.km_fds.value,
		days_p_week: document.custo.dias_por_semana.value,
		fuel_period_money: document.custo.combustiveis_periodo_euro,
		fuel_money: document.custo.combustiveis_euro.value,
		maintenance: document.custo.revisoes.value,
		repairs: document.custo.reparacoes.value,
		parking: document.custo.parqueamento.value,
		type_calc_tolls: getCheckedValue(document.custo.portagens_ao_dia),
		tolls_select: document.custo.portagens_select,
		tolls: document.custo.portagens.value,
		price_tolls_p_day: document.custo.preco_portagens_por_dia.value,
		tolls_days_p_month: document.custo.dias_portagens_por_mes.value,
		fines: document.custo.multas.value,
		fines_select: document.custo.multas_select,
		washing: document.custo.lavagens.value,
		washing_select: document.custo.lavagens_select		
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