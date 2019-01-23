/*************** CALCULATOR JS FUNCTIONS *************************/
//===========================================================
//see also: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function

//CALCULATOR MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules
//This file is used both by the browser and by node/commonsJS, the latter being called by getAvgFromDB.js

//check for node.js
if(!autocosts && typeof window === 'undefined'){var autocosts = {};}

autocosts.calculatorModule = (function(thisModule){

    var conversionsModule;

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

    //says if some calculated results are likely to be valid
    var isLikelyToBeValidConst = {
        financialEffortPercentage: {
            min: 5,
            max: 110
        }
    };

    var errMsgDataCountry = "Input data or input country not defined. Class not initialized with function calculateCosts";

    function initialize() {
        loadModuleDependencies();
    }

    function loadModuleDependencies(){
        if(typeof window === 'undefined'){//node
            conversionsModule = require("./conversions");
        }
        else{//browser
            conversionsModule = autocosts.calculatorModule.conversionsModule;
        }
    }

    //private method
    function initializeCalculatedData(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        //object to be returned by the function calculateCosts
        //for the object full structure see: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function#output
        calculatedData = CreateCalculatedDataObj();

        calculatedData.countryCode = country.code;
    }

    //Object Constructor for the Results, where the calculated averages are stored
    //see: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function#output
    //because it is a constructor, first letter is capital
    function CreateCalculatedDataObj(){

        var u; u = undefined;

        return {
            costs: {
                totalPerYear: u,
                totalEver: u,

                perMonth: {
                    items: {
                        depreciation: u,
                        insurance: u,
                        credit: u,
                        inspection: u,
                        roadTaxes: u,
                        fuel: u,
                        maintenance: u,
                        repairsImprovements: u,
                        parking: u,
                        tolls: u,
                        fines: u,
                        washing: u
                    },
                    standingCosts: u,
                    runningCosts: u,
                    total: u
                },

                perUnitDistance: { //"km", "mile", etc.
                    runningCosts: u,
                    totalCosts: u
                }
            },

            speeds: {
                averageKineticSpeed: u,
                averageConsumerSpeed: u //see for more details
                //https://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Private_or_internal_costs
            },

            publicTransports: {
                calculated: false,                          //boolean whether the public transports info was calculated
                toBeDisplayed: u,                           //boolean whether makes sense to display public transports
                totalCostsOfStandardPublicTransports: u,    //total costs of public transports in the city with monthly pass
                furtherPublicTransports: {                  //further alternative public transports (train, outside residence city, etc.),
                    display: false,                         //boolean for further alternative public transports
                    totalCosts: u                           //costs set to these further public transports
                },
                taxi: {
                    totalCosts: u,                          //usage of taxi as an alternative to car
                    costPerUnitDistance: u,                 //average price of taxi per unit distance
                    possibleDistanceDoneByTaxi: u           //km/miles/etc. that could be done by taxi with amount of this.taxiCosts
                },
                totalAlternativeCostsWhenUserHasNoCar: u,   //total alternative costs by not having a car
                ratios: {
                    ptCostsOverCarCosts: u,               //public transports over car costs ratio

                    //ratio (costs of public transports)/(car costs) under which it shows public transports as alternative
                    showPt: u,

                    //ratio (costs of public transports)/(car costs) under which shows other alternatives,
                    //with further public transports (intercity trains for example)
                    showFurtherPt: u
                }
            },

            financialEffort: {
                calculated: false,            //boolean whether the public transports info was calculated
                isLikelyToBeValid: false,     //says if this result is likely to be valid
                income: {
                    averagePerHour: u,
                    averagePerWeek: u,
                    averagePerMonth: u,
                    perYear: u
                },
                workingTime: {
                    hoursPerWeek: u,      //hours of work per week
                    weeksPerYear: u,      //weeks of work per year
                    monthsPerYear: u,     //months of work per year
                    hoursPerMonth: u,     //average total working hours per month
                    hoursPerYear: u       //average total working hours per year
                },
                totalCarCostsPerYear: u,               //total costs per year
                workingHoursPerYearToAffordCar: u,     //hours per year to afford the car
                workingMonthsPerYearToAffordCar: u,    //months per year to afford the car
                daysForCarToBePaid: u,                 //number of days till the car is paid
                financialEffortPercentage: u           //percentage of income that car costs represent
            },

            drivingDistance: {
                calculated: false,             //boolean
                perWeek: u,                    //average distance driven per month
                perMonth: u,                   //total distance driven per month
                perYear: u,                    //total distance driven per year
                betweenHomeAndJob: u,          //distance between home and job (one-way)
                duringEachWeekend: u,          //distance the user drives during weekend
                details: {
                    daysPerWeekUserDrivesToJob: u
                }
            },

            timeSpentInDriving: {
                calculated: false,            //boolean
                minutesBetweenHomeAndJob: u,  //time (in minutes) driven between home and job
                minutesInEachWeekend: u,      //time (in minutes) driven during weekends
                minutesPerWeek: u,            //time (in minutes) driven per week
                minutesPerDay: u,             //time (in minutes) driven per day
                daysPerMonth: u,              //number of days driven per month
                hoursPerMonth: u,             //number of hours driven per month
                hoursPerYear: u               //number of hours driven per year
            },

            externalCosts: {
                calculated: false,                //boolean
                handbookOfeExternalCostsURL: u,
                pollution: u,
                greenhouseGases: u,
                noise: u,
                fatalities: u,
                congestion: u,
                infrastructure: u,
                total: u
            },

            details: {
                numberOfDaysPerWeekUserDrivesToJob: u, //number of days per week, the user drives to job
                ageOfCarInMonths: u,
                credit:{
                    numberOfMonthlyInstalments: u,
                    totalPaidInInterests: u
                }
            },

            unitsOfMeasurement: {
                speed: u,              //km/h, mi/h
                distance: u,           //km, mi, etc.
                currency: u
            },

            countryCode: u
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

        var monthlyCost,       //monthly fuel costs in standard currency
            distancePerMonth;  //distance per month in standard unit

        var errMsg = "Error calculating fuel";

        //the results shall be: "money", "distanceNoCarToJob" or "distanceCarToJob"
        var typeOfCalculation = function(){
            switch(fuel.typeOfCalculation){
                case "distance":
                case "km":/*old version support*/
                case "kms":
                case "mile":
                case "miles":
                    switch(fuel.distanceBased.considerCarToJob){
                        case "true":
                        case true:
                            return "distanceCarToJob";
                        case "false":
                        case false:
                            return "distanceNoCarToJob";
                        default:
                            throw errMsg;
                    }
                    break;
                case "money":
                case "dollars":
                case "euros":
                    return "money";
                default:
                    throw errMsg;
            }
        };

        var getMonthlyCost = function(){

            var fuelEffL100km,
                fuelPriceOnCurrPerLitre,
                distancePerPeriod;

            //the results shall be: "money", "distanceNoCarToJob" or "distanceCarToJob"
            switch(typeOfCalculation()){

                case "distanceNoCarToJob":

                    fuelEffL100km = conversionsModule.
                        convertFuelEfficiencyToL100km(fuel.distanceBased.fuelEfficiency, country.fuel_efficiency_std);

                    fuelPriceOnCurrPerLitre = conversionsModule.
                        convertFuelPriceToLitre(fuel.distanceBased.fuelPrice, country.fuel_price_volume_std);

                    distancePerPeriod = fuel.distanceBased.noCarToJob.distancePerPeriod;

                    switch(fuel.distanceBased.noCarToJob.period){
                        case "1":
                            distancePerMonth = parseFloat(distancePerPeriod);
                            break;
                        case "2":
                            distancePerMonth = parseFloat(distancePerPeriod) / 2;
                            break;
                        case "3":
                            distancePerMonth = parseFloat(distancePerPeriod) / 3;
                            break;
                        case "4":
                            distancePerMonth = parseFloat(distancePerPeriod) / 6;
                            break;
                        case "5":
                            distancePerMonth = parseFloat(distancePerPeriod) / 12;
                            break;
                        default:
                            throw errMsg;
                    }

                    //converts distance unit to kilometres
                    var distancePerMonthInKms = conversionsModule.convertDistanceToKm(distancePerMonth, country.distance_std);
                    monthlyCost = fuelEffL100km * distancePerMonthInKms * fuelPriceOnCurrPerLitre / 100;

                    break;

                case "distanceCarToJob":

                    fuelEffL100km = conversionsModule.
                        convertFuelEfficiencyToL100km(fuel.distanceBased.fuelEfficiency, country.fuel_efficiency_std);

                    fuelPriceOnCurrPerLitre = conversionsModule.
                        convertFuelPriceToLitre(fuel.distanceBased.fuelPrice, country.fuel_price_volume_std);

                    //if miles were chosen must convert input to kilometres
                    var distanceHomeToJobInKms = conversionsModule.
                        convertDistanceToKm(fuel.distanceBased.carToJob.distanceBetweenHomeAndJob, country.distance_std);

                    var distanceOnWeekendsInKms = conversionsModule.
                        convertDistanceToKm(fuel.distanceBased.carToJob.distanceDuringWeekends, country.distance_std);

                    var daysPerWeekUserDrivesToJob = parseInt(fuel.distanceBased.carToJob.daysPerWeek);

                    var totalKmPerMonth = (2 * distanceHomeToJobInKms * daysPerWeekUserDrivesToJob + distanceOnWeekendsInKms) *
                        consts.numberOfWeeksInAMonth;

                    monthlyCost = fuelEffL100km * totalKmPerMonth * fuelPriceOnCurrPerLitre / 100;

                    //after computation is made, convert backwards to user chosen standard distance
                    distancePerMonth = conversionsModule.convertDistanceFromKm(totalKmPerMonth, country.distance_std);

                    break;

                case "money":

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

            return monthlyCost;
        };

        var getDistancePerMonth = function(){
            getMonthlyCost();
            return distancePerMonth;
        };

        return {
            typeOfCalculation:   typeOfCalculation,
            getMonthlyCost:      getMonthlyCost,
            getDistancePerMonth: getDistancePerMonth
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

        var monthlyCosts = calculatedData.costs.perMonth.items;

        monthlyCosts.depreciation =        calculateMonthlyDepreciation(inputData.depreciation, ageInMonths);
        monthlyCosts.insurance =           calculateInsuranceMonthlyValue(inputData.insurance);
        monthlyCosts.credit =              calculateInterestsMonthlyValue(inputData.credit, ageInMonths).monthlyCost;
        monthlyCosts.inspection =          calculateMonthlyInspection(inputData.inspection, ageInMonths);
        monthlyCosts.roadTaxes =           calculateMonthlyTaxes(inputData.roadTaxes);
        monthlyCosts.fuel =                calculateMonthlyFuel(inputData.fuel, country).getMonthlyCost();
        monthlyCosts.maintenance =         calculateMonthlyMaintenance(inputData.maintenance);
        monthlyCosts.repairsImprovements = calculateMonthlyRepairsAndImprovements(inputData.repairsImprovements);
        monthlyCosts.parking =             calculateMonthlyParking(inputData.parking);
        monthlyCosts.tolls =               calculateMonthlyTolls(inputData.tolls);
        monthlyCosts.fines =               calculateMonthlyFines(inputData.fines);
        monthlyCosts.washing =             calculateMonthlyWashing(inputData.washing);

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

        calculatedData.costs.perMonth.items = monthlyCosts;
        calculatedData.costs.perMonth.standingCosts = totalStandingCostsPerMonth;
        calculatedData.costs.perMonth.runningCosts = totalRunningCostsPerMonth;
        calculatedData.costs.perMonth.total = totalCostsPerMonth;
        calculatedData.costs.totalPerYear = totalCostsPerYear;
        calculatedData.costs.totalEver = totalCostsEver;

        return calculatedData.costs;
    }

    function calculatePublicTransports(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        //Object for public transports as an alternative to car usage
        //i.e., how much of public transports could be used with the same amount
        //of money that the user spends totally with automobile
        var publicTransports = calculatedData.publicTransports;

        /* ratios */
        //ratio (costs of public transports)/(car costs), under which it shows public transports as an alternative
        publicTransports.ratios.showPt = 0.9;
        //ratio of (costs of public transports)/(car costs), under which shows further public transports (intercity trains for example)
        publicTransports.ratios.showFurtherPt = 0.6;

        var totalCarCostsPerMonth = calculatedData.costs.perMonth.total;

        var costOfEachMonthlyPass  = parseFloat(inputData.publicTransports.monthlyPassCost);
        var numberOfPeopleInFamily = parseInt(inputData.publicTransports.numberOfPeopleInFamily);

        publicTransports.taxi.costPerUnitDistance = country.taxi_price;

        var totalCostsOfStandardPt = costOfEachMonthlyPass * numberOfPeopleInFamily;
        publicTransports.totalCostsOfStandardPublicTransports = totalCostsOfStandardPt;

        //boolean function that says if public transports are shown
        publicTransports.toBeDisplayed =
            (totalCostsOfStandardPt < publicTransports.ratios.showPt * totalCarCostsPerMonth) &&
            costOfEachMonthlyPass > 0;

        if(publicTransports.toBeDisplayed) {

            var taxiTotalCostsPerMonth;

            publicTransports.totalAlternativeCostsWhenUserHasNoCar = totalCostsOfStandardPt;

            publicTransports.ratios.ptCostsOverCarCosts = totalCostsOfStandardPt / totalCarCostsPerMonth;

            //in case further public transports are not shown, further shows just taxi
            if(publicTransports.ratios.ptCostsOverCarCosts > publicTransports.ratios.showFurtherPt){
                publicTransports.furtherPublicTransports.display = false;

                taxiTotalCostsPerMonth = totalCarCostsPerMonth - totalCostsOfStandardPt;

                publicTransports.totalAlternativeCostsWhenUserHasNoCar += taxiTotalCostsPerMonth;
            }
            //in case further public transports are shown,
            //half of the remainder goes to taxi and other half goes to further public transports
            else{
                publicTransports.furtherPublicTransports.display = true;

                taxiTotalCostsPerMonth = totalCarCostsPerMonth * (1 - publicTransports.ratios.ptCostsOverCarCosts) / 2;

                //amount allocated to further Public Transports, besides monthly pass and taxi
                publicTransports.furtherPublicTransports.totalCosts =
                    totalCarCostsPerMonth * (1 - publicTransports.ratios.ptCostsOverCarCosts) / 2;

                publicTransports.totalAlternativeCostsWhenUserHasNoCar +=
                    taxiTotalCostsPerMonth + publicTransports.furtherPublicTransports.totalCosts;
            }

            publicTransports.taxi.totalCosts = taxiTotalCostsPerMonth;
            publicTransports.taxi.possibleDistanceDoneByTaxi = taxiTotalCostsPerMonth / publicTransports.taxi.costPerUnitDistance;

            publicTransports.calculated = true;
        }

        calculatedData.publicTransports = publicTransports;

        return publicTransports;
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

        var financialEffort = calculatedData.financialEffort;

        //income
        var incomePeriod = inputData.income.incomePeriod;
        switch(incomePeriod){
            case 'year':
                financialEffort.income.perYear = parseFloat(inputData.income.year.amount) * 1;
                break;
            case 'month':
                financialEffort.income.perYear =
                    parseFloat(inputData.income.month.amountPerMonth) * parseFloat(inputData.income.month.monthsPerYear);
                break;
            case 'week':
                financialEffort.income.perYear =
                    parseFloat(inputData.income.week.amountPerWeek) * parseFloat(inputData.income.week.weeksPerYear);
                break;
            case 'hour':
                financialEffort.workingTime.hoursPerWeek = parseFloat(inputData.income.hour.hoursPerWeek);
                financialEffort.workingTime.weeksPerYear = parseFloat(inputData.income.hour.weeksPerYear);
                financialEffort.income.perYear =
                    parseFloat(inputData.income.hour.amountPerHour) *
                    financialEffort.workingTime.hoursPerWeek * financialEffort.workingTime.weeksPerYear;
                break;
            default:
                throw errMsg;
        }
        financialEffort.income.averagePerMonth = financialEffort.income.perYear / 12;
        financialEffort.income.averagePerWeek = financialEffort.income.perYear / consts.numberOfWeeksInAYear;

        //working time
        //uses inputData section "income", as the income was selected per hour
        if(incomePeriod == 'hour'){
            financialEffort.workingTime.hoursPerYear =
                financialEffort.workingTime.hoursPerWeek * financialEffort.workingTime.weeksPerYear;

            financialEffort.workingTime.hoursPerMonth = financialEffort.workingTime.hoursPerYear / 12;
        }
        //uses inputData section "working time"
        else if (incomePeriod == 'week' || incomePeriod == 'month' ||incomePeriod == 'year'){
            if(inputData.workingTime.isActivated == 'true'){
                financialEffort.workingTime.hoursPerWeek  = parseFloat(inputData.workingTime.hoursPerWeek);
                financialEffort.workingTime.monthsPerYear = parseFloat(inputData.workingTime.monthsPerYear);
            }
            //if user doesn't input, use standard values
            else {
                financialEffort.workingTime.hoursPerWeek  = 36;
                financialEffort.workingTime.monthsPerYear = 11;
            }

            financialEffort.workingTime.hoursPerYear =
                consts.numberOfWeeksInAMonth * financialEffort.workingTime.monthsPerYear * financialEffort.workingTime.hoursPerWeek;

            financialEffort.workingTime.hoursPerMonth = financialEffort.workingTime.hoursPerYear / 12;
        }
        else{
            throw errMsg;
        }

        //find average income per hour
        financialEffort.income.averagePerHour = financialEffort.income.perYear / financialEffort.workingTime.hoursPerYear;

        //extra financial effort variables
        financialEffort.totalCarCostsPerYear            = calculatedData.costs.totalPerYear;
        financialEffort.workingHoursPerYearToAffordCar  = totalCostsPerYear / financialEffort.income.averagePerHour;
        financialEffort.workingMonthsPerYearToAffordCar = totalCostsPerYear / financialEffort.income.perYear * 12;
        financialEffort.daysForCarToBePaid              = totalCostsPerYear / financialEffort.income.perYear * consts.numberOfDaysInAYear;
        financialEffort.financialEffortPercentage       = totalCostsPerYear / financialEffort.income.perYear * 100;

        if(financialEffort.financialEffortPercentage >= isLikelyToBeValidConst.financialEffortPercentage.min &&
           financialEffort.financialEffortPercentage <= isLikelyToBeValidConst.financialEffortPercentage.max){
            financialEffort.isLikelyToBeValid = true;
        }
        else{
            financialEffort.isLikelyToBeValid = false;
        }

        financialEffort.calculated = true;

        calculatedData.financialEffort = financialEffort;

        return financialEffort;
    }

    function calculateDrivingDistance(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        var drivingDistance = calculatedData.drivingDistance;

        var distancePerWeek,              //distance driven per week
            distancePerMonth,             //distance driven per month
            distancePerYear,              //distance driven per year
            distanceBetweenHomeAndJob,    //distance between home and job (one-way)
            distanceDuringEachWeekend,    //distance the user drives during weekend
            daysPerWeekUserDrivesToJob,
            inputDistance,
            calculated = false;           //whether Driving Distance is truly calculated

        var errMsg = "Error calculating Driving distance";

        //if fuel calculation with distance was NOT chosen in form part 2, gets distance from form part 3
        if(inputData.fuel.typeOfCalculation === 'money' ||
           inputData.fuel.typeOfCalculation === 'euros'/*old versions support*/){

            if(inputData.distance.considerCarToJob === 'true'){

                daysPerWeekUserDrivesToJob = parseInt(inputData.distance.carToJob.daysPerWeek);
                distanceBetweenHomeAndJob  = parseFloat(inputData.distance.carToJob.distanceBetweenHomeAndJob);
                distanceDuringEachWeekend  = parseFloat(inputData.distance.carToJob.distanceDuringWeekends);

                if(isNumber(daysPerWeekUserDrivesToJob) &&
                   isNumber(distanceBetweenHomeAndJob) &&
                   isNumber(distanceDuringEachWeekend)){

                    distancePerWeek = 2 * distanceBetweenHomeAndJob * daysPerWeekUserDrivesToJob  + distanceDuringEachWeekend;
                    distancePerMonth = consts.numberOfWeeksInAMonth * distancePerWeek;
                    distancePerYear  = distancePerMonth * 12;

                    calculated = true;
                }
                else{
                    calculated = false;
                }
            }
            else if(inputData.distance.considerCarToJob === 'false'){

                inputDistance = parseFloat(inputData.distance.noCarToJob.distancePerPeriod);

                if(isNumber(inputDistance)){

                    switch(inputData.distance.noCarToJob.period){
                        case "1":
                            distancePerMonth = inputDistance;
                            break;
                        case "2":
                            distancePerMonth = inputDistance / 2;
                            break;
                        case "3":
                            distancePerMonth = inputDistance / 3;
                            break;
                        case "4":
                            distancePerMonth = inputDistance / 6;
                            break;
                        case "5":
                            distancePerMonth = inputDistance / 12;
                            break;
                        default:
                            throw errMsg;
                    }

                    distancePerYear = distancePerMonth * 12;
                    distancePerWeek = distancePerMonth / consts.numberOfWeeksInAMonth;

                    calculated = true;
                }
                else{
                    calculated = false;
                }

            }
            else {
                throw errMsg;
            }

        }
        //gets distance information from form part 2, in fuel section
        else if(inputData.fuel.typeOfCalculation === 'distance' ||
                inputData.fuel.typeOfCalculation === 'km'/*old versions support*/){

            if(inputData.fuel.distanceBased.considerCarToJob === 'true'){
                daysPerWeekUserDrivesToJob = parseInt(inputData.fuel.distanceBased.carToJob.daysPerWeek);
                distanceBetweenHomeAndJob  = parseFloat(inputData.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob);
                distanceDuringEachWeekend  = parseFloat(inputData.fuel.distanceBased.carToJob.distanceDuringWeekends);

                if(isNumber(daysPerWeekUserDrivesToJob) &&
                  isNumber(distanceBetweenHomeAndJob) &&
                  isNumber(distanceDuringEachWeekend)){

                    distancePerWeek = 2 * distanceBetweenHomeAndJob * daysPerWeekUserDrivesToJob + distanceDuringEachWeekend;
                    distancePerMonth = consts.numberOfWeeksInAMonth * distancePerWeek;
                    distancePerYear  = distancePerMonth * 12;

                    calculated = true;
                }
                else{
                    calculated = false;
                }
            }
            else{
                distancePerMonth = calculateMonthlyFuel(inputData.fuel, country).getDistancePerMonth();

                if(isNumber(distancePerMonth)){

                    distancePerWeek = distancePerMonth / consts.numberOfWeeksInAMonth;
                    distancePerMonth = consts.numberOfWeeksInAMonth * distancePerWeek;
                    distancePerYear  = distancePerMonth * 12;

                    calculated = true;
                }
                else{
                    calculated = false;
                }
            }

        }
        else{
            throw errMsg;
        }

        //details
        if(isNumber(daysPerWeekUserDrivesToJob)){
            calculatedData.details.numberOfDaysPerWeekUserDrivesToJob = daysPerWeekUserDrivesToJob;
        }

        if(calculated){
            drivingDistance.calculated = true;

            drivingDistance.perWeek = distancePerWeek;
            drivingDistance.perMonth = distancePerMonth;
            drivingDistance.perYear = distancePerYear;
            drivingDistance.betweenHomeAndJob = distanceBetweenHomeAndJob;
            drivingDistance.duringEachWeekend = distanceDuringEachWeekend;
            drivingDistance.details.daysPerWeekUserDrivesToJob = daysPerWeekUserDrivesToJob;
        }
        else{
            drivingDistance.calculated = false;
        }

        calculatedData.drivingDistance = drivingDistance;

        return drivingDistance;
    }

    function calculateTimeSpentInDriving(){

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        var timeSpentInDriving = calculatedData.timeSpentInDriving;

        var errMsg = "Error calculating Time Spent In Driving";
        var bCalculated;

        var minutesBetweenHomeAndJob,   //time (in minutes) driven between home and job
            minutesInEachWeekend,       //time (in minutes) driven during weekends
            minutesPerWeek,             //time (in minutes) driven per week
            minutesPerDay,              //time (in minutes) driven per day
            daysPerMonth,               //number of days driven per month
            hoursPerMonth,              //number of hours driven per month
            hoursPerYear;               //number of hours driven per year

        if( ( ( inputData.fuel.typeOfCalculation == 'distance' || inputData.fuel.typeOfCalculation == 'km'/*support old versions*/) &&
              inputData.fuel.distanceBased.considerCarToJob == 'true') ||
           inputData.distance.considerCarToJob == 'true'){

            minutesBetweenHomeAndJob = parseFloat(inputData.timeSpentInDriving.option1.minutesBetweenHomeAndJob);
            minutesInEachWeekend     = parseFloat(inputData.timeSpentInDriving.option1.minutesDuringWeekend);

            var daysPerWeekUserDrivesToJob = calculatedData.drivingDistance.details.daysPerWeekUserDrivesToJob;

            if(isNaN(daysPerWeekUserDrivesToJob)){
                //console.error(errMsg + ": unknown daysPerWeekUserDrivesToJob");
                bCalculated = false;
            }
            else{
                minutesPerWeek = 2 * minutesBetweenHomeAndJob * daysPerWeekUserDrivesToJob + minutesInEachWeekend;
                hoursPerMonth  = consts.numberOfWeeksInAMonth * minutesPerWeek / 60;

                minutesPerDay = minutesPerWeek / 7;

                daysPerMonth  = consts.numberOfWeeksInAMonth * ((minutesInEachWeekend > 0 ? 2 : 0) + daysPerWeekUserDrivesToJob);
                bCalculated = true;
            }
        }
        else{
            minutesPerDay = parseFloat(inputData.timeSpentInDriving.option2.minutesPerDay);
            daysPerMonth  = parseFloat(inputData.timeSpentInDriving.option2.daysPerMonth);
            if(isNaN(minutesPerDay) || isNaN(daysPerMonth)){
                //console.error(errMsg + ": unknown minutesPerDay or daysPerMonth");
                bCalculated = false;
            }
            else{
                hoursPerMonth  = minutesPerDay * daysPerMonth / 60;
                minutesPerWeek = hoursPerMonth / consts.numberOfWeeksInAMonth * 60;
                bCalculated = true;
            }
        }

        hoursPerYear = hoursPerMonth * 12;

        //sets object
        timeSpentInDriving.calculated = bCalculated;

        timeSpentInDriving.minutesBetweenHomeAndJob = minutesBetweenHomeAndJob;
        timeSpentInDriving.minutesInEachWeekend = minutesInEachWeekend;
        timeSpentInDriving.minutesPerWeek = minutesPerWeek;
        timeSpentInDriving.minutesPerDay = minutesPerDay;
        timeSpentInDriving.daysPerMonth = daysPerMonth;
        timeSpentInDriving.hoursPerMonth = hoursPerMonth;
        timeSpentInDriving.hoursPerYear = hoursPerYear;

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

        var speeds = calculatedData.speeds;

        var averageKineticSpeed,
            averageConsumerSpeed;

        /*For more details on the Consumer Speed concept, check:
        https://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Private_or_internal_costs */

        averageKineticSpeed = drivingDistance.perYear / timeSpentInDriving.hoursPerYear;

        //Virtual/Consumer Speed calculated if info of Financial Effort is available
        if (financialEffort.calculated){
            averageConsumerSpeed =
                drivingDistance.perYear / (timeSpentInDriving.hoursPerYear + financialEffort.workingHoursPerYearToAffordCar);
        }

        //set object
        speeds.averageKineticSpeed = averageKineticSpeed;
        speeds.averageConsumerSpeed = averageConsumerSpeed;

        calculatedData.speeds = speeds;

        return speeds;
    }

    function calculateExternalCosts(){

        var externalCosts = calculatedData.externalCosts;

        //by month, source: https://ec.europa.eu/transport/themes/sustainable/doc/2008_costs_handbook.pdf
        externalCosts.handbookOfeExternalCostsURL = 'http:\/\/ec.europa.eu\/transport\/themes\/sustainable\/doc\/2008_costs_handbook.pdf';
        externalCosts.polution =        0.005;      //pollutants in €/km
        externalCosts.greenhouseGases = 0.007;      //greenhouse gases in €/km
        externalCosts.noise =           0.004;      //noise in €/km
        externalCosts.fatalities =      0.03;       //traffic fatalities in €/km
        externalCosts.congestion =      0.1;        //congestion in €/km
        externalCosts.infrastr =        0.001;      //infrastructures in €/km

        //converts distance unit to kilometres
        var distancePerMonthInKms = conversionsModule.convertDistanceToKm(calculatedData.drivingDistance.perMonth, country.distance_std);

        externalCosts.totalPerMonth = (externalCosts.polution + externalCosts.greenhouseGases + externalCosts.noise +
            externalCosts.fatalities + externalCosts.congestion + externalCosts.infrastr) * distancePerMonthInKms;

        externalCosts.calculated = true;

        calculatedData.externalCosts = externalCosts;

        return externalCosts;
    }

    //gets uber object to compare uber costs with private car costs
    function calculateUberCosts(uberObj){
        /* uberObj is an object with four properties:
        cost_per_distance, cost_per_minute, currency_code, distance_unit
        inputData is the object output of function calculate_costs  */

        if(!inputData || !country){
            throw errMsgDataCountry;
        }

        var uberNotCalculated = {calculated: false};

        //if public transporst information was not obtained from user
        if(!(calculatedData.publicTransports.calculated)){
            return uberNotCalculated;
        }

        //if distance information not available or zero
        if(!isDef(calculatedData.drivingDistance.perMonth)){
            return uberNotCalculated;
        }

        //checks if uberObj is an object
        if (!isObjDef(uberObj)){
            return uberNotCalculated;
        }

        //checks if the uber currency is the same as the user's
        if ((uberObj.currency_code).toUpperCase() != (country.currency).toUpperCase()){
            return uberNotCalculated;
        }

        //checks if the uber distance unit is the same as the user's
        var uberStandardDistanceUnit = (uberObj.distance_unit).toLowerCase();
        if (country.distance_std == 1){ //according to countries' standards file, 1 means "km"
            if (uberStandardDistanceUnit != "km"){
                return uberNotCalculated;
            }
        }
        else if (country.distance_std == 2) { //according to countries' standards file, 1 means "mile"
            if (uberStandardDistanceUnit != "mile" &&
                uberStandardDistanceUnit != "miles" &&
                uberStandardDistanceUnit != "mi" &&
                uberStandardDistanceUnit != "mi."){
                return uberNotCalculated;
            }
        }
        else{
            return uberNotCalculated;
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
        var uberCostsByFullyReplacingCarWithUber =
            uberCostPerUnitDistance * drivingDistancePerMonth + uberCostPerMinute * minutesDrivenPerMonth;

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
                return uberNotCalculated;
            }

            //in this case, monthly passes for whole family
            publicTransportsCostsCombinedWithUber = calculatedData.publicTransports.totalCostsOfStandardPublicTransports;

            //amount that is left to uber after public transports (monthly passes) are paid
            totalUberCosts = totalCarCostsPerMonth - publicTransportsCostsCombinedWithUber;
            if(totalUberCosts < 0){
                return uberNotCalculated;
            }

            //how much distance (km or miles) can be done by uber with totalUberCosts amount of money
            var averageSpeedInDistancePerMinutes = calculatedData.speeds.averageKineticSpeed / 60; //convert, for ex. km/h to km/minute
            //the following formula results from solving and finding "distanceDoneWithUber" in the following equation:
            //totalUberCosts =  uberCostPerUnitDistance * distanceDoneWithUber + uberCostPerMinute * timeInMinutes
            //where: timeInMinutes = distanceDoneWithUber/ averageSpeedInDistancePerMinutes
            distanceDoneWithUber = totalUberCosts/ (uberCostPerUnitDistance + uberCostPerMinute/averageSpeedInDistancePerMinutes);

            if (distanceDoneWithUber < 0){
                return uberNotCalculated;
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

        calculateDrivingDistance();
        calculateTimeSpentInDriving();
        calculateSpeeds();
        //calculateExternalCosts();

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

    //this function is very important and checks if number is a finite valid number
    //no variable coercions, no bullshit, no string, no "1", no true, no NaN, no null, no 1/0, n must be a finite valid number
    //USE THIS FUNCTION, see https://stackoverflow.com/a/8526029/1243247
    function isNumber(n){
        return typeof n == 'number' && !isNaN(n) && isFinite(n);
    }

    //detects if a variable is defined and different from zero
    function isDef(variable){
        return typeof variable !== 'undefined' && variable !== 0;
    }

    function isObjDef(Obj){
        if (Obj === null || Obj == "null" || typeof Obj !== 'object' || $.isEmptyObject(Obj)){
            return false;
        }
        else{
            return true;
        }
    }

    /* === Public methods to be returned ===*/

    //thisModule, since this is a parent module and it may have been defined erlier by a children module
    thisModule.initialize = initialize;

    thisModule.CreateCalculatedDataObj = CreateCalculatedDataObj;
    thisModule.differenceBetweenDates = differenceBetweenDates;
    thisModule.calculateCosts = calculateCosts;
    thisModule.calculateUberCosts = calculateUberCosts;

    return thisModule;

})(autocosts.calculatorModule || {});

//check for node.js
if(typeof window === 'undefined'){
    module.exports = autocosts.calculatorModule;
}

