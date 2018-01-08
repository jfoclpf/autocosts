/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){
    
    var f = document.custo; //form

    /*insurance*/
    var tipo_seguro_auto=getCheckedValue(f.tipo_seguro);

    if(!isNumber(f.seguro_val.value)){
              
        $.jAlert({ 
            'title': "Ubezpieczenie pojazdu",
            'content': "Nieprawidłowa kwota ubezpieczenia!"
        });
        return false;
    }

    if(tipo_seguro_auto == ""){

        $.jAlert({
            'title': "Ubezpieczenie pojazdu",
            'content': "Wprowadź okresowość ubezpieczenia!"
        });        
        return false;
    }
    
    /*depreciation*/
    var auto_mes=f.auto_mes.value; /*car acquisition month*/
    var auto_ano=f.auto_ano.value; /*car acquisition year*/

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        $.jAlert({
            'title': "Utrata wartości pojazdu",
            'content': "Nieprawidłowy miesiąc nabycia!"
        });
        return false;
    }
    if(!isNumber(f.auto_ano.value) || !isInteger(f.auto_ano.value)){
        $.jAlert({
            'title': "Utrata wartości pojazdu",
            'content': "Nieprawidłowy rok nabycia!"
        });        
        return false;
    }
    if(!isNumber(f.auto_val_inicial.value)){
        $.jAlert({
            'title': "Utrata wartości pojazdu",
            'content': "Nieprawidłowa kwota nabycia!"
        });         
        return false;
    }
    if(!isNumber(f.auto_val_final.value)){
        $.jAlert({
            'title': "Utrata wartości pojazdu",
            'content': "Nieprawidłowa aktualna wartość pojazdu!"
        });        
        return false;
    }

    var today = new Date();
    var date_auto= new Date(f.auto_ano.value,f.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        $.jAlert({
            'title': "Utrata wartości pojazdu",
            'content': "Nieprawidłowa data nabycia!"
        });         
        return false;
    }
    
    /*car finance*/
    var cred_auto_s_n=getCheckedValue(f.cred_auto);

    if(cred_auto_s_n == ""){
        $.jAlert({
            'title': "Kredyt samochodowy",
            'content': "Należy zaznaczyć czy korzystałeś/aś z kredytu samochodowego!"
        });                 
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(f.cred_auto_montante.value)) {
            $.jAlert({
                'title': "Kredyt samochodowy",
                'content': "Nieprawidłowa kwota kredytu!"
            });                        
            return false;
        }
        if(!isNumber(f.cred_auto_period.value)) {
            $.jAlert({
                'title': "Kredyt samochodowy",
                'content': "Nieprawidłowy okres kredytu, liczba rat!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_val_mes.value)) {
            $.jAlert({
                'title': "Kredyt samochodowy",
                'content': "Nieprawidłowa kwota raty!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_valresidual.value)) {
            $.jAlert({
                'title': "Kredyt samochodowy",
                'content': "Nieprawidłowa wartość końcowa!"
            });             
            return false;
        }
    }


    /*inspection*/
    var nmr_times_inspec=f.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        $.jAlert({
            'title': "Badanie techniczne pojazdu",
            'content': "Nieprawidłowa ilość razy!"
        });
        return false;
    }

    if(!isNumber(f.preco_inspecao.value) && nmr_times_inspec!=0) {
        $.jAlert({
            'title': "Badanie techniczne pojazdu",
            'content': "Nieprawidłowy koszt badania technicznego!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(f.IUC.value)) {
        $.jAlert({
            'title': "Podatek drogowy",
            'content': "Nieprawidłowa kwota!"
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
            'title': "Paliwo",
            'content': "Należy zaznaczyć czy chcesz dokonać wyliczeń w oparciu o euro czy kilometr!"
        });        
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': "Paliwo",
                'content': "Nieprawidłowa wydajność paliwa!"
            });            
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': "Paliwo",
                'content': "Nieprawidłowa cena paliwa!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "Paliwo",
                'content': "Należy wskazać czy zabierasz samochód do pracy!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': "Paliwo",
                    'content': "Nieprawidłowa liczba mil przebytych miesięcznie!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "Paliwo",
                    'content': "Nieprawidłowa liczba dni tygodniowo!"
                });                
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "Paliwo",
                    'content': "Nieprawidłowa odległość między domem a miejscem pracy!"
                });                 
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': "Paliwo",
                    'content': "Nieprawidłowa liczba kilometr jakie pokonujesz w dni, kiedy nie jedziesz samochodem do pracy!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': "Paliwo",
                'content': "Nieprawidłowa kwota miesięcznie!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': "Przeglądy okresowe",
            'content': "Nieprawidłowa kwota!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': "Naprawy i udoskonalenia",
            'content': "Nieprawidłowa kwota!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': "Parkowanie",
            'content': "Nieprawidłowa kwota!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tipo_calc_portagens=getCheckedValue(f.portagens_ao_dia);

    /*if tolls costs are calculated on a daily basis*/
    if(tipo_calc_portagens=="false") {/*monthly basis*/
        if(!isNumber(f.portagens.value)) {
            $.jAlert({
                'title': "Opłaty drogowe",
                'content': "Nieprawidłowa kwota!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.preco_portagens_por_dia.value)) {
            $.jAlert({
                'title': "Opłaty drogowe",
                'content': "Dzienna kwota jaką wydajesz na opłaty drogowe - Nieprawidłowa kwota!"
            });            
            return false;
        }
        var toll_days_pmonth=f.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "Opłaty drogowe",
                'content': "dni - Nieprawidłowa kwota!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(f.multas.value)){
        $.jAlert({
            'title': "Mandaty karne",
            'content': "Nieprawidłowa kwota!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(f.lavagens.value)){
        $.jAlert({
            'title': "Mycie i czyszczenie",
            'content': "Nieprawidłowa kwota!"
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
                'title': "Dodatkowe dane",
                'content': "Nieprawidłowa liczba osób!"
            });           
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': "Dodatkowe dane",
                'content': "Nieprawidłowa kwota biletu miesięcznego!"
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
                    'title': "Dochód",
                    'content': "Nieprawidłowy dochód netto!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': "Dochód",
                    'content': "Nieprawidłowy dochód netto!"
                });                 
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': "Dochód",
                    'content': "Nieprawidłowa liczba miesięcy na rok!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': "Dochód",
                    'content': "Nieprawidłowy dochód netto!"
                });                 
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "Dochód",
                    'content': "Nieprawidłowa liczba tygodni na rok!"
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
                    'title': "Czas pracy",
                    'content': "Nieprawidłowa liczba godzin na tydzień!"
                });                 
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
                $.jAlert({
                    'title': "Czas pracy",
                    'content': "Nieprawidłowa liczba miesięcy na rok!"
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
                        'title': "Dystans",
                        'content': "Nieprawidłowa liczba dni tygodniowo!"
                    }); 
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': "Dystans",
                        'content': "Nieprawidłowa odległość między domem a miejscem pracy!"
                    });                     
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': "Dystans",
                        'content': "Nieprawidłowa liczba kilometr jakie pokonujesz w dni, kiedy nie jedziesz samochodem do pracy!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
                    $.jAlert({
                        'title': "Dystans",
                        'content': "Nieprawidłowa liczba mil przebytych miesięcznie!"
                    });                     
                    return false;
                }
            }
        }
        
        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){        
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': "Czas spędzony na jeździe",
                    'content': "Nieprawidłowa liczba minut jazdy z domu do pracy!"
                });                 
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': "Czas spędzony na jeździe",
                    'content': "Nieprawidłowa liczba minut jazdy, w dniach kiedy nie jedziesz do pracy samochodem!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': "Czas spędzony na jeździe",
                    'content': "Nieprawidłowa liczba minut jazdy!"
                });                 
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': "Czas spędzony na jeździe",
                    'content': "Nieprawidłowa liczba dni na miesiąc!"
                });                 
                return false;
            }
        }
    }

    return true;
}
