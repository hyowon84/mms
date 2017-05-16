<?php
$response=array();
include('../inc/connection.php');

$username=$_POST['txtUsername'];
$password=$_POST['txtPassword'];

$query=mysql_query("select * from tb_user where user_name='".$username."' AND user_password='".$password."'")or die(mysql_error());
if($query){
	$row=mysql_num_rows($query);
	if($row>0){
		$response = array('success'=>true, 'data'=>true);	
	}else{
		$response = array('success'=>false,'data'=>true);	
	}
}else{
	$response = array('success'=>false	,'data'=>false);
}
echo json_encode($response);

?>