Ext.define('mms.view.menu.LeftMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.leftmenu',
    
		onMenuClick:function(obj, selObj){
      //this.setMainBar(selObj.data.url, selObj.data.name);
      var mmsController = mms.app.getController('MmsController');

			if(selObj.data.name == '대시보드') {
				mmsController.setMainBar(selObj.data.url, '대시보드');
				//mmsController.setMainBar(selObj.data.url, selObj.data.name);
			}
			else {
				mmsController.setMainBar(selObj.data.url, selObj.data.name);	
			}
    }
	
});