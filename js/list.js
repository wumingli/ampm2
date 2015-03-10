$(function(){
    var changeAddBtn = $('.gps_store'),
        addPlane = $('.m_gps_hide'),
        addPlaneCloseBtn = $('.m_gps_close'),
        menu = $(".m_menu_list"),
        section = $('section.m_list_wp'),
        promotionBtn = $('#promotion-btn'),
        promotionArea = $('#promotion-list'),
        promotionListTpl = baidu.template('promotionListTpl'),
        taskoutArea = $('#takeout-list'),
        takeoutListTpl = baidu.template('takeoutListTpl'),
        goodsArea = $('#goods-list'),
        goodsListTpl = baidu.template('goodsListTpl'),
        minatoArea = $('#minato-list'),
        minatoListTpl = baidu.template('minatoListTpl'),
        toTop = $(".u-btn-top"),
        goodsDetailArea = $('.shop_detail'),
        goodsDetailTpl = baidu.template('goodsDetailTpl'),
        container = $('.m-container'),
        shopCarArea = $('.shop_car'),
        shopCarList = shopCarArea.find('.pro_count_list'),
        shopCarListTpl = baidu.template('shopCarListTpl'),
        mask = $('#mask'),
        tpls = {
            'takeout-list':takeoutListTpl,
            'promotion-list':promotionListTpl,
            'goodsListTpl':goodsListTpl,
            'minatoListTpl':minatoListTpl
        };

    //入场动画
    setTimeout(function(){
        menu.css('transform', 'translate(0, 0)');
        promotionArea.css('transform', 'translate(0, 0)');
    },10);

    //切换地址按钮
    changeAddBtn.on('click',function(){
        addPlane.show();
    });
    
    //关闭地址选择按钮
    addPlaneCloseBtn.on('click',function(){
        addPlane.hide();
    });

    //右侧菜单事件
	menu.on('click', 'dt', function(e) {
        var self = $(this),
            dd = self.siblings("dd"),
            cur = menu.find(".on");
        self.parent().toggleClass('active');
	}).on('click', 'dd a', function(e) {
        var self = $(this),
            href = self.attr("href");
            dd = self.parent(),
            target = dd.attr("data-list");
            cur = menu.find(".on");
        e.stopPropagation();
        e.preventDefault();
        if (cur[0] == this) {
            return;
        }
        //临时部分，之后删除start
        var temp = {
            "./getList?list=1":"../data/3.3-zao.json",
            "./getList?list=2":"../data/3.3-wu.json",
            "./getList?list=3":"../data/3.3-wan.json"
        };
        href = temp[href];
        //临时部分，之后删除end
        $.ajax({
            url:href,
            dataType:"json",
            success:function(data){
                var area = $("#" + target);
                if (data && data.status == 'ok') {
                    area.children().first().html(tpls[target](data));
                    menu.find(".on").removeClass("on");
                    self.addClass("on")
                    if (cur.parent()[0] != dd[0]) {
                        menu.find("dt").removeClass('list_gray');
                        dd.siblings("dt").addClass('list_gray');
                        section.find("article.cur").removeClass('cur');
                        area.addClass('cur');
                    }
                } else {
                    alert("数据有误，请重试");
                    return false;
                }
            }
        });
    });
    //促销按钮单独处理
    promotionBtn.on('click', function(e) {
        var self = $(this),
            href = self.attr("href");
            dt = self.parent(),
            target = self.attr("data-list");
            cur = menu.find(".on");
        e.preventDefault();
        e.preventDefault();
        if(menu.find("dt.list_gray a")[0] == this){
            return;
        }
        $.ajax({
            url:href,
            dataType:"json",
            success:function(data){
                if (data && data.status == 'ok') {
                    promotionArea.find('.pic_list').html(promotionListTpl(data));
                    menu.find(".on").removeClass('on');
                    menu.find("dt").removeClass('list_gray');
                    dt.addClass('list_gray');
                    section.find("article.cur").removeClass('cur');
                    $("#" + target).addClass('cur');
                } else {
                    alert("数据有误，请重试");
                    return false;
                }
            }
        });
    }).trigger('click');
	//top按钮效果
    $(window).on('scroll',function(e){
        var article_showHeight = window.screen.height,
            t = document.documentElement.scrollTop || document.body.scrollTop;   
        if( t >= article_showHeight) {
            toTop.show();
        }else{
            toTop.hide();
        }
    });
    //toTop按钮
	toTop.click(function(){
        window.scrollTo(0,0);
    });
    //拼餐事件
    taskoutArea.on('click', '.u-icon-reduce', function(e){
        e.preventDefault();
        var self = $(this);
        self.siblings('span').html(curSet.rm(self));
    }).on('click', '.u-icon-add', function(e){
        e.preventDefault();
        var self = $(this);
        self.siblings('span').html(curSet.add(self));
    }).on('click', '.u-btn-order-submit', function(e){
        var input = $(this).parent().find('.u-typeNum'),
            num = parseInt(input.val());
        if (!(!!num && num > 0)) {
            num = 1;
            input.val(num);
        }
        shoppingCart.add(curSet.get(num));
    });
    //商品列表事件
    goodsArea.on('click', '.detail', function(e){
        e.preventDefault();
        e.stopPropagation();
        var li = $(this).closest('li')
        var data = {
            imgs:li.data("imgs"),
            img:li.data("img"),
            title:li.data("title"),
            id:li.data("id"),
            price:li.data("price"),
            num:li.data("num")
        };
        containerUp();
        mask.one('click',containerDown);
        goodsDetailArea.html(goodsDetailTpl(data)).show();
        goodsDetailArea.data("imgs",data["imgs"]);
        goodsDetailArea.data("img",data["img"]);
        goodsDetailArea.data("title",data["title"]);
        goodsDetailArea.data("id",data["id"]);
        goodsDetailArea.data("price",data["price"]);
        goodsDetailArea.data("num",data["num"]);
    }).on('click', ".u-icon-add", function(e){
        e.preventDefault();
        e.stopPropagation();
        var li = $(this).closest('li');
        var num = parseInt(li.find('.number').html(),10);
        num = num >= 99 ? 99 : num + 1;
        li.data('num',num);
        li.find('.number').html(num);
    }).on('click', '.u-icon-reduce', function(e){
        e.preventDefault();
        e.stopPropagation();
        var li = $(this).closest('li');
        var num = parseInt(li.find('.number').html(),10);
        num = num <= 0 ? 0 : num - 1;
        li.data('num',num);
        li.find('.number').html(num);
    });
    //商品详情事件
    goodsDetailArea.on('click', '.queding', function(e){
        goodsDetailArea.hide();
        containerDown();
    }).on('click', ".u-icon-add", function(e){
        e.preventDefault();
        e.stopPropagation();
        var p = $(this).parent();
        var num = parseInt(p.find('.number').html(),10);
        num = num <= 0 ? 0 : num - 1;
        goodsDetailArea.data('num',num);
        li.find('.number').html(num);
    }).on('click', '.u-icon-reduce', function(e){
        e.preventDefault();
        e.stopPropagation();
        var p = $(this).parent();
        var num = parseInt(p.find('.number').html(),10);
        num = num <= 0 ? 0 : num - 1;
        goodsDetailArea.data('num',num);
        li.find('.number').html(num);
    }).on('click', '.btnRed', function(e){
        var unitPrice = parseFloat(goodsDetailArea.data('price'),10).toFixed(2),
            num = parseInt(goodsDetailArea.data('num'),10),
            totalPrice = (unitPrice*num).toFixed(2).toString();
        shoppingCart.add({
            "id":[goodsDetailArea.data('id')],
            "title":[goodsDetailArea.data('title')],
            "unitPrice":unitPrice,
            "totalPrice":totalPrice,
            "num":num
        })
    });
    //购物车事件
    shopCarArea.on('click', '.m_shopCar', function () {
        var $this = $(this),
            num = parseInt($this.data('num'));
        if (num === 0) {
            return false;
        }
        if ($this.data('status') === 'on') {
            containerDown();
            $this.data('status','off');
        } else {
            containerUp();
            $this.data('status','on');
            mask.one('click',containerDown);
        }
    }).on('click', '.icon_sub', function(){
        var self = $(this);
        var li = self.closest('li');
        var index = li.index();
        var goodData = shoppingCart.goods[index];
        goodData.num = goodData.num - 1;
        if(goodData.num == 0){
            shoppingCart.rm(index);
            shopCarArea.find('.m_shopCar').data('num') = shoppingCart.goods.length;
            if(!shoppingCart.goods.length){
                shopCarArea.find('.m_shopCar').trigger('click');
            }
            return;
        }
        li.find('.pro_count_text').html(goodData.num);
    }).on('click', '.icon_add', function(){
        var self = $(this);
        var li = self.closest('li');
        var index = li.index();
        var goodData = shoppingCart.goods[index];
        goodData.num = goodData.num + 1;
        li.find('.pro_count_text').html(goodData.num);
    });

    function containerUp() {
        mask.show();
        container.addClass('go-back');
    }

    function containerDown() {
        container.removeClass('go-back');
        mask.hide();
        mask.off('click');
    }
    
    var shoppingCart = {
        goods: [],
        num: 0,
        add: function(data){
            var index = this.find(data);
            if(index === false){
                this.goods.push(data);
                shopCarList.append(shopCarListTpl(data));
            }else {
                this.goods[index].num = this.goods[index].num + data.num;
                this.refresh(index);
            }
        },
        rm: function(index){
            if(index<0||index>=this.goods.length){
                console.warn('未在购物车里找到指定商品');
            } else {
                this.goods.splice(index,1);
                shopCarList.children().eq(index).remove();
            }
        },
        plus: function(index){
            if(index===false){
                console.warn('未在购物车里找到指定商品');
            } else {
                this.goods[index].num = this.goods[index].num + 1;
                this.refresh(index);
            }
        },
        less: function(index){
            if(index<0||index>=this.goods.length){
                console.warn('未在购物车里找到指定商品');
            } else {
                this.goods[index].num = this.goods[index].num - 1;
                if(this.goods[index].num <= 0){
                    this.rm(index);
                    return;
                }
                this.refresh(index);
            }
        },
        refresh: function(index){
            var good = this.goods[index];
            good.totalPrice = (good.unitPrice*good.num).toFixed(2).toString();
            shopCarList.children().eq(index).find('em').html('￥' + good.totalPrice);
            shopCarList.children().eq(index).find('.pro_count_text').html(good.num);
        },
        find: function(data){
            var index = false,
                id = data.id.sort().join(',');
            this.goods.forEach(function(v,i){
                if(v.id.sort().join(',') == id){
                    if(data.isSet){
                        if(v.riceNum == data.riceNum){
                            index = i;
                        }
                    }else{
                        index = i;
                    }
                }
            });
            return index;
        },
        sum: function(){
            var price = 0;
            this.goods.forEach(function(v,i){
                price = price + parseFloat(v.totalPrice,10);
            });
            return price;
        }
    };
    var curSet = {
        set: [],
        rice: {
            'id': '',
            'title': '米饭',
            'remaining': 0,
            'price': 2,
            'num': 1
        },
        num: 0,
        get: function(num){
            var set = this.set,
                id = [],
                title = [],
                price = [],
                sum = 0;
            if(this.num < 2){
                showError('请至少选两个做拼餐，菠菜哥谢谢你。');
                return false;
            }
            $.each(set,function(i,v){
                for (var i = 0,l = v.num; i<l; i++) {
                    id.push(v.id);
                    title.push(v.title);
                    price.push(v.price);
                }
            });
            title.push(this.rice.title + (this.rice.num > 1 ? ('*' + this.rice.num) : ''));
            price.push(this.rice.price * this.rice.num);
            $.each(price,function(i,v){
                sum = sum + parseFloat(v,10);
            });
            return {
                "id":id,
                "title":title,
                "unitPrice":sum.toFixed(2),
                "totalPrice":(sum*num).toFixed(2).toString(),
                "num":num,
                "riceNum":this.rice.num,
                "isSet":true
            };
        },
        find: function(id){
            var index = false;
            this.set.every(function(v,i){
                if(v.id == id){
                    index = i;
                }
                return v.id != id;
            });
            return index;
        },
        add: function(node){
            var dd,
                id,
                price,
                title,
                remaining,
                set = this.set,
                index;
            if (set.length == 0) {
                dd = node.closest('dd');
                id = dd.data('id');
                price = dd.data('price');
                title = dd.data('title');
                remaining = dd.data('remaining');
                set.push({
                    'id': id,
                    'title': title,
                    'remaining': remaining,
                    'price': price,
                    'num': 1
                });
                return this.num = 1;
            } else {
                dd = node.closest('dd');
                id = dd.data('id');
                index = this.find(id);
                if (index === false) {
                    if(this.num < 3){
                        price = dd.data('price');
                        title = dd.data('title');
                        remaining = dd.data('remaining');
                        set.push({
                            'id': id,
                            'title': title,
                            'remaining': remaining,
                            'price': price,
                            'num': 1
                        });
                        this.num = this.num + 1;
                        return 1;
                    }else{
                        showError("最多只能三拼");
                        return 0;
                    }
                } else {
                    if(this.num < 3){
                        set[index].num = set[index].num + 1;
                        this.num = this.num + 1;
                        return set[index].num;
                    }else{
                        showError("最多只能三拼");
                        return set[index].num;
                    }
                }
            }
        },
        rm: function(node){
            var dd,
                id,
                set = this.set,
                index;
            if (set.length == 0) {
                showError("未添加拼餐");
                return 0;
            } else {
                dd = node.closest('dd');
                id = dd.data('id');
                index = this.find(id);
                if (index === false) {
                    return 0;
                } else if(this.num == 1){
                    set = [];
                    this.num = 0;
                    return 0;
                } else if(set[index].num == 1){
                    set.splice(index,1);
                    this.num = this.num - 1;
                    return 0;
                } else {
                    set[index].num = set[index].num - 1;
                    this.num = this.num - 1;
                    return set[index].num;
                }
            }
        }
    }
});

