<!--************************** DADOS ADICIONAIS ***************************************************-->
<div class="form_part" id="form_part3">
    <div class="head-title">
        <? echo $EXTRA_DATA ?>
    </div>
    <strong class="title">
        <?php echo $EXTRA_DATA_PUBLIC_TRANSP ?>
    </strong>
    <table>
        <tr>
            <td>
                <? echo $EXTRA_DATA_FAMILY_NBR ?>
            </td>
            <td>
                <input type="text" id="household_number_people" name="pessoas_agregado" size="6" maxlength="2"
                    value="<? echo $STD_NR_PPL_FAMILY ?>">
                <? echo $WORD_PEOPLE ?>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <? echo $EXTRA_DATA_PRICE_PASS ?>
            </td>
            <td>
                <input type="text" id="public_transportation_month_expense" name="preco_passe" size="6" maxlength="9"
                    value="<? echo $STD_PASS_PRICE ?>">
                <span>
                <? echo $CURR_SYMBOL ?>
                </span>
            </td>
        </tr>
    </table>
    <strong class="title">
        <?php echo $EXTRA_DATA_INCOME ?>
    </strong>
    <table>
        <tr>
            <td>
                <div id="income_div">
                    <?php echo $EXTRA_DATA_INCOME_QUESTION ?>
                    <br/>
                    <span style="white-space:nowrap">
                        <input type="radio" name="radio_income" value="year" onchange="income_toggle(value)" checked />
                        <?php echo $WORD_PER ?> <?php echo $YEAR ?>
                    </span>
                    <span style="white-space:nowrap">
                        <input type="radio" name="radio_income" value="month" onchange="income_toggle(value)"/>
                        <?php echo $WORD_PER ?> <?php echo $MONTH ?>
                    </span>
                        <span style="white-space:nowrap">
                        <input type="radio" name="radio_income" value="week" onchange="income_toggle(value)"/>
                    <?php echo $WORD_PER ?> <?php echo $WEEK ?>
                    </span>
                    <span style="white-space:nowrap">
                        <input type="radio" name="radio_income" value="hour" onchange="income_toggle(value)"/>
                        <?php echo $WORD_PER ?> <?php echo $HOUR ?>
                    </span>
                </div>
            </td>
            <td>
                <div id="div_income_per_year" class="div_element">
                    <input type="text" id="income_per_year" name="income_per_year" size="6"
                        value="<? echo $STD_INCOME_YEAR ?>"/>
                    <? echo $CURR_SYMBOL ?>/<? echo $YEAR ?>
                </div>
                <div id="div_income_per_month" class="div_element hidden">
                    <input type="text" id="income_per_month" name="income_per_month" size="6"
                        value="<? echo $STD_INCOME_MONTH ?>"/>
                    <span>
                        <? echo $CURR_SYMBOL ?>/<? echo $MONTH ?>
                    </span><br>
                    <input type="text" id="income_months_per_year" name="income_months_per_year" size="6" maxlength="2"
                        value="<? echo $STD_MONTHS_YEAR ?>"/>
                    <span>
                        <? echo $MONTHS ?>/<? echo $YEAR ?>
                    </span>
                </div>
                <div id="div_income_per_week" class="div_element hidden">
                    <input type="text" id="income_per_week" name="income_per_week" size="6"
                           value="<? echo $STD_INCOME_WEEK ?>"/>
                    <span>
                        <? echo $CURR_SYMBOL ?>/<? echo $WEEK ?>
                    </span><br>
                    <input type="text" id="income_weeks_per_year" name="income_weeks_per_year" size="6" maxlength="2"
                        value="<? echo $STD_WEEKS_YEAR ?>"/>
                    <span class="p2">
                        <? echo $WEEKS ?>/<? echo $YEAR ?>
                    </span>
                </div>
                <div id="div_income_per_hour" class="div_element hidden">
                    <input type="text" id="income_per_hour" name="income_per_hour" size="6"
                        value="<? echo $STD_INCOME_HOUR ?>"/>
                    <span>
                        <? echo $CURR_SYMBOL ?>/<? echo $HOUR ?>
                    </span><br>
                    <input type="text" id="income_hours_per_week" name="income_hours_per_week" size="6"
                        value="<? echo $STD_HOURS_WEEK ?>"/>
                    <span>
                        <? echo $HOURS ?>/<? echo $WEEK ?>
                    </span><br>
                    <input type="text" id="income_hour_weeks_per_year" name="income_hour_weeks_per_year" size="6"
                        value="<? echo $STD_WEEKS_YEAR ?>"/>
                    <span>
                        <? echo $WEEKS ?>/<? echo $YEAR ?>
                    </span>
                </div>
            </td>
        </tr>
    </table>
    <!--********************************************************************** -->
    <div id="working_time_part">
        <strong class="title">
            <?php echo $EXTRA_DATA_WORKING_TIME ?>
        </strong>
        <table>
            <tr>
                <td>
                    <div id="working_time_div">
                        <br>
                        <?php echo $EXTRA_DATA_WORKING_TIME_QUESTION ?>
                        <br>
                        <span style="white-space:nowrap">
                            <input type="radio" name="radio_work_time" id="radio_work_time_yes" value="true" onchange="working_time_toggle(true)" checked />
                            <?php echo $YES ?>
                        </span>
                        <span style="white-space:nowrap">
                            <input type="radio" name="radio_work_time" id="radio_work_time_no" value="false" onchange="working_time_toggle(false)"/>
                            <?php echo $NO ?>
                        </span>
                    </div>
                    <div id="working_time_div2">
                        <span class="p2">
                            <?php echo $EXTRA_DATA_WORKING_TIME ?>:
                        </span>
                    </div>
                </td>
                <td>
                    <div id="job_working_time" class="div_element">
                        <input type="text" id="time_month_per_year" name="time_month_per_year" size="6" maxlength="2"
                            value="<? echo $STD_MONTHS_YEAR ?>"/>
                        <span>
                            <? echo $MONTHS ?>/<? echo $YEAR ?>
                        </span>
                        <input type="text" id="time_hours_per_week" name="time_hours_per_week" size="6" maxlength="3"
                            value="<? echo $STD_HOURS_WEEK ?>"/>
                        <span>
                            <? echo $HOURS ?>/<? echo $WEEK ?>
                        </span>
                    </div>
                </td>
            </tr>
        </table>
        </div>
    <!--********************************************************************** -->
    <div id="distance_part_form3">
        <strong class="title">
            <?php echo $DISTANCE ?>
        </strong>
        <table>
            <tr>
                <td>
                    <? echo $FUEL_JOB_CALC ?>
                </td>
                <td>
                    <div>
                        <input type="radio" name="drive_to_work" id="drive_to_work_yes" value="true"
                               onchange="driveToJob(true);">
                        <span>
                            <? echo $YES ?>
                        </span>
                    </div>
                    <div>
                        <input type="radio" name="drive_to_work" id="drive_to_work_no" value="false"
                               onchange="driveToJob(false);" checked >
                            <span class="p2">
                                <? echo $NO ?>
                            </span>
                    </div>
                </td>
            </tr>
            <tr class="car_to_job_part">
                <td>
                    <? echo $FUEL_DAYS ?>&nbsp;
                </td>
                <td>
                    <input id="drive_to_work_days_per_week" type="text" name="drive_to_work_days_per_week" size="5"
                           maxlength="1" value="<? echo $STD_DAYS_PER_WEEK; ?>">
                    <span>
                        <? echo $DAYS_PER_WEEK_SHORT; ?>
                    </span>
                </td>
            </tr>
            <tr class="car_to_job_part">
                <td>
                    <? echo $FUEL_DIST_HOME_JOB ?>&nbsp;
                </td>
                <td>
                    <input type="text" id="dist_home_job" name="dist_home_job" size="5" maxlength="4"
                        value="<? echo $STD_JORNEY_2WORK; ?>">
                    <span class="p2">
                        <? echo $STD_DIST ?>
                    </span>
                </td>
            </tr>
            <tr class="car_to_job_part">
                <td>
                    <? echo $FUEL_DIST_NO_JOB ?>&nbsp;
                </td>
                <td style="text-align:left;" valign="middle">
                    <input type="text" name="journey_weekend" id="journey_weekend" size="5" maxlength="4"
                        value="<? echo $STD_JORNEY_WEEKEND; ?>">
                    <span class="p2">
                        <? echo $STD_DIST ?>
                    </span>
                </td>
            </tr>
        </table>
        <table>
            <tr id="car_no_job_part">
                <td>
                    <? echo $FUEL_DIST ?>
                </td>
                <td>
                    <input type="text" id="dist_per_month" name="km_per_month" size="4" maxlength="9" id="distance"
                        value="<? echo $STD_KM_PER_MONTH; ?>">
                    <span class="p2">
                        <? echo $STD_DIST ?>&nbsp;<? echo $WORD_PER ?>&nbsp;
                    </span>
                    <select id="period_km">
                        <option value="1"><? echo $MONTH ?></option>
                        <option value="2"><? echo $TWO_MONTHS ?></option>
                        <option value="3"><? echo $TRIMESTER ?></option>
                        <option value="4"><? echo $SEMESTER ?></option>
                        <option value="5"><? echo $YEAR ?></option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
    <!--********************************************************************** -->
    <strong class="title">
        <? echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>
    </strong>
    <table>
        <tr class="time_spent_part_1">
            <td>
                <? echo $EXTRA_DATA_TIME_QUESTION1 ?>
            </td>
            <td>
                <input type="text" size="6" id="time_home_job" name="time_home_job"
                       value="<? echo $STD_TIME_HOME_JOB ?>"/>
                <span>
                    <? echo $MIN ?>
                </span>
            </td>
        </tr>
        <tr class="time_spent_part_1">
            <td>
                <? echo $EXTRA_DATA_TIME_QUESTION2 ?>
            </td>
            <td>
                <input type="text" size="6" id="time_weekend" name="time_weekend" value="<? echo $STD_TIME_WEEKEND ?>"/>
                <span>
                    <?php echo $MIN ?>
                </span>
            </td>
        </tr>
        <tr class="time_spent_part_2">
            <td>
                <? echo $EXTRA_DATA_TIME_QUESTION3 ?>
            </td>
            <td>
                <input type="text" size="6" id="min_drive_per_day" name="min_drive_per_day"
                    value="<? echo $STD_TIME_IN_DRIVING ?>"/>
                <span>
                    <? echo $MINUTES ?>/<?php echo $DAY ?>
                </span>
                <br>
                <input type="text" size="6" id="days_drive_per_month" name="days_drive_per_month"
                    value="<? echo $STD_DAYS_MONTH ?>"/>
                <span>
                    <? echo $DAYS ?>/<?php echo $MONTH ?>
                </span>
            </td>
        </tr>
    </table>
    <div class="b-bottom">
        <input class="button" type="submit" onclick="openForm_part('form_part', 3, 2)" value="&laquo;"/>
        <input class="button" type="submit" onclick="if(Run() <? if ($GLOBALS["country"] == "XX") {
            echo "&& false";
        } ?> ){submit_data('<? echo $GLOBALS["country"] ?>'); scrollPage();}" value="<? echo $BUTTON_RUN; ?>"/>
    </div>
</div>
<!-- end of form_part3-->
