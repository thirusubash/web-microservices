package com.gksvp.company_service.controller.company;

import com.gksvp.company_service.entity.company.Company;
import com.gksvp.company_service.service.CompanyService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

public abstract class BaseController<T extends Company> {

    private final CompanyService<T> companyService;

    public BaseController(CompanyService<T> companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable Long id) {
        T company = companyService.getById(id);
        return ResponseEntity.ok(company);
    }

    @GetMapping
    public Page<T> getAll(Pageable pageable) {
        return companyService.getAll(pageable);
    }

    @PostMapping
    public T create(@RequestBody @Valid T company) {
        return companyService.create(company);
    }

    @PutMapping("/{id}")
    public T update(@PathVariable Long id, @RequestBody @Valid T company) {
        return companyService.update(id, company);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Void> toggleActive(@PathVariable Long id) {
        companyService.toggleActive(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/enabled")
    public ResponseEntity<Void> toggleEnabled(@PathVariable Long id) {
        companyService.toggleEnabled(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/verified")
    public void toggleVerified(@PathVariable Long id) {
        companyService.toggleVerifed(id);
    }

}
