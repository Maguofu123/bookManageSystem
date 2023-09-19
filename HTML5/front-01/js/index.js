$(function (){
    let is_login = $.cookie("username");
    if (is_login != null && is_login != "" && is_login != ''){
        window.location.replace("/library.html")
    }

    let username = $('.username-text');
    let password = $('.password-text');
    let login_button = $('.login-button');


    login_button.click(function (e){
        e.preventDefault();
        if (username.val() === ""){
            alert("请输入用户名");
        }else if (password.val() === ""){
            alert("请输入密码");
        }else{
            $.ajax({
                type: "post",
                url: "http://localhost:8181/nav/login",
                // contentType: "application/json;charset=UTF-8",
                data: {"username": username.val(), "password": password.val()} ,
                dataType: "json",
                success: function (data){
                    if (data.code == "1"){
                        alert("登陆成功");
                        $.cookie("username",data.username,{expires: 7});
                        window.location.replace("/library.html");
                    }
                    if (data.code == "0"){
                        alert("账号密码错误");
                    }
                },
                error: function (data){
                    alert("系统错误");
                }
            });
        }
    });
});