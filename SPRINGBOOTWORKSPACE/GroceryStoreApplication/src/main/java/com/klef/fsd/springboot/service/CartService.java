package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.model.Cart;
import com.klef.fsd.springboot.model.CartItem;
import com.klef.fsd.springboot.model.User;

import java.util.List;

public interface CartService {
    Cart getOrCreateCart(User customer);
    Cart addItemToCart(User customer, CartItem item);
    void removeItemFromCart(User customer, Long itemId);
    List<CartItem> getCartItems(User customer);
}
