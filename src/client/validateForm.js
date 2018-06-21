/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
/*File with Javascript functions that check weather the form parts are correctly inserted */

/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/

function isDepreciationOk(){

    var f = document.costs_form; /*form*/
    var minCarYear = 1910; /*the year of the first produced car*/

    /*depreciation*/
    var acquisitionMonth = f.acquisitionMonth.value; /*car acquisition month*/
    var acquisitionYear  = f.acquisitionYear.value; /*car acquisition year*/

    if(!isNumber(acquisitionMonth) || !isInteger(acquisitionMonth) || 
       acquisitionMonth > 12 || acquisitionMonth <= 0){
        return false;
    }
    if(!isNumber(f.acquisitionYear.value) || !isInteger(f.acquisitionYear.value) || 
       f.acquisitionYear.value < minCarYear){
        return false;
    }
    if(!isNumber(f.commercialValueAtAcquisition.value)){
        return false;
    }
    if(!isNumber(f.commercialValueAtNow.value)){
        return false;
    }

    var today  = new Date();
    var carAcquisitionDate = new Date(acquisitionYear, acquisitionMonth - 1);

    var carNumberOfMonths = date_diff(carAcquisitionDate, today);

    if(!carNumberOfMonths){
        return false;
    }
    
    return true;   
}

function isInsuranceOk(){

    var f = document.costs_form; /*form*/

    /*insurance*/
    var insurancePaymentPeriod = getCheckedValue(f.insurancePaymentPeriod);

    if(insurancePaymentPeriod == ""){
        return false;
    }

    if(!isNumber(f.insuranceValue.value)){
        return false;
    }
    
    return true;
}

function isCarFinanceOk(){

    var f = document.costs_form; /*form*/    
    
    /*car finance*/
    var AutoCreditRadioBtn=getCheckedValue(f.AutoCreditRadioBtn);

    if(AutoCreditRadioBtn == ""){
        return false;
    }

    if(AutoCreditRadioBtn == "true") {
        if(!isNumber(f.borrowedAmount.value)) {
            return false;
        }
        if(!isNumber(f.numberInstallments.value)) {
            return false;
        }
        if(!isNumber(f.amountInstallment.value)) {
            return false;
        }
        if(!isNumber(f.residualValue.value)) {
            return false;
        }
    }

    return true;
}

function isInspectionOk(){

    var f = document.costs_form; /*form*/  
    
    /*inspection*/
    var numberInspections = f.numberInspections.value;

    if(!isNumber(numberInspections) || !isInteger(numberInspections)) {
        return false;
    }

    if(numberInspections!=0 && !isNumber(f.averageInspectionCost.value)) {
        return false;
    }
    
    return true;
}

function isTaxesOk(){

    var f = document.costs_form; /*form*/  
    
    /*taxes*/
    if(!isNumber(f.roadTaxes.value)) {
        return false;
    }

    return true;
}



/* *** CHECK FORM PART 2 ***** */
/*check if data from form 2 (running costs) is correctly filled*/

function isFuelOk(){

    var f = document.costs_form; /*form*/

    /*fuel*/
    var tipo_calc_combustiveis=getCheckedValue(f.calc_combustiveis);

    if(tipo_calc_combustiveis == ""){
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            return false;
        }
        break;
    }
    
    return true;
}

function isMaintenanceOk(){

    var f = document.costs_form; /*form*/
    
    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        return false;
    }
    
    return true;
}
    
function isRepairsOk(){

    var f = document.costs_form; /*form*/    

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        return false;
    }
    
    return true;
}

function isParkingOk(){

    var f = document.costs_form; /*form*/    
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        return false;
    }
    
    return true;   
}

function isTollsOk(){

    var f = document.costs_form; /*form*/ 
    
    /* **** tolls ***** */
    var tolls_calc_method=getCheckedValue(f.tolls_daily_radioBtn);

    /*if tolls costs are calculated on a daily basis*/
    if(tolls_calc_method == "false") {/*no daily basis*/
        if(!isNumber(f.no_daily_tolls_value.value)) {
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.daily_expense_tolls.value)) {
            return false;
        }
        var toll_days_pmonth=f.number_days_tolls.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            return false;
        }

    }
    
    return true;
}

function isFinesOk(){

    var f = document.costs_form; /*form*/    
    /*fines*/
    if(!isNumber(f.tickets_value.value)){
        return false;
    }
    
    return true;
}

function isWashingOk(){

    var f = document.costs_form; /*form*/
    
    /*washing*/
    if(!isNumber(f.washing_value.value)){
        return false;
    }

    return true;
}


/* *** CHECK FORM PART 3 ***** */
    
function isPublicTransportOk(){

    var f = document.costs_form; /*form*/
    
    var n_pess_familia = f.pessoas_agregado.value;
    var pmpmpc = f.preco_passe.value;

    if(!isNumber(n_pess_familia) || !isInteger(n_pess_familia) || n_pess_familia<=0){
        return false;
    }

    if(!isNumber(pmpmpc) || pmpmpc<0){
        return false;
    }
    
    return true;
}

function isIncomeOk(){

    var f = document.costs_form; /*form*/
    
    /*income*/
    var income_type = getCheckedValue(f.radio_income);
    switch(income_type){
    case 'year':
        if(!isNumber(f.income_per_year.value)){
            return false;
        }
        break;
    case 'month':
        if(!isNumber(f.income_per_month.value)){
            return false;
        }
        if(!isNumber(f.income_months_per_year.value)){
            return false;
        }
        break;
    case 'week':
        if(!isNumber(f.income_per_week.value)){
            return false;
        }
        if(!isNumber(f.income_weeks_per_year.value)){
            return false;
        }
        break;
    }
    
    return true;
}

function isWorkingTimeOk(){

    var f = document.costs_form; /*form*/    
    
    /*working time*/
    var is_working_time = getCheckedValue(f.radio_work_time);
    if(is_working_time == 'true' && income_type!='hour'){
        if(!isNumber(f.time_hours_per_week.value)){
            return false;
        }
        if(!isNumber(f.time_month_per_year.value)){
            return false;
        }
    }
    
    return true;
}

function isDistanceOk(){

    var f = document.costs_form; /*form*/      
    
    /*distance*/
    if($('#distance_form3').css('display')!='none'){
        var drive_to_work = getCheckedValue(f.drive_to_work);
        if(drive_to_work == 'true'){
            if(!isNumber(f.drive_to_work_days_per_week.value) || f.drive_to_work_days_per_week.value > 7){
                return false;
            }
            if(!isNumber(f.dist_home_job.value)){
                return false;
            }
            if(!isNumber(f.journey_weekend.value)){
                return false;
            }
        }
        else{
            if(!isNumber(f.km_per_month.value)){
                return false;
            }
        }
    }
    
    return true;
}

function isTimeSpentInDrivingOk(){

    var f = document.costs_form; /*form*/       
    
    /*time spent in driving*/
    if (isVisible('.time_spent_part1_form3')){
        if(!isNumber(f.time_home_job.value)){
            return false;
        }
        if(!isNumber(f.time_weekend.value)){
            return false;
        }
    }
    else{
        if(!isNumber(f.min_drive_per_day.value)){
            return false;
        }
        var days_drive_per_month = f.days_drive_per_month.value;
        if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
            return false;
        }
    }

    return true;
}
