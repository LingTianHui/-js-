



// 首先定义一个获取用户信息的函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3007/my/userinfo',
        // Headers就是请求头
        Headers:{
            Authorization:localStorage.getItem('token')||''
    },
    success: function(res) {
        if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
        }
        // 调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data)
    }
})
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
    .attr('src', user.user_pic)
    .show()
    $('.text-avatar').hide()
    } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
var first = name[0].toUpperCase()
$('.text-avatar')
.html(first)
.show()
}
}
// 记得在使用layui前要先初始化一个对象
let layui=layui.layer
// 实现退出按钮的功能
document.querySelector('#btnLogout').addEventListener('click',function(){
    // 我们使用layui的消息提示框来提示
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        //do something
        
        layer.close(index);
    }
    )
})
