<div id="div3a" class="roundCornerSlight">


    <?  $is_logo = false;
    if ($def_cty == "PT") {
        $is_logo = true; ?>
        <img src="images/autocustos_euro.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_eur.ico?v=2"/>
        <br>
    <? } elseif ($def_cty == "RU") {
        $is_logo = true; ?>
        <img src="images/autocosts_ruble.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_rub.ico?v=2"/>
        <br>
    <? } elseif ($CURR_SYMBOL == "&euro;") {
        $is_logo = true; ?>
        <img src="images/autocosts_euro.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_eur.ico?v=2"/>
        <br>
    <? } elseif (strpos($CURR_SYMBOL, '&#36;') !== FALSE) {
        $is_logo = true; ?>
        <img src="images/autocosts_dollar.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_usd.ico?v=2"/>
        <br>
    <? } elseif (strpos($CURR_SYMBOL, '&pound;') !== FALSE) {
        $is_logo = true; ?>
        <img src="images/autocosts_pound.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_gbp.ico?v=2"/>
        <br>
    <? } ?>

    <div
        style="text-align:center;font-size:110%; <? if ($is_logo) { ?> padding-top: 20px; border-top: solid 2px rgb(180, 180, 180); <? } ?>">
        <div id="facebook_btn" style="padding:0;margin:0">
            <div class="fb-like-box" data-href="https://www.facebook.com/autocosts" data-width="232" data-height="400"
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
                <img alt="imprima e distribua" src="images/flyer.jpg"
                     style="text-align: center; width: 80%; padding: 0px; margin: 0px; border-width: 2px; border-style: solid;  border-color: rgb(180, 180, 180);">
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
