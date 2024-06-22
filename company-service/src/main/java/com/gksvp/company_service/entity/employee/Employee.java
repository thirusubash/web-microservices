package com.gksvp.company_service.entity.employee;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gksvp.company_service.entity.AbstractEntity;
import com.gksvp.company_service.entity.company.Company;
import com.gksvp.company_service.entity.company.Plant;
import com.gksvp.company_service.listener.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Employee extends AbstractEntity {
    private String firstName;
    private String lastName;
    private String fullName;
    private String username;
    private String password;
    private String department;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference("employee-addresses")
    private Set<EmployeeAddress> addresses = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference("employee-accounts")
    private Set<EmployeeBankAccount> accounts = new HashSet<>();
}