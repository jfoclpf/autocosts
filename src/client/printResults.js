/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with functions that are used to print the final result*/

//function that is run when user clicks "run/calculate"
function Run2(callback){

    //test if the form user inputs are correct
    if (!isReadyToCalc()){ 
        return false;
    }    
    
    //for each form part gets object with content
    var f1 = get_form_part1();
    var f2 = get_form_part2();
    var f3 = get_form_part3();

    //country object with country specific variables
    var country = {
        currency: WORDS.curr_code,
        distance_std: WORDS.distance_std_option,
        fuel_efficiency_std: WORDS.fuel_efficiency_std_option,
        fuel_price_volume_std: WORDS.fuel_price_volume_std,
        taxi_price: WORDS.taxi_price_per_dist
    };

    //calculate costs
    var data = calculate_costs(f1, f2, f3, country);
    CALCULATED.data = data; //assigns to global variable

    printResults(f1, f2, f3, data);

    //shows social media buttons
    if(SWITCHES.social){
        $("#shareIcons").jsSocials({
            url: PAGE_URL,
            text: INITIAL_TEX,
            showLabel: false,
            showCount: false,
            shares: ["whatsapp", "facebook", "twitter", "googleplus"]
        });
    }
        
    $("*").promise().done(function(){    
        
        //global variable indicating the results are being shown
        DISPLAY.result.isShowing = true;        
        
        //calls the callback() if it's a function
        if (typeof callback === 'function'){
            callback();
        }
    });

    return true;
}

function printResults(f1, f2, f3, data){

    $("#form").hide();
    
    
    
    $("#results").show();
    
    
}



//puts the currency symbol after the money value, for certain countries
function currencyShow(value){

    if (typeof WORDS.invert_currency !== 'undefined' && 
            (WORDS.invert_currency == "true" || WORDS.invert_currency === true || WORDS.invert_currency=="1"))
    {
        return (value + "&nbsp;" + WORDS.curr_symbol);
    }
    else{
        return (WORDS.curr_symbol + "&nbsp;" + value);
    }
}

