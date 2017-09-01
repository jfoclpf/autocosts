<?php
include_once("./php/functions.php");
include_once("./countries/_list.php");
include_once("./countries/_url_selector.php");
ob_start("sanitize_output");
?><!DOCTYPE html>

<html lang="<?php echo HTML_tag_lang($language, $GLOBALS['country']); ?>">
<head>
    <meta charset="UTF-8">
    <!--gets the first sentence of variable $INITIAL_TEXT-->
	<meta name="description" content="<?php echo meta_description($INITIAL_TEXT); ?>">
    <meta name="keywords" content="<?php echo get_keywords($WEB_PAGE_TITLE, $FIXED_COSTS, $RUNNING_COSTS); ?>">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Autocosts Org">
 
    <meta name="robots" content="<?php echo (!isTest()?'index, follow':'noindex, nofollow')?>" />

    <title><?php echo adapt_title($WEB_PAGE_TITLE); ?></title>

    <?php include_once('./php/favicon_selector.php'); ?>
    <?php include_once('./php/logo_pict_selector.php'); ?>
    <!--structured data for search engines -->
    <?php include_once('./google/structured_data.php'); ?>

    <?php include_once('./php/css_embed.php'); ?>
    <!--Embed all CSS files within CSS folder-->
    <?php echo (new CSS_Embed()) ?>
</head>

<body>
    <div id="main_div">
        <?php include_once './layout/header.php'; ?>
        <div id="container">
            <div id="description">
                <?php echo $INITIAL_TEXT; if(isset($DISCLAIMER)){echo " ".$DISCLAIMER;} ?>
            </div>
            <div id="container_table">
                <!-- div3 = LEFT layout column-->
                <div id="div3_td">
                    <?php include_once './layout/leftColumn.php'; ?>
                </div>
                <!-- div2 = CENTRE layout column-->
                <div id="div2_td">
                    <?php include_once './layout/centralColumn.php'; ?>
                </div>
                <!-- div1 = RIGHT layout column-->
                <div id="div1_td">
                    <?php include_once './layout/rightColumn.php'; ?>
                </div>
            </div>
        </div>
        <br>
    </div>
    <!--jQuery-->
    <script src="js/jquery/jquery.min.js"></script>
    <script src="js/jquery/js_timer.js"></script>   
    <!--Autocosts JavaScript files-->
    <script src="GlobalSwitches.js"></script>
    <script src="js/Globals.js.php?country=<?php echo $GLOBALS['country'] ?>"></script>
    <script src="js/validateForm.js.php?country=<?php echo $GLOBALS['country'] ?>"></script>
    <script src="js/documentFunctions.js"></script>
    <script src="js/formFunctions.js"></script>
    <script src="js/initialize.js"></script>
    <!--Popup alert window-->
    <script src="js/jAlert/jAlert.js"></script>
    <!--Google Analytics-->
    <script type="text/javascript" src="google/analytics.js"></script>    
</body>
</html>
