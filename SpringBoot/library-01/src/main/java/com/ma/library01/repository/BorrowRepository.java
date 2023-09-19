package com.ma.library01.repository;

import com.ma.library01.entity.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRepository extends JpaRepository<Borrow,Integer> {
    List<Borrow> findByIsbn(String isbn);
}
