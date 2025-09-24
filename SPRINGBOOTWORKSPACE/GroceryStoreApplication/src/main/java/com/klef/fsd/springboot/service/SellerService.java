package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.model.User;

import java.util.List;

public interface SellerService {
    List<User> getAllSellers();
    User getSellerById(Long id);
    User addSeller(User seller);
    User updateSeller(User seller);
    void deleteSeller(Long id);
}
