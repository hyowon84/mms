
/* 주문목록 */
Ext.define('mms.model.MemberList', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'cluster_id',      type : 'string' },
		{ name : 'mb_company',      type : 'string' },
		{ name : 'mb_id',      type : 'string' },
		{ name : 'mb_password',      type : 'string' },
		{ name : 'mb_name',      type : 'string' },
		{ name : 'mb_hp',      type : 'string' },
		{ name : 'mb_email',      type : 'string' },
		{ name : 'mb_level',      type : 'string' },
		{ name : 'reg_date',      type : ' DATE' }
	]
});