function grecaptcha_solved(){
    console.log("grecaptcha_solved()");
    Run1();
}

function grecaptcha_callback() {

    if (!IS_HUMAN_CONFIRMED && COUNTRY!='XX' && SWITCHES.g_captcha){
        grecaptcha.render( 'run_button', {
            'sitekey' : '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
            'callback' : grecaptcha_solved
        });
    }
}

//creates the grecaptcha after the API Google function was loaded
//runs when grecaptcha was solved
Run1 = function Run1(){
    //Loader after the run button is clicked    
    runButtonLoader();
        
    //if human is already confirmed by previous Google Captcha, doesn't request Google Captcha API again
    //In XX version or localhost doesn't use google captcha    
    if(!IS_HUMAN_CONFIRMED && COUNTRY!='XX' && SERVICE_AVAILABILITY.g_captcha && SWITCHES.g_captcha && NOT_LOCALHOST){
        //make a POST command to server to check if the user is human
        $.ajax({
            type: "POST",
            url: "captchaValidate",
            data: "&g-recaptcha-response=" + grecaptcha.getResponse()
        }).done(function(result){
            console.log("recaptcha-result: ", result);
            if(result=="ok"){
                if(Run2() && COUNTRY != "XX"){
                    //if not a test triggers event for Google Analytics
                    if(!IsThisAtest() && SERVICE_AVAILABILITY.g_analytics && SWITCHES.g_analytics){
                        ga('send', 'event', 'form_part', 'run_OK');
                    }
                    //submits data to database if no XX version
                    if(SWITCHES.data_base){
                        submit_data(COUNTRY);
                    }
                }
                //Google Recaptcha
                IS_HUMAN_CONFIRMED = true;

                $('#run_button').hide();
                $('#run_button_noCapctha').show();
                resetRunButtons(); //reset the run buttons

                scrollPage();
            }
            else if(result=="not-ok-3"){ //when the Google file was not accessible
                if(Run2() && COUNTRY != "XX" && SWITCHES.data_base){
                    submit_data(COUNTRY); //submits data to database if no test version
                }
                resetRunButtons(); //reset the run buttons
                scrollPage();
            }
            else{
                //reset the run buttons
                resetRunButtons();
            }
        });
    }
    else{
        //here normally human is already confirmed, for example when the same user runs the calculator twice
        if(Run2() && COUNTRY != "XX" && SWITCHES.data_base && NOT_LOCALHOST){
            submit_data(); //submits data to database if no test version nor localhost
        }
        resetRunButtons(); //reset the run buttons
        scrollPage();
    }
}