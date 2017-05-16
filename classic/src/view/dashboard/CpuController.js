Ext.define('mms.view.dashboard.CpuController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.dashboardCpu',
	calledByOther:function(param){
			//this.popup = param;
	},
	onReturn:function(){
			//this.popup.callbackPopup(this.lookupReference('userId').getValue());
			this.getView().destroy();
	}
	//onSearch:function(obj, selObj){
	//var me = this;
	//var userId = this.lookupReference('userId').getValue();
	//Ext.Ajax.request({
	//    url:'../ServerPage/DuplicateUser.jsp',
	//    params:{
	//        userId:userId
	//    },
	//    success:function(res){
	//        var obj = Ext.JSON.decode(res.responseText);
	//        Ext.Msg.alert("오류", obj.msg);
	//    },
	//    fail:function(res){
	//        Ext.Msg.alert('오류', '시스템 장애입니다');
	//    }
	//});
	//},
});