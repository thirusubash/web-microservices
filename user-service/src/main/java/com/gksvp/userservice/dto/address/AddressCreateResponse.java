package com.gksvp.userservice.dto.address;

import lombok.Data;

@Data
public class AddressCreateResponse {

    private Long id;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;

}
