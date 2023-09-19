package com.ma.library01.service;

import com.ma.library01.dto.BooksDTO;
import com.ma.library01.entity.Books;
import com.ma.library01.repository.BooksRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

public interface BookService {

    Page<BooksDTO> findBooks(int pageNum, int pageSize);
}
