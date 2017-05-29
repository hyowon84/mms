Ext.define('mms.view.admin.ClusterNodeListMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ClusterNodeListMainController',
	popup:{},

	/* *공통* 팝업 윈도우 열기 */
	createWindow : function(btn, selObj) {
		var win = Ext.ComponentQuery.query('[name='+btn.wid+']');
		
		if(win.length > 0) {
			//win[0].query('[name=FrmClusterInfo]');
			win[0].show();
		}
		else {
			var win = Ext.create('mms.view.admin.'+btn.wid, {
				//title: v_menu.name,
				//name: v_menu.node_id,
				//cluster_id: v_menu.cluster_id,
				//node_id: v_menu.node_id,
				autoShow: true,
				autoDestroy: true,
				listeners: {
					show: function (window) {
						//window.getEl().setOpacity(0);
						//window.getEl().fadeIn({duration: 2000});
					}
				}
			});

			win.show();
		}
	},

	/* *공통* 그리드 레코드 삭제 */
	deleteGridList : function(btn, selObj) {
		var grid = Ext.ComponentQuery.query('[name='+btn.gid+']')[0];
		var sm = grid.getSelectionModel().getSelection();
		var rec = btn.rec;

		if(!sm) {
			Ext.MessageBox.alert('안내','선택된 '+rec+'가 없습니다');
			return;
		}

		Ext.MessageBox.confirm(rec+' 삭제', '선택한 '+rec+'를 삭제하시겠습니까?', function(btn, text) {
			if(btn == 'yes') {

				if(sm[0].cluster_id == 'ALL') {
					Ext.MessageBox.alert('안내','관리자 '+rec+'는 삭제할수 없습니다');
					return;
				}
				grid.store.remove(sm[0]);
			}
		}, function(){

		});
	},
	
	/* *공통* 윈도우 팝업 닫기 */
	closeWindow : function(btn, selObj) {
		var frm = btn.up().up();
		var win = frm.up();
		frm.reset();
		win.hide();
	},

	/* *공통* 윈도우팝업 폼 데이터 입력 */
	registWindowForm : function(btn,selObj){
		var form = Ext.ComponentQuery.query('[name='+btn.fid+']')[0];
		var grid = Ext.ComponentQuery.query('[name='+btn.gid+']')[0];

		form.submit({
			params : {
				/*mode : 'form',
				 gpcode : sm.get('gpcode'),
				 od_id  : sm.get('od_id')*/
			},
			success : function(frm,action) {
				frm.reset();
				form.up().hide();
				grid.store.load();
				Ext.Msg.alert('수정완료', action.result.message);
			},
			failure : function (form, action) {
				Ext.Msg.alert('수정실패', action.result ? action.result.message : '실패하였습니다');
			}
		});
	},
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