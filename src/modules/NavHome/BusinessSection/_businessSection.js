'use strict';

module.exports = Module._createSub('businessSection');
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
            $cardItem:$box.find('.card-area>.row>.col-md-3')
        };
    };

    require('./_businessSection.scss');
    var template = require('./_businessSection.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        this.selector.$cardItem.on('mouseover','>.card-item',function(){
                $(this).addClass('card-active');
                $(this).parent().siblings().find('.card-item').removeClass('card-active');
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());