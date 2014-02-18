<?php


include('Globals.php');

/*
Text Counter by http://www.free-php-counter.com
You are allowed to remove advertising after you purchased a licence
*/

// settings

// ip-protection in seconds
$counter_expire = 600;

// ignore agent list
$counter_ignore_agents = array('bot', 'bot1', 'bot3');

// ignore ip list
$counter_ignore_ips = array('127.0.0.1');


// get basic information
$counter_agent = $_SERVER['HTTP_USER_AGENT'];
$counter_ip = $_SERVER['REMOTE_ADDR']; 
$counter_time = time();



// connect to database
$counter_connected = true;
$link = mysqli_connect($counter_host, $counter_user, $counter_password, $counter_database);
if (!$link) 
{
 	// can't connect to database
	$counter_connected = false;
	die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
	exit;
}

if ($counter_connected == true) 
{
   $ignore = false; 
   
   // get counter information
   $sql = "SELECT * FROM counter_values LIMIT 1";
   $res = mysqli_query($link, $sql);
   
   // fill when empty
   if (mysqli_num_rows($res) == 0)
   {	  
	  $sql = "INSERT INTO `counter_values` (`id`, `day_id`, `day_value`, `yesterday_id`, `yesterday_value`, `week_id`, `week_value`, `month_id`, `month_value`, `year_id`, `year_value`, `all_value`, `record_date`, `record_value`) VALUES ('1', '" . date("z") . "',  '1', '" . (date("z")-1) . "',  '0', '" . date("W") . "', '1', '" . date("n") . "', '1', '" . date("Y") . "',  '1',  '1',  NOW(),  '1')";
	  mysqli_query($link, $sql);

	  // reload with settings
	  $sql = "SELECT * FROM counter_values LIMIT 1";
      $res = mysqli_query($link, $sql);
	  
	  $ignore = true;
   }   
   $row = mysqli_fetch_assoc($res);
   
   $day_id = $row['day_id'];
   $day_value = $row['day_value'];
   $yesterday_id = $row['yesterday_id'];
   $yesterday_value = $row['yesterday_value'];
   $week_id = $row['week_id'];
   $week_value = $row['week_value'];
   $month_id = $row['month_id'];
   $month_value = $row['month_value'];
   $year_id = $row['year_id'];
   $year_value = $row['year_value'];
   $all_value = $row['all_value'];
   $record_date = $row['record_date'];
   $record_value = $row['record_value'];
   
   
   // check ignore lists
   $length = sizeof($counter_ignore_agents);
   for ($i = 0; $i < $length; $i++)
   {
	  if (substr_count($counter_agent, strtolower($counter_ignore_agents[$i])))
	  {
	     $ignore = true;
		 break;
	  }
   }
   
   $length = sizeof($counter_ignore_ips);
   for ($i = 0; $i < $length; $i++)
   {
	  if ($counter_ip == $counter_ignore_ips[$i])
	  {
	     $ignore = true;
		 break;
	  }
   }
   
      
   // delete free ips
   if ($ignore == false)
   {
      $sql = "DELETE FROM counter_ips WHERE unix_timestamp(NOW())-unix_timestamp(visit) >= $counter_expire"; 
      mysqli_query($link, $sql);	  
   }
      
   // check for entry
   if ($ignore == false)
   {
      $sql = "update counter_ips set visit = NOW() where ip = '$counter_ip'";
	  mysqli_query($link, $sql);
	  
	  if (mysqli_affected_rows($link) > 0)
	  {
		 $ignore = true;						   		 
	  }
	  else
	  {
		 // insert ip
	     $sql = "INSERT INTO counter_ips (ip, visit) VALUES ('$counter_ip', NOW())";
   	     mysqli_query($link, $sql); 
	  }	  	  
   }
   
   // online?
   $sql = "SELECT * FROM counter_ips";
   $res = mysqli_query($link, $sql);
   $online = mysqli_num_rows($res);
      
   // add counter
   if ($ignore == false)
   {     	  
      // yesterday
	  if ($day_id == (date("z")-1)) 
	  {
	     $yesterday_value = $day_value; 
	  }
	  else
	  {
	     if ($yesterday_id != (date("z")-1))
		 {
		    $yesterday_value = 0; 
		 }
	  }
	  $yesterday_id = (date("z")-1);
	  
	  // day
	  if ($day_id == date("z")) 
	  {
	     $day_value++; 
	  }
	  else 
	  {
	     $day_value = 1;
		 $day_id = date("z");
	  }
	  
	  // week
	  if ($week_id == date("W")) 
	  {
	     $week_value++; 
	  }
	  else 
	  { 
	     $week_value = 1;
		 $week_id = date("W");
      }
	  
      // month
	  if ($month_id == date("n")) 
	  {
	     $month_value++; 
	  }
	  else 
	  {
	     $month_value = 1;
		 $month_id = date("n");
      }
	  
	  // year
	  if ($year_id == date("Y")) 
	  {
	     $year_value++; 
	  }
	  else 
	  {
	     $year_value = 1;
		 $year_id = date("Y");
      }
	  
	  // all
	  $all_value++;
		 
	  // neuer record?
	  if ($day_value > $record_value)
	  {
	     $record_value = $day_value;
	     $record_date = date("Y-m-d H:i:s");
	  }
		 
	  // speichern und aufräumen
	  $sql = "UPDATE counter_values SET day_id = '$day_id', day_value = '$day_value', yesterday_id = '$yesterday_id', yesterday_value = '$yesterday_value', week_id = '$week_id', week_value = '$week_value', month_id = '$month_id', month_value = '$month_value', year_id = '$year_id', year_value = '$year_value', all_value = '$all_value', record_date = '$record_date', record_value = '$record_value' WHERE id = 1";
	  mysqli_query($link, $sql);  	  
   }	  
	  	
?>
    <div style="padding:2px;width:100%;font-size:80%;font-weight:bold;">
        Visitor Statistics
    </div>
   <div style="padding:2px;width:100%;font-size:80%;">
      &raquo; <?php echo $online; ?> Online<br />
      &raquo; <?php echo $month_value; ?> Month<br />
      &raquo; <?php echo $all_value; ?> Total
   </div>
<?php
}
?>