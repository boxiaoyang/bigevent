$(function () {
    $('#first-nav').click();
    var layer = layui.layer;
    getUserInfo();

    $('#btn-logout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            sessionStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
});

function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return;
            };
            renderAvatar(res.data)
        }
    });
};

function renderAvatar(user) {
    // console.log(user);

    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    var first = name[0].toUpperCase()
    // console.log(!res.data.user_pic);
    if (!user.user_pic) {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().text(first);
    } else {
        $('.layui-nav-img').show().prop('src', user.user_pic);
        $('.text-avatar').hide();
    };
};