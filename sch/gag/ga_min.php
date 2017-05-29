<?php
/**
 * Created by PhpStorm.
 * User: lucael
 * Date: 2017-02-27
 * Time: 오후 12:06
 */
include_once('_common.php');


$범위조건 = "	AND			m_date >= DATE_ADD(NOW(),INTERVAL -60 MINUTE)
							AND			m_date <= DATE_ADD(NOW(),INTERVAL -1 MINUTE)
						";
$날짜포맷 = " DATE_FORMAT(from_unixtime(M.val_x),'%H:%i') ";
$날짜셋팅값 = " DATE_FORMAT(M.m_date,'%Y-%m-%d %H:%i:59') ";

//$범위조건 = '';

/* CPU 분별 데이터 */
$sql = " 			INSERT INTO mms_data_cpu_min (
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
											SELECT	T.*
											FROM		(						
																SELECT	M.cluster_id,
																				M.node_id,
																				$날짜포맷 AS mdate,
																				$날짜셋팅값 AS m_date,
																				NOW(),
																				M.val_x,
																				MAX(M.val_y1) AS D1,
																				MIN(M.val_y1) AS D1_MIN,
																				AVG(M.val_y1) AS D1_AVG,
																				MAX(M.val_y2) AS D2,
																				MIN(M.val_y2) AS D2_MIN,
																				AVG(M.val_y2) AS D2_AVG,
																				MAX(M.val_y3) AS D3,
																				MIN(M.val_y3) AS D3_MIN,
																				AVG(M.val_y3) AS D3_AVG,
																				MAX(M.val_y4) AS D4,
																				MIN(M.val_y4) AS D4_MIN,
																				AVG(M.val_y4) AS D4_AVG,
																				MAX(M.val_y5) AS D5,
																				MIN(M.val_y5) AS D5_MIN,
																				AVG(M.val_y5) AS D5_AVG,
																				MAX(M.val_y6) AS D6,
																				MIN(M.val_y6) AS D6_MIN,
																				AVG(M.val_y6) AS D6_AVG
																FROM		mms_data_cpu M
																WHERE		1=1	
																$범위조건
																GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
															) T
															LEFT JOIN mms_data_cpu_min MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date)
											WHERE		MD.`no` IS NULL
";
//echo $sql;
$sqli->query($sql);


/* Memory 분별 데이터 */
$sql = " 			INSERT INTO mms_data_memory_min (
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
											SELECT	T.*
											FROM		(						
																SELECT	M.cluster_id,
																				M.node_id,
																				$날짜포맷 AS mdate,	/*월-일 이걸로 조인할 경우 작년데이터가 나올수 있음*/
																				$날짜셋팅값 AS m_date,	/*전일 데이터의 마지막 시간 기준 통계를 낸다는 의미*/
																				NOW(),
																				M.val_x,
																				MAX(M.val_y1) AS D1,
																				MIN(M.val_y1) AS D1_MIN,
																				AVG(M.val_y1) AS D1_AVG,
																				MAX(M.val_y2) AS D2,
																				MIN(M.val_y2) AS D2_MIN,
																				AVG(M.val_y2) AS D2_AVG,
																				MAX(M.val_y3) AS D3,
																				MIN(M.val_y3) AS D3_MIN,
																				AVG(M.val_y3) AS D3_AVG,
																				MAX(M.val_y4) AS D4,
																				MIN(M.val_y4) AS D4_MIN,
																				AVG(M.val_y4) AS D4_AVG,
																				MAX(M.val_y5) AS D5,
																				MIN(M.val_y5) AS D5_MIN,
																				AVG(M.val_y5) AS D5_AVG,
																				MAX(M.val_y6) AS D6,
																				MIN(M.val_y6) AS D6_MIN,
																				AVG(M.val_y6) AS D6_AVG,
																				MAX(M.val_y7) AS D7,
																				MIN(M.val_y7) AS D7_MIN,
																				AVG(M.val_y7) AS D7_AVG
																FROM		mms_data_memory M
																WHERE		1=1	
																$범위조건
																GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
															) T
															LEFT JOIN mms_data_memory_min MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date)
											WHERE		MD.`no` IS NULL
";
$sqli->query($sql);



/* Network 분별 데이터 */
$sql = " 			INSERT INTO mms_data_network_min (
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
																				MAX(M.val_y1) AS D1,
																				MIN(M.val_y1) AS D1_MIN,
																				AVG(M.val_y1) AS D1_AVG,
																				MAX(M.val_y2) AS D2,
																				MIN(M.val_y2) AS D2_MIN,
																				AVG(M.val_y2) AS D2_AVG
																FROM		mms_data_network M
																WHERE		1=1	
																$범위조건
																GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
															) T
															LEFT JOIN mms_data_network_min MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date)
											WHERE		MD.`no` IS NULL
";
$sqli->query($sql);


/* Disk 분별 데이터 */
$sql = " 			INSERT INTO mms_data_disk_min (
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
																				MAX(M.val_y1) AS D1,
																				MIN(M.val_y1) AS D1_MIN,
																				AVG(M.val_y1) AS D1_AVG,
																				MAX(M.val_y2) AS D2,
																				MIN(M.val_y2) AS D2_MIN,
																				AVG(M.val_y2) AS D2_AVG
																FROM		mms_data_disk M
																WHERE		1=1	
																$범위조건
																GROUP BY M.cluster_id, M.node_id, $날짜셋팅값
															) T
															LEFT JOIN mms_data_disk_min MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.m_date = T.m_date)
											WHERE		MD.`no` IS NULL
";
$sqli->query($sql);


$sqli->close();
?>