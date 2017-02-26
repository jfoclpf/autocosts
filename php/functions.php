<?php

//function that informs if a country is in the list of available countries
function is_cty_inlist($cc, $c_array){ //cc=country code
	if ($cc == null) {
		return false;
	}
	foreach ($c_array as $key => $value) {
		if ($key == $cc) {
			return true;
		}
	}
	return false;
}

//function that cleans the string of HTML tags a gets only the first sentence of $string
function meta_description($string){

    //Strip out HTML tags, leave only alphanumeric characters and space:
    $string = strip_tags($string);
    
    //gets first sentence
    $string = strtok($string, '.'); 
    
    return $string;
}

//function that adpats the title for lower case 
//having only uppercase on the firt letters of the words bigger than 4 characters
function adapt_title($title){ 
    
    //lower case all string
    $title = strtolower($title);

    //get an array of words stripped by space
    $words = explode(" ", $title);

    //if a word has a size bigger than 4, uppercase first letter
    $length = count($words);
    for ($i = 0; $i< $length;  $i++){
        if (strlen($words[$i])>4){
            $words[$i] = ucfirst($words[$i]);
        }
    }
    
    $title = join(' ', $words);
    
    return $title;
}

//function that gets a string of main/key words from title
//Ex: "calculadora dos custos do automóvel" returns "calculadora, custos, automóvel"
function get_keywords($title, $str1, $str2){
    
    //lower case all strings
    $title = strtolower($title);
    $str1 = strtolower($str1);
    $str2 = strtolower($str2);

    //get an array of words stripped by space
    $words = explode(" ", $title);

    //if a word has a size bigger than 3, adds to keywords
    $keywords = []; 
    foreach($words as $word){
        if (strlen($word)>3){
            array_push($keywords, $word);
        }
    }  
    
    array_push($keywords, $str1);
    array_push($keywords, $str2);
    
    $keywords_string = $title = join(', ', $keywords);
 
    return $keywords_string;
}

function HTML_tag_lang($lang, $cty){
    
    //gets just the 2 first characters
    $lang=mb_substr($lang, 0, 2);
    
    $cty = strtoupper($cty);
    
    if ($cty=="UK"){
        $cty="GB";
    }
    return $lang . '-' . $cty;
}

function crawlByBot($AC_DOMAIN){
//$DomainInFile gets "autocustos.pt" or "autocosts.info/au"
    
    $domain_client = strtolower($_SERVER['HTTP_HOST']);
    
    //if test .work version do not crawl
    if(explode('.',$domain_client)[1]=="work"){
        return false;
    }
    
    $domain_infile = explode("/", strtolower($AC_DOMAIN));
    
    //if the domain in file has /CC, ex: in AU.php there is "autocosts.info/au"
    if ($domain_infile[1] && $domain_infile[1]!=""){
        if ($domain_infile[0] == $domain_client &&
            $domain_infile[1] == strtolower($GLOBALS['country'])){
            return true;
        }
        else{
            return false;
        }
        
    }
    //if the domain in file has no /CC, ex: in PT.php there is "autocustos.pt"
    else{      
        if ($domain_infile[0] == $domain_client){
            return true;
        }
        else{
            return false;
        }       
    }
}

?>
