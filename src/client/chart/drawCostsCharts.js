/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with Javascript Charts Functions */


function drawDoughnutFinEffortChart(calculatedData){
    
    var finEffortPerc = calculatedData.fin_effort.percentage_of_income;
    
    var datasets = [{
        data: [finEffortPerc, 100 - finEffortPerc],
        backgroundColor: ["white", "#4c6ef2"],
        borderWidth: [0, 0]
    }];

    // These labels appear in the legend and in the tooltips when hovering different arcs
    var labels = [WORDS.financial_effort, ""];
    
    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false,            
        },
        cutoutPercentage: 70,
        tooltips: {
            enabled: false
        },
        hover: {
            mode: null
        },        
        animation : {
            onComplete : function(){    
                DISPLAY.charts.finEffortDoughnut.URI = DISPLAY.charts.finEffortDoughnut.ref.toBase64Image();
            }
        }
    };    
    
    var content = {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: options
    };

    DISPLAY.charts.finEffortDoughnut.ref = new Chart("doughnutChart", content);
    DISPLAY.charts.finEffortDoughnut.isVisible = true;
    
}

function drawCostsBarsChart(calculatedData, period) {
    
    var numMonths;
    
    switch(period){
        case "month" :
            numMonths = 1;
            break;
        case "trimester" :
            numMonths = 3;
            break;
        case "semester" :
            numMonths = 6;
            break;
        case "year" :
            numMonths = 12;
            break;
        default:
            console.error("Period not valid " + period);
    }    

    var periodicCosts = {};
    for (var key in calculatedData.monthly_costs){
        if(calculatedData.monthly_costs.hasOwnProperty(key)){
            periodicCosts[key] = calculatedData.monthly_costs[key]*numMonths;
        }
    }

    var c = periodicCosts; //Monthly costs object of calculated data, parsed to fixed(1)
    
    //always creates a new chart
    if (DISPLAY.charts.costsBars.ref){
        DISPLAY.charts.costsBars.ref.destroy();
    }
    
    var labels = [
        WORDS.depreciation_st,
        WORDS.insurance_short,
        WORDS.credit,
        WORDS.inspection_short,
        WORDS.road_taxes_short,
        WORDS.fuel,
        WORDS.maintenance,        
        WORDS.rep_improv,
        WORDS.parking,
        WORDS.tolls,
        WORDS.fines,
        WORDS.washing
    ];  
    
    for (var i=0; i<labels.length; i++){
        labels[i] = formatLabel(labels[i], 16);
    }       
    
    var cc = DISPLAY.costsColors;
        
    var dataset = [{
        data: [
            c.depreciation,
            c.insurance,
            c.credit,
            c.inspection,
            c.car_tax,
            c.fuel,
            c.maintenance,            
            c.repairs_improv,
            c.parking,
            c.tolls,
            c.fines,
            c.washing
        ],
        backgroundColor: [
            cc.depreciation,
            cc.insurance,
            cc.credit,
            cc.inspection,
            cc.car_tax,
            cc.fuel,
            cc.maintenance,            
            cc.repairs_improv,
            cc.parking,
            cc.tolls,
            cc.fines,
            cc.washing
        ]
    }];
    
    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false,            
        }, 
        scales: {
            xAxes: [{
                categoryPercentage: 0.9,
                barPercentage: 0.95,
                ticks: {
                    display: false,                    
                }
            }],
            yAxes: [{
                stacked: false,                 
                ticks: {
                    beginAtZero: true,
                    // Include a currency sign in the ticks
                    callback: function(value, index, values) {
                        return WORDS.curr_symbol + value;
                    },                    
                }                
            }]
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return WORDS.curr_symbol + tooltipItem.yLabel.toFixed(1);
                }
            }
        }, 
        animation : {
            onComplete : function(){    
                DISPLAY.charts.costsBars.URI = DISPLAY.charts.costsBars.ref.toBase64Image();
            }
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

    DISPLAY.charts.costsBars.ref = new Chart("costsChart", content);
    DISPLAY.charts.costsBars.isVisible = true;
}

//draws horizontal bars chart for Financial Effort
function drawFinEffortChart(calculatedData){

    var c = calculatedData.fin_effort; //Monthly costs object of calculated data, parsed to fixed(1)

    //always creates a new chart
    if (DISPLAY.charts.finEffort.ref){
        DISPLAY.charts.finEffort.ref.destroy();
    }

    var labels = [ 
        formatLabel(WORDS.net_income_per + " " + WORDS.year, 20), 
        formatLabel(WORDS.total_costs_per_year, 20) 
    ];
    
    var dataset = [
        {
            label: WORDS.costs,
            data: [
                c.income_per_year,
                c.total_costs_year
            ],
            backgroundColor:[
                '#2ba3d6',
                '#10c6e6'
            ]
        }
    ];

    var options =  {
        maintainAspectRatio: false,
        legend: {
            display: false
        },      
        scales: {
            xAxes: [{
                ticks: {                    
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 9,
                    // Include a currency sign in the ticks
                    callback: function(value, index, values) {
                        return WORDS.curr_symbol + value;
                    }
                }
            }]
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return WORDS.curr_symbol + tooltipItem.yLabel.toFixed(0);
                }
            }
        },        
        animation : {
            onComplete : function(){    
                DISPLAY.charts.finEffort.URI = DISPLAY.charts.finEffort.ref.toBase64Image();
            }
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

    DISPLAY.charts.finEffort.ref = new Chart("finEffortChart", content);   
    DISPLAY.charts.finEffort.isVisible = true;
}

//draw bar chart
function drawAlterToCarChart(calculatedData) {

    var i;    
    var c = calculatedData.monthly_costs;     //Monthly costs object of calculated data, parsed to fixed(1)
    var p = calculatedData.public_transports;
    var u = calculatedData.uber;

    var totCostsPerMonth = parseFloat(calculatedData.total_costs_month.toFixed(1));
    
    //always creates a new chart
    if (DISPLAY.charts.alterToCar.ref){
        DISPLAY.charts.alterToCar.ref.destroy();
    }

    //boolean variables
    var p_bool = isObjDef(p) && p.display_pt() && DISPLAY.result.public_transports; //public transports    
    var u_bool = SWITCHES.uber && isObjDef(u) && DISPLAY.result.uber; //uber
    
    var labels = [
        formatLabel(WORDS.your_car_costs_you + " " + WORDS.word_per.replace(/&#32;/g,"") + " " + WORDS.month, 25)
    ];
        
    var dataset = [                      
        //Monthly Costs
        //1st column
        //standing costs
        {
            label: WORDS.your_car_costs_you,
            data: [totCostsPerMonth],
            backgroundColor: '#5ae0e2'
        }   
    ];
    
    //adds zeros to "data" properties on the previous dataset, since the previous monthly costs values
    //just apply to the first column of chart, thus the remainer columns should be set to zero, i.e.
    //according to chartsJS the "data" for each object should be for example "data: [c.fines, 0]" if it has 2 columns
    //see for more information: https://stackoverflow.com/a/45123023/1243247         
    if(p_bool){
        for(i=0; i<dataset.length; i++){
            dataset[i].data.push(0);
        }        
    }
    if(u_bool){
        for(i=0; i<dataset.length; i++){
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
                backgroundColor: '#ff9e84'
            }, {
                label: WORDS.taxi_desl,
                data: [0, p.taxi_cost],
                backgroundColor: '#ffda70'
            }, {
                label: WORDS.pub_trans_text,
                data: [0, p.total_price_pt],
                backgroundColor: '#99e6bc'
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
            for(i=0; i<p_dataset.length; i++){
                p_dataset[i].data.push(0);
            }             
        }
        
        dataset = dataset.concat(p_dataset);        
        //labels.push(formatLabel(WORDS.publ_tra_equiv, 25)); 
        labels.push(""); 
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
                    label: WORDS.other_pub_trans,
                    data: [0, u.delta],
                    backgroundColor: '#e562aa'

                }, {
                    label: "Uber - " + u.dpm.toFixed(0) + " " + WORDS.fuel_dist + " " + 
                           WORDS.word_per.replace(/&#32;/g,"") + ' ' + WORDS.month,
                    data: [0, u.tuc],
                    backgroundColor: '#ff7192'
                }               
            ];                        
        }
        //the case where uber equivalent is more expensive
        else if(u.result_type == 2){            
            u_dataset = [
                {
                    label: WORDS.other_pub_trans,
                    data: [0, u.tcpt],
                    backgroundColor: '#e562aa' 
                }, {
                    label: "Uber - " + u.dist_uber.toFixed(0) + " " + WORDS.std_dist_full + " " + 
                           WORDS.word_per.replace(/&#32;/g,"") + " " + WORDS.month,
                    data: [0, u.delta],
                    backgroundColor: '#ff7192'                   
                } 
            ];            
        }
        else{
            console.error("Error on uber.result_type value: different from 1 and 2");
        }
        
        //adds zero on the beginning of 'data'
        //i.e. from [0, u.delta] to [0, 0, u.delta] since UBER is on the 3rd column
        if(p_bool){
            for(i=0; i<u_dataset.length; i++){
                u_dataset[i].data.splice(0,0,0);
            }          
        }
              
        dataset = dataset.concat(u_dataset);
        //labels.push("UBER");
        labels.push("");
    
    }    

    var options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true, // this should be set to make the bars stacked
                ticks: {
                    beginAtZero: true,
                    display: false
                }
            }],
            yAxes: [{
                stacked: true, // this also..
                ticks: {
                    beginAtZero: true,
                    // Include a currency sign in the ticks
                    callback: function(value, index, values) {
                        return WORDS.curr_symbol + value;
                    }                    
                }
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ": " + WORDS.curr_symbol + tooltipItem.yLabel.toFixed(1);
                }
            }
        }, 
        animation : {
            onComplete : function(){    
                DISPLAY.charts.alterToCar.URI = DISPLAY.charts.alterToCar.ref.toBase64Image();                
            }
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

    DISPLAY.charts.alterToCar.ref = new Chart("equivalentTransportChart", content);
    DISPLAY.charts.alterToCar.isVisible = true;
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


