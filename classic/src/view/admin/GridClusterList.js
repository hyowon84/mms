
/* 클러스터 목록 */
Ext.define('mms.view.admin.GridClusterList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GridClusterList',
	name : 'GridClusterList',
	//viewModel: { type: 'ClusterList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.ux.SlidingPager',
		'Ext.form.*'	
	],
	alias:'widget.GridClusterList',
	controller:'ClusterNodeListMainController',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 2
		});
		var store = Ext.create('mms.store.ClusterList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : '클러스터ID',		width : 120,		dataIndex : 'cluster_id',		align:'left'	},
				{ text : '고객회사명',		width : 120,		dataIndex : 'cluster_name',	align:'left',		editor:{allowBlank:true}	},
				{ text : 'API_ID', 			width : 150,		dataIndex : 'api_id',				align:'left',		editor:{allowBlank:true}	},
				{ text : 'API_KEY', 		width : 300,		dataIndex : 'api_key',			align:'left',		editor:{allowBlank:true}	}
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{
					text	: '생성',
					iconCls	: 'icon-add',
					wid : 'WinClusterInfo',
					handler: 'createWindow'
				},
				{
					text	: '삭제',
					iconCls	: 'icon-delete',
					gid : 'GridClusterList',
					rec : '클러스터',
					handler: 'deleteGridList'
				}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 50,
				store: store,
				displayInfo: true,
				plugins: new Ext.ux.SlidingPager()
			}
			
		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
		this.getStore().load();
	},
	listeners : {
		selectionchange: 'onSelectChange'
	}
});
