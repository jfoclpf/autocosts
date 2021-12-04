/* Handlebars Helper Functions */

/* jslint node: true */

'use strict'

const paragraphBuilder = require('paragraph-builder')
const debug = require('debug')('app:helpers')

module.exports = {

  /* using for selecting value in HTML select boxes */
  isSelected: function (CC, value) {
    return CC === value ? ' ' + 'selected' : ''
  },

  /* negation */
  negate: function (boolVar) {
    return !boolVar
  },

  /* chose the HTML costs table for specific country */
  costsTable: function (CC) {
    return CC
  },

  bannerFlag: function (CC) {
    return CC.toLowerCase() + ' ' + 'flag'
  },

  // splits string  WORDS.in_months_possession, which in English is "in [nbrMonths] of possession"
  get_in_months_of_possession: function (position) {
    const str = this.in_months_of_possession
    return str.split('[nbrMonths]')[position - 1]
  },

  json: function (context) {
    return JSON.stringify(context)
  },

  jsonObj: function (obj) {
    return encodeURI(JSON.stringify(obj || {}))
  },

  striOutHTML: function (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '')
  },

  // return, for example, "pt_PT" or "en_US"
  getLocale: function () {
    return this.pageData.languageCode.substring(0, 2) + '_' + this.CC
  },

  getCapitalizedWord (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  getLandingPageMainButtonText () {
    return this.words.sub_title2 ? this.words.sub_title2 : this.words.calculate_car_costs
  },

  getPropertyFromObject (obj, key) {
    return obj[key]
  },

  getFuelEfficiencyOptStr: function () {
    switch (this.fuel_efficiency_std_option) {
      case 1:
        return 'L/100km'
      case 2:
        return 'km/L'
      case 3:
        return 'mpg(imp)'
      case 4:
        return 'mpg(US)'
      case 5:
        return 'l/mil'
      case 6:
        return 'km/gal(US)'
      default:
        return 'error'
    }
  },

  getDistanceOptStr: function () {
    switch (this.distance_std_option) {
      case 1:
        return 'kilometres'
      case 2:
        return 'miles'
      case 3:
        return 'mil'
      default:
        return 'error'
    }
  },

  getDistanceOptStrShort: function () {
    switch (this.distance_std_option) {
      case 1:
        return 'km'
      case 2:
        return 'mi'
      case 3:
        return 'Mil'
      default:
        return 'error'
    }
  },

  getFuelPriceVolumeOptStr: function () {
    switch (this.fuel_price_volume_std) {
      case 1:
        return 'litres'
      case 2:
        return 'imperial gallons'
      case 3:
        return 'US gallons'
      default:
        return 'error'
    }
  },

  toLowerCase: function (string) {
    return string.toLowerCase()
  },

  capitalizeFirstLetter: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },

  get2letterLangCode: function () {
    return this.pageData.languageCode.substr(0, 2)
  },

  // convert number to string with n decimal values
  toFixed: function (num, n) {
    return _toFixed(num, n)
  },

  times12toFixed: function (num, n) {
    return _toFixed(num * 12, n)
  },

  createParagraphs: function (text) {
    const parArr = paragraphBuilder.toArray(text, 180)
    let output = ''
    for (let i = 0; i < parArr.length; i++) {
      output += '<p>' + parArr[i] + '</p>'
    }
    return output
  }
}

function _toFixed (num, n) {
  if (num && !isNaN(num)) {
    return num.toFixed(n)
  } else {
    debug('Error: passed variable not defined')
    return ''
  }
}
