module.exports = function(req, res, dataObj) {

    res.set('Content-Type', 'application/javascript');
    
    var CC = req.params.CC;
    var protocol = getProtocol(req, dataObj.IS_HTTPS);
    
    var data = {
        "CC" : CC,
        "LangCode" : dataObj.languages_CT[CC],
        "available_CT" : dataObj.available_CT,
        "domains_CT" : dataObj.domains_CT,
        "clientDir" : dataObj.clientDir,
        "CDN_URL" : dataObj.CDN_URL,
        "HTTP_Protocol" : protocol,
        "layout": false
    };
    
    //console.log("data to render", data);    
    res.render('Globals', data);
}


var getProtocol = function (req, IS_HTTPS){
    
    var host = req.get('host');
    
    if (IS_HTTPS && !isWorkDomain(req)){
        return "https";
    }
    return "http";
};

var isWorkDomain = function (req){

    var host = req.get('host');
    var hostSplit = host.split(".");
    var tld = hostSplit[hostSplit.length-1];
    
    if (tld.toLowerCase() === "work"){
        return true;
    }
    return false;
};