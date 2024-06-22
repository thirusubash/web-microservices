package com.gksvp.company_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gksvp.company_service.entity.company.Company;

@Repository
public interface CompanyRepository<T extends Company> extends JpaRepository<T, Long> {
}
