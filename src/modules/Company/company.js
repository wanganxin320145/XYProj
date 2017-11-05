'use strict';

module.exports = Module._createSub('company');
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
            $container: $box.find('.container'),
            $leftMenu: $box.find('.leftmenu'),
            $introduceMain: $box.find('.introduce_main'),
            $introduceTitle: $box.find('.introduce_title'),
            $introduceCertificate: $box.find('.introduce_certificate'),
            $circleContent:$box.find('.introduce_cooperative').find('.circle-content'),
            $logos:$box.find('.introduce_cooperative').find('.logos')
        };
    };

    require('./_company.scss');
    var template = require('./_company.ejs');


    return function(options) {
        options = setOptions(options);
        this.selector = setSelectors($(template(options.data)));
        var that = this;
        $(function() {
            //左侧菜单导航
            that.selector.$leftMenu.on('click', '>ul>li', function() {
                var moduleName = $(this).data('module');
                var title = $(this).data('title');
                that.selector.$introduceMain.find('.' + moduleName).addClass('introduce_active');
                that.selector.$introduceMain.find('.' + moduleName).siblings().removeClass('introduce_active');
                that.selector.$introduceTitle.find('>span:nth-child(1)').html(title);
                $(this).addClass('nav_active');
                $(this).siblings().removeClass('nav_active');
            });

            //资质证件轮播
            that.selector.$introduceCertificate.on('click', '.start-slide', function() {
                // 初始化轮播
                that.selector.$introduceCertificate.find("#myCarousel").carousel('cycle');
            }).on('click', 'pause-slide', function() {
                // 停止轮播
                that.selector.$introduceCertificate.find("#myCarousel").carousel('pause');
            }).on('click', '.prev-slide', function() {
                // 循环轮播到上一个项目
                that.selector.$introduceCertificate.find("#myCarousel").carousel('prev');
            }).on('click', '.next-slide', function() {
                // 循环轮播到下一个项目
                that.selector.$introduceCertificate.find("#myCarousel").carousel('next');
            }).on('click', '.slide-one', function() {
                // 循环轮播到某个特定的帧 
                that.selector.$introduceCertificate.find("#myCarousel").carousel(0);
            }).on('click', '.slide-two', function() {
                that.selector.$introduceCertificate.find("#myCarousel").carousel(3);
            }).on('click', '.slide-three', function() {
                that.selector.$introduceCertificate.find("#myCarousel").carousel(4);
            }).on('click', '.slide-four', function() {
                that.selector.$introduceCertificate.find("#myCarousel").carousel(5);
            });

            that.selector.$circleContent.on('mouseover', '>.circle-transform', function() {
                $(this).toggleClass('circle-active');
                // $(this).addClass('circle-active');
                // window.requestAnimationFrame(function(){
                //     $(this).removeClass('circle-active');
                // }.bind(this));
            });
            that.selector.$logos.on('mouseover', 'img', function() {
                $(this).toggleClass('img-active');
            });

            that.selector.$introduceTitle.on('click','.m_home',function(){
                var moduleName = $(this).data('module');
                if (!U.checkModule(moduleName)) {
                    if (moduleName === "m-home") {
                        require('../NavHome/home.js')().init({
                            el: window.MainBox,
                            data: {}
                        });
                    }
                }
            });
        });
        this.selector.$selector.appendTo(options.el);
        return this;
    };
}());