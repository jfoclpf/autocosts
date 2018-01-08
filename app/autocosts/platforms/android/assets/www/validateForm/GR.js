/* *** CHECK FORM PART 1 ***** */
/*check if data from form 1 (standing costs) is correctly filled*/
function is_userdata_formpart1_ok(){
    
    var f = document.custo; //form

    /*insurance*/
    var tipo_seguro_auto=getCheckedValue(f.tipo_seguro);

    if(!isNumber(f.seguro_val.value)){
              
        $.jAlert({ 
            'title': "Ασφάλεια οχήματος και κάλυψη σε περίπτωση βλάβης",
            'content': "Μη έγκυρο ποσό ασφάλισης!"
        });
        return false;
    }

    if(tipo_seguro_auto == ""){

        $.jAlert({
            'title': "Ασφάλεια οχήματος και κάλυψη σε περίπτωση βλάβης",
            'content': "Εισάγετε τη συχνότητα καταβολής των πληρωμών της ασφάλειας!"
        });        
        return false;
    }
    
    /*depreciation*/
    var auto_mes=f.auto_mes.value; /*car acquisition month*/
    var auto_ano=f.auto_ano.value; /*car acquisition year*/

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        $.jAlert({
            'title': "Υποτίμηση της αξίας του οχήματος",
            'content': "Μη έγκυρος μήνας απόκτησης!"
        });
        return false;
    }
    if(!isNumber(f.auto_ano.value) || !isInteger(f.auto_ano.value)){
        $.jAlert({
            'title': "Υποτίμηση της αξίας του οχήματος",
            'content': "Μη έγκυρο έτος απόκτησης!"
        });        
        return false;
    }
    if(!isNumber(f.auto_val_inicial.value)){
        $.jAlert({
            'title': "Υποτίμηση της αξίας του οχήματος",
            'content': "Μη έγκυρο ποσό απόκτησης!"
        });         
        return false;
    }
    if(!isNumber(f.auto_val_final.value)){
        $.jAlert({
            'title': "Υποτίμηση της αξίας του οχήματος",
            'content': "Μη έγκυρη τωρινή αξία οχήματος!"
        });        
        return false;
    }

    var today = new Date();
    var date_auto= new Date(f.auto_ano.value,f.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        $.jAlert({
            'title': "Υποτίμηση της αξίας του οχήματος",
            'content': "Μη έγκυρη ημερομηνία απόκτησης!"
        });         
        return false;
    }
    
    /*car finance*/
    var cred_auto_s_n=getCheckedValue(f.cred_auto);

    if(cred_auto_s_n == ""){
        $.jAlert({
            'title': "Χρηματοδότηση για την αγορά αυτοκινήτου",
            'content': "Παρακαλούμε διευκρινίστε εάν πήρατε δάνειο για το αυτοκίνητο!"
        });                 
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(f.cred_auto_montante.value)) {
            $.jAlert({
                'title': "Χρηματοδότηση για την αγορά αυτοκινήτου",
                'content': "Μη έγκυρο ποσό δανείου!"
            });                        
            return false;
        }
        if(!isNumber(f.cred_auto_period.value)) {
            $.jAlert({
                'title': "Χρηματοδότηση για την αγορά αυτοκινήτου",
                'content': "Μη έγκυρη περίοδος δανείου, αριθμός δόσεων!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_val_mes.value)) {
            $.jAlert({
                'title': "Χρηματοδότηση για την αγορά αυτοκινήτου",
                'content': "Μη έγκυρο ποσό δόσης!"
            });             
            return false;
        }
        if(!isNumber(f.cred_auto_valresidual.value)) {
            $.jAlert({
                'title': "Χρηματοδότηση για την αγορά αυτοκινήτου",
                'content': "Μη έγκυρη καθαρή απομένουσα αξία!"
            });             
            return false;
        }
    }


    /*inspection*/
    var nmr_times_inspec=f.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        $.jAlert({
            'title': "ΚΤΕΟ",
            'content': "Μη έγκυρος αριθμός ελέγχων ΚΤΕΟ!"
        });
        return false;
    }

    if(!isNumber(f.preco_inspecao.value) && nmr_times_inspec!=0) {
        $.jAlert({
            'title': "ΚΤΕΟ",
            'content': "Μη έγκυρο κόστος ελέγχου ΚΤΕΟ!"
        });        
        return false;
    }
    
    /*taxes*/
    if(!isNumber(f.IUC.value)) {
        $.jAlert({
            'title': "Τέλη κυκλοφορίας (αν ισχύουν)",
            'content': "Μη έγκυρο ποσό!"
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
            'title': "Καύσιμα",
            'content': "Πρέπει να ορίσετε αν επιθυμείτε να κάνετε υπολογισμούς βάσει χιλιομέτρων ή ευρώ.!"
        });        
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": /*fuel calculations made considering distance travelled by month*/

        if(!isNumber(f.consumo_auto.value)){
            $.jAlert({
                'title': "Καύσιμα",
                'content': "Μη έγκυρο ποσό αποδοτικότητας καυσίμων!"
            });            
            return false;
        }
        if(!isNumber(f.fuel_price.value)){
            $.jAlert({
                'title': "Καύσιμα",
                'content': "Μη έγκυρη τιμή βενζίνης!"
            });            
            return false;
        }

        leva_auto_job=getCheckedValue(f.car_job_form2);

        if(leva_auto_job == ""){
            $.jAlert({
                'title': "Καύσιμα",
                'content': "Παρακαλούμε αναφέρετε αν πηγαίνετε στη δουλειά σας με το αυτοκίνητο.!"
            });            
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(f.km_por_mes.value)){
                $.jAlert({
                    'title': "Καύσιμα",
                    'content': "Μη έγκυρη τιμή για τα χιλιόμετρα που διανύετε κάθε μήνα!"
                });                
                return false;
            }

        }
        else{/*make calculation considering the user takes his car to work on a daily basis*/

            if(!isNumber(f.dias_por_semana.value) || (f.dias_por_semana.value)>7){
                $.jAlert({
                    'title': "Καύσιμα",
                    'content': "Μη έγκυρος αριθμός ημερών ανά εβδομάδα!"
                });                
                return false;
            }
            if(!isNumber(f.km_entre_casa_trabalho.value)){
                $.jAlert({
                    'title': "Καύσιμα",
                    'content': "Μη έγκυρος αριθμός χιλιομέτρων μεταξύ σπιτιού και εργασίας!"
                });                 
                return false;
            }
            if(!isNumber(f.km_fds.value)){
                $.jAlert({
                    'title': "Καύσιμα",
                    'content': "Μη έγκυρος αριθμός χιλιομέτρων που διανύετε με το αυτοκίνητο τις ημέρες που δεν παίρνετε το αυτοκίνητο στη δουλειά σας!"
                });                 
                return false;
            }

        }
        break;

    case "euros":/*fuel costs based on data input money per period of time*/

        if(!isNumber(f.combustiveis_euro.value)){
            $.jAlert({
                'title': "Καύσιμα",
                'content': "Μη έγκυρο ποσό ευρώ ανά μήνα!"
            });             
            return false;
        }
        break;
    }

    /*maintenance*/
    if(!isNumber(f.revisoes.value)) {
        $.jAlert({
            'title': "Συντήρηση",
            'content': "Μη έγκυρο ποσό!"
        });
        return false;
    }

    /*repairs*/
    if(!isNumber(f.reparacoes.value)) {
        $.jAlert({
            'title': "Επισκευές και βελτιώσεις",
            'content': "Μη έγκυρο ποσό!"
        });        
        return false;
    }
    
    /*parking*/
    if(!isNumber(f.parqueamento.value)){
        $.jAlert({
            'title': "Στάθμευση",
            'content': "Μη έγκυρο ποσό!"
        });        
        return false;
    }

    /* **** tolls ***** */
    var tipo_calc_portagens=getCheckedValue(f.portagens_ao_dia);

    /*if tolls costs are calculated on a daily basis*/
    if(tipo_calc_portagens=="false") {/*monthly basis*/
        if(!isNumber(f.portagens.value)) {
            $.jAlert({
                'title': "Διόδια",
                'content': "Μη έγκυρο ποσό!"
            });            
            return false;
        }

    } else {/*daily basis*/
        if(!isNumber(f.preco_portagens_por_dia.value)) {
            $.jAlert({
                'title': "Διόδια",
                'content': "Ποσό που ξοδεύετε στα διόδια ημερησίως - Μη έγκυρο ποσό!"
            });            
            return false;
        }
        var toll_days_pmonth=f.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            $.jAlert({
                'title': "Διόδια",
                'content': "ημέρες - Μη έγκυρο ποσό!"
            });            
            return false;
        }

    }
    
    /*fines*/
    if(!isNumber(f.multas.value)){
        $.jAlert({
            'title': "Κλήσεις Τροχαίας",
            'content': "Μη έγκυρο ποσό!"
        });        
        return false;
    }
    
    /*washing*/
    if(!isNumber(f.lavagens.value)){
        $.jAlert({
            'title': "Πλύσιμο και καθαρισμός",
            'content': "Μη έγκυρο ποσό!"
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
                'title': "Επιπλέον δεδομένα",
                'content': "Μη έγκυρος αριθμός ατόμων!"
            });           
            return false;
        }

        if(!isNumber(pmpmpc) || pmpmpc<0){
            $.jAlert({
                'title': "Επιπλέον δεδομένα",
                'content': "Μη έγκυρο ποσό μηνιαίων εισιτηρίων!"
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
                    'title': "Εισόδημα",
                    'content': "Μη έγκυρο καθαρό εισόδημα!"
                });                 
                return false;
            }			
            break;
        case 'month':
            if(!isNumber(f.income_per_month.value)){
                $.jAlert({
                    'title': "Εισόδημα",
                    'content': "Μη έγκυρο καθαρό εισόδημα!"
                });                 
                return false;
            }
            if(!isNumber(f.income_months_per_year.value)){
                $.jAlert({
                    'title': "Εισόδημα",
                    'content': "Μη έγκυρος αριθμός μηνών ετησίως!"
                });                 
                return false;
            }			
            break;
        case 'week':
            if(!isNumber(f.income_per_week.value)){
                $.jAlert({
                    'title': "Εισόδημα",
                    'content': "Μη έγκυρο καθαρό εισόδημα!"
                });                 
                return false;
            }
            if(!isNumber(f.income_weeks_per_year.value)){
                $.jAlert({
                    'title': "Εισόδημα",
                    'content': "Μη έγκυρος αριθμός εβδομάδων ετησίως!"
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
                    'title': "Χρόνος εργασίας",
                    'content': "Μη έγκυρος αριθμός ωρών ανά εβδομάδα!"
                });                 
                return false;
            }
            if(!isNumber(f.time_month_per_year.value)){
                $.jAlert({
                    'title': "Χρόνος εργασίας",
                    'content': "Μη έγκυρος αριθμός μηνών ετησίως!"
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
                        'title': "Απόσταση",
                        'content': "Μη έγκυρος αριθμός ημερών ανά εβδομάδα!"
                    }); 
                    return false;
                }
                if(!isNumber(f.dist_home_job.value)){
                    $.jAlert({
                        'title': "Απόσταση",
                        'content': "Μη έγκυρος αριθμός χιλιομέτρων μεταξύ σπιτιού και εργασίας!"
                    });                     
                    return false;
                }
                if(!isNumber(f.journey_weekend.value)){
                    $.jAlert({
                        'title': "Απόσταση",
                        'content': "Μη έγκυρος αριθμός χιλιομέτρων που διανύετε με το αυτοκίνητο τις ημέρες που δεν παίρνετε το αυτοκίνητο στη δουλειά σας!"
                    });                     
                    return false;
                }
            }
            else{
                if(!isNumber(f.km_per_month.value)){
                    $.jAlert({
                        'title': "Απόσταση",
                        'content': "Μη έγκυρη τιμή για τα χιλιόμετρα που διανύετε κάθε μήνα!"
                    });                     
                    return false;
                }
            }
        }
        
        /*time spent in driving*/
        if (isVisible('.time_spent_part1_form3')){        
            if(!isNumber(f.time_home_job.value)){
                $.jAlert({
                    'title': "Χρόνος που αφιερώνετε στην οδήγηση",
                    'content': "Μη έγκυρος αριθμός λεπτών που οδηγείτε από το σπίτι στην εργασία σας!"
                });                 
                return false;
            }
            if(!isNumber(f.time_weekend.value)){
                $.jAlert({
                    'title': "Χρόνος που αφιερώνετε στην οδήγηση",
                    'content': "Μη έγκυρος αριθμός λεπτών που οδηγείτε τις ημέρες που δεν παίρνετε το αυτοκίνητο στη δουλειά!"
                });                 
                return false;
            }
        }
        else{
            if(!isNumber(f.min_drive_per_day.value)){
                $.jAlert({
                    'title': "Χρόνος που αφιερώνετε στην οδήγηση",
                    'content': "Μη έγκυρος αριθμός λεπτών που οδηγείτε!"
                });                 
                return false;
            }
            var days_drive_per_month = f.days_drive_per_month.value;
            if(!isNumber(days_drive_per_month) || !isInteger(days_drive_per_month) || days_drive_per_month>31){
                $.jAlert({
                    'title': "Χρόνος που αφιερώνετε στην οδήγηση",
                    'content': "Μη έγκυρος αριθμός ημερών ανά μήνα!"
                });                 
                return false;
            }
        }
    }

    return true;
}
