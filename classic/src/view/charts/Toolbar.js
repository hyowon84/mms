/* 단일유형 페이지에서 사용할 툴바 */
Ext.define('mms.view.charts.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
	xtype: 'chart_Toolbar',
	alias:'widget.chart_Toolbar',
	requires:[
		'mms.view.charts.ToolbarController'
	],
	controller:'ChartToolbarController',
	items : [
		{
			xtype : 'datetimefield',
			name : 'sdate',
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
		{
			text:'조회',
			handler: 'onSearch'
		}
	]
});

/* 종합페이지에서 사용할 툴바 */
Ext.define('mms.view.charts.TotalToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	xtype: 'chart_TotalToolbar',
	alias:'widget.chart_TotalToolbar',
	requires:[
		'mms.view.charts.ToolbarController'
	],
	controller:'ChartToolbarController',
	items : [
		/*
		 {
		 xtype : 'datetimefield',
		 name : 'sdate',
		 labelWidth: 50,
		 width: 140
		 },
		 {
		 xtype : 'label',
		 text : '부터',
		 width : 30
		 },*/
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
		{
			xtype: 'radiogroup',
			fieldLabel: '기준시간',
			//LabelAlign: 'right',
			width:300,
			labelWidth: 60,
			labelAlign: 'right',
			labelSeparator: '',
			labelAdjust: 0,
			name: 'timetype',
			columns: [40, 60, 40, 40, 40],
			items: [
				{boxLabel: '분',		inputValue: 'min', 		checked: true},
				{boxLabel: '시간',	inputValue: 'hour'},
				{boxLabel: '일',		inputValue: 'day'},
				{boxLabel: '월',		inputValue: 'month'},
				{boxLabel: '년',		inputValue: 'year'}
			]
		},
		{
			text:'조회',
			handler: 'onTotalSearch'
		}
	]
});
