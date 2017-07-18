var PIE_CHART, BAR_CHART, FINEFF_CHART, ALTERN_TO_CARCOSTS;

function displayCharts(){
    
    displayPieChart();
    displayBarChart();
    
    if(CalculatedData.fin_effort_calculated){
        displayFinEffChart();
    }
    
    if(CalculatedData.public_transports_calculated && CalculatedData.public_transports.display_pt()){
        displayAlternToCarCostsChart();
    }    

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
                         display: false, //do not display
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
                            beginAtZero: true
                         }]
                      }
                   };

    var content = {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: dataset
                    },
                    options: options
                  }; 

    BAR_CHART = new Chart(barChart, content);    

}

function displayFinEffChart(){
    
    var L = CountryLangObj; //Language Object
    var c = CalculatedData.fin_effort; //Financial object of calculated data
    
    //always creates a new chart
    if (typeof FINEFF_CHART !== 'undefined'){
        FINEFF_CHART.destroy();    
        delete FINEFF_CHART;
    }    

    var labels = [formatLabel(L.net_income_per + " " + L.year, 20), formatLabel(L.total_costs_per_year, 20)];

    var dataset = [                      
                      {
                         label: L.costs,
                         data: [
                                parseFloat(c.income_per_year.toFixed(0)), 
                                parseFloat(c.total_costs_year.toFixed(0))
                         ],
                         backgroundColor:[
                                           'blue', 
                                           'red'
                                         ]
                       }
                  ];
    
    var options =  {
                       legend: {
                                display: false
                               },
                       scales: {
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontSize: 9
                                    }
                                }]                                
                               }                             
                   };
    
    var content = {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: dataset
        },
        options: options
    };    
    
    FINEFF_CHART = new Chart(FinEffChart, content); 
   
}

//#######################################################################
//Stacked Bar Chart
function displayAlternToCarCostsChart(){

    var L = CountryLangObj; //Language Object
    var p = CalculatedData.public_transports; //Public Transports object 
    var c = CalculatedData.monthly_costs; //Monthly costs object 
    //rounds every element   
    for (var key in c) {
      if (c.hasOwnProperty(key)) {
        c[key] = parseFloat(c[key].toFixed(1));
      }
    }
    
    //always creates a new chart
    if (typeof ALTERN_TO_CARCOSTS !== 'undefined'){
        ALTERN_TO_CARCOSTS.destroy();    
        delete ALTERN_TO_CARCOSTS;
    }
    
    var labels = [formatLabel(L.your_car_costs_you + " " + L.word_per + " " + L.month, 25), formatLabel(L.publ_tra_equiv, 25)];

    var dataset = [
                       //Public Transports
                      {
                         label: L.other_pub_trans,
                         data: [0, parseFloat(p.other_pt.toFixed(1))],
                         backgroundColor: 'fuchsia'
                      }, {
                         label: L.taxi_desl,
                         data: [0, parseFloat(p.taxi_cost.toFixed(1))],
                         backgroundColor: '#b3b300'
                      }, {
                         label: L.pub_trans_text,
                         data: [0, parseFloat(p.total_price_pt.toFixed(1))],
                         backgroundColor: '#006600'
                      },              
        
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
                         data: [c.maintenance, 0],
                         backgroundColor: 'green'
                      },
                      //running costs    
                      {
                         label: L.rep_improv,
                         data: [c.repairs_improv, 0],
                         backgroundColor: 'lime'
                      }, {
                         label: L.fuel,
                         data: [c.fuel, 0],
                         backgroundColor: 'maroon'
                      }, {                          
                         label: L.parking,
                         data: [c.parking, 0],
                         backgroundColor: 'yellow'
                      }, {
                         label: L.tolls,
                         data: [c.tolls, 0],
                         backgroundColor: 'orange'
                      }, {
                         label: L.fines,
                         data: [c.fines, 0],
                         backgroundColor: 'red'
                      }, {
                         label: L.washing,
                         data: [c.washing, 0],
                         backgroundColor: 'purple'
                      }
                    ];
    
    //removes first item from dataset, related to Public Transports bar, if it's not applicable
    if(!p.display_other_pt){
        dataset.splice(0, 1);
    }

    var options = {
                      scales: {
                         xAxes: [{
                            stacked: true, // this should be set to make the bars stacked
                            ticks: {
                                beginAtZero: true
                            }                             
                         }],
                         yAxes: [{
                            stacked: true, // this also..
                            ticks: {
                                beginAtZero: true
                            }
                         }]
                      }
                   };

    var content = {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: dataset
                    },
                    options: options
                  }; 

    ALTERN_TO_CARCOSTS = new Chart(AlterToCarCostsChart, content);    

}


/* takes a string phrase and breaks it into separate phrases 
   no bigger than 'maxwidth' (in the number of characters), breaks are made at complete words.*/

function formatLabel(str, maxwidth){
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function(item, index){
        if(temp.length > 0)
        {
            var concat = temp + ' ' + item;

            if(concat.length > maxwidth){
                sections.push(temp);
                temp = "";
            }
            else{
                if(index == (words.length-1))
                {
                    sections.push(concat);
                    return;
                }
                else{
                    temp = concat;
                    return;
                }
            }
        }

        if(index == (words.length-1))
        {
            sections.push(item);
            return;
        }

        if(item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
}
