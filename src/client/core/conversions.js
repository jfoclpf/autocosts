/*************** CALCULATOR CONVERSION JS FUNCTIONS *************************/
//===========================================================
//see also: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function

//UNITS CONVERSION MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

autocosts.calculatorModule.conversionsModule = (function(){

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
    function convertFromEURtoCurrency(value, currency, EURcurrConverterStats){

        value = parseFloat(value);
        var conversionRatio = EURcurrConverterStats[currency];

        if (isNaN(value)){
            throw "Error on convertFromEURtoCurrency, value to convert is not a number: " + value;
        }
        if (isNaN(conversionRatio)){
            throw "Error on convertFromEURtoCurrency, conversionRatio is not a number: " + conversionRatio;
        }        

        return value * conversionRatio;
    }

    //converts chosen fuel consumption to l/100km
    function convertFuelEfficiencyToL100km(fuelEfficiency, fuelEfficiencyOption) {
    //fuelEfficiencyOption shall be either:
    //1 - l/100km - litres per 100 kilometres
    //2 - km/l - kilometres per litre
    //3 - mpg(imp) - miles per imperial gallon
    //4 - mpg(US) - miles per US gallon
    //5 - l/mil - litres per 10 kilometers
    //6 - km/gal(US) - km per US gallon

        fuelEfficiency = parseFloat(fuelEfficiency);

        if (isNaN(fuelEfficiency)){
            throw "Error on convertFuelEfficiencyToL100km, fuelEfficiency is not a number: " + fuelEfficiency;
        }        
        
        switch (fuelEfficiencyOption) {
            case 1:
            case "l/100km": 
                return fuelEfficiency;
            case 2:
            case "km/l":
                return 100 / fuelEfficiency;  //km/l -> l/100km
            case 3:
            case "mpg(imp)":
                return (100 * conversionConstants.GALLON_IMP_TO_LITER) / (conversionConstants.KM_TO_MILES * fuelEfficiency); //mpg(imp) -> l/100km
            case 4:
            case "mpg(US)":
                return (100 * conversionConstants.GALLON_US_TO_LITER) / (conversionConstants.KM_TO_MILES * fuelEfficiency); //mpg(US) -> l/100km
            case 5:
            case "l/mil":
                return conversionConstants.KM_TO_MIL * fuelEfficiency; //l/mil -> l/100km (1 mil = 10km)
            case 6:
            case "km/gal(US)":
                return (100 * conversionConstants.GALLON_US_TO_LITER) / fuelEfficiency; //km/gal(US) -> l/100km (1 mil = 10km)
            default:
                throw "Error on convertFuelEfficiencyToL100km, fuelEfficiencyOption " + fuelEfficiencyOption + " unknown"; 
        }
    }

    //converts chosen fuel price to CURRENCY_unit/litre
    function convertFuelPriceToLitre(fuelPrice, fuelPriceVolumeUnit) {

        fuelPrice = parseFloat(fuelPrice);
        
        if (isNaN(fuelPrice)){
            throw "Error on convertFuelPriceToLitre, fuelPrice is not a number: " + fuelPrice;
        }        

        switch (fuelPriceVolumeUnit) {
            case 1:
            case "litre":
            case "Litre":
            case "liter":
            case "Litre":
            case "ltr":
            case "l":             
                return fuelPrice; // CURRENCY_unit/litre to CURRENCY_unit/litre
            case 2:
            case "imp gallon":
            case "imperial gallon":
            case "imp gal":
            case "imperial gal":                
                return fuelPrice / conversionConstants.GALLON_IMP_TO_LITER; //currency/(imp gallon) -> currency/litre
            case 3:
            case "US gallon":
            case "US gal":                
                return fuelPrice / conversionConstants.GALLON_US_TO_LITER; //currency/(US gallon) -> currency/litre
            default:
                throw "Error on convertFuelPriceToLitre, fuelPriceVolumeUnit " + fuelPriceVolumeUnit + " unknown"; 
        }
    }

    //converts chosen distances to km
    function convertDistanceToKm(distance, distanceUnitOption) {

        distance = parseFloat(distance);
        
        if (isNaN(distance)){
            throw "Error on convertDistanceToKm, distance is not a number: " + distance;
        }        

        switch (distanceUnitOption) {
            case 1:
            case "km":
                return distance;
            case 2:
            case "mile":
            case "miles":
                return distance * conversionConstants.KM_TO_MILES; //miles to km
            case 3:
            case "mil(10km)":
            case "scandinavian mile":
            case "nordic mile":
                return distance * conversionConstants.KM_TO_MIL; //mil(10km) to km
            default:
                throw "Error on convertDistanceToKm, distanceUnitOption " + distanceUnitOption + " unknown";               
        }
    }

    //converts km to chosen distances
    function convertDistanceFromKm(distance, distanceUnitOption) {

        distance = parseFloat(distance);

        if (isNaN(distance)){
            throw "Error on convertDistanceFromKm, distance is not a number: " + distance;
        }        
        
        switch (distanceUnitOption) {
            case 1:
            case "km":                
                return distance;
            case 2:
            case "mile":
            case "miles":                
                return distance / conversionConstants.KM_TO_MILES; //km to miles
            case 3:
            case "mil(10km)":
            case "scandinavian mile":
            case "nordic mile":                
                return distance / conversionConstants.KM_TO_MIL; //km to mil(10km)
            default:
                throw "Error on convertDistanceFromKm, distanceUnitOption " + distanceUnitOption + " unknown";                                       
        }
    }

    //convert fuel price to EUR per litre
    function convertFuelPriceToEURperLitre(value, currency, fuelPriceVolumeUnit, currencyConverter) {

        value = parseFloat(value);
        value = convertFuelPriceToLitre(value, fuelPriceVolumeUnit);  //converts to currency per litre
        return convertFromEURtoCurrency(value, currency, currencyConverter); //converts currency to EUR
    }
    
    return{
        convertFromEURtoCurrency: convertFromEURtoCurrency,
        convertFuelEfficiencyToL100km: convertFuelEfficiencyToL100km,
        convertFuelPriceToLitre: convertFuelPriceToLitre,
        convertDistanceToKm: convertDistanceToKm,
        convertDistanceFromKm: convertDistanceFromKm,
        convertFuelPriceToEURperLitre: convertFuelPriceToEURperLitre
    };
    
})();
