
Ext.define('mms.view.admin.FrmMemberInfo', {
	extend: 'Ext.form.Panel',
	xtype: 'FrmMemberInfo',
	alias:'widget.FrmMemberInfo',
	name: 'FrmMemberInfo',
	frame: true,
	//id : 'frmAdminMbinfo',
	//controller:'infoMain',
	//bodyPadding: 10,
	controller:'MbListMainController',
	url : '/resources/crud/admin/Mbinfo.insert.php',
	fieldDefaults: {
		labelAlign: 'right',
		labelWidth: 120,
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
							width: 300
						}
					]
				},
				{
					xtype: 'fieldset',
					title : '기본회원정보',
					layout: 'anchor',
					defaultType: 'textfield',
					margin: '10 0 10 0',
					items: [
						{
							fieldLabel: '아이디',
							name: 'mb_id',
							width: 300,
							allowBlank: false
						},
						{
							fieldLabel: '새 비밀번호',
							name: 'mb_password',
							inputType: 'password',
							width: 300,
							allowBlank: false
						},
						{
							fieldLabel: '새 비밀번호 확인',
							name: 'mb_password2',
							inputType: 'password',
							width: 440,
							allowBlank: false
						},
						{
							fieldLabel: '이름',
							name: 'mb_name',
							width: 300,
							emptyText: '이름을 입력하세요',
							allowBlank: false
						},
						{
							fieldLabel: 'H.P',
							name: 'mb_hp',
							width: 300,
							emptyText: 'xxx-xxx-xxxx',
							maskRe: /[\d\-]/,
							regex: /^\d{3}-(\d{3}|\d{4})-\d{4}$/,
							regexText: '입력양식 xxx-xxx-xxxx'
						},
						{
							fieldLabel: 'Email',
							name: 'mb_email',
							vtype: 'email',
							width: 300,
							allowBlank: false
						},
						{
							fieldLabel: '회사명',
							name: 'mb_name',
							width: 300,
							emptyText: '회사명',
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
			handler: 'closeWinMemberInfo'
		},
		{
			text: '저장',
			handler: 'registWinMemberInfo'
		}
	]
});

Ext.define('mms.view.admin.WinMbInfo', {
	extend: 'Ext.window.Window',
	xtype: 'WinMbInfo',
	alias:'widget.WinMbInfo',
	name: 'WinMbInfo',
	//id : 'WinMbInfo',
	title: '회원정보 작성',
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
	width : 515,
	height: 415,
	tools: [],
	layout: {
		type: 'border',
		padding: 5
	},
	items: [
		{
			xtype: 'FrmMemberInfo'
		}
		
	]	//items item end
});
