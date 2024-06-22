package com.gksvp.company_service.service.compnay;

import com.gksvp.company_service.entity.company.Company;
import com.gksvp.company_service.repository.CompanyRepository;
import com.gksvp.company_service.service.CompanyService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public abstract class AbstractCompanyService<T extends Company> implements CompanyService<T> {

    protected final CompanyRepository<T> companyRepository;

    public AbstractCompanyService(CompanyRepository<T> companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public T getById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(getCompanyType() + " Company not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<T> getAll(Pageable pageable) {
        return companyRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public T create(T company) {
        return companyRepository.save(company);
    }

    @Override
    @Transactional
    public T update(Long id, T company) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException(getCompanyType() + " Company not found with id: " + id);
        }
        company.setId(id); // Ensure the ID is set for update operation
        return companyRepository.save(company);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException(getCompanyType() + " Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void toggleActive(Long id) {
        T company = getById(id);
        // Example logic to toggle 'active' state, assuming 'active' is a boolean
        // property
        company.setActive(!company.isActive());
        companyRepository.save(company);
    }

    @Override
    @Transactional
    public void toggleEnabled(Long id) {
        T company = getById(id);
        // Example logic to toggle 'enabled' state, assuming 'enabled' is a boolean
        // property
        company.setEnabled(!company.isEnabled());
        companyRepository.save(company);
    }

    @Override
    @Transactional
    public void toggleVerifed(Long id) {
        T company = getById(id);
        // Example logic to toggle 'verified' state, assuming 'verified' is a boolean
        // property
        company.setVerified(!company.isVerified());
        companyRepository.save(company);
    }

    protected abstract String getCompanyType(); // Abstract method to get the specific company type
}
