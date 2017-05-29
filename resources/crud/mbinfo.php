<?php
include "_common.php";
$json = array();
$data = array();


$mb_id = $_SESSION['mb_id'];

$SELECT_SQL = "	SELECT	MB.cluster_id,	/*그룹ID(계열사가 사용할 그룹ID, 소속회사명 보고 클러스터id 연결해줘야함)*/
												MB.mb_type,
												MB.mb_company,	/*소속회사명(키값은 아님)*/
												MB.mb_id,	/*계정ID*/
												MB.mb_name,	/*회원명*/
												MB.mb_hp,	/*회원 연락처*/
												MB.mb_email,	/*회원 이메일*/
												MB.mb_level,	/*1레벨 일반회원, 10레벨 관리자*/
												MB.reg_date,
												MC.api_key,
												MC.api_id,
												MB.mb_type,
												CD.code_name AS mb_type_name
								FROM		mms_member MB
												LEFT JOIN mms_cluster MC ON (MC.cluster_id = MB.cluster_id)
												LEFT JOIN codes CD ON (CD.dbtable = 'mms_member' AND CD.col = 'mb_type' AND CD.code = MB.mb_type)
								WHERE		1=1
								AND			MB.mb_id = '$mb_id'
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