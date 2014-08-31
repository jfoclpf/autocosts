<!--************************** DADOS ADICIONAIS ***************************************************-->
<div class="form_part" id="form_part3">
    <table class="roundCorner main_table" cellpadding="5%">
        <tr>
            <td class="form_sub_header">
                <div class="p3">
                    <b>
                        <? echo $EXTRA_DATA ?>
                    </b>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="left" width="100%">
				<div class="p3">
					<br/>
					<b>
						<?php echo $EXTRA_DATA_PUBLIC_TRANSP ?>
					</b>
				</div>
				<br>
                <table width="100%" border="0">
                    <tr>
                        <td width="68%" class="p2">
                            <? echo $EXTRA_DATA_FAMILY_NBR ?>
                        </td>
                        <td width="20%" align="right">
                            <input type="text" id="household_number_people" 
								name="pessoas_agregado" size="6" maxlength="2" value="<? echo $STD_NR_PPL_FAMILY ?>">
                        </td>
                        <td align="left">
                            <span class="p2">
                                &nbsp;<? echo $WORD_PEOPLE ?>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br>
                        </td>
                    </tr>
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="2" align="left" width="100%">
				<table width=100% border="0">
                    <tr>
                        <td width="68%" class="p2">
                            <? echo $EXTRA_DATA_PRICE_PASS ?>
                        </td>
                        <td width="20%" align="right">
                            <input type="text" id="public_transportation_month_expense" 
								name="preco_passe" size="6" maxlength="9" value="<? echo $STD_PASS_PRICE ?>">
                        </td>
                        <td>
                            <span class="p2">
                                &nbsp;<? echo $CURR_SYMBOL ?>
                            </span>
                        </td>
                    </tr>
					<tr></tr>
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="2" align="left" width="100%">
				<div class="p3">												
						<b>
							<?php echo $EXTRA_DATA_INCOME ?>
						</b>					
				</div>
				<br>
				<table width=100% border="0">
					<tr>
						<td width="65%" style="vertical-align:top">
							<div id="income_div" class="p2">
								<?php echo $EXTRA_DATA_INCOME_QUESTION?>
								<br/>
								<input type="radio" name="radio_income" value="year" checked onchange="income_toggle(value)" />
								<?php echo $WORD_PER?> <?php echo $YEAR?>
								<input type="radio" name="radio_income" value="month" onchange="income_toggle(value)" />
								<?php echo $WORD_PER?> <?php echo $MONTH?>
								<input type="radio" name="radio_income" value="week" onchange="income_toggle(value)" />
								<?php echo $WORD_PER?> <?php echo $WEEK?>
								<input type="radio" name="radio_income" value="hour" onchange="income_toggle(value)" />
								<?php echo $WORD_PER?> <?php echo $HOUR?>
							</div>
						</td>
						<td>
							<div id="div_income_per_year" class="div_element">								
								<input type="text" id="income_per_year" name="income_per_year" size="6" value="<?echo $STD_INCOME_YEAR?>" />	
								<span class="p2">								
									<? echo $CURR_SYMBOL ?>/<? echo $YEAR ?>
								</span>
							</div>
							<div id="div_income_per_month" class="div_element hidden">
								<ul>
									<li>
										<input type="text" id="income_per_month" name="income_per_month" size="6" value="<?echo $STD_INCOME_MONTH?>" />
										<span class="p2">
											<? echo $CURR_SYMBOL ?>/<? echo $MONTH ?>
										</span>
									</li>									
									<li>
										<input type="text" id="income_months_per_year" name="income_months_per_year" size="6" maxlength="2" value="<?echo $STD_MONTHS_YEAR?>" />
										<span class="p2">
											<? echo $MONTHS ?>/<? echo $YEAR ?>
										</span>
									</li>
								</ul>								
							</div>
							<div id="div_income_per_week" class="div_element hidden">
								<ul>
									<li>
										<input type="text" id="income_per_week" name="income_per_week" size="6" value="<?echo $STD_INCOME_WEEK?>" />
										<span class="p2">
											<? echo $CURR_SYMBOL ?>/<? echo $WEEK ?>
										</span>
									</li>
									<li>
										<input type="text" id="income_weeks_per_year" name="income_weeks_per_year" size="6" maxlength="2" value="<?echo $STD_WEEKS_YEAR?>" />
											<span class="p2">
												<? echo $WEEKS ?>/<? echo $YEAR ?>
											</span>
									</li>
								</ul>								
							</div>
							<div id="div_income_per_hour" class="div_element hidden">
								<ul>
									<li>
										<input type="text" id="income_per_hour" name="income_per_hour" size="6" value="<?echo $STD_INCOME_HOUR?>" />
										<span class="p2">
											<?echo $CURR_SYMBOL?>/<?echo $HOUR?>
										</span>
									</li>
									<li>
										<input type="text" id="income_hours_per_week" name="income_hours_per_week" size="6" value="<?echo $STD_HOURS_WEEK?>" />
										<span class="p2">
											<?echo $HOURS?>/<?echo $WEEK?>
										</span>
									</li>
									<li>
										<input type="text" id="income_hour_weeks_per_year" name="income_hour_weeks_per_year" size="6" value="<?echo $STD_WEEKS_YEAR?>" />
										<span class="p2">
											<?echo $WEEKS?>/<?echo $YEAR?>
										</span>
									</li>
								</ul>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr id="working_time_part">
			<td colspan="2" align="left" width="100%">
				<div class="p3">					
						<b>
							<?php echo $EXTRA_DATA_WORKING_TIME ?>
						</b>
				</div>
				<br>
				<table width=100% border="0">
					<tr>
						<td width="65%" style="vertical-align:top">
							<div id="working_time_div" class="p2">
								<?php echo $EXTRA_DATA_WORKING_TIME_QUESTION?>
								<br/>
								<input type="radio" name="radio_work_time" value="true" checked onchange="working_time_toogle(true)" />
								<?php echo $YES?>
								<input type="radio" name="radio_work_time" value="false" onchange="working_time_toogle(false)" />
								<?php echo $NO?>
							</div>
						</td>
						<td>
							<div id="job_working_time" class="div_element">
								<ul>
									<li>
										<input type="text" id="time_month_per_year" name="time_month_per_year" size="6" maxlength="2" value="<?echo $STD_MONTHS_YEAR?>" />
										<span class="p2">
											<? echo $MONTHS ?>/<? echo $YEAR ?>
										</span>
									</li>									
									<li>
										<input type="text" id="time_hours_per_week" name="time_hours_per_week" size="6" maxlength="3" value="<?echo $STD_HOURS_WEEK?>" />
										<span class="p2">
											<? echo $HOURS ?>/<? echo $WEEK ?>
										</span>
									</li>
								</ul>	
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr class="distance_part">
			<td colspan="2" align="left" width="100%">
				<div class="p3">					
					<b>
						<?php echo $DISTANCE ?>
					</b>
				</div>
				<table width=100% border="0">
					<tr>
						<td colspan="2" width="100%">
							<div>
								<table width="100%" border="0">
									<tr>
										<td class="p2">
											<? echo $FUEL_JOB_CALC ?>
										</td>
										<td width="20%">
											<div style="white-space:nowrap; float:left; margin-right:6px;">
												<input type="radio" name="drive_to_work" id="drive_to_work_yes"
													value="true" onchange="driveToJob(true);">
												<span class="p2">
													<? echo $YES ?>
												</span>
											</div>
											<div style="white-space:nowrap;">
												<input type="radio" name="drive_to_work" id="drive_to_work_no"
													value="false" onchange="driveToJob(false);" checked>
												<span class="p2">
													<? echo $NO ?>
												</span>
											</div>
										</td>
									</tr>									
									<tr class="car_to_job_part">
										<td class="p2">
											<? echo $FUEL_DAYS ?>&nbsp;
                                        </td>
                                        <td style="text-align:left;width:20%" valign="middle">
                                            <input id="" type="text"
												name="drive_to_work_days_per_week" size="5" maxlength="1" value="<? echo $STD_DAYS_PER_WEEK; ?>">
                                                <span class="p2">
                                                    <? echo $DAYS_PER_WEEK_SHORT; ?>
                                                </span>
                                        </td>
									</tr>
                                    <tr class="car_to_job_part">
										<td class="p2">
											<? echo $FUEL_DIST_HOME_JOB ?>&nbsp;
                                        </td>
                                        <td style="text-align:left;" valign="middle">
											<input type="text"
												id=""
												name="dist_home_job"
                                                size="5" maxlength="4"
                                                value="<? echo $STD_JORNEY_2WORK; ?>">
                                            <span class="p2">
												<? echo $STD_DIST ?>
											</span>
                                            <br>
										</td>
									</tr>
                                    <tr class="car_to_job_part">
										<td class="p2">
											<br>
												<? echo $FUEL_DIST_NO_JOB ?>&nbsp;
										</td>
										<td style="text-align:left;" valign="middle">
											<input type="text" name="journey_weekend" id=""
												size="5" maxlength="4" value="<? echo $STD_JORNEY_WEEKEND; ?>">
                                            <span class="p2">
												<? echo $STD_DIST ?>
											</span>
											<br>
										</td>
									</tr>
								</table>
							</div>
						</td>
					</tr>
					<tr id="car_no_job_part">
						<td width="58%" class="p2" style="padding-left:5px;">
							<? echo $FUEL_DIST ?>
						</td>
						<td>
							<ul class="list_gorizont">
								<li>
									<input type="text" name="km_per_month" size="4" maxlength="9" id="distance" value="<? echo $STD_KM_PER_MONTH; ?>">
								</li>
								<li>
									<span class="p2">
										<? echo $STD_DIST ?>&nbsp;<? echo $WORD_PER ?>&nbsp;
									</span>
								</li>
								<li>
									<select	id="period_km">
										<option value="1"><? echo $MONTH ?></option>
										<option value="2"><? echo $TWO_MONTHS ?></option>
										<option value="3"><? echo $TRIMESTER ?></option>
										<option value="4"><? echo $SEMESTER ?></option>
										<option value="5"><? echo $YEAR ?></option>
									</select>
								</li>
							</ul>					
						</td>
					</tr>					
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="2" align="left" width="100%">
				<div class="p3">					
					<b>
						<? echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>
					</b>
				</div>
				<br>
				<table width=100% border="0">
					<tr class="time_spent_part_1">
						<td class="p2" style="width:80%">
							<? echo $EXTRA_DATA_TIME_QUESTION1 ?>
						</td>
						<td>
							<input type="text" size="6" name="time_home_job" value="<?echo $STD_TIME_HOME_JOB?>" />
							<span class="p2">
								<? echo $MIN ?>
							</span>
						</td>
					</tr>
					<tr class="time_spent_part_1">
						<td class="p2">
							<? echo $EXTRA_DATA_TIME_QUESTION2 ?>
						</td>
						<td>
							<input type="text" size="6" name="time_weekend" value="<?echo $STD_TIME_WEEKEND?>" />
							<span class="p2">
								<?php echo $MIN ?>
							</span>
						</td>
					</tr>
					<tr class="time_spent_part_2">
						<td class="p2"  style="vertical-align:top; width:65%">
							<? echo $EXTRA_DATA_TIME_QUESTION3 ?>
						</td>
						<td>
							<div class="div_element">
								<ul>
									<li>
										<input type="text" size="6" name="min_drive_per_day" value="<?echo $STD_TIME_IN_DRIVING?>" />
										<span class="p2">
											<? echo $MINUTES ?>/<?php echo $DAY?>
										</span>
									</li>
									<li>
										<input type="text" size="6" name="days_drive_per_month" value="<?echo $STD_DAYS_MONTH?>" />
										<span class="p2">
											<? echo $DAYS?>/<?php echo $MONTH?>
										</span>
									</li>
								</ul>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
    </table>
    <br>
    <input class="button" type="submit" onclick="openForm_part('form_part', 3, 2, true)" value="&laquo;" />
    <input class="button" type="submit"
           onclick="if(calcula_custos_auto() <?if ($def_cty=="XX"){echo "&& false";}?> ){submit_data('<?php echo $def_cty ?>');} " value="<? echo $BUTTON_RUN; ?>" />
</div> <!-- end of form_part3-->