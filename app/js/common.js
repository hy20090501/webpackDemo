/**
 * global $ use
 *
**/
// $(function(){
// 	//alert("ok");
// });

/** AMD:
 *  require use
 *
**/
// require(["./amdModule.js"], function(amdModule){
// 	//amdModule.test();
// });


/** AMD:
 *  require ensure use
 *
**/
require.ensure(["./amdModule"], function(require){
	require("./amdModule").test();
});


/**
 *  commonJS
 *
**/
// var consoleLog = require("./cmdModule.js");
// consoleLog.consoleLog();
// alert(consoleLog.str);