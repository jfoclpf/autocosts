<?php
include ("credentials.php");
include ('dbService.php');
include (dirname(__FILE__).'/../country files/country_list.php');

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);

if (!$connectionDB)
{
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    exit;
}

//delete table before populate it 
$query = "DELETE * FROM country_specs";
$result = $connectionDB->query($query);

asort($avail_CT); //sorts alphabetically the counties list

//foreach ($avail_CT as $key => $value) {

$queryInsert = "INSERT INTO country_specs (
    Country,
    currency,
	time_spent_min_drive_per_day,
	distance_std,
    fuel_efficiency_std,
    fuel_price_volume_std
    )

    VALUES (
    'PT',
    'EUR',
    1,
    1,
    1
    )";

    $result = executeQueryInDB($queryInsert);

?>    
    
