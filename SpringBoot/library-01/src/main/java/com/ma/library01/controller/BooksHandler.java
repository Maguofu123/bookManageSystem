package com.ma.library01.controller;

import com.alibaba.fastjson.JSONObject;
import com.ma.library01.dto.BooksDTO;
import com.ma.library01.entity.Books;
import com.ma.library01.repository.BooksRepository;
import com.ma.library01.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/nav")
public class BooksHandler {
    @Resource
    private BooksRepository booksRepository;

    @Resource
    private BookService bookService;

    @ResponseBody
    @GetMapping("/books")
    public List<Books> findAll(){
        return booksRepository.findAll();
    }

    @ResponseBody
    @GetMapping("/books/pages")
    public Page<BooksDTO> findAllBooks(@RequestParam("pageNum") int pageNum, @RequestParam("pageSize") int PageSize){
        return bookService.findBooks(pageNum, PageSize);
    }

    @ResponseBody
    @GetMapping("/books/find")
    public List<Books> findByNameLike(String book){
        return booksRepository.findByNameLike("%" + book + "%");
    }

    @ResponseBody
    @GetMapping("/books/find/{id}")
    public Optional<Books> findById(@PathVariable("id") Integer id){
        return booksRepository.findById(id);
    }

    @ResponseBody
    @PostMapping("/books/save")
    public Object save(Books books){
        List<Books> book1 = booksRepository.findByIsbn(books.getIsbn());
        JSONObject jsonObject = new JSONObject();

        if (book1.size() == 0) {
            Books result = booksRepository.save(books);
            if (result != null) {
                jsonObject.put("resultCode","1");
            }else {
                jsonObject.put("resultCode","-1");
            }
        }else {
            jsonObject.put("resultCode","0");
        }
        return jsonObject;
    }

    @ResponseBody
    @PutMapping("/books/update/{id}")
    public Object update(Books books){
        JSONObject jsonObject = new JSONObject();
        List<Books> booksList = booksRepository.findByIsbn(books.getIsbn());

        if (booksList.size() == 1){
            int oldId = books.getId();
            int newId = booksList.get(0).getId();
                    if(oldId == newId){
                        Books save = booksRepository.save(books);
                        if(save != null){
                            jsonObject.put("resultCode","1");
                        }
                        else{
                            jsonObject.put("resultCode","-1");
                        }
                    }
                    else{
                        jsonObject.put("resultCode","0");
                    }
                }
                //不存在
                else if(booksList.size() == 0){
                    booksRepository.save(books);
                    jsonObject.put("resultCode","1");
                }
                //其他情况
                else{
                    jsonObject.put("resultCode","0");
                }
                return jsonObject;
    }

    @ResponseBody
    @DeleteMapping("/books/delete/{id}")
    public Object deleteById(@PathVariable("id") Integer id){
//        System.out.println(id);
        JSONObject jsonObject = new JSONObject();
        if (booksRepository.existsById(id)) {
            booksRepository.deleteById(id);
            jsonObject.put("resultCode","1");
        }else {
            jsonObject.put("resultCode","-1");
        }
        return jsonObject;
    }

    @ResponseBody
    @GetMapping("/books/find/isbn/{isbn}")
    public List<Books> findByIsbn(@PathVariable("isbn") String isbn){
        return booksRepository.findByIsbn(isbn);
    }


}
