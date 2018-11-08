/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
/*File with Javascript functions that check weather the form parts are correctly inserted */

var validateData = {

    form: document.costs_form, //global variable referring to the form
    
    isUserDataFormOk: function(){

        if (!this.isUserDataFormPart1_Ok()){
            console.error("Form Part 1 not Ok");
            return false;
        }

        if (!this.isUserDataFormPart2_Ok()){
            console.error("Form Part 2 not Ok");
            return false;
        }

        if (!this.isUserDataFormPart3_Ok()){
            console.error("Form Part 3 not Ok");
            return false;
        }

        return true;
    },

    isUserDataFormPart1_Ok: function(){

        if (!this.isDepreciationOk()){
            console.error("Depreciation not Ok");
            return false;
        }

        if (!this.isInsuranceOk()){
            console.error("Insurance not Ok");
            return false;
        }

        if (!this.isCarFinanceOk()){
            console.error("CarFinance not Ok");
            return false;
        }

        if (!this.isTaxesOk()){
            console.error("Taxes not Ok");
            return false;
        }  

        return true;
    },

    isUserDataFormPart2_Ok: function(){

        if (!this.isFuelOk()){
            console.error("Fuel not Ok");
            return false;
        }

        if (!this.isMaintenanceOk()){
            console.error("Maintenance not Ok");
            return false;
        }

        if (!this.isRepairsOk()){
            console.error("Repairs not Ok");
            return false;
        }

        if (!this.isParkingOk()){
            console.error("Parking not Ok");
            return false;
        }

        if (!this.isTollsOk()){
            console.error("Tolls not Ok");
            return false;
        }    

        if (!this.isFinesOk()){
            console.error("Fines not Ok");
            return false;
        }

        if (!this.isWashingOk()){
            console.error("Washing not Ok");
            return false;
        }    

        return true;
    },

    isUserDataFormPart3_Ok: function(){
    
        if (!this.isPublicTransportOk()){
            console.warn("PublicTransport not Ok");
            return false;
        }

        if (!this.isIncomeOk()){
            console.warn("Income not Ok");
            return false;
        }

        if (!this.isWorkingTimeOk()){
            console.warn("WorkingTime not Ok");
            return false;
        }

        if (!this.isDistanceOk()){
            console.warn("Distance not Ok");
            return false;
        }

        if (!this.isTimeSpentInDrivingOk()){
            console.warn("TimeSpentInDriving not Ok");
            return false;
        }

        return true;
    },

    //the form part 3 is optional and when this function is OK, 
    //the calculator can present results for public transports
    isPublicTransportsAlternativeOk: function (){

        if (!this.isPublicTransportOk()){
            console.warn("PublicTransport not Ok => isPublicTransportsAlternativeOk() returns false");
            return false;
        }

        if (!this.isDistanceOk()){
            console.warn("Distance not Ok => isPublicTransportsAlternativeOk() returns false");
            return false;
        }

        if (!this.isTimeSpentInDrivingOk()){
            console.warn("TimeSpentInDriving not Ok => isPublicTransportsAlternativeOk() returns false");
            return false;
        }

        return true;
    },

    //the form part 3 is optional and when this function is OK, 
    //the calculator can present results for financial effort
    isFinancialEffortOk: function (){

        if (!this.isIncomeOk()){
            console.warn("Income not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        if (!this.isWorkingTimeOk()){
            console.warn("WorkingTime not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        if (!this.isDistanceOk()){
            console.warn("Distance not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        if (!this.isTimeSpentInDrivingOk()){
            console.warn("TimeSpentInDriving not Ok => isFinancialEffortOk() returns false");
            return false;
        }

        return true;
    },

    /* *** CHECK FORM PART 1 ***** */
    /*check if data from form 1 (standing costs) is correctly filled*/

    isDepreciationOk: function(){

        var f = this.form; 
        var minCarYear = 1910; /*the year of the first produced car*/

        /*depreciation*/
        var acquisitionMonth = f.acquisitionMonth.value; /*car acquisition month*/
        var acquisitionYear  = f.acquisitionYear.value; /*car acquisition year*/

        if(!isNumber(acquisitionMonth) || !isInteger(acquisitionMonth) || 
           parseFloat(acquisitionMonth) > 12 || parseFloat(acquisitionMonth) <= 0){
            return false;
        }
        if(!isNumber(acquisitionYear) || !isInteger(acquisitionYear) || 
           parseFloat(acquisitionYear) < minCarYear){
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

        var carNumberOfMonths = costs.dateDiff(carAcquisitionDate, today);

        if(!carNumberOfMonths){
            return false;
        }

        return true;   
    },

    isInsuranceOk: function(){

        var f = this.form; 

        /*insurance*/
        var insurancePaymentPeriod = getCheckedValue(f.insurancePaymentPeriod);

        if(insurancePaymentPeriod == ""){
            return false;
        }

        if(!isNumber(f.insuranceValue.value)){
            return false;
        }

        return true;
    },

    isCarFinanceOk: function(){

        var f = this.form;     

        /*car finance*/
        var AutoCreditRadioBtn = getCheckedValue(f.AutoCreditRadioBtn);

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
    },

    isInspectionOk: function(){

        var f = this.form;   

        /*inspection*/
        var numberInspections = f.numberInspections.value;

        if(!isNumber(numberInspections) || !isInteger(numberInspections)) {
            return false;
        }

        if(parseFloat(numberInspections) != 0 && !isNumber(f.averageInspectionCost.value)) {
            return false;
        }

        return true;
    },

    isTaxesOk: function(){

        var f = this.form;   

        /*taxes*/
        if(!isNumber(f.roadTaxes.value)) {
            return false;
        }

        return true;
    },


    /* *** CHECK FORM PART 2 ***** */
    /*check if data from form 2 (running costs) is correctly filled*/
    isFuelOk: function(){

        var f = this.form; 

        /*fuel*/
        var fuelCalculationType = getCheckedValue(f.calc_combustiveis);

        if(fuelCalculationType == ""){
            return false;
        }

        switch(fuelCalculationType) {

            case "km": /*fuel calculations made considering distance travelled by month*/

                if(!isNumber(f.consumo_auto.value)){
                    return false;
                }
                if(!isNumber(f.fuel_price.value)){
                    return false;
                }

                var carToJob = getCheckedValue(f.car_job_form2);

                if (carToJob == ""){
                    return false;
                }

                if (carToJob == "false"){

                    if(!isNumber(f.km_por_mes.value)){
                        return false;
                    }
                }
                /*make calculation considering the user takes his car to job on a daily basis*/
                else {

                    var daysPerWeek = f.dias_por_semana.value;
                    if(!isNumber(daysPerWeek) || !isInteger(daysPerWeek) || parseFloat(daysPerWeek) > 7){
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

            case "euros": /*fuel costs based on data input money per period of time*/

                if(!isNumber(f.combustiveis_euro.value)){
                    return false;
                }
                break;

            default:

                return false;
        }

        return true;
    },

    isMaintenanceOk: function(){

        var f = this.form; 

        /*maintenance*/
        if(!isNumber(f.revisoes.value)) {
            return false;
        }

        return true;
    },
    
    isRepairsOk: function(){

        var f = this.form;     

        /*repairs*/
        if(!isNumber(f.reparacoes.value)) {
            return false;
        }

        return true;
    },

    isParkingOk: function(){

        var f = this.form;     

        /*parking*/
        if(!isNumber(f.parqueamento.value)){
            return false;
        }

        return true;   
    },

    isTollsOk: function(){

        var f = this.form;  

        /* **** tolls ***** */
        var tollsCalculationMethod = getCheckedValue(f.tolls_daily_radioBtn);

        /*if tolls costs are calculated on a daily basis*/
        if(tollsCalculationMethod == "false") {/*no daily basis*/
            if(!isNumber(f.no_daily_tolls_value.value)) {
                return false;
            }

        } else {/*daily basis*/
            if(!isNumber(f.daily_expense_tolls.value)) {
                return false;
            }
            var tollsDaysPerMonth = f.number_days_tolls.value;
            if(!isNumber(tollsDaysPerMonth) || !isInteger(tollsDaysPerMonth) || parseFloat(tollsDaysPerMonth) > 31) {
                return false;
            }

        }

        return true;
    },

    isFinesOk: function(){

        var f = this.form;     
        /*fines*/
        if(!isNumber(f.tickets_value.value)){
            return false;
        }

        return true;
    },

    isWashingOk: function(){

        var f = this.form; 

        /*washing*/
        if(!isNumber(f.washing_value.value)){
            return false;
        }

        return true;
    },


    /* *** CHECK FORM PART 3 ***** */
  
    isPublicTransportOk: function(){

        var f = this.form; 

        var nbrPeopleInFamily = f.pessoas_agregado.value;
        var priceMonthlyPass = f.preco_passe.value;

        if(!isNumber(nbrPeopleInFamily) || !isInteger(nbrPeopleInFamily) || parseFloat(nbrPeopleInFamily) <= 0){
            return false;
        }

        if(!isNumber(priceMonthlyPass) || parseFloat(priceMonthlyPass) < 0){
            return false;
        }

        return true;
    },

    isIncomeOk: function(){

        var f = this.form; 

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
            case 'hour':
                if(!isNumber(f.income_per_hour.value)){
                    return false;
                }
                if(!isNumber(f.income_hours_per_week.value)){
                    return false;
                }   
                if(!isNumber(f.income_hour_weeks_per_year.value)){
                    return false;
                } 
                break;
            default:
                return false;
        }

        return true;
    },

    isWorkingTimeOk: function(){

        var f = this.form;         

        /*working time*/
        var isWorkingTime = getCheckedValue(f.radio_work_time);
        var incomeType = getCheckedValue(f.radio_income);

        if(isWorkingTime == 'true' && incomeType != 'hour'){

            if(!isNumber(f.time_hours_per_week.value) || 
                parseFloat(f.time_hours_per_week.value) < parseFloat(f.time_hours_per_week.min)  || 
                parseFloat(f.time_hours_per_week.value) > parseFloat(f.time_hours_per_week.max)){

                return false;
            }

            if(!isNumber(f.time_month_per_year.value) || 
                parseFloat(f.time_month_per_year.value) < parseFloat(f.time_month_per_year.min)  || 
                parseFloat(f.time_month_per_year.value) > parseFloat(f.time_month_per_year.max)){

                return false;
            }
        }

        return true;
    },

    isDistanceOk: function(){

        var f = this.form;       

        var fuelCalcMethodOnFormPart2 = getCheckedValue(f.calc_combustiveis);

        //If user sets "currency" on Fuel section on Form Part 2, the calculator needs anyway to know the distance traveled, 
        //and thus it will ask the distance travelled by the user here on Form Part 3
        if(fuelCalcMethodOnFormPart2 === "euros"){

            var drive_to_work = getCheckedValue(f.drive_to_work);

            if(drive_to_work == 'true'){
                if(!isNumber(f.drive_to_work_days_per_week.value) || parseFloat(f.drive_to_work_days_per_week.value) > 7){
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
    },

    isTimeSpentInDrivingOk: function(){

        var f = this.form; 

        var distanceBasedOnDrivingToJob;    

        var fuelCalcMethodOnFormPart2 = getCheckedValue(f.calc_combustiveis);        
        if (fuelCalcMethodOnFormPart2 === "km"){
            //check now Distance Section in Form Part 2 
            distanceBasedOnDrivingToJob = (getCheckedValue(f.car_job_form2) == "true");
        }    
        else if (fuelCalcMethodOnFormPart2 === "euros"){
            //check now Distance Section in Form Part 3 
            distanceBasedOnDrivingToJob = (getCheckedValue(f.drive_to_work) == "true");
        }    
        else{
            return false;
        }

        /*time spent in driving*/
        if (distanceBasedOnDrivingToJob){
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
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || parseFloat(days_drive_per_month) > 31){
                return false;
            }
        }

        return true;
    }
};
