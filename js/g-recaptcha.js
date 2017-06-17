function grecaptcha_solved(){
    Run1(Country);
}

function grecaptcha_callback() {

    if (!isHumanConfirmed && Country!='XX' && CAPTCHA_SWITCH){    
        grecaptcha.render( 'run_button', {
            'sitekey' : '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
            'callback' : grecaptcha_solved
        });
    }
}

//creates the grecaptcha after the API Google function was loaded
//runs when grecaptcha was solved
function Run1(country){
    //Loader after the run button is clicked
    runButtonLoader();
    
    //In test version doesn't run Captcha
    //Only when Google Captcha files are available
    if(!isHumanConfirmed && country!='XX' && IsGoogleCaptcha && CAPTCHA_SWITCH){
        //make a POST command to server to check if the user is human
        $.ajax({
            type: "POST",
            url: "google/captcha_validate.php",
            data: "&g-recaptcha-response=" + grecaptcha.getResponse()
        }).done(function(result){
            //alert(result);
            if(result=="ok"){
                if(Run2() && country != "XX"){
                    //if not a test triggers event for Google Analytics
                    if(!IsThisAtest() && IsGoogleAnalytics && ANALYTICS_SWITCH){
                        ga('send', 'event', 'form_part', 'run_OK');
                    }
                    //submits data to database if no XX version
                    if(DB_SWITCH){
                        submit_data(country);
                    }                    
                }
                //Google Recaptcha
                isHumanConfirmed = true;
                
                $('#run_button').hide();
                $('#run_button_noCapctha').show();               
                resetRunButtons(); //reset the run buttons                              
                
                scrollPage();
            }
            else if(result=="not-ok-3"){ //when the Google file was not accessible
                if(Run2() && country != "XX" && DB_SWITCH){
                    submit_data(country); //submits data to database if no test version
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
        if(Run2() && country != "XX" && DB_SWITCH){
            submit_data(country); //submits data to database if no test version
        }   
        resetRunButtons(); //reset the run buttons
        scrollPage();
    }                
}