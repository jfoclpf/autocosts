<?php
/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
//$startTime = microtime(true);
include_once("./php/functions.php");
include_once("./countries/_list.php");
include_once("./php/url_selector.php");
include_once("./php/minifier.php");

/*sanitize_output is a function in file php/functions.php that minifies the echoed php*/
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="<?php echo $CDN_URL ?>js/jquery/js_timer.js"></script>   
    <!--Autocosts JavaScript files-->
    <script>
        <?php include('./js/Globals.js.php'); ?>
    </script>
    <script src="js/validateForm.js.php?country=<?php echo $GLOBALS['country'] ?>" async></script>    
    <script src="<?php echo $CDN_URL ?>js/documentFunctions.js" async></script>
    <script src="<?php echo $CDN_URL ?>js/formFunctions.js" async></script>
    <script src="<?php echo $CDN_URL ?>js/initialize.js" async></script>
    <!-- Popup alert window -->
    <script src="<?php echo $CDN_URL ?>js/jAlert/jAlert.js" async></script>
    <!-- Google Analytics -->
    <script type="text/javascript" src="<?php echo $CDN_URL ?>google/analytics.js" async></script>
    <?php /*echo "Elapsed time is: ". (microtime(true) - $startTime)*1000 ." ms";*/?>
</body>
</html>
