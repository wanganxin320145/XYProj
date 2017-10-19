'use strict';

/*linkbutton
 */
//扩展
var _linkbutton_extend = {
    e_cls: '' //className
};
//拦截
var _linkbutton = $.fn.linkbutton;
$.fn.linkbutton = function(a, b) {
    var _this = this;
    if (typeof a !== 'string') {
        a = a || {};
        a = $.extend({}, _linkbutton_extend, a);
        if (a.e_cls) _this.addClass(a.e_cls);
        var href = _this.attr('href') || '';
        if (/javascript:/.test(href.trim().slice(0, 11)) || href === '#' || href === '') _this.removeAttr('href');
    }
    var result = _linkbutton.call(_this, a, b);
    return result;
};
Object.keys(_linkbutton).forEach(function(key) {
    $.fn.linkbutton[key] = _linkbutton[key];
});



/*pagination
 */
$.fn.pagination.defaults.displayMsg = '共{total}条（当前显示第{from}~{to}条）';
$.fn.pagination.defaults.pageSize = 30;
$.fn.pagination.defaults.pageList = [10, 20, 30, 40, 50];
$.fn.pagination.defaults.layout = ["list", "first", "prev", "manual", "next", "last", "refresh", "info"];
['datagrid', 'treegrid'].forEach(function(key) {
    $.fn[key].defaults.pageSize = $.fn.pagination.defaults.pageSize;
    $.fn[key].defaults.pageList = $.fn.pagination.defaults.pageList;
});


$.fn.combobox.defaults.editable = false;
$.fn.datebox.defaults.editable = false;

/*textbox
 */
['textbox', 'passwordbox', 'combo', 'combobox', 'combotree', 'combogrid', 'combotreegrid', 'numberbox', 'datebox', 'datetimebox', 'datetimespinner', 'spinner', 'numberspinner', 'timespinner', 'filebox'].forEach(function(key) {
    $.fn[key].defaults.height = 24;
});
//拦截
var _textbox = $.fn.textbox;
$.fn.textbox = function(a, b) {
    var _this = this;
    if (typeof a !== 'string') {
        a = a || {};
        if (a.multiline) a.height = a.height || 50;
    }
    var result = _textbox.call(_this, a, b);
    return result;
};
Object.keys(_textbox).forEach(function(key) {
    $.fn.textbox[key] = _textbox[key];
});



/*combo
 */
['combo', 'combobox', 'combotree', 'combogrid', 'combotreegrid'].forEach(function(key) {
    $.fn[key].defaults.panelHeight = 'auto';
    $.fn[key].defaults.panelMinHeight = 66;
});



/*layout
 */
$.fn.layout.defaults.fit = true;



/*datagrid
 */
$.fn.datagrid.defaults.border = false;
$.fn.datagrid.defaults.fit = true;
$.fn.datagrid.defaults.fitColumns = true;
$.fn.datagrid.defaults.autoRowHeight = false;
$.fn.datagrid.defaults.singleSelect = true;
$.fn.datagrid.defaults.checkOnSelect = false;
$.fn.datagrid.defaults.selectOnCheck = false;
$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待...';
$(function() {
    var setScrollbarSize = function() {
        var $box = $('<div style="height:66px;overflow:auto"><div style="height:99px"></div></div>').appendTo('body');
        $.fn.datagrid.defaults.scrollbarSize = $box.width() - $box.children().width();
        $box.remove();
    };
    var $links = $(document.head).find('link.blob-stylesheet');
    if ($links.length > 0) {
        U.cssOnload($links, setScrollbarSize);
    } else {
        setScrollbarSize();
    }
});
//列
var _datagrid_columnsDefaultOptions = {
    width: 100,
    halign: 'center',
    resizable: false,
    fixed: true
};
//扩展
var _datagrid_extend = {
    e_cursorPointer: false, //为true时，行指针为pointer
    e_select: true, //为false时，不允许选中行
};
//拦截
var _datagrid = $.fn.datagrid;
$.fn.datagrid = function(a, b) {
    var _this = this;
    if (typeof a !== 'string') {
        a = a || {};
        a = $.extend({}, _datagrid_extend, a);
        if (Array.isArray(a.columns)) {
            a.columns.forEach(function(el) {
                el.forEach(function(el, i, arr) {
                    el = arr[i] = $.extend({}, _datagrid_columnsDefaultOptions, arr[i]);
                });
            });
        }
        if (a.e_select === false) {
            a.singleSelect = true;
            a.selectOnCheck = false;
            a.onSelect = function(i) {
                $(this).datagrid('unselectRow', i);
            };
            delete a.onUnselect;
            delete a.onSelectAll;
            delete a.onUnselectAll;
        }
    }
    var result = _datagrid.call(_this, a, b);
    if (typeof a !== 'string') {
        if (a.e_cursorPointer === true) _this.datagrid('getPanel').addClass('_cursor-pointer-datagrid');
    }
    return result;
};
Object.keys(_datagrid).forEach(function(key) {
    $.fn.datagrid[key] = _datagrid[key];
});



/*tabs
 */
$.fn.tabs.defaults.border = false;
$.fn.tabs.defaults.fit = true;
$.fn.tabs.defaults.tabHeight = 29;
$.fn.tabs.defaults.scrollDuration = 0;
//拦截
var _tabs = $.fn.tabs;
$.fn.tabs = function(a, b) {
    var _this = this;
    if (typeof a !== 'string') {
        a = a || {};
        if (a.scrollDuration === undefined) _this.addClass('_tabs-scroll-disable');
    }
    var result = _tabs.call(_this, a, b);
    return result;
};
Object.keys(_tabs).forEach(function(key) {
    $.fn.tabs[key] = _tabs[key];
});



/*window
 */
['window', 'dialog'].forEach(function(key) {
    $.fn[key].defaults.shadow = false;
    $.fn[key].defaults.modal = true;
    $.fn[key].defaults.resizable = true;
    $.fn[key].defaults.collapsible = false;
    $.fn[key].defaults.minimizable = false;
    $.fn[key].defaults.maximizable = true;
});
//拦截
var _window = $.fn.window;
$.fn.window = function(a, b) {
    var _this = this;
    if (typeof a !== 'string') {
        a = a || {};
        var _onMove = a.onMove || $.noop;
        a.onMove = function(left, top) {
            if (top < 0) {
                top = 0;
                $(this).parent().css('top', top);
            }
            _onMove.call(this, left, top);
        };
    }
    var result = _window.call(_this, a, b);
    if (typeof a !== 'string') {
        $(_this).prev().find('.panel-tool >a').removeAttr('href');
    }
    return result;
};
Object.keys(_window).forEach(function(key) {
    $.fn.window[key] = _window[key];
});



/*messager
 */
$.messager.defaults.shadow = $.fn.window.defaults.shadow;