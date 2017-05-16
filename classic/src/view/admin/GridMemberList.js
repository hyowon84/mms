/**
 * Created by lucael on 2017-03-24.
 */

/* 회원 목록 */
Ext.define('mms.view.admin.GridMemberList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GridMemberList',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.ux.SlidingPager',
		'Ext.form.*'	
	],
	name : 'GridMemberList',
	alias:'widget.GridMemberList',
	controller:'MbListMainController',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 2
		});
		var store = Ext.create('mms.store.MemberList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : '클러스터ID',		dataIndex : 'cluster_id',		width : 120,		align:'left'	},
				{ text : '소속',					dataIndex : 'cluster_name',	width : 120,		align:'left'	},
				{ text : 'ID',					dataIndex : 'mb_id',				width : 100,		align:'left'	},
				{ text : '회원명',				dataIndex : 'mb_name',			width : 100,		align:'left',		editor:{allowBlank:true}	},
				{ text : '연락처',				dataIndex : 'mb_hp',				width : 100,		align:'left',		editor:{allowBlank:true}	},
				{ text : '이메일',				dataIndex : 'mb_email',			width : 100,		align:'left',		editor:{allowBlank:true}	},
				{ text : '등급',					dataIndex : 'mb_level',			width : 100,		align:'left',		editor:{allowBlank:true}	}
				
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{
					text	: '생성',
					iconCls	: 'icon-add',
					handler: 'createWinMbInfo'
				},
				{
					text	: '삭제',
					iconCls	: 'icon-delete',
					handler: 'deleteWinMemberInfo'
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

