<?php
    function sanitize_output($buffer) {
        require_once('min/lib/Minify/HTML.php');
        $buffer = Minify_HTML::minify($buffer);
        return $buffer;
    }
    ob_start('sanitize_output');
?>
<!DOCTYPE html>
<html>
<head>
    <title><? echo $WEB_PAGE_TITLE ?></title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <!--   <? include("./country files/country_list.php"); ?>
   	<? include("./php/country_selector.php"); ?>
    <? include('./php/favicon_selector.php'); ?> -->
</head>
<body>
	<div id="main_div">
        <?php include './layout/header.php'; ?>
        <div id="container">
			<!-- div3 = LEFT layout column-->
            <div id="div1">
                <?php include './layout/leftColumn.php'; ?>
            </div>
            <!--#####################################  CALCULATOR #####################################-->
			<!-- div2 = CENTRE layout column-->
            <div id="div2">
                <form class="roundCorner" id="main_form" enctype="application/x-www-form-urlencoded" action="javascript:void(0);" name="custo" method="get">
                        <h3 id="title-div">
                            <a href="http://<? echo strtolower($AC_DOMAIN);?>">
                            <span class="AC_url"><? echo $AC_DOMAIN ?></span></a>
                            <p><? echo $AC_SUB_HEADER ?></p>
                        </h3>
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
                    <div id="chart_div" style="padding:0 0 0 6%;margin:0 auto;">
                    </div>
					<br>
					<!-- second (bars) chart -->
                    <div id="graph_div" style="border-style:none; padding:0 0 0 16%;">
                    </div>
                    			<!-- bottom text with total costs -->

                    <div id="text_div">
                    </div>
                    <div id="reload_div">
                        <input type="submit" class="button" value="<? echo $BUTTON_RERUN; ?>" onclick="reload();"/>
                        <form><input type="button" class="button" value="<? echo $WORD_PRINT; ?>"

                            onclick="PrintElem('#result_div','#chart_div','#graph_div','#text_div', '<? echo $WEB_PAGE_TITLE; ?>');" /></form>

						<input id="generate_PDF" type="button" class="button" value="<? echo $WORD_DOWNLOAD_PDF; ?>" onclick="generatePDF('<?echo $MAIN_TITLE ?>', '<? echo $GLOBALS['country']?>')" />
                    </div>
					<div id="img1" style="display:none"></div>
					<div id="img2" style="display:none"></div>
					<!-- ************* ********* ************* -->
                </form>
            </div>
            <!--#######################################################################################-->
			<!-- div1 = RIGHT layout column-->
            <div id="div3">
                <?php include './layout/rightColumn.php'; ?>
            </div>
        </div>
        <div class="clear"></div>
	</div>
    <? include('./php/js_functions.php'); ?>
    <!--jquery-1.11.0min.js-->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" async></script>
    <script type="text/javascript" src="js/all.min.js" async></script>
    <!-- /*google analytics*/ -->
    <script>
        /*google analytics*/
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-3421546-6', 'autocosts.org');
        ga('send', 'pageview');
    </script>
</body>
</html>
