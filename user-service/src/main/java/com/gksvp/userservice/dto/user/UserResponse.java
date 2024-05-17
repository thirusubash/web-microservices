package com.gksvp.userservice.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.gksvp.userservice.dto.address.AddressCreateRequest;
import com.gksvp.userservice.dto.geo.GeoLocationCreateRequest;
import com.gksvp.userservice.dto.group.GroupResponse;
import com.gksvp.userservice.dto.kyc.UserKYCInfoCreateRequest;
import com.gksvp.userservice.dto.phone.PhoneNumberDTO;
import com.gksvp.userservice.dto.role.RoleDTO;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String userName;
    private String email;
    private String firstName;
    private String lastName;
    private String fullname;
    private LocalDate dateOfBirth;
    private LocalDateTime createDateTime;
    private LocalDateTime updateDateTime;
    private Boolean active;
    private String url;
    private List<PhoneNumberDTO> mobileNumbers;
    private List<AddressCreateRequest> addresses;
    private List<UserKYCInfoCreateRequest> kycInfoList;
    private List<GeoLocationCreateRequest> locations;
    private Set<RoleDTO> roles;
    private Set<GroupResponse> groups;


}
