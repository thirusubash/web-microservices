package com.gksvp.productservice.entity.ectronics;

import com.gksvp.productservice.entity.Product;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ElectronicsProduct  extends Product {
    private int size; // Screen size (inches) or physical dimensions
    private int weight; // Weight in grams
    private String warranty;
    private String service;
}
