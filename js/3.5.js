//放公共js使用

$(document).ready(function(){
	$(".u-icon-reduce").click(function() {
		var num = parseInt($(this).siblings(".number").html());
		if(num>0){
			$(this).siblings(".number").html(num-1);
		}
	});
	$(".u-icon-add").click(function() {
		var num = parseInt($(this).siblings(".number").html());
		if(num<99){
			$(this).siblings(".number").html(num+1);
		}
	});
});