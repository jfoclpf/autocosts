<?php
//script that populates a country DB with specs for each country

include("credentials.php");
include (dirname(__FILE__).'/../countries/country_list.php');
asort($avail_CT); //sorts alphabetically the counties list got from country_list

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);
if (!$connectionDB)
{
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    echo "\n error";
    exit;
}

//delete table before populate it 
$query = "DELETE FROM country_specs";
$result = mysqli_query($connectionDB, $query);
//echo "result command DELETE: ".$result."\n\n";

mysqli_close($connectionDB);


//open new connection
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);
if (!$connectionDB)
{
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    echo "\n error";
    exit;
}

foreach ($avail_CT as $key => $value) {
    
    include (dirname(__FILE__).'/../countries/'.$key.'.php');
    
    if ($key !="XX"){//teste version 
                
        $queryInsert = "INSERT INTO country_specs (
            Country,
            currency,
            distance_std,
            fuel_efficiency_std,
            fuel_price_volume_std
            )
            
            VALUES (
            '".$key."',
            '".$CURR_CODE."',
            ".$distance_std_option.",
            ".$fuel_efficiency_std_option.",
            ".$fuel_price_volume_std."
            )";

        //echo $queryInsert;

        $queryResult = mysqli_query($connectionDB, $queryInsert);
        //echo "\n\n result command insert: ".$queryResult;
    }
}

mysqli_close($connectionDB);
?>    
    
