package com.gksvp.productservice.entity.ectronics;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Smartphone extends ElectronicsProduct{
    private String screenSize;
    private String operatingSystem;
    private String processor;
    private String camera; // Megapixel resolution
    private String batteryCapacity; // mAh
}
