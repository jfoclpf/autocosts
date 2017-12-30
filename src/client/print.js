/*Printing functions; functions that are run when user clicks Print button*/
PrintElem = function PrintElem(title)
{
    var mywindow = window.open('', title, 'height=600,width=600');
    mywindow.document.write('<html><head>');
    mywindow.document.write('<title>'+title+'</title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="css/print/print.css" media="print">');
    mywindow.document.write('</head>');

    mywindow.document.write('<body style="font-family: Verdana, Geneva, sans-serif; text-align: center;">');

    mywindow.document.write('<div style="margin-left: auto; margin-right: auto; width: 90%; text-align: center;">');
    mywindow.document.write('<div id="title2print">'+title+'</div>');

    mywindow.document.write($("#main_table_section").html());
    mywindow.document.write('<br><br>');

    mywindow.document.write($('#monthly_costs_section').html());
    mywindow.document.write('<br><br>');

    if(DISPLAY.result.fin_effort){
        mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        mywindow.document.write($('#fin_effort_section').html());
        mywindow.document.write('<br><br>');
    }

    if(DISPLAY.result.public_transports || SWITCHES.uber){
        mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        mywindow.document.write($('#alternative_to_carcosts_section').html());
        mywindow.document.write('<br><br>');
    }

    if(DISPLAY.result.ext_costs){
        mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        mywindow.document.write($('#exten_costs_section').html());
        mywindow.document.write('<br><br>');
    }

    mywindow.document.write('</div>');
    mywindow.document.write('</body></html>');

    setTimeout(function(){
        mywindow.focus();
        mywindow.print();
        mywindow.document.close();
        mywindow.close();
    }, 1000);

    return true;
}
/*end of printing functions*/