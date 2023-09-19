package com.ma.library01.dto;

import com.ma.library01.entity.Books;

import java.awt.print.Book;

public class BooksDTO {
    private Integer Id;
    private String bookGroups;
    private String name;
    private String author;
    private String press;
    private Double price;
    private Integer quantity;
    private String isbn;

    public BooksDTO(Books books){
        this.Id = books.getId();
        this.bookGroups = books.getBookGroups();
        this.name = books.getName();
        this.author = books.getAuthor();
        this.press = books.getPress();
        this.price = books.getPrice();
        this.quantity = books.getQuantity();
        this.isbn = books.getIsbn();
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getBookGroups() {
        return bookGroups;
    }

    public void setBookGroups(String bookGroups) {
        this.bookGroups = bookGroups;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPress() {
        return press;
    }

    public void setPress(String press) {
        this.press = press;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
