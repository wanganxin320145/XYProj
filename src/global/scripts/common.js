'use strict';

/*requestAnimationFrame兼容性处理
    下一帧UI绘制前的回调，可以及时的切换样式状态，从而进行CSS3动画
        如：
            $(xxx).addClass('x');
            requestAnimationFrame(function(){
                $(xxx).removeClass('x');
            });
*/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());



/*用<div>取代<a>
    如：<div data-href="https://www.baidu.com/"></div>
*/
$(function() {
    $(document).on('click', '[data-href]', function() {
        window.open($(this).data('href'));
    });
});