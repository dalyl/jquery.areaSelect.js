jquery.areaSelect.js
====================

AreaSelect is a jQuery plugin that gives you the ability to Select multiple areas from an image.

view demo: http://blog.gongshw.com/jquery.areaSelect.js/demo/demo.html

Init
====
```javascript
var options = { // all the option fields are optional
	initAreas: [{"x": 280, "y": 93, "width": 50, "height": 50,"data":{}}], // the initial areas when the plugin load
	deleteMethod: 'click', //or 'doubleClick'
	area: {strokeStyle: 'red', lineWidth: 2}, // style to draw selected areas
	point: {size: 3, fillStyle: 'black'}, // style to draw point
};
$img.areaSelect(options);
```

Apis
=================
```javascript
var selectAreas = $img.areaSelect('get');
// [{"x":280,"y":93,"width":50,"height":50}]
var selectAreasData= $img..areaSelect('getData');
// [{"x":280,"y":93,"width":50,"height":50,data:{}}]
```

Event
=====
```javascript
$img.areaSelect('bindChangeEvent', function (event, data) {
	//invoke when selected areas changed
	alert(data.areas);
});
```

Uninstall
=========
```javascript
$img.areaSelect('uninstall');
```

jquery.areaSelect.xdfExt.js
====================

基于jquery.areaSelect.js 一个扩展插件，提供图片热区编辑、预览及数据操作的封装 。

参考 demo.xdfext.1.html

jquery.imgHotMap.js
====================

这是一个根据图片热区数据生成热区html代码的插件。

参考 demo.xdfext.2.html
