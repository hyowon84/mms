<?php
/**
 * Created by PhpStorm.
 * User: lucael
 * Date: 2017-02-27
 * Time: 오후 12:06
 */
include_once('_common.php');


/* 3시간 이하의 데이터는 삭제 */

$del_sql = "
DELETE FROM mms_data_cpu WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR);
DELETE FROM mms_data_memory WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR);
DELETE FROM mms_data_disk WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR);
DELETE FROM mms_data_network WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR);
";
$sqli->query($del_sql);

//$sqli->query("DELETE FROM mms_data_cpu WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");
//$sqli->query("DELETE FROM mms_data_memory WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");
//$sqli->query("DELETE FROM mms_data_disk WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");
//$sqli->query("DELETE FROM mms_data_network WHERE		m_date <= DATE_ADD(NOW(),INTERVAL -3 HOUR)");



$범위조건 = "	AND			M_date >= DATE_ADD(NOW(),INTERVAL -25 HOUR)
							AND			M_date <= DATE_ADD(NOW(),INTERVAL -1 HOUR)
						";
$범위조건 = '';
$날짜포맷 = " DATE_FORMAT(from_unixtime(M.val_x),'%e일,%k시') ";
$날짜셋팅값 = " DATE_FORMAT(M.m_date,'%Y-%m-%d %H:59:59') ";



/* Memory 시간별 데이터 */
$sql = " 			INSERT INTO mms_data_memory_hour (
																cluster_id,
																node_id,
																mdate,
																m_date,
																reg_date,
																val_x,														
																D1,
																D1_MIN,
																D1_AVG,
																D2,
																D2_MIN,
																D2_AVG,
																D3,
																D3_MIN,
																D3_AVG,
																D4,
																D4_MIN,
																D4_AVG,
																D5,
																D5_MIN,
																D5_AVG,
																D6,
																D6_MIN,
																D6_AVG,
																D7,
																D7_MIN,
																D7_AVG
											)	
													SELECT		T.*
													FROM		(	
																		SELECT	M.cluster_id,
																						M.node_id,
																						$날짜포맷 AS mdate,	/*월-일 이걸로 조인할 경우 작년데이터가 나올수 있음*/
																						$날짜셋팅값 AS m_date,	/*전일 데이터의 마지막 시간 기준 통계를 낸다는 의미*/
																						NOW(),
																						M.val_x,
																						MAX(D1) AS D1,
																						MIN(D1_MIN) AS D1_MIN,
																						AVG(D1_AVG) AS D1_AVG,
																						MAX(D2) AS D2,
																						MIN(D2_MIN) AS D2_MIN,
																						AVG(D2_AVG) AS D2_AVG,
																						MAX(D3) AS D3,
																						MIN(D3_MIN) AS D3_MIN,
																						AVG(D3_AVG) AS D3_AVG,
																						MAX(D4) AS D4,
																						MIN(D4_MIN) AS D4_MIN,
																						AVG(D4_AVG) AS D4_AVG,
																						MAX(D5) AS D5,
																						MIN(D5_MIN) AS D5_MIN,
																						AVG(D5_AVG) AS D5_AVG,
																						MAX(D6) AS D6,
																						MIN(D6_MIN) AS D6_MIN,
																						AVG(D6_AVG) AS D6_AVG,
																						MAX(D7) AS D7,
																						MIN(D7_MIN) AS D7_MIN,
																						AVG(D7_AVG) AS D7_AVG
																		FROM		mms_data_memory_min M
																		WHERE		1=1	
																		$범위조건
																		GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
																		ORDER BY M.m_date DESC
																	) T
																	LEFT JOIN mms_data_memory_hour MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date  )
													WHERE		MD.`no` IS NULL
";

//print_r($sql);	
//exit;

$sqli->query($sql);



/* CPU 시간별 데이터 */
$sql = " 			INSERT INTO mms_data_cpu_hour (
																cluster_id,
																node_id,
																mdate,
																m_date,
																reg_date,
																val_x,														
																D1,
																D1_MIN,
																D1_AVG,
																D2,
																D2_MIN,
																D2_AVG,
																D3,
																D3_MIN,
																D3_AVG,
																D4,
																D4_MIN,
																D4_AVG,
																D5,
																D5_MIN,
																D5_AVG,
																D6,
																D6_MIN,
																D6_AVG
											)
													SELECT		T.*
													FROM		(		
																		SELECT	M.cluster_id,
																						M.node_id,
																						$날짜포맷 AS mdate,	/*월-일 이걸로 조인할 경우 작년데이터가 나올수 있음*/
																						$날짜셋팅값 AS m_date,	/*전일 데이터의 마지막 시간 기준 통계를 낸다는 의미*/
																						NOW(),
																						M.val_x,
																						MAX(D1) AS D1,
																						MIN(D1_MIN) AS D1_MIN,
																						AVG(D1_AVG) AS D1_AVG,
																						MAX(D2) AS D2,
																						MIN(D2_MIN) AS D2_MIN,
																						AVG(D2_AVG) AS D2_AVG,
																						MAX(D3) AS D3,
																						MIN(D3_MIN) AS D3_MIN,
																						AVG(D3_AVG) AS D3_AVG,
																						MAX(D4) AS D4,
																						MIN(D4_MIN) AS D4_MIN,
																						AVG(D4_AVG) AS D4_AVG,
																						MAX(D5) AS D5,
																						MIN(D5_MIN) AS D5_MIN,
																						AVG(D5_AVG) AS D5_AVG,
																						MAX(D6) AS D6,
																						MIN(D6_MIN) AS D6_MIN,
																						AVG(D6_AVG) AS D6_AVG
																		FROM		mms_data_cpu_min M
																		WHERE		1=1	
																		$범위조건
																		GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
																		ORDER BY M.m_date DESC
																	) T
																	LEFT JOIN mms_data_cpu_hour MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date  )
													WHERE		MD.`no` IS NULL
";
$sqli->query($sql);


/* Network 시간별 데이터 */
$sql = " 			INSERT INTO mms_data_network_hour (
																cluster_id,
																node_id,
																mdate,
																m_date,
																reg_date,
																val_x,														
																D1,
																D1_MIN,
																D1_AVG,
																D2,
																D2_MIN,
																D2_AVG
											)	
											SELECT	T.*
											FROM		(						
																SELECT	M.cluster_id,
																				M.node_id,
																				$날짜포맷 AS mdate,	/*월-일 이걸로 조인할 경우 작년데이터가 나올수 있음*/
																				$날짜셋팅값 AS m_date,	/*전일 데이터의 마지막 시간 기준 통계를 낸다는 의미*/
																				NOW(),
																				M.val_x,
																				MAX(D1) AS D1,
																				MIN(D1_MIN) AS D1_MIN,
																				AVG(D1_AVG) AS D1_AVG,
																				MAX(D2) AS D2,
																				MIN(D2_MIN) AS D2_MIN,
																				AVG(D2_AVG) AS D2_AVG
																FROM		mms_data_network_min M
																WHERE		1=1	
																$범위조건
																GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
															) T
															LEFT JOIN mms_data_network_hour MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date)
											WHERE		MD.`no` IS NULL
";
$sqli->query($sql);


/* Disk 시간별 데이터 */
$sql = " 			INSERT INTO mms_data_disk_hour (
																cluster_id,
																node_id,
																mdate,
																m_date,
																reg_date,
																val_x,														
																D1,
																D1_MIN,
																D1_AVG,
																D2,
																D2_MIN,
																D2_AVG
											)	
											SELECT	T.*
											FROM		(						
																SELECT	M.cluster_id,
																				M.node_id,
																				$날짜포맷 AS mdate,	/*월-일 이걸로 조인할 경우 작년데이터가 나올수 있음*/
																				$날짜셋팅값 AS m_date,	/*전일 데이터의 마지막 시간 기준 통계를 낸다는 의미*/
																				NOW(),
																				M.val_x,
																				MAX(D1) AS D1,
																				MIN(D1_MIN) AS D1_MIN,
																				AVG(D1_AVG) AS D1_AVG,
																				MAX(D2) AS D2,
																				MIN(D2_MIN) AS D2_MIN,
																				AVG(D2_AVG) AS D2_AVG
																FROM		mms_data_disk_min M
																WHERE		1=1	
																$범위조건
																GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
															) T
															LEFT JOIN mms_data_disk_hour MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date)
											WHERE		MD.`no` IS NULL
";
$sqli->query($sql);

?>