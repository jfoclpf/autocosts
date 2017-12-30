/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

var Country;

const $ = require('jquery');
const fs = require('fs');
const express = require('express');
const exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));

//CC stands for 2-letter Country Code
app.get('/:CC', function (req, res) {
	var CC = req.params.CC;
	
	var list = JSON.parse(fs.readFileSync(__dirname + '/countries/list.json', 'utf8'));	
	var words = JSON.parse(fs.readFileSync(__dirname + '/countries/' + CC + '.json', 'utf8'));
	
	var lang_code = list.languages_CT[CC];
	console.log(lang_code);
	
	var data = {"title" : words.main_title , "main_title" : words.main_title, "initial_text": words.initial_text}
	
	res.render('home', data)
})


var HTTPport = 3020; 
app.listen(HTTPport, function () {
  console.log('Listening on port ' + HTTPport);
});