
Ext.define('mms.store.ClusterList', {
	extend: 'Ext.data.Store',
	alias: 'store.ClusterList',
	storeId: 'ClusterList',
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
			read : '/resources/crud/admin/info.php?mode=ClusterList',
			update : '/resources/crud/admin/ClusterList.update.php',
			destroy : '/resources/crud/admin/ClusterList.delete.php'
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