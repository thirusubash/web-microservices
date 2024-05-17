package com.gksvp.userservice.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gksvp.userservice.dto.address.AddressDTO;
import com.gksvp.userservice.dto.geo.GeoLocationDTO;
import com.gksvp.userservice.dto.group.GroupDTO;
import com.gksvp.userservice.dto.kyc.UserKYCInfoDTO;
import com.gksvp.userservice.dto.phone.PhoneNumberDTO;
import com.gksvp.userservice.dto.role.RoleDTO;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {

     @Column(nullable = false, unique = true)
    @NotBlank(message = "Username cannot be blank")
    private String username;

    @Column(nullable = false)
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

   
    // Optional mobile validation (uncomment if needed)
    // @Column(nullable = false, unique = true)
    // @NotBlank(message = "Mobile number cannot be blank")
    // private String mobile;


    @Column(nullable = false)
    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be blank")
    private String email;


    @Column(nullable = true)
    @Past(message = "Date of birth must be in the past")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") 
    private LocalDate dateOfBirth;

    private String url;

    private List<PhoneNumberDTO> mobileNumbers;

    private List<AddressDTO> addresses;

    private List<UserKYCInfoDTO> kycInfoList;

    private List<GeoLocationDTO> locations;

    private Set<RoleDTO> roles;

    private Set<GroupDTO> groups;
}
