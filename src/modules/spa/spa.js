'use strict';

/*====== spa布局 ======
作者：sam
维护：sam

模块API：
    属性
        .selectors --- 模块相关的jQ选择器
    方法
        .init(options) --- 初始化

暴露三个模块的引用
    Module.spa
    Module.spaHeader
    Module.spaAside
*/

module.exports = Module._createSubclass('spa'); //传递模块名
require('./_style.scss');
var template = '<div class="m-spa"></div>';



/*模块方法：初始化
    .init(options)
*/
module.exports.prototype.init = (function() {

    var setOptions = (function() {
        var defaults = {
            el: null,
            data: {
                spaHeaderData: {},
                spaAsideData: {}
            }
        };
        return function(options, instance) {
            options = $.extend({}, defaults, options);
            options.data = $.extend({}, defaults.data, options.data);
            return options;
        };
    }());



    var setSelectors = function($box) {
        return { //模块相关的jQ选择器，$box是必须项
            $box: $box,
            $header: $('<div class="_header">').appendTo($box),
            $aside: $('<div class="_aside">').appendTo($box),
            $main: $('<div class="_main">').appendTo($box)
        };
    };



    var init = function(options, selectors, instance) {
        //设置尺寸
        instance.uiReady(function() {
            var headerH = selectors.$header.outerHeight(true),
                asideW = selectors.$aside.outerWidth(true);
            var marginX = selectors.$main.outerWidth(true) - selectors.$main.outerWidth(),
                marginY = selectors.$main.outerHeight(true) - selectors.$main.outerHeight();
            selectors.$aside.height('calc(100% - ' + headerH + 'px)');
            selectors.$main.height('calc(100% - ' + (headerH + marginY) + 'px)');
            selectors.$main.width('calc(100% - ' + (asideW + marginX) + 'px)');
            instance.on('spaAside_resize', function() { //订阅spaAside模块的resize事件
                selectors.$main.width('calc(100% - ' + (selectors.$aside.outerWidth(true) + marginX) + 'px)');
            });
        });

        //子模块spaHeader
        options.data.spaHeaderData.el = selectors.$header[0];
        var spaHeader = require('./_spaHeader/spaHeader.js')(instance).init(options.data.spaHeaderData);

        //子模块spaAside
        options.data.spaAsideData.el = selectors.$aside[0];
        var spaAside = require('./_spaAside/spaAside.js')(instance).init(options.data.spaAsideData);

        //暴露三个模块的引用
        Module.spa = instance;
        Module.spaHeader = spaHeader;
        Module.spaAside = spaAside;
        U.readonly(Module, ['spa', 'spaHeader', 'spaAside']);
    };



    return function(options) {
        if (this._inited) return this;
        Module._beforeInit.call(this, options, setOptions, template, setSelectors, init);
        Module._afterInit.call(this, options);
        return this;
    };

}());