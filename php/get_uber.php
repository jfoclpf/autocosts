<?php 

/* This php file detects the region of the user by his IP and Google services
and tries to return, if applicable, a cost per unit distance of the correspondent 
UBER service in that region from which the user is accessing the site */

include_once("geo_functions.php");

//get country code and country specific strings
$cc = $_GET["c"];
$cc = strtoupper($cc);
if ($cc=="XX"){ //if test version
    exit;
}
include($_SERVER['DOCUMENT_ROOT'].'/countries/' . $cc . '.php');

//gets city and country code of user
$user_city = ip_info("Visitor", "city");
$user_region = ip_info("Visitor", "countrycode");

//converts the spaces to "+" signs to be processed by Google API
$address =  $user_region.'+'.$user_city;
$address = str_replace(" ", "+", $address);

//from country code and city gets coordinates
$url = "http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=user_region";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$response = curl_exec($ch);
curl_close($ch);
$response_a = json_decode($response);

if (!is_array($response_a->results)){
    echo "null";
    exit;
}

$lat = $response_a->results[0]->geometry->location->lat;
$long = $response_a->results[0]->geometry->location->lng;

$debug=0; //put 0 for PROD; 1 for Lisbon, 2 for London
if($debug==1){//Lisbon coordinates
    $lat=38.722252;
    $long=-9.139337;
}elseif($debug==2){ //London
    $lat=51.507351;
    $long=-0.127758;  
}

//UBER
include("../keys/uber_token.php");
$uber_url= "https://api.uber.com/v1.2/products?latitude=$lat&longitude=$long&server_token=$token";

$c_uber = curl_init();
curl_setopt($c_uber, CURLOPT_URL, $uber_url);
curl_setopt($c_uber, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c_uber, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($c_uber, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($c_uber, CURLOPT_HTTPHEADER, array(
    'Accept-Language: en_US',
    'Content-Type: application/json',
    'charset=utf-8'
));
$response_uber = curl_exec($c_uber);
curl_close($c_uber);
$response_uber_a = json_decode($response_uber);
//echo $response_uber; exit;

//for reference how UBER response is structured, visist
//http://developer.uber.com/docs/riders/references/api/v1.2/products-get#query-parameters 

//checks if UBER gets products
if (!is_array($response_uber_a->products) || count($response_uber_a->products)==0){
    echo "null";
    exit;
}

/*header('Content-type: application/json', 'charset=utf-8'); 
echo json_encode($response_uber_a->products); exit;*/

//creates a new array with UBER products that have the same currency
$relev_products = []; 
foreach($response_uber_a->products as $value) {
    if (strtoupper($value->price_details->currency_code) == strtoupper($CURR_CODE)){
        array_push ($relev_products, $value);
    }
}
unset($value);

/*header('Content-type: application/json', 'charset=utf-8'); 
echo json_encode($relev_products); exit;*/

//if no relevant data
if (count($relev_products)==0) {
    echo "null";
    exit;
}

//for every relevant UBER car gets the cheapest
$min_cost = $relev_products[0]->price_details->cost_per_distance;
$item_min = $relev_products[0];
foreach($relev_products as $value) {
  if ($value->price_details->cost_per_distance < $min_cost){
      $min_cost = $value->price_details->cost_per_distance;
      $item_min = $value;
  }
}
unset($value);

//send data to client, the cheapest uber car
header('Content-type: application/json', 'charset=utf-8');
echo json_encode(array( "cost_per_distance" => $item_min->price_details->cost_per_distance,
                        "cost_per_minute" => $item_min->price_details->cost_per_minute,
                        "currency_code" => $item_min->price_details->currency_code,
                        "distance_unit" => $item_min->price_details->distance_unit));

?>