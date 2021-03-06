
Ext.define('mms.view.master.MbListMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.MbListMain',
	requires:[
		'mms.view.admin.MbListMainController',
		'mms.view.admin.GridClusterList',
		'mms.view.master.GridMemberListB',
		'mms.view.admin.FrmMemberInfo',
		'mms.store.MemberList',
		'mms.store.mbinfo'
	],
	controller:'MbListMainController',
	xtype: 'layout-horizontal-box',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '계정관리',
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
					xtype: 'GridMemberListB',
					title : '계정목록',
					width : '100%',
					height:500
				}				
			]
		}
	]
});