<div id="div1" class="roundCornerSlight">
    <!-- in case of XX shows no stats table -->
    <?php if ($GLOBALS['country'] != "XX") { ?>
        <div id="div13">
            <?php include "db_stats/tables/".$GLOBALS['country'].".html" ?>
        </div>
        <div id="br3">
          <br>
        </div>
    <?php } ?>
</div>

