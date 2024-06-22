package com.gksvp.homepageservice.contoller;

import com.gksvp.homepageservice.enitity.Homepage;
import com.gksvp.homepageservice.service.HomePageService;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1")
public class HomePageController {

    private final HomePageService homePageService;

    public HomePageController(HomePageService homePageService) {
        this.homePageService = homePageService;
    }

    @GetMapping
    public Page<Homepage> getAllHomePages(Pageable pageable) {
        return homePageService.getAllHomepages(pageable);
    }

    @GetMapping("/visible")
    public ResponseEntity<Page<Homepage>> getAllVisibleHomepages(Pageable pageable) {
        Page<Homepage> visibleHomepages = homePageService.getAllVisibilityOn(pageable);
        return ResponseEntity.ok(visibleHomepages);
    }

    @GetMapping("/{id}")
    public Homepage getHomePageById(@PathVariable Long id) {
        return homePageService.getHomepageById(id);
    }

    @PostMapping
    public Homepage createHomePage(@RequestBody Homepage homePage) {
        return homePageService.createHomepage(homePage);
    }

    @PutMapping("/{id}")
    public Homepage updateHomePage(@PathVariable Long id, @RequestBody Homepage homePage) {
        return homePageService.updateHomepage(id, homePage);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Homepage> updateVisibility(@PathVariable Long id) {
        Homepage updatedHomepage = homePageService.updateVisibility(id);
        return ResponseEntity.ok(updatedHomepage);
    }

    @PatchMapping("/updateimage/{id}")
    public ResponseEntity<Homepage> updateImages(@PathVariable Long id, @RequestBody List<UUID> imageUuids) {
        Homepage updatedHomepage = homePageService.updateImage(id, imageUuids);
        return ResponseEntity.ok(updatedHomepage);
    }

    @DeleteMapping("/{id}")
    public void deleteHomePage(@PathVariable Long id) {
        homePageService.deleteHomepage(id);
    }

    @DeleteMapping("/deleteImage/{id}/{uuid}")
    public void deleteHomePage(@PathVariable Long id, @PathVariable UUID uuid) {
        homePageService.removeImageUuid(id, uuid);
    }
}
