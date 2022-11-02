let link_reg= document.querySelector('.link_reg')
let link_login=document.querySelector('.link_login')
  // 点击去注册账号的链接，点击一个，本体消失，另一个出现
  link_reg.addEventListener('click',function(){
    link_login.parentElement.parentElement.parentElement.style.display='block'
    this.parentElement.parentElement.parentElement.style.display='none'
  })

  link_login.addEventListener('click',function(){
    link_reg.parentElement.parentElement.parentElement.style.display='block'
    this.parentElement.parentElement.parentElement.style.display='none'
  })

  // 接下来要添加自定义表单规则，要从layui中获取到form元素
  let form =layui.form
  let layer=layui.layer
  let pwd1=document.querySelector('.pwd1')
  let pwd2=document.querySelector('.pwd2')
  // 通过form.verify()来自定义, 还要添加到verify属性中
  form.verify({
    password:[/^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'],
    passwordverify:function(value){
      if(pwd1.value!==pwd2.value){
        return'两次密码不一致，请重新输入'
      }
    }
  })
      // 监听注册表单的提交事件
      let form_reg=document.querySelector('#form_reg')
      form_reg.addEventListener('submit',function(e){
        // 首先组织其默认的提交行为，改用ajax，但是由于实在不会非jq的写法，在这里引用一下jq的语法包
      e.preventDefault()
      // 发起Ajax的POST请求
        var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
        }
      $.post('http://www.liulongbin.top:3007/api/reguser',data,function(res){
        if(res.status!==0){
          // layer.msg时layui里的用法
          return layer.msg(res.massage)
        }
        layer.msg('注册成功，请登录')
      })
      link_login.click()
      })
      // 监听登录按钮的提交事件
      let form_login=document.querySelector('#form_login')
      form_login.addEventListener('submit',function(e){
        // 组织默认提交
        e.preventDefault()
        $.ajax({
          url:'http://www.liulongbin.top:3007/api/login',
          method:'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
          if (res.status !== 0) {
          return layer.msg('登录失败！')
          }
          layer.msg('登录成功！')
          // 将登录成功得到的 token 字符串，保存到 localStorage 中
          localStorage.setItem('token', res.token)
        }
      })
         // 跳转到后台主页
        location.href = 'index.html'
    })