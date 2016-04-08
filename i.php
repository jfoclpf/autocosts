<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width" />
    <? include("./country files/country_list.php"); ?>
    <? include("./php/country_selector.php"); ?>
    <? include('./php/favicon_selector.php'); ?>
    <title><? echo $WEB_PAGE_TITLE ?></title>
    <!--jquery-1.11.0min.js-->
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
<div id="main_div">
    <?php include './layout/header.php'; ?>
    <div id="container">
        <!-- div3 = LEFT layout column-->
        <div id="div3">
            <?php include './layout/leftColumn.php'; ?>
        </div>

        <!--#####################################  CALCULATOR #####################################-->

        <!-- div2 = CENTRE layout column-->
        <div id="div2">
            <form class="roundCorner"  id="main_form" enctype="application/x-www-form-urlencoded"
                  action="javascript:void(0);" name="custo" method="get">

                <div id="title-div">
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
                <div id="chart_div">
                </div>
                <br>
                <!-- second (bars) chart -->
                <div id="graph_div">
                </div>
                <!-- bottom text with total costs -->
                <div id="text_div">
                </div>

                <div id="reload_div">
                    <input type="submit" class="button" value="<? echo $BUTTON_RERUN; ?>" onclick="reload();"/>&nbsp;
                    <form><input type="button" class="button" value="<? echo $WORD_PRINT; ?>"
                                 onclick="PrintElem('#result_div','#chart_div','#graph_div','#text_div', '<? echo $WEB_PAGE_TITLE; ?>');" /></form>&nbsp;
                    <input id="generate_PDF" type="button" class="button" value="<? echo $WORD_DOWNLOAD_PDF; ?>" onclick="generatePDF('<?echo $MAIN_TITLE ?>', '<? echo $GLOBALS['country']?>')" />
                </div>
                <div id="img1" style="display:none"></div>
                <div id="img2" style="display:none"></div>

                <!-- ************* ********* ************* -->
            </form>
            <br>
        </div>
        <!--#######################################################################################-->
        <!-- div1 = RIGHT layout column-->
        <div id="div1" class="roundCornerSlight">
            <?php include './layout/rightColumn.php'; ?>
        </div>
    </div>
    <br>
    <br>
</div>

<!--jquery timer-->
<script>
    !function($){$.timer=function(func,time,autostart){return this.set=function(func,time,autostart){if(this.init=!0,"object"==typeof func){var paramList=["autostart","time"];for(var arg in paramList)void 0!=func[paramList[arg]]&&eval(paramList[arg]+" = func[paramList[arg]]");func=func.action}return"function"==typeof func&&(this.action=func),isNaN(time)||(this.intervalTime=time),autostart&&!this.isActive&&(this.isActive=!0,this.setTimer()),this},this.once=function(t){var i=this;return isNaN(t)&&(t=0),window.setTimeout(function(){i.action()},t),this},this.play=function(t){return this.isActive||(t?this.setTimer():this.setTimer(this.remaining),this.isActive=!0),this},this.pause=function(){return this.isActive&&(this.isActive=!1,this.remaining-=new Date-this.last,this.clearTimer()),this},this.stop=function(){return this.isActive=!1,this.remaining=this.intervalTime,this.clearTimer(),this},this.toggle=function(t){return this.isActive?this.pause():t?this.play(!0):this.play(),this},this.reset=function(){return this.isActive=!1,this.play(!0),this},this.clearTimer=function(){window.clearTimeout(this.timeoutObject)},this.setTimer=function(t){var i=this;"function"==typeof this.action&&(isNaN(t)&&(t=this.intervalTime),this.remaining=t,this.last=new Date,this.clearTimer(),this.timeoutObject=window.setTimeout(function(){i.go()},t))},this.go=function(){this.isActive&&(this.action(),this.setTimer())},this.init?new $.timer(func,time,autostart):(this.set(func,time,autostart),this)}}(jQuery);
</script>

<? include('./php/js_functions.php'); ?>
<script type="text/javascript" src="js/formFunctions.js" async></script>
<script>
    /* runs function initialize() every time the page is loaded */
    window.onload = initialize;
    function initialize() {
        openForm_part("form_part", 0, 1); /*shows just part 1 of input form*/
        input_object = document.getElementById('input_div'); /*tabela de entrada*/
        result_object = document.getElementById('result_div'); /*resultados*/
        frame_witdh = document.getElementById('result_div').offsetWidth;
        reload_object = document.getElementById('reload_div'); /*reload button*/
        chart_object = document.getElementById('chart_div'); /*pie chart*/
        graph_object = document.getElementById('graph_div'); /*columns chart*/
        text_object = document.getElementById('text_div'); /*msg text*/
        reload_object.style.display = 'none';
        tolls_daily(false);
        reload();
        document.getElementById("radio_fuel_euros").checked = true;
        $('#eurosDiv').css("display", "block");
        $('#kmDiv').css("display", "none");
        document.getElementById("radio_cred_nao").checked = true;
        $('#sim_credDiv').css("display", "none");

    }

    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid() {
        return (S4()+"-"+S4()+"-"+S4());
    }

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
