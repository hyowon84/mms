<?php
include_once('./_common.php');


//스트립슬래시를 안하면 json_decode가 안됨
$data = iconv('utf-8', 'euc-kr', $_POST['data']);
$arr = json_decode($data,true);


function process($data) {
	global $sqli, $cluster_id;
	
	$node_id = $data['node_id'];
	$no = $data['no'];
	
	/* 회원정보 수정 */
	/*
			cluster_id : 노드를 묶는 단위
			node_name : 노드별칭
			node_os : 노드의 OS ( LINUX, WINDOW )
			node_type : 노드의 유형 VM(Virtual Machine), BM(Baremetal)
			manager_ip : 소속된 매니저서버의 IP(노드IP주소가 아님)
			node_ip : 노드IP 주소
			node_level : 그룹 등급
			upd_date : 갱신일
	*/
	
	foreach($data AS $key => $val) {
		if(strlen($key) > 3 && strlen($val) >= 0 && !strstr($key,'date') && !strstr($key,'id') )
			$컬럼조합 .= " {$key} = '$val', ";
		else if(strstr($key,'date')) {
			$컬럼조합 .= " {$key} = '".date("Y-m-d H:i:s",$val)."', ";
		}
	}
	
	$common_sql = "	UPDATE	mms_except_time	SET
														$컬럼조합
														node_id = '$node_id',
														reg_date = NOW()
									WHERE		cluster_id = '$cluster_id'
									AND			no = '$no'
	";
	
	$result = $sqli->query($common_sql);

	return $result;
}


/* 단일레코드일때 */
if( strlen($arr['id']) > 2 ) {
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
}
else {
	$json[success] = "false";
	$json[message] = '회원정보가 수정되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>