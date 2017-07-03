/**
 * Created by lucael on 2017-03-24.
 */

/* 알람 관리할 노드 목록 */
Ext.define('mms.view.master.GridNodeAlertList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GridNodeAlertList',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.SlidingPager'
	],
	name : 'GridNodeAlertList',
	alias:'widget.GridNodeAlertList',
	controller:'NodeAlertMainController',
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
				{ text : '노드ID',									width: 120,		dataIndex : 'node_id',			align:'left', 		style:"text-align:center;"	},
				{ text : '노드 별칭',								width: 120,		dataIndex : 'node_name',		align:'left', 		style:"text-align:center;",						editor:{allowBlank:true}	},
				{ text : 'O/S', 										width: 140,		dataIndex : 'node_os',			align:'center', 	editor:  {xtype : 'cb_nodeos'},				renderer: rendererCombo	},
				{ text : '유형', 										width: 140,		dataIndex : 'node_type',		align:'center', 	editor:  {xtype : 'cb_nodetype'},			renderer: rendererCombo	},
				{ text : '매니저서버IP',						width: 130,		dataIndex : 'manager_ip',		align:'center',		editor:{allowBlank:true}	},
				{ text : '노드IP',									width: 130,		dataIndex : 'node_ip',			align:'center',		editor:{allowBlank:true}	},
				{ text : '노드등급', 								width: 130,		dataIndex : 'node_level',		align:'center',		editor:{allowBlank:true}	},
				{	header: 'CPU알람<br>Warning',			width: 170,		dataIndex: 'sms_cpu_w',			align:'center',		xtype: 'checkcolumn',		headerCheckbox: true,		stopSelection: false	},
				{	header: 'CPU알람<br>Critical',		width: 170,		dataIndex: 'sms_cpu_c',			align:'center',		xtype: 'checkcolumn',		headerCheckbox: true,		stopSelection: false	},
				{	header: 'CPU알람<br>Fatal',				width: 170,		dataIndex: 'sms_cpu_f',			align:'center',		xtype: 'checkcolumn',		headerCheckbox: true,		stopSelection: false	},
				{	header: 'MEMORY알람<br>Warning',	width: 170,		dataIndex: 'sms_memory_w',	align:'center',		xtype: 'checkcolumn',		headerCheckbox: true,		stopSelection: false	},
				{	header: 'MEMORY알람<br>Critical',	width: 170,		dataIndex: 'sms_memory_c',	align:'center',		xtype: 'checkcolumn',		headerCheckbox: true,		stopSelection: false	},
				{	header: 'MEMORY알람<br>Fatal',		width: 170,		dataIndex: 'sms_memory_f',	align:'center',		xtype: 'checkcolumn',		headerCheckbox: true,		stopSelection: false	},
				{ text : '갱신일', 									width: 130,		dataIndex : 'upd_date',			align:'center',		renderer: Ext.util.Format.dateRenderer('Y-m-d')		/*,	field: { xtype: 'datefield' }*/	}
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				/*{
					text	: '생성',
					iconCls	: 'icon-add',
					handler: 'createWinMbInfo'
				}*/
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



/* 알람 제외 시간 목록 */
Ext.define('mms.view.master.GridExceptTimeList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GridExceptTimeList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.SlidingPager'
	],
	name : 'GridExceptTimeList',
	alias:'widget.GridExceptTimeList',
	controller:'NodeAlertMainController',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('mms.store.ExceptTimeList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : '제외대상 노드',			width: 140,		dataIndex : 'node_id',			align:'center', 	editor:  {xtype : 'cb_NodeList'},		renderer: rendererCombo		},
				{ text : '제외시간 시작일',		width: 160,		dataIndex : 'ec_sdate',			align:'left', 		style:"text-align:center;",		field: { xtype: 'datefield',	format:'Y-m-d H:i:s' },		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
				{ text : '제외시간 종료일',		width: 160,		dataIndex : 'ec_edate',			align:'left', 		style:"text-align:center;",		field: { xtype: 'datefield',	format:'Y-m-d H:i:s' },		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
				{ text : '메모', 							width: 140,		dataIndex : 'ec_memo',			align:'center', 	editor:{allowBlank:true}	},
				{ text : '생성일',						width: 130,		dataIndex : 'upd_date',			align:'center',		renderer: Ext.util.Format.dateRenderer('Y-m-d')		/*,	field: { xtype: 'datefield' }*/	}
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{
					text	: '생성',
					iconCls	: 'icon-add',
					handler: function (btn, e) {

						var grid = btn.up('[name=GridExceptTimeList]');
						//var o_store = tab.query('[name=Chart]');
						
						var rec = {
							ec_sdate : new Date(),
							ec_edate : new Date()							
						};
						grid.getStore().insert(0, rec);
						grid.getStore().load();
					}
				},
				{
					text	: '삭제',
					iconCls	: 'icon-delete',
					handler: function() {

					}
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
