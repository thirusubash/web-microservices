package com.gksvp.company_service.service.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gksvp.company_service.entity.employee.Employee;
import com.gksvp.company_service.repository.EmployeeRepository;
import com.gksvp.company_service.exception.ResourceNotFoundException;

@Service
public abstract class AbstractEmployeeService<T extends Employee> implements EmployeeService<T> {

    protected final EmployeeRepository<T> employeeRepository;

    public AbstractEmployeeService(EmployeeRepository<T> employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public T getById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(getEmployeeType() + " Employee not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<T> getAll(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public T create(T employee) {
        return employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public T update(Long id, T employee) {
        T existingEmployee = getById(id); // Use getById to get the employee and check existence

        // Update properties of existingEmployee based on the fields present in
        // 'employee'
        // (You'll need to implement this based on your specific requirements)
        // For example:
        // existingEmployee.setFirstName(employee.getFirstName());

        return employeeRepository.save(existingEmployee);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        employeeRepository.deleteById(id); // No need to check existence; JpaRepository handles it
    }

    @Override
    @Transactional
    public void toggleActive(Long id) {
        T employee = getById(id);
        employee.setActive(!employee.isActive());
        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void toggleEnabled(Long id) {
        T employee = getById(id);
        employee.setEnabled(!employee.isEnabled());
        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void toggleVerified(Long id) {
        T employee = getById(id);
        employee.setVerified(!employee.isVerified());
        employeeRepository.save(employee);
    }

    protected abstract String getEmployeeType(); // Abstract method for specific employee type
}
