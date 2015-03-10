//放公共js使用

$(document).ready(function(){
	//3.2位置定位 弹出
	$('.gps_store').click(function() {
		$(this).siblings('.m_gps_hide').show();
	});
	//3.2位置定位 关闭
	$('.m_gps_close').click(function() {
		$(this).parent('.m_gps_hide').hide();
	});
	//3.2左侧菜单
	$(".s_menu_dl dt").click(function() {
		$(".s_menu_dl dt").removeClass('list_gray');
		$(".s_menu_dl dt").attr('attribute', 'value');
		if($(this).attr("state")=="open"){
			$(this).siblings("dd").hide();
			$(this).attr("state","close");
		}else{
			$(this).siblings("dd").show();
			$(this).attr("state","open");
			$(this).addClass('list_gray');
		}
	});
	
	//3.10支付订单关闭
	$('#close_btn').click(function() {
		$(this).parents('.m-modal').hide();
		$('.m_opacity_layer').hide();
	});
	//top按钮效果
 	window.onscroll = function(){
            var article_showHeight = $(window).height();
            var t = document.documentElement.scrollTop || document.body.scrollTop;   
            if( t >= article_showHeight) {
                $(".u-btn-top").show();
            }
            if ( t < article_showHeight) {
                $(".u-btn-top").hide();
            }
         };
	$('.u-btn-top').click(function(){
	        window.scrollTo(0,0);
	    });


	//购物车弹出
	$('.icon_shopCar').click(function() {
		$('.shop_car_listshow').slideDown(500);
		var num=parseInt($(this).children('.car_count').text());
		console.log('-'+num*40+'px');
		//$(this).css('top', '-'+(num*40+170)+'px');
		$(this).animate({top: '-'+(num*40+170)+'px'}, 500);
		$('.m_opacity_layer').show();
	});
	//购物车关闭
	$('#a_link_enter').click(function(){
		$('.shop_car_listshow').slideUp(500);
		$('.icon_shopCar').animate({top: '-10px'}, 500);
		$('.m_opacity_layer').hide();
	});
	//加减
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
	//3.12

	$(".canelOrderClose").click(function() {
		$(".canelOrder").hide();
		$('.m_opacity_layer').hide();
	});
	$(".canelOrderGray").click(function() {
		$(".canelOrderGray").removeClass('canelOrderRed');
		$(this).addClass('canelOrderRed');
	});
	//3.5
	$(".queding").click(function() {
		$(".shop_detail").hide();
	});
	//2.1协议
	$(".arrow").click(function() {
		$(this).hide();
		$(".regContent2").show();
	});
	//5.8
	$(".star").click(function() {
		$(this).parent().find('.star').each(function(){
			$(this).removeClass('starClick');
		});
		var indeX = $(this).parent().find('.star').index($(this))+1;
		for(var i = 0; i < indeX; i++){
			$(this).parent().find('.star').eq(i).addClass('starClick');
		}
	});
	//4.9
		$(".sSelect").click(function(e) {
		e = e||event; stopFunc(e);
		$(this).children('.sSelectShow').show();
	});
	$(".sSelectShow a").click(function(e) {
		e = e||event; stopFunc(e);
		$(this).parent().hide();
		$(this).parent().siblings('span').html($(this).html());
	});
	$(document).click(function(){
	 	$(".sSelectShow").hide();
	});
	$(".canelOrderGray").click(function(event) {
		$(".canelOrderGray").removeClass('canelOrderRed');
		$(this).addClass('canelOrderRed');
	});

	
});
function stopFunc(e){   
		e.stopPropagation?e.stopPropagation():e.cancelBubble = true; 
	}


/*

！！！上面是他们提供的，下面的是我们改过的。

*/


	$(document).ready(function() {
    //定位到当前位置
    $('.get_position').on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert(position)
            }, function() {
                console.log('error');
            });
        }
    });
    //3.2位置定位 弹出
    $('.gps_store').click(function() {
        $(this).siblings('.m_gps_hide').show();
    });
    //3.2位置定位 关闭
    $('.m_gps_close').click(function() {
        $(this).parent('.m_gps_hide').hide();
    });
    //3.2左侧菜单--------[已经去除::Yun.kou]
    //top按钮效果
    window.onscroll = function() {
        var article_showHeight = $(window).height();
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t >= article_showHeight) {
            $(".u-btn-top").show();
        }
        if (t < article_showHeight) {
            $(".u-btn-top").hide();
        }
    };
    $('.u-btn-top').click(function() {
        window.scrollTo(0, 0);
    });
    //3.10支付订单关闭
    $('#close_btn').click(function() {
        $(this).parents('.m-modal').hide();
        $('.m-opacity-layer').hide();
    });

    //获取地理位置
    $('.get_gps_yes').on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert(position);
            }, function() {
                showError('获取地理位置信息失败');
            });
        } else {
            showError('不支持获取地理位置');
        }
    });
    //关闭获取地理位置
    $('.get_gps_no').on('click', function() {
        location.href = 'src/list.html';
    });
});