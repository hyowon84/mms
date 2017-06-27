/**
 * Created by lucael on 2017-03-24.
 */

/* 관리자용 클러스터 목록 */
Ext.define('mms.view.admin.GridNodeList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GridNodeList',
	name : 'GridNodeList',
	//viewModel: { type: 'NodeList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.ux.SlidingPager',
		'Ext.form.*'	
	],
	alias:'widget.GridNodeList',
	//controller:'ClusterNodeListMainController',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('mms.store.NodeList');
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
				{ text : '노드ID',				width : 120,		dataIndex : 'node_id',			align:'left'	},
				{ text : '노드 별칭',			width : 120,		dataIndex : 'node_name',		align:'left',		editor:{allowBlank:true}	},
				{ text : 'O/S',		 				width : 150,		dataIndex : 'node_os',			align:'left',		editor:{allowBlank:true}	},
				{ text : '유형', 					width : 130,		dataIndex : 'node_type',		align:'left',		editor:{allowBlank:true}	},
				{ text : '매니저서버IP',	width : 130,		dataIndex : 'manager_ip',		align:'left',		editor:{allowBlank:true}	},
				{ text : '노드IP',				width : 130,		dataIndex : 'node_ip',			align:'left',		editor:{allowBlank:true}	},
				{ text : '노드등급', 			width : 130,		dataIndex : 'node_level',		align:'left',		editor:{allowBlank:true}	},
				{ text : '갱신일', 				width : 130,		dataIndex : 'upd_date',			align:'left'	}
			],
			tbar : [
				{
					text	: '생성',
					iconCls	: 'icon-add',
					wid : 'WinNodeInfo',
					handler: 'createWindow'
				},
				{
					text	: '삭제',
					iconCls	: 'icon-delete',
					gid : 'GridNodeList',
					rec : '노드',
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
