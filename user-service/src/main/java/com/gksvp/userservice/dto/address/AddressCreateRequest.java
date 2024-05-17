package com.gksvp.userservice.dto.address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressCreateRequest {

    private Long id;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
}
