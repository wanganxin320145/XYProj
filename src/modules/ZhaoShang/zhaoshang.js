'use strict';

module.exports = Module._createSub('company');
module.exports.prototype.init = (function() {
    var setOptions = (function() {
        var params = {
            el: null,
            el_main: null,
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
            $container: $box.find('.container')
        };
    };

    require('./_zhaoshang.scss');
    var template = require('./_zhaoshang.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(window.MainPicScroll).hide();
        $(function() {
           

            // that.selector.$introduceTitle.on('click','.m_home',function(){
            //     var moduleName = $(this).data('module');
            //     if (!U.checkModule(moduleName)) {
            //         if (moduleName === "m-home") {
            //             require('../NavHome/home.js')().init({
            //                 el: window.MainBox,
            //                 data: {}
            //             });
            //         }
            //     }
            // });
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());