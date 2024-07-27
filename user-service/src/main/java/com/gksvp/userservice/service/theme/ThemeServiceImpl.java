package com.gksvp.userservice.service.theme;

import com.fasterxml.jackson.databind.JsonNode;
import com.gksvp.userservice.entity.Theme;
import com.gksvp.userservice.exception.NoContentFoundException;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ThemeServiceImpl implements ThemeService {

    @Autowired
    private ThemeRepository themeRepository;

    @Override
    public Page<Theme> getAllThemes(Pageable pageable) {
        return themeRepository.findAll(pageable);
    }

    @Override
    public Page<Theme> getPersonalizedThemes(Long userId, Pageable pageable) {
        return themeRepository.findByUserId(userId, pageable);
    }

    @Override
    public Theme getDefaultTheme(Long userId) {
        return themeRepository.findByUserIdAndIsPrimaryTrue(userId)
                .orElseThrow(() -> new NoContentFoundException("Default theme not found for user: " + userId));
    }

    @Override
    @Transactional
    public Theme createTheme(Long userId, JsonNode themeJson) {
        if (themeJson == null)
            return null;

        Theme theme = new Theme();

        if (userId != null && themeJson.get("primary").asBoolean(false)) {
            themeRepository.findByUserIdAndIsPrimaryTrue(userId).ifPresent(existingTheme -> {
                existingTheme.setPrimary(false);
                themeRepository.save(existingTheme);
            });
        }

        if (!themeJson.get("id").isNull()) {
            updateTheme(themeJson.get("id").asLong(), themeJson);
        }

        theme.setName(themeJson.get("name").asText("Default"));
        theme.setPrimary(themeJson.get("primary").asBoolean(false));
        theme.setThemeJson(themeJson.get("themeJson"));
        theme.setUserId(userId);

        return themeRepository.save(theme);
    }

    @Override
    public Theme updateTheme(Long themeId, JsonNode themeJson) throws NoContentFoundException {
        Theme existingTheme = themeRepository.findById(themeId)
                .orElseThrow(() -> new NoContentFoundException("Theme not found: " + themeId));

        existingTheme.setThemeJson(themeJson.get("themeJson"));

        return themeRepository.save(existingTheme);
    }

    @Override
    public void deleteTheme(Long themeId) throws NoContentFoundException {
        if (!themeRepository.existsById(themeId)) {
            throw new NoContentFoundException("Theme not found: " + themeId);
        }
        themeRepository.deleteById(themeId);
    }

    @Override
    @Transactional
    public void makeprimary(Long userId, Long themeId) {
        if (userId != null && themeId != null) {
            // Deselect the current primary theme
            themeRepository.findByUserIdAndIsPrimaryTrue(userId).ifPresent(existingTheme -> {
                existingTheme.setPrimary(false);
                themeRepository.save(existingTheme);
            });

            // Find the new theme and set it as primary
            Theme existingTheme = themeRepository.findById(themeId)
                    .orElseThrow(() -> new NoContentFoundException("Theme not found: " + themeId));

            existingTheme.setPrimary(true);
            themeRepository.save(existingTheme);
        }
    }

}
