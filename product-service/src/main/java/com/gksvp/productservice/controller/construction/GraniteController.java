package com.gksvp.productservice.controller.construction;

import com.gksvp.productservice.controller.BaseController;
import com.gksvp.productservice.entity.constructionMaterials.Granite;
import com.gksvp.productservice.service.BasicService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products/granite")
public class GraniteController extends BaseController<Granite> {

    public GraniteController(BasicService<Granite> graniteService) {
        super(graniteService);
    }
}
