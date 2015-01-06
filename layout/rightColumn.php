
<!-- in case of PT shows mobile version -->

<? if ($def_cty != "XX") { ?>
	<div id="div13">
		<div id="blocker"><div></div></div>
		<table id="tbl_statistics">
			<tr class="tr-title"><td colspan="2" class="center">
			<? if ($def_cty == "TR") { ?>
				<span class="stat_title"><?echo $COUNTRY_NAME?></span><span class="stat_title"> <?echo $STATISTIC_TITLE?></span>
			<? }
			 else{?>
				<span class="stat_title"><?echo $STATISTIC_TITLE?></span><span class="stat_title"> <?echo $COUNTRY_NAME?></span>
			<? } ?>
			<br><span class="stat_title"><?echo $AVERAGE_COSTS_PER_TYPE?></span></td></tr>
			<tr class="tr-sub-title"><td colspan="2" class="center"><span><?echo $FIXED_COSTS?><span></td></tr>
			<tr><td class="left" style="width:50%"><span><?echo $DEPRECIATION_ST?></span></td><td class="right" style="width:20%"><span id="txt_depr" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $INSURANCE_ST?></span></td><td class="right"><span id="txt_ins" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $CREDIT_INTERESTS?></span></td><td class="right"><span id="txt_cred" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $INSPECTION_SHORT?></span></td><td class="right"><span id="txt_insp" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $ROAD_TAXES_SHORT?></span></td><td class="right"><span id="txt_tax" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $MAINTENANCE?></span></td><td class="right"><span id="txt_maint1" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr class="tr-result"><td class="right"><span><?echo $TOTAL_FIXED?></span></td><td class="right"><span id="txt_standing_costs" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr class="tr-sub-title"><td colspan="2" class="center"><span><?echo $RUNNING_COSTS?><span></td></tr>
			<tr><td class="left"><span><?echo $FUEL?></span></td><td class="right"><span id="txt_fuel" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $MAINTENANCE?></span></td><td class="right"><span id="txt_maint2" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $REP_ST?></span></td><td class="right"><span id="txt_rep" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $PARKING?></span></td><td class="right"><span id="txt_park" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $TOLLS?></span></td><td class="right"><span id="txt_tolls" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $FINES?></span></td><td class="right"><span id="txt_fines" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td class="left"><span><?echo $WASHING_ST?></span></td><td class="right"><span id="txt_wash" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr class="tr-result"><td class="right"><span><?echo $TOTAL_VARIABLE?></span></td><td class="right"><span id="txt_running_costs" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr><td colspan="2"></td></tr>
			<tr class="tr-sub-title"><td class="right"><span><?echo $WORD_TOTAL_CAP?></span></td><td class="right"><span id="txt_total_overal" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
			<tr class="tr-result blue"><td><span><?echo $RUN_CP_DIST?></span></td><td class="right"><span id="txt_running_costs_dist" class="value-field"></span><span> <?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span></td></tr>
			<tr class="tr-result blue"><td><span><?echo $TOTAL_CP_DIST?></span></td><td class="right"><span id="txt_total_costs_p_unit" class="value-field"></span><span> <?echo $CURR_SYMBOL?>/<?echo $STD_DIST?></span></td></tr>
			<tr class="tr-result blue"><td><span><?echo $KINETIC_SPEED_TITLE?></span></td><td class="right"><span id="txt_kinetic_speed" class="value-field"></span><span> <?echo $STD_DIST?>/h</span></td></tr>
			<tr class="tr-result blue"><td><span><?echo $VIRTUAL_SPEED_TITLE?></span></td><td class="right"><span id="txt_virtual_speed" class="value-field"></span><span> <?echo $STD_DIST?>/h</span></td></tr>
			<tr class="tr-result orange"><td><span><?echo $TOTAL_COSTS_PER_YEAR?></span></td><td class="right"><span id="txt_total_costs_year" class="value-field"></span><span> <?echo $CURR_SYMBOL?></span></td></tr>
		</table>
		<div id="tbl_statistics_footer"><span>According to the entries given by </span><span id="users_counter"></span><span> motorists in</span><span> <?php echo $def_cty?></span></div>
	</div>

	<div id="br3">
      <br>
	</div>
<? } ?>
 <script type="text/javascript">
 $(document).ready(function(){
	blockTable();	
	$.ajax({
        url: 'php/GetData.php',
        data: "",
		dataType: "json",		
		success: function(res) {
			var country = '<? echo $def_cty?>';
			var userIds = [];
			var data = [];				
			var cntr = {
				distance_std: <? echo $distance_std_option; ?>,
				fuel_efficiency_std: <? echo $fuel_efficiency_std_option; ?>,
				fuel_price_volume_std: <? echo $fuel_price_volume_std; ?>							
			};
			$.each(res[0][0], function(i, item){
				if(item.country==country){
					userIds.push(item);
				}
			})
			$.each(res[0][1], function(i, item){
				if(item.country==country){
					data.push(item);
				}
			})					
			setStatisticValues(userIds, data, cntr);	
			$('#blocker').hide();
		},
        error: function () {					
            console.log("There was an error submitting the values for statistical analysis");
        }
    });
 });  
 </script>
