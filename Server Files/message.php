<?php
    header('Access-Control-Allow-Origin: *');
    require_once("db.php");

    date_default_timezone_set("Asia/Kolkata");
    if(isset($_POST["sname"]) && isset($_POST["sid"]) && isset($_POST["sbranch"]) && isset($_POST["srole"]) && isset($_POST["subject"]) && isset($_POST["message"]) && isset($_POST["toWhom"]))
    {
    	$sname = $_POST["sname"];
        $sid = $_POST["sid"];
    	$sbranch = $_POST["sbranch"];
        $srole = $_POST["srole"];
    	$subject = $_POST["subject"];
    	$message = $_POST["message"];
        $toWhom = $_POST["toWhom"];
    	$date = date("d/m/y");
    	$time = date("h:i:sa");
    	$query = mysql_query("INSERT INTO `letters` (`sname`,`scid`,`s_branch`,`s_role`,`subject`,`message`,`toWhom`,`server_date`,`server_time`) VALUES ('$sname','$sid','$sbranch','$srole','$subject','$message','$toWhom','$date','$time')") OR die(mysql_error());
    	if($query)
    	{
    		echo "1";
    	}
    	else
    	{
    		echo "0";

    	}
    }
    #For Principal Letter
    if(isset($_POST["R_Role"]))
    {
        
        $r_role = $_POST["R_Role"];
        $query = mysql_query("SELECT *FROM `letters` WHERE `toWhom` = '$r_role'") OR die(mysql_error());
        
        if(mysql_num_rows($query) > 0)
        {
            while ($row = mysql_fetch_array($query))
            {
                $arr_notification[] = array("s_name"=>$row[1],"s_id"=>$row[2],"s_branch"=>$row[3],"s_role"=>$row[4],"subject"=>$row[5],"msg"=>$row[6],"toWhom"=>$row[7],"date"=>$row[8],"time"=>$row[9]);
            }
            $encode = json_encode($arr_notification);
            print_r($encode);
        }
        else
        {
            echo "0";

        }
    }

    #For HOD Letters
   	if(isset($_POST["r_role"]) && isset($_POST["dept"]))
    {
    	
    	$r_role = $_POST["r_role"];
        $dept = $_POST["dept"];
    	$query = mysql_query("SELECT *FROM `letters` WHERE `toWhom` = '$r_role' AND `s_branch` = '$dept' ") OR die(mysql_error());
        
    	if(mysql_num_rows($query) > 0)
    	{
    		while ($row = mysql_fetch_array($query))
    		{
                $arr_notification[] = array("s_name"=>$row[1],"s_id"=>$row[2],"s_branch"=>$row[3],"s_role"=>$row[4],"subject"=>$row[5],"msg"=>$row[6],"toWhom"=>$row[7],"date"=>$row[8],"time"=>$row[9]);
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