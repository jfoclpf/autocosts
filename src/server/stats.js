const path  = require('path');
const url   = require(path.join(__dirname, 'url'));
const mysql = require('mysql'); //module to get info from DB
const async = require('async'); //module to allow to execute the queries in series
const debug = require('debug')('app:stats');

module.exports = {
    
    req: function(req, res, serverData, wordsOfUK, chartContent) {

        var data = {};
        data.words = wordsOfUK;
        data.serverData = serverData;        
        delete data.serverData.availableCountries.XX;   
        
        data.chartContent = chartContent;

        //information depending on this request from the client    
        var clientData = {
            "isThisATest"  : url.isThisATest(req),      //boolean variable regarding if present request is a test
            "notLocalhost" : !url.isThisLocalhost(req), //boolean variable regarding if present request is from localhost
            "httpProtocol" : url.getProtocol(req, serverData.settings.switches.https)
        }    
        data.clientData = clientData;        
        
        data.layout = false;    
        var fileToRender = path.join(serverData.directories.index, "views", "stats.hbs");
        res.render(fileToRender, data);
        
    },
    
    prepareChart : function(serverData, wordsOfUK, eventEmitter){
        
        var dbInfo = serverData.settings.dataBase.credentials;
        debug(dbInfo);

        var costs = {};
        var labels = [];
        
        async.series([
        //creates DB connection and connects
            function(callback) {

                db = mysql.createConnection(dbInfo);
                console.log('\nGetting normalised costs from ' +
                            'DB table ' + dbInfo.database + '->' + dbInfo.db_tables.monthly_costs_normalized);

                db.connect(function(err){
                    if (err) {
                        console.error('error connecting: ' + err.stack);
                        return;
                    }                   
                    callback();
                });            
            },
            
            //Get the normalised costs
            function(callback) {                
                
                db.query('SELECT * FROM ' + dbInfo.db_tables.monthly_costs_normalized, 
                    function(err, results, fields) {
                        if (err) {console.log(err); throw err;}
                        debug(results);
                    
                        var costsStrs = ["Depreciation", 
                            "Insurance", 
                            "Loan_interests", 
                            "Inspection", 
                            "Car_tax", 
                            "Maintenance", 
                            "Fuel", 
                            "Repairs", 
                            "Parking", 
                            "Tolls", 
                            "Fines", 
                            "Washing"]; 
                    
                        results.sort(function(a,b){
                            return b.total_costs_year-a.total_costs_year
                        });
                    
                        //on every cost item, builds an array of values for said cost item
                        for (var n=0; n<costsStrs.length; n++){
                            costs[costsStrs[n]]=[];//cost item array                         
                            for (var i=0; i<results.length; i++){
                                if (results[i].country !== "XX"){                       
                                    //copies value from db (monthly) to object (yearly)
                                    costs[costsStrs[n]].push(results[i][costsStrs[n]]*12);
                                    //fills labels, but just needs once
                                    if(n==0){
                                        labels.push(results[i].country);
                                    }
                                }
                            }
                        }                        
                        
                        debug(costs);                        
                        callback();
                    }
                );
            },
            
            function(callback){
                
                var countryList = serverData.availableCountries;
                var WORDS = wordsOfUK;

                var dataset = [
                    {
                        label: WORDS.depreciation_st,
                        data: costs.Depreciation,
                        backgroundColor: 'navy'
                    }, {
                        label: WORDS.insurance_short,
                        data: costs.Insurance,
                        backgroundColor: 'blue'
                    }, {
                        label: WORDS.credit,
                        data: costs.Loan_interests,
                        backgroundColor: 'aqua'
                    }, {
                        label: WORDS.inspection_short,
                        data: costs.Inspection,
                        backgroundColor: 'teal'
                    }, {
                        label: WORDS.road_taxes_short,
                        data: costs.Car_tax,
                        backgroundColor: 'olive'
                    }, {
                        label: WORDS.maintenance,
                        data: costs.Maintenance,
                        backgroundColor: 'green'
                    }, {
                        label: WORDS.rep_improv,
                        data: costs.Repairs,
                        backgroundColor: 'lime'
                    }, {
                        label: WORDS.fuel,
                        data: costs.Fuel,
                        backgroundColor: 'maroon'
                    }, {
                        label: WORDS.parking,
                        data: costs.Parking,
                        backgroundColor: 'yellow'
                    }, {
                        label: WORDS.tolls,
                        data: costs.Tolls,
                        backgroundColor: 'orange'
                    }, {
                        label: WORDS.fines,
                        data: costs.Fines,
                        backgroundColor: 'red'
                    }, {
                        label: WORDS.washing,
                        data: costs.Washing,
                        backgroundColor: 'purple'
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
                            beginAtZero: true
                        }]
                    },
                    animation: {
                        duration : 1000,
                        easing : 'linear'
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

                eventEmitter.emit('chartContentCalculated', content);                       
            }
        ]);//async.series        
    }//prepareChart
}



