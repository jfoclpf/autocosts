<!--************************** DADOS ADICIONAIS ***************************************************-->
<div class="form_part" id="form_part3">
    <table class="roundCorner main_table" cellpadding="5%">
        <tr>
            <td class="form_sub_header">
                <div class="p3">
                    <b>
                        <? echo $EXTRA_DATA ?>
                    </b>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="left" width="100%">
                <table width="100%" border="0">
                    <tr>
                        <td width="68%" class="p2">
                            <? echo $EXTRA_DATA_FAMILY_NBR ?>
                        </td>
                        <td width="20%" align="right">
                            <input type="text" id="household_number_people" 
								name="pessoas_agregado" size="6" maxlength="2" value="<? echo $STD_NR_PPL_FAMILY ?>">
                        </td>
                        <td align="left">
                            <span class="p2">
                                &nbsp;<? echo $WORD_PEOPLE ?>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br>
                        </td>
                    </tr>
                    <tr>
                        <td class="p2">
                            <? echo $EXTRA_DATA_PRICE_PASS ?>
                        </td>
                        <td align="right">
                            <input type="text" id="public_transportation_month_expense" 
								name="preco_passe" size="6" maxlength="9" value="<? echo $STD_PASS_PRICE ?>">
                        </td>
                        <td>
                            <span class="p2">
                                &nbsp;<? echo $CURR_SYMBOL ?>
                            </span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <br>
    <input class="button" type="submit" onclick="openForm_part('form_part', 3, 2, true)" value="&laquo;" />
    <input class="button" type="submit"
           onclick="if(calcula_custos_auto() <?if ($def_cty=="XX"){echo "&& false";}?> ){submit_data('<?php echo $def_cty ?>');} " value="<? echo $BUTTON_RUN; ?>" />
</div> <!-- end of form_part3-->