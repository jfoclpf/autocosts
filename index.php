<!--
//***********************************************
//                                             **
//              AUTOCOSTS.ORG                  **
//      the automobile costs simulator         **
//                                             **
//      made by João Pimentel Ferreira         **
//       under Creative Commons BY-SA          **
//                                             **
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

    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="js/jquery.timer.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="js/js.js"></script>
    <script type="text/javascript" src="js/businessLogic_js.php?country=<?php echo $def_cty ?>"></script>
    <script type="text/javascript" src="js/charts_js.php?country=<?php echo $def_cty ?>"></script>
	
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-3421546-6', 'autocosts.org');
	  ga('send', 'pageview');
	</script>
	
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
							<?php foreach ($avail_CT as $key => $value) { if ($key!="XX"){?>
								<option value="<?php echo $key ?>" <? if ($key == $def_cty) {
									echo "selected=\"selected\"";
								} ?>> <?php echo $value ?></option>
							<?php }} ?>
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

    <div id="container" style="border-collapse:collapse;border-color:rgb(136,136,136);border-width:0px;">
        <div id="div1" class="roundCornerSlight">
            <div id="div11" style="text-align:center;margin-right:auto;margin-left:auto;">
                <a href="images/img2.jpg">
                    <img class="roundCorner"
                        style="border-style: solid; border-width: 2px; margin-left: -12px; padding: 10px; width: 97%; border-color: rgb(180, 180, 180);"
                        src="images/img2.jpg">
                </a>
                <br>
                <br>
            </div>
            <div id="div12" class="roundCorner" style="text-align: center; margin: auto;">
                <div class="p4">
                    <? echo $HELP_PROJECT ?>
                </div>
                <br>

                <div class="table">
                    <div class="row">
                        <div class="cell" style="width: 30%;"></div>
                        <div class="cell">
						
							<!-- PAYPAL BUTTON -->
							<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
								<input type="hidden" name="cmd" value="_s-xclick">
								<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
								">
                                <input class="donate" value="DONATE" type="submit" border="0" name="submit">
                                <span class="p1" style="white-space: nowrap">paypal / visa / amex / master card</span>
                                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif">
							</form>

                        </div>
                        <div class="cell" style="width: 30%;"></div>
                    </div>
                </div>
            </div>

            <div id="br1">
                <br>
            </div>

                <!-- in case of PT shows mobile version -->
            <? if ($def_cty == "PT") { ?>
            <div id="div13">
                <a href="https://build.phonegap.com/apps/359804/install">
                    <div class="p4">
                        <? echo $AC_MOBILE ?>
                    </div>
                </a>
                <br>
                <div style="text-align:center;">
                    <a href="https://build.phonegap.com/apps/359804/install">
                        <img border="0" src="images/mobile1.jpg" style="width: 90%; padding-top: 10px;">
                    </a>
                </div>
            </div>

            <div id="br3">
                <br>
            </div>
            <? } ?>
        </div>

        <div id="br_btween_divs">
            <br>
        </div>

        <!--#######################################################################################-->
        <!--#####################################  CALCULATOR #####################################-->
        <!--#######################################################################################-->

        <div id="div2">
            <form class="roundCorner" style="display:block; max-width:620px;" id="main_form" enctype="application/x-www-form-urlencoded"
                action="javascript:void(0);" name="custo" method="get">

                    <div class="p4" style="text-align:center;">
                        <br>
                        <? echo $AC_HEADER ?>
                        <br>
                        <br>
                    </div>

                <div id="input_div">

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
												<input id="acquisitionMonth" type="text" name="auto_mes" size="10" maxlength="2" value="<? echo $STD_ACQ_MONTH; ?>"
													   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;"/>
												-
												<input id="acquisitionYear" type="text" name="auto_ano" size="10" maxlength="4" value="<? echo $STD_ACQ_YEAR; ?>"
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
												<input type="text" id="commercialValueAtAcquisition" name="auto_val_inicial" size="10" maxlength="12"
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
												<input type="text" id="commercialValueAtNow" name="auto_val_final" size="10" maxlength="12" value="<? echo $STD_PRICE_TODAY;?>"
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
											<input id="insuranceValue" type="text" size="9" maxlength="10" value="<? echo $STD_INSURANCE_SEM; ?>" name="seguro_val"
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
										<input type="radio" name="cred_auto" value="false" id="radio_cred_nao" onclick="onclick_credit('false'); " checked>
										<? echo $NO ?>
									</div>
									<div id="sim_credDiv">
										<table width="100%" border="0">
											<tr>
												<td style="width:90%" class="p2">
														<? echo $CREDIT_LOAN ?>
												</td>
												<td style="white-space:nowrap; width:10%;vertical-align:middle;" valign="middle" width="10%">
													<input id="borrowedAmount" type="text" name="cred_auto_montante" size="9" maxlength="12" value="<? echo $STD_LOAN; ?>"
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
													<input id="numberInstallments" type="text" name="cred_auto_period" size="9" maxlength="3" value="<? echo $STD_PERIOD_OF_CREDIT; ?>"
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
													<input id="amountInstallment" type="text" name="cred_auto_val_mes" size="9" maxlength="9" value="<? echo $STD_MONTHLY_PAY; ?>"
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
												<input id="vehicleExciseTax" type="text" name="IUC" size="6" maxlength="9" value="<? echo $STD_ROAD_TAX; ?>"
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
						<input class="button" type="submit" onclick="openForm_part('form_part', 2, true)" value="&raquo;" />
						
					</div> <!-- end of form_part1-->

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
												<input type="radio" name="calc_combustiveis" id="radio_fuel_km" value="km" onclick="fuelCalculationMethodChange('distance'); ">
												<span class="p2">
													<? echo $STD_DIST ?>&nbsp;
												</span>
											</td>
											<td width="18%"><input type="radio" name="calc_combustiveis" id="radio_fuel_euros" value="euros" onclick="fuelCalculationMethodChange('currency'); ">
											   <span class="p2">
												   <? echo $CURR_NAME_PLURAL ?>
											   </span>
											</td>

											<td align="right" width="60%">
												<div id="eurosDiv">
													<input type="text" size="5" maxlength="9" id="fuel_currency_value" value="<? echo $STD_FUEL_PAID_PER_MONTH; ?>"
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
																			name="dias_por_semana" size="5"
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
																			id="car_to_work_distance_home_work"
																			name="km_entre_casa_trabalho"
																			size="5" maxlength="4"
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
																			id="car_to_work_distance_weekend"
																			size="5" maxlength="4"
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
																		   id="no_car_to_work_distance"
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
													<input type="text" id="fuel_efficiency" name="consumo_auto" size="5" maxlength="5"
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
													<input type="text" id="fuel_price" name="fuel_price" size="5" maxlength="9" value="<? echo $STD_FUEL_PRICE; ?>"
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
													  id="maintenance"
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
													   id="repairs"
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
													  id="parking"
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
													<input type="text" id="no_daily_tolls_value" name="portagens" size="6" maxlength="9" value="<? echo $STD_TOLLS; ?>"
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
													<input type="text" id="daily_expense_tolls" name="preco_portagens_por_dia" size="6" maxlength="9"
														   value="<? echo $STD_TOLLS_DAY; ?>"
														   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
													<span class="p2">
														<? echo $CURR_SYMBOL ?> <? echo $DURING ?>
													</span>
													<input type="text" id="number_days_tolls" name="dias_portagens_por_mes" size="9" maxlength="2"
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
												<input type="text" id="tickets_value" name="multas" size="6" maxlength="9" value="<? echo $STD_FINES; ?>"
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
												<input type="text" id="washing_value" name="lavagens" size="6" maxlength="9" value="<? echo $STD_WASHING; ?>"
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
							
						</table>
						
						<br>
						<input class="button" type="submit" onclick="openForm_part('form_part', 1, true)" value="&laquo;" />
						<p2>&nbsp;&nbsp;2/3&nbsp;&nbsp;</p2>
						<input class="button" type="submit" onclick="openForm_part('form_part', 3, true)" value="&raquo;" />
						
					</div> <!-- end of form_part2-->

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
												<input type="text" id="household_number_people" name="pessoas_agregado" size="6" maxlength="2" value="<? echo $STD_NR_PPL_FAMILY ?>"
													   style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
												<input type="text" id="public_transportation_month_expense" name="preco_passe" size="6" maxlength="9" value="<? echo $STD_PASS_PRICE ?>"
															 style="border: 2%; border-color: rgb(180, 180, 180); border-style: groove;">
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
						<input class="button" type="submit" onclick="openForm_part('form_part', 2, true)" value="&laquo;" />
						
						<input class="button" type="submit"
							   	   onclick="if(calcula_custos_auto() <?if ($def_cty=="XX"){echo "&& false";}?> ){submit_data('<?php echo $def_cty ?>');} " value="<? echo $BUTTON_RUN; ?>" />
					
					</div> <!-- end of form_part3-->
					                    
                </div>

                <!-- ************* divs para impresao *************
                ******************************************************-->

                <div id="result_div">
                </div>
                <br>

                <div id="chart_div" style="padding:0 0 0 10%;margin:0 auto;">
                </div>

                <div id="graph_div" style="border-style:none; padding:0 0 0 20%;">
                </div>

                <br>

                <div id="text_div">
                </div>

                <div id="reload_div">
                    <input type="submit" class="button" value="<? echo $BUTTON_RERUN; ?>" onclick="reload();"/>&nbsp;
					<form><input type="button" class="button" value="Print" 
						onclick="PrintElem('#result_div','#chart_div','#graph_div','#text_div', '<? echo $WEB_PAGE_TITLE; ?>');" /></form>
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

        <div id="div3" style="text-align:center">
        
		
			<div id="div3a" class="roundCornerSlight">
				
				
				<?  $is_logo=false;
					if ($def_cty == "PT"){ $is_logo=true; ?>
						<img src="images/autocustos_euro.png" id="ac_logo">
						<link rel="shortcut icon" href="/images/favicons/favicon_eur.ico" />
						<br>
				<? }elseif ( $def_cty == "RU" )  { $is_logo=true;?>
						<img src="images/autocosts_ruble.png" id="ac_logo">
						<link rel="shortcut icon" href="/images/favicons/favicon_rub.ico" />
						<br>						
				<? }elseif ( $CURR_SYMBOL == "&euro;" )  { $is_logo=true;?>
						<img src="images/autocosts_euro.png" id="ac_logo">
						<link rel="shortcut icon" href="/images/favicons/favicon_eur.ico" />
						<br>			
				<? }elseif ( strpos($CURR_SYMBOL, '&#36;') !== FALSE ) { $is_logo=true;?>
						<img src="images/autocosts_dollar.png" id="ac_logo">
						<link rel="shortcut icon" href="/images/favicons/favicon_usd.ico" />
						<br>			
				<? }elseif (strpos($CURR_SYMBOL, '&pound;') !== FALSE){ $is_logo=true;?>
						<img src="images/autocosts_pound.png" id="ac_logo">
						<link rel="shortcut icon" href="/images/favicons/favicon_gbp.ico" />
						<br>			
				<?} ?>
					
					<div style="text-align:center;font-size:110%; <? if ($is_logo){ ?> padding-top: 20px; border-top: solid 2px rgb(180, 180, 180); <?}?>">
						<div id="facebook_btn" style="padding:0;margin:0">
							<div class="fb-like-box" data-href="https://www.facebook.com/autocustos" data-width="232" data-height="400"
								 data-show-faces="true" data-header="false" data-stream="false" data-show-border="false">
							 </div>
							<hr>
						</div>
					</div>
				
				<? if ($def_cty == "PT") { ?>
					<a href="docs/autocustos.pdf">
						<div class="p4">IMPRIMA E DISTRIBUA</div>
					</a>
					<br>
					<div>
						<a href="docs/autocustos.pdf" imageanchor="1">
							<img alt="imprima e distribua" src="images/flyer.jpg" style="text-align: center; width: 80%; padding: 0px; margin: 0px; border-width: 2px; border-style: solid;  border-color: rgb(180, 180, 180);">
						</a>
					</div>
					<br>
				<? } ?>
				
				<div id="div32" class="roundCorner" style="text-align: center; margin: auto;">
					<br>
					<b>
						<span class="p4">
							Please contribute!
						</span>
					</b>
					<br>
					<a href="./country files/UK.zip">
						<span class="p2">
							Translate and adapt this simulator to your country!
						</span>
					</a>
					<br>
					<br>
					<a href="https://sourceforge.net/projects/custos-auto/" target="_blank">
						<span style="color:rgb(0,0,0)" class="p4">
							Download source code
						</span>
					</a>
					<br>
					<br>
					<a href="mailto:joao.pimentel.ferreira@gmail.com">
						<span class="p4">
							Suggestions and errors!
						</span>
					</a>
					<br>
					<br>
					<div>
                        <?php include "counter.php"; ?>
					</div>
				</div>
			</div>
		</div>
    </div>
    <br>
    <br>
</div>

<script>
    var TimeCounter = new (function () {

        var incrementTime = 500;
        var currentTime = 0;

        $(function () {
            TimeCounter.Timer = $.timer(updateTimer, incrementTime, true);
        });

        function updateTimer() {
            currentTime += incrementTime;
        }

        this.resetStopwatch = function () {
            currentTime = 0;
        };

        this.getCurrentTimeInSeconds = function () {
            return currentTime / 1000;
        };
    });
    uuid = guid();
</script>

</body>
</html>