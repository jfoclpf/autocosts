<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<HTML>
    <HEAD>
        <TITLE>
            List of countries for autocosts
        </TITLE>
        <style>
            table {
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
                padding: 4px;
            }
        </style>
    </HEAD>
<BODY>

<table>
    <tr>
        <th>
            #
        </th>
        <th>
            Country
        </th>
        <th>
            CC
        </th>
        <th>
            Main domain
        </th>
        <th>
            Curr. code
        </th>
        <th>
            Currency name
        </th>
        <th>
            Curr. symbol
        </th>
        <th>
            Fuel efficiency
        </th>
        <th>
            Standard distance
        </th>
        <th>
            Fuel volume
        </th>
    </tr>
    <tr>
    <?php
        include_once("./_list.php");
        asort($avail_CT); //sorts alphabetically the counties list
        
        $i=1;
        foreach ($avail_CT as $key => $value) {
            if (strtoupper($key) != "XX"){
                include_once('./' . $key . '.php');
                echo '<tr>';
                echo '<td>'.$i.'</td>'; $i++;
                echo '<td>'.$value.'</td>';
                echo '<td>'.$key.'</td>';
                echo '<td><a href="http://'.strtolower($AC_DOMAIN).'">'.strtolower($AC_DOMAIN).'</a></td>';
                echo '<td>'.$CURR_CODE.'</td>';
                echo '<td>'.$CURR_NAME.'</td>';
                echo '<td>'.$CURR_SYMBOL.'</td>';                
                switch($fuel_efficiency_std_option){
                    case 1:
                        echo '<td>l/100km</td>';
                        break;
                    case 2:
                        echo '<td>km/l</td>';
                        break;
                    case 3:
                        echo '<td>mpg(imp)</td>';
                        break;
                    case 4:
                        echo '<td>mpg(US)</td>';
                        break;
                    case 5:
                        echo '<td>l/mil</td>';
                        break;
                    case 6:
                        echo '<td>km/gal(US)</td>';
                        break;                        
                    default:
                        echo '<td>error</td>';
                }
                switch($distance_std_option){
                    case 1:
                        echo '<td>kilometres</td>';
                        break;
                    case 2:
                        echo '<td>miles</td>';
                        break;
                    case 3:
                        echo '<td>mil</td>';
                        break;                        
                    default:
                        echo '<td>error</td>';
                }
                switch($fuel_price_volume_std){
                    case 1:
                        echo '<td>litres</td>';
                        break;
                    case 2:
                        echo '<td>imperial gallons</td>';
                        break;
                    case 3:
                        echo '<td>US gallons</td>';
                        break;                        
                    default:
                        echo '<td>error</td>';
                }
                echo '</tr>';
            }
        }
    ?>
    </tr>
</table>
 
</BODY>
</HTML>