/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
/*File with Javascript functions that check weather the form parts are correctly inserted */

/*In this file for comments ALWAYS use bar-star star-bar / * comments * / */
/*the minification tool removes newlines and thus double-bar-comments break the code */

/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/

function is_userdata_formpart1_ok(){

    var f = document.costs_form; /*form*/
    var minCarYear = 1910; /*the year of the first produced car*/

    /*depreciation*/
    var acquisitionMonth = f.acquisitionMonth.value; /*car acquisition month*/
    var acquisitionYear  = f.acquisitionYear.value; /*car acquisition year*/

    if(!isNumber(acquisitionMonth) || !isInteger(acquisitionMonth) || acquisitionMonth > 12 || acquisitionMonth <= 0){
        $.jAlert({
            'title': WORDS.depreciation,
            'content': WORDS.error_depreciation_month + "!"
        });
        return false;
    }
    if(!isNumber(f.acquisitionYear.value) || !isInteger(f.acquisitionYear.value) || f.acquisitionYear.value < minCarYear){
        $.jAlert({
            'title': WORDS.depreciation,
            'content': WORDS.error_depreciation_year + "!"
        });
        return false;
    }
    if(!isNumber(f.commercialValueAtAcquisition.value)){
        $.jAlert({
            'title': WORDS.depreciation,
            'content': WORDS.error_depreciation_value + "!"
        });
        return false;
    }
    if(!isNumber(f.commercialValueAtNow.value)){
        $.jAlert({
            'title': WORDS.depreciation,
            'content': WORDS.error_depreciation_value_today + "!"
        });
        return false;
    }

    var today  = new Date();
    var carAcquisitionDate = new Date(acquisitionYear, acquisitionMonth - 1);

    var carNumberOfMonths = date_diff(carAcquisitionDate, today);

    if(!carNumberOfMonths){
        $.jAlert({
            'title': WORDS.depreciation,
            'content': WORDS.depreciation_date + "!"
        });
        return false;
    }

    /*insurance*/
    var insurancePaymentPeriod = getCheckedValue(f.insurancePaymentPeriod);

    if(insurancePaymentPeriod == ""){

        $.jAlert({
            'title': WORDS.insurance,
            'content': WORDS.error_insu_period + "!"
        });
        return false;
    }

    if(!isNumber(f.insuranceValue.value)){

        $.jAlert({
            'title': WORDS.insurance,
            'content': WORDS.error_invalid_insu_value + "!"
        });
        return false;
    }

    /*car finance*/
    var AutoCreditRadioBtn=getCheckedValue(f.AutoCreditRadioBtn);

    if(AutoCreditRadioBtn == ""){
        $.jAlert({
            'title': WORDS.credit,
            'content': WORDS.error_credit_question + "!"
        });
        return false;
    }

    if(AutoCreditRadioBtn == "true") {
        if(!isNumber(f.borrowedAmount.value)) {
            $.jAlert({
                'title': WORDS.credit,
                'content': WORDS.error_credit_loan_value + "!"
            });
            return false;
        }
        if(!isNumber(f.numberInstallments.value)) {
            $.jAlert({
                'title': WORDS.credit,
                'content': WORDS.error_credit_period + "!"
            });
            return false;
        }
        if(!isNumber(f.amountInstallment.value)) {
            $.jAlert({
                'title': WORDS.credit,
                'content': WORDS.error_credit_instalment + "!"
            });
            return false;
        }
        if(!isNumber(f.residualValue.value)) {
            $.jAlert({
                'title': WORDS.credit,
                'content': WORDS.error_credit_residual_value + "!"
            });
            return false;
        }
    }


    /*inspection*/
    var numberInspections = f.numberInspections.value;

    if(!isNumber(numberInspections) || !isInteger(numberInspections)) {
        $.jAlert({
            'title': WORDS.inspection,
            'content': WORDS.error_inspection_ntimes + "!"
        });
        return false;
    }

    if(numberInspections!=0 && !isNumber(f.averageInspectionCost.value)) {
        $.jAlert({
            'title': WORDS.inspection,
            'content': WORDS.error_inspection_costs + "!"
        });
        return false;
    }

    /*taxes*/
    if(!isNumber(f.roadTaxes.value)) {
        $.jAlert({
            'title': WORDS.road_taxes,
            'content': WORDS.invalid_amount + "!"
        });
        return false;
    }

    return true;
}



/* *** CHECK FORM PART 2 ***** */
/*check if data from form 2 (running costs) is correctly filled*/
function is_userdata_formpart2_ok(){

    var f = document.costs_form; /*form*/

    /*fuel*/
    var tipo_calc_combustiveis=getCheckedValue(f.calc_combustiveis);

    if(tipo_calc_combustiveis == ""){
        $.jAlert({
            'title': WORDS.fuel,
            'content': WORDS.error_fuel_curr_dist + "!"
        });
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': WORDS.fuel,
                'content': WORDS.error_fuel_car_eff + "!"
            });
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': WORDS.fuel,
                'content': WORDS.error_fuel_price + "!"
            });
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': WORDS.fuel,
                'content': WORDS.error_car_job + "!"
            });
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': WORDS.fuel,
                    'content': WORDS.error_fuel_dist + "!"
                });
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': WORDS.fuel,
                    'content': WORDS.error_days_per_week + "!"
                });
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': WORDS.fuel,
                    'content': WORDS.error_dist_home_work + "!"
                });
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': WORDS.fuel,
                    'content': WORDS.error_dist_no_job + "!"
                });
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': WORDS.fuel,
                'content': WORDS.error_currency + "!"
            });
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': WORDS.maintenance,
            'content': WORDS.invalid_amount + "!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': WORDS.rep_improv,
            'content': WORDS.invalid_amount + "!"
        });
        return false;
    }

    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': WORDS.parking,
            'content': WORDS.invalid_amount + "!"
        });
        return false;
    }

    /* **** tolls ***** */
    var tolls_calc_method=getCheckedValue(f.tolls_daily_radioBtn);

    /*if tolls costs are calculated on a daily basis*/
    if(tolls_calc_method == "false") {/*no daily basis*/
        if(!isNumber(f.no_daily_tolls_value.value)) {
            $.jAlert({
                'title': WORDS.tolls,
                'content': WORDS.invalid_amount + "!"
            });
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.daily_expense_tolls.value)) {
            $.jAlert({
                'title': WORDS.tolls,
                'content': WORDS.tolls_day_calc1 + " - " + WORDS.invalid_amount + "!"
            });
            return false;
        }
        var toll_days_pmonth=f.number_days_tolls.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': WORDS.tolls,
                'content': WORDS.days + " - " + WORDS.invalid_amount + "!"
            });
            return false;
        }

    }

    /*fines*/
    if(!isNumber(f.tickets_value.value)){
        $.jAlert({
            'title': WORDS.fines,
            'content': WORDS.invalid_amount + "!"
        });
        return false;
    }

    /*washing*/
    if(!isNumber(f.washing_value.value)){
        $.jAlert({
            'title': WORDS.washing,
            'content': WORDS.invalid_amount + "!"
        });
        return false;
    }

    return true;
}



/* *** CHECK FORM PART 3 ***** */
function is_userdata_formpart3_ok(){

    var f = document.costs_form; /*form*/

    var public_transport = getCheckedSliderValue(f.slider1);

    if(public_transport){
        var n_pess_familia=f.pessoas_agregado.value;
        var pmpmpc=f.preco_passe.value;

        if(!isNumber(n_pess_familia) || !isInteger(n_pess_familia) || n_pess_familia<=0){
            $.jAlert({
                'title': WORDS.extra_data1,
                'content': WORDS.invalid_nbr_pp + "!"
            });
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': WORDS.extra_data1,
                'content': WORDS.error_pass_amount + "!"
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
                    'title': WORDS.extra_data_income,
                    'content': WORDS.error_income + "!"
                });
                return false;
            }
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': WORDS.extra_data_income,
                    'content': WORDS.error_income + "!"
                });
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': WORDS.extra_data_income,
                    'content': WORDS.error_months_per_year + "!"
                });
                return false;
            }
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': WORDS.extra_data_income,
                    'content': WORDS.error_income + "!"
                });
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': WORDS.extra_data_income,
                    'content': WORDS.error_weeks_per_year + "!"
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
                    'title': WORDS.extra_data_working_time,
                    'content': WORDS.error_hours_per_week + "!"
                });
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
                $.jAlert({
                    'title': WORDS.extra_data_working_time,
                    'content': WORDS.error_months_per_year + "!"
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
                        'title': WORDS.distance,
                        'content': WORDS.error_days_per_week + "!"
                    });
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': WORDS.distance,
                        'content': WORDS.error_dist_home_work + "!"
                    });
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': WORDS.distance,
                        'content': WORDS.error_dist_no_job + "!"
                    });
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
                    $.jAlert({
                        'title': WORDS.distance,
                        'content': WORDS.error_fuel_dist + "!"
                    });
                    return false;
                }
            }
        }

        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': WORDS.extra_data_time_spent_in_driving,
                    'content': WORDS.error_min_drive_home_job + "!"
                });
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': WORDS.extra_data_time_spent_in_driving,
                    'content': WORDS.error_min_drive_weekend + "!"
                });
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': WORDS.extra_data_time_spent_in_driving,
                    'content': WORDS.error_min_drive + "!"
                });
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': WORDS.extra_data_time_spent_in_driving,
                    'content': WORDS.error_days_per_month + "!"
                });
                return false;
            }
        }
    }

    return true;
}
