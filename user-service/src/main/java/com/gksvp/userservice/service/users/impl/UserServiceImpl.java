package com.gksvp.userservice.service.users.impl;

import java.util.HashSet;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gksvp.userservice.dto.user.UpdateUser;
import com.gksvp.userservice.dto.user.UserRequest;
import com.gksvp.userservice.dto.user.UserResponse;
import com.gksvp.userservice.entity.Group;
import com.gksvp.userservice.entity.Role;
import com.gksvp.userservice.entity.User;
import com.gksvp.userservice.exception.ResourceNotFoundException;
import com.gksvp.userservice.repository.GroupRepository;
import com.gksvp.userservice.repository.PhoneNumberRepository;
import com.gksvp.userservice.repository.RoleRepository;
import com.gksvp.userservice.repository.UserRepository;
import com.gksvp.userservice.service.users.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final GroupRepository groupRepository;

    @Autowired
    private final PhoneNumberRepository phoneNumberRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper,
            RoleRepository roleRepository, GroupRepository groupRepository,
            PhoneNumberRepository phoneNumberRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
        this.groupRepository = groupRepository;
        this.phoneNumberRepository = phoneNumberRepository;
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    @Override
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(user -> modelMapper.map(user, UserResponse.class));
    }

    @Override
    public Page<UserResponse> getAllUsers(String keyword, Pageable pageable) {
        if (keyword != null && !keyword.isEmpty()) {
            return userRepository
                    .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(keyword, keyword, pageable)
                    .map(user -> modelMapper.map(user, UserResponse.class));
        } else {
            return userRepository.findAll(pageable)
                    .map(user -> modelMapper.map(user, UserResponse.class));
        }
    }

    @Override
    public ResponseEntity<String> createUser(UserRequest userRequest) {
        User user = modelMapper.map(userRequest, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        phoneNumberRepository.saveAll(user.getMobileNumbers());
        // Assuming Role class has a constructor that takes the role ID
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);

        // Assuming Group class has a constructor that takes the group ID
        Set<Group> groups = new HashSet<>();
        groups.add(groupRepository.findByName("GROUP_USER"));
        user.setGroups(groups);
        userRepository.save(user);
        return ResponseEntity.ok("User created with ID: " + user.getId() + " and username: " + user.getUsername());
    }

    @Transactional
    public ResponseEntity<String> updateUser(Long id, UpdateUser userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Update user with request data
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setFullName(userRequest.getFullName()); // Ensure full_name is set
        user.setFullName(userRequest.getFirstName() + " " + userRequest.getLastName());
        // Save the updated user
        userRepository.save(user);

        return ResponseEntity.ok("updated");
    }

    @Override
    public ResponseEntity<String> deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted with ID: " + id);
        } else {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    @Override
    public UserResponse getUser(Long user_id) {
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new NullPointerException(user_id + " user not found with this "));
        return modelMapper.map(user, UserResponse.class);
    }

}
