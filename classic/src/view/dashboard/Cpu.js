Ext.define('mms.view.dashboard.Cpu', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dashboardCpu',
	requires:[
		'mms.view.dashboard.MainController',
		'mms.view.charts.LoadReport'
	],
	controller:'dashboardMain',
	closable: true,
	title:'CPU',
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
					xtype:'chart_CpuReport',
					title : 'CPU 사용량(분)',
					width:500,
					height:350
				},
				{
					xtype:'chart_CpuReport',
					title : 'CPU 사용량(시간)',
					width:500,
					height:350					
				},
				{
					xtype:'chart_CpuReport',
					title : 'CPU 사용량(일)',
					width:500,
					height:350
				},
				{
					xtype:'chart_CpuReport',
					title : 'CPU 사용량(월)',
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