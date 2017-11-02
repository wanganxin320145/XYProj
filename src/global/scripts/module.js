'use strict';
window.Module = (function(){
          return function(p_module,moduleName){
                this.p_module = p_module;
                this.name = moduleName;
          };
}());

(function(){
    Module._createSub = function(moduleName){
       var constructor = function(p_module){
            if(!(this instanceof constructor)) return new constructor(p_module);
            Module.call(this,p_module,moduleName);
       };
       constructor.prototype = Object.create(Module.prototype);
       return constructor;
    };
}());