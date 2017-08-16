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
            
            $domain_unique = array_unique($domain_CT);
            
            $domain_count_values = array_count_values($domain_CT);
                        
            foreach ($domain_unique as $key => $value) {
                                
                if (strtoupper($key) != "XX"){
                    
                    $nbrEle = $domain_count_values[$value];                    
                    
                    if($nbrEle == 1){
                        echo '<tr>';
                            echo '<td>1</td>';
                            echo '<td>'.$value.'</td>';
                            echo '<td>'.$avail_CT[$key].'</td>';
                            echo '<td>'.$key.'</td>';
                        echo '</tr>';         
                    }
                    
                    else{                        
                        $array_keys = array_keys($domain_CT, $value);
                                                
                        $i=0;
                        foreach ($array_keys as $key2 => $value2){
                            
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