package com.gksvp.userservice.dto.kyc;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class UserKYCInfoCreateResponse {
    private Long id;
    private String documentType;
    private String documentNumber;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String issueAuthority;
    private String reviewer;
    private boolean status;
}

