
const fs = require('fs');
const sortObj  = require('sort-object'); //to sort JS objects
const url = require(__dirname + '/url');

module.exports = function(req, res, GlobData) {
    
    //returns true if it was redirected
    var wasRedirected = url.getCC(req, res, GlobData);
    if(wasRedirected){        
        return;
    };
        
    var CC = req.params.CC;
    var LangCode = GlobData.languages_CT[CC]; //language codes
    var HTTP_Protocol = url.getProtocol(req, GlobData.IS_HTTPS);        

    console.log("Country code: "  + CC);
    console.log("Language code: " + LangCode);
    
    //data to be rendered embedded in the HTML file
    var data = JSON.parse(fs.readFileSync(GlobData.SRC_DIR + 'countries/' + CC + '.json', 'utf8'));
    data.CC = CC; //add new property
    data.word_per += "&#32;" //add non-breaking space
    
    //empty var to be used in handlebars for whitespace trimming
    data.emptyChar = "";
    
    //add country_select (list of countries) to object to be rendered
    //to render the dropdown countries list box
    data.countriesDropDownList = sortObj(GlobData.available_CT);
    delete data.countriesDropDownList["XX"];
    
    //add domains array
    data.domains = GlobData.domains;
    
    //boolean variable regarding if present rendering is a test
    data.isThisATest = url.isThisATest(req);
    
    //other data to be rendered    
    data.LangCode = LangCode;
    data.available_CT = GlobData.available_CT;
    data.domains_CT = GlobData.domains_CT;
    data.clientDir = GlobData.clientDir;
    data.CDN_URL = GlobData.CDN_URL;
    data.HTTP_Protocol = HTTP_Protocol;
    data.layout = false; 

    res.render('main', data);
    
}


