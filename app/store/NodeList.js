
Ext.define('mms.store.NodeList', {
	extend: 'Ext.data.Store',
	alias: 'store.NodeList',
	storeId: 'NodeList',
	fields : [
		{ name : 'cluster_id',   type : 'string' },
		{ name : 'node_id',      type : 'string' },
		{ name : 'node_name',    type : 'string' },
		{ name : 'node_os',      type : 'string' },
		{ name : 'node_type',    type : 'string' },
		{ name : 'manager_ip',   type : 'string' },
		{ name : 'node_ip',      type : 'string' },
		{ name : 'node_level',   type : 'string' },
		{ name : 'upd_date',     type : 'date' },
		{ name : 'reg_date',		 type : 'date' }
	],
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'reg_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
			
		},
		api : {
			read : '/resources/crud/admin/info.php?mode=NodeList',
			update : '/resources/crud/admin/NodeList.update.php',
			destroy : '/resources/crud/admin/NodeList.delete.php'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		},
		writer : {
			type : 'json',
			writeAllFields : true,
			encode : true,
			rootProperty : 'data'
		}
	}
});