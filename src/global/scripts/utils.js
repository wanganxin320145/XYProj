'use strict';

window.U = {};
['U', 'Object', 'Array', 'Date', 'Math', 'open'].forEach(function(key) { //锁定一些全局变量
    Object.defineProperty(window, key, {
        writable: false,
        configurable: false
    });
});



(function() {

    /*设置对象的属性为只读
        U.readonly(obj, key) ----------------设置单个key
        U.readonly(obj, [key1, keyN]) -------设置多个key
        U.readonly(obj) ---------------------设置所有key
        U.readonly(...)(...)(...) -----------链式写法
    */
    U.readonly = function(obj, param) {
        var keys = Object.keys(obj);
        var seting = function(obj, key) {
            if (Object.getOwnPropertyDescriptor(obj, key).hasOwnProperty('get')) return;
            Object.defineProperty(obj, key, {
                writable: false,
                configurable: false
            });
        };
        if (typeof param === 'string') {
            if (keys.indexOf(param) > -1) {
                seting(obj, param);
            }
        } else if (Array.isArray(param)) {
            param.forEach(function(el) {
                if (keys.indexOf(el) > -1) {
                    seting(obj, el);
                }
            });
        } else if (arguments.length === 1) {
            keys.forEach(function(el) {
                seting(obj, el);
            });
        }
        return U.readonly;
    };



    /*简单字符串拼接
        U.format('{0}-{1}-{2}', 11, 22, 33) === '11-22-33'
            复杂的操作请使用.ejs模板
    */
    U.format = function() {
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    };



    /*截取指定长度的字符串（1个中文计算为2个字符）
        U.slice('中ABC', 4) === '中AB'
        U.slice('中ABC', 4, true) === '中AB...'
        U.slice('中ABC', 5, true) === '中ABC'
    */
    U.slice = function(str, len, ellipsis) {
        if (typeof len === 'number' && len < str.length) {
            var result = '';
            for (var count = 0, i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                    count += 2;
                } else {
                    count++;
                }
                if (count > len) break;
                result += str[i];
            }
            if (ellipsis === true && result !== str) result += '...';
            return result;
        }
        return str;
    };



    /*对字符串中的html标签进行转义
        如：防止脚本注入
     */
    U.escapeHtml = function(str) {
        return $('<div>').text(str).html();
    };



    /*防抖器
        如：用户在搜索框输入关键词的过程中，需要恰当的时机去请求数据，用防抖器可以有效的控制请求时机
     */

    U.debouncer = function(func, time) { //防抖动
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

    /*样式渲染完成时机
        对于<style>直接标记为渲染完成
        对于<link>则作轮询判断（要判断的属性为node.sheet.cssRules）
     */
    U.cssOnload = function($jq, onload) {
        var styles = [],
            links = [];
        $jq.each(function() {
            if (this.tagName === 'STYLE') styles.push(this);
            else if (this.tagName === 'LINK') links.push(this);
        });
        if (styles.length + links.length > 0) {
            if (links.length === 0) {
                onload();
            } else {
                var len = links.length,
                    count = 0;
                var check = function() {
                    for (var i = 0, el; i < links.length; i++) {
                        el = links[i];
                        if (el.sheet && el.sheet.cssRules) {
                            count++;
                            links.splice(i, 1);
                            i--;
                        }
                    }
                    return count === len;
                };
                var id = setInterval(function() { //轮询
                    if (check()) {
                        clearInterval(id);
                        onload();
                    }
                }, 1);
                setTimeout(function() { //超时处理
                    links.length = 0;
                    count = len;
                }, 10000);
            }
        }
    };

    U.checkModule = function(module){
        if(!module){
            return true;
        }
        if(window.Modules.indexOf(module) > -1){
                     $('div[data-module="' + module + '"]').show();
                     $(window.Modules).each(function(index,item){
                            if(item != module){
                                $('div[data-module="' + item + '"]').hide();
                            }
                     }); 
                     return true;
        }else{
             $(window.Modules).each(function(index,item){
                $('div[data-module="' + item + '"]').hide();
            }); 
            window.Modules.push(module);
            return false;
        }
    };
    /*浏览器标识
     */
    U.webkit = /Webkit|Chrome|Safari/i.test(navigator.userAgent);
    U.edge = /Edge/i.test(navigator.userAgent);
    U.ie9 = /MSIE 9\.0/i.test(navigator.userAgent);

}());



U.readonly(U); //锁定U的所有key