Ext.define('mms.store.EventLog', {
	extend: 'Ext.data.Store',
	model : 'mms.model.EventLog',
	alias: 'store.EventLog',
	storeId: 'EventLog',
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	sorters:[
		{
			property:'eventCreateDate',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/api/sl.php?mode=eventlog'			
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


Ext.define('mms.store.NotiLog', {
	extend: 'Ext.data.Store',
	model : 'mms.model.NotiLog',
	alias: 'store.NotiLog',
	storeId: 'NotiLog',
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	sorters:[
		{
			property:'modifyDate',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/api/sl.php?mode=notilog'
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

