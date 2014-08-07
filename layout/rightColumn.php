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
        <div style="padding:7px 0 8px 0">
            <?php include "counter.php"; ?>			
        </div>
				<b>
        <span class="p2">
            User Statistics<br>
        </span>
        </b>
        <div style="padding:4px 0 8px 0;width:100%;font-size:80%;">
			&raquo;
	         <?php include "dbService.php";
				$query = "SELECT DISTINCT uuid_client, country FROM users_insertions";
				$res = executeQueryInDB($query);
				$filled_by_cty = 0;
				while($row = mysqli_fetch_array($res))
				{
					if($row['country'] == $def_cty)
					{
						$filled_by_cty++;
					}
				}
				echo $filled_by_cty;	
			?> users filled in for <?php echo $def_cty?> <br />
			&raquo;
			<?php
				echo mysqli_num_rows($res);
			?> users filled in totally
			<br>
		</div>		
		<b>
        <span class="p2">
            Open and Free project<br>
        </span>
        </b>
		
		<div style="padding:4px 0 7px 0">
        <span class="p2">
		<a href="https://github.com/jfoclpf/autocosts">
            autocosts@GitHub<br>
		</a>	
        </span>
		
        <span class="p2">
		<a href="http://sourceforge.net/projects/custos-auto/">
            autocosts@sourceforge
		</a>
        </span>
		</div>
        		
    </div>
</div>

