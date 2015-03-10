//放公共js使用
$(document).ready(function(){
	$(".star").click(function() {
		$(this).parent().find('.star').each(function(){
			$(this).removeClass('starClick');
		});
		var indeX = $(this).parent().find('.star').index($(this))+1;
		for(var i = 0; i < indeX; i++){
			$(this).parent().find('.star').eq(i).addClass('starClick');
		}
	});
});