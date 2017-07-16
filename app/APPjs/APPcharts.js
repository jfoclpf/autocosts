var PIE_CHART, BAR_CHART;

function displayCharts(){
    displayPieChart();
    displayBarChart();
}

//#######################################################################
//Pie Chart
function displayPieChart(){
    
    var L = CountryLangObj; //Language Object
    var c = CalculatedData.monthly_costs; //Monthly costs object of calculated data
    //rounds every element 
    for (var key in c) {
      if (c.hasOwnProperty(key)) {
        c[key] = parseFloat(c[key].toFixed(1));
      }
    }
    
    //always creates a new chart
    if (typeof PIE_CHART !== 'undefined'){
        PIE_CHART.destroy();    
        delete PIE_CHART;
    }
    
    var labels = [
                    L.depreciation_st, 
                    L.insurance_short, 
                    L.credit, 
                    L.inspection_short, 
                    L.road_taxes_short, 
                    L.maintenance, 
                    L.fuel, 
                    L.rep_improv,
                    L.parking, 
                    L.tolls, 
                    L.fines, 
                    L.washing
                 ];

    var dataset = [{ 
                    label: L.costs,
                    data: [
                            c.depreciation, 
                            c.insurance, 
                            c.credit, 
                            c.inspection, 
                            c.car_tax, 
                            c.maintenance, 
                            c.fuel, 
                            c.repairs_improv, 
                            c.parking,
                            c.tolls, 
                            c.fines, 
                            c.washing
                          ],                       
                    backgroundColor: [
                                        'navy',
                                        'blue',
                                        'aqua',
                                        'teal',
                                        'olive',
                                        'green',
                                        'maroon',
                                        'lime',                        
                                        'yellow',
                                        'orange',
                                        'red', 
                                        'purple'
                                      ]
                    }];

    var content = {
        type: 'pie',
        data: {
            labels: labels,
            datasets: dataset
        }
    };

    PIE_CHART = new Chart(pieChart, content);
    
}

//#######################################################################
//Stacked Bar Chart
function displayBarChart(){

    var L = CountryLangObj; //Language Object
    var c = CalculatedData.monthly_costs; //Monthly costs object of calculated data    
    //rounds every element 
    
    for (var key in c) {
      if (c.hasOwnProperty(key)) {
        c[key] = parseFloat(c[key].toFixed(1));
      }
    }
    
    //always creates a new chart
    if (typeof BAR_CHART !== 'undefined'){
        BAR_CHART.destroy();    
        delete BAR_CHART;
    }
    
    var labels = [L.fixed_costs, L.running_costs];

    var dataset = [
                      //standing costs
                      {
                         label: L.depreciation_st,
                         data: [c.depreciation, 0],
                         backgroundColor: 'navy'
                      }, {
                         label: L.insurance_short,
                         data: [c.insurance, 0],
                         backgroundColor: 'blue'
                      }, {
                         label: L.credit,
                         data: [c.credit, 0],
                         backgroundColor: 'aqua'
                      }, {
                         label: L.inspection_short,
                         data: [c.inspection, 0],
                         backgroundColor: 'teal'
                      }, {
                         label: L.road_taxes_short,
                         data: [c.car_tax, 0],
                         backgroundColor: 'olive'
                      }, {
                         label: L.maintenance,
                         data: [(1/2*c.maintenance), 0],
                         backgroundColor: 'green'
                      },
                      //running costs    
                      {
                         label: L.rep_improv,
                         data: [0, c.repairs_improv],
                         backgroundColor: 'lime'
                      }, {
                         label: L.fuel,
                         data: [0, c.fuel],
                         backgroundColor: 'maroon'
                      }, {                          
                         label: L.parking,
                         data: [0, c.parking],
                         backgroundColor: 'yellow'
                      }, {
                         label: L.tolls,
                         data: [0, c.tolls],
                         backgroundColor: 'orange'
                      }, {
                         label: L.fines,
                         data: [0, c.fines],
                         backgroundColor: 'red'
                      }, {
                         label: L.washing,
                         data: [0, c.washing],
                         backgroundColor: 'purple'
                      }, {
                         label: L.maintenance,
                         data: [0, (1/2*c.maintenance)],
                         backgroundColor: 'green'
                      }
                    ];

    var options = {
                      legend: {
                         position: 'right', // place legend on the right side of chart
                         labels : {
                             fontSize: 9,
                             fontColor: 'black'
                         }
                      },
                      scales: {
                         xAxes: [{
                            stacked: true // this should be set to make the bars stacked
                         }],
                         yAxes: [{
                            stacked: true // this also..
                         }]
                      }
                   };

    var content = {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: dataset
                    },
                    options
                  }; 

    BAR_CHART = new Chart(barChart, content);    

}