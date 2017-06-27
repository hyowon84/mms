
Ext.define('mms.view.master.NodeAlertMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.NodeAlertMain',
	requires:[
		'mms.view.master.NodeAlertMainController',
		'mms.store.NodeList',
		'mms.store.mbInfo'
	],
	controller:'NodeAlertMainController',
	xtype: 'layout-horizontal-box',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '노드관리',
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
			items : [				
				{
					xtype: 'GridNodeAlertList',
					title : '노드목록',
					width : '100%',
					height:500
				}				
			]
		}
	]
});