'use strict';

//Promise支持
require('es6-promise').polyfill();



//jQuery
window.$ = require('jquery');
window.jQuery = window.$;
['$', 'jQuery'].forEach(function(key) { //锁定变量
	Object.defineProperty(window, key, {
		writable: false,
		configurable: false
	});
});



//EasyUI
// require('./libs/easyui/easyui.css');
// require('./libs/easyui/jquery.easyui.min.js');
// require('./libs/easyui/easyui-lang-zh_CN.js');

require('./libs/bootstrap/css/bootstrap.min.css');
require('./libs/bootstrap/js/bootstrap.min.js');