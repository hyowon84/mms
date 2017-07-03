<?php
/*실서버*/
include_once('_common.php');
header("Content-Type: text/html; charset=UTF-8");

$GR_SQL = " SELECT	MG.*
						FROM		mms_node MG
						WHERE		MG.node_os = 'O00'
						ORDER BY MG.upd_date ASC
";
$gr_result = $sqli->query($GR_SQL);


//통계값을 이용
while($gr = $gr_result->fetch_array()) {
	$url_list[] = "http://localhost/sch/gag/ga_sec.php?node_id=$gr[node_id]";
}

//동시 처리시킬 URL
//$url_list = array(
//	'http://localhost/?pid=4'
//);
$time = time();



/* 3시간 이하의 데이터는 삭제 */
$sqli->query("DELETE FROM mms_data_cpu WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");
$sqli->query("DELETE FROM mms_data_memory WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");
$sqli->query("DELETE FROM mms_data_disk WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");
$sqli->query("DELETE FROM mms_data_network WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");

$sqli->query("DELETE FROM mms_data_cpu_min WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -2 MONTH)");
$sqli->query("DELETE FROM mms_data_memory_min WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -2 MONTH)");
$sqli->query("DELETE FROM mms_data_disk_min WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -2 MONTH)");
$sqli->query("DELETE FROM mms_data_network_min WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -2 MONTH)");

//$LOCKING_TB = "LOCK TABLES mms_data_cpu WRITE;
//							LOCK TABLES mms_data_memory WRITE;
//							LOCK TABLES mms_data_network WRITE;
//							LOCK TABLES mms_data_disk WRITE;";
//
//$sqli->query($LOCKING_TB);

//실행
$res = fetch_multi_url($url_list);

$sqli->query("UNLOCK TABLES;");


//결과 출력
echo '실행 결과:<pre>';
print_r($url_list);

print_r($res);
echo '</pre>';

//실행 시간
echo '--<br />time:'.(time() - $time).' sec';

$sqli->close();
?>