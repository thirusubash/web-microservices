package com.gksvp.media_service.service;

import java.io.File;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.gksvp.media_service.entity.Media;
import com.gksvp.media_service.exception.MediaNotFoundException;
import com.gksvp.media_service.repository.BasicRepository;

@Service
public class ImageDeleteService {
    private final BasicRepository<Media> basicRepository;

    public ImageDeleteService(BasicRepository<Media> basicRepository) {
        this.basicRepository = basicRepository;
    }

    public String delete(UUID uuid) {
        // Step 1: Retrieve the Media entity from the database
        Media media = basicRepository.findById(uuid)
                .orElseThrow(() -> new MediaNotFoundException("Media not found with UUID: " + uuid));

        // Step 2: Check if the file path exists
        String filePath = media.getFilePath();
        if (filePath != null && !filePath.isEmpty()) {
            // Step 3: Delete the actual file from the file system if it exists
            File fileToDelete = new File(filePath);
            if (fileToDelete.exists()) {
                if (fileToDelete.delete()) {
                    System.out.println("File deleted successfully");
                } else {
                    System.out.println("Failed to delete the file");
                }
            } else {
                System.out.println("File not found");
            }
        }

        // Step 4: Delete the Media entity from the database
        basicRepository.delete(media);

        // Step 5: Return success message
        return "Image with UUID " + uuid + " deleted successfully";
    }

    public String disable(UUID uuid) {
        Media media = basicRepository.findById(uuid)
                .orElseThrow(() -> new MediaNotFoundException("Media not found with UUID: " + uuid));
        media.setIsActive(!media.getIsActive());
        basicRepository.save(media);
        return "Success!";
    }

}
