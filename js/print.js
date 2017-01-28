/*Printing functions; functions that are run when user clicks Print button*/
function PrintElem(elem1, elem2, elem3, elem4, elem5, title)
{
    Popup($(elem1).html(), $(elem2).html(), $(elem3).html(), $(elem4).html(), $(elem5).html(), title);
}

function Popup(data1, data2, data3, data4, data5, title) 
{
    var mywindow = window.open('', title, 'height=600,width=600');
    mywindow.document.write('<html><head>');
    mywindow.document.write('<title>'+title+'</title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="css/print/print.css" media="print">');
    mywindow.document.write('</head>');
    
    mywindow.document.write('<body style="font-family: Verdana, Geneva, sans-serif; text-align: center;">');
    
    mywindow.document.write('<div style="margin-left: auto; margin-right: auto; width: 90%; text-align: center;">');
    mywindow.document.write('<div id="title2print">'+title+'</div>');
    
    mywindow.document.write(data1);
    mywindow.document.write('<br>');
    
    mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        
    mywindow.document.write(data2);
    mywindow.document.write('<br><br>');
    
    if(fin_effort_bool){
        mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        mywindow.document.write(data3);
        mywindow.document.write('<br><br>');
    }

    if(public_transp_bool || uber_obj.print_bool){
        mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        mywindow.document.write(data4);
        mywindow.document.write('<br><br>');    
    }
    
    if(extern_costs_bool){
        mywindow.document.write('<p style="page-break-before: always;"> </p><br><br>');
        mywindow.document.write(data5);
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