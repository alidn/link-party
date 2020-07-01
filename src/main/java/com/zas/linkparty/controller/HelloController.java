package com.zas.linkparty.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String sayHelloPermitAll() {
        return "Hello world";
    }

    @GetMapping("/api/hello")
    public String sayHelloUserRole(Principal principal) {
        return "Hello " + principal.getName();
    }
}
