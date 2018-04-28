/*Printing functions; functions that are run when user clicks Print button*/
Print = function () {
    
    var title = WORDS.main_title;
        
    var win = window.open("about:blank", "to_print", "height=600,width=600");
    
    win.document.open();
    
    win.document.write('<html><head>');
    win.document.write('<title>'+title+'</title>');
    win.document.write('<link rel="stylesheet" type="text/css" href="css/print/print.css" media="print">');
    win.document.write('</head>');
    
    win.document.write('<body style="font-family: Verdana, Geneva, sans-serif; text-align: center;">');

    win.document.write('<div style="margin-left: auto; margin-right: auto; width: 90%; text-align: center;">');
    win.document.write('<div id="title2print">'+title+'</div>');
    
    win.document.write($("#main_table_section").html());
    win.document.write('<br><br>');
    
    win.document.write('<div style="display:block; page-break-before:always;"></div>');
    win.document.write('<h1>' + WORDS.average_costs_per_type + '</h1>');
    win.document.write(ImagetoPrint(DISPLAY.charts.URIs.pieChart));
    
    win.document.write('<div style="display:block; page-break-before:always;"></div>');   
    win.document.write(ImagetoPrint(DISPLAY.charts.URIs.barChart));
    win.document.write('<br><br>');
    win.document.write($('#monthly_costs').html());
    win.document.write('<br><br>');

    if(DISPLAY.result.fin_effort){
        win.document.write('<p style="page-break-before: always;"></p>');
        
        win.document.write('<h1>' + WORDS.financial_effort + '</h1>');
        win.document.write('<img width="300" src="' + DISPLAY.charts.URIs.finEffort + '" />');
        win.document.write($('#fin_effort').html());
        win.document.write('<br><br>');
    }

    if(DISPLAY.result.public_transports){        
        win.document.write('<p style="page-break-before: always;"></p>');
        
        win.document.write('<h1>' + WORDS.publ_tra_equiv + '</h1>');
        win.document.write('<img src="' + DISPLAY.charts.URIs.alterToCar + '" />');
        win.document.write($('#alternative_to_carcosts').html());
        win.document.write('<br><br>');
    }

    if(DISPLAY.result.ext_costs){        
        win.document.write('<p style="page-break-before: always;"></p>');
        win.document.write($('#extern_costs').html());
        win.document.write('<br>');
    }

    win.document.write('</div>');
    win.document.write('</body></html>');

   setTimeout(function(){
        win.focus();
        win.print();
        win.document.close();
        win.close();
    }, 1000);
    
    return true;
}

function ImagetoPrint(source) {
    return "<img src='" + source + "' />";
}

/*end of printing functions*/