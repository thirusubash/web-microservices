package com.gksvp.userservice.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gksvp.userservice.entity.Theme;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    Page<Theme> findByUserId(Long userId, Pageable pageable);

    Optional<Theme> findByUserIdAndPrimaryTrue(Long userId);
}
