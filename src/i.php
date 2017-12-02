<?php
/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
/*$startTime = microtime(true);*/
include_once("./php/functions.php");
include_once("./countries/list.php");
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
        <?php include_once './layout/header.html'; ?>
        <div id="container">
            <div id="description">
                <?php echo $INITIAL_TEXT; if(isset($DISCLAIMER)){echo " ".$DISCLAIMER;} ?>
            </div>
            <div id="container_table">
                <!-- div3 = LEFT layout column-->
                <div id="div3_td">
                    <div id="div3">
                        <div id="div3a" class="roundCornerSlight">
                            <div id="div32" class="roundCorner">
                                <!-- Contact block -->
                                <div id="contact_div">
                                    <!--hides email from bot spamers-->
                                    <span class="codedirection">.stso<!-- >@. -->cotua<!-- >@. -->@<!-- >@. -->ofni</span>info
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- div2 = CENTRE layout column-->
                <div id="div2_td">
                    <?php include_once './layout/centralColumn.html'; ?>
                </div>
                <!-- div1 = RIGHT layout column-->
                <div id="div1_td">
                    <div id="div1" class="roundCornerSlight">
                        <div id="div13">        
                        </div>
                        <div id="br3">
                          <br>
                        </div>
                    </div>
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
        /*Define GLOBAL Javascript variables*/
        var COUNTRY = "<?php echo $GLOBALS["country"]; ?>";
        /*Language code according to ISO_639-1 codes*/
        var LANGUAGE = "<?php echo $lang_CT[$GLOBALS["country"]]; ?>";
        /*List of domains in a Javascript Object*/
        var DOMAIN_LIST = (<?php echo json_encode($domain_CT); ?>);
        
        var CDN_URL = "<?php echo $CDN_URL ?>";
        var PAGE_URL = "<?php echo $PageURL ?>";
        var INITIAL_TEX = "<?php echo meta_description($INITIAL_TEXT) ?>";
    </script>
    <script src="<?php echo $CDN_URL.'js/languages/'.$GLOBALS["country"].'.js' ?>"></script>
    <script src="<?php echo $CDN_URL ?>js/Globals.js"></script>
    <script src="<?php echo $CDN_URL ?>js/validateForm.js"></script>    
    <script src="<?php echo $CDN_URL ?>js/documentFunctions.js"></script>
    <script src="<?php echo $CDN_URL ?>js/formFunctions.js"></script>
    <script src="<?php echo $CDN_URL ?>js/initialize.js" async></script>
    <!-- Popup alert window -->
    <script src="<?php echo $CDN_URL ?>js/jAlert/jAlert.js" async></script>
    <!-- Google Analytics -->
    <script type="text/javascript" src="<?php echo $CDN_URL ?>google/analytics.js" async></script>
    <?php /*echo "Elapsed time is: ". (microtime(true) - $startTime)*1000 ." ms";*/?>
</body>
</html>
