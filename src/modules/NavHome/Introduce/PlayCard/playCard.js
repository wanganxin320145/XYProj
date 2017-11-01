'use strict';

module.exports = Module._createSub('playCard');
module.exports.prototype.init = (function() {
    var setOptions = (function() {
        var params = {
            el: null,
            moduleName:null,
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
            $breadcrumb:$box.find('.breadcrumb')
        };
    };

    require('./_playCard.scss');
    

    return function(options) {
        options = setOptions(options);
        var template;
        if(options.moduleName === 'm-play-card'){
            template = require('./_playCard.ejs');
        }else{
            template = require('./_playMoney.ejs');
        }
        
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function() {
            require('../../../RightModule/_rightModule.js')().init({
                el: that.selector.$rightModule,
                data: {}
            });

            that.selector.$breadcrumb.on('click', '>li>a', function() {
                debugger;
                var moduleName = $(this).data('module');
                if (!U.checkModule(moduleName)) {
                    if (moduleName === "m-home") {
                        require('../../home.js')().init({
                            el: window.MainBox,
                            data: {}
                        });
                    }
                    if (moduleName === "m-play-card") {
                        require('./playCard.js')().init({
                            el: window.MainBox,
                            moduleName:moduleName,
                            data: {}
                        });
                    }
                    if (moduleName === "m-play-money") {
                        require('./playCard.js')().init({
                            el: window.MainBox,
                            moduleName:moduleName,
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