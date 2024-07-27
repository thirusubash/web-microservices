package com.gksvp.authservice.model;

import java.time.LocalDate;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserCreateRequest {
    private String username;
    private String password;
    private Boolean isEnabled;
    private Boolean isAccountNonExpired;
    private Boolean isAccountNonLocked;
    private Boolean isCredentialsNonExpired;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    @Builder.Default()
    private Boolean isMobileVerified = false;

    @Builder.Default()
    private Boolean isEmailVerified = false;
    private String picture;

    private Set<Role> roles;

    private Set<Group> groups;
}
