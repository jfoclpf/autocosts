<div id="div3">
    <div id="div3a" class="roundCornerSlight">
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/php/logo_pict_selector.php"); ?>

        <?php
        if ($is_logo)
            echo '<img alt="Logo" src="images/logos/' . get_logo_file_name($is_logo, $currency_logo, $language) . '" id="ac_logo">';
        else
            echo '<div style="padding-top:14px;"></div>'; //in case no currency logo applies gives a break line
        ?>

        <?php if ($is_logo) { ?><div class="is_logo"></div><?php } ?>

        <div class="roundCorner">
            <img alt="Picture" src="<?php echo get_picture_file_name($CURR_CODE); ?>">
        </div>
        
        <br>
        
        <a class="display_block" target="_blank" href="https://play.google.com/store/apps/details?id=info.autocosts">
            <div id="div31" class="roundCorner">
                <img alt="Android logo" src="images/android/android_robot.svg">
                <img alt="Android logo" src="images/android/android_text.svg">
            </div>
        </a>

        <div id="div32" class="roundCorner">
            <!-- Contact block -->
            <div id="contact_div">
                <!--hides email from bot spamers-->
                <span class="codedirection">.stso<!-- >@. -->cotua<!-- >@. -->@<!-- >@. -->ofni</span>info
            </div>
        </div>

    </div>
</div>
