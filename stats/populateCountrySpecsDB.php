<?php
/*script that populates a country DB with specs for each country*/

print "Populating the 'countries specs DB' with information from the countries files \n";

/*gets parent directory of current directory where the file is stored*/
$HOME_DIR = dirname(getcwd())."/";

$COUNTRIES_DIR  = $HOME_DIR."src/countries"."/";
$TABLES_DIR     = $HOME_DIR."build/tables"."/";
$FUNCTIONS_FILE = $HOME_DIR."src/php/functions.php";

$KEYS_DIR       = $HOME_DIR."keys"."/";
$KEY_FILE_NAME  = "db_credentials.php";

/*######################################################################*/

/*choses release, version or prod */
if(sizeof($argv) == 1){    
    $REL = "work";
}
else if (sizeof($argv) > 2){
    echo "Just one argument is accepted \n";
    exit;
}
else{
    if ($argv[1]!="work" && $argv[1]!="prod"){
        echo "work or prod must be chosen \n";
        exit;
    }
    $REL = $argv[1];
}

print "chosen ".$REL."\n";

$key_full_path = $KEYS_DIR.$REL."/".$KEY_FILE_NAME; 
include($key_full_path); //DB credentials
print "keys obtained from: ".$key_full_path."\n";

include_once($FUNCTIONS_FILE);
loadsCountries($COUNTRIES_DIR."list.json");
$avail_CT=$GLOBALS["avail_CT"];
asort($avail_CT); //sorts alphabetically the counties list got from list.php

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);
if (!$connectionDB){
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    echo "\n error";
    exit;
}
else{
    echo "Connection established to ".$autocosts_database." on ".$autocosts_host."\n";
}

//delete table before populate it
$query = "DELETE FROM country_specs";
$result = mysqli_query($connectionDB, $query);
mysqli_close($connectionDB);
echo "Previous data deleted from DB\n";

print "Repopulating DB\n";
//open new connection
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);
if (!$connectionDB){
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    echo "\n error";
    exit;
}
else{
    print "Connection established to ".$autocosts_database." on ".$autocosts_host."\n";
}

include_once($FUNCTIONS_FILE);
loadsCountries($COUNTRIES_DIR."list.json");
$avail_CT=$GLOBALS["avail_CT"];
//removes XX from array
unset($avail_CT['XX']);
asort($avail_CT); //sorts alphabetically the counties list

foreach ($avail_CT as $key => $value) {
    print $key." ";
    
    //gets country language variables
    loadsLanguageVars($COUNTRIES_DIR.$key.".json");
    $WORDS = $GLOBALS["WORDS"];  

    $queryInsert = "INSERT INTO country_specs (
        Country,
        currency,
        distance_std,
        fuel_efficiency_std,
        fuel_price_volume_std
        )

        VALUES (
        '".$key."',
        '".$WORDS['curr_code']."',
        ".$WORDS['distance_std_option'].",
        ".$WORDS['fuel_efficiency_std_option'].",
        ".$WORDS['fuel_price_volume_std']."
        )";

    //echo $queryInsert;

    $queryResult = mysqli_query($connectionDB, $queryInsert);
    //echo "\n\n result command insert: ".$queryResult;

}
mysqli_close($connectionDB);

echo "\nDB repopulated"."\n";
?>

