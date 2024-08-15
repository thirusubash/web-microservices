package com.gksvp.productservice.service.Construction;

import org.springframework.stereotype.Service;

import com.gksvp.productservice.entity.constructionMaterials.Granite;

@Service
public class GraniteService extends BasicConstructionService<Granite> {

    @Override
    public void toggleVerified(Long id) {
        super.toggleVerified(id);
    }

}
