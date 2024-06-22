package com.gksvp.company_service.controller.company;

import com.gksvp.company_service.entity.company.ShippingCompany;
import com.gksvp.company_service.service.CompanyService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipping")
public class ShippingCompanyController extends BaseController<ShippingCompany> {

    public ShippingCompanyController(CompanyService<ShippingCompany> companyService) {
        super(companyService);

    }
}
