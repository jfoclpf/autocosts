<div class="form_part" id="form_part2">
    <div class="head-title">
        <b><? echo $RUNNING_COSTS_HEADER_1 ?></b>
        <? echo $RUNNING_COSTS_HEADER_2 ?>
    </div>
    <!--************************** COMBUSTÍVEIS | FUELS ***************************************************-->
    <strong class="title">
        <? echo $FUEL ?>
    </strong>
    <table>
        <tr>
            <td>
                <? echo $FUEL_DESC ?>
                <? echo $FUEL_CALC ?>
                <span>
        <input type="radio" name="calc_combustiveis" id="radio_fuel_km" value="km" onclick="fuelCalculationMethodChange('distance'); ">
        <span class="p2">
        <? echo $STD_DIST ?>
        </span>
        </span>
        <span>
        <input type="radio" name="calc_combustiveis" id="radio_fuel_euros" value="euros" onclick="fuelCalculationMethodChange('currency'); ">
        <span class="p2">
        <? echo $CURR_NAME_PLURAL ?>
        </span>
        </span>
                <div style="float: right; margin: 12px 0 0 0;" id="eurosDiv">
                    <input type="text" size="5" maxlength="9" id="fuel_currency_value"
                           value="<? echo $STD_FUEL_PAID_PER_MONTH; ?>" name="combustiveis_euro">
          <span class="p2">
          <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
          </span>
                    <select id="combustiveis_periodo_euro">
                        <option value="1"><? echo $MONTH ?></option>
                        <option value="2"><? echo $TWO_MONTHS ?></option>
                        <option value="3"><? echo $TRIMESTER ?></option>
                        <option value="4"><? echo $SEMESTER ?></option>
                        <option value="5"><? echo $YEAR ?></option>
                    </select>
                </div>
            </td>
        </tr>
    </table>
    <div id="kmDiv">
        <table>
            <tr>
                <td>
                    <? echo $FUEL_JOB_CALC ?>
                    <span>
          <input type="radio" name="carro_emprego" id="carro_emprego_sim" value="true" onclick="carToJob(true);">
          <span class="p2">
          <? echo $YES ?>
          </span>
          </span>
          <span>
          <input type="radio" name="carro_emprego" id="carro_emprego_nao" value="false" onclick="carToJob(false);">
          <span class="p2">
          <? echo $NO ?>
          </span>
          </span>
                </td>
            </tr>
        </table>
        <div id="carro_emprego_sim_Div">
            <table>
                <tr>
                    <td>
                        <? echo $FUEL_DAYS ?>
                    </td>
                    <td>
                        <input id="car_to_work_number_days_week" type="text" name="dias_por_semana" size="5" maxlength="1" value="<? echo $STD_DAYS_PER_WEEK; ?>">
            <span class="p2">
            <? echo $DAYS_PER_WEEK_SHORT; ?>
            </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <? echo $FUEL_DIST_HOME_JOB ?>&nbsp;
                    </td>
                    <td>
                        <input type="text" id="car_to_work_distance_home_work" name="km_entre_casa_trabalho" size="5" maxlength="4" value="<? echo $STD_JORNEY_2WORK; ?>">
            <span class="p2">
            <? echo $STD_DIST ?>
            </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <? echo $FUEL_DIST_NO_JOB ?>&nbsp;
                    </td>
                    <td>
                        <input type="text" name="km_fds" id="car_to_work_distance_weekend" size="5" maxlength="4" value="<? echo $STD_JORNEY_WEEKEND; ?>">
            <span class="p2">
            <? echo $STD_DIST ?>
            </span>
                    </td>
                </tr>
            </table>
        </div>
        <div id="carro_emprego_nao_Div">
            <table>
                <tr>
                    <td>
                        <? echo $FUEL_DIST ?>
                    </td>
                    <td>
                        <input type="text" name="km_por_mes" size="4" maxlength="9" id="no_car_to_work_distance" value="<? echo $STD_KM_PER_MONTH; ?>">
            <span>
            <? echo $STD_DIST ?>&nbsp;<? echo $WORD_PER ?>
            </span>
                        <select id="combustivel_period_km">
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
        <table>
            <tr>
                <td>
                    <? echo $FUEL_CAR_EFF ?>
                </td>
                <td>
                    <input type="text" id="fuel_efficiency" name="consumo_auto" size="5" maxlength="5" value="<? echo $STD_CAR_FUEL_EFFICIENCY; ?>">
          <span class="p2">
          <? echo $STD_FUEL_CALC ?>
          </span>
                </td>
            </tr>
            <tr>
                <td>
                    <? echo $FUEL_PRICE ?>
                </td>
                <td>
                    <input type="text" id="fuel_price" name="fuel_price" size="5" maxlength="9" value="<? echo $STD_FUEL_PRICE; ?>">
          <span class="p2">
          <? echo $CURR_SYMBOL ?>/<? echo $STD_VOLUME_SHORT ?>
          </span>
                </td>
            </tr>
        </table>
    </div>
    <!--************************** REVISÕES | MAINTENANCE  ***************************************************-->
    <strong class="title">
        <? echo $MAINTENANCE ?>
    </strong>
    <table width="100%" border="0">
        <tr>
            <td width="470" class="p2">
                <? echo $MAINTENANCE_DESC ?>
                <br>
            </td>
            <td style="vertical-align:middle;" valign="middle">
                <input type="text" name="revisoes" size="6"
                       maxlength="9"
                       id="maintenance"
                       value="<? echo $STD_MAINTENANCE_PER_YEAR; ?>">
        <span class="p2">
        <? echo $CURR_SYMBOL ?>/<? echo $YEAR ?>
        </span>
            </td>
        </tr>
    </table>
    <!--************************** REPARAÇÕES | REPAIRS AND IMPROVEMENTS ***************************************************-->
    <strong class="title">
        <? echo $REP_IMPROV ?>
    </strong>
    <table>
        <tr>
            <td>
                <? echo $REP_IMPROV_DESC ?>
            </td>
            <td>
                <input type="text" name="reparacoes" size="6" id="repairs" maxlength="9" value="<? echo $STD_REPAIRS; ?>">
        <span>
        <? echo $CURR_SYMBOL ?>/<? echo $YEAR ?>
        </span>
            </td>
        </tr>
    </table>
    <!--************************** PARQUEAMENTO | PARKING ***************************************************-->
    <strong class="title">
        <? echo $PARKING ?>
    </strong>
    <table>
        <tr>
            <td>
                <? echo $PARKING_DESC ?>
            </td>
            <td>
                <input type="text" name="parqueamento" size="6" id="parking" maxlength="9" value="<? echo $STD_PARKING; ?>">
        <span class="p2">
        <? echo $CURR_SYMBOL ?>/<? echo $MONTH ?>
        </span>
            </td>
        </tr>
    </table>
    <!--************************** PORTAGENS | TOLLS ***************************************************-->
    <strong class="title">
        <? echo $TOLLS ?>
    </strong>
    <table>
        <tr>
            <td>
                <? echo $TOLLS_DESC ?>
            </td>
            <td>
                <? echo $TOLLS_DAY_CALC ?>
                <div>
                    <input type="radio" name="portagens_ao_dia" value="true" onclick="tolls_daily(true); ">
          <span class="p2">
          <? echo $YES ?>
          </span>
                    <input type="radio" name="portagens_ao_dia" value="false" onclick="tolls_daily(false);"
                           checked="checked">
          <span class="p2">
          <? echo $NO ?>
          </span>
                </div>
            </td>
        </tr>
    </table>
    <div id="dia_nao_portag_DIV">
        <table>
            <tr>
                <td>
                    <i>
                        <? echo $TOLLS_DAY_CALC_DESC ?>
                    </i>
                </td>
                <td>
                    <input type="text" id="no_daily_tolls_value" name="portagens" size="6" maxlength="9" value="<? echo $STD_TOLLS; ?>">
          <span class="p2">
          <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
          </span>
                    <select id="portagens_select">
                        <option value="1"><? echo $MONTH ?></option>
                        <option value="2"><? echo $TWO_MONTHS ?></option>
                        <option value="3" selected="selected"><? echo $TRIMESTER ?></option>
                        <option value="4"><? echo $SEMESTER ?></option>
                        <option value="5"><? echo $YEAR ?></option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
    <div id="dia_sim_portag_DIV">
        <table>
            <tr>
                <td>
                    <? echo $TOLLS_DAY_CALC1 ?>
                </td>
                <td>
                    <input type="text" id="daily_expense_tolls" name="preco_portagens_por_dia" size="6" maxlength="9" value="<? echo $STD_TOLLS_DAY; ?>">
          <span>
          <? echo $CURR_SYMBOL ?> <? echo $DURING ?>
          </span>
                    <input type="text" id="number_days_tolls" name="dias_portagens_por_mes" size="3" maxlength="2" value="<? echo $STD_TOLLS_DAYS_PER_MONTH; ?>">
          <span class="p2">
          <? echo $DAYS ?> <? echo $WORD_PER ?> <? echo $MONTH ?>
          </span>
                </td>
            </tr>
        </table>
    </div>
    <!--************************** MULTAS | FINES ***************************************************-->
    <strong class="title">
        <? echo $FINES ?>
    </strong>
    <table>
        <tr>
            <td>
                <? echo $FINES_DESC ?>
            </td>
            <td>
                <input type="text" id="tickets_value" name="multas" size="6" maxlength="9" value="<? echo $STD_FINES; ?>">
        <span class="p2">
        <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
        </span>
                <select id="multas_select">
                    <option value="1"><? echo $MONTH ?></option>
                    <option value="2"><? echo $TWO_MONTHS ?></option>
                    <option value="3"><? echo $TRIMESTER ?></option>
                    <option value="4" selected="selected"><? echo $SEMESTER ?></option>
                    <option value="5"><? echo $YEAR ?></option>
                </select>
            </td>
        </tr>
    </table>
    <!--************************** LAVAGENS | WASHING ***************************************************-->
    <strong class="title">
        <? echo $WASHING ?>
    </strong>
    <table>
        <tr>
            <td>
                <? echo $WASHING_DESC ?>
            </td>
            <td>
                <input type="text" id="washing_value" name="lavagens" size="6" maxlength="9"
                       value="<? echo $STD_WASHING; ?>">
        <span>
        <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
        </span>
                <select id="lavagens_select">
                    <option value="1"><? echo $MONTH ?></option>
                    <option value="2"><? echo $TWO_MONTHS ?></option>
                    <option value="3" selected="selected"><? echo $TRIMESTER ?></option>
                    <option value="4"><? echo $SEMESTER ?></option>
                    <option value="5"><? echo $YEAR ?></option>
                </select>
            </td>
        </tr>
    </table>
    <div class="b-bottom">
        <input class="button" type="submit" onclick="openForm_part('form_part', 2, 1)" value="&laquo;"/>
        <span class="step">2/3</span>
        <input class="button" type="submit" onclick="openForm_part('form_part', 2, 3);" value="&raquo;"/>
    </div>
</div>
<!-- end of form_part2-->
