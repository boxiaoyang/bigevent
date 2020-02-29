$(function () {
    var layer = layui.layer;
    var form = layui.form;

    form.verify({
        // 昵称的验证规则
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须2到6位，且不能出现空格'
        ]
    });

    initUserInfo();
    // 初始化用户信息(封装)
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败');
                };
                form.val('f1', res.data);
            }
        })
    };
    // 重置效果
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });
    // 提交修改信息
    $('#user_info').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败');
                };
                layer.msg('修改用户信息成功');
                window.parent.getUserInfo();
            }
        })
    });


});