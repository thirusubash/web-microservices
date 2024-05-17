package com.gksvp.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gksvp.productservice.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
