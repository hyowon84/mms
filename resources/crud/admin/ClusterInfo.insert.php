<?php
include_once('./_common.php');


function process($_POST) {
	global $sqli;
	
	$cluster_id = $_POST['cluster_id'];
	$cluster_name = $_POST['cluster_name'];
	$api_key = $_POST['api_key'];
	$api_id = $_POST['api_id'];
	
	/* 클러스터 정보 입력 */
	$common_sql = "	INSERT	mms_cluster	SET
															cluster_id = '$cluster_id',	/*노드를 묶는 단위*/
															cluster_name = '$cluster_name',	/*클러스터명*/
															api_key = '$api_key',	
															api_id = '$api_id',
															reg_date = NOW()
	";
	$result = $sqli->query($common_sql);
	return $result;
}

if(process($_POST)) {
	$json[success] = "true";
	$json[message] = '클러스터 정보가 입력되었습니다';
}
else {
	$json[success] = "false";
	$json[message] = '클러스터 정보가 입력되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>