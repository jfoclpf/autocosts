
const fs      = require('fs');
const url     = require('./url');
const commons = require('../../commons');

module.exports = function(req, res, GlobData, WORDS_CC) {    
        
    var CC = req.params.CC;
    var LangCode = GlobData.languages_CT[CC]; //language codes

    console.log("Country code: "  + CC);
    console.log("Language code: " + LangCode);
    
    //data to be rendered embedded in the HTML file
    var data = {};    
    
    data.Words = WORDS_CC;
    data.CC = data.Words.CC = CC; //add new property
    data.word_per += "&#32;" //add non-breaking space

    //empty var to be used in handlebars for whitespace trimming
    data.emptyChar = "";
    
    //add country_select (list of countries) to object to be rendered
    //to render the dropdown countries list box
    data.countriesList = GlobData.available_CT;
    delete data.countriesList["XX"];
    
    //add domains array
    data.domains = GlobData.domains;
    
    //boolean variable regarding if present rendering is a test
    data.isThisATest = url.isThisATest(req);
    
    //other data to be rendered    
    data.LangCode = LangCode;
    data.available_CT = GlobData.available_CT;    
    data.countriesListOnString = commons.getCCListOnStr(GlobData.available_CT); //a string with all the CC
    data.domains_CT = GlobData.domains_CT;
    data.clientDir = GlobData.Dirs.clientDir;
    
    //selects CDN URL
    if (GlobData.Settings.CDN.IS_CDN){
        data.CDN_URL = url.isThisATest(req) ? GlobData.Settings.CDN.URL_WORK : GlobData.Settings.CDN.URL_PROD;
    }
    else{
        data.CDN_URL = "";
    }
    console.log("CDN_URL: ", data.CDN_URL);
    
    data.HTTP_Protocol = url.getProtocol(req, GlobData.Settings.IS_HTTPS);
    
    data.layout = false; 
    
    var fileToRender = GlobData.Dirs.INDEX_DIR + "views/main.hbs";
    res.render(fileToRender, data);
    
}

