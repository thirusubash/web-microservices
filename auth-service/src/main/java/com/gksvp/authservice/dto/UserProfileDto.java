package com.gksvp.authservice.dto;

import java.time.LocalDate;
import java.util.Set;

import com.gksvp.authservice.model.Group;
import com.gksvp.authservice.model.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    private String url;
    private Set<Role> roles;
    private Set<Group> groups;
}
