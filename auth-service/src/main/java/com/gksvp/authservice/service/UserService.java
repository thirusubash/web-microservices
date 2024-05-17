package com.gksvp.authservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.gksvp.authservice.model.User;

@Service
public class UserService {


    @Autowired
    RestTemplate restTemplate;

    public User getUserById(Long id) {
        String url = "http://USER-SERVICE:8006/api/get/" + id;
        return restTemplate.getForObject(url, User.class);
    }
    public User getUserByUsername(String username) {
        if(username != null){
            String url = "http://localhost:8006/api/getuser/byName/" + username;
            User user=restTemplate.getForObject(url, User.class);
            return user;
        }
        throw new NullPointerException("cannot make request for null user");
    }

    public User getUserByMobilenumber(String mobileNumber) {
        String url = "http://USER-SERVICE:8006/api/users/byMobileNumber/" + mobileNumber;
        return restTemplate.getForObject(url, User.class);
    }

    public boolean isEmailTaken(String email) {
        
        return false;
    }

    public String createUser(User user) {
    String USER_SERVICE_URL = "http://localhost:8006/api/users";
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<User> requestEntity = new HttpEntity<>(user, headers);

        ResponseEntity<String> response = restTemplate.exchange(USER_SERVICE_URL, HttpMethod.POST, requestEntity, String.class);
        return response.getBody();
}


    public boolean isUsernameTaken(String username) {
     
       return false;
    }

    public boolean isMobileTaken(Long id) {
        
       return false;
    }


    
}
