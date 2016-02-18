<div id="div3a" class="roundCornerSlight">

    <?php include($_SERVER['DOCUMENT_ROOT']."/php/logo_pict_selector.php");?>
    
    <?
    if ($is_logo)
        echo '<img alt="Logo" src="images/logos/' . get_logo_file_name($is_logo, $currency_logo) . '" id="ac_logo">';
    else
        echo '<div style="padding-top:14px;"></div>'; //in case no currency logo applies gives a break line
    ?>
    
    <div
        style="text-align:center;font-size:110%; <? if ($is_logo) { ?> padding-top: 20px; border-top: solid 2px rgb(180, 180, 180); <? } ?>">
    </div>
    
	<div id="div11" style="text-align:center;margin-right:auto;margin-left:auto;">
		<div class="roundCorner" style="border-radius: 10px; border-style: solid; border-width: 2px; margin-left: -9px; padding: 8px; width: 97%; border-color: rgb(180, 180, 180);">
            <img alt="Picture" 
                 style="width: 99%; border:1px solid #;-webkit-border-radius: 10px;-moz-border-radius: 10px; border-radius: 10px;"
                 src="<? echo get_picture_file_name($CURR_CODE);?>">          
		</div>
	</div>
	<div id="br1">
		<br>
	</div>
	
		
    <div id="div32" class="roundCorner" style="text-align: center; margin: auto;">
        <!-- Visitor Statistics block -->
        <div style="padding:7px 0 8px 0">
            <?php include($_SERVER['DOCUMENT_ROOT']."/php/counter.php");?>			
        </div>
        
        <!-- User Statistics block -->
        <b>
        <span class="p2">
            Users<br>
        </span>
        </b>
        <div style="padding-bottom:8px;">
        <table style="margin: 0 auto; font-size:80%;">
            <tr>
            <td style="text-align:right">
	        <span id="users_count"><?php include($_SERVER['DOCUMENT_ROOT']."/db_stats/dbService.php");
				$query = "SELECT DISTINCT uuid_client, country FROM users_insertions";
				$res = executeQueryInDB($query);
				$filled_by_cty = 0;
				while($row = mysqli_fetch_array($res))
				{
					if($row['country'] == $GLOBALS['country'])
					{
						$filled_by_cty++;
					}
				}
				echo $filled_by_cty;	
			?></span>
            </td>
            <td style="text-align:left">filled in for <?php echo $GLOBALS['country']?></td>
            </tr>
            <tr>
            <td style="text-align:right"><?php echo mysqli_num_rows($res);?></td>
            <td style="text-align:left">filled in totally</td>
			</tr>
		</table>
        </div>
        
        <!-- Contact block -->
        <b>
        <span class="p2">
            Contact<br>
        </span>
        </b>
        <div style="padding:4px 0 8px 0;width:100%;font-size:80%;">
        <a href="mailto:info@autocosts.info">info@autocosts.info</a> 
        </div>
    </div>
    
    <? if ($GLOBALS['country'] == "PT") { ?>
	<br>
        <div style="width:50%; margin: 0 auto">
        <table  style="text-align:center" align="center">
        <tr style="text-align:center" align="center">
        <td>
            <a href="http://play.google.com/store/apps/details?id=autocustos.com" imageanchor="1">
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
