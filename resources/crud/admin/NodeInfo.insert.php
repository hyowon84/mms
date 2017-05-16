<?php
include_once('./_common.php');


function process($_POST) {
	global $sqli;

	$cluster_id = $_POST['cluster_id'];
	$node_id = $_POST['node_id'];
	$node_name = $_POST['node_name'];
	$node_os = $_POST['node_os'];
	$node_type = $_POST['node_type'];
	$manager_ip = $_POST['manager_ip'];
	$node_ip = $_POST['node_ip'];
	$node_level = $_POST['node_level'];


	/* 클러스터 정보 입력 */
	$common_sql = "	INSERT	mms_node	SET
															cluster_id = '$cluster_id',		/*노드를 묶는 단위*/
															node_id = '$node_id',					/*노드ID(계열사 클라우드 컴퓨터에 부여할 노드ID)*/
															node_name = '$node_name',	
															node_os = '$node_os',					/*노드의 OS ( LINUX, WINDOW )*/
															node_type = '$node_type',			/*노드의 유형 VM(Virtual Machine), BM(Baremetal)*/
															manager_ip = '$manager_ip',		/*소속된 매니저서버의 IP(노드IP주소가 아님)*/
															node_ip = '$node_ip',					/*노드IP 주소*/
															node_level = '$node_level',		/*그룹 등급*/
															upd_date = NOW(),
															reg_date = NOW()
	";
	$result = $sqli->query($common_sql);
	return $result;
}

if(process($_POST)) {
	$json[success] = "true";
	$json[message] = '노드 정보가 입력되었습니다';
}
else {
	$json[success] = "false";
	$json[message] = '노드 정보가 입력되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>