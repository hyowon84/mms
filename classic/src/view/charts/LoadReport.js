
/* 프로세스 로드 그래프 */
Ext.define('mms.view.charts.LoadReport', {
	extend: 'Ext.panel.Panel',
	alias:'widget.chart_LoadReport',
	controller:'ChartsController',
	xtype: 'line-marked',	
	layout : 'fit',
	items : [
		{
			xtype: 'cartesian',
			reference: 'LoadReport',
			name: 'Chart',
			height: 300,
			legend: {
				docked: 'bottom',
				boxStrokeWidth:0
			},
			store : { type:'LoadReport' },
			insetPadding: '40 40 40 40',
			/*sprites: [{
				type: 'text',
				text: '프로세스 사용량',
				font: 'bold 1.3em Arial',
				x: 40, // the sprite x position
				y: 20  // the sprite y position
			}],*/
			axes: [
				{
					type: 'numeric',
					position: 'left',
					title: 'Loads / Procs',
					fields: ['D1', 'D2', 'D3'],
					grid: true,
					minimum: 0,
					renderer:	'onAxisLabelRenderBasic'
				},
				{
					type: 'category',
					position: 'bottom'
				}
			],
			series: [
				{
					type: 'line',
					title: '1-min',
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
					},
					tooltip: {
						trackMouse: true,
						renderer: 'onSeriesTooltipRenderBasic'
					}
				},
				{
					type: 'line',
					title: 'CPUs',
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
					},
					tooltip: {
						trackMouse: true,
						renderer: 'onSeriesTooltipRenderBasic'
					}
				},
				{
					type: 'line',
					title: 'Procs',
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
					},
					tooltip: {
						trackMouse: true,
						renderer: 'onSeriesTooltipRenderBasic'
					}
				}
			]
		}
	]
});


/* CPU 사용량 정보 */
Ext.define('mms.view.charts.CpuReport', {
	extend: 'Ext.panel.Panel',
	alias:'widget.chart_CpuReport',
	controller:'ChartsController',
	xtype: 'area-stacked-100',
	layout : 'fit',
	items : [
		{
			xtype: 'cartesian',
			reference: 'CpuReport',
			name: 'Chart',
			legend: {
				docked: 'bottom',
				boxStrokeWidth:0
			},			
			store : { type:'CpuReport' },
			insetPadding: '40 40 40 40',
			/*sprites: [{
				type: 'text',
				text: 'CPU 사용량',
				font: 'bold 1.3em Arial',
				width: 100,
				height: 30,
				x: 40, // the sprite x position
				y: 20  // the sprite y position
			}],*/
			axes: [
				{
					type: 'numeric',
					position: 'left',
					title: 'Percent',
					grid: true,
					minimum: 0,
					maximum: 100,
					fields: ['D1','D2','D3','D4','D5','D6'],
					renderer:	'onAxisLabelRender100Per'
				},
				{
					type: 'category',
					position: 'bottom',
					fields: 'mdate'
				}],
			series: [{
				type: 'area',
				//fullStack: true,
				title: [ 'User','Nice','System','Wait','Steal','Idle'],
				xField: 'mdate',
				yField: ['D1','D2','D3','D4','D5','D6'],
				style: {
					opacity: 0.50
				},
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
				},
				tooltip: {
					trackMouse: true,
					renderer: 'onSeriesTooltipRender100Per'
				}
			}]
		}
	]
});

/* 메모리 사용량 정보 */
Ext.define('mms.view.charts.MemReport', {
	extend: 'Ext.panel.Panel',
	alias:'widget.chart_MemReport',
	controller:'ChartsController',
	xtype: 'area-stacked',
	layout : 'fit',
	items : [
		{
			xtype: 'cartesian',
			reference: 'MemReport',
			name: 'Chart',
			legend: {
				docked: 'bottom',
				boxStrokeWidth:0
			},
			store : { type: 'MemReport' },
			insetPadding: '40 40 40 40',
			/*sprites: [{
				type: 'text',
				text: '메모리 사용량',
				font: 'bold 1.3em Arial',
				width: 100,
				height: 30,
				x: 40, // the sprite x position
				y: 20  // the sprite y position
			}],*/
			axes: [
				{
					type: 'numeric',
					position: 'left',
					title: 'bytes',
					grid: true,
					fields: ['D1','D2'],
					renderer:	'onAxisLabelRenderMB'
				},
				{
					type: 'category',
					position: 'bottom',
					fields: 'mdate'
				}
			],
			series: [
				{
					type: 'area',
					title: [ '사용중','사용가능'],
					xField: 'mdate',
					yField: ['D1','D2'],
					style: {
						opacity: 0.50
					},
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
					},
					tooltip: {
						trackMouse: true,
						renderer: 'onSeriesTooltipRenderMB'
					}
				}
			]
		}
	]
});


/* 네트워크 사용량 그래프 */
Ext.define('mms.view.charts.NetworkReport', {
	extend: 'Ext.panel.Panel',
	alias:'widget.chart_NetworkReport',
	controller:'ChartsController',
	xtype: 'line-marked',
	layout : 'fit',
	items : [
		{
			xtype: 'cartesian',
			reference: 'NetworkReport',
			name: 'Chart',
			height: 300,
			legend: {
				docked: 'bottom',
				boxStrokeWidth:0
			},
			store : { type: 'NetworkReport' },
			insetPadding: '40 40 40 40',
			/*sprites: [{
				type: 'text',
				text: '네트워크 사용량',
				font: 'bold 1.3em Arial',
				x: 40, // the sprite x position
				y: 20  // the sprite y position
			}],*/
			axes: [
				{
					type: 'numeric',
					position: 'left',
					title: 'Bytes / sec',
					fields: ['D1', 'D2'],
					grid: true,
					minimum: 0,
					renderer:	function (axis, label, layoutContext) {
						return Ext.util.Format.number(label, '0.0');
					}
				},
				{
					type: 'category',
					position: 'bottom'
				}
			],
			series: [
				{
					type: 'line',
					title: 'In',
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
					},
					tooltip: {
						trackMouse: true,
						renderer: function (tooltip, record, item) {
							var title = item.series.getTitle();
							tooltip.setHtml(record.get('mdate') + ' ' + title + ': ' + record.get(item.series.getYField()));
						}
					}
				},
				{
					type: 'line',
					title: 'Out',
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
					},
					tooltip: {
						trackMouse: true,
						renderer: function (tooltip, record, item) {
							var title = item.series.getTitle();
							tooltip.setHtml(record.get('mdate') + ' ' + title + ' : ' + record.get(item.series.getYField()));
						}
					}
				}
			]
		}
	]
});

/* 디스크 사용량 정보 */
Ext.define('mms.view.charts.DiskReport', {
	extend: 'Ext.panel.Panel',
	alias:'widget.chart_DiskReport',
	controller:'ChartsController',
	xtype: 'area-stacked',
	layout : 'fit',
	items : [
		{
			xtype: 'cartesian',
			reference: 'DiskReport',
			name: 'Chart',
			legend: {
				docked: 'bottom',
				boxStrokeWidth:0
			},
			store : { type: 'DiskReport' },
			insetPadding: '40 40 40 40',
			/*sprites: [{
				type: 'text',
				text: '디스크 사용량',
				font: 'bold 1.3em Arial',
				width: 100,
				height: 30,
				x: 40, // the sprite x position
				y: 20  // the sprite y position
			}],*/
			axes: [
				{
					type: 'numeric',
					position: 'left',
					title: 'bytes',
					grid: true,
					fields: ['D1','D2'],
					renderer:	'onAxisLabelRenderGB'
				},
				{
					type: 'category',
					position: 'bottom',
					fields: 'mdate'
				}],
			series: [{
				type: 'area',
				title: [ '사용중','사용가능'],
				xField: 'mdate',
				yField: ['D1','D2'],
				style: {
					opacity: 0.50
				},
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
				},
				tooltip: {
					trackMouse: true,
					renderer: 'onSeriesTooltipRenderGB'
				}
			}]
		}
	]
});


/* 노드 OS 사용률 정보 */
Ext.define('mms.view.charts.NodeSummary', {
	extend: 'Ext.panel.Panel',
	alias:'widget.chart_NodeSummary',
	controller:'ChartsController',
	xtype: 'area-stacked',
	layout : 'fit',
	items : [
		{
			xtype: 'polar',
			reference: 'NodeSummary',
			name: 'Chart',
			store: {
				type: 'NodeSummary'
			},
			insetPadding: 30,
			innerPadding: 20,
			legend: {
				docked: 'right'
			},
			interactions: ['rotate', 'itemhighlight'],
			/*sprites: [
				{
					type: 'text',
					text: '노드 활성화 비중',
					fontSize: 22,
					width: 100,
					height: 30,
					x: 40, // the sprite x position
					y: 20  // the sprite y position
				},
				{
					type: 'text',
					text: 'Source: Mirhenge',
					x: 12,
					y: 440
				}
			],*/
			series: [{
				type: 'pie',
				animation: {
					easing: 'easeOut',
					duration: 500
				},
				angleField: 'VAL',  // bind pie slice angular span to market share
				//radiusField: 'data2', // bind pie slice radius to growth rate
				clockwise: false,
				highlight: {
					margin: 20
				},
				label: {
					field: 'TITLE',      // bind label text to name
					display: 'outside',
					fontSize: 14
				},
				style: {
					strokeStyle: 'white',
					lineWidth: 1
				},
				tooltip: {
					trackMouse: true,
					renderer: 'onSeriesTooltipRender'
				}
			}]
		}
	]
});


/* 노드 활성화/비활성화 정보 */
Ext.define('mms.view.charts.NodeActive', {
	extend: 'Ext.panel.Panel',
	alias:'widget.chart_NodeActive',
	controller:'ChartsController',
	xtype: 'area-stacked',
	layout : 'fit',
	items : [
		{
			xtype: 'polar',
			reference: 'NodeActive',
			name: 'Chart',
			store: {
				type: 'NodeActive'
			},
			insetPadding: 30,
			innerPadding: 20,
			legend: {
				docked: 'right'
			},
			interactions: ['rotate', 'itemhighlight'],
			/*sprites: [
			 {
			 type: 'text',
			 text: '노드 활성화 비중',
			 fontSize: 22,
			 width: 100,
			 height: 30,
			 x: 40, // the sprite x position
			 y: 20  // the sprite y position
			 },
			 {
			 type: 'text',
			 text: 'Source: Mirhenge',
			 x: 12,
			 y: 440
			 }
			 ],*/
			series: [{
				type: 'pie',
				animation: {
					easing: 'easeOut',
					duration: 500
				},
				angleField: 'VAL',  // bind pie slice angular span to market share
				//radiusField: 'data2', // bind pie slice radius to growth rate
				clockwise: false,
				highlight: {
					margin: 20
				},
				label: {
					field: 'TITLE',      // bind label text to name
					display: 'outside',
					fontSize: 14
				},
				style: {
					strokeStyle: 'white',
					lineWidth: 1
				},
				tooltip: {
					trackMouse: true,
					renderer: 'onSeriesTooltipRender'
				}
			}]
		}
	]
});



/* 동적생성 메모리 사용량 그래프 */
Ext.define('mms.view.charts.DynamicChartMemoryUse', {
	extend: 'Ext.panel.Panel',
	alias:'widget.DynamicChartMemoryUse',
	controller:'ChartsController',
	xtype: 'line-marked',
	layout : 'fit',
	items : [
		{
			xtype: 'cartesian',
			reference: 'DynamicChartMemoryUse',
			name: 'DynamicChart',
			height: 300,
			legend: {
				docked: 'bottom',
				boxStrokeWidth:0
			},
			store : { type: 'DynamicChartMemoryUse' },
			insetPadding: '40 40 40 40',
			axes: [
				{
					type: 'numeric',
					position: 'left',
					title: 'Bytes / sec',
					fields: ['D1', 'D2'],
					grid: true,
					minimum: 0,
					renderer:	function (axis, label, layoutContext) {
						return Ext.util.Format.number(label, '0.0');
					}
				},
				{
					type: 'category',
					position: 'bottom'
				}
			],
			series: [
				{
					type: 'line',
					title: 'node00',
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
					},
					tooltip: {
						trackMouse: true,
						renderer: function (tooltip, record, item) {
							var title = item.series.getTitle();
							tooltip.setHtml(record.get('mdate') + ' ' + title + ': ' + record.get(item.series.getYField()));
						}
					}
				},
				{
					type: 'line',
					title: 'node01',
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
					},
					tooltip: {
						trackMouse: true,
						renderer: function (tooltip, record, item) {
							var title = item.series.getTitle();
							tooltip.setHtml(record.get('mdate') + ' ' + title + ' : ' + record.get(item.series.getYField()));
						}
					}
				}
			]
		}
	]
});