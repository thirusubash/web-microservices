package com.gksvp.company_service.controller.company;

import com.gksvp.company_service.entity.company.ProductCompany;
import com.gksvp.company_service.service.CompanyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductCompanyController extends BaseController<ProductCompany> {

    public ProductCompanyController(CompanyService<ProductCompany> companyService) {
        super(companyService);
    }

}
