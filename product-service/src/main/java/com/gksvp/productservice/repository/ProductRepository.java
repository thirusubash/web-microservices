package com.gksvp.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gksvp.productservice.entity.Product;

public interface ProductRepository<T extends Product> extends JpaRepository<T, Long> {
    // Common CRUD operations for all product types
}
