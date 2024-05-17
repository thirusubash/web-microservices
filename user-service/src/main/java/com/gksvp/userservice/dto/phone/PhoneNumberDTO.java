package com.gksvp.userservice.dto.phone;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PhoneNumberDTO {

    private String number;
    private String countryCode;
    private String countryName;
    private boolean isPrimary;
    private boolean isValidated ;
}
