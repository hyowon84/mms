
Ext.define('mms.view.dashboard.MultiChartMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dashboardMultiChartMain',
	requires:[
		'mms.view.dashboard.MainController',
		'mms.view.charts.LoadReport',
		'mms.store.EventLog'
	],
	controller:'dashboardMain',
	closable: true,
	title: '멀티차트',
	width: '100%',
	frame : false,
	bodyPadding:'5 0 5 0',
	defaults: {
		style: 'float:left;'
	},
	scrollable: true,
	items: [
		{
			xtype : 'panel',
			width : '100%',
			padding:10,
			defaults: {
				style: 'float:left; margin-bottom:10px;'				
			},
			items : [
				{
					xtype: 'GridNodeList',
					title : '노드 목록',
					width : '100%',
					height: 250,
					tbar : [
						{
							text: '차트적용',
							handler : function(btn,selObj) {
								
								var grid = btn.up().up();
								var sm = grid.getSelectionModel().getSelection();

								if(sm[0]) {

									var v_cluster_id = '';
									var v_node_id = '';

										//노드 그리드에서 선택된 노드들 패러미터 생성
										for(var i = 0; i < sm.length; i++) {	//sm[i].data
											v_cluster_id += sm[i].data.cluster_id + ",";
											v_node_id += sm[i].data.node_id + ",";
										}

										v_cluster_id = v_cluster_id.substr(0,v_cluster_id.length-1);
										v_node_id = v_node_id.substr(0,v_node_id.length-1);

										var v_param = {
											'cluster_id' : v_cluster_id,
											'node_id' : v_node_id,
											'timetype' : 'hour'
										};

										////멀티차트 페이지내 모든 차트들을 셀렉트, 차트별로 패러미터 적용 및 로딩
										var o_chart = btn.up().up().up().query('[name=DynamicChart]');
										//
										//var series = [];
										////clear series
										//o_chart.series.clear();

										//메모리사용률 1개일땐 1개만 로딩
										for(var i = 0; i < o_chart.length; i++) {
											var store = o_chart[i].getStore();
											Ext.apply(store.getProxy().extraParams, v_param);
											store.load();
										}

									
								}
								
							}							
						}
					],
					style: 'float:left;'
				},
				
				{
					xtype: 'DynamicChartMemoryUse',
					width: '100%',
					height: 350,
					style: 'float:left;'
				}
				
			]
		}		
	]

});
