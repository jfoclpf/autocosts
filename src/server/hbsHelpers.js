/*Handlebars Helper Functions*/
const paragraphBuilder = require("paragraph-builder");
const debug = require('debug')('app:helpers');

module.exports = {

    /*using for selecting value in HTML select boxes*/
    isSelected: function (CC, value) {            
        return CC === value ? ' ' + 'selected' : ''; 
    },
    
    /*negation*/
    negate: function(boolVar) {
        return !boolVar;
    },
    
    /*chose the HTML costs table for specific country*/
    costsTable: function (CC){
        return CC;
    },
    
    bannerFlag: function (CC){
        return CC.toLowerCase() + ' ' + 'flag';
    },
    
    //function that adpats the title for lower case 
    //having only uppercase on the firt letters of the words bigger than 4 characters
    getAdaptedTitle: function(){ 

        //lower case all string
        var title = this.words.web_page_title.toLowerCase();
        //get an array of words stripped by space
        var words = title.split(" ");
        //if a word has a size bigger than 4, uppercase first letter            
        for (var i = 0; i< words.length;  i++){
            if (words[i].length > 4){
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); //uppercase of first letter of word
            }
        }

        title = words.join(' ');
        return title;
    },  
    
    //get first sentence of string, with HTML tags stripped out
    getMetaDescription: function(){
        var string = this.words.initial_text;
        return (string.split('.')[0]).replace(/<(?:.|\n)*?>/gm, '');
    },
    
    //function that gets a string of main/key words from title
    //Ex: "calculadora dos custos do automóvel" returns "calculadora, custos, automóvel"
    getKeywords: function(){
        
        //lower case all strings
        var localTitle = this.words.web_page_title.toLowerCase();
        var localStr1  = this.words.fixed_costs.toLowerCase();
        var localStr2  = this.words.running_costs.toLowerCase();

        //get an array of words stripped by space
        var words = localTitle.split(" ");

        //if a word has a size bigger than 3, adds to keywords
        var keywords = []; var word;
        for(var i=0; i<words.length; i++){
            word = words[i];
            if (word.length >3 ){
                keywords.push(word);
            }
        }

        keywords.push(localStr1);
        keywords.push(localStr2);

        var keywords_string = keywords.join(',');

        return keywords_string;
    },    
    
    //This string, field "subTitle", from language files comes in the form of:
    //"The average total costs in [country] is [yearly_costs] per year, representing [financial_effort] months of average salary. Find the true cost of owning a car in your country."
    //Divides in mini strings and returns the correspondent chunk of string
    getSubTitleArr: function(position){
        var subTitle = this.words.sub_title;
        var strtemp = subTitle.replace("[country]", "###").replace("[yearly_costs]", "###").replace("[nbrMonths]", "###");
        return strtemp.split("###")[position-1];
    },
    
    json: function(context) {
        return JSON.stringify(context);
    },
    
    jsonObj: function(obj){        
        return encodeURI(JSON.stringify(obj?obj:{}));
    },
    
    striOutHTML: function(str){
        return str.replace(/<(?:.|\n)*?>/gm, '');
    },
    
    //return, for example, "pt_PT" or "en_US"
    getLocale: function(){
        return this.clientData.languageCode.substring(0, 2) + "_" + this.CC;
    },
    
    getFuelEfficiencyOptStr: function(){
        switch(this.fuel_efficiency_std_option){
            case 1:
                return "l/100km";            
            case 2:
                return "km/l";            
            case 3:
                return "mpg(imp)";
            case 4:
                return "mpg(US)";           
            case 5:
                return "l/mil";
            case 6:
                return "km/gal(US)";
            default: 
                return "error";
        }
    },
    
    getDistanceOptStr: function(){
        switch(optN){
            case 1:
                return "kilometres";            
            case 2:
                return "miles";            
            case 3:
                return "mil";
            default: 
                return "error";
        }
    },
    
    getDistanceOptStrShort: function(){
                        
        switch(this.distance_std_option){
            case 1:
                return "km";            
            case 2:
                return "mi";            
            case 3:
                return "Mil";
            default: 
                return "error";
        }
    },    
    
    getFuelPriceVolumeOptStr: function(){
        switch(this.fuel_price_volume_std){
            case 1:
                return "litres";            
            case 2:
                return "imperial gallons";            
            case 3:
                return "US gallons";
            default: 
                return "error";
        }
    },
    
    get2letterLangCode: function(){
        return this.clientData.languageCode.substr(0, 2);
    },
    
    //convert number to string with n decimal values
    toFixed: function(num, n){
        return num.toFixed(n);
    },
    
    createParagraphs: function(text){
        var parArr = paragraphBuilder.toArray(text, 180);
        var output = "";
        for (var i=0; i<parArr.length; i++){
            output += "<p>"+parArr[i]+"</p>";
        }
        return output;
    },
    
    //gets an entry from the statistical DB
    getStatsData(entry, toFixed){
        if(isDB(this)){
            let val = this.serverData.statsData[this.CC][entry];   
            
            if(typeof toFixed !== "undefined" && typeof val === "number"){
                return val.toFixed(toFixed);
            }
            else{
                return val;
            }
        }
        else{
            return "";
        }
    }
}

/*server side Handlebars function to tell whether the Statistical Database Information is activated*/
function isDB(_this){
    return _this.serverData.settings.switches.dataBase && _this.CC.toUpperCase() !== "XX";
}
