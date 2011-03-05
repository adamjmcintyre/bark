/**
 * Bark is a "controller" for your JavaScript. Basically, it abstracts away initializing your methods and widgets and whatnot.
 * @author Adam J. McIntyre
 */
;(function($){
     window.bark = (function(){
         var queue = {
             'ready' : [],
             'load' : []
         };
         
         var _bindFunctions = function(type){
            $(window).load(function(){
                _evaluate('load');
            });

            $(document).ready(function(){
                _evaluate('ready');    
            });
         };
         
         _bindFunctions();
         
         var _evaluate = function(type){
            var candidates = queue[type];
             
            var l = candidates.length;
            for(var i = 0; i <  l; i++){
                // Test selectors then apply their functions
                var q = candidates[i];
                
                if($(q.selector.length > 0)){
                    q.f.apply(q.scope, q.args);
                }                            
            }                 
         }
         
         return{
             /***
              * Queues up a given callback function, that will run at when
              * @param {String} timing When your callback should run ('ready' => DOMReady, 'load' => window load). Default: 'ready'
              * @param {String | Boolean} when Basically, a selector that determines when your code should run. i.e. if BODY has a class of foo, or div.bar is present 
              * @param {Function} callback The function you want to run. Can be a pointer or an anonymous function or whatnot.
              * @param {Array} (optional) Optional args to pass to your function
              * @param {Object} (optional) Scope to run your function under. Basically, shells out to apply( ).              
              */
             add : function(timing, when, callback, args, scope){
                queue[timing].push({
                    'selector' : when,
                    'f' : callback,
                    'args' : args || [],
                    'scope' : scope || window
                });
                
                return this;    
             }
         }
     })();
 }(jQuery));
