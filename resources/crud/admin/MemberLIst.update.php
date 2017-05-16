<?php
include_once('./_common.php');


//스트립슬래시를 안하면 json_decode가 안됨

//print_r($_POST['data']);
$data = iconv('euc-kr', 'utf-8', $_POST['data']);
$arr = json_decode($data,true);


//print_r(json_decode($data,true));

//$data2 = iconv('utf-8', 'euc-kr',  $_POST['data']);


//print_r(json_decode($data2,true));
//echo "//////////////////////////////////////////////";
//$arr1 = jsonDecode($data1);
//$arr2 = jsonDecode($data2);
//print_r($arr1);
//print_r($arr2);
//echo iconv("EUC-KR", "UTF-8",  $arr[mb_name]);
//$arr[mb_name] = iconv("EUC-KR", "UTF-8",  $arr[mb_name]);
//echo iconv('utf-8', 'euc-kr',  $arr[mb_name]);


function process($data) {
	global $sqli;
	
	$cluster_id = $data['cluster_id'];
	$mb_company = $data['mb_company'];
	$mb_id = $data['mb_id'];
	$mb_password = $data['mb_password'];
	$mb_name = $data['mb_name'];
	$mb_hp = $data['mb_hp'];
	$mb_email = $data['mb_email'];
	$mb_level = $data['mb_level'];
	$reg_date = $data['reg_date'];

	/* 회원정보 수정 */
	$common_sql = "	UPDATE	mms_member	SET
														cluster_id	= '$cluster_id',	/*그룹ID(계열사가 사용할 그룹ID, 소속회사명 보고 클러스터id 연결해줘야함)*/
														mb_company	= '$mb_company',	/*소속회사명(키값은 아님)*/
														mb_id				= '$mb_id',				/*계정ID*/
														mb_name			= '$mb_name',			/*회원명*/
														mb_hp				= '$mb_hp',				/*회원 연락처*/
														mb_email		= '$mb_email',		/*회원 이메일*/
														mb_level		= '$mb_level'			/*1레벨 일반회원, 10레벨 관리자*/
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
	$json[message] = '회원정보가 수정되었습니다';
} else {
	$json[success] = "false";
	$json[message] = '회원정보가 수정되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>