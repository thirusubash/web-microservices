package com.gksvp.userservice.dto.address;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {

    private Long id;
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String region;
    private String district;
    private String suburb;
    private String zipCode;
    private Boolean active;
}
