//the majortiy of the code is run server side, to improve page loading speed
//see node file server/stats.js

var chartData = document.getElementById('chart');
var chartContent   = JSON.parse(decodeURI(chartData.dataset.chart_content));

new Chart(overallStatsChart, chartContent);