package com.gksvp.userservice.service.theme;

import com.fasterxml.jackson.databind.JsonNode;
import com.gksvp.userservice.entity.Theme;
import com.gksvp.userservice.exception.NoContentFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ThemeService {

    Page<Theme> getAllThemes(Pageable pageable);

    Page<Theme> getPersonalizedThemes(Long userId, Pageable pageable);

    Theme getDefaultTheme(Long userId);

    Theme createTheme(Long userId, JsonNode themeJson);

    Theme updateTheme(Long themeId, JsonNode themeJson) throws NoContentFoundException;

    void deleteTheme(Long themeId) throws NoContentFoundException;

    void makeprimary(Long userId, Long themeId);
}
