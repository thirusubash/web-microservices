package com.gksvp.company_service.controller.employee;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gksvp.company_service.entity.employee.Employee;
import com.gksvp.company_service.service.employee.EmployeeServiceImpl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/employees")
public class EmployeeController extends AbstractEmployeeController<Employee> {

    public EmployeeController(EmployeeServiceImpl employeeService) { // Inject the concrete service
        super(employeeService);
    }

    @Override
    @GetMapping()
    public Page<Employee> getAll(Pageable pageable) { // Renamed for clarity
        return employeeService.getAll(pageable);
    }

    // ... (other methods from AbstractEmployeeController)
}
