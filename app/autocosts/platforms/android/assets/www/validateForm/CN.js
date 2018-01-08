/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){
    
    var f = document.custo; //form

    /*insurance*/
    var tipo_seguro_auto=getCheckedValue(f.tipo_seguro);

    if(!isNumber(f.seguro_val.value)){
              
        $.jAlert({ 
            'title': "汽车保险与故障保险费",
            'content': "保险金额无效!"
        });
        return false;
    }

    if(tipo_seguro_auto == ""){

        $.jAlert({
            'title': "汽车保险与故障保险费",
            'content': "输入保险周期!"
        });        
        return false;
    }
    
    /*depreciation*/
    var auto_mes=f.auto_mes.value; /*car acquisition month*/
    var auto_ano=f.auto_ano.value; /*car acquisition year*/

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        $.jAlert({
            'title': "车辆折旧费",
            'content': "购买月份无效!"
        });
        return false;
    }
    if(!isNumber(f.auto_ano.value) || !isInteger(f.auto_ano.value)){
        $.jAlert({
            'title': "车辆折旧费",
            'content': "购买年份无效!"
        });        
        return false;
    }
    if(!isNumber(f.auto_val_inicial.value)){
        $.jAlert({
            'title': "车辆折旧费",
            'content': "购买金额无效!"
        });         
        return false;
    }
    if(!isNumber(f.auto_val_final.value)){
        $.jAlert({
            'title': "车辆折旧费",
            'content': "当前汽车价值无效!"
        });        
        return false;
    }

    var today = new Date();
    var date_auto= new Date(f.auto_ano.value,f.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        $.jAlert({
            'title': "车辆折旧费",
            'content': "购买日期无效!"
        });         
        return false;
    }
    
    /*car finance*/
    var cred_auto_s_n=getCheckedValue(f.cred_auto);

    if(cred_auto_s_n == ""){
        $.jAlert({
            'title': "汽车贷款",
            'content': "请确认您是否使用汽车贷款!"
        });                 
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(f.cred_auto_montante.value)) {
            $.jAlert({
                'title': "汽车贷款",
                'content': "贷款金额无效!"
            });                        
            return false;
        }
        if(!isNumber(f.cred_auto_period.value)) {
            $.jAlert({
                'title': "汽车贷款",
                'content': "贷款期限、贷款期数无效!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_val_mes.value)) {
            $.jAlert({
                'title': "汽车贷款",
                'content': "分期付款金额无效!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_valresidual.value)) {
            $.jAlert({
                'title': "汽车贷款",
                'content': "残值无效!"
            });             
            return false;
        }
    }


    /*inspection*/
    var nmr_times_inspec=f.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        $.jAlert({
            'title': "车检费 (汽车性能测试)",
            'content': "无效的次数!"
        });
        return false;
    }

    if(!isNumber(f.preco_inspecao.value) && nmr_times_inspec!=0) {
        $.jAlert({
            'title': "车检费 (汽车性能测试)",
            'content': "车检费无效!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(f.IUC.value)) {
        $.jAlert({
            'title': "汽车购置税 (汽车税)",
            'content': "金额无效!"
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
            'title': "燃油费",
            'content': "必须选择按照元还是按照公里进行计算!"
        });        
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': "燃油费",
                'content': "燃油效率金额无效!"
            });            
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': "燃油费",
                'content': "燃油价格无效!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "燃油费",
                'content': "请确认您是否开车上班!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': "燃油费",
                    'content': "每月里程数无效!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "燃油费",
                    'content': "每周工作天数无效!"
                });                
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "燃油费",
                    'content': "家和公司之间公里数无效!"
                });                 
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': "燃油费",
                    'content': "不开车上班时驾驶的公里数无效!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': "燃油费",
                'content': "每月花费金额无效!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': "保养费",
            'content': "金额无效!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': "维修及改装费",
            'content': "金额无效!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': "停车费",
            'content': "金额无效!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tipo_calc_portagens=getCheckedValue(f.portagens_ao_dia);

    /*if tolls costs are calculated on a daily basis*/
    if(tipo_calc_portagens=="false") {/*monthly basis*/
        if(!isNumber(f.portagens.value)) {
            $.jAlert({
                'title': "通行费",
                'content': "金额无效!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.preco_portagens_por_dia.value)) {
            $.jAlert({
                'title': "通行费",
                'content': "每天花费的通行费 - 金额无效!"
            });            
            return false;
        }
        var toll_days_pmonth=f.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "通行费",
                'content': "日 - 金额无效!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(f.multas.value)){
        $.jAlert({
            'title': "交通罚单",
            'content': "金额无效!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(f.lavagens.value)){
        $.jAlert({
            'title': "清洗费",
            'content': "金额无效!"
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
                'title': "附加数据",
                'content': "人数无效!"
            });           
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': "附加数据",
                'content': "月票金额无效!"
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
                    'title': "收入",
                    'content': "净收入无效!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': "收入",
                    'content': "净收入无效!"
                });                 
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': "收入",
                    'content': "每年工作月份数无效!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': "收入",
                    'content': "净收入无效!"
                });                 
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "收入",
                    'content': "每年工作周数无效!"
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
                    'title': "工作时长",
                    'content': "每周工作小时数无效!"
                });                 
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
                $.jAlert({
                    'title': "工作时长",
                    'content': "每年工作月份数无效!"
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
                        'title': "距离",
                        'content': "每周工作天数无效!"
                    }); 
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': "距离",
                        'content': "家和公司之间公里数无效!"
                    });                     
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': "距离",
                        'content': "不开车上班时驾驶的公里数无效!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
                    $.jAlert({
                        'title': "距离",
                        'content': "每月里程数无效!"
                    });                     
                    return false;
                }
            }
        }
        
        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){        
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': "驾驶时间",
                    'content': "开车上班的分钟数无效!"
                });                 
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': "驾驶时间",
                    'content': "不开车上班时您驾驶的分钟数无效!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': "驾驶时间",
                    'content': "驾驶分钟数无效!"
                });                 
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': "驾驶时间",
                    'content': "每月天数无效!"
                });                 
                return false;
            }
        }
    }

    return true;
}
