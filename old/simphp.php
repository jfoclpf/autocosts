<?

/*----------------------------

-------- ++ simPHP ++ --------
A simple PHP hit counter.

Description:
   simPHP counts both regular
   and unique views on multiple
   webpages. The stats can be
   displayed on any PHP-enabled
   webpage.

Script by Ajay: ajay@scyberia.org
http://scyberia.org

----------------------------*/



/*----------CONFIG----------*/
//Count unique hits or all hits:
//   0 = All hits
//   1 = Unique hits
//   2 = Both
$type = 1;

//Text to display...
//Before all hits.
$allText = "Visits: ";
//Before unique hits.
$uniqueText = "Unique visitors: ";

//Display hits on this page:
//   0 = No
//   1 = Yes
$display = 0;

//Only change this is you are recording both values.
//Separator for unique and all hits display - use HTML tags! (line break is default)
$separator = "<hr \>";
//Default would output:
//   Visits: 10
//   Unique Visits: 10
/*--------------------------*/






/*--------BEGIN CODE--------*/

//Check for "?code" in URL.
if (parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY)=="code") {
	//Show include() info.
	die("&#60;? include(\"" . __FILE__ . "\"); ?&#62;");
} else {
	//Visitor IP.
	$uIP = $_SERVER['REMOTE_ADDR'];

	//Check for "hits.txt" file.
	if (file_exists("hits.txt")) {
		//Get contents of "hits.txt" file.
		$log = file_get_contents("hits.txt");

		//Get type from CONFIG above.
		if ($type==0) {

			//Info to write to log file and info to show.
			$toWrite = intval($log)+1;
			$info = $allText . $toWrite;

		} else if ($type==1) {

			//Position of separator (;).
			$colonPos = strpos($log, ";");

			//Separate log file into hits and IPs.
			$hits = substr($log, 0, $colonPos);
			$IPs = substr($log, $colonPos+1);
			$IPArray = explode(",", $IPs);

			//Check for visitor IP in list of IPs.
			if (array_search($uIP, $IPArray, true)===false) {
				//If doesnt' exist increase hits and include IP.
				$hits = intval($hits)+1;
				$toWrite = $hits . ";" . $IPs . $_SERVER['REMOTE_ADDR'] . ",";
			} else {
				//Otherwise nothing.
				$toWrite = $log;
			}
			//Info to show.
			$info = $uniqueText . $hits;

		} else if ($type==2) {

			//Position of separators.
			$c1Pos = strpos($log, ";");
			$c2Pos = strrpos($log, ";");

			//Separate log file into regular hits, unique hits, and IPs.
			$all = substr($log, 0, $c1Pos);
			$unique = substr($log, $c1Pos+1, intval($c2Pos)-(intval($c1Pos)+1));
			$IPs = substr($log, $c2Pos+1);
			$IPArray = explode(",", $IPs);

			//Increase regular hits.
			$allHits = intval($all)+1;

			//Search for visitor IP in list of IPs.
			if (array_search($uIP, $IPArray, true)===false) {
				//Increase ONLY unique hits and append IP.
				$unique = intval($unique)+1;
				$toWrite = $allHits . ";" . $unique . ";" . $IPs . $uIP . ",";
			} else {
				//Else just include regular hits.
				$toWrite = $allHits . ";" . $unique . ";" . $IPs;
			}
			//Info to show.
			$info = $allText . $allHits . $separator . $uniqueText . $unique;
		}
	} else {
		//If "hits.txt" doesn't exist, create it.
		$fp = fopen("hits.txt","w");
		fclose($fp);

		//Write file according to CONFIG above.
		if ($type==0) {
			$toWrite = "1";
			$info = $allText . "1";
		} else if ($type==1) {
			$toWrite = "1;" . $uIP . ",";
			$info = $uniqueText . "1";
		} else if ($type==2) {
			$toWrite = "1;1;" . $uIP . ",";
			$info = $allText . "1" . $separator . $uniqueText . "1";
		}
	}

	//Put $toWrite in "hits.txt".
	file_put_contents("hits.txt", $toWrite);

	//Display info if is set in CONFIG.
	if ($display==1) {
		echo $info;
	}
}
?>