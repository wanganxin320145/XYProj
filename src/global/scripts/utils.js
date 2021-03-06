'use strict';

window.U = {};

(function() {
    U.format = function() {
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    };

    U.debouncer = function(func, time) {
        var context, args, id;
        return function() {
            context = this;
            args = arguments;
            if (id) clearTimeout(id);
            id = setTimeout(function() {
                func.apply(context, args);
            }, time);
        };
    };

    U.checkModule = function(module, isMenuModule) {
        if (!module) {
            return true;
        }
        if (!isMenuModule) {
            $('.m-header-content').find('.m-head-menu').find('li').each(function() {
                var mName = $(this).data('module');
                if (mName === module) {
                    $(this).addClass('menu-active');
                    $(this).siblings().removeClass('menu-active');
                    $('<span class="line-top"></span>').appendTo($(this));
                    $(this).siblings().find('span').remove();
                    return false;
                }
            });
        }

        if (window.Modules.indexOf(module) > -1) {
            $('div[data-module="' + module + '"]').show();
            $(window.Modules).each(function(index, item) {
                if(module === 'm-zhaoshang'){
                    $(window.MainPicScroll).hide();    
                }
                if (item != module) {
                    $('div[data-module="' + item + '"]').hide();
                }
            });
            return true;
        } else {
            $(window.Modules).each(function(index, item) {
                $('div[data-module="' + item + '"]').hide();
            });
            window.Modules.push(module);
            return false;
        }
    };
}());