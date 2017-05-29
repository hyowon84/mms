
Ext.define('mms.view.report.ToolbarController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ReportToolbarController',
	
	downloadExcel : function (btn, e) {
		
		//var o_store = Ext.ComponentQuery.query('[title='+v_menu.name+']')[0].query('[name=Chart]');
		var tab = btn.up('[ariaRole=tabpanel]');
		var grid = tab.query('[name=GridNodeList]')[0];
		//var v_param = new Object();
		var v_node_list = '';
		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','엑셀데이터로 추출할 노드를 선택해주세요');
			return false;
		}

		
		for(var i = 0; i < sm.length; i++) {
			v_node_list += sm[i].data.node_id+","
		}
		//v_param.sdate = tab.query('[name=sdate]')[0].getValue();
		//v_param.edate = tab.query('[name=edate]')[0].getValue();
		v_node_list = v_node_list.substr(0,v_node_list.length-1);
		window.open('/resources/excel/test.php?node_list='+v_node_list);		
	}
	
});