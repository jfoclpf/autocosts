<div id="div3a" class="roundCornerSlight">

    <?php include "./php/logo_selector.php"; ?>

    <div
        style="text-align:center;font-size:110%; <? if ($is_logo) { ?> padding-top: 20px; border-top: solid 2px rgb(180, 180, 180); <? } ?>">
    </div>
    
	<div id="div11" style="text-align:center;margin-right:auto;margin-left:auto;">
		<a href="images/img2.jpg">
			<img class="roundCorner"
             style="border-style: solid; border-width: 2px; margin-left: -9px; padding: 10px; width: 97%; border-color: rgb(180, 180, 180);"
             src="images/img2.jpg">
		</a>
	</div>
	<div id="br1">
		<br>
	</div>
	
		
    <div id="div32" class="roundCorner" style="text-align: center; margin: auto;">
        <div style="padding:7px 0 8px 0">
            <?php include "./php/counter.php"; ?>			
        </div>
				<b>
        <span class="p2">
            User Statistics<br>
        </span>
        </b>
        <div style="padding:4px 0 8px 0;width:100%;font-size:80%;">
			&raquo;
	         <span id="users_count"><?php include "./php/dbService.php";
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
			?></span> users filled in for <?php echo $def_cty?> <br />
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
		<a href="http://github.com/jfoclpf/autocosts/wiki">
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
    
    <? if ($def_cty == "PT") { ?>
	<br>
        <div style="width:50%; margin: 0 auto">
        <table  style="text-align:center" align="center">
        <tr style="text-align:center" align="center">
        <td>
            <a href="http://build.phonegap.com/apps/359804/install" imageanchor="1">
                <img class="roundCorner" alt="mobile version" src="images/mobile1.png"
                     style="text-align: center; border-style: solid; border-width: 2px; padding: 5px; width: 70%; border-color: rgb(180, 180, 180);">
            </a>
        </td>
        <td>
            <a href="http://build.phonegap.com/apps/359804/install" imageanchor="1">
                <img class="roundCorner" alt="mobile version" src="images/mobile2.png"
                     style="text-align: center; border-style: solid; border-width: 2px; padding: 5px; width: 70%; border-color: rgb(180, 180, 180);">
            </a>
        </td>
        </tr>
        </table>
        </div>
    <? } ?>
    
</div>