package com.gksvp.productservice.entity.constructionMaterials;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class HollowBrick extends ConstructionMaterials{
    private double length;
    private double width;
    private double height;
    private double weight;
    private String size; 
    private String material; 
    private int compressiveStrength; 
}
