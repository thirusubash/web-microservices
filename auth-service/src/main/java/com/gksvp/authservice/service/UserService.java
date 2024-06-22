package com.gksvp.authservice.service;

import com.gksvp.authservice.model.User;
import com.gksvp.authservice.model.UserCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@Service
public class UserService {

    @Autowired
    private RestTemplate restTemplate;

    public UserService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public User getUserById(Long id) {
        String url = "http://USER-SERVICE/user-service/get/" + id;
        return restTemplate.getForObject(url, User.class);
    }

    public User getUserByUsername(String username) {
        String url = "http://USER-SERVICE/user-service/getuser/byName/" + username;
        return restTemplate.getForObject(url, User.class);
    }

    public User getUserByMobilenumber(String mobileNumber) {
        String url = "http://USER-SERVICE/user-service/getuser/byMobileNumber/" + mobileNumber;
        return restTemplate.getForObject(url, User.class);
    }

    public String createUser(UserCreateRequest newUser) {
        String url = "http://USER-SERVICE/user-service/getuser";
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, newUser, String.class);
            return response.getBody();
        } catch (HttpStatusCodeException e) {
            throw new RuntimeException("Failed to register user: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RuntimeException("Failed to register user: " + e.getMessage());
        }
    }

    public boolean isEmailTaken(String email) {
        // Implement your logic
        return false;
    }

    public boolean isUsernameTaken(String username) {
        // Implement your logic
        return false;
    }

    public boolean isMobileTaken(Long id) {
        // Implement your logic
        return false;
    }
}
