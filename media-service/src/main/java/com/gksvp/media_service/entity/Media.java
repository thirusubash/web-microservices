package com.gksvp.media_service.entity;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor // Add no-argument constructor
@AllArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String fileName; // The name of the image file

    private String fileType; // The type of image file (e.g., JPEG, PNG)

    @CreationTimestamp
    private LocalDateTime uploadDateTime; // The date and time when the image was uploaded

    private String filePath; // The path to the original image file

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] thumbnail; // The thumbnail image generated for preview

    private String altText; // Alternative text for the image (for SEO)

    private String description; // Description of the image (for SEO)

    private Boolean isActive; // Indicates whether the image is active or not
}
