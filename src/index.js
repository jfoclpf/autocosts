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

const fs = require('fs');
const express = require('express');
const exphbs  = require('express-handlebars');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const clientDir = 'client/';

const CountriesInfo = JSON.parse(fs.readFileSync(__dirname + '/countries/list.json', 'utf8'));	
const available_CT = CountriesInfo.available_CT; //available Countries
const languages_CT = CountriesInfo.languages_CT; //Language Codes
const domains_CT   = CountriesInfo.domains_CT;   //Domains

/*Global Variables*/
//merely defaults, they may change later accordingly
var CC = DefaultCC; //CC stands for 2-letter Country Code
var LangCode = languages_CT[DefaultCC];
var CDN_URL = "";
var HTTP_Protocol = "http"; 

var app = express();
app.enable('case sensitive routing');

var hbs = exphbs.create({
    defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
        /*using for selecting value in HTML select boxes*/
        isSelected: function (value) { 			
			return CC === value ? 'selected' : ''; 
		},
        /*chose the HTML costs table for specific country*/
        costs_table: function (){
            return CC+'costs';
        },
        banner_flag: function (){
            return CC.toLowerCase() + ' ' + 'flag';
        } 
    }
});

app.engine('.hbs', hbs.engine);
app.engine('.js', ejs.__express);

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/countries', express.static(__dirname + '/countries'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Routing for HTML layout and forms
app.get('/:CC', function (req, res, next) {    
    
    if (req.params.CC === "Globals.js" || req.params.CC === "submitUserInput"){
        next();
        return;
    }

    const url = require(__dirname + '/server/url');
    //returns true if redirected to another URL, false otherwise        
    if (url.redirectIfNecessary(req, res, available_CT, languages_CT, domains_CT, IS_HTTPS, DefaultCC)){
        return;
    }
    
    CC = req.params.CC;
    console.log("app.get('/:CC')");
    console.log("Country Code :" + CC);    

    if(IS_CDN){
        if(url.isWorkDomain(req)){
            CDN_URL = CDN_URL_WORK;
        }
        else{
            CDN_URL = CDN_URL_PROD;
        }
    }
    else{
        CDN_URL = "";
    }

    HTTP_Protocol = url.getProtocol(req, IS_HTTPS);

    app.set('view engine', '.hbs');    

    var words = JSON.parse(fs.readFileSync(__dirname + '/countries/' + CC + '.json', 'utf8'));	
    words.word_per += "&#32;" //add non-breaking space

    LangCode = languages_CT[CC]; //language codes
    console.log("Language code: " + LangCode);

    //add property
    words.country_select = CountriesInfo.available_CT;

    res.render('home', words);

});

//Javavascript Globals.js file to the client with variables inserted by the server
//The order of app.get must be preserved
app.get('/Globals.js', function(req, res) {       
    console.log("app.get('/Globals.js')");
    
    app.set('view engine', '.js'); 
    
    res.set('Content-Type', 'application/javascript');
    res.render('Globals.ejs', { 
        CC : CC,
        LangCode : LangCode,
        available_CT : available_CT,
        domains_CT : domains_CT,
        clientDir : clientDir,
        CDN_URL : CDN_URL,
        HTTP_Protocol : HTTP_Protocol
    });
});

//Javavascript Globals.js file to the client with variables inserted by the server
//The order of app.get must be preserved
app.post('/submitUserInput', function(req, res) {       
    console.log("app.post('/submitUserInput')");
    //console.log(req.body);
    
    const mysql = require('mysql'); //module to get info from DB
    
    
});

var HTTPport = 3000; 
var server = app.listen(HTTPport, function () {
    console.log('Listening on port ' + HTTPport);
    //server.close();
});
