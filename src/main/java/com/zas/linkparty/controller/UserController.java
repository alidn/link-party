package com.zas.linkparty.controller;

import java.util.Optional;

import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/api/users/{userId}")
    public String getUsernameWithId(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return null;
        } else {
            return user.get().getUsername();
        }
    }
    // @GetMapping("/api/groups/{groupId}/members")
    // public String getUsersOfGroup(@PathVariable Long groupId) {

    // }
}