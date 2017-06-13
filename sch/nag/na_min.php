<?php
include("_common.php");
include("NagiosJSON.php");

//나기오스는 1분간의 데이터 하나만 가져오기 때문에 데이터 비교 이딴거는 데이터가 순차적으로 밀릴수 있기에 조회되는 즉시 입력
?>

<!DOCTYPE HTML>
<html manifest="">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="UTF-8">
</head>



<?

/*업데이트 늦은 순서부터*/
$NODE_SQL = "	SELECT	*
							FROM		mms_node M
							WHERE		M.node_os = 'O10'
							ORDER BY M.upd_date ASC
";
$node = $sqli->query($NODE_SQL);


while($row = $node->fetch_array()) {
	$클러스터ID = $row['cluster_id'];
	$노드ID = $row['node_id'];
	$IP주소 = $row['manager_ip'];


	$CPU_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS CPU_MAX_X
									FROM		mms_data_cpu_min
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '$노드ID'
									GROUP BY cluster_id, node_id
	";
	$CPU_MAX = $sqli->query($CPU_MAX_SQL)->fetch_array();
	$row['CPU_MAX_X'] = $CPU_MAX['CPU_MAX_X'];
	

	$MEM_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS MEM_MAX_X
									FROM		mms_data_memory_min
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '$노드ID'
									GROUP BY cluster_id, node_id
	";
	$MEM_MAX = $sqli->query($MEM_MAX_SQL)->fetch_array();
	$row['MEM_MAX_X'] = $MEM_MAX['MEM_MAX_X'];
	
	
	$DISK_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS DISK_MAX_X
									FROM		mms_data_disk_min
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '$노드ID'
									GROUP BY cluster_id, node_id
	";
	$DISK_MAX = $sqli->query($DISK_MAX_SQL)->fetch_array();
	$row['DISK_MAX_X'] = $DISK_MAX['DISK_MAX_X'];

	$NET_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS NET_MAX_X
									FROM		mms_data_network_min
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '$노드ID'
									GROUP BY cluster_id, node_id
	";
	$NET_MAX = $sqli->query($NET_MAX_SQL)->fetch_array();
	$row['NET_MAX_X'] = $NET_MAX['NET_MAX_X'];



	echo "$노드ID 수집시작" . _microtime() . "<br>";
	//CPU
	$REQ1 = new NagiosJSON('url', "http://$IP주소/nagios/cgi-bin/statusjson.cgi?query=service&hostname=$노드ID&servicedescription=CPU+Load");
	$REQ1->setAuthentification('nagiosadmin', 'nagios');
	$CPU = $REQ1->getJSONfromURL();
	
	//echo date("Y-m-d H:i:s", substr($CPU[result][query_time],0,10))."<BR>"; //쿼리타임
	//echo date("Y-m-d H:i:s", substr($CPU[result][program_start],0,10))."<BR>";	//프로그램 시작
	//echo date("Y-m-d H:i:s", substr($CPU[result][last_data_update],0,10))."<BR>";	//마지막 업데이트
	//리눅스 1492063812  10자리,  윈도우 1491890655 000			//$temp[0] = str_replace("'1 min avg Load'=","",$temp[0]);
	$val_x = substr($CPU[result][last_data_update], 0, 10);
	
	echo " $val_x > $row[CPU_MAX_X] \r\n<br>";
	
	if($val_x > $row['CPU_MAX_X']) {
		$temp = explode(';', $CPU[data][service][perf_data]);  //'1 min avg Load'=30%;80;90;0;100    사용률 30%;워닝80%;크리티컬90%;미니멈0;맥시멈100
		preg_match('/([0-9\.]*)%/', $temp[0], $match);

		$val_y1 = $match[1];      	//사용률
		$val_y6 = 100 - $match[1];  //대기자원

		$INS_SQL = "	INSERT INTO 	mms_data_cpu	SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	val_y1 = '$val_y1',
																	val_y2 = '0',
																	val_y3 = '0',
																	val_y4 = '0',
																	val_y5 = '0',														
																	val_y6 = '$val_y6',
																	m_date = from_unixtime($val_x),
																	reg_date = NOW();
		";

		$INS_SQL = "	INSERT INTO mms_data_cpu_min SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	
																	mdate = DATE_FORMAT(from_unixtime($val_x),'%H:%i'),
																	m_date = from_unixtime($val_x),
																	reg_date = NOW(),
																	
																	D1 = '$val_y1',
																	D1_MIN = '$val_y1',
																	D1_AVG = '$val_y1',
																	
																	D2 = '0',
																	D2_MIN = '0',
																	D2_AVG = '0',
																	D3 = '0',
																	D3_MIN = '0',
																	D3_AVG = '0',
																	D4 = '0',
																	D4_MIN = '0',
																	D4_AVG = '0',
																	D5 = '0',
																	D5_MIN = '0',
																	D5_AVG = '0',
																	
																	D6 = '$val_y6',
																	D6_MIN = '$val_y6',
																	D6_AVG = '$val_y6'
		";
		$sqli->query($INS_SQL);
	}

	
	
	//메모리
	$REQ2 = new NagiosJSON('url', "http://$IP주소/nagios/cgi-bin/statusjson.cgi?query=service&hostname=$노드ID&servicedescription=Memory+Usage");
	$REQ2->setAuthentification('nagiosadmin', 'nagios');
	$MEM = $REQ2->getJSONfromURL();
	$val_x = substr($MEM[result][last_data_update], 0, 10);
	if($val_x > $row['MEM_MAX_X']) {
		$temp = explode(';', $MEM[data][service][perf_data]);  //"'Memory usage'=819.69MB;3839.67;4319.63;0.00;4799.59",
		preg_match('/([0-9\.]+)[a-zA-Z]+/', $temp[0], $match);

		//MAX(M.val_y1) + MAX(M.val_y2) + MAX(M.val_y3) + MAX(M.val_y4) + MAX(M.val_y6) AS D1,			/*사용중*/
		//MIN(M.val_y1) + MIN(M.val_y2) + MIN(M.val_y3) + MIN(M.val_y4) + MIN(M.val_y6)  AS D1_MIN,	
		//AVG(M.val_y1) + AVG(M.val_y2) + AVG(M.val_y3) + AVG(M.val_y4) + AVG(M.val_y6)  AS D1_AVG,
		//MAX(M.val_y5) AS D2,		/*대기자원*/

		$val_y1 = ($match[1] * 1024 * 1024);  //사용한 메모리 MB라서 BYTE로 변환
		$val_y5 = ($temp[4] * 1024 * 1024) - ($match[1] * 1024 * 1024);    //대기자원

		$INS_SQL = "	INSERT INTO 	mms_data_memory	SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	val_y1 = '$val_y1',
																	val_y2 = '0',
																	val_y3 = '0',
																	val_y4 = '0',
																	val_y5 = '$val_y5',
																	val_y6 = '0',
																	val_y7 = '0',
																	m_date = from_unixtime($val_x),
																	reg_date = NOW();
		";

		$INS_SQL = "	INSERT INTO mms_data_memory_min SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	
																	mdate = DATE_FORMAT(from_unixtime($val_x),'%H:%i'),
																	m_date = from_unixtime($val_x),
																	reg_date = NOW(),
																	
																	D1 = '$val_y1',
																	D1_MIN = '$val_y1',
																	D1_AVG = '$val_y1',
																	
																	D2 = '0',
																	D2_MIN = '0',
																	D2_AVG = '0',
																	D3 = '0',
																	D3_MIN = '0',
																	D3_AVG = '0',
																	D4 = '0',
																	D4_MIN = '0',
																	D4_AVG = '0',
																	
																	D5 = '$val_y5',
																	D5_MIN = '$val_y5',
																	D5_AVG = '$val_y5'
		";
		
		$sqli->query($INS_SQL);
	}
	
	

	//디스크사용률
	$REQ3 = new NagiosJSON('url', "http://$IP주소/nagios/cgi-bin/statusjson.cgi?query=service&hostname=$노드ID&servicedescription=Disk+Usage");
	$REQ3->setAuthentification('nagiosadmin', 'nagios');
	$DISK = $REQ3->getJSONfromURL();
	$val_x = substr($DISK[result][last_data_update], 0, 10);
	if($val_x > $row['DISK_MAX_X']) {
		$temp = explode(';', $DISK[data][service][perf_data]);  //'c:\ Used Space'=10.01Gb;47.72;53.69;0.00;59.66
		preg_match('/([0-9\.]+)[a-zA-Z]+/', $temp[0], $match);

		//MAX(M.val_y1) + MAX(M.val_y2) + MAX(M.val_y3) + MAX(M.val_y4) + MAX(M.val_y6) AS D1,			/*사용중*/
		//MIN(M.val_y1) + MIN(M.val_y2) + MIN(M.val_y3) + MIN(M.val_y4) + MIN(M.val_y6)  AS D1_MIN,	
		//AVG(M.val_y1) + AVG(M.val_y2) + AVG(M.val_y3) + AVG(M.val_y4) + AVG(M.val_y6)  AS D1_AVG,
		//MAX(M.val_y5) AS D2,		/*대기자원*/

		$val_y1 = ($match[1]);  //사용한 GB라서 BYTE로 변환
		$val_y2 = ($temp[4]) - ($match[1]);    //남은 용량

		$INS_SQL = "	INSERT INTO 	mms_data_disk	SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	val_y1 = '$val_y1',	/*사용중*/
																	val_y2 = '$val_y2',	/*사용가능*/
																	m_date = from_unixtime($val_x),
																	reg_date = NOW();
		";

		$INS_SQL = "	INSERT INTO mms_data_disk_min SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	
																	mdate = DATE_FORMAT(from_unixtime($val_x),'%H:%i'),
																	m_date = from_unixtime($val_x),
																	reg_date = NOW(),
																	
																	D1 = '$val_y1',
																	D1_MIN = '$val_y1',
																	D1_AVG = '$val_y1',
																	
																	D2 = '$val_y2',
																	D2_MIN = '$val_y2',
																	D2_AVG = '$val_y2'
		";

		$sqli->query($INS_SQL);
	}
	

	//네트워크 트래픽 다운로드
	$REQ4 = new NagiosJSON('url', "http://$IP주소/nagios/cgi-bin/statusjson.cgi?query=service&hostname=$노드ID&servicedescription=Network+Received");
	$REQ4->setAuthentification('nagiosadmin', 'nagios');
	$NET_D = $REQ4->getJSONfromURL();

	//네트워크 트래픽 업로드
	$REQ5 = new NagiosJSON('url', "http://$IP주소/nagios/cgi-bin/statusjson.cgi?query=service&hostname=$노드ID&servicedescription=Network+Sent");
	$REQ5->setAuthentification('nagiosadmin', 'nagios');
	$NET_U = $REQ5->getJSONfromURL();


	$val_x = substr($NET_D[result][last_data_update], 0, 10);
	if($val_x > $row['NET_MAX_X']) {
		preg_match('/([0-9\.]+) [a-zA-Z]+/', $NET_D[data][service][plugin_output], $match);
		preg_match('/([0-9\.]+) [a-zA-Z]+/', $NET_U[data][service][plugin_output], $match2);

		$val_y1 = $match[1];  //기본은 Bytes/sec 인데... MBytes, GBytes가 될수도 있어보임... 
		$val_y2 = $match2[1];  //기본은 Bytes/sec 인데... MBytes, GBytes가 될수도 있어보임...

		$INS_SQL = "	INSERT INTO 	mms_data_network	SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	val_y1 = '$val_y1',	/*In 다운로드*/
																	val_y2 = '$val_y2',	/*Out 업로드*/
																	m_date = from_unixtime($val_x),
																	reg_date = NOW();
		";
		$INS_SQL = "	INSERT INTO mms_data_network_min SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	
																	mdate = DATE_FORMAT(from_unixtime($val_x),'%H:%i'),
																	m_date = from_unixtime($val_x),
																	reg_date = NOW(),
																	
																	D1 = '$val_y1',
																	D1_MIN = '$val_y1',
																	D1_AVG = '$val_y1',
																	
																	D2 = '$val_y2',
																	D2_MIN = '$val_y2',
																	D2_AVG = '$val_y2'
		";
		$sqli->query($INS_SQL);
	}
	//echo $INS_SQL;
	echo "$노드ID 수집마감" . _microtime() . "<br>";

	$UPD_SQL = "	UPDATE	mms_node	SET
													upd_date = now()
								WHERE		cluster_id = '$클러스터ID'
								AND			node_id = '$노드ID'
	";
	$sqli->query($UPD_SQL);
		
}


$sqli->close();
?>