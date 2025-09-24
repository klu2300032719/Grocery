package com.klef.fsd.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.fsd.springboot.model.Order;
import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.repository.UserRepository;
import com.klef.fsd.springboot.service.OrderService;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    // Place order
    @PostMapping("/place/{username}")
    public ResponseEntity<?> placeOrder(@PathVariable String username, @RequestBody Order order) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            order.setCustomer(userOpt.get());
            return ResponseEntity.ok(orderService.placeOrder(order));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    // Get orders by user
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            List<Order> orders = orderService.getOrdersByUser(userOpt.get());
            return ResponseEntity.ok(orders);
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    // Get order by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.badRequest().body("Order not found");
    }
}
