package com.gksvp.userservice.service.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.gksvp.userservice.dto.user.UpdateUser;
import com.gksvp.userservice.dto.user.UserRequest;
import com.gksvp.userservice.dto.user.UserResponse;

public interface UserService {

    Page<UserResponse> getAllUsers(Pageable pageable);

    Page<UserResponse> getAllUsers(String keyword, Pageable pageable);

    UserResponse getUser(Long user_id);

    ResponseEntity<String> createUser(UserRequest user);

    ResponseEntity<String> updateUser(Long id, UpdateUser user);

    ResponseEntity<String> deleteUser(Long id);

}
