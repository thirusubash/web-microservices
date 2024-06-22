package com.gksvp.company_service.controller.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gksvp.company_service.entity.employee.Employee;
import com.gksvp.company_service.service.employee.EmployeeService;

import jakarta.validation.Valid;

public abstract class AbstractEmployeeController<T extends Employee> {
    protected final EmployeeService<T> employeeService;

    public AbstractEmployeeController(EmployeeService<T> employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getById(id));
    }

    @GetMapping
    public Page<T> getAll(Pageable pageable) {
        return employeeService.getAll(pageable);
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody @Valid T employee) {
        return ResponseEntity.ok(employeeService.create(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable Long id, @RequestBody @Valid T employee) {
        return ResponseEntity.ok(employeeService.update(id, employee));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Void> toggleActive(@PathVariable Long id) {
        employeeService.toggleActive(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/enabled")
    public ResponseEntity<Void> toggleEnabled(@PathVariable Long id) {
        employeeService.toggleEnabled(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/verified")
    public ResponseEntity<Void> toggleVerified(@PathVariable Long id) {
        employeeService.toggleVerified(id);
        return ResponseEntity.noContent().build();
    }
}
