<!-- in case of PT shows mobile version -->
<? if ($GLOBALS['country'] != "XX") { ?>
	<div id="div13">
		<table align="center" id="tbl_statistics">
			<tr class="tr-title">
				<td id="td-top-title" colspan="2" class="center td-title">
                    <? if ($GLOBALS['country'] == "TR") { ?>
                        <b><span><?echo $COUNTRY_NAME?></span><span class="stat_title"> <?echo $STATISTIC_TITLE?></span></b>
                    <? }
                     else{?>
                        <b><span><?echo $STATISTIC_TITLE?></span><span class="stat_title"> <?echo $COUNTRY_NAME?></span></b>
                    <? } ?>
                    <br><span><?echo $AVERAGE_COSTS_PER_TYPE?></span>
				</td>
			</tr>
            
			<tr class="tr-sub-title"><td colspan="2" class="center"><span><?echo $FIXED_COSTS?><span></td></tr>
			<tr><td style="width:50%"><span><?echo $DEPRECIATION_ST?></span></td> <td style="width:25%"><span> <?echo $CURR_SYMBOL?> </span><span id="txt_depr" class="value-field"></span></td></tr>
			<tr><td><span><?echo $INSURANCE_ST?></span></td>                      <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_ins" class="value-field"></span></td></tr>
			<tr><td><span><?echo $CREDIT_INTERESTS?></span></td>                  <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_cred" class="value-field"></span></td></tr>
			<tr><td><span><?echo $INSPECTION_SHORT?></span></td>                  <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_insp" class="value-field"></span></td></tr>
			<tr><td><span><?echo $ROAD_TAXES_SHORT?></span></td>                  <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_tax" class="value-field"></span></td></tr>
			<tr><td><span>50% <?echo $MAINTENANCE?></span></td>                   <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_maint1" class="value-field"></span></td></tr>
			<tr class="tr-result">
                <td><span><?echo $WORD_TOTAL_CAP?><br><?echo $FIXED_COSTS?></span></td>
                <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_standing_costs" class="value-field"></span></td>
            </tr>
			
            <tr class="tr-sub-title"><td colspan="2" class="center"><span><?echo $RUNNING_COSTS?><span></td></tr>
			<tr><td><span><?echo $FUEL?></span></td>                              <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_fuel" class="value-field"></span></td></tr>
			<tr><td><span>50% <?echo $MAINTENANCE?></span></td>                   <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_maint2" class="value-field"></span></td></tr>
			<tr><td><span><?echo $REP_ST?></span></td>                            <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_rep" class="value-field"></span></td></tr>
			<tr><td><span><?echo $PARKING?></span></td>                           <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_park" class="value-field"></span></td></tr>
			<tr><td><span><?echo $TOLLS?></span></td>                             <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_tolls" class="value-field"></span></td></tr>
			<tr><td><span><?echo $FINES?></span></td>                             <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_fines" class="value-field"></span></td></tr>
			<tr><td><span><?echo $WASHING_ST?></span></td>                        <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_wash" class="value-field"></span></td></tr>
			<tr class="tr-result">
                <td><span><?echo $WORD_TOTAL_CAP?><br><?echo $RUNNING_COSTS?></span></td>
                <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_running_costs" class="value-field"></span></td>
            </tr>
			
            <tr><td colspan="2"></td></tr>
			
            <tr class="main_total">
                <td><span><?echo $WORD_TOTAL_CAP?></span></td>
                <td><span> <?echo $CURR_SYMBOL?> </span><span id="txt_total_overal" class="value-field"></span></td>
            </tr>
			
            <tr><td><span><?echo $RUN_CP_DIST?></span></td>         <td><span> <?echo $CURR_SYMBOL?></span><span id="txt_running_costs_dist" class="value-field"></span><span>/<?echo $STD_DIST?></span></td></tr>
			<tr><td><span><?echo $TOTAL_CP_DIST?></span></td>       <td><span> <?echo $CURR_SYMBOL?></span><span id="txt_total_costs_p_unit" class="value-field"></span><span>/<?echo $STD_DIST?></span></td></tr>
			<tr><td><span><?echo $KINETIC_SPEED_TITLE?></span></td> <td> <span id="txt_kinetic_speed" class="value-field"></span><span> <?echo $STD_DIST?>/h</span></td></tr>
			<tr>
                <td><span><a href="./docs/consumer_speed.html"><?echo $VIRTUAL_SPEED_TITLE?></a></span></td>
                <td><span id="txt_virtual_speed" class="value-field"></span><span> <?echo $STD_DIST?>/h</span></td>
            </tr>
			<tr>
                <td id="table-td-bottom-left"><span><?echo $TOTAL_COSTS_PER_YEAR?></span></td>
                <td id="table-td-bottom-right"><?echo $CURR_SYMBOL?> <span id="txt_total_costs_year" class="value-field"></span></td>
            </tr>
		</table>
		<div id="tbl_statistics_footer"></div>
	</div>
	<div id="br3">
      <br>
	</div>
<? } ?>
<script type="text/javascript">
    $.getScript("db_stats/show_average_table.js", function (){
        print_table('<?echo $GLOBALS['country'];?>');

    });
</script>
