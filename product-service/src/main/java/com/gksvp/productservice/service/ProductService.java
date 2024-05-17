package com.gksvp.productservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gksvp.productservice.entity.Product;

public interface ProductService<T extends Product>{

    T getProductById(Long id);
    Page<T> getAllProducts(Pageable pageable);
    T saveProduct(T product);
    void deleteProduct(Long id);



}