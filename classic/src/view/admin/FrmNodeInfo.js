Ext.define('mms.view.admin.FrmNodeInfo', {
	extend: 'Ext.form.Panel',
	xtype: 'FrmNodeInfo',
	alias:'widget.FrmNodeInfo',
	name: 'FrmNodeInfo',
	frame: true,
	reference : 'FrmNodeInfo',
	controller:'ClusterNodeListMainController',
	url : '/resources/crud/admin/NodeInfo.insert.php',
	fieldDefaults: {
		labelAlign: 'right',
		labelWidth: 140,
		msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
	},
	items: [
		{
			xtype: 'fieldset',
			defaultType: 'textfield',
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			items: [
				{
					xtype: 'fieldset',
					title: '클러스터 연결정보',
					layout: 'anchor',
					defaultType: 'textfield',
					margin: '10 0 10 0',
					items: [
						{
							fieldLabel: '클러스터ID',
							name: 'cluster_id',
							width: 300,
							allowBlank : false
						}
					]
				},
				{
					xtype: 'fieldset',
					title : '노드 정보',
					layout: 'anchor',
					defaultType: 'textfield',
					margin: '10 0 10 0',
					items: [
						{
							fieldLabel: '노드ID',
							name: 'node_id',
							width: 400,
							emptyText: '모니터링중인 노드ID를 입력해주세요',
							allowBlank: false
						},
						{
							fieldLabel: '노드 별칭',
							name: 'node_name',
							width: 400,
							emptyText: '노드 별칭을 입력하세요',
							allowBlank: false
						},
						{
							xtype : 'cb_nodeos'
							// O/S
						},
						{
							xtype : 'cb_nodetype'
							// 클라우드 유형
						},
						{
							fieldLabel: '매니저IP',
							name: 'manager_ip',
							width: 400,
							emptyText: '1.1.1.1',
							allowBlank: false
						},
						{
							fieldLabel: '노드IP',
							name: 'node_ip',
							width: 400,
							emptyText: '1.1.1.1',
							allowBlank: false
						},
						{
							fieldLabel: '등급',
							name: 'node_level',
							width: 400,
							emptyText: '1',
							allowBlank: false
						}
					]
				}
			]
		}
	],
	listeners: {
		//afterrender: 'mbInfoLoading'
	},
	buttons: [
		{
			text: '닫기',
			handler: 'closeWindow'
		},
		{
			text: '저장',
			fid : 'FrmNodeInfo',
			gid : 'GridNodeList',
			handler: 'registWindowForm'
		}
	]
});


Ext.define('mms.view.admin.WinNodeInfo', {
	extend: 'Ext.window.Window',
	xtype: 'WinNodeInfo',
	alias:'widget.WinNodeInfo',
	name: 'WinNodeInfo',
	title: '노드 정보 작성',
	reference: 'popupWindow',
	header: {
		titlePosition: 2,
		titleAlign: 'center'
	},
	frame: false,
	closable: true,
	closeAction: 'hide',
	resizable   : false,
	//maximizable: true,
	//animateTarget: 'sendSMS',		/*발주*/
	width : 475,
	height: 420,
	tools: [],
	layout: {
		type: 'border',
		padding: 5
	},
	items: [
		{
			xtype: 'FrmNodeInfo'
		}
	]	//items item end
});
