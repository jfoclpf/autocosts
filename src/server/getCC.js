
const fs = require('fs');
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

    //add country_select (list of countries) to object to be rendered
    //to render the dropdown countries list box
    data.countriesDropDownList = GlobData.available_CT;
    delete data.countriesDropDownList["XX"];

    res.render('home', data);
    
}


