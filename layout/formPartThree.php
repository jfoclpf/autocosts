<!--************************** DADOS ADICIONAIS ***************************************************--> 
<div class="form_part" id="form_part3">
    <div class="head-title">
        <?php echo $EXTRA_DATA ?>
    </div>
    <strong class="title">
        <?php echo $EXTRA_DATA_PUBLIC_TRANSP ?>
    </strong>
    <table>
        <tr>
            <td>
                <?php echo $EXTRA_DATA_FAMILY_NBR ?>
            </td>
            <td>
                <input type="number" id="household_number_people" name="pessoas_agregado" size="6" value="<?php echo $STD_NR_PPL_FAMILY ?>">
                <?php echo $WORD_PEOPLE ?>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <?php echo $EXTRA_DATA_PRICE_PASS ?>
            </td>
            <td>
                <input type="number" id="public_transportation_month_expense" name="preco_passe" size="6" value="<?php echo $STD_PASS_PRICE ?>">
                <span>
                <?php echo $CURR_SYMBOL ?>
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
                <div id="income_div_form3">
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
                <div id="income_per_year_form3" class="div_element">
                    <input type="number" id="income_per_year" name="income_per_year" size="6"
                        value="<?php echo $STD_INCOME_YEAR ?>"/>
                    <?php echo $CURR_SYMBOL ?>/<?php echo $YEAR ?>
                </div>
                <div id="income_per_month_form3" class="div_element hidden">
                    <input type="number" id="income_per_month" name="income_per_month" size="6"
                        value="<?php echo $STD_INCOME_MONTH ?>"/>
                    <span>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $MONTH ?>
                    </span><br>
                    <input type="number" id="income_months_per_year" name="income_months_per_year" size="6"
                        value="<?php echo $STD_MONTHS_YEAR ?>"/>
                    <span>
                        <?php echo $MONTHS ?>/<?php echo $YEAR ?>
                    </span>
                </div>
                <div id="income_per_week_form3" class="div_element hidden">
                    <input type="number" id="income_per_week" name="income_per_week" size="6"
                           value="<?php echo $STD_INCOME_WEEK ?>"/>
                    <span>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $WEEK ?>
                    </span><br>
                    <input type="number" id="income_weeks_per_year" name="income_weeks_per_year" size="6"
                        value="<?php echo $STD_WEEKS_YEAR ?>"/>
                    <span class="p2">
                        <?php echo $WEEKS ?>/<?php echo $YEAR ?>
                    </span>
                </div>
                <div id="income_per_hour_form3" class="div_element hidden">
                    <input type="number" id="income_per_hour" name="income_per_hour" size="6" value="<?php echo $STD_INCOME_HOUR ?>"/>
                    <span>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $HOUR ?>
                    </span><br>
                    <input type="number" id="income_hours_per_week" name="income_hours_per_week" size="6"
                        value="<?php echo $STD_HOURS_WEEK ?>"/>
                    <span>
                        <?php echo $HOURS ?>/<?php echo $WEEK ?>
                    </span><br>
                    <input type="number" id="income_hour_weeks_per_year" name="income_hour_weeks_per_year" size="6"
                        value="<?php echo $STD_WEEKS_YEAR ?>"/>
                    <span>
                        <?php echo $WEEKS ?>/<?php echo $YEAR ?>
                    </span>
                </div>
            </td>
        </tr>
    </table>
    <!--********************************************************************** -->
    <div id="working_time_form3">
        <strong class="title">
            <?php echo $EXTRA_DATA_WORKING_TIME ?>
        </strong>
        <table>
            <tr>
                <td>
                    <div id="working_time_part1_form3">
                        <br>
                        <?php echo $EXTRA_DATA_WORKING_TIME_QUESTION ?>
                        <br>
                        <span style="white-space:nowrap">
                            <input type="radio" name="radio_work_time" id="working_time_yes_form3" value="true" onchange="working_time_toggle(true)" checked />
                            <?php echo $YES ?>
                        </span>
                        <span style="white-space:nowrap">
                            <input type="radio" name="radio_work_time" id="working_time_no_form3" value="false" onchange="working_time_toggle(false)"/>
                            <?php echo $NO ?>
                        </span>
                    </div>
                    <div id="working_time_part2_form3">
                        <span class="p2">
                            <?php echo $EXTRA_DATA_WORKING_TIME ?>:
                        </span>
                    </div>
                </td>
                <td>
                    <div id="working_time_input_form3" class="div_element">
                        <input type="number" id="time_month_per_year" name="time_month_per_year" size="6"
                            value="<?php echo $STD_MONTHS_YEAR ?>"/>
                        <span>
                            <?php echo $MONTHS ?>/<?php echo $YEAR ?>
                        </span>
                        <input type="number" id="time_hours_per_week" name="time_hours_per_week" size="6"
                            value="<?php echo $STD_HOURS_WEEK ?>"/>
                        <span>
                            <?php echo $HOURS ?>/<?php echo $WEEK ?>
                        </span>
                    </div>
                </td>
            </tr>
        </table>
        </div>
    <!--********************************************************************** -->
    <div id="distance_form3">
        <strong class="title">
            <?php echo $DISTANCE ?>
        </strong>
        <table>
            <tr>
                <td>
                    <?php echo $FUEL_JOB_CALC ?>
                </td>
                <td>
                    <div>
                        <input type="radio" name="drive_to_work" id="drive_to_work_yes_form3" value="true"
                               onchange="driveToJob(true);">
                        <span>
                            <?php echo $YES ?>
                        </span>
                    </div>
                    <div>
                        <input type="radio" name="drive_to_work" id="drive_to_work_no_form3" value="false"
                               onchange="driveToJob(false);" checked >
                            <span class="p2">
                                <?php echo $NO ?>
                            </span>
                    </div>
                </td>
            </tr>
            <tr class="car_to_job_distance_form3">
                <td>
                    <?php echo $FUEL_DAYS ?>&nbsp;
                </td>
                <td>
                    <input id="drive_to_work_days_per_week" type="number" name="drive_to_work_days_per_week" size="5"
                           value="<?php echo $STD_DAYS_PER_WEEK; ?>">
                    <span>
                        <?php echo $DAYS_PER_WEEK_SHORT; ?>
                    </span>
                </td>
            </tr>
            <tr class="car_to_job_distance_form3">
                <td>
                    <?php echo $FUEL_DIST_HOME_JOB ?>&nbsp;
                </td>
                <td>
                    <input type="number" id="dist_home_job" name="dist_home_job" size="5"
                        value="<?php echo $STD_JORNEY_2WORK; ?>">
                    <span class="p2">
                        <?php echo $STD_DIST ?>
                    </span>
                </td>
            </tr>
            <tr class="car_to_job_distance_form3">
                <td>
                    <?php echo $FUEL_DIST_NO_JOB ?>&nbsp;
                </td>
                <td style="text-align:left;">
                    <input type="number" name="journey_weekend" id="journey_weekend" size="5"
                        value="<?php echo $STD_JORNEY_WEEKEND; ?>">
                    <span class="p2">
                        <?php echo $STD_DIST ?>
                    </span>
                </td>
            </tr>
        </table>
        <table>
            <tr id="car_no_job_distance_form3">
                <td>
                    <?php echo $FUEL_DIST ?>
                </td>
                <td>
                    <input type="number" id="dist_per_month" name="km_per_month" size="4"
                        value="<?php echo $STD_KM_PER_MONTH; ?>">
                    <span class="p2">
                        <?php echo $STD_DIST ?>&nbsp;<?php echo $WORD_PER ?>&nbsp;
                    </span>
                    <select id="period_km">
                        <option value="1"><?php echo $MONTH ?></option>
                        <option value="2"><?php echo $TWO_MONTHS ?></option>
                        <option value="3"><?php echo $TRIMESTER ?></option>
                        <option value="4"><?php echo $SEMESTER ?></option>
                        <option value="5"><?php echo $YEAR ?></option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
    <!--********************************************************************** -->
    <strong class="title">
        <?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>
    </strong>
    <table>
        <tr class="time_spent_part1_form3">
            <td>
                <?php echo $EXTRA_DATA_TIME_QUESTION1 ?>
            </td>
            <td>
                <input type="number" size="6" id="time_home_job" name="time_home_job"
                       value="<?php echo $STD_TIME_HOME_JOB ?>"/>
                <span>
                    <?php echo $MIN ?>
                </span>
            </td>
        </tr>
        <tr class="time_spent_part1_form3">
            <td>
                <?php echo $EXTRA_DATA_TIME_QUESTION2 ?>
            </td>
            <td>
                <input type="number" size="6" id="time_weekend" name="time_weekend" value="<?php echo $STD_TIME_WEEKEND ?>"/>
                <span>
                    <?php echo $MIN ?>
                </span>
            </td>
        </tr>
        <tr class="time_spent_part2_form3">
            <td>
                <?php echo $EXTRA_DATA_TIME_QUESTION3 ?>
            </td>
            <td>
                <input type="number" size="6" id="min_drive_per_day" name="min_drive_per_day"
                    value="<?php echo $STD_TIME_IN_DRIVING ?>"/>
                <span>
                    <?php echo $MINUTES ?>/<?php echo $DAY ?>
                </span>
                <br>
                <input type="number" size="6" id="days_drive_per_month" name="days_drive_per_month"
                    value="<?php echo $STD_DAYS_MONTH ?>"/>
                <span>
                    <?php echo $DAYS ?>/<?php echo $MONTH ?>
                </span>
            </td>
        </tr>
    </table>
    
    <div class="b-bottom">      
        <div id="b-bottom_3_A">
            <input class="button" type="button" onclick="openForm_part('form_part', 3, 2)" value="&laquo;"/>
            <!--Google reCaptcha-->
            <div id="g-recaptcha" class="g-recaptcha"></div>
        </div>
        <div id="b-bottom_3_B">
            <input class="button" type="button" onclick="openForm_part('form_part', 3, 2)" value="&laquo;"/>        
            <!--Run button-->
            <input id="run_button" class="button" type="submit" onclick="Run_form(Country)" value="<?php echo $BUTTON_RUN; ?>"/>
        </div>
    </div>

    </div>
<!-- end of form_part3-->

<script>

</script>
