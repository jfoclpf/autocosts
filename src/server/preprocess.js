/* jslint node: true */

'use strict'

const fs = require('fs')
const path = require('path')
const stripHtmlTags = require('striptags')
const debug = require('debug')('app:preprocess')

// processes and builds the WORDS/Strings objects on server side, for fast delivery
module.exports = function preprocess (serverData, WORDS, eventEmitter) {
  const directories = serverData.directories

  // creates Object of objects WORDS. An object with strings for each Country
  for (const CC in serverData.availableCountries) {
    WORDS[CC] = JSON.parse(fs.readFileSync(path.join(directories.index, directories.project.countries, CC + '.json'), 'utf8'))
    WORDS[CC].languageCode = serverData.languagesCountries[CC]
    WORDS[CC].domain = serverData.urls.canonicalHostname[CC]

    WORDS[CC].web_page_adapted_title = getAdaptedTitle(WORDS[CC])
    WORDS[CC].meta_description = getMetaDescription(WORDS[CC].initial_text)
    WORDS[CC].meta_keywords = getKeywords(WORDS[CC])

    addUpperCaseAfterBr(WORDS[CC])

    // normalize with NFC Indian strings
    if (CC === 'IN') {
      normalizeNFC(WORDS[CC])
    }

    // to be assigned later if stats are colected
    WORDS[CC].sub_title_pos1 = WORDS[CC].sub_title_pos2 = ''
    // to be changed later if stats are colected
    WORDS[CC].socialmedia_description = getMetaDescription(WORDS[CC].initial_text)
  }

  fillBlanks(serverData, WORDS)

  eventEmitter.on('statsColected', function (statistics, normalizedStatistics) {
    for (const CC in serverData.availableCountries) {
      WORDS[CC].sub_title_pos1 = getSubTitleArr(1, WORDS[CC], statistics[CC])
      WORDS[CC].sub_title_pos2 = getSubTitleArr(2, WORDS[CC], statistics[CC])
      WORDS[CC].socialmedia_description = getSocialMediaDescription(WORDS[CC], statistics[CC])
    }
  })
}

// function that adpats the title for lower case
// having only uppercase on the firt letters of the words bigger than 4 characters
function getAdaptedTitle (words) {
  // lower case all string
  let title = words.web_page_title.toLowerCase()
  // get an array of words stripped by space
  const wordsOfTitle = title.split(' ')
  // if a word has a size bigger than 4 char or it is the 1st word of the sentence, uppercase 1st letter of the word
  for (let i = 0; i < wordsOfTitle.length; i++) {
    if (wordsOfTitle[i].length > 4 || i === 0) {
      wordsOfTitle[i] = wordsOfTitle[i].charAt(0).toUpperCase() + wordsOfTitle[i].slice(1) // uppercase of first letter of word
    }
  }

  title = wordsOfTitle.join(' ')

  // add "find the true costs of owning a car"
  if (words.sub_title2) {
    let title2 = words.sub_title2
    title2 = title2.charAt(0).toUpperCase() + title2.slice(1) // uppercase of first letter of sentence

    // slice(-1) gets last character of string
    if (title2.slice(-1) !== '!') {
      title2 += '!'
    }

    title += ' &ndash; ' + title2
  }

  return title
}

// if a certain word or string is not available in a certain language,
// use the file from the country which founded the language (ex: Spanish was founded by Spain)
// if that is not either available, use English version
function fillBlanks (serverData, WORDS) {
  for (const CC in serverData.availableCountries) {
    const languageDefault = {
      es: 'ES',
      en: 'UK',
      pt: 'PT',
      fr: 'FR'
    }

    // WORDS.UK is an Object with all the possible properties available
    for (const word in WORDS.UK) {
      if (!WORDS[CC][word]) {
        const languageFounderCC = languageDefault[WORDS[CC].languageCode.substring(0, 2)]
        WORDS[CC][word] = languageFounderCC && WORDS[languageFounderCC][word] ? WORDS[languageFounderCC][word] : WORDS.UK[word]
      }
    }
  }
}

// get first sentence of string, with HTML tags stripped out
function getMetaDescription (initialText) {
  return initialText
    .split('.').splice(0, 3).join('.') // gets the first 3 sentences
    .replace(/<(?:.|\n)*?>/gm, '') + // removes html tags such as <b></b>
        '.'
}

// function that gets a string of main/key words from title
// Ex: "calculadora dos custos do automóvel" returns "calculadora, custos, automóvel"
function getKeywords (words) {
  // lower case all strings
  const title = words.web_page_title.toLowerCase()
  const fixedCosts = words.fixed_costs.toLowerCase()
  const runningCosts = words.running_costs.toLowerCase()

  // get an array of words stripped by space
  const wordsOfTitle = title.split(' ')

  // if a word has a size bigger than 3, adds to keywords
  const keywords = []
  let word

  for (let i = 0; i < wordsOfTitle.length; i++) {
    word = wordsOfTitle[i]
    if (word.length > 3) {
      keywords.push(word)
    }
  }

  keywords.push(fixedCosts)
  keywords.push(runningCosts)

  const keywordsString = keywords.join(',')

  return keywordsString
}

// process the sentences, uppercasing the first letters of the words right after "<br>"
// Ex: "This is text 1<br>this is text 2" ==> "This is text 1<br>This is text 2"
function addUpperCaseAfterBr (words) {
  for (const word in words) {
    if (typeof words[word] === 'string') {
      words[word] = words[word].replace(/(<br><i>|<br>)(\w)/g,
        function (match, p1, p2) { return p1 + p2.toUpperCase() })
    }
  }
}

// gets the subtitle string in main.hbs: "postion 1 string" + [country select box] +  "postion 2 string"
// from sub_title properties at src/countries/
// "sub_title1a": "The average total costs in [country] is [yearly_costs] per year"
// "sub_title1b": "representing [nbrMonths] months of average salary."
function getSubTitleArr (position, words, statsData) {
  // check if object not empty
  if (!statsData || Object.keys(statsData).length === 0) {
    return ''
  }

  const errMsg = 'Error in handlebars function getSubTitleArr'

  const subTitle1a = words.sub_title1a ? words.sub_title1a.trim() : ''
  let subTitle1b = words.sub_title1b ? words.sub_title1b.trim() : ''

  const checkSanityOfStr = function (str, parseStr) {
    if (!str || !str.includes(parseStr)) {
      debug(errMsg + '; \'' + parseStr + '\' undefined or does not contain ' + parseStr)
      return false
    }
    return true
  }

  if (!checkSanityOfStr(subTitle1a, '[country]')) { return '' }

  if (!checkSanityOfStr(subTitle1a, '[yearly_costs]')) { return '' }

  const totalCostsPerYear = statsData.costs_totalPerYear
  if (!totalCostsPerYear || !isFinite(totalCostsPerYear) || parseInt(totalCostsPerYear, 10) === 0) {
    return ''
  }

  if (position === 1) {
    // this should return: "The average total costs in"; see main.hbs
    return subTitle1a.split('[country]')[0].trim()
  } else if (position === 2) {
    // this tring shoud be: "is [yearly_costs] per year"
    let subTitle1aPart2 = subTitle1a.split('[country]')[1].trim()

    const costsTotalPerYearString = getProcessedStatsDataEntry(
      words,
      statsData,
      'costs_totalPerYear', // entry
      0, // toFixed=0
      true) // bold string (with <b></b>)

    subTitle1aPart2 = subTitle1aPart2.replace('[yearly_costs]', costsTotalPerYearString)

    const workingMonthsPerYearToAffordCar = statsData.financialEffort_workingMonthsPerYearToAffordCar
    const useFinancialEffortInfo = statsData.financialEffort_calculated && workingMonthsPerYearToAffordCar &&
            typeof workingMonthsPerYearToAffordCar === 'number' && parseInt(workingMonthsPerYearToAffordCar, 10) !== 0

    if (useFinancialEffortInfo && !checkSanityOfStr(subTitle1b, '[nbrMonths]')) {
      return ''
    }

    const workingMonthsPerYearToAffordCarString = getProcessedStatsDataEntry(
      words,
      statsData,
      'financialEffort_workingMonthsPerYearToAffordCar', // entry
      1, // toFixed=1
      true, // bold string (with <b></b>)
      true) // ignore (returns "") if number is small

    debug('workingMonthsPerYearToAffordCarString', workingMonthsPerYearToAffordCarString)

    if (!useFinancialEffortInfo || !workingMonthsPerYearToAffordCarString) {
      // this returns "is [yearly_costs] per year. Find the true cost of owning a car in your country."
      return subTitle1aPart2
    } else {
      // removes period if existent
      if (subTitle1aPart2.slice(-1) === '.') { // slice(-1) gets the last character
        subTitle1aPart2 = subTitle1aPart2.slice(0, -1) // removes last character
      }
      subTitle1aPart2 += ', '

      subTitle1b = subTitle1b.replace('[nbrMonths]', workingMonthsPerYearToAffordCarString)

      // this returns "is [yearly_costs] per year, representing [nbrMonths] months of average salary.
      // Find the true cost of owning a car in your country."
      return subTitle1aPart2 + subTitle1b
    }
  } else {
    debug(errMsg + '; Position parameter in getSubTitleArr must be 1 or 2')
    return ''
  }
}

function getSocialMediaDescription (words, statsData) {
  return stripHtmlTags(getSubTitleArr(1, words, statsData) + ' ' + words.country_name + ' ' + getSubTitleArr(2, words, statsData))
}

// gets an entry from the statistical database
function getProcessedStatsDataEntry (words, statsData, entry, toFixed, isBold = false, ignoreSmallNumbers = false) {
  const currencySymbol = words.curr_symbol

  const val = statsData[entry]

  if (typeof toFixed !== 'undefined' && typeof val === 'number') {
    if (ignoreSmallNumbers && Math.round(val) === 0) {
      return ''
    }

    let valueToString // it will have further, or not, the currency symbol

    if (entry.startsWith('costs_')) { // it's a cost, thus use currency symbol
      if (words.invert_currency) {
        valueToString = val.toFixed(toFixed) + ' ' + currencySymbol
      } else {
        valueToString = currencySymbol + val.toFixed(toFixed)
      }
    } else {
      valueToString = val.toFixed(toFixed)
    }

    return (isBold ? '<b>' : '') + valueToString + (isBold ? '</b>' : '')
  } else {
    return val
  }
}

// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
function normalizeNFC (words) {
  for (const key in words) {
    if (typeof words[key] === 'string') {
      words[key] = words[key].normalize('NFC')
    }
  }
}
