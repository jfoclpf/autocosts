<div class="form_part" id="form_part2">
    <div class="form_part_head_title">
        <header>
            <h2>
                <b>
                    <?php echo $RUNNING_COSTS_HEADER_1 ?>
                </b>
            </h2>
            <h4>
                <?php echo $RUNNING_COSTS_HEADER_2 ?>
            </h4>
        </header>
    </div>
    <!--************************** FUELS ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $FUEL ?>
        </span>
    </h3>
    <table>
        <tr>
            <td rowspan="2">
                <?php echo $FUEL_DESC; ?>
            </td>
            <td>
                <?php echo $FUEL_CALC  . ": "; ?>
                <br>
                <span class="nowrap">
                    <input type="radio" name="calc_combustiveis" class="no_left_margin" id="radio_fuel_km" value="km" onclick="fuelCalculationMethodChange('distance');" />
                    <span class="set_right_margin">
                        <?php echo $STD_DIST ?>
                    </span>
                </span>
                <span class="nowrap">
                    <input type="radio" name="calc_combustiveis" class="no_left_margin" id="radio_fuel_euros" value="euros" onclick="fuelCalculationMethodChange('currency');" />
                    <span>
                        <?php echo $CURR_NAME_PLURAL ?>
                    </span>
                </span>
             </td>
        </tr>
        <tr>
            <td>
                <div id="currency_div_form2">
                    <input type="number" size="5" id="fuel_currency_value" class="currencyInput"
                        value="<?php echo $STD_FUEL_PAID_PER_MONTH; ?>" name="combustiveis_euro">
                    <span class="nowrap">
                        <?php echo $CURR_SYMBOL; ?> <?php echo $WORD_PER; ?>
                    </span>
                    <select id="combustiveis_periodo_euro">
                        <option value="1"><?php echo $MONTH; ?></option>
                        <option value="2"><?php echo $TWO_MONTHS; ?></option>
                        <option value="3"><?php echo $TRIMESTER; ?></option>
                        <option value="4"><?php echo $SEMESTER; ?></option>
                        <option value="5"><?php echo $YEAR; ?></option>
                    </select>
                </div>
            </td>
        </tr>
    </table>
    <div id="distance_div_form2">
        <table>
            <tr>
                <td>
                    <?php echo $FUEL_JOB_CALC; ?>
                </td>
                <td>
                    <span class="nowrap">
                        <input type="radio" name="car_job_form2" class="no_left_margin" id="car_job_form2_yes" value="true" onclick="carToJob(true);" />
                        <span class="set_right_margin">
                            <?php echo $YES ?>
                        </span>
                    </span>
                    <span class="nowrap">
                        <input type="radio" name="car_job_form2" class="no_left_margin" id="car_job_form2_no" value="false" onclick="carToJob(false);" />
                        <span>
                            <?php echo $NO ?>
                        </span>
                    </span>
                </td>
            </tr>
        </table>
        <div id="div_car_job_yes_form2"> 
            <table>
                <tr>
                    <td>
                        <?php echo $FUEL_DAYS; ?>
                    </td>
                    <td>
                        <input id="car_to_work_number_days_week" type="number" name="dias_por_semana" size="5" value="<?php echo $STD_DAYS_PER_WEEK; ?>">
                        <?php echo $DAYS_PER_WEEK_SHORT; ?>
                    </td>
                </tr>
                <tr>
                    <td>
                        <?php echo $FUEL_DIST_HOME_JOB; ?>&nbsp;
                    </td>
                    <td>
                        <input type="number" id="car_to_work_distance_home_work" name="km_entre_casa_trabalho" size="5" value="<?php echo $STD_JORNEY_2WORK; ?>">
                        <?php echo $STD_DIST; ?>
                    </td>
                </tr>
                <tr>
                    <td>
                        <?php echo $FUEL_DIST_NO_JOB; ?>&nbsp;
                    </td>
                    <td>
                        <input type="number" name="km_fds" id="car_to_work_distance_weekend" size="5" value="<?php echo $STD_JORNEY_WEEKEND; ?>">
                        <?php echo $STD_DIST ?>
                    </td>
                </tr>
            </table>
        </div>
        <div id="div_car_job_no_form2">
            <table>
                <tr>
                    <td>
                        <?php echo $FUEL_DIST; ?>
                    </td>
                    <td>
                        <input type="number" name="km_por_mes" size="4" id="no_car_to_work_distance" value="<?php echo $STD_KM_PER_MONTH; ?>">
                        <?php echo $STD_DIST; ?>&nbsp;<?php echo $WORD_PER; ?>
                        <select id="combustivel_period_km">
                            <option value="1"><?php echo $MONTH; ?></option>
                            <option value="2"><?php echo $TWO_MONTHS; ?></option>
                            <option value="3"><?php echo $TRIMESTER; ?></option>
                            <option value="4"><?php echo $SEMESTER; ?></option>
                            <option value="5"><?php echo $YEAR; ?></option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        <table>
            <tr>
                <td>
                    <?php echo $FUEL_CAR_EFF; ?>
                </td>
                <td>
                    <input type="number" id="fuel_efficiency" name="consumo_auto" size="5" value="<?php echo $STD_CAR_FUEL_EFFICIENCY; ?>">
                    <?php echo $STD_FUEL_CALC; ?>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $FUEL_PRICE; ?>
                </td>
                <td>
                    <input type="number" id="fuel_price" class="currencyInput" name="fuel_price" size="5" value="<?php echo $STD_FUEL_PRICE; ?>">
                    <?php echo $CURR_SYMBOL; ?>/<?php echo $STD_VOLUME_SHORT; ?>
                </td>
            </tr>
        </table>
    </div>
    <!--************************** MAINTENANCE  ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $MAINTENANCE; ?>
        </span>
    </h3>
    <table>
        <tr>
            <td class="p2">
                <?php echo $MAINTENANCE_DESC; ?>
                <br>
            </td>
            <td class="va-middle">
                <input type="number" name="revisoes" size="6" id="maintenance" class="currencyInput"
                       value="<?php echo $STD_MAINTENANCE_PER_YEAR; ?>">
                <?php echo $CURR_SYMBOL; ?>/<?php echo $YEAR; ?>
            </td>
        </tr>
    </table>
    <!--************************** REPAIRS AND IMPROVEMENTS ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $REP_IMPROV ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $REP_IMPROV_DESC ?>
            </td>
            <td>
                <input type="number" name="reparacoes" size="6" id="repairs" class="currencyInput"
                       value="<?php echo $STD_REPAIRS; ?>">
                <?php echo $CURR_SYMBOL ?>/<?php echo $YEAR ?>
            </td>
        </tr>
    </table>
    <!--************************** PARKING ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $PARKING ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $PARKING_DESC ?>
            </td>
            <td>
                <input type="number" name="parqueamento" size="6" id="parking" class="currencyInput"
                       value="<?php echo $STD_PARKING; ?>">
                <?php echo $CURR_SYMBOL ?>/<?php echo $MONTH ?>
            </td>
        </tr>
    </table>
    <!--************************** TOLLS ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $TOLLS ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $TOLLS_DESC ?>
            </td>
            <td>
                <?php echo $TOLLS_DAY_CALC ?>
                <div>
                    <span class="nowrap">
                        <input type="radio" id="tolls_daily_true" name="tolls_daily_radioBtn" class="no_left_margin" value="true" onclick="tolls_daily(true);" />
                        <span class="set_right_margin">
                            <?php echo $YES ?>
                        </span>
                    </span>
                    <span class="nowrap">
                        <input type="radio" id="tolls_daily_false" name="tolls_daily_radioBtn" class="no_left_margin" value="false" onclick="tolls_daily(false);" checked="checked" />
                        <span>
                            <?php echo $NO ?>
                        </span>
                    </span>
                </div>
            </td>
        </tr>
    </table>
    <!-- Calculating tolls on a montlhy basis -->
    <div id="daily_tolls_false_div">
        <table>
            <tr>
                <td>
                    <i>
                        <?php echo $TOLLS_DAY_CALC_DESC ?>
                    </i>
                </td>
                <td>
                    <input type="number" id="no_daily_tolls_value" class="currencyInput" name="no_daily_tolls_value" size="6" 
                           value="<?php echo $STD_TOLLS; ?>">
                    <?php echo $CURR_SYMBOL ?> <?php echo $WORD_PER ?>
                    <select id="tolls_period_select">
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
    <!-- Calculating tolls on a daily basis -->
    <div id="daily_tolls_true_div">
        <table>
            <tr>
                <td>
                    <?php echo $TOLLS_DAY_CALC1 ?>
                </td>
                <td>
                    <input type="number" id="daily_expense_tolls" class="currencyInput" name="daily_expense_tolls" size="6" 
                           value="<?php echo $STD_TOLLS_DAY; ?>">
                    <?php echo $CURR_SYMBOL ?> <?php echo $DURING ?>
                    <br>
                    <input type="number" id="number_days_tolls" name="number_days_tolls" size="3" 
                           value="<?php echo $STD_TOLLS_DAYS_PER_MONTH; ?>">
                    <?php echo $DAYS ?> <?php echo $WORD_PER ?> <?php echo $MONTH ?>
                </td>
            </tr>
        </table>
    </div>
    <!--************************** FINES / TICKETS ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $FINES ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $FINES_DESC ?>
            </td>
            <td>
                <input type="number" id="tickets_value" class="currencyInput" name="tickets_value" size="6" 
                       value="<?php echo $STD_FINES; ?>">
                <?php echo $CURR_SYMBOL ?> <?php echo $WORD_PER ?>
                <select id="tickets_period_select">
                    <option value="1"><?php echo $MONTH ?></option>
                    <option value="2"><?php echo $TWO_MONTHS ?></option>
                    <option value="3"><?php echo $TRIMESTER ?></option>
                    <option value="4"><?php echo $SEMESTER ?></option>
                    <option value="5"><?php echo $YEAR ?></option>
                </select>
            </td>
        </tr>
    </table>
    <!--************************** WASHING ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $WASHING ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $WASHING_DESC ?>
            </td>
            <td>
                <input type="number" id="washing_value" class="currencyInput" name="washing_value" size="6"
                       value="<?php echo $STD_WASHING; ?>">
                <?php echo $CURR_SYMBOL ?> <?php echo $WORD_PER ?>
                <select id="washing_period_select">
                    <option value="1"><?php echo $MONTH ?></option>
                    <option value="2"><?php echo $TWO_MONTHS ?></option>
                    <option value="3"><?php echo $TRIMESTER ?></option>
                    <option value="4"><?php echo $SEMESTER ?></option>
                    <option value="5"><?php echo $YEAR ?></option>
                </select>
            </td>
        </tr>
    </table>
    <div class="b-bottom">
        <input id="form_part2_button_back" class="button" type="button" onclick="openForm_part(2, 1)" value="&laquo;"/>
        <span class="step">2/3</span>
        <input id="form_part2_button_next" class="button" type="button" onclick="openForm_part(2, 3);" value="&raquo;"/>
    </div>
</div>
<!-- end of form_part2-->
