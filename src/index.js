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

const fs          = require('fs');
const path        = require("path");
const express     = require('express');
const exphbs      = require('express-handlebars');
const bodyParser  = require('body-parser');
const compression = require('compression');
const sortObj     = require('sort-object'); //to sort JS objects

//personalised requires
const url             = require(__dirname + '/server/url'); //to deal with the full URL rules and redirect accordingly
const submitUserInput = require(__dirname + '/server/submitUserInput');
const getCC           = require(__dirname + '/server/getCC');
const getUBER         = require(__dirname + '/server/getUBER');
const hbsHelpers      = require(__dirname + '/server/hbsHelpers');
//const list            = require(__dirname + '/server/list');

const clientDir = 'client/'; //directory with respect to root public HTML, where the client JS flies will be stored
const ROOT_DIR = path.resolve(__dirname, '..') + "/"; //parent directory of project directory tree
const SRC_DIR = ROOT_DIR + "src" + "/"; //parent directory of source code directory

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

//selects CDN_URL Global variable, in case the CDN is used
var CDN_URL;
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

//fixed unchangeable global data which is constant for all HTTP requests independently of the country
const CountriesInfo = JSON.parse(fs.readFileSync(__dirname + '/countries/list.json', 'utf8'));
const GlobData = {
    "REL"           : REL,       //Release: "work" or "prod"
    "ROOT_DIR"      : ROOT_DIR,  //parent directory of main project directory tree
    "SRC_DIR"       : SRC_DIR,   //parent directory of source code directory (normally "/src")
    "DefaultCC"     : DefaultCC, //default Country, changed on the top of the code
    "clientDir"     : clientDir, //directory with respect to root public HTML, where the client JS flies will be stored
    "available_CT"  : sortObj(CountriesInfo.available_CT), //Array of alphabetically sorted available Countries
    "languages_CT"  : CountriesInfo.languages_CT, //Array of Language Codes
    "domains_CT"    : CountriesInfo.domains_CT,   //Array of Domains for each Country
    "domains"       : (Object.values(CountriesInfo.domains_CT)).filter((x, i, a) => a.indexOf(x) == i), //Array of Unique Domains
    "CDN_URL"       : CDN_URL,
    "DBInfo"        : JSON.parse(fs.readFileSync(ROOT_DIR + 'keys/' + REL + '/db_credentials.json')), //include credentials object
    "IS_HTTPS"      : IS_HTTPS  //changed on the top of the code
};

//creates Object of objects with Words for each Country
//such that it can be loaded faster as it is already in memory when the server starts
var WORDS = {}; //Object of Objects with all the words for each country
for (let CC in GlobData.available_CT){
    WORDS[CC] = JSON.parse(fs.readFileSync(GlobData.SRC_DIR + 'countries/' + CC + '.json', 'utf8'));
}

var app = express();
app.enable('case sensitive routing');

//rendering engine for dynamically loaded HTML/JS files
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: [__dirname + '/views/partials/', __dirname + '/css/merged-min/', __dirname + '/client/'],
    helpers: hbsHelpers
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//static content
app.use(express.static(__dirname + '/public')); //root public folder
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/countries', express.static(__dirname + '/countries'));

//app.use(compression()); //Apache already compresses
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*
app.get('/list', function(req, res) {
    console.log("\nRoute: app.get('/list')");
    list(req, res, GlobData);
});*/

app.get('/getUBER/:CC', function(req, res) {
    console.log("\nRoute: app.get('/getUBER')");
    getUBER(req, res, GlobData);
});

app.post('/submitUserInput', function(req, res) {
    console.log("\nRoute: app.post('/submitUserInput')");
    submitUserInput(req, res, GlobData);
});

/*this middleware shall be the last before error*/
/*this is the entry Main Page*/
app.get('/:CC', function (req, res, next) {
    console.log("\nRoute: app.get('/CC')");

    //returns true if it was redirected
    let wasRedirected = url.getCC(req, res, GlobData);
    if(wasRedirected){
        return;
    };
    //from here CC is acceptable and the page will be rendered

    //get words for chosen CC
    let WORDS_CC = WORDS[req.params.CC];
    getCC(req, res, GlobData, WORDS_CC);
});

app.get('/', function (req, res, next) {
    console.log("\nRoute: app.get('/')");
    url.redirect(req, res, GlobData);
});

//error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

var HTTPport = 3000;
var server = app.listen(HTTPport, function () {
    console.log('Listening on port ' + HTTPport);
    //server.close();
});
