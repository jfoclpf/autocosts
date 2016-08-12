var conversionConstants = {
    KM_TO_MILES: 1.609344,
    KM_TO_MIL: 10,
    GALLON_IMP_TO_LITER: 4.54609188,
    GALLON_US_TO_LITER: 3.78541178
};

//currency converters for statistics analysis 
//not for exact currency conversions, only for outliers removal
//just the order of magnitude is needed
var EURcurrConverterStats = {
    "EUR": 1,
    "USD": 1.1,
    "GBP": 0.85,
    "BRL": 3.5,
    "HUF": 320,
    "AUD": 1.5,
    "CAD": 1.4,
    "CZK": 30,
    "DKK": 7.4,
    "NOK": 9,
    "PLN": 4.2,
    "RON": 4.5,
    "RUB": 60,
    "SEK": 9.4,
    "TRY": 3,
    "BOB": 7.7,
    "CLP": 721,
    "COP": 3200,
    "DOP": 51,
    "VEF": 11, 
    "ARS": 16.4,
    "CRC": 616,
    "DOP": 51.5,
    "GTQ": 8.3,
    "MXN": 20,
    "NIO": 32,
    "PAB": 1.11,
    "PEN": 3.7,
    "PYG": 6137,
    "SVC": 9.7,
    "UYU": 32,
    "UAH": 20
};

//function that converts an input value in EUR to standard currency
//value    -> input value in EUR
//currency -> output currency
//EURcurrConverterStats -> Currency Converter Object
//returns value in EUR | -1 if currency not found
function convert_from_EUR(value, currency, EURcurrConverterStats){

    var value_t = parseFloat(value);
    var conversionRatio= EURcurrConverterStats[currency];       
        
    if (!conversionRatio){
        return -1;
    }
    
    return value_t*conversionRatio;
}


//converts chosen fuel consumption to l/100km
function convert_to_fuel_eff_l100km(fuel_eff, fuel_efficiency_std_option) {
//fuel_efficiency_std_option shall be either:
//1 - l/100km - litres per 100 kilometres
//2 - km/l - kilometres per litre
//3 - mpg(imp) - miles per imperial gallon
//4 - mpg(US) - miles per US gallon
//5 - l/mil - litres per 10 kilometers
//6 - km/gal(US) - km per US gallon

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
        case 6:
            return (100 * conversionConstants.GALLON_US_TO_LITER) / fuel_eff_temp; //km/gal(US) -> l/100km (1 mil = 10km)
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

//convert fuel price to EUR per litre
function convert_fuel_price_to_EURpLitre(value, currency, fuel_price_volume_std, currencyConverter) {

    var value_t = parseFloat(value);
    value_t = convert_to_fuel_price_CURRpLitre(value_t, fuel_price_volume_std);//converts to currency per litre
    return convert_from_EUR(value_t, currency, currencyConverter); //converts currency to EUR
}
