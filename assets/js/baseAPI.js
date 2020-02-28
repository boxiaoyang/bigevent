$.ajaxPrefilter(function (option) {
    console.log(option);
    option.url = 'http://www.liulongbin.top:3007' + option.url;
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: sessionStorage.getItem('token')
        }
        option.complete = function (res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                sessionStorage.removeItem('token');
                parent.location.href = '/login.html';
            }
        };
    };
});