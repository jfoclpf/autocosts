<?php Header("content-type: application/x-javascript");
include_once($_SERVER['DOCUMENT_ROOT'].'/countries/'.$_GET['country'].'.php');
$GLOBALS['country'] = $_GET['country'];?>

/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){
    
    var f = document.costs_form; //form
    var minCarYear = 1910; //the year of the first produced car

    /*depreciation*/
    var acquisitionMonth = f.acquisitionMonth.value; /*car acquisition month*/
    var acquisitionYear  = f.acquisitionYear.value; /*car acquisition year*/

    if(!isNumber(acquisitionMonth) || !isInteger(acquisitionMonth) || acquisitionMonth > 12 || acquisitionMonth <= 0){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_MONTH ?>!"
        });
        return false;
    }
    if(!isNumber(f.acquisitionYear.value) || !isInteger(f.acquisitionYear.value) || f.acquisitionYear.value < minCarYear){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_YEAR ?>!"
        });        
        return false;
    }
    if(!isNumber(f.commercialValueAtAcquisition.value)){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_VALUE ?>!"
        });         
        return false;
    }
    if(!isNumber(f.commercialValueAtNow.value)){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_VALUE_TODAY ?>!"
        });        
        return false;
    }

    var today  = new Date();
    var carAcquisitionDate = new Date(acquisitionYear, acquisitionMonth - 1);

    var carNumberOfMonths = date_diff(carAcquisitionDate, today);

    if(!carNumberOfMonths){
        $.jAlert({
            'title': "<?php echo $DEPRECIATION ?>",
            'content': "<?php echo $ERROR_DEPRECIATION_DATE ?>!"
        });         
        return false;
    }
    
    /*insurance*/
    var insurancePaymentPeriod = getCheckedValue(f.insurancePaymentPeriod);
    
    if(insurancePaymentPeriod == ""){

        $.jAlert({
            'title': "<?php echo $INSURANCE ?>",
            'content': "<?php echo $ERROR_INSU_PERIOD ?>!"
        });        
        return false;
    } 
    
    if(!isNumber(f.insuranceValue.value)){
              
        $.jAlert({ 
            'title': "<?php echo $INSURANCE ?>",
            'content': "<?php echo $ERROR_INVALID_INSU_VALUE ?>!"
        });
        return false;
    }

    /*car finance*/
    var AutoCreditRadioBtn=getCheckedValue(f.AutoCreditRadioBtn);

    if(AutoCreditRadioBtn == ""){
        $.jAlert({
            'title': "<?php echo $CREDIT ?>",
            'content': "<?php echo $ERROR_CREDIT_QUESTION ?>!"
        });                 
        return false;
    }

    if(AutoCreditRadioBtn == "true") {
        if(!isNumber(f.borrowedAmount.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_LOAN_VALUE ?>!"
            });                        
            return false;
        }
        if(!isNumber(f.numberInstallments.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_PERIOD ?>!"
            });             
            return false;
        }
        if(!isNumber(f.amountInstallment.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_INSTALMENT ?>!"
            });             
            return false;
        }
        if(!isNumber(f.residualValue.value)) {
            $.jAlert({
                'title': "<?php echo $CREDIT ?>",
                'content': "<?php echo $ERROR_CREDIT_RESIDUAL_VALUE ?>!"
            });             
            return false;
        }
    }


    /*inspection*/
    var numberInspections = f.numberInspections.value;
    
    if(!isNumber(numberInspections) || !isInteger(numberInspections)) {
        $.jAlert({
            'title': "<?php echo $INSPECTION ?>",
            'content': "<?php echo $ERROR_INSPECTION_NTIMES ?>!"
        });
        return false;
    }

    if(numberInspections!=0 && !isNumber(f.averageInspectionCost.value)) {
        $.jAlert({
            'title': "<?php echo $INSPECTION ?>",
            'content': "<?php echo $ERROR_INSPECTION_COSTS ?>!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(f.roadTaxes.value)) {
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
    
    var f = document.costs_form; //form

    /*fuel*/
    var tipo_calc_combustiveis=getCheckedValue(f.calc_combustiveis);

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

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_FUEL_CAR_EFF ?>!"
            });            
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_FUEL_PRICE ?>!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_CAR_JOB ?>!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_FUEL_DIST ?>!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_DAYS_PER_WEEK ?>!"
                });                
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_DIST_HOME_WORK ?>!"
                });                 
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': "<?php echo $FUEL ?>",
                    'content': "<?php echo $ERROR_DIST_NO_JOB ?>!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': "<?php echo $FUEL ?>",
                'content': "<?php echo $ERROR_CURRENCY ?>!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': "<?php echo $MAINTENANCE ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': "<?php echo $REP_IMPROV ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': "<?php echo $PARKING ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tolls_calc_method=getCheckedValue(f.tolls_daily_radioBtn);

    /*if tolls costs are calculated on a daily basis*/
    if(tolls_calc_method == "false") {/*no daily basis*/
        if(!isNumber(f.no_daily_tolls_value.value)) {
            $.jAlert({
                'title': "<?php echo $TOLLS ?>",
                'content': "<?php echo $INVALID_AMOUNT ?>!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.daily_expense_tolls.value)) {
            $.jAlert({
                'title': "<?php echo $TOLLS ?>",
                'content': "<?php echo $TOLLS_DAY_CALC1 ?> - <?php echo $INVALID_AMOUNT ?>!"
            });            
            return false;
        }
        var toll_days_pmonth=f.number_days_tolls.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "<?php echo $TOLLS ?>",
                'content': "<?php echo $DAYS ?> - <?php echo $INVALID_AMOUNT ?>!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(f.tickets_value.value)){
        $.jAlert({
            'title': "<?php echo $FINES ?>",
            'content': "<?php echo $INVALID_AMOUNT ?>!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(f.washing_value.value)){
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

    var f = document.costs_form; //form
    
    var public_transport = getCheckedSliderValue(f.slider1);

    if(public_transport){
        var n_pess_familia=f.pessoas_agregado.value;
        var pmpmpc=f.preco_passe.value;

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

    var fin_effort=getCheckedSliderValue(f.slider2);

    if(fin_effort){
        /*income*/
        var income_type = getCheckedValue(f.radio_income);
        switch(income_type){
        case 'year':
                if(!isNumber(f.income_per_year.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_INCOME ?>!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_INCOME ?>!"
                });                 
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_MONTHS_PER_YEAR ?>!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_INCOME ?>!"
                });                 
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_INCOME ?>",
                    'content': "<?php echo $ERROR_WEEKS_PER_YEAR ?>!"
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
                    'title': "<?php echo $EXTRA_DATA_WORKING_TIME ?>",
                    'content': "<?php echo $ERROR_HOURS_PER_WEEK ?>!"
                });                 
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
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
            var drive_to_work = getCheckedValue(f.drive_to_work);
            if(drive_to_work == 'true'){
                if(!isNumber(f.drive_to_work_days_per_week.value) || f.drive_to_work_days_per_week.value > 7){
                    $.jAlert({
                        'title': "<?php echo $DISTANCE ?>",
                        'content': "<?php echo $ERROR_DAYS_PER_WEEK ?>!"
                    }); 
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': "<?php echo $DISTANCE ?>",
                        'content': "<?php echo $ERROR_DIST_HOME_WORK ?>!"
                    });                     
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': "<?php echo $DISTANCE ?>",
                        'content': "<?php echo $ERROR_DIST_NO_JOB ?>!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
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
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>",
                    'content': "<?php echo $ERROR_MIN_DRIVE_HOME_JOB ?>!"
                });                 
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>",
                    'content': "<?php echo $ERROR_MIN_DRIVE_WEEKEND ?>!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': "<?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>",
                    'content': "<?php echo $ERROR_MIN_DRIVE ?>!"
                });                 
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
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
