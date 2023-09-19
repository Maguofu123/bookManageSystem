$(function (){

    $.ajax({
        type: "get",
        url: "http://localhost:8181/nav/books",
        dataType: "json",
        success: function (data){
            search(data);
            },

        error: function (e){
            alert("系统错误");
        }
    })


let search_button = $('.search-button');
let input_text = $("#search");

$(search_button).click(function (e){
    e.preventDefault();
    $.ajax({
        type: "get",
        url: "http://localhost:8181/nav/books/find",
        data: {book: input_text.val()},
        dataType: "json",
        success: function (data){
            $(".book").remove();
            search(data);
        },
        error: function (e){
            alert("系统错误");
        }
    })
});


    let book_title = $('#book-modal .modal-title')
    let book_form = $('#book-form');
    let operate_button = $('.operate-button');

    let add_button = $('.add-button');


    $(add_button).click(function (e){
        e.preventDefault();
        book_title.text("添加图书");
        book_form[0].reset();
        operate_button.text("添加");
    })



//检查表单函数
    function checkForm(){
        var bookGroup = $('#bookGroups');
        var name = $('#name');
        var author = $('#author');
        var press = $('#press');
        var price = $('#price');
        var quantity = $('#quantity');
        var isbn = $('#isbn');

        if(bookGroup.val() == '' || bookGroup.val() == "" || bookGroup.val() == null){
            alert("请输入图书组名");
        }
        else if(name.val() == '' || name.val() == "" || name.val() == null){
            alert("请输入图书名称");
        }
        else if(author.val() == '' || author.val() == "" || author.val() == null){
            alert("请输入作者名称");
        }
        else if(press.val() == '' || press.val() == "" || press.val() == null){
            alert("请输入出版社名称");
        }
        else if(price.val() == '' || price.val() == "" || price.val() == null){
            alert("请输入价格（人民币）");
        }
        else if(quantity.val() == '' || quantity.val() == "" || quantity.val() == null){
            alert("请输入数量（本）");
        }
        else if(isbn.val() == '' || isbn.val() == "" || isbn.val() == null){
            alert("请输入ISBN号码");
        }
        else if(isbn.val().length != 13){
            alert("请输入正确的ISBN号码");
        }
        else{
            return true;
        }

        return false;
    }

//添加图书函数
    function addBook(book_form){
        //判断表单，返回false不能添加，返回true能添加
        if(checkForm() != false){
            $.ajax({
                type: "post",
                url: "http://localhost:8181/nav/books/save",
                data: book_form.serialize(),
                dataType: "json",
                success:function(data){
                    if(data.resultCode == "-1"){
                        alert("添加失败，服务器错误");
                    }
                    if(data.resultCode == "0"){
                        alert("添加失败，此书已存在");
                    }
                    if(data.resultCode == "1"){
                        alert("添加成功");
                        window.location.reload();
                    }
                },
                error:function(data){
                    alert("错误");
                }
            });
        }
    }

function search(data){
    for (let i = 0; i < data.length; i++) {
        text = "<tr id='" + data[i].id + "' class='book'>" +
            "<td name='id'>" + data[i].id + "</td>" +
            "<td name='bookGroups'>" + data[i].bookGroups + "</td>" +
            "<td name='name'>" + data[i].name + "</td>" +
            "<td name='author'>" + data[i].author + "</td>" +
            "<td name='press'>" + data[i].press + "</td>" +
            "<td name='price'>" + data[i].price + "</td>" +
            "<td name='quantity'>" + data[i].quantity + "</td>" +
            "<td name='isbn'>" + data[i].isbn + "</td>" +
            "<td =><button class='btn btn-success btn-sm edit' name='" + data[i].id + "' data-toggle='modal' data-target='#book-modal'>编辑</button>" +
            "<button class='btn btn-danger btn-sm delete' name='" + data[i].id + "' data-toggle='modal' data-target='#delete-modal'>删除</button></td>" +
            "</tr>";
        $("tbody").append(text);
    }
}

$(document).on('click','.edit',function (e){
    e.preventDefault();
    book_title.text("编辑图书");
    book_form[0].reset();
    operate_button.text("编辑");
    operate_button.attr("name",$(this).attr("name"));
    getBook($(this).attr("name"));
})

$(operate_button).click(function (e){
    e.preventDefault();
    if (book_title.text() == "添加图书"){
        addBook(book_form);
    }
    if (book_title.text() == "编辑图书"){
        editBook($(this).attr("name"),book_form);
    }
})

function getBook(id){
    $.ajax({
        type: "get",
        url: "http://localhost:8181/nav/books/find/" + id,
        dataType: "json",
        success: function (data){
            $('#bookGroups').val(data.bookGroups);
            $('#name').val(data.name);
            $('#author').val(data.author);
            $('#press').val(data.press);
            $('#price').val(data.price);
            $('#quantity').val(data.quantity);
            $('#isbn').val(data.isbn);
        },
        error: function (e){
            alert("错误");
        }
    });
}

function editBook(id, book_form){
    if (checkForm() == true){
        $.ajax({
            type: "put",
            url: "http://localhost:8181/nav/books/update/" + id,
            data: book_form.serialize(),
            dataType: "json",
            success: function (data){
                if (data.resultCode == "-1"){
                    alert("修改失败，服务器错误");
                }
                if (data.resultCode == "0"){
                    alert("修改失败，ISBN已存在");
                }
                if (data.resultCode == "1"){
                    alert("修改成功");
                    window.location.reload();
                }
            },
            error: function (e){
                alert("错误");
            }

        })
    }
}

$(document).on('click','.delete',function (e){
    e.preventDefault();
    $('.delete-button').attr("name",$(this).attr("name"));
    $('.tip').text("确定删除" + $('#' + $(this).attr("name") + '>td[name="name"]').text() + "?");
});

    $('.delete-button').click(function (e){
        e.preventDefault();
        deleteBook($(this).attr("name"));
    })

//删除书本函数
function deleteBook(id){
    $.ajax({
        type: "delete",
        url: "http://localhost:8181/nav/books/delete/" + id,
        dataType: "json",
        success: function (data) {
            if(data.resultCode == "-1"){
                alert("服务器错误");
            }
            if(data.resultCode == "1"){
                alert("删除成功");
                window.location.reload();
            }
        },
        error: function (data){
            alert("错误");
        }
    });
}
})