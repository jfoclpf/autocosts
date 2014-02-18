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

function onclick_euro() {
    "use strict";
    var temp1, temp2;
    temp1 = document.getElementById('eurosDiv');
    temp2 = document.getElementById('kmDiv');
    temp1.style.display = 'block';
    temp2.style.display = 'none';
}

function onclick_carroempregosim() {
    var temp1, temp2;
    temp1 = document.getElementById('carro_emprego_sim_Div');
    temp2 = document.getElementById('carro_emprego_nao_Div');
    temp1.style.display = 'block';
    temp2.style.display = 'none';
}


function onclick_carroempregonao() {
    "use strict";
    var temp1, temp2;
    temp1 = document.getElementById('carro_emprego_sim_Div');
    temp2 = document.getElementById('carro_emprego_nao_Div');
    temp1.style.display = 'none';
    temp2.style.display = 'block';
}

function onclick_km() {
    "use strict";
    var temp1, temp2, temp3;
    temp1 = document.getElementById('eurosDiv');
    temp2 = document.getElementById('kmDiv');
    temp1.style.display = 'none';
    temp2.style.display = 'block';

    temp3 = document.getElementById('carro_emprego_nao');
    temp3.checked = true;
    onclick_carroempregonao();
}

function onclick_credit(flag) {
    if(flag == 'true') {
        $('#sim_credDiv').css("display", "block");
    } else {
        $('#sim_credDiv').css("display", "none");
    }
}

function onclick_dia_nao_portag() { //doesn't make tolls calculation by day
    var temp1, temp2;
    temp1 = document.getElementById('dia_nao_portag_DIV');
    temp2 = document.getElementById('dia_sim_portag_DIV');
    temp1.style.display = 'block';
    temp2.style.display = 'none';
}

function onclick_dia_sim_portag() { //tolls calculated by day
    var temp1, temp2;
    temp1 = document.getElementById('dia_nao_portag_DIV');
    temp2 = document.getElementById('dia_sim_portag_DIV');
    temp1.style.display = 'none';
    temp2.style.display = 'block';
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

function initialize() {
    input_object = document.getElementById('input_div'); //tabela de entrada
    result_object = document.getElementById('result_div'); //resultados
    frame_witdh = document.getElementById('result_div').offsetWidth;

    submit_object = document.getElementById('submit_div'); //botÃ£o de calcular
    reload_object = document.getElementById('reload_div'); //botÃ£o de carregar

    chart_object = document.getElementById('chart_div'); //pie chart
    graph_object = document.getElementById('graph_div'); //columns chart

    text_object = document.getElementById('text_div'); //msg text


    reload_object.style.display = 'none';
    onclick_dia_nao_portag();

    reload();
}
function reload () {
    timer = 0;
    input_object.style.display = 'block';
    result_object.style.display = 'none';
    submit_object.style.display = 'block';
    reload_object.style.display = 'none';
    chart_object.style.display = 'none';
    graph_object.style.display = 'none';
    text_object.style.display = 'none';

    var temp1, temp2;

    document.getElementById("radio_fuel_euros").checked = true;
    temp1 = document.getElementById('eurosDiv');
    temp1.style.display = 'block';
    temp2 = document.getElementById('kmDiv');
    temp2.style.display = 'none';

    document.getElementById("radio_cred_nao").checked = true;
    temp2 = document.getElementById('sim_credDiv');
    temp2.style.display = 'none';
    window.scroll(0, 1);
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

function test_submit_data(country) {
    $('#output').html("Inserting......... " + country);

    timer = 0;

    var objectToDb = {};

    objectToDb.acquisition_month = $('#acquisitionMonth').val();
    objectToDb.acquisition_year = $('#acquisitionYear').val();
    objectToDb.commercial_value_at_acquisition = $('#commercialValueAtAcquisition').val();
    objectToDb.commercial_value_at_now = $('#commercialValueAtNow').val();
    objectToDb.insure_type = $('input[name="tipo_seguro"]:checked', '#main_form').val();
    objectToDb.insurance_value = $('#insuranceValue').val();
    objectToDb.credit = $('input[name="cred_auto"]:checked', '#main_form').val();
    objectToDb.borrowed_amount = $('#borrowedAmount').val();
    objectToDb.number_installments = $('#numberInstallments').val();
    objectToDb.amount_installment = $('#amountInstallment').val();
    objectToDb.residual_value = $('#residualValue').val();
    objectToDb.number_inspections = $('#numberInspections').val();
    objectToDb.average_inspection_cost = $('#averageInspectionCost').val();
    objectToDb.vehicle_excise_tax = $('#vehicleExciseTax').val();
    objectToDb.fuel_calculation = $('input[name="calc_combustiveis"]:checked', '#main_form').val();
    objectToDb.fuel_corrency_value = $('#fuel_corrency_value').val();
    objectToDb.fuel_periocity = $('#combustiveis_periodo_euro').val();
    objectToDb.car_to_job = $('input[name="carro_emprego"]:checked', '#main_form').val();
    objectToDb.car_to_work_number_days_week = $('#car_to_work_number_days_week').val();
    objectToDb.car_to_work_distance_home_work = $('#car_to_work_distance_home_work').val();
    objectToDb.car_to_work_distance_weekend = $('#car_to_work_distance_weekend').val();
    objectToDb.fuel_efficiency = $('#fuel_efficiency').val();
    objectToDb.no_car_to_work_distance = $('#no_car_to_work_distance').val();
    objectToDb.fuel_period_distance = $('#combustivel_period_km').val();
    objectToDb.fuel_effeciency = $('#fuel_effeciency').val();
    objectToDb.fuel_price = $('#fuel_price').val();
    objectToDb.maintenance = $('#maintenance').val();
    objectToDb.repairs = $('#repairs').val();
    objectToDb.parking = $('#parking').val();
    objectToDb.tolls_daily = $('input[name="portagens_ao_dia"]:checked', '#main_form').val();
    objectToDb.no_daily_tolls_value = $('#no_daily_tolls_value').val();
    objectToDb.tolls_period = $('#portagens_select').val();
    objectToDb.daily_expense_tolls = $('#daily_expense_tolls').val();
    objectToDb.number_days_tolls = $('#number_days_tolls').val();
    objectToDb.tickets_value = $('#tickets_value').val();
    objectToDb.tickes_periocity = $('#multas_select').val();
    objectToDb.washing_value = $('#washing_value').val();
    objectToDb.washing_periocity = $('#lavagens_select').val();
    objectToDb.household_number_people = $('#household_number_people').val();
    objectToDb.public_transportation_month_expense = $('#public_transportation_month_expense').val();

    $.ajax({
        url: 'SubmitUserInput.php',
        type: 'POST',
        data: {
            country:country,
            objectToDb: objectToDb
        },
        success: function(data) {
            $('#output').html(data);
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        }
    });

    return false;
}