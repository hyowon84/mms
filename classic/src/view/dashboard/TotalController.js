Ext.define('mms.view.dashboard.TotalController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.dashboardTotal',
	onSearch : function(obj, selObj) {
		var o_store = obj.query('[name=Chart]');
		var v_param = new Object();
		v_param.node_id = obj.node_id;
		v_param.timetype = obj.query('radiogroup')[0].getValue().timetype;

		for(var i = 0; i < o_store.length; i++) {
			var store = o_store[i].getStore();
			Ext.apply(store.getProxy().extraParams, v_param);
			store.load();
		}
	}
});