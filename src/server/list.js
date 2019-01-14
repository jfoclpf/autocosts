const path  = require('path');
const url   = require(path.join(__dirname, 'url')); //own project module

module.exports = function(req, res, serverData, words) {

    var data = {};
    
    data.isList = true;
        
    data.wordsMatrix = JSON.parse(JSON.stringify(words)); //clone object
    delete data.wordsMatrix.XX;
    
    data.words = data.wordsMatrix.UK;
    
    //information depending on this request from the client    
    var clientData = {
        "fullURL"      : url.fullUrl(req),              //full url, ex: "https://autocosts.info/stats"
        "basicURL"     : url.basicURL(req),             //basic url, ex: "https://autocosts.info"
        "languageCode" : "en",                      //this page of World Statistics of car, renders only in English             
        "isThisATest"  : url.isThisATest(req),      //boolean variable regarding if present request is a test
        "notLocalhost" : !url.isThisLocalhost(req), //boolean variable regarding if present request is from localhost
        "httpProtocol" : url.getProtocol(req, serverData.settings.switches.https)
    }    
    data.clientData = clientData;    
        
    data.layout = false;

    var fileToRender = path.join(serverData.directories.index, "views", "list.hbs");
    res.render(fileToRender, data);
    
}


