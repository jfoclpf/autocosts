<div id="div3a" class="roundCornerSlight">
    <?php include($_SERVER['DOCUMENT_ROOT'] . "/php/logo_pict_selector.php"); ?>
    <?
    if ($is_logo)
        echo '<img alt="Logo" src="images/logos/' . get_logo_file_name($is_logo, $currency_logo) . '" id="ac_logo">';
    else
        echo '<div style="padding-top:14px;"></div>'; //in case no currency logo applies gives a break line
    ?>
    <div class="is_logo" <? if ($is_logo) { ?><? } ?>">
</div>

<div class="roundCorner">
    <img alt="Picture" src="<? echo get_picture_file_name($CURR_CODE); ?>">
</div>

<div id="div32">
    <!-- Visitor Statistics block -->

    <b>Visitors</b>
    <?php include($_SERVER['DOCUMENT_ROOT'] . "/php/counter.php"); ?>

    <!-- User Statistics block -->
    <b>Users</b>
    <table class="t-users">
        <tr>
            <td>
	        <span id="users_count"><?php include($_SERVER['DOCUMENT_ROOT'] . "/db_stats/dbService.php");
                $query = "SELECT DISTINCT uuid_client, country FROM users_insertions";
                $res = executeQueryInDB($query);
                $filled_by_cty = 0;
                while ($row = mysqli_fetch_array($res)) {
                    if ($row['country'] == $GLOBALS['country']) {
                        $filled_by_cty++;
                    }
                }
                echo number_format($filled_by_cty, 0, ',', '&thinsp;');
                ?></span>
            </td>
            <td>filled in for <?php echo $GLOBALS['country'] ?></td>
        </tr>
        <tr>
            <td><?php echo number_format(mysqli_num_rows($res), 0, ',', '&thinsp;'); ?></td>
            <td>filled in totally</td>
        </tr>
    </table>


    <!-- Contact block -->

    <b>Contact</b>
    <a href="mailto:info@autocosts.info">info@autocosts.info</a>
</div>

<? if ($GLOBALS['country'] == "PT") { ?>

    <table>
        <tr>
            <td>
                <a href="http://play.google.com/store/apps/details?id=autocustos.com" imageanchor="1">
                    <img class="roundCorner" alt="mobile version" src="images/mobile1.png">
                </a>
            </td>
            <td>
                <a href="http://build.phonegap.com/apps/359804/install" imageanchor="1">
                    <img class="roundCorner" alt="mobile version" src="images/mobile2.png">
                </a>
            </td>
        </tr>
    </table>
<? } ?>
</div>
