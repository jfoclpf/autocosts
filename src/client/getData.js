//Get user input data from form
function getFormData(){
    
    var d = document.costs_form; //main form document variable
    
    var data = {
        depreciation: {
            acquisitionMonth:  d.acquisitionMonth.value,
            acquisitionYear:   d.acquisitionYear.value,
            acquisitionCost:   d.commercialValueAtAcquisition.value,
            presentValue:      d.commercialValueAtNow.value        
        },                

        insurance: {
            amountPerPeriod: d.insuranceValue.value,
            period:          getCheckedValue(d.insurancePaymentPeriod)
        },

        credit: {
            creditBool: getCheckedValue(d.AutoCreditRadioBtn), //binary variable: "true" or "false"
            yesCredit:{
                borrowedAmount:     d.borrowedAmount.value,
                numberInstallments: d.numberInstallments.value,
                amountInstallment:  d.amountInstallment.value,
                residualValue:      d.residualValue.value
            }            
        },
        
        inspection: {
            averageInspectionCost: d.averageInspectionCost.value,
            numberOfInspections:   d.numberInspections.value
        },
        
        car_tax: {
            amountPerYear: d.roadTaxes.value
        },               
         
        //Form Part 2
        fuel: {
            typeOfCalculation: getCheckedValue(d.calc_combustiveis), //binary variable: "currency" or "distance"
            currencyBased: {
                amountPerPeriod: d.combustiveis_euro.value,
                period:          d.combustiveis_periodo_euro.value //month, two months,  trimester, semester, year
            },
            distanceBased: {
                considerCarToJob: getCheckedValue(d.car_job_form2),  //binary variable: true or false
                carToJob: {
                    daysPerWeek:               d.dias_por_semana.value,
                    distanceBetweenHomeAndJob: d.km_entre_casa_trabalho.value,
                    distanceDuringWeekends:    d.km_fds.value
                },
                noCarToJob : {
                    distancePerPeriod: d.km_por_mes.value,
                    period:            d.combustivel_period_km.value //month, two months,  trimester, semester, year            
                },
                fuelEfficiency: d.consumo_auto.value, //fuel efficiency of the vehicle
                fuelPrice:      d.fuel_price.value   //fuel price per unit volume
            }            
        },

        maintenance:  {
            amountPerYear: d.revisoes.value
        },
       
        repairs_improv:  {
            amountPerYear: d.reparacoes.value
        },

        parking: {
            amountPerMonth: d.parqueamento.value
        },
        
        tolls: {
            calculationBasedOnDay: getCheckedValue(d.tolls_daily_radioBtn), //binary variable: "true" or "false"
            yesBasedOnDay: {
                amountPerDay: d.daily_expense_tolls.value,
                daysPerMonth: d.number_days_tolls.value
            },
            noBasedOnDay: {
                amountPerPeriod: d.no_daily_tolls_value.value,
                period:          d.tolls_period_select.value //month, two months,  trimester, semester, year
            }
        },
   
        fines: {
            amountPerPeriod: d.tickets_value.value,
            period:          d.tickets_period_select.value //month, two months,  trimester, semester, year
        },
        
        washing: {
            amountPerPeriod: d.washing_value.value,
            period:          d.washing_period_select.value //month, two months,  trimester, semester, year
        },      

        //Form Part 3
        publicTransports: {
            isOk:                    isPublicTransportsAlternativeOk(), //boolean whether this section was correctly filled in
            numberOfPeopleInFamily:  d.pessoas_agregado.value,
            monthlyPassCost:         d.preco_passe.value
        },
        
        financialEffort: {
            isOk:         isFinancialEffortOk(), //boolean whether this section was correctly filled in
            incomePeriod: getCheckedValue(d.radio_income), //"year", "month", "week" or "hour"
            year: {
                amount: d.income_per_year.value
            },
            month: {
                amountPerMonth: d.income_per_month.value,
                monthsPerYear:  d.income_months_per_year.value
            },
            week: {
                amountPerWeek: d.income_per_week.value,
                weeksPerYear:  d.income_weeks_per_year.value
            },
            hour: {
                amountPerHour: d.income_per_hour.value,
                hoursPerWeek:  d.income_hours_per_week.value,
                weeksPerYear:  d.income_hour_weeks_per_year.value
            }            
        },
   
        workingTime: {
            isActivated:   getCheckedValue(d.radio_work_time),
            monthsPerYear: d.time_month_per_year.value,
            hoursPerWeek:  d.time_hours_per_week.value
        },
        
        distance: {
            considerCarToJob: getCheckedValue(d.drive_to_work), //binary variable: "true" or "false"
            carToJob: {
                daysPerWeek:               d.drive_to_work_days_per_week.value,
                distanceBetweenHomeAndJob: d.dist_home_job.value,
                distanceDuringWeekends:    d.journey_weekend.value,
            },
            noCarToJob: {
                distancePerPeriod: d.km_per_month.value,
                period:            d.period_km.value,
            }
        },
      
        timeSpentInDriving: {
            option1: {
                minutesBetweenHomeAndJob: d.time_home_job.value,
                minutesDuringWeekend:     d.time_weekend.value
            },
            option2: {
                minutesPerDay: d.min_drive_per_day.value,
                daysPerMonth:  d.days_drive_per_month.value
            }
        }     
    };

    return data;
}

/*
//get from database
function getDatabasePart1(datab){
    
    var data = {
        //depreciation
        acquisitionMonth:      datab.acquisition_month,
        acquisitionYear:       datab.acquisition_year,
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


function getDatabasePart2(datab){

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

function getDatabasePart3(datab){
    
    var data = {
        //public transports section
        IsAlternativeToCarCosts:     undefined,
        n_pess_familia:              datab.household_number_people,
        monthly_pass_cost:           datab.public_transportation_month_expense,

        //financial effort section
        IsFinancialEffort:           undefined,
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

    data.IsAlternativeToCarCosts = isThereinDbAlternativeToCarCostsData(data);
    data.IsFinancialEffort       = isThereinDbFinEffortData(data);

    return data;
}*/

//Gets information from DB whether DB has or not Public Transport data
function isThereinDbAlternativeToCarCostsData(f3){
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
    
    console.error("income_type is wrong: " + f3.income_type);
    return false;
}