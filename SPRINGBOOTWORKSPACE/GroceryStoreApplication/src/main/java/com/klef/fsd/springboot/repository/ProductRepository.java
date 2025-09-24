package com.klef.fsd.springboot.repository;

import com.klef.fsd.springboot.model.Product;
import com.klef.fsd.springboot.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findBySeller(User seller);
}
