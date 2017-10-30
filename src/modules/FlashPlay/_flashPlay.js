'use strict';

module.exports = Module._createSub('flashPlay');
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
            $flashLeft:$box.find('.flash-left'),
            $flashRight:$box.find('.flash-right')
        };
    };

    require('./_flashPlay.scss');
    var template = require('./_flashPlay.ejs');

    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function(){
            //  that.selector.$flashLeft.on('mouseover', '>div', function() {
            //      $(this).addClass('flash-left-active');
            //     $(this).siblings().removeClass('flash-left-active');
            // });
            //  that.selector.$flashRight.on('mouseover', '>div', function() {
            //      $(this).addClass('flash-right-active');
            //     $(this).siblings().removeClass('flash-right-active');
            // });
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());