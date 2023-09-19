package com.ma.library01.repository;

import com.ma.library01.entity.Books;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BooksRepository extends JpaRepository<Books,Integer> {

    Page<Books> findAll(Pageable pageable);
    List<Books> findByNameLike(String book);

    List<Books> findByIsbn(String Isbn);

}
