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
            $img: $box.find('.active'),
            $pics: $box.find('.carousel-inner')
        };
    };

    require('./_picScroll.scss');
    var template = require('./_picScroll.ejs');

    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function() {
            var main_selector = options.el_main;
            that.selector.$pics.find('.item').on('click', '>a', function() {
                var moduleName = $(this).data('module');
                if (!U.checkModule(moduleName)) {
                    if (moduleName === "m-questions") {
                        require('../Questions/questions.js')().init({
                            el: main_selector,
                            data: {}
                        });
                    }
                    if (moduleName === "m-play-money") {
                        require('../NavHome/Introduce/PlayCard/playCard.js')().init({
                            el: options.el_main,
                            moduleName: moduleName,
                            data: {}
                        });
                    }
                    if (moduleName === "m-company-introduce") {
                        require('../Company/company.js')().init({
                            el: main_selector,
                            data: {}
                        });
                    }
                    if (moduleName === "m-zhaoshang") {
                        require('../ZhaoShang/zhaoshang.js')().init({
                            el: main_selector,
                            data: {}
                        });
                    }
                }
            });

        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());