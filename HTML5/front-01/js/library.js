$(function (){


    let is_login = $.cookie("username");
    if (is_login == null || is_login == "" || is_login == ''){
        alert("请登录");
        window.location.replace("/index.html");
    }


    $("ul>li").click(function (e){
        $("li").removeClass("active");
        $(this).addClass("active");
    })

    $(".exit").click(function (e){
        let exit = $.removeCookie("username",{path:'/'});
        if (exit){
            window.location.replace("/index.html");
            alert("您已退出系统");
        }else {
            alert("系统错误");
        }
    })



})



