'use strict';
module.exports = function(options) {
    var defaults = {
        el: '',
        data: {}
    };
    options = $.extend({}, defaults, options);
    var template = '<div></div>';
    var container = $(template).appendTo(options.el);

    var m_header = require('./Head/_head.js')().init({
        el: container,
        data: { }
    });

    var m_picScroll = require('./PicScroll/_picScroll.js')().init({
        el: container,
        data: { }
    });

     var m_introduce = require('./Introduce/_introduce.js')().init({
        el: container,
        data: { }
    });

    var m_businessSection = require('./BusinessSection/_businessSection.js')().init({
        el: container,
        data: { }
    });

    var m_footer = require('./Footer/_footer.js')().init({
        el: container,
        data: { }
    });
};