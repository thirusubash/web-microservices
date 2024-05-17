package com.gksvp.userservice.service.users.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gksvp.userservice.entity.User;
import com.gksvp.userservice.exception.UserNotFoundException;
import com.gksvp.userservice.repository.UserRepository;
import com.gksvp.userservice.service.users.CheckUserInfo;
import com.gksvp.userservice.service.users.GetUserInfo;

/**
 * Implementation of the service interface for checking and retrieving user information.
 */
@Service
public class UserInformation implements CheckUserInfo, GetUserInfo {

    @Autowired
    private UserRepository userRepository;

    /**
     * Check if the given email is already taken by another user.
     * 
     * @param email The email to check
     * @return true if the email is already taken, false otherwise
     */
    @Override
    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Check if the given username is already taken by another user.
     * 
     * @param username The username to check
     * @return true if the username is already taken, false otherwise
     */
    @Override
    public boolean isUsernameTaken(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Retrieve a user by their email address.
     * 
     * @param email The email of the user to retrieve
     * @return The user object
     * @throws UserNotFoundException if the user with the specified email is not found
     */
    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("Could not find user with email: " + email);
    }
    return user;

    }

    /**
     * Retrieve a user by their username.
     * 
     * @param username The username of the user to retrieve
     * @return The user object
     * @throws UserNotFoundException if the user with the specified username is not found
     */
    @Override
    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException("Could not find user with this: " + username);
    }
    return user;

    }

    /**
     * Retrieve a user by their ID.
     * 
     * @param id The ID of the user to retrieve
     * @return The user object
     * @throws UserNotFoundException if the user with the specified ID is not found
     */
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Could not find user with ID: " + id));
    }
}
