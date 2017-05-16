
Ext.define('mms.view.admin.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.adminMain',
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
