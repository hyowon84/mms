Ext.define('mms.view.dashboard.Total', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dashboardTotal',
	requires:[
		'mms.view.dashboard.TotalController',
		'mms.view.charts.LoadReport'
	],
	controller: 'dashboardTotal',
	closable: true,
	title:'종합',
	bodyPadding:'5 5 5 5',
	width: '100%',
	frame : false,
	defaults: {
		style: 'float:left;'
	},
	scrollable: true,
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
					xtype : 'chart_TotalToolbar'
				}
			],
			items : [
				/*{
					xtype:'chart_LoadReport',
					title : '프로세스 사용량',
					width:500,
					height:350
				},*/
				{
					xtype:'chart_CpuReport',
					title : 'CPU 사용량',
					width:500,
					height:350
				},
				{
					xtype:'chart_MemReport',
					title : '메모리 사용량',
					width:500,
					height:350
				},
				{
					xtype:'chart_NetworkReport',
					title : '네트워크 트래픽',
					width:500,
					height:350
				},
				{
					xtype:'chart_DiskReport',
					title : '디스크 사용량',
					width:500,
					height:350
				}
			]
		}
	],
	listeners : {
		afterrender: 'onSearch'
	}
});