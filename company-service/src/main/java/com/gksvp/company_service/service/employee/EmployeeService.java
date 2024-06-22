package com.gksvp.company_service.service.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gksvp.company_service.entity.employee.Employee;

public interface EmployeeService<T extends Employee> {
    T getById(Long id);

    Page<T> getAll(Pageable pageable);

    T create(T employee);

    T update(Long id, T employee);

    void delete(Long id);

    void toggleActive(Long id);

    void toggleEnabled(Long id);

    void toggleVerified(Long id);
}
