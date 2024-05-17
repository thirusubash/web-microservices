package com.gksvp.authservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/test")
public class AuthSample {
    

    @GetMapping
    public String getMethodName() {
        return new String("  Success ");
    }
    
}
