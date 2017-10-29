<?php header('Content-Type: text/html; charset=utf-8');?>
<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<HTML>
    <HEAD>
        <TITLE>
            List of Domains for the Automobile Costs Calculator
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

<h1 style="text-align:center">
    List of Domains for the Automobile Costs Calculator
</h1>

<div style="width:100%">
    <table style="margin: 0 auto">
        <tr>
            <th>
                #
            </th>
            <th>
                Domain
            </th>
            <th>
                Countries
            </th>
            <th>
                CC
            </th>
        </tr>
        <tr>
        <?php
            include_once("./countries/_list.php");

            //array where domain duplicates are removed
            $domain_unique = array_unique($domain_CT);
            
            //count in the orignal domains array, of many entries are for each domain
            $domain_count_values = array_count_values($domain_CT);

            //loops through an array of unique domains (no duplicates)
            foreach ($domain_unique as $key => $value) {

                //how many entries are for this domain?
                $nbrEle = $domain_count_values[$value];

                //if it is a domain associated with only one country (for example autocosti.info is only for Italy)
                if($nbrEle == 1){
                    echo '<tr>';
                        echo '<td>1</td>';
                        echo '<td>'.$value.'</td>';
                        echo '<td>'.$avail_CT[$key].'</td>';
                        echo '<td>'.$key.'</td>';
                    echo '</tr>';
                }
                
                //if for this domain there are several countries associated (for example autocosts.info for US and UK)
                else{
                    
                    //array of countries (keys) for each single domain ($value)
                    $array_keys = array_keys($domain_CT, $value);

                    if(in_array("XX",$array_keys)){
                        $nbrEle--;
                    }
                    
                    $i=0;
                    foreach ($array_keys as $key2 => $value2){

                       if (strtoupper($value2) != "XX"){

                            echo '<tr>';
                            if($i==0){
                                echo '<td rowspan="'.$nbrEle.'">'.$nbrEle.'</td>';
                                echo '<td rowspan="'.$nbrEle.'">'.$value.'</td>';
                                echo '<td>'.$avail_CT[$value2].'</td>';
                                echo '<td>'.$value2.'</td>';
                            }
                            else{
                                echo '<td>'.$avail_CT[$value2].'</td>';
                                echo '<td>'.$value2.'</td>';
                            }
                            echo '</tr>';
                            $i++;
                        }
                    }
                }
            }
        ?>
        </tr>
    </table>
</div>
<br><br>
</BODY>
</HTML>