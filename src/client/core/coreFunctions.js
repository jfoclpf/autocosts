/*************** CORE JS FUNCTIONS *************************/
//===========================================================
//see also: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function

//CALCULATOR MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

var calculator = (function(){

    var inputData;          //input data object, for example obtained from user form
    var country;            //object containing information about the selected country
    var calculatedData;     //output object
    
    var consts = {
        numberOfDaysInAYear:   365.25,
        numberOfDaysInAWeek:   7,
        numberOfMonthsInAYear: 12,
        numberOfWeeksInAYear:  365.25 / 7,
        numberOfWeeksInAMonth: 365.25 / 7 / 12
    };

    var errMsgDataCountry = "Input data or input country not defined. Class not initialized with function calculateCosts";
    
    function initializeCalculatedData(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        //object to be returned by the function calculateCosts
        //for the object full structure see: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function#output
        calculatedData = {
            costs: undefined,
            speeds: undefined,
            publicTransports: {
                calculated: false
            },
            financialEffort: {
                calculated: false
            },
            drivingDistance: {
                calculated: false
            },
            timeSpentInDriving: {
                calculated: false
            },
            externalCosts: {
                calculated: false
            },
            uber:{
                calculated: false
            },
            details: {
                numberOfDaysPerWeekUserDrivesToJob: undefined,
                ageOfCarInMonths:                   undefined,
                credit:{
                    numberOfMonthlyInstalments:     undefined,
                    totalPaidInInterests:           undefined
                }
            },
            unitsOfMeasurement: {
                speed:              country.speed_std,    //"km/h", "mi/h", etc.
                distance:           country.distance_std, //"km", "mi", etc.
                currency:           country.currency
            },
            countryCode: country.countryCode
        };
    }    

    function differenceBetweenDates(date1, date2) {//return the difference in months between two dates date2-date1
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

        var monthlyCost;
        var totalInterests;
        var numberOfMonthlyInstalments;

        if(credit.creditBool == "true") { //if there was credit

            numberOfMonthlyInstalments = parseInt(credit.yesCredit.numberInstallments);
            var amountInstallment      = parseFloat(credit.yesCredit.amountInstallment);
            var residualValue          = parseFloat(credit.yesCredit.residualValue);
            var borrowedAmount         = parseFloat(credit.yesCredit.borrowedAmount);

            totalInterests = (numberOfMonthlyInstalments * amountInstallment + residualValue) - borrowedAmount;

            if(totalInterests < 0){
                totalInterests = 0;
            }

            if(ageInMonths >= numberOfMonthlyInstalments){
                monthlyCost = parseFloat(totalInterests / ageInMonths);
            }
            else{
                monthlyCost = parseFloat(totalInterests / numberOfMonthlyInstalments);
            }
        }
        else if(credit.creditBool == "false") {
            monthlyCost = 0;
        }
        else{
            throw "Error calculating credit";
        }

        return{ 
            monthlyCost:                monthlyCost,
            numberOfMonthlyInstalments: numberOfMonthlyInstalments,
            totalInterests:             totalInterests
        };
    }

    function calculateMonthlyInspection(inspection, ageInMonths) {

        if(parseFloat(inspection.numberOfInspections) > 0){
            return (parseFloat(inspection.numberOfInspections) * parseFloat(inspection.averageInspectionCost)) / ageInMonths;
        }
        else{
            return 0;
        }
    }

    function calculateMonthlyTaxes(roadTaxes) {
        return  parseFloat(roadTaxes.amountPerYear)/12;
    }

    function calculateMonthlyFuel(fuel, country){

        var monthlyCost;       //monthly fuel costs in standard currency
        var distancePerMonth;  //distance per month in standard unit

        var errMsg = "Error calculating fuel";

        switch(fuel.typeOfCalculation){

            case "km": //fuel costs calculation based on distance

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

                    //converts distance unit to kilometres
                    var distancePerMonthInKms = convert_std_dist_to_km(distancePerMonth, country.distance_std);
                    monthlyCost = fuelEffL100km * distancePerMonthInKms * fuelPriceOnCurrPerLitre / 100;
                }
                else if (fuel.distanceBased.considerCarToJob == "true"){   //make calculation considering the user takes his car to work on a daily basis

                    //if miles were chosen must convert input to kilometres
                    var distanceHomeToJobInKms = convert_std_dist_to_km(fuel.distanceBased.carToJob.distanceBetweenHomeAndJob, country.distance_std);
                    var distanceOnWeekendsInKms = convert_std_dist_to_km(fuel.distanceBased.carToJob.distanceDuringWeekends, country.distance_std);
                    var daysPerWeekUserDrivesToJob = parseInt(fuel.distanceBased.carToJob.daysPerWeek);

                    var totalKmPerMonth = (2 * distanceHomeToJobInKms * daysPerWeekUserDrivesToJob + distanceOnWeekendsInKms) * consts.numberOfWeeksInAMonth;
                    monthlyCost = fuelEffL100km * totalKmPerMonth * fuelPriceOnCurrPerLitre / 100;                    
                    
                    //after computation is made, convert backwards to standard distance
                    distancePerMonth = convert_km_to_std_dist(totalKmPerMonth, country.distance_std);
                }
                else{
                    throw errMsg;
                }

                break;

            case "euros": //fuel costs calculation based on money

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

                distancePerMonth = undefined;

                break;

            default:
                throw errMsg;
        }

        return {
            monthlyCost:      monthlyCost,
            distancePerMonth: distancePerMonth
        };            
    }

    function calculateMonthlyMaintenance(maintenance) {
        return parseFloat(maintenance.amountPerYear)/12;
    }

    function calculateMonthlyRepairsAndImprovements(repairsImprovements) {
        return parseFloat(repairsImprovements.amountPerYear)/12;
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

    function calculateMonthlyCosts(){

        var today = new Date();
        var acquisitionDate = new Date(inputData.depreciation.acquisitionYear, inputData.depreciation.acquisitionMonth - 1);
        var ageInMonths = differenceBetweenDates(acquisitionDate, today);

        if(ageInMonths <= 0){
            throw "Age of vehicle invalid or equals zero";
        }

        var costs = {
            totalPerYear: undefined,
            totalEver:    undefined,

            perMonth: {
                items: {
                    depreciation:        calculateMonthlyDepreciation(inputData.depreciation, ageInMonths),
                    insurance:           calculateInsuranceMonthlyValue(inputData.insurance),
                    credit:              calculateInterestsMonthlyValue(inputData.credit, ageInMonths).monthlyCost,
                    inspection:          calculateMonthlyInspection(inputData.inspection, ageInMonths),
                    roadTaxes:           calculateMonthlyTaxes(inputData.roadTaxes),
                    fuel:                calculateMonthlyFuel(inputData.fuel, country).monthlyCost,
                    maintenance:         calculateMonthlyMaintenance(inputData.maintenance),
                    repairsImprovements: calculateMonthlyRepairsAndImprovements(inputData.repairsImprovements),
                    parking:             calculateMonthlyParking(inputData.parking),
                    tolls:               calculateMonthlyTolls(inputData.tolls),
                    fines:               calculateMonthlyFines(inputData.fines),
                    washing:             calculateMonthlyWashing(inputData.washing)
                },

                standingCosts: undefined,
                runningCosts:  undefined,
                total:         undefined
            },

            perUnitDistance: { //per "km", per "mile", etc.
                runningCosts:  undefined,
                totalCosts:    undefined
            }
        };

        var monthlyCosts = costs.perMonth.items;

        //total standing costs
        var totalStandingCostsPerMonth = monthlyCosts.insurance + monthlyCosts.depreciation + monthlyCosts.credit +
                                         monthlyCosts.inspection + 0.5 * monthlyCosts.maintenance + monthlyCosts.roadTaxes;

        //total running costs
        var totalRunningCostsPerMonth = monthlyCosts.fuel + 0.5 * monthlyCosts.maintenance +
                                        monthlyCosts.repairsImprovements + monthlyCosts.parking +
                                        monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing;

        //totals
        var totalCostsPerMonth = monthlyCosts.insurance + monthlyCosts.fuel + monthlyCosts.depreciation +
                                 monthlyCosts.credit + monthlyCosts.inspection + monthlyCosts.maintenance +
                                 monthlyCosts.repairsImprovements + monthlyCosts.roadTaxes + monthlyCosts.parking +
                                 monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing;

        var totalCostsPerYear = totalCostsPerMonth * 12;

        var totalCostsEver = totalCostsPerMonth * ageInMonths;

        //details        
        calculatedData.details.ageOfCarInMonths = ageInMonths;
        var creditObj = calculateInterestsMonthlyValue(inputData.credit, ageInMonths);
        calculatedData.details.credit.numberOfMonthlyInstalments = creditObj.numberOfMonthlyInstalments;
        calculatedData.details.credit.totalPaidInInterests = creditObj.totalInterests;
        
        costs.perMonth.items = monthlyCosts;
        costs.perMonth.standingCosts = totalStandingCostsPerMonth;
        costs.perMonth.runningCosts = totalRunningCostsPerMonth;
        costs.perMonth.total = totalCostsPerMonth;
        costs.totalPerYear = totalCostsPerYear;
        costs.totalEver = totalCostsEver;

        calculatedData.costs = costs;

        return costs;
    }

    function calculatePublicTransports(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        //Object for public transports as an alternative to car usage
        //i.e., how much of public transports could be used with the same amount
        //of money that the user spends totally with automobile
        var publicTransports = {
            calculated:    false,                                   //boolean whether the public transports info was calculated
            toBeDisplayed: false,                                   //boolean whether makes sense to display public transports
            totalCostsOfStandardPublicTransports: undefined,        //total costs of public transports in the city with monthly pass
            furtherPublicTransports: {                              //further alternative public transports (intercity train, outside residence city, etc.),
                display:    false,                                  //boolean for further alternative public transports
                totalCosts: undefined                               //costs set to these further public transports
            },
            taxi: {
                totalCosts:                 undefined,              //usage of taxi as an alternative to car
                costPerUnitDistance:        country.taxi_price,     //average price of taxi per unit distance
                possibleDistanceDoneByTaxi: undefined               //km/miles/etc. that could be done by taxi with amount of taxiCosts
            },
            totalAlternativeCostsWhenUserHasNoCar: undefined,       //total alternative costs by not having a car
            ratios: {
                ptCostsOverCarCosts:                    undefined,  //real public transports costs over car costs ratio
                ptCostsOverCarCostsThresholdForShowPt:        0.9,  //ratio (costs of public transports)/(car costs),
                                                                    //under which it shows public transports as an alternative
                ptCostsOverCarCostsThresholdForShowFurtherPt: 0.6   //ratio of (costs of public transports)/(car costs)
                                                                    //under which shows further public transports (intercity trains for example)
            }
        };

        var pt = publicTransports;

        var totalCarCostsPerMonth = calculatedData.costs.perMonth.total;

        var costOfEachMonthlyPass  = parseFloat(inputData.publicTransports.monthlyPassCost);
        var numberOfPeopleInFamily = parseInt(inputData.publicTransports.numberOfPeopleInFamily);

        var totalCostsOfStandardPt = costOfEachMonthlyPass * numberOfPeopleInFamily;
        pt.totalCostsOfStandardPublicTransports = totalCostsOfStandardPt;


        //boolean function that says if public transports are shown
        var ratio = pt.ratios.ptCostsOverCarCostsThresholdForShowPt;
        pt.toBeDisplayed = (totalCostsOfStandardPt < ratio * totalCarCostsPerMonth) && costOfEachMonthlyPass > 0;

        if(pt.toBeDisplayed) {

            var taxiTotalCostsPerMonth;

            pt.totalAlternativeCostsWhenUserHasNoCar = totalCostsOfStandardPt;

            pt.ratios.ptCostsOverCarCosts = totalCostsOfStandardPt / totalCarCostsPerMonth;

            //in case further public transports are not shown, further shows just taxi
            if(pt.ratios.ptCostsOverCarCosts > pt.ratios.ptCostsOverCarCostsThresholdForShowFurtherPt){
                pt.furtherPublicTransports.display = false;

                taxiTotalCostsPerMonth = totalCarCostsPerMonth - totalCostsOfStandardPt;

                pt.totalAlternativeCostsWhenUserHasNoCar += taxiTotalCostsPerMonth;
            }
            //in case further public transports are shown,
            //half of the remainder goes to taxi and other half goes to further public transports
            else{
                pt.furtherPublicTransports.display = true;

                taxiTotalCostsPerMonth = totalCarCostsPerMonth * (1 - pt.ratios.ptCostsOverCarCosts) / 2;

                //amount allocated to further Public Transports, besides monthly pass and taxi
                pt.furtherPublicTransports.totalCosts = totalCarCostsPerMonth * (1 - pt.ratios.ptCostsOverCarCosts) / 2;

                pt.totalAlternativeCostsWhenUserHasNoCar += taxiTotalCostsPerMonth + pt.furtherPublicTransports.totalCosts;
            }

            pt.taxi.totalCosts = taxiTotalCostsPerMonth;
            pt.taxi.possibleDistanceDoneByTaxi = taxiTotalCostsPerMonth / pt.taxi.costPerUnitDistance;
        }

        pt.calculated = true;
        calculatedData.publicTransports = pt;

        return pt;
    }

    function calculateFinancialEffort(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }
        
        var errMsg = "Error calculating Financial Effort";
        
        var totalCostsPerYear = calculatedData.costs.totalPerYear;        
        if(totalCostsPerYear === undefined){
            throw errMsg;
        }

        var financialEffort = {
            calculated: false,            //boolean whether the public transports info was calculated
            income: {
                averagePerHour:  undefined,
                averagePerWeek:  undefined,
                averagePerMonth: undefined,
                perYear:         undefined
            },
            workingTime: {
                hoursPerWeek:  undefined,     //hours of work per week
                weeksPerYear:  undefined,     //weeks of work per year
                monthsPerYear: undefined,     //months of work per year
                hoursPerMonth: undefined,     //average total working hours per month
                hoursPerYear:  undefined      //average total working hours per year
            },
            totalCarCostsPerYear:            undefined,  //total costs per year
            workingHoursPerYearToAffordCar:  undefined,  //hours per year to afford the car
            workingMonthsPerYearToAffordCar: undefined,  //months per year to afford the car
            daysForCarToBePaid:              undefined,  //number of days till the car is paid
            financialEffortPercentage:       undefined   //percentage of income that car costs represent
        };

        var fe = financialEffort;

        //income
        var incomePeriod = inputData.income.incomePeriod;
        switch(incomePeriod){
            case 'year':
                fe.income.perYear = parseFloat(inputData.income.year.amount) * 1;
                break;
            case 'month':
                fe.income.perYear = parseFloat(inputData.income.month.amountPerMonth) * parseFloat(inputData.income.month.monthsPerYear);
                break;
            case 'week':
                fe.income.perYear = parseFloat(inputData.income.week.amountPerWeek) * parseFloat(inputData.income.week.weeksPerYear);
                break;
            case 'hour':
                fe.workingTime.hoursPerWeek = parseFloat(inputData.income.hour.hoursPerWeek);
                fe.workingTime.weeksPerYear = parseFloat(inputData.income.hour.weeksPerYear);
                fe.income.perYear = parseFloat(inputData.income.hour.amountPerHour) * fe.workingTime.hoursPerWeek * fe.workingTime.weeksPerYear;
                break;
            default:
                throw errMsg;
        }
        fe.income.averagePerMonth = fe.income.perYear / 12;
        fe.income.averagePerWeek = fe.income.perYear / consts.numberOfWeeksInAYear;

        //working time
        //uses inputData section "income", as the income was selected per hour
        if(incomePeriod == 'hour'){
            fe.workingTime.hoursPerYear = fe.workingTime.hoursPerWeek * fe.workingTime.weeksPerYear;
            fe.workingTime.hoursPerMonth = fe.workingTime.hoursPerYear / 12;
        }
        //uses inputData section "working time"
        else if (incomePeriod == 'week' || incomePeriod == 'month' ||incomePeriod == 'year'){
            if(inputData.workingTime.isActivated == 'true'){
                fe.workingTime.hoursPerWeek  = parseFloat(inputData.workingTime.hoursPerWeek);
                fe.workingTime.monthsPerYear = parseFloat(inputData.workingTime.monthsPerYear);
            }
            //if user doesn't input, use standard values
            else {
                fe.workingTime.hoursPerWeek  = 36;
                fe.workingTime.monthsPerYear = 11;
            }
            
            fe.workingTime.hoursPerYear = consts.numberOfWeeksInAMonth * fe.workingTime.hoursPerWeek * fe.workingTime.monthsPerYear;
            fe.workingTime.hoursPerMonth = fe.workingTime.hoursPerYear / 12;
        }
        else{
            throw errMsg;
        }

        //find average income per hour
        fe.income.averagePerHour = fe.income.perYear / fe.workingTime.hoursPerYear;

        //extra financial effort variables
        fe.totalCarCostsPerYear            = calculatedData.costs.totalPerYear;
        fe.workingHoursPerYearToAffordCar  = totalCostsPerYear / fe.income.averagePerHour;
        fe.workingMonthsPerYearToAffordCar = totalCostsPerYear / fe.income.perYear * 12;
        fe.daysForCarToBePaid              = totalCostsPerYear / fe.income.perYear * consts.numberOfDaysInAYear;
        fe.financialEffortPercentage       = totalCostsPerYear / fe.income.perYear * 100;

        fe.calculated = true;
        calculatedData.financialEffort = fe;

        return fe;
    }

    function calculateDrivingDistance(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

            
        var distancePerWeek,              //distance driven per week
            distancePerMonth,             //distance driven per month
            distancePerYear,              //distance driven per year
            distanceBetweenHomeAndJob,    //distance between home and job (one-way)
            distanceDuringEachWeekend,    //distance the user drives during weekend
            daysPerWeekUserDrivesToJob;            

        var errMsg = "Error calculating Driving distance";

        //if fuel calculation with distance was NOT chosen in form part 2, gets distance from form part 3
        if(inputData.fuel.typeOfCalculation == 'euros'){

            if(inputData.distance.considerCarToJob == 'true'){

                daysPerWeekUserDrivesToJob = parseInt(inputData.distance.carToJob.daysPerWeek);
                distanceBetweenHomeAndJob  = parseFloat(inputData.distance.carToJob.distanceBetweenHomeAndJob);
                distanceDuringEachWeekend  = parseFloat(inputData.distance.carToJob.distanceDuringWeekends);

                distancePerWeek = 2 * distanceBetweenHomeAndJob * daysPerWeekUserDrivesToJob  + distanceDuringEachWeekend;

                distancePerMonth = consts.numberOfWeeksInAMonth * distancePerWeek; 
                distancePerYear  = distancePerMonth * 12;
            }
            else if(inputData.distance.considerCarToJob == 'false'){

                switch(inputData.distance.noCarToJob.period){
                    case "1":
                        distancePerMonth = parseFloat(inputData.distance.noCarToJob.distancePerPeriod);
                        break;
                    case "2":
                        distancePerMonth = parseFloat(inputData.distance.noCarToJob.distancePerPeriod) / 2;
                        break;
                    case "3":
                        distancePerMonth = parseFloat(inputData.distance.noCarToJob.distancePerPeriod) / 3;
                        break;
                    case "4":
                        distancePerMonth = parseFloat(inputData.distance.noCarToJob.distancePerPeriod) / 6;
                        break;
                    case "5":
                        distancePerMonth = parseFloat(inputData.distance.noCarToJob.distancePerPeriod) / 12;
                        break;
                    default:
                        throw errMsg;
                }
                distancePerYear = distancePerMonth * 12;
                distancePerWeek = distancePerMonth / consts.numberOfWeeksInAMonth;

            }
            else {
                throw errMsg;
            }

        }
        //gets distance information from form part 2, in fuel section
        else if(inputData.fuel.typeOfCalculation == 'km'){

            distancePerMonth = calculateMonthlyFuel(inputData.fuel, country).distancePerMonth;            

            if (distancePerMonth === undefined){
                throw errMsg;
            }

            if(inputData.fuel.distanceBased.considerCarToJob == 'true'){
                daysPerWeekUserDrivesToJob = parseInt(inputData.fuel.distanceBased.carToJob.daysPerWeek);
                distanceBetweenHomeAndJob  = parseFloat(inputData.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob);
                distanceDuringEachWeekend  = parseFloat(inputData.fuel.distanceBased.carToJob.distanceDuringWeekends);

                distancePerWeek = 2 * distanceBetweenHomeAndJob * daysPerWeekUserDrivesToJob + distanceDuringEachWeekend;
            }
            else{
                distancePerWeek = distancePerMonth / consts.numberOfWeeksInAMonth;  
            }
            
            distancePerYear = distancePerMonth * 12;
            
        }
        else{
            throw errMsg;
        }

        //details
        calculatedData.details.numberOfDaysPerWeekUserDrivesToJob = daysPerWeekUserDrivesToJob;
        
        var drivingDistance = {
            calculated:         true,                       //boolean
            perWeek:            distancePerWeek,            //distance driven per week
            perMonth:           distancePerMonth,           //distance driven per month
            perYear:            distancePerYear,            //distance driven per year
            betweenHomeAndJob:  distanceBetweenHomeAndJob,  //distance between home and job (one-way)
            duringEachWeekend:  distanceDuringEachWeekend,  //distance the user drives during weekend
            details: {
                daysPerWeekUserDrivesToJob: daysPerWeekUserDrivesToJob
            }
        };        
        
        calculatedData.drivingDistance = drivingDistance;

        return drivingDistance;

    }

    function calculateTimeSpentInDriving(){     

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        var errMsg = "Error calculating Time Spent In Driving";                
        
        var minutesBetweenHomeAndJob,   //time (in minutes) driven between home and job
            minutesInEachWeekend,       //time (in minutes) driven during weekends
            minutesPerWeek,             //time (in minutes) driven per week
            minutesPerDay,              //time (in minutes) driven per day
            daysPerMonth,               //number of days driven per month
            hoursPerMonth,              //number of hours driven per month
            hoursPerYear;               //number of hours driven per year
        
        if(inputData.fuel.distanceBased.considerCarToJob == 'true' || inputData.distance.considerCarToJob == 'true'){
            minutesBetweenHomeAndJob = parseFloat(inputData.timeSpentInDriving.option1.minutesBetweenHomeAndJob);
            minutesInEachWeekend     = parseFloat(inputData.timeSpentInDriving.option1.minutesDuringWeekend);
                        
            var daysPerWeekUserDrivesToJob = calculatedData.drivingDistance.details.daysPerWeekUserDrivesToJob;       
            if(daysPerWeekUserDrivesToJob === undefined){
                throw errMsg + ": unknown daysPerWeekUserDrivesToJob";
            }       
            
            minutesPerWeek = 2 * minutesBetweenHomeAndJob * daysPerWeekUserDrivesToJob + minutesInEachWeekend;
            hoursPerMonth  = consts.numberOfWeeksInAMonth * minutesPerWeek / 60; 
            
            minutesPerDay = minutesPerWeek / 7;
            
            daysPerMonth  = consts.numberOfWeeksInAMonth * ((minutesInEachWeekend > 0 ? 2 : 0) + daysPerWeekUserDrivesToJob) 
        }
        else{
            minutesPerDay = parseFloat(inputData.timeSpentInDriving.option2.minutesPerDay);
            daysPerMonth  = parseFloat(inputData.timeSpentInDriving.option2.daysPerMonth);
            
            hoursPerMonth  = minutesPerDay * daysPerMonth / 60;
            minutesPerWeek = hoursPerMonth / consts.numberOfWeeksInAMonth * 60; 
        }

        hoursPerYear = hoursPerMonth * 12;

        var timeSpentInDriving = {
            calculated:               true,                     
            minutesBetweenHomeAndJob: minutesBetweenHomeAndJob, //time (in minutes) driven between home and job
            minutesInEachWeekend:     minutesInEachWeekend,     //time (in minutes) driven during weekends
            minutesPerWeek:           minutesPerWeek,           //time (in minutes) driven per week
            minutesPerDay:            minutesPerDay,            //time (in minutes) driven per day
            daysPerMonth:             daysPerMonth,             //number of days driven per month
            hoursPerMonth:            hoursPerMonth,            //number of hours driven per month
            hoursPerYear:             hoursPerYear              //number of hours driven per year
        };        
        
        calculatedData.timeSpentInDriving = timeSpentInDriving;
        
        return timeSpentInDriving;
    }

    function calculateSpeeds(){

        var financialEffort     = calculatedData.financialEffort;
        var drivingDistance     = calculatedData.drivingDistance;
        var timeSpentInDriving  = calculatedData.timeSpentInDriving;

        if(!inputData || !country || !drivingDistance || !timeSpentInDriving){
            throw errMsgDataCountry;
        }

        var averageKineticSpeed,
            averageConsumerSpeed; //see for more details https://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Private_or_internal_costs
        
        averageKineticSpeed = drivingDistance.perYear / timeSpentInDriving.hoursPerYear;

        //Virtual/Consumer Speed calculated if info of Financial Effort is available
        if (financialEffort.calculated){
            averageConsumerSpeed = drivingDistance.perYear / (timeSpentInDriving.hoursPerYear + financialEffort.workingHoursPerYearToAffordCar);
        }

        var speeds = {
            averageKineticSpeed: averageKineticSpeed,            
            averageConsumerSpeed: averageConsumerSpeed 
        };        
        
        calculatedData.speeds = speeds;        

        return speeds;
    }

    function calculateExternalCosts(){
        
        //by month, source: https://ec.europa.eu/transport/themes/sustainable/doc/2008_costs_handbook.pdf    
        var externalCosts = {
            calculated:      false,      //boolean
            handbookOfeExternalCostsURL: 'http:\/\/ec.europa.eu\/transport\/themes\/sustainable\/doc\/2008_costs_handbook.pdf',
            polution:        0.005,      //pollutants in €/km
            greenhouseGases: 0.007,      //greenhouse gases in €/km
            noise:           0.004,      //noise in €/km
            fatalities:      0.03,       //traffic fatalities in €/km
            congestion:      0.1,        //congestion in €/km
            infrastr:        0.001,      //infrastructures in €/km
            totalPerMonth:   undefined
        }; 
        
        var ec = externalCosts;
        
        //converts distance unit to kilometres
        var distancePerMonthInKms = convert_std_dist_to_km(calculatedData.drivingDistance.perMonth, country.distance_std);

        ec.totalPerMonth = (ec.polution + ec.greenhouseGases + ec.noise + ec.fatalities + ec.congestion + ec.infrastr) * distancePerMonthInKms;

        ec.calculated = true;
        calculatedData.externalCosts = ec;

        return ec;
    }

    //gets uber object to compare uber costs with private car costs
    function calculateUberCosts(uberObj){        

        if(!inputData || !country){
            throw errMsgDataCountry;
        }
        
        /* uberObj is an object with four properties:
        cost_per_distance, cost_per_minute, currency_code, distance_unit
        inputData is the object output of function calculate_costs  */

        //if public transporst information was not obtained from user
        //in form part 3, then leaves by returning false
        if(!(calculatedData.publicTransports.calculated)){
            return false;
        }

        //if distance information not available or zero
        if(!isDef(calculatedData.drivingDistance.perMonth)){
            return false;
        }

        //checks if uberObj is an object
        if (!isObjDef(uberObj)){
            return false;
        }

        //checks if the uber currency is the same as the user's
        if ((uberObj.currency_code).toUpperCase() != (country.currency).toUpperCase()){
            return false;
        }

        //checks if the uber distance unit is the same as the user's
        var uberStandardDistanceUnit = (uberObj.distance_unit).toLowerCase();
        if (country.distance_std == 1){ //according to countries' standards file, 1 means "km"
            if (uberStandardDistanceUnit != "km"){
                return false;
            }
        }
        else if (country.distance_std == 2) { //according to countries' standards file, 1 means "mile"
            if (uberStandardDistanceUnit != "mile" && 
                uberStandardDistanceUnit != "miles" && 
                uberStandardDistanceUnit != "mi" && 
                uberStandardDistanceUnit != "mi."){
                return false;
            }
        }
        else{
            return false;
        }
        //from here uber strandards (currency and distance) are the same as the user country
        
        var totalUberCosts, 
            publicTransportsCostsCombinedWithUber, 
            distanceDoneWithUber,
            resultType; //1 or 2            

        var uberCostPerUnitDistance              = parseFloat(uberObj.cost_per_distance);
        var uberCostPerMinute                    = parseFloat(uberObj.cost_per_minute); 
                
        var drivingDistancePerMonth              = calculatedData.drivingDistance.perMonth;            
        var minutesDrivenPerMonth                = calculatedData.timeSpentInDriving.hoursPerMonth*60;
        var totalCarCostsPerMonth                = calculatedData.costs.perMonth.total;

        //total costs of uber for the same distance and time as the ones driven using private car
        //Total equivalent Uber Costs
        var uberCostsByFullyReplacingCarWithUber = uberCostPerUnitDistance * drivingDistancePerMonth + uberCostPerMinute * minutesDrivenPerMonth;

        //1st case, in which driver can replace every journey by uber
        //the remianing amount of money is used to further public transports
        if ( uberCostsByFullyReplacingCarWithUber < totalCarCostsPerMonth ){
            resultType = 1;
            
            publicTransportsCostsCombinedWithUber = totalCarCostsPerMonth - uberCostsByFullyReplacingCarWithUber;
            totalUberCosts                        = uberCostsByFullyReplacingCarWithUber;
            distanceDoneWithUber                  = drivingDistancePerMonth;
        }
        //2nd case, where replacing every distance (km, mile, etc.) with uber is more expensive
        //tries to combine uber with public transports less expensive per unit-distance
        else {
            resultType = 2;

            //if public transports (with monthly pass) are not an option
            if(!calculatedData.publicTransports.toBeDisplayed) {
                return false;
            }
            
            //in this case, monthly passes for whole family
            publicTransportsCostsCombinedWithUber = calculatedData.publicTransports.totalCostsOfStandardPublicTransports; 

            //amount that is left to uber after public transports (monthly passes) are paid
            totalUberCosts = totalCarCostsPerMonth - publicTransportsCostsCombinedWithUber;
            if(totalUberCosts < 0){
                return false;
            }

            //how much distance (km or miles) can be done by uber with totalUberCosts amount of money
            var averageSpeedInDistancePerMinutes = calculatedData.speeds.averageKineticSpeed / 60; //convert, for ex. km/h to km/minute
            //the following formula results from solving and finding "distanceDoneWithUber" in the following equation:
            //totalUberCosts =  uberCostPerUnitDistance * distanceDoneWithUber + uberCostPerMinute * timeInMinutes
            //where: timeInMinutes = distanceDoneWithUber/ averageSpeedInDistancePerMinutes
            distanceDoneWithUber = totalUberCosts/ (uberCostPerUnitDistance + uberCostPerMinute/averageSpeedInDistancePerMinutes);

            if (distanceDoneWithUber < 0){                
                return false;
            }
        }

        //object to be returned
        var uber = { 
            calculated: true,
            resultType: resultType,    //result type: 1 or 2            
            uberCosts: {
                perUnitDistance:             uberCostPerUnitDistance,
                perMinute:                   uberCostPerMinute,
                byFullyReplacingCarWithUber: uberCostsByFullyReplacingCarWithUber,
                total:                       totalUberCosts            
            },            
            publicTransportsCostsCombinedWithUber: publicTransportsCostsCombinedWithUber,            
            uberStandardDistanceUnit:              uberStandardDistanceUnit,            
            distanceDoneWithUber:                  distanceDoneWithUber
        };

        calculatedData.uber = uber;
        
        return uber;
    }   
    
    function calculateCosts(inputDataObj, countryObj){
        //inputData is the raw input data, normally from user form, but also from a databse
        //country is an input object with country information
        //calculateCosts returns the object "output"
        inputData = inputDataObj;
        country = countryObj;

        initializeCalculatedData();
        calculateMonthlyCosts();

        if (inputData.publicTransports.isOk){
            calculatePublicTransports();
        }
        if (inputData.income.isOk){
            calculateFinancialEffort();
        }

        if (inputData.income.isOk || inputData.publicTransports.isOk){
            calculateDrivingDistance();
            calculateTimeSpentInDriving();
        }

        calculateSpeeds();
        calculateExternalCosts();

        if(calculatedData.drivingDistance.perMonth){
            //running costs per unit dist.
            calculatedData.costs.perUnitDistance.runningCosts = calculatedData.costs.perMonth.runningCosts /
                                                                     calculatedData.drivingDistance.perMonth;
            //total costs per unit dist.
            calculatedData.costs.perUnitDistance.totalCosts = calculatedData.costs.perMonth.total / 
                                                                   calculatedData.drivingDistance.perMonth;
        }
        
        return calculatedData;
    }


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
    
    return{
        differenceBetweenDates: differenceBetweenDates,
        calculateCosts: calculateCosts,
        calculateUberCosts: calculateUberCosts
    };

})();
