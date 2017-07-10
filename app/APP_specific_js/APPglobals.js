
//GLOBAL switches
var UBER_SWITCH = false; //Uber
var SOCIAL_SWITCH = false; // Social media pulgins
var CHARTS_SWITCH = false; //Google Charts
var CAPTCHA_SWITCH = false; //Google Captcha
var ANALYTICS_SWITCH = false; //Google Analytics
var DB_SWITCH = false; //Inserts user input data into DataBase
var PRINT_SWITCH = false; //Print option
var PDF_SWITCH = false; //Download PDF report option

//Language code according to ISO_639-1 codes
var DefaultCountry = 'UK';
var Language = 'en';
var Country = DefaultCountry; //assumes US as default
var CountryLangObj = window[Country]; //Javascript variable whose name is Country (Country here is a string). From file js/languages.js
var wasLoaded = [false, false];

var Domain_list = {};
var frame_witdh, public_transp_bool, fin_effort_bool, extern_costs_bool;
var ResultIsShowing, DescriptionHTML, CalculatedData;
var RunButtonStr = 'Run';        
var IsGoogleCharts = false; //variable that says whether Google Charts JS files are available
var IsGoogleCaptcha = false; //variable that says whether Google Captcha JS files are available  
var IsGoogleAnalytics = false; //variable that says whether Google Analytics JS files are available 
var uber_obj={};