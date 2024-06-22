package com.gksvp.homepageservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GenericCrudService<T, ID> {

    Page<T> getAll(Pageable pageable);

    T getById(ID id);

    T create(T entity);

    T update(ID id, T entity);

    void delete(ID id);
}
