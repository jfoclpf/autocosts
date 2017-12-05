<?php
/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
/*$startTime = microtime(true);*/
include_once("./php/functions.php");
loadsCountries("./countries/list.json");
include_once("./php/url_selector.php");
loadsLanguageVars("./countries/".$GLOBALS['country'].".json");
include_once("./php/minifier.php");

/*sanitize_output is a function in file php/functions.php that minifies the echoed php*/
ob_start("sanitize_output");

?><!DOCTYPE html>
<html lang="<?php echo HTML_tag_lang($language, $GLOBALS['country']); ?>">
<head>
    <meta charset="UTF-8">
    <!--gets the first sentence of variable $INITIAL_TEXT-->
    <meta name="description" content="<?php echo meta_description($GLOBALS["WORDS"]["initial_text"]); ?>">
    <meta name="keywords" content="<?php echo get_keywords($GLOBALS["WORDS"]["web_page_title"], $GLOBALS["WORDS"]["fixed_costs"], $GLOBALS["WORDS"]["running_costs"]); ?>">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Autocosts Org">

    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self' cdnjs.cloudflare.com *.google.com *.gstatic.com *.autocosts.info 'unsafe-inline' 'unsafe-eval'; 
        style-src 'self' cdnjs.cloudflare.com *.google.com *.gstatic.com *.autocosts.info 'unsafe-inline' 'unsafe-eval'; 
        img-src 'self' *.autocosts.info;
    ">
    
    <meta name="robots" content="<?php echo (!isTest()?'index, follow':'noindex, nofollow')?>" />

    <title><?php echo adapt_title($GLOBALS["WORDS"]["web_page_title"]); ?></title>

    <?php include_once('./php/favicon_selector.php'); ?>
    <?php include_once('./php/logo_pict_selector.php'); ?>
    <!--structured data for search engines -->
    <?php include_once('./google/structured_data.php'); ?>

    <?php include_once('./php/css_embed.php'); ?>
    <!--Embed all CSS files within CSS folder-->
    <?php echo (new CSS_Embed()) ?>
</head>

<body>
    <!--this HTML is loaded externally-->
    <?php include "./layout/main.html"; ?>    
    <!--jQuery-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="<?php echo $GLOBALS["CDN_URL"] ?>js/jquery/js_timer.js"></script>    
    <script src="Globals.js.php?country=<?php echo $GLOBALS['country']?>&url=<?php echo rawurlencode($GLOBALS['PageURL'])?>">
    </script>    
    <script src="<?php echo $GLOBALS["CDN_URL"] ?>js/initialize.js"></script>    
    <?php /*echo "Elapsed time is: ". (microtime(true) - $startTime)*1000 ." ms";*/?>
</body>
</html>
