const url      = require(__dirname + '/url');
const commons  = require('../../commons');

module.exports = function(req, res, GlobData, WORDS) {

    var data = {};
        
    data.WORDS = JSON.parse(JSON.stringify(WORDS)); //clone object
    delete data.WORDS.XX;
  
    //create another object for double looping inside handlebars template
    data.WORDS2 = JSON.parse(JSON.stringify(WORDS)); //clone object
    delete data.WORDS2.XX;  

    //function that gets an Object associating a language with a country/domain
    var twoLetterLang = getUniqueLangObj(GlobData);    
    data.twoLetterLang = twoLetterLang;
    
    data.HTTP_Protocol = url.getProtocol(req, GlobData.Settings.IS_HTTPS);
    
    data.layout = false;
    
    res.header('Content-Type', 'application/xml; charset=utf-8');
  
    var fileToRender = GlobData.Dirs.INDEX_DIR + "views/sitemap.hbs";
    res.render(fileToRender, data);
    
}


//function that gets an Object associating a language with a country/domain
function getUniqueLangObj(GlobData){

    var languages_CT = JSON.parse(JSON.stringify(GlobData.languages_CT)); //clone object
    delete languages_CT.XX;
    
    //gets an array of unique, Languages => [en, en-ES, es, pt-BR, pt-PT, it, etc.]
    var uniqueLangsTemp = commons.getUniqueArray(languages_CT); //get unique Array from Object
    
    //gets just the 2 letters of language code, i.e. the 2 first letters
    //therefore gest a unique array, of non-specific-country, Languages 
    //=> [en, es, pt, it, hu, etc.]
    var i;
    for (i=0; i<uniqueLangsTemp.length; i++){
        if(uniqueLangsTemp[i].length > 2){
            uniqueLangsTemp[i] = uniqueLangsTemp[i].substr(0, 2);
        }
    }    
    var uniqueLangs = commons.getUniqueArray(uniqueLangsTemp); //removes duplicates    
    
    //creates Object associating a Language to a single Country and domain
    var twoLetterLang = {};
    for (i=0; i<uniqueLangs.length; i++){
        var langCode = uniqueLangs[i];
        //because there are many countries whose language is English
        //it choses UK as default country for English
        if (langCode=="en"){
            twoLetterLang.UK = {};
            twoLetterLang.UK.langCode = langCode;
            twoLetterLang.UK.domain = GlobData.domains_CT.UK;
        }
        else{
            var CC = commons.getKeyByValue(languages_CT, langCode);
            if (CC){
                twoLetterLang[CC] = {};
                twoLetterLang[CC].langCode = langCode;
                twoLetterLang[CC].domain = GlobData.domains_CT[CC];     
            }
        }
    }
        
    return twoLetterLang;
}