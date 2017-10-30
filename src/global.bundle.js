'use strict';



//global object
window.Modules = [];

require('./global/styles/styles.scss');
//scripts
require('./global/scripts/utils.js');
require('./global/scripts/module.base.js');
require('./global/scripts/common.js');

// require('./global/scripts/easyui.improve.js');
// require('./global/scripts/jquery.fn.js');

require('./entry.js');

//require('./plugins/jquery.fn.qqface.js');