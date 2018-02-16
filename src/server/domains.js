const url   = require(__dirname + '/url');
const debug = require('debug')('app:domains');

module.exports = function(req, res, serverData, WORDS) {

    var data = {};
    data.WORDS = JSON.parse(JSON.stringify(WORDS)); //clone object
    delete data.WORDS.XX;
    
    var domainsCountries = JSON.parse(JSON.stringify(serverData.domainsCountries)); //clone object
    delete domainsCountries.XX;
    
    var domains = {};
    //array serverData.domains has unique elements, i.e. an array without repeated elements
    for (var i=0; i<serverData.domains.length; i++){
        
        var domain = serverData.domains[i];
        domains[domain] = {}; //creates an empty entry
        
        //get the domains that exist for a particular domain
        //i.e. which countries have, for example the "autocosts.info" as associated domain
        var domainsCC = getCCforDomain(domainsCountries, domain);        
        
        domains[domain].nbrItems = domainsCC.length;
        
        if (domainsCC.length == 1){
            domains[domain].singular = true;
        }
        else{
            domains[domain].singular = false;
        }
        
        domains[domain].countries = {}; //creates an empty entry                  
        for (var j=0; j<domainsCC.length; j++){
                        
            var CC = domainsCC[j];            
            var country = serverData.availableCountries[CC]                        
            
            //the "first" detects the first element to render correctly the table in handlebars
            //regarding the first line <td rowspan="x">
            var first = (j==0)? true : false;
            
            req.params.CC = CC;
            var fullURL = url.getValidURL(req, domainsCountries, serverData.settings.switches.https);
            
            var Obj = {
                "country": country,
                "first": first,
                "fullURL": fullURL
            };            
            domains[domain].countries[CC] = Obj;
        }
        
    }    
    debug(domains);            
    data.domains = domains;
    
    data.layout = false;

    var fileToRender = serverData.directories.index + "views/domains.hbs";
    res.render(fileToRender, data);
    
}

//get array of countries codes (CC) having a specific domain
function getCCforDomain(domainsCountries, domain){

    var domainsCC = [];
    for (var CC in domainsCountries){
        if(domainsCountries[CC] == domain){
            domainsCC.push(CC);
        }
    }    
    return domainsCC;
}



