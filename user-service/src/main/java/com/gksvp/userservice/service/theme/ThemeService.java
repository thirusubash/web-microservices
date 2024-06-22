package com.gksvp.userservice.service.theme;

import com.gksvp.userservice.entity.Theme;
import com.gksvp.userservice.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ThemeService {

    Page<Theme> getAllThemes(Pageable pageable);

    Page<Theme> getPersonalizedThemes(Long userId, Pageable pageable);

    Theme getDefaultTheme(Long userId);

    Theme createTheme(Long userId, Theme theme);

    Theme updateTheme(Long themeId, Theme theme) throws ResourceNotFoundException;

    void deleteTheme(Long themeId) throws ResourceNotFoundException;
}
