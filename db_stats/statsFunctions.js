//********************
//statistics outlier removal constants
var statsConstants = {
    MIN_TIME_TO_FILL_FORM: 90, //minimum time to fill form shall be 90 seconds, after which is considered spam-bot
    
    //speed
    MAX_AVERAGE_SPEED:  120, //applies both for mph and km/h
    //fuel
    MAX_EUR_PER_LITRE_FUEL:  10,
    MAX_FUEL_EFF_L100KM:     50,
    //maximum distances
    MAX_KM_DRIVEN_BETWEEN_HOME_AND_WORK: 150,
    MAX_KM_DRIVEN_WEEKEND:               400,
    MAX_KM_DRIVEN_PER_MONTH:           10000,
    //depreciation
    MAX_CAR_AGE_MONTHS:     600,
    MAX_EUR_CAR_VALUE:   100000,
    
    MAX_EUR_MONTHLY: {
        DEPRECIATION: 800,
        INSURANCE:    500,
        CREDIT:       150,
        INSPECTION:   150,  
        TAXES:        200,
        FUEL:         900,
        MAINTENANCE:  250,
        REPAIRS:      250,
        TOLLS:        250,
        PARKING:      250,
        FINES:        150,
        WASHING:      150        
    }
};

//gets the average of array of objects
//results_array is an array of objects previously defined in coreFunctions.js
function get_average_costs(results_array){
    
    var length = results_array.length;

    var monthly_costs = {
        depreciation: 0,
        insurance: 0,
        credit: 0,
        inspection: 0,
        car_tax: 0,
        fuel: 0,
        maintenance: 0,
        repairs_improv: 0,
        parking: 0,
        tolls: 0,
        fines: 0,
        washing: 0
    };
    var output = {
        monthly_costs: monthly_costs,
        kinetic_speed: 0,
        virtual_speed: 0,
        distance_per_month: 0        
    };
       
    if(length==0){
        return null;
    }
   
    //if the length if the array of objects is 1, simply returns the own array
    if(length==1){
        output.monthly_costs.depreciation   = results_array[0].monthly_costs.depreciation;
        output.monthly_costs.insurance      = results_array[0].monthly_costs.insurance;
        output.monthly_costs.credit         = results_array[0].monthly_costs.credit;
        output.monthly_costs.inspection     = results_array[0].monthly_costs.inspection;
        output.monthly_costs.car_tax        = results_array[0].monthly_costs.car_tax;
        output.monthly_costs.fuel           = results_array[0].monthly_costs.fuel;
        output.monthly_costs.maintenance    = results_array[0].monthly_costs.maintenance;
        output.monthly_costs.repairs_improv = results_array[0].monthly_costs.repairs_improv;
        output.monthly_costs.parking        = results_array[0].monthly_costs.parking;
        output.monthly_costs.tolls          = results_array[0].monthly_costs.tolls;
        output.monthly_costs.fines          = results_array[0].monthly_costs.fines;
        output.monthly_costs.washing        = results_array[0].monthly_costs.washing;
        output.distance_per_month = results_array[0].distance_per_month;
        output.kinetic_speed     = results_array[0].kinetic_speed;
        output.virtual_speed     = results_array[0].virtual_speed;
    }
   
    if(length>1){
        var depTotal = 0;
        var insTotal = 0;
        var credTotal = 0;
        var inspTotal = 0;
        var carTaxTotal = 0;
        var fuelTotal = 0;
        var maintTotal = 0;
        var repTotal = 0;
        var parkTotal = 0;
        var tollsTotal = 0;
        var finesTotal = 0;
        var washTotal = 0;
        var distTotal = 0;      
        var kineticTotal = 0;       
        var virtualTotal = 0; 
        
        for(i=0; i<length; i++){
            depTotal += results_array[i].monthly_costs.depreciation;
            insTotal += results_array[i].monthly_costs.insurance;
            credTotal += results_array[i].monthly_costs.credit;
            inspTotal += results_array[i].monthly_costs.inspection;
            carTaxTotal += results_array[i].monthly_costs.car_tax;
            fuelTotal += results_array[i].monthly_costs.fuel;
            maintTotal += results_array[i].monthly_costs.maintenance;
            repTotal += results_array[i].monthly_costs.repairs_improv;
            parkTotal += results_array[i].monthly_costs.parking;
            tollsTotal += results_array[i].monthly_costs.tolls;
            finesTotal += results_array[i].monthly_costs.fines;
            washTotal += results_array[i].monthly_costs.washing;
            distTotal += results_array[i].distance_per_month;          
            kineticTotal += results_array[i].kinetic_speed;        
            virtualTotal += results_array[i].virtual_speed;            
        }
        
        output.monthly_costs.depreciation   = depTotal/length;
        output.monthly_costs.insurance      = insTotal/length;
        output.monthly_costs.credit         = credTotal/length;
        output.monthly_costs.inspection     = inspTotal/length;
        output.monthly_costs.car_tax        = carTaxTotal/length;
        output.monthly_costs.fuel           = fuelTotal/length;
        output.monthly_costs.maintenance    = maintTotal/length;
        output.monthly_costs.repairs_improv = repTotal/length;
        output.monthly_costs.parking        = parkTotal/length;
        output.monthly_costs.tolls          = tollsTotal/length;
        output.monthly_costs.fines          = finesTotal/length;
        output.monthly_costs.washing        = washTotal/length;
        output.distance_per_month = distTotal/length;
        output.kinetic_speed     = kineticTotal/length;
        output.virtual_speed     = virtualTotal/length;
    } 
 
    return output;
}

//********************
//this functions calculates the avearge of the averages of the same user inputs 
//
function CalculateStatistics(userIds, data, country){
//matrix *userIds* is a matrix with 2 columns, the 1st column has a unique user ID (uuid_client), 
//the 2nd column has always the same country
//matrix *data* is a matrix with everything for the specific country
//userIds.length is smaller than data.length, because some users fill in more than one time

//console.log(" "); console.log(" "); console.log(" "); console.log(" "); console.log(" ");
//console.log("************************************************************************");

    if(userIds.length!=0 && data.length!=0){
        var temp_i = []; //array with unique users, having one element per user 
        var temp_j = []; //array having the several inputs from the same user
  
        for(var i=0; i<userIds.length;i++){
            for(var j=0, n=0; j<data.length;j++){
                if(data[j].uuid_client==userIds[i].uuid_client){          
                    
                    //checks if the entry is ok
                    //and if it is an input spam/bot (the time to fill the form for the first input mus be greater than a time value)
                    //console.log("(i,j)=("+i+","+j+")"); console.log(data[j]);console.log(country);
                    if(is_DBentry_ok(data[j], country)
                        && ((n==0 && data[j].time_to_fill_form>statsConstants.MIN_TIME_TO_FILL_FORM) || n>0)){
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
            return {
                dep:      0, 
                ins:      0, 
                cred:     0, 
                insp:     0, 
                carTax:   0,
                standCos: 0,
                
                fuel:     0,
                maint:    0,
                rep:      0,
                park:     0,
                tolls:    0,
                fines:    0,
                wash:     0,
                runnCos:  0,
                
                totCos:   0,
                totCostsPerYear: 0,
                
                runCostsProDist: 0,
                totCostsProDist: 0,
                kinetic_speed:   0,
                virtual_speed:   0,
                
                users_counter:   0
            };
        }
                
        //console.log("get_average_costs");
        var avg = get_average_costs(temp_i);
        
        //standing costs
        var total_standing_costs_month = avg.monthly_costs.insurance + avg.monthly_costs.depreciation + avg.monthly_costs.credit +
            avg.monthly_costs.inspection + 0.5 * avg.monthly_costs.maintenance + avg.monthly_costs.car_tax;
        //running costs
        var total_running_costs_month = avg.monthly_costs.fuel + 0.5 * avg.monthly_costs.maintenance + avg.monthly_costs.repairs_improv + 
            avg.monthly_costs.parking + avg.monthly_costs.tolls + avg.monthly_costs.fines + avg.monthly_costs.washing;
        //total 
        var total_costs_month = avg.monthly_costs.insurance + avg.monthly_costs.fuel + avg.monthly_costs.depreciation +
            avg.monthly_costs.credit + avg.monthly_costs.inspection + avg.monthly_costs.maintenance +
            avg.monthly_costs.repairs_improv + avg.monthly_costs.car_tax + avg.monthly_costs.parking +
            avg.monthly_costs.tolls + avg.monthly_costs.fines + avg.monthly_costs.washing;
                
        var running_costs_p_unit_distance = avg.distance_per_month ? total_running_costs_month / avg.distance_per_month : 0;
        
        var total_costs_p_unit_distance = avg.distance_per_month? total_costs_month / avg.distance_per_month: 0;
        
        var total_costs_per_year = total_costs_month * 12;
        
        //object to be output as result
        var output = {
            dep:      avg.monthly_costs.depreciation, 
            ins:      avg.monthly_costs.insurance, 
            cred:     avg.monthly_costs.credit, 
            insp:     avg.monthly_costs.inspection, 
            carTax:   avg.monthly_costs.car_tax,
            standCos: total_standing_costs_month,
            
            fuel:     avg.monthly_costs.fuel,
            maint:    avg.monthly_costs.maintenance,
            rep:      avg.monthly_costs.repairs_improv,
            park:     avg.monthly_costs.parking,
            tolls:    avg.monthly_costs.tolls,
            fines:    avg.monthly_costs.fines,
            wash:     avg.monthly_costs.washing,
            runnCos:  total_running_costs_month,
            
            totCos:   total_costs_month,
            totCostsPerYear: total_costs_per_year,
            
            runCostsProDist: running_costs_p_unit_distance,
            totCostsProDist: total_costs_p_unit_distance,
            kinetic_speed:   avg.kinetic_speed,
            virtual_speed:   avg.virtual_speed,
            
            users_counter:   temp_i.length
        };
        //console.log(output);
        return output;
    }
    else{
        var output = {
            dep: 0, 
            ins: 0,
            cred: 0,
            insp: 0,
            carTax: 0,
            standCos: 0,
            
            fuel: 0,
            maint: 0,
            rep: 0,
            park: 0,
            tolls: 0,
            fines: 0,
            wash: 0,
            runnCos: 0,
            
            totCos: 0,
            totCostsPerYear: 0,
            
            runCostsProDist: 0,
            totCostsProDist: 0,
            kinetic_speed: 0,
            virtual_speed: 0,
            
            users_counter: 0
        };
        return output;
    } 
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
    else{
        return false;
    }   
    
    //depreciation
    if((!data.commercial_value_at_acquisition || !data.commercial_value_at_now) 
        || (Number(data.commercial_value_at_acquisition) < Number(data.commercial_value_at_now)))
        return false;
    
    var converted_value = convert_from_EUR(statsConstants.MAX_EUR_CAR_VALUE, country.currency, EURcurrConverterStats);
    if (converted_value!=-1 && Number(data.commercial_value_at_acquisition) > converted_value)
        return false;
    
    //insurance
    if(!data.insure_type || !data.insurance_value)
        return false;
    
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.INSURANCE, country.currency, EURcurrConverterStats);
    if (converted_value!=-1 && calculateInsuranceMonthlyValue(data.insure_type, data.insurance_value) > converted_value)
        return false;
    
    //credit
    if(data.credit=="true" && (!data.credit_number_installments || !data.credit_amount_installment || !data.credit_residual_value || !data.credit_borrowed_amount))
        return false;
    
    var credit_object = calculateInterestsMonthlyValue(data.credit, data.credit_borrowed_amount, data.credit_number_installments, data.credit_amount_installment, data.credit_residual_value, age_months);
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.CREDIT, country.currency, EURcurrConverterStats);
    if (credit_object.monthly_costs > converted_value)
        return false;
    
    //inspection
    if(!data.inspection_number_inspections || !data.inspection_average_inspection_cost)
        return false;
    
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.INSPECTION, country.currency, EURcurrConverterStats);
    var inspection_per_month = calculateMonthlyInspection(data.inspection_number_inspections, data.inspection_average_inspection_cost, age_months);
    if (inspection_per_month > converted_value)
        return false;
    
    //car taxes
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.TAXES, country.currency, EURcurrConverterStats);
    if(!data.vehicle_excise_tax || calculateMonthlyTaxes(data.vehicle_excise_tax) > converted_value)
        return false;
    
    //fuel & distance
    switch(data.fuel_calculation){
        case "km":
            if(!data.fuel_distance_based_fuel_efficiency || !data.fuel_distance_based_fuel_price)
                return false;
            //remove outliers
            if (convert_to_fuel_eff_l100km(data.fuel_distance_based_fuel_efficiency, country.fuel_efficiency_std) > statsConstants.MAX_FUEL_EFF_L100KM)
                return false;           
            switch(data.fuel_distance_based_car_to_work){
                case "true":
                    if(!data.fuel_distance_based_car_to_work_distance_home_work || !data.fuel_distance_based_car_to_work_distance_weekend || !data.fuel_distance_based_car_to_work_number_days_week)
                        return false;
                    //remove outliers
                    if (convert_std_dist_to_km(data.fuel_distance_based_car_to_work_distance_home_work, country.distance_std) > statsConstants.MAX_KM_DRIVEN_BETWEEN_HOME_AND_WORK)
                        return false;
                    if (convert_std_dist_to_km(data.fuel_distance_based_car_to_work_distance_weekend, country.distance_std) > statsConstants.MAX_KM_DRIVEN_WEEKEND)
                        return false;
                    break;
                case "false":
                    if(!data.fuel_distance_based_no_car_to_work_distance)
                        return false;
                    break;              
            }

            //remove outliers for fuel price
            converted_value = convert_fuel_price_to_EURpLitre(data.fuel_distance_based_fuel_price, country.currency, country.fuel_price_volume_std, EURcurrConverterStats);         
            if (converted_value!=-1 && converted_value>statsConstants.MAX_EUR_PER_LITRE_FUEL)
                return false;
            break;
            
        case "euros":
            if(!data.fuel_currency_based_currency_value)
                return false;
            switch(data.distance_drive_to_work){
                case "true":
                    if(!data.distance_days_per_week || !data.distance_home_job || !data.distance_journey_weekend)
                        return false;
                    break;
                case "false":
                    if(!data.distance_per_month)
                        return false;
                    break;
            }
            break;          
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
    
    if (fuel_object.monthly_cost > converted_value)
        return false;    
    
    //maintenance
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.MAINTENANCE, country.currency, EURcurrConverterStats);
    if(!data.maintenance || calculateMonthlyMaintenance(data.maintenance) > converted_value)
        return false;
    
    //repairs and improvements
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.REPAIRS, country.currency, EURcurrConverterStats);
    if(!data.repairs || calculateMonthlyRepairsAndImprovements(data.repairs) > converted_value)
        return false;
    
    //parking
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.PARKING, country.currency, EURcurrConverterStats);
    if(!data.parking || calculateMonthlyParking(data.parking) > converted_value)
        return false;
    
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
    }
    
    var monthly_tolls = calculateMonthlyTolls(data.tolls_daily, data.tolls_no_daily_value, data.tolls_no_daily_value, data.tolls_daily_expense, data.tolls_daily_number_days);
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.TOLLS, country.currency, EURcurrConverterStats);
    if (monthly_tolls > converted_value)
        return false;
    
    //fines
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.FINES, country.currency, EURcurrConverterStats);
    if(!data.tickets_value || calculateMonthlyFines(data.tickets_periodicity , data.tickets_value) > converted_value)
        return false;
    
    //washing
    converted_value = convert_from_EUR(statsConstants.MAX_EUR_MONTHLY.WASHING, country.currency, EURcurrConverterStats);
    if(!data.washing_value || calculateMonthlyWashing(data.washing_periodicity, data.washing_value) > converted_value)
        return false;

    //hours
    if(data.distance_drive_to_work == 'true' || data.fuel_distance_based_car_to_work == 'true'){
        if(!data.time_spent_home_job || !data.time_spent_weekend)
            return false;
    }
    else{
        if(!data.time_spent_min_drive_per_day || !data.time_spent_days_drive_per_month)
            return false;
    }
    return true;    
}

//checks if the computed result was OK and is not an outlier
function was_result_ok(result, country) {
    
    if(!isFinite(result.kinetic_speed))
        return false;
    
    if(result.kinetic_speed > statsConstants.MAX_AVERAGE_SPEED)
        return false;

    if(!isFinite(result.virtual_speed) || result.virtual_speed <= 0)
        return false;
    
    //distance per month
    var distance_per_month_km = convert_std_dist_to_km(result.distance_per_month, country.distance_std);
    if(distance_per_month_km > statsConstants.MAX_KM_DRIVEN_PER_MONTH)
        return false;    
    
    return true;
}

