package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.model.Product;
import com.klef.fsd.springboot.model.User;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);
    Product updateProduct(Product product);
    void deleteProduct(Long productId);
    Product getProductById(Long productId);
    List<Product> getAllProducts();
    List<Product> getProductsByCategory(String category);
    List<Product> getProductsBySeller(User seller);
}
