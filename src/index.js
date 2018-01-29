/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

console.log("\n\nServer started at " + __dirname);

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
const commons         = require('../commons');
const url             = require(__dirname + '/server/url'); //to deal with the full URL rules and redirect accordingly
const submitUserInput = require(__dirname + '/server/submitUserInput');
const getCC           = require(__dirname + '/server/getCC');
const getUBER         = require(__dirname + '/server/getUBER');
const hbsHelpers      = require(__dirname + '/server/hbsHelpers');
const list            = require(__dirname + '/server/list');
const sitemap         = require(__dirname + '/server/sitemap');

//Deals with directories, some dirs are got from commons.js
//other dirs are got directly here in this script
const ROOT_DIR = path.resolve(__dirname, '..') + "/"; //parent directory of project directory tree
const INDEX_DIR = __dirname + "/"; //directory where this script index.js is located
const clientDir = 'client/'; //directory with respect to src/ dir, where the client JS browser files will be stored
var Dirs = commons.getDirs(ROOT_DIR);
Dirs.ROOT_DIR = ROOT_DIR;   //parent directory of main project directory tree
Dirs.INDEX_DIR = INDEX_DIR; //directory where the index.js file is located
Dirs.clientDir = clientDir; //directory with respect to src/ dir, where the client JS files will be stored

const Settings = commons.getSettings();
const REL = commons.getRelease(process); //release shall be 'work' or 'prod', it's 'work' by default

//fixed unchangeable global data which is constant for all HTTP requests independently of the country
const CountriesInfo = JSON.parse(fs.readFileSync(__dirname + '/countries/list.json', 'utf8'));
const GlobData = {
    "REL"           : REL,       //Release: "work" or "prod"
    "Settings"      : Settings,  //Settings set in commons.js
    "Dirs"          : Dirs,      //Directories set in commons.js
    "available_CT"  : sortObj(CountriesInfo.available_CT), //Array of alphabetically sorted available Countries
    "languages_CT"  : CountriesInfo.languages_CT, //Array of Language Codes
    "domains_CT"    : CountriesInfo.domains_CT,   //Array of Domains for each Country
    "domains"       : commons.getUniqueArray(CountriesInfo.domains_CT), //Array of Unique Domains
    "DBInfo"        : JSON.parse(fs.readFileSync(ROOT_DIR + 'keys/' + REL + '/db_credentials.json')) //include credentials object
};
//console.log(GlobData);

//creates Object of objects with Words and Standards for each Country
//such that it can be loaded faster as it is already in memory when the server starts
var WORDS = {}; //Object of Objects with all the words for each country
for (var CC in GlobData.available_CT){
    WORDS[CC] = JSON.parse(fs.readFileSync(GlobData.Dirs.SRC_DIR + 'countries/' + CC + '.json', 'utf8'));
    WORDS[CC].languageCode = GlobData.languages_CT[CC];
    WORDS[CC].domain = GlobData.domains_CT[CC];    
}

var app = express();
app.enable('case sensitive routing');

//rendering engine for dynamically loaded HTML/JS files
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: [ __dirname + '/views/partials/', 
                   __dirname + '/css/merged-min/', 
                   __dirname + '/client/', 
                   __dirname + '/tables/'],
    helpers: hbsHelpers
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//static content
app.use(express.static(__dirname + '/public')); //root public folder
app.use('/tables', express.static(__dirname + '/tables'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/countries', express.static(__dirname + '/countries'));

//app.use(compression()); //Apache already compresses
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*lists all Countries information*/
app.get('/list', function(req, res) {
    console.log("\nRoute: app.get('/list')");
    list(req, res, GlobData, WORDS);
});

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

    //returns true if it was redirected to another URL
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
