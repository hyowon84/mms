<?php
/**
 * Created by PhpStorm.
 * User: lucael
 * Date: 2017-02-27
 * Time: 오후 12:06
 */
include_once('_common.php');

$범위조건 = "	AND			m_date >= DATE_ADD(NOW(),INTERVAL -32 DAY)
							AND			m_date <= DATE_ADD(NOW(),INTERVAL -1 DAY)
";
$범위조건 = '';

/* CPU 일별 데이터 */
$sql = " 			INSERT INTO mms_data_cpu_month (
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
																						DATE_FORMAT(from_unixtime(M.val_x),'%y-%m') AS mdate,
																						DATE_FORMAT(M.m_date,'%Y-%m-%d 23:59:59') AS m_date,
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
																		FROM		mms_data_cpu_day M
																		WHERE		1=1	
																		$범위조건
																		GROUP BY M.cluster_id, M.node_id, DATE_FORMAT(from_unixtime(M.val_x),'%y-%m')
																		ORDER BY M.m_date DESC
																	) T
																	LEFT JOIN mms_data_cpu_month MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.mdate = T.mdate  )
													WHERE		MD.`no` IS NULL
";
$sqli->query($sql);


/* Memory 일별 데이터 */
$sql = " 			INSERT INTO mms_data_memory_month (
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
																						DATE_FORMAT(from_unixtime(M.val_x),'%y-%m') AS mdate,
																						DATE_FORMAT(M.m_date,'%Y-%m-%d 23:59:59') AS m_date,
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
																		FROM		mms_data_memory_day M
																		WHERE		1=1	
																		$범위조건
																		GROUP BY M.cluster_id, M.node_id, DATE_FORMAT(from_unixtime(M.val_x),'%y-%m')
																		ORDER BY M.m_date DESC
																	) T
																	LEFT JOIN mms_data_memory_month MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.mdate = T.mdate  )
													WHERE		MD.`no` IS NULL
";
$sqli->query($sql);



/* Network 일별 데이터 */
$sql = " 			INSERT INTO mms_data_network_month (
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
													SELECT		T.*
													FROM		(		
																		SELECT	M.cluster_id,
																						M.node_id,
																						DATE_FORMAT(from_unixtime(M.val_x),'%y-%m') AS mdate,
																						DATE_FORMAT(M.m_date,'%Y-%m-%d 23:59:59') AS m_date,
																						NOW(),
																						M.val_x,
																						MAX(D1) AS D1,
																						MIN(D1_MIN) AS D1_MIN,
																						AVG(D1_AVG) AS D1_AVG,
																						MAX(D2) AS D2,
																						MIN(D2_MIN) AS D2_MIN,
																						AVG(D2_AVG) AS D2_AVG
																		FROM		mms_data_network_day M
																		WHERE		1=1	
																		$범위조건
																		GROUP BY M.cluster_id, M.node_id, DATE_FORMAT(from_unixtime(M.val_x),'%y-%m')
																		ORDER BY M.m_date DESC
																	) T
																	LEFT JOIN mms_data_network_month MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.mdate = T.mdate  )
													WHERE		MD.`no` IS NULL
";
$sqli->query($sql);



/* Disk 일별 데이터 */
$sql = " 			INSERT INTO mms_data_disk_month (
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
													SELECT		T.*
													FROM		(		
																		SELECT	M.cluster_id,
																						M.node_id,
																						DATE_FORMAT(from_unixtime(M.val_x),'%y-%m') AS mdate,
																						DATE_FORMAT(M.m_date,'%Y-%m-%d 23:59:59') AS m_date,
																						NOW(),
																						M.val_x,
																						MAX(D1) AS D1,
																						MIN(D1_MIN) AS D1_MIN,
																						AVG(D1_AVG) AS D1_AVG,
																						MAX(D2) AS D2,
																						MIN(D2_MIN) AS D2_MIN,
																						AVG(D2_AVG) AS D2_AVG
																		FROM		mms_data_disk_day M
																		WHERE		1=1	
																		$범위조건
																		GROUP BY M.cluster_id, M.node_id, DATE_FORMAT(from_unixtime(M.val_x),'%y-%m')
																		ORDER BY M.m_date DESC
																	) T
																	LEFT JOIN mms_data_disk_month MD ON (MD.cluster_id = T.cluster_id AND MD.node_id = T.node_id AND MD.mdate = T.mdate  )
													WHERE		MD.`no` IS NULL
";
$sqli->query($sql);

?>