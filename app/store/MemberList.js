
Ext.define('mms.store.MemberList', {
	extend: 'Ext.data.Store',
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

/*회원정보스토어*/
Ext.define('mms.store.mbInfo', {
	extend: 'Ext.data.Store',
	alias: 'store.mbInfo',
	storeId: 'mbInfo',
	pageSize : 1,
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
			read : '/resources/crud/mbinfo.php'
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
	},
	listeners: {
		load: function(store, records, success, operation) {
			//var reader = store.getProxy().getReader(),
			response = operation.getResponse();
			var mmsController = mms.app.getController('MmsController');
			var mbinfo = Ext.JSON.decode(response.responseText).data[0];
			var lm = Ext.ComponentQuery.query('[name=LeftMenu]')[0];
			lm.getSelectionModel().select(lm.store.getAt(0));
			
			if(mbinfo.mb_id == 'admin') {
				mmsController.setMainBar('mms.view.admin.Main', 'Main');
			}
			else {
				mmsController.setMainBar('mms.view.dashboard.Main', '대시보드');
			}
			
			//console.log(reader.getResponseData(response).errmsg);
		}
	}
});

/*회원유형 */
Ext.define('mms.store.mb_types', {
	extend: 'Ext.data.ArrayStore',
	//extend: 'Ext.data.Store',
	model: 'mms.model.comboDefault',
	alias: 'store.mb_types',		
	data: [
		['마스터','M10'],
		['일반','M20']
	]
});


var myInfo = Ext.create('mms.store.mbInfo');