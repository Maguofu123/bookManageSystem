package com.ma.library01.controller;

import com.alibaba.fastjson.JSONObject;
import com.ma.library01.entity.Users;
import com.ma.library01.repository.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Controller
public class UsersHandler {

    @Resource
    private UsersRepository usersRepository;


    @PostMapping("/nav/login")
    @ResponseBody
    public Object findOne(Users users) {
        Example<Users> usersExample = Example.of(users);
        Optional<Users> usersOptional = usersRepository.findOne(usersExample);
        JSONObject jsonObject = new JSONObject();

        if (usersOptional.isPresent()) {
            Users userTemp = usersOptional.get();
            if (userTemp.getUserGroups().equals("admin")) {
                if (users.getUsername().equals(userTemp.getUsername())) {
                    jsonObject.put("code", "1");
                    jsonObject.put("username", userTemp.getUsername());
                } else {
                    jsonObject.put("code", "0");
                }
            } else if (userTemp.getUserGroups().equals("user")) {
                jsonObject.put("code", "1");
                jsonObject.put("username", userTemp.getUsername());
            } else {
                jsonObject.put("code", "0");
            }
        } else {
            jsonObject.put("code", "0");
        }
        return jsonObject;
    }

    @ResponseBody
    @GetMapping("/users")
    public List<Users> findAll() {
        return usersRepository.findAll();
    }

    @ResponseBody
    @GetMapping("/users/find")
    public List<Users> findByUsernameLike(String username) {
        return usersRepository.findByUsernameLike("%" + username + "%");
    }

    @ResponseBody
    @GetMapping("/users/find/{id}")
    public Optional<Users> findById(@PathVariable("id") Integer id) {
        return usersRepository.findById(id);
    }

    @ResponseBody
    @PostMapping("/users/add")
    public Object addUsers(Users users) {
        JSONObject jsonObject = new JSONObject();
        Users users1 = usersRepository.findByPhone(users.getPhone());

        if (users1 == null) {
            Users save = usersRepository.save(users);
            jsonObject.put("code", "1");
            if (save != null) {
                jsonObject.put("code", "1");
            } else {
                jsonObject.put("code", "-1");
            }
        } else {
            jsonObject.put("code", "0");
        }
        return jsonObject;
    }

    @ResponseBody
    @PutMapping("/users/edit/{id}")
    public Object update(Users users) {
        JSONObject jsonObject = new JSONObject();
        Users users1 = usersRepository.findByPhone(users.getPhone());

        if (users1 != null) {
            int oldId = users.getId();
            int newId = users1.getId();
            if (oldId == newId) {
                Users save = usersRepository.save(users);
                if (save != null) {
                    jsonObject.put("code", "1");
                } else {
                    jsonObject.put("code", "-1");
                }
            } else {
                jsonObject.put("code", "0");
            }
        } else if (users1 == null) {
            usersRepository.save(users);
            jsonObject.put("code", "1");
        } else {
            jsonObject.put("code", "0");
        }
        return jsonObject;
    }

    @ResponseBody
    @DeleteMapping("/users/delete/{id}")
    public Object deleteUser(@PathVariable("id") Integer id){
        JSONObject jsonObject = new JSONObject();
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            jsonObject.put("code","1");
        }else {
            jsonObject.put("code","-1");
        }
        return jsonObject;
    }


}