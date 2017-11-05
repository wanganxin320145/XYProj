'use strict';
module.exports = function(options) {
    var defaults = {
        el: '',
        data: {}
    };
    options = $.extend({}, defaults, options);
    var temp = require('./_layout.ejs');
    require('./_layout.scss');
    var $box = $(temp()),
        $header = $box.find('.m-header-box'),
        $main = $box.find('.m-main-box'),
        $footer = $box.find('.m-footer-box'),
        $slider = $box.find('.right-slider');
    $box.appendTo(options.el);

    window.MainBox=$main;
    var m_header = require('./Head/_head.js')().init({
        el: $header,
        el_main:$main,
        data: { }
    });

    var m_picScroll = require('./PicScroll/_picScroll.js')().init({
        el: $main,
        data: { }
    });

    var m_home = require('./NavHome/home.js')().init({
        el_main: $main,
        data: { }
    });
    //require('./NavHome/home.js')({el:$main,el_main:$main,data:{}});

    var m_footer = require('./Footer/_footer.js')().init({
        el: $footer,
        el_main:$main,
        data: { }
    });
    var m_version = require('./Version/_version.js')().init({
        el: $footer,
        el_main:$main,
        data: { }
    });

    $slider.find('#slider-goTop').on('click',function(){
        $("html,body").animate({scrollTop:0},800);
    });
};