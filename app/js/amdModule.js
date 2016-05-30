//非匿名模块
// define('myModule', ['jquery'], function($) {
//     // $ is the export of the jquery module.
//     $('body').text('hello world');
// });
//匿名模块
define(['jquery'], function($) {
	var test = function() {
		$("#amdTest").html("amdTest...");
	}
	console.log("all is well...");
    //return {
    	// test: function(){
    	// 	$("#amdTest").html("amdTest...");
    	// }
    //}
    return {
    	test: test
    };
});