Ext.define('mms.view.master.NodeAlertMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.NodeAlertMainController',
	popup:{},
	onSelectChange :function(view, records) {
		if(records.length > 0) {
			var v_cluster_id = records[0].data.cluster_id;
			var winNodeInfo = Ext.ComponentQuery.query('[name=WinNodeInfo]')[0];
			var winMbInfo = Ext.ComponentQuery.query('[name=WinMbInfo]')[0];
	
			//윈도우 존재시 cluster_id 입력,
			if(winNodeInfo) {
				winNodeInfo.query('[name=cluster_id]')[0].setValue(v_cluster_id);
			}

			//윈도우 존재시 cluster_id 입력,
			if(winMbInfo) {
				winMbInfo.query('[name=cluster_id]')[0].setValue(v_cluster_id);
			}
		}
	}	
	
});