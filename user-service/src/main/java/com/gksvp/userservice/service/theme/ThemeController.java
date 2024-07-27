package com.gksvp.userservice.service.theme;

import com.fasterxml.jackson.databind.JsonNode;
import com.gksvp.userservice.entity.Theme;
import com.gksvp.userservice.exception.NoContentFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/themes")
public class ThemeController {

    private final ThemeService themeService;

    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @GetMapping
    public Page<Theme> getAllThemes(Pageable pageable) {
        return themeService.getAllThemes(pageable);
    }

    @GetMapping("/{userId}")
    public Page<Theme> getPersonalizedThemes(@PathVariable Long userId, Pageable pageable) {
        return themeService.getPersonalizedThemes(userId, pageable);
    }

    @GetMapping("/default/{userId}")
    public Theme getDefaultTheme(@PathVariable Long userId) {
        return themeService.getDefaultTheme(userId);
    }

    @PostMapping("/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Theme createTheme(@Valid @RequestBody JsonNode newTheme, @PathVariable Long userId) {
        return themeService.createTheme(userId, newTheme);
    }

    @PutMapping("/{themeId}")
    public Theme updateTheme(@Valid @RequestBody JsonNode updatedTheme, @PathVariable Long themeId)
            throws NoContentFoundException {
        return themeService.updateTheme(themeId, updatedTheme);
    }

    @PatchMapping("/{userId}/{themeId}")
    public void makeprimary(@PathVariable Long userId, @PathVariable Long themeId)
            throws NoContentFoundException {
        themeService.makeprimary(userId, themeId);
    }

    @DeleteMapping("/{themeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTheme(@PathVariable Long themeId) throws NoContentFoundException {
        themeService.deleteTheme(themeId);
    }
}
