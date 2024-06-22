package com.gksvp.company_service.entity.employee;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gksvp.company_service.entity.AbstractAddress;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class EmployeeAddress extends AbstractAddress {

    @ManyToOne
    @JsonBackReference("employee-addresses")
    private Employee employee;

    private boolean isPrimary;
}