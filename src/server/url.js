/*This web site uses several domain names, all with a TLD extension of .info and a test version with a TLD extension of .work. 
The server side code shall thus forward the page if the entry URL is not correctly typed 
according to the domain name vs. country code combinatorial rules.
For the flowchart check https://github.com/jfoclpf/autocosts/wiki/URL-selector */

const GEO_IP = require('geoip-lite');

module.exports = {
    
    //when no country code is provided, example autocosts.info/
    //if the user is in Portugal, redirects to autocustos.info/PT
    redirect: function (req, res, serverData){               
        redirect302(req, res, serverData);        
    },
    
    //to be used from app.get('/:CC')
    //returns true if it redirects
    getCC: function (req, res, serverData) {                
        
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("Entry URL: " + fullUrl);       
        
        var CC = req.params.CC;
        var url2redirect;
        
        //if no country is defined or the country isn't in the list
        //i.e, if the CC characters in domain.info/CC are not recognized
        //get the Country from locale or HTTP Accept-Language Info
        if (!isCCinCountriesList(CC, serverData.availableCountries) && !isCCXX(CC)){         
            console.log("if (!isCCinCountriesList)");            
            redirect302(req, res, serverData);
            return true;
        }
        
        //from here the CC, independently of the case (upper or lower) is in the list or is xx or XX 
        //and thus from here, the CC has always two letters since it is in the list
        
        //if the CC characters after domain.info/cc ARE recognized as being in the list 
        //But if the two-letter code are NOT all in upper case domain.info/CC 
        if (!isCC2letterUpperCase(CC)){
            console.log("if (!isCC2letterUpperCase)");
            url2redirect = getValidURL(req, serverData.domainsCountries, serverData.settings.switches.https);
            redirect301(res, url2redirect);
            return true;
        }
        
        //from here the CC is reconginzed and it's in uppercase        
        
        //check if has subdomains such as www.autocosts.info. It shall forward to autocosts.info
        if(isSubdomain(req)){
            console.log("if(isSubdomain)");
            url2redirect = getValidURL(req, serverData.domainsCountries, serverData.settings.switches.https);
            redirect301(res, url2redirect);
            return true;        
        }
        
        if(isThisATest(req)){
            console.log("if(isThisATest)");
            return false;
        }
        
        //if the URL is not the valid URL, i.e. the combination domain/CC is not valid
        //example: autocosts.info/PT (is not valid) shall forward to autocustos.info/PT (valid)        
        if(!isDomainCCcombValid(req, serverData.availableCountries, serverData.domainsCountries)){
            console.log("if (!isDomainCCcombValid)");
            url2redirect = getValidURL(req, serverData.domainsCountries, serverData.settings.switches.https);
            redirect301(res, url2redirect);
            return true;        
        }
        
        //check for https rules and redirect accordingly
        if (req.protocol !== getProtocol(req, IS_HTTPS)){
            console.log("if (protocol !== getProtocol)");
            url2redirect = getValidURL(req, serverData.domainsCountries, serverData.settings.switches.https);
            redirect301(res, url2redirect);
            return true;        
        }        
        
        return false;
    },
    
    isThisATest: function (req){        
        return isThisATest(req);
    },
    
    getProtocol: function(req, IS_HTTPS){        
        return getProtocol(req, IS_HTTPS);
    },
    
    isThisLocalhost: function(req){
        return isThisLocalhost(req);
    },
    
    getValidURL: function(req, domainsCountries, IS_HTTPS){ //returns full URL
        return getValidURL(req, domainsCountries, IS_HTTPS);
    }
};

//302 redirects are temporary
//it's temporary because the redirect might, from a defined starting URL, 
// redirect to different URLs according to the locale of the user,
// and we don't want to inform search engines that a page of a country 
// makes a permanent redirect to a page of another country
var redirect302 = function (req, res, serverData){            

    //get country by locale or HTTP header from browser
    var geoCC = getGeoCC(req, serverData.availableCountries, serverData.settings.defaultCountry);

    var url2redirect;
    if (isWorkDomain(req)){
        url2redirect = req.protocol + '://autocosts.work/' + geoCC;
    }
    else if(isThisLocalhost(req)){
        url2redirect = req.protocol + '://' + req.get('host') + '/' + geoCC;
    }
    //production
    else{ 
        url2redirect = getProtocol(req, serverData.settings.switches.https) + '://' + domainsCountries[geoCC] + '/' + geoCC;
    }
    
    res.redirect(302, url2redirect);
    console.log("redirecting 302 to " + url2redirect);
};

//301 redirects are permanent
var redirect301 = function (res, url2redirect){    
    res.redirect(301, url2redirect);
    console.log("redirecting 301 to " + url2redirect);
}

//CC must be in the format PT, XX, UK, i.e. the letters uppercase
var isCC2letterUpperCase = function(CC){
    return CC === CC.toUpperCase();
};

var isCCinCountriesList = function(CC, availableCountries){        
    
    if(CC.length !== 2){
        return false;
    }
    
    var CCupper = CC.toUpperCase();
    var CClower = CC.toLowerCase();
    
    return availableCountries.hasOwnProperty(CCupper) || availableCountries.hasOwnProperty(CClower);
};

//get the 2-letter country code of user according to locale or HTTP header
var getGeoCC = function(req, availableCountries, defaultCountry){
    
    var host = req.get('host');
    
    //try to get country by IP
    if (!isThisLocalhost(req)){        
        //tries to get IP from user
        var ip = req.headers['x-forwarded-for'].split(',').pop() || 
                 req.connection.remoteAddress || 
                 req.socket.remoteAddress || 
                 req.connection.socket.remoteAddress;
        
        var geo = GEO_IP.lookup(ip);
        var geoCC = geo.country; 

        console.log("geoCC: " + geoCC);

        if (isCCinCountriesList(geoCC, availableCountries)){
            if (geoCC == "GB"){
                geoCC = "UK";
            }
            return geoCC;
        }         
    }
    
    //try to get country from HTTP accept-language info
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
    var accept_language = req.headers["accept-language"];
    var CC_HTTP = getCountryfromHTTP(accept_language);     
    if(CC_HTTP){
        console.log("CC_HTTP: " + CC_HTTP);
        if (isCCinCountriesList(CC_HTTP, availableCountries)){
            if (CC_HTTP == "GB"){
                CC_HTTP = "UK";
            }
            return CC_HTTP;
        }         
    }
        
    //when no other method finds the country of user, use this by default
    return defaultCountry;
};

//is Domain/CC Combination valid?
var isDomainCCcombValid = function (req, availableCountries, domainsCountries){

    var CC = req.params.CC;
    var host = req.get('host');
    
    if (!isCCinCountriesList(CC, availableCountries)){
        return false;
    }
    
    return host.toLowerCase() === domainsCountries[CC];
};

//full URL https://autocustos.info/PT
var getValidURL = function (req, domainsCountries, IS_HTTPS){
    
    var CC = req.params.CC;
    var protocol = req.protocol; 
    var host = req.get('host');
    
    var upCC = CC.toUpperCase();
    
    var URL;
    if(isThisLocalhost(req) || isCCXX(CC)){
        URL = protocol + '://' + host + '/' + upCC;
    }    
    else if(isWorkDomain(req)){
        URL = 'http://autocosts.work/' + upCC;
    }
    else{
        URL = getProtocol(req, IS_HTTPS) + '://' + domainsCountries[upCC] + '/' + upCC;
    }
    
    console.log("Prod URL: " + getProtocol(req, IS_HTTPS) + '://' + domainsCountries[upCC] + '/' + upCC)
    console.log("Valid URL: " + URL);
    return URL;
};

var getProtocol = function (req, IS_HTTPS){
        
    if (IS_HTTPS && !isWorkDomain(req)){
        return "https";
    }
    return "http";
};

//www.example.com returns true and example.com returns false
var isSubdomain = function(req) {
    
    var host = req.get('host');
        
    var host_root = host.split(":")[0];    
    var host_dim = (host_root.split(".")).length; 
    if (host_dim > 2){
        return true;
    }
    
    return false;
};

/*******************************************************************************/
//Functions to check if it is a test 
var isThisATest = function (req){ 

    var CC = req.params.CC;
    var host = req.get('host');
    
    return isWorkDomain(req) || isThisLocalhost(req) || isCCXX(CC);
};

var isWorkDomain = function (req){

    var host = req.get('host');
    var hostSplit = host.split(".");
    var tld = hostSplit[hostSplit.length-1]; //top level domain, ex: ".info"
    
    if (tld.toLowerCase() === "work"){
        return true;
    }
    return false;
};

var isThisLocalhost = function (req){
    
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var host = req.get('host');
    
    return ip === "127.0.0.1" || ip === "::ffff:127.0.0.1" || ip === "::1" || host.indexOf("localhost") !== -1;
};

var isCCXX = function (CC) {    
    return CC.toUpperCase() === "XX";
};


/*******************************************************************************/

//accept_language may be "pt"  or "pt-PT" or    
//"pt-PT,pt;q=0.9,en;q=0.8,en-GB;q=0.7,de-DE;q=0.6,de;q=0.5,fr-FR;q=0.4,fr;q=0.3,es;q=0.2"
var getCountryfromHTTP = function (accept_language){

    var CC; //Country Code
 
    //in some cases like "fr" or "hu" the language and the country codes are the same
    if (accept_language.length === 2){
        CC = accept_language.toUpperCase(); 
    }
    //get "PT" out of "pt-PT"
    else if (accept_language.length === 5){          
        CC = accept_language.substring(3, 5); 
    }
    //ex: "pt-PT,pt;q=0.9,en;q=0.8,en-GB;q=0.7,de-DE;q=0.6,de;q=0.5,fr-FR;q=0.4,fr;q=0.3,es;q=0.2"
    //gets the first two capial letters that fit into 2-letter ISO country code
    else if (accept_language.length > 5) {
        var substr;
        for (var i=0; i+2<accept_language.length; i++){
            substr = accept_language.substring(i, i+2);
            if (isoCountries.hasOwnProperty(substr)){
                return substr;
            }            
        }
    }
    
    if (isoCountries.hasOwnProperty(CC)){
        return CC;
    }
    
    return false;
};

//2-letter ISO Country Codes
var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};