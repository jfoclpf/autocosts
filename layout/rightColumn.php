<!-- in case of PT shows mobile version -->
<?php if ($GLOBALS['country'] != "XX") { ?>
	<div id="div13">
        <?php include "db_stats/tables/".$GLOBALS['country'].".html" ?>
	</div>
	<div id="br3">
      <br>
	</div>
<?php } ?>

