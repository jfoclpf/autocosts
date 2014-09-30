<?php

include('./php/dbService.php');

$fichier = 'export_autocost.csv';
header( "Content-Type: text/csv;charset=utf-8" );
header( "Content-Disposition: attachment;filename=\"$fichier\"" );
header("Pragma: no-cache");
header("Expires: 0");

$fp= fopen('php://output', 'w');

$query = 'select * from users_insertions';
$result = executeQueryInDB($query);

if ($fp && $result) {
    while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) {
        if(empty($header)){ // do it only once!
            $header = array_keys($row); // get the columnnames
            fputcsv($fp, $header); // put them in csv
        }
        fputcsv($fp, array_values($row));
    }
    die;
}

fclose($fp);

?>