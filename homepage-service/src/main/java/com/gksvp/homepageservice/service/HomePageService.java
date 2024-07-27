package com.gksvp.homepageservice.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gksvp.homepageservice.enitity.Homepage;
import com.gksvp.homepageservice.exception.NotFoundException;
import com.gksvp.homepageservice.repo.DefaultRepository;

@Service
public class HomePageService {

    private final DefaultRepository<Homepage> homepageRepository;

    public HomePageService(DefaultRepository<Homepage> homepageRepository) {
        this.homepageRepository = homepageRepository;
    }

    public Page<Homepage> getAllHomepages(Pageable pageable) {
        return homepageRepository.findAll(pageable);
    }

    public Homepage getHomepageById(Long id) {
        return homepageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Homepage not found with id: " + id));
    }

    public Homepage createHomepage(Homepage homepage) {
        return homepageRepository.save(homepage);
    }

    public Homepage updateHomepage(Long id, Homepage homepage) {
        if (!homepageRepository.existsById(id)) {
            throw new RuntimeException("Homepage not found with id: " + id);
        }
        return homepageRepository.save(homepage);
    }

    public void deleteHomepage(Long id) {
        homepageRepository.deleteById(id);
    }

    @Transactional
    public Homepage updateVisibility(Long id) {
        Homepage homepage = homepageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Homepage not found with id: " + id));

        // Toggle visibility (assuming 'isVisible' is a boolean attribute)
        homepage.setVisible(!homepage.isVisible());

        // Save the updated Homepage entity back to the database
        return homepageRepository.save(homepage);
    }

    public Page<Homepage> getAllVisibilityOn(Pageable pageable) {
        return homepageRepository.findByIsVisibleTrueAndImageUuidsIsNotEmpty(pageable);
    }

    @Transactional
    public Homepage updateImage(Long id, List<UUID> newImageUuids) {
        // Validate input
        if (newImageUuids == null || newImageUuids.isEmpty()) {
            throw new IllegalArgumentException("Image UUIDs list cannot be null or empty");
        }

        // Fetch the homepage or throw an exception if not found
        Homepage homepage = homepageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Homepage not found with id: " + id));

        // Merge and ensure uniqueness
        List<UUID> existingUuids = homepage.getImageUuids();
        newImageUuids.addAll(existingUuids); // Combine new and existing UUIDs
        List<UUID> uniqueUuids = newImageUuids.stream()
                .distinct() // Ensure uniqueness
                .collect(Collectors.toList());

        homepage.setImageUuids(uniqueUuids);

        // Save the updated homepage entity back to the repository
        return homepageRepository.save(homepage);
    }

    @Transactional
    public void removeImageUuid(Long id, UUID uuid) {
        Homepage homepage = homepageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Homepage not found with id: " + id));

        List<UUID> updatedUuids = homepage.getImageUuids().stream()
                .filter(x -> !x.equals(uuid))
                .collect(Collectors.toList());

        homepage.setImageUuids(updatedUuids);
        homepageRepository.save(homepage);
    }
}
