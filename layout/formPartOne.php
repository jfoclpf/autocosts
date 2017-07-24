<div class="form_part" id="form_part1">
    <div class="form_part_head_title">
        <header>
            <h2>
                <b>
                    <?php echo $FIXED_COSTS_HEADER_1 ?>
                </b>
            </h2>
            <h4>
                <?php echo $FIXED_COSTS_HEADER_2 ?>
            </h4>
        </header>
    </div>
    <!--************************** DEPRECIATION ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $DEPRECIATION ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $AQ_DATE ?>
            </td>
            <td id="depr_input_td">
                <input type="number" min="1" max="12" step="1" id="acquisitionMonth" name="auto_mes" size="3" value="<?php echo $STD_ACQ_MONTH; ?>">
                &#8209;<!--non breakable hyphen-->
                <input type="number" min="1910" step="1" id="acquisitionYear" name="auto_ano" size="6" value="<?php echo $STD_ACQ_YEAR; ?>">
            </td>
        </tr>
        <tr>
            <td class="p2">
                <?php echo $COM_VALUE ?>
            </td>
            <td>
                <input type="number" min="0" step="Any" id="commercialValueAtAcquisition" class="currencyInput" name="auto_val_inicial" size="10" value="<?php echo $STD_PRICE_PAID; ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
        <tr>
            <td class="p2">
                <?php echo $COM_VALUE_TODAY ?>
            </td>
            <td>
                <input type="number" min="0" step="Any" id="commercialValueAtNow" class="currencyInput" name="auto_val_final" size="10" value="<?php echo $STD_PRICE_TODAY; ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    <!--************************** INSURANCE ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $INSURANCE ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="mensal">
                    <span>
                        <?php echo $MONTHLY ?>
                    </span>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="trimestral">
                    <span>
                        <?php echo $TRIMESTERLY ?>
                    </span>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="semestral">
                    <span>
                        <?php echo $SEMESTERLY ?>
                    </span>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="anual">
                    <span>
                        <?php echo $YEARLY ?>
                    </span>
                </div>
            </td>
            <td>
                <input type="number" min="0" step="Any" id="insuranceValue" class="currencyInput" name="seguro_val" size="9"
                    value="<?php echo $STD_INSURANCE_SEM; ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    <!--************************** CREDIT ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $CREDIT ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $CREDIT_QUESTION ?>
            </td>
            <td>
                <span class="nowrap">
                    <input type="radio" id="cred_auto_true" name="cred_auto" value="true" class="no_left_margin" onclick="onclick_div_show('#sim_credDiv',true);">
                    <span class="set_right_margin">
                        <?php echo $YES ?>
                    </span>
                </span>
                <span class="nowrap">
                    <input type="radio" id="cred_auto_false" name="cred_auto" value="false" class="no_left_margin" onclick="onclick_div_show('#sim_credDiv',false);" checked>
                    <span>
                        <?php echo $NO ?>
                    </span>
                </span>
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
                    <input type="number" min="0" step="Any" id="borrowedAmount" class="currencyInput" name="cred_auto_montante" size="9" value="<?php echo $STD_LOAN; ?>">
                    <?php echo $CURR_SYMBOL ?>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_PERIOD ?>
                </td>
                <td>
                    <input type="number" min="1" step="1" id="numberInstallments" name="cred_auto_period" size="9" value="<?php echo $STD_PERIOD_OF_CREDIT; ?>">
                    <?php echo $MONTHS ?>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_AVERAGE_VALUE ?>
                </td>
                <td>
                    <input type="number" min="0" step="Any" id="amountInstallment" class="currencyInput" name="cred_auto_val_mes" size="9" value="<?php echo $STD_MONTHLY_PAY; ?>">
                    <?php echo $CURR_SYMBOL ?>/<?php echo $MONTH ?>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_RESIDUAL_VALUE ?>
                </td>
                <td>
                    <input type="number" min="0" step="Any" id="residualValue" class="currencyInput" name="cred_auto_valresidual" size="9" value="<?php echo $STD_RESIDUAL_VALUE; ?>">
                    <?php echo $CURR_SYMBOL ?>
                </td>
            </tr>
        </table>
    </div>
    <!--************************** INSPECTION ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $INSPECTION ?>
        </span>
    </h3>
    <table>
        <tr>
            <td>
                <?php echo $INSPECTION_NBMR_TIMES ?>
            </td>
            <td>              
                <input type="number" min="0" step="1" id="numberInspections" name="nr_vezes_inspecao" size="6" value="<?php echo $STD_NBR_INSPECTION; ?>">
                <?php echo $WORD_TIMES ?>
            </td>
        </tr>
        <tr id="InspectionCost_tr">
            <td>
                <?php echo $INSPECTION_PRICE ?>
            </td>
            <td>
                <input type="number" min="0" step="Any" id="averageInspectionCost" class="currencyInput" name="preco_inspecao" size="6" value="<?php echo $STD_INSPECTION_PRICE; ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    <!--************************** ROAD TAX ***************************************************-->
    <h3>
        <span class="form_section_title">
            <?php echo $ROAD_TAXES ?>
        </span>
    </h3>
    <table>
        <tr>
            <td class="p2">
                <?php echo $ROAD_TAXES_VALUE ?>
            </td>
            <td>
                <input type="number" min="0" step="Any" id="vehicleExciseTax" class="currencyInput" name="IUC" size="6" value="<?php echo $STD_ROAD_TAX; ?>">
                <?php echo $CURR_SYMBOL ?>/<?php echo $YEAR ?>
            </td>
        </tr>
    </table>
    <div class="b-bottom">
        <span class="step">1/3</span>
        <input id="form_part1_button_next" class="button" type="button" onclick="openForm_part(1, 2);"
            value="&raquo;"/>
    </div>
</div>
<!-- end of form_part1-->
