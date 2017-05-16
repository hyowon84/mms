
Ext.define('mms.view.charts.ChartsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ChartsController',
	
	/* 디폴트 */	
	onAxisLabelRender: function (axis, label, layoutContext) {
		// Custom renderer overrides the native axis label renderer.
		// Since we don't want to do anything fancy with the 
		// ourselves except appending a '%' sign, but at the same time
		// don't want to loose the formatting done by the native renderer,
		// we let the native renderer process the  first.
		return layoutContext.renderer(label) + '%';
	},

	onSeriesTooltipRender: function (tooltip, record, item) {
		tooltip.setHtml(record.get('month') + ': ' + record.get('data1') + '%');
	},

	onItemHighlightChange: function (chart, newHighlightItem, oldHighlightItem) {
		this.setSeriesLineWidth(newHighlightItem, 4);
		this.setSeriesLineWidth(oldHighlightItem, 2);
	},

	setSeriesLineWidth: function (item, lineWidth) {
		if (item) {
			item.series.setStyle({
				lineWidth: lineWidth
			});
		}
	},

	onPreview: function () {
		if (Ext.isIE8) {
			Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
			return;
		}
		var chart = this.lookupReference('chart');
		chart.preview();
	},

	/* 자주 쓰이는 직접 추가 */
	//프로세스 사용량 0.0 단위
	onAxisLabelRenderBasic: function (axis, label, layoutContext) {
		return Ext.util.Format.number(label, '0,000.0');
	},

	onSeriesTooltipRender: function (tooltip, record, item) {
		tooltip.setHtml(record.get('TITLE') + ' ' + Ext.util.Format.number(record.get('VAL'), '0,000') );
	},
	
	onSeriesTooltipRenderBasic: function (tooltip, record, item) {
		var title = item.series.getTitle();
		tooltip.setHtml(record.get('mdate') + ' ' + title + ' : ' + Ext.util.Format.number(record.get(item.series.getYField()), '0,000.0') );
	},

	onAxisLabelRender100Per: function (axis, label, layoutContext) {
		return layoutContext.renderer(label) + '%';
	},

	onSeriesTooltipRender100Per: function (tooltip, record, item) {
		var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
		colName = item.series.getTitle()[fieldIndex];
		tooltip.setHtml(record.get('mdate') + ' ' + colName + ': ' + record.get(item.field) + '%');
	},

	onAxisLabelRenderMB: function (axis, label, layoutContext) {
		label = label / 1024 / 1024;
		return Ext.util.Format.number(label, '0,000 M');
	},

	onSeriesTooltipRenderMB: function (tooltip, record, item) {
		var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
			colName = item.series.getTitle()[fieldIndex];
		var value = record.get(item.field)/1024/1024;

		tooltip.setHtml(record.get('mdate') + ' ' + colName + ': ' + Ext.util.Format.number(value, '0,000 M') + 'Bytes');
	},

	onAxisLabelRenderGB: function (axis, label, layoutContext) {
		return Ext.util.Format.number(label, '0,000 GB');
	},

	onSeriesTooltipRenderGB: function (tooltip, record, item) {
		var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
			colName = item.series.getTitle()[fieldIndex];
		var value = record.get(item.field);

		tooltip.setHtml(record.get('mdate') + ' ' + colName + ': ' + Ext.util.Format.number(value, '0,000 G') + 'Bytes');
	}
	
});

//
////메모리 사용량, 
////MB단위
//function axesRendererMB(axis, label, layoutContext) {
//	label = label / 1024 / 1024;
//	return Ext.util.Format.number(label, '0,000 M');
//}
//function tooltipRendererMB(tooltip, record, item) {
//	var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
//	colName = item.series.getTitle()[fieldIndex];
//	var value = record.get(item.field)/1024/1024;
//
//	tooltip.setHtml(record.get('mdate') + ' ' + colName + ': ' + Ext.util.Format.number(, '0,000 M') + 'Bytes');
//}
//
////디스크 사용량 기본 GB단위
//function axesRendererGB(axis, label, layoutContext) {
//	return Ext.util.Format.number(label, '0,000 GB');
//}
//function tooltipRendererGB(tooltip, record, item) {
//	var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
//		colName = item.series.getTitle()[fieldIndex];
//	var  = record.get(item.field);
//
//	tooltip.setHtml(record.get('mdate') + ' ' + colName + ': ' +  + 'Bytes');
//}



//프로세스 사용량, ...
// 0,000.0 단위



//CPU사용량 백분율
//function axesRenderer100Per(axis, label, layoutContext) {
//	return layoutContext.renderer(label) + '%';
//}
//function tooltipRenderer100Per(tooltip, record, item) {
//	var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
//		colName = item.series.getTitle()[fieldIndex];
//	var  = record.get(item.field);
//
//	tooltip.setHtml(record.get('mdate') + ' ' + colName + ': ' + record.get(item.field) + '%');
//}
