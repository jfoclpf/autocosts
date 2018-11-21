/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
/*File with Javascript functions that check weather the form parts are correctly inserted */

//VALIDATE DATA MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

mainModule.userFormModule.validateFormModule = (function(){

    var form = document.costs_form; //global variable referring to the form
    
    function isUserDataFormOk(){

        if (!isUserDataFormPart1_Ok()){
            console.error("Form Part 1 not Ok");
            return false;
        }

        if (!isUserDataFormPart2_Ok()){
            console.error("Form Part 2 not Ok");
            return false;
        }

        if (!isUserDataFormPart3_Ok()){
            console.error("Form Part 3 not Ok");
            return false;
        }

        return true;
    }

    function isUserDataFormPart1_Ok(){

        if (!isDepreciationOk()){
            console.error("Depreciation not Ok");
            return false;
        }

        if (!isInsuranceOk()){
            console.error("Insurance not Ok");
            return false;
        }

        if (!isCarFinanceOk()){
            console.error("CarFinance not Ok");
            return false;
        }

        if (!isTaxesOk()){
            console.error("Taxes not Ok");
            return false;
        }  

        return true;
    }

    function isUserDataFormPart2_Ok(){

        if (!isFuelOk()){
            console.error("Fuel not Ok");
            return false;
        }

        if (!isMaintenanceOk()){
            console.error("Maintenance not Ok");
            return false;
        }

        if (!isRepairsOk()){
            console.error("Repairs not Ok");
            return false;
        }

        if (!isParkingOk()){
            console.error("Parking not Ok");
            return false;
        }

        if (!isTollsOk()){
            console.error("Tolls not Ok");
            return false;
        }    

        if (!isFinesOk()){
            console.error("Fines not Ok");
            return false;
        }

        if (!isWashingOk()){
            console.error("Washing not Ok");
            return false;
        }    

        return true;
    }

    function isUserDataFormPart3_Ok(){
    
        if (!isPublicTransportOk()){
            console.warn("PublicTransport not Ok");
            return false;
        }

        if (!isIncomeOk()){
            console.warn("Income not Ok");
            return false;
        }

        if (!isWorkingTimeOk()){
            console.warn("WorkingTime not Ok");
            return false;
        }

        if (!isDistanceOk()){
            console.warn("Distance not Ok");
            return false;
        }

        if (!isTimeSpentInDrivingOk()){
            console.warn("TimeSpentInDriving not Ok");
            return false;
        }

        return true;
    }

    //the form part 3 is optional and when this function is OK, 
    //the calculator can present results for public transports
    function isPublicTransportsAlternativeOk(){

        if (!isPublicTransportOk()){
            console.warn("PublicTransport not Ok => isPublicTransportsAlternativeOk() returns false");
            return false;
        }

        if (!isDistanceOk()){
            console.warn("Distance not Ok => isPublicTransportsAlternativeOk() returns false");
            return false;
        }

        if (!isTimeSpentInDrivingOk()){
            console.warn("TimeSpentInDriving not Ok => isPublicTransportsAlternativeOk() returns false");
            return false;
        }

        return true;
    }

    //the form part 3 is optional and when this function is OK, 
    //the calculator can present results for financial effort
    function isFinancialEffortOk(){

        if (!isIncomeOk()){
            console.warn("Income not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        if (!isWorkingTimeOk()){
            console.warn("WorkingTime not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        if (!isDistanceOk()){
            console.warn("Distance not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        if (!isTimeSpentInDrivingOk()){
            console.warn("TimeSpentInDriving not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        return true;
    }

    /* *** CHECK FORM PART 1 ***** */
    /*check if data from form 1 (standing costs) is correctly filled*/

    function isDepreciationOk(){

        var minCarYear = 1910; /*the year of the first produced car*/

        /*depreciation*/
        var acquisitionMonth = form.acquisitionMonth.value; /*car acquisition month*/
        var acquisitionYear  = form.acquisitionYear.value; /*car acquisition year*/

        if(!isNumber(acquisitionMonth) || !isInteger(acquisitionMonth) || 
           parseFloat(acquisitionMonth) > 12 || parseFloat(acquisitionMonth) <= 0){
            return false;
        }
        if(!isNumber(acquisitionYear) || !isInteger(acquisitionYear) || 
           parseFloat(acquisitionYear) < minCarYear){
            return false;
        }
        if(!isNumber(form.commercialValueAtAcquisition.value)){
            return false;
        }
        if(!isNumber(form.commercialValueAtNow.value)){
            return false;
        }

        var today  = new Date();
        var carAcquisitionDate = new Date(acquisitionYear, acquisitionMonth - 1);

        var carNumberOfMonths = mainModule.calculatorModule.differenceBetweenDates(carAcquisitionDate, today);

        if(!carNumberOfMonths){
            return false;
        }

        return true;   
    }

    function isInsuranceOk(){

        /*insurance*/
        var insurancePaymentPeriod = getCheckedValue(form.insurancePaymentPeriod);

        if(insurancePaymentPeriod == ""){
            return false;
        }

        if(!isNumber(form.insuranceValue.value)){
            return false;
        }

        return true;
    }

    function isCarFinanceOk(){

        /*car finance*/
        var AutoCreditRadioBtn = getCheckedValue(form.AutoCreditRadioBtn);

        if(AutoCreditRadioBtn == ""){
            return false;
        }

        if(AutoCreditRadioBtn == "true") {
            if(!isNumber(form.borrowedAmount.value)) {
                return false;
            }
            if(!isNumber(form.numberInstallments.value)) {
                return false;
            }
            if(!isNumber(form.amountInstallment.value)) {
                return false;
            }
            if(!isNumber(form.residualValue.value)) {
                return false;
            }
        }

        return true;
    }

    function isInspectionOk(){

        /*inspection*/
        var numberInspections = form.numberInspections.value;

        if(!isNumber(numberInspections) || !isInteger(numberInspections)) {
            return false;
        }

        if(parseFloat(numberInspections) != 0 && !isNumber(form.averageInspectionCost.value)) {
            return false;
        }

        return true;
    }

    function isTaxesOk(){

        /*taxes*/
        if(!isNumber(form.roadTaxes.value)) {
            return false;
        }

        return true;
    }


    /* *** CHECK FORM PART 2 ***** */
    /*check if data from form 2 (running costs) is correctly filled*/
    function isFuelOk(){

        /*fuel*/
        var fuelCalculationType = getCheckedValue(form.calc_combustiveis);

        if(fuelCalculationType == ""){
            return false;
        }

        switch(fuelCalculationType) {

            case "km": /*fuel calculations made considering distance travelled by month*/

                if(!isNumber(form.fuel_efficiency.value)){
                    return false;
                }
                if(!isNumber(form.fuel_price.value)){
                    return false;
                }

                var carToJob = getCheckedValue(form.car_job_form2);

                if (carToJob == ""){
                    return false;
                }

                if (carToJob == "false"){

                    if(!isNumber(form.km_por_mes.value)){
                        return false;
                    }
                }
                /*make calculation considering the user takes his car to job on a daily basis*/
                else {

                    var daysPerWeek = form.dias_por_semana.value;
                    if(!isNumber(daysPerWeek) || !isInteger(daysPerWeek) || parseFloat(daysPerWeek) > 7){
                        return false;
                    }
                    if(!isNumber(form.km_entre_casa_trabalho.value)){
                        return false;
                    }
                    if(!isNumber(form.km_fds.value)){
                        return false;
                    }

                }

                break;

            case "euros": /*fuel costs based on data input money per period of time*/

                if(!isNumber(form.combustiveis_euro.value)){
                    return false;
                }
                break;

            default:

                return false;
        }

        return true;
    }

    function isMaintenanceOk(){

        /*maintenance*/
        if(!isNumber(form.revisoes.value)) {
            return false;
        }

        return true;
    }
    
    function isRepairsOk(){

        /*repairs*/
        if(!isNumber(form.reparacoes.value)) {
            return false;
        }

        return true;
    }

    function isParkingOk(){

        /*parking*/
        if(!isNumber(form.parqueamento.value)){
            return false;
        }

        return true;   
    }

    function isTollsOk(){

        /* **** tolls ***** */
        var tollsCalculationMethod = getCheckedValue(form.tolls_daily_radioBtn);

        /*if tolls costs are calculated on a daily basis*/
        if(tollsCalculationMethod == "false") {/*no daily basis*/
            if(!isNumber(form.no_daily_tolls_value.value)) {
                return false;
            }

        } else {/*daily basis*/
            if(!isNumber(form.daily_expense_tolls.value)) {
                return false;
            }
            var tollsDaysPerMonth = form.number_days_tolls.value;
            if(!isNumber(tollsDaysPerMonth) || !isInteger(tollsDaysPerMonth) || parseFloat(tollsDaysPerMonth) > 31) {
                return false;
            }

        }

        return true;
    }

    function isFinesOk(){

        /*fines*/
        if(!isNumber(form.tickets_value.value)){
            return false;
        }

        return true;
    }

    function isWashingOk(){

        /*washing*/
        if(!isNumber(form.washing_value.value)){
            return false;
        }

        return true;
    }


    /* *** CHECK FORM PART 3 ***** */
  
    function isPublicTransportOk(){

        var nbrPeopleInFamily = form.pessoas_agregado.value;
        var priceMonthlyPass = form.preco_passe.value;

        if(!isNumber(nbrPeopleInFamily) || !isInteger(nbrPeopleInFamily) || parseFloat(nbrPeopleInFamily) <= 0){
            return false;
        }

        if(!isNumber(priceMonthlyPass) || parseFloat(priceMonthlyPass) < 0){
            return false;
        }

        return true;
    }

    function isIncomeOk(){

        /*income*/
        var income_type = getCheckedValue(form.radio_income);

        switch(income_type){
            case 'year':
                if(!isNumber(form.income_per_year.value)){
                    return false;
                }
                break;
            case 'month':
                if(!isNumber(form.income_per_month.value)){
                    return false;
                }
                if(!isNumber(form.income_months_per_year.value)){
                    return false;
                }
                break;
            case 'week':
                if(!isNumber(form.income_per_week.value)){
                    return false;
                }
                if(!isNumber(form.income_weeks_per_year.value)){
                    return false;
                }
                break;
            case 'hour':
                if(!isNumber(form.income_per_hour.value)){
                    return false;
                }
                if(!isNumber(form.income_hours_per_week.value)){
                    return false;
                }   
                if(!isNumber(form.income_hour_weeks_per_year.value)){
                    return false;
                } 
                break;
            default:
                return false;
        }

        return true;
    }

    function isWorkingTimeOk(){

        /*working time*/
        var isWorkingTime = getCheckedValue(form.radio_work_time);
        var incomeType = getCheckedValue(form.radio_income);

        if(isWorkingTime == 'true' && incomeType != 'hour'){

            if(!isNumber(form.time_hours_per_week.value) || 
                parseFloat(form.time_hours_per_week.value) < parseFloat(form.time_hours_per_week.min)  || 
                parseFloat(form.time_hours_per_week.value) > parseFloat(form.time_hours_per_week.max)){

                return false;
            }

            if(!isNumber(form.time_month_per_year.value) || 
                parseFloat(form.time_month_per_year.value) < parseFloat(form.time_month_per_year.min)  || 
                parseFloat(form.time_month_per_year.value) > parseFloat(form.time_month_per_year.max)){

                return false;
            }
        }

        return true;
    }

    function isDistanceOk(){

        var fuelCalcMethodOnFormPart2 = getCheckedValue(form.calc_combustiveis);

        //If user sets "currency" on Fuel section on Form Part 2, the calculator needs anyway to know the distance traveled, 
        //and thus it will ask the distance travelled by the user here on Form Part 3
        if(fuelCalcMethodOnFormPart2 === "euros"){

            var drive_to_work = getCheckedValue(form.drive_to_work);

            if(drive_to_work == 'true'){
                if(!isNumber(form.drive_to_work_days_per_week.value) || parseFloat(form.drive_to_work_days_per_week.value) > 7){
                    return false;
                }
                if(!isNumber(form.dist_home_job.value)){
                    return false;
                }
                if(!isNumber(form.journey_weekend.value)){
                    return false;
                }
            }
            else{
                if(!isNumber(form.km_per_month.value)){
                    return false;
                }
            }
        }

        return true;
    }

    function isTimeSpentInDrivingOk(){

        var distanceBasedOnDrivingToJob;    

        var fuelCalcMethodOnFormPart2 = getCheckedValue(form.calc_combustiveis);        
        if (fuelCalcMethodOnFormPart2 === "km"){
            //check now Distance Section in Form Part 2 
            distanceBasedOnDrivingToJob = (getCheckedValue(form.car_job_form2) == "true");
        }    
        else if (fuelCalcMethodOnFormPart2 === "euros"){
            //check now Distance Section in Form Part 3 
            distanceBasedOnDrivingToJob = (getCheckedValue(form.drive_to_work) == "true");
        }    
        else{
            return false;
        }

        /*time spent in driving*/
        if (distanceBasedOnDrivingToJob){
            if(!isNumber(form.time_home_job.value)){
                return false;
            }
            if(!isNumber(form.time_weekend.value)){
                return false;
            }
        }
        else{
            if(!isNumber(form.min_drive_per_day.value)){
                return false;
            }
            var days_drive_per_month = form.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || parseFloat(days_drive_per_month) > 31){
                return false;
            }
        }

        return true;
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
    
    //check if number or parsed string is integer
    function isInteger(n) {
        return (parseFloat(n) == parseInt(n, 10));
    }    
    
    //isNaN stands for "is Not a Number", this function works whether n is a "number" or a "string"
    //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    function isNumber(n) {
        return !isNaN(n) && isFinite(parseFloat(n));
    } 
    
    return{
        isPublicTransportsAlternativeOk: isPublicTransportsAlternativeOk,
        isFinancialEffortOk:             isFinancialEffortOk,
        isUserDataFormPart1_Ok:          isUserDataFormPart1_Ok,
        isUserDataFormPart2_Ok:          isUserDataFormPart2_Ok,
        isUserDataFormPart3_Ok:          isUserDataFormPart3_Ok    
    };

})();
