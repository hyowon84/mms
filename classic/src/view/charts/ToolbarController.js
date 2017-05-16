
Ext.define('mms.view.charts.ToolbarController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ChartToolbarController',

	/*종합유형은 라디오사용 */
	onTotalSearch: function (btn, e) {
		//var o_store = Ext.ComponentQuery.query('[title='+v_menu.name+']')[0].query('[name=Chart]');
		var tab = btn.up('[ariaRole=tabpanel]');
		var o_store = tab.query('[name=Chart]');
		var v_param = new Object();
		v_param.node_id = tab.node_id;
		v_param.timetype = tab.query('radiogroup')[0].getValue().timetype; 
		
		for(var i = 0; i < o_store.length; i++) {
			var store = o_store[i].getStore();
			Ext.apply(store.getProxy().extraParams, v_param);
			store.load();
		}
	},

	/*단일유형 라디오사용안함  자동으로 분, 시, 일, 월 기준으로 조회 */
	onSearch: function (btn, e) {

		//var o_store = Ext.ComponentQuery.query('[title='+v_menu.name+']')[0].query('[name=Chart]');
		var tab = btn.up('[ariaRole=tabpanel]');
		var o_store = tab.query('[name=Chart]');
		var v_param = new Object();
		v_param.node_id = tab.node_id;

		for(var i = 0; i < o_store.length; i++) {
			var store = o_store[i].getStore();
			Ext.apply(store.getProxy().extraParams, v_param);
			store.load();
		}
	}
	
});