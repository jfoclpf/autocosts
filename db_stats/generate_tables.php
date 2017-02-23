<?
/*File which generates the statistics tables on a HTML file 
that will be shown in the right column of the main page*/

//function for formating numbers which come from DB 
function fixNmbr($i,$n){
    $float_num = floatval($i);
    return number_format($float_num, $n, '.', '');
}

include("../keys/db_credentials.php"); //DB credentials
include("../countries/_list.php");

$isDBConnectionSane = true;
$connectionDB = mysqli_connect($autocosts_host, $autocosts_user, $autocosts_password, $autocosts_database);

if (!$connectionDB)
{
    $isDBConnectionSane = false;
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    exit;
}

asort($avail_CT); //sorts alphabetically the counties list

//for each country creates a corresponding file
foreach ($avail_CT as $country => $country_name) {

    $query = "SELECT * FROM monthly_costs_statistics WHERE country='".$country."'";
    $result = $connectionDB->query($query);
    $row = $result->fetch_assoc();

    //gets country language variables
    include('../countries/'.$country.'.php');

    //the file name to which the HTML table will be saved
    $file="tables/".$country.".html";

    //the content of the file
    $content = '<table id="tbl_statistics">
        <tr class="tr-title">
            <td id="td-top-title" colspan="2" class="center td-title">';
            
    if ($country == "TR") { 
        $content.='<b><span>'.$COUNTRY_NAME.'</span><span class="stat_title"> '.$STATISTIC_TITLE.'</span></b>';
    }
    else{
        $content.='<b><span>'.$STATISTIC_TITLE.'</span><span class="stat_title"> '.$COUNTRY_NAME.'</span></b>';
    }

    $content.='<br><span>'.$AVERAGE_COSTS_PER_TYPE.'</span>
            </td>
        </tr>   
        <tr class="tr-sub-title"><td colspan="2" class="center"><span>'.$FIXED_COSTS.'<span></td></tr>
        <tr><td style="width:50%"><span>'.$DEPRECIATION_ST.'</span></td> <td style="width:25%"><span> '.$CURR_SYMBOL.' </span><span id="txt_depr" class="value-field">'.fixNmbr($row["Depreciation"],1).'</span></td></tr>
        <tr><td><span>'.$INSURANCE_ST.'</span></td>                      <td><span> '.$CURR_SYMBOL.' </span><span id="txt_ins" class="value-field">'.fixNmbr($row["Insurance"],1).'</span></td></tr>
        <tr><td><span>'.$CREDIT_INTERESTS.'</span></td>                  <td><span> '.$CURR_SYMBOL.' </span><span id="txt_cred" class="value-field">'.fixNmbr($row["Loan_interests"],1).'</span></td></tr>
        <tr><td><span>'.$INSPECTION_SHORT.'</span></td>                  <td><span> '.$CURR_SYMBOL.' </span><span id="txt_insp" class="value-field">'.fixNmbr($row["Inspection"],1).'</span></td></tr>
        <tr><td><span>'.$ROAD_TAXES_SHORT.'</span></td>                  <td><span> '.$CURR_SYMBOL.' </span><span id="txt_tax" class="value-field">'.fixNmbr($row["Car_tax"],1).'</span></td></tr>
        <tr><td><span>50% '.$MAINTENANCE.'</span></td>                   <td><span> '.$CURR_SYMBOL.' </span><span id="txt_maint1" class="value-field">'.fixNmbr($row["Maintenance"],1).'</span></td></tr>
        <tr class="tr-result">
            <td><span>'.$WORD_TOTAL_CAP.'<br>'.$FIXED_COSTS.'</span></td>
            <td><span> '.$CURR_SYMBOL.' </span><span id="txt_standing_costs" class="value-field">'.fixNmbr($row["standing_costs"],0).'</span></td>
        </tr>   
        <tr class="tr-sub-title"><td colspan="2" class="center"><span>'.$RUNNING_COSTS.'<span></td></tr>
        <tr><td><span>'.$FUEL.'</span></td>                              <td><span> '.$CURR_SYMBOL.' </span><span id="txt_fuel" class="value-field">'.fixNmbr($row["Fuel"],1).'</span></td></tr>
        <tr><td><span>50% '.$MAINTENANCE.'</span></td>                   <td><span> '.$CURR_SYMBOL.' </span><span id="txt_maint2" class="value-field">'.fixNmbr($row["Maintenance"],1).'</span></td></tr>
        <tr><td><span>'.$REP_ST.'</span></td>                            <td><span> '.$CURR_SYMBOL.' </span><span id="txt_rep" class="value-field">'.fixNmbr($row["Repairs"],1).'</span></td></tr>
        <tr><td><span>'.$PARKING.'</span></td>                           <td><span> '.$CURR_SYMBOL.' </span><span id="txt_park" class="value-field">'.fixNmbr($row["Parking"],1).'</span></td></tr>
        <tr><td><span>'.$TOLLS.'</span></td>                             <td><span> '.$CURR_SYMBOL.' </span><span id="txt_tolls" class="value-field">'.fixNmbr($row["Tolls"],1).'</span></td></tr>
        <tr><td><span>'.$FINES.'</span></td>                             <td><span> '.$CURR_SYMBOL.' </span><span id="txt_fines" class="value-field">'.fixNmbr($row["Fines"],1).'</span></td></tr>
        <tr><td><span>'.$WASHING_ST.'</span></td>                        <td><span> '.$CURR_SYMBOL.' </span><span id="txt_wash" class="value-field">'.fixNmbr($row["Washing"],1).'</span></td></tr>
        <tr class="tr-result">
            <td><span>'.$WORD_TOTAL_CAP.'<br>'.$RUNNING_COSTS.'</span></td>
            <td><span> '.$CURR_SYMBOL.' </span><span id="txt_running_costs" class="value-field">'.fixNmbr($row["running_costs"],0).'</span></td>
        </tr>    
        <tr><td colspan="2"></td></tr>    
        <tr class="main_total">
            <td><span>'.$WORD_TOTAL_CAP.'</span></td>
            <td><span> '.$CURR_SYMBOL.' </span><span id="txt_total_overal" class="value-field">'.fixNmbr($row["total_costs"],0).'</span></td>
        </tr>    
        <tr>
            <td><span>'.$RUN_CP_DIST.'</span></td>
            <td><span> '.$CURR_SYMBOL.'</span><span id="txt_running_costs_dist" class="value-field">'.fixNmbr($row["running_costs_dist"],2).'</span><span>/'.$STD_DIST.'</span></td>
        </tr>
        <tr>
            <td><span>'.$TOTAL_CP_DIST.'</span></td>
            <td><span> '.$CURR_SYMBOL.'</span><span id="txt_total_costs_p_unit" class="value-field">'.fixNmbr($row["total_costs_dist"],2).'</span><span>/'.$STD_DIST.'</span></td>
        </tr>
        <tr>
            <td><span>'.$KINETIC_SPEED_TITLE.'</span></td>
            <td> <span id="txt_kinetic_speed" class="value-field"></span>'.fixNmbr($row["kinetic_speed"],0).'<span> '.$STD_DIST.'/h</span></td>
        </tr>
        <tr>
            <td><span><a href="./docs/consumerspeed.html">'.$VIRTUAL_SPEED_TITLE.'</a></span></td>
            <td><span id="txt_virtual_speed" class="value-field">'.fixNmbr($row["virtual_speed"],0).'</span><span> '.$STD_DIST.'/h</span></td>
        </tr>
        <tr>
            <td id="table-td-bottom-left"><span>'.$TOTAL_COSTS_PER_YEAR.'</span></td>
            <td id="table-td-bottom-right">'.$CURR_SYMBOL.' <span id="txt_total_costs_year" class="value-field">'.fixNmbr($row["total_costs_year"],0).'</span></td>
        </tr>
    </table>
    <div id="tbl_statistics_footer"></div>';

    file_put_contents($file, $content);
}

print "Created countries statistical tables HTML files! \n\n";
?>