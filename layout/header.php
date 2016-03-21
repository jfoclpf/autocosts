<div class="banner topFixed" id="banner_top">
    <!--## Select country box ##-->
    <div class="b-contry">
        <div class="<?php echo strtolower($GLOBALS['country']) ?> flag"></div>

        <select name="country_select" id="country_select" onchange="valueselect(this.value);"">
        <?php foreach ($avail_CT as $key => $value) {
            if ($key != "XX") { ?>
                <option value="<?php echo $key ?>" <? if ($key == $GLOBALS['country']) {
                    echo "selected=\"selected\"";
                } ?>> <?php echo $value ?></option>
            <?php }
        } ?>
        </select>
    </div>
    <!--#####################-->
    <h1 class="main_title">
        <? echo $MAIN_TITLE ?>
    </h1>
</div>
<div class="description p3">
    <? echo $INITIAL_TEXT ?>
</div>
