/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with Javascript Charts Functions */

//draw Pie Chart
function drawMonthlyCostsPieChart(chartWidth, chartHeight) {

    var chart, chart_div, char_data, options, chart_content;
    var c = pfto(CALCULATED.data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)

    //checks if depreciation is greater or equal to zero, to print chart with no error
    if (c.depreciation < 0){
        c.depreciation = 0;
    }

    chart_content = [
                        [WORDS.parcel, WORDS.costs],
                        [COUNTRY=='RU' || COUNTRY=="UA" ? WORDS.insurance_chart : WORDS.short, c.insurance],
                        [WORDS.fuel,                    c.fuel],
                        [WORDS.depreciation,            c.depreciation],
                        [WORDS.credit_interests,        c.credit],
                        [WORDS.inspection_short,        c.inspection],
                        [WORDS.maintenance,             c.maintenance],
                        [WORDS.rep_improv,              c.repairs_improv],
                        [WORDS.road_taxes_short,        c.car_tax],
                        [WORDS.parking,                 c.parking],
                        [WORDS.tolls,                   c.tolls],
                        [WORDS.fines,                   c.fines],
                        [WORDS.washing,                 c.washing]
                    ];

    char_data = google.visualization.arrayToDataTable(chart_content);

    options = {
        title: WORDS.costs,
        backgroundColor: {fill: "transparent"},
        chartArea: {
            left: 0, 
            top: 0, 
            width: "90%", 
            height: "90%"
        },       
        width: chartWidth,
        height: chartHeight
    };

    chart_div = document.getElementById('pie_chart_div');
    chart = new google.visualization.PieChart(chart_div);

    //wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () {
        DISPLAY.charts.URIs.pieChart = chart.getImageURI();
    });

    chart.draw(char_data, options);
    DISPLAY.charts.isMonthlyCostsPieChart = true;
}

//draw bar chart
function drawMonthlyCostsBarChart(chartWidth, chartHeight) {

    var chart, chart_div, char_data, chart_legend, chart_inner_width, bar_width, chart_content, options;
    var c = pfto(CALCULATED.data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)

    // Create and populate the data table.
    chart_content = [
                        [
                            WORDS.parcel,
                            COUNTRY=="RU" || COUNTRY=="UA" ? WORDS.insurance_chart : WORDS.insurance_short,
                            WORDS.fuel,
                            WORDS.depreciation,
                            WORDS.credit_interests,
                            WORDS.inspection_short,
                            WORDS.maintenance,
                            WORDS.rep_improv,
                            WORDS.road_taxes_short,
                            WORDS.parking,
                            WORDS.tolls,
                            WORDS.fines,
                            WORDS.washing,
                            { role: 'annotation' }
                        ],
                        [
                            WORDS.fixed_costs,
                            c.insurance,
                            0,
                            c.depreciation,
                            c.credit,
                            c.inspection,
                            (c.maintenance/2),
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            ''
                        ],
                        [
                            WORDS.running_costs,
                            0,
                            c.fuel,
                            0,
                            0,
                            0,
                            (c.maintenance/2),
                            c.repairs_improv,
                            c.car_tax,
                            c.parking,
                            c.tolls,
                            c.fines,
                            c.washing,
                            ''
                        ]
                    ];

    char_data = google.visualization.arrayToDataTable(chart_content);

    // Create and draw the visualization.
    chart_div = document.getElementById('bar_chart_div');
    chart = new google.visualization.ColumnChart(chart_div);

    //Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () {
        DISPLAY.charts.URIs.barChart = chart.getImageURI();
    });

    //cross browser solution; if the window width is too small hides legend of chart
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if( window_width < DISPLAY.charts.MIN_LEGEND ){
        chart_legend = "none";
        chart_inner_width = "100%";
    }
    else {
        chart_legend = "right";
        chart_inner_width = "60%";
        bar_width = "61.8%"; //default value
    }

    options = {
        title: WORDS.costs,
        backgroundColor: {fill: 'transparent'},
        chartArea: { 
            left: 0, 
            top: 0, 
            width: chart_inner_width, 
            height: "90%"
        },
        vAxis: { 
            minValue: 0
        },
        legend: {
            position: chart_legend 
        },
        bar: { 
            groupWidth: bar_width 
        },
        isStacked: true,      
        width: chartWidth,
        height: chartHeight
    };

    chart.draw(char_data, options);
    DISPLAY.charts.isMonthlyCostsBarChart = true;
}

//draws horizontal bars chart for Financial Effort
function drawFinEffortChart(total_cost_per_year, net_income_per_year, chartWidth, chartHeight){

    var chart, chart_div, chart_data, data, options, br_html, top_var, chart_inner_height;

    chart_data = [
         ['', WORDS.net_income_per + ' ' + WORDS.year, WORDS.total_costs_per_year],
         ['', net_income_per_year, total_cost_per_year],
    ];

    data = google.visualization.arrayToDataTable(chart_data);

    //cross browser solution; if the window width is too small hides legend of chart
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(window_width < DISPLAY.charts.MIN_LEGEND){
        br_html = '\n';
        chart_inner_height = "60%";
        top_var = 0;
    }
    else{
        br_html = '';
        chart_inner_height = "80%";
        top_var = 10;
    }

    options = {
        backgroundColor: {
            fill: 'transparent'
        },
        chartArea: {
            top: top_var, 
            width: "90%", 
            height: chart_inner_height
        },
        legend: { 
            position: 'none' 
        },
        vAxis: { 
            textPosition: 'none' 
        },
        hAxis: {
            title: WORDS.net_income_per + ' ' + WORDS.year + ' vs. ' + br_html + WORDS.total_costs_per_year + ' (' + WORDS.curr_name_plural + ')',
            minValue: 0,
        },       
        width: chartWidth,
        height: chartHeight
    };

    chart_div = document.getElementById('fin_effort_chart_div');
    chart = new google.visualization.BarChart(chart_div);

    // Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () {
        DISPLAY.charts.URIs.finEffort = chart.getImageURI();
    });

    chart.draw(data, options);
    DISPLAY.charts.isFinEffortChart = true;
}

//draw bar chart
function drawAlterToCarChart(chartWidth, chartHeight) {

    var chart, chart_div, char_data, chart_legend, chart_inner_width, bar_width, options, chart_content;
    var pt_array, uber_array;

    var c = pfto(CALCULATED.data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)
    var pt = CALCULATED.data.public_transports;
    var u = CALCULATED.uber;

    //boolean variables
    var pt_bool = isObjDef(pt) && pt.display_pt() && DISPLAY.result.public_transports; //public transports
    var u_bool = SWITCHES.uber && isObjDef(u) && DISPLAY.result.uber; //uber

    if(!pt_bool && !u_bool){
        return;
    }

    //it makes some strange arrays operations, because according to Google Charts
    //when one has stacked vertical bar charts, all the arrays, for each column must be the same size

    var legend = [
                    WORDS.parcel,
                    COUNTRY=="RU" || COUNTRY=="UA" ? WORDS.insurance_chart : WORDS.insurance_short,
                    WORDS.fuel,
                    WORDS.depreciation,
                    WORDS.credit_interests,
                    WORDS.inspection_short,
                    WORDS.maintenance,
                    WORDS.rep_improv,
                    WORDS.road_taxes_short,
                    WORDS.parking,
                    WORDS.tolls,
                    WORDS.fines,
                    WORDS.washing
                 ];

    var monthly_costs = [
                            WORDS.your_car_costs_you + ' ' + WORDS.word_per + ' ' + WORDS.month,
                            c.insurance,
                            c.fuel,
                            c.depreciation,
                            c.credit,
                            c.inspection,
                            c.maintenance,
                            c.repairs_improv,
                            c.car_tax,
                            c.parking,
                            c.tolls,
                            c.fines,
                            c.washing
                        ];



    //Public Transports
    if(pt_bool) {

        var taxi_text = WORDS.taxi_desl + " - " +
                        CALCULATED.data.public_transports.km_by_taxi.toFixed(1) + " " +
                        WORDS.std_dist_full + ' ' + WORDS.on_taxi_paying + " " +
                        CALCULATED.data.public_transports.taxi_price_per_km.toFixed(1) + " " +
                        WORDS.curr_name_plural + ' ' + WORDS.word_per + ' ' + WORDS.std_dist_full;

        pt_array = [
                    WORDS.publ_tra_equiv,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                   ];
        
        if(pt.display_other_pt) {
            legend.push(
                            WORDS.pub_trans_text,
                            taxi_text,
                            WORDS.other_pub_trans
                        );
            monthly_costs.push(0, 0, 0);
            pt_array.push(
                            pft(pt.total_price_pt),
                            pft(pt.taxi_cost),
                            pft(pt.other_pt)
                          );
        }
        else{
            legend.push(
                            WORDS.pub_trans_text,
                            taxi_text
                        );
            monthly_costs.push(0, 0);
            pt_array.push(
                            pft(pt.total_price_pt),
                            pft(pt.taxi_cost)
                         );
        }
    }

    //UBER
    if(u_bool){
        uber_array =
                        [
                            "UBER",
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ];

        if(pt_bool) {
            pt_array.push(0, 0);

            if(pt.display_other_pt) {
                uber_array.push(0, 0, 0);
            }
            else{
                uber_array.push(0, 0);
            }
        }

        if(u.result_type == 1){
            legend.push(
                            CALCULATED.uber.dpm.toFixed(0) + " " + WORDS.fuel_dist + ' ' + WORDS.word_per + ' ' + WORDS.month,
                            WORDS.other_pub_trans
                        );
            monthly_costs.push(0, 0);
            uber_array.push(
                                pft(u.tuc),
                                pft(u.delta)
                            );

        }
        //the case where uber equivalent is more expensive
        else if(u.result_type == 2){
            legend.push( WORDS.pub_trans_text,
                         CALCULATED.uber.dist_uber.toFixed(0) + " " + WORDS.std_dist_full + " " + WORDS.word_per + " " + WORDS.month );
            
            monthly_costs.push(0, 0);
            uber_array.push(
                                pft(u.tcpt),
                                pft(u.delta)
                            );
        }
    }

    legend.push({ role: 'annotation' });
    monthly_costs.push("");

    // Create and populate the data table
    chart_content = [legend, monthly_costs];
    if(pt.display_pt()) {
        pt_array.push("");
        chart_content.push(pt_array);
    }
    if(SWITCHES.uber && u){
        uber_array.push("");
        chart_content.push(uber_array);
    }

    //check if all the arrays into chart_content have the same size
    for (var i=1; i<chart_content.length; i++){
        if(chart_content[i].length != chart_content[i-1].length){
            console.error("arrays in chart_content do not have the same size");
            return;
        }
    }

    console.log(chart_content);
    char_data = google.visualization.arrayToDataTable(chart_content);
    // Create and draw the visualization.
    chart_div = document.getElementById('alternative_carcosts_chart_div');
    chart = new google.visualization.ColumnChart(chart_div);

    //Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () {
        DISPLAY.charts.URIs.alterToCar = chart.getImageURI();
    });

    //cross browser solution; if the window width is too small hides legend of chart
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(window_width < DISPLAY.charts.MIN_LEGEND){
        chart_inner_width = "100%";
    }
    else{
        chart_inner_width = "85%";
        bar_width = "70%"; //default value
    }

    options = {
                title: WORDS.costs,
                backgroundColor: {
                    fill: 'transparent'
                },
                chartArea: {
                    top: 5, 
                    width: chart_inner_width, 
                    height: "85%"
                },
                vAxis: { 
                    minValue: 0, 
                    textPosition: 'none'
                },
                legend: {
                    position: "none"
                },
                bar: { 
                    groupWidth: bar_width 
                },
                isStacked: true,       
                width: chartWidth,
                height: chartHeight
              };

    chart.draw(char_data, options);
    DISPLAY.charts.isAlterToCarChart = true;
}

//for chart display numeric purposes (value)
function pft(num){
    return parseFloat(num.toFixed(1));
}

//for chart display numeric purposes (entire object)
function pfto(obj){
    //rounds every element in object
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = parseFloat(obj[key].toFixed(1));
      }
    }
    return obj;
}
        
