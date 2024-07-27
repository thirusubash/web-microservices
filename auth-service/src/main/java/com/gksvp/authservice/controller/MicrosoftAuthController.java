package com.gksvp.authservice.controller;

// MicrosoftAuthController.java

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/microsoft")
public class MicrosoftAuthController {

  @PostMapping
  public String signUp(@RequestBody AuthRequest authRequest) throws ParseException {
    String idToken = authRequest.getIdToken();
    return "Registration successful";
  }
}

class AuthRequest {
  private String idToken;
  public String getIdToken() { return idToken; }
  public void setIdToken(String idToken) { this.idToken = idToken; }
}
