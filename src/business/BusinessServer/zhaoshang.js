'use strict';

module.exports = Module._createSub('picScroll');
module.exports.prototype.init = (function() {
    var setOptions = (function() {
        var params = {
            el: null,
            data: {}
        };
        return function(options) {
            options = $.extend({}, params, options);
            return options;
        };
    }());

    var setSelectors = function($box) {
        return {
            $selector: $box,
            $container: $box.find('.container'),
            $picSummery: $box.find('.summary-content'),
            $img:$box.find('.active')
        };
    };

    require('./_zhaoshang.scss');
    var template = require('./_zhaoshang.ejs');

    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());