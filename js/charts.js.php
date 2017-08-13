<?php Header("content-type: application/x-javascript");
if(strlen($_GET['country']) != 2){ exit;} //avoids code injection ensuring that input has only two characters (country code)
include_once($_SERVER['DOCUMENT_ROOT'].'/countries/' . $_GET['country'] . '.php');
include_once($_SERVER['DOCUMENT_ROOT'].'/php/minifier.php');
$GLOBALS['country'] = $_GET['country'];
ob_start();?>

//draw Pie Chart
function drawMonthlyCostsPieChart(chartWidth, chartHeight) {

    var chart, chart_div, char_data, options, chart_content;
    var c = pfto(CALCULATED.data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)

    //checks if depreciation is greater or equal to zero, to print chart with no error
	if (c.depreciation < 0){
        c.depreciation = 0;
    }

    chart_content = [
                        ["<?php echo $PARCEL; ?>", "<?php echo $COSTS; ?>" ],
                        [COUNTRY=='RU' || COUNTRY=="UA" ? "<?php echo $INSURANCE_CHART; ?>" : "<?php echo $INSURANCE_SHORT; ?>", c.insurance],
                        ["<?php echo $FUEL; ?>",                    c.fuel],
                        ["<?php echo $DEPRECIATION; ?>",            c.depreciation],
                        ["<?php echo $CREDIT_INTERESTS; ?>",        c.credit],
                        ["<?php echo $INSPECTION_SHORT; ?>",        c.inspection],
                        ["<?php echo $MAINTENANCE; ?>",             c.maintenance],
                        ["<?php echo $REP_IMPROV; ?>",              c.repairs_improv],
                        ["<?php echo $ROAD_TAXES_SHORT; ?>",        c.car_tax],
                        ["<?php echo $PARKING; ?>",                 c.parking],
                        ["<?php echo $TOLLS; ?>",                   c.tolls],
                        ["<?php echo $FINES; ?>",                   c.fines],
                        ["<?php echo $WASHING; ?>",                 c.washing]
                    ];

    char_data = google.visualization.arrayToDataTable(chart_content);

    options = {
        title: "<?php echo $COSTS; ?>",
        backgroundColor: {fill: "transparent"},
        chartArea: {left: 0, top: 0, width: "90%", height: "90%"},
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
                            "<?php echo $PARCEL; ?>",
                            COUNTRY=="RU" || COUNTRY=="UA" ? "<?php echo $INSURANCE_CHART; ?>" : "<?php echo $INSURANCE_SHORT; ?>",
                            "<?php echo $FUEL; ?>",
                            "<?php echo $DEPRECIATION; ?>",
                            "<?php echo $CREDIT_INTERESTS; ?>",
                            "<?php echo $INSPECTION_SHORT; ?>",
                            "<?php echo $MAINTENANCE; ?>",
                            "<?php echo $REP_IMPROV; ?>",
                            "<?php echo $ROAD_TAXES_SHORT; ?>",
                            "<?php echo $PARKING; ?>",
                            "<?php echo $TOLLS; ?>",
                            "<?php echo $FINES; ?>",
                            "<?php echo $WASHING; ?>",
                            { role: 'annotation' }
                        ],
                        [
                            "<?php echo $FIXED_COSTS; ?>",
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
                            "<?php echo $RUNNING_COSTS; ?>",
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
        title: "<?php echo $COSTS; ?>",
        backgroundColor: {fill: 'transparent'},
        chartArea: { left: 0, top: 0, width: chart_inner_width, height: "90%"},
        vAxis: { minValue: 0},
        legend: {position: chart_legend },
        bar: { groupWidth: bar_width },
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
         ['','<?php echo $NET_INCOME_PER." ".$YEAR; ?>', '<?php echo $TOTAL_COSTS_PER_YEAR; ?>'],
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
        backgroundColor: {fill: 'transparent'},
        chartArea: {top: top_var, width: "90%", height: chart_inner_height},
        legend: { position: 'none' },
        vAxis: { textPosition: 'none' },
        hAxis: {
          title: '<?php echo $NET_INCOME_PER." ".$YEAR." vs. ' + br_html + '".$TOTAL_COSTS_PER_YEAR." "."(".$CURR_NAME_PLURAL.")" ?>',
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
                    "<?php echo $PARCEL; ?>",
                    COUNTRY == "RU" || COUNTRY == "UA" ? "<?php echo $INSURANCE_CHART; ?>" : "<?php echo $INSURANCE_SHORT; ?>",
                    "<?php echo $FUEL; ?>",
                    "<?php echo $DEPRECIATION; ?>",
                    "<?php echo $CREDIT_INTERESTS; ?>",
                    "<?php echo $INSPECTION_SHORT; ?>",
                    "<?php echo $MAINTENANCE; ?>",
                    "<?php echo $REP_IMPROV; ?>",
                    "<?php echo $ROAD_TAXES_SHORT; ?>",
                    "<?php echo $PARKING; ?>",
                    "<?php echo $TOLLS; ?>",
                    "<?php echo $FINES; ?>",
                    "<?php echo $WASHING; ?>"
                 ];

    var monthly_costs = [
                            "<?php echo $YOUR_CAR_COSTS_YOU." ".$WORD_PER." ".$MONTH ?>",
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

        var taxi_text = "<?php echo $TAXI_DESL ?>" + " - " +
                        CALCULATED.data.public_transports.km_by_taxi.toFixed(1) + " " +
                        "<?php echo $STD_DIST_FULL .' '.$ON_TAXI_PAYING ?>" + " " +
                        CALCULATED.data.public_transports.taxi_price_per_km.toFixed(1) + " " +
                        "<?php echo $CURR_NAME_PLURAL.' '.$WORD_PER.' '.$STD_DIST_FULL ?>";

        pt_array =
                        [
                            "<?php echo $PUBL_TRA_EQUIV; ?>",
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ];
        if(pt.display_other_pt) {
            legend.push(
                            "<?php echo $PUB_TRANS_TEXT ?>",
                            taxi_text,
                            "<?php echo $OTHER_PUB_TRANS ?>"
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
                            "<?php echo $PUB_TRANS_TEXT ?>",
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
                            CALCULATED.uber.dpm.toFixed(0) + " " + "<?php echo $FUEL_DIST.' '.$WORD_PER.' '.$MONTH ?>",
                            "<?php echo $OTHER_PUB_TRANS ?>"
                        );
            monthly_costs.push(0, 0);
            uber_array.push(
                                pft(u.tuc),
                                pft(u.delta)
                            );

        }
        //the case where uber equivalent is more expensive
        else if(u.result_type == 2){
            legend.push(
                            "<?php echo $PUB_TRANS_TEXT ?>",
                            CALCULATED.uber.dist_uber.toFixed(0) + " " + "<?php echo $STD_DIST_FULL.' '.$WORD_PER.' '.$MONTH ?>"
                        );
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
    chart_content = [legend, monthly_costs ];
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
                title: "<?php echo $COSTS; ?>",
                backgroundColor: {fill: 'transparent'},
                chartArea: {top: 5, width: chart_inner_width, height: "85%"},
                vAxis: { minValue: 0, textPosition: 'none'},
                legend: {position: "none"},
                bar: { groupWidth: bar_width },
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
        
<?php
use MatthiasMullie\Minify;
$javascriptContent = ob_get_clean();
$minifier = new Minify\JS($javascriptContent);
echo $minifier->minify();
?>