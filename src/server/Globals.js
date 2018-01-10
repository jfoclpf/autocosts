module.exports = function(req, res, dataObj) {
    
    console.log("\nRoute: app.get('/Globals.js')");       
    
    res.set('Content-Type', 'application/javascript');
    res.render('Globals.ejs', { 
        "CC" : dataObj.CC,
        "LangCode" : dataObj.LangCode,
        "available_CT" : dataObj.available_CT,
        "domains_CT" : dataObj.domains_CT,
        "clientDir" : dataObj.clientDir,
        "CDN_URL" : dataObj.CDN_URL,
        "HTTP_Protocol" : dataObj.HTTP_Protocol
    });
}