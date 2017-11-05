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
            $cardItem: $box.find('.card-area>.row>.col-md-3'),
            $cardLink: $box.find('.card-item>.card-content'),
            $moreBtn: $box.find('.text-center')
        };
    };

    require('./_businessSection.scss');
    var template = require('./_businessSection.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function() {
            that.selector.$cardItem.on('mouseover', '>.card-item', function() {
                $(this).addClass('card-active');
                $(this).parent().siblings().find('.card-item').removeClass('card-active');
            });
            that.selector.$cardLink.on('click', '>a', function() {
                var moduleName = $(this).data('module');
                if (!U.checkModule(moduleName)) {
                    if (moduleName === 'm-questions') {
                        require('../../Questions/questions.js')().init({
                            el: window.MainBox,
                            data: {}
                        });
                    } else {
                        require('../Introduce/PlayCard/playCard.js')().init({
                            el: window.MainBox,
                            moduleName: moduleName,
                            data: {}
                        });
                    }

                }
            });
            that.selector.$moreBtn.on('click', '>a:nth-child(1)', function() {
                var moduleName = $(this).data('module');
                if (!U.checkModule(moduleName)) {
                    require('../Introduce/PlayCard/playCard.js')().init({
                        el: window.MainBox,
                        moduleName: moduleName,
                        data: {}
                    });
                }
            });
        });


        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());