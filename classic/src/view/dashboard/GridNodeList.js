/* 클라이언트 전용 - 노드 목록 */
Ext.define('mms.view.dashboard.GridNodeList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GridNodeList',
	name : 'GridNodeList',
	alias:'widget.GridNodeList',
	controller:'dashboardMain',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.ux.SlidingPager',
		'Ext.form.*'
	],

	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 2
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
			selType: 'checkboxmodel',
			columns : [
				{ text : '노드ID',				width : 120,		dataIndex : 'node_id',			align:'left'	},
				{ text : '노드 별칭',		width : 120,		dataIndex : 'node_name',		align:'left'	},
				{ text : 'O/S',		 			width : 150,		dataIndex : 'node_os',			align:'left'	},
				{ text : '유형', 				width : 130,		dataIndex : 'node_type',		align:'left'	},
				{ text : '노드IP',				width : 130,		dataIndex : 'node_ip',			align:'left'	},
				{ text : '갱신일', 			width : 130,		dataIndex : 'upd_date',			align:'left'	}
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



/* 클라이언트 전용 - 노드 목록 */
Ext.define('mms.view.dashboard.GridNodeSummary',{
	extend: 'Ext.grid.Panel',
	xtype: 'GridNodeSummary',
	name : 'GridNodeSummary',
	alias:'widget.GridNodeSummary',
	controller:'dashboardMain',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.ux.SlidingPager',
		'Ext.form.*'	
	],
	
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 2
		});
		var store = Ext.create('mms.store.NodeSummary');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : 'OS유형',			width : 160,		dataIndex : 'TITLE',	align:'center'	},
				{ text : '집계',				width : 120,		dataIndex : 'VAL',		align:'center',		style:'text-align:right;'	}
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



