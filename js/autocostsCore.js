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
        case "semestral":
            insuranceValue = insuranceInputValue / 6;
            break;
        case "anual":
            insuranceValue = insuranceInputValue / 12;
            break;
        case "mensal":
            insuranceValue = parseFloat(insuranceInputValue);
            break;
        case "trimestral":
            insuranceValue = insuranceInputValue / 3;
            break;
    }
    return insuranceValue;
}

function calculateMonthlyDepreciation(initialCost, finalCost, months) {
       return (initialCost - finalCost) / months;
}