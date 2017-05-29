
Ext.define('mms.view.report.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ReportMain',
	requires:[
		'mms.view.admin.GridClusterList',
		'mms.view.dashboard.GridNodeList',
		'mms.store.NodeList'
	],
	//controller:'MbListMainController',
	xtype: 'layout-horizontal-box',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '보고서',
	bodyPadding:'5 5 5 5',
	width: '100%',
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	defaults: {
		frame: false,
		style: 'float:left; margin:5px;',
		scrollable: true
	},
	items: [
		{
			width : '100%',
			defaults: {
				bodyPadding: 10,
				margin : '2',
				style: 'float:left;'
			},
			tbar : [
				{
					xtype :  'report_Toolbar'
				}
			],
			items : [
				{
					xtype : 'GridNodeList',
					title : '노드목록',
					width : '100%',
					height: 500
				}				
			]
		}		
	]
});