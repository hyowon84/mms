<?php
$my['host'] = 'localhost';
$my['user'] = 'root';
$my['password'] = '';
$my['dbs'] = 'db_example';

$con = mysql_connect($my['host'],$my['user'],$my['password']);
if(!$con){
	echo "Connection failed!";
	mysql_error();	
}
mysql_select_db($my['dbs'])or die("Database not found".mysql_error());
?>