//function that is run when the user clicks the Run/Calculate button 
//and which submits the inserted data into the Database 
function submit_data(country) {

    var objectToDb = createObjToDB();
    objectToDb = sanityChecks(objectToDb);
    
    objectToDb.time_to_fill_form = TimeCounter.getCurrentTimeInSeconds();
    objectToDb.client_uuid = uuid;
    
    objectToDb.country = Country; //Country is a global variable
    
    submitDataToDB(objectToDb);

}

function createObjToDB(){
    
    var objectToDb = {};

    //form part 1
    objectToDb.acquisition_month = $("#acquisitionMonth").val();
    objectToDb.acquisition_year = $("#acquisitionYear").val();
    objectToDb.commercial_value_at_acquisition = $('#commercialValueAtAcquisition').val();
    objectToDb.commercial_value_at_now = $('#commercialValueAtNow').val();
    objectToDb.insure_type = $('input[name="tipo_seguro"]:checked', '#main_form').val();
    objectToDb.insurance_value = $('#insuranceValue').val();
    objectToDb.credit = $('input[name="cred_auto"]:checked', '#main_form').val();
    objectToDb.credit_borrowed_amount = $('#borrowedAmount').val();
    objectToDb.credit_number_installments = $('#numberInstallments').val();
    objectToDb.credit_amount_installment = $('#amountInstallment').val();
    objectToDb.credit_residual_value = $('#residualValue').val();
    objectToDb.inspection_number_inspections = $('#numberInspections').val();
    objectToDb.inspection_average_inspection_cost = $('#averageInspectionCost').val();
    objectToDb.vehicle_excise_tax = $('#vehicleExciseTax').val();
    
    //form part 2
    objectToDb.fuel_calculation = $('input[name="calc_combustiveis"]:checked', '#main_form').val();
    objectToDb.fuel_currency_based_currency_value = $('#fuel_currency_value').val();
    objectToDb.fuel_currency_based_periodicity = $('#combustiveis_periodo_euro').val();
    objectToDb.fuel_distance_based_car_to_work = $('input[name="car_job_form2"]:checked', '#main_form').val();
    objectToDb.fuel_distance_based_car_to_work_number_days_week = $('#car_to_work_number_days_week').val();
    objectToDb.fuel_distance_based_car_to_work_distance_home_work = $('#car_to_work_distance_home_work').val();
    objectToDb.fuel_distance_based_car_to_work_distance_weekend = $('#car_to_work_distance_weekend').val();
    objectToDb.fuel_distance_based_no_car_to_work_distance = $('#no_car_to_work_distance').val();
    objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = $('#combustivel_period_km').val();
    objectToDb.fuel_distance_based_fuel_efficiency = $('#fuel_efficiency').val();
    objectToDb.fuel_distance_based_fuel_price = $('#fuel_price').val();
    objectToDb.maintenance = $('#maintenance').val();
    objectToDb.repairs = $('#repairs').val();
    objectToDb.parking = $('#parking').val();
    objectToDb.tolls_daily = $('input[name="tolls_daily_radioBtn"]:checked', '#main_form').val();
    objectToDb.tolls_no_daily_value = $('#no_daily_tolls_value').val();
    objectToDb.tolls_no_daily_period = $('#tolls_period_select').val();
    objectToDb.tolls_daily_expense = $('#daily_expense_tolls').val();
    objectToDb.tolls_daily_number_days = $('#number_days_tolls').val();
    objectToDb.tickets_value = $('#tickets_value').val();
    objectToDb.tickets_periodicity = $('#tickets_period_select').val();
    objectToDb.washing_value = $('#washing_value').val();
    objectToDb.washing_periodicity = $('#washing_period_select').val();
    
    //form part 3
    objectToDb.form_part3_slide1 = $('#slider1').prop('checked');
    objectToDb.form_part3_slide2 = $('#slider2').prop('checked');
    objectToDb.household_number_people = $('#household_number_people').val();
    objectToDb.public_transportation_month_expense = $('#public_transportation_month_expense').val();   
    objectToDb.income_type = $('input[name="radio_income"]:checked', '#main_form').val();
    objectToDb.income_per_year = $('#income_per_year').val();
    objectToDb.income_per_month = $('#income_per_month').val();
    objectToDb.income_months_per_year = $('#income_months_per_year').val();
    objectToDb.income_per_week = $('#income_per_week').val();
    objectToDb.income_weeks_per_year = $('#income_weeks_per_year').val();
    objectToDb.income_per_hour = $('#income_per_hour').val();
    objectToDb.income_hours_per_week = $('#income_hours_per_week').val();
    objectToDb.income_hour_weeks_per_year = $('#income_hour_weeks_per_year').val();
    objectToDb.work_time = $('input[name="radio_work_time"]:checked', '#main_form').val();
    objectToDb.work_time_month_per_year = $('#time_month_per_year').val();
    objectToDb.work_time_hours_per_week = $('#time_hours_per_week').val();
    objectToDb.distance_drive_to_work = $('input[name="drive_to_work"]:checked', '#main_form').val();
    objectToDb.distance_days_per_week = $('#drive_to_work_days_per_week').val();
    objectToDb.distance_home_job = $('#dist_home_job').val();
    objectToDb.distance_journey_weekend = $('#journey_weekend').val();
    objectToDb.distance_per_month = $('#dist_per_month').val();
    objectToDb.distance_period = $('#period_km').val();
    objectToDb.time_spent_home_job = $('#time_home_job').val();
    objectToDb.time_spent_weekend = $('#time_weekend').val();
    objectToDb.time_spent_min_drive_per_day = $('#min_drive_per_day').val();
    objectToDb.time_spent_days_drive_per_month = $('#days_drive_per_month').val();
    
    return objectToDb;

}

//function that is run by the previous submit_data function
function sanityChecks(objectToDb) {
    
    if (objectToDb.credit === 'false') {
        objectToDb.credit_borrowed_amount = null;
        objectToDb.credit_number_installments = null;
        objectToDb.credit_amount_installment = null;
        objectToDb.credit_residual_value = null;
    }

    if (objectToDb.fuel_calculation === 'euros') {
        objectToDb.fuel_distance_based_fuel_efficiency = null;
        objectToDb.fuel_distance_based_fuel_price = null;
        objectToDb.fuel_distance_based_car_to_work = null;
        objectToDb.fuel_distance_based_car_to_work_number_days_week = null;
        objectToDb.fuel_distance_based_car_to_work_distance_home_work = null;
        objectToDb.fuel_distance_based_car_to_work_distance_weekend = null;
        objectToDb.fuel_distance_based_no_car_to_work_distance = null;
        objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = null;
    } else {
        objectToDb.fuel_currency_based_currency_value = null;
        objectToDb.fuel_currency_based_periodicity = null;
        if (objectToDb.fuel_distance_based_car_to_work === 'true') {
            objectToDb.fuel_distance_based_no_car_to_work_distance = null;
            objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = null;
        } else {
            objectToDb.fuel_distance_based_car_to_work_number_days_week = null;
            objectToDb.fuel_distance_based_car_to_work_distance_home_work = null;
            objectToDb.fuel_distance_based_car_to_work_distance_weekend = null;
        }
    }

    if (objectToDb.tolls_daily === 'true') {
        objectToDb.tolls_no_daily_value = null;
        objectToDb.tolls_no_daily_period = null;
    } else {
        objectToDb.tolls_daily_expense = null;
        objectToDb.tolls_daily_number_days = null;
    }
    
    return objectToDb;
}

function submitDataToDB(objectToDb){

    $.ajax({
        url: 'db_stats/SubmitUserInput.php',
        type: 'POST',
        data: {
            objectToDb: objectToDb
        },
        success: function(data) {},
        error: function () {        
            console.log("There was an error submitting the values for statistical analysis");
        }
    });

}

//with a certain form data in a readObj, submits such data to the form inputs
//i.e. pre-fill the form with the values of readObj
function submitDataToForm(readObj){
    
    //form part 1
    //depreciation
    $("#acquisitionMonth").val(readObj.acquisition_month);
    $("#acquisitionYear").val(readObj.acquisition_year);
    $('#commercialValueAtAcquisition').val(readObj.commercial_value_at_acquisition);
    $('#commercialValueAtNow').val(readObj.commercial_value_at_now);
    //insurance
    setRadioButton("tipo_seguro", readObj.insure_type);
    $('#insuranceValue').val(readObj.insurance_value);
    //credit
    setRadioButton("cred_auto", readObj.credit);
    $('#borrowedAmount').val(readObj.credit_borrowed_amount);
    $('#numberInstallments').val(readObj.credit_number_installments);
    $('#amountInstallment').val(readObj.credit_amount_installment);
    $('#residualValue').val(readObj.credit_residual_value);
    //inspection
    $('#numberInspections').val(readObj.inspection_number_inspections);
    nbrInspectOnChanged();
    $('#averageInspectionCost').val(readObj.inspection_average_inspection_cost);
    //road tax
    $('#vehicleExciseTax').val(readObj.vehicle_excise_tax);
    
    //form part 2
    //fuel
    setRadioButton("calc_combustiveis", readObj.fuel_calculation);
    $('#fuel_currency_value').val(readObj.fuel_currency_based_currency_value);
    $('#combustiveis_periodo_euro').val(readObj.fuel_currency_based_periodicity);
    setRadioButton("car_job_form2", readObj.fuel_distance_based_car_to_work);
    $('#car_to_work_number_days_week').val(readObj.fuel_distance_based_car_to_work_number_days_week);
    $('#car_to_work_distance_home_work').val(readObj.fuel_distance_based_car_to_work_distance_home_work);
    $('#car_to_work_distance_weekend').val(readObj.fuel_distance_based_car_to_work_distance_weekend);
    $('#no_car_to_work_distance').val(readObj.fuel_distance_based_no_car_to_work_distance);
    $('#combustivel_period_km').val(readObj.fuel_distance_based_no_car_to_fuel_period_distance);
    $('#fuel_efficiency').val(readObj.fuel_distance_based_fuel_efficiency);
    $('#fuel_price').val(readObj.fuel_distance_based_fuel_price);
    //maintenance
    $('#maintenance').val(readObj.maintenance);
    //repairs
    $('#repairs').val(readObj.repairs);
    //parking
    $('#parking').val(readObj.parking);
    //tolls
    setRadioButton("tolls_daily_radioBtn", readObj.tolls_daily);
    $('#no_daily_tolls_value').val(readObj.tolls_no_daily_value);
    $('#tolls_period_select').val(readObj.tolls_no_daily_period);
    $('#daily_expense_tolls').val(readObj.tolls_daily_expense);
    $('#number_days_tolls').val(readObj.tolls_daily_number_days);
    //tickets
    $('#tickets_value').val(readObj.tickets_value);
    $('#tickets_period_select').val(readObj.tickets_periodicity);
    //washing
    $('#washing_value').val(readObj.washing_value);    
    $('#washing_period_select').val(readObj.washing_periodicity);
    
    //form part 3
    //sliders
    $('#slider1').prop('checked', readObj.form_part3_slide1);
    $('#slider2').prop('checked', readObj.form_part3_slide2);
    slider_toggles_form3(); //updates the form according to the slider on/off status
    //public transport pass
    $('#household_number_people').val(readObj.household_number_people);
    $('#public_transportation_month_expense').val(readObj.public_transportation_month_expense);   
    //income
    setRadioButton("radio_income", readObj.income_type);    
    $('#income_per_year').val(readObj.income_per_year);
    $('#income_per_month').val(readObj.income_per_month);
    $('#income_months_per_year').val(readObj.income_months_per_year);
    $('#income_per_week').val(readObj.income_per_week);
    $('#income_weeks_per_year').val(readObj.income_weeks_per_year);
    $('#income_per_hour').val(readObj.income_per_hour);
    $('#income_hours_per_week').val(readObj.income_hours_per_week);
    $('#income_hour_weeks_per_year').val(readObj.income_hour_weeks_per_year);
    //working time
    setRadioButton("radio_work_time", readObj.work_time);    
    $('#time_month_per_year').val(readObj.work_time_month_per_year);
    $('#time_hours_per_week').val(readObj.work_time_hours_per_week);
    //distance (from home to work)
    setRadioButton("drive_to_work", readObj.distance_drive_to_work);    
    $('#drive_to_work_days_per_week').val(readObj.distance_days_per_week);
    $('#dist_home_job').val(readObj.distance_home_job);
    $('#journey_weekend').val(readObj.distance_journey_weekend);
    $('#dist_per_month').val(readObj.distance_per_month);
    $('#period_km').val(readObj.distance_period);
    //time spent in driving
    $('#time_home_job').val(readObj.time_spent_home_job);
    $('#time_weekend').val(readObj.time_spent_weekend);
    $('#min_drive_per_day').val(readObj.time_spent_min_drive_per_day);
    $('#days_drive_per_month').val(readObj.time_spent_days_drive_per_month);    
    
}
