package com.gksvp.userservice.service.users;
import com.gksvp.userservice.dto.geo.GeoLocationCreateRequest;
import com.gksvp.userservice.entity.GeoLocation;
import com.gksvp.userservice.entity.User;

public interface UserLocationsManagementService {
   


    public void  addLocation(Long userId, GeoLocationCreateRequest location);
    public void  removeLocation(Long userId, Long locationId);
    public void  removeAlllocation(Long userId);


    default GeoLocation addLocationLogic(User user, GeoLocationCreateRequest location) {
        GeoLocation geoLocation = new GeoLocation();
        geoLocation.setUser(user);
        geoLocation.setLatitude(location.getLatitude());
        geoLocation.setLongitude(location.getLongitude());
        geoLocation.setIpAddress(location.getIpAddress());

        return geoLocation;
    }
}
