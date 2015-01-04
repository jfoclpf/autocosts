<?php
include('Globals.php');

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);

if (!$connectionDB)
{
	$isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    exit;
}

$query = "SELECT DISTINCT uuid_client, country FROM users_insertions";
$result = $connectionDB->query($query);
	
if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
		$var[] = $row;				
	}
	$query = "SELECT * FROM users_insertions";
	$result = $connectionDB->query($query);
	while($row = $result->fetch_assoc()) {
		$temp[] = $row;
	}
	$res[]=[$var,$temp];
} 	
 echo json_encode($res);  		
	
