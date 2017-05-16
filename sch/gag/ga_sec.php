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


// 쿼리문 전송
//if ($result = $sqli->query('SELECT * FROM `mms_data`')) {
//    // 레코드 출력
//    while ($row = $result->fetch_object()) {
//        echo $row->name.' / '.$row->desc.'<br />';
//    }
//     
//    // 메모리 정리
//    $result->free();
//}

// 접속 종료
//$sqli->close();
//
//exit;
header("Content-Type: text/html; charset=UTF-8");

/* DB에서 그룹정보 목록 가져오기
 * c: 클러스터 그룹단위
 * h: 노드 단위
 * g: 모니터링유형
 * m: 모니터링시간 단위?
 * r: 시간단위
  */

$노드ID = ($node_id) ? " AND			MG.node_id = '$node_id' " : "";

$GR_SQL = " SELECT	MG.*
						FROM		mms_node MG
						WHERE		1=1
						AND			MG.node_os = 'LINUX'
						$노드ID
						ORDER BY MG.upd_date ASC
";
$gr_result = $sqli->query($GR_SQL);


$g_type = array('mem_report','cpu_report','network_report','disk_total');	//,,"disk_free"

$cfg['load_report']['tb'] = 'mms_data_load';
$cfg['load_report']['qty'] = 3;

$cfg['mem_report']['tb'] = 'mms_data_memory';
$cfg['mem_report']['qty'] = 7;


$cfg['cpu_report']['tb'] = 'mms_data_cpu';
$cfg['cpu_report']['qty'] = 6;

$cfg['network_report']['tb'] = 'mms_data_network';
$cfg['network_report']['qty'] = 2;

$cfg['disk_total']['tb'] = 'mms_data_disk';
$cfg['disk_total']['qty'] = 2;



//통계값을 이용
while($gr = $gr_result->fetch_array()) {
//	$IP주소 = "192.168.50.71";
	$IP주소 = $gr['manager_ip'];
	
	$클러스터ID = $gr['cluster_id'];
	$노드ID = $gr['node_id'];


	$MEM_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS MEM_MAX_X
									FROM		mms_data_memory
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '노드ID'
									GROUP BY cluster_id, node_id
	";
	$MEM_MAX = $sqli->query($MEM_MAX_SQL)->fetch_array();
	$gr[0] = $MEM_MAX['MEM_MAX_X'];

	$CPU_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS CPU_MAX_X
									FROM		mms_data_cpu
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '노드ID'
									GROUP BY cluster_id, node_id
	";
	$CPU_MAX = $sqli->query($CPU_MAX_SQL)->fetch_array();
	$gr[1] = $MEM_MAX['CPU_MAX_X'];
	
	$NET_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS NET_MAX_X
									FROM		mms_data_network
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '노드ID'
									GROUP BY cluster_id, node_id
	";
	$NET_MAX = $sqli->query($NET_MAX_SQL)->fetch_array();
	$gr[2] = $NET_MAX['NET_MAX_X'];

	$DISK_MAX_SQL = "SELECT	cluster_id,
													node_id,
													MAX(val_x) AS DISK_MAX_X
									FROM		mms_data_disk
									WHERE		cluster_id = '$클러스터ID'
									AND			node_id = '노드ID'
									GROUP BY cluster_id, node_id
	";
	$DISK_MAX = $sqli->query($DISK_MAX_SQL)->fetch_array();
	$gr[3] = $DISK_MAX['DISK_MAX_X'];
	
	

	for ($g = 0; $g < count($g_type); $g++) {
		$모니터링유형 = $g_type[$g];

		$site_url = "http://$IP주소/ganglia/graph.php?json=1&c=$클러스터ID&h=$노드ID&m=$모니터링유형&r=hour&s=by+name&mc=2&z=default";
		echo $site_url . "<br>";

		$t = explode('.', _microtime());
		echo "시작시간 : " . date("Y-m-d H:i:s.", $t[0]) . $t[1] . "<br>";

		//JSON 데이터 로드
		$Response = get_httpRequest($site_url);


		//디스크 사용률은 구할때는 disk free 데이터도 로딩해서 동시처리
		if ($모니터링유형 == 'disk_total') {

			$site_url = "http://$IP주소/ganglia/graph.php?json=1&c=$클러스터ID&h=$노드ID&m=disk_free&r=hour&s=by+name&mc=2&z=default";
			echo $site_url . "<br>";

			$t = explode('.', _microtime());
			echo "시작시간 : " . date("Y-m-d H:i:s.", $t[0]) . $t[1] . "<br>";

			//JSON 데이터 로드
			$Response2 = get_httpRequest($site_url);
			$ob2 = json_decode($Response2);
		}


		if ($Response) {
			$DB테이블명 = $cfg[$모니터링유형][tb];
			$ob = json_decode($Response);
			echo "컬럼개수 : " . count($ob) . "<br>";

			//		##FOR문 삭제해야함##
			//		preg_match_all("/([a-zA-Z0-9\-\_]+)[g]*/i",$metric_name,$match);
			//		$metric_name = $match[0][0];


			//첫번째값 샘플(배열)
			$d = $ob[0]->datapoints;
			echo "컬럼별 총레코드 : " . count($d) . "<br>";
			$Y컬럼 = '';

			//$ob[0]->datapoints[0~300][0] = 측정값
			//$ob[0]->datapoints[0~300][1] = 시간
			for ($j = 0; $j < count($d); $j++) {

				$val_x = $d[$j][1];  //시간
				$y1 = ($d[$j][0] != 'NaN') ? $d[$j][0] : 0;  //측정값

				if ($gr[$g] > $val_x) {
					$cycle = ($gr[$g] - $val_x) / 12;
					$j += $cycle;
					echo "$gr[$g] > $val_x , cycle=$cycle, j=$j <br>";
					continue;
				}

				$Y컬럼 = " val_y1 = '$y1', ";

				//디스크 사용률은 
				if ($모니터링유형 == 'disk_total') {
					$y2 = $ob2[0]->datapoints[$j][0];
					$y1 = $y1 - $y2;	//사용중인 공간을 미리 구하기					
					
					$INS_SQL = "	INSERT INTO 	$DB테이블명	SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	val_y1 = '$y1', 
																	val_y2 = '$y2',
																	m_date = from_unixtime($val_x),
																	reg_date = NOW()
					";

				} //디스크 사용률 이외의 것
				else {

					/*2번째 값들 */
					for ($y = 2; $y <= $cfg[$모니터링유형]['qty']; $y++) {
						$val_y{$y} = $ob[$y - 1]->datapoints[$j][0];
						$val_y{$y} = ($val_y{$y} != 'NaN') ? $val_y{$y} : 0;  //측정값

						$Y컬럼 .= " val_y{$y} = '" . $val_y{$y} . "', ";
					}

					//			$y2 = ($y2) ? $val_y : 0;
					//			$y3 = ($y3) ? $y3 : 0;

					$INS_SQL = "	INSERT INTO 	$DB테이블명	SET
																	cluster_id = '$클러스터ID',		/*클러스터명*/
																	node_id = '$노드ID',								/*그룹ID*/
																	val_x = '$val_x',								/*X좌표 값(시간)*/
																	$Y컬럼 
																	m_date = from_unixtime($val_x),
																	reg_date = NOW()
					";
				}

				$sqli->query($INS_SQL);
				//			echo $INS_SQL;

			}//for end

		} else {
			echo "잘못된URL 혹은 다른이유로 인한 에러";
		}

		$t = explode('.', _microtime());
		echo "완료시간 : " . date("Y-m-d H:i:s.", $t[0]) . $t[1] . "<br><br>";

	}  //for문 end
	$UPD_SQL = "	UPDATE	mms_node	SET
													upd_date = NOW()
								WHERE		cluster_id = '$클러스터ID'
								AND			node_id = '$노드ID'
								AND			val_x = '$val_x'
	";
	$sqli->query($UPD_SQL);
	
}

//$gr_result-free();

echo '--<br />time:'.(time() - $time).' sec';

?>