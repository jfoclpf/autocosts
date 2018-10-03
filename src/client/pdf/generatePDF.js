function generatePDF(calculatedData){
    
    //are there charts available to be rendered to pdf?
    var isCharts = SWITCHES.charts;
      
    var docDefinition = {
        header: {
            text: WORDS.main_title,
            style: 'title'
        },
        content:[
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ '*', '*', '*', '*' ],
                    body: get_main_table(calculatedData)
                }
            },
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: ['*'],
                    body: [
                        [
                            {text: WORDS.average_costs_per_type, style: "header"}
                        ]
                    ]
                }
            },
            isCharts ? 
                {
                    image: DISPLAY.charts.URIs.costs,
                    width: 500,
                    height: 230,
                    style: 'img_style'
                } : {},
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
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
        ],
        styles: {
            title:{
                fontSize: 14,
                alignment: 'center',
                margin: [0, 10, 0, 10],
                bold: true
            },
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'center',
                color: '#000'
            },
            tableMarging: {
                margin: [0, 20, 0, 20],
                color: '#1C1C1C'
            },
            img_style: {
                alignment: 'center'
            }
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };

    
    //financial effort title and table
    if(DISPLAY.result.fin_effort){
        //header        
        docDefinition.content.push({
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
        if(DISPLAY.charts.isFinEffortChart && isCharts){
            docDefinition.content.push(                
                {
                    image: DISPLAY.charts.URIs.finEffort,
                    width: 450,
                    height: 220,
                    style: 'img_style'
                } 
            );
        }

        //table
        docDefinition.content.push(
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

    /*
    //optional public transports table
    if (DISPLAY.result.public_transports || DISPLAY.result.uber){
        //header        
        body31 = [[{text: WORDS.publ_tra_equiv, style: "header"}]];
        body32 =  {
                                style: 'tableMarging',
                                table:{
                                        headerRows: 0,
                                        widths: ['*'],
                                        body: body31
                                    },
                                    pageBreak: 'before'
                            };
        docDefinition.content.push(body32);

        //chart
        if(DISPLAY.charts.isAlterToCarChart){
            chartData4 = DISPLAY.charts.URIs.alterToCar;
            body33 = isCharts ? {
                        image: chartData4,
                        width: 300,
                        height: 400,
                        style: 'img_style'
                    } : {} ;
            docDefinition.content.push(body33);
        }

        if(DISPLAY.result.public_transports){
            body34 = []; //get_publict_table("#result_table2");
            body35 = {
                style:'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ 390, '*' ],
                    body: body34
                }
            };
            docDefinition.content.push(body35);
        }

        //uber
        if(DISPLAY.result.uber){
            body36 = []; //get_uber_table("#result_table_uber");
            body37 = {
                style:'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ 390, '*' ],
                    body: body36
                }
            };
            docDefinition.content.push(body37);
        }
    }

    //optional external costs table
    if(DISPLAY.result.ext_costs){
        body41 = get_publict_table("#result_table4");
        body42 = {
                        style:'tableMarging',
                        table:{
                            headerRows: 0,
                            widths: [ 390, '*' ],
                            body: body41
                        },
                        pageBreak: 'before'
                    };
        docDefinition.content.push(body42);
    }

    //Languages/alphabets that need special fonts, load such fonts from different files
    //These fonts files are virtually created into the file vfs_fonts.js in folder /js/pdf/XX/
    //more information here: https://github.com/bpampuch/pdfmake/wiki/Custom-Fonts---client-side
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
    }*/

    //creates PDF file
    pdfMake.createPdf(docDefinition).download(WORDS.web_page_title + '.pdf');

}


//******************************************************
//******************************************************
//functions that generate the respective tables

function get_main_table(calculatedData){
            
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
            {text: WORDS.depreciation + "\n" + gstr("#avg-periodic-cost .depreciation_details"), fillColor: cc.depreciation},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.depreciation.toFixed(1), fillColor: cc.depreciation, bold: true}
        ],
        [
            {text: WORDS.insurance + "\n" + gstr("#avg-periodic-cost .insurance_details"), fillColor: cc.insurance},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.insurance.toFixed(1), fillColor: cc.insurance, bold: true}
        ],
        [
            {text: WORDS.credit + "\n" + gstr("#avg-periodic-cost .credit_details"), fillColor: cc.credit},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.credit.toFixed(1), fillColor: cc.credit, bold: true}
        ],
        [
            {text: WORDS.inspection + "\n" + gstr("#avg-periodic-cost .inspection_details"), fillColor: cc.inspection},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.inspection.toFixed(1), fillColor: cc.inspection, bold: true}
        ],
        [
            {text: WORDS.road_taxes + "\n" + gstr("#avg-periodic-cost .car_tax_details"), fillColor: cc.car_tax},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.car_tax.toFixed(1), fillColor: cc.car_tax, bold: true}
        ],
        [
            {text: "1/2" + " " + WORDS.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details"), fillColor: cc.maintenance},
            {text: WORDS.curr_symbol + (calculatedData.monthly_costs.maintenance/2).toFixed(1), fillColor: cc.maintenance}
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
            {text: WORDS.fuel + "\n" + gstr("#avg-periodic-cost .fuel_details"), fillColor: cc.fuel},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.fuel.toFixed(1), fillColor: cc.fuel, bold: true}
        ],
        [
            {text: "1/2" + " " + WORDS.maintenance + "\n" + gstr("#avg-periodic-cost .maintenance_details"), fillColor: cc.maintenance},
            {text: WORDS.curr_symbol + (calculatedData.monthly_costs.maintenance/2).toFixed(1), fillColor: cc.maintenance, bold: true}
        ],
        [
            {text: WORDS.rep_improv + "\n" + gstr("#avg-periodic-cost .repairs_improv_details"), fillColor: cc.repairs_improv},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.repairs_improv.toFixed(1), fillColor: cc.repairs_improv, bold: true}
        ],
        [
            {text: WORDS.parking + "\n" + gstr("#avg-periodic-cost .parking_details"), fillColor: cc.parking},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.parking.toFixed(1), fillColor: cc.parking, bold: true}
        ],
        [
            {text: WORDS.tolls + "\n" + gstr("#avg-periodic-cost .tolls_details"), fillColor: cc.tolls},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.tolls.toFixed(1), fillColor: cc.tolls, bold: true}
        ],
        [
            {text: WORDS.fines + "\n" + gstr("#avg-periodic-cost .fines_details"), fillColor: cc.fines},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.fines.toFixed(1), fillColor: cc.fines, bold: true}
        ],
        [
            {text: WORDS.washing + "\n" + gstr("#avg-periodic-cost .washing_details"), fillColor: cc.washing},
            {text: WORDS.curr_symbol + calculatedData.monthly_costs.washing.toFixed(1), fillColor: cc.washing, bold: true}
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


//gets the string and converts such HTML info into pure string info.
function gstr(data_i){

    var string1 = $(data_i).html();
    var str = string1.replace(new RegExp("<br>", "g"), "\n").trim();
    str = str.replace(new RegExp("<li>", "g"), "\n").trim();
    str = str.replace(/(<([^>]+)>)/ig,"").replace(new RegExp("&nbsp;", "g"), '');

    return str;
}
