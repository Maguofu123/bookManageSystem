$(function (){

    var currentPage = 1;
    var itemsPerPage = 10;
    getData(currentPage, itemsPerPage);

    function getData(pageNum, pageSize){
        $.ajax({
            type: "get",
            url: "http://localhost:8181/nav/books/pages",
            data: {pageNum: pageNum, pageSize: pageSize},
            dataType: "json",
            success: function (data){
                console.log(data)
                console.log(data.pageable.pageNumber)
                console.log(data.pageable.pageSize)
                console.log(data.content)
                console.log(data.totalElements)
                console.log(data.pageable.pageNumber)
                console.log(data.totalPages)
                console.log(data.content[0].name)
                renderItems(data.pageable.pageNumber, data.pageable.pageSize, data.content, data.totalElements);
                renderPagination(data.pageable.pageNumber, data.totalPages);
            },
            error: function (e){
                alert("系统错误");
            }
        })
    }

    function renderItems(page, perPage, data, length) {
        var start = (page - 1) * perPage;
        var end = start + perPage;
        var html = '';
        for (var i = start; i < end && i < length; i++) {
            var item = data[i];
            html += '<div class="item">' +
                '<div class="name">' + item.name + '</div>' +
                '<div class="age">' + item.author + '</div>' +
                '<div class="gender">' + item.press + '</div>' +
                '</div>';
        }
        $('#data-container').html(html);
    }

    function renderPagination(page, totalPages) {
        var html = '';
        var prevDisabled = page == 1 ? ' disabled' : '';
        var nextDisabled = page == totalPages ? ' disabled' : '';
        html += '<li class="prev' + prevDisabled + '"><a href="#" data-page="' + (page - 1) + '">Prev</a></li>';
        for (var i = 1; i <= totalPages; i++) {
            var activeClass = i == page ? ' active' : '';
            html += '<li class="page' + activeClass + '"><a href="#" data-page="' + i + '">' + i + '</a></li>';
        }
        html += '<li class="next' + nextDisabled + '"><a href="#" data-page="' + (page + 1) + '">Next</a></li>';
        $('#pagination').html(html);
    }


    $('#pagination').on('click', 'a', function(e) {
        e.preventDefault();
        var page = $(this).data('page');
        if (page && page != currentPage) {
            currentPage = page;
            getData(currentPage, 10)
        }
    });


})