package com.gksvp.userservice.dto.geo;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class GeoLocationCreateRequest {

    private Long id;
    private double latitude;
    private double longitude;
    private String ipAddress;

    Object getDescription() {
        throw new UnsupportedOperationException("Unimplemented method 'getDescription'");
    }
}
