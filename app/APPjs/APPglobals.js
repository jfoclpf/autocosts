
//GLOBAL switches
var SWITCHES = {
    uber:        false, //Uber
    social:      false, //Social media pulgins
    g_charts:    false, //Google Charts
    g_captcha:   false, //Google Captcha
    g_analytics: false, //Google Analytics
    data_base:   false, //Inserts user input data into DataBase
    print:       false, //Print option
    pdf:         false  //Download PDF report option
};

//Language code according to ISO_639-1 codes
var DefaultCountry = 'UK';
var LANGUAGE = 'en';
var COUNTRY = DefaultCountry; //assumes US as default
var CountryLangObj; //Javascript variable whose name is Country (Country here is a string). From file js/languages.js
var SCREEN_WIDTH;
var WAS_INIT = false;

var DOMAIN_LIST = {};
var UBER_API = {};

var CalculatedData;

//Global Object regarding the display of information
var DISPLAY = {
    centralFrameWidth,  //width of central frame #div2
    descriptionHTML,
    result: {
        isShowing          : false,  //tells whether the result with result tables is being shown
        fin_effort         : false,
        public_transports  : false,
        uber               : false,
        ext_costs          : false
    },
    charts: {
        WIDTH_PX_OFF: 280,   //client width in px under which the charts are not shown
        MIN_RATIO: 0.7,      //minimum ratio width of charts as frame_witdh becomes too wide
        MIN_RATIO_WIDTH: 750 //width on which the ratio is MIN_RATIO and above which the ration is fixed on MIN_RATIO
    },
    RunButtonStr: 'Run'
};

var SERVICE_AVAILABILITY = {
    g_charts      : false,   //variable that says whether Google Charts JS files are available
    g_captcha     : false,   //variable that says whether Google Captcha JS files are available
    g_analytics   : false    //variable that says whether Google Analytics JS files are available
};

