Ext.define('mms.view.info.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.infoMain',
    //popup:{},
    calledByOther:function(param){
        //this.popup = param;
    },

		mbInfoLoading : function(component, eOpts){
			//본인 회원정보 로딩
			component.loadRecord(myInfo.last());
		},
	
		onMemberInfoClose : function(btn, selObj) {
			var tab = btn.up('[ariaRole=tabpanel]');
			//tab.up().remove(tab);
			//tab.doClose();
			tab.up().remove(tab,true);
			//mainBar.add(panel);
			//mainBar.getLayout().setActiveItem(panel);
			Ext.suspendLayouts();
			Ext.resumeLayouts(true);

		},
	
		onMemberInfoUpdate : function(obj,selObj){
			//this.popup.callbackPopup(this.lookupReference('userId').getValue());
			var form = Ext.getCmp('frm_mbinfo');

			form.submit({
				params : {	
					/*mode : 'form',
					gpcode : sm.get('gpcode'),
					od_id  : sm.get('od_id')*/
				},
				success : function(form,action) {
					Ext.Msg.alert('수정완료', action.result.message);
				},
				failure : function (form, action) {
					Ext.Msg.alert('수정실패', action.result ? action.result.message : '실패하였습니다');
				}
			});
		}
});