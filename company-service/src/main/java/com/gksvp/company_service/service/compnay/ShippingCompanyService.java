package com.gksvp.company_service.service.compnay;

import com.gksvp.company_service.entity.company.ShippingCompany;
import com.gksvp.company_service.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class ShippingCompanyService extends AbstractCompanyService<ShippingCompany> {

    public ShippingCompanyService(CompanyRepository<ShippingCompany> companyRepository) {
        super(companyRepository);
    }

    @Override
    protected String getCompanyType() {
        return "shipping";
    }

}
