﻿<!--
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
    <meta name="viewport" content="width=device-width" />
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
    <script type="text/javascript" src="js/js_functions.php?country=<?php echo $def_cty ?>"></script>
    <script type="text/javascript" src="js/autocostsCore.js"></script>   
	<script type="text/javascript" src="js/get_data.js"></script>
    <script type="text/javascript" src="js/businessLogic.js"></script>	
	<script type="text/javascript" src="js/print_data.php?country=<?php echo $def_cty ?>"></script>
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

        <?php include './layout/header.php'; ?>

        <div id="container" style="border-collapse:collapse; border-color:rgb(136,136,136); border-width:0px;">

            <div id="div1" class="roundCornerSlight">
                <?php include './layout/leftColumn.php'; ?>
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
                        <?php include './layout/formPartOne.php'; ?>
                        <?php include './layout/formPartTwo.php'; ?>
                        <?php include './layout/formPartThree.php'; ?>
                    </div>

                    <!-- ************* divs para impresao *************
                    ******************************************************-->

                    <div id="result_div">
                    </div>
                    <br>

                    <div id="chart_div" style="padding:0 0 0 10%;margin:0 auto;">
                    </div>
					<br>
                    <div id="graph_div" style="border-style:none; padding:0 0 0 20%;">
                    </div>

                    <br>

                    <div id="text_div">
                    </div>

                    <div id="reload_div">
                        <input type="submit" class="button" value="<? echo $BUTTON_RERUN; ?>" onclick="reload();"/>&nbsp;
                        <form><input type="button" class="button" value="<? echo $WORD_PRINT; ?>"
                            onclick="PrintElem('#result_div','#chart_div','#graph_div','#text_div', '<? echo $WEB_PAGE_TITLE; ?>');" /></form>
                    </div>
                    <!-- ************* ********* ************* -->
                </form>
            </div>
            <!--#######################################################################################-->
            <!--#######################################################################################-->
            <!--#######################################################################################-->

            <div id="div3" style="text-align:center">
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

</body>
</html>