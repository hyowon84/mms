<?
include "_common.php";

//관리자
if($mb_id == 'admin') {
?>
	{
		children:[
			{
				name:"Main",
				url: "mms.view.admin.Main",
				leaf: true				
			},				
			{
				name: "클러스터&노드 관리",
				url: "mms.view.admin.ClusterNodeListMain",
				leaf: true
			},
			{
				name: "전체회원관리",
				url: "mms.view.admin.MbListMain",
				leaf: true
			}
		]
	}
<?
} //if end (관리자)

// 모니터링 메뉴는 (M10 마스터계정, M20 일반계정) 공통
else if($mb_type == 'M10' || $mb_type == 'M20') {
	$node_sql = "	SELECT	MN.*
								FROM		mms_node MN
								WHERE		MN.cluster_id = '$cluster_id'							
								ORDER BY MN.node_type DESC, MN.node_id ASC
								";
	$node = $sqli->query($node_sql);
?>
{
	children:[
    {
			name:"대시보드",
			url: "mms.view.dashboard.Main",
			leaf: false,
			expanded: true,
			children:[
<?

			for($i = 0; $i < $node->num_rows; $i++) {
				$row = $node->fetch_array();
?>
				{
					name:"<?=$row[node_id]."($row[node_type])"?>",
					cluster_id:"<?=$row[cluster_id]?>",
					node:"<?=$row[node_id]?>",
					node_id:"<?=$row[node_id]?>",
					url:"mms.view.dashboard.Total",
					leaf: false,
					expanded: false,
					children:[
						{
							name:"CPU(<?=$row[node_id]?>)",
							cluster_id:"<?=$row[cluster_id]?>",
							node_id:"<?=$row[node_id]?>",
							url:"mms.view.dashboard.Cpu",
							leaf:true
						},
						{
							name:"MEMORY(<?=$row[node_id]?>)",
							cluster_id:"<?=$row[cluster_id]?>",			
							node_id:"<?=$row[node_id]?>",		
							url:"mms.view.dashboard.Memory",
							leaf:true
						},
						{
							name:"NETWORK(<?=$row[node_id]?>)",
							cluster_id:"<?=$row[cluster_id]?>",
							node_id:"<?=$row[node_id]?>",
							url:"mms.view.dashboard.Network",
							leaf:true
						},
						{
							name:"DISK(<?=$row[node_id]?>)",
							cluster_id:"<?=$row[cluster_id]?>",
							node_id:"<?=$row[node_id]?>",
							url:"mms.view.dashboard.Disk",
							leaf:true
						}					
					]
		<?
				if($node->num_rows == $i) {
					echo "}";
				}
				else {
					echo "},";
				}
			}
		?>	
			]
    },
	<?
	/*
		{
			name: "멀티차트",
			url: "mms.view.dashboard.MultiChartMain",
			leaf: true
		},
	*/
	?>
		{
			name: "보고서",
			url: "mms.view.report.Main",
			leaf: true
		},
	<?
	if($mb_type == 'M10') {	//마스터
	?>
		{
			name: "계정 관리 ",
			url: "mms.view.master.MbListMain",
			leaf: true
		},
		{
			name: "노드 관리",
			url: "mms.view.master.NodeAlertMain",
			leaf: true
		},
		{
			name: "정보수정",
			url: "mms.view.info.ClusterInfoMain",
			leaf: true
		}
	<?
	}
	else if($mb_type == 'M20') {	//일반계정
	?>
		{
			name: "정보수정",
			url: "mms.view.info.ClusterInfoMain",
			leaf: true
		}
	<?
	}
	?>	
		
	]
}
<?
} //else end(클라이언트)
//,  M20 마스터계정에 종속되는 일반로그인계정
?>
