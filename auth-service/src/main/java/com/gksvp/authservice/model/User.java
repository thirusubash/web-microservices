package com.gksvp.authservice.model;

import lombok.*;
import lombok.Builder.Default;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Long id;
    private String username;

    @ToString.Exclude // Excludes password from toString()
    private String password;

    private boolean isEnabled;
    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;

    private String firstName;
    private String lastName;

    @EqualsAndHashCode.Exclude
    private String fullName;

    private String email;
    private LocalDate dateOfBirth;
    private String picture;

    @Builder.Default()
    private Boolean isMobileVerified = false;

    @Builder.Default()
    private Boolean isEmailVerified = false;

    // Use Records (Java 16+) for Role and Group if possible
    private Set<Role> roles;
    private Set<Group> groups;

    // Enhanced Setter for Immutability (Java 9+ Collection factory method)
    public void setRoles(Set<Role> roles) {
        this.roles = Set.copyOf(roles); // Create an unmodifiable copy
    }

    // Enhanced Setter for Immutability (Java 9+ Collection factory method)
    public void setGroups(Set<Group> groups) {
        this.groups = Set.copyOf(groups); // Create an unmodifiable copy
    }
}
