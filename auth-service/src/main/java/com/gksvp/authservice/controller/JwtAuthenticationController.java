package com.gksvp.authservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.gksvp.authservice.model.JwtRequest;
import com.gksvp.authservice.model.JwtResponse;
import com.gksvp.authservice.model.User;
import com.gksvp.authservice.service.JwtUserDetailsService;
import com.gksvp.authservice.service.UserService;
import com.gksvp.authservice.util.JwtTokenService;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "https://localhost:8081", maxAge = 3600)
@RequestMapping("/auth")
@Slf4j
public class JwtAuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final UserService userService;

    public JwtAuthenticationController(AuthenticationManager authenticationManager,
                                       JwtTokenService jwtTokenService,
                                       JwtUserDetailsService jwtUserDetailsService,
                                       UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.userService = userService;
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenService.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            if (userService.isEmailTaken(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken");
            }
            if (userService.isMobileTaken(user.getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mobile number is already taken");
            }
            if (userService.isUsernameTaken(user.getUsername())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken");
            }
            user.setIsEnabled(true);
            String response= userService.createUser(user);
         
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("An error occurred while registering user: {}", e.getMessage());
            // Return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while registering user");
        }
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUsernameNotFoundException(UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @GetMapping("/validate/{token}&{username}")
    public String validateToken(@PathVariable String token, @PathVariable String username) {
        UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
        jwtTokenService.validateToken(token, userDetails);
        return "valid";
    }
}
