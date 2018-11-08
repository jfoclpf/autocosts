/***** CORE JS FUNCTIONS *******/
/*===========================================================*/
/*Functions which do not change the visual aspect of the page*/

var costs = {

    data:               undefined,   //input data, for example obtained from user form
    country:            undefined,   //object containing information about the selected country    
    calculatedData:     undefined,   //output object  
    
    initializeCalculatedData: function(){
    
        var data = this.data;
        var country = this.country;
        
        if(!data || !country){
            throw this.errMsgDataCountry;
        }     

        //object to be returned by the function calculateCosts
        this.calculatedData = {
            //object fields
            monthly_costs:                          undefined,    //object with the calculated monthly costs

            public_transports:                      undefined,    //object with the car-alternative public transports costs
            alternative_to_car_costs_calculated:    false,

            fin_effort:                             undefined,    //object with financial effort variables
            fin_effort_calculated:                  false,

            driving_distance:                       undefined,    //object with driving distance variables
            driving_distance_calculated:            false,

            time_spent_driving:                     undefined,    //object with Time spent in driving variables
            time_spent_driving_calculated:          false,

            external_costs:                         undefined,     //object with the external costs        
                        
            //variable fields
            distance_per_month:                     undefined,     //distance travelled per month (in the standard distance)
            age_months:                             undefined,     //car age in months
            //credit
            month_cred:                             undefined,     //number of monthly credit instalments
            total_interests:                        undefined,     //total interests paid by the credit
            //fuel
            fuel_period_km:                         data.fuel.distanceBased.noCarToJob.period,
            fuel_cost_period:                       data.fuel.currencyBased.period,
            //tolls
            tolls_period:                           data.tolls.noBasedOnDay.period,
            //fines
            fines_period:                           data.fines.period,
            //washing
            washing_period:                         data.washing.period,

            //total costs
            total_standing_costs_month:             undefined,
            total_running_costs_month:              undefined,
            total_costs_month:                      undefined,
            total_costs_year:                       undefined,
            total_costs_ever :                      undefined,
            running_costs_p_unit_distance:          undefined,
            total_costs_p_unit_distance:            undefined,

            //speed
            kinetic_speed:                          undefined,     //average kinetic speed
            virtual_speed:                          undefined      //average consumer/virtual speed
        };

    },
    
    errMsgDataCountry: "Input data or input country not defined. Class not initialized with function calculateCosts",
    
    dateDiff: function (date1, date2) {//return the difference in months between two dates date2-date1
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
    },

    calculateMonthlyDepreciation: function (depreciation, ageInMonths) {             
        return (parseFloat(depreciation.acquisitionCost) - parseFloat(depreciation.presentValue)) / ageInMonths;
    },

    calculateInsuranceMonthlyValue: function (insurance) {
    
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
    },

    calculateInterestsMonthlyValue: function (credit, ageInMonths) {
    
        var output = {
            totalInterests: 0,
            period: 0,
            monthlyCosts: 0
        };

        if(credit.creditBool == "true") { //if there was credit

            var numberInstallmentsFloat = parseFloat(credit.yesCredit.numberInstallments);
            output.period = numberInstallmentsFloat;

            var totalInterests = ((numberInstallmentsFloat * parseFloat(credit.yesCredit.amountInstallment)) + parseFloat(credit.yesCredit.residualValue)) -
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
    },

    calculateMonthlyInspection: function (inspection, ageInMonths) {    

        if(parseFloat(inspection.numberOfInspections) > 0){
            return (parseFloat(inspection.numberOfInspections) * parseFloat(inspection.averageInspectionCost)) / ageInMonths;
        }
        else{
            return 0;
        }
    },

    calculateMonthlyTaxes: function (car_tax) {    
        return  parseFloat(car_tax.amountPerYear)/12;
    },

    calculateMonthlyFuel: function (fuel, country){

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

                    var total_km = ((2 * distanceHomeToJobInKms * parseInt(fuel.distanceBased.carToJob.daysPerWeek, 10)) + distanceOnWeekendsInKms) * 
                        (30.4375 / 7);
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
    },

    calculateMonthlyMaintenance: function (maintenance) {
        return parseFloat(maintenance.amountPerYear)/12;
    },

    calculateMonthlyRepairsAndImprovements: function (repairs_improv) {
        return parseFloat(repairs_improv.amountPerYear)/12;
    },

    calculateMonthlyParking: function (parking) {
        return parseFloat(parking.amountPerMonth);
    },

    calculateMonthlyTolls: function (tolls) {

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
    },

    calculateMonthlyFines: function (fines) {
        
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
    },

    calculateMonthlyWashing: function (washing) {

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
    },

    calculateMonthlyCosts: function(){
        
        var data = this.data;
        var country = this.country;
        
        if(!data || !country){
            throw this.errMsgDataCountry;
        }        
                
        var today = new Date();
        var acquisitionDate = new Date(data.depreciation.acquisitionYear, data.depreciation.acquisitionMonth - 1);
        var ageInMonths = this.dateDiff(acquisitionDate, today);        

        //Monthly Costs object, is a field of object "output"
        var monthlyCosts = {
            depreciation:   undefined,                                                         //depreciation monthly cost
            insurance:      this.calculateInsuranceMonthlyValue(data.insurance),               //insurance monthly cost
            credit:         undefined,                                                         //interests of credit monthly cost
            inspection:     this.calculateMonthlyInspection(data.inspection, ageInMonths),     //inspection monthly costs
            car_tax:        this.calculateMonthlyTaxes(data.car_tax),                          //car tax monthly cost
            fuel:           undefined,                                                         //fuel monthly cost
            maintenance:    this.calculateMonthlyMaintenance(data.maintenance),                //maintenance monthly costs
            repairs_improv: this.calculateMonthlyRepairsAndImprovements(data.repairs_improv),  //repairs and improvements monthly cost
            parking:        this.calculateMonthlyParking(data.parking),                        //parking monthly cost
            tolls:          this.calculateMonthlyTolls(data.tolls),                            //tolls monthly cost
            fines:          this.calculateMonthlyFines(data.fines),                            //fines monthly cost
            washing:        this.calculateMonthlyWashing(data.washing)                         //washing monthly cost
        };

        //depreciation
        if(ageInMonths != 0){
            monthlyCosts.depreciation = this.calculateMonthlyDepreciation(data.depreciation, ageInMonths);
        }
        else{
            throw "Age of vehicle, calculated by depreciation section, invalid or equals zero";
        }

        //credit
        var creditObject = this.calculateInterestsMonthlyValue(data.credit, ageInMonths);    
        monthlyCosts.credit = creditObject.monthlyCosts;

        //fuel
        var fuelObject = this.calculateMonthlyFuel(data.fuel, country);                 
        monthlyCosts.fuel = fuelObject.monthlyCost;
        var distancePerMonth = fuelObject.distancePerMonth; //distance per month in the standard unit

        //total standing costs
        var totalStandingCostsPerMonth = monthlyCosts.insurance + monthlyCosts.depreciation + monthlyCosts.credit +
                                         monthlyCosts.inspection + 0.5 * monthlyCosts.maintenance + monthlyCosts.car_tax;

        //total running costs
        var totalRunningCostsPerMonth = monthlyCosts.fuel + 0.5 * monthlyCosts.maintenance + 
                                        monthlyCosts.repairs_improv + monthlyCosts.parking +
                                        monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing;

        //totals
        var totalCostsPerMonth = monthlyCosts.insurance + monthlyCosts.fuel + monthlyCosts.depreciation +
                                 monthlyCosts.credit + monthlyCosts.inspection + monthlyCosts.maintenance +
                                 monthlyCosts.repairs_improv + monthlyCosts.car_tax + monthlyCosts.parking +
                                 monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing;                

        var totalCostsPerYear = totalCostsPerMonth * 12;

        var totalCostsEver = totalCostsPerMonth * ageInMonths;
        
        //set results from this function to object calculatedData
        this.calculatedData.monthly_costs = monthlyCosts;                
        
        this.calculatedData.total_standing_costs_month = totalStandingCostsPerMonth;
        this.calculatedData.total_running_costs_month =  totalRunningCostsPerMonth;
        this.calculatedData.total_costs_month =          totalCostsPerMonth;
        this.calculatedData.total_costs_year =           totalCostsPerYear;
        this.calculatedData.total_costs_ever =           totalCostsEver;
        
        this.calculatedData.age_months = ageInMonths
        this.calculatedData.distance_per_month = distancePerMonth;   
        
        this.calculatedData.month_cred = creditObject.period;               //number of monthly credit instalments
        this.calculatedData.total_interests = creditObject.totalInterests;  //total interests paid by the credit       
        
        var output = {
            monthlyCosts:               monthlyCosts,
            distancePerMonth:           distancePerMonth,
            totalStandingCostsPerMonth: totalStandingCostsPerMonth,
            totalRunningCostsPerMonth:  totalRunningCostsPerMonth,
            totalCostsPerMonth:         totalCostsPerMonth,
            totalCostsPerYear:          totalCostsPerYear,
            totalCostsEver:             totalCostsEver        
        };            
            
        return output;        
    },
    
    calculatePublicTransports: function(){   
        
        var data = this.data;
        var country = this.country;
        
        if(!data || !country){
            throw this.errMsgDataCountry;
        }
        
        var totalCostsPerMonth = this.calculatedData.total_costs_month;
        
        //Object for public transports as an alternative to car usage
        //i.e., how much of public transports could be used with the same amount
        //of money that the user spends totally with automobile
        var publicTransports = {

            //ratio (total price of public transports)/(total price of car) 
            //under which it shows the alternatives of public transports
            ptcosts_carcosts_ratio_threshold: 0.9,  

            //ratio of costs ptcosts/carcosts under which shows other alternatives 
            //with further public transports (intercity trains for example)
            other_pt_ratio_threshold: 0.6,

            //average price of taxi per unit distance
            taxi_price_per_km:  country.taxi_price, 

            //boolean function that says if public transporst alternatives are shown
            display_pt:         undefined,
            
            total_price_pt:     undefined,  //total costs of public transports for family
            total_altern:       undefined,  //total alternative costs by not having a car
            pt_carcost_ratio:   undefined,  //public transports over car costs ratio
            taxi_cost:          undefined,  //amount set to the usage of taxi as an alternative to car
            km_by_taxi:         undefined,  //km that could be done by taxi with such amount
            display_other_pt:   false,      //boolean for further alternative public transports
            other_pt:           undefined   //amount of costs set to such alternatives
        };                       
        
        //boolean function that says if public transporst alternatives are shown
        publicTransports.display_pt = (parseFloat(data.publicTransports.monthlyPassCost) * parseInt(data.publicTransports.numberOfPeopleInFamily) < 
                                       publicTransports.ptcosts_carcosts_ratio_threshold * totalCostsPerMonth) && 
                                       parseFloat(data.publicTransports.monthlyPassCost) != 0;
        
        if(publicTransports.display_pt) {

            //total price of monthly passes
            publicTransports.total_price_pt = data.publicTransports.monthlyPassCost * data.publicTransports.numberOfPeopleInFamily;   

            publicTransports.total_altern = publicTransports.total_price_pt;
            publicTransports.pt_carcost_ratio= publicTransports.total_price_pt / totalCostsPerMonth;

            //in case other public transports are not shown
            if(publicTransports.pt_carcost_ratio > publicTransports.other_pt_ratio_threshold){

                publicTransports.display_other_pt = false;
                publicTransports.taxi_cost = totalCostsPerMonth - publicTransports.total_price_pt;

                //number of possible km/miles/distance done by taxi
                publicTransports.km_by_taxi = publicTransports.taxi_cost / publicTransports.taxi_price_per_km;
                publicTransports.total_altern += publicTransports.taxi_cost;
            }
            else{
                publicTransports.display_other_pt = true;
                publicTransports.taxi_cost = totalCostsPerMonth * (1 - publicTransports.pt_carcost_ratio) / 2;
                publicTransports.km_by_taxi = publicTransports.taxi_cost / publicTransports.taxi_price_per_km;

                //amount allocated to other Public Transports, besides monthly pass
                publicTransports.other_pt = totalCostsPerMonth * (1 - publicTransports.pt_carcost_ratio) / 2;

                publicTransports.total_altern += publicTransports.taxi_cost + publicTransports.other_pt;
            }
        }
        
        this.calculatedData.public_transports = publicTransports;
        this.calculatedData.alternative_to_car_costs_calculated = true;
        
        return publicTransports;        
    },
   
    calculateFinancialEffort: function(){
        
        var data = this.data;
        var country = this.country;
        
        if(!data || !country){
            throw this.errMsgDataCountry;
        }                        
        
        var totalCostsPerYear = this.calculatedData.total_costs_year;
        
        var errMsg = "Error calculating Financial Effort";
        if(totalCostsPerYear === undefined){
            throw errMsg;
        }
        
        //create financial effort object
        var finEffort = {
            //income
            income: undefined,                          //income amount the user has inserted
            income_per_year: undefined,                 //average income per year
            income_per_type: undefined,                 //number of income time-periods (number of months/year or weeks/year)
            income_hours_per_week: undefined,           //number of hours per week
            aver_income_per_month:undefined,            //average income per month
            aver_income_per_hour: undefined,            //average income per hour
            time_hours_per_week: 36,                    //default hours per week
            time_month_per_year: 11,                    //default months per year
            aver_work_time_per_m: undefined,            //average working time per month
            work_hours_per_y: undefined,                //total working hours per year
            //costs
            total_costs_year: totalCostsPerYear,        //total costs per year
            hours_per_year_to_afford_car: undefined,    //hours per year to afford the car
            month_per_year_to_afford_car: undefined,    //months per year to afford the car
            days_car_paid: undefined,                   //number of days till the car is paid
            percentage_of_income: undefined             //percentage of income that car costs represent
        };

        //income
        switch(data.financialEffort.incomePeriod){
            case 'year':
                finEffort.income = parseFloat(data.financialEffort.year.amount);
                finEffort.income_per_year = finEffort.income * 1;
                break;
            case 'month':
                finEffort.income = parseFloat(data.financialEffort.month.amountPerMonth);
                finEffort.income_per_type = data.financialEffort.month.monthsPerYear;
                finEffort.income_per_year = finEffort.income * finEffort.income_per_type;
                break;
            case 'week':
                finEffort.income = parseFloat(data.financialEffort.week.amountPerWeek);
                finEffort.income_per_type = data.financialEffort.week.weeksPerYear;
                finEffort.income_per_year = finEffort.income * finEffort.income_per_type;
                break;
            case 'hour':
                finEffort.income = parseFloat(data.financialEffort.hour.amountPerHour);
                finEffort.income_hours_per_week = data.financialEffort.hour.hoursPerWeek;
                finEffort.income_per_type = data.financialEffort.hour.weeksPerYear;
                finEffort.income_per_year = finEffort.income * finEffort.income_hours_per_week * finEffort.income_per_type;
                break;
            default:
                throw "Error calculating Income";
        }
        finEffort.aver_income_per_month = finEffort.income_per_year / 12;

        //working time
        if(data.financialEffort.incomePeriod != 'hour'){
            if(data.workingTime.isActivated == 'true'){
                finEffort.time_hours_per_week = parseFloat(data.workingTime.hoursPerWeek);
                finEffort.time_month_per_year = parseFloat(data.workingTime.monthsPerYear);
            }

            finEffort.aver_work_time_per_m = 365.25 / 7 * finEffort.time_hours_per_week *
                finEffort.time_month_per_year / 12 / 12;

            finEffort.work_hours_per_y = 365.25 / 7 * finEffort.time_hours_per_week * finEffort.time_month_per_year / 12;
        }

        //find Net Income per Hour 
        var a = 11; //default months per year of work
        var b = 36; //default hours per week of normal working week
        var T, x, y, n;
        //if has a job, find a=months per year of work, b=hours per week of work
        if(data.workingTime.isActivated == 'true'){
            a = parseFloat(data.workingTime.monthsPerYear);
            b = parseFloat(data.workingTime.hoursPerWeek);
        }
        T = 365.25/7 * a/12 * b; //T=number of working hours per year
        switch(data.financialEffort.incomePeriod){
            case 'year':
                x = parseFloat(data.financialEffort.year.amount);
                n = x/T;
                break;
            case 'month':
                x = parseFloat(data.financialEffort.month.amountPerMonth);
                y = parseFloat(data.financialEffort.month.monthsPerYear);
                n = (x*y)/T;
                break;
            case 'week':
                x = parseFloat(data.financialEffort.week.amountPerWeek);
                y = parseFloat(data.financialEffort.week.weeksPerYear);
                n = (x*y)/T;
                break;
            case 'hour':
                n = parseFloat(data.financialEffort.hour.amountPerHour);
                break;
            default:
                throw "Error calculating Income";                
        }
        finEffort.aver_income_per_hour = n;

        //extra financial effort variables
        finEffort.hours_per_year_to_afford_car = totalCostsPerYear / finEffort.aver_income_per_hour;
        finEffort.month_per_year_to_afford_car = totalCostsPerYear / finEffort.income_per_year * 12;
        finEffort.days_car_paid                = totalCostsPerYear / finEffort.income_per_year * 365.25;
        finEffort.percentage_of_income         = totalCostsPerYear / finEffort.income_per_year * 100;

        this.calculatedData.fin_effort = finEffort;
        this.calculatedData.fin_effort_calculated = true;
        
        return finEffort;        
    },

    calculateDrivingDistance: function(){                

        var data = this.data;
        var country = this.country;
        
        if(!data || !country){
            throw this.errMsgDataCountry;
        } 
        
        var errMsg = "Error calculating Driving distance";
        
        var distancePerMonth;        
        
        //driving distance
        var drivingDistance = {
            distance_per_month: undefined,
            drive_per_year: undefined,                      //total distance driven per year
            drive_to_work_days_per_week: undefined,         //number of days per week, the user drives to job
            dist_home_job: undefined,                       //distance between home and job (one-way)
            journey_weekend: undefined,                     //distance the user drives during weekend
            aver_drive_per_week: undefined,                 //average distance driven per week
            fuel_period_km: data.distance.noCarToJob.period //time-period for distance calculation
        };
        
        //if fuel calculation with distance was NOT chosen in form part 2, gets from form part 3
        if(data.fuel.typeOfCalculation == 'euros'){

            if(data.distance.considerCarToJob == 'true'){

                drivingDistance.drive_to_work_days_per_week = parseFloat(data.distance.carToJob.daysPerWeek);
                drivingDistance.dist_home_job               = parseFloat(data.distance.carToJob.distanceBetweenHomeAndJob);
                drivingDistance.journey_weekend             = parseFloat(data.distance.carToJob.distanceDuringWeekends);

                drivingDistance.aver_drive_per_week         = 2 * drivingDistance.drive_to_work_days_per_week *
                    drivingDistance.dist_home_job + drivingDistance.journey_weekend;

                distancePerMonth = 365.25 / 7 * drivingDistance.aver_drive_per_week / 12;
                drivingDistance.drive_per_year = 365.25 / 7 * drivingDistance.aver_drive_per_week;

            }
            else if(data.distance.considerCarToJob == 'false'){
                
                switch(drivingDistance.fuel_period_km){
                    case "1":
                        distancePerMonth = parseFloat(data.distance.noCarToJob.distancePerPeriod);
                        break;
                    case "2":
                        distancePerMonth = parseFloat(data.distance.noCarToJob.distancePerPeriod) / 2;
                        break;
                    case "3":
                        distancePerMonth = parseFloat(data.distance.noCarToJob.distancePerPeriod) / 3;
                        break;
                    case "4":
                        distancePerMonth = parseFloat(data.distance.noCarToJob.distancePerPeriod) / 6;
                        break;
                    case "5":
                        distancePerMonth = parseFloat(data.distance.noCarToJob.distancePerPeriod) / 12;
                        break;
                    default:
                        throw errMsg;
                }
                drivingDistance.drive_per_year = distancePerMonth * 12;
                
            }
            else {
                throw errMsg;
            }

        }
        //gets distance information from form part 2, fuel section
        else if(data.fuel.typeOfCalculation == 'km'){

            distancePerMonth = this.calculatedData.distance_per_month;
            
            if (distancePerMonth === undefined){
                throw errMsg;
            }
            
            if(data.fuel.distanceBased.considerCarToJob == 'true'){
                drivingDistance.drive_to_work_days_per_week = parseInt(data.fuel.distanceBased.carToJob.daysPerWeek);
                drivingDistance.dist_home_job               = parseFloat(data.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob);
                drivingDistance.journey_weekend             = parseFloat(data.fuel.distanceBased.carToJob.distanceDuringWeekends);

                drivingDistance.aver_drive_per_week         = 2 * drivingDistance.drive_to_work_days_per_week * drivingDistance.dist_home_job +
                                                              drivingDistance.journey_weekend;
            }
            drivingDistance.drive_per_year = distancePerMonth * 12;

        }
        else{
            throw errMsg;
        }
        
        this.calculatedData.distance_per_month = drivingDistance.distance_per_month = distancePerMonth;
        
        this.calculatedData.driving_distance = drivingDistance; 
        this.calculatedData.driving_distance_calculated = true;
                
        return drivingDistance;

    },

    calculateTimeSpentInDriving: function(){
        
        var data = this.data;
        var country = this.country;
        var drivingDistance = this.calculatedData.driving_distance;
        
        if(!data || !country || drivingDistance == undefined){
            throw this.errMsgDataCountry;
        }   
    
        //Time spent in driving
        var timeSpentInDriving = {
            time_home_job: undefined,          //time (in minutes) driven between home and job
            time_weekend: undefined,           //time (in minutes) driven during weekends
            min_drive_per_week: undefined,     //time (in minutes) driven per week
            min_drive_per_day: undefined,      //time (in minutes) driven per day
            days_drive_per_month: undefined,   //number of days driven per month
            hours_drive_per_month: undefined,  //number of hours driven per month
            hours_drive_per_year: undefined    //number of hours driven per year
        };

        if(data.fuel.distanceBased.considerCarToJob == 'true' || data.distance.considerCarToJob == 'true'){
            timeSpentInDriving.time_home_job        = parseFloat(data.timeSpentInDriving.option1.minutesBetweenHomeAndJob);
            timeSpentInDriving.time_weekend         = parseFloat(data.timeSpentInDriving.option1.minutesDuringWeekend);
            timeSpentInDriving.min_drive_per_week   = 2 * timeSpentInDriving.time_home_job * drivingDistance.drive_to_work_days_per_week +
                                                      timeSpentInDriving.time_weekend;
            timeSpentInDriving.hours_drive_per_month = 365.25 / 7 / 12 * timeSpentInDriving.min_drive_per_week / 60;
        }
        else{
            timeSpentInDriving.min_drive_per_day     = parseFloat(data.timeSpentInDriving.option2.minutesPerDay);
            timeSpentInDriving.days_drive_per_month  = parseFloat(data.timeSpentInDriving.option2.daysPerMonth);
            timeSpentInDriving.hours_drive_per_month = timeSpentInDriving.min_drive_per_day * timeSpentInDriving.days_drive_per_month / 60;
        }

        timeSpentInDriving.hours_drive_per_year = timeSpentInDriving.hours_drive_per_month * 12;
        
        this.calculatedData.time_spent_driving = timeSpentInDriving;
        this.calculatedData.time_spent_driving_calculated = true;
        
        return timeSpentInDriving;
    },
    
    calculateSpeeds: function (){
        
        var data                = this.data;
        var country             = this.country;
        var finEffort           = this.calculatedData.fin_effort;
        var drivingDistance     = this.calculatedData.driving_distance;
        var timeSpentInDriving  = this.calculatedData.time_spent_driving;
        
        if(!data || !country || !finEffort || !drivingDistance || !timeSpentInDriving){
            throw this.errMsgDataCountry;
        }         
        
        var speeds = {
            kineticSpeed: undefined,
            consumerSpeed:  undefined
        };
        
        speeds.kineticSpeed = drivingDistance.drive_per_year / timeSpentInDriving.hours_drive_per_year;

        console.log(speeds.kineticSpeed);
        
        //Virtual/Consumer Speed calculated if info of Financial Effort is available
        if (this.calculatedData.fin_effort_calculated){
            speeds.consumerSpeed = drivingDistance.drive_per_year / (timeSpentInDriving.hours_drive_per_year + finEffort.hours_per_year_to_afford_car);
        }   
        
        this.calculatedData.kinetic_speed = speeds.kineticSpeed;
        this.calculatedData.virtual_speed = speeds.consumerSpeed;
        
        return speeds;        
    },
    
    calculateExternalCosts: function (){
    
        var externalCosts = {
            handbook_extern_URL: 'http:\/\/ec.europa.eu\/transport\/themes\/sustainable\/doc\/2008_costs_handbook.pdf',
            polution: 0.005,        //pollutants in €/km
            ghg: 0.007,             //greenhouse gases in €/km
            noise: 0.004,           //noise in €/km
            fatalities: 0.03,       //traffic fatalities in €/km
            congestion: 0.1,        //congestion in €/km
            infrastr: 0.001,        //infrastructures in €/km
            total_exter: undefined,
            total_costs: undefined
        };

        externalCosts.total_exter = (externalCosts.polution + externalCosts.ghg + externalCosts.noise + 
                                     externalCosts.fatalities + externalCosts.congestion + externalCosts.infrastr) * this.calculatedData.distance_per_month;
        
        externalCosts.total_costs = externalCosts.total_exter; 
    
        this.calculatedData.external_costs = externalCosts; 
        
        return externalCosts;
    },
              
    calculateCosts: function (data, country){
        //data is the raw input data
        //country is an input object with country information
        //calculateCosts returns the object "output"
        this.data = data;
        this.country = country;                  
        
        this.initializeCalculatedData();        
        this.calculateMonthlyCosts();
        
        if (data.publicTransports.isOk){
            this.calculatePublicTransports();
        }
        if (data.financialEffort.isOk){
            this.calculateFinancialEffort();
        }
        
        if (data.financialEffort.isOk || data.publicTransports.isOk){
            this.calculateDrivingDistance();
            this.calculateTimeSpentInDriving();
        }        

        this.calculateSpeeds();
        this.calculateExternalCosts();
        
        var runningCostsPerUnitOfdistance, totalCostsPerUnitOfdistance;
        if(this.calculatedData.driving_distance.distance_per_month){
            //running costs per unit dist.
            runningCostsPerUnitOfdistance = this.calculatedData.total_running_costs_month / this.calculatedData.driving_distance.distance_per_month;
            //total costs per unit dist.
            totalCostsPerUnitOfdistance   = this.calculatedData.total_costs_month         / this.calculatedData.driving_distance.distance_per_month;
        }
        else{
            runningCostsPerUnitOfdistance = undefined;
            totalCostsPerUnitOfdistance   = undefined;
        }
        
        //alert(JSON.stringify(output, null, 4));
        return this.calculatedData;
    },

    //gets uber object to compare uber costs with private car costs
    getUber: function(uber_obj, data, country){
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
            if(!data.public_transports.display_pt) {
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
};

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

