<?php
include("credentials.php");

$country = $_POST['country_code']; 

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);

if (!$connectionDB)
{
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    exit;
}

$query = "SELECT * FROM monthly_costs_statistics WHERE country='".$country."'";

$result = $connectionDB->query($query);

echo json_encode($result->fetch_assoc());
?>    
