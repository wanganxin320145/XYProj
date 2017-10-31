'use strict';

module.exports = Module._createSub('teamSupport');
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
            $container: $box.find('.container')
        };
    };

    require('./_teamSupport.scss');
    var template = require('./_teamSupport.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());