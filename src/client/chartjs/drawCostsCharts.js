/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with Javascript Charts Functions */

//draw all charts
function drawCharts(){

    drawMonthlyCostsPieChart();
    drawMonthlyCostsBarChart();

    //draw Financial Effort Chart
    if(CALCULATED.data.fin_effort_calculated){//if the financial effort was calculated   
        drawFinEffortChart();
    }

    //draw Alternative to Car Costs Chart
    if(CALCULATED.data.alternative_to_car_costs_calculated){//if the alternative to car transports were calculated
        drawAlterToCarChart();
    }
}

//draw Pie Chart
function drawMonthlyCostsPieChart() {

    var c = pfto(CALCULATED.data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)

    //checks if depreciation is greater or equal to zero, to print chart with no error
    if (c.depreciation < 0){
        c.depreciation = 0;
    }  
    
    var labels = [
                    WORDS.depreciation_st,
                    WORDS.insurance_short,
                    WORDS.credit,
                    WORDS.inspection_short,
                    WORDS.road_taxes_short,
                    WORDS.maintenance,
                    WORDS.fuel,
                    WORDS.rep_improv,
                    WORDS.parking,
                    WORDS.tolls,
                    WORDS.fines,
                    WORDS.washing
                 ];    
    
    //always creates a new chart
    if (DISPLAY.charts.pieChart){
        DISPLAY.charts.pieChart.destroy();
    }


    var dataset = [{
                    label: WORDS.costs,
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
    
    DISPLAY.charts.pieChart = new Chart(pieChart, content);    
    DISPLAY.charts.isMonthlyCostsPieChart = true;
}

//draw bar chart
function drawMonthlyCostsBarChart() {

    var c = pfto(CALCULATED.data.monthly_costs); //Monthly costs object of calculated data, parsed to fixed(1)

    //always creates a new chart
    if (DISPLAY.charts.barChart){
        DISPLAY.charts.barChart.destroy();
    }

    var labels = [WORDS.fixed_costs, WORDS.running_costs];

    var dataset = [
                      //standing costs
                      {
                         label: WORDS.depreciation_st,
                         data: [c.depreciation, 0],
                         backgroundColor: 'navy'
                      }, {
                         label: WORDS.insurance_short,
                         data: [c.insurance, 0],
                         backgroundColor: 'blue'
                      }, {
                         label: WORDS.credit,
                         data: [c.credit, 0],
                         backgroundColor: 'aqua'
                      }, {
                         label: WORDS.inspection_short,
                         data: [c.inspection, 0],
                         backgroundColor: 'teal'
                      }, {
                         label: WORDS.road_taxes_short,
                         data: [c.car_tax, 0],
                         backgroundColor: 'olive'
                      }, {
                         label: WORDS.maintenance,
                         data: [(1/2*c.maintenance), 0],
                         backgroundColor: 'green'
                      },
                      //running costs
                      {
                         label: WORDS.rep_improv,
                         data: [0, c.repairs_improv],
                         backgroundColor: 'lime'
                      }, {
                         label: WORDS.fuel,
                         data: [0, c.fuel],
                         backgroundColor: 'maroon'
                      }, {
                         label: WORDS.parking,
                         data: [0, c.parking],
                         backgroundColor: 'yellow'
                      }, {
                         label: WORDS.tolls,
                         data: [0, c.tolls],
                         backgroundColor: 'orange'
                      }, {
                         label: WORDS.fines,
                         data: [0, c.fines],
                         backgroundColor: 'red'
                      }, {
                         label: WORDS.washing,
                         data: [0, c.washing],
                         backgroundColor: 'purple'
                      }, {
                         label: WORDS.maintenance,
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

    DISPLAY.charts.barChart = new Chart(barChart, content);   
    DISPLAY.charts.isMonthlyCostsBarChart = true;
}

//draws horizontal bars chart for Financial Effort
function drawFinEffortChart(total_cost_per_year, net_income_per_year, chartWidth, chartHeight){

    var c = pfto(CALCULATED.data.fin_effort); //Monthly costs object of calculated data, parsed to fixed(1)

    //always creates a new chart
    if (DISPLAY.charts.finEffort){
        DISPLAY.charts.finEffort.destroy();
    }

    var labels = [ formatLabel(WORDS.net_income_per + " " + 
                              WORDS.year, 20), 
                  formatLabel(WORDS.total_costs_per_year, 20) ];
    
    var dataset = [
                      {
                         label: WORDS.costs,
                         data: [
                                c.income_per_year,
                                c.total_costs_year
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

    DISPLAY.charts.finEffort = new Chart(FinEffChart, content);    
    DISPLAY.charts.isFinEffortChart = true;
}

//draw bar chart
function drawAlterToCarChart() {

    var c = pfto(CALCULATED.data.monthly_costs);     //Monthly costs object of calculated data, parsed to fixed(1)
    var p = pfto(CALCULATED.data.public_transports);
    var u = pfto(CALCULATED.uber);

    //always creates a new chart
    if (DISPLAY.charts.alterToCar){
        DISPLAY.charts.alterToCar.destroy();
    }

    //boolean variables
    var p_bool = isObjDef(p) && p.display_pt() && DISPLAY.result.public_transports; //public transports    
    var u_bool = SWITCHES.uber && isObjDef(u) && DISPLAY.result.uber; //uber
    
    var labels = [formatLabel(WORDS.your_car_costs_you + " " + 
                              WORDS.word_per.replace(/&#32;/g,"") + " " + 
                              WORDS.month, 25)];
    
    
    var dataset = [                      
                      //Monthly Costs
                      //1st column
                      //standing costs
                      {
                         label: WORDS.depreciation_st,
                         data: [c.depreciation],
                         backgroundColor: 'navy'
                      }, {
                         label: WORDS.insurance_short,
                         data: [c.insurance],
                         backgroundColor: 'blue'
                      }, {
                         label: WORDS.credit,
                         data: [c.credit],
                         backgroundColor: 'aqua'
                      }, {
                         label: WORDS.inspection_short,
                         data: [c.inspection],
                         backgroundColor: 'teal'
                      }, {
                         label: WORDS.road_taxes_short,
                         data: [c.car_tax],
                         backgroundColor: 'olive'
                      }, {
                         label: WORDS.maintenance,
                         data: [c.maintenance],
                         backgroundColor: 'green'
                      },
                      //running costs
                      {
                         label: WORDS.rep_improv,
                         data: [c.repairs_improv],
                         backgroundColor: 'lime'
                      }, {
                         label: WORDS.fuel,
                         data: [c.fuel],
                         backgroundColor: 'maroon'
                      }, {
                         label: WORDS.parking,
                         data: [c.parking],
                         backgroundColor: 'yellow'
                      }, {
                         label: WORDS.tolls,
                         data: [c.tolls],
                         backgroundColor: 'orange'
                      }, {
                         label: WORDS.fines,
                         data: [c.fines],
                         backgroundColor: 'red'
                      }, {
                         label: WORDS.washing,
                         data: [c.washing],
                         backgroundColor: 'purple'
                      }      
                    ];
    
    //adds zeros to "data" properties on the previous dataset, since the previous monthly costs values
    //just apply to the first column of chart, thus the remainer columns should be set to zero, i.e.
    //according to chartsJS the "data" for each object should be for example "data: [c.fines, 0]" if it has 2 columns
    //see for more information: https://stackoverflow.com/a/45123023/1243247     
    if(p_bool){
        for(let i=0; i<dataset.length; i++){
            dataset[i].data.push(0);
        }        
    }
    if(u_bool){
        for(let i=0; i<dataset.length; i++){
            dataset[i].data.push(0);
        }        
    }
    
    
    /*****************************************/
    //if public transports bar is to be shown
    if(p_bool){
            
        var p_dataset = [
            //Public Transports
            //2nd column
            {
                label: WORDS.other_pub_trans,
                data: [0, p.other_pt],
                backgroundColor: 'fuchsia'
            }, {
                label: WORDS.taxi_desl,
                data: [0, p.taxi_cost],
                backgroundColor: '#b3b300'
            }, {
                label: WORDS.pub_trans_text,
                data: [0, p.total_price_pt],
                backgroundColor: '#006600'
            }                  
        ];
        
        //removes first item from dataset, 
        //related to first item from Public Transports bar
        if(!p.display_other_pt){
            p_dataset.splice(0, 1);
        }
        
        //adds one zero at the end of each 'data' property for the 3rd column (uber)
        //see for more information: https://stackoverflow.com/a/45123023/1243247  
        if(u_bool){        
            for(let i=0; i<p_dataset.length; i++){
                p_dataset[i].data.push(0);
            }             
        }
        
        dataset = dataset.concat(p_dataset);        
        labels.push(formatLabel(WORDS.publ_tra_equiv, 25));                  
    }
    
    
    /*****************************************/
    //if UBER bar is to be shown
    if(u_bool){                

        //UBER
        //2nd or 3d column        
        var u_dataset;

        if(u.result_type == 1){
            
            u_dataset = [
                {
                    label: u.dpm.toFixed(0) + " " + WORDS.fuel_dist + " " + 
                           WORDS.word_per.replace(/&#32;/g,"") + ' ' + WORDS.month,
                    data: [0, u.tuc],
                    backgroundColor: '#b3b365'
                }, {
                    label: WORDS.other_pub_trans,
                    data: [0, u.delta],
                    backgroundColor: '#b3b315'
                }               
            ];                        
                        
        }
        //the case where uber equivalent is more expensive
        else if(u.result_type == 2){
            
            u_dataset = [
                {
                    label: WORDS.pub_trans_text,
                    data: [0, u.tcpt],
                    backgroundColor: '#b3b365'
                }, {
                    label: u.dist_uber.toFixed(0) + " " + WORDS.std_dist_full + " " + 
                           WORDS.word_per.replace(/&#32;/g,"") + " " + WORDS.month,
                    data: [0, u.delta],
                    backgroundColor: '#b3b315'
                }               
            ];            
        }
        else{
            console.error("Error on uber.result_type value: different from 1 and 2");
        }
        
        //adds zero on the beginning of 'data'
        //i.e. from [0, u.delta] to [0, 0, u.delta] since UBER is on the 3rd column
        for(let i=0; i<u_dataset.length; i++){
            u_dataset[i].data.splice(0,0,0);
        }          
              
        dataset = dataset.concat(u_dataset);
        labels.push("UBER");
    
    }    


    var options = {
                      scales: {
                         xAxes: [{
                            stacked: true, // this should be set to make the bars stacked
                            ticks: {
                                beginAtZero: true,
                                fontSize: 9
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

    DISPLAY.charts.alterToCar = new Chart(AlterToCarCostsChart, content);
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
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
        obj[key] = parseFloat(obj[key].toFixed(1));
      }
    }
    return obj;
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
