package com.gksvp.media_service.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageDownloadService {

    /**
     * Retrieves the content of a file from the file system as a byte array.
     *
     * @param filePath The path to the file to be retrieved.
     * @return A byte array containing the file content.
     * @throws IOException If an I/O error occurs, such as file not found or read
     *                     error.
     */
    public byte[] getFileContent(String filePath) throws IOException {
        Path imagePath = Paths.get(filePath);

        // Check if the file exists
        if (Files.exists(imagePath)) {
            // Read the file content into a byte array
            return Files.readAllBytes(imagePath);
        } else {
            // Throw an IOException if the file does not exist
            throw new IOException("Image file not found: " + filePath);
        }
    }
}
