'use strict';

module.exports = Module._createSub('footer');
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
            $footerList: $box.find('.footer-list')
        };
    };

    require('./_footer.scss');
    var template = require('./_footer.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function() {
            that.selector.$footerList.on('click', 'li', function() {
                var moduleName = $(this).data('module');
                if (moduleName === "m-questions") {
                    if(window.Modules.indexOf(moduleName) > -1){
                         $('div[data-module="' + moduleName + '"]').show();
                         $(window.Modules).each(function(index,item){
                                if(item != moduleName){
                                    $('div[data-module="' + item + '"]').hide();
                                }
                         }); 
                         return;
                    }
                    
                    window.Modules.push(moduleName);
                    $(window.Modules).each(function(index,item){
                        if(item != moduleName){
                            $('div[data-module="' + item + '"]').hide();
                        }
                    }); 
                    require('../Questions/questions.js')().init({
                        el: options.el_main,
                        data: {}
                    });
                }
            });
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());