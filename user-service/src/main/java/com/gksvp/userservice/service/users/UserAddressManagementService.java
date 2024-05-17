package com.gksvp.userservice.service.users;

import com.gksvp.userservice.dto.address.AddressCreateRequest;


public interface UserAddressManagementService {

     String addAddress(Long userId, AddressCreateRequest address);
     String removeAddress(Long userId, Long addressId);
} 
