<div id="div3a" class="roundCornerSlight">


    <?  $is_logo = false;
    if ($def_cty == "PT") {
        $is_logo = true; ?>
        <img src="images/autocustos_euro.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_eur.ico?v=2" type="image/x-icon"/>
        <br>
    <? } elseif ($def_cty == "RU") {
        $is_logo = true; ?>
        <img src="images/autocosts_ruble.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_rub.ico?v=2" type="image/x-icon"/>
        <br>
    <? } elseif ($CURR_SYMBOL == "&euro;") {
        $is_logo = true; ?>
        <img src="images/autocosts_euro.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_eur.ico?v=2" type="image/x-icon"/>
        <br>
    <? } elseif (strpos($CURR_SYMBOL, '&#36;') !== FALSE) {
        $is_logo = true; ?>
        <img src="images/autocosts_dollar.png" id="ac_logo">
        <link rel="shortcut icon" href="/images/favicons/favicon_usd.ico?v=2" type="image/x-icon"/>
        <br>
    <? } elseif (strpos($CURR_SYMBOL, '&pound;') !== FALSE) {
        $is_logo = true; ?>
        <img src="images/autocosts_pound.png" id="ac_logo">
		<link href="data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAvr6+AD09PQDQ0NAArq6uAE9PTwDi4uIAg4ODAIyMjAACAgIA9PT0AJ6engD9/f0AFBQUALCwsADk5OQA9vb2AMvLywBsbGwA////ABYWFgAfHx8A3d3dAPj4+ACioqIA1tbWAHd3dwCAgIAA39/fACoqKgC9vb0AXl5eAAgICACbm5sA2NjYAE5OTgAjIyMAi4uLAOrq6gAsLCwAAQEBAL+/vwBpaWkAyMjIANHR0QBQUFAAAwMDAMrKygD+/v4AFRUVAIaGhgDMzMwAqqqqAN7e3gAyMjIAZmZmAMXFxQD5+fkAmpqaANfX1wAZGRkAgYGBACIiIgC1tbUAVlZWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExMTExMTORMTExMcMBMTExMTExMTGxgeExM0JQAwExMTExMTMCMBPQgHBhI2FxETExMTEzsANhIAKCgqAgAAJhMTExMTCSgAACgAACgnChMTExMTEwsbABQbGg0kExMTEwwMMBMTExUfMBMTExMTExM1IgMvMBM3MRMTExMTExMZMyspExMMLQAOBAQTExMTExMTExMwHEAuIEBAEBMTExMTGSwrARMTPgUTExMTExMTExMTExMTEzoAMBMTExMTExMTExMTExMMABYTExMTExMTExMTExMTEzIuIT8aDxMTExMTExMTExMTOB08NhMTExMTExMTExMTExMTExMTEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" rel="icon" type="image/x-icon" />
        <br>
    <? } ?>

    <div
        style="text-align:center;font-size:110%; <? if ($is_logo) { ?> padding-top: 20px; border-top: solid 2px rgb(180, 180, 180); <? } ?>">
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

