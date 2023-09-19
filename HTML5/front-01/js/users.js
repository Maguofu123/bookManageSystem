$(function (){
    $.ajax({
        type: "get",
        url: "http://localhost:8181/users",
        dataType: "json",
        success: function (data){
            show(data);
        },
        error: function (e){
            alert("错误");
        }
    })


    $('.search-button').click(function (e){
        e.preventDefault();
        let name = $('#search').val();
        $.ajax({
            type: "get",
            url: "http://localhost:8181/users/find",
            data: {username: name},
            dataType: "json",
            success: function (data){
                $('.users').remove();
                show(data);
            },
            error: function (e){
                alert("错误");
            }
        })
    })

    let user_form = $('#user-form');
    let operate_button = $('.operate-button');
    $('.add-button').click(function (e){
        e.preventDefault();
        $('.modal-title').text("添加用户");
        user_form[0].reset();
        operate_button.text("添加");
    })


    $(document).on('click','.edit',function (e){
        e.preventDefault();
        $('.modal-title').text("编辑用户");
        user_form[0].reset();
        operate_button.text("编辑");
        operate_button.attr("name", $(this).attr("name"))
        findUser($(this).attr("name"));
    })

    $(document).on('click','.delete',function (e){
        e.preventDefault();
        $('.tip').text('确认删除' +$("#" + $(this).attr("name") + '>td[name="username"]').text() + "？");
        $('.delete-button').attr("name",$(this).attr("name"))
        $('.delete-button').click(function (e){
            e.preventDefault();
            deleteUser($(this).attr("name"));
        })
    })

    operate_button.click(function (e){
        e.preventDefault();
        if (operate_button.text() == "添加"){
            addUser(user_form);
        }
        if (operate_button.text() == "编辑"){
            editUser($(this).attr("name"), user_form);
        }
    })

    function show(data){
        for (let i = 0; i < data.length; i++) {
            text = "<tr id='" + data[i].id +"' class='users'>" +
                "<td name='id'>" + data[i].id + "</td>" +
                "<td name='userGroups'>" + data[i].userGroups + "</td>" +
                "<td name='username'>" + data[i].username + "</td>" +
                "<td name='password'>" + data[i].password + "</td>" +
                "<td name='gender'>" + data[i].gender + "</td>" +
                "<td name='id_card'>" + data[i].id_card + "</td>" +
                "<td name='phone'>" + data[i].phone + "</td>" +
                "<td name='identity'>" + data[i].identity + "</td>" +
                "<td><button class='btn btn-success btn-sm edit' name='" + data[i].id + "' data-toggle='modal' data-target='#user-modal'>编辑</button>" +
                "<button class='btn btn-danger btn-sm delete' name='" + data[i].id + "' data-toggle='modal' data-target='#delete-modal'>删除</button></td>" +
                "</tr>";
            $("tbody").append(text);
        }
    }
    function checkForm(){
        var userGroups = $('#userGroups');
        var username = $('#username');
        var password = $('#password');
        var gender = $('#gender');
        var id_card = $('#id_card');
        var phone = $('#phone');
        var identity = $('#identity');

        if(userGroups.val() == '' || userGroups.val() == "" || userGroups.val() == null){
            alert("请输入组别");
        }
        else if(username.val() == '' || username.val() == "" || username.val() == null){
            alert("请输入用户名");
        }
        else if(password.val() == '' || password.val() == "" || password.val() == null){
            alert("请输入密码");
        }
        else if(gender.val() == '' || gender.val() == "" || gender.val() == null){
            alert("请输入性别");
        }
        else if(id_card.val() == '' || id_card.val() == "" || id_card.val() == null){
            alert("请输入借书卡号");
        }
        else if(phone.val() == '' || phone.val() == "" || phone.val() == null){
            alert("请输入手机号");
        }
        else if(identity.val() == '' || identity.val() == "" || identity.val() == null){
            alert("请输入身份");
        }
        else{
            return true;
        }

        return false;
    }

    function addUser(user_form){
        if (checkForm() != false){
            $.ajax({
                type: "post",
                url: "http://localhost:8181/users/add",
                data: user_form.serialize(),
                dataType: "json",
                success: function (data){
                    if (data.code == "1"){
                        alert("添加成功");
                        window.location.reload();
                    }
                    if (data.code == "0"){
                        alert("用户已存在");
                    }
                    if (data.code == "-1"){
                        alert("错误");
                    }
                },
                error: function (e){
                    alert("系统错误");
                }
            });
        }
    }

    function findUser(id){
        $.ajax({
            type: "get",
            url: "http://localhost:8181/users/find/" + id,
            dataType: "json",
            success: function (data){
                $('#userGroups').val(data.userGroups);
                $('#username').val(data.username);
                $('#password').val(data.password);
                $('#gender').val(data.gender);
                $('#id_card').val(data.id_card);
                $('#phone').val(data.phone);
                $('#identity').val(data.identity);
            },
            error: function (e){
                alert("系统错误");
            }
        })
    }

    function editUser(id, user_form) {
        if (checkForm() != false){
            $.ajax({
                type: "put",
                url: "http://localhost:8181/users/edit/" + id,
                data: user_form.serialize(),
                dataType: "json",
                success: function (data){
                    if (data.code == "1"){
                        alert("修改成功");
                        window.location.reload();
                    }
                    if (data.code == "0"){
                        alert("修改失败，用户已存在");
                    }
                    if (data.code == "-1"){
                        alert("修改失败，服务器错误")
                    }
                },
                error: function (e){
                    alert("系统错误");
                }
            })
        }
    }

    function deleteUser(id){
        $.ajax({
            type: "delete",
            url: "http://localhost:8181/users/delete/" + id,
            dataType: "json",
            success: function (data){
                if (data.code == "1"){
                    alert("删除成功");
                    window.location.reload();
                }
                if (data.code == "-1"){
                    alert("错误");
                }
            },
            error: function (e){
                alert("错误");
            }
        })
    }

})