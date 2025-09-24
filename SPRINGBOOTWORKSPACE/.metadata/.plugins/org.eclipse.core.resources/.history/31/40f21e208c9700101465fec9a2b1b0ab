package com.klef.fsd.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.fsd.springboot.model.RoleType;
import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllSellers() {
        // Filter users with role SELLER
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == RoleType.SELLER)
                .collect(Collectors.toList());
    }

    @Override
    public User getSellerById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null && user.getRole() == RoleType.SELLER) {
            return user;
        }
        return null;
    }

    @Override
    public User addSeller(User seller) {
        seller.setRole(RoleType.SELLER); // Ensure role is SELLER
        return userRepository.save(seller);
    }

    @Override
    public User updateSeller(User seller) {
        seller.setRole(RoleType.SELLER); // Ensure role is SELLER
        return userRepository.save(seller);
    }

    @Override
    public void deleteSeller(Long id) {
        User seller = getSellerById(id);
        if (seller != null) {
            userRepository.deleteById(id);
        }
    }
}
