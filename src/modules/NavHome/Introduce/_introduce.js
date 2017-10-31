'use strict';

module.exports = Module._createSub('introduce');
module.exports.prototype.init = (function() {
    var setOptions = (function() {
        var params = {
            el: null,
            el_main:null,
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
            $playCard:$box.find('.a_playCard'),
            $playMoney:$box.find('.a_playMoney')
        };
    };

    require('./_introduce.scss');
    var template = require('./_introduce.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function(){
            that.selector.$playCard.on('click',function(){
                 require('./PlayCard/playCard.js')().init({
                    el:options.el_main,
                    data:{}
                 });
            });
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());