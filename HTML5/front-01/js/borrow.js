$(function (){
    //搜索图书信息，并展示
    let search_button = $('.search-button');
    let search_text = $('.search-input');

    $(search_button).click(function (e){
        e.preventDefault();
        getBookByIsbn(search_text.val());
    })
    function getBookByIsbn(isbn){
        $.ajax({
            type: "get",
            url: "http://localhost:8181/nav/books/find/isbn/" + isbn,
            dataType: "json",
            success: function (data){
                $('.book-name').text(data[0].name);
                $('.book-author').text(data[0].author);
                $('.book-press').text(data[0].press);
                $('.book-isbn').text(data[0].isbn);
                $('.book-quantity').text(data[0].quantity);
            },
            error: function (e){
                if (e == null){
                    console.log(e);
                    alert("请输入正确的isbn号");
                }else {
                    console.log(e);
                    alert("错误")
                }
            }
        });
    }


    //借阅
    let username = $('.username');
    let id_card = $('.id-card');
    let phone = $('.phone');

    let borrow_button = $('.borrow-button');


    $(borrow_button).click(function (e){
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "http://localhost:8181/borrows",
            data: {isbn: $('.book-isbn').text(), username: username.val(), id_card: id_card.val(), phone: phone.val()},
            dataType: "json",
            success: function (data){
                if (data.code == "1"){
                    alert("借阅成功");
                    
                }
                if (data.code == "-1"){
                    alert("系统错误");
                }
                if (data.code == "0"){
                    alert("数量不足");
                }
            },
            error: function (e){
                alert("错误");
            }
        })
    })
})