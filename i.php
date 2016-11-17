<!DOCTYPE html>
<?php include("./countries/country_list.php"); ?>
<?php include("./php/country_selector.php"); ?>

<html lang="<?php echo $language.'-'.$GLOBALS['country']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width" />

    <title><?php echo $WEB_PAGE_TITLE; ?></title>
    
    <?php include('./php/favicon_selector.php'); ?>
    
    <?php include('./php/css_embed.php'); ?>
    <!--Embed all CSS files within CSS folder-->
    <?=(new CSS_Embed()) ?>        
  
</head>

<body>
    <div id="main_div">
        <?php include './layout/header.php'; ?>
        <div id="container">
            <div class="p3" id="description">
                <?php echo $INITIAL_TEXT; if(isset($DISCLAIMER)){echo " ".$DISCLAIMER;} ?>
            </div>
            <div id="container_table">
                <!-- div3 = LEFT layout column-->
                <div id="div3_td">
                    <div id="div3">
                        <?php include './layout/leftColumn.php'; ?>
                    </div>
                </div>
                <!--#####################################  CALCULATOR #####################################-->

                <!-- div2 = CENTRE layout column-->
                <div id="div2_td">
                    <div id="div2">
                        <form class="roundCorner" id="main_form" enctype="application/x-www-form-urlencoded"
                              action="javascript:void(0);" name="custo">

                            <div id="title-div">
                                <br>
                                    <a class="AC_url" href="http://<?php echo strtolower($AC_DOMAIN);?>">
                                        <?php echo $AC_DOMAIN; ?></a>
                                <br>
                                <b><?php echo $AC_SUB_HEADER; ?></b>
                                <br>
                                <br>
                            </div>

                            <div id="input_div">
                                <?php include './layout/formPartOne.php'; ?>
                                <?php include './layout/formPartTwo.php'; ?>
                                <?php include './layout/formPartThree.php'; ?>
                            </div>

                            <!-- ************* PRINTING divs ***********************
                            ******************************************************-->

                            <!-- results tables -->
                            <div id="result_div">
                            </div>
                            <!-- first top (pie) chart -->
                            <div id="pie_chart_div">
                            </div>
                            <br>
                            <!-- second (bars) chart -->
                            <div id="bar_chart_div">
                            </div>
                            <!-- bottom text with total costs -->
                            <div id="text_div">
                            </div>

                            <div id="reload_div">
                                <input type="submit" class="button" value="<?php echo $BUTTON_RERUN; ?>" onclick="reload(false);"/>&nbsp;
                                <input type="button" class="button" value="<?php echo $WORD_PRINT; ?>"
                                             onclick="PrintElem('#result_div','#pie_chart_div','#bar_chart_div','#text_div', '<?php echo $WEB_PAGE_TITLE; ?>');" />&nbsp;
                                <input id="generate_PDF" type="button" class="button" value="<?php echo $WORD_DOWNLOAD_PDF; ?>" onclick="generatePDF('<?echo $MAIN_TITLE ?>', '<?php echo $GLOBALS['country']?>')" />
                            </div>
                            <div id="img1" style="display:none"></div>
                            <div id="img2" style="display:none"></div>
                            <!-- ************* ********* ************* -->
                        </form>
                        <br>
                    </div>
                </div>
                <!--#######################################################################################-->
                <!-- div1 = RIGHT layout column-->
                <div id="div1_td">
                    <div id="div1" class="roundCornerSlight">
                        <?php include './layout/rightColumn.php'; ?>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
    <!--jquery.js-->
    <script src="js/jquery/js_jquery.js"></script>
    <!--jquery timer-->
    <script src="js/jquery/js_timer.js"></script>

    <!--define global JS variables-->
    <script>
        var Country = '<?php echo $GLOBALS["country"]; ?>';
        var Language = '<?php echo $LANGUAGE_CODE; ?>'; <!-- Language code according to ISO_639-1 codes -->
        var input_object, result_object, frame_witdh, reload_object, pie_chart_object, bar_chart_object, text_object;
        var ResultIsShowing, DescriptionHTML, CalculatedData;
    </script>

    <script><?php include('js/validateForm.js.php'); ?></script>
    <script src="js/documentFunctions.js"></script>
    <script src="js/initialize.js"></script>
    <?php include_once("google/analyticstracking.php"); ?>
</body>

</html>
