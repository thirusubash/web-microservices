package com.gksvp.userservice.service.users.impl;

import org.springframework.stereotype.Service;
import com.gksvp.userservice.repository.UserRepository;
import java.util.UUID;

@Service
public class UserProfileServiceImpl {

    private final UserRepository userRepository;

    public UserProfileServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String updateProfileImage(Long userId, UUID file) {
        return null;
    }
}
