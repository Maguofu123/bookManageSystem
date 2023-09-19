package com.ma.library01.service;

import com.ma.library01.dto.BooksDTO;
import com.ma.library01.entity.Books;
import com.ma.library01.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class BookServiceImpl implements BookService{

    @Resource
    private BooksRepository booksRepository;

    @Override
    public Page<BooksDTO> findBooks(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Books> page = booksRepository.findAll(pageable);
        return page.map(BooksDTO::new);
    }
}
