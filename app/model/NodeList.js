
Ext.define('mms.model.NodeList', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'cluster_id',   type : 'string' },
		{ name : 'manager_ip',   type : 'string' },
		{ name : 'node_id',      type : 'string' },
		{ name : 'node_ip',      type : 'string' },
		{ name : 'node_name',    type : 'string' },
		{ name : 'node_os',      type : 'string' },
		{ name : 'node_type',    type : 'string' },
		{ name : 'node_level',   type : 'string' },
		{ name : 'upd_date',     type : 'date' },
		{ name : 'reg_date',     type : 'date' },
		{ name : 'sms_cpu_w',    type : 'string' },
		{ name : 'sms_cpu_c',    type : 'string' },
		{ name : 'sms_cpu_f',    type : 'string' },
		{ name : 'sms_memory_w', type : 'string' },
		{ name : 'sms_memory_c', type : 'string' },
		{ name : 'sms_memory_f', type : 'string' },
		{ name : 'sms_date',     type : 'date' }
	]
});


Ext.define('mms.model.NodeSummary', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'TITLE', type : 'string' },
		{ name : 'VAL',   type : 'string' }
	]
});


Ext.define('mms.model.ExceptTimeList', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'no',      		type : 'int' },
		{ name : 'cluster_id',  type : 'string' },
		{ name : 'node_id',     type : 'string' },
		{ name : 'ec_sdate',    type : 'date' },
		{ name : 'ec_edate',    type : 'date' },
		{ name : 'ec_memo',     type : 'string' },
		{ name : 'reg_date',    type : 'date' }
	]
});


