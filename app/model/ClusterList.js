
Ext.define('mms.model.ClusterList', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'cluster_id',			type : 'string' },
		{ name : 'cluster_name',		type : 'string' },
		{ name : 'api_key',					type : 'string' },
		{ name : 'api_id',					type : 'string' },
		{ name : 'reg_date',				type : 'date' }
	]
});


