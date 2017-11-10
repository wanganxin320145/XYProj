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
        $header = $box.find('.m-b-header-box'),
        $main = $box.find('.m-b-main-box'),
        $footer = $box.find('.m-b-footer-box'),
        $slider = $box.find('.b-right-slider');
    $box.appendTo(options.el);

    var m_header = require('../modules/Head/_head.js')().init({
        el: $header,
        el_main:$main,
        data: { }
    });

    var m_footer = require('../modules/Footer/_footer.js')().init({
        el: $footer,
        el_main:$main,
        data: { }
    });
    var m_version = require('../modules/Version/_version.js')().init({
        el: $footer,
        el_main:$main,
        data: { }
    });

    $slider.find('#slider-goTop').on('click',function(){
        $("html,body").animate({scrollTop:0},800);
    });
};