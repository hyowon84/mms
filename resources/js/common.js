
/*그리드 컬럼 렌더러 - 이미지태그*/
function rendererImage (value) {
	return '<img src="' + value + '" width=40 height=40 />';
}

/*그리드 컬럼 렌더러 - 콤보박스*/
function rendererCombo(value,metaData,record) {

	var combo = metaData.column.getEditor();
	combo.allowBlank = true;

	if(value && combo && combo.store && combo.displayField){
		var index = combo.store.findExact(combo.valueField, value);
		if(index >= 0){
			return combo.store.getAt(index).get(combo.displayField);
		}
	}
	return (value) ? value : '' ;
}


/*그리드 컬럼의 데이터 포맷*/
function rendererColumnFormat(value,metaData,record) {

	var formatValue = Ext.util.Format.number(value, "0,000");
	var template;

	var v_colNM = (metaData.column) ? metaData.column.dataIndex : '';

	/* DEFAULT : 합계, 예외적인것만 정의 */
	switch(true) {

		case (v_colNM.search(/PRICE/i) != -1):
			template = '{0}';
			break;
		case  (v_colNM.search(/SMS_/i) != -1):
			template = '{0} %';
			break;
		case  (v_colNM.search(/YEAR/i) != -1):
			template = '{0} 년';
			formatValue = Ext.util.Format.number(value, "0,000");
			break;
		case  (v_colNM.search(/QTY/i) != -1):
			template = '{0} EA';
			break;
		default:
			template = '{0}';
			break;
	}

	return Ext.String.format(template, formatValue);
}

/*그리드 컬럼 렌더러 - 콤보박스*/
function rendererCombo(value,metaData,record) {

	var combo = metaData.column.getEditor();
	combo.allowBlank = true;

	if(value && combo && combo.store && combo.displayField){
		var index = combo.store.findExact(combo.valueField, value);
		if(index >= 0){
			return combo.store.getAt(index).get(combo.displayField);
		}
	}
	return (value) ? value : '' ;
}
	