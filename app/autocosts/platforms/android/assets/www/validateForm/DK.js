/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){
    
    var f = document.custo; //form

    /*insurance*/
    var tipo_seguro_auto=getCheckedValue(f.tipo_seguro);

    if(!isNumber(f.seguro_val.value)){
              
        $.jAlert({ 
            'title': "Bilforsikring og autohjælp",
            'content': "Ugyldigt forsikringsbeløb!"
        });
        return false;
    }

    if(tipo_seguro_auto == ""){

        $.jAlert({
            'title': "Bilforsikring og autohjælp",
            'content': "Indtast betalingshyppighed på din forsikring!"
        });        
        return false;
    }
    
    /*depreciation*/
    var auto_mes=f.auto_mes.value; /*car acquisition month*/
    var auto_ano=f.auto_ano.value; /*car acquisition year*/

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        $.jAlert({
            'title': "Bilens værdiforringelse",
            'content': "Ugyldig måned for køb af bil!"
        });
        return false;
    }
    if(!isNumber(f.auto_ano.value) || !isInteger(f.auto_ano.value)){
        $.jAlert({
            'title': "Bilens værdiforringelse",
            'content': "Ugyldigt år for køb af bil!"
        });        
        return false;
    }
    if(!isNumber(f.auto_val_inicial.value)){
        $.jAlert({
            'title': "Bilens værdiforringelse",
            'content': "Ugyldig købspris!"
        });         
        return false;
    }
    if(!isNumber(f.auto_val_final.value)){
        $.jAlert({
            'title': "Bilens værdiforringelse",
            'content': "Ugyldig nuværende værdi på bilen!"
        });        
        return false;
    }

    var today = new Date();
    var date_auto= new Date(f.auto_ano.value,f.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        $.jAlert({
            'title': "Bilens værdiforringelse",
            'content': "Ugyldig dato for køb af bil!"
        });         
        return false;
    }
    
    /*car finance*/
    var cred_auto_s_n=getCheckedValue(f.cred_auto);

    if(cred_auto_s_n == ""){
        $.jAlert({
            'title': "Billån",
            'content': "Angiv, om du tog et billån!"
        });                 
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(f.cred_auto_montante.value)) {
            $.jAlert({
                'title': "Billån",
                'content': "Ugyldigt lånebeløb!"
            });                        
            return false;
        }
        if(!isNumber(f.cred_auto_period.value)) {
            $.jAlert({
                'title': "Billån",
                'content': "Ugyldig løbetid, antal afdrag!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_val_mes.value)) {
            $.jAlert({
                'title': "Billån",
                'content': "Ugyldigt afdragsbeløb!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_valresidual.value)) {
            $.jAlert({
                'title': "Billån",
                'content': "Ugyldig restværdi!"
            });             
            return false;
        }
    }


    /*inspection*/
    var nmr_times_inspec=f.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        $.jAlert({
            'title': "Bilsyn",
            'content': "Ugyldigt antal gange!"
        });
        return false;
    }

    if(!isNumber(f.preco_inspecao.value) && nmr_times_inspec!=0) {
        $.jAlert({
            'title': "Bilsyn",
            'content': "Ugyldig udgift til syn!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(f.IUC.value)) {
        $.jAlert({
            'title': "Forbrugsafgifter (Bilafgifter, hvis gældende)",
            'content': "Ugyldigt beløb!"
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
            'title': "Brændstof",
            'content': "Du skal nu beslutte, om du vil foretage din beregning baseret på km eller kroner!"
        });        
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': "Brændstof",
                'content': "Ugyldigt benzinforbrug!"
            });            
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': "Brændstof",
                'content': "Ugyldig benzinpris!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "Brændstof",
                'content': "Anfør, om du tager bilen på arbejde!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': "Brændstof",
                    'content': "Ugyldigt antal kørte km per måned!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "Brændstof",
                    'content': "Ugyldigt antal dage per uge!"
                });                
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "Brændstof",
                    'content': "Ugyldigt antal km mellem hjem og arbejdsplads!"
                });                 
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': "Brændstof",
                    'content': "Ugyldigt antal kørte km de dage du ikke tager bilen på arbejde!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': "Brændstof",
                'content': "Ugyldigt antal kroner per måned!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': "Vedligehold",
            'content': "Ugyldigt beløb!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': "Reparationer og forbedringer",
            'content': "Ugyldigt beløb!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': "Parkering",
            'content': "Ugyldigt beløb!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tipo_calc_portagens=getCheckedValue(f.portagens_ao_dia);

    /*if tolls costs are calculated on a daily basis*/
    if(tipo_calc_portagens=="false") {/*monthly basis*/
        if(!isNumber(f.portagens.value)) {
            $.jAlert({
                'title': "Vejafgifter",
                'content': "Ugyldigt beløb!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.preco_portagens_por_dia.value)) {
            $.jAlert({
                'title': "Vejafgifter",
                'content': "Dagligt forbrug på vejafgifter - Ugyldigt beløb!"
            });            
            return false;
        }
        var toll_days_pmonth=f.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "Vejafgifter",
                'content': "dage - Ugyldigt beløb!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(f.multas.value)){
        $.jAlert({
            'title': "Bøder",
            'content': "Ugyldigt beløb!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(f.lavagens.value)){
        $.jAlert({
            'title': "Vask og rens",
            'content': "Ugyldigt beløb!"
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
                'title': "Yderligere oplysninger",
                'content': "Ugyldigt antal personer!"
            });           
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': "Yderligere oplysninger",
                'content': "Ugyldigt bødebeløb!"
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
                    'title': "Indkomst",
                    'content': "Ugyldig nettoindkomst!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': "Indkomst",
                    'content': "Ugyldig nettoindkomst!"
                });                 
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': "Indkomst",
                    'content': "Ugyldigt antal måneder per år!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': "Indkomst",
                    'content': "Ugyldig nettoindkomst!"
                });                 
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "Indkomst",
                    'content': "Ugyldigt antal uger per år!"
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
                    'title': "Arbejdstid",
                    'content': "Ugyldigt antal timer per uge!"
                });                 
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
                $.jAlert({
                    'title': "Arbejdstid",
                    'content': "Ugyldigt antal måneder per år!"
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
                        'title': "Distance",
                        'content': "Ugyldigt antal dage per uge!"
                    }); 
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': "Distance",
                        'content': "Ugyldigt antal km mellem hjem og arbejdsplads!"
                    });                     
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': "Distance",
                        'content': "Ugyldigt antal kørte km de dage du ikke tager bilen på arbejde!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
                    $.jAlert({
                        'title': "Distance",
                        'content': "Ugyldigt antal kørte km per måned!"
                    });                     
                    return false;
                }
            }
        }
        
        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){        
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': "Tid anvendt på kørsel",
                    'content': "Ugyldigt antal minutter du kører fra hjem til arbejdsplads!"
                });                 
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': "Tid anvendt på kørsel",
                    'content': "Ugyldigt antal minutter du kører, de dage hvor du ikke tager bilen til arbejde!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': "Tid anvendt på kørsel",
                    'content': "Ugyldigt antal minutter du kører!"
                });                 
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': "Tid anvendt på kørsel",
                    'content': "Ugyldigt antal dage per måned!"
                });                 
                return false;
            }
        }
    }

    return true;
}
