'use strict';
module.exports = function(options){
     var defaults = {
     	el:'',
     	data:{}
     };
     options = $.extend({},defaults,options);
     var template = require('./_footer.ejs');
     require('./_footer.scss');
     $(template()).appendTo(options.el);
};