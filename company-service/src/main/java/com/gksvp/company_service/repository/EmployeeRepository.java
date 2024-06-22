package com.gksvp.company_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gksvp.company_service.entity.employee.Employee;

public interface EmployeeRepository<T extends Employee> extends JpaRepository<T, Long> {

}
