$(function () {
    // 点击"去注册账号" 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击"去登录" 的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layUI 中获取form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 检验两次密码是否一致
        repwd: function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,function(res){
            if(res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录！');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        console.log($(this).serialize())
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登陆成功得到的token字符串，保存到localStorage
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})