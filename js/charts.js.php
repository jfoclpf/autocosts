<?php Header("content-type: application/x-javascript");
if(strlen($_GET['country']) != 2){ exit;} //avoids code injection ensuring that input has only two characters (country code)
include_once($_SERVER['DOCUMENT_ROOT'].'/countries/' . $_GET['country'] . '.php');
$GLOBALS['country'] = $_GET['country'];
?>

//draw Pie Chart
function drawMonthlyCostsPieChart(data, char_width, char_height) {

    var char_data, options, chart, chart_content;
    var c = pfto(data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)
	
    chart_content = [
                        ["<?php echo $PARCEL; ?>", "<?php echo $COSTS; ?>" ],
                        [COUNTRY=='RU' || COUNTRY=="UA" ? "<? echo $INSURANCE_CHART; ?>" : "<? echo $INSURANCE_SHORT; ?>", c.insurance],
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
        width: char_width,
        height: char_height
    };
	
    var chart_div = document.getElementById('pie_chart_div');
    chart = new google.visualization.PieChart(chart_div);	      

    // Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () {
		var img_div =  document.getElementById('img_pie_chart_div');
        img_div.innerHTML = '<img alt="chart" src="' + chart.getImageURI() + '">';
    });
	
    chart.draw(char_data, options);
}

//draw bar chart
function drawMonthlyCostsBarChart(data, char_width, char_height) {
       
    var char_data, chart_legend, chart_inner_width, bar_width, chart_content, options;
    var c = pfto(data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)
    
    // Create and populate the data table.
    chart_content = [
                        [   
                            "<?php echo $PARCEL; ?>", 
                            COUNTRY=="RU" || COUNTRY=="UA" ? "<? echo $INSURANCE_CHART; ?>" : "<? echo $INSURANCE_SHORT; ?>",
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
    console.log("drawMonthlyCostsBarChart", JSON.stringify(chart_content, null, 4));
    
    char_data = google.visualization.arrayToDataTable(chart_content);
    
    // Create and draw the visualization.
	var chart_div = document.getElementById('bar_chart_div');
    var chart1 = new google.visualization.ColumnChart(chart_div);
	
	//Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart1, 'ready', function () {
		var img_div =  document.getElementById('img_bar_chart_div');
        img_div.innerHTML = '<img alt="chart" src="' + chart1.getImageURI() + '">';        
    });
	
    //cross browser solution; if the window width is too small hides legend of chart
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(window_width < 425){
        chart_legend = "none";
        chart_inner_width = "100%";
    }
    else{
        chart_legend = "right";
        chart_inner_width = "60%";
        bar_width = "61.8%"; //default value
    }
        
    options = {
        title: "<? echo $COSTS; ?>",
        backgroundColor: {fill: 'transparent'},
        chartArea: { left: 0, top: 0, width: chart_inner_width, height: "90%"},
        vAxis: { minValue: 0},
        legend: {position: chart_legend },
        bar: { groupWidth: bar_width },
        isStacked: true,
        width: char_width,
        height: char_height
    };
    	
    chart1.draw(char_data, options);
}

//draws horizontal bars chart for Financial Effort
function drawFinEffortChart(total_cost_per_year, net_income_per_year, char_width, char_height){
    
    var chart_data, data, options, chart, br_html, top_var, chart_inner_height;
    
    chart_data = [
         ['','<? echo $NET_INCOME_PER." ".$YEAR; ?>', '<? echo $TOTAL_COSTS_PER_YEAR; ?>'],
         ['', net_income_per_year, total_cost_per_year],
    ];
    
    data = google.visualization.arrayToDataTable(chart_data);
    
    //cross browser solution; if the window width is too small hides legend of chart
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(window_width < 425){
        br_html = '\n';
        chart_inner_height = "60%";
        top_var = 0;
    }
    else{
        br_html = '';
        chart_inner_height = "90%";
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
        width: char_width,
        height: char_height
    };
	
    var chart_div = document.getElementById('fin_effort_chart_div');
    chart = new google.visualization.BarChart(chart_div);	      

    // Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () {
		var img_div =  document.getElementById('img_fin_effort_chart_div');
        img_div.innerHTML = '<img alt="chart" src="' + chart.getImageURI() + '">';        
    });
	
    chart.draw(data, options);
}

//draw bar chart
function drawAlterToCarChart(data, res_uber_obj, char_width, char_height) {
    
    var char_data, chart_legend, chart_inner_width, bar_width, options, chart_content;
    var c = pfto(data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)
    var pt = data.public_transports;
    var u = res_uber_obj;

    //it makes some strange arrays operations, because according to Google Charts
    //when one has stacked vertical bar charts, all the arrays, for each column must be the same size
    
    var legend = [
                    "<?php echo $PARCEL; ?>",
                    COUNTRY == "RU" || COUNTRY =="UA" ? "<?php echo $INSURANCE_CHART; ?>" : "<?php echo $INSURANCE_SHORT; ?>",
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
    if(data.public_transports.display_pt()) {
        var pt_array = 
                        [
                            "<?php echo $PUBL_TRA_EQUIV; ?>",
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0                        
                        ];
        if(data.public_transports.display_other_pt) {
            legend.push(
                            "<?php echo $PUB_TRANS_TEXT ?>",
                            "<?php echo $TAXI_DESL ?>",
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
                            "<?php echo $TAXI_DESL ?>"
                        );
            monthly_costs.push(0, 0);
            pt_array.push(
                            pft(pt.total_price_pt),
                            pft(pt.taxi_cost)                            
                         );            
        }
    }
    
    //UBER
    if(UBER_SWITCH && u){
        var uber_array = 
                        [
                            "UBER",
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0                        
                        ];
        if(data.public_transports.display_pt()) {
            if(data.public_transports.display_other_pt) {
                uber_array.push(0, 0, 0);
            }
            else{
                uber_array.push(0, 0);
            }
        }
        
        pt_array.push(0, 0);
        
        if(u.result_type == 1){
            legend.push( 
                            "<?php echo $COSTS.' - '.$WORD_TOTAL_CAP ?>",
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
                            "<?php echo $PASS_MONTH_AVG ?>",
                            "<?php echo $COSTS.' - '.$WORD_TOTAL_CAP ?>"
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
    if(data.public_transports.display_pt()) {
        pt_array.push("");
        chart_content.push(pt_array);     
    }
    if(UBER_SWITCH && u){
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
    console.log("drawAlterToCarChart", JSON.stringify(chart_content, null, 4));
    
    char_data = google.visualization.arrayToDataTable(chart_content);
    // Create and draw the visualization.
	var chart_div = document.getElementById('alternative_carcosts_chart_div');
    var chart1 = new google.visualization.ColumnChart(chart_div);
	
	//Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart1, 'ready', function () {
		var img_div =  document.getElementById('img_alternative_carcosts_chart_div');
        img_div.innerHTML = '<img alt="chart" src="' + chart1.getImageURI() + '">';        
    });
	
    //cross browser solution; if the window width is too small hides legend of chart
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(window_width < 425){
        chart_legend = "none";
        chart_inner_width = "100%";
    }
    else{
        chart_legend = "right";
        chart_inner_width = "60%";
        bar_width = "61.8%"; //default value
    }
        
    options = {
                title: "<? echo $COSTS; ?>",
                backgroundColor: {fill: 'transparent'},
                chartArea: {width: chart_inner_width, height: "90%"},
                vAxis: { minValue: 0},
                legend: {position: 'none'},
                bar: { groupWidth: bar_width },
                isStacked: true,
                width: char_width,
                height: char_height
              };
    	
    chart1.draw(char_data, options);
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