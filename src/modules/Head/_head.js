'use strict';

module.exports = Module._createSub('header');
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
            $logo: $box.find('.m-head-logo'),
            $menu: $box.find('.m-head-menu'),
            $folder: $box.find('.floader'),
            $hiddenMenus: $box.find('.hidden-menus')
        };
    };

    var resizeHanding = function(instance) {
        // var target = [];
        var $tabs_ul = instance.selector.$menu.find('>ul');
        var $hidden_ul = instance.selector.$hiddenMenus.find('>ul');

        if ($hidden_ul.length != 0) {
            $hidden_ul.appendTo(instance.selector.$menu);
        }

        instance.selector.$menu.show();
        var $offs = instance.selector.$menu.offset();
        var flag = false;
        if ($offs.top >= instance.selector.$menu.height() / 2) {
            flag = true;
        }
        if (flag) {
            $tabs_ul.appendTo(instance.selector.$hiddenMenus);
            instance.selector.$folder.show();
            instance.selector.$menu.hide();
        } else {
            instance.selector.$folder.hide();
        }

    };

    require('./_head.scss');
    var template = require('./_head.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        // $(function(){
        //    resizeAction(that);
        // });

        $(function() {
            $(window).resize(function() {
                resizeHanding(that);
            });
            $(that.selector.$folder[0]).on('click', 'span:nth-child(1)', function() {
                that.selector.$hiddenMenus.slideToggle();
            });
        });


        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());