'use strict';

module.exports = Module._createSub('cooperativePartner');
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
            $circleContent:$box.find('.circle-content'),
            $logos:$box.find('.logos')
        };
    };

    require('./_cooperativePartner.scss');
    var template = require('./_cooperativePartner.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        this.selector.$circleContent.on('mouseover','>.circle-transform',function(){
                $(this).toggleClass('circle-active');
        });
        this.selector.$logos.on('mouseover','img',function(){
                $(this).toggleClass('img-active');
                // $(this).hover(function(){
                //     $(this).addClass('img-active');
                // },function(){
                //     $(this).removeClass('img-active');
                // });
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());