
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


/*노드 OS */
Ext.define('mms.store.node_os', {
	extend: 'Ext.data.ArrayStore',
	//extend: 'Ext.data.Store',
	model: 'mms.model.comboDefault',
	alias: 'store.node_os',
	data: [
		['LINUX','O00'],
		['WINDOW','O10']
	]
});

/*노드 유형 */
Ext.define('mms.store.node_type', {
	extend: 'Ext.data.ArrayStore',
	//extend: 'Ext.data.Store',
	model: 'mms.model.comboDefault',
	alias: 'store.node_type',
	data: [
		['VM','VM'],
		['BM','BM']
	]
});

