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

//query to build a table with 2 columns, 
//on the 1st column has a unique uuid_client, 
//on the 2nd column has the 2-letter country code
// || uuid_client | country ||
$query = "SELECT DISTINCT uuid_client, country FROM users_insertions";

$result = $connectionDB->query($query);
    
if ($result->num_rows > 0) {
   
    while($row = $result->fetch_assoc()) {
        $var[] = $row; //add every row at the end of the array, forming a matrix            
    }
//matrix $var is builit, having two columns
// || uuid_client | country ||

//***********************************//

//query to build a table with everything 
    $query = "SELECT * FROM users_insertions";
    $result = $connectionDB->query($query);
    while($row = $result->fetch_assoc()) {
        $temp[] = $row;
    }
 //matrix $temp is builit, having all DB 
    
    $res=[$var,$temp]; //builds a list with two matrixes 
}   
 echo json_encode($res);        
    
