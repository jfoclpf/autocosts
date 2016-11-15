<div class="form_part" id="form_part1">
    <div class="head-title">
        <b><?php echo $FIXED_COSTS_HEADER_1 ?></b>
        <?php echo $FIXED_COSTS_HEADER_2 ?>
    </div>
    <!--************************** Desvalorização do veículo ***************************************************-->
    <strong class="title">
        <?php echo $DEPRECIATION ?>
    </strong>
    <table>
        <tr>
            <td>
                <?php echo $AQ_DATE ?>
            </td>
            <td id="depr_input_td">
                <input id="acquisitionMonth" type="number" name="auto_mes" size="3" value="<?php echo $STD_ACQ_MONTH; ?>">
                &#8209;<!--non breakable hyphen-->
                <input id="acquisitionYear" type="number" name="auto_ano" size="6" value="<?php echo $STD_ACQ_YEAR; ?>">
            </td>
        </tr>
        <tr>
            <td class="p2">
                <?php echo $COM_VALUE ?>
            </td>
            <td>
                <input type="number" id="commercialValueAtAcquisition" name="auto_val_inicial" size="10" value="<?php echo $STD_PRICE_PAID; ?>">
                <span class="p2">
                    <?php echo $CURR_SYMBOL ?>
                </span>
            </td>
        </tr>
        <tr>
            <td class="p2">
                <?php echo $COM_VALUE_TODAY ?>
            </td>
            <td>
                <input type="number" id="commercialValueAtNow" name="auto_val_final" size="10" value="<?php echo $STD_PRICE_TODAY; ?>">
                <span class="p2">
                    <?php echo $CURR_SYMBOL ?>
                </span>
            </td>
        </tr>
    </table>
    <!--************************** SEGURO AUTOMÓVEL | INSURANCE ***************************************************-->
    <strong class="title">
        <?php echo $INSURANCE ?>
    </strong>
    <table>
        <tr>
            <td>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="mensal">
                    <span class="p2">
                        <?php echo $MONTHLY ?>
                    </span>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="trimestral">
                    <span class="p2">
                        <?php echo $TRIMESTERLY ?>
                    </span>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="semestral" checked>
                    <span class="p2">
                        <?php echo $SEMESTERLY ?>
                    </span>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="anual">
                    <span class="p2">
                        <?php echo $YEARLY ?>
                    </span>
                </div>
            </td>
            <td>
                <input id="insuranceValue" type="number" name="seguro_val" size="9"
                    value="<?php echo $STD_INSURANCE_SEM; ?>">
                <span class="p2">
                    <?php echo $CURR_SYMBOL ?>
                </span>
            </td>
        </tr>
    </table>
    <!--************************** CRÉDITO | CREDIT ***************************************************-->
    <strong class="title">
        <?php echo $CREDIT ?>
    </strong>
    <table>
        <tr>
            <td>
                <?php echo $CREDIT_QUESTION ?>
            </td>
            <td>
                <span style="white-space:nowrap"><input type="radio" name="cred_auto" value="true" onclick="onclick_credit('true'); "><?php echo $YES ?></span>
                <span style="white-space:nowrap"><input type="radio" name="cred_auto" value="false" id="radio_cred_nao" onclick="onclick_credit('false');" checked><?php echo $NO ?></span>
            </td>
        </tr>
    </table>
    <div id="sim_credDiv">
        <table>
            <tr>
                <td>
                    <?php echo $CREDIT_LOAN ?>
                </td>
                <td>
                    <input id="borrowedAmount" type="number" name="cred_auto_montante" size="9" value="<?php echo $STD_LOAN; ?>">
                    <span class="p2">
                        <?php echo $CURR_SYMBOL ?>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_PERIOD ?>
                </td>
                <td>
                    <input id="numberInstallments" type="number" name="cred_auto_period" size="9" value="<?php echo $STD_PERIOD_OF_CREDIT; ?>">
          <span>
          <?php echo $MONTHS ?>
          </span>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_AVERAGE_VALUE ?>
                </td>
                <td>
                    <input id="amountInstallment" type="number" name="cred_auto_val_mes" size="9" value="<?php echo $STD_MONTHLY_PAY; ?>">
                    <span>
                        <?php echo $CURR_SYMBOL ?>/<?php echo $MONTH ?>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_RESIDUAL_VALUE ?>
                </td>
                <td>
                    <input id="residualValue" type="number" name="cred_auto_valresidual" size="9" value="<?php echo $STD_RESIDUAL_VALUE; ?>">
                    <span>
                        <?php echo $CURR_SYMBOL ?>
                    </span>
                </td>
            </tr>
        </table>
    </div>
    <!--************************** INSPEÇÃO PERIÓDICA | INSPECTION ***************************************************-->
    <strong class="title">
        <?php echo $INSPECTION ?>
    </strong>
    <table>
        <tr>
            <td>
                <?php echo $INSPECTION_NBMR_TIMES ?>
            </td>
            <td>              
                <input id="numberInspections" type="number" name="nr_vezes_inspecao" size="6" value="<?php echo $STD_NBR_INSPECTION; ?>">
                <span>
                    <?php echo $WORD_TIMES ?>
                </span>
            </td>
        </tr>
        <tr id="InspectionCost_tr">
            <td>
                <?php echo $INSPECTION_PRICE ?>
            </td>
            <td>
                <input id="averageInspectionCost" type="number" name="preco_inspecao" size="6" value="<?php echo $STD_INSPECTION_PRICE; ?>">
                <span class="p2">
                    <?php echo $CURR_SYMBOL ?>
                </span>
            </td>
        </tr>
    </table>
    <!--************************** IUC ***************************************************-->
    <strong class="title">
        <?php echo $ROAD_TAXES ?>
    </strong>
    <table>
        <tr>
            <td class="p2">
                <?php echo $ROAD_TAXES_VALUE ?>
            </td>
            <td>
                <input id="vehicleExciseTax" type="number" name="IUC" size="6" value="<?php echo $STD_ROAD_TAX; ?>">
                <span>
                    <?php echo $CURR_SYMBOL ?>/<?php echo $YEAR ?>
                </span>
            </td>
        </tr>
    </table>
    <div class="b-bottom">
        <span class="step">1/3</span>
        <input class="button" type="button" onclick="openForm_part('form_part', 1, 2, '<?php echo $GLOBALS["country"] ?>', '<?php echo $LANGUAGE_CODE ?>');"
            value="&raquo;"/>
    </div>
</div>
<!-- end of form_part1-->
