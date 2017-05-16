
Ext.define('mms.view.dashboard.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dashboardMain',
	requires:[
		'mms.view.dashboard.MainController',
		'mms.view.charts.LoadReport',
		'mms.store.EventLog'
	],
	controller:'dashboardMain',
	closable: false,
	title: 'Main',
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
					xtype: 'chart_NodeSummary',
					width: '49.5%',
					height: 350,
					style: 'float:left;'
				},
				{
					xtype: 'chart_NodeActive',
					width: '49.5%',
					height: 350,
					style: 'float:right;'
				},
				
				{
					xtype : 'panel',
					width : '100%',
					style: 'float:left; margin-bottom:10px;',
					items : [
						{
							xtype: 'GridNodeSummary',
							title : 'O/S유형 집계',
							width : '20%',
							height: 250,
							style: 'float:left;'
						},
						{
							xtype: 'GridNodeList',
							title : '노드 목록',
							width : '79%',
							height: 250,
							style: 'float:right;'
						}
					]
				},
				
				{
					xtype : 'EventLog',
					width : '100%',
					height:  200
				},
				{
					xtype : 'NotiLog',
					width : '100%',
					height:  300
				}
				
			]
		}		
	]

});
