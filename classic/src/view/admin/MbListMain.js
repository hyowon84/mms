
Ext.define('mms.view.admin.MbListMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.MbListMain',
	requires:[
		'mms.view.admin.MbListMainController',
		'mms.view.admin.GridClusterList',
		'mms.view.admin.GridMemberList',
		'mms.view.admin.FrmMemberInfo',
		'mms.store.MemberList',
		'mms.store.mbInfo'
	],
	controller:'MbListMainController',
	xtype: 'layout-horizontal-box',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '회원정보관리',
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
					xtype: 'GridClusterList',
					title : '클러스터 목록(노드를 묶는 그룹)',
					width: 600,
					height:500
				},
				{
					xtype: 'GridMemberList',
					title : '회원 목록(로그인계정)',
					width: 800,
					height:500
				}				
			]
		}
	]
});