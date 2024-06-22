package com.gksvp.userservice.controller;

import com.gksvp.userservice.entity.Theme;
import com.gksvp.userservice.exception.ResourceNotFoundException;
import com.gksvp.userservice.service.theme.ThemeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/themes")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    @GetMapping
    public Page<Theme> getAllThemes(Pageable pageable) {
        return themeService.getAllThemes(pageable);
    }

    @GetMapping("/user/{userId}")
    public Page<Theme> getPersonalizedThemes(@PathVariable Long userId, Pageable pageable) {
        return themeService.getPersonalizedThemes(userId, pageable);
    }

    @GetMapping("/default/{userId}")
    public Theme getDefaultTheme(@PathVariable Long userId) {
        return themeService.getDefaultTheme(userId);
    }

    @PostMapping("/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Theme createTheme(@Valid @RequestBody Theme newTheme, @PathVariable Long userId) {
        newTheme.setUserId(userId);
        return themeService.createTheme(userId, newTheme);
    }

    @PutMapping("/{themeId}")
    public Theme updateTheme(@Valid @RequestBody Theme updatedTheme, @PathVariable Long themeId)
            throws ResourceNotFoundException {
        return themeService.updateTheme(themeId, updatedTheme);
    }

    @DeleteMapping("/{themeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTheme(@PathVariable Long themeId) throws ResourceNotFoundException {
        themeService.deleteTheme(themeId);
    }
}
