(function($) {
    var num = 1;
    $.fn.animateT = function(options){
        // 默认属性
        var defaults = {      
            speed: 200,
            pause: 2500,
            auto: false,
            arrow: true
        }
        var options = $.extend(defaults, options);

       
        this.each(function() {
            var obj = $(this);
            var s = $("li",obj).length;
            var w = $("li",obj).width();
            var h = $("li",obj).height();
            var clickable = true;
            var ts = s-1;
            var t = 0;
            var disc = '';
            var dsum = 0;
            var str = '';
            var startX = 0,startY = 0;
            var endX = 0,endY = 0;
            var movePrevent = false;
            if(s>1){
                //左右箭头自动添加
                if(options.arrow){
                    obj.append('<a href="javascript:void(0);" class="arrowLeft"></a><a href="javascript:void(0);" class="arrowRight"></a>');
                }
                //添加首和尾部元素
                $('ul li:last-child',obj).clone().prependTo("#animateT"+num+" ul").css("margin-left","-"+ w +"px");
                $('ul li:nth-child(2)',obj).clone().appendTo("#animateT"+num+" ul");
                $("ul",obj).width((s+2)*w);
                num++;
            }
            
            //选择按钮自动添加
            for(var i = 0;i<s;i++){
                if(s == 1){
                    disc = '';
                    $(".donghua_arrowR").hide();
                    $(".donghua_arrowL").hide();
                }else if(dsum == 0){
                    disc += '<span class="disc disc_hover" number='+dsum+'></span>'
                    dsum++;
                }else if(dsum > 0){
                    disc += '<span class="disc" number='+dsum+'></span>'
                    dsum++;
                }
            }
            str = '<span class="disc_border">'+disc+'</span>';
            obj.append(str);

            //左右移动click
            $(".arrowLeft",obj).click(function() {
                animate("left",true);
            });
            $(".arrowRight",obj).click(function() {
                animate("right",true);
            });
            $(".disc",obj).click(function() {
                animate(-parseInt($(this).attr("number")));
            });

            //鼠标拖动
            obj[0].addEventListener('mousedown', function (e) {
                onStart(e);
            });
            obj[0].addEventListener('mousemove', function (e) {
                onMove(e);
            });
            obj[0].addEventListener('mouseup', function (e) {
                onEnd(e);
            });
            obj[0].addEventListener('touchstart', function (e) {
                e = e.changedTouches[0];
                onStart(e);
            });
            obj[0].addEventListener('touchmove', function (e) {
                onMove(e.changedTouches[0], e);
            });           
            obj[0].addEventListener('touchend', function (e) {
                onEnd(e.changedTouches[0]);
            });
            function onStart(e){
                // console.log("movePrevent=="+movePrevent);
                if(movePrevent == true){
                    event.preventDefault();
                    return false;
                }
                event.preventDefault();
                // 起始点，页面位置
                startX = e.pageX;
                startY = e.pageY;
            }
            function onMove(e){
                if(movePrevent == true){
                    event.preventDefault();
                    return false;
                }
                event.preventDefault();
                
            }
            function onEnd(e){
                if(movePrevent == true){
                    event.preventDefault();
                    return false;
                }
                endX = e.pageX;
                // console.log('startX=='+startX+'endX=='+endX);
                event.preventDefault();
                if(endX-startX>100){
                    // console.log("left");
                    animate("left",true);
                }
                if(endX-startX<-100){
                    // console.log("right");
                    animate("right",true);
                }
            }

            function animate(dir,clicked){
                if(clickable){
                    clickable = false;
                    var p = null;
                    switch(dir){
                        case "left" :
                            t++;
                            break;
                        case "right" :
                            t--;
                            break;
                        default:
                            t = dir;
                            break;
                    }

                    var speed = options.speed;
                    p = (t*w);
                    $("ul",obj).animate(
                        { left: p }, 
                        { queue:false, duration:speed, complete:adjust}
                    );

                    if(clicked) clearTimeout(timeout);

                    if(options.auto && s>1){
                        timeout = setTimeout(function(){
                            animate("right",false);
                        },options.pause);
                    }
                }
            }
            function adjust(){
                if(t==1){
                    $("ul",obj).css("left",(s-1)*-w);
                    t = -ts;
                }
                if(t<-ts){
                    $("ul",obj).css("left",0);
                    t = 0;
                }
                $(".disc",obj).attr("class","disc");
                $('.disc_border span[number='+(-t)+']',obj).addClass('disc_hover');
                clickable = true;
                setTimeout("movePrevent=false;", 300 );
            }


            // init
            var timeout;
            if(options.auto && s>1){;
                timeout = setTimeout(function(){
                    animate("right",false);
                },options.speed);
            };

        }); 
    }
})(jQuery);