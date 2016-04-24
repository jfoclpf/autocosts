<!-- in case of PT shows mobile version -->
<? if ($GLOBALS['country'] != "XX") { ?>
	<div id="div13">
        <? include "db_stats/tables/".$GLOBALS['country'].".html" ?>
	</div>
	<div id="br3">
      <br>
	</div>
<? } ?>

