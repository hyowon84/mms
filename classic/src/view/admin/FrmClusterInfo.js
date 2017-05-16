Ext.define('mms.view.admin.FrmClusterInfo', {
	extend: 'Ext.form.Panel',
	xtype: 'FrmClusterInfo',
	alias:'widget.FrmClusterInfo',
	name: 'FrmClusterInfo',
	frame: true,
	reference : 'FrmClusterInfo',
	controller:'ClusterNodeListMainController',
	url : '/resources/crud/admin/ClusterInfo.insert.php',
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
					title : '클러스터 정보',
					layout: 'anchor',
					defaultType: 'textfield',
					margin: '10 0 10 0',
					items: [
						{
							fieldLabel: '클러스터ID',
							name: 'cluster_id',
							width: 400,
							allowBlank: false
						},
						{
							fieldLabel: '클러스터 이름',
							name: 'cluster_name',
							width: 400,
							emptyText: '클러스터 이름을 입력하세요',
							allowBlank: false
						},
						{
							fieldLabel: 'SOFTLAYER API KEY',
							name: 'api_key',
							width: 400,
							allowBlank: false
						},
						{
							fieldLabel: 'SOFTLAYER API ID',
							name: 'api_id',
							width: 400,
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
			fid : 'FrmClusterInfo',
			gid : 'GridClusterList',
			handler: 'registWindowForm'
		}
	]
});


Ext.define('mms.view.admin.WinClusterInfo', {
	extend: 'Ext.window.Window',
	xtype: 'WinClusterInfo',
	alias:'widget.WinClusterInfo',
	name: 'WinClusterInfo',
	title: '클러스터정보 작성',
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
	height: 265,
	tools: [],
	layout: {
		type: 'border',
		padding: 5
	},
	items: [
		{
			xtype: 'FrmClusterInfo'
		}
	]	//items item end
});
