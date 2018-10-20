//the majortiy of the code is run server side, to improve page loading speed
//see node file server/stats.js

var EURcurr = "\u20AC";

//get WORDS
var globalVariables = document.getElementById('global_variables');
var WORDS           = JSON.parse(decodeURI(globalVariables.dataset.words));

//get statistical data
var statsDataEl = document.getElementById('chart');
var statsData   = JSON.parse(decodeURI(statsDataEl.dataset.stats_data));
var statsLabels = JSON.parse(decodeURI(statsDataEl.dataset.stats_labels));

var costsColors = {        
    depreciation:   '#2ba3d6',
    insurance:      '#10c6e6',
    credit:         '#5ae0e2',
    inspection:     '#99e6bc',
    car_tax:        '#ffda70',
    fuel:           '#ff9e84',
    maintenance:    '#ff7192',
    repairs_improv: '#e562aa',
    parking:        '#ea90cd',
    tolls:          '#eabcef',
    fines:          '#9f97ef',
    washing:        '#867ae3'        
};

var dataset = [
    {
        label: WORDS.depreciation_st,
        data: statsData.depreciation,
        backgroundColor: costsColors.depreciation
    }, {
        label: WORDS.insurance_short,
        data: statsData.insurance,
        backgroundColor: costsColors.insurance
    }, {
        label: WORDS.credit,
        data: statsData.credit,
        backgroundColor: costsColors.credit
    }, {
        label: WORDS.inspection_short,
        data: statsData.inspection,
        backgroundColor: costsColors.inspection
    }, {
        label: WORDS.road_taxes_short,
        data: statsData.car_tax,
        backgroundColor: costsColors.car_tax
    }, {
        label: WORDS.maintenance,
        data: statsData.maintenance,
        backgroundColor: costsColors.maintenance
    }, {
        label: WORDS.rep_improv,
        data: statsData.repairs_improv,
        backgroundColor: costsColors.repairs_improv
    }, {
        label: WORDS.fuel,
        data: statsData.fuel,
        backgroundColor: costsColors.fuel
    }, {
        label: WORDS.parking,
        data: statsData.parking,
        backgroundColor: costsColors.parking
    }, {
        label: WORDS.tolls,
        data: statsData.tolls,
        backgroundColor: costsColors.tolls
    }, {
        label: WORDS.fines,
        data: statsData.fines,
        backgroundColor: costsColors.fines
    }, {
        label: WORDS.washing,
        data: statsData.washing,
        backgroundColor: costsColors.washing
    }
];                

var options = {
    maintainAspectRatio: false,
    legend: {
        position: 'bottom', // place legend on the right side of chart
        display: true, //do not display
        labels : {
            fontSize: 9,
            fontColor: 'black'
        }
    },
    scales: {
        xAxes: [{
            stacked: true, // this should be set to make the bars stacked
            beginAtZero: true
        }],
        yAxes: [{
            stacked: true, // this also..
            beginAtZero: true,
            ticks: {
                beginAtZero: true,
                fontSize: 9,
                // Include a currency sign in the ticks
                callback: function(value, index, values) {
                    return EURcurr + value;
                }
            } 
        }]
    },
    tooltips: {
        enabled: true,
        callbacks: {
            label: function(tooltipItem, data) {
                return EURcurr + tooltipItem.yLabel.toFixed(0);
            }
        }
    }, 
    animation: {
        duration : 1000,
        easing : 'linear'
    }
};

var chartContent = {
    type: 'bar',
    data: {
        labels: statsLabels,
        datasets: dataset
    },
    options: options
};        

new Chart(overallStatsChart, chartContent);

