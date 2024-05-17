package com.gksvp.userservice.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

@Entity
@Table(name = "auth_group")
@Data
@RequiredArgsConstructor
public class Group {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Role name cannot be blank")
    @Size(min = 4, message = "Role name must be at least 4 characters")
    @Column(unique = true)
    private String name;

    @NotBlank(message = "Role description cannot be blank")
    @Size(min = 10, message = "Role description must be at least 10 characters")
    private String description;

    @ManyToMany(mappedBy = "groups")
    @JsonBackReference
    private List<User> users;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @CreatedBy
    private Long createdBy;

    @LastModifiedBy
    private Long updatedBy;

    private Boolean isActive;


   
}
