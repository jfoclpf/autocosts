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

function onclick_sim_cred() {
    var temp;
    temp = document.getElementById('sim_credDiv');
    temp.style.display = 'block';
}
function onclick_nao_cred() {
    var temp;
    temp = document.getElementById('sim_credDiv');
    temp.style.display = 'none';
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