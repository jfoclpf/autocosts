<div id="div3a" class="roundCornerSlight">
    <?php include($_SERVER['DOCUMENT_ROOT'] . "/php/logo_pict_selector.php"); ?>
    <?
    if ($is_logo)
        echo '<img alt="Logo" src="images/logos/' . get_logo_file_name($is_logo, $currency_logo) . '" id="ac_logo">';
    else
        echo '<div style="padding-top:14px;"></div>'; //in case no currency logo applies gives a break line
    ?>
    <?php if ($is_logo) { ?><div class="is_logo"></div><?php } ?>

    <div class="roundCorner">
        <img alt="Picture" src="<?php echo get_picture_file_name($CURR_CODE); ?>">
    </div>

    <div id="div32" class="roundCorner">
        <!-- Visitor Statistics block -->
        <b>
        <span class="p2">
            <?php echo isset($VISITORS) ? $VISITORS : 'Visitors'; ?>
        </span>
        </b>
        <div id="visitors_div">
            <?php include($_SERVER['DOCUMENT_ROOT']."/php/counter.php");?>			
        </div>
        
        <!-- User Statistics block -->
        <b>
        <span class="p2">
            <?php echo isset($USERS) ? $USERS : 'Users'; ?><br>
        </span>
        </b>
        <div id="stats_div">
            <table id="stats_table">
                <tr>
                    <td>
                    <?php include($_SERVER['DOCUMENT_ROOT']."/db_stats/dbService.php");
                        $query = "SELECT total_users, global_total_users FROM monthly_costs_statistics WHERE country=\"".$GLOBALS['country']."\"";
                        $res = executeQueryInDB($query);
                        $row = mysqli_fetch_array($res); //this query just has one row
                        echo number_format($row['total_users'], 0, ',', '&thinsp;');	
                    ?>
                    </td>
                    <td><?php echo isset($FOR_COUNTRY) ? $FOR_COUNTRY : 'filled in for '.$GLOBALS['country']; ?></td>
                </tr>
                <tr>
                    <td><?php echo number_format($row['global_total_users'], 0, ',', '&thinsp;');?></td>
                    <td><?php echo isset($IN_TOTAL) ? $IN_TOTAL : 'in total'; ?></td>
                </tr>
            </table>
        </div>
        
        <!-- Contact block -->
        <b>
        <span class="p2">
            <?php echo isset($CONTACT) ? $CONTACT : 'Contact'; ?><br>
        </span>
        </b>
        <div id="contact_div">
            <a href="mailto:info@autocosts.info">info@autocosts.info</a> 
        </div>
    </div>

    <?php if ($GLOBALS['country'] == "PT") { ?>

        <table id="mobile_logos_table">
            <tr>
                <td>
                    <a href="http://play.google.com/store/apps/details?id=autocustos.com">
                        <img class="roundCorner" alt="mobile version" src="images/mobile1.png">
                    </a>
                </td>
                <td>
                    <a href="http://build.phonegap.com/apps/359804/install">
                        <img class="roundCorner" alt="mobile version" src="images/mobile2.png">
                    </a>
                </td>
            </tr>
        </table>
    <?php } ?>
</div>
