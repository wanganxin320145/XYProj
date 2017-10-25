'use strict';

module.exports = Module._createSub('productFeatures');
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
            $circleContent:$box.find('.circle-content')
        };
    };

    require('./_productFeatures.scss');
    var template = require('./_productFeatures.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        this.selector.$circleContent.on('mouseover','>.circle-transform',function(){
                $(this).toggleClass('circle-active');
                //$(this).parent().siblings().find('.card-item').removeClass('card-active');
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());