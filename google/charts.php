<?php Header("content-type: application/x-javascript");
include($_SERVER['DOCUMENT_ROOT'].'/countries/' . $_GET['country'] . '.php');
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
        backgroundColor: {stroke: '#F0F0F0', fill: '#F0F0F0', strokeWidth: 3},
        chartArea: {left: 0, top: 0, width: "90%", height: "90%"},
        width: char_width,
        height: char_height
    };
	
    var chart_div = document.getElementById('pie_chart_div');
    chart = new google.visualization.PieChart(chart_div);	      

    // Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () {
		var img_div =  document.getElementById('img1');
        img_div.innerHTML = '<img src="' + chart.getImageURI() + '">';        
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
	
	// Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart1, 'ready', function () {
		var img_div =  document.getElementById('img2');
        img_div.innerHTML = '<img src="' + chart1.getImageURI() + '">';        
    });
	
    //cross browser solution; if the window width is too small hides legend of chart
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(window_width < 450){
        chart_legend = "none";
        chart_inner_width = "100%";
        bar_width = "20"; //when the window width is too small the bar width shall be 20px
    }
    else{
        chart_legend = "right";
        chart_inner_width = "60%";
        bar_width = "61.8%"; //default value
    }
        
    options = {
        title: "<? echo $COSTS; ?>",
        backgroundColor: {stroke: '#F0F0F0', fill: '#F0F0F0', strokeWidth: 3},
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