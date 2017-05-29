
/* 종합페이지에서 사용할 툴바 */
Ext.define('mms.view.report.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
	xtype: 'report_Toolbar',
	alias:'widget.report_Toolbar',
	requires:[
		'mms.view.report.ToolbarController'
	],
	controller:'ReportToolbarController',
	items : [
		{
			xtype : 'datetimefield',
			name : 'sdate',
			value: new Date(Date.parse(new Date()) - (1000 * 60 * 20)),
			labelWidth: 50,
			width: 140
		},
		{
			xtype : 'label',
			text : '부터',
			width : 30
		},
		{
			xtype : 'datetimefield',
			name : 'edate',
			value: new Date(),
			labelWidth: 50,
			width: 140
		},
		{
			xtype : 'label',
			text : '까지',
			width : 30
		},
		//{
		//	xtype: 'radiogroup',
		//	fieldLabel: '기준시간',
		//	//LabelAlign: 'right',
		//	width:250,
		//	labelWidth: 60,
		//	labelAlign: 'right',
		//	labelSeparator: '',
		//	labelAdjust: 0,
		//	name: 'timetype',
		//	columns: [40, 60, 40, 40, 40],
		//	items: [
		//		{boxLabel: '분',		inputValue: 'minute', 	checked: true},
		//		{boxLabel: '시간',	inputValue: 'hour'},
		//		{boxLabel: '일',		inputValue: 'day'},
		//		{boxLabel: '월',		inputValue: 'month'}
		//	]
		//},
		{
			text:'엑셀다운로드',
			handler: 'downloadExcel'
		}
	]
});