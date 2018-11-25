//function that is run when the user clicks the Run/Calculate button
//and which submits the inserted data into the Database
function submit_data() {

    var objectToDb = createObjToDB();
    objectToDb = sanityChecks(objectToDb);
    
    //get current time to know how much time the user took to fill the form
    objectToDb.time_to_fill_form = autocosts.userInfo.timeCounter.getCurrentTimeInSeconds();
    
    //get a user unique generated ID
    objectToDb.client_uuid = autocosts.userInfo.uniqueUserId;

    objectToDb.country = autocosts.serverInfo.selectedCountry; //Country is a global variable

    submitDataToDB(objectToDb);

}

function createObjToDB(){

    var objectToDb = {};
    
    var f1 = getFormPart1();
    var f2 = getFormPart2();
    var f3 = getFormPart3();
   /*     
    //form part 1     
    objectToDb.acquisition_month =                  f1.acquisitionMonth;
    objectToDb.acquisition_year =                   f1.acquisitionYear;
    objectToDb.commercial_value_at_acquisition =    f1.auto_initial_cost;
    objectToDb.commercial_value_at_now =            f1.auto_final_cost;
    objectToDb.insure_type =                        f1.insurance_type;
    objectToDb.insurance_value =                    f1.insurance_value;
    objectToDb.credit =                             f1.cred_auto_s_n;
    objectToDb.credit_borrowed_amount =             f1.credit_amount;
    objectToDb.credit_number_installments =         f1.credit_period;
    objectToDb.credit_amount_installment =          f1.credit_value_p_month;
    objectToDb.credit_residual_value =              f1.credit_residual_value;
    objectToDb.inspection_number_inspections =      f1.nmr_times_inspec;
    objectToDb.inspection_average_inspection_cost = f1.inspec_price;
    objectToDb.vehicle_excise_tax =                 f1.roadTaxes;

    
            //fuel
        :         getCheckedValue(d.calc_combustiveis),
        fuel_efficiency:        d.consumo_auto.value,
        fuel_price:             d.fuel_price.value,
        take_car_to_job:        getCheckedValue(d.car_job_form2),
        fuel_period_distance:   d.combustivel_period_km.value,
        distance:               d.km_por_mes.value,
        car_consumption:        d.consumo_auto.value,
        :      d.km_entre_casa_trabalho.value,
        :       d.km_fds.value,
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
        type_calc_tolls:        getCheckedValue(d.tolls_daily_radioBtn),
        tolls_select:           d.tolls_period_select.value,
        tolls:                  d.no_daily_tolls_value.value,
        price_tolls_p_day:      d.daily_expense_tolls.value,
        tolls_days_p_month:     d.number_days_tolls.value,
        //fines
        fines:                  d.tickets_value.value,
        fines_select:           d.tickets_period_select.value,
        //washing
        washing:                d.washing_value.value,
        washing_select:         d.washing_period_select.value
    
    //form part 2
    objectToDb.fuel_calculation =                                   f2.type_calc_fuel
    objectToDb.fuel_currency_based_currency_value =                 f2.
    objectToDb.fuel_currency_based_periodicity =                    f2.
    objectToDb.fuel_distance_based_car_to_work =                    f2.
    objectToDb.fuel_distance_based_car_to_work_number_days_week =   f2.
    objectToDb.fuel_distance_based_car_to_work_distance_home_work = f2.distance_home2job
    objectToDb.fuel_distance_based_car_to_work_distance_weekend =   f2.distance_weekend
    objectToDb.fuel_distance_based_no_car_to_work_distance =        f2.
    objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = f2.
    objectToDb.fuel_distance_based_fuel_efficiency =                f2.
    objectToDb.fuel_distance_based_fuel_price =                     f2.
    objectToDb.maintenance =                                        f2.
    objectToDb.repairs =                                            f2.
    objectToDb.parking =                                            f2.
    objectToDb.tolls_daily =                                        f2.
    objectToDb.tolls_no_daily_value =                               f2.
    objectToDb.tolls_no_daily_period =                              f2.
    objectToDb.tolls_daily_expense =                                f2.
    objectToDb.tolls_daily_number_days =                            f2.
    objectToDb.tickets_value =                                      f2.
    objectToDb.tickets_periodicity =                                f2.
    objectToDb.washing_value =                                      f2.
    objectToDb.washing_periodicity =                                f2.

    //form part 3    
    objectToDb.household_number_people = $('#household_number_people').val();
    objectToDb.public_transportation_month_expense = $('#public_transportation_month_expense').val();
    objectToDb.income_type = $('input[name="radio_income"]:checked', '#form').val();
    objectToDb.income_per_year = $('#income_per_year').val();
    objectToDb.income_per_month = $('#income_per_month').val();
    objectToDb.income_months_per_year = $('#income_months_per_year').val();
    objectToDb.income_per_week = $('#income_per_week').val();
    objectToDb.income_weeks_per_year = $('#income_weeks_per_year').val();
    objectToDb.income_per_hour = $('#income_per_hour').val();
    objectToDb.income_hours_per_week = $('#income_hours_per_week').val();
    objectToDb.income_hour_weeks_per_year = $('#income_hour_weeks_per_year').val();
    objectToDb.work_time = $('input[name="radio_work_time"]:checked', '#form').val();
    objectToDb.work_time_month_per_year = $('#time_month_per_year').val();
    objectToDb.work_time_hours_per_week = $('#time_hours_per_week').val();
    objectToDb.distance_drive_to_work = $('input[name="drive_to_work"]:checked', '#form').val();
    objectToDb.distance_days_per_week = $('#drive_to_work_days_per_week').val();
    objectToDb.distance_home_job = $('#dist_home_job').val();
    objectToDb.distance_journey_weekend = $('#journey_weekend').val();
    objectToDb.distance_per_month = $('#dist_per_month').val();
    objectToDb.distance_period = $('#period_km').val();
    objectToDb.time_spent_home_job = $('#time_home_job').val();
    objectToDb.time_spent_weekend = $('#time_weekend').val();
    objectToDb.time_spent_min_drive_per_day = $('#min_drive_per_day').val();
    objectToDb.time_spent_days_drive_per_month = $('#days_drive_per_month').val();

    return objectToDb;*/

}

function submitDataToDB(objectToDb){

    $.ajax({
        url: 'submitUserInput',
        type: 'POST',
        data: {
            objectToDb: objectToDb
        },
        success: function(data) {
            console.log("Values inserted into DB for statistical analysis. Returned: ", data);
            console.log("User took" + " " + objectToDb.time_to_fill_form + " " + "seconds to fill the form");
        },
        error: function () {
            console.error("There was an error submitting the values for statistical analysis");
        }
    });

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

//with a certain form data in a readObj as input, submits such data to the form inputs
//i.e. pre-fill the form with the values of readObj
function submitDataToForm(readObj){

    //form part 1
    //depreciation
    $("#acquisitionMonth").val(readObj.acquisition_month);
    $("#acquisitionYear").val(readObj.acquisition_year);
    $('#commercialValueAtAcquisition').val(readObj.commercial_value_at_acquisition);
    $('#commercialValueAtNow').val(readObj.commercial_value_at_now);
    //insurance
    setRadioButton("insurancePaymentPeriod", readObj.insure_type);
    $('#insuranceValue').val(readObj.insurance_value);
    //credit
    setRadioButton("AutoCreditRadioBtn", readObj.credit);
    $('#borrowedAmount').val(readObj.credit_borrowed_amount);
    $('#numberInstallments').val(readObj.credit_number_installments);
    $('#amountInstallment').val(readObj.credit_amount_installment);
    $('#residualValue').val(readObj.credit_residual_value);
    //inspection
    $('#numberInspections').val(readObj.inspection_number_inspections);
    nbrInspectOnChanged();
    $('#averageInspectionCost').val(readObj.inspection_average_inspection_cost);
    //road tax
    $('#roadTaxes').val(readObj.vehicle_excise_tax);

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


    //function used to get from forms the selected option in radio buttons
    function getCheckedValue(radioObj) {
        var i;

        if (!radioObj) {
            return "";
        }

        var radioLength = radioObj.length;
        if (radioLength === undefined) {
            if (radioObj.checked) {
                return radioObj.value;
            }
            return "";
        }

        for (i = 0; i < radioLength; i++) {
            if (radioObj[i].checked) {
                return radioObj[i].value;
            }
        }
        return "";
    }