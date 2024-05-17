package com.gksvp.userservice.dto.role;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RoleCreateRequest {
    
    private Long id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Role name cannot be blank")
    @Size(min = 4, message = "Role name must be at least 4 characters")
    private String name;

    @NotBlank(message = "Role description cannot be blank")
    @Size(min = 4, message = "Role description must be at least 4 characters")
    private String description;

}
