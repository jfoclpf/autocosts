<?php
    include("../keys/recaptcha_key.php");

    $captcha = "";
    if(isset($_POST['g-recaptcha-response'])){
      $captcha=$_POST['g-recaptcha-response'];
    }
    if (!$captcha){
        echo "not ok-1";
        exit;
    }
    
    $ip = $_SERVER['REMOTE_ADDR'];
    $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
    $responseKeys = json_decode($response, true);
    if(intval($responseKeys["success"]) !== 1) {
      echo 'not ok-2';
    } else {
      echo 'ok';
    }
  
?>