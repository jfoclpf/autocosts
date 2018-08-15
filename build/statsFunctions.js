//********************
//statistics outlier removal constants
var statsConstants = {
    MIN_TIME_TO_FILL_FORM: 90, //minimum time to fill form shall be 90 seconds, before which is considered spam-bot

    //speed
    MAX_AVERAGE_SPEED:  120, //applies both for mph and km/h
    //fuel
    MAX_EUR_PER_LITRE_FUEL:  10,
    MAX_FUEL_EFF_L100KM:     50,
    //maximum distances
    MAX_KM_DRIVEN_BETWEEN_HOME_AND_WORK: 250,
    MAX_KM_DRIVEN_WEEKEND:               500,
    MAX_KM_DRIVEN_PER_MONTH:           10000,
    //depreciation
    MAX_CAR_AGE_MONTHS:     600,
    MAX_EUR_CAR_VALUE:   100000,

    MAX_EUR_MONTHLY: {
        DEPRECIATION: 800,
        INSURANCE:    900,
        CREDIT:       150,
        INSPECTION:   250,
        TAXES:        200,
        FUEL:         950,
        MAINTENANCE:  250,
        REPAIRS:      250,
        TOLLS:        250,
        PARKING:      250,
        FINES:        150,
        WASHING:      150
    },

    MIN_EUR_MONTHLY: {
        INSURANCE:    3,
        TAXES:        3,
        MAINTENANCE:  3
    },
    
    MAX_EUR_INCOME_PER_HOUR: 500,
    MAX_HOURS_DRIVE_PER_YEAR: 20*365
};

/*********************************************************************************************************/
/*********************************************************************************************************/
/*************************  Object Constructors and Templates ********************************************/
/*********************************************************************************************************/

//Object Constructor for the Results, where the calculated averages are stored
//see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_a_constructor_function
//"There is a strong convention, with good reason, to use a capital initial letter" for constructors.
function ResultsObj(){
    this.monthly_costs          = new MonthlyCostsObj();
    this.total_costs_month      = 0;
    this.total_costs_year       = 0;

    this.fin_effort_calculated  = false;
    this.fin_effort             = new FinEffortObj();

    this.distance_per_month     = 0;
    
    this.time_spent_driving = {
        hours_drive_per_year : 0
    };
    
    this.kinetic_speed          = 0;
    this.virtual_speed          = 0;
}

//Object Constructor for Monthly Costs
function MonthlyCostsObj() {
    this.depreciation   = 0;
    this.insurance      = 0;
    this.credit         = 0;
    this.inspection     = 0;
    this.car_tax        = 0;
    this.fuel           = 0;
    this.maintenance    = 0;
    this.repairs_improv = 0;
    this.parking        = 0;
    this.tolls          = 0;
    this.fines          = 0;
    this.washing        = 0;
}

//Object Constructor for Financial Effort
function FinEffortObj() {
    this.aver_income_per_hour  = 0;
    this.aver_income_per_month = 0;
    this.income_per_year       = 0;
    this.total_costs_year      = 0;
    
    //these values have no linear operation, that is, the linear averages will not work
    this.hours_per_year_to_afford_car = 0;
    this.days_car_paid                = 0;
    this.month_per_year_to_afford_car = 0;    
}

//Object Constructor for the final Statistical Object
//that is, the object which stores the statistical final results to be sent to DB
function StatsObj(){
    this.monthly_costs        = new MonthlyCostsObj();
    this.standCos             = 0;
    this.runnCos              = 0;
    
    this.totCostsPerMonth     = 0;
    this.totCostsPerYear      = 0;

    this.fin_effort           = new FinEffortObj();
    
    this.runCostsPerDist      = 0;
    this.totCostsPerDist      = 0;
    
    this.distance_per_month   = 0;
    this.hours_drive_per_year = 0;
    
    this.kinetic_speed        = 0;
    this.virtual_speed        = 0;

    this.users_counter        = 0;
}

/*********************************************************************************************************/
/*********************************************************************************************************/
/*********************************************************************************************************/

//Gets the average of array of Objects 
//results_array is an array of objects previously defined in coreFunctions.js, similar to ResultsObj
//this function should be able to feed itself, that is, the returned object must be valid as a function parameter
function get_average_costs(results_array){

    var i, key, fin_effort_len, distance_per_month_len, time_spent_driving_len;
    var length = results_array.length;
    
    var output = new ResultsObj();

    if(length == 0){
        return null;
    }

    //if the length if the array of objects is 1, simply returns the first element of array,
    if(length == 1){
        output = Object.assign({}, results_array[0]);  //clones Object
    }

    //If the length is greater than 1, finds the average of variables whose function is linear, such as Costs
    //Costs are linear functions because they are of the type f(x,y,z)=a*x+b*y+c*z, and therefore
    //the average of the functions is equal to the function of the averages, that is
    //(f(x1,y1,z1) + f(x2,y2,z2))/2 = f((x1+x2))/2,(y1+y2))/2,(z1+z2))/2 and therefore 
    //we just sum all the entries of the array, and divide by the number of items (length of the array)
    if(length > 1){
        
        var results_total = new ResultsObj();

        //calculates the sums, such that it can compute averages, dividing by the number of items (length)
        for(i=0, fin_effort_len=0, distance_per_month_len=0, time_spent_driving_len=0; i<length; i++){
            
            for(key of Object.keys(results_array[i].monthly_costs)){
                results_total.monthly_costs[key] += results_array[i].monthly_costs[key];
            }
            
            results_total.total_costs_month += results_array[i].total_costs_month;
            results_total.total_costs_year += results_array[i].total_costs_year;
            
            //some results have no financial effort info, because they are optional
            if(results_array[i].fin_effort_calculated){
                let aviph = results_array[i].fin_effort.aver_income_per_hour;
                /*filters out outliers by aver_income_per_hour, it should be a number x: 0<x<Inf */             
                if(!isNaN(aviph) && aviph > 0 && isFinite(aviph)){                
                    for(key of Object.keys(results_array[i].fin_effort)){
                        results_total.fin_effort[key] += results_array[i].fin_effort[key];
                    }                
                    fin_effort_len++;
                }
            }
            
            //Driving Distance may, in some cases, not be calculated (form part 3 is optional)
            if(results_array[i].driving_distance_calculated){
                results_total.distance_per_month += results_array[i].distance_per_month;    
                distance_per_month_len++;
            }
            
            //Time spent in Driving may, in some cases, not be calculated (form part 3 is optional)
            if(results_array[i].time_spent_driving_calculated){
                results_total.time_spent_driving.hours_drive_per_year += 
                    results_array[i].time_spent_driving.hours_drive_per_year; 
                time_spent_driving_len++;
            }
            
        }//for
        
        /**************************************************************************************************/
        //Now, it has the sums in results_total, it can calculate averages by divinding by respective length
        
        for (key of Object.keys(output.monthly_costs)){
            output.monthly_costs[key] = results_total.monthly_costs[key]/length;
        }
        
        output.total_costs_month = results_total.total_costs_month/length;
        output.total_costs_year = results_total.total_costs_year/length;        
        
        //financial effort, if available
        if(fin_effort_len > 0){
            
            output.fin_effort_calculated = true;
            
            for (key of Object.keys(output.fin_effort)){
                output.fin_effort[key] = results_total.fin_effort[key]/fin_effort_len;
            }
            
            //some variables have no linear calculation formulas, i.e., 
            //the average of the functions is different from the fuction of the averages, and as such
            //the functions/operations must be performed, after having the averages of linear variables         
            output.fin_effort.hours_per_year_to_afford_car = 
                output.total_costs_year / output.fin_effort.aver_income_per_hour; 
            output.fin_effort.days_car_paid = 
                output.total_costs_year / output.fin_effort.income_per_year * 365.25;
            output.fin_effort.month_per_year_to_afford_car =
                output.total_costs_year / output.fin_effort.income_per_year * 12;            
        }
        
        if(distance_per_month_len > 0){
            output.distance_per_month = results_total.distance_per_month/distance_per_month_len;
        }
        
        if(time_spent_driving_len > 0 && distance_per_month_len > 0){
            
            output.time_spent_driving.hours_drive_per_year =
                results_total.time_spent_driving.hours_drive_per_year/time_spent_driving_len;
            
            output.kinetic_speed = output.distance_per_month * 12 / output.time_spent_driving.hours_drive_per_year;
        }

        if(fin_effort_len > 0 && time_spent_driving_len > 0 && distance_per_month_len > 0){  
            output.virtual_speed = output.distance_per_month * 12 /
                (output.time_spent_driving.hours_drive_per_year + output.fin_effort.hours_per_year_to_afford_car); 
        }
    }

    return output;
}

//***************************************************************************************
//this functions calculates the avearge of the averages of the same user inputs
//for a corresponding country
function calculateStatistics(userIds, data, country){
// userIds => is a matrix with 2 columns, the 1st column has a unique user ID (uuid_client),
//the 2nd column has always the same country
// data    => is a matrix with everything for the specific country
// country => is the country whose average is being calculated
//userIds.length is smaller than data.length, because some users fill in more than one time

//console.log(" "); console.log(" "); console.log(" "); console.log(" "); console.log(" ");
//console.log("************************************************************************");

    //object to be output as result
    var output = new StatsObj();
    
    if(userIds.length != 0 && data.length != 0){
        var temp_i = []; //array with unique users, having one element per user
        var temp_j = []; //array having the several inputs from the same user

        for(var i=0; i<userIds.length; i++){
            
            for(var j=0, n=0; j<data.length; j++){
                if(data[j].uuid_client == userIds[i].uuid_client){

                    //checks if the entry is ok
                    //and if it is an input spam/bot 
                    //(the time to fill the form for the first input mus be greater than a time value)
                    //console.log("(i,j)=("+i+","+j+")"); console.log(data[j]);console.log(country);
                    if(is_DBentry_ok(data[j], country) &&
                       ((n==0 && data[j].time_to_fill_form>statsConstants.MIN_TIME_TO_FILL_FORM) || n>0)){
                        //console.log("f1");
                        var f1 = get_DB_part1(data[j]);
                        //console.log("f1");
                        var f2 = get_DB_part2(data[j]);
                        //console.log("f3");
                        var f3 = get_DB_part3(data[j]);
                        //console.log("calculate_costs");
                        var result = calculate_costs(f1, f2, f3, country);
                        //console.log("(i,j)=("+i+","+j+")");console.log(country);console.log(result);

                        //checks if the result is an outlier
                        if (was_result_ok(result, country)){
                            //console.log("i:"+i+"; j:"+j+"; n:"+n+"; time_to_fill_form:"+data[j].time_to_fill_form);
                            temp_j.push(result);
                            n++;
                        }
                    }
                }
            }
            
            if (temp_j.length){
                temp_i.push(get_average_costs(temp_j));
            }
            temp_j = [];
        }

        //if the array with the average results is empty
        if(temp_i.length==0){
            return new StatsObj();
        }

        //console.log("get_average_costs");
        var avg = get_average_costs(temp_i);
        
        output.monthly_costs = Object.assign({}, avg.monthly_costs); //clone object   

        //standing costs
        output.standCos = avg.monthly_costs.insurance + avg.monthly_costs.depreciation + 
                          avg.monthly_costs.credit + avg.monthly_costs.inspection + 
                          0.5 * avg.monthly_costs.maintenance + avg.monthly_costs.car_tax;
        //running costs
        output.runnCos = avg.monthly_costs.fuel + 0.5 * avg.monthly_costs.maintenance +
                         avg.monthly_costs.repairs_improv + avg.monthly_costs.parking + 
                         avg.monthly_costs.tolls + avg.monthly_costs.fines + avg.monthly_costs.washing;
        //total
        output.totCostsPerMonth = avg.total_costs_month;
        output.totCostsPerYear = output.totCostsPerMonth * 12;

        output.runCostsPerDist = avg.distance_per_month ? output.runnCos / avg.distance_per_month : 0;
        output.totCostsPerDist = avg.distance_per_month? avg.total_costs_month / avg.distance_per_month: 0;            

        output.fin_effort = Object.assign({}, avg.fin_effort); //clone object

        output.distance_per_month   = avg.distance_per_month;
        output.hours_drive_per_year = avg.time_spent_driving.hours_drive_per_year;
                
        output.kinetic_speed = !isNaN(avg.kinetic_speed) && isFinite(avg.kinetic_speed) ? avg.kinetic_speed : 0;
        output.virtual_speed = !isNaN(avg.virtual_speed) && isFinite(avg.virtual_speed) ? avg.virtual_speed : 0;;

        output.users_counter = temp_i.length;
    }
    
    //console.log(output);
    return output;
}


//**********************************************************************
//**********************************************************************
// checks whether the DB entry is valid or if it is a statistics outlier
// *.*
function is_DBentry_ok(data, country) {

    var today = new Date();
    var date_auto = new Date(data.acquisition_year, data.acquisition_month - 1);
    var age_months = date_diff(date_auto,today); //age of car in months

    if (data.acquisition_year && data.acquisition_month) {
        if(!age_months || age_months>statsConstants.MAX_CAR_AGE_MONTHS){
            return false;
        }
    }
    else {
        return false;
    }

    //depreciation must be positive
    if((!data.commercial_value_at_acquisition || !data.commercial_value_at_now) ||
       (Number(data.commercial_value_at_acquisition) < Number(data.commercial_value_at_now))){
        
        return false;
    }

    //car value at acquisition date must not exceed a certain value (MAX_EUR_CAR_VALUE)
    var converted_value = convert_from_EUR(statsConstants.MAX_EUR_CAR_VALUE, country.currency, EURcurrConverterStats);
    if (converted_value != -1 && Number(data.commercial_value_at_acquisition) > converted_value){
        return false;
    }

    //insurance
    if(!data.insure_type || !data.insurance_value){
        return false;
    }
    
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.INSURANCE, country.currency, EURcurrConverterStats);
    if (converted_value!=-1 && calculateInsuranceMonthlyValue(data.insure_type, data.insurance_value) > converted_value){
        return false;
    }
    
    converted_value = convert_from_EUR(statsConstants.MIN_EUR_MONTHLY.INSURANCE, country.currency, EURcurrConverterStats);
    if (converted_value!=-1 && calculateInsuranceMonthlyValue(data.insure_type, data.insurance_value) < converted_value){
        return false;
    }

    //credit
    if(data.credit == "true" && (!data.credit_number_installments || 
                                 !data.credit_amount_installment || 
                                 !data.credit_residual_value || 
                                 !data.credit_borrowed_amount)){
        return false;
    }

    var credit_object = calculateInterestsMonthlyValue(data.credit, 
                                                       data.credit_borrowed_amount, 
                                                       data.credit_number_installments, 
                                                       data.credit_amount_installment, 
                                                       data.credit_residual_value, 
                                                       age_months);
    
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.CREDIT, country.currency, EURcurrConverterStats);
    
    if (credit_object.monthly_costs > converted_value){
        return false;
    }

    //inspection
    if(!data.inspection_number_inspections || !data.inspection_average_inspection_cost){
        return false;
    }

    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.INSPECTION, 
                                       country.currency, 
                                       EURcurrConverterStats);
    
    var inspection_per_month = calculateMonthlyInspection(data.inspection_number_inspections,
                                                          data.inspection_average_inspection_cost, 
                                                          age_months);
    
    if (inspection_per_month > converted_value){
        return false;
    }

    //car taxes
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.TAXES, 
                                       country.currency, 
                                       EURcurrConverterStats);
    
    if(!data.vehicle_excise_tax || calculateMonthlyTaxes(data.vehicle_excise_tax) > converted_value){
        return false;
    }
    
    converted_value = convert_from_EUR(statsConstants.MIN_EUR_MONTHLY.TAXES, country.currency, EURcurrConverterStats);
    if(!data.vehicle_excise_tax || calculateMonthlyTaxes(data.vehicle_excise_tax) < converted_value){
        return false;
    }

    //fuel & distance
    switch(data.fuel_calculation){
            
        case "km":
            
            if(!data.fuel_distance_based_fuel_efficiency || !data.fuel_distance_based_fuel_price){
                return false;
            }
            
            //remove outliers
            if (convert_to_fuel_eff_l100km(data.fuel_distance_based_fuel_efficiency, country.fuel_efficiency_std) >
                statsConstants.MAX_FUEL_EFF_L100KM){
                
                return false;
            }
            
            switch(data.fuel_distance_based_car_to_work){
                
                case "true":
                    
                    if(!data.fuel_distance_based_car_to_work_distance_home_work ||
                       !data.fuel_distance_based_car_to_work_distance_weekend ||
                       !data.fuel_distance_based_car_to_work_number_days_week){
                        
                        return false;
                    }
                    
                    //remove outliers
                    if (convert_std_dist_to_km(data.fuel_distance_based_car_to_work_distance_home_work, country.distance_std) >
                        statsConstants.MAX_KM_DRIVEN_BETWEEN_HOME_AND_WORK){
                        
                        return false;
                    }
                    
                    if (convert_std_dist_to_km(data.fuel_distance_based_car_to_work_distance_weekend, country.distance_std) >
                        statsConstants.MAX_KM_DRIVEN_WEEKEND){
                        
                        return false;
                    }
                    
                    break;
                
                case "false":
                    
                    if(!data.fuel_distance_based_no_car_to_work_distance){
                        return false;
                    }
                    
                    break;
                    
                default:                    
                    return false;
            }

            //remove outliers for fuel price
            converted_value = convert_fuel_price_to_EURpLitre(data.fuel_distance_based_fuel_price, 
                                                              country.currency, 
                                                              country.fuel_price_volume_std, EURcurrConverterStats);
            
            if (converted_value!=-1 && converted_value>statsConstants.MAX_EUR_PER_LITRE_FUEL){
                return false;
            }
            
            break;

        case "euros":
            
            if(!data.fuel_currency_based_currency_value){
                return false;
            }
            
            switch(data.distance_drive_to_work){
                
                case "true":
                    if(!data.distance_days_per_week || !data.distance_home_job || !data.distance_journey_weekend){
                        return false;
                    } 
                    
                    break;
                    
                case "false":
                    if(!data.distance_per_month){
                        return false;
                    }
                    
                    break;
                    
                default:
                    return false;
            }
            
            break;
            
        default:
            return false;
    }

    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.FUEL, country.currency, EURcurrConverterStats);
    
    var fuel_object = calculateMonthlyFuel(
            data.fuel_calculation,                                      //calculation based on money or distance (bool)
            data.fuel_efficiency,                                       //fuel efficiency in standard format
            data.fuel_distance_based_fuel_price,                        //fuel price in standard format
            data.fuel_distance_based_car_to_work,                       //considering user takes car from home to job (bool)
            data.fuel_distance_based_no_car_to_fuel_period_distance,    //time period for travelled distance
            data.fuel_distance_based_no_car_to_work_distance,           //travelled distance
            data.fuel_distance_based_car_to_work_distance_home_work,    //distance from home to job in standard measurement
            data.fuel_distance_based_car_to_work_distance_weekend,      //distance travelled during weekends
            data.fuel_distance_based_car_to_work_number_days_week,      //days per week the car is driven from home to job
            data.fuel_currency_based_periodicity,                       //in case money is selected, input time period
            data.fuel_currency_based_currency_value,                    //in case money is selected, fuel money value
            country);                                                   //country object

    if (fuel_object.monthly_cost > converted_value){
        return false;
    }

    //maintenance
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.MAINTENANCE, country.currency, EURcurrConverterStats);
    if(!data.maintenance || calculateMonthlyMaintenance(data.maintenance) > converted_value){
        return false;
    }
    
    converted_value = convert_from_EUR(statsConstants.MIN_EUR_MONTHLY.MAINTENANCE, country.currency, EURcurrConverterStats);
    if(!data.maintenance || calculateMonthlyMaintenance(data.maintenance) < converted_value){
        return false;
    }

    //repairs and improvements
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.REPAIRS, country.currency, EURcurrConverterStats);
    if(!data.repairs || calculateMonthlyRepairsAndImprovements(data.repairs) > converted_value){
        return false;
    }

    //parking
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.PARKING, country.currency, EURcurrConverterStats);
    if(!data.parking || calculateMonthlyParking(data.parking) > converted_value){
        return false;
    }

    //tolls
    switch(data.tolls_daily){
        case "false":
            if(!data.tolls_no_daily_value)
                return false;
            break;
        case "true":
            if(!data.tolls_daily_expense || !data.tolls_daily_number_days)
                return false;
            break;
        default:
            return false;
    }

    var monthly_tolls = calculateMonthlyTolls(data.tolls_daily, 
                                              data.tolls_no_daily_value, 
                                              data.tolls_no_daily_value, 
                                              data.tolls_daily_expense, 
                                              data.tolls_daily_number_days);
    
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.TOLLS, country.currency, EURcurrConverterStats);
    if (monthly_tolls > converted_value){
        return false;
    }

    //fines
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.FINES, country.currency, EURcurrConverterStats);
    if(!data.tickets_value || calculateMonthlyFines(data.tickets_periodicity , data.tickets_value) > converted_value){
        return false;
    }

    //washing
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.WASHING, country.currency, EURcurrConverterStats);
    if(!data.washing_value || calculateMonthlyWashing(data.washing_periodicity, data.washing_value) > converted_value){
        return false;
    }

    //hours
    if(data.distance_drive_to_work == 'true' || data.fuel_distance_based_car_to_work == 'true'){
        if(!data.time_spent_home_job || !data.time_spent_weekend){
            return false;
        }
    }
    else{
        if(!data.time_spent_min_drive_per_day || !data.time_spent_days_drive_per_month){
            return false;
        }
    }
    return true;
}

//checks if the computed result was OK and is not an outlier
function was_result_ok(result, country) {

    //kinetic speed and virtual/consumer speed
    if(result.driving_distance_calculated && result.time_spent_driving_calculated){
        
        if (!isFinite(result.kinetic_speed)){
            return false;
        }
        if(result.kinetic_speed > statsConstants.MAX_AVERAGE_SPEED){
            return false;
        }
        
        if(result.fin_effort_calculated){
            if(!isFinite(result.virtual_speed) || result.virtual_speed <= 0){
                return false;
            }
        }        
    }

    //distance per month
    if(result.driving_distance_calculated){
        var distance_per_month_km = convert_std_dist_to_km(result.distance_per_month, country.distance_std);
        if(distance_per_month_km > statsConstants.MAX_KM_DRIVEN_PER_MONTH){
            return false;
        }
    }
    
    if(result.fin_effort_calculated){
        if(country.currency == "EUR" && result.fin_effort.aver_income_per_hour > statsConstants.MAX_EUR_INCOME_PER_HOUR){
            return false;
        }
    }
    
    if(result.time_spent_driving_calculated){
        if(result.time_spent_driving.hours_drive_per_year > statsConstants.MAX_HOURS_DRIVE_PER_YEAR){
            return false;
        }
    }

    return true;
}


