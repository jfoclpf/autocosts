<div class="form_part" id="form_part2">
    <table class="roundCorner main_table" cellpadding="5%">
        <tr>
            <td class="form_sub_header">
                <span class="p3">
                    <b>
                        <? echo $RUNNING_COSTS_HEADER_1 ?>
                    </b>
                </span>
                <br>
                <span class="p2">
                    <? echo $RUNNING_COSTS_HEADER_2 ?>
                </span>
            </td>
        </tr>
<!--************************** COMBUSTÍVEIS | FUELS ***************************************************-->
        <tr>
            <td colspan="2" align="left" width="100%">
                <div class="p2">
                    <br>
                </div>
                <div class="p3">
                    <b>
                        <? echo $FUEL ?>
                    </b>
                </div>
				<br>
                <div class="p2">
                    <? echo $FUEL_DESC ?>
                </div>
                <br>
                <table width="100%" border="0">
                    <tr>
                        <td width="15%" class="p2">
                            <? echo $FUEL_CALC ?>
                        </td>
                        <td width="12%">
                            <input type="radio" name="calc_combustiveis" id="radio_fuel_km" value="km"
                                   onclick="fuelCalculationMethodChange('distance'); ">
                            <span class="p2">
                                <? echo $STD_DIST ?>&nbsp;
                            </span>
                        </td>
                        <td width="18%"><input type="radio" name="calc_combustiveis" id="radio_fuel_euros" value="euros"
                                               onclick="fuelCalculationMethodChange('currency'); ">
                           <span class="p2">
                               <? echo $CURR_NAME_PLURAL ?>
                           </span>
                        </td>
                        <td align="right" width="60%">
                            <div id="eurosDiv">
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
                    <table width="100%" border="0">
                        <tr>
                            <td class="p2">
                                <? echo $FUEL_JOB_CALC ?>
                            </td>
                            <td width="20%">
                                <div style="white-space:nowrap;">
                                    <input type="radio" name="carro_emprego" id="carro_emprego_sim"
                                           value="true" onclick="carToJob(true);">
                                    <span class="p2">
                                        <? echo $YES ?>
                                    </span>
                                </div>
                                <div style="white-space:nowrap;">
                                    <input type="radio" name="carro_emprego" id="carro_emprego_nao"
                                           value="false" onclick="carToJob(false);">
                                    <span class="p2">
                                        <? echo $NO ?>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" width="100%">
                                <div id="carro_emprego_sim_Div">
                                    <table width="100%" border="0">
                                        <tr>
                                            <td class="p2">
                                                <? echo $FUEL_DAYS ?>&nbsp;
                                            </td>
                                            <td style="text-align:left;width:20%" valign="middle">
                                                <input id="car_to_work_number_days_week" type="text"
													name="dias_por_semana" size="5" maxlength="1" value="<? echo $STD_DAYS_PER_WEEK; ?>">
                                                <span class="p2">
                                                    <? echo $DAYS_PER_WEEK_SHORT; ?>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="p2">
                                                <? echo $FUEL_DIST_HOME_JOB ?>&nbsp;
                                            </td>
                                            <td style="text-align:left;" valign="middle">
                                                <input type="text"
                                                       id="car_to_work_distance_home_work"
                                                       name="km_entre_casa_trabalho"
                                                       size="5" maxlength="4"
                                                       value="<? echo $STD_JORNEY_2WORK; ?>">
                                                <span class="p2">
                                                    <? echo $STD_DIST ?>
                                                </span>
                                                <br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="p2">
                                                <br>
                                                <? echo $FUEL_DIST_NO_JOB ?>&nbsp;
                                            </td>
                                            <td style="text-align:left;" valign="middle">
                                                <input type="text" name="km_fds" id="car_to_work_distance_weekend"
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
                        <tr>
                            <td colspan="2" align="left">
                                <div id="carro_emprego_nao_Div">
                                    <table width="100%" border="0">
                                        <tr>
                                            <td width="50%" class="p2">
                                                <? echo $FUEL_DIST ?>&nbsp;
                                            </td>
                                            <td width="50%" align="right">
                                                <input type="text" name="km_por_mes" size="4" maxlength="9"
                                                       id="no_car_to_work_distance"
                                                       value="<? echo $STD_KM_PER_MONTH; ?>">
                                                <span class="p2">
                                                    <? echo $STD_DIST ?>&nbsp;<? echo $WORD_PER ?>
                                                    &nbsp;
                                                </span>
                                                <select
                                                    id="combustivel_period_km">
                                                    <option value="1"><? echo $MONTH ?></option>
                                                    <option value="2"><? echo $TWO_MONTHS ?></option>
                                                    <option value="3"><? echo $TRIMESTER ?></option>
                                                    <option value="4"><? echo $SEMESTER ?></option>
                                                    <option value="5"><? echo $YEAR ?></option>
                                                </select>&nbsp;
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="p2">
                                <? echo $FUEL_CAR_EFF ?> &nbsp;
                            </td>
                            <td>
                                <input type="text" id="fuel_efficiency" name="consumo_auto" size="5" maxlength="5"
                                       value="<? echo $STD_CAR_FUEL_EFFICIENCY; ?>">
                                <span class="p2">
                                    <? echo $STD_FUEL_CALC ?>
                                </span>
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td class="p2">
                                <? echo $FUEL_PRICE ?> &nbsp;
                            </td>
                            <td>
                                <input type="text" id="fuel_price" name="fuel_price" size="5" maxlength="9"
                                       value="<? echo $STD_FUEL_PRICE; ?>">
                                <span class="p2">
                                    <? echo $CURR_SYMBOL ?>/<? echo $STD_VOLUME_SHORT ?>
                                </span>
                                <br>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
<!--************************** REVISÕES | MAINTENANCE  ***************************************************-->
        <tr>
            <td colspan="2" align="left" width="100%">
                <div class="p3">
                    <b>
                        <? echo $MAINTENANCE ?>
                    </b>
                </div>
                <br>
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
            </td>
        </tr>
<!--************************** REPARAÇÕES | REPAIRS AND IMPROVEMENTS ***************************************************-->
        <tr>
            <td colspan="2" align="left" width="100%">
                <div class="p3">
                    <b>
                        <? echo $REP_IMPROV ?>
                    </b>
                </div>
                <br>
                <table width="100%" border="0">
                    <tr>
                        <td width="470" class="p2">
                            <? echo $REP_IMPROV_DESC ?>
                        </td>
                        <td style="vertical-align:middle;" valign="middle">
                            <input type="text" name="reparacoes" size="6"
                                   id="repairs"
                                   maxlength="9" value="<? echo $STD_REPAIRS; ?>">
                            <span class="p2">
                                <? echo $CURR_SYMBOL ?>/<? echo $YEAR ?>
                            </span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
<!--************************** PARQUEAMENTO | PARKING ***************************************************-->
        <tr>
            <td colspan="2" align="left" width="100%">
                <div class="p3">
                    <b>
                        <? echo $PARKING ?>
                    </b>
                </div>
                <br>
                <table width="100%" border="0">
                    <tr>
                        <td width="470" class="p2">
                            <? echo $PARKING_DESC ?>
                        </td>
                        <td style="vertical-align:middle;" valign="middle">
                            <input type="text" name="parqueamento" size="6"
                                   id="parking"
                                   maxlength="9" value="<? echo $STD_PARKING; ?>">
                            <span class="p2">
                                <? echo $CURR_SYMBOL ?>/<? echo $MONTH ?>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </td>
        </tr>
<!--************************** PORTAGENS | TOLLS ***************************************************-->
        <tr>
            <td colspan="2" align="left" width="100%">
                <span class="p3">
                    <b>
                        <? echo $TOLLS ?>
                    </b>
                </span>
                <br>
                <table width="100%" border="0">
                    <tr>
                        <td class="p2">
                            <? echo $TOLLS_DESC ?>
                            <br>
                        </td>
                        <td align="right" class="p2">
                            <? echo $TOLLS_DAY_CALC ?>
                        </td>
                        <td align="right">
                            <input type="radio" name="portagens_ao_dia" value="true" onclick="tolls_daily(true); ">
                                <span class="p2">
                                    <? echo $YES ?>
                                </span>
                            <input type="radio" name="portagens_ao_dia" value="false" onclick="tolls_daily(false);"
                                   checked="checked">
                            <span class="p2">
                                <? echo $NO ?>
                            </span>
                        </td>
                    </tr>
                </table>
                <br>
                <div id="dia_nao_portag_DIV">
                    <table width="100%" border="0">
                        <tr>
                            <td width="60%" class="p2">
                                <i>
                                    <? echo $TOLLS_DAY_CALC_DESC ?>
                                </i>
                            </td>
                            <td align="right" style="vertical-align:middle;" valign="middle">
                                <input type="text" id="no_daily_tolls_value" name="portagens" size="6" maxlength="9"
                                       value="<? echo $STD_TOLLS; ?>">
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
                    <table width="100%" border="0">
                        <tr>
                            <td align="left" class="p2">
                                <? echo $TOLLS_DAY_CALC1 ?>
                            </td>
                            <td align="right">
                                <input type="text" id="daily_expense_tolls" name="preco_portagens_por_dia" size="6"
                                       maxlength="9"
                                       value="<? echo $STD_TOLLS_DAY; ?>">
                                <span class="p2">
                                    <? echo $CURR_SYMBOL ?> <? echo $DURING ?>
                                </span>
                                <input type="text" id="number_days_tolls" name="dias_portagens_por_mes" size="3" maxlength="2"
                                       value="<? echo $STD_TOLLS_DAYS_PER_MONTH; ?>">
                                <span class="p2">
                                    <? echo $DAYS ?> <? echo $WORD_PER ?> <? echo $MONTH ?>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
<!--************************** MULTAS | FINES ***************************************************-->
        <tr>
            <td colspan="2" align="left" width="100%">

                <div class="p3">
                    <b>
                        <? echo $FINES ?>
                    </b>
                </div>
                <br>
                <table width="100%" border="0">
                    <tr>
                        <td width="60%" class="p2">
                            <? echo $FINES_DESC ?>
                        </td>
                        <td align="right" style="vertical-align:middle;" valign="middle">
                            <input type="text" id="tickets_value" name="multas" size="6" maxlength="9"
                                   value="<? echo $STD_FINES; ?>">
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
            </td>
        </tr>
<!--************************** LAVAGENS | WASHING ***************************************************-->
        <tr>
            <td colspan="2" align="left" width="100%">
                <div class="p3">
                    <b>
                        <? echo $WASHING ?>
                    </b>
                </div>
                <br>
                <table width="100%" border="0">
                    <tr>
                        <td width="60%" class="p2">
                            <? echo $WASHING_DESC ?>
                        </td>
                        <td align="right" style="vertical-align:middle;" valign="middle">
                            <input type="text" id="washing_value" name="lavagens" size="6" maxlength="9"
                                   value="<? echo $STD_WASHING; ?>">
                            <span class="p2">
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
            </td>
        </tr>
    </table>

    <br>
    <input class="button" type="submit" onclick="openForm_part('form_part', 1, true)" value="&laquo;"/>
    <p2>&nbsp;&nbsp;2/3&nbsp;&nbsp;</p2>
    <input class="button" type="submit" onclick="openForm_part('form_part', 3, true)" value="&raquo;"/>

</div> <!-- end of form_part2-->