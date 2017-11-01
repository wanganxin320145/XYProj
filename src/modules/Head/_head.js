'use strict';

module.exports = Module._createSub('header');
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
            $header: $box.find('.m-header'),
            $container: $box.find('.container'),
            $logo: $box.find('.m-head-logo'),
            $menu: $box.find('.m-head-menu'),
            $colmd9: $box.find('.col-md-9'),
            $folder: $box.find('.floader'),
            $hiddenMenus: $box.find('.hidden-menus')
        };
    };

    var resizeHanding = function(instance) {
        var $tabs_ul = instance.selector.$menu.find('>ul');
        instance.selector.$header.css('position', 'fixed');

        instance.selector.$colmd9.show();
        //var $offs = instance.selector.$colmd9.offset();
        var $offs = $tabs_ul.find('>li:nth-child(3)').offset();
        var flag = false;
        if ($offs.top >= instance.selector.$colmd9.height() / 2) {
            flag = true;
        }
        if (flag) {
            instance.selector.$folder.show();
            instance.selector.$colmd9.hide();
            instance.selector.$header.css('position', 'relative');
        } else {
            instance.selector.$folder.hide();
        }

    };

    require('./_head.scss');
    var template = require('./_head.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this,
            main_selector = options.el_main;

        $(function() {
            $(window).resize(function() {
                U.debouncer(resizeHanding(that));
            });
            //var modules = [];
            that.selector.$menu.on('click', '>ul>li', function() {


                //$('div[data-module="m-home"]').show();
                $('<span class="line-top"></span>').appendTo($(this));
                $(this).addClass('menu-active');
                $(this).siblings().removeClass('menu-active');
                $(this).siblings().find('span').remove();

                var moduleName = $(this).data('module');
                // if(window.Modules.indexOf(moduleName) > -1){
                //      $('div[data-module="' + moduleName + '"]').show();
                //      $(window.Modules).each(function(index,item){
                //             if(item != moduleName){
                //                 $('div[data-module="' + item + '"]').hide();
                //             }
                //      }); 
                //      return;
                // }
                if (!U.checkModule(moduleName)) {
                    if (moduleName === "m-questions") {
                        require('../Questions/questions.js')().init({
                            el: main_selector,
                            data: {}
                        });
                    }
                }


            });
            $(that.selector.$folder[0]).on('click', 'span:nth-child(1)', function() {
                that.selector.$hiddenMenus.slideToggle();
            });
            that.selector.$selector.on('click', '>.hidden-menus', function() {
                $(this).slideUp();
            });
        });


        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());