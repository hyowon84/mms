
Ext.define('mms.view.info.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.infoMain',
	requires:[
		'mms.view.info.MainController',
		'mms.store.MemberList',
		'mms.store.mbInfo'
	],
	controller:'infoMain',
	xtype: 'layout-horizontal-box',
	closable: true,
	frame : false,
	viewModel:{
		type:'infoMain'
	},
	title: '정보관리',
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
			defaults: {
				bodyPadding: 10,
				margin : '2',
				style: 'float:left;'
			},
			items : [
				{
					xtype: 'frm_mbinfo',
					width: 700,
					height:500
				}

			]
		}
	]
});