
/*
 constructor: function (config) {
 config = config || {};

 config.data = [
 { month: 'Jan', data1: 20, data2: 37, data3: 35, data4: 4, other: 4 },
 { month: 'Feb', data1: 20, data2: 37, data3: 36, data4: 5, other: 2 },
 { month: 'Mar', data1: 19, data2: 36, data3: 37, data4: 4, other: 4 },
 { month: 'Apr', data1: 18, data2: 36, data3: 38, data4: 5, other: 3 },
 { month: 'May', data1: 18, data2: 35, data3: 39, data4: 4, other: 4 },
 { month: 'Jun', data1: 17, data2: 34, data3: 42, data4: 4, other: 3 },
 { month: 'Jul', data1: 16, data2: 34, data3: 43, data4: 4, other: 3 },
 { month: 'Aug', data1: 16, data2: 33, data3: 44, data4: 4, other: 3 },
 { month: 'Sep', data1: 16, data2: 32, data3: 44, data4: 4, other: 4 },
 { month: 'Oct', data1: 16, data2: 32, data3: 45, data4: 4, other: 3 },
 { month: 'Nov', data1: 15, data2: 31, data3: 46, data4: 4, other: 4 },
 { month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4, other: 3 }
 ];

 this.callParent([config]);
 }*/




/* 프로세스 로드 정보 */
Ext.define('mms.store.LoadReport', {
	extend: 'Ext.data.Store',
	alias: 'store.LoadReport',
	fields: ['m_date','mdate', 'D1', 'D2', 'D3'],
	autoLoad : false,
	sorters:[
		{
			property:'m_date',
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/chart.php?mode=load_report'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


/* CPU 사용량 정보 */
Ext.define('mms.store.CpuReport', {
	extend: 'Ext.data.Store',
	alias: 'store.CpuReport',
	fields: ['m_date','mdate','D1','D2','D3','D4','D5','D6'],
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property:'m_date',
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/chart.php?mode=cpu_report'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


/* 메모리 사용량 정보 */
Ext.define('mms.store.MemReport', {
	extend: 'Ext.data.Store',
	alias: 'store.MemReport',
	fields: ['m_date','mdate','D1','D2'],
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property:'m_date',
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/chart.php?mode=mem_report'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});

/* 네트워크 사용량 정보 */
Ext.define('mms.store.NetworkReport', {
	extend: 'Ext.data.Store',
	alias: 'store.NetworkReport',
	fields: ['m_date','mdate','D1','D2'],
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property:'m_date',
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/chart.php?mode=network_report'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


/* 디스크 사용량 정보 */
Ext.define('mms.store.DiskReport', {
	extend: 'Ext.data.Store',
	alias: 'store.DiskReport',
	fields: ['m_date','mdate','D1','D2'],
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property:'m_date',
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/chart.php?mode=disk_report'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


/* 노드 OS 사용률 */
Ext.define('mms.store.NodeSummary', {
	extend: 'Ext.data.Store',
	alias: 'store.NodeSummary',
	fields: ['node_os','node_cnt'],
	autoLoad : true,
	sorters:[
		{
			property:'VAL',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/chart.php?mode=node_summary'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});



/* 노드 활성화 정보 */
Ext.define('mms.store.NodeActive', {
	extend: 'Ext.data.Store',
	alias: 'store.NodeActive',
	fields: ['node_type','node_cnt'],
	autoLoad : true,
	sorters:[
		{
			property:'VAL',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/chart.php?mode=node_active'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});



/* 메모리 사용량 정보 */
Ext.define('mms.store.DynamicChartMemoryUse', {
	extend: 'Ext.data.Store',
	alias: 'store.DynamicChartMemoryUse',
	fields: ['m_date','mdate','D1','D2'],
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property:'m_date',
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read	: './resources/data/multiChart.php?mode=mem_report'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	},
	listeners: {
		load: function(store, records, success, operation) {
			//var reader = store.getProxy().getReader(),
			response = operation.getResponse();
			//var mmsController = mms.app.getController('MmsController');
			var data = Ext.JSON.decode(response.responseText).data[0];
			
			var lm = Ext.ComponentQuery.query('[name=LeftMenu]')[0];
			lm.getSelectionModel().select(lm.store.getAt(0));
			
			//console.log(reader.getResponseData(response).errmsg);
			
			/* 동적생성 차트 셋팅*/
			var data = Ext.decode(response.responseText);
			//store.model.setFields(data.fields);
			
			var chart = this;
			
			
			//set array series
			var series = [];
			//clear series
			chart.series.clear();
			for(var field in data.fields){
				if(data.fields[field] !== xField){
					chart.series.add({
						type:'line',
						xField:xField,
						yField:data.fields[field]
					});
			
					series.push(data.fields[field]);
				}
			}
			
			var mAxes = chart.axes.items;
			for(var axis in mAxes){
				if(mAxes[axis].type === "Numeric"){
					mAxes[axis].fields = series;
					mAxes[axis].maximum = data.maximum;
					mAxes[axis].minimum = data.minimum;
				}
			}
			chart.axes.items = [];
			chart.axes.items = mAxes;
			chart.bindStore(store);
			chart.redraw();
			chart.refresh();
			
			
		}
	}
});
