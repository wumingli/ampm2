$(function(){
    var shopCarList = $('article.shop_car_list');
    var shopCarSumMsg = $('.shop_car .sum-msg');
    var shopCarSumMsgTpl = '总共{{price}}元';
    var shopCartData = {
        goods: [],
        init: function(){
            var li = shopCarList.find('li[data-id]');
            var that = this;
            li.each(function(i,v){
                v = $(v);
                that.goods.push({
                    id:v.attr('data-id'),
                    num:parseInt(v.attr('data-num'),10),
                    unitPrice:v.attr('data-unit-price'),
                    totalPrice:v.attr('data-total-price')
                })
            });
            this.sum();
        },
        rm: function(index){
            if(this.goods[index]){
                this.goods.splice(index,1);
                shopCarList.find('li[data-id]').eq(index).remove();
                this.sum();
            } else {
                console.warn('未在购物车里找到指定商品');
            }
        },
        plus: function(index){
            if(this.goods[index]){
                this.goods[index].num = this.goods[index].num + 1;
                this.refresh(index);
                this.sum();
            } else {
                console.warn('未在购物车里找到指定商品');
            }
        },
        less: function(index){
            if(this.goods[index]){
                this.goods[index].num = this.goods[index].num - 1;
                if(this.goods[index].num <= 0){
                    this.rm(index);
                    return;
                }
                this.refresh(index);
                this.sum();
            } else {
                console.warn('未在购物车里找到指定商品');
            }
        },
        refresh: function(index){
            var goods = this.goods[index];
            var li = shopCarList.find('li[data-id='+goods.id+']');
            goods.totalPrice = (goods.unitPrice*goods.num).toFixed(2).toString();
            li.attr('data-num',goods.num);
            li.attr('data-total-price',goods.totalPrice);
        },
        sum: function(){
            var price;
            if(!this.goods.length){
                shopCarSumMsg.html('购物车是空的');
            }else{
                price = 0;
                this.goods.forEach(function(v,i){
                    price = price + parseFloat(v.totalPrice,10);
                });
                price = price.toFixed(2).toString();
                shopCarSumMsg.html(shopCarSumMsgTpl.replace(/\{\{price\}\}/,price));
            }
        }
    };

    shopCartData.init();
	shopCarList.on('click', ".u-icon-add", function(e){
        e.preventDefault();
        e.stopPropagation();
        var li = $(this).closest('li');
        var num = parseInt(li.attr('data-num'),10);
        if(num>=99){
            return;
        }else{
            num = num +1;
            shopCartData.plus(li.index());
            li.find('.number').html(num);
        }
    }).on('click', '.u-icon-reduce', function(e){
        e.preventDefault();
        e.stopPropagation();
        var li = $(this).closest('li');
        var num = parseInt(li.attr('data-num'),10);
        num = num - 1;
        shopCartData.less(li.index());
        li.find('.number').html(num);
    }).on('click', '.remove_goods', function(e){
        e.preventDefault();
        e.stopPropagation();
        var self = $(this);
        var li = self.closest('li');
        if(self.hasClass('ready')){
            shopCartData.rm(li.index());
        }else{
            self.addClass('ready').html('-');
            shopCarList.find('reday').removeClass('ready').html('');
        }
    });
});


