function generatePDF(main_title){

    var body0,
        body11, body12, body13, body14,
        body21, body22, body23, body24, body25,
        body31, body32, body33, body34, body35, body36, body37,
        body41, body42;
    var title1, title2, title3, title4;
    var chartData1, chartData2, chartData3, chartData4;  //chart images

    //main top table with total costs
    body0 = get_main_table("#result_table0");

    //monthly costs title and table
    title1 = gstr($('#monthly_costs_title').html());
    body11 = [[{text: title1, style: "header"}]];

    //monthly costs tables
    body12 = get_monthly_costs_table("#standing_costs_table");
    body13 = get_monthly_costs_table("#running_costs_table");
    body14 = get_monthly_costs_table("#total_costs_table");

    chartData1 = DISPLAY.charts.URIs.pieChart;
    chartData2 = DISPLAY.charts.URIs.barChart;

    var docDefinition = {
        header: {
            text: main_title,
            style: 'title'
        },
        content:[
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ '*', '*', '*', '*' ],
                    body: body0
                }
            },
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: ['*'],
                    body: body11
                }
            },
            {
                image: chartData1,
                width: 400,
                height: 267,
                style: 'img_style'
            },
            {
                image: chartData2,
                width: 400,
                height: 300,
                style: 'img_style',
                pageBreak: 'after'
            },
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ 390, '*' ],
                    body: body12
                }
            },
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ 390, '*' ],
                    body: body13
                }
            },
            {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ 390, '*' ],
                    body: body14
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
                fontSize: 12,
                bold: true,
                alignment: 'center',
                color: '#000'
            },
            total: {
                fontSize: 10,
                bold: true,
                alignment: 'right',
                color: '#000'
            },
            main_total: {
                fontSize: 12,
                bold: true,
                alignment:    'right',
                color: '#000'
            },
            main_total_value: {
                fontSize: 12,
                bold: true,
                alignment:    'left',
                color: '#000'
            },
            cell: {
                fontSize: 10,
            },
            header2: {
                fontSize: 12,
                bold: true,
                alignment:    'left',
                color: '#000'
            },
            tableMarging: {
                margin: [0, 0, 0, 20],
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
        title2 = gstr($('#fin_effort_title').html());
        body21 = [[{text: title2, style: "header"}]];
        body22 = {
                    style: 'tableMarging',
                    table:{
                        headerRows: 0,
                        widths: ['*'],
                        body: body21
                    },
                    pageBreak: 'before'
                };
        docDefinition.content.push(body22);

        //chart
        if(DISPLAY.charts.isFinEffortChart){
            chartData3 = DISPLAY.charts.URIs.finEffort;
            body23 = {
                        image: chartData3,
                        width: 400,
                        height: 220,
                        style: 'img_style'
                    };
            docDefinition.content.push(body23);
        }

        //table
        body24 = getBodyFinEffort("#result_table3");
        body25 = {
                    style:'tableMarging',
                    table:{
                        headerRows: 1,
                        widths: [ 390, '*' ],
                        body: body24
                    }
                };
        docDefinition.content.push(body25);

    }

    //optional public transports table
    if (DISPLAY.result.public_transports || DISPLAY.result.uber){
        //header
        title3 = gstr($('#alternative_to_carcosts_section').html());
        body31 = [[{text: title3, style: "header"}]];
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
            body33 = {
                        image: chartData4,
                        width: 400,
                        height: 350,
                        style: 'img_style'
                    };
            docDefinition.content.push(body33);
        }

        if(DISPLAY.result.public_transports){
            body34 = get_publict_table("#result_table2");
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
            body36 = get_uber_table("#result_table_uber");
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
    }

    //creates PDF file
    pdfMake.createPdf(docDefinition).download(main_title+'.pdf');

}


//******************************************************
//******************************************************
//functions that generate the respective tables

function get_main_table(tableID){

    //gets an array of jQuery objects representing the "td" elements of the table
    var data = $(tableID +' td');

    var body = [];
    var str, el, el2, el3, el4;

    for(var i=0; i<data.length; i++){

        switch(i){
            case 0:
                str = gstr(data[i]);
                el = {text: str, colSpan:4, style: 'header'};
                body.push([el,'','','']);
                break;
            case 1:
                str = gstr(data[i]);
                el  = {text: str, style: 'header'};
                str = gstr(data[i+1]);
                el2 = {text: str, style: 'header'};
                str = gstr(data[i+2]);
                el3 = {text: str, style: 'header'};
                str = gstr(data[i+3]);
                el4 = {text: str, style: 'header'};
                body.push([el,el2,el3,el4]);
                break;
            case 5:
                str = gstr(data[i]);
                el = {text: str, colSpan:4, style: 'header'};
                body.push([el,'','','']);
                break;
            case 6:
                str = gstr(data[i]);
                el = {text: str, colSpan:4, style: 'header'};
                body.push([el,'','','']);
                break;
        }
    }
    return body;
}


function get_monthly_costs_table(tableID){

    //gets an array of jQuery objects representing the "td" elements of the table
    var data = $(tableID +' td');

    var body = [];
    var str, str2, el, el2;

    for(var i=0; i<data.length; i+=2){
        str = gstr(data[i]);
        switch(i){
            case 0: //header
                el = {text: str, colSpan:2, style: 'header'};
                body.push([el,'']);
                i=-1; //so the next step is i=1
                break;
            case 1://first line header  || Costs | Monthly Amount ||
                str2 = gstr(data[i+1]);
                el2 = {text: str2, style: 'header'};
                str = str.split('\n')[0]; //gets just the first line of the <td> info
                el = {text: str, style: 'header'};
                body.push([el, el2]);
                break;
            case (data.length-2)://first td on the last line
                str2 = gstr(data[i+1]);
                el2 = {text: str2, style: 'main_total_value'};
                el = {text: str, style: 'main_total'};
                body.push([el, el2]);
                i=data.length; //breaks the "for" loop
                break;
            default:
                str2 = gstr(data[i+1]);
                el2 = {text: str2, style: 'cell'};
                el = {text: str, style: 'cell'};
                body.push([el, el2]);
        }
    }
    return body;
}

function getBodyFinEffort(tableID){

    //gets an array of jQuery objects representing the "td" elements of the table
    var data = $(tableID +' td');

    var body = [];
    var str, str2, el, el2;

    for(var i=0; i<data.length; i++){
        str = gstr(data[i]);
        if($(data[i]).find('b').length > 0){
            el2 = {};
            el = {text: str, style: i==0 ? 'header': 'header2', colSpan:2};
            body.push([el, {}]);
        }
        else{
            str2 = $(data[i+1]).text();
            el2 = {text: str2, style: 'cell'};
            el = {text: str, style: 'cell'};
            body.push([el,el2]);
            i++;
        }
    }
    return body;
}

function get_publict_table(tableID){

    //gets an array of jQuery objects representing the "td" elements of the table
    var data = $(tableID +' td');

    var body = [];
    var str, str2, el, el2;

    for(var i=0; i<data.length; i+=2){
        str = gstr(data[i]);
        if(i<2){
            str2 = $(data[i+1]).text().trim();
            el2 = {text: str2, style: 'header'};
            el = {text: str, style: 'header'};
            body.push([el, el2]);
        }
        else{
            str2 = $(data[i+1]).text();
            el2 = {text: str2, style: 'cell'};
            el = {text: str, style: 'cell'};
            body.push([el, el2]);
        }
    }
    return body;
}

function get_uber_table(tableID){

    //gets an array of jQuery objects representing the "td" elements of the table
    var data = $(tableID +' td');

    var body = [];
    var str, str2, el, el2;

    for(var i=0; i<data.length; i+=2){
        str = gstr(data[i]);

        str2 = $(data[i+1]).text();
        el2 = {text: str2, style: 'cell'};
        el = {text: str, style: 'cell'};
        body.push([el, el2]);

    }
    return body;
}

//gets the string and converts such HTML info into pure string info.
function gstr(data_i){

    var string1 = $(data_i).html();
    var str = string1.replace(new RegExp("<br>", "g"), "\n").trim();
    str = str.replace(/(<([^>]+)>)/ig,"").replace(new RegExp("&nbsp;", "g"), '');

    return str;
}
