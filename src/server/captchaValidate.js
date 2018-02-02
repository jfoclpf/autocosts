/*server side script that handles with the POST request made by the client/browser
regarding the Google reCapactha v2 https://developers.google.com/recaptcha/docs/display */

const request  = require('request');
const fs       = require('fs');

module.exports = function(req, res, GlobData) {
        
    var captchaResponse = req.body['g-recaptcha-response'];
    if(!captchaResponse){
        res.send("not-ok-1");
        return;
    }
    
    //get IP from user
    var ip = req.headers['x-forwarded-for'].split(',').pop() || 
             req.connection.remoteAddress || 
             req.socket.remoteAddress || 
             req.connection.socket.remoteAddress;
    
    var keyFile = GlobData.Dirs.ROOT_DIR + 'keys/' + GlobData.REL + '/recaptcha_key.json';        
    var data = JSON.parse(fs.readFileSync(keyFile));
    var secretKey = data.secretKey;
    
    //loads the Google info with corresponding response
    //@ forces the ignoring of warnings in case the info is not loaded    
    var API_url = "https://www.google.com/recaptcha/api/siteverify?secret=" + 
        secretKey + "&response=" + captchaResponse + "&remoteip=" + ip;
    
    //HTTP Header request
    var options = {
        url: API_url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };
        
    request(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var responseKeys = JSON.parse(body);
            if (Number(responseKeys["success"]) !== 1){
                res.send("not-ok-2");
                return;            
            }
            else{
                console.log("Google captcha response ok");
                res.send("ok");
                return;            
            }
        }
        
        else{
            console.log("error making the Recaptach request to Google: ", error);
            res.send("not-ok-3");
            return;
        }
    });    
}
