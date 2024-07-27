package com.gksvp.company_service.entity.company;

import java.time.LocalDate;

import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import com.gksvp.company_service.entity.AbstractEntity;
import com.gksvp.company_service.entity.employee.Employee;
import com.gksvp.company_service.listener.AuditingEntityListener;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Inheritance(strategy = InheritanceType.JOINED)
public class Company extends AbstractEntity {
    private String companyName;
    private String registrationNumber;
    private String registrationAuthority;
    private String contact;
    private String username;
    private String password;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfIncorporation;
    private String llpNumber;
    private String trademarkAndIP;
    private String insuranceInformation;
    private String tradeLicenseNumber;
    private String healthPermitNumber;
    private String gstin;
    private String tin;
    private String businessType;
    private String businessActivities;
    private String industryClassification;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @JsonManagedReference // Forward part of the reference
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Plant> plants = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Account> accounts = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Employee> employees = new HashSet<>();

}