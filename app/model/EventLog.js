
Ext.define('mms.model.EventLog', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'no',			 	 	 			type : 'int'		},
		{ name : 'cluster_id',    		type : 'string' },
		{ name : 'traceId',      			type : 'string' },
		{ name : 'accountId',    			type : 'int'		},
		{ name : 'eventCreateDate',   type : 'string' },
		{ name : 'eventName',     		type : 'string' },
		{ name : 'ipAddress',    			type : 'string' },
		{ name : 'label',							type : 'string' },
		{ name : 'metaData',    		  type : 'string' },
		{ name : 'objectId',      		type : 'int'		},
		{ name : 'objectName',  		  type : 'string' },
		{ name : 'userId',						type : 'string' },
		{ name : 'userType',					type : 'string' },
		{ name : 'username',					type : 'string' }
	]
});


Ext.define('mms.model.NotiLog', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'no',      							type : 'int' },
		{ name : 'cluster_id',  					type : 'string' },
		{ name : 'endDate',    				 		type : 'string' },
		{ name : 'id',      							type : 'string' },
		{ name : 'lastImpactedUserCount', type : 'string' },
		{ name : 'modifyDate',						type : 'string' },
		{ name : 'recoveryTime',					type : 'string' },
		{ name : 'startDate',							type : 'string' },
		{ name : 'statusCode_KeyName',		type : 'string' },
		{ name : 'statusCode_name',				type : 'string' },
		{ name : 'subject',								type : 'string' },
		{ name : 'summary',								type : 'string' },
		{ name : 'systemticketId',				type : 'string' }
	]
});

