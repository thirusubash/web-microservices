package com.gksvp.productservice.entity.constructionMaterials;

import jakarta.persistence.Entity;

@Entity
public class HollowBrick extends ConstructionMaterials{
    private String size; // e.g., standard, king-size
    private String material; // e.g., clay, concrete
    private int compressiveStrength; 
}
