function generatePDF(calculatedData, action){

    //are there charts available to be rendered to pdf?
    var isCharts = SWITCHES.charts;

    var header = {
        text: WORDS.main_title,
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
                body: getMainTable(calculatedData)
            }
        }
    ];
    
    if (isCharts){    
        content.push(
            {
                image: DISPLAY.charts.costsDoughnut.URI,
                width: 250,
                height: Math.round(250 * $("#costsDoughnutChart").height() / $("#costsDoughnutChart").width()),
                margin: [0, 10, 0, 15], //[left, top, right, bottom]
                alignment: 'center'
            },
            {
                image: DISPLAY.charts.costsBars.URI,
                width: 500,
                height: Math.round(500 * $("#costsBarsChart").height() / $("#costsBarsChart").width()),
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
                body: getStandingCostsTable(calculatedData)
            }
        },
        {
            style: 'tableMarging',
            table:{
                headerRows: 0,
                widths: [ 390, '*' ],
                body: getRunningCostsTable(calculatedData)
            }
        },
        {
            style: 'tableMarging',
            table:{
                headerRows: 0,
                widths: [ 390, '*' ],
                body: getTotalCostsTable(calculatedData)
            }
        }
    );
    
    //financial effort title and table
    if(DISPLAY.result.fin_effort){
        //header
        content.push(
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: ['*'],
                    body: [
                        [
                            {text: WORDS.financial_effort, style: "header"}
                        ]
                    ]
                },
                pageBreak: 'before'
            }
        );

        //chart
        if(DISPLAY.charts.finEffort.isVisible && isCharts){
            content.push(
                {
                    image: DISPLAY.charts.finEffort.URI,
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
                    body: getBodyFinEffort(calculatedData)
                }
            }
        );

    }

    //Equivalent transport costs / uber / public transports
    if (DISPLAY.result.public_transports || DISPLAY.result.uber){
        //header
        content.push(
            {
                style: 'tableMarging',
                table: {
                    headerRows: 0,
                    widths: ['*'],
                    body: [
                        [
                            {text: WORDS.publ_tra_equiv, style: "header"}
                        ]
                    ]
                },
                pageBreak: 'before'
            }
        );

        //chart
        if(DISPLAY.charts.alterToCar.isVisible && isCharts){
            content.push(
                {
                    image: DISPLAY.charts.alterToCar.URI,
                    width: 400,
                    height: Math.round(400 * $("#equivalentTransportChart").height() / $("#equivalentTransportChart").width()),
                    style: 'img_style'
                }
            );
        }

        if(DISPLAY.result.public_transports){
            content.push(
                {
                    style: 'tableMarging',
                    table: {
                        headerRows: 0,
                        widths: [ 390, '*' ],
                        body: getPublicTransportsTable(calculatedData)
                    }
                }
            );
        }

        //uber
        if(DISPLAY.result.uber){
            content.push(
                {
                    style:'tableMarging',
                    table:{
                        headerRows: 0,
                        widths: [ 390, '*' ],
                        body: getUberTable(calculatedData)
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

    //creates PDF file
    if (action == "download"){
        pdfMake.createPdf(docDefinition).download(WORDS.web_page_title + '.pdf');
    }
    else if (action == "print"){
        pdfMake.createPdf(docDefinition).print();
    }
    else{
        console.error("Wrong action on pdfMake: " + action + ". It should be 'download' or 'print'");
    }

}

//Languages/alphabets that need special fonts, load such fonts from different files
//These fonts files are virtually created into the file vfs_fonts.js in folder /js/pdf/XX/
//more information here: https://github.com/bpampuch/pdfmake/wiki/Custom-Fonts---client-side
function setFonts(docDefinition){

    if (COUNTRY=='CN'){
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
    if (COUNTRY=='JP'){
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
    if (COUNTRY=='IN'){
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

function getMainTable(calculatedData){

    var body = [
        [
            {text:WORDS.your_car_costs_you, colSpan: 4, alignment: 'center'},
            {},{},{}
        ],
        [
            WORDS.word_per + WORDS.month + "\n" + WORDS.curr_symbol + calculatedData.total_costs_month.toFixed(),
            WORDS.word_per + WORDS.trimester + "\n" + WORDS.curr_symbol + (calculatedData.total_costs_month*3).toFixed(),
            WORDS.word_per + WORDS.semester + "\n" + WORDS.curr_symbol + (calculatedData.total_costs_month*6).toFixed(),
            WORDS.word_per + WORDS.year + "\n" + WORDS.curr_symbol + (calculatedData.total_costs_month*12).toFixed()
        ],
        [
            {text: WORDS.with_this_level_of_costs + " " + calculatedData.age_months + " " +
                   WORDS.months_poss + " " + WORDS.curr_symbol + calculatedData.total_costs_ever.toFixed(0),
            colSpan: 4, alignment: 'center'},
            {},{},{}
        ]
    ];

    if (calculatedData.fin_effort_calculated){
        body.push(
            [
                {text:WORDS.financial_effort + ": " + calculatedData.fin_effort.percentage_of_income.toFixed(0) + "%",
                colSpan: 4, alignment: 'center'},
                {},{},{}
            ]
        );
    }

    return body;
}

function getChartsLegend(){

    var cc = DISPLAY.costsColors;    
    var fontSize = 8.5;

    var body = [
        [
            { text: WORDS.depreciation, fontSize: fontSize, fillColor: cc.depreciation},
            { text: WORDS.insurance,    fontSize: fontSize, fillColor: cc.insurance},
            { text: WORDS.fuel,         fontSize: fontSize, fillColor: cc.fuel},
            { text: WORDS.maintenance,  fontSize: fontSize, fillColor: cc.maintenance},
            { text: WORDS.rep_improv,   fontSize: fontSize, fillColor: cc.repairs_improv},
            { text: WORDS.parking,      fontSize: fontSize, fillColor: cc.parking}
        ],
        [
            {text: WORDS.credit,     fontSize: fontSize, fillColor: cc.credit},
            {text: WORDS.inspection, fontSize: fontSize, fillColor: cc.inspection},
            {text: WORDS.road_taxes, fontSize: fontSize, fillColor: cc.car_tax},
            {text: WORDS.washing,    fontSize: fontSize, fillColor: cc.washing},
            {text: WORDS.fines,      fontSize: fontSize, fillColor: cc.fines},
            {text: WORDS.tolls,      fontSize: fontSize, fillColor: cc.tolls}
        ]
    ];

    return body;

}

function getStandingCostsTable(calculatedData){

    var cc = DISPLAY.costsColors;

    var body = [
        [
            {text: WORDS.fixed_costs + "\n" + WORDS.total_fixed_descr, colSpan: 2, style: "header"},
            {}
        ],
        [
            {text: WORDS.costs, alignment: 'center'},
            {text: WORDS.monthly_amount, alignment: 'center'},
        ],
        [
            {text: WORDS.depreciation + "\n" + gstr("#avg-periodic-cost .depreciation_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.depreciation.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.insurance + "\n" + gstr("#avg-periodic-cost .insurance_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.insurance.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.credit + "\n" + gstr("#avg-periodic-cost .credit_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.credit.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.inspection + "\n" + gstr("#avg-periodic-cost .inspection_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.inspection.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.road_taxes + "\n" + gstr("#avg-periodic-cost .car_tax_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.car_tax.toFixed(1), bold: true}
        ],
        [
            {text: "1/2" + " " + WORDS.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
            {text: WORDS.curr_symbol + (calculatedData.monthly_costs.maintenance/2).toFixed(1)}
        ],
        [
            {text: WORDS.total_fixed, alignment: "right", bold: true, fontSize: 14},
            {text: WORDS.curr_symbol + (calculatedData.total_standing_costs_month).toFixed(0), bold: true, fontSize: 14}
        ]
    ];

    return body;
}

function getRunningCostsTable(calculatedData){

    var cc = DISPLAY.costsColors;

    var body = [
        [
            {text: WORDS.running_costs + "\n" + WORDS.running_costs_header_2, colSpan: 2, style: "header"},
            {}
        ],
        [
            {text: WORDS.costs, alignment: 'center'},
            {text: WORDS.monthly_amount, alignment: 'center'},
        ],
        [
            {text: WORDS.fuel + "\n" + gstr("#avg-periodic-cost .fuel_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.fuel.toFixed(1), bold: true}
        ],
        [
            {text: "1/2" + " " + WORDS.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details")},
            {text: WORDS.curr_symbol + (calculatedData.monthly_costs.maintenance/2).toFixed(1), bold: true}
        ],
        [
            {text: WORDS.rep_improv + "\n" + gstr("#avg-periodic-cost .repairs_improv_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.repairs_improv.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.parking + "\n" + gstr("#avg-periodic-cost .parking_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.parking.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.tolls + "\n" + gstr("#avg-periodic-cost .tolls_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.tolls.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.fines + "\n" + gstr("#avg-periodic-cost .fines_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.fines.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.washing + "\n" + gstr("#avg-periodic-cost .washing_details")},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.washing.toFixed(1), bold: true}
        ],
        [
            {text: WORDS.total_variable, alignment: "right", bold: true, fontSize: 14},
            {text: WORDS.curr_symbol + (calculatedData.total_running_costs_month).toFixed(0), bold: true, fontSize: 14}
        ]
    ];

    return body;
}

function getTotalCostsTable(calculatedData){

    var body = [
        [
            {text: WORDS.word_total_cap, colSpan: 2, style: "header"},
            {}
        ]
    ];

    if(calculatedData.running_costs_p_unit_distance){
        body.push(
            [
                {text: WORDS.run_cp_dist},
                {text: WORDS.curr_symbol + calculatedData.running_costs_p_unit_distance.toFixed(2)}
            ]
        );
    }

    if(calculatedData.total_costs_p_unit_distance){
        body.push(
            [
                {text: WORDS.total_cp_dist},
                {text: WORDS.curr_symbol + calculatedData.total_costs_p_unit_distance.toFixed(2)}
            ]
        );
    }

    body.push(
        [
            {text: WORDS.total_fixed},
            {text: WORDS.curr_symbol + (calculatedData.total_standing_costs_month).toFixed(0)}
        ],
        [
            {text: WORDS.total_variable},
            {text: WORDS.curr_symbol + (calculatedData.total_running_costs_month).toFixed(0)}
        ],
        [
            {text: WORDS.word_total_cap, bold: true, fontSize: 14},
            {text: WORDS.curr_symbol + (calculatedData.total_costs_month).toFixed(0), bold: true, fontSize: 14}
        ]
    );

    return body;
}

function getBodyFinEffort(calculatedData){

    var body = [
        [
            {text: WORDS.financial_effort, colSpan: 2, style: "header"},
            {}
        ],
        [
            {text: WORDS.extra_data_income + "\n" + gstr("#financial-effort .income_details")},
            {text: WORDS.curr_symbol + calculatedData.fin_effort.income_per_year.toFixed(0)}
        ],
        [
            {text: WORDS.extra_data_working_time + "\n" + gstr("#financial-effort .working_time_details")},
            {text: calculatedData.fin_effort.work_hours_per_y.toFixed(0) + " " + WORDS.hour_abbr}
        ],
        [
            {text: WORDS.distance + "\n" + gstr("#financial-effort .distance_details")},
            {text: calculatedData.driving_distance.drive_per_year.toFixed(0) + " " + WORDS.std_dist}
        ],
        [
            {text: WORDS.extra_data_time_spent_in_driving + "\n" + gstr("#financial-effort .time_spent_in_driving_details")},
            {text: calculatedData.time_spent_driving.hours_drive_per_year.toFixed(0) + " " + WORDS.hour_abbr}
        ],
        [
            {text: WORDS.financial_effort + "\n" + gstr("#financial-effort .financial_effort_details")},
            {text: WORDS.curr_symbol + calculatedData.fin_effort.percentage_of_income.toFixed(0) + "%"}
        ]
    ];

    return body;
}

function getPublicTransportsTable(calculatedData){

    var body = [
        [
            {text: WORDS.extra_data_public_transp, colSpan: 2, style: "header"},
            {}
        ],
        [
            {text: WORDS.pub_trans_text + "\n" + gstr("#equivalent-transport-costs .public_transports_details")},
            {text: WORDS.curr_symbol + calculatedData.public_transports.total_price_pt.toFixed(0)}
        ],
        [
            {text: WORDS.taxi_desl + "\n" + gstr("#equivalent-transport-costs .taxi_details")},
            {text: WORDS.curr_symbol + calculatedData.public_transports.taxi_cost.toFixed(0)}
        ],
        [
            {text: WORDS.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_details")},
            {text: WORDS.curr_symbol + calculatedData.public_transports.other_pt.toFixed(0)}
        ],
        [
            {text: WORDS.word_total_cap, alignment: "right", bold: true, fontSize: 14},
            {text: WORDS.curr_symbol + (calculatedData.public_transports.total_altern).toFixed(0), bold: true, fontSize: 14}
        ]
    ];

    return body;
}

function getUberTable(calculatedData){

    var body = [
        [
            {text: "Uber", colSpan: 2, style: "header"},
            {}
        ],
        [
            {text: "Uber" + "\n" + gstr("#equivalent-transport-costs .uber_details")},
            {text: WORDS.curr_symbol + calculatedData.uber.total_costs_by_uber.toFixed(0)}
        ],
        [
            {text: WORDS.other_pub_trans + "\n" + gstr("#equivalent-transport-costs .other_pub_trans_for_uber_details")},
            {text: WORDS.curr_symbol + calculatedData.uber.other_public_transports.toFixed(0)}
        ],
        [
            {text: WORDS.word_total_cap, alignment: "right", bold: true, fontSize: 14},
            {text: WORDS.curr_symbol + (calculatedData.total_costs_month).toFixed(0), bold: true, fontSize: 14}
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
