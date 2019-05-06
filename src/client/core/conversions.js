/** ************* CALCULATOR CONVERSION JS FUNCTIONS *************************/
//= ==========================================================
// see also: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function

// UNITS CONVERSION MODULE
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules
// This file is used both by the browser and by node/commonsJS, the latter being called by getAvgFromDB.js

// check for node
if (!autocosts && typeof window === 'undefined') { // eslint-disable-line
  var autocosts = {}
}

autocosts.calculatorModule = autocosts.calculatorModule || {}
autocosts.calculatorModule.conversionsModule = (function () {
  var conversionConstants = {
    KM_TO_MILES: 1.609344,
    KM_TO_MIL: 10,
    GALLON_IMP_TO_LITER: 4.54609188,
    GALLON_US_TO_LITER: 3.78541178
  }

  // this dictionary is not a language dictionary, it is merely for backward
  // and broad function input compatibility and to encompass user old inputs in databases
  var dictionary = {
    distance: {
      'km': [1, 'kms', 'kilometre', 'kilometers', 'kilometres'],
      'mi': [2, 'mi', 'mile', 'miles'],
      'mil(10km)': [3, 'nordicMile', 'nordic mile', 'mil(10km)', 'scandinavian mile']
    },
    fuelPriceVolume: {
      'ltr': [1, 'l', 'litre', 'Litre', 'liter', 'Liter'],
      'gal(imp)': [2, 'imp gallon', 'imperial gallon', 'imperial gal', 'gal(UK)'],
      'gal(US)': [3, 'US gallon', 'US gal'],
      'kWh': [4, 'KWH']
    },
    fuelEfficiency: {
      'l/100km': [1, 'ltr/100km'],
      'km/l': [2, 'km/ltr'],
      'mpg(imp)': [3, 'mpg(imp.)', 'mpg(UK)'],
      'mpg(US)': [4, 'US mpg'],
      'ltr/mil(10km)': [5, 'l/nordicMile', 'l/mil', 'ltr/mil', 'l/mil(10km)', 'l/10km', 'ltr/10km'],
      'mil(10km)/ltr': [6, 'nordicMile/l', 'mil/l', 'mil/ltr', 'mil(10km)/l', '10km/l', '10km/ltr'],
      'km/gal(US)': [7, 'km/USGalon']
    }
  }

  function mapUnit (concept, value) {
    var val = !isNaN(value) ? parseInt(value, 10) : value
    for (var key in dictionary[concept]) {
      if (key === val || dictionary[concept][key].indexOf(val) !== -1) {
        return key
      }
    }
    throw Error('Uknown value "' + value + '" for concept "' + concept + '". Check the variable dictionary.\n')
  }

  // converts chosen fuel consumption to l/100km
  function convertFuelEfficiencyToL100km (fuelEfficiency, fuelEfficiencyOption) {
    fuelEfficiency = parseFloat(fuelEfficiency)

    if (isNaN(fuelEfficiency)) {
      throw Error('Error on convertFuelEfficiencyToL100km, fuelEfficiency is not a number: ' + fuelEfficiency)
    }

    switch (mapUnit('fuelEfficiency', fuelEfficiencyOption)) {
      case 'l/100km':
        return fuelEfficiency
      case 'km/l':
        return 100 / fuelEfficiency // km/l -> l/100km
      case 'mpg(imp)':
        return (100 * conversionConstants.GALLON_IMP_TO_LITER) / (conversionConstants.KM_TO_MILES * fuelEfficiency) // mpg(imp) -> l/100km
      case 'mpg(US)':
        return (100 * conversionConstants.GALLON_US_TO_LITER) / (conversionConstants.KM_TO_MILES * fuelEfficiency) // mpg(US) -> l/100km
      case 'ltr/mil(10km)':
        return conversionConstants.KM_TO_MIL * fuelEfficiency // l/mil -> l/100km (1 mil = 10km)
      case 'mil(10km)/ltr':
        return 1 / (conversionConstants.KM_TO_MIL * fuelEfficiency) // mil/l -> l/100km
      case 'km/gal(US)':
        return (100 * conversionConstants.GALLON_US_TO_LITER) / fuelEfficiency // km/gal(US) -> l/100km (1 mil = 10km)
      default:
        throw Error('Error on convertFuelEfficiencyToL100km, fuelEfficiencyOption ' + fuelEfficiencyOption + ' unknown')
    }
  }

  // converts chosen fuel price to CURRENCY_unit/litre
  function convertFuelPriceToLitre (fuelPrice, fuelPriceVolumeUnit) {
    fuelPrice = parseFloat(fuelPrice)

    if (isNaN(fuelPrice)) {
      throw Error('Error on convertFuelPriceToLitre, fuelPrice is not a number: ' + fuelPrice)
    }

    switch (mapUnit('fuelPriceVolume', fuelPriceVolumeUnit)) {
      case 'ltr':
        return fuelPrice // CURRENCY_unit/litre to CURRENCY_unit/litre
      case 'gal(imp)':
        return fuelPrice / conversionConstants.GALLON_IMP_TO_LITER // currency/(imp gallon) -> currency/litre
      case 'gal(US)':
        return fuelPrice / conversionConstants.GALLON_US_TO_LITER // currency/(US gallon) -> currency/litre
      default:
        throw Error('Error on convertFuelPriceToLitre, fuelPriceVolumeUnit ' + fuelPriceVolumeUnit + ' unknown')
    }
  }

  // converts chosen distances to km
  function convertDistanceToKm (distance, distanceUnitOption) {
    distance = parseFloat(distance)

    if (isNaN(distance)) {
      throw Error('Error on convertDistanceToKm, distance is not a number: ' + distance)
    }

    switch (mapUnit('distance', distanceUnitOption)) {
      case 'km':
        return distance
      case 'mi':
        return distance * conversionConstants.KM_TO_MILES // miles to km
      case 'mil(10km)':
        return distance * conversionConstants.KM_TO_MIL // mil(10km) to km
      default:
        throw Error('Error on convertDistanceToKm, distanceUnitOption ' + distanceUnitOption + ' unknown')
    }
  }

  // converts km to chosen distances
  function convertDistanceFromKm (distance, distanceUnitOption) {
    distance = parseFloat(distance)

    if (isNaN(distance)) {
      throw Error('Error on convertDistanceFromKm, distance is not a number: ' + distance)
    }

    switch (mapUnit('distance', distanceUnitOption)) {
      case 'km':
        return distance
      case 'mi':
        return distance / conversionConstants.KM_TO_MILES // km to miles
      case 'mil(10km)':
        return distance / conversionConstants.KM_TO_MIL // km to mil(10km)
      default:
        throw Error('Error on convertDistanceFromKm, distanceUnitOption ' + distanceUnitOption + ' unknown')
    }
  }

  // convert distance from standard unitFrom to sandard unitTo
  function convertDistanceFromTo (distance, unitFrom, unitTo) {
    var distanceInKm = convertDistanceToKm(distance, unitFrom)
    return convertDistanceFromKm(distanceInKm, unitTo)
  }

  return {
    mapUnit: mapUnit,
    convertFuelEfficiencyToL100km: convertFuelEfficiencyToL100km,
    convertFuelPriceToLitre: convertFuelPriceToLitre,
    convertDistanceToKm: convertDistanceToKm,
    convertDistanceFromKm: convertDistanceFromKm,
    convertDistanceFromTo: convertDistanceFromTo
  }
})()

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.calculatorModule.conversionsModule
}
