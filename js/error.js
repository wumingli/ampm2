$(function() {
    window.showError = function(msg, delay) {
        var timer = null,
            errorHtml;
        msg = msg || '请完善信息';
        delay = delay || 1000;
        timer && clearTimeout(timer);
        errorHtml = '<div class="error-container"><div class="m-modal error-pop"><h3>' + msg + '</h3></div><div class="m-opacity-layer"></div></div>';
        if ($('.error-container').length === 0) {
            $('body').append(errorHtml);
        }
        timer = setTimeout(function() {
            $('.error-container').remove();
        }, delay);
    }
});