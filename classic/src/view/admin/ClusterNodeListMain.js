/* 콤보박스 노드OS */

Ext.define('mms.view.combo.NodeList', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_NodeList',
	//queryMode: 'local',
	editable: false,
	displayField: 'node_name',
	valueField: 'node_id',
	name: 'node_id',
	store: {
		type: 'NodeList'
	},
	width : 250	
});


Ext.define('mms.view.combo.node_os', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_nodeos',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'node_os',
	value : 'O00',
	store: {
		type: 'node_os'
	},
	width : 250
});


/* 콤보박스 노드유형*/
Ext.define('mms.view.combo.node_type', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_nodetype',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'node_type',
	value : 'VM',
	store: {
		type: 'node_type'
	},
	width : 250
});

/* 콤보박스 알람레벨 */
Ext.define('mms.view.combo.alert_level', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_alertlevel',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'alert_level',
	value : 70,
	store: {
		type: 'alert_level'
	},
	width : 250
});




Ext.define('mms.view.admin.ClusterNodeListMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ClusterNodeListMain',
	requires:[
		'mms.view.admin.ClusterNodeListMainController',
		'mms.view.admin.GridClusterList',
		'mms.view.admin.GridNodeList',
		'mms.view.admin.GridMemberList',
		'mms.store.MemberList',
		'mms.store.mbinfo'
	],
	controller:'ClusterNodeListMainController',
	xtype: 'layout-horizontal-box',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	name : 'ClusterNodeListMain',
	bodyPadding:'5 5 5 5',
	width : '100%',
	layout : {
		type : 'hbox',
		pack : 'start',
		align : 'stretch'
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
					xtype: 'GridNodeList',
					title : '노드 목록(모니터링 대상)',
					width: 800,
					height:500
				}
			]
		}
	]
});