<!--************************** DADOS ADICIONAIS ***************************************************--> 
<div class="form_part" id="form_part3">
        
    <div class="form_part_head_title">
        <?php echo $EXTRA_DATA ?>
    </div>
    
    <!-- PUBLIC TRANSPORTS SLIDER -->
    <table class="form_section_question">
        <tr>
            <td>
                <strong class="form_section_title2">
                    <?php echo $PUBL_TRA_EQUIV."?" ?>
                </strong>
            </td>
            <td class="switch_td">
                <label class="switch">
                    <input id="slider1" name="slider1" type="checkbox">
                    <div class="slider round"></div>
                </label>
            </td>
        </tr>
    </table>
    <!-- FINANCIAL EFFORT SLIDER -->
    <table class="form_section_question">
        <tr>
            <td>
                <strong class="form_section_title2">
                    <?php echo $FINANCIAL_EFFORT."?" ?>
                </strong>
            </td>
            <td class="switch_td">
                <label class="switch">
                    <input id="slider2" type="checkbox">
                    <div class="slider round"></div>
                </label>
            </td>
        </tr>
    </table>
    
    <!-- PUBLIC TRANSPORTS SECTION -->
    <div id="public_transp_Div_form3">
    <strong class="form_section_title">
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
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    </div>
    <!-- EOF PUBLIC TRANSPORTS SECTION -->
    
    
    <!-- FINANCIAL EFFORT SECTION -->        
    <div id="fin_effort_Div_form3">
        <strong class="form_section_title">
            <?php echo $EXTRA_DATA_INCOME ?>
        </strong>
        <table>
            <tr>
                <td>
                    <div id="income_div_form3">
                        <?php echo $EXTRA_DATA_INCOME_QUESTION ?>
                        <br/>
                        <div class="col">
                            <input type="radio" name="radio_income" value="year" onchange="income_toggle(value)" checked />
                            <?php echo $WORD_PER ?> <?php echo $YEAR ?>
                        </div>
                        <div class="col">
                            <input type="radio" name="radio_income" value="month" onchange="income_toggle(value)"/>
                            <?php echo $WORD_PER ?> <?php echo $MONTH ?>
                        </div>
                        <div class="col">
                            <input type="radio" name="radio_income" value="week" onchange="income_toggle(value)"/>
                            <?php echo $WORD_PER ?> <?php echo $WEEK ?>
                        </div>
                        <div class="col">
                            <input type="radio" name="radio_income" value="hour" onchange="income_toggle(value)"/>
                            <?php echo $WORD_PER ?> <?php echo $HOUR ?>
                        </div>
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
                        <?php echo $CURR_SYMBOL ?>/<?php echo $MONTH ?>
                        <br>
                        <input type="number" id="income_months_per_year" name="income_months_per_year" size="6"
                            value="<?php echo $STD_MONTHS_YEAR ?>"/>
                        <?php echo $MONTHS ?>/<?php echo $YEAR ?>
                    </div>
                    <div id="income_per_week_form3" class="div_element hidden">
                        <input type="number" id="income_per_week" name="income_per_week" size="6"
                               value="<?php echo $STD_INCOME_WEEK ?>"/>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $WEEK ?>
                        <br>
                        <input type="number" id="income_weeks_per_year" name="income_weeks_per_year" size="6"
                            value="<?php echo $STD_WEEKS_YEAR ?>"/>
                        <?php echo $WEEKS ?>/<?php echo $YEAR ?>
                    </div>
                    <div id="income_per_hour_form3" class="div_element hidden">
                        <input type="number" id="income_per_hour" name="income_per_hour" size="6" value="<?php echo $STD_INCOME_HOUR ?>"/>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $HOUR ?>
                        <br>
                        <input type="number" id="income_hours_per_week" name="income_hours_per_week" size="6"
                            value="<?php echo $STD_HOURS_WEEK ?>"/>
                        <?php echo $HOURS ?>/<?php echo $WEEK ?>
                        <br>
                        <input type="number" id="income_hour_weeks_per_year" name="income_hour_weeks_per_year" size="6"
                            value="<?php echo $STD_WEEKS_YEAR ?>"/>
                        <?php echo $WEEKS ?>/<?php echo $YEAR ?>
                    </div>
                </td>
            </tr>
        </table>
        <!--********************************************************************** -->
        <div id="working_time_form3">
            <strong class="form_section_title">
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
                            <?php echo $EXTRA_DATA_WORKING_TIME ?>:
                        </div>
                    </td>
                    <td>
                        <div id="working_time_input_form3" class="div_element">
                            <input type="number" id="time_month_per_year" name="time_month_per_year" size="6"
                                value="<?php echo $STD_MONTHS_YEAR ?>"/>
                            <?php echo $MONTHS ?>/<?php echo $YEAR ?>
                            <input type="number" id="time_hours_per_week" name="time_hours_per_week" size="6"
                                value="<?php echo $STD_HOURS_WEEK ?>"/>
                            <?php echo $HOURS ?>/<?php echo $WEEK ?>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- EOF FINANCIAL EFFORT SECTION -->

    <!-- DISTANCE ||| TIME SPENT IN DRIVING ||| SECTION -->
    <div id="distance_time_spent_driving_form3">
        <div id="distance_form3">
            <strong class="form_section_title">
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
                            <?php echo $YES ?>
                        </div>
                        <div>
                            <input type="radio" name="drive_to_work" id="drive_to_work_no_form3" value="false"
                                   onchange="driveToJob(false);" checked >
                            <?php echo $NO ?>
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
                        <?php echo $DAYS_PER_WEEK_SHORT; ?>
                    </td>
                </tr>
                <tr class="car_to_job_distance_form3">
                    <td>
                        <?php echo $FUEL_DIST_HOME_JOB ?>&nbsp;
                    </td>
                    <td>
                        <input type="number" id="dist_home_job" name="dist_home_job" size="5"
                            value="<?php echo $STD_JORNEY_2WORK; ?>">
                        <?php echo $STD_DIST ?>
                    </td>
                </tr>
                <tr class="car_to_job_distance_form3">
                    <td>
                        <?php echo $FUEL_DIST_NO_JOB ?>&nbsp;
                    </td>
                    <td style="text-align:left;">
                        <input type="number" name="journey_weekend" id="journey_weekend" size="5"
                            value="<?php echo $STD_JORNEY_WEEKEND; ?>">
                        <?php echo $STD_DIST ?>
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
                        <?php echo $STD_DIST ?>&nbsp;<?php echo $WORD_PER ?>&nbsp;
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
        <strong class="form_section_title">
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
                    <?php echo $MIN ?>
                </td>
            </tr>
            <tr class="time_spent_part1_form3">
                <td>
                    <?php echo $EXTRA_DATA_TIME_QUESTION2 ?>
                </td>
                <td>
                    <input type="number" size="6" id="time_weekend" name="time_weekend" value="<?php echo $STD_TIME_WEEKEND ?>"/>
                    <?php echo $MIN ?>
                </td>
            </tr>
            <tr class="time_spent_part2_form3">
                <td>
                    <?php echo $EXTRA_DATA_TIME_QUESTION3 ?>
                </td>
                <td>
                    <input type="number" size="6" id="min_drive_per_day" name="min_drive_per_day"
                        value="<?php echo $STD_TIME_IN_DRIVING ?>"/>
                    <?php echo $MINUTES ?>/<?php echo $DAY ?>
                    <br>
                    <input type="number" size="6" id="days_drive_per_month" name="days_drive_per_month"
                        value="<?php echo $STD_DAYS_MONTH ?>"/>
                    <?php echo $DAYS ?>/<?php echo $MONTH ?>
                </td>
            </tr>
        </table>
    </div>
    
    <!-- BUTTONS -->
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
