package com.gksvp.userservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gksvp.userservice.dto.user.UserResponse;
import com.gksvp.userservice.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    boolean countByEmail(String email);

    User findByEmail(String email);

    User findByUsername(String username);

    boolean existsByUsername(String username);

    Page<UserResponse> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String keyword,
            String keyword2, Pageable pageable);
}
