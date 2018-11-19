/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*File with Javascript Charts Functions */

//DRAW CHARTS MODULE, IT IS A SUBMODULE OF SHOW RESULTS MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

mainModule.resultsModule.chartsModule = (function(){
    
    var calculatedData;
    
    var finishedDrawingChartsPromises = {
        doughnutFinancialEffort: $.Deferred(),
        costsBars:               $.Deferred(),
        costsDoughnut:           $.Deferred(),
        financialEffort:         $.Deferred(),
        alternativesToCar:       $.Deferred()
    };
    
    function initialize(calculatedDataIn) {
        calculatedData = calculatedDataIn;
        return finishedDrawingChartsPromises;
    }
        
    function drawDoughnutFinancialEffort() { 

        var finEffortPerc = calculatedData.financialEffort.financialEffortPercentage;

        var dataset = [{
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
                    finishedDrawingChartsPromises.doughnutFinancialEffort.resolve();
                }
            }
        };    

        var content = {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: dataset
            },
            options: options
        };

        DISPLAY.charts.finEffortDoughnut.ref = new Chart("doughnutChart", content);
        DISPLAY.charts.finEffortDoughnut.isVisible = true;

    }
    
    function drawCostsBars(period){
    
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
                throw "Period not valid " + period;
        }    

        var periodicCosts = {};
        var monthlyCosts = calculatedData.costs.perMonth.items;
        for (var key in monthlyCosts){
            if(monthlyCosts.hasOwnProperty(key)){
                periodicCosts[key] = monthlyCosts[key]*numMonths;
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
                c.roadTaxes,
                c.fuel,
                c.maintenance,            
                c.repairsImprovements,
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
                cc.roadTaxes,
                cc.fuel,
                cc.maintenance,            
                cc.repairsImprovements,
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
                    finishedDrawingChartsPromises.costsBars.resolve();                 
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

        DISPLAY.charts.costsBars.ref = new Chart("costsBarsChart", content);
        DISPLAY.charts.costsBars.isVisible = true;
    }
    
    //Dounghnut chart with every cost item 
    function drawCostsDoughnut(period) {
    
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
                throw "Period not valid " + period;
        } 

        var percentageCosts = {};  //cost item percentage with respect to overall costs  
        var monthlyCosts = calculatedData.costs.perMonth.items;
        var n = 0; var periodicCosts = [];    //periodic costs according; used for showing in tooltips of chart
        for (var key in monthlyCosts){
            if(monthlyCosts.hasOwnProperty(key)){            
                percentageCosts[key] = monthlyCosts[key] / calculatedData.costs.perMonth.total * 100;             
                periodicCosts[n] = monthlyCosts[key]*numMonths; 
                n++;
            }
        }

        var p = percentageCosts; //Monthly costs object of calculated data, parsed to fixed(1)

        //always creates a new chart
        if (DISPLAY.charts.costsDoughnut.ref){
            DISPLAY.charts.costsDoughnut.ref.destroy();
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

        var cc = DISPLAY.costsColors;

        var dataset = [{
            data: [
                p.depreciation,
                p.insurance,
                p.credit,
                p.inspection,
                p.roadTaxes,
                p.fuel,
                p.maintenance,            
                p.repairsImprovements,
                p.parking,
                p.tolls,
                p.fines,
                p.washing
            ],
            backgroundColor: [
                cc.depreciation,
                cc.insurance,
                cc.credit,
                cc.inspection,
                cc.roadTaxes,
                cc.fuel,
                cc.maintenance,            
                cc.repairsImprovements,
                cc.parking,
                cc.tolls,
                cc.fines,
                cc.washing
            ],
            borderWidth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
        }];
        
        var options = {
            maintainAspectRatio: false,
            legend: {
                display: false,            
            },
            cutoutPercentage: 57,
            tooltips: {
                enabled: true,
                callbacks: {
                    title: function(tooltipItems, data){                    
                        return formatLabel(data.labels[tooltipItems[0].index], 16);
                    },
                    label: function(tooltipItem, data) {                    
                        var i = tooltipItem.index;
                        return WORDS.curr_symbol + periodicCosts[i].toFixed(1) + "   " + data.datasets[0].data[i].toFixed(1) + "%";
                    }
                } 
            },       
            animation : {
                onComplete : function(){    
                    DISPLAY.charts.costsDoughnut.URI = DISPLAY.charts.costsDoughnut.ref.toBase64Image();
                    finishedDrawingChartsPromises.costsDoughnut.resolve();                     
                }
            }
        };    

        var content = {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: dataset
            },
            options: options
        };

        DISPLAY.charts.costsDoughnut.ref = new Chart("costsDoughnutChart", content);
        DISPLAY.charts.costsDoughnut.isVisible = true;
    }

    //draws vertical bars chart for Financial Effort
    function drawFinancialEffort() {

        var fe = calculatedData.financialEffort; //Monthly costs object of calculated data, parsed to fixed(1)

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
                    fe.income.perYear,
                    fe.totalCarCostsPerYear
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
                    finishedDrawingChartsPromises.financialEffort.resolve();                  
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
        
    function drawAlternativesToCar(){

        var i;    
        var publicTransportsObj = calculatedData.publicTransports;
        var uberObj             = calculatedData.uber;

        var totCostsPerMonth = calculatedData.costs.perMonth.total.toFixed(1);

        //always creates a new chart
        if (DISPLAY.charts.alterToCar.ref){
            DISPLAY.charts.alterToCar.ref.destroy();
        }

        //boolean variables
        var publicTransportstBool = isObjDef(publicTransportsObj) && publicTransportsObj.toBeDisplayed && DISPLAY.result.public_transports;    
        var uberBool = SWITCHES.uber && isObjDef(uberObj) && DISPLAY.result.uber; //uber

        var labels = [
            formatLabel(WORDS.your_car_costs_you + " " + WORDS.word_per.replace(/&#32;/g,"") + " " + WORDS.month, 25)
        ];

        var dataset = [                      
            //Monthly Costs
            //1st column
            //standing costs
            {
                label: formatLabel(WORDS.your_car_costs_you + " " + WORDS.word_per.replace(/&#32;/g,"") + " " + WORDS.month, 25),
                data: [totCostsPerMonth],
                backgroundColor: '#5ae0e2'
            }   
        ];

        //adds zeros to "data" properties on the previous dataset, since the previous monthly costs values
        //just apply to the first column of chart, thus the remainer columns should be set to zero, i.e.
        //according to chartsJS the "data" for each object should be for example "data: [c.fines, 0]" if it has 2 columns
        //see for more information: https://stackoverflow.com/a/45123023/1243247         
        if(publicTransportstBool){
            for(i=0; i<dataset.length; i++){
                dataset[i].data.push(0);
            }        
        }
        if(uberBool){
            for(i=0; i<dataset.length; i++){
                dataset[i].data.push(0);
            }        
        }    

        /*****************************************/
        //if public transports bar is to be shown
        if(publicTransportstBool){

            var publicTransportsDataset = [
                //Public Transports
                //2nd column
                {
                    label: WORDS.other_pub_trans,
                    data: [0, publicTransportsObj.furtherPublicTransports.totalCosts],
                    backgroundColor: '#ff9e84'
                }, {
                    label: WORDS.taxi_desl,
                    data: [0, publicTransportsObj.taxi.totalCosts],
                    backgroundColor: '#ffda70'
                }, {
                    label: WORDS.pub_trans_text,
                    data: [0, publicTransportsObj.totalCostsOfStandardPublicTransports],
                    backgroundColor: '#99e6bc'
                }                  
            ];

            //removes first item from dataset, 
            //related to first item from Public Transports bar
            if(!publicTransportsObj.furtherPublicTransports.display){
                publicTransportsDataset.splice(0, 1);
            }

            //adds one zero at the end of each 'data' property for the 3rd column (uber)
            //see for more information: https://stackoverflow.com/a/45123023/1243247  
            if(uberBool){        
                for(i=0; i<publicTransportsDataset.length; i++){
                    publicTransportsDataset[i].data.push(0);
                }             
            }

            dataset = dataset.concat(publicTransportsDataset);        
            labels.push(""); 
        }


        /*****************************************/
        //if UBER bar is to be shown
        if(uberBool){                

            //UBER
            //2nd or 3d column        
            var uberDataset;

            //1st case, in which driver can replace every journey by uber
            //the remianing amount of money is used to further public transports        
            if(uberObj.resultType == 1){            
                uberDataset = [
                    {
                        label: WORDS.other_pub_trans,
                        data: [0, uberObj.publicTransportsCostsCombinedWithUber],
                        backgroundColor: '#e562aa'

                    }, {
                        label: "Uber - " + calculatedData.drivingDistance.perMonth.toFixed(0) + " " + WORDS.fuel_dist + " " + 
                               WORDS.word_per.replace(/&#32;/g,"") + ' ' + WORDS.month,
                        data: [0, uberObj.uberCosts.total],
                        backgroundColor: '#ff7192'
                    }               
                ];                        
            }
            //2nd case, where replacing every distance (km, mile, etc.) with uber is more expensive
            //tries to combine uber with public transports less expensive per unit-distance
            else if(uberObj.resultType == 2){            
                uberDataset = [
                    {
                        label: WORDS.other_pub_trans,
                        data: [0, uberObj.publicTransportsCostsCombinedWithUber],
                        backgroundColor: '#e562aa' 
                    }, {
                        label: "Uber - " + uberObj.distanceDoneWithUber.toFixed(0) + " " + WORDS.std_dist_full + " " + 
                               WORDS.word_per.replace(/&#32;/g,"") + " " + WORDS.month,
                        data: [0, uberObj.uberCosts.total],
                        backgroundColor: '#ff7192'                   
                    } 
                ];            
            }
            else{
                throw "Error on uber resultType value: different from 1 and 2";
            }

            //adds zero on the beginning of 'data'
            //i.e. from [0, uber.x] to [0, 0, uber.x] since UBER is on the 3rd column
            if(publicTransportstBool){
                for(i=0; i<uberDataset.length; i++){
                    uberDataset[i].data.splice(0,0,0);
                }          
            }

            dataset = dataset.concat(uberDataset);
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
                    title: function(tooltipItems, data) {
                        var txt = data.datasets[tooltipItems[0].datasetIndex].label;                    
                        if ($.isArray(txt)){
                            return formatLabel(txt[0], 25);
                        }
                        else{
                            return formatLabel(txt, 25);
                        }
                    },
                    label: function(tooltipItem, data) {
                        return WORDS.curr_symbol + tooltipItem.yLabel.toFixed(1);
                    }
                }
            }, 
            animation : {
                onComplete : function(){    
                    DISPLAY.charts.alterToCar.URI = DISPLAY.charts.alterToCar.ref.toBase64Image(); 
                    finishedDrawingChartsPromises.alternativesToCar.resolve(); 
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

    //takes a string phrase and breaks it into separate phrases
    //no bigger than 'maxwidth' (in the number of characters), breaks are made at complete words
    //used for the charts labels and tooltips
    function formatLabel(str, maxwidth) {
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
    
    function isObjDef(Obj){
        if (Obj === null || Obj == "null" || typeof Obj !== 'object' || $.isEmptyObject(Obj)){
            return false;
        }
        else{
            return true;
        }
    } 
    
    return{
        initialize: initialize,
        drawDoughnutFinancialEffort: drawDoughnutFinancialEffort,
        drawCostsBars: drawCostsBars,
        drawCostsDoughnut: drawCostsDoughnut,
        drawFinancialEffort: drawFinancialEffort,
        drawAlternativesToCar: drawAlternativesToCar
    };
    
})();


