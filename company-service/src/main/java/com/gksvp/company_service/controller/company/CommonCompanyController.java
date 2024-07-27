package com.gksvp.company_service.controller.company;

import org.springframework.web.bind.annotation.RestController;

import com.gksvp.company_service.entity.company.Company;
import com.gksvp.company_service.service.CompanyService;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/")
public class CommonCompanyController extends BaseController<Company> {

    public CommonCompanyController(CompanyService<Company> companyService) {
        super(companyService);
    }

}
