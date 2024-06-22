package com.gksvp.productservice.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gksvp.productservice.entity.Product;
import com.gksvp.productservice.service.BasicService;

import jakarta.validation.Valid;

public abstract class BaseController<T extends Product> {

    protected final BasicService<T> basicService;

    public BaseController(BasicService<T> basicService) {
        this.basicService = basicService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable Long id) {
        T entity = basicService.getById(id);
        return ResponseEntity.ok(entity);
    }

    @GetMapping
    public Page<T> getAll(Pageable pageable) {
        return basicService.getAll(pageable);
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody @Valid T entity) {
        T createdEntity = basicService.create(entity);
        return ResponseEntity.ok(createdEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable Long id, @RequestBody @Valid T entity) {
        T updatedEntity = basicService.update(id, entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        basicService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Void> toggleActive(@PathVariable Long id) {
        basicService.toggleActive(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/enabled")
    public ResponseEntity<Void> toggleEnabled(@PathVariable Long id) {
        basicService.toggleEnabled(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/verified")
    public ResponseEntity<Void> toggleVerified(@PathVariable Long id) {
        basicService.toggleVerified(id);
        return ResponseEntity.noContent().build();
    }
}
