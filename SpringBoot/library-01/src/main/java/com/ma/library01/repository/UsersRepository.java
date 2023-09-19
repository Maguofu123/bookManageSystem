package com.ma.library01.repository;

import com.ma.library01.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UsersRepository extends JpaRepository<Users,Integer> {
    Users findByPhone(String phone);

    List<Users> findByUsernameLike(String username);
}
