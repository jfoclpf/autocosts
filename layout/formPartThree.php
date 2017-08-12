<!--************************** DADOS ADICIONAIS ***************************************************-->
<div class="form_part" id="form_part3">

    <div class="form_part_head_title">
        <header>
            <h2>
                <?php echo $EXTRA_DATA ?>
            </h2>
        </header>
    </div>

    <!-- PUBLIC TRANSPORTS SLIDER -->
    <table class="form_section_question">
        <tr>
            <td>
                <span class="form_section_title2">
                    <?php echo $PUBL_TRA_EQUIV."?" ?>
                </span>
            </td>
            <td class="switch_td">
                <label class="switch">
                    <input id="slider1" name="slider1" type="checkbox">
                    <span class="slider round"></span>
                </label>
            </td>
        </tr>
    </table>

    <!-- FINANCIAL EFFORT SLIDER -->
    <table class="form_section_question">
        <tr>
            <td>
                <span class="form_section_title2">
                    <?php echo $FINANCIAL_EFFORT."?" ?>
                </span>
            </td>
            <td class="switch_td">
                <label class="switch">
                    <input id="slider2" type="checkbox">
                    <span class="slider round"></span>
                </label>
            </td>
        </tr>
    </table>

    <!-- PUBLIC TRANSPORTS SECTION -->
    <div id="public_transp_Div_form3">
    <span class="form_section_title">
        <?php echo $EXTRA_DATA_PUBLIC_TRANSP ?>
    </span>
    <table>
        <tr>
            <td>
                <?php echo $EXTRA_DATA_FAMILY_NBR ?>
            </td>
            <td>
                <input type="number" min="0" step="1" id="household_number_people" name="pessoas_agregado" size="6"
                       value="<?php echo $STD_NR_PPL_FAMILY ?>">
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
                <input type="number" min="0" step="Any" id="public_transportation_month_expense" class="currencyInput" name="preco_passe" size="6"
                       value="<?php echo $STD_PASS_PRICE ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    </div>
    <!-- EOF PUBLIC TRANSPORTS SECTION -->


    <!-- FINANCIAL EFFORT SECTION -->
    <div id="fin_effort_Div_form3">
        <span class="form_section_title">
            <?php echo $EXTRA_DATA_INCOME ?>
        </span>
        <table>
            <tr>
                <td>
                    <div id="income_div_form3">
                        <?php echo $EXTRA_DATA_INCOME_QUESTION ?>
                        <br/>
                        <div class="col">
                            <input type="radio" name="radio_income" value="year" id="radio_income_year" onchange="income_toggle(value)" checked />
                            <span>
                                <?php echo $WORD_PER ?> <?php echo $YEAR ?>
                            </span>
                        </div>
                        <div class="col">
                            <input type="radio" name="radio_income" value="month" id="radio_income_month" onchange="income_toggle(value)"/>
                            <span>
                                <?php echo $WORD_PER ?> <?php echo $MONTH ?>
                            </span>
                        </div>
                        <div class="col">
                            <input type="radio" name="radio_income" value="week" id="radio_income_week" onchange="income_toggle(value)"/>
                            <span>
                                <?php echo $WORD_PER ?> <?php echo $WEEK ?>
                            </span>
                        </div>
                        <div class="col">
                            <input type="radio" name="radio_income" value="hour" id="radio_income_hour" onchange="income_toggle(value)"/>
                            <span>
                                <?php echo $WORD_PER ?> <?php echo $HOUR ?>
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <div id="income_per_year_form3" class="div_element">
                        <input type="number" min="0" step="Any" id="income_per_year" class="currencyInput" name="income_per_year" size="6"
                               value="<?php echo $STD_INCOME_YEAR ?>"/>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $YEAR ?>
                    </div>
                    <div id="income_per_month_form3" class="div_element hidden">
                        <input type="number" min="0" step="Any" id="income_per_month" class="currencyInput" name="income_per_month" size="6"
                               value="<?php echo $STD_INCOME_MONTH ?>"/>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $MONTH.' '.$WORD_TIMES ?>
                        <br>
                        <input type="number" min="1" max="12" step="1" id="income_months_per_year" name="income_months_per_year" size="6"
                               value="<?php echo $STD_MONTHS_YEAR ?>"/>
                        <?php echo $MONTHS ?>/<?php echo $YEAR ?>
                    </div>
                    <div id="income_per_week_form3" class="div_element hidden">
                        <input type="number" min="0" step="Any" id="income_per_week" class="currencyInput" name="income_per_week" size="6"
                               value="<?php echo $STD_INCOME_WEEK ?>"/>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $WEEK.' '.$WORD_TIMES ?>
                        <br>
                        <input type="number" min="0" max="53" step="Any" id="income_weeks_per_year" name="income_weeks_per_year" size="6"
                               value="<?php echo $STD_WEEKS_YEAR ?>"/>
                        <?php echo $WEEKS ?>/<?php echo $YEAR ?>
                    </div>
                    <div id="income_per_hour_form3" class="div_element hidden">
                        <input type="number" min="0" step="Any" id="income_per_hour" class="currencyInput" name="income_per_hour" size="6"
                               value="<?php echo $STD_INCOME_HOUR ?>"/>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $HOUR.' '.$WORD_TIMES ?>
                        <br>
                        <input type="number" min="0" max="168" step="Any" id="income_hours_per_week" name="income_hours_per_week" size="6"
                               value="<?php echo $STD_HOURS_WEEK ?>"/>
                        <?php echo $HOURS ?>/<?php echo $WEEK.' '.$WORD_TIMES ?>
                        <br>
                        <input type="number" min="0" max="53" step="Any" id="income_hour_weeks_per_year" name="income_hour_weeks_per_year" size="6"
                               value="<?php echo $STD_WEEKS_YEAR ?>"/>
                        <?php echo $WEEKS ?>/<?php echo $YEAR ?>
                    </div>
                </td>
            </tr>
        </table>
        <!--********************************************************************** -->
        <div id="working_time_form3">
            <span class="form_section_title">
                <?php echo $EXTRA_DATA_WORKING_TIME ?>
            </span>
            <table>
                <tr>
                    <td>
                        <div id="working_time_part1_form3">
                            <br>
                            <?php echo $EXTRA_DATA_WORKING_TIME_QUESTION ?>
                            <br>
                            <span class="nowrap">
                                <input type="radio" name="radio_work_time" id="working_time_yes_form3" value="true" onchange="working_time_toggle(true)" checked />
                                <span>
                                    <?php echo $YES ?>
                                </span>
                            </span>
                            <span class="nowrap">
                                <input type="radio" name="radio_work_time" id="working_time_no_form3" value="false" onchange="working_time_toggle(false)"/>
                                <span>
                                    <?php echo $NO ?>
                                </span>
                            </span>
                        </div>
                        <div id="working_time_part2_form3">
                            <?php echo $EXTRA_DATA_WORKING_TIME ?>:
                        </div>
                    </td>
                    <td>
                        <div id="working_time_input_form3" class="div_element">
                            <input type="number" min="1" max="12" step="1" id="time_month_per_year" name="time_month_per_year" size="6"
                                value="<?php echo $STD_MONTHS_YEAR ?>"/>
                            <?php echo $MONTHS ?>/<?php echo $YEAR ?>
                            <input type="number" min="1" max="168" step="Any" id="time_hours_per_week" name="time_hours_per_week" size="6"
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
            <span class="form_section_title">
                <?php echo $DISTANCE ?>
            </span>
            <table>
                <tr>
                    <td>
                        <?php echo $FUEL_JOB_CALC ?>
                    </td>
                    <td>
                        <span class="nowrap">
                            <input type="radio" name="drive_to_work" class="no_left_margin" id="drive_to_work_yes_form3" value="true"
                                   onchange="driveToJob(true);">
                            <span class="set_right_margin">
                                <?php echo $YES ?>
                            </span>
                        </span>
                        <span class="nowrap">
                            <input type="radio" name="drive_to_work" class="no_left_margin" id="drive_to_work_no_form3" value="false"
                                   onchange="driveToJob(false);" checked >
                            <span>
                                <?php echo $NO ?>
                            </span>
                        </span>
                    </td>
                </tr>
                <tr class="car_to_job_distance_form3">
                    <td>
                        <?php echo $FUEL_DAYS ?>&nbsp;
                    </td>
                    <td>
                        <input type="number" min="1" max="7" step="1" id="drive_to_work_days_per_week" name="drive_to_work_days_per_week" size="5"
                               value="<?php echo $STD_DAYS_PER_WEEK; ?>">
                        <?php echo $DAYS_PER_WEEK_SHORT; ?>
                    </td>
                </tr>
                <tr class="car_to_job_distance_form3">
                    <td>
                        <?php echo $FUEL_DIST_HOME_JOB ?>&nbsp;
                    </td>
                    <td>
                        <input type="number" min="0" step="Any" id="dist_home_job" name="dist_home_job" size="5"
                            value="<?php echo $STD_JORNEY_2WORK; ?>">
                        <?php echo $STD_DIST ?>
                    </td>
                </tr>
                <tr class="car_to_job_distance_form3">
                    <td>
                        <?php echo $FUEL_DIST_NO_JOB ?>&nbsp;
                    </td>
                    <td class="ta-left">
                        <input type="number" min="0" step="Any" name="journey_weekend" id="journey_weekend" size="5"
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
                        <input type="number" min="0" step="Any" id="dist_per_month" name="km_per_month" size="4"
                            value="<?php echo $STD_KM_PER_MONTH; ?>">
                        <?php echo $STD_DIST ?> <?php echo $WORD_PER ?>
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
        <span class="form_section_title">
            <?php echo $EXTRA_DATA_TIME_SPENT_IN_DRIVING ?>
        </span>
        <table>
            <tr class="time_spent_part1_form3">
                <td>
                    <?php echo $EXTRA_DATA_TIME_QUESTION1 ?>
                </td>
                <td>
                    <input type="number" min="0" step="Any" size="6" id="time_home_job" name="time_home_job"
                           value="<?php echo $STD_TIME_HOME_JOB ?>"/>
                    <?php echo $MIN ?>
                </td>
            </tr>
            <tr class="time_spent_part1_form3">
                <td>
                    <?php echo $EXTRA_DATA_TIME_QUESTION2 ?>
                </td>
                <td>
                    <input type="number" min="0" step="Any" size="6" id="time_weekend" name="time_weekend" value="<?php echo $STD_TIME_WEEKEND ?>"/>
                    <?php echo $MIN ?>
                </td>
            </tr>
            <tr class="time_spent_part2_form3">
                <td>
                    <?php echo $EXTRA_DATA_TIME_QUESTION3 ?>
                </td>
                <td>
                    <input type="number" min="0" step="Any" size="6" id="min_drive_per_day" name="min_drive_per_day"
                        value="<?php echo $STD_TIME_IN_DRIVING ?>"/>
                    <?php echo $MINUTES ?>/<?php echo $DAY ?>
                    <br>
                    <input type="number" min="0" max="31" step="1" size="6" id="days_drive_per_month" name="days_drive_per_month"
                        value="<?php echo $STD_DAYS_MONTH ?>"/>
                    <?php echo $DAYS ?>/<?php echo $MONTH ?>
                </td>
            </tr>
        </table>
    </div>

    <!-- BUTTONS -->
    <div class="b-bottom">
        <input id="form_part3_button_back" class="button" type="button" onclick="openForm_part(3, 2)" value="&laquo;"/>
        <!--Run button-->
        <div id="run_button_div">
            <input id="run_button" class="button" type="submit" onclick="Run1()" value="<?php echo $BUTTON_RUN; ?>"/>
            <input id="run_button_noCapctha" class="button" type="submit" onclick="Run1()" value="<?php echo $BUTTON_RUN; ?>"/>
        </div>
    </div>

    </div>
<!-- end of form_part3-->