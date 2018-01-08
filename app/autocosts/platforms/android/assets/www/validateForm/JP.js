/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){
    
    var f = document.custo; //form

    /*insurance*/
    var tipo_seguro_auto=getCheckedValue(f.tipo_seguro);

    if(!isNumber(f.seguro_val.value)){
              
        $.jAlert({ 
            'title': "自動車保険と故障カバー",
            'content': "無効な保険金額!"
        });
        return false;
    }

    if(tipo_seguro_auto == ""){

        $.jAlert({
            'title': "自動車保険と故障カバー",
            'content': "保険の期間を挿入します!"
        });        
        return false;
    }
    
    /*depreciation*/
    var auto_mes=f.auto_mes.value; /*car acquisition month*/
    var auto_ano=f.auto_ano.value; /*car acquisition year*/

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        $.jAlert({
            'title': "車両の減価償却費",
            'content': "無効な所得月数!"
        });
        return false;
    }
    if(!isNumber(f.auto_ano.value) || !isInteger(f.auto_ano.value)){
        $.jAlert({
            'title': "車両の減価償却費",
            'content': "無効な所得年数!"
        });        
        return false;
    }
    if(!isNumber(f.auto_val_inicial.value)){
        $.jAlert({
            'title': "車両の減価償却費",
            'content': "無効な所得額!"
        });         
        return false;
    }
    if(!isNumber(f.auto_val_final.value)){
        $.jAlert({
            'title': "車両の減価償却費",
            'content': "今日の無効な車両価値!"
        });        
        return false;
    }

    var today = new Date();
    var date_auto= new Date(f.auto_ano.value,f.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        $.jAlert({
            'title': "車両の減価償却費",
            'content': "無効な所得の日付!"
        });         
        return false;
    }
    
    /*car finance*/
    var cred_auto_s_n=getCheckedValue(f.cred_auto);

    if(cred_auto_s_n == ""){
        $.jAlert({
            'title': "車ファイナンス",
            'content': "自動車ファイナンスを使用した場合は参照してください!"
        });                 
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(f.cred_auto_montante.value)) {
            $.jAlert({
                'title': "車ファイナンス",
                'content': "無効な金額!"
            });                        
            return false;
        }
        if(!isNumber(f.cred_auto_period.value)) {
            $.jAlert({
                'title': "車ファイナンス",
                'content': "無効なクレジット期間、分割払いの数!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_val_mes.value)) {
            $.jAlert({
                'title': "車ファイナンス",
                'content': "無効な分割払いの金額!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_valresidual.value)) {
            $.jAlert({
                'title': "車ファイナンス",
                'content': "無効な残余価値!"
            });             
            return false;
        }
    }


    /*inspection*/
    var nmr_times_inspec=f.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        $.jAlert({
            'title': "車両検査（MOTテスト）",
            'content': "無効な回数!"
        });
        return false;
    }

    if(!isNumber(f.preco_inspecao.value) && nmr_times_inspec!=0) {
        $.jAlert({
            'title': "車両検査（MOTテスト）",
            'content': "無効な検査コスト!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(f.IUC.value)) {
        $.jAlert({
            'title': "自動車消費税（自動車税）",
            'content': "無効な金額!"
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
            'title': "燃料",
            'content': "ポンドまたはマイルに基づいて計算を行うことが欲しいナラ、参照する必要があります!"
        });        
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': "燃料",
                'content': "無効な燃費額!"
            });            
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': "燃料",
                'content': "無効な燃料価額!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "燃料",
                'content': "車を職場に運転していくなら明記してください!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': "燃料",
                    'content': "毎月無効な運転距離!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "燃料",
                    'content': "毎週無効な運転日数!"
                });                
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "燃料",
                    'content': "自宅から職場まで無効な運転距離!"
                });                 
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': "燃料",
                    'content': "運転通勤しない日々の無効な距離!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': "燃料",
                'content': "毎月の無効なポンド!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': "メンテナンス",
            'content': "無効な金額!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': "修理と改善",
            'content': "無効な金額!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': "駐車",
            'content': "無効な金額!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tipo_calc_portagens=getCheckedValue(f.portagens_ao_dia);

    /*if tolls costs are calculated on a daily basis*/
    if(tipo_calc_portagens=="false") {/*monthly basis*/
        if(!isNumber(f.portagens.value)) {
            $.jAlert({
                'title': "通行料",
                'content': "無効な金額!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.preco_portagens_por_dia.value)) {
            $.jAlert({
                'title': "通行料",
                'content': "毎日通行料の出費 - 無効な金額!"
            });            
            return false;
        }
        var toll_days_pmonth=f.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "通行料",
                'content': "何日 - 無効な金額!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(f.multas.value)){
        $.jAlert({
            'title': "交通チケット",
            'content': "無効な金額!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(f.lavagens.value)){
        $.jAlert({
            'title': "洗濯とクリーニング",
            'content': "無効な金額!"
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
                'title': "追加データ",
                'content': "無効な人数!"
            });           
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': "追加データ",
                'content': "毎月無効なチケットの金額!"
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
                    'title': "収入",
                    'content': "無効な純収入!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': "収入",
                    'content': "無効な純収入!"
                });                 
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': "収入",
                    'content': "毎年無効な月数!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': "収入",
                    'content': "無効な純収入!"
                });                 
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "収入",
                    'content': "毎年無効な週数!"
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
                    'title': "労働時間",
                    'content': "毎週無効な時間数!"
                });                 
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
                $.jAlert({
                    'title': "労働時間",
                    'content': "毎年無効な月数!"
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
                        'title': "距離",
                        'content': "毎週無効な運転日数!"
                    }); 
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': "距離",
                        'content': "自宅から職場まで無効な運転距離!"
                    });                     
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': "距離",
                        'content': "運転通勤しない日々の無効な距離!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
                    $.jAlert({
                        'title': "距離",
                        'content': "毎月無効な運転距離!"
                    });                     
                    return false;
                }
            }
        }
        
        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){        
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': "運転がかかる時間",
                    'content': "自宅から職場まで運転する無効な分!"
                });                 
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': "運転がかかる時間",
                    'content': "運転通勤していない運転する日々に無効な分!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': "運転がかかる時間",
                    'content': "無効な運転する分!"
                });                 
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': "運転がかかる時間",
                    'content': "毎月無効な日数!"
                });                 
                return false;
            }
        }
    }

    return true;
}
