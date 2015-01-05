//********************
//normalizing functions

var conversionConstants = {
    KM_TO_MILES: 1.609344,
    KM_TO_MIL: 10,
    GALLON_IMP_TO_LITER: 4.54609188,
    GALLON_US_TO_LITER: 3.78541178
};


//converts chosen fuel consumption to l/100km
function convert_to_fuel_eff_l100km(fuel_eff, fuel_efficiency_std_option) {

    var fuel_eff_temp = parseFloat(fuel_eff);
    
    switch (fuel_efficiency_std_option) {
        case 1:
            return fuel_eff_temp;
        case 2:
            return 100 / fuel_eff_temp;  //km/l -> l/100km
        case 3:
            return (100 * conversionConstants.GALLON_IMP_TO_LITER) / (conversionConstants.KM_TO_MILES * fuel_eff_temp); //mpg(imp) -> l/100km
        case 4:
            return (100 * conversionConstants.GALLON_US_TO_LITER) / (conversionConstants.KM_TO_MILES * fuel_eff_temp); //mpg(US) -> l/100km
        case 5:
            return conversionConstants.KM_TO_MIL * fuel_eff_temp; //l/mil -> l/100km (1 mil = 10km)
    }
}

//converts chosen fuel price to CURRENCY_unit/litre
function convert_to_fuel_price_CURRpLitre(fuel_price, fuel_price_volume_std) {

    var fuel_price_temp = parseFloat(fuel_price);

    switch (fuel_price_volume_std) {
        case 1:
            return fuel_price_temp; // CURRENCY_unit/litre to CURRENCY_unit/litre
        case 2:
            return fuel_price_temp / conversionConstants.GALLON_IMP_TO_LITER; //currency/(imp gallon) -> currency/litre
        case 3:
            return fuel_price_temp / conversionConstants.GALLON_US_TO_LITER; //currency/(US gallon) -> currency/litre
    }
}

//converts chosen distances to km
function convert_std_dist_to_km(dist, distance_std_option) {

    var dist_t = parseFloat(dist);

    switch (distance_std_option) {
        case 1:
            return dist_t;
        case 2:
            return dist_t * conversionConstants.KM_TO_MILES; //miles to km
        case 3:
            return dist_t * conversionConstants.KM_TO_MIL; //mil(10km) to km
    }
}

//converts km to chosen distances
function convert_km_to_std_dist(dist, distance_std_option) {

    var dist_t = parseFloat(dist);

    switch (distance_std_option) {
        case 1:
            return dist_t;
        case 2:
            return dist_t / conversionConstants.KM_TO_MILES; //km to miles
        case 3:
            return dist_t / conversionConstants.KM_TO_MIL; //km to mil(10km)
    }
}

//end of normalizing functions

function calculateInsuranceMonthlyValue(insuranceType, insuranceInputValue) {
    var insuranceValue;
    switch(insuranceType)
    {
		case "mensal":
            insuranceValue = Number(insuranceInputValue);
            break;
		case "trimestral":
            insuranceValue = insuranceInputValue / 3;
            break;
        case "semestral":
            insuranceValue = insuranceInputValue / 6;
            break;
        case "anual":
            insuranceValue = insuranceInputValue / 12;
            break;       
    }
    return insuranceValue;
}

function calculateMonthlyDepreciation(initialCost, finalCost, months) {
       return (initialCost - finalCost) / months;
}

function getNetIncomePerHour(){

	var typeIncome = $('#income_div').find('input[type=radio]:checked').val();
	var isJob = $('#working_time_div').find('input[type=radio]:checked').val();
	var a = 11;
	var b = 36;
	var T, x, y, n;
	if(isJob=='true'){
		a = parseInt($('#time_month_per_year').val());
		b = parseInt($('#time_hours_per_week').val());
	}
	T = 365.25/7 * a/12 * b;
	switch(typeIncome){
		case 'year':
			x = parseInt($('#income_per_year').val());
			n = x/T;
			break;
		case 'month':
			x = parseInt($('#income_per_month').val());
			y = parseInt($('#income_months_per_year').val());
			n = (x*y)/T;
			break;
		case 'week':
			x = parseInt($('#income_per_week').val());
			y = parseInt($('#income_weeks_per_year').val())
			n = (x*y)/T;
			break;
		case 'hour':
			n = parseInt($('#income_per_hour').val());
	}
	return n;
}

function getHoursOfWorkToAffordCar(period, totalCosts){
	var hw = 0;
	var netIncome = getNetIncomePerHour();
	switch(period){
		case 'year':
			hw = totalCosts * 12 / netIncome;
			break;
		case 'month':
			hw = totalCosts / netIncome;
			break;
		case 'week':
			hw = totalCosts * 12 / 365.25 * 7 * 1 / netIncome;
			break;
		case 'day':
			hw = totalCosts * 12 / 365.25 * 1 / netIncome;
			break;
	}
	return hw;
}

function getDeprecation(data){
	var today = new Date();
	var date_auto = new Date(data.acquisition_year, data.acquisition_month - 1);
	var age_months = date_diff(date_auto,today);
	var dep = calculateMonthlyDepreciation(Number(data.commercial_value_at_acquisition), Number(data.commercial_value_at_now), age_months);
	return dep;
}

function getInsurance(data){
	var ins = calculateInsuranceMonthlyValue(data.insure_type, data.insurance_value);
	return ins;
}

function getCredit(data){
	var today = new Date();
	var date_auto = new Date(data.acquisition_year, data.acquisition_month - 1);
	var age_months = date_diff(date_auto,today);	
	var total_interests = ((data.credit_number_installments * data.credit_amount_installment) + Number(data.credit_residual_value)) - Number(data.credit_borrowed_amount);
	var credit;
	if(age_months >= data.credit_number_installments)
		credit = total_interests / age_months;
	else
		credit = total_interests / data.credit_number_installments;		
	return credit;	
}

function getInspection(data){
	var today = new Date();
	var date_auto = new Date(data.acquisition_year, data.acquisition_month - 1);
	var age_months = date_diff(date_auto,today);
	var inspection = (data.inspection_number_inspections * data.inspection_average_inspection_cost) / age_months;
	
	var inspection = (isNaN(inspection)) ? 0 : inspection;
	return inspection;
}

function getFuel(data, country){
	var fuel_period_km, fuel_cost_period;
	var distance = 0;
	var fuel;
	var type_calc_fuel = data.fuel_calculation;
	switch(type_calc_fuel){
		case "km":
			var fuel_eff_l100km = convert_to_fuel_eff_l100km(data.fuel_distance_based_fuel_efficiency, country.fuel_efficiency_std);
			var fuel_price_CURRpLitre = convert_to_fuel_price_CURRpLitre(data.fuel_distance_based_fuel_price, country.fuel_price_volume_std);
			if(data.fuel_distance_based_car_to_work=="false"){
				fuel_period_km = data.fuel_distance_based_no_car_to_fuel_period_distance;
				switch(fuel_period_km){
					case "1":
						distance = Number(data.fuel_distance_based_no_car_to_work_distance);				
						break;
					case "2":
						distance = data.fuel_distance_based_no_car_to_work_distance / 2;				
						break;
					case "3":
						distance = data.fuel_distance_based_no_car_to_work_distance / 3;				
						break;
					case "4":
						distance = data.fuel_distance_based_no_car_to_work_distance / 6;				
						break;
					case "5":
						distance = data.fuel_distance_based_no_car_to_work_distance / 12;				
						break;
				}
				//if miles were chosen must convert input to kilometres						
				var distance_converted = convert_std_dist_to_km(distance, country.distance_std);
				fuel = fuel_eff_l100km * distance_converted * fuel_price_CURRpLitre / 100;
			}
			else{
				//if miles were chosen must convert input to kilometres
				var distance_home2job = convert_std_dist_to_km(data.fuel_distance_based_car_to_work_distance_home_work, country.distance_std);
				var km_weekend_value = convert_std_dist_to_km(data.fuel_distance_based_car_to_work_distance_weekend, country.distance_std);
				var total_km = ((2 * distance_home2job * parseInt(data.fuel_distance_based_car_to_work_number_days_week, 10)) + km_weekend_value) * (30.4375 / 7);
				distance_std = convert_km_to_std_dist(total_km, country.distance_std);
				fuel = fuel_eff_l100km * total_km * fuel_price_CURRpLitre / 100;
				distance = total_km;
			}
			break;
		case "euros":
			var price_mes;
			fuel_cost_period = data.fuel_currency_based_periodicity;
			switch(fuel_cost_period){
				case "1":
					price_mes = Number(data.fuel_currency_based_currency_value);
					break;
				case "2":
					price_mes = data.fuel_currency_based_currency_value / 2;			
					break;
				case "3":
					price_mes = data.fuel_currency_based_currency_value / 3;			
					break;
				case "4":
					price_mes = data.fuel_currency_based_currency_value / 6;			
					break;
				case "5":
					price_mes = data.fuel_currency_based_currency_value / 12;			
					break;
			}
			fuel = price_mes;
			break;
	}	
		
	return {
		fuel: fuel,
		distance: distance
	}
}

function getTolls(data){
	var tolls_period = data.tolls_no_daily_period;
	var tolls;
	if(data.tolls_daily == "false"){
		switch(tolls_period){
			case "1":
				tolls = Number(data.tolls_no_daily_value);           
				break;
			case "2":
				tolls = data.tolls_no_daily_value / 2;            
				break;
			case "3":
				tolls = data.tolls_no_daily_value / 3;            
				break;
			case "4":
				tolls = data.tolls_no_daily_value / 6;            
				break;
			case "5":
				tolls = data.tolls_no_daily_value / 12;            
				break;
		}
	}
	else
		tolls = data.tolls_daily_expense * data.tolls_daily_number_days;		
	return tolls;
}

function getFines(data){
	var fines;
	var fines_period = data.tickets_periodicity;
	switch(fines_period) {
		case "1":
			fines = Number(data.tickets_value);        
			break;
		case "2":
			fines = data.tickets_value / 2;       
			break;
		case "3":
			fines = data.tickets_value / 3;        
			break;
		case "4":
			fines = data.tickets_value / 6;        
			break;
		case "5":
			fines = data.tickets_value / 12;        
			break;
    }
	return fines;
}

function getWashing(data){
	var washing;
	washing_period = data.washing_periodicity;
	switch(washing_period) {
		case "1":
			washing = Number(data.washing_value);        
			break;
		case "2":
			washing = data.washing_value / 2;        
			break;
		case "3":
			washing = data.washing_value / 3;        
			break;
		case "4":
			washing = data.washing_value / 6;        
			break;
		case "5":
			washing = data.washing_value / 12;        
			break;
    }
	return washing;	
}

function getDriveDistance(data){
	var drive_per_month = 0;
	var drive_to_work_days_per_week, dist_home_job, journey_weekend, aver_drive_per_week, drive_per_year;
	if(data.fuel_calculation != 'km'){
		if(data.distance_drive_to_work == 'true'){
			drive_to_work_days_per_week = data.distance_days_per_week;
			dist_home_job =  data.distance_home_job;
			journey_weekend = Number(data.distance_journey_weekend);
			aver_drive_per_week = 2 * drive_to_work_days_per_week * dist_home_job + journey_weekend;
		
			drive_per_month = 365.25 / 7 * aver_drive_per_week / 12;
			drive_per_year = 365.25 / 7 * aver_drive_per_week;	
		
		}
		else{
			switch(data.distance_period)
			{
				case "1":
					drive_per_month = Number(data.distance_per_month);				
					break;
				case "2":
					drive_per_month = data.distance_per_month / 2;
					break;
				case "3":
					drive_per_month = data.distance_per_month / 3;				
					break;
				case "4":
					drive_per_month = data.distance_per_month / 6;				
					break;
				case "5":
					drive_per_month = data.distance_per_month / 12;			
					break;
			}
			var drive_per_year = drive_per_month * 12;			
		}	
	}
	else{
		if(data.fuel_distance_based_car_to_work == 'true'){
			drive_to_work_days_per_week = data.fuel_distance_based_car_to_work_number_days_week;
			dist_home_job = Number(data.fuel_distance_based_car_to_work_distance_home_work);
			journey_weekend = Number(data.fuel_distance_based_car_to_work_distance_weekend);
			aver_drive_per_week = 2 * drive_to_work_days_per_week * dist_home_job + journey_weekend;	

			drive_per_month = 365.25 / 7 * aver_drive_per_week / 12;
			drive_per_year = 365.25 / 7 * aver_drive_per_week;
		}	
		else{	
			switch(data.fuel_distance_based_no_car_to_fuel_period_distance)
			{
				case "1":
					drive_per_month = Number(data.fuel_distance_based_no_car_to_work_distance);				
					break;
				case "2":
					drive_per_month = data.fuel_distance_based_no_car_to_work_distance / 2;
					break;
				case "3":
					drive_per_month = data.fuel_distance_based_no_car_to_work_distance / 3;				
					break;
				case "4":
					drive_per_month = data.fuel_distance_based_no_car_to_work_distance / 6;				
					break;
				case "5":
					drive_per_month = data.fuel_distance_based_no_car_to_work_distance / 12;			
					break;
			}
		}
	}
	return drive_per_month;		
}

function getHours(data){
	var hours_drive_per_month;
	if(data.distance_drive_to_work == 'true' || data.fuel_distance_based_car_to_work == 'true'){
		var time_home_job = data.time_spent_home_job;
		var time_weekend = Number(data.time_spent_weekend);
		var min_drive_per_week = 2 * time_home_job * (data.fuel_distance_based_car_to_work_number_days_week ? data.fuel_distance_based_car_to_work_number_days_week : data.distance_days_per_week) + time_weekend;
		hours_drive_per_month = 365.25 / 7 / 12 * min_drive_per_week / 60;	
	}
	else{
		var min_drive_per_day = data.time_spent_min_drive_per_day;
		var days_drive_per_month = data.time_spent_days_drive_per_month;
		hours_drive_per_month = min_drive_per_day * days_drive_per_month / 60;
	}
	var hours_drive_per_year = hours_drive_per_month * 12;
	return hours_drive_per_year;
}

function getNetIncomePerHourFromDb(data){
	var typeIncome = data.income_type;
	var isJob = data.work_time;
	var a = 11;
	var b = 36;
	var T, x, y, n;
	if(isJob=='true'){
		a = parseInt(data.work_time_month_per_year);
		b = parseInt(data.work_time_hours_per_week);
	}
	T = 365.25/7 * a/12 * b;
	switch(typeIncome){
		case 'year':
			x = parseInt(data.income_per_year);
			n = T ? x/T : 0;
			break;
		case 'month':
			x = parseInt(data.income_per_month);
			y = parseInt(data.income_months_per_year);
			n = T ? (x*y)/T : 0;
			break;
		case 'week':
			x = parseInt(data.income_per_week);
			y = parseInt(data.income_weeks_per_year)
			n = T ? (x*y)/T : 0;
			break;
		case 'hour':
			n = parseInt(data.income_per_hour);
	}
	return n;
}

function setStatisticValues(userIds, data, cntr){
	var temp = [];	
	for(var i=0; i<userIds.length;i++){		
		for(var j=0; j<data.length;j++){		
			if(data[j].uuid_client==userIds[i].uuid_client){			
				if(is_DBentry_ok(data[j])){
					//depreciation
					var depreciation = getDeprecation(data[j]);
					//insurance
					var insurance = getInsurance(data[j]);
					//credit
					var interest = getCredit(data[j]);
					//inspection
					var inspection = getInspection(data[j]);						
					//car tax
					var car_tax = Number(data[j].vehicle_excise_tax) / 12;
					//fuel
					var fuelObj = getFuel(data[j], cntr);				
					//maintenance
					var maintenance = data[j].maintenance / 12;
					//repairs
					var repairs = data[j].repairs / 12;
					//parking
					var parking = Number(data[j].parking);
					//tolls
					var tolls = getTolls(data[j]);
					//fines
					var fines = getFines(data[j]);
					//washing
					var washing = getWashing(data[j]);
					//drive per months
					var drive_per_month = getDriveDistance(data[j]);
					var distance_per_month;
					//drive per year
					var drive_per_year = drive_per_month * 12;				
					//hours drive per year
					var hours_drive_per_year = getHours(data[j]);
					
					//variable costs per distance 
					if (data.fuel_calculation == "km")
						distance_per_month = fuelObj.distance;
					else
						distance_per_month = drive_per_month;
											
					//kinetic		
					var kinetic = drive_per_year / hours_drive_per_year;					
					if(isNaN(kinetic) || convert_std_dist_to_km(kinetic, cntr.distance_std) > 120)						
						break;					
					//virtual
					var total_costs_year = (insurance + fuelObj.fuel + depreciation + interest + inspection + maintenance +
						repairs + car_tax + parking + tolls + fines + washing) * 12;
					var aver_income_per_hour = getNetIncomePerHourFromDb(data[j]);					
					var virtual = aver_income_per_hour ? drive_per_year /(hours_drive_per_year + (total_costs_year / aver_income_per_hour)) : kinetic;
					if(isNaN(virtual))
						break
							
					temp.push({
						dep: depreciation, 
						ins: insurance, 
						cred: interest, 
						insp: inspection, 
						carTax: car_tax, 
						fuel: fuelObj.fuel,
						maint: maintenance,
						rep: repairs,
						park: parking,
						tolls: tolls,
						fines: fines,
						wash: washing,
						dist: distance_per_month,
						kinetic: kinetic,
						virtual: virtual
					});
					break;
				}				
			}			
		}		
	}
	
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
		for(var i=0;i<temp.length;i++){
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
		$('#txt_maint').html(maintAverage.toFixed(1));
		$('#txt_rep').html(repAverage.toFixed(1));
		$('#txt_park').html(parkAverage.toFixed(1));
		$('#txt_tolls').html(tollsAverage.toFixed(1));
		$('#txt_fines').html(finesAverage.toFixed(1));
		$('#txt_wash').html(washAverage.toFixed(1));
		$('#txt_running_costs').html(total_running_costs_month.toFixed(1));
		$('#txt_total_overal').html(total_costs_month.toFixed(0));
		$('#txt_running_costs_dist').html(running_costs_p_unit_distance.toFixed(1));
		$('#txt_total_costs_p_unit').html(total_costs_p_unit_distance.toFixed(1));
		$('#txt_kinetic_speed').html(kineticAverage.toFixed(1));
		$('#txt_virtual_speed').html(virtualAverage.toFixed(1));
		$('#txt_total_costs_year').html(((total_costs_per_year/100).toFixed(0))*100);
		$('#users_counter').html(temp.length);
	}
	else{
		$('.value-field').html('0.0');
		$('#users_counter').html(0);
	}	
}

function is_DBentry_ok(data){	
	if(data.acquisition_year && data.acquisition_month){
		var today = new Date();
		var date_auto = new Date(data.acquisition_year, data.acquisition_month - 1);
		var age_months = date_diff(date_auto,today);
		if(!age_months){ return false; }	 
	}
	else{
		return false;
	}	
	//deprecation
	if((!data.commercial_value_at_acquisition || !data.commercial_value_at_now) 
		|| (Number(data.commercial_value_at_acquisition) < Number(data.commercial_value_at_now)))
		return false;		
	//insurance
	if(!data.insure_type || !data.insurance_value)
		return false;		
	//credit
	if(data.credit=="true" && (!data.credit_number_installments || !data.credit_amount_installment || !data.credit_residual_value || !data.credit_borrowed_amount))
		return false;
	//inspections
	if(!data.inspection_number_inspections || !data.inspection_average_inspection_cost)
		return false;
	//car tax
	if(!data.vehicle_excise_tax)
		return false;
	//fuel & distance
	switch(data.fuel_calculation){
		case "km":
			if(!data.fuel_distance_based_fuel_efficiency || !data.fuel_distance_based_fuel_price)
				return false;
			switch(data.fuel_distance_based_car_to_work){
				case "true":
					if(!data.fuel_distance_based_car_to_work_distance_home_work || !data.fuel_distance_based_car_to_work_distance_weekend || !data.fuel_distance_based_car_to_work_number_days_week)
						return false;
					break;
				case "false":
					if(!data.fuel_distance_based_no_car_to_work_distance)
						return false;
					break;				
			}
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
	//maintenance
	if(!data.maintenance)
		return false;
	//repairs
	if(!data.repairs)
		return false;
	//parking
	if(!data.parking)
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
	//fines
	if(!data.tickets_value)
		return false;
	//washing
	if(!data.washing_value)
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

function blockTable() {
        $('#blocker').show();
        var width = $('#div13').width();
        var height = $('#div13').height();
        $('#blocker').height(height).width(width);
}

