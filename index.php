<?
include_once("_common.php");

checkLogin();
?>

<!DOCTYPE HTML>
<html manifest="">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

<title>MMS</title>
<style>
		/*트리구조 강제로 좌측 정렬*/
		.x-grid-cell-inner.x-grid-cell-inner-treecolumn {    text-align: left !important;}
</style>
<link href="/resources/css/extjs.css" rel="stylesheet">

<script>

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
	
</script>

<script type="text/javascript">
		var Ext = Ext || {}; // Ext namespace won't be defined yet...

		// This function is called by the Microloader after it has performed basic
		// device detection. The results are provided in the "tags" object. You can
		// use these tags here or even add custom tags. These can be used by platform
		// filters in your manifest or by platformConfig expressions in your app.
		//
		Ext.beforeLoad = function (tags) {
				var s = location.search,  // the query string (ex "?foo=1&bar")
						profile;

				// For testing look for "?classic" or "?modern" in the URL to override
				// device detection default.
				//
				if (s.match(/\bclassic\b/)) {
						profile = 'classic';
				}
				else if (s.match(/\bmodern\b/)) {
						profile = 'modern';
				}
				else {
						profile = tags.desktop ? 'classic' : 'modern';
						//profile = tags.phone ? 'modern' : 'classic';
				}

				Ext.manifest = profile; // this name must match a build profile name

				// This function is called once the manifest is available but before
				// any data is pulled from it.
				//
				//return function (manifest) {
						// peek at / modify the manifest object
				//};
		};
</script>


<!-- The line below must be kept intact for Sencha Cmd to build your application -->
<script id="microloader" data-app="8b78f859-4288-4fcf-840a-aa31fc0bba09" type="text/javascript" src="bootstrap.js"></script>

</head>
<body></body>
</html>
<?
$sqli->close();
?>