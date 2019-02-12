/** ************* CALCULATOR CONVERSION JS FUNCTIONS *************************/
//= ==========================================================
// see also: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function

// UNITS CONVERSION MODULE
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules
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

  // converts chosen fuel consumption to l/100km
  function convertFuelEfficiencyToL100km (fuelEfficiency, fuelEfficiencyOption) {
    // fuelEfficiencyOption shall be either:
    // 1 - l/100km - litres per 100 kilometres
    // 2 - km/l - kilometres per litre
    // 3 - mpg(imp) - miles per imperial gallon
    // 4 - mpg(US) - miles per US gallon
    // 5 - l/mil - litres per 10 kilometers
    // 6 - km/gal(US) - km per US gallon

    fuelEfficiency = parseFloat(fuelEfficiency)

    if (isNaN(fuelEfficiency)) {
      throw Error('Error on convertFuelEfficiencyToL100km, fuelEfficiency is not a number: ' + fuelEfficiency)
    }

    switch (fuelEfficiencyOption) {
      case 1:
      case 'l/100km':
        return fuelEfficiency
      case 2:
      case 'km/l':
        return 100 / fuelEfficiency // km/l -> l/100km
      case 3:
      case 'mpg(imp)':
        return (100 * conversionConstants.GALLON_IMP_TO_LITER) / (conversionConstants.KM_TO_MILES * fuelEfficiency) // mpg(imp) -> l/100km
      case 4:
      case 'mpg(US)':
        return (100 * conversionConstants.GALLON_US_TO_LITER) / (conversionConstants.KM_TO_MILES * fuelEfficiency) // mpg(US) -> l/100km
      case 5:
      case 'l/mil':
        return conversionConstants.KM_TO_MIL * fuelEfficiency // l/mil -> l/100km (1 mil = 10km)
      case 6:
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

    switch (fuelPriceVolumeUnit) {
      case 1:
      case 'litre':
      case 'Litre':
      case 'liter':
      case 'Liter':
      case 'ltr':
      case 'l':
        return fuelPrice // CURRENCY_unit/litre to CURRENCY_unit/litre
      case 2:
      case 'imp gallon':
      case 'imperial gallon':
      case 'imp gal':
      case 'imperial gal':
        return fuelPrice / conversionConstants.GALLON_IMP_TO_LITER // currency/(imp gallon) -> currency/litre
      case 3:
      case 'US gallon':
      case 'US gal':
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

    switch (distanceUnitOption) {
      case 1:
      case 'km':
        return distance
      case 2:
      case 'mile':
      case 'miles':
        return distance * conversionConstants.KM_TO_MILES // miles to km
      case 3:
      case 'mil(10km)':
      case 'scandinavian mile':
      case 'nordic mile':
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

    switch (distanceUnitOption) {
      case 1:
      case 'km':
        return distance
      case 2:
      case 'mile':
      case 'miles':
        return distance / conversionConstants.KM_TO_MILES // km to miles
      case 3:
      case 'mil(10km)':
      case 'scandinavian mile':
      case 'nordic mile':
        return distance / conversionConstants.KM_TO_MIL // km to mil(10km)
      default:
        throw Error('Error on convertDistanceFromKm, distanceUnitOption ' + distanceUnitOption + ' unknown')
    }
  }

  return {
    convertFuelEfficiencyToL100km: convertFuelEfficiencyToL100km,
    convertFuelPriceToLitre: convertFuelPriceToLitre,
    convertDistanceToKm: convertDistanceToKm,
    convertDistanceFromKm: convertDistanceFromKm
  }
})()

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.calculatorModule.conversionsModule
}
