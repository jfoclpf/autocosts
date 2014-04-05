<div class="form_part" id="form_part1">

<table class="roundCorner main_table" cellpadding="5%">

<tr>
    <td class="form_sub_header">
        <div class="p3">
            <b>
                <? echo $FIXED_COSTS_HEADER_1 ?>
            </b>
        </div>
        <div class="p2">
            <? echo $FIXED_COSTS_HEADER_2 ?>
        </div>
    </td>
</tr>

<!--************************** Desvalorização do veículo ***************************************************-->
<tr>
    <td style="border-top:black 1px solid;" colspan="2" align="left" width="100%">
        <div class="p2">
            <br>
        </div>
        <div class="p3">
            <b>
                <? echo $DEPRECIATION ?>
            </b>
        </div>
        <div class="p2">
            <br>
        </div>
        <table width="100%" border="0">
            <tr>
                <td class="p2">
                    <? echo $AQ_DATE ?>&nbsp;
                </td>
                <td style="white-space:nowrap; text-align:right; right:0px; vertical-align:middle;" align="right">
                    <input id="acquisitionMonth" type="text" name="auto_mes" size="10" maxlength="2"
                           value="<? echo $STD_ACQ_MONTH; ?>"
                           style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;"/>
                    -
                    <input id="acquisitionYear" type="text" name="auto_ano" size="10" maxlength="4"
                           value="<? echo $STD_ACQ_YEAR; ?>"
                           style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;"/>
                </td>
            </tr>
        </table>

        <table width="100%" border="0">
            <tr>
                <td class="p2">
                    <? echo $COM_VALUE ?>&nbsp;
                </td>
                <td style="white-space:nowrap; text-align:right;right:0px; vertical-align:middle;" valign="top"
                    align="right">
                    <input type="text" id="commercialValueAtAcquisition" name="auto_val_inicial" size="10"
                           maxlength="12"
                           value="<? echo $STD_PRICE_PAID; ?>"
                           style="margin:5px 0 5px 0;border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                    <span class="p2">
                        <? echo $CURR_SYMBOL ?>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="p2">
                    <? echo $COM_VALUE_TODAY ?>
                </td>
                <td style="white-space:nowrap; text-align:right;right:0px; vertical-align:middle;" valign="top"
                    align="right">
                    <input type="text" id="commercialValueAtNow" name="auto_val_final" size="10" maxlength="12"
                           value="<? echo $STD_PRICE_TODAY; ?>"
                           style="margin:9px 0 9px 0;border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                    <span class="p2">
                        <? echo $CURR_SYMBOL ?>
                    </span>
                </td>
            </tr>
        </table>
    </td>
</tr>

<!--************************** SEGURO AUTOMÓVEL | INSURANCE ***************************************************-->

<tr>
    <td colspan="2" align="left" width="100%">
        <div class="p3">
            <b>
                <? echo $INSURANCE ?>
            </b>
        </div>
        <br>

        <div id="div_seg0" width="100%" border="0">
            <div id="div_seg1" class="div_seg" width="80%">
                <table>
                    <tr>
                        <td>
                            <input type="radio" name="tipo_seguro" value="mensal">
                            <span class="p2">
                                <? echo $MONTHLY ?>&nbsp;
                            </span>
                        </td>
                        <td>
                            <input type="radio" name="tipo_seguro" value="trimestral">
                             <span class="p2">
                                <? echo $TRIMESTERLY ?>&nbsp;
                            </span>
                        </td>
                        <td>
                            <input type="radio" name="tipo_seguro" value="semestral" checked>
                             <span class="p2">
                                <? echo $SEMESTERLY ?>&nbsp;
                            </span>
                        </td>
                        <td>
                            <input type="radio" name="tipo_seguro" value="anual">
                             <span class="p2">
                                <? echo $YEARLY ?>&nbsp;
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="div_seg2" class="div_seg" style="white-space:nowrap;">
                <input id="insuranceValue" type="text" size="9" maxlength="10" value="<? echo $STD_INSURANCE_SEM; ?>"
                       name="seguro_val"
                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                <span class="p2">
                    <? echo $CURR_SYMBOL ?>
                </span>
            </div>
        </div>
    </td>
</tr>

<!--************************** CRÉDITO | CREDIT ***************************************************-->

<tr>
    <td colspan="2" align="left" width="100%">
        <div class="p3">
            <b>
                <? echo $CREDIT ?>
            </b>
        </div>
        <div class="p2">
            <? echo $CREDIT_QUESTION ?>
            <input type="radio" name="cred_auto" value="true" onclick="onclick_credit('true'); ">
            <? echo $YES ?>
            <input type="radio" name="cred_auto" value="false" id="radio_cred_nao" onclick="onclick_credit('false'); "
                   checked>
            <? echo $NO ?>
        </div>
        <div id="sim_credDiv">
            <table width="100%" border="0">
                <tr>
                    <td style="width:90%" class="p2">
                        <? echo $CREDIT_LOAN ?>
                    </td>
                    <td style="white-space:nowrap; width:10%;vertical-align:middle;" valign="middle" width="10%">
                        <input id="borrowedAmount" type="text" name="cred_auto_montante" size="9" maxlength="12"
                               value="<? echo $STD_LOAN; ?>"
                               style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                        <span class="p2">
                            <? echo $CURR_SYMBOL ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="p2">
                        <? echo $CREDIT_PERIOD ?>
                    </td>
                    <td style="white-space:nowrap;">
                        <input id="numberInstallments" type="text" name="cred_auto_period" size="9" maxlength="3"
                               value="<? echo $STD_PERIOD_OF_CREDIT; ?>"
                               style="margin:5px 0 5px 0; border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                        <span class="p2">
                            <? echo $MONTHS ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="p2">
                        <? echo $CREDIT_AVERAGE_VALUE ?>
                    </td>
                    <td style="white-space:nowrap;">
                        <input id="amountInstallment" type="text" name="cred_auto_val_mes" size="9" maxlength="9"
                               value="<? echo $STD_MONTHLY_PAY; ?>"
                               style="margin:5px 0 5px 0; border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                        <span class="p2">
                            <? echo $CURR_SYMBOL ?>/<? echo $MONTH ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="p2">
                        <? echo $CREDIT_RESIDUAL_VALUE ?>
                    </td>
                    <td style="white-space:nowrap; vertical-align:middle;" valign="middle">
                        <input id="residualValue" type="text" name="cred_auto_valresidual" size="9" maxlength="12"
                               value="<? echo $STD_RESIDUAL_VALUE; ?>"
                               style="vertical-align:middle; border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                        <span class="p2">
                            <? echo $CURR_SYMBOL ?>
                        </span>
                    </td>
                </tr>
            </table>
        </div>
    </td>
</tr>

<!--************************** INSPEÇÃO PERIÓDICA | INSPECTION ***************************************************-->

<tr>
    <td colspan="2" align="left" width="100%">
        <div class="p3">
            <b>
                <? echo $INSPECTION ?>
            </b>
        </div>
        <table style="margin:0px; width:100%;" width="100%" border="0">
            <tr>
                <td class="p2" style="width:80%;" width="80%">
                    <? echo $INSPECTION_NBMR_TIMES ?>
                </td>
                <td style="width:20%;left:0px;" width="20%">
                    <input id="numberInspections" type="text" name="nr_vezes_inspecao" size="6" maxlength="2"
                           value="<? echo $STD_NBR_INSPECTION; ?>"
                           style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                    <span class="p2">
                        <? echo $WORD_TIMES ?>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="p2">
                    <? echo $INSPECTION_PRICE ?>
                </td>
                <td style="white-space:nowrap; ">
                    <input id="averageInspectionCost" type="text" name="preco_inspecao" size="6" maxlength="9"
                           value="<? echo $STD_INSPECTION_PRICE; ?>"
                           style="margin:5px 0 5px 0; border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                        <span class="p2">
                            <? echo $CURR_SYMBOL ?>
                        </span>
                </td>
            </tr>
            <!--************************** IUC ***************************************************-->
            <tr>
                <td style="vertical-align:middle;" class="p3">
                    <b>
                        <? echo $ROAD_TAXES ?>
                    </b>
                </td>
            </tr>
            <tr>
                <td class="p2">
                    <? echo $ROAD_TAXES_VALUE ?>
                </td>
                <td>
                    <input id="vehicleExciseTax" type="text" name="IUC" size="6" maxlength="9"
                           value="<? echo $STD_ROAD_TAX; ?>"
                           style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                    <span class="p2">
                        <? echo $CURR_SYMBOL ?>/<? echo $YEAR ?>
                    </span>
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>

<br>
<p2>1/3&nbsp;&nbsp;</p2>
<input class="button" type="submit" onclick="openForm_part('form_part', 2, true)" value="&raquo;"/>

</div> <!-- end of form_part1-->