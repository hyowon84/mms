
Ext.define('mms.view.info.MbInfoForm', {
	extend: 'Ext.form.Panel',
	alias:'widget.frm_mbinfo',
	id : 'frm_mbinfo',
	frame:true,
	xtype: 'form',
	//controller:'infoMain',
	width: 800,
	bodyPadding: 10,
	url : '/resources/crud/mbinfo.update.php',
	fieldDefaults: {
		labelAlign: 'right',
		labelWidth: 120,
		msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
	},
	items: [
		{
			xtype: 'fieldset',
			title: '회원정보',
			defaultType: 'textfield',
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			items: [
				{
					xtype: 'fieldcontainer',
					layout: 'anchor',
					defaultType: 'textfield',
					margin: '0 0 5 0',
					items: [
						{
							fieldLabel: '아이디',
							name: 'mb_id',
							width: 300,
							readOnly : true
						},
						{
							fieldLabel: '현재 비밀번호',
							name: 'mb_password',
							inputType: 'password',
							width: 300,
							allowBlank: true
						},
						{
							fieldLabel: '새 비밀번호',
							name: 'mb_password2',
							inputType: 'password',
							width: 300,
							allowBlank: true
						},
						{
							fieldLabel: '새 비밀번호 확인',
							name: 'mb_password3',
							inputType: 'password',
							width: 440,
							allowBlank: true
						},
						{
							fieldLabel: '이름',
							name: 'mb_name',
							width: 300,
							emptyText: '이름을 입력하세요',
							allowBlank: false
						},
						{
							fieldLabel: '소속(회사명)',
							name: 'mb_company',
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
						}
					]
				}

			]
		}
	],

	listeners: {
		afterrender: 'mbInfoLoading'
	},

	buttons: [
		{
			text: '닫기',
			handler: 'onMemberInfoClose'
		},
		{
			text: '저장',
			handler: 'onMemberInfoUpdate'
		}
	]
});
