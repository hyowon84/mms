<?php
/**
 * Created by PhpStorm.
 * User: lucael
 * Date: 2017-02-27
 * Time: 오후 12:06
 */


/*실서버*/
include_once('_common.php');

$time = time();

header("Content-Type: text/html; charset=UTF-8");




//리눅스용 따로, 윈도우용 따로. (둘의 최종데이터의 수집시간 편차가 5분~10분 차이남)
$CPU_SQL = " SELECT	MDC.cluster_id,
										MDC.node_id,
										AVG(MDC.D1) AS AVG_D1,
										MN.sms_cpu_w,
										MN.sms_cpu_c,
										MN.sms_cpu_f,
										IF( MN.sms_cpu_w = 1 && AVG(MDC.D1) >= 70 && AVG(MDC.D1) < 80, 1, 0 ) AS CPU_W,
										IF( MN.sms_cpu_c = 1 && AVG(MDC.D1) >= 80 && AVG(MDC.D1) < 90, 1, 0 ) AS CPU_C,
										IF( MN.sms_cpu_f = 1 && AVG(MDC.D1) >= 90 && AVG(MDC.D1) <= 100, 1, 0 ) AS CPU_F,				
										M.MAX_DATE
						FROM		mms_data_cpu_min MDC
										LEFT JOIN mms_node MN ON (MN.cluster_id = MDC.cluster_id AND MN.node_id = MDC.node_id)
										,(	SELECT	MAX(MC.m_date) AS MAX_DATE
												FROM		mms_data_cpu_min MC
																LEFT JOIN mms_node MN ON (MN.cluster_id = MC.cluster_id AND MN.node_id = MC.node_id)
												WHERE		1=1
												AND			MN.node_os = 'O00'
												LIMIT 1
										) M
						WHERE		1=1
						AND			MDC.m_date <= M.MAX_DATE
						AND			MDC.m_date >= DATE_ADD( M.MAX_DATE, INTERVAL -5 MINUTE)
						GROUP BY MDC.cluster_id, MDC.node_id
";
$result = $sqli->query($CPU_SQL);


while($row = $result->fetch_array()) {
	if($row['CPU_F'])
		echo $row[cluster_id]."-".$row[node_id]." CPU사용률".$row[AVG_D1]."% FATAL<br>";
	else if($row['CPU_C'])
		echo $row[cluster_id]."-".$row[node_id]." CPU사용률".$row[AVG_D1]."% CRITICAL<br>";
	else if($row['CPU_W'])
		echo $row[cluster_id]."-".$row[node_id]." CPU사용률".$row[AVG_D1]."% WARNING<br>";
}



//윈도우용 따로. (둘의 최종데이터의 수집시간 편차가 5분~10분 차이남)
$CPU_SQL = " SELECT	MDC.cluster_id,
										MDC.node_id,
										AVG(MDC.D1) AS AVG_D1,
										MN.sms_cpu_w,
										MN.sms_cpu_c,
										MN.sms_cpu_f,
										IF( MN.sms_cpu_w = 1 && AVG(MDC.D1) >= 70 && AVG(MDC.D1) < 80, 1, 0 ) AS CPU_W,
										IF( MN.sms_cpu_c = 1 && AVG(MDC.D1) >= 80 && AVG(MDC.D1) < 90, 1, 0 ) AS CPU_C,
										IF( MN.sms_cpu_f = 1 && AVG(MDC.D1) >= 90 && AVG(MDC.D1) <= 100, 1, 0 ) AS CPU_F,				
										M.MAX_DATE
						FROM		mms_data_cpu_min MDC
										LEFT JOIN mms_node MN ON (MN.cluster_id = MDC.cluster_id AND MN.node_id = MDC.node_id)
										,(	SELECT	MAX(MC.m_date) AS MAX_DATE
												FROM		mms_data_cpu_min MC
																LEFT JOIN mms_node MN ON (MN.cluster_id = MC.cluster_id AND MN.node_id = MC.node_id)
												WHERE		1=1
												AND			MN.node_os = 'O10'
												LIMIT 1
										) M
						WHERE		1=1
						AND			MDC.m_date <= M.MAX_DATE
						AND			MDC.m_date >= DATE_ADD( M.MAX_DATE, INTERVAL -5 MINUTE)
						GROUP BY MDC.cluster_id, MDC.node_id
";
$result = $sqli->query($CPU_SQL);


while($row = $result->fetch_array()) {
	if($row['CPU_F'])
		echo $row[cluster_id]."-".$row[node_id]." CPU사용률".$row[AVG_D1]."% FATAL<br>";
	else if($row['CPU_C'])
		echo $row[cluster_id]."-".$row[node_id]." CPU사용률".$row[AVG_D1]."% CRITICAL<br>";
	else if($row['CPU_W'])
		echo $row[cluster_id]."-".$row[node_id]." CPU사용률".$row[AVG_D1]."% WARNING<br>";
}


echo '--<br />time:'.(time() - $time).' sec';

$sqli->close();
?>