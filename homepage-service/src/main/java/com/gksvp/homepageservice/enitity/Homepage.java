package com.gksvp.homepageservice.enitity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Homepage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    private String title;

    private String type;
    @NotNull
    private String primaryButtonTitle;
    private String secondaryButtonTitle;
    @NotNull
    private String primaryButtonRedirectUrl;
    private String secondaryButtonRedirectUrl;
    private String postHeadline;
    private String websiteTitle;
    @NotNull
    private int sortOrder;
    private String detailedDescription;
    private String notificationMessage;
    private boolean isVisible = false;

    @ElementCollection
    @CollectionTable(name = "homepage_uuids") // Specify the name of the table
    private List<UUID> imageUuids;

    // Auditing fields
    @CreatedBy
    @Column(updatable = false)
    private String createdBy;
    @CreationTimestamp
    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;
    @LastModifiedBy
    private String lastModifiedBy;
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated;
}
