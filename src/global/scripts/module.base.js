'use strict';
window.Module = (function(){
          var count=1;
          return function(parentModule,moduleName){
                this.parentModule = parentModule;
                this.name = moduleName;
                this.id = U.format('{0}_{1}{2}',this.name,Date.now(),count++);
                this.treeNode = $('<' + moduleName + '>')[0];
                this.treeNode.module = this;
                this.events = [];
                U.readonly(this,['parentModule','name','id','treeNode','events'])(this.treeNode,'module');
          };
}());

(function(){
    Module._createSub = function(moduleName){
       var constructor = function(parentModule){
            if(!(this instanceof constructor)) return new constructor(parentModule);
            Module.call(this,parentModule,moduleName);
       };
       constructor.prototype = Object.create(Module.prototype);
       return constructor;
    };
   Module.tree = $('<root>')[0];
   module.exports = Module.tree;
}());