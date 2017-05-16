// JavaScript Document
Ext.onReady(function(){
	Ext.QuickTips.init();
	
	var login = new Ext.FormPanel({
		labelWidth:90,
		url:'server/login/service.php',
		method:'POST',
		width:300,
		autoHeight:true,
		bodyStyle:'padding: 10px 10px 15px 15px',
		defaultType:'textfield',
		monitorValid:true,
		items:[{
			fieldLabel:'Username',
			id:'txtUsername',name:'txtUsername',
			allowBlank:false
		},{
			fieldLabel:'Password',
			id:'txtPassword',name:'txtPassword',
			allowBlank:false,
			inputType:'password'	
		}],
		buttons:[{
			text:'Login',
			type:'submit',
			name:'signin',
			handler:function(btn){
				login.getForm().submit({
					method:'POST',
					waitTitle:'Please wait...',
					waitMsg:'Try to login..,',
					success:function(){
						Ext.Msg.alert('Message', 'Login successfully!', function(btn,text){
							if(btn == 'ok'){
								var redirect = 'index.php';
								window.location = redirect;	
							}
						});
					},
					failure:function(response){
						Ext.Msg.alert('Message', 'Login failed! Please try again...');
						login.getForm().reset();
						var txtUser=Ext.getCmp('txtUsername');
						txtUser.focus('',10);	
					}
				});
			}
		}]
	});
	
	var createwindow = new Ext.Window({
		title:'Example',
		widht:315,
		height:155,
		closable:false,
		items:login.show()
	});
	
	createwindow.show();
	
});


