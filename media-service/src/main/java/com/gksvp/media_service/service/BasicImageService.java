package com.gksvp.media_service.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gksvp.media_service.entity.Media;
import com.gksvp.media_service.repository.BasicRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BasicImageService implements BasicCurdInterface<Media> {

    private final BasicRepository<Media> basicRepository;

    public BasicImageService(BasicRepository<Media> basicRepository) {
        this.basicRepository = basicRepository;
    }

    @Override
    public Page<Media> getAll(Pageable pageable) {
        return basicRepository.findAll(pageable);
    }

    public Media getByUUID(UUID uuid) {
        return basicRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Media not found with UUID: " + uuid));
    }

    @Override
    public Media disable(UUID id) {
        Media existingImage = basicRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("Image not found"));
        existingImage.setIsActive(false);
        return basicRepository.save(existingImage);
    }

    public List<Media> findAllImages(List<UUID> uuids) {
        return basicRepository.findAllById(uuids);
    }

}
