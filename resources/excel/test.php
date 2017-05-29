<?
include "_common.php";

include_once(SRC_PATH.'/lib/Excel/php_writeexcel/class.writeexcel_workbook.inc.php');
include_once(SRC_PATH.'/lib/Excel/php_writeexcel/class.writeexcel_worksheet.inc.php');


$mms_path = mms_path();

// CHARSET 변경 : utf-8 -> euc-kr
function iconv_euckr($str)
{
	return iconv('utf-8', 'euc-kr', $str);
}

function makeWhere($cluster_id, $node_id) {
	global $_POST,$timetype;

	//두시간 기준
	$계정조건 = "	AND			M.cluster_id = '$cluster_id'
								AND			M.node_id	IN ('$node_id')
	";

	//기본조건 셋팅
	if($timetype == 'min') {
		$기간조건 = "	
		AND			M.m_date >=  DATE_ADD( MDAY.m_date, INTERVAL -15 MINUTE)		
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else if($timetype == 'hour') {
		$기간조건 = "
		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -24 HOUR)
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else if($timetype == 'day') {
		$기간조건 = "
		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -10 DAY)
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else if($timetype == 'month') {
		$기간조건 = "
		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -12 MONTH)
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else {
		$추가조건 = $계정조건.$기간조건;
	}

	return $추가조건;
}

$단위명 = array('CPU'=>'%','MEMORY'=>'MB','NETWORK'=>'Byte','DISK' => 'GB');


$fname = tempnam(TEMP_PATH,"tmp-mms_data.xls");
$workbook = new writeexcel_workbook($fname);
$worksheet = $workbook->addworksheet();


//기본설정
$cluster_id = $_SESSION[cluster_id];
$arr = array();


//테스트값
$timetype = "min";
$_GET[node_id] = "node00,node01,node02,winserver,winserver2";
$node_list = explode(',',$_GET[node_list]);
$노드IN조건 = implode("','",$node_list);
$추가조건 = makeWhere($cluster_id, $노드IN조건);
//$추가조건 = makeWhere($cluster_id, $node_list);
	
/* 배열 정렬을 위한 처리 CPU부터 NETWORK까지 */
$IDX_SQL = "SELECT	DISTINCT
										mdate
						FROM		mms_data_cpu_{$timetype} M
										LEFT JOIN (	SELECT	cluster_id,
																				node_id,
																				MAX(m_date) AS m_date
																FROM		mms_data_cpu_{$timetype}
																GROUP BY cluster_id, node_id
										) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
						WHERE		1=1
						$추가조건
						ORDER BY M.m_date ASC
";
$ob = $sqli->query($IDX_SQL);
while ($row = $ob->fetch_assoc()) {
	$arr['CPU'][$row[mdate]] = array();
}
$IDX_SQL = "SELECT	DISTINCT
										mdate
						FROM		mms_data_memory_{$timetype} M
										LEFT JOIN (	SELECT	cluster_id,
																				node_id,
																				MAX(m_date) AS m_date
																FROM		mms_data_memory_{$timetype}
																GROUP BY cluster_id, node_id
										) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
						WHERE		1=1
						$추가조건
						ORDER BY M.m_date ASC
";
$ob = $sqli->query($IDX_SQL);
while ($row = $ob->fetch_assoc()) {
	$arr['MEMORY'][$row[mdate]] = array();
}
$IDX_SQL = "SELECT	DISTINCT
										mdate
						FROM		mms_data_network_{$timetype} M
										LEFT JOIN (	SELECT	cluster_id,
																				node_id,
																				MAX(m_date) AS m_date
																FROM		mms_data_network_{$timetype}
																GROUP BY cluster_id, node_id
										) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
						WHERE		1=1
						$추가조건
						ORDER BY M.m_date ASC
";
$ob = $sqli->query($IDX_SQL);
while ($row = $ob->fetch_assoc()) {
	$arr['NETWORK'][$row[mdate]] = array();
}
$IDX_SQL = "SELECT	DISTINCT
										mdate
						FROM		mms_data_disk_{$timetype} M
										LEFT JOIN (	SELECT	cluster_id,
																				node_id,
																				MAX(m_date) AS m_date
																FROM		mms_data_disk_{$timetype}
																GROUP BY cluster_id, node_id
										) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
						WHERE		1=1
						$추가조건
						ORDER BY M.m_date ASC
";
$ob = $sqli->query($IDX_SQL);
while ($row = $ob->fetch_assoc()) {
	$arr['DISK'][$row[mdate]] = array();
}



//개별 노드마다 노드1(CPU, MEM, DISK, NET) -> 노드2(CPU, MEM, ...)
for($노드n = 0; $노드n < count($node_list); $노드n++ ) {
	$추가조건 = makeWhere($cluster_id, $node_list[$노드n]);
	
	/* CPU */
	$SELECT_SQL = "	SELECT	M.node_id,
													M.mdate,
													M.m_date,	/*기준시간*/
													M.D1,	/*Y좌표 값(측정수치) User*/
													M.D1_MIN,
													M.D1_AVG,
													M.D2 + M.D3 + M.D4 + M.D5 + M.D6 AS D2,
													D2_MIN + D3_MIN + D4_MIN + D5_MIN + D6_MIN AS D2_MIN,
													D2_AVG + D3_AVG + D4_AVG + D5_AVG + D6_AVG AS D2_AVG
									FROM		mms_data_cpu_{$timetype} M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		mms_data_cpu_{$timetype}
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
									WHERE		1=1
									$추가조건
									ORDER BY M.node_id ASC, M.m_date ASC
	";
	
	$ob = $sqli->query($SELECT_SQL);
	while ($row = $ob->fetch_assoc()) {
		$arr['CPU'][$row[mdate]][$노드n] = $row;
	}

	/* MEMORY */
	$SELECT_SQL = "	SELECT	M.no,	
													M.cluster_id,	/*클러스터명*/
													M.node_id,	/*그룹ID*/
													M.val_x,	/*X좌표 값(유닉스타임 값)*/
													M.mdate,
													M.m_date,	/*유닉스타임 -> 날짜변환*/
													M.reg_date,	/*서버에서 입력한 시간*/
													(M.D1 + D2 + D3 + D4 + D6) / 1024 / 1024 AS D1,
													M.D1_MIN + D2_MIN + D3_MIN + D4_MIN + D6_MIN AS D1_MIN,
													M.D1_AVG + D2_AVG + D3_AVG + D4_AVG + D6_AVG AS D1_AVG,
													M.D5 AS D2,
													M.D5_MIN AS D2_MIN,
													M.D5_AVG AS D2_AVG
								FROM			mms_data_memory_{$timetype} M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		mms_data_memory_{$timetype}
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
								WHERE		1=1
								$추가조건
								ORDER BY M.node_id ASC, M.m_date ASC
	";

	$ob = $sqli->query($SELECT_SQL);
	while ($row = $ob->fetch_assoc()) {
		$arr['MEMORY'][$row[mdate]][$노드n] = $row;
	}

	/* NETWORK */
	$SELECT_SQL = "	SELECT	M.no,	
													M.cluster_id,	/*클러스터명*/
													M.node_id,	/*그룹ID*/
													M.val_x,	/*X좌표 값(유닉스타임 값)*/
													M.mdate,
													M.m_date,	/*유닉스타임 -> 날짜변환*/
													M.reg_date,	/*서버에서 입력한 시간*/
													M.D1,	/*Y좌표 값(측정수치) User*/
													M.D1_MIN,	
													M.D1_AVG,	
													M.D2,	/*Y좌표 값(측정수치) Nice*/
													M.D2_MIN,	
													M.D2_AVG	
								FROM			mms_data_network_{$timetype} M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		mms_data_network_{$timetype}
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
								WHERE		1=1
								$추가조건
								ORDER BY M.node_id ASC, M.m_date ASC
	";

	$ob = $sqli->query($SELECT_SQL);
	while ($row = $ob->fetch_assoc()) {
		$arr['NETWORK'][$row[mdate]][$노드n] = $row;
	}

	
	
	$SELECT_SQL = "	SELECT	M.no,	
													M.cluster_id,	/*클러스터명*/
													M.node_id,	/*그룹ID*/
													M.val_x,	/*X좌표 값(유닉스타임 값)*/
													M.mdate,
													M.m_date,	/*유닉스타임 -> 날짜변환*/
													M.reg_date,	/*서버에서 입력한 시간*/
													M.D1,	/*Y좌표 값(측정수치) User*/
													M.D1_MIN,	
													M.D1_AVG,	
													M.D2,	/*Y좌표 값(측정수치) Nice*/
													M.D2_MIN,	
													M.D2_AVG	
								FROM			mms_data_disk_{$timetype} M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		mms_data_disk_{$timetype}
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
								WHERE		1=1
								$추가조건
	";
	$ob = $sqli->query($SELECT_SQL);
	while ($row = $ob->fetch_assoc()) {
		$arr['DISK'][$row[mdate]][$노드n] = $row;
	}
	
}//while node 가져오기



//print_r($arr);
//exit;
$worksheet->set_column('A1', 35);
$text_format =& $workbook->addformat(array(
	bold    => 1,
	italic  => 1,
	color   => 'blue',
	size    => 18	
));
$worksheet->write(0, 0, iconv_euckr('모니터링 데이터'), $text_format);

$rowLineNo = 3;


foreach($arr AS $title => $data) {
	$worksheet->write($rowLineNo, 0, iconv_euckr($title.' 모니터링 데이터 '.$timetype));
	//컬럼그리기
	$컬럼n = 0;	//헤더 A열(0)
	$worksheet->write($rowLineNo, 0, iconv_euckr('노드ID'));
	for($노드n = 0; $노드n < count($node_list); $노드n++) {
		$worksheet->write($rowLineNo+($노드n+1), $컬럼n, iconv_euckr($node_list[$노드n]." (".$단위명[$title].")"));
	}
	$컬럼n++;


	//실제데이터는 컬럼B열(1)부터 시작
	foreach($data AS $time => $row) {
		$worksheet->write($rowLineNo, $컬럼n, $time);	// 헤더 시간

		for($노드n = 0; $노드n < count($node_list); $노드n++) {
			$worksheet->write($rowLineNo+($노드n+1), $컬럼n, $row[$노드n][D1]);
		}
		$컬럼n++;
	}
	$rowLineNo += (count($node_list)+2);

}



$workbook->close();


if($iCount==1)alert("자료가 존재하지 않습니다.");
else{

	header("Content-Type: application/x-msexcel; name=\"mmsdata-".date("ymd", time()).".xls\"");
	header("Content-Disposition: inline; filename=\"mmsdata-".date("ymd", time()).".xls\"");
	$fh=fopen($fname, "rb");
	fpassthru($fh);
	unlink($fname);
	exit;
}





$rowLineNo += (count($node_list) + 2);

//foreach($arr AS $key => $val) {
//	$data[$idx++] = $val;
//}

	
exit;







// 헤더, 노드id, 시간순서
$data = array('NODE_ID');
$data = array_map('iconv_euckr', $data);

$col = 0;
foreach($data as $cell) {
	$worksheet->write(0, $col++, $cell);
}

//화면에서 입력한 회원ID 목록을 구함
$arr_od_id = explode(PHP_EOL, $_POST['list_od_id']);	//주문번호
$arr_nick = explode(PHP_EOL, $_POST['list_nick']);	//닉네임
$신청자목록 = array_merge($arr_od_id,$arr_nick);

$iCount=1;






for ($i=0; $i < count($신청자목록); $i++)
{
	

	
	$row = mysql_fetch_array($result);
// 	if (!$row) continue;
// 	$row = array_map('iconv_euckr', $tmp);

	$it_name = iconv("utf-8","euc-kr","기념품");
	$it_state = ($v_delivery_type[$row['delivery_type']] == "선불") ? "즉납" : "착불";
	$it_state = iconv("utf-8","euc-kr",$it_state);


	/* 둘다 있을경우 신주소 */
	if( ($row['addr1'] && $row['addr1_2']) || ($row['addr1_2'] != '') ) {
		$기본주소 = $row['addr1_2'];
	}
	else if( ($row['addr1'] != '') ) {
		$기본주소 = $row['addr1'];
	}


	$기본주소 .= ' '.$row['addr2'];

	$worksheet->write($iCount, 0, iconv('utf-8','euc-kr',$row['od_id']));	/* 주문번호 */
	$worksheet->write($iCount, 1, iconv('utf-8','euc-kr',$row['name']));	/* 수취인명 */
	$worksheet->write($iCount, 2, iconv('utf-8','euc-kr',$v_delivery_type[$row['delivery_type']]."(".$row['clay_id'].")"));	/* 클레이닉네임, 택배 선불/착불 */
	$worksheet->write($iCount, 3, iconv('utf-8','euc-kr',' '.$row['zip']));
	$worksheet->write($iCount, 4, iconv('utf-8','euc-kr',$기본주소));
	$worksheet->write($iCount, 5, iconv('utf-8','euc-kr',' '.$row['hphone']));
	$worksheet->write($iCount, 6, iconv('utf-8','euc-kr',' '.$row['hphone']));
	$worksheet->write($iCount, 7, $it_name);
	$worksheet->write($iCount, 8, 3);
	$worksheet->write($iCount, 9, $it_state);

	$iCount++;
}


$workbook->close();

if($iCount==1)alert("자료가 존재하지 않습니다.");
else{

	header("Content-Type: application/x-msexcel; name=\"memberlist-".date("ymd", time()).".xls\"");
	header("Content-Disposition: inline; filename=\"memberlist-".date("ymd", time()).".xls\"");
	$fh=fopen($fname, "rb");
	fpassthru($fh);
	unlink($fname);

	exit;
}

?>