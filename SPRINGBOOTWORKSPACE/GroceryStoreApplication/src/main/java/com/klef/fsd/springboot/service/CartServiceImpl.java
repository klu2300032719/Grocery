package com.klef.fsd.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.fsd.springboot.model.Cart;
import com.klef.fsd.springboot.model.CartItem;
import com.klef.fsd.springboot.model.Product;
import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.repository.CartRepository;
import com.klef.fsd.springboot.repository.CartItemRepository;
import com.klef.fsd.springboot.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Cart getOrCreateCart(User customer) {
        return cartRepository.findByCustomer(customer)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setCustomer(customer);
                    return cartRepository.save(cart);
                });
    }

    @Override
    public Cart addItemToCart(User customer, CartItem itemRequest) {
        Cart cart = getOrCreateCart(customer);

        // Validate product
        Optional<Product> productOpt = productRepository.findById(itemRequest.getProduct().getId());
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Product product = productOpt.get();

        // Check if product already exists in cart
        Optional<CartItem> existingItemOpt = cart.getItems().stream()
                .filter(ci -> ci.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            // Update quantity
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + itemRequest.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            // Create new cart item
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(itemRequest.getQuantity());
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        return cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(User customer, Long itemId) {
        Optional<Cart> cartOpt = cartRepository.findByCustomer(customer);
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            cart.getItems().removeIf(item -> {
                boolean toRemove = item.getId().equals(itemId);
                if (toRemove) {
                    cartItemRepository.delete(item);
                }
                return toRemove;
            });
            cartRepository.save(cart);
        }
    }

    @Override
    public List<CartItem> getCartItems(User customer) {
        return getOrCreateCart(customer).getItems();
    }
}
