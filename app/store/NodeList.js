
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
		{ name : 'sms_cpu_w', 	 type : 'bool' },
		{ name : 'sms_cpu_c', 	 type : 'bool' },
		{ name : 'sms_cpu_f', 	 type : 'bool' },
		{ name : 'sms_memory_w', type : 'bool' },
		{ name : 'sms_memory_c', type : 'bool' },
		{ name : 'sms_memory_f', type : 'bool' },		
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


/* SMS알람 제외시간 정보 */
Ext.define('mms.store.ExceptTimeList', {
	extend: 'Ext.data.Store',
	alias: 'store.ExceptTimeList',
	storeId: 'ExceptTimeList',
	fields : [
		{ name : 'cluster_id',	type : 'string' },
		{ name : 'node_id',			type : 'string' },
		{ name : 'no',	type : 'string' },
		{ name : 'ec_sdate',		type : 'date' },
		{ name : 'ec_edate',		type : 'date' },
		{ name : 'ec_memo',			type : 'string' },
		{ name : 'reg_date',		type : 'date' }
	],
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'ec_edate',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/master/info.php?mode=ExceptTimeList',
			create : '/resources/crud/master/ExceptTimeList.insert.php',
			update : '/resources/crud/master/ExceptTimeList.update.php',
			destroy : '/resources/crud/master/ExceptTimeList.delete.php'
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

/* 알람 레벨 */
Ext.define('mms.store.alert_level', {
	extend: 'Ext.data.ArrayStore',
	//extend: 'Ext.data.Store',
	model: 'mms.model.comboDefault',
	alias: 'store.alert_level',
	data: [
		['WARNING(70~80%)',70],
		['CRITICAL(80~90%)',80],
		['FATAL(90~100%)',90]
	]
});
