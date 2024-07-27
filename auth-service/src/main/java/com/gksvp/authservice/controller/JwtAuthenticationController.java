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
import com.gksvp.authservice.model.User;
import com.gksvp.authservice.model.UserCreateRequest;
import com.gksvp.authservice.service.JwtUserDetailsService;
import com.gksvp.authservice.service.UserService;
import com.gksvp.authservice.util.JwtTokenService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/v1")
public class JwtAuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final UserService userService;
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    public static final long refreshTokenValidityInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    public JwtAuthenticationController(AuthenticationManager authenticationManager,
            JwtTokenService jwtTokenService,
            JwtUserDetailsService jwtUserDetailsService,
            UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.userService = userService;
    }

    @PostMapping("/register")
    String register(@RequestBody UserCreateRequest userCreateRequest) throws Exception {

        return userService.createUser(userCreateRequest);

    }

    @PostMapping("/authenticate")
    public ResponseEntity<User> createAuthenticationToken(
            @RequestBody JwtRequest authenticationRequest,
            HttpServletResponse response) throws Exception {

        // Authenticate the user
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        // Load user details
        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        // Generate JWT token
        final String accessToken = jwtTokenService.generateToken(userDetails);

        // Generate Refresh token
        final String refreshToken = jwtTokenService.generateRefreshToken(userDetails);

        // Setting access token as a cookie
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true); // Accessible only by the server
        accessTokenCookie.setSecure(true); // Sent only over HTTPS
        accessTokenCookie.setPath("/"); // Available across the entire application
        accessTokenCookie.setMaxAge(24 * 60 * 60); // 1 day in seconds
        response.addCookie(accessTokenCookie); // Adding the access token cookie to the response

        // Setting refresh token as a cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true); // Accessible only by the server
        refreshTokenCookie.setSecure(true); // Sent only over HTTPS
        refreshTokenCookie.setPath("/"); // Available across the entire application
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days in seconds
        response.addCookie(refreshTokenCookie); // Adding the refresh token cookie to the response

        // Optionally return additional data if needed
        return ResponseEntity.ok(jwtUserDetailsService.getUserProfile(userDetails.getUsername()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        // Extract the refresh token from cookies or headers
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        // If refresh token is not found in cookies, check headers or handle the absence
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token not found");
        }

        // Validate refresh token and extract username
        String username = jwtTokenService.getUsernameFromToken(refreshToken);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        UserDetails userDetails;
        try {
            userDetails = jwtUserDetailsService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Generate new refresh token
        String newRefreshToken = jwtTokenService.generateRefreshToken(userDetails);

        // Update refresh token cookie
        Cookie newRefreshTokenCookie = new Cookie("refreshToken", newRefreshToken);
        newRefreshTokenCookie.setHttpOnly(true);
        newRefreshTokenCookie.setSecure(true);
        newRefreshTokenCookie.setPath("/");
        newRefreshTokenCookie.setMaxAge((int) (refreshTokenValidityInMilliseconds / 1000)); // in seconds
        response.addCookie(newRefreshTokenCookie);

        return ResponseEntity.ok(jwtUserDetailsService.getUserProfile(userDetails.getUsername()));
    }

    @ExceptionHandler({ UsernameNotFoundException.class, BadCredentialsException.class, DisabledException.class })
    public ResponseEntity<?> handleAuthenticationExceptions(Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true); // Set this to true in production
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(0);
        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true); // Set this to true in production
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/validate/{token}&{username}")
    public String validateToken(@PathVariable String token, @PathVariable String username) {
        UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
        jwtTokenService.validateToken(token, userDetails);
        return "valid";
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
}
