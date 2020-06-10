package com.zas.linkparty.controller;

import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.management.loading.PrivateClassLoader;
import java.security.Principal;
import java.util.Optional;

@RestController
public class AuthenticationController {

    private UserRepository userRepository;

    @Autowired
    public AuthenticationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/auth/register")
    public boolean register(@RequestParam String username,
                         @RequestParam String password,
                         @RequestParam String email) {
        User user = new User(username, email, password);
        userRepository.save(user);
        return true;
    }

    @GetMapping("/api/user")
    public User user(Principal principal) {
        Optional<User> user = userRepository.findByUsername(principal.getName());
        if (user.isEmpty()) {
            return null;
        } else {
            return user.get();
        }
    }
}
