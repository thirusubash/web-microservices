package com.gksvp.company_service.controller.company;

import com.gksvp.company_service.entity.company.ServiceCompany;
import com.gksvp.company_service.service.CompanyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/services")
public class ServiceCompanyController extends BaseController<ServiceCompany> {

    public ServiceCompanyController(CompanyService<ServiceCompany> companyService) {
        super(companyService);
    }

}
