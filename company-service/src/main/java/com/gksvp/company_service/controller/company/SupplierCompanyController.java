package com.gksvp.company_service.controller.company;

import com.gksvp.company_service.entity.company.SupplierCompany;
import com.gksvp.company_service.service.CompanyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suppliers")
public class SupplierCompanyController extends BaseController<SupplierCompany> {

    public SupplierCompanyController(CompanyService<SupplierCompany> companyService) {
        super(companyService);
    }

}
