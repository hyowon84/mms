<?php
include "_common.php";
$json = array();
$data = array();


$mb_id = $_SESSION['mb_id'];

$SELECT_SQL = "	SELECT	M.cluster_id,	/*그룹ID(계열사가 사용할 그룹ID, 소속회사명 보고 클러스터id 연결해줘야함)*/
												M.mb_company,	/*소속회사명(키값은 아님)*/
												M.mb_id,	/*계정ID*/
												M.mb_name,	/*회원명*/
												M.mb_hp,	/*회원 연락처*/
												M.mb_email,	/*회원 이메일*/
												M.mb_level,	/*1레벨 일반회원, 10레벨 관리자*/
												M.reg_date
								FROM		mms_member M
								WHERE		1=1
								AND			M.mb_id = '$mb_id'
";
$ob = $sqli->query($SELECT_SQL);


while($row = $ob->fetch_array()) {
	
	foreach($row as $key => $val) {
//		$row[$key] = 개행문자삭제($val);
		if($key == 'gp_realprice') $row[$key] = CEIL($val / 100) * 100;
	}
	array_push($data, $row);
}


if($ob->num_rows > 0) {
	$json['total'] = "$total_count";
	$json['success'] = "true";
	$json['data'] = $data;
} else {
	$json['total'] = 0;
	$json['success'] = "false";
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>