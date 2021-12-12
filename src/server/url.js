/* This web site uses several domain names and different domain names extensions.
The server side code shall thus forward the page if the entry URL is not correctly typed
according to the domain name vs. country code combinatorial rules.
Check the actual policy: https://github.com/jfoclpf/autocosts/wiki/URL-selector */

/* jslint node: true */

'use strict'

const GEO_IP = require('geoip-lite')
const debug = require('debug')('app:url')
const nodeUrl = require('url')

module.exports = {

  // to be used from app.get('/'), that is, when no path is provided
  root: function (req, res, serverData) {
    // Is this domain/host a ccTLD? For ex. autocustos.pt?
    // If yes, do not forward (render the page)
    const cc = isDomainAccTLD(req.get('host')) // returns cc or false
    if (cc && isCCinCountriesList(cc, serverData.availableCountries)) {
      debug('isSingleDomain', cc)
      return { wasRedirected: false, cc: cc } // it does not redirect, thus wasRedirected is false
    } else {
      // see: https://github.com/jfoclpf/autocosts/wiki/URL-selector#procedure
      // A) If name (ex: autocosti) of domain (ex: autocosti.info) is recognized (belongs to a known host)
      // and associated with only one host (IT:autocosti.it) forward to said host.
      // Thus forward autocosti.info => autocosti.it
      // B) If name (ex:autocustos) of domain (ex:autocustos.info) is recognized but associated with more
      // than one country (ex: PT:autocustos.pt and BR:autocustos.info) forward according to locale
      // Thus autocustos.info forwards according to locale
      // C) Forwards according to locale in any other situation

      // get name of domain without extension, e.x.: 'autocosti' in 'www.autocosti.info'
      const urls = serverData.urls
      const nameOfDomainReq = getNameOfDomain(req.get('host')) // ex: 'autocosti' or 'autocustos'
      // check if nameReq exists and associated with only one country
      let countNameOfDomain = 0 // ex: the number of times the name of domain 'autocustos' appears
      let hostToForward
      // domain.countsOfCanonicalHostname has the number of times each host appears (ex: autocustos.pt appears only 1)
      for (const host in urls.countsOfCanonicalHostname) {
        const nameOfDomainCountry = getNameOfDomain(host)
        if (nameOfDomainReq === nameOfDomainCountry && urls.countsOfCanonicalHostname[host] === 1) {
          countNameOfDomain++
          hostToForward = host
        }
      }
      if (countNameOfDomain === 1) {
        req.params.cc = getDomainExtension(hostToForward)
        const url2redirect = getValidURL(req, urls)
        redirect301(res, url2redirect) // 301 redirects are permanent
      } else {
        // redirects according to locale and/or browser settings
        redirect302(req, res, serverData) // temporary
      }

      return { wasRedirected: true, CC: undefined } // it redirects, thus wasRedirected is true
    }
  },

  // to be used from app.get('/:CC')
  // returns true if it redirects
  getCC: function (req, res, serverData) {
    const urlHref = getProtocol(req) + '//' + req.get('host') + req.originalUrl
    debug('Entry URL: ' + urlHref)

    let url2redirect

    if (!isCCinCountriesList(req.params.cc, serverData.availableCountries) && !isCCXX(req.params.cc)) {
      // If the cc characters in the domain.ext/cc are NOT recognized
      debug('if (!isCCinCountriesList)')

      // Does this domain/host is associated with only one country code (cc)?
      // if yes, redirect to valid url of said cc, ex: from autocustos.pt/ap => autocustos.pt
      // if no, redirects according to locale and/or browser settings
      const cc = isSingleDomain(req.get('host'), serverData.urls)
      if (cc && isCCinCountriesList(cc, serverData.availableCountries)) {
        debug('isSingleDomain', cc)
        req.params.cc = cc.toUpperCase()
        url2redirect = getValidURL(req, serverData.urls)
        redirect301(res, url2redirect) // 301 redirects are permanent
      } else {
        debug('isSingleDomain == false', cc)
        // redirects according to locale and/or browser HTTP Accept-Language settings
        redirect302(req, res, serverData) // 302 redirects are temporary
      }
      return true
      // from here the cc, independently of the case (upper or lower) is in the list or is xx or XX
      // and thus from here, the cc has always two letters since it is in the list
    } else if (!isCC2letterLowerCase(req.params.cc)) {
      // if the cc characters after domain.info/cc ARE recognized as being in the list
      // But if the two-letter code are NOT all in lower case domain.info/cc

      debug('if (!isCC2letterLowerCase)')
      url2redirect = getValidURL(req, serverData.urls)
      redirect301(res, url2redirect) // 301 redirects are permanent
      return true
      // from here the cc is reconginzed and it's in uppercase
    } else if (isSubdomain(req)) {
      // check if has subdomains such as www.autocosts.info. It shall forward to autocosts.info

      debug('if(isSubdomain)')
      url2redirect = getValidURL(req, serverData.urls)
      redirect301(res, url2redirect) // 301 redirects are permanent
      return true
    } else if (isThisATest(req) || !isThisARecognizedHost(req.get('host'), serverData.urls)) {
      // on test mode or if domain/host is not recognized (ex: autoxxx.info or 299.199.199.199);
      // since the cc here is recongnized and it's already in lower case, do not redirect url
      debug('if(isThisATest)')
      return false // leave now, do not redirect
    } if (!isDomainCCcombValid(req.get('host'), req.params.cc, serverData.urls)) {
      // if the URL is not the valid URL, i.e. the combination domain/CC is not valid
      // example: autocosts.info/pt (not valid) shall forward to autocustos.pt (valid)
      // example: autocosts.info/ar (not valid) shall forward to autocostos.info/ar (valid)

      debug('if (!isDomainCCcombValid)')
      url2redirect = getValidURL(req, serverData.urls)
      redirect301(res, url2redirect) // 301 redirects are permanent
      return true
    } else {
      // do not redirect, everything is ok
      return false
    }
  },

  // full current url
  getCurrentUrl: function (req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl
  },

  // for example: "https://autocosts.info/worldstats"
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
  },

  isThisATest: isThisATest,
  isThisARecognizedHost: isThisARecognizedHost,
  getProtocol: getProtocol,
  isThisLocalhost: isThisLocalhost,
  getValidURL: getValidURL,
  isCCinCountriesList: isCCinCountriesList,
  isCCXX: isCCXX,
  getNameOfDomain: getNameOfDomain,
  isDomainAccTLD: isDomainAccTLD,
  sanitizeCC: sanitizeCC
}

// 302 redirects are temporary
// it's temporary because the redirect might, from a defined starting URL,
// redirect to different URLs according to the locale of the user,
// and we don't want to inform search engines that a page of a country
// makes a permanent redirect to a page of another country
function redirect302 (req, res, serverData) {
  // get country by locale or HTTP header from browser
  const geoCC = getGeoCC(req, serverData.availableCountries, serverData.settings.defaultCountry)

  req.params.cc = geoCC
  const url2redirect = getValidURL(req, serverData.urls)

  res.redirect(302, url2redirect)
  debug('redirecting 302 to ' + url2redirect)
}

// 301 redirects are permanent
function redirect301 (res, url2redirect) {
  res.redirect(301, url2redirect)
  debug('redirecting 301 to ' + url2redirect)
}

// cc must be in the format pt, xx, uk, i.e. the letters in lower case
function isCC2letterLowerCase (cc) {
  return cc === cc.toLowerCase()
}

function isCCinCountriesList (CC, availableCountries) {
  // 2-letter ISO Country Code (CC)
  if (!CC || CC.length !== 2) {
    return false
  }

  const CCupper = CC.toUpperCase()
  const CClower = CC.toLowerCase()

  return availableCountries.hasOwnProperty(CCupper) || availableCountries.hasOwnProperty(CClower) // eslint-disable-line no-prototype-builtins
}

// get the 2-letter country code of user according to locale or HTTP header
function getGeoCC (req, availableCountries, defaultCountry) {
  // try to get country by IP
  if (!isThisLocalhost(req)) {
    // tries to get IP from user
    const ip = req.headers['x-forwarded-for'].split(',').pop() ||
                 req.connection.remoteAddress ||
                 req.socket.remoteAddress ||
                 req.connection.socket.remoteAddress

    const geo = GEO_IP.lookup(ip)
    let geoCC = (geo && geo.country) ? geo.country : 'US'

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
  const acceptLanguage = req.headers['accept-language']
  let CC_HTTP = getCountryfromHTTP(acceptLanguage)
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

// Check if the domain/CC combination is valid. For a specific CC only one combination is valid.
// example: autocustos.info/pt is not valid because for PT autocustos.pt is valid
// example: autocosts.info/ar is not valid because for AR only autocostos.info/AR is valid
function isDomainCCcombValid (host, _cc, urls) {
  const CC = _cc.toUpperCase()
  const cc = _cc.toLowerCase()
  // host is string with domain, exemple: 'autocosts.info'
  return host.toLowerCase() + '/' + cc === urls.canonicalHostname[CC] + urls.canonicalPathname[CC]
}

// full valid URL, examples:
// PT: https://autocustos.pt (because there's only one domain associated with thus country code)
// IT: https://autocosti.it (because there's only one domain associated with thus country code)
// AR: https://autocostos.info/AR (because there's several countries associated with this domain)
function getValidURL (req, urls) {
  debug('getValidURL')

  const CC = req.params.cc.toUpperCase()
  const cc = req.params.cc.toLowerCase()

  let URL
  if (isThisLocalhost(req) || isCCXX(CC)) {
    URL = nodeUrl.format({ protocol: getProtocol(req), host: req.get('host'), pathname: cc })
  } else if (isDevDomain(req)) { // autocosts.dev
    URL = nodeUrl.format({ protocol: getProtocol(req), host: 'autocosts.dev', pathname: cc })
  } else {
    URL = nodeUrl.format({
      protocol: getProtocol(req),
      host: urls.canonicalHostname[CC],
      pathname: urls.canonicalPathname[CC]
    })
  }

  debug('Valid URL: ' + URL)
  return URL
}

// get name (ex: autocosti) of domain (ex: autocosti,info) without extension,
// e.x.: 'autocosti' in 'www.it.autocosti.it' or 'autocosti.info'
// for url part terminology: https://github.com/jfoclpf/autocosts/wiki/URL-selector
function getNameOfDomain (host) {
  return host.split('.').slice(-2, -1)[0]
}

// check https://github.com/jfoclpf/autocosts/wiki/URL-parts-terminology
// the `:` is part of the protocol
function getProtocol (req) {
  if (req.secure && !isThisLocalhost(req)) {
    return 'https:'
  }
  return 'http:'
}

// Everything which is not run on full production (using accepted domains, ex: autocosts.info) is a test
// Returns true if the sever is using TLD .work or .dev or if it run by localhost
// Returns true also when domain of req is not in the list of recognized/canonical domains on src/countries/info.json
function isThisATest (req) {
  debug('isThisATest')

  const cc = req.params.cc
  if (cc) {
    return isDevDomain(req) || isThisLocalhost(req) || isCCXX(cc)
  } else {
    return isDevDomain(req) || isThisLocalhost(req)
  }
}

/* Domain/host related functions */

// for example autoxxx.info returns false, recognized domains on src/countries/info.json
function isThisARecognizedHost (host, urls) {
  return isThisCanonicalDomain(host, urls) || isThisLegacyDomain(host, urls)
}

// Returns true when domain/host is in the list of canonical domains on src/countries/info.json
function isThisCanonicalDomain (host, urls) {
  if (host) {
    return Object.values(urls.canonicalHostname).includes(host)
  } else {
    return false
  }
}

function isThisLegacyDomain (host, urls) {
  if (host) {
    return urls.legacyDomains.includes(host)
  } else {
    return false
  }
}

// www.example.com returns true and example.com returns false
function isSubdomain (req) {
  const host = req.get('host')

  const hostRoot = host.split(':')[0]
  const hostDim = (hostRoot.split('.')).length
  if (hostDim > 2) {
    return true
  }

  return false
}

// function that says whether a domain is associated with only One country
// for example autokoszty.info is associated only with pl,
// whilst autocosts.info has several CCs associated
// returns the associated Country Code (CC) or false
function isSingleDomain (host, urls) {
  if (host) {
    for (const canonicalHost in urls.countsOfCanonicalHostname) {
      if (host.indexOf(canonicalHost) > -1 && urls.countsOfCanonicalHostname[canonicalHost] === 1) {
        return getKeyByValue(urls.canonicalHostname, canonicalHost).toLowerCase()
      }
    }
  }
  return false
}

// check if domain is a country code top level domain (ccTLD)
// for exemple autocustos.pt returns 'pt' and for autocustos.info returns false
function isDomainAccTLD (host) {
  const upperExtension = getDomainExtension(host).toUpperCase() // ex: 'PT'
  if (isoCountries.hasOwnProperty(upperExtension)) { // eslint-disable-line no-prototype-builtins
    return upperExtension.toLowerCase()
  } else {
    return false
  }
}

function getDomainExtension (host) {
  return host.split('.').pop() // ex: 'pt'
}

// tells of TLD of host is .dev or .work
function isDevDomain (req) {
  const host = req.get('host')
  const hostSplit = host.split('.')
  const tlde = hostSplit[hostSplit.length - 1] // top level domain extension, ex: ".info"

  if (tlde.toLowerCase() === 'dev' || tlde.toLowerCase() === 'work') {
    return true
  }
  return false
}

function isThisLocalhost (req) {
  debug('isThisLocalhost')

  const ip = req.ip
  const host = req.get('host')
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
  let CC // Country Code

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

    let substr
    for (let i = 0; i + 2 < acceptLanguage.length; i++) {
      substr = acceptLanguage.substring(i, i + 2)
      if (isoCountries.hasOwnProperty(substr)) { // eslint-disable-line no-prototype-builtins
        return substr
      }
    }
  }

  if (isoCountries.hasOwnProperty(CC)) { // eslint-disable-line no-prototype-builtins
    return CC
  }

  return null
}

// on a certain Object, gets the key, given the value
function getKeyByValue (object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

// 2-letter ISO Country Codes
const isoCountries = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia And Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: 'Cote D\'Ivoire',
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island & Mcdonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic Of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Lao People\'s Democratic Republic',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libyan Arab Jamahiriya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States Of',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestinian Territory, Occupied',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And Sandwich Isl.',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  UK: 'United Kingdom',
  US: 'United States',
  UM: 'United States Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis And Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe'
}
