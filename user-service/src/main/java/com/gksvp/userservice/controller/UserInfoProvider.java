package com.gksvp.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gksvp.userservice.dto.user.UserRequest;
import com.gksvp.userservice.entity.User;
import com.gksvp.userservice.service.users.UserService;
import com.gksvp.userservice.service.users.impl.UserInformation;

@RestController
@RequestMapping("/getuser")
public class UserInfoProvider {

    @Autowired
    private UserInformation userInformation;

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userInformation.getUserById(id);
    }

    @GetMapping("/byName/{userName}") // Changed path with "byName" prefix
    public User getUserByUserName(@PathVariable("userName") String userName) {
        return userInformation.getUserByUsername(userName);
    }

    @GetMapping("/byEmail/{email}") // Changed path with "byName" prefix
    public User getUserByEmail(@PathVariable("email") String userName) {
        return userInformation.getUserByEmail(userName);
    }
 

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserRequest userRequest) {
        return userService.createUser(userRequest);
    }
}
