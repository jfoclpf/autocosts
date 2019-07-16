/* This web site uses several domain names, all with a TLD extension of .info and a test version with a TLD extension of .dev.
The server side code shall thus forward the page if the entry URL is not correctly typed
according to the domain name vs. country code combinatorial rules.
For the flowchart check https://github.com/jfoclpf/autocosts/wiki/URL-selector */

const GEO_IP = require('geoip-lite')
const debug = require('debug')('app:url')
const nodeUrl = require('url')

module.exports = {

  // to be used from app.get('/')
  // when no country code is provided, example autocosts.info/
  // IF, for example, the user types autocosti.info redirects to autocosti.info/IT
  // because autocosti.info is associated only with Italy
  // ELSE, uses the locale and HTTP info to redirect
  // for example, if the user is in Portugal, redirects to autocustos.info/PT
  // because autocustos.info is associated with both PT and BR
  redirect: function (req, res, serverData) {
    // does this domain/host is associated with only one country?
    // if yes, set such country to CC
    var CC = isSingleDomain(req.get('host'), serverData.domains)
    if (CC && isCCinCountriesList(CC, serverData.availableCountries)) {
      debug('isSingleDomain', CC)
      req.params.CC = CC.toUpperCase()
      let url2redirect = getValidURL(req, serverData.domains.countries)
      redirect301(res, url2redirect)
    } else {
      // redirects according to locale and/or browser settings
      redirect302(req, res, serverData) // temporary
    }
  },

  // to be used from app.get('/:CC')
  // returns true if it redirects
  getCC: function (req, res, serverData) {
    var urlHref = getProtocol(req) + '//' + req.get('host') + req.originalUrl
    debug('Entry URL: ' + urlHref)

    var CC = req.params.CC
    var url2redirect

    // if no country is defined or the country isn't in the list
    // i.e, if the CC characters in domain.info/CC are not recognized
    // get the Country from locale or HTTP Accept-Language Info
    if (!isCCinCountriesList(CC, serverData.availableCountries) && !isCCXX(CC)) {
      debug('if (!isCCinCountriesList)')

      // does this domain/host is associated with only one country?
      // if yes, set such country to CC
      CC = isSingleDomain(req.get('host'), serverData.domains)
      if (CC && isCCinCountriesList(CC, serverData.availableCountries)) {
        debug('isSingleDomain', CC)
        req.params.CC = CC.toUpperCase()
        url2redirect = getValidURL(req, serverData.domains.countries)
        redirect301(res, url2redirect)
      } else {
        debug('isSingleDomain == false', CC)
        // redirects according to locale and/or browser settings
        redirect302(req, res, serverData)
      }
      return true
    }

    // from here the CC, independently of the case (upper or lower) is in the list or is xx or XX
    // and thus from here, the CC has always two letters since it is in the list

    // if the CC characters after domain.info/cc ARE recognized as being in the list
    // But if the two-letter code are NOT all in upper case domain.info/CC
    if (!isCC2letterUpperCase(CC)) {
      debug('if (!isCC2letterUpperCase)')
      url2redirect = getValidURL(req, serverData.domains.countries)
      redirect301(res, url2redirect)
      return true
    }

    // from here the CC is reconginzed and it's in uppercase

    // check if has subdomains such as www.autocosts.info. It shall forward to autocosts.info
    if (isSubdomain(req)) {
      debug('if(isSubdomain)')
      url2redirect = getValidURL(req, serverData.domains.countries)
      redirect301(res, url2redirect)
      return true
    }

    if (isThisATest(req)) {
      debug('if(isThisATest)')
      return false
    }

    // if the URL is not the valid URL, i.e. the combination domain/CC is not valid
    // example: autocosts.info/PT (is not valid) shall forward to autocustos.info/PT (valid)
    if (!isDomainCCcombValid(req, serverData.availableCountries, serverData.domains.countries)) {
      debug('if (!isDomainCCcombValid)')
      url2redirect = getValidURL(req, serverData.domains.countries)
      redirect301(res, url2redirect)
      return true
    }

    return false
  },

  isThisATest: function (req) {
    return isThisATest(req)
  },

  getProtocol: function (req) {
    return _getProtocol(req)
  },

  isThisLocalhost: function (req) {
    return isThisLocalhost(req)
  },

  getValidURL: function (req, domainsCountries) { // returns full URL
    return getValidURL(req, domainsCountries)
  },

  getCanonicUrl: function (req, serverData, CC) {
    return nodeUrl.format({
      protocol: getProtocol(req),
      host: serverData.domains.countries[CC],
      pathname: CC
    })
  },

  // for example: "https://autocosts.info/stats"
  // see https://github.com/jfoclpf/autocosts/wiki/URL-parts-terminology
  getHref: function (req) {
    return nodeUrl.format({
      protocol: getProtocol(req),
      host: req.get('host'),
      pathname: req.originalUrl
    })
  },

  // for example: "https://autocosts.info"
  getOrigin: function (req) {
    return nodeUrl.format({
      protocol: getProtocol(req),
      host: req.get('host')
    })
  }
}

// 302 redirects are temporary
// it's temporary because the redirect might, from a defined starting URL,
// redirect to different URLs according to the locale of the user,
// and we don't want to inform search engines that a page of a country
// makes a permanent redirect to a page of another country
function redirect302 (req, res, serverData) {
  // get country by locale or HTTP header from browser
  var geoCC = getGeoCC(req, serverData.availableCountries, serverData.settings.defaultCountry)

  var url2redirect
  if (isDevDomain(req)) {
    url2redirect = nodeUrl.format({ protocol: getProtocol(req), host: 'autocosts.dev', pathname: geoCC })
  } else if (isThisLocalhost(req)) {
    url2redirect = nodeUrl.format({ protocol: getProtocol(req), host: req.get('host'), pathname: geoCC })
  } else {
    // production
    url2redirect = nodeUrl.format({
      protocol: getProtocol(req),
      host: serverData.domains.countries[geoCC],
      pathname: geoCC
    })
  }

  res.redirect(302, url2redirect)
  debug('redirecting 302 to ' + url2redirect)
}

// 301 redirects are permanent
function redirect301 (res, url2redirect) {
  res.redirect(301, url2redirect)
  debug('redirecting 301 to ' + url2redirect)
}

// CC must be in the format PT, XX, UK, i.e. the letters uppercase
function isCC2letterUpperCase (CC) {
  return CC === CC.toUpperCase()
}

function isCCinCountriesList (CC, availableCountries) {
  // 2-letter ISO Country Code (CC)
  if (!CC || CC.length !== 2) {
    return false
  }

  var CCupper = CC.toUpperCase()
  var CClower = CC.toLowerCase()

  return availableCountries.hasOwnProperty(CCupper) || availableCountries.hasOwnProperty(CClower)
}

// get the 2-letter country code of user according to locale or HTTP header
function getGeoCC (req, availableCountries, defaultCountry) {
  // try to get country by IP
  if (!isThisLocalhost(req)) {
    // tries to get IP from user
    var ip = req.headers['x-forwarded-for'].split(',').pop() ||
                 req.connection.remoteAddress ||
                 req.socket.remoteAddress ||
                 req.connection.socket.remoteAddress

    var geo = GEO_IP.lookup(ip)
    var geoCC = geo.country

    debug('geoCC: ' + geoCC)

    if (isCCinCountriesList(geoCC, availableCountries)) {
      if (geoCC === 'GB') {
        geoCC = 'UK'
      }
      return geoCC
    }
  }

  // try to get country from HTTP accept-language info
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
  var acceptLanguage = req.headers['accept-language']
  var CC_HTTP = getCountryfromHTTP(acceptLanguage)
  if (CC_HTTP) {
    debug('CC_HTTP: ' + CC_HTTP)
    if (isCCinCountriesList(CC_HTTP, availableCountries)) {
      if (CC_HTTP === 'GB') {
        CC_HTTP = 'UK'
      }
      return CC_HTTP
    }
  }

  // when no other method finds the country of user, use this by default
  return defaultCountry
}

// is Domain/CC Combination valid?
function isDomainCCcombValid (req, availableCountries, domainsCountries) {
  var CC = req.params.CC
  var host = req.get('host')

  if (!isCCinCountriesList(CC, availableCountries)) {
    return false
  }

  return host.toLowerCase() === domainsCountries[CC]
}

// full URL, ex: for PT https://autocustos.info/PT
function getValidURL (req, domainsCountries) {
  debug('getValidURL')

  var CC = req.params.CC
  var upCC = CC.toUpperCase()

  var URL
  if (isThisLocalhost(req) || isCCXX(CC)) {
    URL = nodeUrl.format({ protocol: getProtocol(req), host: req.get('host'), pathname: upCC })
  } else if (isDevDomain(req)) {
    URL = nodeUrl.format({ protocol: getProtocol(req), host: 'autocosts.dev', pathname: upCC })
  } else {
    URL = nodeUrl.format({ protocol: getProtocol(req), host: domainsCountries[upCC], pathname: upCC })
  }

  debug('Canonical URL: ' + nodeUrl.format({ protocol: getProtocol(req), host: domainsCountries[upCC], pathname: upCC }))
  debug('Valid URL: ' + URL)
  return URL
}

// check https://github.com/jfoclpf/autocosts/wiki/URL-parts-terminology
// the `:` is part of the protocol
function getProtocol (req) {
  if (req.secure && !isThisLocalhost(req)) {
    return 'https:'
  }
  return 'http:'
}

function _getProtocol (req) {
  return getProtocol(req)
}

// www.example.com returns true and example.com returns false
function isSubdomain (req) {
  var host = req.get('host')

  var hostRoot = host.split(':')[0]
  var hostDim = (hostRoot.split('.')).length
  if (hostDim > 2) {
    return true
  }

  return false
}

// function that says whether a domain is associated with only One country
// for example autokoszty.info is associated only with PL,
// whilst autocosts.info has several CCs associated
// returns the associated Country Code (CC) or false
function isSingleDomain (host, domains) {
  if (host) {
    for (var domain in domains.counts) {
      if (host.indexOf(domain) > -1 && domains.counts[domain] === 1) {
        return getKeyByValue(domains.countries, domain)
      }
    }
  }
  return false
}

// Functions to check if it is a test
function isThisATest (req) {
  debug('isThisATest')

  var CC = req.params.CC
  if (CC) {
    return isDevDomain(req) || isThisLocalhost(req) || isCCXX(CC)
  } else {
    return isDevDomain(req) || isThisLocalhost(req)
  }
}

// tells of TLD of host is .dev or .work
function isDevDomain (req) {
  var host = req.get('host')
  var hostSplit = host.split('.')
  var tld = hostSplit[hostSplit.length - 1] // top level domain, ex: ".info"

  if (tld.toLowerCase() === 'dev' || tld.toLowerCase() === 'work') {
    return true
  }
  return false
}

function isThisLocalhost (req) {
  debug('isThisLocalhost')

  var ip = req.ip
  var host = req.get('host')
  debug('ip:', ip, '; host:', host)

  return ip === '127.0.0.1' || ip === '::ffff:127.0.0.1' || ip === '::1'
}

function isCCXX (CC) {
  if (CC) {
    return CC.toUpperCase() === 'XX'
  } else {
    return false
  }
}

// acceptLanguage may be "pt"  or "pt-PT" or
// "pt-PT,pt;q=0.9,en;q=0.8,en-GB;q=0.7,de-DE;q=0.6,de;q=0.5,fr-FR;q=0.4,fr;q=0.3,es;q=0.2"
function getCountryfromHTTP (acceptLanguage) {
  var CC // Country Code

  if (!acceptLanguage) {
    return null
  }

  // in some cases like "fr" or "hu" the language and the country codes are the same
  if (acceptLanguage.length === 2) {
    CC = acceptLanguage.toUpperCase()
  } else if (acceptLanguage.length === 5) {
    // get "PT" out of "pt-PT"
    CC = acceptLanguage.substring(3, 5)
  } else if (acceptLanguage.length > 5) {
    // ex: "pt-PT,pt;q=0.9,en;q=0.8,en-GB;q=0.7,de-DE;q=0.6,de;q=0.5,fr-FR;q=0.4,fr;q=0.3,es;q=0.2"
    // gets the first two capial letters that fit into 2-letter ISO country code

    var substr
    for (var i = 0; i + 2 < acceptLanguage.length; i++) {
      substr = acceptLanguage.substring(i, i + 2)
      if (isoCountries.hasOwnProperty(substr)) {
        return substr
      }
    }
  }

  if (isoCountries.hasOwnProperty(CC)) {
    return CC
  }

  return null
}

// on a certain Object, gets the key, given the value
function getKeyByValue (object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

// 2-letter ISO Country Codes
var isoCountries = {
  'AF': 'Afghanistan',
  'AX': 'Aland Islands',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa',
  'AD': 'Andorra',
  'AO': 'Angola',
  'AI': 'Anguilla',
  'AQ': 'Antarctica',
  'AG': 'Antigua And Barbuda',
  'AR': 'Argentina',
  'AM': 'Armenia',
  'AW': 'Aruba',
  'AU': 'Australia',
  'AT': 'Austria',
  'AZ': 'Azerbaijan',
  'BS': 'Bahamas',
  'BH': 'Bahrain',
  'BD': 'Bangladesh',
  'BB': 'Barbados',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BZ': 'Belize',
  'BJ': 'Benin',
  'BM': 'Bermuda',
  'BT': 'Bhutan',
  'BO': 'Bolivia',
  'BA': 'Bosnia And Herzegovina',
  'BW': 'Botswana',
  'BV': 'Bouvet Island',
  'BR': 'Brazil',
  'IO': 'British Indian Ocean Territory',
  'BN': 'Brunei Darussalam',
  'BG': 'Bulgaria',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'KH': 'Cambodia',
  'CM': 'Cameroon',
  'CA': 'Canada',
  'CV': 'Cape Verde',
  'KY': 'Cayman Islands',
  'CF': 'Central African Republic',
  'TD': 'Chad',
  'CL': 'Chile',
  'CN': 'China',
  'CX': 'Christmas Island',
  'CC': 'Cocos (Keeling) Islands',
  'CO': 'Colombia',
  'KM': 'Comoros',
  'CG': 'Congo',
  'CD': 'Congo, Democratic Republic',
  'CK': 'Cook Islands',
  'CR': 'Costa Rica',
  'CI': 'Cote D\'Ivoire',
  'HR': 'Croatia',
  'CU': 'Cuba',
  'CY': 'Cyprus',
  'CZ': 'Czech Republic',
  'DK': 'Denmark',
  'DJ': 'Djibouti',
  'DM': 'Dominica',
  'DO': 'Dominican Republic',
  'EC': 'Ecuador',
  'EG': 'Egypt',
  'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea',
  'ER': 'Eritrea',
  'EE': 'Estonia',
  'ET': 'Ethiopia',
  'FK': 'Falkland Islands (Malvinas)',
  'FO': 'Faroe Islands',
  'FJ': 'Fiji',
  'FI': 'Finland',
  'FR': 'France',
  'GF': 'French Guiana',
  'PF': 'French Polynesia',
  'TF': 'French Southern Territories',
  'GA': 'Gabon',
  'GM': 'Gambia',
  'GE': 'Georgia',
  'DE': 'Germany',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GR': 'Greece',
  'GL': 'Greenland',
  'GD': 'Grenada',
  'GP': 'Guadeloupe',
  'GU': 'Guam',
  'GT': 'Guatemala',
  'GG': 'Guernsey',
  'GN': 'Guinea',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HT': 'Haiti',
  'HM': 'Heard Island & Mcdonald Islands',
  'VA': 'Holy See (Vatican City State)',
  'HN': 'Honduras',
  'HK': 'Hong Kong',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IN': 'India',
  'ID': 'Indonesia',
  'IR': 'Iran, Islamic Republic Of',
  'IQ': 'Iraq',
  'IE': 'Ireland',
  'IM': 'Isle Of Man',
  'IL': 'Israel',
  'IT': 'Italy',
  'JM': 'Jamaica',
  'JP': 'Japan',
  'JE': 'Jersey',
  'JO': 'Jordan',
  'KZ': 'Kazakhstan',
  'KE': 'Kenya',
  'KI': 'Kiribati',
  'KR': 'Korea',
  'KW': 'Kuwait',
  'KG': 'Kyrgyzstan',
  'LA': 'Lao People\'s Democratic Republic',
  'LV': 'Latvia',
  'LB': 'Lebanon',
  'LS': 'Lesotho',
  'LR': 'Liberia',
  'LY': 'Libyan Arab Jamahiriya',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MO': 'Macao',
  'MK': 'Macedonia',
  'MG': 'Madagascar',
  'MW': 'Malawi',
  'MY': 'Malaysia',
  'MV': 'Maldives',
  'ML': 'Mali',
  'MT': 'Malta',
  'MH': 'Marshall Islands',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MU': 'Mauritius',
  'YT': 'Mayotte',
  'MX': 'Mexico',
  'FM': 'Micronesia, Federated States Of',
  'MD': 'Moldova',
  'MC': 'Monaco',
  'MN': 'Mongolia',
  'ME': 'Montenegro',
  'MS': 'Montserrat',
  'MA': 'Morocco',
  'MZ': 'Mozambique',
  'MM': 'Myanmar',
  'NA': 'Namibia',
  'NR': 'Nauru',
  'NP': 'Nepal',
  'NL': 'Netherlands',
  'AN': 'Netherlands Antilles',
  'NC': 'New Caledonia',
  'NZ': 'New Zealand',
  'NI': 'Nicaragua',
  'NE': 'Niger',
  'NG': 'Nigeria',
  'NU': 'Niue',
  'NF': 'Norfolk Island',
  'MP': 'Northern Mariana Islands',
  'NO': 'Norway',
  'OM': 'Oman',
  'PK': 'Pakistan',
  'PW': 'Palau',
  'PS': 'Palestinian Territory, Occupied',
  'PA': 'Panama',
  'PG': 'Papua New Guinea',
  'PY': 'Paraguay',
  'PE': 'Peru',
  'PH': 'Philippines',
  'PN': 'Pitcairn',
  'PL': 'Poland',
  'PT': 'Portugal',
  'PR': 'Puerto Rico',
  'QA': 'Qatar',
  'RE': 'Reunion',
  'RO': 'Romania',
  'RU': 'Russian Federation',
  'RW': 'Rwanda',
  'BL': 'Saint Barthelemy',
  'SH': 'Saint Helena',
  'KN': 'Saint Kitts And Nevis',
  'LC': 'Saint Lucia',
  'MF': 'Saint Martin',
  'PM': 'Saint Pierre And Miquelon',
  'VC': 'Saint Vincent And Grenadines',
  'WS': 'Samoa',
  'SM': 'San Marino',
  'ST': 'Sao Tome And Principe',
  'SA': 'Saudi Arabia',
  'SN': 'Senegal',
  'RS': 'Serbia',
  'SC': 'Seychelles',
  'SL': 'Sierra Leone',
  'SG': 'Singapore',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'SB': 'Solomon Islands',
  'SO': 'Somalia',
  'ZA': 'South Africa',
  'GS': 'South Georgia And Sandwich Isl.',
  'ES': 'Spain',
  'LK': 'Sri Lanka',
  'SD': 'Sudan',
  'SR': 'Suriname',
  'SJ': 'Svalbard And Jan Mayen',
  'SZ': 'Swaziland',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'SY': 'Syrian Arab Republic',
  'TW': 'Taiwan',
  'TJ': 'Tajikistan',
  'TZ': 'Tanzania',
  'TH': 'Thailand',
  'TL': 'Timor-Leste',
  'TG': 'Togo',
  'TK': 'Tokelau',
  'TO': 'Tonga',
  'TT': 'Trinidad And Tobago',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TM': 'Turkmenistan',
  'TC': 'Turks And Caicos Islands',
  'TV': 'Tuvalu',
  'UG': 'Uganda',
  'UA': 'Ukraine',
  'AE': 'United Arab Emirates',
  'GB': 'United Kingdom',
  'US': 'United States',
  'UM': 'United States Outlying Islands',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VU': 'Vanuatu',
  'VE': 'Venezuela',
  'VN': 'Viet Nam',
  'VG': 'Virgin Islands, British',
  'VI': 'Virgin Islands, U.S.',
  'WF': 'Wallis And Futuna',
  'EH': 'Western Sahara',
  'YE': 'Yemen',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
}
