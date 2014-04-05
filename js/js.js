(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/pt_PT/all.js#xfbml=1&appId=300675890065235";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function valueselect(myval) {
    window.location.href = "index.php?c=" + myval;
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
	mywindow.document.write('</head><body style="font-family: Verdana, Geneva, sans-serif;"><center>');
	mywindow.document.write('<h3>AUTOCOSTS.ORG</h3><h1>'+title+'</h1>');
	
	mywindow.document.write(data1);
	mywindow.document.write('<br>');
	mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
		
	mywindow.document.write(data2);
	mywindow.document.write('<br><br>');
	
	mywindow.document.write(data3);
	mywindow.document.write('<br><br>');
	
	mywindow.document.write(data4);
	mywindow.document.write('</center>');
	mywindow.document.write('</body></html>');

	mywindow.print();
	mywindow.close();

	return true;
}
/*end of printing functions*/

function fuelCalculationMethodChange(fuelCalculationMethod) {
    if (fuelCalculationMethod === 'currency') {
        $('#eurosDiv').css("display", "block");
        $('#kmDiv').css("display", "none");
    } else if (fuelCalculationMethod === 'distance') {
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
    } else {
        $('#carro_emprego_sim_Div').css("display", "none");
        $('#carro_emprego_nao_Div').css("display", "block");
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

function openForm_part(part_name, part_number, bool_go2form) {

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
		if (i == part_number) p.style.display = "";
		else p.style.display = "none";
    }
}

function initialize() {

	openForm_part("form_part", 1, false); //shows just part 1 of input form

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
function reload () {

    TimeCounter.resetStopwatch();
    input_object.style.display = 'block';
    result_object.style.display = 'none';
    reload_object.style.display = 'none';
    chart_object.style.display = 'none';
    graph_object.style.display = 'none';
    text_object.style.display = 'none';

    window.scroll(0, 1);
	
	openForm_part('form_part', 1, false);
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