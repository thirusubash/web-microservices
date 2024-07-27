package com.gksvp.userservice.service.theme;

import com.gksvp.userservice.entity.Theme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
    Optional<Theme> findByUserId(Long userId);

    Page<Theme> findByUserId(Long userId, Pageable pageable);

    Optional<Theme> findByUserIdAndIsPrimaryTrue(Long userId);
}
