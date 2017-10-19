'use strict';

module.exports = Module._createSub('header');
module.exports.prototype.init = (function(){
    var setOptions = (function(){
    	   var params = {
    	   	   el:null,
    	   	   data:{
               }
    	   };
    	   return function(options){
    	   		options = $.extend({},params,options);
    	   		return options;
    	   };
    }());

    var setSelectors = function($box){
    	return {
             $selector:$box,
  			 $menu:$box.find('.m-head-menu'),
             $folder:$box.find('.floader'),
             $hiddenMenus:$box.find('.hidden-menus')
    	};
    };

    var resizeAction = function(instance){
         // var target = [];

              // var $offs = instance.selector.$menu.offset().top + instance.selector.$menu.height()/2;
              // var $tabs_ul = instance.selector.$menu.find('>ul');
              // if($offs > 85){
              //       instance.selector.$folder.show();
              //       instance.selector.$menu.hide();
              // }else{
              //       instance.selector.$folder.hide();
              //       instance.selector.$menu.show();
              // }

         //      var $overflow_ul = $overflow.find('>ul');
         //      $overflow_ul.find('>li').appendTo($tabs_ul);
         //      $.each($tabs_ul.find('>li').toArray().reverse(),function(index, el) {
         //        var liOffset = $(el).offset().top;
         //           if(liOffset > $offs){
         //                target.unshift(el);
         //           }else{
         //              return false;
         //           }
         //      });
         //      if(target.length > 0){
         //          $overflow.show();
         //          $(target).appendTo($overflow_ul);
         //      }else{
         //         $overflow.hide();
         //      }
    };

 	 require('./_head.scss');
     var template = require('./_head.ejs');
    

    return function(options){
    	 options = setOptions(options);
    	 this.selector = setSelectors($(template(options.data)));
         var that = this;
         $(function(){
            resizeAction(that);
         });
         $(window).resize(function(){
              resizeAction(that);
         });
         this.selector.$folder.onClick = function(){
               //that.selector.$hiddenMenus.toggle();
               $.messager.alert('www');
         };
       
    	 this.selector.$selector.appendTo(options.el);
    	 return this;
    };
}());

