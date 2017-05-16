Ext.define('mms.view.dashboard.Network', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dashboardNetwork',
	requires:[
		'mms.view.dashboard.MainController',
		'mms.view.charts.LoadReport'
	],
	controller:'dashboardMain',
	closable: true,
	title:'Network',
	bodyPadding:'5 5 5 5',
	width: '100%',
	frame: false,
	scrollable: true,
	defaults: {
		style: 'float:left;'
	},
	items: [
		{
			defaults: {
				frame: false,
				bodyPadding: 10,
				margin : '2',
				style: 'float:left;'
			},
			tbar : [
				{
					xtype : 'chart_Toolbar'					
				}
			],
			items : [
				{
					xtype:'chart_NetworkReport',
					title : '네트워크 트래픽(분)',
					width:500,
					height:350
				},
				{
					xtype:'chart_NetworkReport',
					title : '네트워크 트래픽(시간)',
					width:500,
					height:350					
				},
				{
					xtype:'chart_NetworkReport',
					title : '네트워크 트래픽(일)',
					width:500,
					height:350
				},
				{
					xtype:'chart_NetworkReport',
					title : '네트워크 트래픽(월)',
					width:500,
					height:350
				}
			]
		}
	],
	listeners : {
		afterrender: 'ReconfigureStore'
	}

});