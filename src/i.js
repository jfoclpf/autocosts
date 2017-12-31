/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

//CC stands for 2-letter Country Code
var CC; 
				
const fs = require('fs');
const express = require('express');
const exphbs  = require('express-handlebars');
const init = require(__dirname + '/server/initialize');

var CountriesInfo = JSON.parse(fs.readFileSync(__dirname + '/countries/list.json', 'utf8'));	

var app = express();

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
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/:CC', function (req, res) {
	CC = req.params.CC;
	console.log("Country Code :" + CC);
    
	var words = JSON.parse(fs.readFileSync(__dirname + '/countries/' + CC + '.json', 'utf8'));	
    words.word_per += "&#32;" //add non-breaking space
    
	var lang_code = CountriesInfo.languages_CT[CC]; //language codes
	console.log("Language code: " + lang_code);
	
    //add property
    words.country_select = CountriesInfo.available_CT;
	
	res.render('home', words);
});

var HTTPport = 3080; 
var server = app.listen(HTTPport, function () {
    console.log('Listening on port ' + HTTPport);
    //server.close();
});