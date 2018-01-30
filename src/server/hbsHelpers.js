/*Handlebars Helper Functions*/

module.exports = {

    /*using for selecting value in HTML select boxes*/
    isSelected: function (CC, value) {            
        return CC === value ? ' ' + 'selected' : ''; 
    },
    /*chose the HTML costs table for specific country*/
    costs_table: function (CC){
        return CC;
    },
    banner_flag: function (CC){
        return CC.toLowerCase() + ' ' + 'flag';
    },
    //function that adpats the title for lower case 
    //having only uppercase on the firt letters of the words bigger than 4 characters
    adapt_title: function(Title){ 

        //lower case all string
        var title = Title.toLowerCase();
        //get an array of words stripped by space
        var words = title.split(" ");
        //if a word has a size bigger than 4, uppercase first letter            
        for (var i = 0; i< words.length;  i++){
            if (words[i].length > 4){
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); //uppercase of first letter of word
            }
        }

        var title = words.join(' ');
        return title;
    },        
    //get first sentence of string, with HTML tags stripped out
    meta_description: function(string){            
        return (string.split('.')[0]).replace(/<(?:.|\n)*?>/gm, '');
    },
    //function that gets a string of main/key words from title
    //Ex: "calculadora dos custos do automóvel" returns "calculadora, custos, automóvel"
    get_keywords: function(title, str1, str2){

        //lower case all strings
        var title = title.toLowerCase();
        var str1 = str1.toLowerCase();
        var str2 = str2.toLowerCase();

        //get an array of words stripped by space
        var words = title.split(" ");

        //if a word has a size bigger than 3, adds to keywords
        var keywords = []; var word;
        for(var i=0; i<words.length; i++){
            word = words[i];
            if (word.length >3 ){
                keywords.push(word);
            }
        }

        keywords.push(str1);
        keywords.push(str2);

        var keywords_string = keywords.join(',');

        return keywords_string;
    },      
    json: function(context) {
        return JSON.stringify(context);
    },
    jsonEscap: function(obj){
        //adds backslash before special characters, i.e. escapes strings
        return JSON.stringify(obj).replace(/[\/\(\)\']/g, "\\$&");
    },
    escapeStr: function(str){
        return str.replace(/[\/\(\)\']/g, "\\$&");
    },
    getFuelEfficiencyOptStr: function(optN){
        switch(optN){
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
    getDistanceOptStr: function(optN){
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
    getFuelPriceVolumeOptStr: function(optN){
        switch(optN){
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
    get2letterLangCode(langCode){
        return langCode.substr(0, 2);
    }
}

