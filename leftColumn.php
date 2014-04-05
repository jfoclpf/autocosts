<div id="div1" class="roundCornerSlight">
    <div id="div11" style="text-align:center;margin-right:auto;margin-left:auto;">
        <a href="images/img2.jpg">
            <img class="roundCorner"
                 style="border-style: solid; border-width: 2px; margin-left: -12px; padding: 10px; width: 97%; border-color: rgb(180, 180, 180);"
                 src="images/img2.jpg">
        </a>
        <br>
        <br>
    </div>
    <div id="div12" class="roundCorner" style="text-align: center; margin: auto;">
        <div class="p4">
            <? echo $HELP_PROJECT ?>
        </div>
        <br>

        <div class="table">
            <div class="row">
                <div class="cell" style="width: 30%;"></div>
                <div class="cell">

                    <!-- PAYPAL BUTTON -->
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
								">
                        <input class="donate" value="DONATE" type="submit" border="0" name="submit">
                        <span class="p1" style="white-space: nowrap">paypal / visa / amex / master card</span>
                        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif">
                    </form>

                </div>
                <div class="cell" style="width: 30%;"></div>
            </div>
        </div>
    </div>

    <div id="br1">
        <br>
    </div>
    <!-- in case of PT shows mobile version -->
    <? if ($def_cty == "PT") { ?>
        <div id="div13">
            <a href="https://build.phonegap.com/apps/359804/install">
                <div class="p4">
                    <? echo $AC_MOBILE ?>
                </div>
            </a>
            <br>

            <div style="text-align:center;">
                <a href="https://build.phonegap.com/apps/359804/install">
                    <img border="0" src="images/mobile1.jpg" style="width: 90%; padding-top: 10px;">
                </a>
            </div>
        </div>

        <div id="br3">
            <br>
        </div>
    <? } ?>
</div>