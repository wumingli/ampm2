$(function(){
    var orderInfoArea = $('.m-order-info');
    var testFunc = {
        required: function (val) {
            return val.length !== 0;
        },
        phone: function (val) {
            return /^1\d{10}$/.test(val);
        },
        min: function (val, length) {
            return val.length >= length;
        }
    };

    orderInfoArea.on('click', '[data-type=result]', function(e){
        var self = $(this);
        self.hide().siblings('[data-type=input]').addClass('show').val(self.text()).focus();
    }).on('blur', '[data-type=input]', function(e){
        var self = $(this);
        var error = false;
        var val = self.val();
        tests = self.attr('data-test').split('|');
        tests.forEach(function(v,i){
            v = v.split('(');
            func = v[0];
            args = v[1] == undefined ? [] : v[1].slice(0,-1).split(',');
            args.unshift(val);
            if(testFunc[func] == undefined){
                console.warn('验证条件未知');
                return;
            }
            if(!testFunc[func].apply(self,args)){
                error = true;
            }
        });
        if(error){
            self.addClass('unhappy')
            return;
        }
        self.removeClass('show').siblings('[data-type=result]').show().text(self.val());
    });
})
