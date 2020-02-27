$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 点击'去登录'和'去注册'完成页面跳转
    $('#btn-login').on('click', function () {
        $('.login-box').hide().siblings().show();
    });
    $('#btn-reg').on('click', function () {
        $('.reg-box').hide().siblings().show();
    });


    // 注册页面表单验证
    var url = 'http://www.liulongbin.top:3007';
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePass: function (value) {
            var psw = $('.reg-box [name=password]').val();
            // console.log(value);
            if (value !== psw) {
                return '两次的密码不一致!';
            }
        }
    })

    $('.reg-box form').on('submit', function (e) {
        e.preventDefault();
        // return false;
        $.ajax({
            type: 'post',
            url: url + '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                $('#btn-reg').click();
            }
        });
    });


    // 登录表单验证
    $('.login-box form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: url + '/api/login',
            data: $('.login-box form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg(res.message);
                sessionStorage.setItem('token', res.token);
                location.href = '/index.html';
            }

        });
    });




});


