package com.gksvp.company_service.entity.employee;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gksvp.company_service.entity.AbstractEntity;
import com.gksvp.company_service.entity.company.Company;
import com.gksvp.company_service.listener.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
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

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<EmployeeAddress> addresses = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<EmployeeBankAccount> accounts = new HashSet<>();

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company; // Add this line

    // Helper methods to manage addresses
    public void addAddress(EmployeeAddress address) {
        addresses.add(address);
        address.setEmployee(this);
    }

    public void removeAddress(EmployeeAddress address) {
        addresses.remove(address);
        address.setEmployee(null);
    }

    // Helper methods to manage bank accounts
    public void addAccount(EmployeeBankAccount account) {
        accounts.add(account);
        account.setEmployee(this);
    }

    public void removeAccount(EmployeeBankAccount account) {
        accounts.remove(account);
        account.setEmployee(null);
    }

}