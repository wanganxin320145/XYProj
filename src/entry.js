'use strict';

require('font-awesome-webpack');
/*应用入口
 */
$(function() {

    //加载核心模块（spa）
    require('./modules/layout.js')({
        el: document.body,
        data: {
            
        }
    });

});