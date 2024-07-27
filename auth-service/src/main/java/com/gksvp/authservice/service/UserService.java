package com.gksvp.authservice.service;


import com.gksvp.authservice.exception.UsernameNotFoundException;
import com.gksvp.authservice.model.User;
import com.gksvp.authservice.model.UserCreateRequest;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class UserService {

    private static final String USER_SERVICE_BASE_URL = "http://localhost:8005/user-service/";

    private final RestTemplate restTemplate;

    public UserService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private User fetchUser(String endpoint) {
        String url = USER_SERVICE_BASE_URL + endpoint;
        ResponseEntity<User> responseEntity = restTemplate.getForEntity(url, User.class);
        return Optional.ofNullable(responseEntity.getBody())
                .orElseThrow(() -> new UsernameNotFoundException("User data not found"));
    }

    public User getUserById(Long id) {
        return fetchUser("/get/" + id);
    }

    public User getUserByUsername(String username) {
        return fetchUser("/getuser/byName/" + username);
    }
    public User getUserByEmail(String email) {
        return fetchUser("/getuser/byEmail/" + email);
    }
 

    public String createUser(UserCreateRequest newUser) throws Exception {
        String url = USER_SERVICE_BASE_URL + "/getuser";
        ResponseEntity<String> response = restTemplate.postForEntity(url, newUser, String.class);
        return response.getBody();
    }

    public boolean isEmailTaken(String email) {
        return checkIfAttributeExists("/exists/email/", email);
    }

    public boolean isUsernameTaken(String username) {
        return checkIfAttributeExists("/exists/username/", username);
    }

    public boolean isMobileTaken(String mobileNumber) {
        return checkIfAttributeExists("/exists/mobileNumber/", mobileNumber);
    }

    private boolean checkIfAttributeExists(String endpoint, String value) {
        String url = USER_SERVICE_BASE_URL + endpoint + value;
        try {
            ResponseEntity<Boolean> responseEntity = restTemplate.exchange(url, HttpMethod.GET, null, Boolean.class);

            return Optional.ofNullable(responseEntity.getBody())
                    .orElse(true); // Default to true if response body is null
        } catch (RestClientException ex) {
            log.error("Error communicating with user-service", ex);
            return false;
        } catch (Exception ex) { // Catch any other unexpected exceptions
            log.error("Unexpected error checking attribute existence in user-service", ex);
            return false;
        }
    }

}
