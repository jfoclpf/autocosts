<? Header("content-type: application/x-javascript");

include('../country files/' . $_GET['country'] . '.php');

?>
var income = 'year';
var isDistanceSet = false;
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/pt_PT/all.js#xfbml=1&appId=300675890065235";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function valueselect(myval) {
    window.location.href = "" + myval;
}

/*jslint browser:true */
/*jslint white: false */

/*printing functions*/
function PrintElem(elem1, elem2, elem3, elem4, title)
{
    Popup($(elem1).html(), $(elem2).html(), $(elem3).html(), $(elem4).html(), title);
}

function Popup(data1, data2, data3, data4, title) 
{
    var mywindow = window.open('', title, 'height=600,width=600');
    mywindow.document.write('<html><head><title>'+title+'</title>');
    //mywindow.document.write('<link rel="stylesheet" href="css/print.css" type="text/css">');
    mywindow.document.write('</head><body style="font-family: Verdana, Geneva, sans-serif; text-align: center;">');
	mywindow.document.write('<center><div style="margin-left: auto; margin-right: auto; width: 90%; text-align: center;">');
    mywindow.document.write('<h3>'+title+'</h3>');
    
    mywindow.document.write(data1);
    mywindow.document.write('<br>');
    mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        
    mywindow.document.write(data2);
    mywindow.document.write('<br><br>');
    
    mywindow.document.write(data3);
    mywindow.document.write('<br><br>');
    
    mywindow.document.write(data4);
    mywindow.document.write('</div></center>');
    mywindow.document.write('</body></html>');

    mywindow.print();
    mywindow.close();

    return true;
}
/*end of printing functions*/

function fuelCalculationMethodChange(fuelCalculationMethod) {
    if (fuelCalculationMethod === 'currency') {
		isDistanceSet = false;
		$('.distance_part').each(function(){ $(this).show(); });
        $('#eurosDiv').css("display", "block");
        $('#kmDiv').css("display", "none");
		$('.time_spent_part_1').each(function(){ $(this).hide(); });
		$('.time_spent_part_2').show();
		$('#drive_to_work_no').prop('checked', true);
    } else if (fuelCalculationMethod === 'distance') {
		isDistanceSet = true;
		$('.distance_part').each(function(){ $(this).hide(); });
        $('#eurosDiv').css("display", "none");
        $('#kmDiv').css("display", "block");

        var temp3;
        temp3 = document.getElementById('carro_emprego_nao');
        temp3.checked = true;
        carToJob(false);
    } else {
        console.log("wtf just happened? Either is distance or currency... make up your mind developer");
    }
}

function carToJob(carToJobFlag) {
    if (carToJobFlag) {
        $('#carro_emprego_sim_Div').css("display", "block");
        $('#carro_emprego_nao_Div').css("display", "none");
		$('.time_spent_part_1').each(function(){ $(this).show(); });
		$('.time_spent_part_2').hide();
    } else {
        $('#carro_emprego_sim_Div').css("display", "none");
        $('#carro_emprego_nao_Div').css("display", "block");
		$('.time_spent_part_1').each(function(){ $(this).hide(); });
		$('.time_spent_part_2').show();
    }
}

function driveToJob(flag){
	if(flag){
		$('.car_to_job_part').each(function(){ $(this).show(); });
		$('.time_spent_part_1').each(function(){ $(this).show(); });
		$('.time_spent_part_2').hide();
		$('#car_no_job_part').hide();
	}
	else{
		$('.car_to_job_part').each(function(){ $(this).hide(); });
		$('.time_spent_part_1').each(function(){ $(this).hide(); });
		$('.time_spent_part_2').show();
		$('#car_no_job_part').show();
	}
}

function onclick_credit(flag) {
    if(flag == 'true') {
        $('#sim_credDiv').css("display", "block");
    } else {
        $('#sim_credDiv').css("display", "none");
    }
}

function tolls_daily(tollsDailyFlag) {
    if (tollsDailyFlag) {
        $('#dia_nao_portag_DIV').css("display", "none");
        $('#dia_sim_portag_DIV').css("display", "block");
    } else {
        $('#dia_nao_portag_DIV').css("display", "block");
        $('#dia_sim_portag_DIV').css("display", "none");
    }
}

function isNumber(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n) && n >= 0);
}

function isInteger(n) {
    return (parseFloat(n) == parseInt(n, 10));
}

function date_diff(date1, date2) {//return the difference in months between two dates date2-date1
    var m2, y2, m1, y1;
    m2 = date2.getUTCMonth() + 1;
    y2 = date2.getUTCFullYear();
    m1 = date1.getUTCMonth() + 1;
    y1 = date1.getUTCFullYear();

    //check if date2>date1
    if (y1 > y2) {
        return (false);
    }
    if (y1 === y2 && m1 > m2) {
        return false;
    }

    if (m2 >= m1) {
        return (y2 - y1) * 12 + (m2 - m1);
    }
    return (y2 - y1 - 1) * 12 + (m2 + 12 - m1);
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "<p1>&#160;<\/p1>");
    return parts.join(".");
}

function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}

function income_toggle(value){
	switch(value){
		case 'year':
			$('#div_income_per_year, #working_time_part').removeClass('hidden').show();
			$('#div_income_per_month, #div_income_per_week, #div_income_per_hour').addClass('hidden');
			income='year';
			break;
		case 'month':
			$('#div_income_per_month, #working_time_part').removeClass('hidden').show();
			$('#div_income_per_year, #div_income_per_week, #div_income_per_hour').addClass('hidden');
			income='month';
			break;
		case 'week':
			$('#div_income_per_week, #working_time_part').removeClass('hidden').show();
			$('#div_income_per_year, #div_income_per_month, #div_income_per_hour').addClass('hidden');
			income='week';
			break;
		case 'hour':
			$('#div_income_per_hour').removeClass('hidden').show();
			$('#div_income_per_year, #div_income_per_week, #div_income_per_month, #working_time_part').addClass('hidden');
			income='hour';
			break;
	}	
}

function working_time_toogle(value){
	value ? $('#job_working_time').show() : $('#job_working_time').hide();	
}

//**** CHECK FORM PART 1 ******
//check if data from form 1 (standing costs) is correctly filled 
function is_userdata_formpart1_ok(){

    //insurance
    var tipo_seguro_auto=getCheckedValue(custo.tipo_seguro);

    if(!isNumber(document.custo.seguro_val.value)){
        alert("<?echo $INSURANCE?> - <?echo $ERROR_INVALID_INSU_VALUE?>!");
        return false;
    }

    if(tipo_seguro_auto == ""){
        alert("<?echo $INSURANCE?> - <?echo $ERROR_INSU_PERIOD?>!");
        return false;
    }
    
    //depreciation
    var auto_mes=document.custo.auto_mes.value; //car acquisition month
    var auto_ano=document.custo.auto_ano.value; //car acquisition year

    if(!isNumber(auto_mes) || !isInteger(auto_mes) || auto_mes>12 || auto_mes<=0){
        alert("<?echo $DEPRECIATION?> - <?echo $ERROR_DEPRECIATION_MONTH?>!");
        return false;
    }
    if(!isNumber(document.custo.auto_ano.value) || !isInteger(document.custo.auto_ano.value)){
        alert("<?echo $DEPRECIATION?> - <?echo $ERROR_DEPRECIATION_YEAR?>!");
        return false;
    }
    if(!isNumber(document.custo.auto_val_inicial.value)){
        alert("<?echo $DEPRECIATION?> - <?echo $ERROR_DEPRECIATION_VALUE?>!");
        return false;
    }
    if(!isNumber(document.custo.auto_val_final.value)){
        alert("<?echo $DEPRECIATION?> - <?echo $ERROR_DEPRECIATION_VALUE_TODAY?>!");
        return false;
    }

    var today = new Date();
    var date_auto= new Date(document.custo.auto_ano.value,document.custo.auto_mes.value-1);

    var meses=date_diff(date_auto,today);

    if(!meses){
        alert("<?echo $DEPRECIATION?> - <?echo $ERROR_DEPRECIATION_DATE?>!");
        return false;
    }
    
    //car finance
    var cred_auto_s_n=getCheckedValue(custo.cred_auto);

    if(cred_auto_s_n == ""){
        alert("<?echo $ERROR_CREDIT_QUESTION?>!");
        return false;
    }

    if(cred_auto_s_n == "true") {
        if(!isNumber(document.custo.cred_auto_montante.value)) {
            alert("<?echo $CREDIT?> - <?echo $ERROR_CREDIT_LOAN_VALUE?>!");
            return false;
        }
        if(!isNumber(document.custo.cred_auto_period.value)) {
            alert("<?echo $CREDIT?> - <?echo $ERROR_CREDIT_PERIOD?>!");
            return false;
        }
        if(!isNumber(document.custo.cred_auto_val_mes.value)) {
            alert("<?echo $CREDIT?> - <?echo $ERROR_CREDIT_INSTALMENT?>!");
            return false;
        }
        if(!isNumber(document.custo.cred_auto_valresidual.value)) {
            alert("<?echo $CREDIT?> - <?echo $ERROR_CREDIT_RESIDUAL_VALUE?>!");
            return false;
        }
    }


    //inspection
    var nmr_times_inspec=document.custo.nr_vezes_inspecao.value;
    
    if(!isNumber(nmr_times_inspec) || !isInteger(nmr_times_inspec)) {
        alert("<?echo $INSPECTION?> - <?echo $ERROR_INSPECTION_NTIMES?>!");
        return false;
    }

    if(!isNumber(document.custo.preco_inspecao.value) && nmr_times_inspec!=0) {
        alert("<?echo $INSPECTION?> - <?echo $ERROR_INSPECTION_COSTS?>!");
        return false;
    }
    
    //taxes
    if(!isNumber(document.custo.IUC.value)) {
        alert("<?echo $ROAD_TAXES?> - <?echo $INVALID_AMOUNT?>!");
        return false;
    }

    return true;
}


//**** CHECK FORM PART 2 ******
//check if data from form 2 (running costs) is correctly filled 
function is_userdata_formpart2_ok(){

    //fuel
    var tipo_calc_combustiveis=getCheckedValue(custo.calc_combustiveis);

    if(tipo_calc_combustiveis == ""){
        alert("<?echo $FUEL?> - <?echo $ERROR_FUEL_CURR_DIST?>!");
        return false;
    }

    switch(tipo_calc_combustiveis)
    {
    case "km": //fuel calculations made considering distance travelled by month

        if(!isNumber(document.custo.consumo_auto.value)){
            alert("<?echo $FUEL?> - <?echo $ERROR_FUEL_CAR_EFF?>!");
            return false;
        }
        if(!isNumber(document.custo.fuel_price.value)){
            alert("<?echo $FUEL?> - <?echo $ERROR_FUEL_PRICE?>!");
            return false;
        }

        leva_auto_job=getCheckedValue(document.custo.carro_emprego);

        if(leva_auto_job == ""){
            alert("<?echo $FUEL?> - <?echo $ERROR_CAR_JOB?>!");
            return false;
        }

        if (leva_auto_job=="false"){

            if(!isNumber(document.custo.km_por_mes.value)){
                alert("<?echo $FUEL?> - <?echo $ERROR_FUEL_DIST?>!");
                return false;
            }

        }
        else{//make calculation considering the user takes his car to work on a daily basis

            if(!isNumber(document.custo.dias_por_semana.value) || (document.custo.dias_por_semana.value)>7){
                alert("<?echo $FUEL?> - <?echo $ERROR_DAYS_PER_WEEK?>!");
                return false;
            }
            if(!isNumber(document.custo.km_entre_casa_trabalho.value)){
                alert("<?echo $FUEL?> - <?echo $ERROR_DIST_HOME_WORK?>!");
                return false;
            }
            if(!isNumber(document.custo.km_fds.value)){
                alert("<?echo $FUEL?> - <?echo $ERROR_DIST_NO_JOB?>!");
                return false;
            }

        }
        break;

    case "euros"://fuel costs based on data input money per period of time

        if(!isNumber(document.custo.combustiveis_euro.value)){
            alert("<?echo $FUEL?> - <?echo $ERROR_CURRENCY?>!");
            return false;
        }
        break;
    }

    //maintenance
    if(!isNumber(document.custo.revisoes.value)) {
        alert("<?echo $MAINTENANCE?> - <?echo $INVALID_AMOUNT?>!");
        return false;
    }

    //repairs
    if(!isNumber(document.custo.reparacoes.value)) {
        alert("<?echo $REP_IMPROV?> - <?echo $INVALID_AMOUNT?>!");
        return false;
    }
    
    //parking
    if(!isNumber(document.custo.parqueamento.value)){
        alert("<?echo $PARKING?> - <?echo $INVALID_AMOUNT?>!");
        return false;
    }

    //***** tolls ******
    var tipo_calc_portagens=getCheckedValue(document.custo.portagens_ao_dia);

    //if tolls costs are calculated on a daily basis
    if(tipo_calc_portagens=="false") {//monthly basis
        if(!isNumber(document.custo.portagens.value)) {
            alert("<?echo $TOLLS?> - <?echo $INVALID_AMOUNT?>!");
            return false;
        }

    } else {//daily basis
        if(!isNumber(document.custo.preco_portagens_por_dia.value)) {
            alert("<?echo $TOLLS?> - <?echo $TOLLS_DAY_CALC1?> - <?echo $INVALID_AMOUNT?>!");
            return false;
        }
        var toll_days_pmonth=document.custo.dias_portagens_por_mes.value;
        if(!isNumber(toll_days_pmonth) || !isInteger(toll_days_pmonth) || toll_days_pmonth>31) {
            alert("<?echo $TOLLS?> - <?echo $DAYS?> - <?echo $INVALID_AMOUNT?>!");
            return false;
        }

    }
    
    //fines
    if(!isNumber(document.custo.multas.value)){
        alert("<?echo $FINES?> - <?echo $INVALID_AMOUNT?>!");
        return false;
    }
    
    //washing
    if(!isNumber(document.custo.lavagens.value)){
        alert("<?echo $WASHING?> - <?echo $INVALID_AMOUNT?>!");
        return false;
    }
    
    return true;
}

//**** CHECK FORM PART 3 ******
function is_userdata_formpart3_ok(){

    var n_pess_familia=document.custo.pessoas_agregado.value;
    var pmpmpc=document.custo.preco_passe.value;

    if(!isNumber(n_pess_familia) || !isInteger(n_pess_familia) || n_pess_familia<=0){
        alert("<?echo $EXTRA_DATA1?> - <?echo $INVALID_NBR_PP?>!");
        return false;
    }

    if(!isNumber(pmpmpc) || pmpmpc<0){
        alert("<?echo $EXTRA_DATA1?> - <?echo $ERROR_PASS_AMOUNT?>!");
        return false;
    }
	
	//income
	var income_type = getCheckedValue(custo.radio_income);
	switch(income_type){
	case 'year':
		if(!isNumber(document.custo.income_per_year.value)){
			alert("<?echo $EXTRA_DATA_INCOME?> - <?echo $ERROR_INCOME?>!");
			return false;
		}			
		break;
	case 'month':
		if(!isNumber(document.custo.income_per_month.value)){
			alert("<?echo $EXTRA_DATA_INCOME?> - <?echo $ERROR_INCOME?>!");
			return false;
		}
		if(!isNumber(document.custo.income_months_per_year.value)){
			alert("<?echo $EXTRA_DATA_INCOME?> - <?echo $ERROR_MONTHS_PER_YEAR?>!");
			return false;
		}			
		break;
	case 'week':
		if(!isNumber(document.custo.income_per_week.value)){
			alert("<?echo $EXTRA_DATA_INCOME?> - <?echo $ERROR_INCOME?>!");
			return false;
		}
		if(!isNumber(document.custo.income_weeks_per_year.value)){
			alert("<?echo $EXTRA_DATA_INCOME?> - <?echo $ERROR_WEEKS_PER_YEAR?>!");
			return false;
		}			
		break;
	}
	//working time
	var is_working_time = getCheckedValue(custo.radio_work_time);
	if(is_working_time == 'true'){
		if(!isNumber(document.custo.time_hours_per_week.value)){
			alert("<?echo $EXTRA_DATA_WORKING_TIME?> - <?echo $ERROR_HOURS_PER_WEEK?>!");
			return false;
		}
		if(!isNumber(document.custo.time_month_per_year.value)){
			alert("<?echo $EXTRA_DATA_WORKING_TIME?> - <?echo $ERROR_MONTHS_PER_YEAR?>!");
			return false;
		}
	}
	
	//distance
	if($('.distance_part').css('display')!='none'){
		var drive_to_work = getCheckedValue(custo.drive_to_work);
		if(drive_to_work == 'true'){
			if(!isNumber(document.custo.drive_to_work_days_per_week.value)){
				alert("<?echo $DISTANCE?> - <?echo $ERROR_DAYS_PER_WEEK?>!");
				return false;
			}
			if(!isNumber(document.custo.dist_home_job.value)){
				alert("<?echo $DISTANCE?> - <?echo $ERROR_DIST_HOME_WORK?>!");
				return false;
			}
			if(!isNumber(document.custo.journey_weekend.value)){
				alert("<?echo $DISTANCE?> - <?echo $ERROR_DIST_NO_JOB?>!");
				return false;
			}
		}
		else{
			if(!isNumber(document.custo.km_per_month.value)){
				alert("<?echo $DISTANCE?> - <?echo $ERROR_FUEL_DIST?>!");
				return false;
			}
		}
	}
	
	//time spent in driving
	if($('.distance_part').css('display')!='none'){
		var drive_to_work = getCheckedValue(custo.drive_to_work);
		if(drive_to_work == 'true'){
			if(!isNumber(document.custo.time_home_job.value)){
				alert("<?echo $EXTRA_DATA_WORKING_TIME?> - <?echo $ERROR_MIN_DRIVE_HOME_JOB?>!");
				return false;
			}
			if(!isNumber(document.custo.time_weekend.value)){
				alert("<?echo $EXTRA_DATA_WORKING_TIME?> - <?echo $ERROR_MIN_DRIVE_WEEKEND?>!");
				return false;
			}
		}
		else{
			if(!isNumber(document.custo.min_drive_per_day.value)){
				alert("<?echo $EXTRA_DATA_WORKING_TIME?> - <?echo $ERROR_MIN_DRIVE?>!");
				return false;
			}
			if(!isNumber(document.custo.days_drive_per_month.value)){
				alert("<?echo $EXTRA_DATA_WORKING_TIME?> - <?echo $ERROR_DAYS_PER_MONTH?>!");
				return false;
			}
		}
	}	
    return true;
}

function openForm_part(part_name, part_number_origin, part_number_destiny, bool_go2form) {

    //alert("from "+part_number_origin+" to "+part_number_destiny);

    //is form part 1 correctly filled?
    if (part_number_origin==1){
        if (!is_userdata_formpart1_ok())
            return;
    }
    
    //is form part 2 correctly filled?
    if (part_number_origin==2 && part_number_destiny==3){
        if (!is_userdata_formpart2_ok())
            return;
    }
    
    if (bool_go2form){
        window.location.hash = "div2"; 
        window.scrollBy(0,32);
    }
    else{
        window.location.hash = "";
    }
    removeHash();

    for (var p = null, i = 1;
        p = document.getElementById(part_name+i); ++i) {
        if (i == part_number_destiny) p.style.display = "";
        else p.style.display = "none";
    }
}

function reload () {

    TimeCounter.resetStopwatch();
    input_object.style.display = 'block';
    result_object.style.display = 'none';
    reload_object.style.display = 'none';
    chart_object.style.display = 'none';
    graph_object.style.display = 'none';
    text_object.style.display = 'none';

    window.scroll(0, 1);
    
    openForm_part('form_part', 0, 1, false);
}

function initialize() {

    openForm_part("form_part", 0, 1, false); //shows just part 1 of input form

    input_object = document.getElementById('input_div'); //tabela de entrada
    result_object = document.getElementById('result_div'); //resultados
    frame_witdh = document.getElementById('result_div').offsetWidth;

    reload_object = document.getElementById('reload_div'); //reload button

    chart_object = document.getElementById('chart_div'); //pie chart
    graph_object = document.getElementById('graph_div'); //columns chart

    text_object = document.getElementById('text_div'); //msg text

    reload_object.style.display = 'none';
    tolls_daily(false);

    reload();

    document.getElementById("radio_fuel_euros").checked = true;
    $('#eurosDiv').css("display", "block");
    $('#kmDiv').css("display", "none");

    document.getElementById("radio_cred_nao").checked = true;
    $('#sim_credDiv').css("display", "none");
    
}

function formsInit(){	

	frame_witdh = document.getElementById('input_div').offsetWidth;
	
	if (!is_userdata_formpart1_ok()) return;
	if (!is_userdata_formpart2_ok()) return;
	if (!is_userdata_formpart3_ok()) return;

	var f1 = get_form_part1();
	var f2 = get_form_part2();
	var f3 = get_form_part3();
	
	var country = {
		//currency: <? echo $CURR_CODE ?>,
		distance_std: <? echo $distance_std_option; ?>,
		fuel_efficiency_std: <? echo $fuel_efficiency_std_option; ?>,
		fuel_price_volume_std: <? echo $fuel_price_volume_std; ?>,
		taxi_price: <?echo $TAXI_PRICE_PER_DIST?>
	};
	
	var data = calculate_costs(f1, f2, f3, country);

	result_object = document.getElementById('result_div');
	input_object.style.display='none';
	
	var tables_HTML = "";    
	tables_HTML += print_costs_table(f1, f2, f3, data);
	tables_HTML += print_extern_table(f1, f2, f3, data);
	tables_HTML += print_publict_table(f1, f2, f3, data);
	tables_HTML += print_feffort_table(f1, f2, f3, data);
		
	drawChartResult(frame_witdh, data)
	
	result_object.innerHTML = tables_HTML;
	result_object.style.display='block';
	
	return true;
}

function getCheckedValue(radioObj) {
    var i;

    if (!radioObj) {
        return "";
    }

    var radioLength = radioObj.length;
    if (radioLength == undefined) {
        if (radioObj.checked) {
            return radioObj.value;
        }
        return "";
    }

    for (i = 0; i < radioLength; i++) {
        if (radioObj[i].checked) {
            return radioObj[i].value;
        }
    }
    return "";
}


function submit_data(country) {

    var objectToDb = {};

    objectToDb.acquisition_month = $('#acquisitionMonth').val();
    objectToDb.acquisition_year = $('#acquisitionYear').val();
    objectToDb.commercial_value_at_acquisition = $('#commercialValueAtAcquisition').val();
    objectToDb.commercial_value_at_now = $('#commercialValueAtNow').val();
    objectToDb.insure_type = $('input[name="tipo_seguro"]:checked', '#main_form').val();
    objectToDb.insurance_value = $('#insuranceValue').val();
    objectToDb.credit = $('input[name="cred_auto"]:checked', '#main_form').val();
    objectToDb.credit_borrowed_amount = $('#borrowedAmount').val();
    objectToDb.credit_number_installments = $('#numberInstallments').val();
    objectToDb.credit_amount_installment = $('#amountInstallment').val();
    objectToDb.credit_residual_value = $('#residualValue').val();
    objectToDb.inspection_number_inspections = $('#numberInspections').val();
    objectToDb.inspection_average_inspection_cost = $('#averageInspectionCost').val();
    objectToDb.vehicle_excise_tax = $('#vehicleExciseTax').val();
    objectToDb.fuel_calculation = $('input[name="calc_combustiveis"]:checked', '#main_form').val();
    objectToDb.fuel_currency_based_currency_value = $('#fuel_currency_value').val();
    objectToDb.fuel_currency_based_periodicity = $('#combustiveis_periodo_euro').val();
    objectToDb.fuel_distance_based_car_to_work = $('input[name="carro_emprego"]:checked', '#main_form').val();
    objectToDb.fuel_distance_based_car_to_work_number_days_week = $('#car_to_work_number_days_week').val();
    objectToDb.fuel_distance_based_car_to_work_distance_home_work = $('#car_to_work_distance_home_work').val();
    objectToDb.fuel_distance_based_car_to_work_distance_weekend = $('#car_to_work_distance_weekend').val();
    objectToDb.fuel_distance_based_no_car_to_work_distance = $('#no_car_to_work_distance').val();
    objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = $('#combustivel_period_km').val();
    objectToDb.fuel_distance_based_fuel_efficiency = $('#fuel_efficiency').val();
    objectToDb.fuel_distance_based_fuel_price = $('#fuel_price').val();
    objectToDb.maintenance = $('#maintenance').val();
    objectToDb.repairs = $('#repairs').val();
    objectToDb.parking = $('#parking').val();
    objectToDb.tolls_daily = $('input[name="portagens_ao_dia"]:checked', '#main_form').val();
    objectToDb.tolls_no_daily_value = $('#no_daily_tolls_value').val();
    objectToDb.tolls_no_daily_period = $('#portagens_select').val();
    objectToDb.tolls_daily_expense = $('#daily_expense_tolls').val();
    objectToDb.tolls_daily_number_days = $('#number_days_tolls').val();
    objectToDb.tickets_value = $('#tickets_value').val();
    objectToDb.tickets_periodicity = $('#multas_select').val();
    objectToDb.washing_value = $('#washing_value').val();
    objectToDb.washing_periodicity = $('#lavagens_select').val();
    objectToDb.household_number_people = $('#household_number_people').val();
    objectToDb.public_transportation_month_expense = $('#public_transportation_month_expense').val();	
	objectToDb.income_type = $('input[name="radio_income"]:checked', '#main_form').val();
	objectToDb.income_per_year = $('#income_per_year').val();
	objectToDb.income_per_month = $('#income_per_month').val();
	objectToDb.income_months_per_year = $('#income_months_per_year').val();
	objectToDb.income_per_week = $('#income_per_week').val();
	objectToDb.income_weeks_per_year = $('#income_weeks_per_year').val();
	objectToDb.income_per_hour = $('#income_per_hour').val();
	objectToDb.income_hours_per_week = $('#income_hours_per_week').val();
	objectToDb.income_hour_weeks_per_year = $('#income_hour_weeks_per_year').val();
	objectToDb.work_time = $('input[name="radio_work_time"]:checked', '#main_form').val();
	objectToDb.work_time_month_per_year = $('#time_month_per_year').val();
	objectToDb.work_time_hours_per_week = $('#time_hours_per_week').val();
	objectToDb.distance_drive_to_work = $('input[name="drive_to_work"]:checked', '#main_form').val();
	objectToDb.distance_days_per_week = $('#drive_to_work_days_per_week').val();
	objectToDb.distance_home_job = $('#dist_home_job').val();
	objectToDb.distance_journey_weekend = $('#journey_weekend').val();
	objectToDb.distance_per_month = $('#dist_per_month').val();
	objectToDb.distance_period = $('#period_km').val();
	objectToDb.time_spent_home_job = $('#time_home_job').val();
	objectToDb.time_spent_weekend = $('#time_weekend').val();
	objectToDb.time_spent_min_drive_per_day = $('#min_drive_per_day').val();
	objectToDb.time_spent_days_drive_per_month = $('#days_drive_per_month').val();	
    objectToDb.time_to_fill_form = TimeCounter.getCurrentTimeInSeconds();
    objectToDb.client_uuid = uuid;
    objectToDb.country = country;

    sanityChecks(objectToDb);

    $.ajax({
        url: 'SubmitUserInput.php',
        type: 'POST',
        data: {
            objectToDb: objectToDb
        },
        success: function(data) {},
        error: function () {
            console.log("There was an error submitting the values for statistical analysis");
        }
    });

    return false;
}

function sanityChecks(objectToDb) {
    if (objectToDb.credit === 'false') {
        objectToDb.credit_borrowed_amount = null;
        objectToDb.credit_number_installments = null;
        objectToDb.credit_amount_installment = null;
        objectToDb.credit_residual_value = null;
    }

    if (objectToDb.fuel_calculation === 'euros') {
        objectToDb.fuel_distance_based_fuel_efficiency = null;
        objectToDb.fuel_distance_based_fuel_price = null;
        objectToDb.fuel_distance_based_car_to_work = null;
        objectToDb.fuel_distance_based_car_to_work_number_days_week = null;
        objectToDb.fuel_distance_based_car_to_work_distance_home_work = null;
        objectToDb.fuel_distance_based_car_to_work_distance_weekend = null;
        objectToDb.fuel_distance_based_no_car_to_work_distance = null;
        objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = null;
    } else {
        objectToDb.fuel_currency_based_currency_value = null;
        objectToDb.fuel_currency_based_periodicity = null;
        if (objectToDb.fuel_distance_based_car_to_work === 'true') {
            objectToDb.fuel_distance_based_no_car_to_work_distance = null;
            objectToDb.fuel_distance_based_no_car_to_fuel_period_distance = null;
        } else {
            objectToDb.fuel_distance_based_car_to_work_number_days_week = null;
            objectToDb.fuel_distance_based_car_to_work_distance_home_work = null;
            objectToDb.fuel_distance_based_car_to_work_distance_weekend = null;
        }
    }

    if (objectToDb.tolls_daily === 'true') {
        objectToDb.tolls_no_daily_value = null;
        objectToDb.tolls_no_daily_period = null;
    } else {
        objectToDb.tolls_daily_expense = null;
        objectToDb.tolls_daily_number_days = null;
    }
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function guid() {
    return (S4()+"-"+S4()+"-"+S4());
}
