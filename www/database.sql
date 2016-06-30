CREATE TABLE IF NOT EXISTS `userinfo` (
  `cid` varchar(15),
  PRIMARY KEY(`cid`),
  `psw` varchar(40) NOT NULL,
  `fname` varchar(25),
  `lname` varchar(25),
  `p_address` varchar(350),
  `l_address` varchar(350),
  `father_name` varchar(25),
  `mother_name` varchar(25),
  `f_m_contact` varchar(13),
  `ll_contact` varchar(16),
  `own_contact` varchar(13),
  `email` varchar(50),
  `govt_id` varchar(30),
  `department` varchar(60),
  `role` varchar(10)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `semlistTeacher` (
  `cid` varchar(15) NOT NULL,
  `accd_year` varchar(10) NOT NULL,
  `semNum1` varchar(11),
  `subject_name1` varchar(40),
  `subject_code1` varchar(100),
  `semNum2` varchar(11),
  `subject_name2` varchar(40),
  `subject_code2` varchar(10)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `semList` (
  `cid` varchar(15) NOT NULL,
  `usn` varchar(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `semester_class` varchar(11) NOT NULL,
  `accd_year` varchar(9),
  `subject_name` varchar(40),
  `subject_code` varchar(10),
  `t1` int(2) DEFAULT '0',
  `t2` int(2) DEFAULT '0',
  `t3` int(2) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `library_data` (
  `isbn` bigint(13),
  PRIMARY KEY(isbn),
  `book_name` varchar(100) NOT NULL,
  `author1` varchar(25) NOT NULL,
  `author2` varchar(25),
  `author3` varchar(25),
  `author4` varchar(25),
  `publisher` varchar(40) NOT NULL,
  `edition` int(2) NOT NULL,
  `book_count` int(3)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE IF NOT EXISTS `user_library` (
  `cid` varchar(15),
  PRIMARY KEY(cid),
  FOREIGN KEY (cid) REFERENCES userinfo(cid),
  `fname` varchar(25) NOT NULL,
  `lname` varchar(25) NOT NULL,
  `department` varchar(40) NOT NULL,
  `role` varchar(10) NOT NULL,
  `book1` varchar(50),
  `isbn1` bigint(13),
  `book2` varchar(50),
  `isbn2` bigint(13),
  `book3` varchar(50),
  `isbn3` bigint(13),
  `book1_issueDate` date,
  `book2_issueDate` date,
  `book3_issueDate` date,
  `book1_lastDate` date,
  `book2_lastDate` date,
  `book3_lastDate` date,
  `book_request` varchar(50),
  `book_request_time_start` date,
  `book_request_time_over` date,
  `fine`  float(5) 
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `accounts` (
  `cid` varchar(15),
  PRIMARY KEY (`cid`),
  FOREIGN KEY (cid) REFERENCES userinfo(cid),
  `fname` varchar(25) NOT NULL,
  `lname` varchar(25) NOT NULL,
  `colg_fee` numeric(7,2) NOT NULL,
  `hostel_fee` numeric(7,2) ,
  `transport_fee` numeric(6,2)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `accounts_bool` (
  `cid` varchar(15),
  PRIMARY KEY (`cid`),
  FOREIGN KEY (cid) REFERENCES accounts(cid),
  `colg_fee` boolean NOT NULL,
  `hostel_fee` boolean,
  `transport_fee` boolean
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `notification` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `scid` varchar(15) NOT NULL,
  `s_name` varchar(10) NOT NULL,
  `s_role` varchar(11) NOT NULL,
  `r_role` varchar(11) NOT NULL,
  `content` MEDIUMBLOB,
  `msg` varchar(200) NOT NULL,
  `server_date` varchar(12) NOT NULL,
  `server_time` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `letters` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sname` varchar(30) NOT NULL,
  `scid` varchar(15) NOT NULL,
  `s_branch` varchar(5) NOT NULL,
  `s_role` varchar(11) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `message` varchar(300) NOT NULL,
  `toWhom` varchar(11) NOT NULL,
  `server_date` varchar(12) NOT NULL,
  `server_time` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


UPDATE accounts_bool 
SET accounts_bool.colg_fee = 1 , accounts_bool.colg_fee = 1,  accounts_bool.transport_fee = 1
INNER JOIN accounts ON accounts_bool.cid = accounts.cid
WHERE accounts.colg_fee = 50000.00 AND accounts.hostel_fee = 15000 AND (accounts.transport_fee = 3000 || accounts.transport_fee = NULL);