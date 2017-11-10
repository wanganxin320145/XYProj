'use strict';

module.exports = Module._createSub('questions');
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
            $rightModule: $box.find('.col-md-4'),
            $tabContent:$box.find('.tab-content'),
            $cardATab:$box.find('#m-questions-card_a'),
            $cardBTab:$box.find('#m-questions-card_b')
        };
    };

    require('./_questions.scss');
    var template = require('./_questions.ejs');

    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(window.MainPicScroll).show();
        $(function() {
            require('../RightModule/_rightModule.js')().init({
                el: that.selector.$rightModule,
                data: {}
            });
            that.selector.$tabContent.on('click','.btn-read',function(){
                $(this).prev('div').show();
                $(this).hide();
            });
            //that.selector.$cardBTab.on('click','.btn-read')
        });

        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());