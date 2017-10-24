'use strict';
module.exports = function(options) {
    var defaults = {
        el: null,
        el_main:null,
        data: {}
    };
    options = $.extend({}, defaults, options);
    var main_selector = options.el_main;
    var m_picScroll = require('../PicScroll/_picScroll.js')().init({
        el: main_selector,
        data: { }
    });

    var m_productFeatures = require('../ProductFeatures/_productFeatures.js')().init({
        el: main_selector,
        data: { }
    });

    var m_serviceCenter = require('../ServiceCenter/_serviceCenter.js')().init({
        el: main_selector,
        data: { }
    });

    var m_teamSupport = require('../TeamSupport/_teamSupport.js')().init({
        el: main_selector,
        data: { }
    });

    var m_cooperativePartner = require('../CooperativePartner/_cooperativePartner.js')().init({
        el: main_selector,
        data: { }
    });

    var m_businessSection = require('../BusinessSection/_businessSection.js')().init({
        el: main_selector,
        data: { }
    });

    var m_introduce = require('../Introduce/_introduce.js')().init({
        el: main_selector,
        data: { }
    });
};