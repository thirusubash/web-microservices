package com.gksvp.userservice.dto.geo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeoLocationDTO {

    private Long id;
    private double latitude;
    private double longitude;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
}
