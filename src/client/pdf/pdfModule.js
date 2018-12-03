
//PDF REPORT GENERATION MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

autocosts.resultsModule = autocosts.resultsModule || {};
autocosts.resultsModule.pdfModule = (function(translatedStrings, switches, selectedCountry){
    
    var resultsModule;
    
    var calculatedData, pdfReport, chartsInfo;
    
    function initialize(){
        loadModuleDependencies();
        $('#results .button-pdf, #results .button-print').removeClass('disabled'); 
    }
    
    function loadModuleDependencies(){
        resultsModule = autocosts.resultsModule;
    }       
    
    function generatePDF(calculatedDataIn){
        
        calculatedData = calculatedDataIn;
        
        //see modules tree at https://github.com/jfoclpf/autocosts/wiki/Modules-tree
        chartsInfo = resultsModule.chartsModule.getChartsInfo();

        var header = {
            text: translatedStrings.main_title,
            style: 'title'
        };
        
        var isFinancialEffortChart = calculatedData.financialEffort.calculated && chartsInfo.financialEffort.isVisible;
        var isAlternativesToCarChart = (calculatedData.publicTransports.calculated || calculatedData.uber.calculated) && chartsInfo.alternativesToCar.isVisible;
        
        $.when(switches.charts ? getChartSize("costsDoughnut") : {}, 
               switches.charts ? getChartSize("costsBars") : {},
               switches.charts && isFinancialEffortChart ? getChartSize("financialEffort") : {},
               switches.charts && isAlternativesToCarChart ? getChartSize("alternativesToCar") : {}).
        done(function(costsDoughnutSize, costsBarsSize, financialEffortSize, alternativesToCarSize){
            
            var costsDoughnutChartWHProp, costsDoughnutChartWidth,
                costsBarsChartWHProp, costsBarsChartWidth,
                financialEffortChartWHProp, financialEffortChartWidth,
                alternativesToCarChartWHProp, alternativesToCarChartWidth;
            
            if (switches.charts){
                //costs Doughnut Chart width/height proportion
                costsDoughnutChartWHProp = costsDoughnutSize.width/costsDoughnutSize.height;
                costsDoughnutChartWidth = 180; //pixels
                
                //costs Bars Chart width/height proportion
                costsBarsChartWHProp = costsBarsSize.width/costsBarsSize.height;
                costsBarsChartWidth = 420; //pixels
                
                if(isFinancialEffortChart){
                    financialEffortChartWHProp = financialEffortSize.width/financialEffortSize.height;
                    financialEffortChartWidth = 320; //pixels                
                }
                
                if(isAlternativesToCarChart){
                    alternativesToCarChartWHProp = alternativesToCarSize.width/alternativesToCarSize.height;
                    alternativesToCarChartWidth = 350; //pixels                
                }
            }
                
            var styles = {
                title:{
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 10, 0, 10], //[left, top, right, bottom]
                    bold: true
                },
                header: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    color: '#000'
                },
                tableMarging: {
                    margin: [0, 20, 0, 20], //[left, top, right, bottom]
                    color: '#1C1C1C'
                },
                img_style: {
                    alignment: 'center',
                    margin: [0, 10, 0, 10] //[left, top, right, bottom]
                }
            };

            var defaultStyle = {
                font: 'Roboto'
            };

            var content = [
                {
                    margin: [0, 0, 0, 20], //[left, top, right, bottom]
                    color: '#1C1C1C',
                    table:{
                        headerRows: 0,
                        widths: [ '*', '*', '*', '*' ],
                        body: getMainTable()
                    }
                }
            ];

            if (switches.charts){    
                content.push(
                    {
                        image: chartsInfo.costsDoughnut.base64Image,
                        width: costsDoughnutChartWidth,
                        height: Math.round(costsDoughnutChartWidth / costsDoughnutChartWHProp),
                        margin: [0, 10, 0, 15], //[left, top, right, bottom]
                        alignment: 'center'
                    },
                    {
                        image: chartsInfo.costsBars.base64Image,
                        width: costsBarsChartWidth,
                        height: Math.round(costsBarsChartWidth / costsBarsChartWHProp),
                        margin: [0, 10, 0, 10], //[left, top, right, bottom]
                        alignment: 'center'
                    },
                    {
                        margin: [0, 0, 0, 0], //[left, top, right, bottom]
                        table:{
                            headerRows: 0,
                            widths: [ '*', '*', '*', '*', '*', '*' ],
                            body: getChartsLegend()
                        },
                        pageBreak: 'after'
                    }                       
                );
            }

            //adds tables of monthly car costs
            content.push(             
                {
                    style: 'tableMarging',
                    table:{                
                        widths: [ 390, '*' ],
                        body: getStandingCostsTable()
                    }
                },
                {
                    style: 'tableMarging',
                    table:{
                        headerRows: 0,
                        widths: [ 390, '*' ],
                        body: getRunningCostsTable()
                    }
                },
                {
                    style: 'tableMarging',
                    table:{
                        headerRows: 0,
                        widths: [ 390, '*' ],
                        body: getTotalCostsTable()
                    }
                }
            );

            //financial effort title and table
            if(calculatedData.financialEffort.calculated){ 
                //header
                content.push(
                    {
                        style: 'tableMarging',
                        table:{
                            headerRows: 0,
                            widths: ['*'],
                            body: [
                                [
                                    {text: translatedStrings.financial_effort, style: "header"}
                                ]
                            ]
                        },
                        pageBreak: 'before'
                    }
                );

                //chart
                if(chartsInfo.financialEffort.isVisible && switches.charts){
                    content.push(
                        {
                            image: chartsInfo.financialEffort.base64Image,
                            width: financialEffortChartWidth,
                            height: Math.round(financialEffortChartWidth / financialEffortChartWHProp),
                            style: 'img_style'
                        }
                    );
                }

                //table
                content.push(
                    {
                        style:'tableMarging',
                        table:{
                            headerRows: 1,
                            widths: [ 390, '*' ],
                            body: getBodyFinEffort()
                        }
                    }
                );

            }

            //Equivalent transport costs / uber / public transports
            if (calculatedData.publicTransports.calculated || calculatedData.uber.calculated){   
                //header
                content.push( 
                    {
                        style: 'tableMarging',
                        table: {
                            headerRows: 0,
                            widths: ['*'],
                            body: [
                                [
                                    {text: translatedStrings.publ_tra_equiv, style: "header"}
                                ]
                            ]
                        },
                        pageBreak: 'before'
                    }
                );

                //chart
                if(chartsInfo.alternativesToCar.isVisible && switches.charts){
                    content.push(
                        {
                            image: chartsInfo.alternativesToCar.base64Image,
                            width: alternativesToCarChartWidth,
                            height: Math.round(alternativesToCarChartWidth / alternativesToCarChartWHProp),
                            style: 'img_style'
                        }
                    );
                }

                if(calculatedData.publicTransports.calculated){
                    content.push(
                        {
                            style: 'tableMarging',
                            table: {
                                headerRows: 0,
                                widths: [ 390, '*' ],
                                body: getPublicTransportsTable()
                            }
                        }
                    );
                }

                //uber
                if(calculatedData.uber.calculated){
                    content.push(
                        {
                            style:'tableMarging',
                            table:{
                                headerRows: 0,
                                widths: [ 390, '*' ],
                                body: getUberTable()
                            }
                        }
                    );
                }
            }

            var docDefinition = {
                header: header,
                content: content,
                styles: styles,
                defaultStyle: {
                    font: 'Roboto'
                }
            };

            setFonts(docDefinition);

            pdfReport = pdfMake.createPdf(docDefinition);
            console.log("pdfReport created");
            
        });
    }
    
    function download(){
        pdfReport.download(translatedStrings.web_page_title + '.pdf');
    }

    function print(){
        var win = window.open('', '_blank');
        pdfReport.print({}, win);
    }
    
    function getChartSize(chart){
        
        var $deferredEvent = $.Deferred(); 
        
        var img = new Image(); 
        img.onload = function(){            
            $deferredEvent.resolve({ width: img.width, height: img.height});
        };        
        
        switch(chart){
            case "costsDoughnut":
                img.src = chartsInfo.costsDoughnut.base64Image;                 
                break;
            case "costsBars":
                img.src = chartsInfo.costsBars.base64Image;
                break;
            case "financialEffort":
                img.src = chartsInfo.financialEffort.base64Image;
                break;
            case "alternativesToCar":
                img.src = chartsInfo.alternativesToCar.base64Image;
                break;
            default:
                throw "Error on getChartSize, unknown chart: " + chart;
        }
        
        return $deferredEvent;
    }   
    
    //Languages/alphabets that need special fonts, load such fonts from different files
    //These fonts files are virtually created into the file vfs_fonts.js in folder /js/pdf/XX/
    //more information here: https://github.com/bpampuch/pdfmake/wiki/Custom-Fonts---client-side
    function setFonts(docDefinition){

        if (selectedCountry == 'CN'){
            pdfMake.fonts = {
                Chinese: {
                    normal: 'Chinese.ttf',
                    bold: 'Chinese.ttf',
                    italics: 'Chinese.ttf',
                    bolditalics: 'Chinese.ttf'
                }
            };
            docDefinition.defaultStyle.font = "Chinese";
        }
        if (selectedCountry == 'JP'){
            pdfMake.fonts = {
                Japanese: {
                    normal: 'Japanese.ttf',
                    bold: 'Japanese.ttf',
                    italics: 'Japanese.ttf',
                    bolditalics: 'Japanese.ttf'
                }
            };
            docDefinition.defaultStyle.font = "Japanese";
        }
        if (selectedCountry == 'IN'){
            pdfMake.fonts = {
                Hindi: {
                    normal: 'Hindi.ttf',
                    bold: 'Hindi.ttf',
                    italics: 'Hindi.ttf',
                    bolditalics: 'Hindi.ttf'
                }
            };
            docDefinition.defaultStyle.font = "Hindi";
        }
    }

    //******************************************************
    //******************************************************
    //functions that generate the respective tables

    function getMainTable(){

        var body = [
            [
                {text:translatedStrings.your_car_costs_you, colSpan: 4, alignment: 'center'},
                {},{},{}
            ],
            [
                translatedStrings.word_per + translatedStrings.month + "\n" + 
                translatedStrings.curr_symbol     + calculatedData.costs.perMonth.total.toFixed(),
                
                translatedStrings.word_per + translatedStrings.trimester + "\n" + 
                translatedStrings.curr_symbol + (calculatedData.costs.perMonth.total * 3).toFixed(),
                
                translatedStrings.word_per + translatedStrings.semester + "\n" + 
                translatedStrings.curr_symbol  + (calculatedData.costs.perMonth.total * 6).toFixed(),
                
                translatedStrings.word_per + translatedStrings.year + "\n" + 
                translatedStrings.curr_symbol      + (calculatedData.costs.perMonth.total * 12).toFixed()
            ],
            [
                {text: translatedStrings.with_this_level_of_costs + " " + calculatedData.details.ageOfCarInMonths + " " +
                       translatedStrings.months_poss + " " + translatedStrings.curr_symbol + calculatedData.costs.totalEver.toFixed(0),
                colSpan: 4, alignment: 'center'},
                {},{},{}
            ]
        ];

        if (calculatedData.financialEffort.calculated){
            body.push(
                [
                    {text:translatedStrings.financial_effort + ": " + calculatedData.financialEffort.financialEffortPercentage.toFixed(0) + "%",
                    colSpan: 4, alignment: 'center'},
                    {},{},{}
                ]
            );
        }

        return body;
    }

    function getChartsLegend(){

        var cc = resultsModule.getCostsColors();
        var fontSize = 8.5;

        var body = [
            [
                { text: translatedStrings.depreciation, fontSize: fontSize, fillColor: cc.depreciation},
                { text: translatedStrings.insurance,    fontSize: fontSize, fillColor: cc.insurance},
                { text: translatedStrings.fuel,         fontSize: fontSize, fillColor: cc.fuel},
                { text: translatedStrings.maintenance,  fontSize: fontSize, fillColor: cc.maintenance},
                { text: translatedStrings.rep_improv,   fontSize: fontSize, fillColor: cc.repairsImprovements},
                { text: translatedStrings.parking,      fontSize: fontSize, fillColor: cc.parking}
            ],
            [
                {text: translatedStrings.credit,     fontSize: fontSize, fillColor: cc.credit},
                {text: translatedStrings.inspection, fontSize: fontSize, fillColor: cc.inspection},
                {text: translatedStrings.road_taxes, fontSize: fontSize, fillColor: cc.roadTaxes},
                {text: translatedStrings.washing,    fontSize: fontSize, fillColor: cc.washing},
                {text: translatedStrings.fines,      fontSize: fontSize, fillColor: cc.fines},
                {text: translatedStrings.tolls,      fontSize: fontSize, fillColor: cc.tolls}
            ]
        ];

        return body;

    }

    function getStandingCostsTable(){

        var cc = resultsModule.getCostsColors();  
        var costItems = calculatedData.costs.perMonth.items;

        var body = [
            [
                {text: translatedStrings.fixed_costs + "\n" + translatedStrings.total_fixed_descr, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translatedStrings.costs, alignment: 'center'},
                {text: translatedStrings.monthly_amount, alignment: 'center'},
            ],
            [
                {text: translatedStrings.depreciation + "\n" + gstr("#avg-periodic-cost .depreciation_details")},
                {text: translatedStrings.curr_symbol + costItems.depreciation.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.insurance + "\n" + gstr("#avg-periodic-cost .insurance_details")},
                {text: translatedStrings.curr_symbol + costItems.insurance.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.credit + "\n" + gstr("#avg-periodic-cost .credit_details")},
                {text: translatedStrings.curr_symbol + costItems.credit.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.inspection + "\n" + gstr("#avg-periodic-cost .inspection_details")},
                {text: translatedStrings.curr_symbol + costItems.inspection.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.road_taxes + "\n" + gstr("#avg-periodic-cost .roadTaxes_details")},
                {text: translatedStrings.curr_symbol + costItems.roadTaxes.toFixed(1), bold: true}
            ],
            [
                {text: "1/2" + " " + translatedStrings.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
                {text: translatedStrings.curr_symbol + (costItems.maintenance/2).toFixed(1)}
            ],
            [
                {text: translatedStrings.total_fixed, alignment: "right", bold: true, fontSize: 14},
                {text: translatedStrings.curr_symbol + (calculatedData.costs.perMonth.standingCosts).toFixed(0), bold: true, fontSize: 14}
            ]
        ];

        return body;
    }

    function getRunningCostsTable(){

        var cc = resultsModule.getCostsColors();
        var costItems = calculatedData.costs.perMonth.items;    

        var body = [
            [
                {text: translatedStrings.running_costs + "\n" + translatedStrings.running_costs_header_2, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translatedStrings.costs, alignment: 'center'},
                {text: translatedStrings.monthly_amount, alignment: 'center'},
            ],
            [
                {text: translatedStrings.fuel + "\n" + gstr("#avg-periodic-cost .fuel_details")},
                {text: translatedStrings.curr_symbol + costItems.fuel.toFixed(1), bold: true}
            ],
            [
                {text: "1/2" + " " + translatedStrings.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
                {text: translatedStrings.curr_symbol + (costItems.maintenance/2).toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.rep_improv + "\n" + gstr("#avg-periodic-cost .repairsImprovements_details")},
                {text: translatedStrings.curr_symbol + costItems.repairsImprovements.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.parking + "\n" + gstr("#avg-periodic-cost .parking_details")},
                {text: translatedStrings.curr_symbol + costItems.parking.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.tolls + "\n" + gstr("#avg-periodic-cost .tolls_details")},
                {text: translatedStrings.curr_symbol + costItems.tolls.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.fines + "\n" + gstr("#avg-periodic-cost .fines_details")},
                {text: translatedStrings.curr_symbol + costItems.fines.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.washing + "\n" + gstr("#avg-periodic-cost .washing_details")},
                {text: translatedStrings.curr_symbol + costItems.washing.toFixed(1), bold: true}
            ],
            [
                {text: translatedStrings.total_variable, alignment: "right", bold: true, fontSize: 14},
                {text: translatedStrings.curr_symbol + (calculatedData.costs.perMonth.runningCosts).toFixed(0), bold: true, fontSize: 14}
            ]
        ];

        return body;
    }

    function getTotalCostsTable(){

        var body = [
            [
                {text: translatedStrings.word_total_cap, colSpan: 2, style: "header"},
                {}
            ]
        ];

        if(calculatedData.costs.perUnitDistance.runningCosts){
            body.push(
                [
                    {text: translatedStrings.run_cp_dist},
                    {text: translatedStrings.curr_symbol + calculatedData.costs.perUnitDistance.runningCosts.toFixed(2)}
                ]
            );
        }

        if(calculatedData.costs.perUnitDistance.totalCosts){
            body.push(
                [
                    {text: translatedStrings.total_cp_dist},
                    {text: translatedStrings.curr_symbol + calculatedData.costs.perUnitDistance.totalCosts.toFixed(2)}
                ]
            );
        }

        body.push(
            [
                {text: translatedStrings.total_fixed},
                {text: translatedStrings.curr_symbol + (calculatedData.costs.perMonth.standingCosts).toFixed(0)}
            ],
            [
                {text: translatedStrings.total_variable},
                {text: translatedStrings.curr_symbol + (calculatedData.costs.perMonth.runningCosts).toFixed(0)}
            ],
            [
                {text: translatedStrings.word_total_cap, bold: true, fontSize: 14},
                {text: translatedStrings.curr_symbol + (calculatedData.costs.perMonth.total).toFixed(0), bold: true, fontSize: 14}
            ]
        );

        return body;
    }

    function getBodyFinEffort(){

        var fe = calculatedData.financialEffort;

        var body = [
            [
                {text: translatedStrings.financial_effort, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translatedStrings.extra_data_income + "\n" + gstr("#financial-effort .income_details")},
                {text: translatedStrings.curr_symbol + fe.income.perYear.toFixed(0)}
            ],
            [
                {text: translatedStrings.extra_data_working_time + "\n" + gstr("#financial-effort .working_time_details")},
                {text: fe.workingHoursPerYearToAffordCar.toFixed(0) + " " + translatedStrings.hour_abbr}
            ],
            [
                {text: translatedStrings.distance + "\n" + gstr("#financial-effort .distance_details")},
                {text: calculatedData.drivingDistance.perYear.toFixed(0) + " " + translatedStrings.std_dist}
            ],
            [
                {text: translatedStrings.extra_data_time_spent_in_driving + "\n" + gstr("#financial-effort .time_spent_in_driving_details")},
                {text: calculatedData.timeSpentInDriving.hoursPerYear.toFixed(0) + " " + translatedStrings.hour_abbr}
            ],
            [
                {text: translatedStrings.financial_effort + "\n" + gstr("#financial-effort .financial_effort_details")},
                {text: translatedStrings.curr_symbol + fe.financialEffortPercentage.toFixed(0) + "%"}
            ]
        ];

        return body;
    }

    function getPublicTransportsTable(){

        var pt = calculatedData.publicTransports;

        var body = [
            [
                {text: translatedStrings.extra_data_public_transp, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translatedStrings.pub_trans_text + "\n" + gstr("#equivalent-transport-costs .public_transports_details")},
                {text: translatedStrings.curr_symbol + pt.totalCostsOfStandardPublicTransports.toFixed(0)}
            ],
            [
                {text: translatedStrings.taxi_desl + "\n" + gstr("#equivalent-transport-costs .taxi_details")},
                {text: translatedStrings.curr_symbol + pt.taxi.totalCosts.toFixed(0)}
            ]
        ];
        
        if(pt.furtherPublicTransports.display){
            body.push(
                [
                    {text: translatedStrings.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_details")},
                    {text: translatedStrings.curr_symbol + pt.furtherPublicTransports.totalCosts.toFixed(0)}
                ]            
            );
        }

        body.push(
            [
                {text: translatedStrings.word_total_cap, alignment: "right", bold: true, fontSize: 14},
                {text: translatedStrings.curr_symbol + (pt.totalAlternativeCostsWhenUserHasNoCar).toFixed(0), bold: true, fontSize: 14}
            ]
        );

        return body;
    }

    function getUberTable(){

        var body = [
            [
                {text: "Uber", colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: "Uber" + "\n" + gstr("#equivalent-transport-costs .uber_details")},
                {text: translatedStrings.curr_symbol + calculatedData.uber.uberCosts.total.toFixed(0)}
            ],
            [
                {text: translatedStrings.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_for_uber_details")},
                {text: translatedStrings.curr_symbol + calculatedData.uber.publicTransportsCostsCombinedWithUber.toFixed(0)}
            ],
            [
                {text: translatedStrings.word_total_cap, alignment: "right", bold: true, fontSize: 14},
                {text: translatedStrings.curr_symbol + (calculatedData.costs.perMonth.total).toFixed(0), bold: true, fontSize: 14}
            ]
        ];

        return body;
    }


    //gets the string and converts such HTML info into pure string info.
    function gstr(data_i){

        var string1 = $(data_i).html();
        var str = string1.replace(new RegExp("<br>", "g"), "\n").trim();
        str = str.replace(new RegExp("<li>", "g"), "\n").trim();
        str = str.replace(/(<([^>]+)>)/ig,"").replace(new RegExp("&nbsp;", "g"), '');

        return str;
    }
    
    return {
        initialize: initialize,
        generatePDF: generatePDF,
        download: download,
        print: print        
    };

})(autocosts.serverInfo.translatedStrings,
   autocosts.serverInfo.switches,
   autocosts.serverInfo.selectedCountry);
