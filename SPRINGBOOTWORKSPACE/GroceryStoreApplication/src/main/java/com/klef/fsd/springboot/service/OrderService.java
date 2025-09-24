package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.model.Order;
import com.klef.fsd.springboot.model.User;

import java.util.List;

public interface OrderService {
    Order placeOrder(Order order);
    List<Order> getOrdersByUser(User user);
    Order getOrderById(Long id);
}
