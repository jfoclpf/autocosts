
const path    = require('path');
const nodeUrl = require('url');

const url     = require(path.join(__dirname, 'url'));
const crypto  = require('crypto');
const debug   = require('debug')('app:getCC');

//module global variable strings relating to Content-Security-Policy
//they are created beforehand for fast delivery
var CSPstr0, CSPstr1;

module.exports = {

    render: function(req, res, serverData, wordsOfCountry) {

        var CC = req.params.CC; //ISO 2 letter Country Code
        debug("Country code: "  + CC);

        //data to be rendered embedded in the HTML file
        var data = {};

        data.isGetCC = true;
        data.isStats = false;

        //Object with all the expressions for each country
        data.words = wordsOfCountry;
        data.words.word_per += "&#32;" //add non-breaking space
        data.words.word_per = data.words.word_per.replace(/(&#32;).*/g, `$1`); //removes excess of "&#32;"

        //global constant data for every request, and that was already loaded when the server app was initialized
        data.serverData = serverData;
        delete data.serverData.availableCountries.XX;

        //information depending on this request from the client
        var clientData = {
            "fullURL"      : fullUrl(req),                      //full url, ex: "https://autocosts.info/PT"
            "basicURL"     : basicURL(req),                     //basic url, ex: "https://autocosts.info"
            "languageCode" : serverData.languagesCountries[CC], //ISO language code (ex: pt-PT)
            "isThisATest"  : url.isThisATest(req),              //boolean variable regarding if present request is a test
            "notLocalhost" : !url.isThisLocalhost(req),         //boolean variable regarding if present request is from localhost
            "httpProtocol" : url.getProtocol(req, serverData.settings.switches.https)
        }
        data.clientData = clientData;

        //ISO 2 letter Country Code
        data.CC = data.words.CC = data.clientData.CC = CC;

        data.emptyChar = ""; //empty character to be used in handlebars for whitespace trimming
        data.layout = false; //doesn't use handlebars default template

        var fileToRender = path.join(serverData.directories.index, "views", "main.hbs");

        if(clientData.notLocalhost){
            let nonce = crypto.randomBytes(16).toString('base64');
            data.nonce = nonce;
            let CSPstr = this.getCSPstr(nonce);
            debug(CSPstr.replace(/;/g,`;\n`));
            res.set('Content-Security-Policy', CSPstr);
        }
        else{
            data.nonce = "";
        }

        res.render(fileToRender, data);
    },

    //Content Security Policy for webpages in Internet
    //generates two global variable strings CSPstr0 and CSPstr1
    preGenerateCSPstring: function (serverData){

        var switches = serverData.settings.switches;
        var fileNames = serverData.fileNames;

        var reliableDomains = [];

        if(serverData.settings.cdn.enabled){
            reliableDomains.push(extractHostname(serverData.settings.cdn.url));
            for(var key in fileNames.client){
                var file = fileNames.client[key];
                if(file.cdn){
                    reliableDomains.push(file.cdn);
                }
            }
        }

        //see https://goo.gl/z6MGXb
        var frameStr = "";
        if(switches.googleCaptcha){
            reliableDomains.push("https://www.google.com/recaptcha/");
            reliableDomains.push("https://www.gstatic.com/recaptcha/");
            frameStr = "frame-src https://www.google.com/recaptcha/;" + " ";
        }

        if(switches.googleAnalytics){
            reliableDomains.push("https://www.google-analytics.com");
        }

        if(switches.uber){
            reliableDomains.push("https://api.uber.com");
        }

        //filters repeated values
        var uniqueReliableDomains = reliableDomains.filter(function(item, pos) {
            return reliableDomains.indexOf(item) == pos;
        })
        debug(uniqueReliableDomains);

        //adds string with reliable domains/urls
        var domainsStr = "";
        for (var i=0; i<uniqueReliableDomains.length; i++){
            domainsStr += uniqueReliableDomains[i] + " ";
        }

        //this is a global variable
        CSPstr0 = "default-src 'self'" + " " + domainsStr + "; ";
        CSPstr0 += "script-src 'self'" + " " + domainsStr + " " + "'unsafe-eval' 'unsafe-inline'" + " ";

        //this is a global variable
        CSPstr1 = "style-src 'self' 'unsafe-inline'; ";
        CSPstr1 += "img-src 'self' https://www.google-analytics.com data:; ";
        CSPstr1 += "object-src 'none';";
        CSPstr1 += "base-uri 'self';";
        CSPstr1 += frameStr;
    },

    //get CSP string since pre-generation of CSP string was done initially as the index.js starts
    getCSPstr: function(nonce=""){

        //for 'strict-dynamic' read
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#strict-dynamic
        var nonceStr;
        if(nonce){
            nonceStr = "'nonce-" + nonce +"' 'strict-dynamic';";
        }
        else{
            nonceStr = ";";
        }

        return CSPstr0 + nonceStr + CSPstr1;
    }

}


//for example: "https://autocosts.info/PT"
function fullUrl(req){
    return nodeUrl.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

//for example: "https://autocosts.info"
function basicURL(req){
    return nodeUrl.format({
        protocol: req.protocol,
        host: req.get('host')
    });
}

