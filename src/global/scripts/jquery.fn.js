'use strict';

/*loading
    .addLoading()
    .removeLoading()
*/
$.fn.addLoading = function() {
    var $this = $(this);
    var position = $this.css('position'),
        w = $this.outerWidth(),
        h = $this.outerHeight();
    if (position === 'static') {
        $this.addClass('loading-relative');
    }
    if (w < 40 || h < 40) {
        $this.addClass('loading-small');
    }
    $this.addClass('loading');
    $this.addClass('loading-delay'); //特效延时（单纯的特效延时，遮罩层是即时的）
    setTimeout(function() {
        $this.removeClass('loading-delay');
    }, 600);
    return $this;
};

$.fn.removeLoading = function() {
    var $this = $(this);
    $this.removeClass('loading-relative loading-small loading');
    return $this;
};



/*自定义右上角工具：最大化/最小化 ...
 */
$.fn.rightTools = function(options) {
    var defaults = {
        id: '',
        className: '',
        tools: [] //handler传对应的数据
    };
    options = $.extend({}, defaults, options);
    var $this = $(this);
    var $tools = $('<div class="right-tools">').appendTo($this);
    if (options.id) $tools.attr('id', options.id);
    if (options.className) $tools.addClass(options.className);
    if ($this.css('position') === 'static') $this.css('position', 'relative');
    options.tools.forEach(function(el) {
        if (el.plain === undefined) el.plain = true;
        el.handler = el.handler || $.noop;
        if (el.iconCls === 'icon-max') {
            (function() {
                var isMaxView;
                el.onClick = function() {
                    isMaxView = !isMaxView;
                    $(this).find('.l-btn-icon').toggleClass('icon-max icon-min');
                    return el.handler.call(this, isMaxView); //传状态
                };
            }());
        } else {
            el.onClick = el.handler;
        }
        $('<a>').appendTo($tools).linkbutton(el);
    });
    return $this;
};