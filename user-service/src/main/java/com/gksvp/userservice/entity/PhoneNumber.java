package com.gksvp.userservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PhoneNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;
    private String countryCode;
    private String countryName;
    private boolean isPrimary;
    private boolean isVerified; 

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
    
}
