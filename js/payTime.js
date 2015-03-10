$(function () {
    //支付页面2分钟倒计时
    var totalTime = 120,
        width = 100,
        interval;
    interval = setInterval(function () {
        $('.u-timebox').next('p').html(--totalTime + '秒');
        width = (totalTime * 100) / 120;
        $('.u-bar').css('width', width + '%');
        if (width === 0) {
            $.ajax({
                url: 'get_pay_code.php',
                success: function (data) {
                    $('.m-top-code img').src(data.src[0]);
                    $('.m-down-code img').src(data.src[1]);
                }
            });
            clearInterval(interval);
            return false;
        }
    }, 1000);
});