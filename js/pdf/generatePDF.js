function generatePDF(main_title, country){
	var body1, body2, body3, body4, data;
	var f2 = get_form_part2();	
	data = $('#result_table1 td');	
	body1 = getBody(data);	
	data = $('#result_table2 td');
	body2 = getBody(data);
	data = $('#result_table3 td');
	body4 = getBodyFinEffort(data);	
	
	var imageData1 = $('#img1').find('img').attr('src');
	var imageData2 = $('#img2').find('img').attr('src');
				
    var txt1 = $('#final-text1').html();	
	var txt2 = $('#final-text2').text();
	var part1 = txt1.split('<b>')[0] + ' ';
	var part2 = $('#final-text1').find('b').text() + ' ';
	var part3 = txt1.split('<br>')[0].split('</b>')[1] + '\n';
	var part4 = txt1.split('<br>')[1];
	
	var docDefinition = {
		header:	{text: main_title, style: 'title'},
		content:[			
			{
				style: 'tableMarging',
				table:{
					headerRows: 1,
					widths: [ 390, '*' ],
					body: body1
				},
				pageBreak: 'after'
			},			
			{
				style:'tableMarging',
				table:{
					headerRows: 1,
					widths: [ 390, '*' ],
					body: body2
				},
				pageBreak: 'after'
			},			
			{
				style:'tableMarging',
				table:{
					headerRows: 1,
					widths: [ 390, '*' ],
					body: body4
				},
				pageBreak: 'after'
			},
			{
				image: imageData1,				
				width: 450,
				height: 300,
				margin: [35, 0, 0, 0]				
			},
			{
				image: imageData2,
				width: 450,
				height: 200,
				margin: [35, 0, 0, 0]
			},	
			{ text:[
				{ text: part1, alignment: 'center' },
				{ text: part2, bold:true, fontSize: 16 },
				{ text: part3 },
				{ text: part4 }
			], margin: [0, 20, 0, 0] },
			{text: txt2, style:"finalText"}			
		],
		styles: {
			title:{
				fontSize: 16,
				alignment:	'center',
				margin: [0, 10, 0, 10],
				bold: true
			},
			header: {
				fontSize: 14,
				bold: true,
				alignment:	'center',
				color: '#000'
			},
			cell: {
				fontSize: 12				
			},
			header2: {
				fontSize: 14,
				bold: true,
				alignment:	'left',
				color: '#000'
			},
			finalText:{
				color:'red',
				fontSize:48,
				alignment:	'center',
				bold:true
			},
			tableMarging: {
				margin: [0, 0, 0, 20],
				color: '#1C1C1C'
			}			
		}
	}
	if(country=="PT" && f2.type_calc_fuel=="km"){
		data = $('#result_table4 td');
		body3 = getBody(data);	
		docDefinition.content.splice(1, 0 ,{style:'tableMarging', table:{ headerRows: 1, widths: [ 390, '*' ], body: body3 }, pageBreak: 'after'})
	}	
	pdfMake.createPdf(docDefinition).download(main_title+'-'+country+'.pdf');
}

function getBody(data){
    var body = [];
    for(var i=0; i<data.length; i+=2){
        var string1 = $(data[i]).html();
        var str = string1.replace(new RegExp("<br>", "g"), "\n").trim();
        str = str.replace(/(<([^>]+)>)/ig,"").replace(new RegExp("&nbsp;", "g"), '');
        var el;
        if(i<2){
            var str2 = $(data[i+1]).text().trim();
            var el2 = {text: str2, style: 'header'};
            el = {text: str, style: 'header'};          
            body.push([el, el2]);
        }
        else{
            var str2 = $(data[i+1]).text();
            var el2 = {text: str2, style: 'cell'};
            el = {text: str, style: 'cell'};
            body.push([el, el2]);
        }           
    }
    return body;
}

function getBodyFinEffort(data){
    var body = [];
    for(var i=0; i<data.length; i++){
        var string1 = $(data[i]).html();
        var str = string1.replace(new RegExp("<br>", "g"), "\n").trim();
        str = str.replace(/(<([^>]+)>)/ig,"").replace(new RegExp("&nbsp;", "g"), '');
        var el;
        if($(data[i]).find('b').length > 0){
            var el2 = {};
            el = {text: str, style: i==0 ? 'header': 'header2', colSpan:2};
            body.push([el, {}]);
        }
        else{
            var str2 = $(data[i+1]).text();
            var el2 = {text: str2, style: 'cell'};
            el = {text: str, style: 'cell'};
            body.push([el,el2]);
            i++;
        }       
    }
    return body;
}