package com.gksvp.userservice.dto.group;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class GroupCreateRequest{
    @Column(unique = true, nullable = false)
    @NotBlank(message = "Role name cannot be blank")
    @Size(min = 4, message = "Role name must be at least 4 characters")
    private String name;

    @NotBlank(message = "Role description cannot be blank")
    @Size(min = 10, message = "Role description must be at least 3 characters")
    private String description;

}
