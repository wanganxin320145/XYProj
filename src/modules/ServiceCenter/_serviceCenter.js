'use strict';

module.exports = Module._createSub('serviceCenter');
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
            $iconContent:$box.find('.iconArea')
        };
    };

    require('./_serviceCenter.scss');
    var template = require('./_serviceCenter.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        this.selector.$iconContent.on('mouseover','>span:nth-child(1)',function(){
                $(this).toggleClass('icon-active');
                //$(this).parent().siblings().find('.card-item').removeClass('card-active');
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());