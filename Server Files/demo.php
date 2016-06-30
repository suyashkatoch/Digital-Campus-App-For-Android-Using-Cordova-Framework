<?php
    header('Access-Control-Allow-Origin: *');
    require_once("db.php");

    # 1 as Success and 0 as faliure

    #Login the user
    if(isset($_POST['cid'] ) && isset($_POST['password']))
    {
	     $college_id = $_POST['cid'];
	     $password = md5($_POST['password']);
	     $user = mysql_query("select `cid`,`psw` from `userinfo` where `cid`='$college_id' AND `psw`='$password'") or die(mysql_error());
	     if($user)
       {
         $res = mysql_num_rows($user);
         if($res > 0)
		      echo "1";
		     else
          echo "0";	
	     }
	     else
		      echo "Error";
    }
    if(isset($_POST["success"]))
    {
	   $id = $_POST["success"];
	   $query = mysql_query("select * from `userinfo` where `cid`='$id'") or die(mysql_error());
       if($query)
       {
		      while($row = mysql_fetch_array($query))
          {
		        $arr[] = array("cid"=>$row[0],"name"=>$row[2],"dept"=>$row[13], "role"=>$row[14]);
		      }
	     }
       $x = json_encode($arr);
       print_r($x);
    }

    #Creating the account
    if(isset($_POST['cid_usn']) && isset($_POST['pswd']))
    {
      $cid = strtoupper($_POST['cid_usn']);
      $psw = md5($_POST['pswd']);
      $check_ifExist = mysql_query("select * from `userinfo` where `cid` = '$cid'")  or die(mysql_error());
      if(mysql_num_rows($check_ifExist)>0)
      {
        echo "0";
      }
      $table_name = mysql_real_escape_string($cid);
      if(mysql_query("DESCRIBE `".$table_name."`")) 
      { 
        $drop_table = mysql_query("drop table `".$table_name."`");
        echo "1";
      }
      else 
      {

        $query_create_table = mysql_query("CREATE TABLE IF NOT EXISTS `".$table_name."`(cid varchar(14) , pswd varchar(40))") or die(mysql_error());
        $insert_into_table = mysql_query("insert into `".$table_name."`(`cid`,`pswd`) values ('$cid', '$psw')") or die(mysql_error());

        if($query_create_table && $insert_into_table)
        {
          echo "2";
        }
        else 
        {
          echo "3";
        }
      }
    }
    if(isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['pa']) && isset($_POST['la']) && isset($_POST['father_name']) && isset($_POST['mother_name']) && isset($_POST['f_m_phone']) && isset($_POST['ll_phone']) && isset($_POST['own_phone']) && isset($_POST['email']) && isset($_POST['govt_id']) && isset($_POST['branch_val']) && isset($_POST['role']) && isset($_POST['table_name']))
    {
        $fname = strtoupper($_POST['fname']);
        $lname = strtoupper($_POST['lname']);
        $pa = strtoupper($_POST['pa']);
        $la = strtoupper($_POST['la']);
        $father_name = strtoupper($_POST['father_name']);
        $mother_name = strtoupper($_POST['mother_name']);
        $f_m_phone = $_POST['f_m_phone'];
        $ll_phone = $_POST['ll_phone'];
        $own_phone = $_POST['own_phone'];
        $email = $_POST['email'];
        $govt_id = strtoupper($_POST['govt_id']);
        $branch_val = strtoupper($_POST['branch_val']);
        $role = strtoupper($_POST['role']);
        $table_name = mysql_real_escape_string($_POST['table_name']);
        $query1 = mysql_query("insert into `userinfo` (`cid`,`psw`) select `cid`, `pswd` from  `".$table_name."`") or die(mysql_error());
        $sample = mysql_query("update `userinfo` set `fname` = '$fname', `lname` = '$lname', `p_address` = '$pa',`l_address` = '$la',`father_name` = '$father_name',`mother_name` = '$mother_name',`f_m_contact` = '$f_m_phone',`ll_contact` = '$ll_phone',`own_contact` = '$own_phone',`email` = '$email',`govt_id` = '$govt_id',`department` = '$branch_val', `role` = '$role'  where `cid` = '$table_name' ") or die(mysql_error());

        if($query1 && $sample)
        {
            $query = mysql_query("drop table `".$table_name."`");
            echo "0"; 
        }
        else
        {
          echo "1";
        }

    }

#For Student profile---------------------------------------------------------------------------------------------------------------------------
    #QR-code generator..

    if(isset($_POST["colg_id"]))
    {
        
        $id = $_POST["colg_id"];
        $query = mysql_query("select * from `accounts_bool` where `cid` = '$id'") or die(mysql_error());
        if(mysql_num_rows($query) > 0)
        {
          while($row = mysql_fetch_array($query))
          {
              $arr_for_no_due[] = array("cid"=>$row[0],"colg_fee"=>$row[1],"hostel_fee"=>$row[2], "transport_fee"=>$row[3]);
          }
        }
        if(!empty($arr_for_no_due))
        {    
          if($arr_for_no_due[0]['colg_fee'] == '1' && ($arr_for_no_due[0]['hostel_fee'] == '1') || empty($arr_for_no_due[0]['hostel_fee']) && ($arr_for_no_due[0]['treansport_fee'] == '1') || empty($arr_for_no_due[0]['transport_fee']))
          {
            echo "1";
          }
        }
        else
          echo "0";
    }

    #List Student Marks..
    if(isset($_POST["my_usn"]) && isset($_POST["year"]) && isset($_POST["sem_val"]))
    {
      $usn = $_POST["my_usn"];
      $acadamic_year = $_POST["year"];
      $sem = $_POST["sem_val"];
      $search_marks = mysql_query("select * from `semList` where `usn` = '$usn' and `accd_year` = '$acadamic_year' and `semester_class` = '$sem'") or die(mysql_error());
      if(mysql_num_rows($search_marks) > 0)
      {
        while($row = mysql_fetch_array($search_marks))
        {
          $arr_of_marks[] = array("sub_name"=>$row[5],"t1"=>$row[7],"t2"=>$row[8],"t3"=>$row[9]);
        }
      }
      $my_marks = json_encode($arr_of_marks);
      print_r($my_marks);
    }
    

    #Search book in library..
    if(isset($_POST["search_libraby_key"]))
    {
      $search_book = $_POST["search_libraby_key"];
      $isFound = mysql_query("select * from `library_data` where `book_name` = '$search_book' OR `author1` = '$search_book' OR `author2` = '$search_book' OR `author3` = '$search_book' OR `author4` = '$search_book' OR `isbn` = '$search_book'") or die(mysql_error());
      if(mysql_num_rows($isFound) != 0)
          echo "1";
         else
          echo "0";
    }

    if (isset($_POST["libraby_search_key"])) 
    {
      $search_book = $_POST["libraby_search_key"];
      $query = mysql_query("select * from `library_data` where `book_name` = '$search_book' OR `author1` = '$search_book' OR `author2` = '$search_book' OR `author3` = '$search_book' OR `author4` = '$search_book' OR `isbn` = '$search_book'") or die(mysql_error());
      if($query)
      {
        while($row = mysql_fetch_array($query))
        {
        
          $arr_for_search_libraby_book[] = array("isbn"=>$row[0],"book_name"=>$row[1],"author1"=>$row[2], "author2"=>$row[3],"author3"=>$row[4],"author4"=>$row[5],"publisher"=>$row[6],"edition"=>$row[7],"book_left"=>$row[8]);
        }
      }

      $book_search = json_encode($arr_for_search_libraby_book);
      print_r($book_search);
    }


    #Display my books
    if (isset($_POST["cid_mybooks"])) 
    {
      $id = $_POST["cid_mybooks"];
      $libraby_user = mysql_query("select * from `user_library` where `cid` = '$id' ") or die(mysql_error());
      if(mysql_num_rows($libraby_user) != 0)
          echo "1";
         else
          echo "0";
    }

    if (isset($_POST["myBooksearch_key"])) 
    {
      $my_books_cid = $_POST["myBooksearch_key"];
      $query = mysql_query("select * from `user_library` where `cid` = '$my_books_cid' ") or die(mysql_error());
      if($query)
      {
        while($row = mysql_fetch_array($query))
        {
              $arr_my_books[] = array("book1"=>$row[5],"isbn1"=>$row[6],"book2"=>$row[7],"isbn2"=>$row[8],"book3"=>$row[9],"isbn3"=>$row[10],"book1_issueDate"=>$row[11],"book2_issueDate"=>$row[12],"book3_issueDate"=>$row[13],"book1_lastDate"=>$row[14],"book2_lastDate"=>$row[15],"book3_lastDate"=>$row[16],"book_request"=>$row[17],"book_request_time_start"=>$row[18],"book_request_time_over"=>$row[19],"fine"=>$row[20]);
        }
      }      
      $my_books = json_encode($arr_my_books);
      print_r($my_books);
    }

#For Teacher,HOD and Principal profile---------------------------------------------------------------------------------------------------------------------------
    #For Saving class information
    if((isset($_POST["teacher_cid_t"]) && isset($_POST["acadamic_year_t"])) || (isset($_POST["semester_class1_val_t"]) && isset($_POST["subject_name1_t"]) && isset($_POST["subject_code1_t"])) || (isset($_POST["semester_class2_val_t"]) && isset($_POST["subject_name2_t"]) && isset($_POST["subject_code2_t"]))) 
    {
      $cid = $_POST["teacher_cid_t"];                   
      $acadamic_year = $_POST["acadamic_year_t"];
      $semester_class1_val = $_POST["semester_class1_val_t"];
      $subject_name1 = strtoupper($_POST["subject_name1_t"]);
      $subject_code1 = strtoupper($_POST["subject_code1_t"]);
      $semester_class2_val = strtoupper($_POST["semester_class2_val_t"]);
      $subject_name2 = strtoupper($_POST["subject_name2_t"]);
      $subject_code2 = strtoupper($_POST["subject_code2_t"]);
      if(empty($subject_name1) && empty($subject_code1))
      {
        $semester_class1_val = "Dont Take any semester";
        $subject_name1 = "No subject taken";
        $subject_code1 = "No code";
      }
      if(empty($subject_name2) && empty($subject_code2))
      {
        $semester_class2_val = "Dont Take any semester";
        $subject_name2 = "No subject taken";
        $subject_code2 = "No code";
      }
      $insert_teacher_class = mysql_query("INSERT into `semlistTeacher` (`cid`,`accd_year`,`semNum1`,`subject_name1`,`subject_code1`,`semNum2`,`subject_name2`,`subject_code2`) values ('$cid','$acadamic_year','$semester_class1_val','$subject_name1','$subject_code1','$semester_class2_val','$subject_name2','$subject_code2')") or die(mysql_error());
      if($insert_teacher_class)
      {
        echo "1";
      }
      else
      {
        #echo "0";
        echo $insert_teacher_class;
      }
    }
    
    #Entering Student name and usn into database
    if(isset($_POST["usn"]) && isset($_POST["name"]) && isset($_POST["cid_teacher"]) && isset($_POST["semester_class"]))
    {
      $usn = strtoupper($_POST["usn"]);
      $name = strtoupper($_POST["name"]);
      $cid = strtoupper($_POST["cid_teacher"]);
      $semester_class = $_POST["semester_class"];
      $insert_query = mysql_query("insert into `semList` (`cid`,`usn`,`name`,`semester_class`) values ('$cid','$usn','$name','$semester_class')") or die(mysql_error());
        
      $update_query = mysql_query("UPDATE semList SL, semlistTeacher SLT SET SL.accd_year = SLT.accd_year, SL.subject_name = SLT.subject_name1, SL.subject_code = SLT.subject_code1 WHERE SL.semester_class = SLT.semNum1") or die(mysql_error());
      if($insert_query  && $update_query)
      {
        echo "1";
      }
      else
      {
        echo "0";
      }
    }

    #Displaying the student list..
    if(isset($_POST["semester_class"]) && isset($_POST["cid"]))
    {
      $sem_name = $_POST["semester_class"];
      $cid = $_POST["cid"];
      $search_query = mysql_query("select * from `semList` where `cid` = '$cid' and `semester_class` = '$sem_name'") or die(mysql_error());
      if(mysql_num_rows($search_query) > 0)
      {
        while($row = mysql_fetch_array($search_query))
        {
          $arr_my_student[] = array("usn"=>$row[1]);
        }
        $student_list = json_encode($arr_my_student);
        print_r($student_list);
      }
      else
      {
        echo "0";
      }
      
    }

    #Entering student marks..
    if((isset($_POST["t1"]) || isset($_POST["t2"]) || isset($_POST["t1"])) && isset($_POST["semester_class_for_marks"]) && isset($_POST["usn_student"]))
    {
      $t1 = strtoupper($_POST["t1"]);
      $t2 = strtoupper($_POST["t2"]);
      $t3 = strtoupper($_POST["t3"]);
      $sem_name = $_POST["semester_class_for_marks"];
      $cid = $_POST["usn_student"];
      if(!empty($t1) && !empty($t2) && !empty($t3))
      {
          $insert_marks = mysql_query("update `semList` set  `t1` = '$t1', `t2` = '$t2', `t3` = '$t3' where `cid` = '$cid' and `semester_class` = '$sem_name'") or die(mysql_error());
          if($insert_marks)
          {
            echo "1";
          } 
          else
          {
            echo "0";
          }  
      }
      else if(!empty($t1) && empty($t2) && empty($t3))
      {
          $insert_marks = mysql_query("update `semList` set  `t1` = '$t1' where `cid` = '$cid' and `semester_class` = '$sem_name'") or die(mysql_error());
          if($insert_marks)
          {
            echo "1";
          } 
          else
          {
            echo "0";
          }  
      }
      else if(empty($t1) && !empty($t2) && empty($t3))
      {
          $insert_marks = mysql_query("update `semList` set  `t2` = '$t2' where `cid` = '$cid' and `semester_class` = '$sem_name'") or die(mysql_error());
          if($insert_marks)
          {
            echo "1";
          } 
          else
          {
            echo "0";
          }  
      }
      else if(empty($t1) && empty($t2) && !empty($t3))
      {
          $insert_marks = mysql_query("update `semList` set  `t3` = '$t3' where `cid` = '$cid' and `semester_class` = '$sem_name'") or die(mysql_error());
          if($insert_marks)
          {
            echo "1";
          } 
          else
          {
            echo "0";
          }  
      }
      
    }


  #For Principal Searching Marks---------------------------------------------------------------------------------------------------------------
    #Search Anyone Marks
    if(isset($_POST["search_query_principal"]) && isset($_POST["role_p"]))
    {
      $search = strtoupper($_POST["search_query_principal"]);
      $role = $_POST["role_p"];
      $year = "2015-2016";
      if($role == "PRINCIPAL")
      {
        $search_marks_query = mysql_query("select * from `semList` where `cid` = '$search'  and `accd_year` = '$year'") or die(mysql_error());
        if(mysql_num_rows($search_marks_query) > 0)
        {
          while($row = mysql_fetch_array($search_marks_query))
          {
            $arr_search_marks[] =  array("name"=>$row[2],"sem"=>$row[3],"subject"=>$row[5],"t1"=>$row[7],"t2"=>$row[8],"t3"=>$row[9]);
          }
          $search_json = json_encode($arr_search_marks);
          print_r($search_json);
        }
      }
      else
      {
        echo "0";
      }
    }
  #For HOD Searching Marks---------------------------------------------------------------------------------------------------------------
    #Search Anyone Marks
    if(isset($_POST["search_query_hod"]) && isset($_POST["role_h"]))
    {
      $search = strtoupper($_POST["search_query_hod"]);
      $role = $_POST["role_h"];
      $year = "2015-2016";
      if($role == "HOD")
      {
        $search_marks_query = mysql_query("select * from `semList` where `cid` = '$search' and `accd_year` = '$year'") or die(mysql_error());
        if(mysql_num_rows($search_marks_query) > 0)
        {
          while($row = mysql_fetch_array($search_marks_query))
          {
            $arr_search_marks[] =  array("name"=>$row[2],"sem"=>$row[3],"subject"=>$row[5],"t1"=>$row[7],"t2"=>$row[8],"t3"=>$row[9]);
          }
          $search_json = json_encode($arr_search_marks);
          print_r($search_json);
        }
      }
      else
      {
        echo "0";
      }
    }

    #For Teacher Searching Marks---------------------------------------------------------------------------------------------------------------
    #Search Anyone Marks
    if(isset($_POST["search_query_teacher"]) && isset($_POST["role_t"]))
    {
      $search = strtoupper($_POST["search_query_teacher"]);
      $role = $_POST["role_t"];
      $year = "2015-2016";
      if($role == "TEACHER" || $role == "HOD" || $role == "PRINCIPAL")
      {
        $search_marks_query = mysql_query("select * from `semList` where `usn` = '$search' and `accd_year` = '$year'") or die(mysql_error());
        if(mysql_num_rows($search_marks_query) > 0)
        {
          while($row = mysql_fetch_array($search_marks_query))
          {
            $arr_search_marks[] =  array("name"=>$row[2],"sem"=>$row[3],"subject"=>$row[5],"t1"=>$row[7],"t2"=>$row[8],"t3"=>$row[9]);
          }
          $search_json = json_encode($arr_search_marks);
          print_r($search_json);
        }
      }
      else
      {
        echo "0";
      }
    }
?>