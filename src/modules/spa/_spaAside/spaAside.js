'use strict';

/*====== spa左导航 ======
作者：sam
维护：sam

模块API：
    属性
        .selectors --- 模块相关的jQ选择器
        .isFolded --- 折叠状态（布尔值）
    方法
        .init(options) --- 初始化
        .switch(module) --- 切换左导航项
    发布的事件
        'spaAside_resize'
*/

module.exports = Module._createSubclass('spaAside'); //传递模块名
require('./_style.scss');
var template = require('./_template.ejs');



/*模块方法：初始化
    .init(options)
*/
module.exports.prototype.init = (function() {

    var setOptions = (function() {
        var defaults = {
            el: null,
            opens: [''], //默认展开的项（存id）
            menu: [{
                id: '',
                name: '',
                children: [{
                    id: '',
                    name: '',
                    module: '',
                }, {
                    id: '',
                    name: '',
                    children: [{
                        id: '',
                        name: '',
                        module: ''
                    }]
                }]
            }]
        };
        return function(options, instance) {
            options = $.extend({}, defaults, options);
            return options;
        };
    }());



    var setSelectors = function($box) {
        return { //模块相关的jQ选择器，$box是必须项
            $box: $box,
            $foldBtn: $box.find('>._foldBtn'),
            $nav: $box.find('>ul'),
            get $current() {
                return $box.find('>ul ._on');
            }
        };
    };



    var init = function(options, selectors, instance) {
        //整体展开与折叠
        selectors.$foldBtn.click(function() {
            selectors.$box.toggleClass('_folded');
            instance.publish('spaAside_resize', !selectors.$box.hasClass('_folded')); //发布事件：参数为true表示展开，false为折叠
        });
        Object.defineProperty(instance, 'isFolded', {
            get: function() {
                return selectors.$box.hasClass('_folded');
            }
        });



        //整体展开状态下：手风琴
        selectors.$nav.on('click', '._hassub >div', function() {
            if (!selectors.$box.hasClass('_folded')) {
                $(this).parent().toggleClass('_open');
            }
        });



        var chunks = require('../../chunks.js');

        selectors.$nav.on('click', 'li:not(._hassub) >div:not(._on)', function() {
            var _this = this,
                $this = $(this);

            //异步加载对应的模块
            var init = function(moduleConstructor) {
                Module.spa.selectors.$main.removeLoading();
                if (_this.__module) {
                    Module.spaHeader.selectTab(_this.__module);
                    return;
                }
                _this.__module = moduleConstructor(Module.spa).init({
                    el: Module.spa.selectors.$main[0],
                    data: {}
                });
                _this.__module.beforeRemove(function() { //释放引用
                    delete _this.__module;
                    delete _this.__tab;
                });
                Module.spaHeader.addTab({
                    title: $this.find('>._text').text(),
                    module: _this.__module,
                    nav: _this
                });
                _this.__tab = _this.__module.__tab;
                if ($this.hasClass('_home')) {
                    $(_this.__tab).parent().prepend(_this.__tab);
                }
                instance.on(_this.__module.id + '_message', function(data) { //订阅消息，自动标红/自动去红
                    if (data && data.message) {
                        var bubbling = function() {
                            $this.parents('._hassub').each(function(i, el) {
                                var $dot = $(el).find('>div >.message-dot');
                                if ($(el).find('.message-num').length > 0) {
                                    if (!$dot[0]) {
                                        $(el).find('>div >._text').after('<span class="message-dot"></span>');
                                    }
                                } else if ($dot[0]) {
                                    $dot.remove();
                                }
                            });
                        };
                        var $target = $this.find('>.message-num');
                        if (data.message.length > 0) {
                            if ($target[0]) {
                                $target.text(data.message.length);
                            } else {
                                $this.find('>._text').after('<span class="message-num">' + data.message.length + '</span>');
                                bubbling();
                            }
                        } else if ($target.length > 0) {
                            $target.remove();
                            bubbling();
                        }
                    }
                });
            };

            chunks[$this.data('module') || 'home'](init);
            Module.spa.selectors.$main.addLoading();



            //整体折叠状态下：点击后隐藏
            if (selectors.$box.hasClass('_folded')) {
                selectors.$nav.addClass('_mouseleave');
                setTimeout(function() {
                    selectors.$nav.removeClass('_mouseleave');
                }, 301);
            }
        });

        //默认打开首页
        instance.uiReady(function() {
            instance.selectors.$nav.find('>li:eq(0) >div').click();
        });
    };



    return function(options) {
        if (this._inited) return this;
        Module._beforeInit.call(this, options, setOptions, template, setSelectors, init);
        Module._afterInit.call(this, options);
        return this;
    };

}());



/*模块方法：切换左导航项
    .switch(module)
*/
module.exports.prototype.switch = function(module) {
    this.selectors.$current.removeClass('_on');
    $(module.__nav).addClass('_on');
    $(module.__nav).parents('._hassub').addClass('_open');
};