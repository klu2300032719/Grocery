package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.model.Product;
import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
        // ✅ Ensure offerPrice is set (if null, fallback to original price)
        if (product.getOfferPrice() == null) {
            product.setOfferPrice(product.getPrice());
        }
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.findById(product.getId()).map(existing -> {
            existing.setName(product.getName());
            existing.setDescription(product.getDescription());
            existing.setPrice(product.getPrice());
            existing.setOfferPrice(product.getOfferPrice()); // ✅ handled
            existing.setStockQuantity(product.getStockQuantity());
            existing.setCategory(product.getCategory());
            existing.setImageUrl(product.getImageUrl());
            existing.setSeller(product.getSeller());
            return productRepository.save(existing);
        }).orElse(null);
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    @Override
    public List<Product> getProductsBySeller(User seller) {
        return productRepository.findBySeller(seller);
    }
}
