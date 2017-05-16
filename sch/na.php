<?php
/**
 * Created by PhpStorm.
 * User: lucael
 * Date: 2017-02-27
 * Time: 오후 12:06
 */


/*실서버*/
include_once('_common.php');


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



header("Content-Encoding: utf-8");
/* DB에서 그룹정보 목록 가져오기
 * c: 클러스터 그룹단위
 * h: 노드 단위
 * g: 모니터링유형
 * m: 모니터링시간 단위?
 * r: 시간단위
 * 
 */

$GR_SQL = " SELECT	LMX.LOAD_MAX_X,
										MMX.MEM_MAX_X,
										CMX.CPU_MAX_X,
										NMX.NET_MAX_X,
										MG.*
						FROM		mms_node MG
										LEFT JOIN (	SELECT	
																				cluster_id,
																				node_id,
																				MAX(val_x) AS LOAD_MAX_X
																FROM		mms_data
																WHERE		m_type = 'load_report'
																GROUP BY cluster_id, node_id, m_type
										) LMX ON (LMX.cluster_id = MG.cluster_id AND LMX.node_id = MG.node_id)
										LEFT JOIN (	SELECT	DISTINCT
																				cluster_id,
																				node_id,
																				MAX(val_x) AS MEM_MAX_X
																FROM		mms_data
																WHERE		m_type = 'mem_report'
																GROUP BY cluster_id, node_id, m_type
										) MMX ON (MMX.cluster_id = MG.cluster_id AND MMX.node_id = MG.node_id)
										LEFT JOIN (	SELECT	DISTINCT
																				cluster_id,
																				node_id,
																				MAX(val_x) AS CPU_MAX_X
																FROM		mms_data
																WHERE		m_type = 'cpu_report'
																GROUP BY cluster_id, node_id, m_type
										) CMX ON (CMX.cluster_id = MG.cluster_id AND CMX.node_id = MG.node_id)
										LEFT JOIN (	SELECT	DISTINCT
																				cluster_id,
																				node_id,
																				MAX(val_x) AS NET_MAX_X
																FROM		mms_data
																WHERE		m_type = 'network_report'
																GROUP BY cluster_id, node_id, m_type
										) NMX ON (NMX.cluster_id = MG.cluster_id AND NMX.node_id = MG.node_id)
";
$gr_result = $sqli->query($GR_SQL);

$SRC_URL = "http://192.168.50.71/ganglia/graph.php";
$g_type = array('load_report','mem_report','cpu_report','network_report');	//,"disk_total","disk_free"

$cfg['load_report']['tb'] = 'mms_data_load';
$cfg['load_report']['qty'] = 3;

$cfg[mem_report][tb] = 'mms_data_mem';
$cfg[mem_report][qty] = 7;


$cfg[cpu_report][tb] = 'mms_data_cpu';
$cfg[cpu_report][qty] = 6;

$cfg[network_report][tb] = 'mms_data_network';
$cfg[network_report][qty] = 2;



//통계값을 이용
$gr = $gr_result->fetch_array();

$클러스터ID = $gr[cluster_id];
$노드ID = $gr[node_id];

for($g=0; $g < count($g_type); $g++) {
	$모니터링유형 = $g_type[$g];
	
	$site_url = "$SRC_URL?json=1&c=$클러스터ID&h=$노드ID&m=$모니터링유형&r=hour&s=by+name&mc=2&z=default";
	echo $site_url."<br>";

	$t = explode('.', _microtime());
	echo "시작시간 : ".date("Y-m-d H:i:s.", $t[0]) . $t[1]."<br>";

	//JSON 데이터 로드
	$Response = get_httpRequest($site_url);
	if($Response) {
		$ob = json_decode($Response);

		echo "컬럼개수 : ".count($ob)."<br>";
		
		//##FOR문 삭제해야함##
		$metric_name = $ob[$i]->metric_name;

		if( strstr($모니터링유형,'disk') ) {
			if($모니터링유형 == 'disk_total') $metric_name = 'Total';
			if($모니터링유형 == 'disk_free') $metric_name = 'Free';

			$모니터링유형 = 'disk_report';
		}
		else {
			preg_match_all("/([a-zA-Z0-9\-\_]+)[g]*/i",$metric_name,$match);
			$metric_name = $match[0][0];
		}

		
		//첫번째값 샘플(배열)
		$d = $ob[0]->datapoints;
		echo "컬럼별 총레코드 : ".count($d)."<br>";
		$Y컬럼 = '';
		
		//$ob[0]->datapoints[0~300][0] = 측정값
		//$ob[0]->datapoints[0~300][1] = 시간
		for ($j = 0; $j < count($d); $j++) {
			$val_x = $d[$j][1];  //시간
			$y1 = ($d[$j][0] != 'NaN') ? $d[$j][0] : 0;  //측정값
			

			if($gr[$g] > $val_x) {
				$cycle = ($gr[$g] - $val_x) / 12;
				$j += $cycle;
				echo "$gr[$g] > $val_x , cycle=$cycle, j=$j <br>";
				continue;
			}

			/*2번째 값들 */
			for($y = 2; $y <= $cfg[$모니터링유형]['qty']; $y++) {
				$val_y{$y} = $ob[$y-1]->datapoints[$j][0];
				$val_y{$y} = ($val_y{$y} != 'NaN') ? $val_y{$y} : 0;  //측정값
				
				$Y컬럼 .= " val_y{$y} = '".$val_y{$y}."', ";
			}

			$tb = $cfg[$모니터링유형][tb];

//			$y2 = ($y2) ? $val_y : 0;
//			$y3 = ($y3) ? $y3 : 0;

			$INS_SQL = "	INSERT INTO 	$tb	SET
															cluster_id = '$클러스터ID',		/*클러스터명*/
															node_id = '$노드ID',								/*그룹ID*/
															val_x = '$val_x',								/*X좌표 값(시간)*/
															$Y컬럼 
															m_date = from_unixtime($val_x),
															reg_date = NOW()
			";
			
//					val_y1 = '$y1',								/*Y좌표 값(측정수치)*/
//					val_y2 = '$y2',								/*Y좌표 값(측정수치)*/
//					val_y3 = '$y3',								/*Y좌표 값(측정수치)*/
			$sqli->query($INS_SQL);
			
		}

	}
	else {
		echo "잘못된URL 혹은 다른이유로 인한 에러";
	}

	$t = explode('.', _microtime());
	echo "완료시간 : ".date("Y-m-d H:i:s.", $t[0]) . $t[1]."<br><br>";
	
	
	break;
}	//for문 end


//$gr_result-free();

?>