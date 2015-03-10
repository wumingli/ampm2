//放公共js使用

$(document).ready(function(){
	$(".zhezhao").css("height",document.documentElement.scrollHeight);
	$(".canelOrderClose").click(function(event) {
		$(".canelOrder").hide();
		$(".zhezhao").hide();
	});
	$(".canelOrderGray").click(function(event) {
		$(".canelOrderGray").removeClass('canelOrderRed');
		$(this).addClass('canelOrderRed');
	});
});