package com.gksvp.productservice.service;

import com.gksvp.productservice.entity.Product;
import com.gksvp.productservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public abstract class AbstractProductService<T extends Product> implements BasicService<T> {

    @Autowired
    protected ProductRepository<T> productRepository;

    @Override
    @Transactional(readOnly = true)
    public T getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> getAll() {
        return productRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<T> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public T create(T product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public T update(Long id, T product) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        product.setId(id);
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void toggleActive(Long id) {
        T product = getById(id);
        product.setActive(!product.isActive());
        productRepository.save(product);
    }

    @Override
    @Transactional
    public void toggleEnabled(Long id) {
        T product = getById(id);
        product.setEnabled(!product.isEnabled());
        productRepository.save(product);
    }

    @Override
    @Transactional
    public void toggleVerified(Long id) {
        T product = getById(id);
        product.setVerified(!product.isVerified());
        productRepository.save(product);
    }
}
