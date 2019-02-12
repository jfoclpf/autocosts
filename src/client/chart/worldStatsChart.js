// the majortiy of the code is run server side, to improve page loading speed
// see node file server/stats.js

/* globals $, Chart */

(function () {
  var EURsymbol = '\u20AC'

  // get WORDS
  var globalVariables = document.getElementById('global_variables')
  var WORDS = JSON.parse(decodeURI(globalVariables.dataset.words))

  // get statistical data
  var statsDataEl = document.getElementById('chart')
  var statsData = JSON.parse(decodeURI(statsDataEl.dataset.stats_data))
  var statsLabels = JSON.parse(decodeURI(statsDataEl.dataset.stats_labels)) // the analyzed countries (2 letter Country Codes)

  // gives 50px of height for every  horizontal bar
  var nmbrOfCountries = statsLabels.length
  $('.worldStats-car-costs-chart').height(50 * nmbrOfCountries)

  var costsColors = {
    depreciation: '#2ba3d6',
    insurance: '#10c6e6',
    credit: '#5ae0e2',
    inspection: '#99e6bc',
    roadTaxes: '#ffda70',
    fuel: '#ff9e84',
    maintenance: '#ff7192',
    repairsImprovements: '#e562aa',
    parking: '#ea90cd',
    tolls: '#eabcef',
    fines: '#9f97ef',
    washing: '#867ae3'
  }

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
      data: statsData.roadTaxes,
      backgroundColor: costsColors.roadTaxes
    }, {
      label: WORDS.maintenance,
      data: statsData.maintenance,
      backgroundColor: costsColors.maintenance
    }, {
      label: WORDS.rep_improv,
      data: statsData.repairsImprovements,
      backgroundColor: costsColors.repairsImprovements
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
  ]

  var options = {
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        usePointStyle: true,
        fontSize: 10,
        fontColor: '#868790'
      }
    },
    scales: {
      xAxes: [{
        stacked: true, // this should be set to make the bars stacked
        ticks: {
          beginAtZero: true,
          fontSize: 12,
          // Include a currency sign in the ticks
          callback: function (value, index, values) {
            return EURsymbol + value
          }
        }
      }],
      yAxes: [{
        stacked: true, // this also..
        ticks: {
          fontSize: 12
        }
      }]
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || ''

          if (label) {
            label += ': '
          }
          label += EURsymbol + tooltipItem.xLabel.toFixed(0)
          return label
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'linear'
    }
  }

  var chartContent = {
    type: 'horizontalBar',
    data: {
      labels: statsLabels,
      datasets: dataset
    },
    options: options
  }

  new Chart('worldStatsChart', chartContent) // eslint-disable-line
})()
