
<!-- in case of PT shows mobile version -->

<? if ($GLOBALS['country'] != "XX") { ?>
	<div id="div13">
		<div id="blocker"><div></div></div>
		<table align="center" id="tbl_statistics">
			<tr class="tr-title"><td id="td-top-title" colspan="2" class="center td-title">
			<? if ($GLOBALS['country'] == "TR") { ?>
				<span class="stat_title"><?echo $COUNTRY_NAME?></span><span class="stat_title"> <?echo $STATISTIC_TITLE?></span>
			<? }
			 else{?>
				<span class="stat_title"><?echo $STATISTIC_TITLE?></span><span class="stat_title"> <?echo $COUNTRY_NAME?></span>
			<? } ?>
			<br><span class="stat_title"><?echo $AVERAGE_COSTS_PER_TYPE?></span></td></tr>
			
			<tr class="tr-sub-title"><td colspan="2" class="center"><span><?echo $FIXED_COSTS?><span></td></tr>
			<tr><td class="left" style="width:50%"><span><?echo $DEPRECIATION_ST?></span></td><td class="right" style="width:25%"><span id="txt_depr" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $INSURANCE_ST?></span></td><td class="right"><span id="txt_ins" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $CREDIT_INTERESTS?></span></td><td class="right"><span id="txt_cred" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $INSPECTION_SHORT?></span></td><td class="right"><span id="txt_insp" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $ROAD_TAXES_SHORT?></span></td><td class="right"><span id="txt_tax" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span>50% <?echo $MAINTENANCE?></span></td><td class="right"><span id="txt_maint1" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>	
			
			<tr class="tr-result" style="font-size: 95%;"><td class="right td-result"><span><?echo $WORD_TOTAL_CAP?><br><?echo $FIXED_COSTS?></span></td><td class="right"><span id="txt_standing_costs" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			
			<tr class="tr-sub-title"><td colspan="2" class="center"><span><?echo $RUNNING_COSTS?><span></td></tr>
			<tr><td class="left"><span><?echo $FUEL?></span></td><td class="right"><span id="txt_fuel" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span>50% <?echo $MAINTENANCE?></span></td><td class="right"><span id="txt_maint2" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $REP_ST?></span></td><td class="right"><span id="txt_rep" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $PARKING?></span></td><td class="right"><span id="txt_park" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $TOLLS?></span></td><td class="right"><span id="txt_tolls" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $FINES?></span></td><td class="right"><span id="txt_fines" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $WASHING_ST?></span></td><td class="right"><span id="txt_wash" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			
			<tr class="tr-result" style="font-size: 95%;"><td class="right td-result"><span><?echo $WORD_TOTAL_CAP?><br><?echo $RUNNING_COSTS?></span></td><td class="right"><span id="txt_running_costs" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			
			<tr><td colspan="2"></td></tr>
			<tr class="tr-sub-title"><td class="right td-result"><span><?echo $WORD_TOTAL_CAP?></span></td><td class="right"><span id="txt_total_overal" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr class="tr-result blue"><td class="td-result"><span><?echo $RUN_CP_DIST?></span></td><td class="right"><span id="txt_running_costs_dist" class="value-field"></span><span> <?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span></td></tr>
			<tr class="tr-result blue"><td class="td-result"><span><?echo $TOTAL_CP_DIST?></span></td><td class="right"><span id="txt_total_costs_p_unit" class="value-field"></span><span> <?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span></td></tr>
			<tr class="tr-result blue"><td class="td-result"><span><?echo $KINETIC_SPEED_TITLE?></span></td><td class="right"><span id="txt_kinetic_speed" class="value-field"></span><span> <?echo $STD_DIST?>/h</span></td></tr>
			<tr class="tr-result blue"><td class="td-result"><span><a href="./docs/consumer_speed.html"><?echo $VIRTUAL_SPEED_TITLE?></a></span></td><td class="right"><span id="txt_virtual_speed" class="value-field"></span><span> <?echo $STD_DIST?>/h</span></td></tr>
			<tr class="tr-result orange"><td id="table-td-bottom-left" class="td-result"><span><?echo $TOTAL_COSTS_PER_YEAR?></span></td><td id="table-td-bottom-right" class="right"><span id="txt_total_costs_year" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
		</table>
		<div id="tbl_statistics_footer"></div>
	</div>

	<div id="br3">
      <br>
	</div>
<? } ?>

 <script type="text/javascript">
 
 $(document).ready(function(){
    
    //blockTable
    $('#blocker').show();
    var width = $('#div13').width();
    var height = $('#div13').height();
    $('#blocker').height(height).width(width);
    
	$.ajax({
        url: 'db_stats/GetData.php',
        data: "",
		dataType: "json",		
		success: function(result) {
            //alert(JSON.stringify(result, null, 4));
			var country = '<? echo $GLOBALS['country']; ?>';
			var avarage_data = [];				
            //get data
			$.each(result, function(i, item){
				if(item.country==country){
					avarage_data=item;
				}
			})
            //alert("country: "+country);
            //alert(JSON.stringify(avarage_data, null, 4));
            
            if(avarage_data){
                $('#txt_depr').html(avarage_data.Depreciation);
                $('#txt_ins').html(avarage_data.Insurance);
                $('#txt_cred').html(avarage_data.Loan_interests);
                $('#txt_insp').html(avarage_data.Inspection);
                $('#txt_tax').html(avarage_data.Car_tax);
                $('#txt_standing_costs').html(avarage_data.standing_costs);
                $('#txt_fuel').html(avarage_data.Fuel);
                $('#txt_maint1, #txt_maint2').html((avarage_data.Maintenance)/2);
                $('#txt_rep').html(avarage_data.Repairs);
                $('#txt_park').html(avarage_data.Parking);
                $('#txt_tolls').html(avarage_data.Tolls);
                $('#txt_fines').html(avarage_data.Fines);
                $('#txt_wash').html(avarage_data.Washing);
                $('#txt_running_costs').html(avarage_data.running_costs);
                $('#txt_total_overal').html(avarage_data.total_costs);
                $('#txt_running_costs_dist').html(avarage_data.running_costs_dist);
                $('#txt_total_costs_p_unit').html(avarage_data.total_costs_dist);
                $('#txt_kinetic_speed').html(avarage_data.kinetic_speed);
                $('#txt_virtual_speed').html(avarage_data.virtual_speed);
                $('#txt_total_costs_year').html(avarage_data.total_costs_year);
                $('#users_counter').html(avarage_data.users_counter);
            }
            else{
                $('.value-field').html('0.0');
                $('#users_counter').html(0);
            }
            
            $('#blocker').hide();
		},
        error: function () {					
			console.log("There was an error submitting the values for statistical analysis");
        }
    });
 });  
 </script>
