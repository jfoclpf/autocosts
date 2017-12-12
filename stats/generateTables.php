<?php

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

echo "chosen ".$REL."\n";

$key_full_path = $KEYS_DIR.$REL."/".$KEY_FILE_NAME; 
include($key_full_path); //DB credentials
echo "keys obtained from: ".$key_full_path."\n";

/*File which generates the statistics tables on a HTML file
that will be shown in the right column of the main page*/

$consumer_speed_url = "http://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Kinetic_speed_vs._consumer_speed";

//function for formating numbers which come from DB
function fixNmbr($i,$n){
    $float_num = floatval($i);
    return number_format($float_num, $n, '.', '');
}

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);

if (!$connectionDB)
{
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    exit;
}

echo "Connected successfully to DB \n";

include_once($FUNCTIONS_FILE);
loadsCountries($COUNTRIES_DIR."list.json");
$avail_CT=$GLOBALS["avail_CT"];
asort($avail_CT); //sorts alphabetically the counties list

echo "Creating tables \n";

if (!file_exists($TABLES_DIR)) {
    mkdir($TABLES_DIR, 0777, true);
}

//for each country creates a corresponding file
foreach ($avail_CT as $country => $country_name) {

    print $country.".html ";
    
    $query = "SELECT * FROM monthly_costs_statistics WHERE country='".$country."'";
    $result = $connectionDB->query($query);
    $row = $result->fetch_assoc();

    //gets country language variables
    loadsLanguageVars($COUNTRIES_DIR.$country.".json");
    $WORDS = $GLOBALS["WORDS"];
    $CURSymb = $WORDS['curr_symbol'];
    $STD_DIST = $WORDS['std_dist'];

    //the file name to which the HTML table will be saved
    $file=$TABLES_DIR.$country.".html";

    //the content of the file
    $content = '<table id="tbl_statistics">
        <tr class="tr-title">
            <td id="td-top-title" colspan="2" class="center td-title">';

    if ($country == "TR") {
        $content.='<b><span>'.$WORDS['country_name'].'</span><span class="stat_title"> '.$WORDS['statistic_title'].'</span></b>';
    }
    else{
        $content.='<b><span>'.$WORDS['statistic_title'].'</span><span class="stat_title"> '.$WORDS['country_name'].'</span></b>';
    }

    $content.='<br><span>'.$WORDS['average_costs_per_type'].'</span>
            </td>
        </tr>
        <tr class="tr-sub-title"><td colspan="2" class="center"><span>'.$WORDS['fixed_costs'].'</span></td></tr>
        <tr><td style="width:50%"><span>'.$WORDS['depreciation_st'].'</span></td> <td style="width:25%"><span> '.$CURSymb.' </span><span id="txt_depr" class="value-field">'.fixNmbr($row["Depreciation"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['insurance_st'].'</span></td>                      <td><span> '.$CURSymb.' </span><span id="txt_ins" class="value-field">'.fixNmbr($row["Insurance"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['credit_interests'].'</span></td>                  <td><span> '.$CURSymb.' </span><span id="txt_cred" class="value-field">'.fixNmbr($row["Loan_interests"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['inspection_short'].'</span></td>                  <td><span> '.$CURSymb.' </span><span id="txt_insp" class="value-field">'.fixNmbr($row["Inspection"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['road_taxes_short'].'</span></td>                  <td><span> '.$CURSymb.' </span><span id="txt_tax" class="value-field">'.fixNmbr($row["Car_tax"],1).'</span></td></tr>
        <tr><td><span>50% '.$WORDS['maintenance'].'</span></td>                   <td><span> '.$CURSymb.' </span><span id="txt_maint1" class="value-field">'.fixNmbr($row["Maintenance"],1).'</span></td></tr>
        <tr class="tr-result">
            <td><span>'.$WORDS['word_total_cap'].'<br>'.$WORDS['fixed_costs'].'</span></td>
            <td><span> '.$CURSymb.' </span><span id="txt_standing_costs" class="value-field">'.fixNmbr($row["standing_costs"],0).'</span></td>
        </tr>
        <tr class="tr-sub-title"><td colspan="2" class="center"><span>'.$WORDS['running_costs'].'</span></td></tr>
        <tr><td><span>'.$WORDS['fuel'].'</span></td>                              <td><span> '.$CURSymb.' </span><span id="txt_fuel" class="value-field">'.fixNmbr($row["Fuel"],1).'</span></td></tr>
        <tr><td><span>50% '.$WORDS['maintenance'].'</span></td>                   <td><span> '.$CURSymb.' </span><span id="txt_maint2" class="value-field">'.fixNmbr($row["Maintenance"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['rep_st'].'</span></td>                            <td><span> '.$CURSymb.' </span><span id="txt_rep" class="value-field">'.fixNmbr($row["Repairs"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['parking'].'</span></td>                           <td><span> '.$CURSymb.' </span><span id="txt_park" class="value-field">'.fixNmbr($row["Parking"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['tolls'].'</span></td>                             <td><span> '.$CURSymb.' </span><span id="txt_tolls" class="value-field">'.fixNmbr($row["Tolls"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['fines'].'</span></td>                             <td><span> '.$CURSymb.' </span><span id="txt_fines" class="value-field">'.fixNmbr($row["Fines"],1).'</span></td></tr>
        <tr><td><span>'.$WORDS['washing_st'].'</span></td>                        <td><span> '.$CURSymb.' </span><span id="txt_wash" class="value-field">'.fixNmbr($row["Washing"],1).'</span></td></tr>
        <tr class="tr-result">
            <td><span>'.$WORDS['word_total_cap'].'<br>'.$WORDS['running_costs'].'</span></td>
            <td><span> '.$CURSymb.' </span><span id="txt_running_costs" class="value-field">'.fixNmbr($row["running_costs"],0).'</span></td>
        </tr>
        <tr><td colspan="2"></td></tr>
        <tr class="main_total">
            <td><span>'.$WORDS['word_total_cap'].'</span></td>
            <td><span> '.$CURSymb.' </span><span id="txt_total_overal" class="value-field">'.fixNmbr($row["total_costs"],0).'</span></td>
        </tr>
        <tr>
            <td><span>'.$WORDS['run_cp_dist'].'</span></td>
            <td><span> '.$CURSymb.'</span><span id="txt_running_costs_dist" class="value-field">'.fixNmbr($row["running_costs_dist"],2).'</span><span>/'.$STD_DIST.'</span></td>
        </tr>
        <tr>
            <td><span>'.$WORDS['total_cp_dist'].'</span></td>
            <td><span> '.$CURSymb.'</span><span id="txt_total_costs_p_unit" class="value-field">'.fixNmbr($row["total_costs_dist"],2).'</span><span>/'.$STD_DIST.'</span></td>
        </tr>
        <tr>
            <td><span>'.$WORDS['kinetic_speed_title'].'</span></td>
            <td> <span id="txt_kinetic_speed" class="value-field"></span>'.fixNmbr($row["kinetic_speed"],0).'<span> '.$STD_DIST.'/h</span></td>
        </tr>
        <tr>
            <td><span><a target="_blank" href="'.$consumer_speed_url.'">'.$WORDS['virtual_speed_title'].'</a></span></td>
            <td><span id="txt_virtual_speed" class="value-field">'.fixNmbr($row["virtual_speed"],0).'</span><span> '.$STD_DIST.'/h</span></td>
        </tr>
        <tr>
            <td id="table-td-bottom-left"><span>'.$WORDS['total_costs_per_year'].'</span></td>
            <td id="table-td-bottom-right">'.$CURSymb.' <span id="txt_total_costs_year" class="value-field">'.fixNmbr($row["total_costs_year"],0).'</span></td>
        </tr>
    </table>
    <div id="tbl_statistics_footer"></div>';

    file_put_contents($file, $content);
}

print "\nCreated countries statistical tables HTML files! \n";
?>