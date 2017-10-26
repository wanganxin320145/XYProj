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
            $circleContent: $box.find('.circle-content'),
            $iconContent: $box.find('.product-content')
        };
    };

    require('./_productFeatures.scss');
    var template = require('./_productFeatures.ejs');
    
    var scrollFocus = function(instance){
                var boxPosition = instance.selector.$selector[0].getBoundingClientRect();
                var topPositon = boxPosition.top;
                var bottomPositon = boxPosition.bottom;
                var scrollTop = $(window).scrollTop();

                if(topPositon > 0){
                    instance.selector.$iconContent.find('.leftPart').find('p').addClass('icon-active-left');
                    instance.selector.$iconContent.find('.rightPart').find('p').addClass('icon-active-right');
                }
                if(bottomPositon < 0 || scrollTop === 0){
                    instance.selector.$iconContent.find('.leftPart').find('p').removeClass('icon-active-left');
                    instance.selector.$iconContent.find('.rightPart').find('p').removeClass('icon-active-right');
                }


    };

    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function() {
            that.selector.$circleContent.on('mouseover', '>.circle-transform', function() {
                $(this).toggleClass('circle-active');
            });
            $(window).scroll(function(){
                   U.debouncer(scrollFocus(that),260);
            });
        });

        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());