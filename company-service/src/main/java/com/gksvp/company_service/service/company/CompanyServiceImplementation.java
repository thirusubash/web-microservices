package com.gksvp.company_service.service.company;

import org.springframework.stereotype.Service;

import com.gksvp.company_service.entity.company.Company;
import com.gksvp.company_service.repository.CompanyRepository;

@Service
public class CompanyServiceImplementation extends AbstractCompanyService<Company> {

    public CompanyServiceImplementation(CompanyRepository<Company> companyRepository) {
        super(companyRepository);
    }

    @Override
    protected String getCompanyType() {
        return "Company";
    }

}
