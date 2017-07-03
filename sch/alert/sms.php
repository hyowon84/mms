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

$SRC = array('cpu','memory');
$SRC_NAME = array('CPU','MEMORY');
$node_os = array('O00','O10');
$연락처 = array();


/*배열정보개수만큼 소스대상 변경 CPU, MEMORY */
for($i=0; $i < count($SRC); $i++) {

	/*배열정보개수만큼 돌림 리눅스, 윈도우*/
	for ($j = 0; $j < count($node_os); $j++) {
		$노드OS = $node_os[$j];

		//리눅스용 따로, 윈도우용 따로. (둘의 최종데이터의 수집시간 편차가 차이날수 있음. 서버 다운등의 변수)
		//나기오스의 경우 노드가 다운되었을경우 0이 아니라 공백문자가 들어가므로 공백은 사용률100%로 대체
		if($SRC[$i] == 'cpu') {
			$모니터링소스 = "mms_data_{$SRC[$i]}_min";
			$모니터링소스 = " (	SELECT	M.no,	
																	M.cluster_id,	/*클러스터명*/
																	M.node_id,	/*그룹ID*/
																	M.val_x,	/*X좌표 값(유닉스타임 값)*/
																	M.mdate,
																	M.m_date,	/*유닉스타임 -> 날짜변환*/
																	M.reg_date,	/*서버에서 입력한 시간*/
																	IF( M.D1 >= 0 && M.D1 <= 100 && M.D1 != '', M.D1, 100) AS D1
													FROM		mms_data_cpu_min M																	
													WHERE		1=1
													AND			M.D1 >= 70
													OR			( M.D1 = '' OR M.D1 IS NULL) 
												) ";
		}
		else if($SRC[$i] == 'memory') {
			$모니터링소스 = " (	SELECT	M.no,	
																	M.cluster_id,	/*클러스터명*/
																	M.node_id,	/*그룹ID*/
																	M.val_x,	/*X좌표 값(유닉스타임 값)*/
																	M.mdate,
																	M.m_date,	/*유닉스타임 -> 날짜변환*/
																	M.reg_date,	/*서버에서 입력한 시간*/
																	IF( M.D1 >= 0 && M.D1 <= 100 && M.D1 != '', M.D1, 100) AS D1
													FROM		v_mms_data_memory_min_per M																	
													WHERE		1=1
													AND			M.D1 >= 70
													OR			( M.D1 = '' OR M.D1 IS NULL) 
												) ";
		}

		$SRC_SQL = "SELECT	T.*					
									FROM		(	SELECT	MDC.cluster_id,
																		MDC.node_id,
																		AVG(MDC.D1) AS AVG_D1,
																		MN.sms_{$SRC[$i]}_w,
																		MN.sms_{$SRC[$i]}_c,
																		MN.sms_{$SRC[$i]}_f,
																		IF( MN.sms_{$SRC[$i]}_w = 1 && AVG(MDC.D1) >= 70 && AVG(MDC.D1) < 80, 1, 0 ) AS {$SRC_NAME[$i]}_W,
																		IF( MN.sms_{$SRC[$i]}_c = 1 && AVG(MDC.D1) >= 80 && AVG(MDC.D1) < 90, 1, 0 ) AS {$SRC_NAME[$i]}_C,
																		IF( MN.sms_{$SRC[$i]}_f = 1 && AVG(MDC.D1) >= 90 && AVG(MDC.D1) <= 100, 1, 0 ) AS {$SRC_NAME[$i]}_F,				
																		M.MAX_DATE
														FROM		$모니터링소스 MDC
																		LEFT JOIN mms_node MN ON (MN.cluster_id = MDC.cluster_id AND MN.node_id = MDC.node_id)
																		,(	SELECT	MAX(MC.m_date) AS MAX_DATE
																				FROM		mms_data_{$SRC[$i]}_min MC
																								LEFT JOIN mms_node MN ON (MN.cluster_id = MC.cluster_id AND MN.node_id = MC.node_id)
																				WHERE		1=1
																				AND			MN.node_os = '$노드OS'
																				LIMIT 1
																		) M										
														WHERE		1=1
														AND			MDC.m_date <= M.MAX_DATE
														AND			MDC.m_date >= DATE_ADD( M.MAX_DATE, INTERVAL -5 MINUTE)
								
														AND			(MDC.cluster_id,MDC.node_id) NOT IN (	SELECT	MET.cluster_id,
																																									MET.node_id
																																					FROM		mms_except_time MET
																																					WHERE		1=1
																																					AND			MET.ec_sdate <= NOW()
																																					AND			MET.ec_edate >= NOW()
														)
														GROUP BY MDC.cluster_id, MDC.node_id
													) T
									WHERE		(T.{$SRC_NAME[$i]}_W = 1 OR T.{$SRC_NAME[$i]}_C = 1 OR T.{$SRC_NAME[$i]}_F = 1)
		";
		$ob = $sqli->query($SRC_SQL);
//		echo $SRC_SQL;
		

		while ($row = $ob->fetch_assoc()) {
			if ( $row[$SRC_NAME[$i].'_F'])
				$메시지 = $row[node_id]. "노드의 {$SRC_NAME[$i]}사용률" . $row[AVG_D1] . "% FATAL -미르헨지-";
			else if ($row[$SRC_NAME[$i].'_C'])
				$메시지 = $row[node_id]. "노드의 {$SRC_NAME[$i]}사용률" . $row[AVG_D1] . "% CRITICAL -미르헨지-";
			else if ($row[$SRC_NAME[$i].'_W'])
				$메시지 = $row[node_id]. "노드의 {$SRC_NAME[$i]}사용률" . $row[AVG_D1] . "% WARNING -미르헨지-";


			//고객사 연락처 정보 한번만 가져오게 로딩 이력 확인
			if (!(count($연락처[cluster_id]) > 0)) {
				$HP_SQL = "	SELECT	MB.cluster_id,
														MB.mb_hp
										FROM		mms_member MB
										WHERE		MB.cluster_id = '$row[cluster_id]'
				";
				$HP_INFO = $sqli->query($HP_SQL);

				while ($HP = $HP_INFO->fetch_array()) {
					$연락처[$HP[cluster_id]][$HP[mb_hp]] = $HP[mb_hp];
				}
			}

			/*중복없이 담당자에게 문자메시지 전송*/
			foreach ($연락처[$row[cluster_id]] AS $key => $mb_hp) {
				$INS_SQL = "INSERT INTO		SC_TRAN		SET
																			TR_SENDDATE = NOW(),
																			TR_SENDSTAT = '0',
																			TR_MSGTYPE = '0',
																			TR_PHONE = '$mb_hp',
																			TR_CALLBACK = '027825003',
																			TR_MSG = '$메시지'
				";
				//			$sqli->query($INS_SQL);
				echo $INS_SQL . "<br>";
			}

		}

	}	//for node_os end
}	//for source end

$sqli->close();
?>