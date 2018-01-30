const url = require(__dirname + '/url');

module.exports = function(req, res, GlobData, WORDS) {

    var data = {};
    data.WORDS = JSON.parse(JSON.stringify(WORDS)); //clone object
    delete data.WORDS["XX"];
    
    var domains_CT = JSON.parse(JSON.stringify(GlobData.domains_CT)); //clone object
    delete domains_CT["XX"];
    
    var domains = {};
    //array GlobData.domains has unique elements, i.e. an array without repeated elements
    for (var i=0; i<GlobData.domains.length; i++){
        
        var domain = GlobData.domains[i];
        domains[domain] = {}; //creates an empty entry
        
        //get the domains that exist for a particular domain
        //i.e. which countries have, for example the "autocosts.info" as associated domain
        var domainsCC = getCCforDomain(domains_CT, domain);        
        
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
            var country = GlobData.available_CT[CC]                        
            
            //the "first" detects the first element to render correctly the table in handlebars
            //regarding the first line <td rowspan="x">
            var first = (j==0)? true : false;
            
            req.params.CC = CC;
            var fullURL = url.getValidURL(req, domains_CT, GlobData.Settings.IS_HTTPS);
            
            var Obj = {
                "country": country,
                "first": first,
                "fullURL": fullURL
            };            
            domains[domain].countries[CC] = Obj;
        }
        
    }    
    //console.log(domains);            
    data.domains = domains;
    
    data.layout = false;

    var fileToRender = GlobData.Dirs.INDEX_DIR + "views/domains.hbs";
    res.render(fileToRender, data);
    
}

//get array of countries codes (CC) having a specific domain
function getCCforDomain(domains_CT, domain){

    var domainsCC = [];
    for (var CC in domains_CT){
        if(domains_CT[CC] == domain){
            domainsCC.push(CC);
        }
    }    
    return domainsCC;
}




