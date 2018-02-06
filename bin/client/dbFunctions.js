function submit_data(){var e=createObjToDB();(e=sanityChecks(e)).time_to_fill_form=TimeCounter.getCurrentTimeInSeconds(),e.client_uuid=uuid,e.country=COUNTRY,submitDataToDB(e)}function createObjToDB(){var e={};return e.acquisition_month=$("#acquisitionMonth").val(),e.acquisition_year=$("#acquisitionYear").val(),e.commercial_value_at_acquisition=$("#commercialValueAtAcquisition").val(),e.commercial_value_at_now=$("#commercialValueAtNow").val(),e.insure_type=$('input[name="insurancePaymentPeriod"]:checked',"#main_form").val(),e.insurance_value=$("#insuranceValue").val(),e.credit=$('input[name="AutoCreditRadioBtn"]:checked',"#main_form").val(),e.credit_borrowed_amount=$("#borrowedAmount").val(),e.credit_number_installments=$("#numberInstallments").val(),e.credit_amount_installment=$("#amountInstallment").val(),e.credit_residual_value=$("#residualValue").val(),e.inspection_number_inspections=$("#numberInspections").val(),e.inspection_average_inspection_cost=$("#averageInspectionCost").val(),e.vehicle_excise_tax=$("#roadTaxes").val(),e.fuel_calculation=$('input[name="calc_combustiveis"]:checked',"#main_form").val(),e.fuel_currency_based_currency_value=$("#fuel_currency_value").val(),e.fuel_currency_based_periodicity=$("#combustiveis_periodo_euro").val(),e.fuel_distance_based_car_to_work=$('input[name="car_job_form2"]:checked',"#main_form").val(),e.fuel_distance_based_car_to_work_number_days_week=$("#car_to_work_number_days_week").val(),e.fuel_distance_based_car_to_work_distance_home_work=$("#car_to_work_distance_home_work").val(),e.fuel_distance_based_car_to_work_distance_weekend=$("#car_to_work_distance_weekend").val(),e.fuel_distance_based_no_car_to_work_distance=$("#no_car_to_work_distance").val(),e.fuel_distance_based_no_car_to_fuel_period_distance=$("#combustivel_period_km").val(),e.fuel_distance_based_fuel_efficiency=$("#fuel_efficiency").val(),e.fuel_distance_based_fuel_price=$("#fuel_price").val(),e.maintenance=$("#maintenance").val(),e.repairs=$("#repairs").val(),e.parking=$("#parking").val(),e.tolls_daily=$('input[name="tolls_daily_radioBtn"]:checked',"#main_form").val(),e.tolls_no_daily_value=$("#no_daily_tolls_value").val(),e.tolls_no_daily_period=$("#tolls_period_select").val(),e.tolls_daily_expense=$("#daily_expense_tolls").val(),e.tolls_daily_number_days=$("#number_days_tolls").val(),e.tickets_value=$("#tickets_value").val(),e.tickets_periodicity=$("#tickets_period_select").val(),e.washing_value=$("#washing_value").val(),e.washing_periodicity=$("#washing_period_select").val(),e.form_part3_slide1=$("#slider1").prop("checked"),e.form_part3_slide2=$("#slider2").prop("checked"),e.household_number_people=$("#household_number_people").val(),e.public_transportation_month_expense=$("#public_transportation_month_expense").val(),e.income_type=$('input[name="radio_income"]:checked',"#main_form").val(),e.income_per_year=$("#income_per_year").val(),e.income_per_month=$("#income_per_month").val(),e.income_months_per_year=$("#income_months_per_year").val(),e.income_per_week=$("#income_per_week").val(),e.income_weeks_per_year=$("#income_weeks_per_year").val(),e.income_per_hour=$("#income_per_hour").val(),e.income_hours_per_week=$("#income_hours_per_week").val(),e.income_hour_weeks_per_year=$("#income_hour_weeks_per_year").val(),e.work_time=$('input[name="radio_work_time"]:checked',"#main_form").val(),e.work_time_month_per_year=$("#time_month_per_year").val(),e.work_time_hours_per_week=$("#time_hours_per_week").val(),e.distance_drive_to_work=$('input[name="drive_to_work"]:checked',"#main_form").val(),e.distance_days_per_week=$("#drive_to_work_days_per_week").val(),e.distance_home_job=$("#dist_home_job").val(),e.distance_journey_weekend=$("#journey_weekend").val(),e.distance_per_month=$("#dist_per_month").val(),e.distance_period=$("#period_km").val(),e.time_spent_home_job=$("#time_home_job").val(),e.time_spent_weekend=$("#time_weekend").val(),e.time_spent_min_drive_per_day=$("#min_drive_per_day").val(),e.time_spent_days_drive_per_month=$("#days_drive_per_month").val(),e}function submitDataToDB(e){$.ajax({url:"submitUserInput",type:"POST",data:{objectToDb:e},success:function(_){console.log("Values inserted into DB for statistical analysis. Returned: ",_),console.log("User took "+e.time_to_fill_form+" seconds to fill the form")},error:function(){console.error("There was an error submitting the values for statistical analysis")}})}function sanityChecks(e){return"false"===e.credit&&(e.credit_borrowed_amount=null,e.credit_number_installments=null,e.credit_amount_installment=null,e.credit_residual_value=null),"euros"===e.fuel_calculation?(e.fuel_distance_based_fuel_efficiency=null,e.fuel_distance_based_fuel_price=null,e.fuel_distance_based_car_to_work=null,e.fuel_distance_based_car_to_work_number_days_week=null,e.fuel_distance_based_car_to_work_distance_home_work=null,e.fuel_distance_based_car_to_work_distance_weekend=null,e.fuel_distance_based_no_car_to_work_distance=null,e.fuel_distance_based_no_car_to_fuel_period_distance=null):(e.fuel_currency_based_currency_value=null,e.fuel_currency_based_periodicity=null,"true"===e.fuel_distance_based_car_to_work?(e.fuel_distance_based_no_car_to_work_distance=null,e.fuel_distance_based_no_car_to_fuel_period_distance=null):(e.fuel_distance_based_car_to_work_number_days_week=null,e.fuel_distance_based_car_to_work_distance_home_work=null,e.fuel_distance_based_car_to_work_distance_weekend=null)),"true"===e.tolls_daily?(e.tolls_no_daily_value=null,e.tolls_no_daily_period=null):(e.tolls_daily_expense=null,e.tolls_daily_number_days=null),e}function submitDataToForm(e){$("#acquisitionMonth").val(e.acquisition_month),$("#acquisitionYear").val(e.acquisition_year),$("#commercialValueAtAcquisition").val(e.commercial_value_at_acquisition),$("#commercialValueAtNow").val(e.commercial_value_at_now),setRadioButton("insurancePaymentPeriod",e.insure_type),$("#insuranceValue").val(e.insurance_value),setRadioButton("AutoCreditRadioBtn",e.credit),$("#borrowedAmount").val(e.credit_borrowed_amount),$("#numberInstallments").val(e.credit_number_installments),$("#amountInstallment").val(e.credit_amount_installment),$("#residualValue").val(e.credit_residual_value),$("#numberInspections").val(e.inspection_number_inspections),nbrInspectOnChanged(),$("#averageInspectionCost").val(e.inspection_average_inspection_cost),$("#roadTaxes").val(e.vehicle_excise_tax),setRadioButton("calc_combustiveis",e.fuel_calculation),$("#fuel_currency_value").val(e.fuel_currency_based_currency_value),$("#combustiveis_periodo_euro").val(e.fuel_currency_based_periodicity),setRadioButton("car_job_form2",e.fuel_distance_based_car_to_work),$("#car_to_work_number_days_week").val(e.fuel_distance_based_car_to_work_number_days_week),$("#car_to_work_distance_home_work").val(e.fuel_distance_based_car_to_work_distance_home_work),$("#car_to_work_distance_weekend").val(e.fuel_distance_based_car_to_work_distance_weekend),$("#no_car_to_work_distance").val(e.fuel_distance_based_no_car_to_work_distance),$("#combustivel_period_km").val(e.fuel_distance_based_no_car_to_fuel_period_distance),$("#fuel_efficiency").val(e.fuel_distance_based_fuel_efficiency),$("#fuel_price").val(e.fuel_distance_based_fuel_price),$("#maintenance").val(e.maintenance),$("#repairs").val(e.repairs),$("#parking").val(e.parking),setRadioButton("tolls_daily_radioBtn",e.tolls_daily),$("#no_daily_tolls_value").val(e.tolls_no_daily_value),$("#tolls_period_select").val(e.tolls_no_daily_period),$("#daily_expense_tolls").val(e.tolls_daily_expense),$("#number_days_tolls").val(e.tolls_daily_number_days),$("#tickets_value").val(e.tickets_value),$("#tickets_period_select").val(e.tickets_periodicity),$("#washing_value").val(e.washing_value),$("#washing_period_select").val(e.washing_periodicity),$("#slider1").prop("checked",e.form_part3_slide1),$("#slider2").prop("checked",e.form_part3_slide2),slider_toggles_form3(),$("#household_number_people").val(e.household_number_people),$("#public_transportation_month_expense").val(e.public_transportation_month_expense),setRadioButton("radio_income",e.income_type),$("#income_per_year").val(e.income_per_year),$("#income_per_month").val(e.income_per_month),$("#income_months_per_year").val(e.income_months_per_year),$("#income_per_week").val(e.income_per_week),$("#income_weeks_per_year").val(e.income_weeks_per_year),$("#income_per_hour").val(e.income_per_hour),$("#income_hours_per_week").val(e.income_hours_per_week),$("#income_hour_weeks_per_year").val(e.income_hour_weeks_per_year),setRadioButton("radio_work_time",e.work_time),$("#time_month_per_year").val(e.work_time_month_per_year),$("#time_hours_per_week").val(e.work_time_hours_per_week),setRadioButton("drive_to_work",e.distance_drive_to_work),$("#drive_to_work_days_per_week").val(e.distance_days_per_week),$("#dist_home_job").val(e.distance_home_job),$("#journey_weekend").val(e.distance_journey_weekend),$("#dist_per_month").val(e.distance_per_month),$("#period_km").val(e.distance_period),$("#time_home_job").val(e.time_spent_home_job),$("#time_weekend").val(e.time_spent_weekend),$("#min_drive_per_day").val(e.time_spent_min_drive_per_day),$("#days_drive_per_month").val(e.time_spent_days_drive_per_month)}