function is_userdata_formpart1_ok(){var e=document.costs_form,t=e.acquisitionMonth.value,r=e.acquisitionYear.value;if(!isNumber(t)||!isInteger(t)||t>12||t<=0)return $.jAlert({title:WORDS.depreciation,content:WORDS.error_depreciation_month+"!"}),!1;if(!isNumber(e.acquisitionYear.value)||!isInteger(e.acquisitionYear.value)||e.acquisitionYear.value<1910)return $.jAlert({title:WORDS.depreciation,content:WORDS.error_depreciation_year+"!"}),!1;if(!isNumber(e.commercialValueAtAcquisition.value))return $.jAlert({title:WORDS.depreciation,content:WORDS.error_depreciation_value+"!"}),!1;if(!isNumber(e.commercialValueAtNow.value))return $.jAlert({title:WORDS.depreciation,content:WORDS.error_depreciation_value_today+"!"}),!1;var i=new Date,n=new Date(r,t-1);if(!date_diff(n,i))return $.jAlert({title:WORDS.depreciation,content:WORDS.depreciation_date+"!"}),!1;if(""==getCheckedValue(e.insurancePaymentPeriod))return $.jAlert({title:WORDS.insurance,content:WORDS.error_insu_period+"!"}),!1;if(!isNumber(e.insuranceValue.value))return $.jAlert({title:WORDS.insurance,content:WORDS.error_invalid_insu_value+"!"}),!1;var a=getCheckedValue(e.AutoCreditRadioBtn);if(""==a)return $.jAlert({title:WORDS.credit,content:WORDS.error_credit_question+"!"}),!1;if("true"==a){if(!isNumber(e.borrowedAmount.value))return $.jAlert({title:WORDS.credit,content:WORDS.error_credit_loan_value+"!"}),!1;if(!isNumber(e.numberInstallments.value))return $.jAlert({title:WORDS.credit,content:WORDS.error_credit_period+"!"}),!1;if(!isNumber(e.amountInstallment.value))return $.jAlert({title:WORDS.credit,content:WORDS.error_credit_instalment+"!"}),!1;if(!isNumber(e.residualValue.value))return $.jAlert({title:WORDS.credit,content:WORDS.error_credit_residual_value+"!"}),!1}var o=e.numberInspections.value;return isNumber(o)&&isInteger(o)?0==o||isNumber(e.averageInspectionCost.value)?!!isNumber(e.roadTaxes.value)||($.jAlert({title:WORDS.road_taxes,content:WORDS.invalid_amount+"!"}),!1):($.jAlert({title:WORDS.inspection,content:WORDS.error_inspection_costs+"!"}),!1):($.jAlert({title:WORDS.inspection,content:WORDS.error_inspection_ntimes+"!"}),!1)}function is_userdata_formpart2_ok(){var e=document.costs_form,t=getCheckedValue(e.calc_combustiveis);if(""==t)return $.jAlert({title:WORDS.fuel,content:WORDS.error_fuel_curr_dist+"!"}),!1;switch(t){case"km":if(!isNumber(e.consumo_auto.value))return $.jAlert({title:WORDS.fuel,content:WORDS.error_fuel_car_eff+"!"}),!1;if(!isNumber(e.fuel_price.value))return $.jAlert({title:WORDS.fuel,content:WORDS.error_fuel_price+"!"}),!1;if(leva_auto_job=getCheckedValue(e.car_job_form2),""==leva_auto_job)return $.jAlert({title:WORDS.fuel,content:WORDS.error_car_job+"!"}),!1;if("false"==leva_auto_job){if(!isNumber(e.km_por_mes.value))return $.jAlert({title:WORDS.fuel,content:WORDS.error_fuel_dist+"!"}),!1}else{if(!isNumber(e.dias_por_semana.value)||e.dias_por_semana.value>7)return $.jAlert({title:WORDS.fuel,content:WORDS.error_days_per_week+"!"}),!1;if(!isNumber(e.km_entre_casa_trabalho.value))return $.jAlert({title:WORDS.fuel,content:WORDS.error_dist_home_work+"!"}),!1;if(!isNumber(e.km_fds.value))return $.jAlert({title:WORDS.fuel,content:WORDS.error_dist_no_job+"!"}),!1}break;case"euros":if(!isNumber(e.combustiveis_euro.value))return $.jAlert({title:WORDS.fuel,content:WORDS.error_currency+"!"}),!1}if(!isNumber(e.revisoes.value))return $.jAlert({title:WORDS.maintenance,content:WORDS.invalid_amount+"!"}),!1;if(!isNumber(e.reparacoes.value))return $.jAlert({title:WORDS.rep_improv,content:WORDS.invalid_amount+"!"}),!1;if(!isNumber(e.parqueamento.value))return $.jAlert({title:WORDS.parking,content:WORDS.invalid_amount+"!"}),!1;if("false"==getCheckedValue(e.tolls_daily_radioBtn)){if(!isNumber(e.no_daily_tolls_value.value))return $.jAlert({title:WORDS.tolls,content:WORDS.invalid_amount+"!"}),!1}else{if(!isNumber(e.daily_expense_tolls.value))return $.jAlert({title:WORDS.tolls,content:WORDS.tolls_day_calc1+" - "+WORDS.invalid_amount+"!"}),!1;var r=e.number_days_tolls.value;if(!isNumber(r)||!isInteger(r)||r>31)return $.jAlert({title:WORDS.tolls,content:WORDS.days+" - "+WORDS.invalid_amount+"!"}),!1}return isNumber(e.tickets_value.value)?!!isNumber(e.washing_value.value)||($.jAlert({title:WORDS.washing,content:WORDS.invalid_amount+"!"}),!1):($.jAlert({title:WORDS.fines,content:WORDS.invalid_amount+"!"}),!1)}function is_userdata_formpart3_ok(){var e=document.costs_form,t=getCheckedSliderValue(e.slider1);if(t){var r=e.pessoas_agregado.value,i=e.preco_passe.value;if(!isNumber(r)||!isInteger(r)||r<=0)return $.jAlert({title:WORDS.extra_data1,content:WORDS.invalid_nbr_pp+"!"}),!1;if(!isNumber(i)||i<0)return $.jAlert({title:WORDS.extra_data1,content:WORDS.error_pass_amount+"!"}),!1}var n=getCheckedSliderValue(e.slider2);if(n){var a=getCheckedValue(e.radio_income);switch(a){case"year":if(!isNumber(e.income_per_year.value))return $.jAlert({title:WORDS.extra_data_income,content:WORDS.error_income+"!"}),!1;break;case"month":if(!isNumber(e.income_per_month.value))return $.jAlert({title:WORDS.extra_data_income,content:WORDS.error_income+"!"}),!1;if(!isNumber(e.income_months_per_year.value))return $.jAlert({title:WORDS.extra_data_income,content:WORDS.error_months_per_year+"!"}),!1;break;case"week":if(!isNumber(e.income_per_week.value))return $.jAlert({title:WORDS.extra_data_income,content:WORDS.error_income+"!"}),!1;if(!isNumber(e.income_weeks_per_year.value))return $.jAlert({title:WORDS.extra_data_income,content:WORDS.error_weeks_per_year+"!"}),!1}if("true"==getCheckedValue(e.radio_work_time)&&"hour"!=a){if(!isNumber(e.time_hours_per_week.value))return $.jAlert({title:WORDS.extra_data_working_time,content:WORDS.error_hours_per_week+"!"}),!1;if(!isNumber(e.time_month_per_year.value))return $.jAlert({title:WORDS.extra_data_working_time,content:WORDS.error_months_per_year+"!"}),!1}}if(t||n){if("none"!=$("#distance_form3").css("display"))if("true"==getCheckedValue(e.drive_to_work)){if(!isNumber(e.drive_to_work_days_per_week.value)||e.drive_to_work_days_per_week.value>7)return $.jAlert({title:WORDS.distance,content:WORDS.error_days_per_week+"!"}),!1;if(!isNumber(e.dist_home_job.value))return $.jAlert({title:WORDS.distance,content:WORDS.error_dist_home_work+"!"}),!1;if(!isNumber(e.journey_weekend.value))return $.jAlert({title:WORDS.distance,content:WORDS.error_dist_no_job+"!"}),!1}else if(!isNumber(e.km_per_month.value))return $.jAlert({title:WORDS.distance,content:WORDS.error_fuel_dist+"!"}),!1;if(isVisible(".time_spent_part1_form3")){if(!isNumber(e.time_home_job.value))return $.jAlert({title:WORDS.extra_data_time_spent_in_driving,content:WORDS.error_min_drive_home_job+"!"}),!1;if(!isNumber(e.time_weekend.value))return $.jAlert({title:WORDS.extra_data_time_spent_in_driving,content:WORDS.error_min_drive_weekend+"!"}),!1}else{if(!isNumber(e.min_drive_per_day.value))return $.jAlert({title:WORDS.extra_data_time_spent_in_driving,content:WORDS.error_min_drive+"!"}),!1;var o=e.days_drive_per_month.value;if(!isNumber(o)||!isInteger(o)||o>31)return $.jAlert({title:WORDS.extra_data_time_spent_in_driving,content:WORDS.error_days_per_month+"!"}),!1}}return!0}