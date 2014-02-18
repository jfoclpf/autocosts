<!--
//***********************************************
//											   **
//              AUTOCOSTS.ORG                  **
//      the automobile costs simulator		   **
// 											   **
//      made by João Pimentel Ferreira         **
//       under Creative Commons BY-SA          **
//	  										   **
//***********************************************
-->

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <?
    include("./country files/country_list.php");

    asort($avail_CT); //sorts alphabetically the counties list

    $url_cc = $_GET["c"]; //selected country code from URL
    $url_cc=strtoupper($url_cc); //uppercase

    //function is country in list
    function is_cty_inlist($cc, $c_array)
    { //cc=country code
        if ($cc == null) {
            return false;
        }
        foreach ($c_array as $key => $value) {
            if ($key == $cc) {
                return true;
            }
        }
        return false;
    }

    //*****************

    //if no country is defined or the country isn't in the list
    if ($url_cc == null || !is_cty_inlist($url_cc, $avail_CT)) {
        $lang1 = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        $lang_cty = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 3, 2);
        
	$lang1=strtoupper($lang1);
	$lang_cty=strtoupper($lang_cty);        

        if (is_cty_inlist($lang_cty, $avail_CT)) {
            $def_cty = $lang_cty;
        } elseif (is_cty_inlist($lang1, $avail_CT)) {
            $def_cty = $lang1;
        } else {
            $def_cty = "GB";
        }
        echo "<script type=\"text/javascript\"> window.location.href = \"index.php?c=" . $def_cty . "\" </script>";
    } else {
        $def_cty = $url_cc;
    }

    include('./country files/' . $def_cty . '.php');

    ?>


    <title><? echo $WEB_PAGE_TITLE ?></title>
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/color.css">
    <link rel="stylesheet" type="text/css" href="css/flags24.css">
    <!-- Google API -->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="js/js.js"></script>
    <script type="text/javascript" src="js/businessLogic_js.php?country=<?php echo $def_cty ?>"></script>
    <script type="text/javascript" src="js/charts_js.php?country=<?php echo $def_cty ?>"></script>
</head>


<body onload="initialize(); ">

<script type="text/javascript">
    /*jslint browser:true */
    /*jslint white: false */
    google.load('visualization', '1', {packages: ['corechart']});
</script>

<!--facebook script-->
<div id="fb-root"></div>

<div id="main_div" style=" top: 0; background: none repeat scroll 0px 0px transparent; display: block; font-family: Verdana; overflow: auto;">
    <!--#### MAIN TITLE ###-->
    <div class="banner topFixed">

        <div id="banner_left">&nbsp;</div>

        <div class="main_title p5">
            <b><? echo $MAIN_TITLE ?></b>
        </div>

        <!--## Select country box ##-->
		<div class="banner_right">
		<div style="display: inline-block;text-align:right;">
			<div style="display: table; margin: 0 auto;">
				<div style="display: table-row;">
					<div style="display: table-cell; height:24px;width:24px;">
						<div style="margin-right: 2px; margin-top: 2px;" class="<?php echo strtolower($def_cty) ?> flag"></div>
					</div>
					<div style="display: table-cell; vertical-align: bottom;">
						<select name="country_select" id="country_select" onchange="valueselect(this.value);"">
							<?php foreach ($avail_CT as $key => $value) { ?>
								<option value="<?php echo $key ?>" <? if ($key == $def_cty) {
									echo "selected=\"selected\"";
								} ?>> <?php echo $value ?></option>
							<?php } ?>
						</select>
					</div>
				</div>
			</div>
		</div>
		</div>

        <!--#####################-->
    </div>
    <br>
    <div class="description p3">
        <br>
        <? echo $INITIAL_TEXT ?>
        <br>
        <br>
    </div>

    <div id="container" style="border-collapse:collapse;border-color:rgb(136,136,136);border-width:0px;margin:0 auto;">
	

        <div id="br_btween_divs">
            <br>
        </div>

        <!--#######################################################################################-->
        <!--#####################################  SIMULATOR  #####################################-->
        <!--#######################################################################################-->

        <div id="div2" style="margin:0 auto;">
            <form class="roundCorner" style="display:block; max-width:620px;margin:0 auto;" id="main_form" enctype="application/x-www-form-urlencoded"
                action="javascript:void(0);" name="custo" method="get">

                    <div class="p4" style="text-align:center;">
                        <br>
                        <? echo $AC_HEADER ?>
                        <br>
                        <br>
                    </div>

                    <div id="input_div" style="margin: 0 auto;display:block;overflow:auto;">

                    <table id="main_table" class="roundCorner" cellpadding="5%">
                        <tr>
                            <td style="text-align: center; background-color: rgb(173, 166, 146); color: white;">
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
                                            <input type="text" name="auto_mes" size="10" maxlength="2" value="<? echo $STD_ACQ_MONTH; ?>"
                                                   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;"/>
                                            -
                                            <input type="text" name="auto_ano" size="10" maxlength="4" value="<? echo $STD_ACQ_YEAR; ?>"
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
                                            <input type="text" name="auto_val_inicial" size="10" maxlength="12"
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
                                            <input type="text" name="auto_val_final" size="10" maxlength="12" value="<? echo $STD_PRICE_TODAY;?>"
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
                                        <input type="text" size="9" maxlength="10" value="<? echo $STD_INSURANCE_SEM; ?>" name="seguro_val"
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
                                    <input type="radio" name="cred_auto" value="sim_cred" onclick="onclick_sim_cred(); ">
                                    <? echo $YES ?>
                                    <input type="radio" name="cred_auto" value="nao_cred" id="radio_cred_nao" onclick="onclick_nao_cred(); " checked>
                                    <? echo $NO ?>
                                </div>
                                <div id="sim_credDiv">
                                    <table width="100%" border="0">
                                        <tr>
                                            <td style="width:90%" class="p2">
                                                    <? echo $CREDIT_LOAN ?>
                                            </td>
                                            <td style="white-space:nowrap; width:10%;vertical-align:middle;" valign="middle" width="10%">
                                                <input type="text" name="cred_auto_montante" size="9" maxlength="12" value="<? echo $STD_LOAN; ?>"
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
                                                <input type="text" name="cred_auto_period" size="9" maxlength="3" value="<? echo $STD_PERIOD_OF_CREDIT; ?>"
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
                                                <input type="text" name="cred_auto_val_mes" size="9" maxlength="9" value="<? echo $STD_MONTHLY_PAY; ?>"
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
                                                <input type="text" name="cred_auto_valresidual" size="9" maxlength="12"
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
                                            <input type="text" name="nr_vezes_inspecao" size="6" maxlength="2"
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
                                            <input type="text" name="preco_inspecao" size="6" maxlength="9"
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
                                            <input type="text" name="IUC" size="6" maxlength="9" value="<? echo $STD_ROAD_TAX; ?>"
                                                   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                            <span class="p2">
                                                <? echo $CURR_SYMBOL ?>/<? echo $YEAR ?>
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="text-align: center; border-top: 1px solid black; border-bottom: 1px solid black; background-color: rgb(173, 166, 146); color: white;">
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
                                            <input type="radio" name="calc_combustiveis" id="radio_fuel_km" value="km" onclick="onclick_km(); ">
                                            <span class="p2">
                                                <? echo $STD_DIST ?>&nbsp;
                                            </span>
                                        </td>
                                        <td width="18%"><input type="radio" name="calc_combustiveis" id="radio_fuel_euros" value="euros" onclick="onclick_euro(); ">
                                           <span class="p2">
                                               <? echo $CURR_NAME_PLURAL ?>
                                           </span>
                                        </td>

                                        <td align="right" width="60%">
                                            <div id="eurosDiv">
                                                <input type="text" size="9" maxlength="9" value="<? echo $STD_FUEL_PAID_PER_MONTH; ?>"
                                                       name="combustiveis_euro"
                                                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                                <span class="p2">
                                                    <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
                                                </span>
                                                <select id="combustiveis_periodo_euro"
                                                        style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                            value="sim" onclick="onclick_carroempregosim();">
                                                    <span class="p2">
                                                        <? echo $YES ?>
                                                    </span>
                                                </div>
                                                <div style="white-space:nowrap;">
                                                    <input type="radio" name="carro_emprego" id="carro_emprego_nao"
                                                           value="nao" onclick="onclick_carroempregonao();">
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
                                                                <input type="text"
                                                                        name="dias_por_semana" size="9"
                                                                        maxlength="1"
                                                                        value="<? echo $STD_DAYS_PER_WEEK; ?>"
                                                                        style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                                        name="km_entre_casa_trabalho"
                                                                        size="9" maxlength="4"
                                                                        value="<? echo $STD_JORNEY_2WORK; ?>"
                                                                        style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                                <input type="text" name="km_fds"
                                                                        size="9" maxlength="4"
                                                                        value="<? echo $STD_JORNEY_WEEKEND; ?>"
                                                                        style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                                       value="<? echo $STD_KM_PER_MONTH; ?>"
                                                                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                                                <span class="p2">
                                                                    <? echo $STD_DIST ?>&nbsp;<? echo $WORD_PER ?>&nbsp;
                                                                </span>
                                                                <select
                                                                    style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;"
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
                                                <input type="text" name="consumo_auto" size="9" maxlength="5"
                                                       value="<? echo $STD_CAR_FUEL_EFFICIENCY; ?>"
                                                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                <input type="text" name="fuel_price" size="9" maxlength="9" value="<? echo $STD_FUEL_PRICE; ?>"
                                                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                  value="<? echo $STD_MAINTENANCE_PER_YEAR; ?>"
                                                  style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                <br>
                                <table width="100%" border="0">
                                    <tr>
                                        <td width="470" class="p2">
                                            <? echo $REP_IMPROV_DESC ?>
                                        </td>
                                        <td style="vertical-align:middle;" valign="middle">
                                            <input type="text" name="reparacoes" size="6"
                                                  maxlength="9" value="<? echo $STD_REPAIRS; ?>"
                                                  style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                  maxlength="9" value="<? echo $STD_PARKING; ?>"
                                                  style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                            <input type="radio" name="portagens_ao_dia" value="sim" onclick="onclick_dia_sim_portag(); ">
                                            <span class="p2">
                                                <? echo $YES ?>
                                            </span>
                                            <input type="radio" name="portagens_ao_dia" value="nao" onclick="onclick_dia_nao_portag();"
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
                                                <input type="text" name="portagens" size="6" maxlength="9" value="<? echo $STD_TOLLS; ?>"
                                                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                                <span class="p2">
                                                    <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
                                                </span>
                                                <select id="portagens_select"
                                                        style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                                <input type="text" name="preco_portagens_por_dia" size="6" maxlength="9"
                                                       value="<? echo $STD_TOLLS_DAY; ?>"
                                                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                                <span class="p2">
                                                    <? echo $CURR_SYMBOL ?> <? echo $DURING ?>
                                                </span>
                                                <input type="text" name="dias_portagens_por_mes" size="9" maxlength="2"
                                                       value="<? echo $STD_TOLLS_DAYS_PER_MONTH; ?>"
                                                       style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                            <input type="text" name="multas" size="6" maxlength="9" value="<? echo $STD_FINES; ?>"
                                                   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                            <span class="p2">
                                                <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
                                            </span>
                                            <select id="multas_select"
                                                    style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
                                            <input type="text" name="lavagens" size="6" maxlength="9" value="<? echo $STD_WASHING; ?>"
                                                   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                            <span class="p2">
                                                <? echo $CURR_SYMBOL ?> <? echo $WORD_PER ?>
                                            </span>
                                            <select id="lavagens_select"
                                                    style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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

                    <!--************************** DADOS ADICIONAIS ***************************************************-->

                        <tr>
                            <td style="width: 100%; text-align: center; border-top: 1px solid black; border-bottom: 1px solid black; color: white; background-color: rgb(173, 166, 146);">
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
                                        <td width="60%" class="p2">
                                            <? echo $EXTRA_DATA_FAMILY_NBR ?>
                                        </td>
                                        <td align="right">
                                            <input type="text" name="pessoas_agregado" size="6" maxlength="2" value="<? echo $VAL; ?>3"
                                                   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
                                            <span class="p2">
                                                <? echo $WORD_PEOPLE ?>
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                                <br>
                                <table width="100%" border="0">
                                    <tr>
                                        <td width="60%" class="p2">
                                            <? echo $EXTRA_DATA_PRICE_PASS ?>
                                        </td>
                                        <td align="right">
                                            <input type="text" name="preco_passe" size="6" maxlength="9" value="<? echo $VAL; ?>40"
                                                         style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove; margin-right: 5%;">
                                            <span class="p2" style="margin-right: 18%;">
                                                <? echo $CURR_SYMBOL ?>
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- ************* divs para impresao *************
                ******************************************************-->

                <div id="result_div">
                </div>
                <br>

                <div id="chart_div" style="padding:0 0 0 10%;margin:0 auto;display:none">
                </div>

                <div id="graph_div" style="border-style:none; padding:0 0 0 20%;display:none">
                </div>


                <br>

<!--                <input type="checkbox" checked id="submitData">-->
<!--                <span class="p2">-->
<!--                    Submit data to statistical analysis-->
<!--                </span>-->

                <div id="submit_div">
                    <input type="submit"
                           style=" border-color: rgb(150, 150, 150); background-color: rgb(178, 178, 178); border-style: groove;"
                           onclick="calcula_custos_auto(); " value="<? echo $BUTTON_RUN; ?>">
                </div>

                <div id="text_div">
                </div>

                <div id="reload_div">
                    <input type="submit" value="<? echo $BUTTON_RERUN; ?>" onclick="reload();"
                           style=" border-color: rgb(150, 150, 150); background-color: rgb(178, 178, 178); border-style: groove;"/><br>
                </div>


                <!-- ************* ********* ************* -->

            </form>
        </div>
        <!--#######################################################################################-->
        <!--#######################################################################################-->
        <!--#######################################################################################-->

        <div id="br_btween_divs">
            <br>
        </div>

 


   </div>
    <br>
    <br>
</div>
</body>
</html>