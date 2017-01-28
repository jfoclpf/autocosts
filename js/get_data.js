// get from form
function get_form_part1(){
    var d = document.custo; //main form document variable
    var data = {
        //depreciation
        auto_mes:               d.auto_mes.value,
        auto_ano:               d.auto_ano.value,
        auto_initial_cost:      d.auto_val_inicial.value,
        auto_final_cost:        d.auto_val_final.value,     
        //insurance
        insurance_type:         getCheckedValue(d.tipo_seguro),
        insurance_value:        d.seguro_val.value,
        //finance
        cred_auto_s_n:          getCheckedValue(d.cred_auto),
        credit_amount:          d.cred_auto_montante.value,
        credit_period:          d.cred_auto_period.value,
        credit_value_p_month:   d.cred_auto_val_mes.value,
        credit_residual_value:  d.cred_auto_valresidual.value,
        //inspection
        nmr_times_inspec:       d.nr_vezes_inspecao.value,
        inspec_price:           d.preco_inspecao.value,
        //car tax
        car_tax:                d.IUC.value
    };
    return data;
}

function get_form_part2(){
    var d = document.custo; //main form document variable
    var data = {
        //fuel
        type_calc_fuel:         getCheckedValue(d.calc_combustiveis),
        fuel_efficiency:        d.consumo_auto.value,
        fuel_price:             d.fuel_price.value,
        take_car_to_job:        getCheckedValue(d.car_job_form2),
        fuel_period_distance:   d.combustivel_period_km.value,      
        distance:               d.km_por_mes.value,
        car_consumption:        d.consumo_auto.value,
        distance_home2job:      d.km_entre_casa_trabalho.value,
        distance_weekend:       d.km_fds.value,
        days_p_week:            d.dias_por_semana.value,
        fuel_period_money:      d.combustiveis_periodo_euro.value,
        fuel_money:             d.combustiveis_euro.value,
        //maintenance
        maintenance:            d.revisoes.value,
        //repairs
        repairs:                d.reparacoes.value,
        //parking
        parking:                d.parqueamento.value,
        //tolls
        type_calc_tolls:        getCheckedValue(d.portagens_ao_dia),
        tolls_select:           d.portagens_select.value,
        tolls:                  d.portagens.value,
        price_tolls_p_day:      d.preco_portagens_por_dia.value,
        tolls_days_p_month:     d.dias_portagens_por_mes.value,
        //fines
        fines:                  d.multas.value,
        fines_select:           d.multas_select.value,
        //washing
        washing:                d.lavagens.value,
        washing_select:         d.lavagens_select.value     
    };
    return data;
}

function get_form_part3(){
    var d = document.custo; //main form document variable
    var data = {
        //public transports section
        IsPublicTransports:          getCheckedSliderValue(d.slider1),
        n_pess_familia:              d.pessoas_agregado.value,
        monthly_pass_cost:           d.preco_passe.value,
        
        //financial effort section
        IsFinancialEffort:           getCheckedSliderValue(d.slider2),
        income_type:                 getCheckedValue(d.radio_income),
        income_per_year:             d.income_per_year.value,
        income_per_month:            d.income_per_month.value,
        income_months_per_year:      d.income_months_per_year.value,
        income_per_week:             d.income_per_week.value,
        income_weeks_per_year:       d.income_weeks_per_year.value,
        income_per_hour:             d.income_per_hour.value,
        income_hours_per_week:       d.income_hours_per_week.value,
        income_hour_weeks_per_year:  d.income_hour_weeks_per_year.value,
        is_working_time:             getCheckedValue(d.radio_work_time),
        time_hours_per_week:         d.time_hours_per_week.value,
        time_month_per_year:         d.time_month_per_year.value,

        //Distance section
        drive_to_work:               getCheckedValue(d.drive_to_work),
        drive_to_work_days_per_week: d.drive_to_work_days_per_week.value,
        dist_home_job:               d.dist_home_job.value,
        journey_weekend:             d.journey_weekend.value,
        period_km:                   d.period_km.value,
        dist_per_time_period:        d.km_per_month.value,

        //Time spent in driving
        time_home_job:               d.time_home_job.value,
        time_weekend:                d.time_weekend.value,
        min_drive_per_day:           d.min_drive_per_day.value,
        days_drive_per_month:        d.days_drive_per_month.value
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
            
        fuel_efficiency:        datab.fuel_distance_based_fuel_efficiency,  //repetitions

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
        //public transports section
        IsPublicTransports:          false,
        n_pess_familia:              datab.household_number_people,
        monthly_pass_cost:           datab.public_transportation_month_expense,
        
        //financial effort section
        IsFinancialEffort:           false,
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
        
        //Distance section
        drive_to_work:               datab.distance_drive_to_work,
        drive_to_work_days_per_week: datab.distance_days_per_week,
        dist_home_job:               datab.distance_home_job,       
        journey_weekend:             datab.distance_journey_weekend,
        period_km:                   datab.distance_period,
        dist_per_time_period:        datab.distance_per_month,
        
        //Time spent in driving
        time_home_job:               datab.time_spent_home_job,     
        time_weekend:                datab.time_spent_weekend,
        min_drive_per_day:           datab.time_spent_min_drive_per_day,
        days_drive_per_month:        datab.time_spent_days_drive_per_month 
    };
    
    data.IsPublicTransports = isThereinDbPublicTranspData(data);
    data.IsFinancialEffort = isThereinDbFinEffortData(data);
    
    return data;
}

//Gets information from DB whether DB has or not Public Transport data 
function isThereinDbPublicTranspData(f3){
    return (isDef(f3.n_pess_familia) && isDef(f3.monthly_pass_cost));
}

//Gets information from DB whether DB has or not Financial Effort data  
function isThereinDbFinEffortData(f3){

    switch(f3.income_type){
        case 'year':
            return (isDef(f3.income_per_year));
        case 'month':
            return (isDef(f3.income_per_month) && isDef(f3.income_months_per_year));
        case 'week':
            return (isDef(f3.income_per_week) && isDef(f3.income_weeks_per_year));
        case 'hour':
            return (isDef(f3.income_per_hour) && isDef(f3.income_hours_per_week) && isDef(f3.income_hour_weeks_per_year));
    }
}