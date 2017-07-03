<?php
include_once('./_common.php');
//대소문자변경6


$data = iconv('euc-kr', 'utf-8', $_POST['data']);
$arr = json_decode($data,true);



function process($data) {
	global $sqli;
	
	$cluster_id = $data['cluster_id'];
	$node_id = $data['node_id'];
	
	/* 회원정보 수정 */
	$common_sql = "	DELETE FROM 	mms_node
									WHERE		cluster_id = '$cluster_id'
									AND			node_id = '$node_id'
	";
	echo $common_sql;
	
	return $sqli->query($common_sql);
}


/* 단일레코드일때 */
if( strlen($arr['cluster_id']) > 2 ) {
	$data = $arr;
	$result = process($data);
}

//복수는 잘동작
else {	/* 복수레코드일때 */
	for($i = 0; $i < count($arr); $i++) {
		$data = $arr[$i];
		$result = process($data);
	}
}


if($result) {
	$json[success] = "true";
	$json[message] = '노드가 삭제되었습니다';
}
else {
	$json[success] = "false";
	$json[message] = '노드가 삭제되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>