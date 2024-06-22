package com.gksvp.productservice.entity.ectronics;

import com.gksvp.productservice.entity.Product;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ElectronicsProduct  extends Product {
    private int size; 
    private String warranty;
    private String service;
}
