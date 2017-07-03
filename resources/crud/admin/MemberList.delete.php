<?php
include_once('./_common.php');
//대소문자변경4

//스트립슬래시를 안하면 json_decode가 안됨
$data = iconv('euc-kr', 'utf-8', $_POST['data']);
$arr = json_decode($data,true);


function process($data) {
	global $sqli;
	
	$cluster_id = $data['cluster_id'];
	$mb_id = $data['mb_id'];

	/* 회원정보 수정 */
	$common_sql = "	DELETE FROM	mms_member
									WHERE		cluster_id = '$cluster_id'
									AND			mb_id = '$mb_id' 
	";
	
	return $sqli->query($common_sql);
}


/* 단일레코드일때 */
if( strlen($arr[mb_id]) > 2 ) {
	$data = $arr;
	$result = process($data);
}
else {	/* 복수레코드일때 */
	for($i = 0; $i < count($arr); $i++) {
		$data = $arr[$i];
		$result = process($data);
	}
}


if($result) {
	$json[success] = "true";
	$json[message] = '회원정보가 삭제되었습니다';
} else {
	$json[success] = "false";
	$json[message] = '회원정보가 삭제되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>