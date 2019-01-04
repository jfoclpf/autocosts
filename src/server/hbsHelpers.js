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
        //if a word has a size bigger than 4 char or it is the 1st word of the sentence, uppercase 1st letter of the word
        for (var i = 0; i< words.length;  i++){
            if (words[i].length > 4 || i === 0){
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); //uppercase of first letter of word
            }
        }

        title = words.join(' ');
        return title;
    },

    //get first sentence of string, with HTML tags stripped out
    getMetaDescription: function(){
        var string = this.words.initial_text;
        return string.split('.').splice(0, 3).join("."). //gets the first 3 sentences
            replace(/<(?:.|\n)*?>/gm, '');               //removes html tags such as <b></b>
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

    //gets the subtitle string in main.hbs: "postion 1 string" + [country select box] +  "postion 2 string"
    //from sub_title properties at src/countries/
    //"sub_title1a": "The average total costs in [country] is [yearly_costs] per year"
    //"sub_title1b": "representing [nbrMonths] months of average salary."
    //"sub_title2":  "Find the true cost of owning a car in your country!"    
    getSubTitleArr: function(position){
        if(!isDB(this)){
            return "";
        }

        var errMsg = "Error in handlebars function getSubTitleArr";

        var statsData = this.serverData.statsData[this.CC];        

        var sub_title1a = this.words.sub_title1a ? this.words.sub_title1a.trim() : "";
        var sub_title1b = this.words.sub_title1b ? this.words.sub_title1b.trim() : "";
        var sub_title2 = this.words.sub_title2 ? this.words.sub_title2.trim() : "";

        var addPeriodIfInexistent = function(str){
            if(str && str.slice(-1) !== "." && str.slice(-1) !== "!"){
                str += ".";
            }
            return str;
        };

        var checkSanityOfStr = function (str, parseStr){
            if(!str || !str.includes(parseStr)){
                console.error(errMsg + "; '" + parseStr + "' undefined or does not contain " + parseStr);
                return false;
            }
            return true;
        };

        if(!checkSanityOfStr(sub_title1a, "[country]")){ return ""; }

        if(!checkSanityOfStr(sub_title1a, "[yearly_costs]")){ return ""; }
        
        let totalCostsPerYear = statsData.costs_totalPerYear;
        if(!totalCostsPerYear || !isFinite(totalCostsPerYear) || parseInt(totalCostsPerYear) === 0){
            return "";
        }

        if(position === 1){
            //this should return: "The average total costs in"; see main.hbs
            return sub_title1a.split("[country]")[0].trim();
        }

        else if(position === 2){
            
            sub_title2 = addPeriodIfInexistent(sub_title2);

            //this tring shoud be: "is [yearly_costs] per year"
            let sub_title1a_part2 = sub_title1a.split("[country]")[1].trim();
            sub_title1a_part2 = sub_title1a_part2.replace("[yearly_costs]", getStatsData(this, "costs_totalPerYear", 0, true));

            let workingMonthsPerYearToAffordCar = statsData.financialEffort_workingMonthsPerYearToAffordCar;
            let useFinancialEffortInfo = statsData.financialEffort_calculated && workingMonthsPerYearToAffordCar &&
                typeof workingMonthsPerYearToAffordCar === "number" && parseInt(workingMonthsPerYearToAffordCar) !== 0;

            if(useFinancialEffortInfo && !checkSanityOfStr(sub_title1b, "[nbrMonths]")){
                return "";
            }

            if (!useFinancialEffortInfo){
                sub_title1a_part2 = addPeriodIfInexistent(sub_title1a_part2);

                //this returns "is [yearly_costs] per year. Find the true cost of owning a car in your country."
                return sub_title1a_part2 + " " + sub_title2;
            }
            else{
                //removes period if existent
                if(sub_title1a_part2.slice(-1) === "."){  //slice(-1) gets the last character
                    sub_title1a_part2 = sub_title1a_part2.slice(0, -1); //removes last character
                }
                sub_title1a_part2 += ", ";
                
                sub_title1b = sub_title1b.replace("[nbrMonths]", getStatsData(this, "financialEffort_workingMonthsPerYearToAffordCar", 1, true));
                sub_title1b = addPeriodIfInexistent(sub_title1b);
                
                //this returns "is [yearly_costs] per year, representing [nbrMonths] months of average salary.
                //Find the true cost of owning a car in your country."
                return sub_title1a_part2 + sub_title1b + " " + sub_title2;
            }
        }
        else{
            console.error(errMsg + "; Position parameter in getSubTitleArr must be 1 or 2");
            return "";
        }
    },

    //splits string  WORDS.in_months_possession, which in English is "in [nbrMonths] of possession"
    get_in_months_of_possession: function(position){
        var str = this.in_months_of_possession;
        return str.split("[nbrMonths]")[position-1];
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
        return _toFixed(num, n);
    },

    times12toFixed: function(num, n){
        return _toFixed(num*12, n);
    },

    createParagraphs: function(text){
        var parArr = paragraphBuilder.toArray(text, 180);
        var output = "";
        for (var i=0; i<parArr.length; i++){
            output += "<p>"+parArr[i]+"</p>";
        }
        return output;
    }
}

/*server side Handlebars function to tell whether the Statistical Database Information is activated*/
function isDB(_this){
    return _this.serverData.settings.switches.dataBase && _this.CC.toUpperCase() !== "XX";
}

function _toFixed(num, n){
    if(num && !isNaN(num)){
        return num.toFixed(n);
    }
    else{
        debug("Error: passed variable not defined");
        return "";
    }
}

//gets an entry from the statistical DB
function getStatsData(_this, entry, toFixed, isBold=false){
    
    if(isDB(_this)){
        
        var currencySymbol = _this.words.curr_symbol;
        
        let val = _this.serverData.statsData[_this.CC][entry];

        if(typeof toFixed !== "undefined" && typeof val === "number"){
            
            let finalValue;
            
            if(entry.startsWith("costs_")){//it's a cost, thus use currency symbol
                if (_this.words.invert_currency){
                    finalValue = val.toFixed(toFixed) + " " + currencySymbol;
                }
                else{
                    finalValue = currencySymbol + val.toFixed(toFixed);
                }            
            }
            else{
                finalValue = val.toFixed(toFixed);
            }
                                    
            return (isBold ? "<b>" : "") + finalValue + (isBold ? "</b>" : "");
        }
        else{
            return val;
        }
    }
    else{
        return "";
    }
}
