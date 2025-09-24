package com.klef.fsd.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.fsd.springboot.model.Cart;
import com.klef.fsd.springboot.model.CartItem;
import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.repository.UserRepository;
import com.klef.fsd.springboot.service.CartService;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    // ✅ Get or create cart for a user
    @GetMapping("/{username}")
    public ResponseEntity<?> getCart(@PathVariable String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            Cart cart = cartService.getOrCreateCart(userOpt.get());
            return ResponseEntity.ok(cart);
        }
        return ResponseEntity.badRequest().body("❌ User not found");
    }

    // ✅ Add item to cart (frontend must send full CartItem JSON with product + quantity)
    @PostMapping("/{username}/add")
    public ResponseEntity<?> addItem(@PathVariable String username, @RequestBody CartItem item) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            Cart updatedCart = cartService.addItemToCart(userOpt.get(), item);
            return ResponseEntity.ok(updatedCart);
        }
        return ResponseEntity.badRequest().body("❌ User not found");
    }

    // ✅ Remove item from cart
    @DeleteMapping("/{username}/remove/{itemId}")
    public ResponseEntity<?> removeItem(@PathVariable String username, @PathVariable Long itemId) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            cartService.removeItemFromCart(userOpt.get(), itemId);
            return ResponseEntity.ok("✅ Item removed from cart");
        }
        return ResponseEntity.badRequest().body("❌ User not found");
    }
}
