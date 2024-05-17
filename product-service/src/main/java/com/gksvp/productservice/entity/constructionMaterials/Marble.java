package com.gksvp.productservice.entity.constructionMaterials;

import jakarta.persistence.Entity;

@Entity
public class Marble extends ConstructionMaterials {
    private String color;
    private String finish;
    private String thickness;
}
