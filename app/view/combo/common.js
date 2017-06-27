Ext.define('mms.view.combo.common', {
	
});

Ext.define('mms.view.combo.mb_type', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_mbtype',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'mb_type',
	value : 'M10',
	fieldLabel: '계정유형',
	store: {
		type: 'mb_types'
	},
	labelWidth : 60,
	width : 200
});