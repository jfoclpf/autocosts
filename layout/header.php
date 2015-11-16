<div class="banner topFixed" id="banner_top">

    <div id="banner_left">&nbsp;</div>

    <div class="main_title p5">
        <b><? echo $MAIN_TITLE ?></b>
    </div>

    <!--## Select country box ##-->
    <div class="banner_right">
        <div style="display: inline-block;text-align:right;">
            <div style="display: table; margin: 0 auto;">
                <div style="display: table-row;">
                    <div style="display: table-cell; height:24px;width:24px;">
                        <div style="margin-right: 2px; margin-top: 2px;"
                             class="<?php echo strtolower($GLOBALS['country']) ?> flag"></div>
                    </div>
                    <div style="display: table-cell; vertical-align: bottom;">
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
                </div>
            </div>
        </div>
    </div>

    <!--#####################-->
</div>
<br>
<div class="description p3">
    <br>
    <? echo $INITIAL_TEXT ?>
    <br>
    <br>
</div>