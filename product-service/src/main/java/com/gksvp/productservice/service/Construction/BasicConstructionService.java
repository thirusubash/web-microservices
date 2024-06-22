package com.gksvp.productservice.service.Construction;

import com.gksvp.productservice.entity.constructionMaterials.ConstructionMaterials;
import com.gksvp.productservice.service.AbstractProductService;
import org.springframework.stereotype.Service;

@Service
public class BasicConstructionService<T extends ConstructionMaterials>
        extends AbstractProductService<ConstructionMaterials> {

}
