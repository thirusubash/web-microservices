package com.gksvp.media_service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.gksvp.media_service.entity.Media;
import com.gksvp.media_service.service.ImageUploadService;
import com.gksvp.media_service.service.BasicImageService;
import com.gksvp.media_service.service.ImageDeleteService;

@RestController
@RequestMapping("/media")
public class ImageController {

    private final ImageUploadService imageUploadService;
    private final BasicImageService basicImageService;
    private final ImageDeleteService imageDeleteService;

    public ImageController(ImageUploadService imageUploadService, BasicImageService basicImageService,
            ImageDeleteService imageDeleteService) {
        this.imageUploadService = imageUploadService;
        this.basicImageService = basicImageService;
        this.imageDeleteService = imageDeleteService;
    }

    @GetMapping
    public ResponseEntity<Page<Media>> getAllImages(Pageable pageable) {
        Page<Media> images = basicImageService.getAll(pageable);
        return ResponseEntity.ok(images);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getOrginalFile(@PathVariable UUID id) {
        Media media = basicImageService.getByUUID(id);
        if (media != null && media.getIsActive()) {
            try {
                byte[] imageData = media.getThumbnail();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_PNG);
                return new ResponseEntity<>(imageData, headers, HttpStatus.OK);

            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);
            }
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/{uuid}")
    public Media getImageById(@PathVariable UUID uuid) {
        return basicImageService.getByUUID(uuid);
    }

    @PostMapping("/findbyAll")
    public List<Media> findAllImages(@RequestBody List<UUID> uuids) {
        return basicImageService.findAllImages(uuids);
    }

    @PostMapping("/upload/{dir}/{id}")
    public List<UUID> createUserImage(
            @PathVariable String dir,
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("altText") String altText,
            @RequestParam("description") String description) {
        return imageUploadService.uploadMultipleImages(files, dir + "/" + id, altText, description).join();
    }

    @DeleteMapping("/delete/{uuid}")
    public String deleteImages(@PathVariable UUID uuid) {
        return imageDeleteService.delete(uuid);

    }

    @PatchMapping("/disable/{uuid}")
    public String disable(@PathVariable UUID uuid) {
        return imageDeleteService.disable(uuid);
    }
}
