<?php
include "_common.php";
$json = array();
$data = array();

/* REMOTE SORT */
$sort = json_decode(str_replace('\"','"',$_GET['sort']),true);

for($i = 0; $i < count($sort); $i++) {
	if($i == 0) {
		$ORDER_BY = "ORDER BY ".$sort[$i]['property']." ".$sort[$i]['direction'];
	}
	else {
		$ORDER_BY .= ",".$sort[$i]['property']." ".$sort[$i]['direction'];
	}
}


$start = ($start) ? $start : 0;
$limit = ($limit) ? $limit : 50;

$AND_SQL = "";



$AND_SQL .= "
						AND		cluster_id = '$cluster_id'
";

/* 회원목록 */
if($_GET['mode'] == 'NodeList') {
	/* 노드 목록 추출 */
	$SELECT_SQL = "	SELECT	*
									FROM		mms_node
									WHERE		1=1
									$AND_SQL
	";
}

$result = $sqli->query($SELECT_SQL);
$total_count = $result->num_rows;
$result->free();


/* */
$main_sql = "	$SELECT_SQL
							$ORDER_BY
							LIMIT $start, $limit
";
$ob = $sqli->query($main_sql);


while($row = $ob->fetch_array()) {
	
	foreach($row as $key => $val) {
//		$row[$key] = 개행문자삭제($val);
		if($key == 'gp_realprice') $row[$key] = CEIL($val / 100) * 100;
	}
	array_push($data, $row);
}

if($total_count > 0) {
	$json['total'] = "$total_count";
	$json['success'] = "true";
	$json['data'] = $data;
} else {
	$json['total'] = 0;
	$json['success'] = "false";
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>