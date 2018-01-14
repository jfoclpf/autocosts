/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

//change accordingly
const IS_HTTPS = true; //false for simple http
const IS_CDN = false; //Content delivery network
//CDN configuration at https://app.keycdn.com/zones
//CDN provider: https://app.keycdn.com/zones
const CDN_URL_PROD = "https://cdn.autocosts.info"+"/"; //preserve the bar "/" at the end
const CDN_URL_WORK = "http://cdn.autocosts.work"+"/";  //preserve the bar "/" at the end
const DefaultCC = "UK"; //when no other method finds the country of user, use this by default
//###############################################################################
//###############################################################################

console.log("\n\nServer started");

//check https://nodejs.org/dist/latest-v4.x/docs/api/cluster.html#cluster_how_it_works
const numCPUs = require('os').cpus().length;
console.log("numCPUs: " + numCPUs);

const fs = require('fs');
const path  = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const compression = require('compression');

//personalised requires
const url = require(__dirname + '/server/url'); //to deal with the full URL rules and redirect accordingly
const submitUserInput = require(__dirname + '/server/submitUserInput');
const Globals = require(__dirname + '/server/Globals');

const clientDir = 'client/';
const HOME_DIR = path.resolve(__dirname, '..') + "/"; //parent directory of current file directory
const SRC_DIR = HOME_DIR + "src" + "/";

//select release
var REL; //release shall be 'work' or 'prod', it's 'work' by default
if(process.argv.length == 2){    
    REL = "work";
}
else if (process.argv.length > 3){
    console.log("Just one argument is accepted \n");
    process.exit();
}
else{
    if (process.argv[2]!="work" && process.argv[2]!="prod"){
        console.log("work or prod must be chosen \n");
        process.exit();
    }
    REL = process.argv[2];
}
console.log("chosen '" + REL + "'");
//process.exit();

//include credentials object
var DB_INFO = JSON.parse(fs.readFileSync(HOME_DIR + 'keys/' + REL + '/db_credentials.json'));
console.log(DB_INFO);

const CountriesInfo = JSON.parse(fs.readFileSync(__dirname + '/countries/list.json', 'utf8'));	
const available_CT = CountriesInfo.available_CT; //available Countries
const languages_CT = CountriesInfo.languages_CT; //Language Codes
const domains_CT   = CountriesInfo.domains_CT;   //Domains

/*Global Variables*/
//merely defaults, they may change later accordingly
var GLOB_VAR = {
    "CC"            : DefaultCC, //CC stands for 2-letter Country Code
    "available_CT"  : available_CT,
    "domains_CT"    : domains_CT,
    "clientDir"     : clientDir,
    "LangCode"      : languages_CT[DefaultCC],
    "CDN_URL"       : "",
    "HTTP_Protocol" : "http"
};

var app = express();
app.enable('case sensitive routing');

//rendering engine for dynamically loaded HTML files
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        /*using for selecting value in HTML select boxes*/
        isSelected: function (value) {
            return GLOB_VAR.CC === value ? 'selected' : ''; 
        },
        /*chose the HTML costs table for specific country*/
        costs_table: function (){
            return GLOB_VAR.CC+'costs';
        },
        banner_flag: function (){
            return GLOB_VAR.CC.toLowerCase() + ' ' + 'flag';
        } 
    }
});
app.engine('.hbs', hbs.engine);

//rendering engine for dynamically loaded JS files
app.engine('.js', ejs.__express);

//static content
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/countries', express.static(__dirname + '/countries'));

app.use(compression());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//checks CDN
app.use(function (req, res, next) {
    if(IS_CDN){
        if(url.isThisATest(req)){
            CDN_URL = CDN_URL_WORK;
        }
        else{
            CDN_URL = CDN_URL_PROD;
        }
    }
    else{
        CDN_URL = "";
    }
    console.log("CDN_URL: " + CDN_URL);
    next();
});

//Javavascript Globals.js file to the client with variables inserted by the server
//The order of app.get must be preserved
app.set('view engine', '.js');
app.get('/Globals.js', function(req, res){    
    Globals(req, res, GLOB_VAR);
});

/* This detects the region of the user by his locale and tries to return,
if applicable, a cost per unit distance of the correspondent 
UBER service in that region from which the user is accessing the site */
app.get('/get_uber', function(req, res) {
    
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
        var uber_token = JSON.parse(fs.readFileSync(HOME_DIR + 'keys/' + REL + '/uber_token.json'));
        var uber_API_url = "https://api.uber.com/v1.2/products?latitude=" + 
                            lat + "&longitude=" + long + "&server_token=" + uber_token;
        console.log(uber_API_url);
    }
    
});

//Javavascript Globals.js file to the client with variables inserted by the server
//The order of app.get must be preserved
app.post('/submitUserInput', function(req, res) {              
    submitUserInput(req, res, DB_INFO);
});

//Routing for HTML layout and forms
app.set('view engine', '.hbs');
app.get('/:CC', function (req, res, next) {
    console.log("\nRoute: app.get('/CC')");
    
    //returns true if it was redirected
    var wasRedirected = url.getCC(req, res, GLOB_VAR);
    if(wasRedirected){
        return;
    };
    
    //Global object set
    GLOB_VAR.CC = req.params.CC;
    GLOB_VAR.LangCode = languages_CT[GLOB_VAR.CC]; //language codes
    GLOB_VAR.HTTP_Protocol = url.getProtocol(req, IS_HTTPS);        

    console.log("Country code: "  + GLOB_VAR.CC);
    console.log("Language code: " + GLOB_VAR.LangCode);
    
    var words = JSON.parse(fs.readFileSync(__dirname + '/countries/' + GLOB_VAR.CC + '.json', 'utf8'));
    words.word_per += "&#32;" //add non-breaking space    

    //add country_select (list of countries) to object to be rendered
    //to render the dropdown countries list box
    words.countriesDropDownList = CountriesInfo.available_CT;
    delete words.countriesDropDownList["XX"];

    res.render('home', words);
});

app.get('/', function (req, res, next) {
    console.log("\nRoute: app.get('/')");
    url.redirect(req, res, GLOB_VAR);    
});

//error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

var HTTPport = 3000; 
var server = app.listen(HTTPport, function () {
    console.log('Listening on port ' + HTTPport);
    //server.close();
});
