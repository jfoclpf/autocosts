//********************
//statistics outlier removal constants
var statsConstants = {
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

//********************
// *.*
function CalculateStatistics(userIds, data, country){
    
    var temp = [];
    for(var i=0; i<userIds.length;i++){
        for(var j=0; j<data.length;j++){
            if(data[j].uuid_client==userIds[i].uuid_client){            
                
                if(is_DBentry_ok(data[j], country)){
                    var f1 = get_DB_part1(data[j]);
                    var f2 = get_DB_part2(data[j]);
                    var f3 = get_DB_part3(data[j]);
                    var result = calculate_costs(f1, f2, f3, country);
                    //alert(JSON.stringify(result, null, 4));
                    
                    //if has information regarding average kinetic and virtual speed
                    if (was_result_ok(result, country)){ 
                        temp.push({
                            dep: result.monthly_costs.depreciation, 
                            ins: result.monthly_costs.insurance, 
                            cred: result.monthly_costs.credit, 
                            insp: result.monthly_costs.inspection, 
                            carTax: result.monthly_costs.car_tax, 
                            fuel: result.monthly_costs.fuel,
                            maint: result.monthly_costs.maintenance,
                            rep: result.monthly_costs.repairs_improv,
                            park: result.monthly_costs.parking,
                            tolls: result.monthly_costs.tolls,
                            fines: result.monthly_costs.fines,
                            wash: result.monthly_costs.washing,
                            dist: result.distance_per_month,
                            kinetic: result.fin_effort.kinetic_speed,
                            virtual: result.fin_effort.virtual_speed
                        });
                    }
                    break;
                }               
            }           
        }       
    }

    //alert("starting average calculation");
    //compute average
    if(temp.length){
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
        for(i=0;i<temp.length;i++){
            depTotal += temp[i].dep;
            insTotal += temp[i].ins;
            credTotal += temp[i].cred;
            inspTotal += temp[i].insp;
            carTaxTotal += temp[i].carTax;
            fuelTotal += temp[i].fuel;
            maintTotal += temp[i].maint;
            repTotal += temp[i].rep;
            parkTotal += temp[i].park;
            tollsTotal += temp[i].tolls;
            finesTotal += temp[i].fines;
            washTotal += temp[i].wash;
            distTotal += temp[i].dist;          
            kineticTotal += temp[i].kinetic;        
            virtualTotal += temp[i].virtual;            
        }
        var depAverage = depTotal/temp.length;
        var insAverage = insTotal/temp.length;
        var credAverage = credTotal/temp.length;
        var inspAverage = inspTotal/temp.length;
        var carTaxAverage = carTaxTotal/temp.length;
        var fuelAverage = fuelTotal/temp.length;
        var maintAverage = maintTotal/temp.length;
        var repAverage = repTotal/temp.length;
        var parkAverage = parkTotal/temp.length;
        var tollsAverage = tollsTotal/temp.length;
        var finesAverage = finesTotal/temp.length;
        var washAverage = washTotal/temp.length;
        var distAverage = distTotal/temp.length;
        var kineticAverage = kineticTotal/temp.length;
        var virtualAverage = virtualTotal/temp.length;
            
        //standing costs
        var total_standing_costs_month = insAverage + depAverage + credAverage +
            inspAverage + 0.5 * maintAverage + carTaxAverage;
        //running costs
        var total_running_costs_month = fuelAverage + 0.5 * maintAverage + repAverage + parkAverage +
            tollsAverage + finesAverage + washAverage;
        //total 
        var total_costs_month = insAverage + fuelAverage + depAverage +
            credAverage + inspAverage + maintAverage +
            repAverage + carTaxAverage + parkAverage +
            tollsAverage + finesAverage + washAverage;
                
        var running_costs_p_unit_distance = distAverage ? total_running_costs_month / distAverage : 0;
        
        var total_costs_p_unit_distance = distAverage? total_costs_month / distAverage: 0;
        
        var total_costs_per_year = total_costs_month * 12;
                
        $('#txt_depr').html(depAverage.toFixed(1));
        $('#txt_ins').html(insAverage.toFixed(1));
        $('#txt_cred').html(credAverage.toFixed(1));
        $('#txt_insp').html(inspAverage.toFixed(1));
        $('#txt_tax').html(carTaxAverage.toFixed(1));
        $('#txt_standing_costs').html(total_standing_costs_month.toFixed(1));
        $('#txt_fuel').html(fuelAverage.toFixed(1));
        $('#txt_maint1, #txt_maint2').html((maintAverage/2).toFixed(1));
        $('#txt_rep').html(repAverage.toFixed(1));
        $('#txt_park').html(parkAverage.toFixed(1));
        $('#txt_tolls').html(tollsAverage.toFixed(1));
        $('#txt_fines').html(finesAverage.toFixed(1));
        $('#txt_wash').html(washAverage.toFixed(1));
        $('#txt_running_costs').html(total_running_costs_month.toFixed(1));
        $('#txt_total_overal').html(total_costs_month.toFixed(0));
        $('#txt_running_costs_dist').html(running_costs_p_unit_distance.toFixed(2));
        $('#txt_total_costs_p_unit').html(total_costs_p_unit_distance.toFixed(2));
        $('#txt_kinetic_speed').html(kineticAverage.toFixed(0));
        $('#txt_virtual_speed').html(virtualAverage.toFixed(0));
        $('#txt_total_costs_year').html(((total_costs_per_year/100).toFixed(0))*100);
        $('#users_counter').html((temp.length / 10).toFixed(0)*10);
    }
    else{
        $('.value-field').html('0.0');
        $('#users_counter').html(0);
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
    
    if(!isFinite(result.fin_effort.kinetic_speed))
        return false;
    
    if(result.fin_effort.kinetic_speed > statsConstants.MAX_AVERAGE_SPEED)
        return false;
                
    if(!isFinite(result.fin_effort.virtual_speed) || result.fin_effort.virtual_speed <= 0)
        return false;
    
    //distance per month
    var distance_per_month_km = convert_std_dist_to_km(result.distance_per_month, country.distance_std);
    if(distance_per_month_km > statsConstants.MAX_KM_DRIVEN_PER_MONTH)
        return false;    
    
    return true;
}

function blockTable() {
        $('#blocker').show();
        var width = $('#div13').width();
        var height = $('#div13').height();
        $('#blocker').height(height).width(width);
}

