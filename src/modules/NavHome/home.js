'use strict';

module.exports = Module._createSub('home');
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
            $selector: $box
        };
    };

    return function(options) {
        options = setOptions(options);
        var template = $('<div data-module="m-home">').appendTo(options.el_main);
        this.selector = setSelectors($(template));
        if (window.Modules.indexOf('m-home')  < 0) {
            window.Modules.push('m-home');
        }
        var main_selector = this.selector.$selector;
        var m_flashPlay = require('./FlashPlay/_flashPlay.js')().init({
            el: main_selector,
            data: {}
        });

        var m_introduce = require('./Introduce/_introduce.js')().init({
            el: main_selector,
            el_main:options.el_main,
            data: {}
        });

        var m_productFeatures = require('./ProductFeatures/_productFeatures.js')().init({
            el: main_selector,
            data: {}
        });

        var m_serviceCenter = require('./ServiceCenter/_serviceCenter.js')().init({
            el: main_selector,
            data: {}
        });

        var m_teamSupport = require('./TeamSupport/_teamSupport.js')().init({
            el: main_selector,
            data: {}
        });

        var m_cooperativePartner = require('./CooperativePartner/_cooperativePartner.js')().init({
            el: main_selector,
            data: {}
        });

        var m_businessSection = require('./BusinessSection/_businessSection.js')().init({
            el: main_selector,
            data: {}
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());