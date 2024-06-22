package com.gksvp.company_service.entity.company;

import jakarta.persistence.Entity;

@Entity
public class SupplierCompany extends Company {

    private String supplierType;

    public String getSupplierType() {
        return supplierType;
    }

    public void setSupplierType(String supplierType) {
        this.supplierType = supplierType;
    }

}
