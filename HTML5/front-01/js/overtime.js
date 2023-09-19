$(function (){
    $.ajax({
        type: "get",
        url: "http://localhost:8181/borrows/find",
        dataType: "json",
        success: function (data){
            searchBorrow(data);
        },

        error: function (e){
            alert("系统错误");
        }
    })

    function searchBorrow(data){
        for (let i = 0; i < data.length; i++) {
            text = "<tr id='" + data[i].id + "' class='book'>" +
                "<td name='id'>" + data[i].id + "</td>" +
                "<td name='name'>" + data[i].name + "</td>" +
                "<td name='isbn'>" + data[i].isbn + "</td>" +
                "<td name='username'>" + data[i].username + "</td>" +
                "<td name='id_card'>" + data[i].id_card + "</td>" +
                "<td name='phone'>" + data[i].phone + "</td>" +
                "<td name='time'>" + data[i].time.substr(0, 10) + "</td>" +
                "<td name='r_time'>" + data[i].r_time.substr(0, 10) + "</td>" +
                "<td><button class='btn btn-warning btn-sm return' name='" + data[i].id + "' data-toggle='modal' data-target='#return-modal'>归还</button>" +
                "</tr>";
            $("tbody").append(text);
        }
    }

    // 根据isbn搜索
    let search_button = $('.search-button')
    $(search_button).click(function (e){
        e.preventDefault();
        $.ajax({
            type: "get",
            url: "http://localhost:8181/borrows/find/" + $('#search').val(),
            dataType: "json",
            success: function (data){
                $('.book').remove();
                searchBorrow(data);
            },
            error: function (e){
                alert("系统错误");
            }
        })
    })

    $(document).on('click', '.return',function (e){
        e.preventDefault();

        console.log($(this).attr("name"));
        $('.tip').text("是否确定归还" + $('#' + $(this).attr("name") + '>td[name="name"]').text() );

        let return_button = $('.return-button');
        return_button.attr("name",$(this).attr("name"));
        return_button.click(function (e){
            e.preventDefault();
            returnBook($(this).attr("name"));
        })
    })

    // 无用函数 -- 元素内触发
    // let return_book = $('.return');
    // $(return_book).click(function (e){
    //     e.preventDefault();
    //
    //     let return_button = $('.return-button');
    //     // return_button.attr("name",$(this).attr("name"));
    //     $('.tip').text("是否确定归还" );
    //
    //     return_button.click(function (e){
    //
    //     })
    // })

// 书籍归还函数
    function returnBook(id){
        $.ajax({
            type: "delete",
            url: "http://localhost:8181/borrows/return/" + id,
            dataType: "json",
            success: function (data){
                if (data.code == 1){
                    alert("归还成功");
                    window.location.reload();
                }
                if (data.code == 0){
                    alert("归还失败");
                }
                if (data.code == -1){
                    alert("服务器错误");
                }
            },
            error: function (e){
                alert("错误")
            }
        })
    }

})