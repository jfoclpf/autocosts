function grecaptcha_solved(){
    Run1(Country);
}

function grecaptcha_callback() {

    if (!isHumanConfirmed && Country!='XX'){    
        grecaptcha.render( 'run_button', {
            'sitekey' : '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
            'callback' : grecaptcha_solved
        });
    }
}

//creates the grecaptcha after the API Google function was loaded
//runs when grecaptcha was solved
function Run1(country){
    if(!isHumanConfirmed && Country!='XX'){
        //make a POST command to server to check if the user is human
        $.ajax({
            type: "POST",
            url: "google/captcha_validate.php",
            data: "&g-recaptcha-response=" + grecaptcha.getResponse()
        }).done(function(result){
            if(result=="ok"){
                if(Run2() && country != "XX"){
                    //if not a test triggers event for Google Analytics
                    if(!IsThisAtest()){
                        ga('send', 'event', 'form_part', 'run_OK');
                    }
                    //submits data to database if no XX version
                    submit_data(country); 
                } 
                scrollPage();
                //Google Recaptcha
                isHumanConfirmed = true;
                $('#run_button').hide();
                $('#run_button_noCapctha').show();
                //alert(result);
            }
            else{
                //alert(result);
            }
        });
    }
    else{
        if(Run2() && country != "XX"){
            submit_data(country); //submits data to database if no test version
        }
        scrollPage();
    }                
}