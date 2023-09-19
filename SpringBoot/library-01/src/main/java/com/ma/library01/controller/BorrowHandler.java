package com.ma.library01.controller;

import com.alibaba.fastjson.JSONObject;
import com.ma.library01.entity.Books;
import com.ma.library01.entity.Borrow;
import com.ma.library01.entity.Users;
import com.ma.library01.repository.BooksRepository;
import com.ma.library01.repository.BorrowRepository;
import com.ma.library01.repository.UsersRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;

@Controller
public class BorrowHandler {

    @Resource
    private BooksRepository booksRepository;

    @Resource
    private BorrowRepository borrowRepository;

    @Resource
    private UsersRepository usersRepository;

    @ResponseBody
    @PostMapping("/borrows")
    public Object borrows(String isbn, String username, String id_card, String phone){
        JSONObject jsonObject = new JSONObject();
        if (!isbn.equals("") && !username.equals("") && !id_card.equals("") && !phone.equals("")) {
            List<Books> booksList = booksRepository.findByIsbn(isbn);
            if (booksList.size() != 0) {
                Books books = booksList.get(0);
                if (books.getQuantity() - 1 >= 0) {
                    books.setQuantity(books.getQuantity() - 1);
                    Users users = usersRepository.findByPhone(phone);
                    if (users != null && users.getUsername().equals(username) && users.getId_card().equals(id_card) && users.getPhone().equals(phone)) {
                        TimeZone.setDefault(TimeZone.getTimeZone("GMT"));
                        Calendar calendar = Calendar.getInstance();
                        Date nowDate;
                        Date returnDate;

                        nowDate = calendar.getTime();
                        calendar.add(Calendar.DATE, 7);
                        returnDate = calendar.getTime();

                        Borrow borrow = new Borrow();
                        borrow.setName(books.getName());
                        borrow.setIsbn(books.getIsbn());
                        borrow.setUsername(users.getUsername());
                        borrow.setId_card(users.getId_card());
                        borrow.setPhone(users.getPhone());
                        borrow.setTime(nowDate);
                        borrow.setR_time(returnDate);

                        Borrow save = borrowRepository.save(borrow);

                        jsonObject.put("code", "1");
                    }
                    else {
                        jsonObject.put("code", "-1");
                    }
                }
                else {
                    jsonObject.put("code","0");
                }
            }
            else {
                jsonObject.put("code", "0");
            }
        }
        else {
            jsonObject.put("code","-1");
        }
        return jsonObject;
    }

    @ResponseBody
    @GetMapping("/borrows/find")
    public List<Borrow> findBorrowBooks(){
        return borrowRepository.findAll();
    }


    @ResponseBody
    @GetMapping("/borrows/find/{isbn}")
    public List<Borrow> findBorrowBooksByIsbn(@PathVariable("isbn") String isbn){
        return borrowRepository.findByIsbn(isbn);
    }


    @ResponseBody
    @DeleteMapping("/borrows/return/{id}")
    public Object returnBook(@PathVariable("id") Integer id){
        JSONObject jsonObject = new JSONObject();
        Borrow borrow = borrowRepository.getById(id);
        List<Books> booksList = booksRepository.findByIsbn(borrow.getIsbn());
        if (booksList.size() != 0) {
            if (borrowRepository.existsById(id)) {
                borrowRepository.deleteById(id);
                Books books = booksList.get(0);
                books.setQuantity(books.getQuantity() + 1);
                jsonObject.put("code", "1");
            }else {
                jsonObject.put("code", "0");
            }
        }else {
            jsonObject.put("code", "系统错误");
        }
        return jsonObject;
    }


    @ResponseBody
    @GetMapping("/overtime/find/{isbn}")
    public List<Borrow> findOvertime(@PathVariable("isbn") String isbn){
        List<Borrow> oldBorrowList;
        List<Borrow> borrowList = new ArrayList<>();

        TimeZone.setDefault(TimeZone.getTimeZone("GMT"));

        if (isbn.equals("0")) {
            oldBorrowList = borrowRepository.findAll();
        }else {
            oldBorrowList = borrowRepository.findByIsbn(isbn);
        }

        if (oldBorrowList.size() != 0){
            for (Borrow borrow :
                    oldBorrowList) {
                Calendar calendar = Calendar.getInstance();
                if (calendar.getTime().after(borrow.getR_time())){
                    borrowList.add(borrow);
                }
            }
        }
        return borrowList;
    }
}
