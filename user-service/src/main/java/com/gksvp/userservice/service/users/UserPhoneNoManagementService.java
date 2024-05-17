package com.gksvp.userservice.service.users;

import com.gksvp.userservice.dto.phone.PhoneNumberDTO;

public interface UserPhoneNoManagementService {
    String addPhoneNumber(Long id, PhoneNumberDTO phoneNumbersDTO) throws Exception;
    String  updatePhoneNumber(Long id, PhoneNumberDTO phoneNumbersDTO) throws Exception;
    String  removePhoneNumber(Long phonenumberid);
}
