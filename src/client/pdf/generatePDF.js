
//PDF REPORT GENERATION MODULE
//see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

autocosts.resultsModule.pdfModule = (function(){
    
    var calculatedData;
    var pdfReport;

    function generatePDF(calculatedDataIn){
        
        calculatedData = calculatedDataIn;
        
        //see modules tree at https://github.com/jfoclpf/autocosts/wiki/Modules-tree
        var chartsInfo = autocosts.resultsModule.chartsModule.getChartsInfo();

        //costs Doughnut Chart width/height proportion
        var costsDoughnutChartWHProp = 1.171;
        //costs Bars Chart width/height proportion
        var costsBarsChartWHProp = 2.005;

        var header = {
            text: autocosts.WORDS.main_title,
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

        if (autocosts.SWITCHES.charts){    
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
                                {text: autocosts.WORDS.financial_effort, style: "header"}
                            ]
                        ]
                    },
                    pageBreak: 'before'
                }
            );

            //chart
            if(chartsInfo.financialEffort.isVisible && autocosts.SWITCHES.charts){
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
                                {text: autocosts.WORDS.publ_tra_equiv, style: "header"}
                            ]
                        ]
                    },
                    pageBreak: 'before'
                }
            );

            //chart
            if(chartsInfo.alternativesToCar.isVisible && autocosts.SWITCHES.charts){
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
        pdfReport.download(autocosts.WORDS.web_page_title + '.pdf');
    }

    function print(){
        pdfReport.print();
    }
    
    //Languages/alphabets that need special fonts, load such fonts from different files
    //These fonts files are virtually created into the file vfs_fonts.js in folder /js/pdf/XX/
    //more information here: https://github.com/bpampuch/pdfmake/wiki/Custom-Fonts---client-side
    function setFonts(docDefinition){

        if (autocosts.COUNTRY=='CN'){
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
        if (autocosts.COUNTRY=='JP'){
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
        if (autocosts.COUNTRY=='IN'){
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
                {text:autocosts.WORDS.your_car_costs_you, colSpan: 4, alignment: 'center'},
                {},{},{}
            ],
            [
                autocosts.WORDS.word_per + autocosts.WORDS.month + "\n" + autocosts.WORDS.curr_symbol     + calculatedData.costs.perMonth.total.toFixed(),
                autocosts.WORDS.word_per + autocosts.WORDS.trimester + "\n" + autocosts.WORDS.curr_symbol + (calculatedData.costs.perMonth.total * 3).toFixed(),
                autocosts.WORDS.word_per + autocosts.WORDS.semester + "\n" + autocosts.WORDS.curr_symbol  + (calculatedData.costs.perMonth.total * 6).toFixed(),
                autocosts.WORDS.word_per + autocosts.WORDS.year + "\n" + autocosts.WORDS.curr_symbol      + (calculatedData.costs.perMonth.total * 12).toFixed()
            ],
            [
                {text: autocosts.WORDS.with_this_level_of_costs + " " + calculatedData.details.ageOfCarInMonths + " " +
                       autocosts.WORDS.months_poss + " " + autocosts.WORDS.curr_symbol + calculatedData.costs.totalEver.toFixed(0),
                colSpan: 4, alignment: 'center'},
                {},{},{}
            ]
        ];

        if (calculatedData.financialEffort.calculated){
            body.push(
                [
                    {text:autocosts.WORDS.financial_effort + ": " + calculatedData.financialEffort.financialEffortPercentage.toFixed(0) + "%",
                    colSpan: 4, alignment: 'center'},
                    {},{},{}
                ]
            );
        }

        return body;
    }

    function getChartsLegend(){

        var cc = autocosts.DISPLAY.costsColors;    
        var fontSize = 8.5;

        var body = [
            [
                { text: autocosts.WORDS.depreciation, fontSize: fontSize, fillColor: cc.depreciation},
                { text: autocosts.WORDS.insurance,    fontSize: fontSize, fillColor: cc.insurance},
                { text: autocosts.WORDS.fuel,         fontSize: fontSize, fillColor: cc.fuel},
                { text: autocosts.WORDS.maintenance,  fontSize: fontSize, fillColor: cc.maintenance},
                { text: autocosts.WORDS.rep_improv,   fontSize: fontSize, fillColor: cc.repairsImprovements},
                { text: autocosts.WORDS.parking,      fontSize: fontSize, fillColor: cc.parking}
            ],
            [
                {text: autocosts.WORDS.credit,     fontSize: fontSize, fillColor: cc.credit},
                {text: autocosts.WORDS.inspection, fontSize: fontSize, fillColor: cc.inspection},
                {text: autocosts.WORDS.road_taxes, fontSize: fontSize, fillColor: cc.roadTaxes},
                {text: autocosts.WORDS.washing,    fontSize: fontSize, fillColor: cc.washing},
                {text: autocosts.WORDS.fines,      fontSize: fontSize, fillColor: cc.fines},
                {text: autocosts.WORDS.tolls,      fontSize: fontSize, fillColor: cc.tolls}
            ]
        ];

        return body;

    }

    function getStandingCostsTable(){

        var cc = autocosts.DISPLAY.costsColors;    
        var costItems = calculatedData.costs.perMonth.items;

        var body = [
            [
                {text: autocosts.WORDS.fixed_costs + "\n" + autocosts.WORDS.total_fixed_descr, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: autocosts.WORDS.costs, alignment: 'center'},
                {text: autocosts.WORDS.monthly_amount, alignment: 'center'},
            ],
            [
                {text: autocosts.WORDS.depreciation + "\n" + gstr("#avg-periodic-cost .depreciation_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.depreciation.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.insurance + "\n" + gstr("#avg-periodic-cost .insurance_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.insurance.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.credit + "\n" + gstr("#avg-periodic-cost .credit_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.credit.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.inspection + "\n" + gstr("#avg-periodic-cost .inspection_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.inspection.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.road_taxes + "\n" + gstr("#avg-periodic-cost .roadTaxes_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.roadTaxes.toFixed(1), bold: true}
            ],
            [
                {text: "1/2" + " " + autocosts.WORDS.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
                {text: autocosts.WORDS.curr_symbol + (costItems.maintenance/2).toFixed(1)}
            ],
            [
                {text: autocosts.WORDS.total_fixed, alignment: "right", bold: true, fontSize: 14},
                {text: autocosts.WORDS.curr_symbol + (calculatedData.costs.perMonth.standingCosts).toFixed(0), bold: true, fontSize: 14}
            ]
        ];

        return body;
    }

    function getRunningCostsTable(){

        var cc = autocosts.DISPLAY.costsColors;
        var costItems = calculatedData.costs.perMonth.items;    

        var body = [
            [
                {text: autocosts.WORDS.running_costs + "\n" + autocosts.WORDS.running_costs_header_2, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: autocosts.WORDS.costs, alignment: 'center'},
                {text: autocosts.WORDS.monthly_amount, alignment: 'center'},
            ],
            [
                {text: autocosts.WORDS.fuel + "\n" + gstr("#avg-periodic-cost .fuel_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.fuel.toFixed(1), bold: true}
            ],
            [
                {text: "1/2" + " " + autocosts.WORDS.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
                {text: autocosts.WORDS.curr_symbol + (costItems.maintenance/2).toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.rep_improv + "\n" + gstr("#avg-periodic-cost .repairsImprovements_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.repairsImprovements.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.parking + "\n" + gstr("#avg-periodic-cost .parking_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.parking.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.tolls + "\n" + gstr("#avg-periodic-cost .tolls_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.tolls.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.fines + "\n" + gstr("#avg-periodic-cost .fines_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.fines.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.washing + "\n" + gstr("#avg-periodic-cost .washing_details")},
                {text: autocosts.WORDS.curr_symbol + costItems.washing.toFixed(1), bold: true}
            ],
            [
                {text: autocosts.WORDS.total_variable, alignment: "right", bold: true, fontSize: 14},
                {text: autocosts.WORDS.curr_symbol + (calculatedData.costs.perMonth.runningCosts).toFixed(0), bold: true, fontSize: 14}
            ]
        ];

        return body;
    }

    function getTotalCostsTable(){

        var body = [
            [
                {text: autocosts.WORDS.word_total_cap, colSpan: 2, style: "header"},
                {}
            ]
        ];

        if(calculatedData.costs.perUnitDistance.runningCosts){
            body.push(
                [
                    {text: autocosts.WORDS.run_cp_dist},
                    {text: autocosts.WORDS.curr_symbol + calculatedData.costs.perUnitDistance.runningCosts.toFixed(2)}
                ]
            );
        }

        if(calculatedData.costs.perUnitDistance.totalCosts){
            body.push(
                [
                    {text: autocosts.WORDS.total_cp_dist},
                    {text: autocosts.WORDS.curr_symbol + calculatedData.costs.perUnitDistance.totalCosts.toFixed(2)}
                ]
            );
        }

        body.push(
            [
                {text: autocosts.WORDS.total_fixed},
                {text: autocosts.WORDS.curr_symbol + (calculatedData.costs.perMonth.standingCosts).toFixed(0)}
            ],
            [
                {text: autocosts.WORDS.total_variable},
                {text: autocosts.WORDS.curr_symbol + (calculatedData.costs.perMonth.runningCosts).toFixed(0)}
            ],
            [
                {text: autocosts.WORDS.word_total_cap, bold: true, fontSize: 14},
                {text: autocosts.WORDS.curr_symbol + (calculatedData.costs.perMonth.total).toFixed(0), bold: true, fontSize: 14}
            ]
        );

        return body;
    }

    function getBodyFinEffort(){

        var fe = calculatedData.financialEffort;

        var body = [
            [
                {text: autocosts.WORDS.financial_effort, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: autocosts.WORDS.extra_data_income + "\n" + gstr("#financial-effort .income_details")},
                {text: autocosts.WORDS.curr_symbol + fe.income.perYear.toFixed(0)}
            ],
            [
                {text: autocosts.WORDS.extra_data_working_time + "\n" + gstr("#financial-effort .working_time_details")},
                {text: fe.workingHoursPerYearToAffordCar.toFixed(0) + " " + autocosts.WORDS.hour_abbr}
            ],
            [
                {text: autocosts.WORDS.distance + "\n" + gstr("#financial-effort .distance_details")},
                {text: calculatedData.drivingDistance.perYear.toFixed(0) + " " + autocosts.WORDS.std_dist}
            ],
            [
                {text: autocosts.WORDS.extra_data_time_spent_in_driving + "\n" + gstr("#financial-effort .time_spent_in_driving_details")},
                {text: calculatedData.timeSpentInDriving.hoursPerYear.toFixed(0) + " " + autocosts.WORDS.hour_abbr}
            ],
            [
                {text: autocosts.WORDS.financial_effort + "\n" + gstr("#financial-effort .financial_effort_details")},
                {text: autocosts.WORDS.curr_symbol + fe.financialEffortPercentage.toFixed(0) + "%"}
            ]
        ];

        return body;
    }

    function getPublicTransportsTable(){

        var pt = calculatedData.publicTransports;

        var body = [
            [
                {text: autocosts.WORDS.extra_data_public_transp, colSpan: 2, style: "header"},
                {}
            ],
            [
                {text: autocosts.WORDS.pub_trans_text + "\n" + gstr("#equivalent-transport-costs .public_transports_details")},
                {text: autocosts.WORDS.curr_symbol + pt.totalCostsOfStandardPublicTransports.toFixed(0)}
            ],
            [
                {text: autocosts.WORDS.taxi_desl + "\n" + gstr("#equivalent-transport-costs .taxi_details")},
                {text: autocosts.WORDS.curr_symbol + pt.taxi.totalCosts.toFixed(0)}
            ]
        ];
        
        if(pt.furtherPublicTransports.display){
            body.push(
                [
                    {text: autocosts.WORDS.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_details")},
                    {text: autocosts.WORDS.curr_symbol + pt.furtherPublicTransports.totalCosts.toFixed(0)}
                ]            
            );
        }

        body.push(
            [
                {text: autocosts.WORDS.word_total_cap, alignment: "right", bold: true, fontSize: 14},
                {text: autocosts.WORDS.curr_symbol + (pt.totalAlternativeCostsWhenUserHasNoCar).toFixed(0), bold: true, fontSize: 14}
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
                {text: autocosts.WORDS.curr_symbol + calculatedData.uber.uberCosts.total.toFixed(0)}
            ],
            [
                {text: autocosts.WORDS.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_for_uber_details")},
                {text: autocosts.WORDS.curr_symbol + calculatedData.uber.publicTransportsCostsCombinedWithUber.toFixed(0)}
            ],
            [
                {text: autocosts.WORDS.word_total_cap, alignment: "right", bold: true, fontSize: 14},
                {text: autocosts.WORDS.curr_symbol + (calculatedData.costs.perMonth.total).toFixed(0), bold: true, fontSize: 14}
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
