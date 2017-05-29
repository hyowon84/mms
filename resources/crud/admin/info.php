<?php
include "_common.php";
$json = array();
$data = array();

/* REMOTE SORT */
$sort = json_decode(str_replace('\"','"',$_GET['sort']),true);

for($i = 0; $i < count($sort); $i++) {
	if($i == 0) {
		$ORDER_BY = "ORDER BY ".$sort[$i]['property']." ".$sort[$i]['direction'];
	}
	else {
		$ORDER_BY .= ",".$sort[$i]['property']." ".$sort[$i]['direction'];
	}
}


$start = ($start) ? $start : 0;
$limit = ($limit) ? $limit : 50;

$AND_SQL = "";

$cluster_id = $_SESSION['cluster_id'];
$mb_id = $_SESSION['mb_id'];


/* 회원목록 */
if($_GET['mode'] == 'MemberList') {
	switch($_SESSION['mb_type']) {
		case 'M00':	//관리자계정
			break;
		case 'M10':	//마스터계정
			$AND_SQL = "	AND		MB.cluster_id = '$cluster_id'
										AND		MB.mb_id != '$mb_id'		";
			break;
		default:		//
			$AND_SQL = "	AND		MB.cluster_id = '$cluster_id'
										AND		MB.mb_id = '$mb_id'			";
			break;
	}
	
	/* 노드 목록 추출 */
	$SELECT_SQL = "	SELECT	MB.cluster_id,		/*그룹ID(계열사가 사용할 그룹ID, 소속회사명 보고 클러스터id 연결해줘야함)*/
													MB.mb_company,		/*소속회사명(키값은 아님)*/
													MB.mb_id,					/*계정ID*/
													MB.mb_password,		/*암호*/
													MB.mb_name,				/*회원명*/
													MB.mb_hp,					/*회원 연락처*/
													MB.mb_email,			/*회원 이메일*/
													MB.mb_level,			/*1레벨 일반회원, 10레벨 관리자*/
													MB.reg_date,	
													MC.cluster_name,	/*클러스터(그룹) 이름,   ex) 삼성*/
													MC.api_key,				/*소프트레이어API 키*/
													MC.api_id,					/*소프트레이어API ID*/
													MB.mb_type,
													CD.code_name AS mb_type_name
									FROM		mms_member MB
													LEFT JOIN mms_cluster MC ON (MC.cluster_id = MB.cluster_id)
													LEFT JOIN codes CD ON (CD.dbtable = 'mms_member' AND CD.col = 'mb_type' AND CD.code = MB.mb_type)
									WHERE		1=1
									$AND_SQL
	";
}
else if($_GET['mode'] == 'ClusterList') {
	/* 노드 목록 추출 */
	$SELECT_SQL = "	SELECT	*
									FROM		mms_cluster
									WHERE		1=1
									$AND_SQL
	";
}
else if($_GET['mode'] == 'NodeList') {
	/* 노드 목록 추출 */
	$SELECT_SQL = "	SELECT	*
									FROM		mms_node
									WHERE		1=1
									$AND_SQL
	";
}

$result = $sqli->query($SELECT_SQL);
$total_count = $result->num_rows;
//$result->free();


/* */
$main_sql = "	$SELECT_SQL
							$ORDER_BY
							LIMIT $start, $limit
";
$ob = $sqli->query($main_sql);




while($row = $ob->fetch_array()) {
	
	foreach($row as $key => $val) {
//		$row[$key] = 개행문자삭제($val);
		if($key == 'gp_realprice') $row[$key] = CEIL($val / 100) * 100;
	}
	array_push($data, $row);
}

if($total_count > 0) {
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