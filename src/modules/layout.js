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
    require('./Footer/_footer.js')({
        el: container,
        data: {}
    });
};