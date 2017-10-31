'use strict';

module.exports = Module._createSub('rightModule');
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

    require('./_rightModule.scss');
    var template = require('./_rightModule.ejs');

    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        debugger;
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());