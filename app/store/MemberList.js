

Ext.define('mms.store.MemberList', {
	extend: 'Ext.data.Store',
	model : 'mms.model.MemberList',
	alias: 'store.MemberList',
	storeId: 'MemberList',
	fields : [
		{ name : 'cluster_id',		type : 'string' },
		{ name : 'mb_company',		type : 'string' },
		{ name : 'mb_id',					type : 'string' },
		{ name : 'mb_name',				type : 'string' },
		{ name : 'mb_hp',					type : 'string' },
		{ name : 'mb_email',			type : 'string' },
		{ name : 'mb_level',			type : 'string' },
		{ name : 'reg_date',			type : 'date' }
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
			read : '/resources/crud/admin/info.php?mode=MemberList',
			update : '/resources/crud/admin/MemberList.update.php',
			destroy : '/resources/crud/admin/MemberList.delete.php'
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
