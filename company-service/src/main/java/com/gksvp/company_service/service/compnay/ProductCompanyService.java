package com.gksvp.company_service.service.compnay;

import com.gksvp.company_service.entity.company.ProductCompany;
import com.gksvp.company_service.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductCompanyService extends AbstractCompanyService<ProductCompany> {

    public ProductCompanyService(CompanyRepository<ProductCompany> companyRepository) {
        super(companyRepository);
    }

    @Override
    protected String getCompanyType() {
        return "Product";
    }
}
