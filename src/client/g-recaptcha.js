//Returns boolean whether to use or not Google Captcha
function useGreCapctha(){    
    return !IS_HUMAN_CONFIRMED &&          //Do not use if human is already confirmed
        COUNTRY!='XX' &&                   //Do not use if is test version
        SERVICE_AVAILABILITY.g_captcha &&  //Do not use when service is not availble, i.e., when files were not loaded
        SWITCHES.g_captcha &&              //Do not use when flag from server is not triggered
        NOT_LOCALHOST;                     //Do not use when run for localhost
}

//The call of this function is defined in an URL declared in JS_FILES.Google.recaptchaAPI (see Globals.js)
//this function is called when the Google Captcha JS file is loaded and ready to be used
function grecaptcha_callback() {
    SERVICE_AVAILABILITY.g_captcha = true;
    console.log("grecaptcha is ready!");

    if (useGreCapctha()){
        runButton.set("show-g-recaptcha");

        grecaptcha.render( 'calculate_costs_btn_g_captcha',  //#id of the run button
            {
                'sitekey' : '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
                'callback' : grecaptcha_solved
            }
        );
    }
    else{
        runButton.set("show-normal");
    }
}

function grecaptcha_solved(){
    console.log("grecaptcha_solved()");
    Run1("g-recaptcha");
}

//creates the grecaptcha after the API Google function was loaded
//runs when grecaptcha was solved
function Run1(source){
    
    //if human is already confirmed by previous Google Captcha, doesn't request Google Captcha API again
    //In XX version or localhost doesn't use google captcha
    if(source === "g-recaptcha"){
        
        if(!runButton.isCaptcha()){
            throw 'Called Run1() from source "g-recaptcha" and run button does not comply';
        }
        
        runButton.set("loading-g-recaptcha");
        
        //make a POST command to server to check if the user is human
        $.ajax({
            type: "POST",
            url: "captchaValidate",
            data: "&g-recaptcha-response=" + grecaptcha.getResponse()
        }).
        done(function(result){
            console.log("recaptcha-result: ", result);

            if(result == "ok"){
                //Google Recaptcha
                IS_HUMAN_CONFIRMED = true;                

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
            }

            //when the Google file was not accessible
            else {                
                Run2();                
            }

            runButton.set("show-normal");
        });
    }
    else if(source === "normal"){
        
        if(!runButton.isNormal()){
            throw 'Called Run1() from source "normal" and run button does not comply';
        }        
        
        //here normally a human is already confirmed, for example when the same user runs the calculator twice
        if(Run2() && COUNTRY != "XX" && SWITCHES.data_base && NOT_LOCALHOST){
            submit_data(); //submits data to database if no test version nor localhost
        }
        runButton.set("show-normal");
    }
    else{
        console.error("Bad paramter source on Run1(source)");
    }
}

//Class relating to Run Button, alternating between Normal button and Google Recaptcha button
//see buttons html elements on file form.hbs, last lines
var runButton = {
    
    btnNormal: $("#calculate_costs_btn"),
    btnCaptcha: $("#calculate_costs_btn_g_captcha"),
    
    set: function(flag){
        switch(flag){
            case "show-g-recaptcha":
                this.btnCaptcha.show().attr("disabled", false);
                this.btnNormal.hide().attr("disabled", true);
                break;
            case "show-normal":
                this.btnNormal.show().attr("disabled", false);
                this.btnCaptcha.hide().attr("disabled", true);
                break;
            case "loading-g-recaptcha":
                if(this.isCaptcha()){
                    this.btnCaptcha.hide();
                }
                else{
                    throw 'Run Button set to "loading-g-recaptcha" but g-recaptcha is not active';
                }
                break;
            default:
                throw "Bad paramter flag on runButton.set(flag)";
        }
    },
    
    getButton: function(){
        this.checkSanity(); 
        
        if(this.btnNormal.is(":enabled") && this.btnNormal.is(":visible")){
            return "normal";
        }
        if(this.btnCaptcha.is(":enabled") && this.btnCaptcha.is(":visible")){
            return "g-recaptcha";
        }
        
        return "none"; //neither button is both enabled and visible; they may be both invisible
    },
    
    isNormal: function(){
        return this.checkSanity() && this.btnNormal.is(":enabled");
    },
    
    isCaptcha: function(){
        return this.checkSanity() && this.btnCaptcha.is(":enabled");
    },
    
    checkSanity: function(){
        var errMsg = "runButton sanity between btnNormal and btnCaptcha"; 
        if(this.btnNormal.is(":enabled") && this.btnCaptcha.is(":enabled")){
            throw errMsg;
        }
        if(this.btnNormal.is(":disabled") && this.btnCaptcha.is(":disabled")){
            throw errMsg;
        }
        if(this.btnNormal.is(":visible") && this.btnCaptcha.is(":visible")){
            throw errMsg;
        }        
        return true;
    }
}

//initiates Run Button as normal
runButton.set("show-normal"); 


