

Ext.define('mms.view.menu.LeftMenu', {
	extend: 'Ext.tree.TreePanel',
	alias:'widget.leftmenu',
	name : 'LeftMenu',
	requires:['mms.view.menu.LeftMenuController'],
	controller:'leftmenu',
	width:200,
	title:'메뉴',
	rootVisible:false,
	displayField:'name',
	useArrows:true,
	//icon:'home',
	//icon:"background-image:url('./resources/img/select_confirm.png')",
	store: {
		type:'tree',
		fields:['name', 'url'],
		proxy:{
			type:'ajax',
			url:'/resources/data/LeftMenu.php',
			reader:{
				type:'json'
			}
		},
		autoload:true
	},

	listeners:{		
		itemclick:'onMenuClick'
	}
});