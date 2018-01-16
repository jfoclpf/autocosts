/* This detects the region of the user by his locale and tries to return,
if applicable, a cost per unit distance of the correspondent 
UBER service in that region from which the user is accessing the site */

const fs = require('fs');
const url = require(__dirname + '/url');

module.exports = function(req, res, GlobData) {
    
    if (!url.isThisLocalhost(req)){
        //tries to get IP from user
        var ip = req.headers['x-forwarded-for'].split(',').pop() || 
                 req.connection.remoteAddress || 
                 req.socket.remoteAddress || 
                 req.connection.socket.remoteAddress;
        
        const geoIP = require('geoip-lite');
        var geo = geoIP.lookup(ip);
        var lat  = geo.range[0];
        var long = geo.range[1];
        
        
        var debug=0; //put 0 for PROD; 1 for Lisbon, 2 for London
        if(debug==1){//Lisbon coordinates
            lat=38.722252;
            long=-9.139337;
        }
        else if(debug==2){ //London
            lat=51.507351;
            long=-0.127758;  
        }
        console.log("lat: " + lat + "; long: " +long);

        //get uber token
        //to manage tokens, visit: https://developer.uber.com/dashboard
        //user:info@autocosts.info | pass: V*************
        var uber_token = JSON.parse(fs.readFileSync(ROOT_DIR + 'keys/' + REL + '/uber_token.json'));
        console.log("uber_token", uber_token);
        var uber_API_url = "https://api.uber.com/v1.2/products?latitude=" + 
                            lat + "&longitude=" + long + "&server_token=" + uber_token;        
        console.log("uber_API_url", uber_API_url);
        
        //HTTP Header reques
        var options = {
            url: uber_API_url,
            headers: {
                'Accept-Language': 'en_US',
                'Content-Type': 'application/json; charset=utf-8'
            }
        };        

        request(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
                console.log("Uber response: ", info);
            }        
        });        
    }
}