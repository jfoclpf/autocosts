/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){

    /*insurance*/
    var tipo_seguro_auto=getCheckedValue(custo.tipo_seguro);

    if(!isNumber(document.custo.seguro_val.value)){
              
        $.jAlert({ 
            'title': "<?php echo $INSURANCE ?>",
            'content': "<?php echo $ERROR_INVALID_INSU_VALUE ?>!"
        });
        return false;
    }

    if(tipo_seguro_auto == ""){

        $.jAlert({
            'title': "<?php echo $INSURANCE ?>",
            'content': "<?php echo $ERROR_INSU_PERIOD ?>!"
        });        
        return false;
    }
    
    /*depreciation*/
    var auto_mes=document.custo.auto_mes.value; /*car acquisition month*/
    var auto_ano=document.custo.auto_ano.value; /*car acquisition year*/

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_MONTH ?>!"
        });
        return false;
    }
    if(!isNumber(document.custo.auto_ano.value) || !isInteger(document.custo.auto_ano.value)){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_YEAR ?>!"
        });        
        return false;
    }
    if(!isNumber(document.custo.auto_val_inicial.value)){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_VALUE ?>!"
        });         
        return false;
    }
    if(!isNumber(document.custo.auto_val_final.value)){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_VALUE_TODAY ?>!"
        });        
        return false;
    }

    var today = new Date();
    var date_auto= new Date(document.custo.auto_ano.value,document.custo.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_DATE ?>!"
        });         
        return false;
    }
    
    /*car finance*/
    var cred_auto_s_n=getCheckedValue(custo.cred_auto);

    if(cred_auto_s_n == ""){
        $.jAlert({
            'title': "<?php echo $CREDIT ?>",
            'content': "<?php echo $ERROR_CREDIT_QUESTION ?>!"
        });                 
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(document.custo.cred_auto_montante.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_LOAN_VALUE ?>!"
            });                        
            return false;
        }
        if(!isNumber(document.custo.cred_auto_period.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_PERIOD ?>!"
            });             
            return false;
        }
        if(!isNumber(document.custo.cred_auto_val_mes.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_INSTALMENT ?>!"
            });             
            return false;
        }
        if(!isNumber(document.custo.cred_auto_valresidual.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_RESIDUAL_VALUE ?>!"
            });             
            return false;
        }
    }


    /*inspection*/
    var nmr_times_inspec=document.custo.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        $.jAlert({
            'title': "<?php echo $INSPECTION ?>",
            'content': "<?php echo $ERROR_INSPECTION_NTIMES ?>!"
        });
        return false;
    }

    if(!isNumber(document.custo.preco_inspecao.value) && nmr_times_inspec!=0) {
        $.jAlert({
            'title': "<?php echo $INSPECTION ?>",
            'content': "<?php echo $ERROR_INSPECTION_COSTS ?>!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(document.custo.IUC.value)) {
        $.jAlert({
            'title': "<?php echo $ROAD_TAXES ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });
        return false;
    }

    return true;
}



/* *** CHECK FORM PART 2 ***** */
/*check if data from form 2 (running costs) is correctly filled*/
function is_userdata_formpart2_ok(){

    /*fuel*/
    var tipo_calc_combustiveis=getCheckedValue(custo.calc_combustiveis);

    if(tipo_calc_combustiveis == ""){
        $.jAlert({
            'title': "<?php echo $FUEL ?>",
            'content': "<?php echo $ERROR_FUEL_CURR_DIST ?>!"
        });        
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(document.custo.consumo_auto.value)){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_FUEL_CAR_EFF ?>!"
            });            
            return false;
        }
        if(!isNumber(document.custo.fuel_price.value)){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_FUEL_PRICE ?>!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(document.custo.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_CAR_JOB ?>!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(document.custo.km_por_mes.value)){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_FUEL_DIST ?>!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(document.custo.dias_por_semana.value) || (document.custo.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_DAYS_PER_WEEK ?>!"
                });                
                return false;
            }
            if(!isNumber(document.custo.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_DIST_HOME_WORK ?>!"
                });                 
                return false;
            }
            if(!isNumber(document.custo.km_fds.value)){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_DIST_NO_JOB ?>!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(document.custo.combustiveis_euro.value)){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_CURRENCY ?>!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(document.custo.revisoes.value)) {
        $.jAlert({
            'title': "<?php echo $MAINTENANCE ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(document.custo.reparacoes.value)) {
        $.jAlert({
            'title': "<?php echo $REP_IMPROV ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(document.custo.parqueamento.value)){
        $.jAlert({
            'title': "<?php echo $PARKING ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tipo_calc_portagens=getCheckedValue(document.custo.portagens_ao_dia);

    /*if tolls costs are calculated on a daily basis*/
    if(tipo_calc_portagens=="false") {/*monthly basis*/
        if(!isNumber(document.custo.portagens.value)) {
            $.jAlert({
                'title': "<?php echo $TOLLS ?>",
                'content': "<?php echo $INVALID_AMOUNT ?>!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(document.custo.preco_portagens_por_dia.value)) {
            $.jAlert({
                'title': "<?php echo $TOLLS ?>",
                'content': "<?php echo $TOLLS_DAY_CALC1 ?> - <?php echo $INVALID_AMOUNT ?>!"
            });            
            return false;
        }
        var toll_days_pmonth=document.custo.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "<?php echo $TOLLS ?>",
                'content': "<?php echo $DAYS ?> - <?php echo $INVALID_AMOUNT ?>!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(document.custo.multas.value)){
        $.jAlert({
            'title': "<?php echo $FINES ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(document.custo.lavagens.value)){
        $.jAlert({
            'title': "<?php echo $WASHING ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });        
        return false;
    }
    
    return true;
}



/* *** CHECK FORM PART 3 ***** */
function is_userdata_formpart3_ok(){

    var public_transport = getCheckedSliderValue(custo.slider1);

    if(public_transport){
        var n_pess_familia=document.custo.pessoas_agregado.value;
        var pmpmpc=document.custo.preco_passe.value;

        if(!isNumber(n_pess_familia) || !isInteger(n_pess_familia) || n_pess_familia<=0){
            $.jAlert({
                'title': "<?php echo $EXTRA_DATA1 ?>",
                'content': "<?php echo $INVALID_NBR_PP ?>!"
            });           
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': "<?php echo $EXTRA_DATA1 ?>",
                'content': "<?php echo $ERROR_PASS_AMOUNT ?>!"
            });            
            return false;
        }
    }

    var fin_effort=getCheckedSliderValue(custo.slider2);

    if(fin_effort){
        /*income*/
        var income_type = getCheckedValue(custo.radio_income);
        switch(income_type){
        case 'year':
                if(!isNumber(document.custo.income_per_year.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_INCOME ?>!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(document.custo.income_per_month.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_INCOME ?>!"
                });                 
                return false;
            }
            if(!isNumber(document.custo.income_months_per_year.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_MONTHS_PER_YEAR ?>!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(document.custo.income_per_week.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_INCOME ?>!"
                });                 
                return false;
            }
            if(!isNumber(document.custo.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_WEEKS_PER_YEAR ?>!"
                });                 
                return false;
            }			
            break;
        }
        /*working time*/
        var is_working_time = getCheckedValue(custo.radio_work_time);
        if(is_working_time == 'true' && income_type!='hour'){
            if(!isNumber(document.custo.time_hours_per_week.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_WORKING_TIME ?>",
                    'content': "<?php echo $ERROR_HOURS_PER_WEEK ?>!"
                });                 
                return false;
            }
            if(!isNumber(document.custo.time_month_per_year.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_WORKING_TIME ?>",
                    'content': "<?php echo $ERROR_MONTHS_PER_YEAR ?>!"
                });                 
                return false;
            }
        }
    }
     
    if(public_transport || fin_effort){
        /*distance*/
        if($('#distance_form3').css('display')!='none'){
            var drive_to_work = getCheckedValue(custo.drive_to_work);
            if(drive_to_work == 'true'){
                if(!isNumber(document.custo.drive_to_work_days_per_week.value)){
                    $.jAlert({
                        'title': "<?php echo $DISTANCE ?>",
                        'content': "<?php echo $ERROR_DAYS_PER_WEEK ?>!"
                    }); 
                    return false;
                }
                if(!isNumber(document.custo.dist_home_job.value)){
                    $.jAlert({
                        'title': "<?php echo $DISTANCE ?>",
                        'content': "<?php echo $ERROR_DIST_HOME_WORK ?>!"
                    });                     
                    return false;
                }
                if(!isNumber(document.custo.journey_weekend.value)){
                    $.jAlert({
                        'title': "<?php echo $DISTANCE ?>",
                        'content': "<?php echo $ERROR_DIST_NO_JOB ?>!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(document.custo.km_per_month.value)){
                    $.jAlert({
                        'title': "<?php echo $DISTANCE ?>",
                        'content': "<?php echo $ERROR_FUEL_DIST ?>!"
                    });                     
                    return false;
                }
            }
        }
        
        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){        
            if(!isNumber(document.custo.time_home_job.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>",
                    'content': "<?php echo $ERROR_MIN_DRIVE_HOME_JOB ?>!"
                });                 
                return false;
            }
            if(!isNumber(document.custo.time_weekend.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>",
                    'content': "<?php echo $ERROR_MIN_DRIVE_WEEKEND ?>!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(document.custo.min_drive_per_day.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>",
                    'content': "<?php echo $ERROR_MIN_DRIVE ?>!"
                });                 
                return false;
            }
            var days_drive_per_month = document.custo.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>",
                    'content': "<?php echo $ERROR_DAYS_PER_MONTH ?>!"
                });                 
                return false;
            }
        }
    }

    return true;
}
