package com.gksvp.company_service.service.compnay;

import com.gksvp.company_service.entity.company.SupplierCompany;
import com.gksvp.company_service.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class SupplierCompanyService extends AbstractCompanyService<SupplierCompany> {

    public SupplierCompanyService(CompanyRepository<SupplierCompany> companyRepository) {
        super(companyRepository);
    }

    @Override
    protected String getCompanyType() {
        return "suppliers";
    }

}
