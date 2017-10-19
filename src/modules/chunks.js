'use strict';

/*代码分割（分割需要异步的模块）
 */

module.exports = {

    home: function(callback) { //首页
        require.ensure([], function(require) {
            callback(require('./home/home.js'));
        });
    },

    modelNumberManagement: function(callback) { //型号管理
        require.ensure([], function(require) {
            callback(require('./modelNumberManagement/modelNumberManagement.js'));
        });
    },
    brandManagement: function(callback) { // 厂牌管理
        require.ensure([], function(require) {
            callback(require('./brandManagement/brandManagement.js'));
        });
    },
    companyManagement: function(callback) { // 公司管理
        require.ensure([], function(require) {
            callback(require('./companyManagement/companyManagement.js'));
        });
    },
    departmentManagement: function(callback) { // 部门管理
        require.ensure([], function(require) {
            callback(require('./departmentManagement/departmentManagement.js'));
        });
    },
    WsSocket: function(callback) { // 部门管理
        require.ensure([], function(require) {
            callback(require('./WsSocket/chatRoom.js'));
        });
    },
    test: function(callback) { //测试
        require.ensure([], function(require) {
            callback(require('./test/test.js'));
        });
    }

};

U.readonly(module.exports);