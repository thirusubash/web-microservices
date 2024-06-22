package com.gksvp.company_service.service.compnay;

import com.gksvp.company_service.entity.company.ServiceCompany;
import com.gksvp.company_service.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceCompanyService extends AbstractCompanyService<ServiceCompany> {

    public ServiceCompanyService(CompanyRepository<ServiceCompany> companyRepository) {
        super(companyRepository);
    }

    @Override
    protected String getCompanyType() {
        return "Product";
    }

}
