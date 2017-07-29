<?php Header("content-type: application/x-javascript");
include_once($_SERVER['DOCUMENT_ROOT'].'/countries/' . $_GET['country'] . '.php');
$GLOBALS['country'] = $_GET['country'];
?>

//draw Pie Chart
function drawPieChart(a, b, c, d, e, f, g, h, i, j, k, l, char_width, char_height) {

    var data, char_data, options, chart;
	
    chart_data = [
        ['<? echo $PARCEL; ?>', '<? echo $COSTS; ?>' ],
        ['<?echo $GLOBALS['country'] ?>'=='RU' || '<?echo $GLOBALS['country']?>'=='UA' ? '<? echo $INSURANCE_CHART; ?>' : '<? echo $INSURANCE_SHORT; ?>', a],
        ['<? echo $FUEL; ?>', b],
        ['<? echo $DEPRECIATION; ?>', c],
        ['<? echo $CREDIT_INTERESTS; ?>', d],
        ['<? echo $INSPECTION_SHORT; ?>', e],
        ['<? echo $MAINTENANCE; ?>', f],
        ['<? echo $REP_IMPROV; ?>', g],
        ['<? echo $ROAD_TAXES_SHORT; ?>', h],
        ['<? echo $PARKING; ?>', i],
        ['<? echo $TOLLS; ?>', j],
        ['<?echo $FINES; ?>', k],
        ['<? echo $WASHING; ?>', l]
    ];

    data = google.visualization.arrayToDataTable(chart_data);

    options = {
        title: '<? echo $COSTS; ?>',
        backgroundColor: {fill: 'transparent'},
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
	
    chart.draw(data, options);
}

//draw bar chart
function drawBarChart(a, b, c, d, e, f, g, h, i, j, k, l, char_width, char_height) {
       
    var data, chart_legend, chart_inner_width, bar_width, options, char_data;
    
    // Create and populate the data table.
    chart_data = [
        ['<? echo $PARCEL; ?>', 
            '<?echo $GLOBALS['country'] ?>'=='RU' || '<?echo $GLOBALS['country']?>'=='UA' ? '<? echo $INSURANCE_CHART; ?>' : '<? echo $INSURANCE_SHORT; ?>', //a
            '<? echo $FUEL; ?>',             //b
            '<? echo $DEPRECIATION; ?>',     //c
            '<? echo $CREDIT_INTERESTS; ?>', //d
            '<? echo $INSPECTION_SHORT; ?>', //e
            '<? echo $MAINTENANCE; ?>',      //f
            '<? echo $REP_IMPROV; ?>',       //g
            '<? echo $ROAD_TAXES_SHORT; ?>', //h
            '<? echo $PARKING; ?>',          //i      
            '<? echo $TOLLS; ?>',            //j
            '<?echo $FINES; ?>',             //k
            '<? echo $WASHING; ?>',          //l
            { role: 'annotation' } ],
        ['<? echo $FIXED_COSTS; ?>',   a, 0, c, d, e, (f/2), 0, 0, 0, 0, 0, 0, ''],
        ['<? echo $RUNNING_COSTS; ?>', 0, b, 0, 0, 0, (f/2), g, h, i, j, k, l, '']
    ];
    //alert(JSON.stringify(chart_data, null, 4));
    
    data = google.visualization.arrayToDataTable(chart_data);
    
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
    	
    chart1.draw(data, options);
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
function drawAlterToCarChart(a, b, c, d, e, f, g, h, i, j, k, l, char_width, char_height) {
       
    var data, chart_legend, chart_inner_width, bar_width, options, char_data;
    
    // Create and populate the data table.
    chart_data = [
        ['<? echo $PARCEL; ?>', 
            '<?echo $GLOBALS['country'] ?>'=='RU' || '<?echo $GLOBALS['country']?>'=='UA' ? '<? echo $INSURANCE_CHART; ?>' : '<? echo $INSURANCE_SHORT; ?>', //a
            '<? echo $FUEL; ?>',             //b
            '<? echo $DEPRECIATION; ?>',     //c
            '<? echo $CREDIT_INTERESTS; ?>', //d
            '<? echo $INSPECTION_SHORT; ?>', //e
            '<? echo $MAINTENANCE; ?>',      //f
            '<? echo $REP_IMPROV; ?>',       //g
            '<? echo $ROAD_TAXES_SHORT; ?>', //h
            '<? echo $PARKING; ?>',          //i      
            '<? echo $TOLLS; ?>',            //j
            '<?echo $FINES; ?>',             //k
            '<? echo $WASHING; ?>',          //l
            { role: 'annotation' } ],
        ['<? echo $FIXED_COSTS; ?>',   a, 0, c, d, e, (f/2), 0, 0, 0, 0, 0, 0, ''],
        ['<? echo $RUNNING_COSTS; ?>', 0, b, 0, 0, 0, (f/2), g, h, i, j, k, l, '']
    ];
    //alert(JSON.stringify(chart_data, null, 4));
    
    data = google.visualization.arrayToDataTable(chart_data);
    
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
        chartArea: { left: 0, top: 0, width: chart_inner_width, height: "90%"},
        vAxis: { minValue: 0},
        legend: {position: chart_legend },
        bar: { groupWidth: bar_width },
        isStacked: true,
        width: char_width,
        height: char_height
    };
    	
    chart1.draw(data, options);
}