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
    <!--************************** Desvalorização do veículo ***************************************************-->
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
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
        <tr>
            <td class="p2">
                <?php echo $COM_VALUE_TODAY ?>
            </td>
            <td>
                <input type="number" id="commercialValueAtNow" name="auto_val_final" size="10" value="<?php echo $STD_PRICE_TODAY; ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    <!--************************** SEGURO AUTOMÓVEL | INSURANCE ***************************************************-->
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
                    <?php echo $MONTHLY ?>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="trimestral">
                    <?php echo $TRIMESTERLY ?>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="semestral" checked>
                    <?php echo $SEMESTERLY ?>
                </div>
                <div class="col">
                    <input type="radio" name="tipo_seguro" value="anual">
                    <?php echo $YEARLY ?>
                </div>
            </td>
            <td>
                <input id="insuranceValue" type="number" name="seguro_val" size="9"
                    value="<?php echo $STD_INSURANCE_SEM; ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    <!--************************** CRÉDITO | CREDIT ***************************************************-->
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
                    <span class="set_right_margin"><?php echo $YES ?></span>
                </span>
                <span class="nowrap">
                    <input type="radio" id="cred_auto_false" name="cred_auto" value="false" class="no_left_margin" onclick="onclick_div_show('#sim_credDiv',false);" checked>
                    <?php echo $NO ?>
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
                    <input id="borrowedAmount" type="number" name="cred_auto_montante" size="9" value="<?php echo $STD_LOAN; ?>">
                    <?php echo $CURR_SYMBOL ?>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_PERIOD ?>
                </td>
                <td>
                    <input id="numberInstallments" type="number" name="cred_auto_period" size="9" value="<?php echo $STD_PERIOD_OF_CREDIT; ?>">
                    <?php echo $MONTHS ?>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_AVERAGE_VALUE ?>
                </td>
                <td>
                    <input id="amountInstallment" type="number" name="cred_auto_val_mes" size="9" value="<?php echo $STD_MONTHLY_PAY; ?>">
                    <?php echo $CURR_SYMBOL ?>/<?php echo $MONTH ?>
                </td>
            </tr>
            <tr>
                <td>
                    <?php echo $CREDIT_RESIDUAL_VALUE ?>
                </td>
                <td>
                    <input id="residualValue" type="number" name="cred_auto_valresidual" size="9" value="<?php echo $STD_RESIDUAL_VALUE; ?>">
                    <?php echo $CURR_SYMBOL ?>
                </td>
            </tr>
        </table>
    </div>
    <!--************************** INSPEÇÃO PERIÓDICA | INSPECTION ***************************************************-->
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
                <input id="numberInspections" type="number" name="nr_vezes_inspecao" size="6" value="<?php echo $STD_NBR_INSPECTION; ?>">
                <?php echo $WORD_TIMES ?>
            </td>
        </tr>
        <tr id="InspectionCost_tr">
            <td>
                <?php echo $INSPECTION_PRICE ?>
            </td>
            <td>
                <input id="averageInspectionCost" type="number" name="preco_inspecao" size="6" value="<?php echo $STD_INSPECTION_PRICE; ?>">
                <?php echo $CURR_SYMBOL ?>
            </td>
        </tr>
    </table>
    <!--************************** IUC ***************************************************-->
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
                <input id="vehicleExciseTax" type="number" name="IUC" size="6" value="<?php echo $STD_ROAD_TAX; ?>">
                <?php echo $CURR_SYMBOL ?>/<?php echo $YEAR ?>
            </td>
        </tr>
    </table>
    <div class="b-bottom">
        <span class="step">1/3</span>
        <input id="form_part1_button_next" class="button" type="button" onclick="openForm_part('form_part', 1, 2);"
            value="&raquo;"/>
    </div>
</div>
<!-- end of form_part1-->
