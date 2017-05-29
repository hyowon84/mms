Ext.define('mms.view.admin.MbListMainController', {	//'mms.controller.admin.MbListMainController',
	extend: 'Ext.app.ViewController',
	alias: 'controller.MbListMainController',
	popup:{},

	/* 회원목록 그리드의 회원정보 작성 윈도우 열기 */
	createWinMbInfo : function() {
		var winMbInfo = Ext.ComponentQuery.query('[name=WinMbInfo]');
	
		
		
		if(winMbInfo.length > 0) {
			if(myInfo.getAt(0).data.mb_type != 'M00') {
				var fs = winMbInfo[0].query('[name=fs_cluster]');
				winMbInfo[0].query('[name=cluster_id]')[0].setValue(myInfo.getAt(0).data.cluster_id);
				fs[0].hide();				
			}
			
			winMbInfo[0].show();
		}
		else {
			var winMbInfo = Ext.create('mms.view.admin.WinMbInfo', {
				//title: v_menu.name,
				//name: v_menu.node_id,
				//cluster_id: v_menu.cluster_id,
				//node_id: v_menu.node_id,
				height:440,
				autoShow: true,
				autoDestroy: true,
				listeners: {
					show: function (window) {
						
						if(myInfo.getAt(0).data.mb_type != 'M00') {
							var fs = this.query('[name=fs_cluster]');
							this.query('[name=cluster_id]')[0].setValue(myInfo.getAt(0).data.cluster_id);
							fs[0].hide();
							this.setHeight(390);
						}
						
						//window.getEl().setOpacity(0);
						//window.getEl().fadeIn({duration: 2000});
					}
				}
			});

			winMbInfo.show();
		}
	},

	/* 회원계정 삭제 */
	deleteWinMemberInfo : function(btn, selObj) {
		var grid = Ext.ComponentQuery.query('[name=GridMemberList]')[0];
		var sm = grid.getSelectionModel().getSelection();
		if(!sm) {
			Ext.MessageBox.alert('안내','선택된 회원정보가 없습니다');
			return;
		}

		Ext.MessageBox.confirm('회원정보 삭제', '선택한 회원정보를 삭제하시겠습니까?', function(btn, text) {
			if(btn == 'yes') {

				if(sm[0].cluster_id == 'admin') {
					Ext.MessageBox.alert('안내','관리자 계정은 삭제할수 없습니다');
					return;
				}
				grid.store.remove(sm[0]);
			}
		}, function(){

		});
	},
	
	/* 회원정보 작성 윈도우 닫기 */
	closeWinMemberInfo : function(btn, selObj) {
		var frm = btn.up().up();
		var win = frm.up();
		frm.reset();		
		win.hide();
	},
	
	/* 회원정보 입력 */
	registWinMemberInfo : function(obj,selObj){
		var form = Ext.ComponentQuery.query('[name=FrmMemberInfo]')[0];
		var grid = Ext.ComponentQuery.query('[name=GridMemberList]')[0];

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

	calledByOther:function(param){
			//this.popup = param;
	},
	onReturn:function(){
			//this.popup.callbackPopup(this.lookupReference('userId').getValue());
			this.getView().destroy();
	},
	onSelectChange :function(view, records) {
		if(records.length > 0) {
			var v_cluster_id = records[0].data.cluster_id;
			var winMbInfo = Ext.ComponentQuery.query('[name=WinMbInfo]')[0];
	
			//윈도우 존재시 cluster_id 입력,
			if(winMbInfo) {
				winMbInfo.query('[name=cluster_id]')[0].setValue(v_cluster_id);
			}
		}
	}
});