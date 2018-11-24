
//PDF REPORT GENERATION MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

autocosts.resultsModule.pdfModule = (function(){
    
    var calculatedData;
    var pdfReport;
    var translationWords = autocosts.serverInfo.translationWords;

    function generatePDF(calculatedDataIn){
        
        calculatedData = calculatedDataIn;
        
        //see modules tree at https://github.com/jfoclpf/autocosts/wiki/Modules-tree
        var chartsInfo = autocosts.resultsModule.chartsModule.getChartsInfo();

        //costs Doughnut Chart width/height proportion
        var costsDoughnutChartWHProp = 1.171;
        //costs Bars Chart width/height proportion
        var costsBarsChartWHProp = 2.005;

        var header = {
            text: translationWords.main_title,
            style: 'title'
        };

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

        if (autocosts.serverInfo.switches.charts){    
            content.push(
                {
                    image: chartsInfo.costsDoughnut.base64Image,
                    width: 220,
                    height: Math.round(220 / costsDoughnutChartWHProp),
                    margin: [0, 10, 0, 15], //[left, top, right, bottom]
                    alignment: 'center'
                },
                {
                    image: chartsInfo.costsBars.base64Image,
                    width: 500,
                    height: Math.round(500 / costsBarsChartWHProp),
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
                                {text: translationWords.financial_effort, style: "header"}
                            ]
                        ]
                    },
                    pageBreak: 'before'
                }
            );

            //chart
            if(chartsInfo.financialEffort.isVisible && autocosts.serverInfo.switches.charts){
                content.push(
                    {
                        image: chartsInfo.financialEffort.base64Image,
                        width: 350,
                        height: Math.round(350 * $("#finEffortChart").height() / $("#finEffortChart").width()),
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
                                {text: translationWords.publ_tra_equiv, style: "header"}
                            ]
                        ]
                    },
                    pageBreak: 'before'
                }
            );

            //chart
            if(chartsInfo.alternativesToCar.isVisible && autocosts.serverInfo.switches.charts){
                content.push(
                    {
                        image: chartsInfo.alternativesToCar.base64Image,
                        width: 400,
                        height: Math.round(400 * $("#equivalentTransportChart").height() / $("#equivalentTransportChart").width()),
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
    }
    
    function download(){
        pdfReport.download(translationWords.web_page_title + '.pdf');
    }

    function print(){
        pdfReport.print();
    }
    
    //Languages/alphabets that need special fonts, load such fonts from different files
    //These fonts files are virtually created into the file vfs_fonts.js in folder /js/pdf/XX/
    //more information here: https://github.com/bpampuch/pdfmake/wiki/Custom-Fonts---client-side
    function setFonts(docDefinition){

        if (autocosts.serverInfo.selectedCountry=='CN'){
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
        if (autocosts.serverInfo.selectedCountry=='JP'){
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
        if (autocosts.serverInfo.selectedCountry=='IN'){
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
                {text:translationWords.your_car_costs_you, colSpan: 4, alignment: 'center'},
                {},{},{}
            ],
            [
                translationWords.word_per + translationWords.month + "\n" + translationWords.curr_symbol     + calculatedData.costs.perMonth.total.toFixed(),
                translationWords.word_per + translationWords.trimester + "\n" + translationWords.curr_symbol + (calculatedData.costs.perMonth.total * 3).toFixed(),
                translationWords.word_per + translationWords.semester + "\n" + translationWords.curr_symbol  + (calculatedData.costs.perMonth.total * 6).toFixed(),
                translationWords.word_per + translationWords.year + "\n" + translationWords.curr_symbol      + (calculatedData.costs.perMonth.total * 12).toFixed()
            ],
            [
                {text: translationWords.with_this_level_of_costs + " " + calculatedData.details.ageOfCarInMonths + " " +
                       translationWords.months_poss + " " + translationWords.curr_symbol + calculatedData.costs.totalEver.toFixed(0),
                colSpan: 4, alignment: 'center'},
                {},{},{}
            ]
        ];

        if (calculatedData.financialEffort.calculated){
            body.push(
                [
                    {text:translationWords.financial_effort + ": " + calculatedData.financialEffort.financialEffortPercentage.toFixed(0) + "%",
                    colSpan: 4, alignment: 'center'},
                    {},{},{}
                ]
            );
        }

        return body;
    }

    function getChartsLegend(){

        var cc = autocosts.displayObj.costsColors;    
        var fontSize = 8.5;

        var body = [
            [
                { text: translationWords.depreciation, fontSize: fontSize, fillColor: cc.depreciation},
                { text: translationWords.insurance,    fontSize: fontSize, fillColor: cc.insurance},
                { text: translationWords.fuel,         fontSize: fontSize, fillColor: cc.fuel},
                { text: translationWords.maintenance,  fontSize: fontSize, fillColor: cc.maintenance},
                { text: translationWords.rep_improv,   fontSize: fontSize, fillColor: cc.repairsImprovements},
                { text: translationWords.parking,      fontSize: fontSize, fillColor: cc.parking}
            ],
            [
                {text: translationWords.credit,     fontSize: fontSize, fillColor: cc.credit},
                {text: translationWords.inspection, fontSize: fontSize, fillColor: cc.inspection},
                {text: translationWords.road_taxes, fontSize: fontSize, fillColor: cc.roadTaxes},
                {text: translationWords.washing,    fontSize: fontSize, fillColor: cc.washing},
                {text: translationWords.fines,      fontSize: fontSize, fillColor: cc.fines},
                {text: translationWords.tolls,      fontSize: fontSize, fillColor: cc.tolls}
            ]
        ];

        return body;

    }

    function getStandingCostsTable(){

        var cc = autocosts.displayObj.costsColors;    
        var costItems = calculatedData.costs.perMonth.items;

        var body = [
            [
                {text: translationWords.fixed_costs + "\n" + translationWords.total_fixed_descr, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translationWords.costs, alignment: 'center'},
                {text: translationWords.monthly_amount, alignment: 'center'},
            ],
            [
                {text: translationWords.depreciation + "\n" + gstr("#avg-periodic-cost .depreciation_details")},
                {text: translationWords.curr_symbol + costItems.depreciation.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.insurance + "\n" + gstr("#avg-periodic-cost .insurance_details")},
                {text: translationWords.curr_symbol + costItems.insurance.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.credit + "\n" + gstr("#avg-periodic-cost .credit_details")},
                {text: translationWords.curr_symbol + costItems.credit.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.inspection + "\n" + gstr("#avg-periodic-cost .inspection_details")},
                {text: translationWords.curr_symbol + costItems.inspection.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.road_taxes + "\n" + gstr("#avg-periodic-cost .roadTaxes_details")},
                {text: translationWords.curr_symbol + costItems.roadTaxes.toFixed(1), bold: true}
            ],
            [
                {text: "1/2" + " " + translationWords.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
                {text: translationWords.curr_symbol + (costItems.maintenance/2).toFixed(1)}
            ],
            [
                {text: translationWords.total_fixed, alignment: "right", bold: true, fontSize: 14},
                {text: translationWords.curr_symbol + (calculatedData.costs.perMonth.standingCosts).toFixed(0), bold: true, fontSize: 14}
            ]
        ];

        return body;
    }

    function getRunningCostsTable(){

        var cc = autocosts.displayObj.costsColors;
        var costItems = calculatedData.costs.perMonth.items;    

        var body = [
            [
                {text: translationWords.running_costs + "\n" + translationWords.running_costs_header_2, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translationWords.costs, alignment: 'center'},
                {text: translationWords.monthly_amount, alignment: 'center'},
            ],
            [
                {text: translationWords.fuel + "\n" + gstr("#avg-periodic-cost .fuel_details")},
                {text: translationWords.curr_symbol + costItems.fuel.toFixed(1), bold: true}
            ],
            [
                {text: "1/2" + " " + translationWords.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
                {text: translationWords.curr_symbol + (costItems.maintenance/2).toFixed(1), bold: true}
            ],
            [
                {text: translationWords.rep_improv + "\n" + gstr("#avg-periodic-cost .repairsImprovements_details")},
                {text: translationWords.curr_symbol + costItems.repairsImprovements.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.parking + "\n" + gstr("#avg-periodic-cost .parking_details")},
                {text: translationWords.curr_symbol + costItems.parking.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.tolls + "\n" + gstr("#avg-periodic-cost .tolls_details")},
                {text: translationWords.curr_symbol + costItems.tolls.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.fines + "\n" + gstr("#avg-periodic-cost .fines_details")},
                {text: translationWords.curr_symbol + costItems.fines.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.washing + "\n" + gstr("#avg-periodic-cost .washing_details")},
                {text: translationWords.curr_symbol + costItems.washing.toFixed(1), bold: true}
            ],
            [
                {text: translationWords.total_variable, alignment: "right", bold: true, fontSize: 14},
                {text: translationWords.curr_symbol + (calculatedData.costs.perMonth.runningCosts).toFixed(0), bold: true, fontSize: 14}
            ]
        ];

        return body;
    }

    function getTotalCostsTable(){

        var body = [
            [
                {text: translationWords.word_total_cap, colSpan: 2, style: "header"},
                {}
            ]
        ];

        if(calculatedData.costs.perUnitDistance.runningCosts){
            body.push(
                [
                    {text: translationWords.run_cp_dist},
                    {text: translationWords.curr_symbol + calculatedData.costs.perUnitDistance.runningCosts.toFixed(2)}
                ]
            );
        }

        if(calculatedData.costs.perUnitDistance.totalCosts){
            body.push(
                [
                    {text: translationWords.total_cp_dist},
                    {text: translationWords.curr_symbol + calculatedData.costs.perUnitDistance.totalCosts.toFixed(2)}
                ]
            );
        }

        body.push(
            [
                {text: translationWords.total_fixed},
                {text: translationWords.curr_symbol + (calculatedData.costs.perMonth.standingCosts).toFixed(0)}
            ],
            [
                {text: translationWords.total_variable},
                {text: translationWords.curr_symbol + (calculatedData.costs.perMonth.runningCosts).toFixed(0)}
            ],
            [
                {text: translationWords.word_total_cap, bold: true, fontSize: 14},
                {text: translationWords.curr_symbol + (calculatedData.costs.perMonth.total).toFixed(0), bold: true, fontSize: 14}
            ]
        );

        return body;
    }

    function getBodyFinEffort(){

        var fe = calculatedData.financialEffort;

        var body = [
            [
                {text: translationWords.financial_effort, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translationWords.extra_data_income + "\n" + gstr("#financial-effort .income_details")},
                {text: translationWords.curr_symbol + fe.income.perYear.toFixed(0)}
            ],
            [
                {text: translationWords.extra_data_working_time + "\n" + gstr("#financial-effort .working_time_details")},
                {text: fe.workingHoursPerYearToAffordCar.toFixed(0) + " " + translationWords.hour_abbr}
            ],
            [
                {text: translationWords.distance + "\n" + gstr("#financial-effort .distance_details")},
                {text: calculatedData.drivingDistance.perYear.toFixed(0) + " " + translationWords.std_dist}
            ],
            [
                {text: translationWords.extra_data_time_spent_in_driving + "\n" + gstr("#financial-effort .time_spent_in_driving_details")},
                {text: calculatedData.timeSpentInDriving.hoursPerYear.toFixed(0) + " " + translationWords.hour_abbr}
            ],
            [
                {text: translationWords.financial_effort + "\n" + gstr("#financial-effort .financial_effort_details")},
                {text: translationWords.curr_symbol + fe.financialEffortPercentage.toFixed(0) + "%"}
            ]
        ];

        return body;
    }

    function getPublicTransportsTable(){

        var pt = calculatedData.publicTransports;

        var body = [
            [
                {text: translationWords.extra_data_public_transp, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: translationWords.pub_trans_text + "\n" + gstr("#equivalent-transport-costs .public_transports_details")},
                {text: translationWords.curr_symbol + pt.totalCostsOfStandardPublicTransports.toFixed(0)}
            ],
            [
                {text: translationWords.taxi_desl + "\n" + gstr("#equivalent-transport-costs .taxi_details")},
                {text: translationWords.curr_symbol + pt.taxi.totalCosts.toFixed(0)}
            ]
        ];
        
        if(pt.furtherPublicTransports.display){
            body.push(
                [
                    {text: translationWords.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_details")},
                    {text: translationWords.curr_symbol + pt.furtherPublicTransports.totalCosts.toFixed(0)}
                ]            
            );
        }

        body.push(
            [
                {text: translationWords.word_total_cap, alignment: "right", bold: true, fontSize: 14},
                {text: translationWords.curr_symbol + (pt.totalAlternativeCostsWhenUserHasNoCar).toFixed(0), bold: true, fontSize: 14}
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
                {text: translationWords.curr_symbol + calculatedData.uber.uberCosts.total.toFixed(0)}
            ],
            [
                {text: translationWords.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_for_uber_details")},
                {text: translationWords.curr_symbol + calculatedData.uber.publicTransportsCostsCombinedWithUber.toFixed(0)}
            ],
            [
                {text: translationWords.word_total_cap, alignment: "right", bold: true, fontSize: 14},
                {text: translationWords.curr_symbol + (calculatedData.costs.perMonth.total).toFixed(0), bold: true, fontSize: 14}
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
        generatePDF: generatePDF,
        download:    download,
        print:       print        
    };

})();
