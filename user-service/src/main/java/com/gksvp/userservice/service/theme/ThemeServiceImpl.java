package com.gksvp.userservice.service.theme;

import com.gksvp.userservice.entity.Theme;
import com.gksvp.userservice.exception.ResourceNotFoundException;
import com.gksvp.userservice.repository.ThemeRepository;
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
        return themeRepository.findByUserIdAndPrimaryTrue(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Default theme not found for user: " + userId));
    }

    @Override
    public Theme createTheme(Long userId, Theme theme) {
        theme.setUserId(userId);
        return themeRepository.save(theme);
    }

    @Override
    public Theme updateTheme(Long themeId, Theme updatedTheme) throws ResourceNotFoundException {
        Theme existingTheme = themeRepository.findById(themeId)
                .orElseThrow(() -> new ResourceNotFoundException("Theme not found: " + themeId));
        return themeRepository.save(existingTheme);
    }

    @Override
    public void deleteTheme(Long themeId) throws ResourceNotFoundException {
        themeRepository.deleteById(themeId);
    }
}
