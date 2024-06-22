package com.gksvp.productservice.entity.constructionMaterials;

import jakarta.persistence.Entity;

@Entity
public class Granite extends ConstructionMaterials {
    private String color;
    private String finish;
    private String type;
}
