function generatePDF(main_title){

    var body0, body11, body12, body13, body2, body3, body4, body5;
    var data;

    //main top table with total costs
    body0 = get_main_table("#result_table0");

    //monthly costs title and table
    var monthly_costs_title = gstr($('#monthly_costs_title').html());
    var costs_title_body = [[{text: monthly_costs_title, style: "header"}]];

    //monthly costs tables
    body11 = get_monthly_costs_table("#standing_costs_table");
    body12 = get_monthly_costs_table("#running_costs_table");
    body13 = get_monthly_costs_table("#total_costs_table");

    var imageData1 = $('#img_pie_chart_div').find('img').attr('src');
    var imageData2 = $('#img_bar_chart_div').find('img').attr('src');

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
                    body: costs_title_body
                }
            },
            {
                image: imageData1,
                width: 400,
                height: 267,
                style: 'img_style'
            },
            {
                image: imageData2,
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
                    body: body11
                }
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
        var fin_effort_title = gstr($('#fin_effort_title').html());
        var fin_effort_title_body = [[{text: fin_effort_title, style: "header"}]];

        body2 = getBodyFinEffort("#result_table3");
        var imageData3 = $('#img_fin_effort_chart_div').find('img').attr('src');

        var body2_objA = {
                style: 'tableMarging',
                table:{
                    headerRows: 0,
                    widths: ['*'],
                    body: fin_effort_title_body
                },
                pageBreak: 'before'
            };
        var body2_objB = {
                image: imageData3,
                width: 400,
                height: 200,
                style: 'img_style'
            };
        var body2_objC = {
                style:'tableMarging',
                table:{
                    headerRows: 1,
                    widths: [ 390, '*' ],
                    body: body2
                }
            };

        docDefinition.content.push(body2_objA);
        docDefinition.content.push(body2_objB);
        docDefinition.content.push(body2_objC);
    }

    //optional public transports table
    if (DISPLAY.result.public_transports || DISPLAY.result.uber){
        //section title
        var p_t_title = gstr($('#alternative_to_carcosts_section').html());
        var p_t_title_body = [[{text: p_t_title, style: "header"}]];
        var p_t_title_obj = {
            style: 'tableMarging',
            table:{
                    headerRows: 0,
                    widths: ['*'],
                    body: p_t_title_body
                },
                pageBreak: 'before'
            };
        docDefinition.content.push(p_t_title_obj);

        if(DISPLAY.result.public_transports){
            body3 = get_publict_table("#result_table2");
            body3_obj = {
                style:'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ 390, '*' ],
                    body: body3
                }
            };
            docDefinition.content.push(body3_obj);
        }

        //uber
        if(DISPLAY.result.uber){
            body5 = get_uber_table("#result_table_uber");
            body5_obj = {
                style:'tableMarging',
                table:{
                    headerRows: 0,
                    widths: [ 390, '*' ],
                    body: body5
                }
            };
            docDefinition.content.push(body5_obj);
        }
    }

    //optional external costs table
    if(DISPLAY.result.ext_costs){
        body4 = get_publict_table("#result_table4");
        body4_obj = {
                        style:'tableMarging',
                        table:{
                            headerRows: 0,
                            widths: [ 390, '*' ],
                            body: body4
                        },
                        pageBreak: 'before'
                    };
        docDefinition.content.push(body4_obj);
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
