Ext.define('mms.view.admin.ClusterListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adminClusterList',
    popup:{},    
		onSelectChange:function(view, records){
    },
	
    calledByOther:function(param){
        //this.popup = param;
    },
    onReturn:function(){
        //this.popup.callbackPopup(this.lookupReference('userId').getValue());
        this.getView().destroy();
    }
});