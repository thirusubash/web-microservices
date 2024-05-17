package com.gksvp.userservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

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

    @ManyToMany(mappedBy = "roles")
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

    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive;

    @PrePersist
    protected void onCreate() {
        if (this.isActive == null) {
            this.isActive = true;
        }
    }
}
