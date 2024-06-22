package com.gksvp.productservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gksvp.productservice.entity.Product;

import java.util.List;

public interface BasicService<T extends Product> {

    T getById(Long id);

    List<T> getAll();

    Page<T> getAll(Pageable pageable);

    T create(T product);

    T update(Long id, T product);

    void delete(Long id);

    void toggleActive(Long id);

    void toggleEnabled(Long id);

    void toggleVerified(Long id);
}
