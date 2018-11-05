/***** CORE JS FUNCTIONS *******/
/*===========================================================*/
/*Functions which do not change the visual aspect of the page*/

//detects if a variable is defined and different from zero
function isDef(variable){
    if ((typeof variable !== 'undefined') && variable!=0) {
        return true;
    }
    else{
        return false;
    }
}

function isObjDef(Obj){
    if (Obj === null || Obj == "null" || typeof Obj !== 'object' || $.isEmptyObject(Obj)){
        return false;
    }
    else{
        return true;
    }
}

function date_diff(date1, date2) {//return the difference in months between two dates date2-date1
    var m2, y2, m1, y1;
    m2 = date2.getUTCMonth() + 1;
    y2 = date2.getUTCFullYear();
    m1 = date1.getUTCMonth() + 1;
    y1 = date1.getUTCFullYear();

    //check if date2>date1
    if (y1 > y2) {
        return (false);
    }
    if (y1 === y2 && m1 > m2) {
        return false;
    }

    if (m2 >= m1) {
        return (y2 - y1) * 12 + (m2 - m1);
    }
    return (y2 - y1 - 1) * 12 + (m2 + 12 - m1);
}

function calculateMonthlyDepreciation(depreciation, ageInMonths) {             
    return (parseFloat(depreciation.acquisitionCost) - parseFloat(depreciation.presentValue)) / ageInMonths;
}

function calculateInsuranceMonthlyValue(insurance) {
    
    switch(insurance.period) {
        case "mensal":
            insuranceValue = parseFloat(insurance.amountPerPeriod);
            break;
        case "trimestral":
            insuranceValue = parseFloat(insurance.amountPerPeriod) / 3;
            break;
        case "semestral":
            insuranceValue = parseFloat(insurance.amountPerPeriod) / 6;
            break;
        case "anual":
            insuranceValue = parseFloat(insurance.amountPerPeriod) / 12;
            break;
        default:
            throw "Error calculating Insurance";
    }
    
    return insuranceValue;
}

function calculateInterestsMonthlyValue(credit, ageInMonths) {
    
    var output = {
        totalInterests: 0,
        period: 0,
        monthlyCosts: 0
    };

    if(credit.creditBool == "true") { //if there was credit

        var numberInstallmentsFloat = parseFloat(credit.yesCredit.numberInstallments);
        output.period = numberInstallmentsFloat;

        var totalInterests = ( (numberInstallmentsFloat * parseFloat(credit.yesCredit.amountInstallment)) + parseFloat(credit.yesCredit.residualValue) ) -
            parseFloat(credit.yesCredit.borrowedAmount);
        
        output.totalInterests = totalInterests;

        if(totalInterests < 0){
            totalInterests = 0;
        }

        if(ageInMonths >= numberInstallmentsFloat){
            output.monthlyCosts = parseFloat(totalInterests / ageInMonths);
        }
        else{
            output.monthlyCosts = parseFloat(totalInterests / numberInstallmentsFloat);
        }
    }
    else if(credit.creditBool == "false") {
        output.totalInterests = 0;
        output.period = 0;
        output.monthlyCosts = 0;
    }
    else{
        throw "Error calculating credit";
    }
    
    return output;
}

function calculateMonthlyInspection(inspection, ageInMonths) {    
    
    if(parseFloat(inspection.numberOfInspections) > 0){
        return (parseFloat(inspection.numberOfInspections) * parseFloat(inspection.averageInspectionCost)) / ageInMonths;
    }
    else{
        return 0;
    }
}

function calculateMonthlyTaxes(car_tax) {    
    return  parseFloat(car_tax.amountPerYear)/12;
}

function calculateMonthlyFuel(fuel, country){
    
    var output = {
        monthlyCost: 0,      //monthly fuel costs in standard currency
        distancePerMonth: 0  //distance per month in standard unit
    };
    
    var errMsg = "Error calculating fuel";

    switch(fuel.typeOfCalculation){
        
        case "km": //fuel costs calculation based on distance

            var distancePerMonth;
            var fuelEffL100km = convert_to_fuel_eff_l100km(fuel.distanceBased.fuelEfficiency, country.fuel_efficiency_std);
            var fuelPriceOnCurrPerLitre = convert_to_fuel_price_CURRpLitre(fuel.distanceBased.fuelPrice, country.fuel_price_volume_std);

            if (fuel.distanceBased.considerCarToJob == "false"){
                
                switch(fuel.distanceBased.noCarToJob.period){
                    case "1":
                        distancePerMonth = parseFloat(fuel.distanceBased.noCarToJob.distancePerPeriod);
                        break;
                    case "2":
                        distancePerMonth = parseFloat(fuel.distanceBased.noCarToJob.distancePerPeriod) / 2;
                        break;
                    case "3":
                        distancePerMonth = parseFloat(fuel.distanceBased.noCarToJob.distancePerPeriod) / 3;
                        break;
                    case "4":
                        distancePerMonth = parseFloat(fuel.distanceBased.noCarToJob.distancePerPeriod) / 6;
                        break;
                    case "5":
                        distancePerMonth = parseFloat(fuel.distanceBased.noCarToJob.distancePerPeriod) / 12;
                        break;
                    default:
                        throw errMsg;                        
                }
                
                output.distancePerMonth = distancePerMonth;
                //converts distance unit to kilometres
                var distancePerMonthInKms = convert_std_dist_to_km(distancePerMonth, country.distance_std);
                output.monthlyCost = fuelEffL100km * distancePerMonthInKms * fuelPriceOnCurrPerLitre / 100;
            }            
            else if (fuel.distanceBased.considerCarToJob == "true"){   //make calculation considering the user takes his car to work on a daily basis

                //if miles were chosen must convert input to kilometres
                var distanceHomeToJobInKms = convert_std_dist_to_km(fuel.distanceBased.carToJob.distanceBetweenHomeAndJob, country.distance_std);
                var distanceOnWeekendsInKms = convert_std_dist_to_km(fuel.distanceBased.carToJob.distanceDuringWeekends, country.distance_std);
                
                var total_km = ((2 * distanceHomeToJobInKms * parseInt(fuel.distanceBased.carToJob.daysPerWeek, 10)) + distanceOnWeekendsInKms) * (30.4375 / 7);
                output.monthlyCost = fuelEffL100km * total_km * fuelPriceOnCurrPerLitre / 100;
                
                //after computation is made, convert backwards to standard distance
                output.distancePerMonth = convert_km_to_std_dist(total_km, country.distance_std);
            }
            else{
                throw errMsg;
            }
            
            break;
            
        case "euros": //fuel costs calculation based on money
            
            var monthlyCost;
            switch(fuel.currencyBased.period){
                case "1":
                    monthlyCost = parseFloat(fuel.currencyBased.amountPerPeriod);
                    break;
                case "2":
                    monthlyCost = parseFloat(fuel.currencyBased.amountPerPeriod) / 2;
                    break;
                case "3":
                    monthlyCost = parseFloat(fuel.currencyBased.amountPerPeriod) / 3;
                    break;
                case "4":
                    monthlyCost = parseFloat(fuel.currencyBased.amountPerPeriod) / 6;
                    break;
                case "5":
                    monthlyCost = parseFloat(fuel.currencyBased.amountPerPeriod) / 12;
                    break;
                default:
                    throw errMsg;
            }
            
            output.monthlyCost = monthlyCost;
            output.distancePerMonth = undefined;
            
            break;
            
        default:
            throw errMsg;
    }
    
    return output;
}

function calculateMonthlyMaintenance(maintenance) {
    return parseFloat(maintenance.amountPerYear)/12;
}

function calculateMonthlyRepairsAndImprovements(repairs_improv) {
    return parseFloat(repairs_improv.amountPerYear)/12;
}

function calculateMonthlyParking(parking) {
    return parseFloat(parking.amountPerMonth);
}


function calculateMonthlyTolls(tolls) {

    var errMsg = "Error calculating tolls";

    if(tolls.calculationBasedOnDay == "false"){ //calculation not done by day
        switch(tolls.noBasedOnDay.period){
            case "1":
                return parseFloat(tolls.noBasedOnDay.amountPerPeriod);
            case "2":
                return parseFloat(tolls.noBasedOnDay.amountPerPeriod) / 2;
            case "3":
                return parseFloat(tolls.noBasedOnDay.amountPerPeriod) / 3;
            case "4":
                return parseFloat(tolls.noBasedOnDay.amountPerPeriod) / 6;
            case "5":
                return parseFloat(tolls.noBasedOnDay.amountPerPeriod) / 12;
            default:
                throw errMsg;
        }
    }
    else if(tolls.calculationBasedOnDay == "true"){
        return parseFloat(tolls.yesBasedOnDay.amountPerDay) * parseFloat(tolls.yesBasedOnDay.daysPerMonth);
    }
    else {
        throw errMsg;
    }
}


function calculateMonthlyFines(fines) {
        
    switch(fines.period) {
        case "1":
            return parseFloat(fines.amountPerPeriod);
        case "2":
            return parseFloat(fines.amountPerPeriod) / 2;
        case "3":
            return parseFloat(fines.amountPerPeriod) / 3;
        case "4":
            return parseFloat(fines.amountPerPeriod) / 6;
        case "5":
            return parseFloat(fines.amountPerPeriod) / 12;
        default:
            throw "Error calculating fines";
    }    
}

function calculateMonthlyWashing(washing) {

    switch(washing.period) {
        case "1":
            return parseFloat(washing.amountPerPeriod);
        case "2":
            return parseFloat(washing.amountPerPeriod) / 2;
        case "3":
            return parseFloat(washing.amountPerPeriod) / 3;
        case "4":
            return parseFloat(washing.amountPerPeriod) / 6;
        case "5":
            return parseFloat(washing.amountPerPeriod) / 12;
        default:
            throw "Error calculating washing";
    }
}


//*****************************************************
//*****************************************************

function calculate_costs(form, country){
    //form is the user input data
    //country is an input object with country information
    //calculate_costs returns the object "output"

    //Monthly Costs object, is a field of object "output"
    var monthlyCosts = {
        depreciation: 0,                   //depreciation monthly cost
        insurance: 0,                      //insurance monthly cost
        credit: 0,                         //interests of credit monthly cost
        inspection: 0,                     //inspection monthly costs
        car_tax: 0,                        //car tax monthly cost
        fuel: 0,                           //fuel monthly cost
        maintenance: 0,                    //maintenance monthly costs
        repairs_improv: 0,                 //repairs and improvements monthly cost
        parking: 0,                        //parking monthly cost
        tolls: 0,                          //tolls monthly cost
        fines: 0,                          //fines monthly cost
        washing: 0                         //washing monthly cost
    };

    //function global variables
    var distance_per_month;  //distance per month in the standard unit

    //depreciation
    var today = new Date();
    var date_auto = new Date(form.depreciation.acquisitionYear, form.depreciation.acquisitionMonth - 1);
    var age_months = date_diff(date_auto, today);

    if(age_months != 0){
        monthlyCosts.depreciation = calculateMonthlyDepreciation(form.depreciation, age_months);
    }
    else{
        throw "Age of vehicle, calculated by depreciation section, invalid or equals zero";
    }

    //insurance
    monthlyCosts.insurance = calculateInsuranceMonthlyValue(form.insurance);

    //credit
    var creditObject = calculateInterestsMonthlyValue(form.credit, age_months);    
    monthlyCosts.credit = creditObject.monthlyCosts;

    //inspection
    monthlyCosts.inspection = calculateMonthlyInspection(form.inspection, age_months);

    //taxes
    monthlyCosts.car_tax = calculateMonthlyTaxes(form.car_tax);

    //fuel
    var fuel_object = calculateMonthlyFuel(form.fuel, country);                 

    monthlyCosts.fuel = fuel_object.monthlyCost;
    distance_per_month = fuel_object.distancePerMonth; //distance per month in the standard unit

    //maintenance
    monthlyCosts.maintenance = calculateMonthlyMaintenance(form.maintenance);

    //repairs
    monthlyCosts.repairs_improv = calculateMonthlyRepairsAndImprovements(form.repairs_improv);

    //parking
    monthlyCosts.parking = calculateMonthlyParking(form.parking);

    //tolls
    monthlyCosts.tolls = calculateMonthlyTolls(form.tolls);

    //fines
    monthlyCosts.fines = calculateMonthlyFines(form.fines);

    //washing
    monthlyCosts.washing = calculateMonthlyWashing(form.washing);

    //total standing costs
    var total_standing_costs_month = monthlyCosts.insurance + monthlyCosts.depreciation + monthlyCosts.credit +
                                     monthlyCosts.inspection + 0.5 * monthlyCosts.maintenance + monthlyCosts.car_tax;

    //total running costs
    var total_running_costs_month = monthlyCosts.fuel + 0.5 * monthlyCosts.maintenance + 
                                    monthlyCosts.repairs_improv + monthlyCosts.parking +
                                    monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing;

    //totals
    var total_costs_month = monthlyCosts.insurance + monthlyCosts.fuel + monthlyCosts.depreciation +
                            monthlyCosts.credit + monthlyCosts.inspection + monthlyCosts.maintenance +
                            monthlyCosts.repairs_improv + monthlyCosts.car_tax + monthlyCosts.parking +
                            monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing;

    var total_costs_year = total_costs_month * 12;
    
    var total_costs_ever = total_costs_month * age_months;



    //*************** PUBLIC TRANSPORTS ************
    var public_transports;
    if (form.publicTransports.isOk){

        //Object for public transports as an alternative to car usage
        //i.e., how much of public transports could be used with the same amount
        //of money that the user spends totally with automobile
        public_transports = {
            
            //ratio (total price of public transports)/(total price of car) 
            //under which it shows the alternatives of public transports
            ptcosts_carcosts_ratio_threshold: 0.9,  
            
            //ratio of costs ptcosts/carcosts under which shows other alternatives 
            //with further public transports (intercity trains for example)
            other_pt_ratio_threshold: 0.6,
            
            //average price of taxi per unit distance
            taxi_price_per_km: country.taxi_price, 

            //boolean function that says if public transporst alternatives are shown
            display_pt: function(){
                return (form.publicTransports.monthlyPassCost * form.publicTransports.numberOfPeopleInFamily < 
                    this.ptcosts_carcosts_ratio_threshold * total_costs_month) && 
                    form.publicTransports.monthlyPassCost != 0;
            },

            total_price_pt: 0,         //total costs of public transports for family
            total_altern: 0,           //total alternative costs by not having a car
            pt_carcost_ratio: 0,       //public transports over car costs ratio
            taxi_cost: 0,              //amount set to the usage of taxi as an alternative to car
            km_by_taxi: 0,             //km that could be done by taxi with such amount
            display_other_pt: false,   //boolean for further alternative public transports
            other_pt: 0                //amount of costs set to such alternatives
        };
        
        var percent_taxi= 0.2;//in case above condition is met, the budget percentage alocated to taxi, as alternative to car
        if(public_transports.display_pt()) {

            //total price of monthly passes
            public_transports.total_price_pt = form.publicTransports.monthlyPassCost * form.publicTransports.numberOfPeopleInFamily;   
            
            public_transports.total_altern = public_transports.total_price_pt;
            public_transports.pt_carcost_ratio= public_transports.total_price_pt / total_costs_month;

            //in case other public transports are not shown
            if(public_transports.pt_carcost_ratio > public_transports.other_pt_ratio_threshold){
                
                public_transports.display_other_pt = false;
                public_transports.taxi_cost = total_costs_month - public_transports.total_price_pt;
                
                //number of possible km/miles/distance done by taxi
                public_transports.km_by_taxi = public_transports.taxi_cost / public_transports.taxi_price_per_km;
                public_transports.total_altern += public_transports.taxi_cost;
            }
            else{
                public_transports.display_other_pt = true;
                public_transports.taxi_cost = total_costs_month * (1 - public_transports.pt_carcost_ratio) / 2;
                public_transports.km_by_taxi = public_transports.taxi_cost / public_transports.taxi_price_per_km;
                
                //amount allocated to other Public Transports, besides monthly pass
                public_transports.other_pt = total_costs_month * (1 - public_transports.pt_carcost_ratio) / 2;

                public_transports.total_altern += public_transports.taxi_cost + public_transports.other_pt;
            }
        }
    }//EOF PUBLIC TRANSPORTS    
            
    //*************** FINANCIAL EFFORT ************
    var fin_effort;
    if (form.financialEffort.isOk){
        //create financial effort object
        fin_effort = {
            //income
            income: 0,                          //income amount the user has inserted
            income_per_year: 0,                 //average income per year
            income_per_type: 0,                 //number of income time-periods (number of months/year or weeks/year)
            income_hours_per_week: 0,           //number of hours per week
            aver_income_per_month:0,            //average income per month
            aver_income_per_hour: 0,            //average income per hour
            time_hours_per_week: 36,            //default hours per week
            time_month_per_year: 11,            //default months per year
            aver_work_time_per_m: 0,            //average working time per month
            work_hours_per_y: 0,                //total working hours per year
            //costs
            total_costs_year: total_costs_year, //total costs per year
            hours_per_year_to_afford_car: 0,    //hours per year to afford the car
            month_per_year_to_afford_car: 0,    //months per year to afford the car
            days_car_paid: 0,                   //number of days till the car is paid
            percentage_of_income: 0             //percentage of income that car costs represent
        };

        //income
        switch(form.financialEffort.incomePeriod){
            case 'year':
                fin_effort.income = Number(form.financialEffort.year.amount);
                fin_effort.income_per_year = fin_effort.income * 1;
                break;
            case 'month':
                fin_effort.income = Number(form.financialEffort.month.amountPerMonth);
                fin_effort.income_per_type = form.financialEffort.month.monthsPerYear;
                fin_effort.income_per_year = fin_effort.income * fin_effort.income_per_type;
                break;
            case 'week':
                fin_effort.income = Number(form.financialEffort.week.amountPerWeek);
                fin_effort.income_per_type = form.financialEffort.week.weeksPerYear;
                fin_effort.income_per_year = fin_effort.income * fin_effort.income_per_type;
                break;
            case 'hour':
                fin_effort.income = Number(form.financialEffort.hour.amountPerHour);
                fin_effort.income_hours_per_week = form.financialEffort.hour.hoursPerWeek;
                fin_effort.income_per_type = form.financialEffort.hour.weeksPerYear;
                fin_effort.income_per_year = fin_effort.income * fin_effort.income_hours_per_week * fin_effort.income_per_type;
                break;
            default:
                throw "Error calculating Income";
        }
        fin_effort.aver_income_per_month = fin_effort.income_per_year / 12;

        //working time
        if(form.financialEffort.incomePeriod != 'hour'){
            if(form.workingTime.isActivated == 'true'){
                fin_effort.time_hours_per_week = Number(form.workingTime.hoursPerWeek);
                fin_effort.time_month_per_year = Number(form.workingTime.monthsPerYear);
            }

            fin_effort.aver_work_time_per_m = 365.25 / 7 * fin_effort.time_hours_per_week *
                fin_effort.time_month_per_year / 12 / 12;
            
            fin_effort.work_hours_per_y = 365.25 / 7 * fin_effort.time_hours_per_week * fin_effort.time_month_per_year / 12;
        }

        //****find Net Income per Hour ***
        var a = 11; //default months per year of work
        var b = 36; //default hours per week of normal working week
        var T, x, y, n;
        //if has a job, find a=months per year of work, b=hours per week of work
        if(form.workingTime.isActivated == 'true'){
            a = parseInt(form.workingTime.monthsPerYear);
            b = parseInt(form.workingTime.hoursPerWeek);
        }
        T = 365.25/7 * a/12 * b; //T=number of working hours per year
        switch(form.financialEffort.incomePeriod){
            case 'year':
                x = parseInt(form.financialEffort.year.amount);
                n = x/T;
                break;
            case 'month':
                x = parseInt(form.financialEffort.month.amountPerMonth);
                y = parseInt(form.financialEffort.month.monthsPerYear);
                n = (x*y)/T;
                break;
            case 'week':
                x = parseInt(form.financialEffort.week.amountPerWeek);
                y = parseInt(form.financialEffort.week.weeksPerYear);
                n = (x*y)/T;
                break;
            case 'hour':
                n = parseInt(form.financialEffort.hour.amountPerHour);
                break;
            default:
                throw "Error calculating Income";                
        }
        fin_effort.aver_income_per_hour = n;

        //extra financial effort variables
        fin_effort.hours_per_year_to_afford_car = total_costs_year / fin_effort.aver_income_per_hour;
        fin_effort.month_per_year_to_afford_car = total_costs_year / fin_effort.income_per_year * 12;
        fin_effort.days_car_paid = total_costs_year / fin_effort.income_per_year * 365.25;
        fin_effort.percentage_of_income = total_costs_year / fin_effort.income_per_year * 100;

    }//EOF FINANCIAL EFFORT

    //******* Driving distance and Time spent in driving *******
    //if either Financial effort or Public Transports slider in form part 3 is activated
    //the form demands information from both Driving distance and Time spent in driving
    var driving_distance, time_spent_driving, kinetic_speed, virtual_speed;
    if (form.financialEffort.isOk || form.publicTransports.isOk){

        //driving distance
        driving_distance = {
            drive_per_year:0,                   //total distance driven per year
            drive_to_work_days_per_week: 0,     //number of days per week, the user drives to job
            dist_home_job: 0,                   //distance between home and job (one-way)
            journey_weekend: 0,                 //distance the user drives during weekend
            aver_drive_per_week: 0,             //average distance driven per week
            fuel_period_km: form.distance.noCarToJob.period  //time-period for distance calculation
        };

        //if fuel calculation with distance was NOT chosen in form part 2, gets from form part 3
        if(form.fuel.typeOfCalculation == 'euros'){
            if(form.distance.considerCarToJob == 'true'){
                
                driving_distance.drive_to_work_days_per_week = form.distance.carToJob.daysPerWeek;
                driving_distance.dist_home_job =  parseInt(form.distance.carToJob.distanceBetweenHomeAndJob);
                driving_distance.journey_weekend = parseInt(form.distance.carToJob.distanceDuringWeekends);
                
                driving_distance.aver_drive_per_week = 2 * driving_distance.drive_to_work_days_per_week *
                    driving_distance.dist_home_job + driving_distance.journey_weekend;

                distance_per_month = 365.25 / 7 * driving_distance.aver_drive_per_week / 12;
                driving_distance.drive_per_year = 365.25 / 7 * driving_distance.aver_drive_per_week;

            }
            else{
                switch(driving_distance.fuel_period_km){
                    case "1":
                        distance_per_month = parseFloat(form.distance.noCarToJob.distancePerPeriod);
                        break;
                    case "2":
                        distance_per_month = parseFloat(form.distance.noCarToJob.distancePerPeriod) / 2;
                        break;
                    case "3":
                        distance_per_month = parseFloat(form.distance.noCarToJob.distancePerPeriod) / 3;
                        break;
                    case "4":
                        distance_per_month = parseFloat(form.distance.noCarToJob.distancePerPeriod) / 6;
                        break;
                    case "5":
                        distance_per_month = parseFloat(form.distance.noCarToJob.distancePerPeriod) / 12;
                        break;
                    default:
                        throw "Error calculating Driving distance and Time spent in driving"
                }
                driving_distance.drive_per_year = distance_per_month * 12;
            }
        }
        //form.type_calc_fuel == 'km', thus get distance information from form part 2
        else if(form.fuel.typeOfCalculation == 'km'){
            if(form.take_car_to_job == 'true'){
                driving_distance.drive_to_work_days_per_week = form.days_p_week;
                driving_distance.dist_home_job = parseInt(form.distance_home2job);
                driving_distance.journey_weekend = parseInt(form.distance_weekend);
                driving_distance.aver_drive_per_week = 2 * driving_distance.drive_to_work_days_per_week *
                    driving_distance.dist_home_job + driving_distance.journey_weekend;
            }
            driving_distance.drive_per_year = distance_per_month * 12;
        }
        else{
            throw "Error calculating Driving distance and Time spent in driving";
        }

        //Time spent in driving
        time_spent_driving = {
            time_home_job: 0,          //time (in minutes) driven between home and job
            time_weekend: 0,           //time (in minutes) driven during weekends
            min_drive_per_week: 0,     //time (in minutes) driven per week
            min_drive_per_day: 0,      //time (in minutes) driven per day
            days_drive_per_month: 0,   //number of days driven per month
            hours_drive_per_month: 0,  //number of hours driven per month
            hours_drive_per_year: 0    //number of hours driven per year
        };

        if(form.take_car_to_job == 'true' || form.distance.considerCarToJob == 'true'){
            time_spent_driving.time_home_job = parseInt(form.timeSpentInDriving.option1.minutesBetweenHomeAndJob);
            time_spent_driving.time_weekend = parseInt(form.timeSpentInDriving.option1.minutesDuringWeekend);
            time_spent_driving.min_drive_per_week = 2 * time_spent_driving.time_home_job *
                driving_distance.drive_to_work_days_per_week + time_spent_driving.time_weekend;
            time_spent_driving.hours_drive_per_month = 365.25 / 7 / 12 * time_spent_driving.min_drive_per_week / 60;
        }
        else{
            time_spent_driving.min_drive_per_day = parseInt(form.timeSpentInDriving.option2.minutesPerDay);
            time_spent_driving.days_drive_per_month = parseInt(form.timeSpentInDriving.option2.daysPerMonth);
            time_spent_driving.hours_drive_per_month = time_spent_driving.min_drive_per_day *
                time_spent_driving.days_drive_per_month / 60;
        }

        time_spent_driving.hours_drive_per_year = time_spent_driving.hours_drive_per_month * 12;

        kinetic_speed = driving_distance.drive_per_year / time_spent_driving.hours_drive_per_year;

        //Virtual/Consumer Speed calculated if info of Financial Effort is available
        if (form.financialEffort.isOk){
            virtual_speed = driving_distance.drive_per_year /
                (time_spent_driving.hours_drive_per_year + fin_effort.hours_per_year_to_afford_car);
        }

    }//EOF Driving distance and Time spent in driving

    var running_costs_p_unit_distance, total_costs_p_unit_distance;
    if(isDef(distance_per_month)){
        //running costs per unit dist.
        running_costs_p_unit_distance = total_running_costs_month / distance_per_month;
        //total costs per unit dist.
        total_costs_p_unit_distance = total_costs_month / distance_per_month;
    }
    else{
        running_costs_p_unit_distance = undefined;
        total_costs_p_unit_distance = undefined;
    }

    //************* External costs object *************
    var externalCosts = {
        handbook_extern_URL: 'http:\/\/ec.europa.eu\/transport\/themes\/sustainable\/doc\/2008_costs_handbook.pdf',
        polution: 0.005,      //pollutants in €/km
        ghg: 0.007,           //greenhouse gases in €/km
        noise: 0.004,         //noise in €/km
        fatalities: 0.03,     //traffic fatalities in €/km
        congestion: 0.1,      //congestion in €/km
        infrastr: 0.001,      //infrastructures in €/km
        total_exter: function() {
            return (this.polution + this.ghg + this.noise + 
                    this.fatalities + this.congestion + this.infrastr) * 
                    distance_per_month;
        },
        total_costs: function() { 
            return this.total_exter(); 
        }
    };

    //object to be returned by the function
    var output = {
        //object fields
        monthly_costs: monthlyCosts,                     //object with the calculated monthly costs

        public_transports: undefined,                    //object with the car-alternative public transports costs
        alternative_to_car_costs_calculated: false,

        fin_effort: undefined,                           //object with financial effort variables
        fin_effort_calculated: false,

        driving_distance: undefined,                     //object with driving distance variables
        driving_distance_calculated: false,

        time_spent_driving: undefined,                   //object with Time spent in driving variables
        time_spent_driving_calculated: false,

        external_costs: externalCosts,                   //object with the external costs

        //variable fields
        distance_per_month: distance_per_month,          //distance travelled per month (in the standard distance)
        age_months: age_months,                          //car age in months
        //credit
        month_cred: creditObject.period,                //number of monthly credit instalments
        total_interests: creditObject.totalInterests,  //total interests paid by the credit
        //fuel
        fuel_period_km: form.fuel.distanceBased.noCarToJob.period,
        fuel_cost_period: form.fuel.currencyBased.period,
        //tolls
        tolls_period: form.tolls.noBasedOnDay.period,
        //fines
        fines_period: form.fines.period,
        //washing
        washing_period: form.washing.period,

        //total costs
        total_standing_costs_month: total_standing_costs_month,
        total_running_costs_month: total_running_costs_month,
        total_costs_month: total_costs_month,
        total_costs_year: total_costs_year,
        total_costs_ever : total_costs_ever,
        running_costs_p_unit_distance: running_costs_p_unit_distance,
        total_costs_p_unit_distance: total_costs_p_unit_distance,

        //speed
        kinetic_speed: undefined,           //average kinetic speed
        virtual_speed: undefined            //average consumer/virtual speed
    };

    if (form.publicTransports.isOk){
        output.alternative_to_car_costs_calculated = true;
        output.public_transports = public_transports;
    }
    
    if (form.financialEffort.isOk){
        output.fin_effort_calculated = true;
        output.fin_effort = fin_effort;
        output.virtual_speed = virtual_speed;
    }
    
    if (form.publicTransports.isOk || form.financialEffort.isOk){
        output.driving_distance = driving_distance;
        output.driving_distance_calculated = true;
        output.time_spent_driving = time_spent_driving;
        output.time_spent_driving_calculated = true;
        output.kinetic_speed = kinetic_speed;
    }

    //alert(JSON.stringify(output, null, 4));
    return output;
}

//gets uber object to compare uber costs with private car costs
function get_uber(uber_obj, data, country){
/* uber_obj is an object with four properties:
   cost_per_distance, cost_per_minute, currency_code, distance_unit
   data is the object output of function calculate_costs  */

    //if public transporst information was not obtained from user
    //in form part 3, then leaves by returning false
    if(!(data.alternative_to_car_costs_calculated)){
        return false;
    }

    //if distance information not available or zero
    if(!isDef(data.distance_per_month)){
        return false;
    }

    //checks if uber_obj is an object
    if (!isObjDef(uber_obj)){
        return false;
    }

    //checks if the uber currency is the same as the user's
    if ((uber_obj.currency_code).toUpperCase() != (country.currency).toUpperCase()){
        return false;
    }

    //checks if the uber distance unit is the same as the user's
    var uber_du = (uber_obj.distance_unit).toLowerCase();
    if (country.distance_std == 1){ //according to countries' standards file, 1 means "km"
        if (uber_du != "km"){
            return false;
        }
    }
    else if (country.distance_std == 2) { //according to countries' standards file, 1 means "mile"
        if (uber_du!="mile" && uber_du!="miles" && uber_du!="mi" && uber_du!="mi."){
            return false;
        }
    }
    else{
        return false;
    }
    //from here uber strandards (currency and distance) are the same as the user country

    var total_costs_by_uber, other_public_transports, result_type, dist_uber, delta;

    var ucd = uber_obj.cost_per_distance*1;            //uber cost per unit distance
    var ucm = uber_obj.cost_per_minute*1;              //uber costs per minute
    var tcpt = data.public_transports.total_price_pt;  //total costs public transports (monthly passes for family)
    var dpm = data.distance_per_month;                 //total distance per month
    var tcpd = data.total_costs_p_unit_distance;       //total costs per unit distance    
    var hdpm = data.time_spent_driving.hours_drive_per_month;     //hours driven per month
    var mdpm = data.time_spent_driving.hours_drive_per_month*60;  //minutes driven per month
    
    var tcpm = data.total_costs_month;                 //total costs per month

    //total costs of uber for the same distance and time as the ones driven using private car
    //Total equivalent Uber Costs
    var tuc = ucd * dpm + ucm * mdpm;

    //1st case, in which driver can replace every journey by uber
    if ( tuc < tcpm ){
        result_type = 1;
        
        delta = tcpm-tuc;
        
        total_costs_by_uber = tuc;
        other_public_transports = delta;
    }
    
    //2nd case, where uber equivalent is more expensive
    //tries to combine uber with other public transports less expensive per unit-distance
    else {
        result_type = 2;

        //if public transports (with monthly pass) are not an option
        if(!data.public_transports.display_pt()) {
            return false;
        }

        //amount that is left to uber after public transports (monthly passes) are paid
        delta = tcpm - tcpt;
        if(delta < 0){
            return false;
        }

        //how many distance (km or miles) can be done by uber with delta
        dist_uber = delta /(ucd-ucm*data.kinetic_speed/60);

        if (dist_uber < 0){
            return false;
        }        
        
        total_costs_by_uber = delta;
        other_public_transports = tcpt;
    }
    
    //object to be returned by this function
    var resUberObj = {
        total_costs_by_uber: total_costs_by_uber,           //total costs for using uber independently of result type
        other_public_transports : other_public_transports,  //Amount available to other public independently of result type
        result_type: result_type,    //result type: 1 or 2
        ucd: ucd,                    //uber cost per unit distance
        ucm: ucm,                    //uber costs per minute
        tuc: tuc,                    //total uber costs for the same distance and time as the ones driven using private car
        dpm: dpm,                    //total distance per month
        hdpm: hdpm,                  //hours driven per month
        mdpm: mdpm,                  //minutes driven per month
        tcpd: tcpd,                  //total costs per unit distance
        tcpm: tcpm,                  //total costs per month
        dist_uber:dist_uber,         //in case result_type is 2, how many distance can be done with uber
        tcpt: tcpt,                  //total costs public transports (monthly passes for family)
        delta: delta                 //money that is left. Meaning depends on result_type
    };

    return resUberObj;
}


