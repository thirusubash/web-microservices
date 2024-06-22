package com.gksvp.company_service.service.employee;

import org.springframework.stereotype.Service;

import com.gksvp.company_service.entity.employee.Employee;
import com.gksvp.company_service.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl extends AbstractEmployeeService<Employee> {

    public EmployeeServiceImpl(EmployeeRepository<Employee> employeeRepository) {
        super(employeeRepository);
    }

    @Override
    protected String getEmployeeType() {
        return "Employee"; // Or a more descriptive type if you have subtypes
    }

    // ... (You can add any employee-specific logic here if needed)
}
