package com.gksvp.userservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_kyc_info")
public class UserKYCInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "document_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private KycDocumentType documentType; // enum

    @Column(name = "document_number", nullable = false, unique = true)
    private String documentNumber;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "issue_authority")
    private String issueAuthority;

    @Column(name = "reviewer")  
    private String reviewer;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private KYCStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
