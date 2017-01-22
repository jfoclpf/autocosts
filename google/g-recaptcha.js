function grecaptcha_solved(){
    Run_form(Country);
}
//runs when grecaptcha has expired
function grecaptcha_expired(){
    grecaptcha.reset();
    ShowGoogleReCaptcha(true);
}

function grecaptcha_callback() {                    
    grecaptcha.render( 'g-recaptcha', {
        'sitekey' : '6LcdhB4TAAAAAKDAZ_BL4JGK0h0bK6eH3YgTdyIV',
        'size' : 'normal',
        'callback' : grecaptcha_solved,
        'expired-callback' : grecaptcha_expired 
    });     
} 

//creates the grecaptcha after the API Google function was loaded
//runs when grecaptcha was solved
function Run_form(country){
    if(!isUserHuman){
        //make a POST command to server to check if the user is human
        $.ajax({
            type: "POST",
            url: "google/captcha_validate.php",
            data: "&g-recaptcha-response=" + grecaptcha.getResponse()
        }).done(function(result){
            if(result=="ok"){
                if(Run() && country != "XX"){
                    //if not a test triggers event for Google Analytics
                    if(!IsThisAtest()){
                        ga('send', 'event', 'form_part', 'run_OK');
                    }
                    //submits data to database if no XX version
                    submit_data(country); 
                } 
                scrollPage();
                ShowGoogleReCaptcha(false);
                //alert(result);
            }
            else{
                //alert(result);
            }
        });
    }
    else{
        if(Run() && country != "XX"){
            submit_data(country); //submits data to database if no test version
        }
        scrollPage();
    }                
}