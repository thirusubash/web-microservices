package com.gksvp.productservice.service.Construction;

import com.gksvp.productservice.entity.constructionMaterials.Granite;
import org.springframework.stereotype.Service;

@Service
public class GraniteService extends BasicConstructionService<Granite> {

    @Override
    public void toggleVerified(Long id) {
        // TODO Auto-generated method stub
        super.toggleVerified(id);
    }

}
