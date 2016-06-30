<?php
    header('Access-Control-Allow-Origin: *');
    require_once("db.php");

    date_default_timezone_set("Asia/Kolkata");
    if(isset($_POST["sid"]) && isset($_POST["sname"]) && isset($_POST["srole"]) && isset($_POST["rrole"]) && isset($_POST["file"]) && isset($_POST["msg"]))
    {
    	$sid = $_POST["sid"];
    	$sname = $_POST["sname"];
    	$srole = $_POST["srole"];
    	$rrole = $_POST["rrole"];
        $file = $_POST["file"];
    	$msg = $_POST["msg"];
    	$date = date("d/m/y");
    	$time = date("h:i:sa");
    	$query = mysql_query("INSERT INTO `notification` (`scid`,`s_name`,`s_role`,`r_role`,`content`,`msg`,`server_date`,`server_time`) VALUES ('$sid','$sname','$srole','$rrole','$file','$msg','$date','$time')") OR die(mysql_error());
    	if($query)
    	{
    		echo "1";
    	}
    	else
    	{
    		echo "0";

    	}
    }
   	if(isset($_POST["r_role"]))
    {	
    	$r_role = $_POST["r_role"];
    	$query = mysql_query("SELECT *FROM `notification` WHERE `r_role` = '$r_role'") OR die(mysql_error());
    	if(mysql_num_rows($query) > 0)
    	{
    		while ($row = mysql_fetch_array($query))
    		{
                $arr_notification[] = array("s_name"=>$row[2],"s_role"=>$row[3],"msg"=>$row[6],"date"=>$row[7],"time"=>$row[8],"file"=>urlencode($row[5]));
    		}
    		$encode = json_encode($arr_notification);
    		print_r($encode);
    	}
    	else
    	{
    		echo "0";

    	}
    }
?>