<?php
include_once('_common.php');


if($mode == 'check') {
	$mb_id = $_POST['mb_id'];
	$mb_password = $_POST['mb_password'];
	
	$sql = "	SELECT	MM.*,
										MC.*
						FROM		mms_member MM
										LEFT JOIN mms_cluster MC ON (MC.cluster_id = MM.cluster_id)
						WHERE		mb_id = '$mb_id'
						AND			mb_password = password('$mb_password')
	";
	$chk = $sqli->query($sql);
	

	if($chk->num_rows > 0) {
		$mb = $chk->fetch_array();
		set_session('mb_id', $mb['mb_id']);
		set_session('mb_type', $mb['mb_type']);
		set_session('mb_name', $mb['mb_name']);
		set_session('cluster_id', $mb['cluster_id']);
		set_session('api_key', $mb['api_key']);
		set_session('api_id', $mb['api_id']);
		
		alert('로그인 되었습니다','/');
	}
	else if($chk->num_rows == 0) {
		alert('패스워드가 일치하지 않습니다','/');
		
	}
	else {
		alert('에러');
	}
}

?>
<!DOCTYPE HTML>
<html manifest="">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
	<title>root폴더</title>
	<style>
		.login { border:1px solid #CCCCCC; }
	</style>
</head>
<body>

<form action="login.php?mode=check" method="post">
	
<table class="login" width="350" height="130" align="center" style="margin:0px auto; margin-top:300px;">
	<tr>
		<td colspan="2" align="center">
			미르헨지 MMS
		</td>
	</tr>
	<tr>
		<td>ID</td>
		<td><input type="text" name="mb_id" /></td>
	</tr>
	<tr>
		<td>PASSWORD</td>
		<td><input type="password" name="mb_password" /></td>
	</tr>
	<tr>
		<td colspan="2" align="center">
			<button>로그인</button>
		</td>
	</tr>
</table>
</form>
</body>
</html>
