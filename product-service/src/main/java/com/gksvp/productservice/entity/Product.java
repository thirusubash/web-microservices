package com.gksvp.productservice.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private String description;

    private String sku;

    private String brand;

    private String category;

    private double weight;

    private String dimensions;

    private String color;

    private String material;

    private LocalDateTime manufacturingDateTime;

    private LocalDateTime expiryDate;

    private int stockQuantity;

    private double rating;

    private Long companyId;
    private Long plantId;

    @ElementCollection
    private List<String> imageURL;

    @ElementCollection
    private List<String> tags;

    @CreatedBy
    private String createdusername;

    @LastModifiedBy
    private String lastUpdatedusername;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;

    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedDateTime;

    @Builder.Default
    private boolean isActive = false;

    @Builder.Default
    private boolean isVerified = false;

    @Builder.Default
    private boolean isEnabled = false;
}
