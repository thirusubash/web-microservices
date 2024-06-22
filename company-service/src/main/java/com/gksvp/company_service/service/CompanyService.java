package com.gksvp.company_service.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gksvp.company_service.entity.company.Company;

public interface CompanyService<T extends Company> {
    T getById(Long id);

    Page<T> getAll(Pageable pageable);

    T create(T company);

    T update(Long id, T company);

    void delete(Long id);

    void toggleActive(Long id);

    void toggleEnabled(Long id);

    void toggleVerifed(Long id);
}
