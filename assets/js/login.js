$(function() {
    //点击去注册账号的链接
    $('#link_reg').on("click", function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    $('#link_login').on("click", function() {
        $('.login-box').show()
        $('.reg-box').hide()

    })


    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()函数自定义规则
    form.verify({
        // 自定义了一个pwd的校验规则
        'pwd': [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        'repwd': function(value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则retrun一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on("submit", function(e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('.reg-box [name=password]').val() }
        $.post('/api/reguser', data,
            function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，请登录")
                    // 模拟人的点击行为
                $("#link_login").click()
            }
        )
    })

    $('#login').on("submit", function(e) {
        e.preventDefault()
        data = $(this).serialize()
        $.post('/api/login', data,
            function(res) {
                if (res.status == 0) {
                    //将登录成功得到的token字符串，保存到loaclStroge中
                    layer.msg(res.message)
                    localStorage.setItem('token', res.token)
                    location.href = '/backstage/index.html'
                } else {
                    layer.msg(res.message)
                    console.log(res)
                }
            })
    })

})