<?php

function executeQueryInDB($query)
{
    include($_SERVER['DOCUMENT_ROOT']."/Globals.php");

    $isDBConnectionSane = true;
    $connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);

    if (!$connectionDB)
    {
        $isDBConnectionSane = false;
        die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
        exit;
    }
    if ($isDBConnectionSane) {
        $queryResult = mysqli_query($connectionDB, $query);
        return $queryResult;
    }
}