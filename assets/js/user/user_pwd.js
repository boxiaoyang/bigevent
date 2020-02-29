$(function () {
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        // 密码的基本验证规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            var pwd = $('[name=newPwd]').val();
            // console.log(pwd);
            if (value !== pwd) {
                return '两次密码不一致';
            };
        }
    })

    $('#userPwd').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！');
                };
                layer.msg('更新密码成功！');
                $('#userPwd')[0].reset();
            }
        })
    });




});