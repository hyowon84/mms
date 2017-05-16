
/* 소프트레이어 이벤트로그 */
Ext.define('mms.view.main.EventLog', {
    extend: 'Ext.grid.Panel',
    xtype: 'EventLog',
    requires: [
        'mms.store.EventLog'
    ],
    title: 'SOFTLAYER Event Log',

    store: {
        type: 'EventLog'
    },

    columns: [
			{ text: '계정ID',  				dataIndex: 'accountId',				width:120,		align:'center',		style:'text-align:center',		hidden:true },
			{ text: '이벤트발생일',		dataIndex: 'eventCreateDate',	width:160,		align:'center',		style:'text-align:center',		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
			{ text: '이벤트명', 				dataIndex: 'eventName',				width:160,		align:'center',		style:'text-align:center' },
			{ text: 'IP', 						dataIndex: 'ipAddress',				width:160,		align:'center',		style:'text-align:center' },
			{ text: 'label', 					dataIndex: 'label',						width:160,		align:'center',		style:'text-align:center' },
			{ text: '오브젝트ID', 			dataIndex: 'objectId',				width:160,		align:'center',		style:'text-align:center',		hidden:true },
			{ text: '오브젝트명', 			dataIndex: 'objectName',			width:160,		align:'center',		style:'text-align:center',		hidden:true },
			{ text: 'traceId', 				dataIndex: 'traceId',					width:160,		align:'center',		style:'text-align:center',		hidden:true },
			{ text: 'userId', 				dataIndex: 'userId',					width:160,		align:'center',		style:'text-align:center',		hidden:true },
			{ text: 'userType', 			dataIndex: 'userType',				width:160,		align:'center',		style:'text-align:center' }
    ],
		
    listeners: {
        //select: 'onItemSelected'
    }
});

/* 소프트레이어 공지사항 */
Ext.define('mms.view.main.NotiLog', {
	extend: 'Ext.grid.Panel',
	xtype: 'NotiLog',
	requires: [
		'mms.store.NotiLog'
	],
	title: 'SOFTLAYER Notification Occurrence Event',
	store: {
		type: 'NotiLog'
	},
	columns: [
		{ text: '시작일',				dataIndex: 'startDate',		width:160,		align:'center',		style:'text-align:center',		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
		{ text: '종료일',				dataIndex: 'endDate',			width:160,		align:'center',		style:'text-align:center',		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
		{ text: '공지명', 				dataIndex: 'subject',			width:600,		align:'center',		style:'text-align:center' },
		{ text: '내용'	, 				dataIndex: 'summary',			width:160,		align:'center',		style:'text-align:center',		hidden:true }
	],
	plugins: [{
		ptype: 'rowexpander',
		rowBodyTpl : new Ext.XTemplate(
			'<p><b>subject:</b> {subject}</p>',
			'<p><b>summary:</b> {summary}</p>')
	}],
	listeners: {
		//select: 'onItemSelected'
	}
});
