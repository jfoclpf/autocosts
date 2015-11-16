﻿<!--
//***********************************************
//                                             **
//              AUTOCOSTS.INFO                 **
//      the automobile costs calculator        **
//                                             **
//***********************************************
-->

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width" />
    
	<? include("./country files/country_list.php");?>
	<? include("./php/country_selector.php");?>
	
    <title><? echo $WEB_PAGE_TITLE ?></title>
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/color.css">
    <link rel="stylesheet" type="text/css" href="css/flags24.css">
	
    <?include('./php/favicon_selector.php');?>
	
	<!-- Google API -->

    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="js/jquery.timer.js"></script> 	
    <script type="text/javascript" src="//canvg.googlecode.com/svn/trunk/rgbcolor.js"></script> 
    <script type="text/javascript" src="//canvg.googlecode.com/svn/trunk/canvg.js"></script>	
    <script type="text/javascript" src="js/pdf/html2canvas.js"></script>  	
    <script type="text/javascript" src="js/pdf/jspdf.js"></script>
    <script type="text/javascript" src="js/pdf/jspdf.plugin.addimage.js"></script>
    <script type="text/javascript" src="js/pdf/pdfmake.js"></script>
    <script type="text/javascript" src="js/pdf/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="php/js_functions.php?country=<?php echo $GLOBALS['country'] ?>"></script>
    <script type="text/javascript" src="js/conversionFunctions.js"></script>   	
    <script type="text/javascript" src="js/coreFunctions.js"></script>
    <script type="text/javascript" src="db_stats/statsFunctions.js"></script>   	
    <script type="text/javascript" src="js/get_data.js"></script>
    <script type="text/javascript" src="php/print_data.php?country=<?php echo $GLOBALS['country'] ?>"></script>
    <script type="text/javascript" src="php/charts_js.php?country=<?php echo $GLOBALS['country'] ?>"></script>
	
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

	<div id="main_div" style=" top: 0; background: none repeat scroll 0px 0px transparent; display: block; font-family: Verdana; overflow: auto;">

        <?php include './layout/header.php'; ?>

        <div id="container" style="border-collapse:collapse; border-color:rgb(136,136,136); border-width:0px;">

			<!-- div3 = LEFT layout column-->
            <div id="div3" style="text-align:center">
                <?php include './layout/leftColumn.php'; ?>
            </div>

            <!--#######################################################################################-->
            <!--#####################################  CALCULATOR #####################################-->
            <!--#######################################################################################-->

			<!-- div2 = CENTRE layout column-->
            <div id="div2">
                <form class="roundCorner" style="display:block; max-width:620px;" id="main_form" enctype="application/x-www-form-urlencoded"
                    action="javascript:void(0);" name="custo" method="get">

                        <div class="p4" style="text-align:center;"  id="title-div">
                            <br>
                            <big>
                            <a href="http://<? echo strtolower($AC_DOMAIN);?>">
                            <span class="AC_url"><? echo $AC_DOMAIN ?></span></a>
                            </big>
                            <br>
                            <b><? echo $AC_SUB_HEADER ?></b>							
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
                        <input type="submit" class="button" value="<? echo $BUTTON_RERUN; ?>" onclick="reload();"/>&nbsp;
                        <form><input type="button" class="button" value="<? echo $WORD_PRINT; ?>"
                            onclick="PrintElem('#result_div','#chart_div','#graph_div','#text_div', '<? echo $WEB_PAGE_TITLE; ?>');" /></form>&nbsp;
						<input type="button" class="button" value="<? echo $WORD_DOWNLOAD_PDF; ?>" onclick="generatePDF()" />
                    </div>
					<div id="img1" style="display:none"></div>
					<div id="img2" style="display:none"></div>
					
					<!-- ************* ********* ************* -->
                </form>
                <br>
            </div>
            <!--#######################################################################################-->
            <!--#######################################################################################-->
            <!--#######################################################################################-->

			<!-- div1 = RIGHT layout column-->            
			<div id="div1" class="roundCornerSlight">
                <?php include './layout/rightColumn.php'; ?>
            </div>
        </div>
    <br>
    <br>
	
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
	
	</div>
</body>
</html>
