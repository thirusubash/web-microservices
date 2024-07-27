package com.gksvp.media_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import com.gksvp.media_service.entity.Media;
import com.gksvp.media_service.repository.BasicRepository;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;

@Service
public class ImageUploadService {

    @Autowired
    private BasicRepository<Media> basicRepository;

    @Async
    @Transactional
    public CompletableFuture<List<UUID>> uploadMultipleImages(MultipartFile[] files, String dir, String altText,
            String description) {
        List<UUID> uuids = new ArrayList<>();
        List<CompletableFuture<Void>> futures = new ArrayList<>();

        for (MultipartFile file : files) {
            CompletableFuture<Void> future = processImage(file, dir, altText, description)
                    .thenCompose(media -> generateThumbnailAsync(media))
                    .thenAccept(media -> uuids.add(media.getId()))
                    .exceptionally(ex -> {
                        ex.printStackTrace();
                        return null;
                    });
            futures.add(future);
        }

        CompletableFuture<Void> allOf = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
        return allOf.thenApply(v -> uuids);
    }

    @Transactional
    private CompletableFuture<Media> processImage(MultipartFile file, String dir, String altText, String description) {
        try {
            String originalFilename = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFilename);
            String newFilename = generateUniqueFilename() + fileExtension;
            String pvcMountPath = "/mnt/data";
            String directoryPath = pvcMountPath + File.separator + dir;
            String filePath = saveFileToSystem(file, newFilename, directoryPath);

            Media media = new Media();
            media.setFileName(newFilename);
            media.setFilePath(filePath);
            media.setFileType(file.getContentType());
            media.setIsActive(true);
            media.setAltText(altText);
            media.setDescription(description);
            media = basicRepository.save(media);

            return CompletableFuture.completedFuture(media);
        } catch (Exception e) {
            e.printStackTrace();
            return CompletableFuture.failedFuture(e);
        }
    }

    private String saveFileToSystem(MultipartFile file, String newFilename, String directoryPath) throws IOException {

        Path directory = Paths.get(directoryPath);

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        String filePath = directory.resolve(newFilename).toString();
        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        return filePath;
    }

    @Async
    @Transactional
    private CompletableFuture<Media> generateThumbnailAsync(Media media) {
        try {
            byte[] thumbnail = generateWebPThumbnail(media.getFilePath());
            if (thumbnail.length == 0) {
                throw new IOException("Thumbnail generation failed.");
            }
            media.setThumbnail(thumbnail);

            Media savedMedia = basicRepository.save(media);

            return CompletableFuture.completedFuture(savedMedia);
        } catch (Exception e) {
            e.printStackTrace();
            // Rollback the transaction explicitly
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return CompletableFuture.failedFuture(e);
        }
    }

    private String generateUniqueFilename() {
        return UUID.randomUUID().toString();
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.isEmpty()) {
            throw new IllegalArgumentException("Filename is null or empty");
        }
        int lastIndex = filename.lastIndexOf('.');
        return (lastIndex == -1) ? "" : filename.substring(lastIndex);
    }

    private byte[] generateWebPThumbnail(String filePath) throws IOException {
        String thumbnailPath = filePath.replaceFirst("\\.[^.]+$", ".webp");
        ProcessBuilder processBuilder = new ProcessBuilder("cwebp", filePath, "-o", thumbnailPath);
        Process process = processBuilder.start();
        try (ByteArrayOutputStream errorStream = new ByteArrayOutputStream()) {
            process.getErrorStream().transferTo(errorStream);
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new IOException("Thumbnail generation failed. Error: " + errorStream.toString());
            }

            File thumbnailFile = new File(thumbnailPath);
            if (!thumbnailFile.exists()) {
                throw new IOException("Thumbnail generation failed: " + thumbnailPath);
            }
            return Files.readAllBytes(thumbnailFile.toPath());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Thumbnail generation interrupted", e);
        }
    }
}
