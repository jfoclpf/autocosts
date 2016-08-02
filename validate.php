<?php 
    $captcha = "";
    if(isset($_POST['g-recaptcha-response'])){
      $captcha=$_POST['g-recaptcha-response'];
    }
    if (!$captcha){
        echo "not ok-1";
        exit;
    }
    
    $secretKey = "6LcdhB4TAAAAAA-d_ATwluuEgBj4mEx5mmiiqG0b";
    $ip = $_SERVER['REMOTE_ADDR'];
    $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
    $responseKeys = json_decode($response, true);
    if(intval($responseKeys["success"]) !== 1) {
      echo 'not ok-2';
    } else {
      echo 'ok';
    }
  
?>