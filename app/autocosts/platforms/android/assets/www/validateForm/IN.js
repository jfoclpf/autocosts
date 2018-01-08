/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){
    
    var f = document.custo; //form

    /*insurance*/
    var tipo_seguro_auto=getCheckedValue(f.tipo_seguro);

    if(!isNumber(f.seguro_val.value)){
              
        $.jAlert({ 
            'title': "गाड़ी का बीमा और व्यवधान रक्षा",
            'content': "अवैध बीमा राशि!"
        });
        return false;
    }

    if(tipo_seguro_auto == ""){

        $.jAlert({
            'title': "गाड़ी का बीमा और व्यवधान रक्षा",
            'content': "बीमा की आवधिकता डालें!"
        });        
        return false;
    }
    
    /*depreciation*/
    var auto_mes=f.auto_mes.value; /*car acquisition month*/
    var auto_ano=f.auto_ano.value; /*car acquisition year*/

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        $.jAlert({
            'title': "वाहन का मूल्य-ह्रास",
            'content': "गाड़ी खरीदने के महीने के लिए अवैध उत्तर!"
        });
        return false;
    }
    if(!isNumber(f.auto_ano.value) || !isInteger(f.auto_ano.value)){
        $.jAlert({
            'title': "वाहन का मूल्य-ह्रास",
            'content': "गाड़ी खरीदने के साल के लिए अवैध उत्तर!"
        });        
        return false;
    }
    if(!isNumber(f.auto_val_inicial.value)){
        $.jAlert({
            'title': "वाहन का मूल्य-ह्रास",
            'content': "गाड़ी खरीदने कि क़ीमत के लिए अवैध रकम!"
        });         
        return false;
    }
    if(!isNumber(f.auto_val_final.value)){
        $.jAlert({
            'title': "वाहन का मूल्य-ह्रास",
            'content': "गाड़ी कि आज कि क़ीमत के लिए अवैध रकम!"
        });        
        return false;
    }

    var today = new Date();
    var date_auto= new Date(f.auto_ano.value,f.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        $.jAlert({
            'title': "वाहन का मूल्य-ह्रास",
            'content': "गाड़ी खरीदने कि तारीख के लिए अवैध उत्तर!"
        });         
        return false;
    }
    
    /*car finance*/
    var cred_auto_s_n=getCheckedValue(f.cred_auto);

    if(cred_auto_s_n == ""){
        $.jAlert({
            'title': "गाड़ी के लिए क़र्ज़",
            'content': "कृपया जाँच ले के आपने गाड़ी खरीदने के लिए वाहन कर्ज़ लिया था या नही!"
        });                 
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(f.cred_auto_montante.value)) {
            $.jAlert({
                'title': "गाड़ी के लिए क़र्ज़",
                'content': "वाहन कर्ज़ के लिए अवैध उत्तर!"
            });                        
            return false;
        }
        if(!isNumber(f.cred_auto_period.value)) {
            $.jAlert({
                'title': "गाड़ी के लिए क़र्ज़",
                'content': "क्रेडिट कि अवधि, किश्तों की संख्या के लिए अवैध उत्तर!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_val_mes.value)) {
            $.jAlert({
                'title': "गाड़ी के लिए क़र्ज़",
                'content': "किस्त राशि के लिए अवैध उत्तर!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_valresidual.value)) {
            $.jAlert({
                'title': "गाड़ी के लिए क़र्ज़",
                'content': "अमान्य अवशेष मूल्य!"
            });             
            return false;
        }
    }


    /*inspection*/
    var nmr_times_inspec=f.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        $.jAlert({
            'title': "गाड़ी का मुआइना (MOT test)",
            'content': "अमान्य संख्या!"
        });
        return false;
    }

    if(!isNumber(f.preco_inspecao.value) && nmr_times_inspec!=0) {
        $.jAlert({
            'title': "गाड़ी का मुआइना (MOT test)",
            'content': "अवैध मुआइना का खर्च!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(f.IUC.value)) {
        $.jAlert({
            'title': "उत्पाद शुल्क/ एक्साइस् ड्यूटी (कार कर)",
            'content': "अवैध राशि!"
        });
        return false;
    }

    return true;
}



/* *** CHECK FORM PART 2 ***** */
/*check if data from form 2 (running costs) is correctly filled*/
function is_userdata_formpart2_ok(){
    
    var f = document.custo; //form

    /*fuel*/
    var tipo_calc_combustiveis=getCheckedValue(f.calc_combustiveis);

    if(tipo_calc_combustiveis == ""){
        $.jAlert({
            'title': "ईंधन",
            'content': "कृपया जाँच ले के आप रुपए या किलोमीटर पर आधारित हिसाब करना चाहेंगे!"
        });        
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': "ईंधन",
                'content': "अवैध ईंधन कार्यक्षमता राशि!"
            });            
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': "ईंधन",
                'content': "अवैध ईंधन मूल्य!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "ईंधन",
                'content': "कृपया बताएं कि क्या आप अपनी गाड़ी को कार्यस्थल पर ले जाते हैं!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': "ईंधन",
                    'content': "किलोमीटर प्रति महीना के लिए अवैध उत्तर!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "ईंधन",
                    'content': "दिन प्रति सप्ताह के लिए अवैध संख्या!"
                });                
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "ईंधन",
                    'content': "घर और कार्यस्थल के बीच कि दूरी के लिए अवैध किलोमीटर!"
                });                 
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': "ईंधन",
                    'content': "जिन दिनों के दौरान आप अपनी कार को कार्यस्थल पर नहीं ले जाते हैं, उस दिन के फ़सलों के लिए अवैध संख्या!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': "ईंधन",
                'content': "रुपए प्रति माह के लिए अवैध रकम!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': "देखभाल",
            'content': "अवैध राशि!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': "मरम्मत और सुधार ",
            'content': "अवैध राशि!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': "पार्किंग",
            'content': "अवैध राशि!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tipo_calc_portagens=getCheckedValue(f.portagens_ao_dia);

    /*if tolls costs are calculated on a daily basis*/
    if(tipo_calc_portagens=="false") {/*monthly basis*/
        if(!isNumber(f.portagens.value)) {
            $.jAlert({
                'title': "टॉल",
                'content': "अवैध राशि!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.preco_portagens_por_dia.value)) {
            $.jAlert({
                'title': "टॉल",
                'content': "टॉल पर रोज़ का खर्च - अवैध राशि!"
            });            
            return false;
        }
        var toll_days_pmonth=f.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "टॉल",
                'content': "दिन - अवैध राशि!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(f.multas.value)){
        $.jAlert({
            'title': "ट्रैफिक से संबंधित जुर्माने",
            'content': "अवैध राशि!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(f.lavagens.value)){
        $.jAlert({
            'title': "धुलाई और सफाई",
            'content': "अवैध राशि!"
        });        
        return false;
    }
    
    return true;
}



/* *** CHECK FORM PART 3 ***** */
function is_userdata_formpart3_ok(){

    var f = document.custo; //form
    
    var public_transport = getCheckedSliderValue(f.slider1);

    if(public_transport){
        var n_pess_familia=f.pessoas_agregado.value;
        var pmpmpc=f.preco_passe.value;

        if(!isNumber(n_pess_familia) || !isInteger(n_pess_familia) || n_pess_familia<=0){
            $.jAlert({
                'title': "अतिरिक्त डेटा",
                'content': "लोगों की अमान्य संख्या!"
            });           
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': "अतिरिक्त डेटा",
                'content': "मासिक जुर्माने कि अवैध राशि!"
            });            
            return false;
        }
    }

    var fin_effort=getCheckedSliderValue(f.slider2);

    if(fin_effort){
        /*income*/
        var income_type = getCheckedValue(f.radio_income);
        switch(income_type){
        case 'year':
                if(!isNumber(f.income_per_year.value)){
                $.jAlert({
                    'title': "आमदनी",
                    'content': "अवैध शुद्ध/ निवल आय!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': "आमदनी",
                    'content': "अवैध शुद्ध/ निवल आय!"
                });                 
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': "आमदनी",
                    'content': "महीने प्रति वर्ष की अमान्य संख्या!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': "आमदनी",
                    'content': "अवैध शुद्ध/ निवल आय!"
                });                 
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "आमदनी",
                    'content': "हफ्ते प्रति वर्ष की अमान्य संख्या!"
                });                 
                return false;
            }			
            break;
        }
        /*working time*/
        var is_working_time = getCheckedValue(f.radio_work_time);
        if(is_working_time == 'true' && income_type!='hour'){
            if(!isNumber(f.time_hours_per_week.value)){
                $.jAlert({
                    'title': "काम का समय",
                    'content': "घंटे प्रति सप्ताह की अमान्य संख्या!"
                });                 
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
                $.jAlert({
                    'title': "काम का समय",
                    'content': "महीने प्रति वर्ष की अमान्य संख्या!"
                });                 
                return false;
            }
        }
    }
     
    if(public_transport || fin_effort){
        /*distance*/
        if($('#distance_form3').css('display')!='none'){
            var drive_to_work = getCheckedValue(f.drive_to_work);
            if(drive_to_work == 'true'){
                if(!isNumber(f.drive_to_work_days_per_week.value) || f.drive_to_work_days_per_week.value > 7){
                    $.jAlert({
                        'title': "फ़ासला",
                        'content': "दिन प्रति सप्ताह के लिए अवैध संख्या!"
                    }); 
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': "फ़ासला",
                        'content': "घर और कार्यस्थल के बीच कि दूरी के लिए अवैध किलोमीटर!"
                    });                     
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': "फ़ासला",
                        'content': "जिन दिनों के दौरान आप अपनी कार को कार्यस्थल पर नहीं ले जाते हैं, उस दिन के फ़सलों के लिए अवैध संख्या!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
                    $.jAlert({
                        'title': "फ़ासला",
                        'content': "किलोमीटर प्रति महीना के लिए अवैध उत्तर!"
                    });                     
                    return false;
                }
            }
        }
        
        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){        
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': "ड्राइविंग में बिताया समय ",
                    'content': "आपके घर से कार्यस्थल तक ड्राइव करने के लिए बिताये अवैध संख्या!"
                });                 
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': "ड्राइविंग में बिताया समय ",
                    'content': "जिस दिन आप कार को कार्यस्थल पर नहीं ले जाते हैं, उस दिन आपके द्वारा ड्राइव किए जाने वाले मिनटों की अवैध संख्या!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': "ड्राइविंग में बिताया समय ",
                    'content': "आपके द्वारा ड्रायविंग में बिताये मिनटों की अमान्य संख्या!"
                });                 
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': "ड्राइविंग में बिताया समय ",
                    'content': "दिन प्रति माह के लिए अवैध संख्या!"
                });                 
                return false;
            }
        }
    }

    return true;
}
