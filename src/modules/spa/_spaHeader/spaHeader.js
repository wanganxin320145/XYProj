'use strict';

/*====== spa头部 ======
作者：sam
维护：sam

模块API：
    属性
        .selectors --- 模块相关的jQ选择器
    方法
        .init(options) --- 初始化
        .addTab(options) --- 新增标签
        .selectTab(module) --- 选择标签
*/

module.exports = Module._createSubclass('spaHeader'); //传递模块名
require('./_style.scss');
var template = require('./_template.ejs');



/*模块方法：初始化
    .init(options)
*/
module.exports.prototype.init = (function() {

    var setOptions = (function() {
        var defaults = {
            el: null,
            //...
            data: {
                //...
            }
        };
        return function(options, instance) {
            options = $.extend({}, defaults, options);
            //...
            return options;
        };
    }());



    var setSelectors = function($box) {
        return { //模块相关的jQ选择器，$box是必须项
            $box: $box,
            $logo: $box.find('>.m-spaHeader-logo'),
            $tabs: $box.find('>.m-spaHeader-tabs'),
            $right: $box.find('>.m-spaHeader-right')
        };
    };



    var init = function(options, selectors, instance) {
        //设置tabs的宽度
        instance._setTabsWidth = function() {
            var w = selectors.$logo.outerWidth(true) + selectors.$right.outerWidth(true) + 1;
            selectors.$tabs.width('calc(100% - ' + w + 'px)');
        };

        //tab溢出处理
        instance._tabOverflowHandling = (function() {
            var $overflow = selectors.$tabs.find('>._overflow'),
                $ul_1 = selectors.$tabs.find('>ul'),
                $ul_2 = $overflow.find('>ul');

            //点击tab事件（移到首页后面）
            $overflow.on('click', 'li', function(e) {
                if (e.target.tagName === 'I') return;
                $ul_1.find('>li:eq(0)').after(this);
                $overflow.addClass('_mouseleave');
                setTimeout(function() {
                    $overflow.removeClass('_mouseleave');
                }, 301);
                instance._tabOverflowHandling();
            });

            return function() {
                $ul_2.find('>li').appendTo($ul_1);
                var target = [];
                var threshold = selectors.$tabs.offset().top + selectors.$tabs.height() / 2;
                $.each($ul_1.find('>li').toArray().reverse(), function(i, el) {
                    if ($(el).offset().top > threshold) {
                        target.unshift(el);
                    } else {
                        return false;
                    }
                });
                $(target).appendTo($ul_2);
                if (target.length === 0) {
                    $overflow.hide();
                } else {
                    $overflow.show();
                }
            };
        }());

        //拖放
        (function() {
            var ul = selectors.$tabs.find('>ul')[0],
                target = null;

            //拖动对象start
            ul.addEventListener('dragstart', function(e) {
                target = e.target;
                e.dataTransfer.effectAllowed = 'move';
            });

            //拖动对象end
            ul.addEventListener('dragend', function(e) {
                $(ul).find('._dragenter').removeClass('_dragenter');
            });

            //释放对象enter
            ul.addEventListener('dragenter', function(e) {
                var $enter = $(e.target).closest('li');
                if ($enter.index() === 0) return;
                $enter.addClass('_dragenter');
            });

            //释放对象over
            ul.addEventListener('dragover', function(e) {
                e.preventDefault();
                if ($(e.target).closest('li').index() === 0) {
                    e.dataTransfer.dropEffect = 'none';
                }
            });

            //释放对象leave
            ul.addEventListener('dragleave', function(e) {
                var $leave = $(e.target).closest('li');
                if ($leave.index() === 0 || $leave.length === 0) return;
                var bcr = $leave[0].getBoundingClientRect();
                var x = e.pageX,
                    y = e.pageY;
                if (x <= (bcr.left + 2) || x >= (bcr.right - 2) || y <= (bcr.top + 2) || y >= (bcr.bottom - 2)) {
                    $leave.removeClass('_dragenter');
                }
            });

            //释放对象drop
            ul.addEventListener('drop', function(e) {
                var $drop = $(e.target).closest('li');
                if ($drop.index() === 0) return;
                $drop.before(target);
                $(target).addClass('_move-finish');
                requestAnimationFrame(function() {
                    $(target).removeClass('_move-finish');
                    target = null;
                });
            });

            $(ul).on('mouseenter', 'li:gt(0)', function(e) {
                this.draggable = true;
            }).on('mouseleave', 'li:gt(0)', function(e) {
                this.draggable = false;
            });
        }());

        //点击tab事件
        selectors.$tabs.on('click', 'li', function(e) {
            if (e.target.tagName === 'I') return;

            //切换tab
            selectors.$tabs.find('li._on').removeClass('_on');
            $(this).addClass('_on');

            //切换main
            this.__module.selectors.$box.addClass('_on').siblings('._on').removeClass('_on');
            this.__module.selectors.$box.resize();

            //切换左导航项
            Module.spaAside.switch(this.__module);

            //resize当前模块
            Module.spaAside.publish('spaAside_resize.' + this.__module.name, !Module.spaAside.isFolded);

            $('head >title').text(this.__title);
        });

        //点击关闭事件
        selectors.$tabs.on('click', 'li >i', function() {
            var $tab = $(this).parent();
            if ($tab.hasClass('_on')) {
                $tab.prev().click();
            }
            $tab.remove();
            $tab[0].__module.remove();
            instance._tabOverflowHandling();
        });

        //uiReady
        instance.uiReady(function() {
            instance._setTabsWidth();
            $(window).resize(U.debouncer(function() {
                instance._tabOverflowHandling();
            }));
        });
    };



    return function(options) {
        if (this._inited) return this;
        Module._beforeInit.call(this, options, setOptions, template, setSelectors, init);
        Module._afterInit.call(this, options);
        return this;
    };

}());



/*模块方法：新增标签
    .addTab(options)
*/
module.exports.prototype.addTab = (function() {

    var setOptions = (function() {
        var defaults = {
            title: '', //tab标题
            module: null, //tab对应的模块
            nav: null //对应的左导航项
        };
        return function(options, instance) {
            options = $.extend({}, defaults, options);
            options.text = U.slice(options.title, 12, true);
            options.tip = options.text === options.title ? '' : options.title;
            if (!(options.module instanceof Module)) throw new Error('module不是模块');
            if (!$.contains(Module.spaAside.selectors.$nav[0], options.nav)) throw new Error('nav不是左导航项');
            return options;
        };
    }());

    return function(options) {
        options = setOptions(options, this);
        var tab = $(template(options, 'addTab'))[0],
            $on = this.selectors.$tabs.find('>ul >._on');

        if ($on.length > 0) {
            $on.after(tab);
        } else {
            this.selectors.$tabs.find('>ul').append(tab);
        }
        this._tabOverflowHandling();

        tab.__title = options.title; //tab标题
        tab.__module = options.module; //tab对应的模块
        tab.__nav = options.nav; //tab对应的左导航项
        options.module.__tab = tab; //模块对应的tab
        options.module.__nav = options.nav; //模块对应的左导航项
        U.readonly(tab, ['__title', '__module', '__nav'])(options.module, ['__tab', '__nav']);

        this.on(options.module.id + '_message', function(data) { //订阅消息，自动标红/自动去红
            if (data && data.message) {
                var $target = $(tab).find('>.message-num');
                if (data.message.length > 0) {
                    if ($target[0]) {
                        $target.text(data.message.length);
                    } else {
                        $(tab).find('>._text').after('<span class="message-num">' + data.message.length + '</span>');
                    }
                    this._tabOverflowHandling();
                } else if ($target[0]) {
                    $target.remove();
                    this._tabOverflowHandling();
                }
            }
        });

        $(tab).click();
        return this;
    };
}());



/*模块方法：选择标签
    .selectTab(module)
*/
module.exports.prototype.selectTab = function(module) {
    if (!(module instanceof Module)) throw new Error('不是模块');
    $(module.__tab).click();
    return this;
};