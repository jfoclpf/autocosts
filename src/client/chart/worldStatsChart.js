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

  // statsLabels is an array of country codes, ordered by highest total cost
  // f.ex: ["DK", "SE", "FR", "IT", "FI", ... ]
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
      label: WORDS.depreciation_st, // a string in English
      data: statsData.depreciation, // an array of values
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
      },
      onClick: function (evt, item) {
        Chart.defaults.global.legend.onClick.call(this, evt, item)
        orderStatsData()
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
        stacked: true, // this is also needed for the stacked bars
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

  var statsChart = new Chart('worldStatsChart', chartContent) // eslint-disable-line

  // this function sorts the countries in the world stats chart, according to the total costs
  // for each country, but only considering the selected, i.e., turned on, car cost items on the chart legend
  const orderStatsData = function () {
    // get the total costs for each country considering only the visible cost items
    // selectable on the chart legend. On the chart legend the cost items can be turned on/off
    var numberOfCostItems = dataset.length
    var totalCostsPerCountry = [] // total costs per country only considering selected cost items
    for (var i = 0; i < nmbrOfCountries; i++) {
      var totalSelectedCostsPerCountry = 0
      for (var costIndex = 0; costIndex < numberOfCostItems; costIndex++) {
        if (statsChart.isDatasetVisible(costIndex)) {
          totalSelectedCostsPerCountry += dataset[costIndex].data[i]
        }
      }
      totalCostsPerCountry[i] = totalSelectedCostsPerCountry
    }

    // now creates a map object and sorts it, keeping the old index of countries
    // to further sort the arrays of dataset
    var mapped = totalCostsPerCountry.map(function (el, i) {
      return { index: i, country: statsLabels[i], value: el }
    })
    mapped.sort(function (a, b) {
      return b.value - a.value
    })

    // now sorts the dataset, which have the costs items, based on the map
    for (costIndex = 0; costIndex < numberOfCostItems; costIndex++) {
      dataset[costIndex].data = mapped.map(function (el) {
        return dataset[costIndex].data[el.index]
      })
    }

    statsLabels = mapped.map(function (el) {
      return statsLabels[el.index]
    })

    statsChart.data.labels = statsLabels
    statsChart.data.datasets = dataset
    statsChart.update()
  }
})()
