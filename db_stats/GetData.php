<?php
include($_SERVER['DOCUMENT_ROOT']."/Globals.php");

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);

if (!$connectionDB)
{
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    exit;
}

$query = "SELECT * FROM monthly_costs_statistics";

$result = $connectionDB->query($query);
    
if ($result->num_rows > 0) {
   
    while($row = $result->fetch_assoc()) {
        $res[] = $row; //add every row at the end of the array, forming a matrix            
    }
}   

 echo json_encode($res);        
    
