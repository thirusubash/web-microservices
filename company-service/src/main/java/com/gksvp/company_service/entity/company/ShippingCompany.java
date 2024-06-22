package com.gksvp.company_service.entity.company;

import jakarta.persistence.Entity;

@Entity
public class ShippingCompany extends Company {
    private String shippingLicenseNumber;
    private String shippingRegion;
    private int maxShippingCapacity;
}
