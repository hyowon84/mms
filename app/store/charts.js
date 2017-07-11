
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
	fields: ['m_date','mdate','D1','D2'],
	autoLoad : false,
	remoteSort: true,
	config: {
		numRecords: 10
	},
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
			//read	: './resources/data/chart.php?mode=cpu_report'
			read	: './resources/data/chart.php?mode=cpu_report&timetype=day&cluster_id=ssoh&node_id=winserver2'
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
			//read	: './resources/data/chart.php?mode=mem_report'
			read	: './resources/data/chart.php?mode=mem_report&timetype=day&cluster_id=ssoh&node_id=winserver2'
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
	model : 'mms.model.NodeSummary',
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
			
			var charts = Ext.ComponentQuery.query('[name=DynamicChart]');
			var chart;
			
			//스토에 매칭되는 차트 선택
			for(var i = 0; i < charts.length; i++) {
				if(charts[i].reference == this.type) {
					chart = charts[i];
					break;
				}
			}

			//var test = Ext.getCmp(chart.id); getCmp랑 query랑 동일한 속성의 오브젝트
			
			
			//axes, series 셋팅
			//chart.series.add({
			//	type: 'line',
			//	title: 'node00t',
			//	xField: 'mdate',
			//	yField: 'D1'
			//});
			
			
			//chart.setAxes();
			var axes = [];
			axes = [
			{
				type: 'numeric',
					position: 'left',
				title: 'Bytes / sec',
				fields: ['D1', 'D2'],
				grid: true,
				minimum: 0,
				renderer:	function (axis, label, layoutContext) {
					return Ext.util.Format.number(label/1024/1024, '0.0');
				}
			},
			{
				type: 'category',
					position: 'bottom'
			}];
			
			var series = [];
			series = [
				{
					type: 'line',
					title: 'node00t',
					xField: 'mdate',
					yField: 'D1',
					style: {lineWidth: 3},
					marker: {
						opacity: 0,
						scaling: 0.01,
						fx: {
							duration: 200,
							easing: 'easeOut'
						}
					},
					highlightCfg: {
						opacity: 1,
						scaling: 1.5
					}
					/*,tooltip: {
						trackMouse: true,
						renderer: 'onSeriesTooltipRenderMB'
					}*/
				},
				{
					type: 'line',
					title: 'node01t',
					xField: 'mdate',
					yField: 'D2',
					style: {lineWidth: 3},
					marker: {
						opacity: 0,
						scaling: 0.01,
						fx: {
							duration: 200,
							easing: 'easeOut'
						}
					},
					highlightCfg: {
						opacity: 1,
						scaling: 1.5
					}
				},
				{
					type: 'line',
					title: 'node02t',
					xField: 'mdate',
					yField: 'D3',
					style: {lineWidth: 3},
					marker: {
						opacity: 0,
						scaling: 0.01,
						fx: {
							duration: 200,
							easing: 'easeOut'
						}
					},
					highlightCfg: {
						opacity: 1,
						scaling: 1.5
					}
				}
			];

			//chart.axes = axes;
			//chart.series = series;
			
			
			//chart.redraw();
			//chart.refresh();
			
			//chart.setAxes(axes);
			return;
			
			
			chart.add(axes);
			chart.add(series);
			
			chart.applyAxes(axes);
			chart.setSeries(series);
			chart.applySeries(series);
			chart.redraw();
			chart.refresh();
			
			
			chart.applyData(data);
			
			chart.bindStore(this);
			chart.applyStore(this);
			chart.redraw();
			chart.refresh();
			
		}
	}
});
